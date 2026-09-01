import { clamp, isRecord, mean, round } from "./util.mjs";

const implementations = new Set(["full", "partial", "none", "unknown"]);
const signalClasses = new Set(["A", "B", "C"]);
const severities = new Set(["blocker", "major", "minor", "note"]);
const scoreByImplementation = { full: 1, partial: 0.5, none: 0, unknown: 0 };
const automationSources = new Set(["playwright"]);
const automationOperators = new Set(["eq", "neq", "lt", "lte", "gt", "gte", "contains"]);

export function candidateCommitmentRef(id) {
  return `candidate:${id}`;
}

export function intentPrincipleRef(id) {
  return `intent:${id}`;
}

function validateObligation(obligation, path, errors, stateIds) {
  if (!isRecord(obligation)) {
    errors.push(`${path} must be an object`);
    return;
  }
  for (const field of ["id", "statement", "dimension", "verification"]) {
    if (typeof obligation[field] !== "string" || !obligation[field].trim()) errors.push(`${path}.${field} must be a non-empty string`);
  }
  if (!signalClasses.has(obligation.class)) errors.push(`${path}.class must be A, B, or C`);
  if (!severities.has(obligation.severity)) errors.push(`${path}.severity must be blocker, major, minor, or note`);
  if (obligation.automation !== undefined) {
    if (!isRecord(obligation.automation)) {
      errors.push(`${path}.automation must be an object`);
    } else {
      if (!automationSources.has(obligation.automation.source)) errors.push(`${path}.automation.source must be playwright`);
      if (typeof obligation.automation.metric !== "string" || !obligation.automation.metric.trim()) errors.push(`${path}.automation.metric must be a non-empty string`);
      if (!automationOperators.has(obligation.automation.operator)) errors.push(`${path}.automation.operator must be one of ${[...automationOperators].join(", ")}`);
      if (!["string", "number", "boolean"].includes(typeof obligation.automation.expected)) errors.push(`${path}.automation.expected must be a string, number, or boolean`);
      if (obligation.automation.tolerance !== undefined && (!Number.isFinite(obligation.automation.tolerance) || obligation.automation.tolerance < 0)) errors.push(`${path}.automation.tolerance must be a non-negative number`);
    }
  }
  if (!Array.isArray(obligation.stateRefs) || !obligation.stateRefs.length) {
    errors.push(`${path}.stateRefs must contain at least one state`);
  } else {
    const seen = new Set();
    for (const [index, stateRef] of obligation.stateRefs.entries()) {
      if (typeof stateRef !== "string" || !stateRef.trim()) errors.push(`${path}.stateRefs[${index}] must be a non-empty string`);
      if (seen.has(stateRef)) errors.push(`${path}.stateRefs contains duplicate state: ${stateRef}`);
      if (stateIds.size && !stateIds.has(stateRef)) errors.push(`${path}.stateRefs references unknown state: ${stateRef}`);
      seen.add(stateRef);
    }
  }
}

function validateObligationList(value, path, stateIds) {
  const errors = [];
  if (value === undefined) return { valid: true, errors };
  if (!Array.isArray(value)) return { valid: false, errors: [`${path} must be an array`] };
  const ids = new Set();
  value.forEach((obligation, index) => {
    validateObligation(obligation, `${path}[${index}]`, errors, stateIds);
    if (obligation?.id) {
      if (ids.has(obligation.id)) errors.push(`${path} id must be unique: ${obligation.id}`);
      ids.add(obligation.id);
    }
  });
  return { valid: errors.length === 0, errors };
}

export function validateIntentPrinciples(principles, states = []) {
  return validateObligationList(principles, "principles", new Set(states.map((state) => state?.id).filter(Boolean)));
}

export function validateCandidateCommitments(commitments, supportedStates = []) {
  return validateObligationList(commitments, "commitments", new Set(supportedStates));
}

export function validateSignalObligations(signal, path = "signal") {
  const errors = [];
  if (signal.obligationRefs === undefined && signal.implementation === undefined) return { valid: true, errors };
  if (!Array.isArray(signal.obligationRefs) || !signal.obligationRefs.length) {
    errors.push(`${path}.obligationRefs must contain at least one obligation reference`);
  } else {
    const seen = new Set();
    for (const [index, ref] of signal.obligationRefs.entries()) {
      if (typeof ref !== "string" || !ref.trim()) errors.push(`${path}.obligationRefs[${index}] must be a non-empty string`);
      if (seen.has(ref)) errors.push(`${path}.obligationRefs contains duplicate reference: ${ref}`);
      seen.add(ref);
    }
  }
  if (!implementations.has(signal.implementation)) {
    errors.push(`${path}.implementation must be full, partial, none, or unknown`);
  } else {
    if (signal.implementation === "full" && signal.status !== "pass") errors.push(`${path}.implementation full requires status pass`);
    if (signal.implementation === "none" && signal.status !== "fail") errors.push(`${path}.implementation none requires status fail`);
    if (signal.implementation === "unknown" && signal.status !== "unknown") errors.push(`${path}.implementation unknown requires status unknown`);
  }
  return { valid: errors.length === 0, errors };
}

function normalizedImplementation(signal) {
  if (implementations.has(signal.implementation)) return signal.implementation;
  if (signal.status === "unknown") return "unknown";
  if (signal.status === "fail") return "none";
  if (signal.status === "pass" && signal.normalized >= 0.85) return "full";
  if (signal.status === "pass") return "partial";
  return "unknown";
}

function stateResult(signals) {
  if (!signals.length) return { implementation: "unknown", confidence: 0, disagreement: false, signalIds: [] };
  const values = signals.map(normalizedImplementation);
  const known = values.filter((value) => value !== "unknown");
  const signalIds = signals.map((signal) => signal.id).filter(Boolean);
  if (!known.length) return { implementation: "unknown", confidence: mean(signals.map((signal) => signal.confidence ?? 0)), disagreement: false, signalIds };
  const distinct = new Set(known);
  const disagreement = distinct.size > 1;
  let implementation = "full";
  if (known.includes("none")) implementation = "none";
  else if (known.includes("partial") || values.includes("unknown")) implementation = "partial";
  return {
    implementation,
    confidence: mean(signals.filter((signal) => normalizedImplementation(signal) !== "unknown").map((signal) => signal.confidence ?? 0)),
    disagreement,
    signalIds
  };
}

function evaluateSet(obligations, evidence, refFor, uncertaintyPenalty) {
  const signals = Array.isArray(evidence?.signals) ? evidence.signals : [];
  const results = [];
  for (const obligation of obligations) {
    const ref = refFor(obligation.id);
    const stateResults = obligation.stateRefs.map((stateRef) => {
      const linked = signals.filter((signal) => signal.stateRef === stateRef && Array.isArray(signal.obligationRefs) && signal.obligationRefs.includes(ref));
      return { stateRef, ...stateResult(linked) };
    });
    const implementationsForStates = stateResults.map((result) => result.implementation);
    let implementation = "full";
    if (implementationsForStates.includes("none")) implementation = "none";
    else if (implementationsForStates.includes("unknown")) implementation = "unknown";
    else if (implementationsForStates.includes("partial")) implementation = "partial";
    const confidence = mean(stateResults.filter((result) => result.implementation !== "unknown").map((result) => result.confidence));
    const disagreement = stateResults.some((result) => result.disagreement);
    results.push({
      id: obligation.id,
      ref,
      statement: obligation.statement,
      class: obligation.class,
      severity: obligation.severity,
      dimension: obligation.dimension,
      implementation,
      score: scoreByImplementation[implementation],
      confidence: round(confidence, 4),
      disagreement,
      states: stateResults
    });
  }
  const score = obligations.length ? mean(results.map((result) => result.score)) : 0;
  const coverage = obligations.length ? results.filter((result) => result.implementation !== "unknown").length / obligations.length : 0;
  const confidence = mean(results.filter((result) => result.implementation !== "unknown").map((result) => result.confidence));
  const disagreementRate = obligations.length ? results.filter((result) => result.disagreement).length / obligations.length : 0;
  const uncertainty = clamp(1 - confidence + disagreementRate + (1 - coverage));
  const lowerBound = clamp(score - uncertaintyPenalty * uncertainty);
  const hardFailures = results.filter((result) => result.class === "A" && ["blocker", "major"].includes(result.severity) && result.implementation !== "full");
  return {
    score: round(score, 4),
    lowerBound: round(lowerBound, 4),
    coverage: round(coverage, 4),
    confidence: round(confidence, 4),
    uncertainty: round(uncertainty, 4),
    full: results.filter((result) => result.implementation === "full").length,
    partial: results.filter((result) => result.implementation === "partial").length,
    none: results.filter((result) => result.implementation === "none").length,
    unknown: results.filter((result) => result.implementation === "unknown").length,
    hardFailures,
    results
  };
}

export function evaluateImplementationAudit(intent, candidate, evidence, policy = {}) {
  const commitments = Array.isArray(candidate?.commitments) ? candidate.commitments : [];
  const principles = Array.isArray(intent?.principles) ? intent.principles : [];
  const settings = {
    enabled: policy.enabled ?? (commitments.length > 0 || principles.length > 0),
    thinkingFidelityFloor: policy.thinkingFidelityFloor ?? 0.8,
    principleAdherenceFloor: policy.principleAdherenceFloor ?? 0.85,
    minimumCoverage: policy.minimumCoverage ?? 1,
    uncertaintyPenalty: policy.uncertaintyPenalty ?? 0.18,
    requireCommitments: policy.requireCommitments ?? true,
    requirePrinciples: policy.requirePrinciples ?? true
  };
  const thinking = evaluateSet(commitments, evidence, candidateCommitmentRef, settings.uncertaintyPenalty);
  const adherence = evaluateSet(principles, evidence, intentPrincipleRef, settings.uncertaintyPenalty);
  const failures = [];
  if (settings.enabled) {
    if (settings.requireCommitments && !commitments.length) failures.push("candidate commitments are missing");
    if (settings.requirePrinciples && !principles.length) failures.push("intent principles are missing");
    if (commitments.length && thinking.lowerBound < settings.thinkingFidelityFloor) failures.push(`thinking fidelity ${thinking.lowerBound} is below ${settings.thinkingFidelityFloor}`);
    if (principles.length && adherence.lowerBound < settings.principleAdherenceFloor) failures.push(`principle adherence ${adherence.lowerBound} is below ${settings.principleAdherenceFloor}`);
    if (commitments.length && thinking.coverage < settings.minimumCoverage) failures.push(`thinking-fidelity coverage ${thinking.coverage} is below ${settings.minimumCoverage}`);
    if (principles.length && adherence.coverage < settings.minimumCoverage) failures.push(`principle-adherence coverage ${adherence.coverage} is below ${settings.minimumCoverage}`);
    if (thinking.hardFailures.length) failures.push(`${thinking.hardFailures.length} hard candidate commitment${thinking.hardFailures.length === 1 ? "" : "s"} not fully implemented`);
    if (adherence.hardFailures.length) failures.push(`${adherence.hardFailures.length} hard intent principle${adherence.hardFailures.length === 1 ? "" : "s"} not fully implemented`);
  }
  return {
    enabled: settings.enabled,
    eligible: !settings.enabled || failures.length === 0,
    settings,
    thinkingFidelity: thinking,
    principleAdherence: adherence,
    failures
  };
}
