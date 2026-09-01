# Playwright evidence adapter

This optional adapter captures the declared state matrix in Chromium, Firefox, and WebKit and executes intent workflows in fresh browser contexts.

It emits protocol-compatible evidence for:

- critical and serious axe-core findings
- visible keyboard focus traces
- horizontal overflow
- clipped text
- overlapping interactive controls
- heading and landmark structure
- duplicate DOM IDs
- long reading measure
- small interactive-target warnings
- screenshot and node-map SHA-256 digests for content-addressed evidence
- browser-derived layout, palette, typography, and density profiles
- bounded automated intent-principle and candidate-commitment checks
- browser-executed workflow steps, assertions, final screenshots, and task signals

Install and run:

```bash
npm install
npx playwright install --with-deps
node capture.mjs \
  --url http://127.0.0.1:3000 \
  --intent ../../examples/saas-launch/intent.json \
  --manifest ../../examples/saas-launch/candidate-signal-foundry.json \
  --artifact-ref git:<candidate-commit> \
  --out ../../artifacts/signal-foundry
```

`--manifest` supplies candidate commitments and the candidate id. `--candidate` remains available when no manifest is supplied. `--artifact-ref` should be a Git commit, Git tree, or content digest and must match the candidate manifest in strict runs.

Intent states can declare `path` to capture route-specific screens. Intent workflows use semantic locators and a bounded action and assertion vocabulary. Each workflow is rerun independently per declared browser so previous workflow state cannot make a later run pass.

An obligation can include a bounded Playwright automation record:

```json
{
  "source": "playwright",
  "metric": "outline.horizontalOverflowPx",
  "operator": "eq",
  "expected": 0
}
```

Supported metric roots are `outline`, `focus`, `axe`, and `profile`. The adapter performs value comparison only. It does not evaluate arbitrary JavaScript from the contract.

The adapter does not declare a design good. It supplies structural, rendered, accessibility, and behavioural evidence for later validation and critique. Automated accessibility output remains incomplete. Manual screen-reader, reading-order, zoom, content, interaction, cultural-context, aesthetic, and product-state review remains required.
