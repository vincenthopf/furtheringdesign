import { normalizeIntent } from "./intent.mjs";

function bullets(values) {
  return values.map((value) => `- ${typeof value === "string" ? value : JSON.stringify(value)}`).join("\n");
}

export function createDesignPacket(input) {
  const intent = normalizeIntent(input);
  const primary = intent.tasks.primary ?? {};
  const frame = `# Frame\n\n## Outcome\n\n${intent.outcome.problem}\n\nDesired change: ${intent.outcome.desiredChange}\n\n## Primary task\n\n${primary.actorId} must ${primary.action} ${primary.object}. Completion is observed when ${primary.completionSignal}.\n\n## Anti-goals\n\n${bullets(intent.outcome.antiGoals)}\n\n## Hard constraints\n\n${bullets(intent.constraints.hard.map((constraint) => `${constraint.id}: ${constraint.statement} [verify: ${constraint.verification}]`))}\n\n## Open questions\n\n${bullets(intent.openQuestions.length ? intent.openQuestions : ["None recorded"])}\n`;
  const directions = `# Direction search\n\nGenerate at least three candidates that differ structurally, not only cosmetically. For each candidate define one coherent thesis across composition, typography, spatial rhythm, surface, imagery, interaction, and voice.\n\nEach candidate must state:\n\n- the user hypothesis\n- the dominant compositional idea\n- the hierarchy and primary action\n- deliberate tradeoffs\n- rejected familiar patterns\n- what evidence would falsify the direction\n\nDo not copy a reference style. The reference policy is ${intent.brand.referencePolicy}.\n`;
  const build = `# Build contract\n\nStart from an immutable baseline. Declare allowed paths and protected paths before editing. Apply scoped diffs only. Preserve working content and behavior outside the declared scope.\n\nRequired states:\n\n${bullets(intent.states.map((state) => `${state.id}: ${state.viewport.width}x${state.viewport.height}, ${state.colorScheme}, reducedMotion=${state.reducedMotion}, locale=${state.locale}`))}\n\nEvery candidate must use the same real content and data shape so visual comparison is not confounded by copy quality.\n`;
  const critique = `# Critique contract\n\nRun phases separately.\n\n1. Class A validation: accessibility, legal, data integrity, security, destructive-change controls.\n2. Class B scoring: measurable hierarchy, density, responsiveness, performance, maintainability.\n3. Class C critique: intent alignment, coherence, distinctiveness, emotional register, and tradeoff quality.\n\nEvery finding must include a state reference, semantic node reference, evidence, confidence, rationale, and recommendation. Do not present subjective taste as a fact.\n`;
  const select = `# Selection contract\n\nReject candidates with Class A blocker or major failures, failed intent-defined quality floors, missing dimensions, or incomplete state evidence. Build the Pareto frontier before ranking. Use pairwise judgments for nuanced comparisons and penalize uncertainty. Treat near-duplicate directions as search failure.\n\nAutomatic selection is allowed only when the winner is eligible, Pareto-efficient, sufficiently separated from the runner-up, below the uncertainty ceiling, and supported by confident pairwise evidence. Otherwise return human-review.\n`;
  const revise = `# Revision contract\n\nRepair evidence, not vague dissatisfaction. Start with the highest-priority failed, weak, missing, or uncertain signal. Preserve the candidate thesis, immutable baseline, allowed paths, and protected paths. Apply the smallest coherent patch and recollect evidence for every affected state and dimension.\n\nFork a new candidate when the proposed change alters the direction thesis or when intent misalignment is structural. Stop when a patch creates a new hard failure, crosses a protected path, or improves a local metric by damaging a higher-weight dimension.\n`;
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
