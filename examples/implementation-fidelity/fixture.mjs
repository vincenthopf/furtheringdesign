const states = [
  { id: "desktop", viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: false, locale: "en-AU" },
  { id: "mobile", viewport: { width: 390, height: 844 }, colorScheme: "light", reducedMotion: true, locale: "en-AU" }
];
const digest = (character) => character.repeat(64);
const obligation = (id, className, dimension, severity = "minor") => ({
  id,
  statement: `Implement ${id}`,
  class: className,
  severity,
  dimension,
  stateRefs: states.map((state) => state.id),
  verification: `Verify ${id} in every required state`
});

export const intent = {
  schemaVersion: "1.0.0",
  id: "intent-implementation-fidelity",
  title: "Implementation-fidelity demonstration",
  scope: { level: "page", surface: "web", parentIntentId: null },
  outcome: {
    problem: "A generated interface can present convincing rationale while omitting the task, principle, or structural decision from the rendered artifact.",
    desiredChange: "Only a candidate that implements its rationale, preserves the product principle, completes the primary workflow, and remains materially distinct can be selected.",
    antiGoals: ["Reward explanation without implementation", "Select a visually polished broken workflow"]
  },
  audiences: [{
    id: "product-team",
    label: "Product and design team",
    context: "Comparing generated UI candidates before approving implementation.",
    needs: ["Traceable design decisions", "Executable task evidence", "Visible uncertainty"],
    anxieties: ["Design theater", "Template convergence"],
    capabilities: ["Can review grounded evidence and tradeoffs"]
  }],
  tasks: {
    primary: { actorId: "product-team", action: "complete", object: "the primary request", completionSignal: "a visible confirmation appears" },
    secondary: []
  },
  brand: {
    values: [{ name: "earned clarity", expression: "The primary task and supporting evidence are explicit.", avoid: "Decorative certainty without proof." }],
    voice: ["direct", "specific"],
    distinctiveAssets: ["evidence-linked action"],
    referencePolicy: "original-only"
  },
  experience: { emotionalRegister: ["calm", "credible"], density: "balanced", familiarity: "familiar controls", motion: "bounded", hierarchy: "one dominant action" },
  success: {
    criteria: [{ id: "task-completion", signal: "Primary workflow completion", direction: "increase", target: "100% in required browsers", weight: 1 }],
    qualityProfile: {
      weights: { accessibility: 0.4, taskClarity: 0.35, visualCoherence: 0.25 },
      floors: { accessibility: 0.85, taskClarity: 0.8 },
      uncertaintyPenalty: 0.12
    }
  },
  constraints: {
    hard: [{ id: "accessible", category: "accessibility", statement: "Preserve keyboard and semantic operation.", verification: "browser and axe evidence" }],
    soft: []
  },
  freedoms: { fixed: ["Primary request"], open: ["Composition", "Visual language"], forbidden: ["Hidden completion state"] },
  states,
  principles: [obligation("primary-action-visible", "A", "taskClarity", "major")],
  workflows: [{
    id: "submit-primary-request",
    title: "Submit the primary request",
    actorId: "product-team",
    class: "A",
    severity: "major",
    dimension: "taskClarity",
    startStateRef: "desktop",
    browsers: ["chromium"],
    obligationRefs: ["intent:primary-action-visible"],
    steps: [
      { id: "enter-email", action: "fill", locator: { by: "label", value: "Work email" }, value: "person@example.com" },
      { id: "submit", action: "click", locator: { by: "role", value: "button", name: "Request access" } }
    ],
    assertions: [{ id: "confirmation", kind: "visible", locator: { by: "text", value: "Request received" } }]
  }],
  content: { sourceOfTruth: "synthetic fixture", missingPolicy: "fail", claimsRequireEvidence: false },
  risks: [{ id: "self-certification", severity: "high", statement: "The generator could certify its own rationale.", control: "Artifact-bound independent evaluation." }],
  assumptions: [],
  openQuestions: []
};

function manifest(id, title, thesis, profile) {
  return {
    schemaVersion: "1.0.0",
    id,
    intentId: intent.id,
    title,
    artifactRef: `git:${id}-artifact`,
    direction: {
      thesis,
      axes: {
        composition: profile.composition,
        typography: profile.typography,
        spatialRhythm: profile.spatialRhythm,
        surface: profile.surface,
        imagery: profile.imagery,
        interaction: profile.interaction,
        voice: profile.voice
      },
      deliberateTradeoffs: [profile.tradeoff],
      rejectedPatterns: ["Generic bento grid"]
    },
    tokens: { spaceUnit: profile.spaceUnit, surface: profile.surface },
    structure: { pattern: profile.pattern, sections: ["promise", "proof", "request"] },
    decisions: [{ question: "How should the task become trustworthy?", option: thesis, rationale: "The task, proof, and completion signal must form one visible structure.", tradeoffs: [profile.tradeoff] }],
    commitments: [obligation("task-proof-structure", "B", "visualCoherence")],
    changeContract: { baselineRef: "fixture-baseline", allowedPaths: ["src/**"], protectedPaths: ["infra/**"], patchMode: "diff-only" },
    supportedStates: states.map((state) => state.id),
    supportedWorkflows: ["submit-primary-request"]
  };
}

const candidates = [
  manifest("evidence-path", "Evidence Path", "Place the primary request inside a visible evidence sequence so purpose, proof, action, and completion remain causally connected.", {
    composition: "A vertical evidence path with a persistent action rail.", typography: "Restrained sans with clear display and body levels.", spatialRhythm: "Measured proof bands separated by decision pauses.", surface: "Flat mineral planes.", imagery: "Annotated product evidence.", interaction: "Progressive detail with a persistent request action.", voice: "Specific and measured.", tradeoff: "Higher information density", spaceUnit: 6, pattern: "evidence-path"
  }),
  manifest("editorial-proof", "Editorial Proof", "Use an editorial sequence that alternates product evidence and narrative explanation before resolving into one clear request action.", {
    composition: "Asymmetric editorial sequence.", typography: "Serif display with neutral sans body.", spatialRhythm: "Long narrative intervals and compact proof captions.", surface: "Paper-like panels with restrained elevation.", imagery: "Large contextual product crops.", interaction: "Anchored narrative navigation.", voice: "Human and explanatory.", tradeoff: "Longer scan path", spaceUnit: 8, pattern: "editorial-proof"
  }),
  manifest("rationale-only", "Rationale Only", "Describe a dramatic task-first interface in the manifest while leaving the rendered action incomplete and the primary workflow broken.", {
    composition: "Claimed task-first stage.", typography: "Claimed expressive display hierarchy.", spatialRhythm: "Claimed cinematic pacing.", surface: "Claimed luminous depth.", imagery: "Claimed product scene.", interaction: "Claimed direct request flow.", voice: "Claimed confident clarity.", tradeoff: "Implementation omitted", spaceUnit: 10, pattern: "claimed-stage"
  })
];

function renderProfile(candidateId, stateRef, value) {
  return {
    browser: "chromium",
    stateRef,
    artifactRef: `git:${candidateId}-artifact`,
    vectors: {
      layout: [value, 1 - value],
      palette: [Math.min(1, value * 0.8), 1 - Math.min(1, value * 0.8)],
      typography: [Math.min(1, value * 0.9), 1 - Math.min(1, value * 0.9)],
      density: [value, 1 - value]
    }
  };
}

function result(id, status, nodeRef) {
  return { id, status, nodeRef, evidence: `${id} ${status}`, durationMs: 10 };
}

function evidence(candidate, score, profileValue, implementation = "full", workflowStatus = "pass") {
  const signals = states.flatMap((state) => [
    { id: `${candidate.id}-${state.id}-a11y`, class: "A", dimension: "accessibility", source: "validator", status: "pass", normalized: score, confidence: 0.97, severity: "note", stateRef: state.id, nodeRef: "document", evidence: "No blocking accessibility failure in the fixture.", rationale: "The hard accessibility contract remains intact.", recommendation: "Retain and rerun." },
    { id: `${candidate.id}-${state.id}-commitment`, class: "B", dimension: "visualCoherence", source: "implementation-review", status: implementation === "none" ? "fail" : "pass", normalized: implementation === "full" ? 1 : 0, confidence: 0.94, severity: implementation === "full" ? "note" : "major", stateRef: state.id, nodeRef: "main", evidence: `Candidate structure is ${implementation}.`, rationale: "The rendered artifact must implement the candidate rationale.", recommendation: "Implement the declared task-proof structure.", obligationRefs: ["candidate:task-proof-structure"], implementation },
    { id: `${candidate.id}-${state.id}-principle`, class: "A", dimension: "taskClarity", source: "workflow-review", status: workflowStatus === "pass" ? "pass" : "fail", normalized: workflowStatus === "pass" ? 1 : 0, confidence: 0.99, severity: workflowStatus === "pass" ? "note" : "major", stateRef: state.id, nodeRef: "main", evidence: `Primary action is ${workflowStatus === "pass" ? "visible" : "not executable"}.`, rationale: "The product principle must survive implementation.", recommendation: "Expose and repair the primary request.", obligationRefs: ["intent:primary-action-visible"], implementation: workflowStatus === "pass" ? "full" : "none" }
  ]);
  const workflowRun = {
    id: `${candidate.id}-submit-primary-request-chromium`,
    workflowRef: "submit-primary-request",
    browser: "chromium",
    stateRef: "desktop",
    artifactRef: candidate.artifactRef,
    status: workflowStatus,
    durationMs: 30,
    ...(workflowStatus === "pass" ? { screenshotSha256: digest("c") } : {}),
    steps: [
      result("enter-email", workflowStatus === "pass" ? "pass" : "fail", "input:Work email"),
      result("submit", workflowStatus === "pass" ? "pass" : "skipped", workflowStatus === "pass" ? "button:Request access" : "workflow:skipped")
    ],
    assertions: [result("confirmation", workflowStatus === "pass" ? "pass" : "skipped", workflowStatus === "pass" ? "text:Request received" : "workflow:skipped")]
  };
  return {
    schemaVersion: "1.0.0",
    candidateId: candidate.id,
    artifact: { ref: candidate.artifactRef, capturedAt: "2026-09-02T00:00:00.000Z", tool: "synthetic-fixture" },
    captures: states.map((state) => ({ browser: "chromium", stateRef: state.id, url: `https://example.invalid/${candidate.id}`, viewport: state.viewport, screenshotSha256: digest("a"), nodeMapSha256: digest("b") })),
    renderProfiles: states.map((state) => renderProfile(candidate.id, state.id, profileValue)),
    workflowRuns: [workflowRun],
    signals
  };
}

export const run = {
  schemaVersion: "1.0.0",
  id: "run-implementation-fidelity",
  intent,
  policy: {
    selectionWeights: { evidence: 0.74, pairwise: 0.22, diversity: 0.04 },
    diversityFloor: 0.16,
    uncertaintyPenalty: 0.12,
    reviewMargin: 0.02,
    maxUncertainty: 0.3,
    hardGateSeverities: ["blocker", "major"],
    requireBoundEvidence: true,
    requireCaptureHashes: true,
    implementationAudit: { enabled: true, requireCommitments: true, requirePrinciples: true, thinkingFidelityFloor: 0.8, principleAdherenceFloor: 0.85, minimumCoverage: 1, uncertaintyPenalty: 0.12 },
    renderedDiversity: { required: true, floor: 0.16, minimumCoverage: 1, minimumDistinctCandidates: 3, requiredBrowsers: ["chromium"], weights: { layout: 0.45, palette: 0.2, typography: 0.2, density: 0.15 } },
    workflowAudit: { enabled: true, required: true, minimumCoverage: 1, completionFloor: 1, requiredBrowsers: ["chromium"] },
    pairwiseAudit: { required: true, minimumEvaluators: 2, minimumIndependentEvaluators: 2, minimumIndependentSources: 2, requireArtifactBinding: true, requireCriteria: true, maximumDisagreement: 0.45 }
  },
  candidates: [
    { manifest: candidates[0], evidence: evidence(candidates[0], 0.96, 0.94) },
    { manifest: candidates[1], evidence: evidence(candidates[1], 0.86, 0.52) },
    { manifest: candidates[2], evidence: evidence(candidates[2], 0.9, 0.08, "none", "fail") }
  ],
  pairwise: []
};

function addVotes(left, right, winner, criteria) {
  for (const [evaluatorId, source, confidence] of [["judge-a", "model-family-a", 0.9], ["judge-b", "model-family-b", 0.86]]) {
    run.pairwise.push({
      left,
      right,
      winner,
      confidence,
      rationale: `${winner} better satisfies ${criteria.join(", ")} in the bound artifacts.`,
      evaluatorId,
      source,
      independent: true,
      leftArtifactRef: `git:${left}-artifact`,
      rightArtifactRef: `git:${right}-artifact`,
      criteria,
      evidenceRefs: [`${left}:desktop`, `${right}:desktop`]
    });
  }
}

addVotes("evidence-path", "editorial-proof", "evidence-path", ["taskClarity", "visualCoherence"]);
addVotes("evidence-path", "rationale-only", "evidence-path", ["taskClarity", "accessibility"]);
addVotes("editorial-proof", "rationale-only", "editorial-proof", ["taskClarity", "visualCoherence"]);
