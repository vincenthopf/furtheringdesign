# Agent Handoff: Foundation 3 — Mismatch Detection Framework

## Your Mission

You are designing the **Mismatch Detection Framework** — the system that detects when something is "off" in a design, the way an expert designer's gut feeling fires before they can articulate the specific problem.

This is not a linter. It's not a rule checker. It is a multi-layered detection system that approximates the cognitive mechanisms expert designers use for pre-verbal wrongness detection. The research traced this to 4 specific cognitive mechanisms, each of which needs a computational analog.

## Mandatory First Step — Read Context, Report Understanding, Then Run Research

Before proposing the Mismatch Detection Framework, you MUST first read all required context files, report your understanding to the user for alignment, and only after confirmation run a dedicated foundational recursive research pass on **computational wrongness detection for design, nondeterministic visual judgment, confidence calibration, and perceptual mismatch modeling**.

Do not skip this. The existing research MUST be read before any new research is launched. It found the four cognitive layers, but your job is to go deeper into each layer and identify implementable mechanisms that don't collapse into brittle rule-checking or hallucinated certainty.

### Required context-reading and alignment checkpoint

Before running new research, do this first:

1. Read every file listed in **What You Must Read Before Starting**.
2. Read any **Potentially useful** files that look relevant to your scope.
3. Report back to the user with:
   - The files you read
   - Your understanding of the larger project and why your problem matters
   - The specific problem you think you are solving
   - The assumptions you are carrying forward from the existing research
   - The places where the current handoff seems underdefined, risky, or possibly wrong
   - The exact recursive research plan you intend to run next: cycle-1 query angles, expected output files, and likely cycle-2 gap targets
4. Stop and wait for user confirmation or correction.

Only after the user confirms your understanding should you run the recursive research below.

### Required research procedure

1. Read the skill instructions at:
   - `/Users/vincenthopf/.pi/agent/skills/foundational-recursive-research/SKILL.md`

2. Create a research bundle at:
   - `.building/knowledge-bundles/mismatch-detection/`

3. Run recursive research using the skill workflow. Your Cycle 1 must include at least these angles:
   - Prediction error, Bayesian surprise, predictive processing, saliency, and computational models of visual surprise applied to interfaces or visual design.
   - Computational Gestalt/perceptual grouping: proximity, similarity, closure, continuity, figure-ground, alignment, chunking, and how these can be measured or approximated.
   - Processing fluency, cognitive load, visual complexity, scan paths, information scent, and measurable proxies for "hard to process" UI.
   - Affective/aesthetic scoring models such as NIMA, AVA, UIClip, aesthetic preference modeling, and their limits for context-specific design.
   - Confidence calibration, uncertainty estimation, ensemble disagreement, and nondeterministic judgment in LLM/VLM-based evaluators.

4. After Cycle 1, perform gap analysis. If high-priority gaps remain, run Cycle 2. Prioritize:
   - How to combine deterministic validators with probabilistic aesthetic/fluency judgments.
   - How to present uncertain design critique without fake certainty.
   - How to detect when reasonable designers would disagree.

5. Write the final bundle to:
   - `.building/knowledge-bundles/mismatch-detection/knowledge-bundle.md`

### Post-research report-back

After completing the recursive research and before designing the mismatch framework, report back with:
- The research cycles you ran and files produced
- Deeper findings for each of the four layers
- What is actually implementable now vs speculative
- How nondeterminism should be handled
- Your updated framing of the problem

Only after user confirms your post-research framing should you propose the Mismatch Detection Framework.

## The Problem You're Solving

Expert designers experience a mismatch signal — a pre-verbal sense that something is wrong — that fires before they can articulate what's wrong. The research decomposed this into 4 layers:

1. **Prediction error** — the design violates expected patterns. The brain's predictive processing system flags deviations from learned regularities.
2. **Chunking mismatch** — an element doesn't fit the perceptual group it belongs to. Expert designers see layouts in chunks (navigation, hero, product card). When an element breaks a chunk's internal logic, it triggers a mismatch.
3. **Perceptual fluency drop** — the design is harder to process than it should be. Complexity, noise, inconsistent density, competing alignments all reduce processing fluency, which is experienced as negative affect.
4. **Somatic/affective markers** — stored negative associations from past experience. "This feels like a design I've seen fail before."

The critical challenge: **these are all nondeterministic.** Each layer is probabilistic, context-dependent, and perception-relative. LLMs will hallucinate confidence about aesthetic judgments. The framework must handle uncertainty explicitly — flagging probable issues with confidence levels, not asserting binary right/wrong.

## What You Must Read Before Starting

**Core research (required — this is your primary material):**
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/01-mismatch-signal-and-reasoning-architectures.md` — THIS IS YOUR PRIMARY FILE. It contains the full deep dive on:
  - The cognitive science of the mismatch signal (MMN, ERN, prediction error, chunking, perceptual fluency, somatic markers)
  - Computational analogs (NIMA, Bayesian surprise, Process Reward Models, Ferret-UI)
  - The detailed tables of neural correlates, pattern recognition theories, and affective theories
  - Read the sections on "Mismatch Signal Cognitive Deep Dive", "Neuroscientific Correlates", "Pattern Recognition Theories", "Affective and Perceptual Theories", "Computational Models for Wrongness Detection", and "Synthesis Bridging Cognition and AI"

**Supporting research (required):**
- `.building/knowledge-bundles/ai-design-thinking/knowledge-bundle.md` — sections 2.1 (cognitive operations), 2.6 (formalizable vs resistant), 3 (load-bearing claims on mismatch signal), and 4 (contested areas — especially 4.1 on reflection-in-action and 4.2 on tacit knowledge).
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/01-design-cognition.md` — co-evolution, sketching as cognitive loop, satisficing. Context for how the mismatch signal operates within the broader design reasoning process.
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/02-expert-novice-design.md` — expert vs novice chunking and pattern recognition. Experts detect mismatches that novices miss because experts chunk differently.

**Research on what current AI can detect:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/03-process-supervision-multimodal.md` — covers VLM performance on design evaluation. Key finding: GPT-4o and Claude achieve >75% on Likert ratings but drop to near-chance on nuanced pairwise comparisons. This IS the mismatch detection problem — the nuanced cases are where the mismatch signal matters.
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/03-ai-design-attempts.md` — what AI design systems have tried and where they fail. UICrit + Gemini produced only 13.1% valid critiques at zero-shot.

**Potentially useful:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/06-tacit-knowledge-formalization.md` — on which aspects are formalizable. The somatic/affective layer (layer 4) may be genuinely resistant to explicit encoding.
- The existing UI skill: `~/.pi/agent/skills/ui/design-guidelines/general.md` — to understand what the current rule-based approach looks like and why it can't detect mismatches.

## What We've Already Established

From our discussion:

1. **Four layers with computational analogs:**
   - Layer 1 (Prediction error): Programmatic checks — axe-core for accessibility, spacing/grid consistency validators, typographic scale adherence, color palette compliance
   - Layer 2 (Chunking mismatch): LLM-based chunk identification and coherence check — "What are the perceptual groups? Does each element belong in its group?"
   - Layer 3 (Processing fluency): LLM-based scan simulation — "What draws attention first? Is that the intended hierarchy? Is there visual noise?"
   - Layer 4 (Intent alignment): Requires the Intent Schema — "Does the visual hierarchy serve the primary action for this audience?"

2. **Nondeterminism is the hard problem.** Each layer except Layer 1 is probabilistic. The framework must:
   - Output confidence levels, not binary verdicts
   - Distinguish between objective violations (Layer 1) and subjective judgments (Layers 2-4)
   - Flag where reasonable designers would disagree
   - Avoid hallucinating certainty about aesthetic judgments

3. **Each layer needs deeper research.** The initial definitions are correct but shallow. We need to go deeper into:
   - How prediction error works computationally (Bayesian surprise models, NIMA)
   - How chunking can be made explicit (Gestalt proximity/similarity as computable properties)
   - How processing fluency maps to measurable visual properties (information density, alignment consistency, color contrast ratios)
   - Whether LLMs can be calibrated for design judgment confidence

## What You Need To Produce

1. **Detailed specification for each layer** — what it detects, how it detects it, what tools/models it uses, what its confidence characteristics are, and what its known failure modes are.

2. **The nondeterminism protocol** — how the system handles uncertain judgments. Confidence scoring approach, disagreement detection, when to flag for human review vs. when to assert.

3. **Layer interaction model** — how do the 4 layers combine? If Layer 1 (programmatic) finds nothing wrong but Layer 3 (fluency) flags something, what does that mean? Do layers reinforce or override each other?

4. **Research needs** — identify what additional research would help you go deeper on each layer. Specifically:
   - Bayesian surprise models applied to visual design
   - Computational Gestalt analysis (proximity, similarity, closure as measurable properties)
   - LLM confidence calibration for aesthetic/design judgments
   - Nondeterministic judgment in LLM-based systems

5. **Interface specification** — what does the Mismatch Detector need from the Intent Schema? What does it need from the Design Reasoning Framework? How does it report its findings to the orchestration layer?

6. **Honest limits** — which mismatch types can this framework reliably detect? Which will it miss? Where is the ceiling?

## How To Report Back

Present:
- Your understanding of the 4-layer mismatch model and why nondeterminism is the core challenge
- Your detailed specification for each layer
- The nondeterminism protocol
- The layer interaction model
- What additional research you'd want to run
- Your assessment of what's achievable vs. what's a hard limit
- Open questions and dependencies

Show your reasoning. We need to confirm you're aligned with the cognitive science before you design the computational system.
