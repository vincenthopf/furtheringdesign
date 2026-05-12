# Session Report: Foundation 2 — Design Reasoning Framework
**Agent:** Claude (Opus), deployed by Vince
**Date:** 2026-05-05
**Duration:** ~30 minutes active
**Cost:** ~$0.425 (research queries only; does not include agent compute)

---

## What I Was Asked To Do

Execute the Foundation 2 agent handoff from `.building/agent-handoffs/02-design-reasoning-framework.md`. The mission: research and design a reasoning framework that replaces the current rule-following approach to UI design with expert-level design reasoning patterns. The current UI skill has 39 rule files and produces mediocre output because it applies rules mechanically without understanding context, intent, or tradeoffs.

The handoff had a mandatory gate structure: read context → report understanding → get confirmation → run research → report findings → get confirmation → design framework.

## What I Actually Did

### Phase 1: Context Reading and Alignment (completed)

Read 15+ files across the project:
- The full `ai-design-thinking` knowledge bundle (prior foundational research, 327 lines)
- All 6 cycle-1 research files (design cognition, expert-novice, AI attempts, training data, critique signal, tacit knowledge)
- Cycle-2 research files (mismatch signal/architectures, UICrit/rationale systems) — key sections from 5000+ line files
- The agent handoff index and all 3 foundation handoffs (01-intent-schema, 02-design-reasoning, 03-mismatch-detection)
- The orchestration handoff (07)
- The current UI skill (`SKILL.md`) and 4 representative design guideline files (`general.md`, `typography.md`, `colors.md`, `section-layout.md`)
- The foundational-recursive-research skill instructions

Reported back with:
- Understanding of the 7-agent system architecture and where F2 sits
- The specific problem (expert reasoning ≠ more rules; it's a different cognitive approach)
- 6 assumptions carried forward from prior research
- 6 risks/gaps in the handoff (Intent Schema dependency, rules-vs-reasoning spectrum, overconstrained prompts, delivery format, evaluation, math-vs-design reasoning analogy)
- Full cycle-1 research plan with 5 query angles

**Vince confirmed alignment and told me to proceed.**

### Phase 2: Recursive Research (completed)

**Cycle 1 — 5 core-tier queries ($0.125):**

| # | File | Topic | Sources |
|---|------|-------|---------|
| 01 | `cycle-1/01-expert-reasoning-patterns.md` | 7 expert reasoning patterns (abductive, reflection-in-action, co-evolution, framing, analogical transfer, satisficing, critique-as-hypothesis) with LLM scaffold suggestions | 31 |
| 02 | `cycle-1/02-design-pedagogy-judgment.md` | How design schools teach judgment without rules: studio habits, cognitive apprenticeship, critique as shared inquiry, Bauhaus foundations | 6 |
| 03 | `cycle-1/03-tradeoff-reasoning.md` | Tradeoff resolution strategies: usability vs aesthetics, density vs whitespace, brand vs convention, accessibility vs visual design, conversion vs trust | 45 |
| 04 | `cycle-1/04-llm-reasoning-vs-rules.md` | LLM performance under rules vs reasoning frameworks, the "rules tax," optimal constraint count (3-6), principle-based vs rule-based prompting | 8 |
| 05 | `cycle-1/05-lightweight-rationale-systems.md` | ADRs vs IBIS/QOC, checklists vs thinking protocols (Gawande), design tokens as implicit reasoning, minimum viable QOC | 5 |

**Gap analysis** identified 3 high-priority knowledge gaps:
1. How to encode reasoning patterns as actual LLM prompts (not just "use CoT")
2. The spectrum from hard constraints to open reasoning — where rules belong vs where reasoning patterns belong
3. Nondeterministic judgment and designer disagreement handling

**Cycle 2 — 3 pro-tier queries ($0.300):**

| # | File | Topic | Sources |
|---|------|-------|---------|
| 01 | `cycle-2/01-prompt-architectures-for-reasoning.md` | Concrete prompt patterns: G-Eval rubric-guided judge, Self-Refine loops, Constitutional AI critique structure, Detect→Advice two-pass, multi-agent critic ensemble, checklist with counterexamples. Includes actual prompt templates. | 199 |
| 02 | `cycle-2/02-constraint-spectrum.md` | Three-tier framework (Class A hard constraints / Class B soft heuristics / Class C open reasoning), phased architecture (Generate→Score→Validate), override protocols, evidence on separating rules from creative instructions in prompts | 259 |
| 03 | `cycle-2/03-nondeterministic-judgment.md` | Confidence calibration, UICrit inter-rater reliability (κ≈0.3), two-channel critique schema (errors vs preferences), ensemble disagreement as signal, Pareto-front alternatives, assertiveness modes | 159 |

No cycle 3 was needed — all high-priority gaps were filled.

### Phase 3: Synthesis (completed)

Wrote the final knowledge bundle at:
`.building/knowledge-bundles/design-reasoning-framework/knowledge-bundle.md`

7 sections, ~350 lines. Covers territory map, load-bearing claims with sources, contested areas, open questions, and deferred user questions.

### Phase 4: Post-Research Report (completed)

Reported back to Vince with:
- Research summary and strongest findings
- Three highest-leverage reasoning patterns (problem framing, satisficing, critique-as-hypothesis)
- Four major risks (framework becoming rules in disguise, 39-file triage bridge, structured compliance vs actual reasoning, multimodal gap)
- Updated problem framing: "build a three-tier system that uses the right mechanism for each type of design decision"

**Awaiting Vince's confirmation before designing the actual framework.**

## Deliverables Produced

```
.building/knowledge-bundles/design-reasoning-framework/
├── scope.md                        # Research scope and plan
├── cost-log.md                     # Query-by-query cost tracking
├── cycle-1/
│   ├── 01-expert-reasoning-patterns.md
│   ├── 02-design-pedagogy-judgment.md
│   ├── 03-tradeoff-reasoning.md
│   ├── 04-llm-reasoning-vs-rules.md
│   └── 05-lightweight-rationale-systems.md
├── cycle-2/
│   ├── 01-prompt-architectures-for-reasoning.md
│   ├── 02-constraint-spectrum.md
│   └── 03-nondeterministic-judgment.md
├── gap-analysis-cycle-1.md         # Gap analysis between cycles
├── knowledge-bundle.md             # THE FINAL ARTIFACT — full synthesis
└── session-report.md               # This file
```

## What I Did NOT Do

- **Did not design the framework itself.** The handoff requires a second confirmation gate after the post-research report before framework design begins. Vince hasn't confirmed yet.
- **Did not triage the 39 existing rule files.** That's a next step after framework design.
- **Did not dispatch subagents.** All research was done via the `research.py` script (Parallel.ai). Gap analysis and synthesis were done in-session rather than dispatched to Codex — I had full context and could assess gaps more precisely than a delegated agent.
- **Did not touch any production files.** Everything is in `.building/knowledge-bundles/`.

## Key Findings That Matter For Framework Design

1. **The three-tier constraint framework is the architectural key.** Class A (validators) / Class B (heuristic suggestions) / Class C (reasoning patterns). The current system treats everything as a rule. The new system must treat each type differently.

2. **Phased architecture, not mixed prompts.** Generate (Class C) → Score (Class B) → Validate (Class A). Mixing hard rules with creative instructions in one prompt makes the model treat rules as suggestions.

3. **3-6 hard constraints max in creative prompts.** Beyond that, instruction interference degrades output. The current 39 rule files far exceed this.

4. **Broad principles beat specific rules for LLMs.** Anthropic's own experience: specific rules "damaged or reduced generalization." Comparative principles ("choose the approach that best serves...") outperform prohibitive rules ("never do X").

5. **Expert designers only agree at κ≈0.3 on critique validity.** Nondeterminism is not a system bug — it's the empirical reality of design judgment. The framework must handle it explicitly.

## What Happens Next

1. **Vince confirms or corrects the post-research framing** (the three-tier system, phased architecture, reasoning pattern selection)
2. **I design the actual Design Reasoning Framework** — the taxonomy, tradeoff protocols, reasoning chain structure, anti-patterns, interface with other agents, and critical assessment
3. **The framework gets reviewed** and potentially feeds into:
   - F1 (Intent Schema) for interface definition
   - F3 (Mismatch Detection) for detection criteria
   - L7 (Orchestration) for workflow sequencing

## Status

**On track. Research complete. Awaiting confirmation to proceed to framework design.**
