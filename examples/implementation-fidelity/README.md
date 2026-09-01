# Implementation-fidelity example

This synthetic fixture exercises the strict runtime without requiring a browser server.

It contains three candidates:

- `evidence-path` implements its commitments, passes the primary workflow, and wins the calibrated comparison
- `editorial-proof` remains eligible but ranks lower
- `rationale-only` describes a coherent direction but does not implement its commitment or complete the workflow, so it is ineligible

Run:

```bash
node examples/implementation-fidelity/command.mjs validate
node examples/implementation-fidelity/command.mjs evaluate
node examples/implementation-fidelity/command.mjs plan rationale-only
```

The hashes and browser records are deterministic fixture data. Production evidence must come from the Playwright adapter or another adapter that binds real captures and workflow results to the candidate artifact.
