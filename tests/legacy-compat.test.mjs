import assert from "node:assert/strict";
import test from "node:test";
import { evaluateRun, validateRun } from "../runtime/index.mjs";

const states = [
  { id: "desktop", viewport: { width: 1280, height: 800 }, colorScheme: "light", reducedMotion: false, locale: "en-AU" },
  { id: "mobile", viewport: { width: 390, height: 844 }, colorScheme: "light", reducedMotion: true, locale: "en-AU" }
];
const intent = {
  schemaVersion: "1.0.0",
  id: "legacy-intent",
  title: "Legacy fixture",
  scope: { level: "page", surface: "web", parentIntentId: null },
  outcome: { problem: "The page is unclear", desiredChange: "Users understand and act", antiGoals: ["Hide the task"] },
  audiences: [{ id: "user", label: "User", context: "Evaluating a product", needs: ["Clarity"], anxieties: [], capabilities: [] }],
  tasks: { primary: { actorId: "user", action: "request", object: "an evaluation", completionSignal: "form submitted" }, secondary: [] },
  brand: { values: [{ name: "clarity", expression: "Direct evidence", avoid: "Noise" }], voice: ["direct"], distinctiveAssets: [], referencePolicy: "original-only" },
  experience: { emotionalRegister: ["calm"], density: "balanced", familiarity: "familiar", motion: "bounded", hierarchy: "one action" },
  success: { criteria: [{ id: "conversion", signal: "requests", direction: "increase", target: "10%", weight: 1 }], qualityProfile: { weights: { accessibility: 0.5, hierarchy: 0.5 }, floors: { accessibility: 0.8 }, uncertaintyPenalty: 0.1 } },
  constraints: { hard: [{ id: "a11y", category: "accessibility", statement: "Accessible", verification: "axe" }], soft: [] },
  freedoms: { fixed: ["task"], open: ["composition"], forbidden: ["hidden task"] },
  states,
  content: { sourceOfTruth: "fixture", missingPolicy: "fail", claimsRequireEvidence: false },
  risks: [],
  assumptions: [],
  openQuestions: []
};

function manifest(id, title, pattern) {
  return {
    schemaVersion: "1.0.0",
    id,
    intentId: intent.id,
    title,
    direction: {
      thesis: `${title} uses a materially defensible structure that supports the declared primary task without relying on unsupported novelty.`,
      axes: {
        composition: `${title} composition`,
        typography: `${title} typography`,
        spatialRhythm: `${title} rhythm`,
        surface: `${title} surface`,
        imagery: `${title} imagery`,
        interaction: `${title} interaction`,
        voice: `${title} voice`
      },
      deliberateTradeoffs: ["Tradeoff"],
      rejectedPatterns: ["Generic template"]
    },
    tokens: { unit: 4 },
    structure: { pattern, sections: ["promise", "proof", "action"] },
    decisions: [{ question: "How should trust form?", option: title, rationale: "Intent", tradeoffs: ["Tradeoff"] }],
    changeContract: { baselineRef: "base", allowedPaths: ["src/**"], protectedPaths: ["infra/**"], patchMode: "diff-only" },
    supportedStates: states.map((state) => state.id)
  };
}

function evidence(id, score) {
  return {
    schemaVersion: "1.0.0",
    candidateId: id,
    captures: states.map((state) => ({ browser: "chromium", stateRef: state.id, url: `https://example.invalid/${id}`, viewport: state.viewport })),
    signals: states.flatMap((state) => [
      { id: `${id}-${state.id}-a11y`, class: "A", dimension: "accessibility", source: "validator", status: "pass", normalized: score, confidence: 0.95, severity: "note", stateRef: state.id, nodeRef: "document", evidence: "pass", rationale: "pass", recommendation: "retain" },
      { id: `${id}-${state.id}-hierarchy`, class: "B", dimension: "hierarchy", source: "measurement", status: "pass", normalized: score, confidence: 0.9, severity: "note", stateRef: state.id, nodeRef: "main", evidence: "pass", rationale: "pass", recommendation: "retain" }
    ])
  };
}

const records = [
  { manifest: manifest("alpha", "Alpha", "evidence-spine"), evidence: evidence("alpha", 0.96) },
  { manifest: manifest("beta", "Beta", "editorial-sequence"), evidence: evidence("beta", 0.86) },
  { manifest: manifest("gamma", "Gamma", "interactive-canvas"), evidence: evidence("gamma", 0.82) }
];
const pairwise = [
  { left: "alpha", right: "beta", winner: "alpha", confidence: 0.9, rationale: "Alpha better supports the task." },
  { left: "alpha", right: "gamma", winner: "alpha", confidence: 0.92, rationale: "Alpha better supports the task." },
  { left: "beta", right: "gamma", winner: "beta", confidence: 0.85, rationale: "Beta better supports the task." }
];
const run = {
  schemaVersion: "1.0.0",
  id: "legacy-run",
  intent,
  policy: {
    selectionWeights: { evidence: 0.75, pairwise: 0.2, diversity: 0.05 },
    diversityFloor: 0.1,
    uncertaintyPenalty: 0.1,
    reviewMargin: 0.02,
    maxUncertainty: 0.35,
    hardGateSeverities: ["blocker", "major"]
  },
  candidates: records,
  pairwise
};

test("legacy protocol records remain valid without strict v0.2 fields", () => {
  const validation = validateRun(run);
  assert.equal(validation.valid, true, validation.errors.join("\n"));
  assert.ok(validation.warnings.some((warning) => warning.includes("commitments")));
});

test("legacy runs retain manifest fallback and automatic selection", () => {
  const report = evaluateRun(run);
  assert.equal(report.status, "selected");
  assert.equal(report.selectedCandidateId, "alpha");
  assert.equal(report.diversity.mode, "manifest");
});
