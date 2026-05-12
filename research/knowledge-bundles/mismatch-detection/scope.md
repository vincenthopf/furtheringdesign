# Scope: Mismatch Detection Framework

## Topic
Computational wrongness detection for design — multi-layered detection systems that approximate the cognitive mechanisms expert designers use for pre-verbal mismatch signals. Focus on implementable mechanisms that don't collapse into brittle rule-checking or hallucinated certainty.

## Parameters
- **Budget:** ~$1.50 target, $3.00 hard cap
- **Depth:** Deep — this is a framework specification, not a survey
- **Prior work:** Builds on `.building/knowledge-bundles/ai-design-thinking/` (2 cycles, 9 queries already run)

## Initial Angles (Cycle 1)
1. **Bayesian surprise / prediction error for visual design** — computational saliency, information-theoretic deviation detection
2. **Computational Gestalt / perceptual grouping** — algorithmic proximity, similarity, alignment, closure measurement from layout data
3. **Processing fluency and visual complexity metrics** — measurable proxies for "hard to process"
4. **Aesthetic scoring models and their limits** — NIMA, UIClip, AVA; domain shift, calibration, context-conditioning
5. **LLM confidence calibration and nondeterministic judgment** — ensemble disagreement, verbalized confidence, abstention

## Related Knowledge Bundles
- `.building/knowledge-bundles/ai-design-thinking/` — primary foundation, 2 cycles complete
  - Key finding: 4-layer mismatch model (prediction error, chunking, fluency, somatic markers)
  - Key finding: VLMs >75% on Likert but near-chance on nuanced pairwise
  - Key finding: 13.1% zero-shot critique validity; 55% improvement with few-shot
  - Key finding: axe-core as programmatic verifier, Figma API for layer-level grounding
