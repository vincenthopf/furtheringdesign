import { evaluateRun } from "./tournament.mjs";
import { clamp, round } from "./util.mjs";

const severityPriority = { blocker: 100, major: 70, minor: 35, note: 10 };
const classPriority = { A: 45, B: 20, C: 15 };

function priorityFor(signal, weight) {
  const statusPriority = signal.status === "fail" ? 35 : signal.status === "unknown" ? 15 : 0;
  const qualityGap = (1 - clamp(signal.normalized)) * 25;
  return round((severityPriority[signal.severity] ?? 0) + (classPriority[signal.class] ?? 0) + statusPriority + weight * 30 + qualityGap + signal.confidence * 5, 2);
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
  const items = selectedSignals
    .map((signal) => ({
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
    }))
    .sort((left, right) => right.priority - left.priority)
    .slice(0, limit);

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

  items.sort((left, right) => right.priority - left.priority);
  const structuralMisalignment = record.evidence.signals.some(
    (signal) => signal.dimension === "intentAlignment" && signal.status === "fail" && signal.normalized < 0.65
  );
  const changeMode = structuralMisalignment ? "fork-candidate" : "bounded-patch";
  const affectedStates = [...new Set(items.map((item) => item.stateRef).filter(Boolean))];
  const affectedDimensions = [...new Set(items.map((item) => item.dimension).filter(Boolean))];

  return {
    status: items.length ? "ready" : "no-op",
    candidateId,
    changeMode,
    reason: items.length
      ? structuralMisalignment
        ? "Intent misalignment is structural; preserve the original and create a new candidate."
        : "Apply the smallest coherent patch that addresses the highest-priority evidence without changing the thesis."
      : "No signal falls below the revision threshold.",
    thesis: record.manifest.direction.thesis,
    changeContract: record.manifest.changeContract,
    items: items.slice(0, limit),
    evidenceToRecollect: {
      states: affectedStates,
      dimensions: affectedDimensions
    },
    stopConditions: [
      "Stop and fork a new candidate if the direction thesis changes.",
      "Stop if the patch touches a protected path.",
      "Stop if a repaired dimension creates a new hard failure or quality-floor failure.",
      "Re-evaluate every affected state before accepting the patch."
    ]
  };
}
