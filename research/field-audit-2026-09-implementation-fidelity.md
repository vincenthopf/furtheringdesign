# September 2026 field audit: implementation fidelity and UI evaluation

## Question

What still prevents current AI UI systems from reliably producing strong, functional, and genuinely different interfaces after the first Furthering Design runtime was built?

## Finding 1: plausible rationale is not implementation

The July 2026 Design Theater benchmark evaluates 120 interfaces from five generative UI tools across 24 structural, styling, and functional tasks. It defines three useful instruments:

- Thinking Fidelity Score for concrete rationale-to-implementation alignment
- Principle Adherence Score for prompt-embedded UX principles
- Design Homogeneity Index for output convergence

The study reports that more than 25% of user-facing design rationales were not implemented, rising to 34% for functional requirements. Mean principle adherence was approximately 0.54, and functional principles were especially weak.

Primary source: https://arxiv.org/abs/2607.22928

Protocol consequence: candidate rationale must become explicit, state-scoped commitments. Evidence must classify each commitment and intent principle as fully, partially, not, or not-yet implemented. Missing evidence receives no credit.

## Finding 2: functional quality cannot be inferred from screenshots

Design Theater's largest rationale gap occurs in functional requirements. Public screenshot-to-code issues report the same practical failure pattern: layouts can be generated while grid structure, mobile adaptation, multi-view continuity, or detailed section restoration remains wrong.

Examples:

- https://github.com/abi/screenshot-to-code/issues/463
- https://github.com/abi/screenshot-to-code/issues/435
- https://github.com/abi/screenshot-to-code/issues/492

Protocol consequence: critical user journeys need browser-executed steps and completion assertions in every required browser. Static visual plausibility cannot substitute for task completion.

## Finding 3: visual evaluation needs multiple levels

CANVAS evaluates generated UI at feature, pattern, and object levels rather than relying on one pixel metric. Its instrument set includes structural similarity, saliency similarity, semantic description similarity, and component-level similarity.

Primary sources:

- https://arxiv.org/abs/2511.20737
- https://canvas.kixlab.org/

Design Theater's homogeneity analysis likewise separates visual appearance, colour distribution, and layout organization.

Protocol consequence: rendered alternatives should be profiled across layout, palette, typography, and density. No single distance is treated as quality. The profile is used to detect collapsed search, incomplete state coverage, and stale evidence.

## Finding 4: static and interactive aesthetics are different targets

The OpenDesign benchmark contains 840 real-world webpage cases and evaluates both static and interactive aspects. Its approach uses execution, static-aesthetic, and interactive-aesthetic reward signals rather than assuming that one screenshot score covers all three.

Primary source: https://arxiv.org/abs/2510.23272

Protocol consequence: deterministic execution, static rendered evidence, workflow behaviour, and open aesthetic critique remain separate mechanisms. A candidate must not compensate for a broken interaction with visual polish.

## Finding 5: expert taste is plural

DesignPref contains 12,000 pairwise UI comparisons from 20 professional designers. Reported binary-preference agreement is low, with Krippendorff's alpha of 0.25. Personalized preference models outperform aggregated baselines for individual designers even with substantially fewer examples.

Primary source: https://arxiv.org/abs/2511.20513

Protocol consequence: pairwise judgments need evaluator identity, independence, preference profile, disagreement, and abstention. A majority or generic model judge should not silently become universal taste.

## Finding 6: syntactic validity is not design quality

The August 2026 Generative UI Benchmark tests whether model output parses, renders a root, resolves references, reaches every component, satisfies required and enum props, and reaches a component coverage floor. These are valuable completeness checks, but they do not by themselves assess intent, flow quality, contextual fit, or visual judgment.

Primary source: https://github.com/thesysdev/generative-ui-bench

Protocol consequence: completeness belongs in Class A validation. It is necessary but cannot select the most appropriate direction.

## Finding 7: repair introduces collateral damage

DesignBench's failure taxonomy distinguishes compile errors, no-op edits, wrong-object edits, wrong edits, partial edits, unnecessary modifications, and successful edits or repairs across multiple frontend frameworks.

Primary source: https://github.com/WebPAI/DesignBench

Protocol consequence: revisions remain bounded patches against protected paths and an immutable candidate thesis. Any code change invalidates artifact-bound captures and comparisons. Structural misalignment creates a new candidate rather than silently mutating the selected direction.

## Runtime decisions

The audit produced seven executable changes:

1. explicit intent principles and candidate commitments
2. TFS and PAS with state coverage, uncertainty, and hard-failure handling
3. bounded browser automation for directly measurable obligations
4. content-addressed evidence and capture digests
5. browser-derived rendered diversity across layout, palette, typography, and density
6. browser-executed critical workflows
7. independent artifact-bound pairwise quorum with evaluator-source diversity, disagreement, and preference profiles

## What is not claimed

These changes do not produce a universal aesthetic score. They make four failure classes harder to hide:

- design reasoning that never reached the implementation
- visually different prose attached to the same rendered template
- attractive screens with broken user tasks
- decisive rankings built from stale, ungrounded, or singular taste judgments

The remaining frontier is calibrated evaluation against real user outcomes, richer interaction and flow coverage, design-system and component-graph analysis, and preference learning from the people the product actually serves.
