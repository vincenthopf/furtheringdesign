# UI risk model

The risk model covers output quality, product behaviour, code safety, evaluation integrity, and governance. Controls are mapped to the protocol rather than expressed as more visual rules.

| Risk | Failure | Impact | Primary control | Residual limit |
|---|---|---|---|---|
| Intent loss | Brief collapses into page type and style adjectives | Attractive output solves the wrong problem | Validated intent schema, task and outcome contract | Stakeholders can still provide the wrong intent |
| Audience hallucination | Model invents capabilities, anxieties, or context | Inappropriate density, language, and interaction | Named audiences with evidence and assumptions | User research quality limits accuracy |
| Pattern gravity | Frequent training patterns dominate | Generic, low-trust, interchangeable output | Structural direction search and rejected-pattern record | Novel descriptions can still render conventionally |
| Cosmetic variation | Candidates share the same structure | False sense of exploration | Seven direction axes and diversity floor | Lexical distance is not structural proof |
| Reference copying | Surface similarity replaces functional analogy | IP, brand, and originality risk | Reference policy and abstract-principle retrieval | Human review remains necessary |
| Aesthetic overreach | Evaluator states subjective preference as fact | Bad decisions hidden behind authority | Confidence, disagreement, pairwise comparison | Evaluators can share correlated bias |
| Average-score masking | Strength in one dimension hides a critical weakness | Polished but unusable selection | Hard gates, quality floors, Pareto frontier | Floors depend on correct intent priorities |
| Accessibility waiver | Visual ambition overrides operation | Exclusion, legal exposure, failed task | Class A accessibility gate and state coverage | Automation cannot detect every barrier |
| State blindness | Only the happy desktop screen is judged | Broken mobile, error, loading, dark, or reduced-motion states | Explicit state matrix and capture validation | Product-specific states must be enumerated |
| Pixel-only critique | Screenshot hides semantics and behaviour | Advice cannot map safely to implementation | Semantic node references, browser evidence, component tree | Node identity can drift across builds |
| Browser-preview mismatch | Embedded preview differs from real browsers | Release regressions remain hidden | Chromium, Firefox, and WebKit capture adapter | Device and extension diversity remains larger |
| Content fabrication | Placeholder claims look real | Trust, legal, and business risk | Source-of-truth and claim evidence contract | Source material can itself be wrong |
| Destructive editing | Local design change overwrites working files or content | Data loss, regressions, high recovery cost | Immutable baseline, allowed/protected paths, diff-only patches | Enforcement depends on host integration |
| Full-file rewrite | Agent replaces files for small changes | Noisy diffs and hidden regressions | Scoped patch contract and reviewable tree | Some refactors legitimately span files |
| Design drift | Later agents forget the selected rationale | Interface becomes generic over time | Durable candidate decisions and retrieval | Teams can intentionally ignore the record |
| Token fragmentation | One-off values proliferate | Inconsistent UI and maintenance cost | Candidate tokens and code-review evidence | Token use does not guarantee good composition |
| Motion dependence | Direction fails without animation | Reduced-motion and low-power failure | Motion purpose, reduced-motion state, Class A gate | Static alternative may weaken the thesis |
| Performance theatre | Visual effects create slow interactions | Poor experience and conversion | Browser trace evidence and performance floor/gate | Lab data does not equal field data |
| Proxy metric gaming | System optimizes the score instead of the outcome | Artificially compliant but ineffective design | Mixed evidence, pairwise judgment, production outcomes | Any explicit metric can be gamed |
| Premature auto-selection | Small or uncertain lead is treated as decisive | Wrong design ships without review | Margin, uncertainty, confidence, and Pareto conditions | Thresholds need calibration from real runs |

## Severity policy

- **Critical**: destructive data loss, security breach, illegal or inaccessible core task. Block immediately.
- **High**: hard contract failure or likely product outcome failure. Candidate is ineligible until resolved.
- **Medium**: measurable quality degradation. Apply a floor, score penalty, or required review.
- **Low**: local polish or preference issue. Record without blocking unless intent elevates it.

## Governance

A production system should log the exact intent version, candidate baseline, adapter version, model and prompt version, evidence sources, confidence, selection thresholds, selected commit, human overrides, and post-release outcomes. Overrides should include a reason and should not silently mutate the original evidence.
