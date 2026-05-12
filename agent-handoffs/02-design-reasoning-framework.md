# Agent Handoff: Foundation 2 — Design Reasoning Framework

## Your Mission

You are designing the **Design Reasoning Framework** — NOT a rulebook, but a set of reasoning patterns that enable AI to think through design decisions the way expert designers do. This replaces the concept of a "Design Constitution" from our earlier discussion, because we realized that rules are the problem, not the solution.

The current UI skill already has 39 rule files (buttons, colors, typography, etc.). It produces mediocre output because it applies rules without reasoning. Adding more rules — even with "why" layers — could make it worse by constraining the model's natural reasoning ability. What we need instead are **reasoning frameworks** that guide the model to arrive at good design through thinking, not compliance.

## Mandatory First Step — Read Context, Report Understanding, Then Run Research

Before proposing the Design Reasoning Framework, you MUST first read all required context files, report your understanding to the user for alignment, and only after confirmation run a dedicated foundational recursive research pass on **expert design reasoning patterns and how to encode them without turning them into brittle rules**.

Do not skip this. The existing research MUST be read before any new research is launched. It establishes the broad direction, but your task requires deeper research into reasoning patterns, expert cognition, design pedagogy, tradeoff reasoning, and LLM instruction design for nondeterministic creative judgment.

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
   - `.building/knowledge-bundles/design-reasoning-framework/`

3. Run recursive research using the skill workflow. Your Cycle 1 must include at least these angles:
   - Expert designer reasoning patterns beyond rules: abductive reasoning, reflection-in-action, co-evolution, framing, analogical transfer, satisficing, critique, and iteration.
   - Design pedagogy: how design schools teach judgment, critique, studio thinking, and taste without reducing design to rules.
   - Tradeoff reasoning in design: how designers resolve conflicts between usability, accessibility, brand expression, aesthetics, conversion, information density, novelty, and convention.
   - How LLMs perform on reasoning frameworks vs rules/checklists in creative tasks; risks of overconstraining models with too many rules.
   - Existing systems for design rationale, QOC/IBIS, design critique rubrics, and how to make them lightweight enough for AI orchestration.

4. After Cycle 1, perform gap analysis. If high-priority gaps remain, run Cycle 2. Prioritize:
   - How to encode reasoning patterns as prompts/processes rather than rules.
   - How to handle nondeterministic judgment and designer disagreement.
   - How to make reasoning intent-anchored while preserving creative exploration.

5. Write the final bundle to:
   - `.building/knowledge-bundles/design-reasoning-framework/knowledge-bundle.md`

### Post-research report-back

After completing the recursive research and before designing the framework, report back with:
- The research cycles you ran and files produced
- What the research says about rules vs reasoning patterns
- The strongest candidate reasoning patterns
- Major risks/anti-patterns
- Your updated framing of the problem

Only after user confirms your post-research framing should you propose the Design Reasoning Framework.

## The Problem You're Solving

The gap between expert designers and rule-following novices is not that experts know more rules. It's that experts reason differently:
- They hold multiple competing priorities simultaneously (aesthetics, function, constraint, brand, user state)
- They resolve tensions through satisficing, not optimization
- They use abductive reasoning ("what would have to be true for this to work?")
- They frame problems before solving them
- They retrieve deep functional analogies, not surface-similar examples

The current UI skill has no mechanism for any of this. It says "use 16px body text" but never reasons about *why* or *when to break that rule*. We need to replace rule-following with reasoning patterns.

## What You Must Read Before Starting

**Core research (required):**
- `.building/knowledge-bundles/ai-design-thinking/knowledge-bundle.md` — full bundle. Read sections 2.1 (cognitive operations), 2.2 (expert vs novice), 2.5 (critique structure), 2.6 (formalizable vs resistant), and 2.7 (architecture that could work).

**Research files with relevant findings:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/01-design-cognition.md` — the core cognitive mechanisms: co-evolution, abductive reasoning, dialectics of sketching, satisficing. These ARE the reasoning patterns you need to encode.
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/02-expert-novice-design.md` — five pillars of expertise: problem framing, abstracted precedent, visual chunking, disciplined iteration, hybrid skills. Each pillar suggests a reasoning pattern.
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/06-tacit-knowledge-formalization.md` — critical for understanding what CAN be formalized (pattern-based expertise, explicit methods, rationale fragments) vs what RESISTS formalization (reflection-in-action, aesthetic judgment, socialized knowledge). Your framework should maximize the formalizable parts without pretending the resistant parts don't exist.
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/05-design-critique-signal.md` — the argumentation structure of critique (Issue → Claim → Evidence → Warrant → Solution) and the evaluation dimensions experts consistently use (hierarchy, contrast, rhythm, balance, affordance, intent alignment).

**Research on AI architecture (relevant for understanding how reasoning frameworks get used):**
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/01-mismatch-signal-and-reasoning-architectures.md` — covers Constitutional AI, chain-of-thought, Self-Refine, and process supervision. Read the sections on "Training Approaches for LLM Reasoning" and "Synthesis Bridging Cognition and AI." These describe HOW a reasoning framework would be consumed by the system.

**Potentially useful:**
- The existing UI skill: `~/.pi/agent/skills/ui/SKILL.md` and the guideline files at `~/.pi/agent/skills/ui/design-guidelines/` — especially `general.md`, `typography.md`, `colors.md`, `section-layout.md`. Read these to understand what the current rule-based system looks like. Your framework replaces this approach.
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/02-uicrit-and-design-rationale-systems.md` — QOC (Questions-Options-Criteria) schema. This is a historical precedent for structured design reasoning. It's a useful model but failed due to cognitive overhead — your framework needs to be lighter.

## What We've Already Established

From our discussion:

1. **Rules are potentially harmful.** Too many explicit rules constrain the model's reasoning and can produce worse output than fewer rules with better reasoning. The system should NOT be "follow these 200 rules." It should be "here are the reasoning patterns expert designers use to arrive at decisions."

2. **Reasoning patterns, not rules.** Instead of "never use more than 3 fonts" → "When choosing typography, reason about: What hierarchy does this create? How many distinct visual levels does the user need to parse? What emotional register does each typeface suggest? Does the combination serve or fight the intent?"

3. **The framework must be intent-anchored.** Every reasoning pattern resolves back to the Design Intent Schema (being built by another agent). Without intent, reasoning has no anchor.

4. **Expert reasoning involves tradeoff resolution.** The framework needs explicit protocols for when principles conflict:
   - Information density vs. white space (depends on user task)
   - Visual hierarchy vs. design consistency (depends on page purpose)
   - Aesthetic preference vs. accessibility (accessibility wins by default unless explicitly overridden)
   - Brand expression vs. usability convention (convention wins for functional elements)

5. **The framework must support nondeterministic judgment.** Many design decisions don't have a single correct answer. The framework should enable the model to reason through ambiguity, state its assumptions, and flag where reasonable designers would disagree.

## What You Need To Produce

1. **A taxonomy of design reasoning patterns** — the actual cognitive operations expert designers perform, translated into reasoning prompts that an LLM can follow. Organized by when they're needed (problem framing, generation, evaluation, iteration).

2. **Tradeoff resolution protocols** — for the most common design tensions. Not "rule A beats rule B" but "when A and B conflict, reason through these questions to determine which serves the intent better."

3. **The reasoning chain structure** — what does a complete design reasoning chain look like, step by step? From intent → framing → generation → self-evaluation → iteration. What does the model think about at each step?

4. **Anti-patterns** — what does bad design reasoning look like? Rule-following without context. Aesthetic optimization without intent. Consistency for its own sake. Surface-level analogy (copying the look of a site without understanding why it works). The framework should help the model recognize and avoid these.

5. **Interface with other system components** — how does the reasoning framework consume the Intent Schema? How does it feed into the Mismatch Detector? How does it guide the Flow Understanding agent?

6. **A critical assessment** — which aspects of expert design reasoning can this framework actually capture? Where are the hard limits? What will still require human judgment? Be honest about the boundaries.

## How To Report Back

Present:
- Your understanding of why reasoning patterns replace rules
- The taxonomy of reasoning patterns with examples
- The tradeoff resolution approach
- The complete reasoning chain structure
- Your assessment of what this framework can and can't capture
- Open questions and dependencies on the Intent Schema agent's work

Show your reasoning at every step. We need to verify this aligns with the direction we've established.
