# Implementation guide

## Run the protocol

Node.js 20 or later is required. The root runtime has no package dependencies.

```bash
npm test
npm run validate:example
npm run evaluate:example
npm run plan:example
node runtime/cli.mjs packet examples/saas-launch/intent.json --out /tmp/furthering-design-packet
```

Commands:

```text
furthering-design validate-intent <intent.json> [--out result.json]
furthering-design validate-candidate <candidate.json> [--intent intent.json] [--out result.json]
furthering-design evaluate <run.json> [--format json|markdown] [--out report]
furthering-design plan-revision <run.json> [--candidate id] [--out plan.json]
furthering-design packet <intent.json> --out <directory>
```

## Integrate into an agent workflow

1. Read the repository context and existing design record.
2. Build and validate `intent.json`.
3. Generate a packet and give each phase to a separate role or fresh context.
4. Generate at least three candidate manifests before implementation.
5. Create an immutable baseline and one isolated branch or worktree per candidate.
6. Enforce `allowedPaths`, `protectedPaths`, and `diff-only` at patch application time.
7. Render the state matrix with real content and data.
8. Run deterministic validators before subjective critique.
9. Ground every finding to a state and semantic node.
10. Collect pairwise comparisons and their confidence.
11. Evaluate the run.
12. Route `human-review` to a named decision owner with the unresolved tradeoff.
13. Generate a revision plan for the selected or recommended candidate and apply only the highest-priority coherent changes.
14. Recollect evidence for every affected state and dimension.
15. Store the selected candidate, rationale, evidence, revision history, and implementation commit as durable design memory.
16. Compare production outcome signals to the original success criteria and feed the result back into future runs.

## Bounded revision

Generate a repair plan from evaluated evidence:

```bash
node runtime/cli.mjs plan-revision path/to/run.json --candidate candidate-id --out revision.json
```

The planner prioritizes hard failures, quality-floor gaps, uncertain evidence, and weak intent-critical dimensions. It carries the candidate baseline and path contract into the plan, names the states and dimensions that must be re-evaluated, and returns `fork-candidate` when intent misalignment is structural. A local patch must not quietly mutate a direction into a different thesis.

## Host enforcement

The runtime validates the change contract but cannot enforce filesystem or repository policy by itself. A host integration should:

- resolve the baseline ref and record its tree hash
- reject patches outside `allowedPaths`
- reject patches touching `protectedPaths`
- reject unexpected file deletion
- show the complete diff before application
- run tests and state capture on the resulting tree
- preserve a one-command rollback path

Do not rely on prompting the model not to overwrite files. Enforcement belongs outside the model.

## Browser evidence adapter

The optional Playwright adapter lives in `adapters/playwright/`.

```bash
cd adapters/playwright
npm install
npx playwright install --with-deps
node capture.mjs \
  --url http://127.0.0.1:3000 \
  --intent ../../examples/saas-launch/intent.json \
  --candidate signal-foundry \
  --out ../../artifacts/signal-foundry
```

The adapter captures the declared state matrix in Chromium, Firefox, and WebKit and emits protocol-compatible evidence for automated accessibility, keyboard focus, headings, landmarks, duplicate IDs, overflow, and target-size warnings.

Its output is a starting point. Add application-specific fixtures for authentication, data, loading, empty, error, destructive, and success states. Add manual checks for screen-reader usability, reading order, cognitive accessibility, content accuracy, and interaction intent.

## Evidence source policy

Use the cheapest reliable source first.

- Deterministic validator for binary obligations.
- Browser or repository measurement for measurable properties.
- Task walkthrough for behavioural clarity.
- Expert pairwise judgment for nuanced quality.
- User or production outcome data for actual effect.

A model assertion without observable evidence should have low confidence and should not clear a hard gate.

## Calibrate before automatic selection

Start with `human-review` as the default. Collect completed runs and compare automatic ranking to expert decisions and post-release outcomes. Calibrate:

- quality weights and floors by product class
- uncertainty penalty
- diversity floor
- pairwise confidence threshold
- review margin
- hard-gate severity mapping

Do not tune thresholds on the same run used to report success.
