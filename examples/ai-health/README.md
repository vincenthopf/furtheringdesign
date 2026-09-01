# Arcwell AI health design run

This example applies the Furthering Design Protocol to one fictional consumer AI health product with two surfaces:

- a public SaaS marketing site
- an authenticated personal health dashboard

Arcwell is a prototype. It uses fictional data, does not provide medical advice or diagnosis, and does not claim regulatory clearance, clinical outcomes, security certification, or emergency monitoring.

## Run the prototype

```bash
pnpm install
pnpm dev
```

Routes:

```text
/?candidate=evidence-thread
/app?candidate=evidence-thread
/?candidate=care-ledger
/app?candidate=care-ledger
/?candidate=daily-compass
/app?candidate=daily-compass
```

The in-product candidate switcher moves between the same routes.

## Run the protocol

```bash
pnpm validate:health
pnpm evaluate:health
pnpm plan:health
```

The selected implementation and design memory live in `design-memory/`. Evidence is generated from browser captures and protocol critique, then collected into `run.json` by `command.mjs`.
