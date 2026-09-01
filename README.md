# furtheringdesign

Teaching AI to *reason* about design, not copy patterns.

A multi-agent system for design reasoning. Replaces rule-based UI generation with intent-anchored reasoning, mismatch detection, structural grounding, and an executable candidate-selection protocol.

## Executable protocol

The repository now includes the first runnable Furthering Design Protocol. It converts the F1-F7 research into a zero-dependency Node.js runtime that can:

- validate a computable design intent
- validate candidate direction and safe-change contracts
- detect obvious direction collapse
- validate state-grounded evidence
- reject hard failures and quality-floor failures
- aggregate confidence-weighted evidence with uncertainty penalties
- build a Pareto frontier
- combine evidence, pairwise judgment, and a small diversity term
- return `invalid`, `blocked`, `human-review`, or `selected`
- generate phase-separated packets for framing, exploration, building, critique, and selection

```bash
npm test
npm run validate:example
npm run evaluate:example
node runtime/cli.mjs packet examples/saas-launch/intent.json --out /tmp/furthering-design-packet
```

Start with:

1. [`docs/furthering-design-protocol.md`](docs/furthering-design-protocol.md)
2. [`docs/ui-risk-model.md`](docs/ui-risk-model.md)
3. [`docs/implementation-guide.md`](docs/implementation-guide.md)
4. [`examples/saas-launch/`](examples/saas-launch/)
5. [`research/field-audit-2026-09.md`](research/field-audit-2026-09.md)

The runtime does not claim to calculate universal beauty. It operationalizes constrained design search: purpose first, diverse candidates, safe implementation, real state evidence, calibrated judgment, and explicit human review where evidence cannot resolve the tradeoff.

## Status

Early. Research-heavy, evolving. Foundations 1-3 have completed recursive research with knowledge bundles. The executable protocol is an initial integration of those foundations with flow, structural grounding, and orchestration requirements. It needs calibration on real design runs and production outcome data.

## Why

Current AI UI tools copy visual patterns without reasoning about *why*. The existing Tailwind/UI skill we work with has 39 rule files and produces mediocre output because it applies rules mechanically. Expert designers reason in patterns, intent, evidence, and tradeoffs rather than applying one rule stack to every problem.

This repo is the work of figuring out:

1. What design thinking actually is through cognitive science and expert practice.
2. Which parts can be formalized without pretending taste is deterministic.
3. How to encode those parts as a multi-agent system and executable protocol.
4. How to prevent destructive edits and false preview confidence while the system iterates.

## Structure

```text
docs/                  high-level overview, protocol, risk model, implementation
agent-handoffs/        prompts and specifications for each agent in the system
research/              knowledge bundles, public field audit, adjacent research
references/            raw external material
runtime/               schemas, validators, tournament, reporting, CLI, prompts
adapters/               optional evidence capture integrations
examples/              executable protocol fixtures
tests/                 runtime tests
```

### Read the research in this order

1. `docs/methodology-overview.md`
2. `research/knowledge-bundles/ai-design-thinking/knowledge-bundle.md`
3. `agent-handoffs/00-index.md`
4. `docs/comparison-with-orchestration-approach.md`
5. `docs/furthering-design-protocol.md`

## The agents

| # | Agent | Status |
|---|---|---|
| F1 | Intent Schema | Research done, runtime contract implemented |
| F2 | Design Reasoning Framework | Research done, phased prompts implemented |
| F3 | Mismatch Detection | Research done, evidence and uncertainty model implemented |
| L4 | Flow Understanding | Scoped, state contract integrated |
| L5 | Training Data Pipeline | Scoped |
| L6 | Structural Grounding | Scoped, browser semantic evidence adapter implemented |
| L7 | Orchestration | Scoped, candidate tournament implemented |

## Core principles

1. Reasoning patterns, not rule accumulation.
2. Intent is the anchor.
3. Nondeterminism is real, so confidence and disagreement are explicit.
4. Specialized phases and agents use focused context.
5. Structural grounding and product states matter more than a single screenshot.
6. Generate, score, validate, and select in separate phases.
7. Working code and content are protected by enforceable change contracts.
8. Distinctiveness matters after eligibility, not instead of it.

## Conventions

- Every agent reads assigned context before proposing architecture.
- Every deep research run produces a durable knowledge bundle.
- Every design run produces a durable intent, candidate set, evidence record, and selection decision.
- Hard obligations cannot be traded away by a weighted average.
- Unresolved value judgments return `human-review` rather than false certainty.

## License

CC BY-SA 4.0 — see [LICENSE](./LICENSE).
