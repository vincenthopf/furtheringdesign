import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import {
  aggregateEvidence,
  candidateDistance,
  createDesignPacket,
  createRevisionPlan,
  evaluateRun,
  renderEvaluationMarkdown,
  validateCandidate,
  validateEvidence,
  validateIntent,
  validateRun
} from "../runtime/index.mjs";

const { run } = await import("../examples/saas-launch/fixture.mjs");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("validates a complete intent", () => {
  const result = validateIntent(run.intent);
  assert.equal(result.valid, true, result.errors.join("\n"));
});

test("rejects conflicting degrees of freedom", () => {
  const intent = clone(run.intent);
  intent.freedoms.open.push(intent.freedoms.forbidden[0]);
  const result = validateIntent(intent);
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /conflicts/);
});

test("rejects invalid secondary audience and risk contracts", () => {
  const intent = clone(run.intent);
  intent.tasks.secondary[0].actorId = "unknown-audience";
  intent.risks[0].severity = "catastrophic";
  const result = validateIntent(intent);
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /unknown audience/);
  assert.match(result.errors.join("\n"), /risk.*severity/i);
});

test("requires complete known state coverage and diff-only changes", () => {
  const candidate = clone(run.candidates[0].manifest);
  candidate.supportedStates.pop();
  candidate.supportedStates.push("unregistered-state");
  candidate.changeContract.patchMode = "replace-file";
  const result = validateCandidate(candidate, run.intent);
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /missing intent states/);
  assert.match(result.errors.join("\n"), /unknown intent states/);
  assert.match(result.errors.join("\n"), /diff-only/);
});

test("detects near-clone directions", () => {
  const original = run.candidates[0].manifest;
  const cloneCandidate = clone(original);
  cloneCandidate.id = "clone";
  cloneCandidate.title = "Clone";
  assert.ok(candidateDistance(original, cloneCandidate) < 0.1);
});

test("validates state-grounded evidence and warns on unweighted signals", () => {
  const record = clone(run.candidates[0]);
  record.evidence.signals.push({
    ...record.evidence.signals[0],
    id: "signal-unweighted",
    dimension: "ornamentDensity"
  });
  const result = validateEvidence(record.evidence, run.intent, record.manifest);
  assert.equal(result.valid, true, result.errors.join("\n"));
  assert.match(result.warnings.join("\n"), /unweighted dimension/);
});

test("unknown signals do not masquerade as resolved quality evidence", () => {
  const evidence = clone(run.candidates[0].evidence);
  for (const signal of evidence.signals) {
    if (signal.dimension === "maintainability") signal.status = "unknown";
  }
  const result = aggregateEvidence(evidence, run.intent.success.qualityProfile, run.policy);
  assert.ok(result.missingDimensions.includes("maintainability"));
  assert.ok(result.unknownSignals.some((id) => id.includes("maintain")));
  assert.equal(result.eligible, false);
});

test("unresolved hard obligations block eligibility even when the dimension has other passing evidence", () => {
  const evidence = clone(run.candidates[0].evidence);
  evidence.signals.push({
    ...evidence.signals[0],
    id: "signal-legal-unknown",
    class: "A",
    status: "unknown",
    severity: "major",
    dimension: "intentAlignment",
    normalized: 0.5
  });
  const result = aggregateEvidence(evidence, run.intent.success.qualityProfile, run.policy);
  assert.equal(result.eligible, false);
  assert.equal(result.unresolvedHardObligations.length, 1);
});

test("selects the eligible Pareto-efficient direction and blocks unsafe novelty", () => {
  const report = evaluateRun(run);
  assert.equal(report.status, "selected");
  assert.equal(report.selectedCandidateId, "signal-foundry");
  assert.equal(report.recommendedCandidateId, "signal-foundry");
  const kinetic = report.rankedCandidates.find((candidate) => candidate.id === "kinetic-lab");
  assert.equal(kinetic.eligible, false);
  assert.ok(kinetic.hardFailures.length >= 2);
});

test("returns human review instead of false selection for a narrow policy margin", () => {
  const uncertain = clone(run);
  uncertain.policy.reviewMargin = 1;
  const report = evaluateRun(uncertain);
  assert.equal(report.status, "human-review");
  assert.equal(report.selectedCandidateId, null);
  assert.equal(report.recommendedCandidateId, "signal-foundry");
  assert.match(report.reason, /margin/);
});

test("blocks a run when every candidate fails a hard gate", () => {
  const blocked = clone(run);
  for (const record of blocked.candidates) {
    record.evidence.signals[0].class = "A";
    record.evidence.signals[0].status = "fail";
    record.evidence.signals[0].severity = "blocker";
    record.evidence.signals[0].normalized = 0.1;
  }
  const report = evaluateRun(blocked);
  assert.equal(report.status, "blocked");
  assert.equal(report.selectedCandidateId, null);
});

test("renders selection details and per-dimension evidence", () => {
  const markdown = renderEvaluationMarkdown(evaluateRun(run));
  assert.match(markdown, /Status:\*\* selected/);
  assert.match(markdown, /Selected candidate:\*\* `signal-foundry`/);
  assert.match(markdown, /Recommended-candidate evidence/);
  assert.match(markdown, /intentAlignment/);
});

test("generates a six-phase design packet", () => {
  const packet = createDesignPacket(run.intent);
  assert.deepEqual(Object.keys(packet), [
    "intent.normalized.json",
    "01-frame.md",
    "02-directions.md",
    "03-build.md",
    "04-critique.md",
    "05-select.md",
    "06-revise.md"
  ]);
  assert.match(packet["03-build.md"], /immutable baseline/);
});

test("creates bounded repair plans and forks structurally misaligned candidates", () => {
  const safePlan = createRevisionPlan(run, { candidateId: "safe-grid" });
  assert.equal(safePlan.status, "ready");
  assert.equal(safePlan.changeMode, "bounded-patch");
  assert.ok(safePlan.items.some((item) => item.dimension === "distinctiveness"));
  const kineticPlan = createRevisionPlan(run, { candidateId: "kinetic-lab" });
  assert.equal(kineticPlan.changeMode, "fork-candidate");
  assert.equal(kineticPlan.items[0].class, "A");
});

test("rejects unsafe selection policy, unknown severity, and unrelated pairwise winners", () => {
  const invalid = clone(run);
  invalid.policy.selectionWeights = { evidence: 0.9, pairwise: 0.9, diversity: 0.9 };
  invalid.policy.hardGateSeverities.push("catastrophic");
  invalid.pairwise[0].winner = "kinetic-lab";
  const result = validateRun(invalid);
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /sum to 1/);
  assert.match(result.errors.join("\n"), /unknown severity/);
  assert.match(result.errors.join("\n"), /winner must be left, right, or null/);
});

test("ships parseable JSON schemas", async () => {
  const directory = new URL("../runtime/schemas/", import.meta.url);
  const files = (await readdir(directory)).filter((name) => name.endsWith(".json"));
  assert.ok(files.length >= 5);
  for (const file of files) JSON.parse(await readFile(new URL(file, directory), "utf8"));
});
