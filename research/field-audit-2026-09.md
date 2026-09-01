# Field audit: AI-generated UI failure modes

**Audit date:** 2026-09-01

## Scope

This audit examined public issue reports from AI app builders and screenshot-to-code projects, then compared those reports with the existing Furthering Design research and primary evaluation sources. Issue reports are evidence of concrete failure modes, not population estimates or proof that every tool has the same architecture.

## Observed failure clusters

### Structure is not reliably preserved

- Screenshot-to-code issue #463 reports a requested 2x3 grid rendering with a different layout despite prompt changes: https://github.com/abi/screenshot-to-code/issues/463
- Issue #435 asks for desktop and mobile screenshots to produce one responsive implementation instead of separate code: https://github.com/abi/screenshot-to-code/issues/435
- Issue #498 raises maintainability concerns about one-page output and repeated utility-heavy markup: https://github.com/abi/screenshot-to-code/issues/498

These reports support structural grounding, state-matrix evidence, and maintainability as first-class evaluation dimensions.

### Generated interfaces converge on recognizable defaults

- Dyad issue #1857 describes obvious "vibe coded" output, lower perceived quality, repeated prompting, and hardcoded styling without a reusable design system: https://github.com/dyad-sh/dyad/issues/1857
- Dyad issue #1797 asks for an alternative icon system because repeated Lucide choices make generated apps look similar: https://github.com/dyad-sh/dyad/issues/1797

A bigger pattern catalogue alone does not solve this. The protocol forces structurally distinct directions and derives distinctiveness from intent and product evidence.

### AI edits can destroy working design state

- Dyad issue #2029 reports layouts or content being accidentally overwritten and difficult to recover from version history: https://github.com/dyad-sh/dyad/issues/2029
- Dyad issue #1173 describes using filesystem read-only locks because later AI changes broke stable parsers: https://github.com/dyad-sh/dyad/issues/1173
- Dyad issues #2935 and #3058 report externally edited files being overwritten by automated repository behaviour: https://github.com/dyad-sh/dyad/issues/2935 and https://github.com/dyad-sh/dyad/issues/3058
- Bolt.diy issues #1879 and #1888 request diff-based or AST-aware edits instead of full-file replacement: https://github.com/stackblitz-labs/bolt.diy/issues/1879 and https://github.com/stackblitz-labs/bolt.diy/issues/1888
- Dyad issue #3204 reports application deletion without a recoverable trash path: https://github.com/dyad-sh/dyad/issues/3204

Prompt instructions are not a sufficient safety boundary. The protocol makes baseline, path scope, diff mode, and rollback part of the candidate contract so a host can enforce them.

### Preview evidence can be false or incomplete

- Dyad issue #1872 reports behaviour differing between an embedded preview and current external browsers: https://github.com/dyad-sh/dyad/issues/1872
- Dyad issue #2320 reports continuous re-rendering in the internal preview while localhost works in a browser: https://github.com/dyad-sh/dyad/issues/2320
- Dyad issue #3175 requests computer use and self-testing: https://github.com/dyad-sh/dyad/issues/3175

This supports running evidence capture in multiple real browser engines and treating preview output as one state, not ground truth.

### Context and history degrade during long work

- Dyad issue #2081 reports files being excluded from context during a long project: https://github.com/dyad-sh/dyad/issues/2081
- Dyad issue #2637 asks for reliable handoff to a new chat during long sessions: https://github.com/dyad-sh/dyad/issues/2637
- Dyad issue #2903 asks for persistent, searchable chat and message memory: https://github.com/dyad-sh/dyad/issues/2903

The protocol therefore stores intent, candidate decisions, evidence, and selection rationale as artifacts that outlive one model context.

## Primary research and standards

- WCAG 2.2 Recommendation: https://www.w3.org/TR/WCAG22/
- Playwright emulation and visual comparison documentation: https://playwright.dev/docs/emulation and https://playwright.dev/docs/test-snapshots
- UICrit dataset and paper: https://github.com/google-research-datasets/uicrit and https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf
- UIClip: https://arxiv.org/abs/2404.12516
- Design2Code: https://arxiv.org/abs/2403.03163
- Core Web Vitals: https://web.dev/articles/vitals

The existing repository already synthesizes the cognitive and multimodal research in `research/knowledge-bundles/`. This audit adds repository-level evidence that safety, state coverage, and durable context are part of the UI problem, not separate implementation concerns.

## Resulting requirements

The field evidence changes the solution from a prompt or style guide into a protocol with these mandatory controls:

1. Computable intent before design.
2. At least three structurally different candidates.
3. Immutable baseline and enforceable path-scoped diffs.
4. Real browser and product-state evidence.
5. Semantic node grounding.
6. Separate Class A validation, Class B scoring, and Class C critique.
7. Confidence, disagreement, quality floors, and Pareto selection.
8. Durable design memory and explicit human-review conditions.
