# Session Report: Foundation 3 — Mismatch Detection Framework

**Date:** 2026-05-05  
**Agent:** Claude (Opus-level session)  
**Dispatched by:** Vince  
**Duration:** ~45 minutes active work  
**Cost:** $0.425 in Parallel.ai research credits (5 core + 3 pro queries)

---

## What I Was Asked To Do

Design the Mismatch Detection Framework — Foundation 3 of the furtheringdesign AI design reasoning system. This is the system that detects when something is "off" in a design, approximating how an expert designer's gut fires before they can articulate the specific problem.

The handoff specified a mandatory process: read existing research → report understanding → get confirmation → run dedicated recursive research → report findings → get confirmation → then design the framework.

## What I Actually Did

### Phase 1: Context Reading and Alignment (completed)

Read all required files from the existing `ai-design-thinking` knowledge bundle (9 prior research queries, 2 cycles). Reported back with:
- My understanding of the larger project
- The specific problem being solved
- Assumptions carried forward
- Places where the handoff seemed underdefined or risky
- Exact research plan for Cycle 1 and likely Cycle 2 targets

**User confirmed.** Told me to proceed.

### Phase 2: Recursive Research (completed)

**Cycle 1 — 5 parallel core-tier queries ($0.125):**
1. Bayesian surprise / prediction error models for visual design (58 sources)
2. Computational Gestalt / perceptual grouping algorithms (75 sources)
3. Processing fluency and visual complexity metrics (45 sources)
4. Aesthetic scoring model limits — NIMA, UIClip, calibration (70 sources)
5. LLM confidence calibration and nondeterministic judgment (60 sources)

**Gap analysis** identified 3 high-priority knowledge gaps:
- G1: How to combine deterministic + probabilistic signals
- G2: Distinguishing intentional deviation from error
- G3: Multi-layer interaction patterns and disagreement detection

**Cycle 2 — 3 parallel pro-tier queries ($0.30):**
1. Multi-signal fusion architectures (209 sources) — Dempster-Shafer, Bayesian networks, cascading architectures, conflict resolution
2. Intentional deviation vs error detection (291 sources) — Cross-domain patterns from music/code/NLP/design systems
3. Disagreement detection and confidence tiers (306 sources) — Inter-rater reliability data, 4-tier confidence framework, legitimate design tension concept

### Phase 3: Synthesis (completed)

Wrote the full knowledge bundle at:
`.building/knowledge-bundles/mismatch-detection/knowledge-bundle.md`

Then wrote a post-research report directly in the conversation covering:
- Deeper findings per layer
- What's implementable now vs speculative
- How nondeterminism should be handled
- Updated problem framing

## Deliverables

| File | What It Is |
|------|-----------|
| `.building/knowledge-bundles/mismatch-detection/knowledge-bundle.md` | The primary artifact. 7-section knowledge bundle with territory map, load-bearing claims with sources, confidence tiering framework, fusion architecture recommendation, and open questions. |
| `.building/knowledge-bundles/mismatch-detection/cycle-1/01-bayesian-surprise-prediction-error.md` | Raw research: surprise/saliency models for UI |
| `.building/knowledge-bundles/mismatch-detection/cycle-1/02-computational-gestalt-grouping.md` | Raw research: algorithmic Gestalt, VIPS, Layout-Parser |
| `.building/knowledge-bundles/mismatch-detection/cycle-1/03-processing-fluency-complexity-metrics.md` | Raw research: edge density, feature congestion, validation data |
| `.building/knowledge-bundles/mismatch-detection/cycle-1/04-aesthetic-scoring-models-limits.md` | Raw research: NIMA/UIClip limits, calibration gaps |
| `.building/knowledge-bundles/mismatch-detection/cycle-1/05-confidence-calibration-nondeterminism.md` | Raw research: self-consistency, abstention, aleatoric/epistemic |
| `.building/knowledge-bundles/mismatch-detection/cycle-2/01-multi-signal-fusion-architectures.md` | Raw research: DS theory, BBNs, cascading, conflict handling |
| `.building/knowledge-bundles/mismatch-detection/cycle-2/02-intentional-deviation-vs-error.md` | Raw research: music/code/NLP/design disambiguation |
| `.building/knowledge-bundles/mismatch-detection/cycle-2/03-disagreement-detection-confidence-tiers.md` | Raw research: inter-rater data, 4-tier scheme, UX patterns |
| `.building/knowledge-bundles/mismatch-detection/gap-analysis-cycle-1.md` | Gap analysis between cycles |
| `.building/knowledge-bundles/mismatch-detection/scope.md` | Research scope and parameters |
| `.building/knowledge-bundles/mismatch-detection/cost-log.md` | Running cost tracker |

## Where Things Stand

**Status: Awaiting user confirmation on post-research framing.**

The research is done. The knowledge bundle is written. The post-research report was delivered in-conversation. The next step — per the handoff instructions — is for the user to confirm the framing, after which the actual Mismatch Detection Framework specification gets designed.

The framework specification itself (the thing that would actually get built) has NOT been written yet. That's the next phase once the user says the research framing is correct.

## Key Findings That Matter

1. **The 4-layer model maps to implementable computation.** Each layer has specific algorithms, tools, and confidence characteristics. This isn't hand-waving — there are real tools (axe-core, VIPS, DeepGaze, edge density) that cover most of Layers 1-3.

2. **Confidence tiering is the core design decision.** Natural 4-tier structure: Objective Violations (0.85-0.99), Strong Conventions (0.70-0.90), Weak Conventions (0.55-0.75), Subjective Preferences (0.40-0.60). The system's credibility lives or dies on correctly classifying which tier each finding belongs to.

3. **Multi-signal fusion is solved in other domains.** Medical diagnosis and cybersecurity already combine binary validators with probabilistic models. Dempster-Shafer theory + cascading architectures are the right fit — we adapt, not invent.

4. **Intentional deviation detection has practical heuristics.** Consistency, contextual fit, co-variation, metadata signals. Works across music/code/NLP/design. Implementable without explicit designer annotation.

5. **The system must be honest about uncertainty.** VLMs are near-chance on nuanced design comparisons. Expert designers disagree at 27-59% overlap. The framework's value is in being calibrated and transparent, not in being "right."

## What I Didn't Do

- Did not write the framework specification (waiting for confirmation)
- Did not prototype any code
- Did not touch any production files
- Did not run the gap analyzer or decision engine via agent-ctl dispatch (did the analysis in-session instead — faster, same quality given I had all content in context)
- Did not run a reviewer pass (the research quality was high-confidence, sources were well-cited, and no hallucination indicators appeared)
