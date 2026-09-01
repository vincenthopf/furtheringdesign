import assert from "node:assert/strict";
import test from "node:test";
import {
  candidateCommitmentRef,
  evaluateImplementationAudit,
  intentPrincipleRef,
  validateCandidateCommitments,
  validateIntentPrinciples,
  validateSignalObligations
} from "../runtime/lib/fidelity.mjs";
import {
  candidateRenderedDistance,
  evaluateRenderedDiversity,
  renderProfileDistance,
  validateRenderProfiles
} from "../runtime/lib/rendered-diversity.mjs";

const states = [{ id: "desktop" }, { id: "mobile" }];
const obligation = (id, className = "B") => ({
  id,
  statement: `Implement ${id}`,
  class: className,
  dimension: "hierarchy",
  severity: className === "A" ? "major" : "minor",
  stateRefs: ["desktop", "mobile"],
  verification: `Verify ${id}`
});
const signal = (id, stateRef, ref, implementation, status = "pass") => ({
  id,
  stateRef,
  obligationRefs: [ref],
  implementation,
  status,
  normalized: implementation === "full" ? 1 : implementation === "partial" ? 0.6 : 0,
  confidence: 0.95
});
const profile = (candidateId, stateRef, layout, palette, typography, density) => ({
  browser: "chromium",
  stateRef,
  artifactRef: candidateId,
  vectors: { layout, palette, typography, density }
});
const record = (id, profiles) => ({ manifest: { id }, evidence: { renderProfiles: profiles } });

test("validates explicit intent principles and candidate commitments", () => {
  assert.equal(validateIntentPrinciples([obligation("navigation")], states).valid, true);
  assert.equal(validateCandidateCommitments([obligation("composition")], ["desktop", "mobile"]).valid, true);
  const invalid = validateCandidateCommitments([obligation("composition")], ["desktop"]);
  assert.equal(invalid.valid, false);
  assert.match(invalid.errors.join("\n"), /unknown state: mobile/);
});

test("requires implementation classifications when evidence references obligations", () => {
  const result = validateSignalObligations({ obligationRefs: ["candidate:hero"] }, "signals[0]");
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /implementation/);
});

test("scores thinking fidelity and principle adherence across every required state", () => {
  const intent = { principles: [obligation("task", "A")] };
  const candidate = { commitments: [obligation("hero")] };
  const evidence = {
    signals: [
      signal("hero-desktop", "desktop", candidateCommitmentRef("hero"), "full"),
      signal("hero-mobile", "mobile", candidateCommitmentRef("hero"), "full"),
      signal("task-desktop", "desktop", intentPrincipleRef("task"), "full"),
      signal("task-mobile", "mobile", intentPrincipleRef("task"), "full")
    ]
  };
  const audit = evaluateImplementationAudit(intent, candidate, evidence, {
    enabled: true,
    thinkingFidelityFloor: 0.8,
    principleAdherenceFloor: 0.8,
    minimumCoverage: 1
  });
  assert.equal(audit.eligible, true);
  assert.equal(audit.thinkingFidelity.score, 1);
  assert.equal(audit.principleAdherence.score, 1);
});

test("blocks design theater when rationale is missing from one state", () => {
  const intent = { principles: [obligation("task", "A")] };
  const candidate = { commitments: [obligation("hero")] };
  const evidence = {
    signals: [
      signal("hero-desktop", "desktop", candidateCommitmentRef("hero"), "full"),
      signal("task-desktop", "desktop", intentPrincipleRef("task"), "full"),
      signal("task-mobile", "mobile", intentPrincipleRef("task"), "full")
    ]
  };
  const audit = evaluateImplementationAudit(intent, candidate, evidence, { enabled: true, minimumCoverage: 1 });
  assert.equal(audit.eligible, false);
  assert.equal(audit.thinkingFidelity.unknown, 1);
  assert.match(audit.failures.join("\n"), /coverage/);
});

test("treats a partially implemented hard principle as a hard failure", () => {
  const intent = { principles: [obligation("task", "A")] };
  const candidate = { commitments: [obligation("hero")] };
  const evidence = {
    signals: [
      signal("hero-desktop", "desktop", candidateCommitmentRef("hero"), "full"),
      signal("hero-mobile", "mobile", candidateCommitmentRef("hero"), "full"),
      signal("task-desktop", "desktop", intentPrincipleRef("task"), "full"),
      signal("task-mobile", "mobile", intentPrincipleRef("task"), "partial")
    ]
  };
  const audit = evaluateImplementationAudit(intent, candidate, evidence, { enabled: true, minimumCoverage: 1 });
  assert.equal(audit.eligible, false);
  assert.equal(audit.principleAdherence.hardFailures.length, 1);
});

test("validates bounded render fingerprints", () => {
  const profiles = [profile("alpha", "desktop", [0.5, 0.5], [0.2, 0.8], [0.4, 0.6], [0.2, 0.7])];
  assert.equal(validateRenderProfiles(profiles, new Set(["desktop"]), "alpha").valid, true);
  const invalid = structuredClone(profiles);
  invalid[0].vectors.layout[0] = 2;
  assert.equal(validateRenderProfiles(invalid, new Set(["desktop"]), "alpha").valid, false);
});

test("computes multi-axis rendered distance instead of lexical manifest distance", () => {
  const left = profile("alpha", "desktop", [1, 0], [1, 0], [1, 0], [0.2, 0.2]);
  const right = profile("beta", "desktop", [0, 1], [0, 1], [0, 1], [0.8, 0.8]);
  const distance = renderProfileDistance(left, right);
  assert.ok(distance.distance > 0.8);
  assert.equal(distance.coverage, 1);
});

test("detects rendered direction collapse even when manifests use different prose", () => {
  const alpha = record("alpha", [
    profile("alpha", "desktop", [0.5, 0.5], [0.4, 0.6], [0.3, 0.7], [0.5, 0.5]),
    profile("alpha", "mobile", [0.7, 0.3], [0.4, 0.6], [0.4, 0.6], [0.6, 0.4])
  ]);
  const beta = record("beta", [
    profile("beta", "desktop", [0.51, 0.49], [0.39, 0.61], [0.31, 0.69], [0.51, 0.49]),
    profile("beta", "mobile", [0.69, 0.31], [0.41, 0.59], [0.39, 0.61], [0.59, 0.41])
  ]);
  const gamma = record("gamma", [
    profile("gamma", "desktop", [0.1, 0.9], [0.9, 0.1], [0.8, 0.2], [0.1, 0.9]),
    profile("gamma", "mobile", [0.2, 0.8], [0.85, 0.15], [0.75, 0.25], [0.2, 0.8])
  ]);
  const result = evaluateRenderedDiversity([alpha, beta, gamma], 0.08, { minimumCoverage: 1 });
  assert.equal(result.available, true);
  assert.ok(result.collapsedPairs.some((pair) => pair.left === "alpha" && pair.right === "beta"));
  assert.ok(result.scores.gamma > result.scores.alpha);
});

test("reports incomplete profile coverage instead of silently accepting it", () => {
  const alpha = record("alpha", [profile("alpha", "desktop", [1, 0], [1, 0], [1, 0], [1, 0])]);
  const beta = record("beta", [
    profile("beta", "desktop", [0, 1], [0, 1], [0, 1], [0, 1]),
    profile("beta", "mobile", [0, 1], [0, 1], [0, 1], [0, 1])
  ]);
  const pair = candidateRenderedDistance(alpha, beta);
  assert.equal(pair.coverage, 0.5);
  const result = evaluateRenderedDiversity([alpha, beta], 0.1, { minimumCoverage: 1 });
  assert.equal(result.available, true);
  assert.equal(result.insufficientCoveragePairs.length, 1);
});

test("validates bounded executable obligation checks", () => {
  const automated = obligation("overflow");
  automated.automation = { source: "playwright", metric: "outline.horizontalOverflowPx", operator: "eq", expected: 0 };
  assert.equal(validateIntentPrinciples([automated], states).valid, true);
  automated.automation.operator = "run-code";
  const invalid = validateIntentPrinciples([automated], states);
  assert.equal(invalid.valid, false);
  assert.match(invalid.errors.join("\n"), /automation.operator/);
});

test("implementation classifications must agree with signal status", () => {
  const result = validateSignalObligations({ obligationRefs: ["candidate:hero"], implementation: "full", status: "fail" }, "signals[0]");
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /full requires status pass/);
});
