# Knowledge Bundle: Computable Design Intent Schema

> **Topic:** How to define, elicit, validate, and represent design intent as a computable construct for AI design reasoning systems.
> **Cycles:** 2 (Cycle 1: 5 core-tier queries · Cycle 2: 3 pro-tier queries)
> **Total queries:** 8
> **Run date:** 2026-05-05
> **Estimated cost:** ~$0.43

---

## 1. Executive Summary

Design intent — the structured declaration of what a design is trying to achieve, for whom, under what constraints — is formalizable and has well-established precedent across multiple disciplines. The research reveals strong convergence from four independent fields (professional design practice, goal-oriented requirements engineering, HCI methodology, and AI alignment) on what intent *is* and how it should be structured.

The minimum viable intent specification consists of **six core dimensions**: (1) Problem/outcome, (2) Audience/context, (3) Deliverable/scope, (4) Non-negotiable constraints, (5) Success criteria, and (6) Degrees of freedom. These six are the universal core found across creative briefs, PRDs, user stories, and GORE goal models. Everything else is progressive elaboration.

Intent is **hierarchical** — it cascades from product-level brand values through page-level objectives to section-level local intents to component-level micro-intents. At each level, intent both *transfers* (as inherited constraints) and *transforms* (through contextual specialization). Conflicts between levels are resolved through explicit precedence rules (accessibility is non-negotiable; one primary action per view; page-level intent overrides section ambition).

The relationship between constraint and creativity follows an **inverted-U curve** — too little intent produces unfocused work, too much produces design fixation. The optimal schema captures enough to enable reasoning while explicitly defining *degrees of freedom* where creativity is invited.

For conflict resolution, the research strongly supports a **three-tier hierarchy**: (1) satisfy non-negotiable constraints first (legal, accessibility, safety), (2) apply organizational design principles as tie-breakers, (3) use structured trade-off analysis (SIG evaluation, Pareto fronts, MCDA) for remaining optional goals. This maps cleanly to a computable resolution protocol.

---

## 2. Territory Map

### 2.1 Professional Practice: How Experts Capture Intent

Expert designers work from canonical artifacts that consistently contain the same structural fields regardless of agency or methodology:

- **Creative/Design Briefs** — Background, objectives, target audience, key insight, single-minded proposition, success metrics, constraints, deliverables, decision owners
- **JTBD Statements** — "When [situation], I want [job], so I can [outcome]" + forces of progress (triggers, anxieties, habits, push/pull)
- **PRDs** — Problem statement, goals + KPIs, user stories/scenarios, functional requirements, UX notes, decision log
- **Design Intent Documents** — Design principles, decisions + trade-offs, assumptions + risks, edge cases

Senior designers translate ambiguity into structure through: brief reframing (vague → measurable), stakeholder extraction (assumptions → explicit), scope locking (MVP vs non-goals), and kickoff questions ("Why now?", "How will we measure?", "What do we already know?").

### 2.2 GORE: Formal Goal Hierarchies

Goal-Oriented Requirements Engineering provides the most rigorous formal precedent for computable intent:

**Structural primitives:**
- Goals (functional, clear satisfaction criteria) and Soft-goals (non-functional, "satisficed")
- Agents/Actors responsible for achieving goals
- Tasks/Operations that realize goals
- Obstacles that prevent goal achievement
- Contribution links (+, ++, -, --) between goals

**Decomposition:** AND/OR refinement trees. AND = all subgoals required. OR = alternative means to the same end.

**Conflict handling:** Label propagation on Softgoal Interdependency Graphs (SIGs) — evaluating how low-level options impact high-level goals. Divergence analysis for formal inconsistency detection. Obstacle analysis for proactive risk identification.

**Application to UX:** User experience qualities (delight, trust, efficiency) modeled as soft-goals. Design options modeled as tasks. Contribution links evaluate which configurations best satisfy experience goals.

### 2.3 HCI: How User Intent Is Represented

Seven major frameworks converge on common elements:

| Framework | Level | Key Structural Elements |
|-----------|-------|------------------------|
| Hierarchical Task Analysis (HTA) | Micro (task flows) | Goal → sub-goals → operations → plans |
| User Journey Maps | Macro (temporal) | Stages, touchpoints, emotional curves, pain points |
| Scenario-Based Design | Meso (contextual narratives) | Actors, motivations, settings, sequences, success criteria |
| Activity Theory | Systems (socio-cultural) | Subject, object, tool, rules, community, division of labor |
| Use Cases / User Stories | Micro (requirements) | Actor + goal + benefit; preconditions/postconditions |
| Mental Models | Conceptual (expectations) | User's expected behavior vs system's actual behavior |
| Contextual Design | Meso (work context) | Day-in-the-Life, Sequence models, Flow models, intents + breakdowns |

**Cross-framework synthesis:** Common elements are Actors (who), Goals (what), Tasks (how), Context (where), and Success criteria (how well).

### 2.4 AI Goal Representation: What's Computationally Tractable

Representational primitives proven tractable in AI systems:

| Primitive | Mechanism | Tractability |
|-----------|-----------|-------------|
| Discrete control codes | Tokens appended to condition generation (CTRL) | High — integrates into standard autoregressive modeling |
| Prompt/context conditioning | System prompts, learned prefixes | High — most common method for LLM intent spec |
| Classifier guidance | External discriminators steer sampling (PPLM, diffusion guidance) | Medium — increases inference cost |
| Reward/preference models | Human preferences compressed into scalar reward (RLHF) | Medium — training intensive, inference efficient |
| Constitutional principles | Hand-authored textual rules for self-critique | High — lightweight, auditable |
| Hard constraints | Explicit functions in constrained optimization | Medium — domain-specific |
| Multi-objective optimization | Weighted sums or Pareto fronts (NSGA-II) | Medium — computationally intensive for many objectives |

**Key insight:** Constitutional principles (textual rules applied during self-critique) are the most directly applicable precedent for a design intent schema consumed by an AI reasoning system.

### 2.5 Intent Cascade: Product → Page → Section → Component

Design systems decompose intent through five levels:

1. **Product/Brand/System Foundations** — Core mission, brand values, non-negotiable standards encoded as foundational tokens and semantic guidance
2. **Page Template / IA Level** — Specific page purpose (convert, orient, wayfind), prominence budgets, content hierarchy
3. **Section/Organism Level** — Localized intents contributing to page goal (hero: value proposition; testimonials: trust; pricing: decision friction reduction)
4. **Component/Molecule Level** — Micro-intents via semantic variants (primary button = most important action; destructive button = irreversible action)
5. **Instance Level** — Populated templates validating the cascade under real content

**Transfer vs Transform:** Intent transfers downward as constraints (brand colors, contrast minimums). It transforms through contextual specialization (choosing a tonal button instead of filled based on local role).

**Conflict resolution at boundaries:** "One primary action per view/area" governance rule; page-level intent overrides section ambition; accessibility constraints are non-negotiable floors.

### 2.6 Minimum Viable Intent

Six dimensions constitute the universal core:

1. **Problem/Outcome** — Why this exists. Without it: no stopping rule, no evaluation criteria
2. **Audience/Context** — Who, where, arriving from what state. Without it: tone/accessibility/relevance fail
3. **Deliverable/Scope** — What's being produced (page, section, component, flow). Without it: "beautiful wrong things"
4. **Non-negotiable Constraints** — Hard rules (brand, legal, accessibility, technical). Without it: late-stage rejection
5. **Success Criteria** — How "good" is measured. Without it: endless subjective debate
6. **Degrees of Freedom** — What's fixed vs open. Without it: fixation OR scatter

The **inverted-U relationship** between constraints and creativity means: lock the core 6 + 3-5 mandatories, then explicitly declare 2-4 levers open for exploration. This is the empirical sweet spot.

**Progressive specification** is the correct workflow: start with minimal viable intent, elaborate as design develops. This mirrors professional "rolling-wave planning" and suits conversational AI interaction patterns.

### 2.7 Conflict Detection and Resolution

The Design-Intent Conflict Model (DICM) from the research provides a three-part framework:

**Representation:** Goals and soft-goals with contribution links (Make/Help/Hurt/Break), explicit conflict links, constraints as mandatory hard goals, principles as meta-preferences.

**Detection methods:**
- Structural: explicit conflict links, negative contribution paths
- Formal: divergence analysis, obstacle analysis
- Qualitative: SIG label propagation (satisficed/denied/conflicting)
- Empirical: guardrail metrics, user testing
- Optimization: Pareto front visualization of trade-offs

**Resolution hierarchy:**
1. Non-negotiable constraints WIN (accessibility, legal, safety)
2. Organizational principles tie-break (e.g., "user trust always wins")
3. Structured trade-off analysis for remaining goals (MCDA, WSJF, Pareto)

**Resolution strategies beyond hierarchy:** Goal weakening (narrow scope), goal substitution (different mechanism for same value), agent substitution (reassign responsibility), obstacle mitigation, WinWin negotiation.

---

## 3. Load-Bearing Claims

- **Claim:** The minimum viable design intent specification consists of six universal dimensions found across creative briefs, PRDs, and goal models.
- **Excerpt:** "A cross-referential analysis of creative briefs, design briefs, and product requirements documents (PRDs) reveals a universal core of intent dimensions that are almost always present, either explicitly or implicitly."
- **Source URL:** Multiple (Asana design brief templates, Intercom PRD, IDEO, NN/g)
- **Confidence:** high
- **Full basis ref:** cycle-2/02-minimum-viable-intent.md#universal_core_of_design_intent
- **Cycle:** 2

---

- **Claim:** The relationship between constraints and creativity follows an inverted-U curve — moderate constraints produce the highest quality creative output.
- **Excerpt:** "Research into the relationship between constraints and creativity consistently reveals an inverted-U shaped curve. This pattern indicates that creativity is often highest with a moderate level of meaningful constraints."
- **Source URL:** Acar et al., 2019 meta-analysis; design fixation research (Jansson and Smith, 1991)
- **Confidence:** high
- **Full basis ref:** cycle-2/02-minimum-viable-intent.md#impact_of_constraints_on_creativity
- **Cycle:** 2

---

- **Claim:** GORE frameworks provide computable mechanisms for representing goal hierarchies with AND/OR decomposition and contribution-link-based conflict detection that are directly applicable to design intent.
- **Excerpt:** "Goals are decomposed into subgoals. AND-refinement requires all subgoals to be satisfied; OR-refinement represents alternative ways to achieve a higher-level goal."
- **Source URL:** https://www.cse.msu.edu/~cse870/Materials/GoalModeling/KaosTutorial-2007.pdf
- **Confidence:** high
- **Full basis ref:** cycle-1/02-goal-oriented-requirements.md#output
- **Cycle:** 1

---

- **Claim:** Design systems resolve intent conflicts through explicit precedence: non-negotiable constraints first, then organizational principles as tie-breakers, then structured trade-off analysis.
- **Excerpt:** "The highest priority is given to satisfying immutable constraints, which are modeled as mandatory hard goals. This includes legal requirements, safety standards, and accessibility obligations."
- **Source URL:** KAOS/NFR frameworks; VSD (Friedman, Kahn, Borning)
- **Confidence:** high
- **Full basis ref:** cycle-2/03-conflict-resolution.md#conflict_resolution_strategies
- **Cycle:** 2

---

- **Claim:** Intent cascades through the UI hierarchy via both transfer (as inherited constraints) and transformation (through contextual specialization), with governance rules resolving cross-level conflicts.
- **Excerpt:** "Intent flows downwards, transferring as constraints (e.g., brand colors, accessibility contrast minimums) and transforming as it is specialized for context (e.g., choosing a button variant based on its role in a section)."
- **Source URL:** Brad Frost (Atomic Design), Material Design 3, Apple HIG, GOV.UK Design System
- **Confidence:** high
- **Full basis ref:** cycle-2/01-intent-cascade.md#the_intent_cascade_model
- **Cycle:** 2

---

- **Claim:** Constitutional AI principles (textual rules applied during self-critique) are the most directly applicable AI precedent for a design intent schema consumed by a reasoning system.
- **Excerpt:** "In Constitutional AI, goals are represented as a set of hand-authored textual rules used by the model to critique and revise its own outputs."
- **Source URL:** https://arxiv.org/abs/2212.08073
- **Confidence:** high
- **Full basis ref:** cycle-1/04-ai-goal-representation.md#output
- **Cycle:** 1

---

- **Claim:** Progressive specification of intent is both effective and matches professional workflow — start minimal, elaborate as design develops.
- **Excerpt:** "Yes, design intent can and often should be specified incrementally rather than all at once. This approach aligns with established practices in several fields."
- **Source URL:** PMI (progressive elaboration), NN/g (progressive disclosure)
- **Confidence:** high
- **Full basis ref:** cycle-2/02-minimum-viable-intent.md#progressive_specification_of_intent
- **Cycle:** 2

---

## 4. Contested or Uncertain Areas

### 4.1 Whether "degrees of freedom" should be explicit in the schema

The research strongly supports explicit declaration of what's open vs fixed. But in practice, most design briefs leave this implicit. Making it explicit requires the user to articulate what they DON'T know — which is often the hardest thing to specify. The schema may need to support both explicit declaration and inference of degrees of freedom from omitted fields.

### 4.2 How granular section-level intent needs to be

The cascade research shows clear intent at page and component levels. But section-level intent (hero = "value proposition", testimonials = "build trust") is often tacit in professional practice — designers know it but don't write it down. Whether the schema should require explicit section-level intent or allow it to be inferred from page-level intent + section type is an open design choice.

### 4.3 Whether brand values should be inline or referenced

Brand is a "set of values to align to" — but brand guidelines are often large, complex documents. Should the intent schema inline brand values (personality: "confident, minimal, precise") or reference an external brand definition? The answer likely depends on whether brand values are stable across the project (reference) or need per-page adaptation (inline).

### 4.4 Soft-goal quantification

GORE frameworks allow numerical weights on contribution links (-1.0 to +1.0). In practice, designers rarely assign precise numbers to values like "trust" or "delight." The schema may work better with qualitative priority (primary/secondary/tertiary) rather than numeric weights, but this reduces the precision of automated conflict detection.

---

## 5. Frontier and Open Questions

**FQ1 — Intent co-evolution with design:** The schema captures intent at a point in time, but intent and solution co-evolve. How should the schema handle versioning? Should there be explicit "intent v1 → v2" transitions as the design develops? This connects to the progressive elaboration finding.

**FQ2 — Inferred vs stated intent:** How much intent can be reliably inferred from context (project type, existing codebase, competitor analysis) vs requiring explicit user articulation? This determines the elicitation protocol's balance of questions vs inference.

**FQ3 — The "feelings" dimension:** Emotional register, brand tone, and experiential goals are soft-goals in GORE terms. They resist precise specification. "The landing page should feel premium and effortless" — how does the schema represent this without either over-formalizing it or leaving it too vague for reasoning?

**FQ4 — Cross-page intent coherence:** A flow (onboarding → dashboard → settings) has flow-level intent that no single page fully expresses. How does the schema represent intent that spans multiple pages? This is the multi-screen gap identified in the prior research.

**FQ5 — Intent validation without a human in the loop:** Can an AI system detect that intent is under-specified, internally contradictory, or impossible to satisfy — and surface this to the user before generating? What are the minimal checks?

---

## 6. User Questions (Deferred)

**U1 — Brand representation:** Should brand be defined once at the project level and referenced by all page-level intents? Or should brand values be selectable/adaptable per-page (e.g., a support page might de-emphasize "bold and aspirational" in favor of "clear and helpful")? → Determines whether brand is a project-level constant or a page-level input.

**U2 — Schema format preference:** YAML, JSON, or structured Markdown? The choice affects how the schema integrates with the existing skill system and how readable it is for human review.

**U3 — Granularity of initial implementation:** Should the first version of the schema require all six dimensions, or accept partial intent and infer the rest? The progressive elaboration research supports starting minimal, but the validation research suggests incomplete intent leads to poor reasoning.

---

## 7. Run Metadata

**Cycles run:** 2
**Queries by tier:**
- Cycle 1: 5 × core ($0.025 each) = $0.125
- Cycle 2: 3 × pro ($0.10 each) = $0.30
- **Total: ~$0.43**

**Top 3 learnings:**

1. **The six-dimension universal core is well-established.** Problem/outcome, audience/context, deliverable/scope, constraints, success criteria, degrees of freedom — these appear in every formalization of design intent across all fields studied. This isn't our invention; it's a convergent discovery.

2. **The inverted-U constraint-creativity relationship gives us a design principle for the schema itself.** The schema must be "moderately constraining" — enough to enable reasoning, not so much that it causes fixation. Degrees of freedom as an explicit field is the mechanism for this.

3. **GORE's contribution links and three-tier resolution hierarchy are directly implementable.** Non-negotiable constraints → principles → trade-off analysis is a clean, computable protocol. Combined with SIG-style propagation, this gives us a formal conflict resolution mechanism that matches how expert designers actually reason.

**Suggested next actions:**
1. Design the schema using the six-dimension core + brand values + cascade mechanism
2. Define the elicitation protocol using progressive elaboration (minimal → full)
3. Implement the three-tier conflict resolution as a computable protocol
4. Specify the interface contracts for downstream consumers (Mismatch Detector, Design Reasoning Framework, Flow Understanding)
