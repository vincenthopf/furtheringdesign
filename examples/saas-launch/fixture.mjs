import { readFileSync } from "node:fs";

const readJson = (name) => JSON.parse(readFileSync(new URL(name, import.meta.url), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));

export const intent = readJson("./intent.json");
const signalManifest = readJson("./candidate-signal-foundry.json");
const stateIds = intent.states.map((state) => state.id);

function manifest(id, title, thesis, pattern, axes, tradeoffs, rejectedPatterns) {
  const value = clone(signalManifest);
  value.id = id;
  value.title = title;
  value.direction = { thesis, axes, deliberateTradeoffs: tradeoffs, rejectedPatterns };
  value.structure = { pattern, sections: ["promise", "mechanism", "proof", "evaluation"] };
  value.decisions[0] = { question: "How should trust form?", option: thesis, rationale: "The direction converts the intent into structure.", tradeoffs };
  value.supportedStates = stateIds;
  return value;
}

const safeManifest = manifest(
  "safe-grid",
  "Safe Grid",
  "Use a familiar enterprise sequence with strong semantics, accessible components, and an obvious evaluation path.",
  "conventional-enterprise-funnel",
  {
    composition: "Centered promise followed by a regular proof grid and closing action.",
    typography: "Neutral sans hierarchy with conventional display, body, label, and control levels.",
    spatialRhythm: "Even section intervals and repeated card gaps.",
    surface: "Light bordered panels with modest radius and elevation.",
    imagery: "Product captures inside reusable browser frames.",
    interaction: "Standard tabs, disclosures, and anchored navigation.",
    voice: "Professional, reassuring, and concise."
  },
  ["Familiarity weakens recall."],
  ["Strong asymmetry", "Dense evidence spine"]
);

const kineticManifest = manifest(
  "kinetic-lab",
  "Kinetic Lab",
  "Turn the incident lifecycle into a cinematic interactive field that creates immediate category distinction before explanation.",
  "cinematic-incident-canvas",
  {
    composition: "Full-bleed spatial canvas with overlapping modules and diagonal progression.",
    typography: "Compressed display type, oversized labels, and small telemetry captions.",
    spatialRhythm: "Irregular dense clusters and continuous progression.",
    surface: "Dark luminous layers, blur, glass, and particle traces.",
    imagery: "Synthetic system maps and animated event streams.",
    interaction: "Scroll-scrubbed scenes and cursor-reactive fields.",
    voice: "Provocative, urgent, and category-rejecting."
  },
  ["Memorability is prioritized over scan speed.", "The reduced-motion state weakens the thesis."],
  ["Conventional sections", "Static proof"]
);

function capture(candidateId, state) {
  return {
    browser: "chromium",
    stateRef: state.id,
    url: `https://example.invalid/${candidateId}`,
    viewport: state.viewport,
    screenshot: `artifacts/${candidateId}/${state.id}.png`,
    nodeMap: `artifacts/${candidateId}/${state.id}.nodes.json`
  };
}

function signal(candidateId, id, signalClass, dimension, status, normalized, confidence, severity, stateRef, nodeRef, evidence, rationale, recommendation) {
  return {
    id: `${candidateId}-${id}`,
    class: signalClass,
    dimension,
    source: signalClass === "A" ? "validator" : signalClass === "B" ? "measurement" : "calibrated-critique",
    status,
    normalized,
    confidence,
    severity,
    stateRef,
    nodeRef,
    evidence,
    rationale,
    recommendation
  };
}

function evidence(candidateId, scores, failures = []) {
  const definitions = [
    ["intent", "C", "intentAlignment", "desktop-light", "page"],
    ["task", "B", "taskClarity", "mobile-light", "form:evaluation"],
    ["a11y", "A", "accessibility", "desktop-dark-reduced", "document"],
    ["hierarchy", "B", "hierarchy", "desktop-light", "main"],
    ["coherence", "C", "visualCoherence", "desktop-light", "main"],
    ["distinct", "C", "distinctiveness", "desktop-light", "page"],
    ["responsive", "B", "responsiveResilience", "mobile-light", "document"],
    ["maintain", "B", "maintainability", "desktop-light", "component-tree"]
  ];
  const failed = new Map(failures.map((failure) => [failure.id, failure]));
  const signals = definitions.map(([id, signalClass, dimension, stateRef, nodeRef], index) => {
    const failure = failed.get(id);
    return signal(
      candidateId,
      id,
      failure?.class ?? signalClass,
      dimension,
      failure ? "fail" : "pass",
      failure?.score ?? scores[index],
      failure?.confidence ?? 0.86,
      failure?.severity ?? "note",
      stateRef,
      nodeRef,
      failure?.evidence ?? `${dimension} evidence is present for the declared state.`,
      failure?.rationale ?? `${dimension} supports the declared intent with the recorded tradeoff.`,
      failure?.recommendation ?? `Preserve and retest ${dimension}.`
    );
  });
  return { schemaVersion: "1.0.0", candidateId, captures: intent.states.map((state) => capture(candidateId, state)), signals };
}

const signalEvidence = evidence("signal-foundry", [0.95, 0.94, 0.97, 0.91, 0.93, 0.91, 0.9, 0.86]);
const safeEvidence = evidence("safe-grid", [0.76, 0.84, 0.98, 0.8, 0.82, 0.48, 0.92, 0.94]);
const kineticEvidence = evidence(
  "kinetic-lab",
  [0.6, 0.61, 0.54, 0.66, 0.89, 0.96, 0.68, 0.58],
  [
    { id: "intent", class: "C", score: 0.6, severity: "major", evidence: "Spectacle precedes technical trust.", rationale: "The direction conflicts with calm authority.", recommendation: "Move the incident model into bounded proof." },
    { id: "task", class: "B", score: 0.61, severity: "major", evidence: "The action follows animated scenes.", rationale: "Motion competes with the task.", recommendation: "Expose the evaluation path earlier." },
    { id: "a11y", class: "A", score: 0.54, confidence: 0.99, severity: "blocker", evidence: "Reduced motion loses context and focus is obscured.", rationale: "The hard accessibility contract fails.", recommendation: "Rebuild the interaction model." },
    { id: "responsive", class: "B", score: 0.68, severity: "major", evidence: "The canvas clips at 390px.", rationale: "The desktop thesis does not re-compose.", recommendation: "Create a mobile-native sequence." },
    { id: "maintain", class: "B", score: 0.58, severity: "major", evidence: "Scene state and hardcoded positions are coupled.", rationale: "The implementation is expensive to extend safely.", recommendation: "Extract a bounded visualization." }
  ]
);
kineticEvidence.signals.push(signal("kinetic-lab", "performance", "A", "performance", "fail", 0.42, 0.94, "major", "mobile-light", "document", "Continuous GPU work exceeds the budget.", "Visual effects create delivery risk.", "Replace continuous motion with bounded transitions."));

export const run = {
  schemaVersion: "1.0.0",
  id: "run-observability-launch-001",
  intent,
  policy: {
    selectionWeights: { evidence: 0.72, pairwise: 0.23, diversity: 0.05 },
    diversityFloor: 0.42,
    uncertaintyPenalty: 0.18,
    reviewMargin: 0.03,
    maxUncertainty: 0.35,
    hardGateSeverities: ["blocker", "major"]
  },
  candidates: [
    { manifest: signalManifest, evidence: signalEvidence },
    { manifest: safeManifest, evidence: safeEvidence },
    { manifest: kineticManifest, evidence: kineticEvidence }
  ],
  pairwise: [
    { left: "signal-foundry", right: "safe-grid", winner: "signal-foundry", confidence: 0.84, rationale: "Signal Foundry preserves clarity while deriving distinction from product evidence." },
    { left: "signal-foundry", right: "kinetic-lab", winner: "signal-foundry", confidence: 0.93, rationale: "Kinetic Lab is memorable but fails hard and intent-critical obligations." },
    { left: "safe-grid", right: "kinetic-lab", winner: "safe-grid", confidence: 0.86, rationale: "Safe Grid is less distinctive but remains accessible and resilient." }
  ]
};
