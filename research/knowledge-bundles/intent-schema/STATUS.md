# Intent Schema — Foundation 1 Status Report

**Agent:** Claude (session 2026-05-05)
**Task:** Design the Intent Schema — the structured format that captures what a design is trying to achieve, for whom, and under what constraints.
**Status:** Research complete. Schema design pending user confirmation of framing.

---

## What I Did

### Phase 1: Context Reading

Read all required files from the prior AI Design Thinking research bundle (8 files), the current UI skill (SKILL.md + general.md design guidelines), and the foundational-recursive-research skill instructions. Reported understanding back to user, identified where the handoff was underdefined or possibly wrong, and proposed a research plan. User confirmed with one correction: brand is a set of values to align to (positive vector), not merely constraints.

### Phase 2: Recursive Research (2 cycles, 8 queries, ~$0.43)

**Cycle 1 — 5 queries at core tier ($0.025 each):**
1. How expert designers elicit/structure intent from briefs and stakeholders
2. Goal-Oriented Requirements Engineering (KAOS, i*, Tropos) — formal goal hierarchies
3. Intent representation in HCI (task analysis, journey maps, scenarios, activity theory)
4. How AI systems represent goals/constraints for creative tasks (CTRL, Constitutional AI, RLHF)
5. Intent validation — coherence, completeness, conflict detection

**Cycle 2 — 3 queries at pro tier ($0.10 each):**
1. Intent cascade through UI hierarchy (atomic design, design tokens, IA)
2. Minimum viable intent specification (creative brief paradox, constraint-creativity curve)
3. Multi-dimensional conflict resolution (VSD, Pareto, GORE, priority hierarchies)

### Phase 3: Synthesis

Wrote the knowledge bundle synthesizing all findings into a structured territory map with load-bearing claims, contested areas, and open questions.

---

## Deliverables Produced

All files at `.building/knowledge-bundles/intent-schema/`:

| File | What It Is |
|------|-----------|
| `scope.md` | Research scope definition, angles, constraints |
| `cost-log.md` | Running cost tracker |
| `cycle-1/01-intent-elicitation.md` | How pros capture intent (briefs, JTBD, PRDs) |
| `cycle-1/02-goal-oriented-requirements.md` | GORE formal primitives (goals, soft-goals, AND/OR, contribution links) |
| `cycle-1/03-hci-intent-representation.md` | 7 HCI frameworks for intent (HTA, journeys, scenarios, activity theory) |
| `cycle-1/04-ai-goal-representation.md` | AI goal primitives (control codes, Constitutional AI, reward models) |
| `cycle-1/05-intent-validation.md` | Validation methods (coherence, completeness, actionability) |
| `cycle-2/01-intent-cascade.md` | How intent decomposes product → page → section → component → instance |
| `cycle-2/02-minimum-viable-intent.md` | The 6 universal core dimensions + inverted-U constraint-creativity curve |
| `cycle-2/03-conflict-resolution.md` | Full DICM model (representation, detection, 3-tier resolution) |
| `knowledge-bundle.md` | Final synthesis — the deliverable that matters |

---

## Key Findings

1. **Six-dimension universal core** — Problem/outcome, Audience/context, Deliverable/scope, Constraints, Success criteria, Degrees of freedom. Convergent across creative briefs, PRDs, GORE, and HCI. This is the minimum viable intent.

2. **Brand is a values alignment layer** — sits alongside the core six as positive direction, not just constraints.

3. **Inverted-U constraint-creativity curve** — the schema must be moderately constraining. "Degrees of freedom" as an explicit field prevents design fixation.

4. **Five-level cascade** — Product → Page → Section → Component → Instance. Intent transfers as constraints and transforms through contextual specialization.

5. **Three-tier conflict resolution** — (1) Non-negotiable constraints win (accessibility, legal), (2) Organizational principles tie-break, (3) Structured trade-off analysis for the rest. Directly implementable.

6. **Progressive elaboration is mandatory** — schema must work with partial intent and refine iteratively. Matches how real design works.

7. **The original draft schema from the handoff was wrong.** It mixed abstraction levels and missed critical dimensions (degrees of freedom, deliverable scope). The research-grounded structure is substantially different and better.

---

## What's Next (Blocked on User Confirmation)

The user needs to confirm the post-research framing before I design the actual schema. Once confirmed, I produce:

1. **Design Intent Schema** — complete structured format, field definitions, required vs optional, relationships, 3-4 example instances
2. **Intent Elicitation Protocol** — questions to ask, what to infer, how to validate completeness
3. **Intent Resolution Framework** — conflict detection + 3-tier resolution as computable protocol
4. **Interface Specification** — what downstream agents (Mismatch Detector, Design Reasoning Framework, Flow Understanding) consume from the schema

---

## Open Questions for User

1. Brand: defined once at project level and referenced, or adaptable per-page?
2. Schema format: YAML, JSON, or structured Markdown?
3. First version: require all 6 dimensions or accept partial + infer?
