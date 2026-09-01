import { round } from "./util.mjs";

function escapeCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

export function renderEvaluationMarkdown(report) {
  const lines = ["# Furthering Design evaluation", "", `**Status:** ${report.status}`];
  if (report.selectedCandidateId) lines.push(`**Selected candidate:** \`${report.selectedCandidateId}\``);
  else if (report.recommendedCandidateId) lines.push(`**Recommended candidate:** \`${report.recommendedCandidateId}\``);
  if (report.reason) lines.push(`**Decision:** ${report.reason}`);
  if (report.diversity?.mode) lines.push(`**Direction-diversity evidence:** ${report.diversity.mode}`);
  if (Number.isInteger(report.diversity?.distinctCandidateCount)) lines.push(`**Distinct rendered directions:** ${report.diversity.distinctCandidateCount}`);
  lines.push("");

  if (report.validation?.warnings?.length) {
    lines.push("## Warnings", "");
    for (const warning of report.validation.warnings) lines.push(`- ${warning}`);
    lines.push("");
  }

  if (report.rankedCandidates?.length) {
    lines.push("## Candidate ranking", "");
    lines.push("| Candidate | Eligible | Pareto | Evidence | TFS | PAS | Task | Pairwise | Diversity | Mode | Uncertainty | Final | Gates |");
    lines.push("|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|---:|---|");
    for (const candidate of report.rankedCandidates) {
      const gates = [
        ...candidate.hardFailures.map((failure) => `${failure.id}: ${failure.severity}`),
        ...candidate.unresolvedHardObligations.map((failure) => `${failure.id}: unresolved ${failure.severity}`),
        ...candidate.floorFailures.map((failure) => `${failure.dimension} ${failure.actual}<${failure.floor}`),
        ...candidate.missingDimensions.map((dimension) => `${dimension}: missing`),
        ...candidate.auditFailures
      ];
      const thinking = candidate.implementationAudit?.enabled ? round(candidate.implementationAudit.thinkingFidelity.lowerBound, 3) : "off";
      const adherence = candidate.implementationAudit?.enabled ? round(candidate.implementationAudit.principleAdherence.lowerBound, 3) : "off";
      const task = candidate.workflowAudit?.enabled ? `${round(candidate.workflowAudit.score, 3)}/${round(candidate.workflowAudit.coverage, 3)}` : "off";
      lines.push(`| \`${escapeCell(candidate.id)}\` | ${candidate.eligible ? "yes" : "no"} | ${candidate.pareto ? "yes" : "no"} | ${round(candidate.evidenceScore, 3)} | ${thinking} | ${adherence} | ${task} | ${round(candidate.pairwiseScore, 3)} | ${round(candidate.diversityScore, 3)} | ${escapeCell(candidate.diversityMode)} | ${round(candidate.uncertainty, 3)} | ${round(candidate.finalScore, 3)} | ${escapeCell(gates.join("; ") || "clear")} |`);
    }
    lines.push("");
  }

  const recommended = report.rankedCandidates?.find((candidate) => candidate.id === (report.selectedCandidateId ?? report.recommendedCandidateId));
  if (recommended) {
    lines.push("## Recommended-candidate evidence", "");
    lines.push("| Dimension | Mean | Lower bound | Confidence | Disagreement | Signals |");
    lines.push("|---|---:|---:|---:|---:|---:|");
    for (const [dimension, result] of Object.entries(recommended.dimensions)) {
      lines.push(`| ${escapeCell(dimension)} | ${round(result.mean, 3)} | ${round(result.lowerBound, 3)} | ${round(result.confidence, 3)} | ${round(result.disagreement, 3)} | ${result.signalCount} |`);
    }
    lines.push("");
    if (recommended.implementationAudit?.enabled) {
      const thinking = recommended.implementationAudit.thinkingFidelity;
      const adherence = recommended.implementationAudit.principleAdherence;
      lines.push("## Implementation audit", "");
      lines.push(`- Thinking Fidelity Score: ${round(thinking.score, 3)}; conservative lower bound ${round(thinking.lowerBound, 3)}; coverage ${round(thinking.coverage, 3)}.`);
      lines.push(`- Principle Adherence Score: ${round(adherence.score, 3)}; conservative lower bound ${round(adherence.lowerBound, 3)}; coverage ${round(adherence.coverage, 3)}.`);
      lines.push("");
      const unresolved = [...thinking.results, ...adherence.results].filter((result) => result.implementation !== "full");
      if (unresolved.length) {
        lines.push("Unresolved implementation obligations:", "");
        for (const result of unresolved) lines.push(`- \`${result.ref}\`: ${result.implementation}; ${result.statement}`);
        lines.push("");
      }
    }
    if (recommended.workflowAudit?.enabled) {
      lines.push("## Workflow audit", "");
      lines.push(`- Completion: ${round(recommended.workflowAudit.score, 3)}; coverage ${round(recommended.workflowAudit.coverage, 3)}.`);
      for (const result of recommended.workflowAudit.results) {
        const failed = result.runs.flatMap((run) => run.failedSteps.map((step) => `${run.browser}:${step}`));
        lines.push(`- \`${result.id}\`: score ${round(result.score, 3)}, coverage ${round(result.coverage, 3)}${failed.length ? `, failed ${failed.join(", ")}` : ""}.`);
      }
      lines.push("");
    }
    if (recommended.unknownSignals?.length) {
      lines.push("Unresolved signals:", "");
      for (const signalId of recommended.unknownSignals) lines.push(`- \`${signalId}\``);
      lines.push("");
    }
  }

  if (report.pairwiseAudit) {
    lines.push("## Pairwise audit", "");
    lines.push(`- Pair coverage: ${round(report.pairwiseAudit.coverage, 3)}.`);
    for (const pair of report.pairwiseAudit.pairs) {
      lines.push(`- \`${pair.key}\`: ${pair.evaluators} evaluator${pair.evaluators === 1 ? "" : "s"}, ${pair.independentSources} independent source${pair.independentSources === 1 ? "" : "s"}, confidence ${round(pair.meanConfidence, 3)}, disagreement ${round(pair.disagreement, 3)}${pair.failures.length ? `, failures: ${pair.failures.join("; ")}` : ""}.`);
    }
    lines.push("");
  }

  if (report.selection?.reviewReasons?.length) {
    lines.push("## Human-review triggers", "");
    for (const reason of report.selection.reviewReasons) lines.push(`- ${reason}`);
    lines.push("");
  }

  if (report.diversity?.collapsedPairs?.length) {
    lines.push("## Direction collapse", "");
    for (const pair of report.diversity.collapsedPairs) lines.push(`- \`${pair.left}\` and \`${pair.right}\`: ${report.diversity.mode} distance ${pair.distance}`);
    lines.push("");
  }

  if (report.diversity?.rendered?.insufficientCoveragePairs?.length) {
    lines.push("## Render-profile coverage", "");
    for (const pair of report.diversity.rendered.insufficientCoveragePairs) lines.push(`- \`${pair.left}\` and \`${pair.right}\`: ${pair.sharedProfiles}/${pair.expectedProfiles} shared profiles, coverage ${pair.coverage}.`);
    lines.push("");
  }

  if (report.status === "invalid") {
    lines.push("## Validation errors", "");
    for (const error of report.validation.errors) lines.push(`- ${error}`);
    lines.push("");
  }

  return `${lines.join("\n").trim()}\n`;
}
