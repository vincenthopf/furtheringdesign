# furtheringdesign

Teaching AI to reason about design, verify that reasoning in the artifact, and refuse unsupported UI decisions.

The repository combines design-cognition research with an executable protocol for framing intent, exploring materially different directions, building safely, capturing browser evidence, evaluating implementation and workflows, and selecting under uncertainty.

## Status

Runtime v0.2 is executable. It supports legacy protocol records and adds a strict path that closes four major gaps: rationale without implementation, broken user journeys hidden by screenshots, differently worded versions of the same rendered template, and rankings based on stale or singular taste judgments.

Foundational research for Intent Schema, Design Reasoning, and Mismatch Detection is complete. Flow, training data, structural grounding, and orchestration research remain active areas, but their essential runtime contracts are now represented in code.

## What is implemented

- computable intent, candidate, evidence, and run validation
- explicit intent principles and candidate commitments
- Thinking Fidelity Score and Principle Adherence Score across required states
- Class A hard gates, Class B measurable scoring, and Class C calibrated critique
- browser-executed critical workflows with complete step and assertion evidence
- content-addressed captures and artifact-bound evidence
- rendered direction fingerprints for layout, palette, typography, and density
- distinct-direction clustering and incomplete render-matrix detection
- uncertainty penalties, quality floors, Pareto filtering, and bounded selection
- independently sourced pairwise evaluator quorum with disagreement handling
- bounded revision planning that invalidates stale evidence after every patch
- JSON schemas, tests, prompts, examples, and an optional Playwright adapter

## Run the protocol

Node.js 20 or newer is required.

```bash
npm test
npm run validate:example
npm run evaluate:example
npm run plan:example
```

The strict fixture demonstrates implementation fidelity, executable workflows, rendered diversity, capture hashes, and evaluator quorum:

```bash
npm run validate:strict
npm run evaluate:strict
npm run plan:strict
```

The command-line interface can validate user-owned records and produce a phase-separated design packet:

```bash
node runtime/cli.mjs validate-intent path/to/intent.json
node runtime/cli.mjs validate-candidate path/to/candidate.json --intent path/to/intent.json
node runtime/cli.mjs evaluate path/to/run.json --format markdown
node runtime/cli.mjs plan-revision path/to/run.json --candidate candidate-id
node runtime/cli.mjs packet path/to/intent.json --out path/to/packet
```

## Browser evidence

The optional Playwright adapter captures Chromium, Firefox, and WebKit states, axe output, focus traces, clipping, overlap, overflow, target-size and structure signals, rendered fingerprints, obligation checks, and executable workflows.

```bash
node adapters/playwright/capture.mjs \
  --url http://127.0.0.1:3000 \
  --intent path/to/intent.json \
  --manifest path/to/candidate.json \
  --artifact-ref git:candidate-commit \
  --out artifacts/candidate-id
```

## Core decision

UI generation is treated as constrained search, not one completion and not a universal beauty score.

1. Frame product intent and executable user tasks.
2. Generate at least three materially different directions.
3. Build each direction from the same immutable baseline.
4. Capture structural, visual, accessibility, and workflow evidence from the rendered artifact.
5. Verify that candidate rationale and intent principles were actually implemented.
6. Reject hard failures and quality-floor failures.
7. Compare only eligible, Pareto-efficient candidates with calibrated pairwise evidence.
8. Select only when the margin, coverage, diversity, quorum, and uncertainty thresholds support it.
9. Repair through bounded patches and recollect stale evidence.

The correct outcome can be `invalid`, `blocked`, `human-review`, or `selected`. The runtime does not manufacture a winner when evidence is incomplete or judgment legitimately disagrees.

## Read next

1. [`docs/furthering-design-protocol.md`](docs/furthering-design-protocol.md)
2. [`docs/runtime-v0.2-implementation-fidelity.md`](docs/runtime-v0.2-implementation-fidelity.md)
3. [`docs/implementation-guide.md`](docs/implementation-guide.md)
4. [`research/field-audit-2026-09-implementation-fidelity.md`](research/field-audit-2026-09-implementation-fidelity.md)
5. [`research/knowledge-bundles/ai-design-thinking/knowledge-bundle.md`](research/knowledge-bundles/ai-design-thinking/knowledge-bundle.md)
6. [`agent-handoffs/00-index.md`](agent-handoffs/00-index.md)

## Limits

The runtime does not prove business impact before release, infer cultural appropriateness from browser metrics, or replace user research and expert review. Pairwise evaluators can still share training bias. Workflow tests cover declared paths, not every real path. Production use still requires calibrated thresholds, real content, screen-reader review, performance evidence, product analytics, and preference data from the people the product serves.

## License

CC BY-SA 4.0. See [`LICENSE`](LICENSE).
