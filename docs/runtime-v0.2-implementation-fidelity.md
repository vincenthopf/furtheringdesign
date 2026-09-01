# Runtime v0.2: implementation fidelity, rendered diversity, and executable flows

## Decision

The protocol now refuses to treat a convincing design explanation as evidence that the explanation exists in the artifact.

A strict run binds design intent, candidate rationale, browser evidence, workflow completion, rendered identity, and pairwise judgment to one immutable artifact. Passing captures must be content-addressed, and passing workflows must include every declared step and assertion. The runtime can still operate in legacy mode for existing fixtures, but automatic selection should use the strict controls described here.

## Failure model

The first executable protocol closed one-shot generation, mixed evaluation, unsupported absolute scoring, and destructive iteration. Four material gaps remained:

1. Candidate diversity was measured from manifest prose, so differently worded manifests could describe nearly identical rendered output.
2. A candidate could earn credit for a rationale without proving that the rationale was implemented.
3. Static captures could look credible while the primary user workflow failed.
4. One unbound pairwise judgment could decide the winner without independent review, artifact identity, or visible disagreement.

Runtime v0.2 closes those gaps without introducing a universal beauty score.

## Explicit obligations

Intent can define `principles`. A candidate can define `commitments`. Both use the same obligation shape:

```json
{
  "id": "primary-action-visible",
  "statement": "The primary action remains visible before deep proof content.",
  "class": "A",
  "severity": "major",
  "dimension": "taskClarity",
  "stateRefs": ["desktop-light", "mobile-light"],
  "verification": "browser capture and task trace",
  "automation": {
    "source": "playwright",
    "metric": "outline.interactiveOverlapCount",
    "operator": "eq",
    "expected": 0
  }
}
```

Canonical references are stable:

- `intent:<principle-id>`
- `candidate:<commitment-id>`

Evidence that verifies an obligation declares its references and one implementation classification:

- `full`
- `partial`
- `none`
- `unknown`

A missing state is `unknown`, not a pass. Conflicting evidence resolves conservatively and records disagreement.

## Thinking Fidelity Score

The Thinking Fidelity Score measures whether concrete candidate commitments are implemented across every required state.

```text
full = 1
partial = 0.5
none = 0
unknown = 0

TFS = mean(commitment implementation scores)
TFS lower bound = TFS - uncertainty penalty
```

A hard Class A commitment with blocker or major severity must be fully implemented. Partial implementation does not pass a hard obligation.

## Principle Adherence Score

The Principle Adherence Score applies the same computation to intent principles. This separates two questions:

- Did the system build what its candidate rationale promised?
- Did the artifact satisfy the design principles embedded in the actual product intent?

Both scores include state coverage, evidence confidence, disagreement, and a conservative lower bound. Strict policy can require complete obligation coverage and set independent floors for TFS and PAS.

## Bounded browser automation

An obligation can include an optional Playwright automation check. The check is deliberately limited to a metric path, comparison operator, expected value, and tolerance. It cannot execute arbitrary code.

Current metric namespaces include:

- `outline.horizontalOverflowPx`
- `outline.clippedTextCount`
- `outline.interactiveOverlapCount`
- `outline.longLineCount`
- `outline.headingCount`
- `outline.landmarkCount`
- `outline.duplicateIdCount`
- `outline.smallTargetCount`
- `focus.count`
- `focus.invisibleCount`
- `axe.violationCount`
- `axe.criticalSeriousCount`
- `profile.*` extracted render metrics

Open aesthetic principles remain Class C judgments. They are not converted into fake deterministic checks.

## Artifact-bound evidence

A candidate can declare `artifactRef`. Evidence declares the same reference and records capture time and tool identity. Browser captures record screenshot and node-map SHA-256 digests. Strict policy can reject unhashed captures, so a path or filename cannot stand in for artifact evidence. Render profiles, workflow runs, and pairwise comparisons also carry the artifact reference.

Any code change creates a new artifact. Evidence and judgments tied to the previous artifact become stale. Revision plans now state that captures, workflow runs, implementation evidence, and pairwise comparisons must be recollected after a patch.

Use a Git commit, Git tree, or content digest as the artifact reference. A candidate name is not a strong artifact identity.

## Rendered direction diversity

Manifest distance remains a cheap warning for legacy runs. Strict selection uses browser-derived render profiles.

For every browser and state, the Playwright adapter extracts bounded vectors for:

- layout occupancy, centroids, and semantic region distribution
- palette distribution
- typography size, weight, and line-height distribution
- density, interaction, imagery, elevation, and radius characteristics

Candidate distance is computed only across shared browser-state profiles. Expected profiles come from the declared browser-state matrix and captured states, not only from whatever profiles happen to be present. The runtime reports both pair coverage and profile coverage. A strict run enters human review when required profiles are missing. It also counts distinct rendered direction clusters, so two losing candidates cannot collapse into one template while an unrelated winner hides the incomplete search.

Rendered distance is a search-diversity instrument, not a beauty score. A candidate must pass hard gates, quality floors, implementation audits, and workflows before diversity contributes to ranking.

## Executable workflows

Intent can define browser workflows for critical tasks. Workflows use a bounded action set:

- click
- fill
- select
- check or uncheck
- press
- wait for a semantic target

Completion uses observable assertions:

- visible or hidden
- text
- URL
- count
- checked state
- value

Locators use role, label, test id, visible text, or CSS. Semantic locators are preferred. Each workflow declares its actor, start state, quality dimension, obligation class, severity, required browsers, steps, and completion assertions.

The Playwright adapter opens a fresh context for each browser workflow, executes the steps, records per-step evidence, captures the final state, and emits a deterministic protocol signal. The runtime derives pass, fail, or unknown from the complete declared step and assertion set rather than trusting a supplied status field. A missing, skipped, or failed hard workflow makes the candidate ineligible.

## Pairwise evaluator quorum

Pairwise comparison now supports multiple judgments per candidate pair. A strict policy can require:

- a minimum number of evaluators
- a minimum number of independent evaluators
- a minimum number of independent evaluator sources
- both candidate artifact references
- intent-linked quality criteria
- named preference profiles
- maximum tolerated disagreement

Pairwise confidence is reduced by evaluator disagreement. The runtime preserves ties and conflicts instead of averaging them into false certainty. When a required quorum is incomplete or disagreement is too high, selection returns `human-review`.

This structure supports plural taste. A preference profile can represent the product owner, target user cohort, brand lead, accessibility reviewer, or another relevant perspective rather than pretending that one generic model judge represents everyone.

## Strict policy

```json
{
  "requireBoundEvidence": true,
  "requireCaptureHashes": true,
  "implementationAudit": {
    "enabled": true,
    "requireCommitments": true,
    "requirePrinciples": true,
    "thinkingFidelityFloor": 0.8,
    "principleAdherenceFloor": 0.85,
    "minimumCoverage": 1,
    "uncertaintyPenalty": 0.18
  },
  "renderedDiversity": {
    "required": true,
    "floor": 0.18,
    "minimumCoverage": 1,
    "minimumDistinctCandidates": 3,
    "requiredBrowsers": ["chromium", "firefox"],
    "weights": {
      "layout": 0.45,
      "palette": 0.2,
      "typography": 0.2,
      "density": 0.15
    }
  },
  "workflowAudit": {
    "enabled": true,
    "required": true,
    "minimumCoverage": 1,
    "completionFloor": 1,
    "requiredBrowsers": ["chromium", "firefox"]
  },
  "pairwiseAudit": {
    "required": true,
    "minimumEvaluators": 2,
    "minimumIndependentEvaluators": 2,
    "minimumIndependentSources": 2,
    "requireArtifactBinding": true,
    "requireCriteria": true,
    "maximumDisagreement": 0.45
  }
}
```

## Playwright capture

```bash
node adapters/playwright/capture.mjs \
  --url http://127.0.0.1:3000 \
  --intent path/to/intent.json \
  --manifest path/to/candidate.json \
  --artifact-ref git:<candidate-commit> \
  --out artifacts/<candidate>
```

The adapter emits:

- full-page captures across Chromium, Firefox, and WebKit
- screenshot and node-map digests
- axe results
- focus traces
- clipping, overlap, overflow, target-size, hierarchy, and reading-measure signals
- bounded automated obligation signals
- rendered profiles
- browser-executed workflow runs and final screenshots

## Selection boundary

A strict automatic selection now requires:

```text
valid intent and candidates
+ artifact-bound evidence
+ hard Class A gates
+ quality floors
+ complete weighted dimensions
+ TFS and PAS floors
+ complete required workflows
+ rendered direction diversity
+ independent pairwise quorum
+ acceptable uncertainty and decision margin
```

The correct result is `human-review` when evidence cannot resolve a real aesthetic or product tradeoff. The correct result is `blocked` when no candidate satisfies purpose and obligations. The runtime does not manufacture a winner.

## Remaining limits

The runtime still does not prove business impact before release or replace expert review. Browser metrics can detect defects and describe rendered structure, but they cannot determine whether an original composition is culturally appropriate or emotionally exact. Pairwise model evaluators may share training bias. Workflow tests prove declared paths, not every real-world path. Product analytics, user research, screen-reader review, performance traces, and calibrated preference data remain necessary.

The improvement is concrete: explanations must now survive contact with the artifact, critical flows must execute, visual alternatives must actually differ, and judgment must carry identity, evidence, and uncertainty.
