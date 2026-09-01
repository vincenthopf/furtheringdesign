import assert from "node:assert/strict";
import test from "node:test";
import { evaluateRun, renderEvaluationMarkdown, validateRun } from "../runtime/index.mjs";
import { createRevisionPlan } from "../runtime/lib/revision.mjs";

const clone = (value) => JSON.parse(JSON.stringify(value));
const digest = (character) => character.repeat(64);
const states = [
  { id: "desktop", viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: false, locale: "en-AU" },
  { id: "mobile", viewport: { width: 390, height: 844 }, colorScheme: "light", reducedMotion: true, locale: "en-AU" }
];
const obligation = (id, className, dimension, severity = "minor") => ({ id, statement: `Implement ${id}`, class: className, dimension, severity, stateRefs: states.map((state) => state.id), verification: `Verify ${id}` });
const intent = {
  schemaVersion: "1.0.0",
  id: "intent",
  title: "Audited UI",
  scope: { level: "page", surface: "web", parentIntentId: null },
  outcome: { problem: "Users cannot act", desiredChange: "Users act", antiGoals: ["Hide the task"] },
  audiences: [{ id: "user", label: "User", context: "Under pressure", needs: ["Clarity"], anxieties: [], capabilities: [] }],
  tasks: { primary: { actorId: "user", action: "complete", object: "task", completionSignal: "success appears" }, secondary: [] },
  brand: { values: [{ name: "clarity", expression: "Direct", avoid: "Noise" }], voice: ["direct"], distinctiveAssets: [], referencePolicy: "original-only" },
  experience: { emotionalRegister: ["calm"], density: "balanced", familiarity: "familiar", motion: "bounded", hierarchy: "one action" },
  success: {
    criteria: [{ id: "completion", signal: "completion", direction: "increase", target: "90%", weight: 1 }],
    qualityProfile: { weights: { accessibility: 0.5, hierarchy: 0.5 }, floors: { accessibility: 0.8 }, uncertaintyPenalty: 0.1 }
  },
  constraints: { hard: [{ id: "a11y", category: "accessibility", statement: "Accessible", verification: "axe" }], soft: [] },
  freedoms: { fixed: ["task"], open: ["composition"], forbidden: ["hidden task"] },
  states,
  principles: [obligation("task-visible", "A", "hierarchy", "major")],
  workflows: [{
    id: "primary-task",
    title: "Complete the primary task",
    actorId: "user",
    class: "A",
    severity: "major",
    dimension: "hierarchy",
    startStateRef: "desktop",
    browsers: ["chromium"],
    obligationRefs: ["intent:task-visible"],
    steps: [{ id: "activate", action: "click", locator: { by: "role", value: "button", name: "Complete" } }],
    assertions: [{ id: "success", kind: "visible", locator: { by: "text", value: "Success" } }]
  }],
  content: { sourceOfTruth: "fixture", missingPolicy: "fail", claimsRequireEvidence: false },
  risks: [],
  assumptions: [],
  openQuestions: []
};

function manifest(id, title) {
  return {
    schemaVersion: "1.0.0",
    id,
    intentId: "intent",
    title,
    artifactRef: `${id}-sha`,
    direction: {
      thesis: `${title} creates a defensible, materially distinct interface structure for the primary task and tested states.`,
      axes: {
        composition: `${title} composition`, typography: `${title} typography`, spatialRhythm: `${title} rhythm`, surface: `${title} surface`, imagery: `${title} imagery`, interaction: `${title} interaction`, voice: `${title} voice`
      },
      deliberateTradeoffs: ["Tradeoff"],
      rejectedPatterns: ["Generic grid"]
    },
    tokens: { unit: 4 },
    structure: { pattern: `${id}-pattern`, sections: ["one", "two"] },
    decisions: [{ question: "How?", option: title, rationale: "Intent", tradeoffs: ["Tradeoff"] }],
    commitments: [obligation("decision-visible", "B", "hierarchy")],
    changeContract: { baselineRef: "base", allowedPaths: ["src/**"], protectedPaths: ["infra/**"], patchMode: "diff-only" },
    supportedStates: states.map((state) => state.id),
    supportedWorkflows: ["primary-task"]
  };
}

function profile(id, stateRef, value) {
  return {
    browser: "chromium",
    stateRef,
    artifactRef: `${id}-sha`,
    vectors: {
      layout: [value, 1 - value],
      palette: [value, 1 - value],
      typography: [value, 1 - value],
      density: [value, 1 - value]
    }
  };
}

function evidence(id, score, profileValue, taskImplementation = "full") {
  const signals = [];
  for (const state of states) {
    signals.push({ id: `${id}-${state.id}-a11y`, class: "A", dimension: "accessibility", source: "axe", status: "pass", normalized: score, confidence: 0.95, severity: "note", stateRef: state.id, nodeRef: "document", evidence: "pass", rationale: "pass", recommendation: "retain" });
    signals.push({ id: `${id}-${state.id}-hierarchy`, class: "B", dimension: "hierarchy", source: "layout", status: "pass", normalized: score, confidence: 0.9, severity: "note", stateRef: state.id, nodeRef: "main", evidence: "pass", rationale: "pass", recommendation: "retain", obligationRefs: ["candidate:decision-visible"], implementation: "full" });
    signals.push({ id: `${id}-${state.id}-task`, class: "A", dimension: "hierarchy", source: "workflow", status: taskImplementation === "none" ? "fail" : "pass", normalized: taskImplementation === "full" ? 1 : 0, confidence: 0.95, severity: taskImplementation === "full" ? "note" : "major", stateRef: state.id, nodeRef: "main", evidence: "task", rationale: "task", recommendation: "fix", obligationRefs: ["intent:task-visible"], implementation: taskImplementation });
  }
  return {
    schemaVersion: "1.0.0",
    candidateId: id,
    artifact: { ref: `${id}-sha`, capturedAt: "2026-09-02T00:00:00.000Z", tool: "fixture" },
    captures: states.map((state) => ({ browser: "chromium", stateRef: state.id, url: `https://example.invalid/${id}`, viewport: state.viewport, screenshotSha256: digest("a"), nodeMapSha256: digest("b") })),
    renderProfiles: states.map((state) => profile(id, state.id, profileValue)),
    workflowRuns: [{
      id: `${id}-primary-task-chromium`,
      workflowRef: "primary-task",
      browser: "chromium",
      stateRef: "desktop",
      artifactRef: `${id}-sha`,
      status: taskImplementation === "none" ? "fail" : "pass",
      durationMs: 42,
      ...(taskImplementation === "full" ? { screenshotSha256: digest("c") } : {}),
      steps: [{ id: "activate", status: taskImplementation === "none" ? "fail" : "pass", nodeRef: "button:Complete", evidence: "executed", durationMs: 20 }],
      assertions: [{ id: "success", status: taskImplementation === "none" ? "fail" : "pass", nodeRef: "text:Success", evidence: "checked", durationMs: 22 }]
    }],
    signals
  };
}

const run = {
  schemaVersion: "1.0.0",
  id: "run",
  intent,
  policy: {
    selectionWeights: { evidence: 0.75, pairwise: 0.2, diversity: 0.05 },
    diversityFloor: 0.15,
    uncertaintyPenalty: 0.1,
    reviewMargin: 0.02,
    maxUncertainty: 0.3,
    hardGateSeverities: ["blocker", "major"],
    requireBoundEvidence: true,
    requireCaptureHashes: true,
    implementationAudit: { enabled: true, requireCommitments: true, requirePrinciples: true, thinkingFidelityFloor: 0.8, principleAdherenceFloor: 0.8, minimumCoverage: 1, uncertaintyPenalty: 0.1 },
    renderedDiversity: { required: true, floor: 0.15, minimumCoverage: 1, minimumDistinctCandidates: 3, requiredBrowsers: ["chromium"], weights: { layout: 0.4, palette: 0.2, typography: 0.2, density: 0.2 } },
    workflowAudit: { enabled: true, required: true, minimumCoverage: 1, completionFloor: 1, requiredBrowsers: ["chromium"] },
    pairwiseAudit: { required: true, minimumEvaluators: 2, minimumIndependentEvaluators: 2, minimumIndependentSources: 2, requireArtifactBinding: true, requireCriteria: true, maximumDisagreement: 0.45 }
  },
  candidates: [
    { manifest: manifest("alpha", "Alpha"), evidence: evidence("alpha", 0.96, 0.95) },
    { manifest: manifest("beta", "Beta"), evidence: evidence("beta", 0.85, 0.5) },
    { manifest: manifest("gamma", "Gamma"), evidence: evidence("gamma", 0.99, 0.1, "none") }
  ],
  pairwise: [
    { left: "alpha", right: "beta", winner: "alpha", confidence: 0.9, rationale: "Alpha", evaluatorId: "judge-1", source: "independent-visual-review", independent: true, leftArtifactRef: "alpha-sha", rightArtifactRef: "beta-sha", criteria: ["hierarchy"], evidenceRefs: ["alpha:desktop", "beta:desktop"] },
    { left: "alpha", right: "beta", winner: "alpha", confidence: 0.86, rationale: "Alpha", evaluatorId: "judge-2", source: "independent-task-review", independent: true, leftArtifactRef: "alpha-sha", rightArtifactRef: "beta-sha", criteria: ["hierarchy"], evidenceRefs: ["alpha:mobile", "beta:mobile"] },
    { left: "alpha", right: "gamma", winner: "alpha", confidence: 0.95, rationale: "Gamma fails", evaluatorId: "judge-1", source: "independent-visual-review", independent: true, leftArtifactRef: "alpha-sha", rightArtifactRef: "gamma-sha", criteria: ["accessibility"], evidenceRefs: ["alpha:desktop", "gamma:desktop"] },
    { left: "alpha", right: "gamma", winner: "alpha", confidence: 0.94, rationale: "Gamma fails", evaluatorId: "judge-2", source: "independent-task-review", independent: true, leftArtifactRef: "alpha-sha", rightArtifactRef: "gamma-sha", criteria: ["hierarchy"], evidenceRefs: ["alpha:mobile", "gamma:mobile"] },
    { left: "beta", right: "gamma", winner: "beta", confidence: 0.9, rationale: "Gamma fails", evaluatorId: "judge-1", source: "independent-visual-review", independent: true, leftArtifactRef: "beta-sha", rightArtifactRef: "gamma-sha", criteria: ["accessibility"], evidenceRefs: ["beta:desktop", "gamma:desktop"] },
    { left: "beta", right: "gamma", winner: "beta", confidence: 0.87, rationale: "Gamma fails", evaluatorId: "judge-2", source: "independent-task-review", independent: true, leftArtifactRef: "beta-sha", rightArtifactRef: "gamma-sha", criteria: ["hierarchy"], evidenceRefs: ["beta:mobile", "gamma:mobile"] }
  ]
};

test("strict run validates", () => {
  const result = validateRun(run);
  assert.equal(result.valid, true, result.errors.join("\n"));
});

test("selection rejects unimplemented rationale and uses rendered diversity", () => {
  const report = evaluateRun(run);
  assert.equal(report.status, "selected");
  assert.equal(report.selectedCandidateId, "alpha");
  assert.equal(report.diversity.mode, "rendered");
  const gamma = report.rankedCandidates.find((candidate) => candidate.id === "gamma");
  assert.equal(gamma.eligible, false);
  assert.ok(gamma.auditFailures.some((failure) => failure.includes("principle")));
});

test("required rendered diversity falls back safely to human review when profiles are absent", () => {
  const incomplete = clone(run);
  for (const candidate of incomplete.candidates) delete candidate.evidence.renderProfiles;
  const report = evaluateRun(incomplete);
  assert.equal(report.status, "human-review");
  assert.equal(report.diversity.mode, "manifest");
  assert.match(report.reason, /rendered direction diversity is required/);
});

test("report exposes fidelity, adherence, and rendered diversity mode", () => {
  const markdown = renderEvaluationMarkdown(evaluateRun(run));
  assert.match(markdown, /Thinking Fidelity Score/);
  assert.match(markdown, /Principle Adherence Score/);
  assert.match(markdown, /Direction-diversity evidence:\*\* rendered/);
});


test("revision planning invalidates stale artifact evidence", () => {
  const report = evaluateRun(run);
  const plan = createRevisionPlan(run, { report, candidateId: "gamma" });
  assert.equal(plan.status, "ready");
  assert.equal(plan.evidenceToRecollect.invalidateArtifactBoundEvidence, true);
  assert.equal(plan.evidenceToRecollect.invalidatePairwiseComparisons, true);
  assert.ok(plan.items.some((item) => item.type === "workflow" || item.type === "implementation-obligation"));
});

test("identical omissions do not masquerade as complete rendered coverage", () => {
  const incomplete = clone(run);
  for (const candidate of incomplete.candidates) candidate.evidence.renderProfiles = candidate.evidence.renderProfiles.filter((profile) => profile.stateRef === "desktop");
  const report = evaluateRun(incomplete);
  assert.equal(report.status, "human-review");
  assert.match(report.reason, /does not cover every required state/);
});

test("a collapsed losing pair still blocks an incomplete three-direction search", () => {
  const collapsed = clone(run);
  collapsed.candidates[2].evidence.renderProfiles = clone(collapsed.candidates[1].evidence.renderProfiles).map((profile) => ({ ...profile, artifactRef: "gamma-sha" }));
  const report = evaluateRun(collapsed);
  assert.equal(report.status, "human-review");
  assert.equal(report.diversity.distinctCandidateCount, 2);
  assert.match(report.reason, /at least 3 are required/);
});

test("strict capture policy rejects unhashed browser evidence", () => {
  const unhashed = clone(run);
  delete unhashed.candidates[0].evidence.captures[0].screenshotSha256;
  const validation = validateRun(unhashed);
  assert.equal(validation.valid, false);
  assert.match(validation.errors.join("\n"), /screenshotSha256 is required/);
});

test("obligation evidence cannot change the obligation class or dimension", () => {
  const mismatched = clone(run);
  const linked = mismatched.candidates[0].evidence.signals.find((signal) => signal.obligationRefs?.includes("intent:task-visible"));
  linked.class = "B";
  linked.dimension = "accessibility";
  const validation = validateRun(mismatched);
  assert.equal(validation.valid, false);
  assert.match(validation.errors.join("\n"), /must match obligation intent:task-visible class A/);
  assert.match(validation.errors.join("\n"), /must match obligation intent:task-visible dimension hierarchy/);
});

test("required browser profiles cannot be omitted by every candidate", () => {
  const incomplete = clone(run);
  incomplete.policy.renderedDiversity.requiredBrowsers = ["chromium", "firefox"];
  const report = evaluateRun(incomplete);
  assert.equal(report.status, "human-review");
  assert.match(report.reason, /does not cover every required state/);
});
