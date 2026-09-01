import { round } from "./util.mjs";

function escapeCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

export function renderEvaluationMarkdown(report) {
  const lines = ["# Furthering Design evaluation", "", `**Status:** ${report.status}`];
  if (report.selectedCandidateId) lines.push(`**Selected candidate:** \`${report.selectedCandidateId}\``);
  if (report.reason) lines.push(`**Decision:** ${report.reason}`);
  lines.push("");

  if (report.validation?.warnings?.length) {
    lines.push("## Warnings", "");
    for (const warning of report.validation.warnings) lines.push(`- ${warning}`);
    lines.push("");
  }

  if (report.rankedCandidates?.length) {
    lines.push("## Candidate ranking", "");
    lines.push("| Candidate | Eligible | Pareto | Evidence | Pairwise | Diversity | Uncertainty | Final | Gates |");
    lines.push("|---|---:|---:|---:|---:|---:|---:|---:|---|");
    for (const candidate of report.rankedCandidates) {
      const gates = [
        ...candidate.hardFailures.map((failure) => `${failure.id}: ${failure.severity}`),
        ...candidate.floorFailures.map((failure) => `${failure.dimension} ${failure.actual}<${failure.floor}`),
        ...candidate.missingDimensions.map((dimension) => `${dimension}: missing`)
      ];
      lines.push(`| \`${escapeCell(candidate.id)}\` | ${candidate.eligible ? "yes" : "no"} | ${candidate.pareto ? "yes" : "no"} | ${round(candidate.evidenceScore, 3)} | ${round(candidate.pairwiseScore, 3)} | ${round(candidate.diversityScore, 3)} | ${round(candidate.uncertainty, 3)} | ${round(candidate.finalScore, 3)} | ${escapeCell(gates.join("; ") || "clear")} |`);
    }
    lines.push("");
  }

  if (report.diversity?.collapsedPairs?.length) {
    lines.push("## Direction collapse", "");
    for (const pair of report.diversity.collapsedPairs) lines.push(`- \`${pair.left}\` and \`${pair.right}\`: distance ${pair.distance}`);
    lines.push("");
  }

  if (report.status === "invalid") {
    lines.push("## Validation errors", "");
    for (const error of report.validation.errors) lines.push(`- ${error}`);
    lines.push("");
  }

  return `${lines.join("\n").trim()}\n`;
}
