import { evaluateRun } from "./tournament.mjs";
import { clamp, round } from "./util.mjs";

const severityPriority = { blocker: 100, major: 70, minor: 35, note: 10 };
const classPriority = { A: 45, B: 20, C: 15 };

function priorityFor(signal, weight) {
  const statusPriority = signal.status === "fail" ? 35 : signal.status === "unknown" ? 15 : 0;
  const qualityGap = (1 - clamp(signal.normalized)) * 25;
  return round((severityPriority[signal.severity] ?? 0) + (classPriority[signal.class] ?? 0) + statusPriority + weight * 30 + qualityGap + signal.confidence * 5, 2);
}

function implementationItems(ranking, weights) {
  const audit = ranking.implementationAudit;
  if (!audit?.enabled) return [];
  const results = [...audit.thinkingFidelity.results, ...audit.principleAdherence.results].filter((result) => result.implementation !== "full");
  return results.map((result) => {
    const unresolvedStates = result.states.filter((state) => state.implementation !== "full");
    return {
      type: "implementation-obligation",
      signalId: null,
      obligationRef: result.ref,
      priority: (severityPriority[result.severity] ?? 0) + (classPriority[result.class] ?? 0) + (weights[result.dimension] ?? 0) * 30 + (1 - result.score) * 35,
      class: result.class,
      severity: result.severity,
      dimension: result.dimension,
      stateRef: unresolvedStates[0]?.stateRef ?? null,
      nodeRef: "document",
      problem: `${result.ref} is ${result.implementation} rather than fully implemented.`,
      evidence: unresolvedStates.map((state) => `${state.stateRef}: ${state.implementation}${state.signalIds.length ? ` via ${state.signalIds.join(", ")}` : " with no linked evidence"}`).join("; "),
      recommendation: `Implement ${result.statement} in every required state and attach artifact-bound evidence to ${result.ref}.`,
      confidence: result.confidence,
      currentScore: result.score
    };
  });
}

function workflowItems(ranking, weights) {
  const audit = ranking.workflowAudit;
  if (!audit?.enabled) return [];
  return audit.results
    .filter((result) => result.score < 1 || result.coverage < 1)
    .flatMap((result) => result.runs.filter((run) => run.status !== "pass").map((run) => ({
      type: "workflow",
      signalId: null,
      workflowRef: result.id,
      priority: (severityPriority[result.severity] ?? 0) + (classPriority[result.class] ?? 0) + (weights[result.dimension] ?? 0) * 30 + 35,
      class: result.class,
      severity: result.severity,
      dimension: result.dimension,
      stateRef: null,
      browser: run.browser,
      nodeRef: "document",
      problem: `${result.title} is ${run.status} in ${run.browser}.`,
      evidence: run.failedSteps.length ? `Failed steps: ${run.failedSteps.join(", ")}.` : "No artifact-bound workflow result was captured.",
      recommendation: `Repair and rerun workflow ${result.id} in ${run.browser}.`,
      confidence: run.status === "unknown" ? 0 : 0.99,
      currentScore: run.status === "pass" ? 1 : 0
    })));
}

export function createRevisionPlan(run, options = {}) {
  const report = options.report ?? evaluateRun(run);
  const candidateId = options.candidateId ?? report.selectedCandidateId ?? report.recommendedCandidateId;
  const threshold = options.threshold ?? 0.85;
  const limit = options.limit ?? 10;
  if (report.status === "invalid") return { status: "invalid", candidateId: null, reason: report.reason, items: [] };
  if (!candidateId) return { status: "blocked", candidateId: null, reason: "No candidate is available for revision.", items: [] };

  const record = run.candidates.find((candidate) => candidate.manifest.id === candidateId);
  const ranking = report.rankedCandidates.find((candidate) => candidate.id === candidateId);
  if (!record || !ranking) return { status: "invalid", candidateId, reason: `Candidate ${candidateId} is not present in the evaluated run.`, items: [] };

  const weights = run.intent.success.qualityProfile.weights;
  const selectedSignals = record.evidence.signals.filter(
    (signal) => signal.status !== "pass" || signal.normalized < threshold || ranking.floorFailures.some((failure) => failure.dimension === signal.dimension)
  );
  const items = selectedSignals.map((signal) => ({
    type: "signal",
    signalId: signal.id,
    priority: priorityFor(signal, weights[signal.dimension] ?? 0),
    class: signal.class,
    severity: signal.severity,
    dimension: signal.dimension,
    stateRef: signal.stateRef,
    nodeRef: signal.nodeRef,
    problem: signal.rationale,
    evidence: signal.evidence,
    recommendation: signal.recommendation,
    confidence: signal.confidence,
    currentScore: signal.normalized
  }));

  items.push(...implementationItems(ranking, weights), ...workflowItems(ranking, weights));

  for (const dimension of ranking.missingDimensions) {
    items.push({
      type: "missing-evidence",
      signalId: null,
      priority: 160 + (weights[dimension] ?? 0) * 30,
      class: "A",
      severity: "major",
      dimension,
      stateRef: null,
      nodeRef: "document",
      problem: `No resolved evidence exists for weighted dimension ${dimension}.`,
      evidence: "The dimension is absent from the candidate evidence set or contains only unknown signals.",
      recommendation: `Collect deterministic, behavioural, or calibrated judgment evidence for ${dimension} before selection.`,
      confidence: 1,
      currentScore: null
    });
  }

  const unique = new Map();
  for (const item of items) {
    const key = item.signalId || item.obligationRef || `${item.type}:${item.workflowRef || item.dimension}:${item.browser || item.stateRef || "all"}`;
    const existing = unique.get(key);
    if (!existing || item.priority > existing.priority) unique.set(key, item);
  }
  const sortedItems = [...unique.values()].sort((left, right) => right.priority - left.priority);
  const structuralMisalignment = record.evidence.signals.some(
    (signal) => signal.dimension === "intentAlignment" && signal.status === "fail" && signal.normalized < 0.65
  ) || ranking.implementationAudit?.thinkingFidelity?.hardFailures?.some((failure) => failure.implementation === "none");
  const changeMode = structuralMisalignment ? "fork-candidate" : "bounded-patch";
  const limitedItems = sortedItems.slice(0, limit);
  const affectedStates = [...new Set(limitedItems.map((item) => item.stateRef).filter(Boolean))];
  const affectedDimensions = [...new Set(limitedItems.map((item) => item.dimension).filter(Boolean))];
  const affectedWorkflows = [...new Set(limitedItems.map((item) => item.workflowRef).filter(Boolean))];

  return {
    status: limitedItems.length ? "ready" : "no-op",
    candidateId,
    changeMode,
    reason: limitedItems.length
      ? structuralMisalignment
        ? "Intent or direction-commitment misalignment is structural; preserve the original and create a new candidate."
        : "Apply the smallest coherent patch that addresses the highest-priority evidence without changing the thesis."
      : "No signal or implementation obligation falls below the revision threshold.",
    thesis: record.manifest.direction.thesis,
    artifactRef: record.manifest.artifactRef ?? null,
    changeContract: record.manifest.changeContract,
    items: limitedItems,
    evidenceToRecollect: {
      states: affectedStates,
      dimensions: affectedDimensions,
      workflows: affectedWorkflows,
      invalidateArtifactBoundEvidence: limitedItems.length > 0,
      invalidatePairwiseComparisons: limitedItems.length > 0
    },
    stopConditions: [
      "Stop and fork a new candidate if the direction thesis changes.",
      "Stop if the patch touches a protected path.",
      "Stop if a repaired dimension creates a new hard failure or quality-floor failure.",
      "Assign a new artifact reference after any code change.",
      "Discard captures, workflow runs, implementation evidence, and pairwise judgments bound to the previous artifact.",
      "Re-evaluate every affected state and workflow before accepting the patch."
    ]
  };
}
