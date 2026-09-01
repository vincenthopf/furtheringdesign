import { evaluateDiversity, validateCandidate } from "./candidate.mjs";
import { aggregateEvidence, validateEvidence } from "./evidence.mjs";
import { validateIntent } from "./intent.mjs";
import { clamp, duplicateValues, isRecord, mean, numberInRange, requiredString, round } from "./util.mjs";

const hardGateSeverities = new Set(["blocker", "major", "minor", "note"]);
const pairKey = (left, right) => [left, right].sort().join("::");

export function validateRun(run) {
  const errors = [];
  const warnings = [];
  if (!isRecord(run)) return { valid: false, errors: ["run must be an object"], warnings };
  if (run.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  requiredString(run.id, "id", errors);

  const intentResult = validateIntent(run.intent);
  errors.push(...intentResult.errors.map((error) => `intent: ${error}`));
  warnings.push(...intentResult.warnings.map((warning) => `intent: ${warning}`));

  const candidateRecords = Array.isArray(run.candidates) ? run.candidates : [];
  if (candidateRecords.length < 3) errors.push("candidates must contain at least 3 candidate records");
  const candidateIds = [];
  for (const [index, record] of candidateRecords.entries()) {
    if (!isRecord(record)) {
      errors.push(`candidates[${index}] must be an object`);
      continue;
    }
    const candidateResult = validateCandidate(record.manifest, intentResult.value);
    errors.push(...candidateResult.errors.map((error) => `candidates[${index}].manifest: ${error}`));
    warnings.push(...candidateResult.warnings.map((warning) => `candidates[${index}].manifest: ${warning}`));
    const evidenceResult = validateEvidence(record.evidence, intentResult.value, record.manifest);
    errors.push(...evidenceResult.errors.map((error) => `candidates[${index}].evidence: ${error}`));
    warnings.push(...evidenceResult.warnings.map((warning) => `candidates[${index}].evidence: ${warning}`));
    if (record.manifest?.id) candidateIds.push(record.manifest.id);
  }
  for (const duplicate of duplicateValues(candidateIds)) errors.push(`candidate id must be unique: ${duplicate}`);

  if (!isRecord(run.policy)) {
    errors.push("policy must be an object");
  } else {
    if (!isRecord(run.policy.selectionWeights)) {
      errors.push("policy.selectionWeights must be an object");
    } else {
      let total = 0;
      for (const key of ["evidence", "pairwise", "diversity"]) {
        numberInRange(run.policy.selectionWeights[key], `policy.selectionWeights.${key}`, errors);
        if (typeof run.policy.selectionWeights[key] === "number") total += run.policy.selectionWeights[key];
      }
      if (Math.abs(total - 1) > 0.01) errors.push(`policy.selectionWeights must sum to 1, received ${round(total, 4)}`);
    }
    numberInRange(run.policy.diversityFloor, "policy.diversityFloor", errors);
    numberInRange(run.policy.uncertaintyPenalty, "policy.uncertaintyPenalty", errors);
    numberInRange(run.policy.reviewMargin, "policy.reviewMargin", errors);
    numberInRange(run.policy.maxUncertainty, "policy.maxUncertainty", errors);
    if (!Array.isArray(run.policy.hardGateSeverities) || !run.policy.hardGateSeverities.length) {
      errors.push("policy.hardGateSeverities must contain at least one severity");
    } else {
      for (const severity of run.policy.hardGateSeverities) {
        if (!hardGateSeverities.has(severity)) errors.push(`policy.hardGateSeverities contains unknown severity: ${severity}`);
      }
      for (const duplicate of duplicateValues(run.policy.hardGateSeverities)) errors.push(`policy.hardGateSeverities contains duplicate severity: ${duplicate}`);
    }
  }

  const pairwiseComparisons = Array.isArray(run.pairwise) ? run.pairwise : [];
  if (!Array.isArray(run.pairwise)) errors.push("pairwise must be an array");
  const knownIds = new Set(candidateIds);
  const comparisonKeys = [];
  for (const [index, comparison] of pairwiseComparisons.entries()) {
    if (!isRecord(comparison)) {
      errors.push(`pairwise[${index}] must be an object`);
      continue;
    }
    if (!knownIds.has(comparison.left)) errors.push(`pairwise[${index}].left references unknown candidate: ${comparison.left}`);
    if (!knownIds.has(comparison.right)) errors.push(`pairwise[${index}].right references unknown candidate: ${comparison.right}`);
    if (comparison.left === comparison.right) errors.push(`pairwise[${index}] must compare different candidates`);
    if (comparison.winner !== null && comparison.winner !== comparison.left && comparison.winner !== comparison.right) {
      errors.push(`pairwise[${index}].winner must be left, right, or null`);
    }
    numberInRange(comparison.confidence, `pairwise[${index}].confidence`, errors);
    requiredString(comparison.rationale, `pairwise[${index}].rationale`, errors);
    comparisonKeys.push(pairKey(comparison.left, comparison.right));
  }
  for (const duplicate of duplicateValues(comparisonKeys)) errors.push(`duplicate pairwise comparison: ${duplicate}`);
  const expectedPairs = (candidateIds.length * (candidateIds.length - 1)) / 2;
  if (comparisonKeys.length < expectedPairs) warnings.push(`pairwise coverage is incomplete: ${comparisonKeys.length}/${expectedPairs}`);

  return { valid: errors.length === 0, errors, warnings, intent: intentResult.value };
}

function pairwiseScores(candidateIds, comparisons) {
  const numerator = Object.fromEntries(candidateIds.map((id) => [id, 0]));
  const denominator = Object.fromEntries(candidateIds.map((id) => [id, 0]));
  for (const comparison of comparisons) {
    denominator[comparison.left] += comparison.confidence;
    denominator[comparison.right] += comparison.confidence;
    if (comparison.winner === comparison.left) numerator[comparison.left] += comparison.confidence;
    else if (comparison.winner === comparison.right) numerator[comparison.right] += comparison.confidence;
    else {
      numerator[comparison.left] += comparison.confidence * 0.5;
      numerator[comparison.right] += comparison.confidence * 0.5;
    }
  }
  return Object.fromEntries(candidateIds.map((id) => [id, denominator[id] ? round(numerator[id] / denominator[id], 4) : 0]));
}

function dominates(left, right, dimensions, epsilon = 0.0001) {
  let strictlyBetter = false;
  for (const dimension of dimensions) {
    const leftValue = left.aggregation.dimensions[dimension]?.lowerBound ?? 0;
    const rightValue = right.aggregation.dimensions[dimension]?.lowerBound ?? 0;
    if (leftValue + epsilon < rightValue) return false;
    if (leftValue > rightValue + epsilon) strictlyBetter = true;
  }
  return strictlyBetter;
}

function paretoFrontier(candidates, dimensions) {
  return candidates.filter((candidate) => !candidates.some((other) => other.id !== candidate.id && dominates(other, candidate, dimensions)));
}

export function evaluateRun(run) {
  const validation = validateRun(run);
  if (!validation.valid) {
    return {
      status: "invalid",
      selectedCandidateId: null,
      recommendedCandidateId: null,
      reason: "The run contract is invalid.",
      validation,
      rankedCandidates: [],
      diversity: null
    };
  }

  const manifests = run.candidates.map((record) => record.manifest);
  const diversity = evaluateDiversity(manifests, run.policy.diversityFloor);
  const pairwise = pairwiseScores(manifests.map((candidate) => candidate.id), run.pairwise);
  const aggregated = run.candidates.map((record) => ({
    id: record.manifest.id,
    title: record.manifest.title,
    manifest: record.manifest,
    aggregation: aggregateEvidence(record.evidence, validation.intent.success.qualityProfile, run.policy)
  }));
  const eligible = aggregated.filter((candidate) => candidate.aggregation.eligible);
  const dimensions = Object.keys(validation.intent.success.qualityProfile.weights);
  const frontier = paretoFrontier(eligible, dimensions);
  const frontierIds = new Set(frontier.map((candidate) => candidate.id));
  const selectionWeights = run.policy.selectionWeights;

  const rankedCandidates = aggregated
    .map((candidate) => {
      const diversityScore = diversity.scores[candidate.id] ?? 0;
      const finalScore = candidate.aggregation.eligible
        ? selectionWeights.evidence * candidate.aggregation.evidenceScore
          + selectionWeights.pairwise * pairwise[candidate.id]
          + selectionWeights.diversity * diversityScore
        : 0;
      return {
        id: candidate.id,
        title: candidate.title,
        eligible: candidate.aggregation.eligible,
        pareto: frontierIds.has(candidate.id),
        evidenceScore: candidate.aggregation.evidenceScore,
        pairwiseScore: pairwise[candidate.id],
        diversityScore,
        uncertainty: candidate.aggregation.uncertainty,
        finalScore: round(finalScore, 4),
        hardFailures: candidate.aggregation.hardFailures,
        unresolvedHardObligations: candidate.aggregation.unresolvedHardObligations,
        floorFailures: candidate.aggregation.floorFailures,
        missingDimensions: candidate.aggregation.missingDimensions,
        unknownSignals: candidate.aggregation.unknownSignals,
        dimensions: candidate.aggregation.dimensions
      };
    })
    .sort((left, right) => right.finalScore - left.finalScore);

  if (!eligible.length) {
    return {
      status: "blocked",
      selectedCandidateId: null,
      recommendedCandidateId: null,
      reason: "No candidate passed hard gates, quality floors, unresolved hard obligations, and evidence coverage.",
      validation,
      rankedCandidates,
      diversity
    };
  }

  const frontierRanking = rankedCandidates.filter((candidate) => candidate.pareto && candidate.eligible);
  const top = frontierRanking[0];
  const second = frontierRanking[1] ?? rankedCandidates.find((candidate) => candidate.eligible && candidate.id !== top.id);
  const margin = second ? top.finalScore - second.finalScore : 1;
  const topComparisons = run.pairwise.filter((comparison) => comparison.left === top.id || comparison.right === top.id);
  const pairwiseConfidence = topComparisons.length ? mean(topComparisons.map((comparison) => comparison.confidence)) : 0;
  const collapsed = diversity.collapsedPairs.some((pair) => pair.left === top.id || pair.right === top.id);
  const reviewReasons = [];
  if (margin < run.policy.reviewMargin) reviewReasons.push(`top-candidate margin ${round(margin, 4)} is below ${run.policy.reviewMargin}`);
  if (top.uncertainty > run.policy.maxUncertainty) reviewReasons.push(`uncertainty ${top.uncertainty} exceeds ${run.policy.maxUncertainty}`);
  if (pairwiseConfidence < 0.65) reviewReasons.push(`pairwise confidence ${round(pairwiseConfidence, 4)} is below 0.65`);
  if (collapsed) reviewReasons.push("top candidate is too similar to another direction");
  const status = reviewReasons.length ? "human-review" : "selected";

  return {
    status,
    selectedCandidateId: status === "selected" ? top.id : null,
    recommendedCandidateId: top.id,
    reason: reviewReasons.length ? reviewReasons.join("; ") : "Top eligible candidate is Pareto-efficient and clears automatic-selection thresholds.",
    validation,
    rankedCandidates,
    diversity,
    selection: {
      margin: round(clamp(margin), 4),
      pairwiseConfidence: round(pairwiseConfidence, 4),
      reviewReasons
    }
  };
}
