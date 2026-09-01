# Playwright evidence adapter

This optional adapter captures the intent state matrix in Chromium, Firefox, and WebKit. It emits protocol-compatible captures and signals for:

- critical and serious axe-core findings
- visible keyboard focus trace
- horizontal overflow
- heading and landmark structure
- duplicate DOM IDs
- small interactive-target warnings
- basic navigation timing metadata

Install and run:

```bash
pnpm install
pnpm exec playwright install --with-deps
pnpm capture -- \
  --url http://127.0.0.1:3000 \
  --intent ../../examples/saas-launch/intent.json \
  --candidate signal-foundry \
  --out ../../artifacts/signal-foundry
```

For intents whose states map to different application routes, pass a JSON route map:

```bash
pnpm capture -- \
  --url http://127.0.0.1:4173 \
  --intent ../../examples/ai-health/intent.json \
  --candidate evidence-thread \
  --route-map ../../examples/ai-health/route-map-evidence-thread.json \
  --out ../../artifacts/ai-health/evidence-thread
```

The adapter does not declare a design good. It supplies structural and browser evidence for later validation and critique. Automated accessibility output is incomplete. Manual screen-reader, reading-order, zoom, content, interaction, and product-state review remains required.
