# Authored UI

Working interfaces and a production method for creating beautiful, enjoyable websites. Not an aesthetic scoring system, a model benchmark, or a universal component theme.

Start with the interfaces. Soma is a sculptural object collection with original illustrations, selectable finishes, lighting, object details, and a saved collection. Interval is a listening room with original visual compositions and locally synthesized sound, playback, pause, seeking, volume, and track selection. Their appearance is deliberately different.

## Run

From the repository root:

```sh
python3 -m http.server 8000 --directory beautiful-ui
```

Open `http://localhost:8000`. Each page is also a self-contained HTML file. There is no build, package installation, remote font, external image, API key, analytics, or runtime dependency. Storage and URL features use browser APIs. An HTTP origin is recommended for predictable storage and history behavior.

## Use this for your next website

Give the agent the actual product, real content, audience, and references, together with [METHOD.md](METHOD.md). Use [brief.template.md](brief.template.md) to resolve missing information, not to collect dozens of preferences. Have it deliver an authored interface, not a populated copy of either demonstration.

[DESIGN.md](DESIGN.md) explains the decisions in these examples. [AGENTS.md](AGENTS.md) is a compact production handoff. [The research](../research/ui-quality-2026-09-05.md) distinguishes source observations from proposals, defines the risks, and connects this implementation to the repository's earlier work. [The review](evidence/REVIEW.md) records what was actually inspected and tested.

## What is implemented

Soma supports three concept objects, three finishes for the featured lamp, a light switch, keyboard-operable native dialogs, saving and removing objects, an empty collection, storage failure feedback, and object URLs. Saved collections contain object identities, not product configurations.

Interval generates three finite compositions from sine oscillators. Sound starts only on a play action. It supports pause, resume, seek, previous and next selection, volume, mute, end-of-piece behavior, sound URLs, and an audio failure message. Selecting a sound through its row plays it. Previous and next continue playback only when a sound was already playing. Navigation to a sound URL does not autoplay.

Neither example is a store, a streaming service, or a backend application. Names, objects, copy, artwork, and compositions are original demonstration material. No product specifications, commercial claims, or external recordings are being represented as real.

## Browser checks

The optional test tool uses Python and Playwright. Install Playwright and its Chromium browser in your development environment, then run:

```sh
python3 -m pip install playwright
python3 -m playwright install chromium
python3 beautiful-ui/tests/smoke.py
```

Use `--chromium /path/to/chromium` for an existing browser. `--render-only` is an explicit restricted-environment mode using in-memory documents. It does not claim to test real navigation or durable browser storage. Screenshots and a JSON report are written to `beautiful-ui/evidence/generated/`.

These are behavior and rendering checks, not beauty scores. Cross-browser and physical-device review still matters before shipping a real product.

## Scope and license

This is an implemented production extension to the research repository. It does not claim to implement its proposed seven-agent architecture, train a model, or prove universally preferred aesthetics. The repository's CC BY-SA 4.0 license applies. No third-party font files, artwork, audio, or source code are bundled.
