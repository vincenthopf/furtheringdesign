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
npm install
npx playwright install --with-deps
node capture.mjs \
  --url http://127.0.0.1:3000 \
  --intent ../../examples/saas-launch/intent.json \
  --candidate signal-foundry \
  --out ../../artifacts/signal-foundry
```

The adapter does not declare a design good. It supplies structural and browser evidence for later validation and critique. Automated accessibility output is incomplete. Manual screen-reader, reading-order, zoom, content, interaction, and product-state review remains required.
