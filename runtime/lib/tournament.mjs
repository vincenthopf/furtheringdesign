import { evaluateDiversity, validateCandidate } from "./candidate.mjs";
import { aggregateEvidence, validateEvidence } from "./evidence.mjs";
import { evaluateImplementationAudit } from "./fidelity.mjs";
import { evaluatePairwiseComparisons, pairwiseSupportForCandidate, validatePairwiseComparisons } from "./pairwise.mjs";
import { validateIntent } from "./intent.mjs";
import { evaluateRenderedDiversity } from "./rendered-diversity.mjs";
import { evaluateWorkflowAudit } from "./workflow.mjs";
import { clamp, duplicateValues, isRecord, numberInRange, requiredString, round } from "./util.mjs";

const hardGateSeverities = new Set(["blocker", "major", "minor", "note"]);
function validateImplementationPolicy(value, errors) {
  if (value === undefined) return;
  if (!isRecord(value)) {
    errors.push("policy.implementationAudit must be an object");
    return;
  }
  for (const field of ["enabled", "requireCommitments", "requirePrinciples"]) {
    if (value[field] !== undefined && typeof value[field] !== "boolean") errors.push(`policy.implementationAudit.${field} must be boolean`);
  }
  for (const field of ["thinkingFidelityFloor", "principleAdherenceFloor", "minimumCoverage", "uncertaintyPenalty"]) {
    if (value[field] !== undefined) numberInRange(value[field], `policy.implementationAudit.${field}`, errors);
  }
}

function validateRenderedDiversityPolicy(value, errors) {
  if (value === undefined) return;
  if (!isRecord(value)) {
    errors.push("policy.renderedDiversity must be an object");
    return;
  }
  if (value.required !== undefined && typeof value.required !== "boolean") errors.push("policy.renderedDiversity.required must be boolean");
  if (value.minimumDistinctCandidates !== undefined && (!Number.isInteger(value.minimumDistinctCandidates) || value.minimumDistinctCandidates < 2 || value.minimumDistinctCandidates > 20)) errors.push("policy.renderedDiversity.minimumDistinctCandidates must be an integer between 2 and 20");
  if (value.requiredBrowsers !== undefined) {
    if (!Array.isArray(value.requiredBrowsers) || !value.requiredBrowsers.length) errors.push("policy.renderedDiversity.requiredBrowsers must contain at least one browser");
    else {
      const allowed = new Set(["chromium", "firefox", "webkit", "other"]);
      for (const browser of value.requiredBrowsers) if (!allowed.has(browser)) errors.push(`policy.renderedDiversity.requiredBrowsers contains unknown browser: ${browser}`);
      for (const duplicate of duplicateValues(value.requiredBrowsers)) errors.push(`policy.renderedDiversity.requiredBrowsers contains duplicate browser: ${duplicate}`);
    }
  }
  for (const field of ["floor", "minimumCoverage"]) {
    if (value[field] !== undefined) numberInRange(value[field], `policy.renderedDiversity.${field}`, errors);
  }
  if (value.weights !== undefined) {
    if (!isRecord(value.weights)) {
      errors.push("policy.renderedDiversity.weights must be an object");
    } else {
      let total = 0;
      for (const key of ["layout", "palette", "typography", "density"]) {
        numberInRange(value.weights[key], `policy.renderedDiversity.weights.${key}`, errors);
        if (typeof value.weights[key] === "number") total += value.weights[key];
      }
      if (Math.abs(total - 1) > 0.01) errors.push(`policy.renderedDiversity.weights must sum to 1, received ${round(total, 4)}`);
    }
  }
}

function validateWorkflowPolicy(value, errors) {
  if (value === undefined) return;
  if (!isRecord(value)) {
    errors.push("policy.workflowAudit must be an object");
    return;
  }
  for (const field of ["enabled", "required"]) {
    if (value[field] !== undefined && typeof value[field] !== "boolean") errors.push(`policy.workflowAudit.${field} must be boolean`);
  }
  for (const field of ["minimumCoverage", "completionFloor"]) {
    if (value[field] !== undefined) numberInRange(value[field], `policy.workflowAudit.${field}`, errors);
  }
  if (value.requiredBrowsers !== undefined) {
    if (!Array.isArray(value.requiredBrowsers) || !value.requiredBrowsers.length) errors.push("policy.workflowAudit.requiredBrowsers must contain at least one browser");
    else {
      const allowed = new Set(["chromium", "firefox", "webkit", "other"]);
      for (const browser of value.requiredBrowsers) if (!allowed.has(browser)) errors.push(`policy.workflowAudit.requiredBrowsers contains unknown browser: ${browser}`);
      for (const duplicate of duplicateValues(value.requiredBrowsers)) errors.push(`policy.workflowAudit.requiredBrowsers contains duplicate browser: ${duplicate}`);
    }
  }
}

function validatePairwisePolicy(value, errors) {
  if (value === undefined) return;
  if (!isRecord(value)) {
    errors.push("policy.pairwiseAudit must be an object");
    return;
  }
  for (const field of ["required", "requireArtifactBinding", "requireCriteria"]) {
    if (value[field] !== undefined && typeof value[field] !== "boolean") errors.push(`policy.pairwiseAudit.${field} must be boolean`);
  }
  for (const field of ["minimumEvaluators", "minimumIndependentEvaluators", "minimumIndependentSources"]) {
    if (value[field] !== undefined && (!Number.isInteger(value[field]) || value[field] < 0 || value[field] > 10)) errors.push(`policy.pairwiseAudit.${field} must be an integer between 0 and 10`);
  }
  if (value.minimumEvaluators === 0) errors.push("policy.pairwiseAudit.minimumEvaluators must be at least 1");
  if (value.minimumIndependentEvaluators !== undefined && value.minimumEvaluators !== undefined && value.minimumIndependentEvaluators > value.minimumEvaluators) errors.push("policy.pairwiseAudit.minimumIndependentEvaluators cannot exceed minimumEvaluators");
  if (value.minimumIndependentSources !== undefined && value.minimumEvaluators !== undefined && value.minimumIndependentSources > value.minimumEvaluators) errors.push("policy.pairwiseAudit.minimumIndependentSources cannot exceed minimumEvaluators");
  if (value.maximumDisagreement !== undefined) numberInRange(value.maximumDisagreement, "policy.pairwiseAudit.maximumDisagreement", errors);
}

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
    if (run.policy.requireBoundEvidence !== undefined && typeof run.policy.requireBoundEvidence !== "boolean") errors.push("policy.requireBoundEvidence must be boolean");
    if (run.policy.requireCaptureHashes !== undefined && typeof run.policy.requireCaptureHashes !== "boolean") errors.push("policy.requireCaptureHashes must be boolean");
    validateImplementationPolicy(run.policy.implementationAudit, errors);
    validateRenderedDiversityPolicy(run.policy.renderedDiversity, errors);
    validateWorkflowPolicy(run.policy.workflowAudit, errors);
    validatePairwisePolicy(run.policy.pairwiseAudit, errors);
    if (!Array.isArray(run.policy.hardGateSeverities) || !run.policy.hardGateSeverities.length) {
      errors.push("policy.hardGateSeverities must contain at least one severity");
    } else {
      for (const severity of run.policy.hardGateSeverities) {
        if (!hardGateSeverities.has(severity)) errors.push(`policy.hardGateSeverities contains unknown severity: ${severity}`);
      }
      for (const duplicate of duplicateValues(run.policy.hardGateSeverities)) errors.push(`policy.hardGateSeverities contains duplicate severity: ${duplicate}`);
    }
  }

  if (run.policy?.requireBoundEvidence) {
    candidateRecords.forEach((record, index) => {
      if (!record?.manifest?.artifactRef) errors.push(`candidates[${index}].manifest.artifactRef is required when policy.requireBoundEvidence is true`);
      if (!record?.evidence?.artifact?.ref) errors.push(`candidates[${index}].evidence.artifact.ref is required when policy.requireBoundEvidence is true`);
    });
  }
  if (run.policy?.requireCaptureHashes) {
    candidateRecords.forEach((record, index) => {
      for (const [captureIndex, capture] of (Array.isArray(record?.evidence?.captures) ? record.evidence.captures : []).entries()) {
        if (!capture.screenshotSha256) errors.push(`candidates[${index}].evidence.captures[${captureIndex}].screenshotSha256 is required when policy.requireCaptureHashes is true`);
        if (!capture.nodeMapSha256) errors.push(`candidates[${index}].evidence.captures[${captureIndex}].nodeMapSha256 is required when policy.requireCaptureHashes is true`);
      }
      for (const [workflowIndex, workflowRun] of (Array.isArray(record?.evidence?.workflowRuns) ? record.evidence.workflowRuns : []).entries()) {
        if (workflowRun.status === "pass" && !workflowRun.screenshotSha256) errors.push(`candidates[${index}].evidence.workflowRuns[${workflowIndex}].screenshotSha256 is required for passing workflows when policy.requireCaptureHashes is true`);
      }
    });
  }

  const pairwiseResult = validatePairwiseComparisons(run.pairwise, candidateRecords, run.policy?.pairwiseAudit ?? {}, intentResult.value);
  errors.push(...pairwiseResult.errors);
  warnings.push(...pairwiseResult.warnings);


  return { valid: errors.length === 0, errors, warnings, intent: intentResult.value };
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
  const manifestDiversity = evaluateDiversity(manifests, run.policy.diversityFloor);
  const renderedPolicy = run.policy.renderedDiversity ?? {};
  const renderedDiversity = evaluateRenderedDiversity(
    run.candidates,
    renderedPolicy.floor ?? run.policy.diversityFloor,
    {
      minimumCoverage: renderedPolicy.minimumCoverage ?? 1,
      requiredBrowsers: Array.isArray(renderedPolicy.requiredBrowsers) ? renderedPolicy.requiredBrowsers : [],
      weights: renderedPolicy.weights
    }
  );
  const diversity = renderedDiversity.available ? renderedDiversity : manifestDiversity;
  diversity.rendered = renderedDiversity;
  diversity.manifest = manifestDiversity;
  const pairwiseAudit = evaluatePairwiseComparisons(run.candidates, run.pairwise, run.policy.pairwiseAudit);
  const pairwise = pairwiseAudit.scores;
  const aggregated = run.candidates.map((record) => {
    const aggregation = aggregateEvidence(record.evidence, validation.intent.success.qualityProfile, run.policy);
    const implementationAudit = evaluateImplementationAudit(
      validation.intent,
      record.manifest,
      record.evidence,
      run.policy.implementationAudit
    );
    const workflowAudit = evaluateWorkflowAudit(
      validation.intent,
      record.manifest,
      record.evidence,
      run.policy.workflowAudit
    );
    return {
      id: record.manifest.id,
      title: record.manifest.title,
      manifest: record.manifest,
      aggregation,
      implementationAudit,
      workflowAudit,
      eligible: aggregation.eligible && implementationAudit.eligible && workflowAudit.eligible
    };
  });
  const eligible = aggregated.filter((candidate) => candidate.eligible);
  const dimensions = Object.keys(validation.intent.success.qualityProfile.weights);
  const frontier = paretoFrontier(eligible, dimensions);
  const frontierIds = new Set(frontier.map((candidate) => candidate.id));
  const selectionWeights = run.policy.selectionWeights;

  const rankedCandidates = aggregated
    .map((candidate) => {
      const diversityScore = diversity.scores[candidate.id] ?? 0;
      const finalScore = candidate.eligible
        ? selectionWeights.evidence * candidate.aggregation.evidenceScore
          + selectionWeights.pairwise * pairwise[candidate.id]
          + selectionWeights.diversity * diversityScore
        : 0;
      return {
        id: candidate.id,
        title: candidate.title,
        eligible: candidate.eligible,
        pareto: frontierIds.has(candidate.id),
        evidenceScore: candidate.aggregation.evidenceScore,
        pairwiseScore: pairwise[candidate.id],
        diversityScore,
        diversityMode: diversity.mode,
        uncertainty: candidate.aggregation.uncertainty,
        finalScore: round(finalScore, 4),
        hardFailures: candidate.aggregation.hardFailures,
        unresolvedHardObligations: candidate.aggregation.unresolvedHardObligations,
        floorFailures: candidate.aggregation.floorFailures,
        missingDimensions: candidate.aggregation.missingDimensions,
        unknownSignals: candidate.aggregation.unknownSignals,
        implementationAudit: candidate.implementationAudit,
        workflowAudit: candidate.workflowAudit,
        auditFailures: [...candidate.implementationAudit.failures, ...candidate.workflowAudit.failures],
        dimensions: candidate.aggregation.dimensions
      };
    })
    .sort((left, right) => right.finalScore - left.finalScore);

  if (!eligible.length) {
    return {
      status: "blocked",
      selectedCandidateId: null,
      recommendedCandidateId: null,
      reason: "No candidate passed hard gates, quality floors, implementation fidelity, workflow completion, unresolved obligations, and evidence coverage.",
      validation,
      rankedCandidates,
      diversity,
      pairwiseAudit
    };
  }

  const frontierRanking = rankedCandidates.filter((candidate) => candidate.pareto && candidate.eligible);
  const top = frontierRanking[0];
  const second = frontierRanking[1] ?? rankedCandidates.find((candidate) => candidate.eligible && candidate.id !== top.id);
  const margin = second ? top.finalScore - second.finalScore : 1;
  const pairwiseSupport = pairwiseSupportForCandidate(top.id, pairwiseAudit);
  const pairwiseConfidence = pairwiseSupport.confidence;
  const collapsed = diversity.collapsedPairs.some((pair) => pair.left === top.id || pair.right === top.id);
  const renderedCoverageFailure = renderedDiversity.insufficientCoveragePairs.some((pair) => pair.left === top.id || pair.right === top.id);
  const reviewReasons = [];
  if (margin < run.policy.reviewMargin) reviewReasons.push(`top-candidate margin ${round(margin, 4)} is below ${run.policy.reviewMargin}`);
  if (top.uncertainty > run.policy.maxUncertainty) reviewReasons.push(`uncertainty ${top.uncertainty} exceeds ${run.policy.maxUncertainty}`);
  if (pairwiseConfidence < 0.65) reviewReasons.push(`pairwise confidence after disagreement ${round(pairwiseConfidence, 4)} is below 0.65`);
  if (run.policy.pairwiseAudit?.required && !pairwiseAudit.eligible) reviewReasons.push(...pairwiseAudit.failures.map((failure) => `pairwise audit: ${failure}`));
  if (collapsed) reviewReasons.push(`top candidate is too similar to another direction under ${diversity.mode} evidence`);
  const minimumDistinctCandidates = renderedPolicy.minimumDistinctCandidates ?? Math.min(3, manifests.length);
  if (renderedPolicy.required && diversity.distinctCandidateCount < minimumDistinctCandidates) reviewReasons.push(`rendered search contains ${diversity.distinctCandidateCount} distinct direction${diversity.distinctCandidateCount === 1 ? "" : "s"}; at least ${minimumDistinctCandidates} are required`);
  if (renderedPolicy.required && !renderedDiversity.available) reviewReasons.push("rendered direction diversity is required but one or more candidate pairs have no shared render profiles");
  if (renderedPolicy.required && renderedCoverageFailure) reviewReasons.push("rendered direction diversity does not cover every required state and browser profile");
  const status = reviewReasons.length ? "human-review" : "selected";

  return {
    status,
    selectedCandidateId: status === "selected" ? top.id : null,
    recommendedCandidateId: top.id,
    reason: reviewReasons.length ? reviewReasons.join("; ") : "Top eligible candidate is Pareto-efficient, implementation-audited, and clears automatic-selection thresholds.",
    validation,
    rankedCandidates,
    diversity,
    pairwiseAudit,
    selection: {
      margin: round(clamp(margin), 4),
      pairwiseConfidence: round(pairwiseConfidence, 4),
      pairwiseDisagreement: pairwiseSupport.disagreement,
      reviewReasons
    }
  };
}
