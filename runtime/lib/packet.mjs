import { normalizeIntent } from "./intent.mjs";

function bullets(values) {
  return values.map((value) => `- ${typeof value === "string" ? value : JSON.stringify(value)}`).join("\n");
}

function obligationLine(prefix, obligation) {
  const automation = obligation.automation ? ` [automate: ${obligation.automation.metric} ${obligation.automation.operator} ${JSON.stringify(obligation.automation.expected)}]` : "";
  return `${prefix}:${obligation.id} [${obligation.class}/${obligation.severity}] ${obligation.statement} [states: ${obligation.stateRefs.join(", ")}] [verify: ${obligation.verification}]${automation}`;
}

export function createDesignPacket(input) {
  const intent = normalizeIntent(input);
  const primary = intent.tasks.primary ?? {};
  const principles = intent.principles.length ? intent.principles.map((principle) => obligationLine("intent", principle)) : ["None recorded"];
  const workflows = intent.workflows.length
    ? intent.workflows.map((workflow) => `${workflow.id}: ${workflow.title} [${workflow.class}/${workflow.severity}] starts at ${workflow.startStateRef}; ${workflow.steps.length} steps; ${workflow.assertions.length} assertions`)
    : ["None recorded"];
  const frame = `# Frame\n\n## Outcome\n\n${intent.outcome.problem}\n\nDesired change: ${intent.outcome.desiredChange}\n\n## Primary task\n\n${primary.actorId} must ${primary.action} ${primary.object}. Completion is observed when ${primary.completionSignal}.\n\n## Anti-goals\n\n${bullets(intent.outcome.antiGoals)}\n\n## Hard constraints\n\n${bullets(intent.constraints.hard.map((constraint) => `${constraint.id}: ${constraint.statement} [verify: ${constraint.verification}]`))}\n\n## Intent principles\n\n${bullets(principles)}\n\n## Executable workflows\n\n${bullets(workflows)}\n\n## Open questions\n\n${bullets(intent.openQuestions.length ? intent.openQuestions : ["None recorded"])}\n`;
  const directions = `# Direction search\n\nGenerate at least three candidates that differ in rendered composition, typography, spatial rhythm, surface, imagery, interaction, voice, and product-flow structure. A renamed candidate, palette swap, or rewritten rationale is not a new direction.\n\nEach candidate must state:\n\n- one falsifiable user and structural thesis\n- the dominant compositional idea and flow sequence\n- the hierarchy and primary action\n- concrete state-scoped commitments with canonical candidate references\n- deliberate tradeoffs and rejected familiar patterns\n- evidence that would falsify the direction\n- one content-addressed artifact reference\n- one immutable baseline, allowed-path set, protected-path set, and diff-only change contract\n\nDo not copy a reference style. The reference policy is ${intent.brand.referencePolicy}.\n`;
  const build = `# Build contract\n\nStart every candidate from the same immutable baseline and approved content. Declare the artifact reference, allowed paths, protected paths, supported states, supported workflows, tokens, reusable primitives, and commitments before editing. Apply scoped diffs only. Preserve working content and behaviour outside the declared scope.\n\nRequired states:\n\n${bullets(intent.states.map((state) => `${state.id}: ${state.path ?? "/"}, ${state.viewport.width}x${state.viewport.height}, ${state.colorScheme}, reducedMotion=${state.reducedMotion}, locale=${state.locale}`))}\n\nImplement the commitments in the artifact. Add stable semantics for evidence and workflows without adding selectors that merely fake success. Execute every workflow and preserve one result for every declared step and assertion. Any later code change creates a new artifact reference and invalidates prior evidence.\n`;
  const critique = `# Critique contract\n\nEvaluate the rendered artifact, not its explanation. Capture every required browser state with screenshot and node-map hashes, extract rendered profiles, and execute the declared workflows.\n\nRun mechanisms separately.\n\n1. Class A validation: accessibility, workflow completion, legal and claim provenance, security, destructive-change controls, and required state coverage.\n2. Class B scoring: measurable hierarchy, density, responsiveness, clipping, overlap, performance, content integrity, and maintainability.\n3. Class C critique: intent alignment, visual coherence, distinctiveness, emotional register, contextual fit, and tradeoff quality.\n\nEvery finding must include a state reference, semantic node reference, observable evidence, confidence, rationale, recommendation, and canonical obligation references when it verifies a principle or commitment. Classify implementation as full, partial, none, or unknown. Missing evidence receives no credit.\n`;
  const select = `# Selection contract\n\nReject candidates with Class A blocker or major failures, failed quality floors, missing weighted dimensions, incomplete states, incomplete workflows, failed Thinking Fidelity or Principle Adherence floors, stale artifact references, or insufficient obligation coverage.\n\nMeasure rendered direction diversity across the complete required browser-state matrix. Require the configured minimum number of distinct direction clusters. Build the Pareto frontier before ranking. Use independently sourced, artifact-bound pairwise judgments for nuanced comparisons and preserve disagreement and preference profiles. Penalize uncertainty.\n\nAutomatic selection is allowed only when the winner is eligible, Pareto-efficient, sufficiently separated from the runner-up, below the uncertainty ceiling, backed by complete rendered and workflow evidence, and supported by the required pairwise quorum. Otherwise return human-review.\n`;
  const revise = `# Revision contract\n\nRepair grounded evidence, not vague dissatisfaction. Start with the highest-priority failed, weak, missing, uncertain, or unimplemented obligation. Preserve the candidate thesis, immutable baseline, allowed paths, and protected paths. Apply the smallest coherent patch.\n\nEvery code change must receive a new artifact reference. Discard captures, workflow runs, implementation signals, and pairwise judgments bound to the previous artifact, then recollect every affected state, dimension, and workflow.\n\nFork a new candidate when the proposed change alters the direction thesis or when intent or commitment misalignment is structural. Stop when a patch creates a new hard failure, crosses a protected path, or improves a local metric by damaging a higher-weight dimension.\n`;
  return {
    "intent.normalized.json": `${JSON.stringify(intent, null, 2)}\n`,
    "01-frame.md": frame,
    "02-directions.md": directions,
    "03-build.md": build,
    "04-critique.md": critique,
    "05-select.md": select,
    "06-revise.md": revise
  };
}
