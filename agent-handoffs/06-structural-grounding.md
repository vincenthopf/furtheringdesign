# Agent Handoff: Layer 6 — Structural Grounding

## Your Mission

You are designing the **Structural Grounding** layer — the mechanism that links design reasoning to specific, identifiable elements in the design artifact, so that every critique, every suggestion, and every mismatch detection references something concrete and actionable.

This is the bridge between abstract reasoning ("the hierarchy is unclear") and actionable feedback ("the heading on line 47 in `Hero.tsx` needs to be visually dominant over the subtext on line 52 — increase font-size from 24px to 36px and change font-weight from 400 to 700").

## Mandatory First Step — Read Context, Report Understanding, Then Run Research

Before proposing the Structural Grounding layer, you MUST first read all required context files, report your understanding to the user for alignment, and only after confirmation run a dedicated foundational recursive research pass on **grounding design reasoning to DOM, React components, Figma node trees, accessibility engines, and UI structure rather than pixels**.

Do not skip this. The existing research MUST be read before any new research is launched. It showed pixel bounding boxes are weak. Your job is to go deeper into structural grounding approaches that are practical for generated front-end code and design tools.

### Required context-reading and alignment checkpoint

Before running new research, do this first:

1. Read every file listed in **What You Must Read Before Starting**.
2. Read any **Potentially useful** files that look relevant to your scope.
3. Report back to the user with:
   - The files you read
   - Your understanding of the larger project and why your problem matters
   - The specific problem you think you are solving
   - The assumptions you are carrying forward from the existing research
   - The places where the current handoff seems underdefined, risky, or possibly wrong
   - The exact recursive research plan you intend to run next: cycle-1 query angles, expected output files, and likely cycle-2 gap targets
4. Stop and wait for user confirmation or correction.

Only after the user confirms your understanding should you run the recursive research below.

### Required research procedure

1. Read the skill instructions at:
   - `/Users/vincenthopf/.pi/agent/skills/foundational-recursive-research/SKILL.md`

2. Create a research bundle at:
   - `.building/knowledge-bundles/structural-grounding/`

3. Run recursive research using the skill workflow. Your Cycle 1 must include at least these angles:
   - UI grounding models and benchmarks: ScreenAI, Pix2Struct, SeeClick, UGround, ScreenSpot, AutoGUI, DOM-based web agents.
   - Structural representations of UI: HTML DOM, accessibility tree, React component tree, Figma node tree, Android view hierarchy, design tokens.
   - Methods for mapping natural-language critique to specific UI elements/components/selectors/layers.
   - Programmatic verifiers and objective checks: axe-core, WCAG contrast/tap targets, CSS layout analysis, visual regression, design token validation.
   - How to generate actionable fixes from grounded critique: selector-level changes, component prop changes, Tailwind class edits, Figma layer modifications.

4. After Cycle 1, perform gap analysis. If high-priority gaps remain, run Cycle 2. Prioritize:
   - Best unified reference format across DOM/Figma/component trees.
   - How to ground critiques that apply to relationships between elements rather than one element.
   - How to integrate structural grounding with generated Tailwind/React output.

5. Write the final bundle to:
   - `.building/knowledge-bundles/structural-grounding/knowledge-bundle.md`

### Post-research report-back

After completing the recursive research and before designing the structural grounding layer, report back with:
- The research cycles you ran and files produced
- Why structural grounding is better than bounding boxes
- Existing models/tools that can be used now
- The best reference format for grounded critique
- Your updated framing of the problem

Only after user confirms your post-research framing should you propose the Structural Grounding design.

## The Problem You're Solving

Current AI design critique is ungrounded — it produces high-level commentary ("the layout feels cluttered") without pointing to specific elements. When it does try to point, it fails:

- **Bounding box grounding is weak.** UICrit's best result: IoU of 0.222 with visual prompting aids. Without aids: 0.004. Models can't reliably draw a box around the element they're critiquing.
- **Pixel-based grounding is ambiguous.** Overlapping elements, responsive layouts, and dynamic content make pixel coordinates unreliable.
- **The real answer is structural grounding** — grounding to the underlying structure (HTML DOM, Figma node tree, React component hierarchy) rather than pixels. This is more precise, unambiguous, and directly actionable.

The research confirmed: the Figma REST API exposes the full node tree (every layer, its properties, geometry, text content, constraints). HTML/React codebases expose the component tree and DOM structure. These are the grounding targets — not pixel bounding boxes.

## What You Must Read Before Starting

**Core research (required):**
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/03-process-supervision-multimodal.md` — THIS IS YOUR PRIMARY FILE. Read:
  - "Multimodal Alignment in Design Reasoning" — the full problem statement
  - "Technical Approaches for Visual Grounding" — bounding boxes, visual prompting, structural data parsing
  - "Figma API for Reasoning Grounding" — how Figma's REST API enables layer-level grounding
  - "Vision Language Model Performance on Design Critique" — why VLMs fail at spatial grounding
  - "Key Models and Frameworks" table — ScreenAI, Pix2Struct, UIClip, SeeClick, AutoGUI
  - "Relevant Datasets and Benchmarks" table — UGround, ScreenSpot, Mind2Web
  - "Verifiable Reasoning with Design Standards" — axe-core as a programmatic verifier

**Supporting research (required):**
- `.building/knowledge-bundles/ai-design-thinking/knowledge-bundle.md` — read section 3 (load-bearing claims on Figma API, axe-core, VLM performance, IoU scores).
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/02-uicrit-and-design-rationale-systems.md` — UICrit's bounding box schema and how critiques are grounded to regions. Read "UICrit Schema Details."

**Potentially useful:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/03-ai-design-attempts.md` — AI design systems landscape, including sketch-to-code systems that parse UI structure.
- The existing UI skill at `~/.pi/agent/skills/ui/SKILL.md` — the skill outputs Tailwind HTML. The grounding layer needs to work with this kind of output (HTML/JSX with Tailwind classes).

## What We've Already Established

From our discussion:

1. **Don't ground to pixels — ground to structure.**
   - For HTML/React: reference elements by selector, class, component name, or line number
   - For Figma: reference layers by node ID or path in the layer tree
   - For any framework: reference components by name and prop values
   - This sidesteps the spatial grounding problem entirely

2. **Two-stage critique pipeline:**
   - Stage 1: Generate the critique text (what's wrong and why)
   - Stage 2: Separately ground each critique point to a specific structural element
   - UICrit's research showed separating reasoning from localization improves both

3. **Programmatic verifiers as grounding aids:**
   - Axe-core for accessibility checks (contrast, tap targets, alt text) — provides objective ground truth
   - CSS/layout analyzers for spacing consistency, grid alignment
   - These produce verifiable, binary results that anchor probabilistic design judgments

4. **The system outputs code, not Figma files.** The primary use case is the UI skill generating Tailwind HTML/React. Grounding needs to work with code-level elements first, Figma second.

## What You Need To Produce

1. **Grounding target taxonomy** — what kinds of structural elements can be grounded to, across different artifact types:
   - HTML/JSX (DOM elements, components, CSS classes, inline styles)
   - Figma (layers, frames, components, auto-layout properties)
   - Design tokens (colors, spacing, typography scales)
   - What's the unified reference format?

2. **Grounding protocol** — the step-by-step process for linking each reasoning/critique point to a specific element:
   - How to identify the target element from a critique statement
   - How to generate an unambiguous reference
   - How to verify the reference is correct
   - How to handle cases where the critique applies to a relationship between elements (not a single element)

3. **Programmatic verifier integration** — how to integrate objective checking tools:
   - Axe-core for accessibility
   - CSS analysis for spacing/alignment consistency
   - Color contrast calculators
   - Typography scale validators
   - How these verifiers feed into the mismatch detection system

4. **Actionability specification** — how to produce output that's directly actionable:
   - From critique ("this button has insufficient contrast") to specific fix ("change `bg-blue-400` to `bg-blue-600` on the `<button>` at line 23 of `Hero.tsx`")
   - How to generate code-level suggestions, not just prose feedback
   - How to handle fixes that require structural changes (reordering elements, changing hierarchy)

5. **Integration model** — how structural grounding connects to:
   - The Mismatch Detector (grounds each detected mismatch to specific elements)
   - The Design Reasoning Framework (grounds each reasoning step to what it's reasoning about)
   - The Flow Understanding layer (grounds cross-screen concerns to specific shared elements/components)
   - The Training Data Pipeline (grounded data is higher-quality training data)

## How To Report Back

Present:
- Your understanding of why structural grounding replaces pixel-based grounding
- The grounding target taxonomy
- The grounding protocol
- The programmatic verifier integration plan
- The actionability specification
- The integration model
- Open questions and dependencies
- Assessment of what's achievable now vs. what requires new tooling
