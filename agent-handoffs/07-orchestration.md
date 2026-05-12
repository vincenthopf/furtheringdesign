# Agent Handoff: Layer 7 — Orchestration Architecture

## Your Mission

You are designing the **Orchestration Architecture** — the multi-agent system that coordinates all the other components (Intent Schema, Design Reasoning Framework, Mismatch Detection, Flow Understanding, Training Data Pipeline, Structural Grounding) into a coherent system for front-end design and development.

This is NOT a skill. A skill is one agent with one set of instructions. This is a multi-agent system with an orchestration layer. No single agent can hold all of this context, and asking one agent to do all of it produces mediocre results across the board. You're designing the system that makes specialized agents work together.

## Mandatory First Step — Read Context, Report Understanding, Then Run Research

Before proposing the Orchestration Architecture, you MUST first read all required context files, report your understanding to the user for alignment, and only after confirmation run a dedicated foundational recursive research pass on **multi-agent orchestration for creative/design systems, iterative critique loops, human-in-the-loop workflows, and agent communication protocols**.

Do not skip this. The existing research MUST be read before any new research is launched. It tells us this is not a skill, but your job is to research how such a system should be orchestrated so agents don't fight each other, loop forever, or lose intent.

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
   - `.building/knowledge-bundles/orchestration-architecture/`

3. Run recursive research using the skill workflow. Your Cycle 1 must include at least these angles:
   - Multi-agent architecture patterns for design/code generation: planner-generator-critic loops, debate, evaluator-optimizer loops, reflection/self-refine, hierarchical agents.
   - Human-in-the-loop creative systems: where humans validate intent, resolve aesthetic disagreements, approve tradeoffs, and stop iteration.
   - Workflow orchestration for iterative design: co-evolution, reframing, critique loops, convergence/stopping criteria, preventing infinite loops.
   - Data contracts and shared state between agents: intent schemas, critique reports, grounded element references, flow graphs, rationale records.
   - Existing AI coding/design agent systems and what fails when one agent tries to do everything.

4. After Cycle 1, perform gap analysis. If high-priority gaps remain, run Cycle 2. Prioritize:
   - How to coordinate specialized agents without overloading context.
   - How to handle disagreement between agents.
   - How to decide when the full system is needed vs a lightweight path.

5. Write the final bundle to:
   - `.building/knowledge-bundles/orchestration-architecture/knowledge-bundle.md`

### Post-research report-back

After completing the recursive research and before designing the orchestration architecture, report back with:
- The research cycles you ran and files produced
- What orchestration patterns are most relevant
- Where human checkpoints are required
- How agents should communicate and resolve disagreements
- Your updated framing of the problem

Only after user confirms your post-research framing should you propose the Orchestration Architecture.

## The Problem You're Solving

The system needs to coordinate multiple specialized agents, each with focused expertise, to produce design output that is:
- Intent-aligned (serves the stated purpose)
- Reasoning-grounded (every decision has a traceable rationale)
- Mismatch-checked (wrongness is detected before output)
- Flow-aware (individual screens fit their context)
- Structurally-grounded (feedback is specific and actionable)

The orchestration challenge is: what's the workflow? When does each agent fire? What information flows between them? How do they handle disagreements? What's the human's role in the loop?

## What You Must Read Before Starting

**Core research (required):**
- `.building/knowledge-bundles/ai-design-thinking/knowledge-bundle.md` — READ THE ENTIRE THING. You need the full picture. Pay special attention to:
  - Section 2.7 (the architecture that could work)
  - Section 2.1 (co-evolution — the design process is iterative, not linear)
  - Section 2.2 (expert behavior — experts iterate, reframe, and self-critique)
  - Section 4 (contested areas — what the system can and can't do)
  - Section 5 (frontier questions — the open problems)
  - Section 6 (user questions — especially U2 on build path)

**All agent handoff docs (required — you need to understand what each agent produces):**
- `.building/agent-handoffs/01-intent-schema.md` — Intent Schema agent's deliverables
- `.building/agent-handoffs/02-design-reasoning-framework.md` — Reasoning Framework agent's deliverables
- `.building/agent-handoffs/03-mismatch-detection.md` — Mismatch Detection agent's deliverables
- `.building/agent-handoffs/04-flow-understanding.md` — Flow Understanding agent's deliverables
- `.building/agent-handoffs/05-training-data-pipeline.md` — Training Data Pipeline agent's deliverables
- `.building/agent-handoffs/06-structural-grounding.md` — Structural Grounding agent's deliverables

**Research on relevant architectural patterns:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/01-mismatch-signal-and-reasoning-architectures.md` — read sections on "Training Approaches for LLM Reasoning" (especially inference-time orchestration: retrieval-augmented critique, multi-agent debate, PRM-based reranking) and "Synthesis Bridging Cognition and AI."
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/03-process-supervision-multimodal.md` — read "Chain of Thought for Design Critique" (the two-stage pipeline: reasoning then localization) and "Future Outlook and Research Directions" (tool integration into design workflows).

**Potentially useful:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/01-design-cognition.md` — co-evolution and iterative reasoning. The orchestration must support iteration, not just linear pipelines.
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/02-uicrit-and-design-rationale-systems.md` — read the section on ADRs (Architecture Decision Records) as a lightweight rationale capture system. The orchestration might produce ADR-like artifacts for each design decision.
- The existing UI skill at `~/.pi/agent/skills/ui/SKILL.md` — understand the current single-agent approach and why it's insufficient.

## What We've Already Established

From our discussion:

1. **This is not a skill — it's a system.** A skill is one agent, one file, one set of rules. This system requires:
   - An orchestrator that routes tasks to specialized agents
   - Shared state (Intent Schema, flow context, design artifacts)
   - Feedback loops (mismatch detection feeds back to generation)
   - Human-in-the-loop checkpoints (intent validation, aesthetic judgment)

2. **The system will be used for all front-end development**, not just UI generation. It covers:
   - Design reasoning (should we use a modal or a page transition here?)
   - Generation (produce the actual code)
   - Evaluation (is this good? what's wrong?)
   - Iteration (fix what's wrong, re-evaluate)
   - Flow-level coordination (ensure screens work together)

3. **Expert design is iterative, not linear.** The orchestration cannot be a simple pipeline (intent → design → evaluate → done). It must support:
   - Reframing (changing the problem definition mid-process based on what you've learned)
   - Co-evolution (the solution influences the problem definition)
   - Self-critique (generating, evaluating, and revising in loops)
   - Satisficing (accepting "good enough" tradeoffs rather than optimizing forever)

4. **No single agent holds all context.** Each agent needs focused context to perform well. The orchestrator manages what context flows to which agent and when.

## What You Need To Produce

1. **System architecture diagram** — the full system with all agents, their responsibilities, and the data flows between them. Make explicit:
   - What each agent receives as input
   - What each agent produces as output
   - What shared state exists
   - Where human checkpoints occur

2. **Workflow specification** — the step-by-step process for a design task from start to finish:
   - How a task enters the system (user prompt, project context)
   - How intent gets established
   - How design reasoning produces candidate designs
   - How mismatch detection evaluates candidates
   - How structural grounding makes feedback actionable
   - How iteration loops work
   - How flow-level consistency is maintained
   - How the task concludes

3. **Agent communication protocol** — how agents pass information to each other:
   - Data formats (Intent Schema, reasoning chains, mismatch reports, grounded feedback)
   - Handoff triggers (what causes one agent to hand off to another)
   - Disagreement resolution (what happens when the Reasoning Framework says one thing and the Mismatch Detector says another)

4. **Iteration model** — how the system supports the iterative nature of design:
   - When does it loop back to re-evaluate?
   - When does it reframe the problem?
   - When does it stop iterating and ship?
   - How does it prevent infinite loops?

5. **Human-in-the-loop specification** — where humans must be involved:
   - Intent validation (is this what you actually want?)
   - Aesthetic judgment calls (where reasonable designers disagree)
   - Tradeoff decisions (when the system can't resolve a conflict)
   - Final approval

6. **Scaling model** — how does this system handle:
   - Small tasks (single component) vs. large tasks (full application)
   - Simple contexts (landing page) vs. complex contexts (multi-flow SaaS app)
   - When to use the full system vs. a lightweight subset

## How To Report Back

Present:
- Your understanding of why this is a multi-agent system, not a skill
- The system architecture with all agents and data flows
- The workflow specification
- The agent communication protocol
- The iteration model
- The human-in-the-loop specification
- The scaling model
- Critical risks and dependencies
- What needs to be built first vs. what can be deferred
