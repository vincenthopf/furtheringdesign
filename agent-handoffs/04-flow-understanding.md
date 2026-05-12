# Agent Handoff: Layer 4 — Flow-Level Understanding

## Your Mission

You are designing the **Flow-Level Understanding** capability — the system's ability to reason about design across multiple screens, states, and user journeys, not just single static screens.

Every existing design AI system operates on single screens. UICrit evaluates one screenshot. Figma AI generates one frame. The UI skill builds one page. But real design reasoning is flow-level: a button makes sense or doesn't in the context of the 3-step checkout it belongs to. Consistency across screens, state transitions, progressive disclosure, error recovery, and navigation coherence — none of this is capturable from single screenshots.

## Mandatory First Step — Read Context, Report Understanding, Then Run Research

Before proposing the Flow-Level Understanding capability, you MUST first read all required context files, report your understanding to the user for alignment, and only after confirmation run a dedicated foundational recursive research pass on **multi-screen UX reasoning, task flows, interaction states, journey coherence, and flow-level design critique**.

Do not skip this. The existing research MUST be read before any new research is launched. It only identified that current datasets are single-screen. Your job is to research what flow-level design reasoning actually consists of and how it can be represented.

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
   - `.building/knowledge-bundles/flow-understanding/`

3. Run recursive research using the skill workflow. Your Cycle 1 must include at least these angles:
   - UX task-flow analysis, user journey mapping, service blueprints, interaction flows, state diagrams, and information architecture as design reasoning tools.
   - Flow-level usability heuristics: system status, error prevention/recovery, consistency across screens, progressive disclosure, navigation, orientation, feedback, and state preservation.
   - How expert UX designers critique flows differently from individual screens.
   - Existing datasets/benchmarks for multi-step web/app tasks: Mind2Web, OSWorld, WebArena, GUI agents, screen transition datasets, app navigation datasets.
   - How to represent flows computationally: graph schemas, screen states, transitions, user goals, edge conditions, error paths, and success metrics.

4. After Cycle 1, perform gap analysis. If high-priority gaps remain, run Cycle 2. Prioritize:
   - Minimal flow context required for a single screen critique.
   - How to evaluate continuity and coherence across screens.
   - How flow reasoning depends on intent.

5. Write the final bundle to:
   - `.building/knowledge-bundles/flow-understanding/knowledge-bundle.md`

### Post-research report-back

After completing the recursive research and before designing the flow framework, report back with:
- The research cycles you ran and files produced
- What makes flow reasoning different from screen reasoning
- The key flow-quality dimensions
- Existing computational representations you found
- Your updated framing of the problem

Only after user confirms your post-research framing should you propose the Flow-Level Understanding design.

## The Problem You're Solving

Design quality at the flow level involves:
- **Consistency** — is the navigation, typography, color, and component language consistent across screens?
- **Progressive disclosure** — does complexity increase appropriately as the user goes deeper?
- **State awareness** — does the user know where they are in a process? Can they recover from errors? Can they go back?
- **Transition coherence** — does each screen logically follow from the previous one? Are expectations set correctly?
- **Context preservation** — does the user's mental model carry across screens, or do they have to rebuild context?
- **Error recovery** — what happens at each stage if something goes wrong?
- **Goal progression** — does the flow efficiently move the user toward their intent, or does it introduce unnecessary friction?

None of this exists in any current dataset (UICrit, RICO, ENRICO are all single-screen). Mind2Web and OSWorld capture task completion but not design critique of flows.

## What You Must Read Before Starting

**Core research (required):**
- `.building/knowledge-bundles/ai-design-thinking/knowledge-bundle.md` — read section 5, specifically FQ2 (multi-screen critique), FQ3 (intent-aware reasoning — intent anchors flow-level judgment), and section 2.1 (co-evolution — the flow itself evolves as you design it).

**Research files with relevant findings:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/02-uicrit-and-design-rationale-systems.md` — covers UICrit's limitations: "Due to its focus on static, single-screen UIs, the dataset has limited or no coverage of design heuristics related to dynamic interactions or multi-screen flows. Specifically, heuristics such as 'error prevention', 'visibility of system status' (which had only two critiques in the entire dataset), 'feedback and consistency across screens', 'direct manipulation', and 'help and documentation' are noted as being underrepresented or largely absent." Also read the "Potential for Extension" section.
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/03-process-supervision-multimodal.md` — covers Mind2Web and OSWorld as benchmarks for multi-step task completion. Read the "Relevant Datasets and Benchmarks" table for Mind2Web, OSWorld, and Screen2Words. Also covers the Figma REST API for retrieving prototype flows.
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/01-design-cognition.md` — co-evolution of problem and solution. At the flow level, this means screens influence each other — adding a screen changes what the previous screen needs to prepare the user for.
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/02-expert-novice-design.md` — expert chunking extends to flows. Experts see a checkout flow as one chunk with substeps; novices see 4 separate pages.

**Potentially useful:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/05-design-critique-signal.md` — critique dimensions include "consistency across screens" and "feedback" which are flow-level concerns.
- The existing UI skill at `~/.pi/agent/skills/ui/SKILL.md` — notice it has zero concept of flow. Each page is built in isolation.

## What We've Already Established

From our discussion:

1. **Near-term: flow-context prompting.** When working on a screen, require context: what screen comes before? After? What's the user's state when they arrive? This forces flow-level thinking without new data.

2. **Medium-term: multi-screen critique corpus.** Screenshot 3-5 screen flows from production apps. Annotate at the flow level: consistency, progressive disclosure, state feedback, error recovery.

3. **Long-term: Figma plugin for flow-aware critique.** Use the Figma REST API to pull the entire prototype flow graph. Build critique that reasons about transitions, consistency, and state across the full flow.

4. **The flow depends on the Intent Schema.** Flow-level reasoning asks "does this flow efficiently move the user toward their goal?" — which requires knowing the goal. The Intent Schema defines it.

## What You Need To Produce

1. **A Flow Reasoning Model** — what does flow-level design reasoning look like? What are the dimensions of flow quality? How do experts evaluate flows differently from screens? Create a structured framework for flow-level critique.

2. **A Flow Context Schema** — the structured format for capturing flow context when working on individual screens. What information about the flow must be available when reasoning about a single screen? How does this connect to the Intent Schema?

3. **A Multi-Screen Critique Framework** — what specific things should be evaluated at the flow level that can't be evaluated at the screen level? For each, define: what to look for, what good looks like, what bad looks like, and how to detect it.

4. **Data strategy** — what kind of flow-level data is needed to train or prompt for flow understanding? How could it be collected? What existing sources (production apps, design systems, prototype tools) could be leveraged? What does the annotation schema look like for flow-level critique?

5. **Integration model** — how does flow understanding connect to:
   - The Intent Schema (intent defines what the flow should achieve)
   - The Design Reasoning Framework (flow-level tradeoffs like depth vs breadth)
   - The Mismatch Detector (flow-level mismatches: inconsistency, broken expectations)
   - The Structural Grounding layer (grounding to Figma prototype flows, not just single frames)

## How To Report Back

Present:
- Your understanding of why flow-level reasoning is fundamentally different from screen-level reasoning
- The flow reasoning model with all dimensions defined
- The flow context schema
- The multi-screen critique framework
- Your data strategy
- How this integrates with the other agents' work
- Open questions and dependencies
