# Agent Handoff Index — AI Design Thinking System

## Overview

7 agent handoffs, each attacking a specific problem. Three foundations must come first (in order). Four layers build on them (can start in parallel once foundations exist).


## Mandatory Context + Research Gate For Every Agent

Every handoff now contains a **Mandatory First Step — Read Context, Report Understanding, Then Run Research** section. The agent must not proceed directly to research or solution design. It must first:

1. Read every assigned context/research file in its handoff
2. Report back with its understanding of the project, its specific problem, assumptions, risks, and proposed recursive research plan
3. Stop and wait for user confirmation or correction
4. Only after confirmation, read `/Users/vincenthopf/.pi/agent/skills/foundational-recursive-research/SKILL.md` if not already read
5. Create its own `.building/knowledge-bundles/<topic>/` directory
6. Run a scoped recursive research loop using the specified angles in its handoff
7. Write `.building/knowledge-bundles/<topic>/knowledge-bundle.md`
8. Report back with research cycles, files produced, strongest findings, contested/open questions, and updated problem framing
9. Wait for confirmation again before proposing the solution/design for its area

If an agent skips the initial context-reading alignment report, reject the output and tell it to read the files and report understanding first. If it skips recursive research and immediately proposes an architecture, reject the output and tell it to execute the research gate.

## Dispatch Order

### Foundations (sequential — each depends on the previous)

| # | Agent | File | What It Produces | Dependencies |
|---|-------|------|------------------|--------------|
| **F1** | Intent Schema | `01-intent-schema.md` | The structured format for design intent — the backbone anchor for all reasoning | None — start first |
| **F2** | Design Reasoning Framework | `02-design-reasoning-framework.md` | Reasoning patterns (not rules) that guide design decisions | Needs to reference Intent Schema interface |
| **F3** | Mismatch Detection | `03-mismatch-detection.md` | 4-layer wrongness detection system with nondeterminism handling | Needs Intent Schema + Reasoning Framework |

### Layers (can parallelize once F1-F3 are underway)

| # | Agent | File | What It Produces | Dependencies |
|---|-------|------|------------------|--------------|
| **L4** | Flow Understanding | `04-flow-understanding.md` | Multi-screen reasoning, state awareness, flow-level critique | Intent Schema |
| **L5** | Training Data Pipeline | `05-training-data-pipeline.md` | YouTube extraction pipeline, synthetic rationale generation, data schema | Reasoning Framework (for Track C) |
| **L6** | Structural Grounding | `06-structural-grounding.md` | Element-level grounding (DOM/Figma), programmatic verifiers, actionable fixes | None (can start anytime) |
| **L7** | Orchestration | `07-orchestration.md` | Multi-agent system architecture, workflow, communication protocols | ALL other agents (runs last or in parallel reading others' output) |

## Research Files Available

All agents reference files from the foundational research. Full inventory:

### Knowledge Bundle
- `.building/knowledge-bundles/ai-design-thinking/knowledge-bundle.md` — master synthesis

### Cycle 1 Research (core tier)
- `cycle-1/01-design-cognition.md` — cognitive mechanisms of design thinking
- `cycle-1/02-expert-novice-design.md` — expertise differences
- `cycle-1/03-ai-design-attempts.md` — what AI design systems have tried
- `cycle-1/04-training-data-sources.md` — data sources ranked by signal quality
- `cycle-1/05-design-critique-signal.md` — critique structure and vocabulary
- `cycle-1/06-tacit-knowledge-formalization.md` — formalizable vs resistant knowledge

### Cycle 2 Research (pro tier)
- `cycle-2/01-mismatch-signal-and-reasoning-architectures.md` — mismatch signal deep dive + LLM architectures
- `cycle-2/02-uicrit-and-design-rationale-systems.md` — UICrit schema + historical rationale systems
- `cycle-2/03-process-supervision-multimodal.md` — process supervision + multimodal grounding

### Parallel Research
- `research/design-process-youtubers.md` — YouTube design process creators

### Existing System
- `~/.pi/agent/skills/ui/SKILL.md` — current UI skill (the thing we're replacing/augmenting)
- `~/.pi/agent/skills/ui/design-guidelines/*.md` — 39 current rule files

## Key Principles Across All Agents

1. **Reasoning patterns, not rules.** The current system fails because it follows rules without reasoning. Don't create more rules.
2. **Intent is the anchor.** Every design decision, critique, and mismatch evaluation resolves back to intent.
3. **Nondeterminism is real.** Design judgment is probabilistic. Don't hallucinate certainty. Use confidence levels.
4. **This is a system, not a skill.** No single agent can hold all of this. Specialized agents with focused context.
5. **Show reasoning on report-back.** Each agent must present its understanding so we can verify alignment before it proceeds to build.
