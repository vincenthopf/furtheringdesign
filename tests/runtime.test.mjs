import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { candidateDistance, createDesignPacket, evaluateRun, validateCandidate, validateIntent, validateRun } from "../runtime/index.mjs";

const run = JSON.parse(await readFile(new URL("../examples/saas-launch/run.json", import.meta.url), "utf8"));

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

test("requires complete state coverage and diff-only changes", () => {
  const candidate = clone(run.candidates[0].manifest);
  candidate.supportedStates.pop();
  candidate.changeContract.patchMode = "replace-file";
  const result = validateCandidate(candidate, run.intent);
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /missing intent states/);
  assert.match(result.errors.join("\n"), /diff-only/);
});

test("detects near-clone directions", () => {
  const original = run.candidates[0].manifest;
  const cloneCandidate = clone(original);
  cloneCandidate.id = "clone";
  cloneCandidate.title = "Clone";
  assert.ok(candidateDistance(original, cloneCandidate) < 0.1);
});

test("selects the eligible Pareto-efficient direction and blocks unsafe novelty", () => {
  const report = evaluateRun(run);
  assert.equal(report.status, "selected");
  assert.equal(report.selectedCandidateId, "signal-foundry");
  const kinetic = report.rankedCandidates.find((candidate) => candidate.id === "kinetic-lab");
  assert.equal(kinetic.eligible, false);
  assert.ok(kinetic.hardFailures.length >= 2);
});

test("generates a five-phase design packet", () => {
  const packet = createDesignPacket(run.intent);
  assert.deepEqual(Object.keys(packet), [
    "intent.normalized.json",
    "01-frame.md",
    "02-directions.md",
    "03-build.md",
    "04-critique.md",
    "05-select.md"
  ]);
  assert.match(packet["03-build.md"], /immutable baseline/);
});

test("rejects unsafe selection policy and unrelated pairwise winners", () => {
  const invalid = clone(run);
  invalid.policy.selectionWeights = { evidence: 0.9, pairwise: 0.9, diversity: 0.9 };
  invalid.pairwise[0].winner = "kinetic-lab";
  const result = validateRun(invalid);
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /sum to 1/);
  assert.match(result.errors.join("\n"), /winner must be left, right, or null/);
});

test("malformed array fields return validation errors instead of throwing", () => {
  const intent = clone(run.intent);
  intent.audiences = "not-an-array";
  intent.states = { desktop: true };
  const result = validateIntent(intent);
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /audiences must contain/);
  assert.match(result.errors.join("\n"), /states must contain/);
});

test("unknown evidence does not contribute to a quality score", async () => {
  const { aggregateEvidence } = await import("../runtime/index.mjs");
  const result = aggregateEvidence(
    {
      signals: [
        {
          id: "unknown-only",
          class: "B",
          dimension: "accessibility",
          source: "manual-review-pending",
          status: "unknown",
          normalized: 1,
          confidence: 1,
          severity: "note",
          stateRef: "desktop-light",
          nodeRef: "document",
          evidence: "Not reviewed",
          rationale: "No evidence exists yet",
          recommendation: "Review it"
        }
      ]
    },
    { weights: { accessibility: 1 }, floors: {}, uncertaintyPenalty: 0.18 }
  );
  assert.equal(result.evidenceScore, 0);
  assert.deepEqual(result.missingDimensions, ["accessibility"]);
  assert.equal(result.eligible, false);
});
