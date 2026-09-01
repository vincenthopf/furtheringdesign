import { clamp, duplicateValues, isRecord, mean, numberInRange, requiredArray, requiredString, round } from "./util.mjs";

const pairKey = (left, right) => [left, right].sort().join("::");

function voteKey(comparison, index) {
  return `${pairKey(comparison.left, comparison.right)}::${comparison.evaluatorId || `legacy-${index}`}`;
}

function validateStringArray(value, path, errors, minimum = 0) {
  requiredArray(value, path, errors, minimum);
  if (!Array.isArray(value)) return;
  value.forEach((item, index) => requiredString(item, `${path}[${index}]`, errors));
}

export function validatePairwiseComparisons(comparisons, candidateRecords, policy = {}, intent = null) {
  const errors = [];
  const warnings = [];
  if (!Array.isArray(comparisons)) return { valid: false, errors: ["pairwise must be an array"], warnings };
  const candidateIds = candidateRecords.map((record) => record?.manifest?.id).filter(Boolean);
  const knownIds = new Set(candidateIds);
  const artifactRefs = new Map(candidateRecords.map((record) => [record?.manifest?.id, record?.manifest?.artifactRef]).filter(([id]) => id));
  const knownCriteria = new Set(Object.keys(intent?.success?.qualityProfile?.weights ?? {}));
  const voteKeys = [];
  comparisons.forEach((comparison, index) => {
    const path = `pairwise[${index}]`;
    if (!isRecord(comparison)) {
      errors.push(`${path} must be an object`);
      return;
    }
    if (!knownIds.has(comparison.left)) errors.push(`${path}.left references unknown candidate: ${comparison.left}`);
    if (!knownIds.has(comparison.right)) errors.push(`${path}.right references unknown candidate: ${comparison.right}`);
    if (comparison.left === comparison.right) errors.push(`${path} must compare different candidates`);
    if (comparison.winner !== null && comparison.winner !== comparison.left && comparison.winner !== comparison.right) errors.push(`${path}.winner must be left, right, or null`);
    numberInRange(comparison.confidence, `${path}.confidence`, errors);
    requiredString(comparison.rationale, `${path}.rationale`, errors);
    if (comparison.evaluatorId !== undefined) requiredString(comparison.evaluatorId, `${path}.evaluatorId`, errors);
    if (comparison.source !== undefined) requiredString(comparison.source, `${path}.source`, errors);
    if (policy.required) {
      requiredString(comparison.evaluatorId, `${path}.evaluatorId`, errors);
      requiredString(comparison.source, `${path}.source`, errors);
    }
    if (comparison.independent !== undefined && typeof comparison.independent !== "boolean") errors.push(`${path}.independent must be boolean`);
    if (comparison.preferenceProfileId !== undefined) requiredString(comparison.preferenceProfileId, `${path}.preferenceProfileId`, errors);
    if (comparison.leftArtifactRef !== undefined) requiredString(comparison.leftArtifactRef, `${path}.leftArtifactRef`, errors);
    if (comparison.rightArtifactRef !== undefined) requiredString(comparison.rightArtifactRef, `${path}.rightArtifactRef`, errors);
    if (comparison.leftArtifactRef && artifactRefs.get(comparison.left) && comparison.leftArtifactRef !== artifactRefs.get(comparison.left)) errors.push(`${path}.leftArtifactRef must match ${comparison.left} artifactRef`);
    if (comparison.rightArtifactRef && artifactRefs.get(comparison.right) && comparison.rightArtifactRef !== artifactRefs.get(comparison.right)) errors.push(`${path}.rightArtifactRef must match ${comparison.right} artifactRef`);
    if (comparison.criteria !== undefined) {
      validateStringArray(comparison.criteria, `${path}.criteria`, errors, 1);
      for (const criterion of comparison.criteria) {
        if (knownCriteria.size && !knownCriteria.has(criterion)) errors.push(`${path}.criteria references unknown quality dimension: ${criterion}`);
      }
    }
    if (comparison.evidenceRefs !== undefined) validateStringArray(comparison.evidenceRefs, `${path}.evidenceRefs`, errors, 1);
    if (!comparison.evaluatorId) warnings.push(`${path} has no evaluatorId; quorum independence cannot be verified`);
    if (!comparison.criteria?.length) warnings.push(`${path} has no intent-linked criteria`);
    if (!comparison.leftArtifactRef || !comparison.rightArtifactRef) warnings.push(`${path} is not bound to both candidate artifacts`);
    voteKeys.push(voteKey(comparison, index));
  });
  for (const duplicate of duplicateValues(voteKeys)) errors.push(`duplicate pairwise vote from one evaluator: ${duplicate}`);
  const uniquePairs = new Set(comparisons.filter(isRecord).map((comparison) => pairKey(comparison.left, comparison.right)));
  const expectedPairs = (candidateIds.length * (candidateIds.length - 1)) / 2;
  if (uniquePairs.size < expectedPairs) warnings.push(`pairwise coverage is incomplete: ${uniquePairs.size}/${expectedPairs}`);
  if (policy.requiredPreferenceProfiles !== undefined) validateStringArray(policy.requiredPreferenceProfiles, "policy.pairwiseAudit.requiredPreferenceProfiles", errors, 1);
  return { valid: errors.length === 0, errors, warnings, expectedPairs };
}

function entropy(distribution) {
  const values = Object.values(distribution).filter((value) => value > 0);
  if (values.length <= 1) return 0;
  const raw = -values.reduce((sum, value) => sum + value * Math.log(value), 0);
  return raw / Math.log(3);
}

export function evaluatePairwiseComparisons(candidateRecords, comparisons, policy = {}) {
  const candidateIds = candidateRecords.map((record) => record.manifest.id);
  const groups = new Map();
  comparisons.forEach((comparison, index) => {
    const key = pairKey(comparison.left, comparison.right);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ ...comparison, _index: index });
  });
  const settings = {
    required: policy.required ?? false,
    minimumEvaluators: policy.minimumEvaluators ?? 1,
    minimumIndependentEvaluators: policy.minimumIndependentEvaluators ?? 0,
    minimumIndependentSources: policy.minimumIndependentSources ?? 0,
    requireArtifactBinding: policy.requireArtifactBinding ?? false,
    requireCriteria: policy.requireCriteria ?? false,
    maximumDisagreement: policy.maximumDisagreement ?? 0.45,
    requiredPreferenceProfiles: Array.isArray(policy.requiredPreferenceProfiles) ? policy.requiredPreferenceProfiles : []
  };
  const numerator = Object.fromEntries(candidateIds.map((id) => [id, 0]));
  const denominator = Object.fromEntries(candidateIds.map((id) => [id, 0]));
  const pairs = [...groups.entries()].map(([key, votes]) => {
    const [left, right] = key.split("::");
    const totalWeight = votes.reduce((sum, vote) => sum + vote.confidence, 0);
    const weights = { left: 0, right: 0, tie: 0 };
    for (const vote of votes) {
      denominator[vote.left] += vote.confidence;
      denominator[vote.right] += vote.confidence;
      if (vote.winner === vote.left) {
        numerator[vote.left] += vote.confidence;
        weights[vote.left === left ? "left" : "right"] += vote.confidence;
      } else if (vote.winner === vote.right) {
        numerator[vote.right] += vote.confidence;
        weights[vote.right === right ? "right" : "left"] += vote.confidence;
      } else {
        numerator[vote.left] += vote.confidence * 0.5;
        numerator[vote.right] += vote.confidence * 0.5;
        weights.tie += vote.confidence;
      }
    }
    const distribution = totalWeight ? Object.fromEntries(Object.entries(weights).map(([name, value]) => [name, value / totalWeight])) : { left: 0, right: 0, tie: 0 };
    const evaluators = new Set(votes.map((vote) => vote.evaluatorId || `legacy-${vote._index}`));
    const independentEvaluators = new Set(votes.filter((vote) => vote.independent).map((vote) => vote.evaluatorId || `legacy-${vote._index}`));
    const independentSources = new Set(votes.filter((vote) => vote.independent).map((vote) => vote.source).filter(Boolean));
    const profiles = new Set(votes.map((vote) => vote.preferenceProfileId).filter(Boolean));
    const artifactBound = votes.every((vote) => Boolean(vote.leftArtifactRef && vote.rightArtifactRef));
    const criteriaBound = votes.every((vote) => Array.isArray(vote.criteria) && vote.criteria.length > 0);
    const disagreement = entropy(distribution);
    const failures = [];
    if (evaluators.size < settings.minimumEvaluators) failures.push(`evaluators ${evaluators.size}<${settings.minimumEvaluators}`);
    if (independentEvaluators.size < settings.minimumIndependentEvaluators) failures.push(`independent evaluators ${independentEvaluators.size}<${settings.minimumIndependentEvaluators}`);
    if (independentSources.size < settings.minimumIndependentSources) failures.push(`independent sources ${independentSources.size}<${settings.minimumIndependentSources}`);
    if (settings.requireArtifactBinding && !artifactBound) failures.push("artifact binding missing");
    if (settings.requireCriteria && !criteriaBound) failures.push("intent-linked criteria missing");
    for (const profile of settings.requiredPreferenceProfiles) {
      if (!profiles.has(profile)) failures.push(`preference profile missing: ${profile}`);
    }
    if (disagreement > settings.maximumDisagreement) failures.push(`disagreement ${round(disagreement, 4)}>${settings.maximumDisagreement}`);
    return {
      key,
      left,
      right,
      votes: votes.length,
      evaluators: evaluators.size,
      independentEvaluators: independentEvaluators.size,
      independentSources: independentSources.size,
      artifactBound,
      criteriaBound,
      preferenceProfiles: [...profiles],
      meanConfidence: round(mean(votes.map((vote) => vote.confidence)), 4),
      disagreement: round(disagreement, 4),
      distribution: Object.fromEntries(Object.entries(distribution).map(([name, value]) => [name, round(value, 4)])),
      failures
    };
  });
  const expectedPairs = (candidateIds.length * (candidateIds.length - 1)) / 2;
  const pairMap = new Map(pairs.map((pair) => [pair.key, pair]));
  const missingPairs = [];
  for (let leftIndex = 0; leftIndex < candidateIds.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < candidateIds.length; rightIndex += 1) {
      const key = pairKey(candidateIds[leftIndex], candidateIds[rightIndex]);
      if (!pairMap.has(key)) missingPairs.push(key);
    }
  }
  const scores = Object.fromEntries(candidateIds.map((id) => [id, denominator[id] ? round(numerator[id] / denominator[id], 4) : 0]));
  const failures = [
    ...missingPairs.map((key) => `${key}: missing comparison`),
    ...pairs.flatMap((pair) => pair.failures.map((failure) => `${pair.key}: ${failure}`))
  ];
  return {
    settings,
    scores,
    coverage: expectedPairs ? round(pairs.length / expectedPairs, 4) : 0,
    missingPairs,
    pairs,
    failures,
    eligible: !settings.required || failures.length === 0
  };
}

export function pairwiseSupportForCandidate(candidateId, audit) {
  const pairs = audit.pairs.filter((pair) => pair.left === candidateId || pair.right === candidateId);
  if (!pairs.length) return { confidence: 0, disagreement: 1, failures: ["no pairwise comparisons"] };
  return {
    confidence: round(mean(pairs.map((pair) => pair.meanConfidence * (1 - pair.disagreement))), 4),
    disagreement: round(mean(pairs.map((pair) => pair.disagreement)), 4),
    failures: pairs.flatMap((pair) => pair.failures.map((failure) => `${pair.key}: ${failure}`))
  };
}
