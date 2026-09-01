# Phase 5: select

Selection is constrained search, not beauty maximization.

1. Reject candidates with Class A blocker or major failures.
2. Reject candidates below an intent-defined quality floor.
3. Reject candidates with missing dimensions, states, or required workflow runs.
4. Reject candidates whose Thinking Fidelity Score, Principle Adherence Score, implementation coverage, or workflow completion falls below policy.
5. Reject stale evidence or pairwise judgments whose artifact references do not match the candidate.
6. Detect near-duplicate rendered directions across the complete required browser-state matrix and require the configured minimum number of distinct direction clusters. Manifest prose is only a fallback warning and cannot establish visual diversity for strict selection.
7. Compute confidence-weighted evidence and conservative lower bounds.
8. Build the Pareto frontier across intent-weighted quality dimensions.
9. Use an independently sourced, artifact-bound pairwise quorum for nuanced comparison. Reduce confidence when evaluators disagree and preserve named preference profiles when taste is plural.
10. Add only a small rendered-diversity contribution after eligibility.
11. Penalize uncertainty.

Automatically select only when the top candidate is eligible, Pareto-efficient, sufficiently separated from the runner-up, below the uncertainty ceiling, supported by complete browser workflows, supported by a passing implementation audit, covered by rendered-diversity evidence, and backed by the required pairwise quorum. Otherwise return `human-review` with the exact unresolved tradeoff. Missing evidence never becomes a positive score.
