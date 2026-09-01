# Phase 5: select

Selection is constrained search, not beauty maximization.

1. Reject candidates with Class A blocker or major failures.
2. Reject candidates below an intent-defined quality floor.
3. Reject candidates with missing dimensions or required states.
4. Detect near-duplicate directions and treat them as search collapse.
5. Compute confidence-weighted evidence and conservative lower bounds.
6. Build the Pareto frontier across intent-weighted quality dimensions.
7. Use calibrated pairwise judgments for nuanced comparison.
8. Add only a small diversity contribution after eligibility.
9. Penalize uncertainty.

Automatically select only when the top candidate is eligible, Pareto-efficient, sufficiently separated from the runner-up, below the uncertainty ceiling, supported by confident pairwise evidence, and not collapsed into another direction. Otherwise return human-review with the exact unresolved tradeoff.
