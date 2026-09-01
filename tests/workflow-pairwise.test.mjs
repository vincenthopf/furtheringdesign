import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluatePairwiseComparisons,
  evaluateWorkflowAudit,
  validatePairwiseComparisons,
  validateWorkflowRuns,
  validateWorkflows
} from "../runtime/index.mjs";

const state = { id: "desktop", viewport: { width: 1280, height: 800 }, colorScheme: "light", reducedMotion: false, locale: "en-AU" };
const workflow = {
  id: "submit-primary",
  title: "Submit the primary request",
  actorId: "user",
  class: "A",
  severity: "major",
  dimension: "taskClarity",
  startStateRef: "desktop",
  browsers: ["chromium", "firefox"],
  obligationRefs: ["intent:primary-action"],
  steps: [
    { id: "email", action: "fill", locator: { by: "label", value: "Work email" }, value: "person@example.com" },
    { id: "submit", action: "click", locator: { by: "role", value: "button", name: "Request evaluation" } }
  ],
  assertions: [
    { id: "success", kind: "visible", locator: { by: "text", value: "Request received" } }
  ]
};
const candidate = { id: "alpha", artifactRef: "git:alpha", supportedWorkflows: ["submit-primary"] };
const run = (browser, status) => ({
  id: `submit-primary-${browser}`,
  workflowRef: "submit-primary",
  browser,
  stateRef: "desktop",
  artifactRef: "git:alpha",
  status,
  durationMs: 30,
  steps: [
    { id: "email", status: "pass", nodeRef: "input:Work email", evidence: "filled", durationMs: 5 },
    { id: "submit", status: status === "pass" ? "pass" : "fail", nodeRef: "button:Request evaluation", evidence: "executed", durationMs: 5 }
  ],
  assertions: [{ id: "success", status: status === "pass" ? "pass" : "fail", nodeRef: "text:Request received", evidence: "checked", durationMs: 20 }]
});

test("validates semantic workflows and rejects arbitrary actions", () => {
  const result = validateWorkflows([workflow], [{ id: "user" }], [state], new Set(["intent:primary-action"]));
  assert.equal(result.valid, true, result.errors.join("\n"));
  const unsafe = structuredClone(workflow);
  unsafe.steps[0].action = "evaluateJavaScript";
  const unsafeResult = validateWorkflows([unsafe], [{ id: "user" }], [state], new Set(["intent:primary-action"]));
  assert.equal(unsafeResult.valid, false);
  assert.match(unsafeResult.errors.join("\n"), /action must be one of/);
});

test("workflow audit requires the primary journey to pass in every declared browser", () => {
  const intent = { workflows: [workflow] };
  const evidence = { captures: [{ browser: "chromium" }, { browser: "firefox" }], workflowRuns: [run("chromium", "pass"), run("firefox", "pass")] };
  const validation = validateWorkflowRuns(evidence.workflowRuns, [workflow], candidate, "git:alpha");
  assert.equal(validation.valid, true, validation.errors.join("\n"));
  const pass = evaluateWorkflowAudit(intent, candidate, evidence, { enabled: true, required: true, minimumCoverage: 1, completionFloor: 1 });
  assert.equal(pass.eligible, true);
  const broken = structuredClone(evidence);
  broken.workflowRuns[1].status = "fail";
  broken.workflowRuns[1].assertions[0].status = "fail";
  const fail = evaluateWorkflowAudit(intent, candidate, broken, { enabled: true, required: true, minimumCoverage: 1, completionFloor: 1 });
  assert.equal(fail.eligible, false);
  assert.equal(fail.hardFailures.length, 1);
});


test("workflow runs cannot claim success with missing steps", () => {
  const incomplete = run("chromium", "pass");
  incomplete.steps = incomplete.steps.filter((step) => step.id !== "email");
  const validation = validateWorkflowRuns([incomplete], [workflow], candidate, "git:alpha");
  assert.equal(validation.valid, false);
  assert.match(validation.errors.join("\n"), /missing result ids: email/);
  assert.match(validation.errors.join("\n"), /conflicts with result status unknown/);
});

const candidates = ["alpha", "beta", "gamma"].map((id) => ({ manifest: { id, artifactRef: `git:${id}` } }));
function vote(left, right, winner, evaluatorId, confidence = 0.9) {
  return {
    left,
    right,
    winner,
    confidence,
    rationale: `${winner} better serves the declared hierarchy.`,
    evaluatorId,
    source: evaluatorId === "judge-1" ? "model-family-a" : "model-family-b",
    independent: true,
    leftArtifactRef: `git:${left}`,
    rightArtifactRef: `git:${right}`,
    criteria: ["hierarchy"],
    evidenceRefs: [`${left}:desktop`, `${right}:desktop`]
  };
}
const comparisons = [
  vote("alpha", "beta", "alpha", "judge-1"),
  vote("alpha", "beta", "alpha", "judge-2"),
  vote("alpha", "gamma", "alpha", "judge-1"),
  vote("alpha", "gamma", "alpha", "judge-2"),
  vote("beta", "gamma", "beta", "judge-1"),
  vote("beta", "gamma", "beta", "judge-2")
];
const policy = { required: true, minimumEvaluators: 2, minimumIndependentEvaluators: 2, minimumIndependentSources: 2, requireArtifactBinding: true, requireCriteria: true, maximumDisagreement: 0.45 };

test("pairwise quorum accepts independent artifact-bound judgments", () => {
  const validation = validatePairwiseComparisons(comparisons, candidates, policy);
  assert.equal(validation.valid, true, validation.errors.join("\n"));
  const result = evaluatePairwiseComparisons(candidates, comparisons, policy);
  assert.equal(result.eligible, true, result.failures.join("\n"));
  assert.ok(result.scores.alpha > result.scores.beta);
});


test("pairwise quorum rejects evaluator aliases from one source", () => {
  const aliases = structuredClone(comparisons);
  for (const comparison of aliases) comparison.source = "same-model-source";
  const result = evaluatePairwiseComparisons(candidates, aliases, policy);
  assert.equal(result.eligible, false);
  assert.ok(result.failures.some((failure) => failure.includes("independent sources")));
});

test("pairwise quorum exposes disagreement instead of averaging it away", () => {
  const conflict = structuredClone(comparisons);
  conflict[1].winner = "beta";
  const result = evaluatePairwiseComparisons(candidates, conflict, policy);
  assert.equal(result.eligible, false);
  assert.ok(result.failures.some((failure) => failure.includes("disagreement")));
});

test("pairwise validation rejects stale artifact comparisons", () => {
  const stale = structuredClone(comparisons);
  stale[0].leftArtifactRef = "git:old-alpha";
  const result = validatePairwiseComparisons(stale, candidates, policy);
  assert.equal(result.valid, false);
  assert.match(result.errors.join("\n"), /must match alpha artifactRef/);
});
