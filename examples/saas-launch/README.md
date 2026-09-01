# SaaS launch example

This fixture demonstrates the Furthering Design Protocol against one intent and three deliberately different directions.

- `signal-foundry` uses an evidence spine and passes intent, accessibility, responsive, and implementation gates.
- `safe-grid` is accessible and maintainable but loses distinctiveness and product-specific reasoning.
- `kinetic-lab` is memorable and coherent but fails accessibility, task, responsive, performance, and implementation controls.

The evidence is illustrative fixture data. It demonstrates the protocol contract and selection behaviour; it is not a live measurement of a deployed website.

Run:

```bash
npm test
npm run validate:example
npm run evaluate:example
npm run plan:example
node runtime/cli.mjs packet examples/saas-launch/intent.json --out /tmp/furthering-design-packet
node examples/saas-launch/command.mjs write-run /tmp/run.json
```
