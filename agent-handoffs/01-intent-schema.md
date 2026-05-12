# Agent Handoff: Foundation 1 — Design Intent Schema

## Your Mission

You are designing the **Intent Schema** — the structured format that captures what a design is trying to achieve, for whom, and under what constraints. This is the backbone of a larger system that will teach AI to reason about design rather than copy patterns.

Without intent, nothing else in the system works. The Design Reasoning Framework can't resolve tradeoffs (between what?). The Mismatch Detector can't determine what "wrong" means (wrong for what purpose?). The critique system can't evaluate against purpose (what purpose?). You are building the anchor.

## Mandatory First Step — Read Context, Report Understanding, Then Run Research

Before proposing the Intent Schema, you MUST first read all required context files, report your understanding to the user for alignment, and only after confirmation run a dedicated foundational recursive research pass on **computable design intent**.

Do not skip this. The existing research is context and MUST be read before any new research is launched. But it is not enough to complete your task. Your first job is to deepen the territory specifically around intent elicitation, intent schemas, goal modeling, design briefs, design rationale, UX requirements, and how expert designers define/validate intent.

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
   - `.building/knowledge-bundles/intent-schema/`

3. Run recursive research using the skill workflow. Your Cycle 1 must include at least these angles:
   - How expert designers elicit and structure design intent from briefs, stakeholders, users, brand constraints, and success metrics.
   - Existing frameworks for requirements engineering, Jobs-to-be-Done, UX goals, product requirement documents, design briefs, and design rationale that could map to a computable intent schema.
   - How intent is represented in HCI, UX research, interaction design, task modeling, user journeys, and goal-oriented requirements engineering.
   - How AI systems represent goals, constraints, preferences, and success metrics for creative/generative tasks.
   - How to validate whether a stated design intent is coherent, complete, conflicting, under-specified, or impossible.

4. After Cycle 1, perform gap analysis. If high-priority gaps remain, run Cycle 2 targeted at those gaps. Prioritize questions like:
   - What minimal intent fields are necessary for design reasoning without overconstraining creativity?
   - How do intent schemas cascade from product → flow → page → section → component?
   - How should conflicts between business goals, user goals, brand goals, and accessibility goals be represented?

5. Write the final bundle to:
   - `.building/knowledge-bundles/intent-schema/knowledge-bundle.md`

### Post-research report-back

After completing the recursive research and before designing the schema, report back with:
- The research cycles you ran and files produced
- The strongest findings that change or refine the initial assumptions in this handoff
- The remaining contested/open questions
- Your updated framing of the problem

Only after user confirms your post-research framing should you propose the Intent Schema.

## The Problem You're Solving

Expert designers evaluate against **intent** — "Is this achieving what this design is trying to do for this user in this context?" But there's no formal, computable definition of design intent that an AI system can work with.

The closest existing proxy is UICrit's `task` field: "The main task that the UI screen is designed for" — a single sentence like "sign up for an account." That's far too thin. Intent is multi-dimensional: audience, primary action, emotional register, brand constraints, context of arrival, success metrics, anti-goals.

The meta-problem is: **how does intent get defined in the first place?** A human designer absorbs intent from a client brief, user research, competitive analysis, brand guidelines, and their own judgment. We need to work out how to elicit, structure, validate, and use intent as a computable construct.

## What You Must Read Before Starting

Read ALL of these files to understand the full context:

**Core research (required):**
- `.building/knowledge-bundles/ai-design-thinking/knowledge-bundle.md` — the full knowledge bundle from our foundational research. Read sections 2.1 (what design thinking is), 2.5 (design critique as structured signal), 5 (frontier questions — especially FQ3 on intent), and 6 (deferred user questions — U1 on domain scope).

**Research files with relevant findings:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/01-design-cognition.md` — covers co-evolution (problem and solution evolve together) and abductive reasoning. Intent is what anchors the co-evolution process.
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/02-expert-novice-design.md` — expert vs novice differences. The key finding: experts invest heavily in *framing the problem* before solving. Intent IS the frame.
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/05-design-critique-signal.md` — critique structure includes "intent alignment" as a core evaluation dimension. Describes how critiques reference stated goals.
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/02-uicrit-and-design-rationale-systems.md` — covers QOC (Questions-Options-Criteria) and IBIS design rationale systems. The QOC schema (Questions, Options, Criteria with Assessments) is a historical precedent for structured design reasoning that maps to intent-driven evaluation.

**Potentially useful (read if you need more depth):**
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/06-tacit-knowledge-formalization.md` — covers which aspects of design thinking are formalizable vs resistant. Intent falls squarely in the formalizable category.
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/01-mismatch-signal-and-reasoning-architectures.md` — the mismatch signal section describes how experts evaluate against *expectation* — intent sets the expectation.
- The existing UI skill at `~/.pi/agent/skills/ui/SKILL.md` plus `~/.pi/agent/skills/ui/design-guidelines/general.md` — read these to understand what the current system does and doesn't capture about intent. Notice: intent is completely absent.

## What We've Already Established

From our discussion and research:

1. Intent should be a structured schema, not free text. Something like:
```
intent:
  primary_audience: "..."
  primary_action: "..."
  secondary_actions: [...]
  emotional_register: "..."
  brand_constraints: "..."
  context: "..."  (how the user arrives, their state)
  success_metric: "..."
  anti_goals: [...]
```

2. But this draft is just a starting point. The real questions are:
   - Is this the right set of dimensions? What's missing? What's redundant?
   - How does intent get elicited from a user who may not have articulated it?
   - How does intent get validated — how do you know the intent is coherent and complete?
   - How does intent connect to the Design Reasoning Framework — what's the interface?
   - How do different intent dimensions resolve when they conflict?
   - Should intent be hierarchical (page-level → section-level → component-level)?
   - How does intent relate to brand? Is brand a constraint within intent, or a separate layer?

3. The research on QOC (Questions-Options-Criteria) is relevant because it shows how structured reasoning about design alternatives can be anchored to explicit criteria — which are derived from intent.

4. The existing UI skill has NO concept of intent. It routes based on "what kind of page is this" (landing page → load these guidelines). That's pattern matching, not intent reasoning.

## What You Need To Produce

1. **A proposed Design Intent Schema** — the complete structured format with every dimension defined, including:
   - What each field means precisely
   - Required vs optional fields
   - How fields relate to each other
   - Example instances for 3-4 different design contexts (SaaS landing page, e-commerce product page, dashboard, mobile onboarding flow)

2. **An Intent Elicitation Protocol** — how to extract intent when the user hasn't explicitly stated it. This should cover:
   - What questions to ask
   - What can be inferred from context (project type, existing design, codebase)
   - How to surface implicit assumptions
   - How to validate completeness

3. **An Intent Resolution Framework** — how to handle conflicts between intent dimensions (e.g., "be trustworthy and professional" vs "maximize conversion aggressiveness") and how intent cascades from page-level to section-level to component-level.

4. **Interface specification** — how other agents in the system will consume the Intent Schema. What does the Mismatch Detector need from intent? What does the Design Reasoning Framework need? What does the Flow Understanding agent need?

## How To Report Back

After reading the research and developing your thinking, present:
- Your understanding of why intent is the backbone of the system
- The key tensions and tradeoffs you see in designing the schema
- Your proposed schema with reasoning for each dimension
- The elicitation protocol
- The resolution framework
- Open questions you need answered before finalizing

Do NOT assume alignment — show your reasoning so we can verify it matches the direction we need.
