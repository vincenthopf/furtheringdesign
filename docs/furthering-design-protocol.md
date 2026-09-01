# Furthering Design Protocol

## Decision

The problem is not a shortage of UI rules or component libraries. AI-generated interfaces fail because the system treats a design as one completion, judges rendered pixels without sufficient intent or product state, and edits a working codebase without a durable design contract.

The Furthering Design Protocol changes the unit of work. A design run is:

> a validated intent, a deliberately diverse candidate set, isolated implementation branches, browser-state evidence grounded to semantic nodes, separated validation and critique, and an uncertainty-aware selection decision.

This protocol turns the repository's F1-F7 research into an executable control loop. It does not claim to produce a universal scalar for beauty. Beauty and appropriateness remain contextual and partly nondeterministic. The system instead makes the search space better, makes failure observable, prevents known regressions, and gives human judgment a precise decision boundary.

## What the protocol solves

The protocol targets eight recurring failures.

1. **Prompt compression**: a rich product problem becomes a short visual instruction and loses audience, task, constraints, evidence, and anti-goals.
2. **Pattern gravity**: the model converges on frequent training patterns, producing the same hero, card grid, gradient, icon set, and conversion sequence.
3. **Cosmetic variation**: multiple options change colour and type but preserve the same composition and information architecture.
4. **Pixel-only evaluation**: a screenshot hides semantics, keyboard state, responsive behaviour, loading and error paths, data integrity, browser differences, and implementation quality.
5. **Mixed cognition**: generation, rule checking, critique, and correction happen in one context, causing early conventions to narrow exploration and objective failures to be confused with taste.
6. **Uncalibrated aesthetic authority**: an evaluator states a subjective preference as a fact and hides expert disagreement.
7. **Destructive iteration**: an agent overwrites working files, content, layout, or state while attempting a local improvement.
8. **No durable memory**: later changes lose the reason a composition, token, or interaction exists and flatten the result back into generic components.

## System boundary

The protocol is independent of framework, model provider, and design tool. It can operate over DOM output, component trees, Figma nodes, native view trees, or another semantic structure if the adapter can provide:

- stable node references
- rendered state captures
- deterministic validator output
- candidate metadata
- scoped change evidence

A model can participate in multiple phases, but a phase must receive only the context and tools needed for its role. Separate prompts are provided under `runtime/prompts/`.

## Phase 1: frame intent

A valid intent is an executable design brief. It represents:

- problem and desired user change
- audience in a real context
- primary and secondary tasks
- brand values as expression and anti-expression
- emotional and interaction register
- measurable success criteria
- quality weights and hard floors
- hard and soft constraints
- fixed, open, and forbidden decisions
- required product and browser states
- content provenance
- risks, assumptions, and unresolved questions

Intent exists at a scope and can cascade from product to flow, page, section, component, and instance. A child intent inherits parent constraints unless it records an explicit, reviewable resolution.

The runtime rejects contradictory degrees of freedom, invalid audience references, missing verification methods, incomplete state coverage, and quality weights that do not sum to one.

## Phase 2: search the design space

Generate at least three candidates. Each candidate carries one thesis and must differ across seven axes:

- composition
- typography
- spatial rhythm
- surface
- imagery
- interaction
- voice

The runtime computes a lexical direction distance as a low-cost collapse detector. This is not a design-quality metric. It catches obvious cases where an agent renames the same direction or makes only cosmetic substitutions. A future adapter can replace or supplement it with structural embeddings, component-graph distance, visual features, and expert labels.

Reference material is used for abstract functional analogy, not surface imitation. A candidate records rejected familiar patterns so the system must state how it escaped category defaults.

## Phase 3: build safely

Every candidate begins from the same immutable baseline and uses the same content and data shape. Otherwise the comparison is confounded by code or copy differences.

Each candidate declares:

- baseline reference
- allowed paths
- protected paths
- `diff-only` patch mode
- supported states
- tokens
- structural pattern
- design decisions and tradeoffs

A production integration should enforce the path contract before applying a patch. The protocol data model makes the contract explicit; repository, filesystem, or code-review tooling performs the actual enforcement.

## Phase 4: capture evidence

A screenshot is one evidence source, not the design object. Required evidence can include:

- screenshots in each browser and state
- accessibility tree and automated accessibility results
- heading, landmark, form, and focus structure
- keyboard trace
- overflow and target-size checks
- visual and DOM diffs from baseline
- component and token usage
- performance traces
- task walkthroughs
- content and claim provenance
- expert or user pairwise judgments

Every signal names the exact state and semantic node. Feedback such as "the middle feels crowded" is not actionable until it identifies the relevant group, evidence, intent conflict, confidence, and proposed change.

## Phase 5: separate evaluation mechanisms

### Class A: hard obligations

Class A checks are binary or near-binary validators. Examples include critical accessibility failures, missing legal evidence, protected-file modification, security failure, destructive data behaviour, and absent required states.

A blocker or major Class A failure makes a candidate ineligible. A beautiful failure remains a failure.

### Class B: measurable heuristics

Class B checks are scored and intent-dependent. Examples include task clarity, hierarchy, responsive resilience, performance, information density, and maintainability. An intent can set quality floors. A candidate below a floor is ineligible even when its weighted average is high.

### Class C: open judgment

Class C evaluates intent alignment, coherence, distinctiveness, emotional register, analogy quality, and tradeoff quality. These judgments remain probabilistic. The evaluator must provide evidence and confidence, and the system should prefer pairwise comparisons for subtle choices.

Generation, Class B scoring, and Class A validation are intentionally separated. Hard constraints do not narrow initial exploration, and subjective critique cannot waive objective obligations.

## Decision model

For candidate `c`, quality dimension `d`, and signals `s`:

```text
mean(c,d) = sum(score_s * confidence_s) / sum(confidence_s)
disagreement(c,d) = standardDeviation(score_s)
uncertainty(c,d) = clamp(1 - meanConfidence + disagreement)
lower(c,d) = clamp(mean(c,d) - lambda * uncertainty(c,d))
evidence(c) = sum(weight_d * lower(c,d))
```

The conservative lower bound prevents a candidate from winning on a high score backed by weak or contradictory evidence.

A candidate is eligible only when:

```text
no hard Class A failure
and every quality floor passes
and every weighted dimension has evidence
and every required state has a capture
```

The runtime then finds the Pareto frontier. Candidate `a` dominates candidate `b` when `a` is at least as strong on every weighted dimension and strictly stronger on one. A dominated candidate is not auto-selected merely because a weighted average hides a material tradeoff.

For eligible Pareto candidates:

```text
rank(c) = alpha * evidence(c)
        + beta  * pairwise(c)
        + gamma * diversity(c)
```

`gamma` remains small. Distinctiveness is valuable only after purpose and obligations are satisfied.

## Automatic selection boundary

The result has four states:

- `invalid`: the run or contract is malformed
- `blocked`: no candidate is eligible
- `human-review`: candidates are viable but the evidence cannot resolve a real tradeoff safely
- `selected`: the top candidate clears the automatic-selection conditions

Automatic selection requires:

- eligibility
- Pareto efficiency
- complete state and dimension evidence
- margin above the review threshold
- uncertainty below the ceiling
- sufficiently confident pairwise evidence
- no direction-collapse warning involving the winner

Human review is not an exception path. It is the correct result when value judgments, missing product evidence, or close tradeoffs exceed the system's confidence.

## Durable design memory

A selected candidate is not only a rendered artifact. It is a durable record of:

- intent
- direction thesis
- tokens
- structural pattern
- decisions and tradeoffs
- rejected patterns
- state evidence
- known weaknesses
- protected paths
- selection rationale

Future agents should retrieve this record before changing the interface. A proposed change must state which decision it preserves, revises, or invalidates. This protects design quality from incremental genericization.

## The example

`examples/saas-launch/` contains one launch intent and three directions:

- `signal-foundry`: evidence-led and eligible
- `safe-grid`: accessible and maintainable but less distinctive
- `kinetic-lab`: memorable and internally coherent but ineligible because it fails accessibility, task, responsive, performance, and implementation controls

The result selects `signal-foundry`. The example deliberately demonstrates that novelty and coherence cannot override hard obligations or an intent mismatch.

## Honest limits

The protocol does not automate taste, prove business impact before release, or guarantee that a model's rationale is faithful to its internal process. The lexical diversity detector is only a guardrail. Automated browser and accessibility checks do not replace expert manual review. Pairwise model judgments can share the same bias and training distribution. A quality profile can encode the wrong priorities. Human research and production outcomes remain necessary.

The protocol is still useful because it makes those limits explicit and forces the system to expose the intent, evidence, confidence, and tradeoff behind a decision.
