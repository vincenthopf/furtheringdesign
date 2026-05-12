# Research Scope: Computable Design Intent Schema

## Topic
How to define, elicit, validate, and represent design intent as a computable construct that AI systems can reason against. The schema must serve as the anchor for design critique, mismatch detection, and reasoning about tradeoffs.

## Parameters
- Budget: ~$1.50 target, $3.00 cap
- Depth: deep — this is foundational infrastructure for the entire system
- Domain: web UI/UX (SaaS, e-commerce, dashboards, mobile apps)

## Key Constraints from Prior Research
- Intent is formalizable (per tacit knowledge research)
- Intent is multi-dimensional (not just "task")
- Intent and solution co-evolve (intent refines as design develops)
- Brand is a first-class dimension: a set of values to align to, not just constraints
- QOC is a structural ancestor (Questions derive from intent, Criteria are intent dimensions)
- IBIS/QOC/DRed failed due to authoring overhead — schema must be lightweight
- UICrit's `task` field is a 1D proxy for what is actually multi-dimensional

## Cycle 1 Angles (5 queries, core tier)
1. Intent elicitation from design briefs (expert practice, JTBD, creative brief frameworks)
2. Goal-oriented requirements engineering (KAOS, i*, Tropos, goal models, soft-goals)
3. Intent in HCI and task modeling (task analysis, user journeys, scenario-based design, activity theory)
4. AI goal/constraint representation (controllable generation, constraint satisfaction, Constitutional AI)
5. Intent validation and completeness (coherence, conflicts, under-specification, completeness criteria)

## Prior Research (this bundle builds on)
- `.building/knowledge-bundles/ai-design-thinking/knowledge-bundle.md`
- Relevant findings: co-evolution, expert problem-framing, QOC schema, UICrit task field, mismatch signal
