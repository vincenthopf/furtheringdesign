# From design reasoning to beautiful interfaces

Research and implementation record, 2026-09-05.

## Decision

Build an authored visual direction and a complete, enjoyable interaction before investing in an aesthetic evaluator. Preserve intent, explicit tradeoffs, and element-level feedback from the earlier research. Use technical checks to protect the work, not to define what beautiful means.

This is a focused review of relevant repositories and primary documentation, not a census of every AI tool or a measured estimate of how often generated UI fails. The causal model below is an engineering and design proposal. The two implemented studies demonstrate the proposal concretely, but do not establish universal preference or a model capability improvement.

## What the existing repository contributes

The baseline reviewed was `a839977e75dd4e63c697e2603bcd73a6fb4f0f55`.

The [README](../README.md) reports disappointing output from a mechanically applied UI skill and makes intent-led reasoning the goal. The [methodology overview](../docs/methodology-overview.md) separates hard constraints, heuristics, and open judgment, and proposes specialized reasoning and structural grounding. The [foundational knowledge bundle](knowledge-bundles/ai-design-thinking/knowledge-bundle.md) emphasizes framing, precedent, reflection through representations, and structured critique. The [mismatch-detection scope](knowledge-bundles/mismatch-detection/scope.md) explicitly includes the limits of aesthetic models.

We retain the useful operational ideas: the intended experience matters, sketches and rendered pages are inputs to design, feedback should identify the affected element, and aesthetic judgments need not agree. We do not need to complete a training pipeline or seven-agent architecture before making a good website.

The earlier documents also contain claims that should not become engineering facts without stronger support. This review does not verify a universal three-to-six-constraint limit, calibrated probabilities for aesthetic judgment, or direct transfer of mathematics process-supervision results to beautiful UI. These remain research hypotheses or unverified extrapolations here. No such numeric claim is used to select or approve these studies.

## External repository review

### Subject-specific design rather than fashionable defaults

[Anthropic's frontend-design source](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) recommends choosing visual identity from the product's subject, taking deliberate typographic and compositional decisions, and reviewing rendered output. It also identifies several different fashionable defaults, not just the familiar gradient-and-card layout.

**Implication for this work:** replacing a blue SaaS kit with a cream editorial kit is not a general solution. Soma's object-led illustration and Interval's media-led player should remain visibly different. The source is guidance, not experimental proof that a prompt guarantees originality.

### Persistent design descriptions help continuity, not necessarily quality

[Google Labs' design.md repository](https://github.com/google-labs-code/design.md) describes a format for communicating a visual identity to coding agents. Its [announcement](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/) explains carrying design decisions between projects and tools.

**Implication:** preserve the chosen direction in a compact artifact next to the code. A perfectly consistent mediocre direction is still mediocre. The DESIGN.md in this change is a human-readable decision record and does not claim formal conformance with Google's specification.

### Interaction quality is made of concrete details

[Vercel's web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) covers focus, interaction targets, URL state, responsive behavior, and feedback. These are useful implementation concerns. They are not a visual identity generator, and individual recommendations still need contextual judgment.

**Implication:** use a small set of relevant checks after and during implementation. Do not replace the art direction with the entire guideline file. For this work, dialog recovery, playback state, motion preferences, and narrow-screen composition are the important seams.

### A polished primitive can still fail in a composed flow

[Radix issue #2270](https://github.com/radix-ui/primitives/issues/2270) reports returning focus to the wrong trigger when a dialog has multiple triggers. [shadcn/ui issue #7519](https://github.com/shadcn-ui/ui/issues/7519) reports keyboard navigation trouble in a dialog/form combination. [Vaul issue #619](https://github.com/emilkowalski/vaul/issues/619) reports a mobile input and virtual-keyboard positioning failure.

These are historical, context-specific issue reports. They do not prove that current library releases are generally broken, and their closure or current status is not used here as evidence of an unfixed defect.

**Implication:** inspect the actual flow in the target browser. A component's reputation does not validate its use in a particular screen. We use native dialogs for the scoped demonstrations and inspect focus, close, and feedback behavior. That choice does not eliminate the need for real-device testing.

### Critique data is not a universal standard of beauty

[Google Research's UICrit repository](https://github.com/google-research-datasets/uicrit) supplies human critiques, localized feedback, and quality ratings for mobile UI screenshots. It is relevant to learning how to make feedback specific.

**Implication:** borrow the practice of identifying the affected element and explaining a correction. Do not convert a static-screen dataset into a universal ranking of art direction, delightful motion, audio experience, or complete web flows. This change neither trains on the dataset nor claims an improvement against it.

## A practical explanation of the failure

Our working hypothesis is that generic UI often results from collapsing several decisions into one generation step. The model must simultaneously infer the product, invent the content, choose a style, compose the page, select components, create assets, implement behavior, and inspect a result it may not actually render. A familiar layout is an easy answer to the combined request.

The proposed correction is not simply “more reasoning.” Separate the consequential decisions and externalize their results: a brief, a selected visual direction, a characteristic working flow, and an inspected browser result. Return to earlier decisions when the visible result contradicts the intent. Technical validity is necessary to protect the experience, but is not a measure of aesthetic quality.

## Risks and responses

| Risk | Visible or experiential failure | Response in the production method |
| --- | --- | --- |
| Template substitution | The product name changes but the hierarchy and page remain interchangeable. | Choose composition from the subject and action. Record the rejected direction. Build distinct examples rather than a recoloring switch. |
| Checklist-driven sameness | Every reference becomes another global prohibition or token. | Keep the active brief small. Use specific decisions, not a universal ban on cards, gradients, serif fonts, or any color. |
| Asset weakness | Empty hero space, unrelated stock imagery, or placeholder art determines the final quality. | Create the subject-specific assets early. Here the objects, covers, and sounds are original and included in source. |
| Screenshot-only completeness | Buttons do nothing, the second state is missing, or a mock commercial claim is mistaken for a real service. | Deliver a complete small flow and label concept content. Do not invent checkout, artists, accounts, testimonials, or inventory. |
| Aesthetic proxy substitution | A model's score or consensus is presented as proof of taste. | Keep editorial judgments explicit. Technical tests do not score or approve beauty. |
| Novelty at the expense of use | Controls become unfamiliar, text becomes illegible, or movement gets in the way. | Keep functional semantics predictable while taking visual risk in composition and assets. |
| Device and state neglect | The desktop hero looks good but controls overflow, a modal obscures feedback, or mobile playback fails. | Inspect supported sizes and real states. Record untested device behavior rather than generalizing from Chromium. |
| Design drift | Later pages copy isolated tokens while losing the original intent. | Keep the direction and representative implementation beside the code. Separate identity from page-specific layout. |
| Rights and provenance | Borrowed assets or brand imitation are represented as original work. | Record sources and rights. Do not redistribute referenced repositories' code, images, or fonts without permission. |
| Overclaiming the result | Two examples are called a universal solution or a proven capability gain. | State what is built, what was inspected, and what remains a design judgment. |

## What was built in response

Soma explores object-led merchandising without a fictional business backend. The visitor sees the specific object, changes a finish, changes its light, inspects its form, and saves or removes it. Interval explores a different category: a listening room with a dominant original cover, a compact queue, and working sound controls. The two examples share behavioral care rather than a universal page skeleton.

The portable contribution is [METHOD.md](../beautiful-ui/METHOD.md), a short brief, a direction record, and implemented examples that show decisions surviving into code. This is intentionally smaller than the previous proposed agent system and more concrete than a set of adjectives. Its usefulness on other projects must be established by building and reviewing those projects, not asserted from these two.

## Primary implementation references

Native dialog semantics and behavior: [MDN dialog documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) and [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

Local audio: [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). This supplies the synthesis mechanism, not evidence that the compositions are enjoyable or therapeutic.

The preferred `escli docs` command was not installed in the working environment. Current primary documentation was consulted instead. No framework was introduced merely to recreate browser-native behavior.

## Evidence boundary

Read the [review record](../beautiful-ui/evidence/REVIEW.md) for the actual test mode, fixes, and limits. No designer panel, user preference study, physical-device review, or cross-browser conformance result is claimed. The absence of a universal proof does not prevent continuing the work. The next improvement should address a visible weakness in a real product, with the intended person and experience in view.
