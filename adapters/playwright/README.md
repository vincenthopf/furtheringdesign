# Playwright evidence adapter

This optional adapter turns rendered browser states into protocol evidence. It is the boundary between a generated artifact and the runtime's evidence contract.

## Install

```bash
cd adapters/playwright
npm install
npx playwright install chromium firefox webkit
```

## Capture

```bash
npm run capture -- \
  --url http://127.0.0.1:3000 \
  --intent ../../examples/implementation-fidelity/intent.json \
  --manifest ../../examples/implementation-fidelity/candidate-evidence-path.json \
  --artifact-ref git:exact-candidate-commit \
  --out ../../artifacts/evidence-path
```

`--manifest` is preferred because candidate commitments can be checked while the browser is open. `--candidate` remains available when no manifest exists.

For a multi-candidate application whose routes differ by candidate, pass a state-to-route map:

```bash
npm run capture -- \
  --url http://127.0.0.1:4173 \
  --intent ../../examples/ai-health/intent.json \
  --candidate evidence-thread \
  --artifact-ref git:exact-candidate-commit \
  --route-map ../../examples/ai-health/capture/routes-evidence-thread.json \
  --out ../../artifacts/ai-health/evidence-thread
```

The route-map wrapper writes a temporary intent with candidate-specific state paths, invokes the strict capture implementation, and removes the temporary file.

## Output

Each browser-state capture records:

- screenshot and node-map paths
- SHA-256 hashes for both artifacts
- viewport, URL, browser, and state reference
- axe violations
- focus-order traces
- heading, landmark, ID, and target-size structure
- horizontal overflow, clipped text, interactive overlap, and long-line findings
- layout, palette, typography, and density render fingerprints
- Playwright-verifiable intent principles and candidate commitments

Declared intent workflows are executed separately. Their results include every semantic action, completion assertion, grounded node reference, screenshot hash, duration, and derived status.

## Boundaries

This adapter does not decide whether a candidate is good. It collects evidence. `runtime/lib/evidence.mjs` validates the contract, `runtime/lib/fidelity.mjs` checks implementation fidelity, `runtime/lib/rendered-diversity.mjs` checks render coverage and direction collapse, and `runtime/lib/tournament.mjs` decides eligibility and selection.

Browser evidence is incomplete by design. It does not prove business impact, cultural fit, real-user comprehension, assistive-technology quality, or production performance. Those require separate evidence sources and human review.
