# furtheringdesign

Teaching AI to *reason* about design, not copy patterns.

A multi-agent system for design reasoning. Replaces rule-based UI generation with intent-anchored reasoning, mismatch detection, and structural grounding.

## Status

Early. Research-heavy, evolving. Foundations 1–3 have completed recursive research with knowledge bundles. Design phase pending. Layers 4–7 scoped, not yet dispatched.

## Why

Current AI UI tools (Figma AI, Midjourney, Galileo) copy visual patterns without reasoning about *why*. The existing Tailwind/UI skill we work with has 39 rule files and produces mediocre output because it applies rules mechanically. Anthropic's own research shows specific rules damage LLM generalization. Expert designers reason in patterns, not rules.

This repo is the work of figuring out:
1. What design thinking actually is (cognitive science of expert design)
2. What the formalizable parts are
3. How to encode them as a multi-agent system instead of a skill

## Structure

```
docs/                  ← high-level overview, comparisons with other approaches
agent-handoffs/        ← prompts/specs for each agent in the system
research/
  knowledge-bundles/   ← deep research outputs (recursive research cycles)
  external-research/   ← adjacent research not tied to a specific agent
references/            ← raw external material (other people's work)
```

### Read in this order

1. `docs/methodology-overview.md` — what the system is
2. `research/knowledge-bundles/ai-design-thinking/knowledge-bundle.md` — the foundational research that started this
3. `agent-handoffs/00-index.md` — the agent dispatch map
4. `docs/comparison-with-orchestration-approach.md` — how this compares to a parallel orchestration-focused effort

## The Agents

| # | Agent | Status |
|---|---|---|
| F1 | Intent Schema | Research done, design pending |
| F2 | Design Reasoning Framework | Research done, design pending |
| F3 | Mismatch Detection | Research done, design pending |
| L4 | Flow Understanding | Scoped |
| L5 | Training Data Pipeline | Scoped |
| L6 | Structural Grounding | Scoped |
| L7 | Orchestration | Scoped |

## Core Principles

1. Reasoning patterns, not rules
2. Intent is the anchor
3. Nondeterminism is real (confidence tiering, not fake certainty)
4. Specialized agents with focused context
5. Structural grounding over pixel grounding
6. Phased: generate → score → validate (don't mix)

## Conventions

- Every agent runs a recursive research gate before designing anything
- Every agent reports understanding for alignment before researching
- Every agent reports findings for confirmation before building
- Every deep research run produces a knowledge bundle artifact
- Knowledge bundles are durable — they outlive sessions

## License

CC BY-SA 4.0 — see [LICENSE](./LICENSE).
