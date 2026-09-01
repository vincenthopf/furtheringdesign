import {
  clamp,
  duplicateValues,
  isRecord,
  mean,
  numberInRange,
  requiredArray,
  requiredString,
  round,
  standardDeviation
} from "./util.mjs";

const signalClasses = new Set(["A", "B", "C"]);
const statuses = new Set(["pass", "fail", "unknown"]);
const severities = new Set(["blocker", "major", "minor", "note"]);
const browsers = new Set(["chromium", "firefox", "webkit", "other"]);

export function validateEvidence(evidence, intent, candidate) {
  const errors = [];
  const warnings = [];
  if (!isRecord(evidence)) return { valid: false, errors: ["evidence must be an object"], warnings };
  if (evidence.schemaVersion !== "1.0.0") errors.push("evidence.schemaVersion must be 1.0.0");
  requiredString(evidence.candidateId, "evidence.candidateId", errors);
  if (candidate?.id && evidence.candidateId !== candidate.id) errors.push(`evidence.candidateId must match candidate.id ${candidate.id}`);

  requiredArray(evidence.captures, "evidence.captures", errors, 1);
  const captureKeys = [];
  const capturedStates = new Set();
  const captures = Array.isArray(evidence.captures) ? evidence.captures : [];
  captures.forEach((capture, index) => {
    if (!isRecord(capture)) {
      errors.push(`evidence.captures[${index}] must be an object`);
      return;
    }
    if (!browsers.has(capture.browser)) errors.push(`evidence.captures[${index}].browser must be one of ${[...browsers].join(", ")}`);
    requiredString(capture.stateRef, `evidence.captures[${index}].stateRef`, errors);
    requiredString(capture.url, `evidence.captures[${index}].url`, errors);
    if (!isRecord(capture.viewport)) {
      errors.push(`evidence.captures[${index}].viewport must be an object`);
    } else {
      if (!Number.isInteger(capture.viewport.width) || capture.viewport.width <= 0) errors.push(`evidence.captures[${index}].viewport.width must be a positive integer`);
      if (!Number.isInteger(capture.viewport.height) || capture.viewport.height <= 0) errors.push(`evidence.captures[${index}].viewport.height must be a positive integer`);
    }
    captureKeys.push(`${capture.browser}:${capture.stateRef}`);
    capturedStates.add(capture.stateRef);
  });
  for (const duplicate of duplicateValues(captureKeys)) errors.push(`duplicate browser/state capture: ${duplicate}`);

  const stateIds = new Set((Array.isArray(intent?.states) ? intent.states : []).map((state) => state.id));
  for (const stateId of capturedStates) {
    if (stateIds.size && !stateIds.has(stateId)) errors.push(`capture references unknown state: ${stateId}`);
  }
  const supportedStates = Array.isArray(candidate?.supportedStates) ? candidate.supportedStates : [];
  const missingStates = supportedStates.filter((stateId) => !capturedStates.has(stateId));
  if (missingStates.length) errors.push(`evidence is missing captures for candidate states: ${missingStates.join(", ")}`);

  requiredArray(evidence.signals, "evidence.signals", errors, 1);
  const signalIds = [];
  const dimensions = new Set(Object.keys(intent?.success?.qualityProfile?.weights ?? {}));
  const signals = Array.isArray(evidence.signals) ? evidence.signals : [];
  signals.forEach((signal, index) => {
    if (!isRecord(signal)) {
      errors.push(`evidence.signals[${index}] must be an object`);
      return;
    }
    requiredString(signal.id, `evidence.signals[${index}].id`, errors);
    if (!signalClasses.has(signal.class)) errors.push(`evidence.signals[${index}].class must be A, B, or C`);
    requiredString(signal.dimension, `evidence.signals[${index}].dimension`, errors);
    requiredString(signal.source, `evidence.signals[${index}].source`, errors);
    if (!statuses.has(signal.status)) errors.push(`evidence.signals[${index}].status must be pass, fail, or unknown`);
    numberInRange(signal.normalized, `evidence.signals[${index}].normalized`, errors);
    numberInRange(signal.confidence, `evidence.signals[${index}].confidence`, errors);
    if (!severities.has(signal.severity)) errors.push(`evidence.signals[${index}].severity must be blocker, major, minor, or note`);
    requiredString(signal.stateRef, `evidence.signals[${index}].stateRef`, errors);
    requiredString(signal.nodeRef, `evidence.signals[${index}].nodeRef`, errors);
    requiredString(signal.evidence, `evidence.signals[${index}].evidence`, errors);
    requiredString(signal.rationale, `evidence.signals[${index}].rationale`, errors);
    requiredString(signal.recommendation, `evidence.signals[${index}].recommendation`, errors);
    if (stateIds.size && !stateIds.has(signal.stateRef)) errors.push(`evidence.signals[${index}] references unknown state: ${signal.stateRef}`);
    if (signal.dimension && dimensions.size && !dimensions.has(signal.dimension)) warnings.push(`signal ${signal.id ?? index} uses unweighted dimension ${signal.dimension}`);
    if (signal.class === "C" && signal.confidence > 0.9) warnings.push(`Class C signal ${signal.id ?? index} has confidence above 0.9; verify calibration`);
    if (signal.status === "unknown" && signal.severity === "blocker") warnings.push(`unknown signal ${signal.id ?? index} is marked blocker; use fail when the obligation is known to be violated`);
    if (signal.id) signalIds.push(signal.id);
  });
  for (const duplicate of duplicateValues(signalIds)) errors.push(`signal id must be unique: ${duplicate}`);

  return { valid: errors.length === 0, errors, warnings };
}

export function aggregateEvidence(evidence, qualityProfile, policy = {}) {
  const weights = qualityProfile?.weights ?? {};
  const floors = qualityProfile?.floors ?? {};
  const uncertaintyPenalty = policy.uncertaintyPenalty ?? qualityProfile?.uncertaintyPenalty ?? 0.18;
  const hardGateSeverities = new Set(policy.hardGateSeverities ?? ["blocker", "major"]);
  const groups = new Map();
  const allSignals = Array.isArray(evidence?.signals) ? evidence.signals : [];
  for (const signal of allSignals) {
    if (signal.status === "unknown") continue;
    if (!groups.has(signal.dimension)) groups.set(signal.dimension, []);
    groups.get(signal.dimension).push(signal);
  }

  const dimensions = {};
  let weightedEvidence = 0;
  let weightedUncertainty = 0;
  const missingDimensions = [];
  for (const [dimension, weight] of Object.entries(weights)) {
    const dimensionSignals = groups.get(dimension) ?? [];
    if (!dimensionSignals.length) {
      dimensions[dimension] = { mean: 0, confidence: 0, disagreement: 0, uncertainty: 1, lowerBound: 0, signalCount: 0 };
      missingDimensions.push(dimension);
      weightedUncertainty += weight;
      continue;
    }
    const confidenceWeight = dimensionSignals.reduce((sum, signal) => sum + Math.max(signal.confidence, 0.01), 0);
    const weightedMean = dimensionSignals.reduce((sum, signal) => sum + signal.normalized * Math.max(signal.confidence, 0.01), 0) / confidenceWeight;
    const confidence = mean(dimensionSignals.map((signal) => signal.confidence));
    const disagreement = standardDeviation(dimensionSignals.map((signal) => signal.normalized));
    const uncertainty = clamp(1 - confidence + disagreement);
    const lowerBound = clamp(weightedMean - uncertaintyPenalty * uncertainty);
    dimensions[dimension] = {
      mean: round(weightedMean, 4),
      confidence: round(confidence, 4),
      disagreement: round(disagreement, 4),
      uncertainty: round(uncertainty, 4),
      lowerBound: round(lowerBound, 4),
      signalCount: dimensionSignals.length
    };
    weightedEvidence += weight * lowerBound;
    weightedUncertainty += weight * uncertainty;
  }

  const hardFailures = allSignals.filter(
    (signal) => signal.class === "A" && signal.status === "fail" && hardGateSeverities.has(signal.severity)
  );
  const unresolvedHardObligations = allSignals.filter(
    (signal) => signal.class === "A" && signal.status === "unknown" && hardGateSeverities.has(signal.severity)
  );
  const floorFailures = Object.entries(floors)
    .filter(([dimension, floor]) => (dimensions[dimension]?.lowerBound ?? 0) < floor)
    .map(([dimension, floor]) => ({ dimension, floor, actual: dimensions[dimension]?.lowerBound ?? 0 }));

  return {
    dimensions,
    evidenceScore: round(weightedEvidence, 4),
    uncertainty: round(weightedUncertainty, 4),
    hardFailures,
    unresolvedHardObligations,
    floorFailures,
    missingDimensions,
    unknownSignals: allSignals.filter((signal) => signal.status === "unknown").map((signal) => signal.id),
    eligible: hardFailures.length === 0 && unresolvedHardObligations.length === 0 && floorFailures.length === 0 && missingDimensions.length === 0
  };
}
