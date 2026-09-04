# A production method for authored interfaces

The reusable part is the way decisions are made. Do not reuse a visual result across unrelated products.

The deliverable is an interface that feels considered in use, with the source decisions that make it maintainable. A taste score, a longer rule file, or a gallery of unimplemented mockups is not a substitute.

## 1. Establish what the experience is actually about

Write a short brief with the user, the moment, the useful action, the real content, and the feeling the product should leave behind. Replace aesthetic adjectives with consequences.

“Premium” does not choose a typeface. For an object collection, it might mean letting someone inspect a form without promotional clutter. For a listening room, it might mean an uncluttered queue, legible controls, and no unexpected audio. The same adjective can demand different layouts, pacing, and visual identities.

Use real product language and realistic content lengths from the beginning. Identify the useful action and what happens afterward. Where the brief is silent, write down a reasonable assumption and proceed. Do not keep interrupting authorized work for decorative preferences.

**Output:** a brief short enough to stay present while designing. Use the template only where it helps.

## 2. Find a specific direction before assembling components

Explore genuinely different compositions, not three palettes on the same layout. A direction changes how a person encounters the subject: object-led, reading-led, comparison-led, instrument-led, spatial, or something else the brief supports.

For each viable direction, state what the person sees first, what becomes quiet, what creates recognition, and why the direction belongs to this subject. Make a rough visual or a small browser sketch where words conceal the difference. Choose one direction and record why the others were rejected. There is no fixed number of candidates and no average winner.

Use references selectively. Extract a relationship, such as the scale of an object against its caption, the pacing of a reading page, or the response of a control. Do not copy a whole site's combined layout, brand, type, and imagery. A reference's value is not that it is popular.

**Output:** a selected direction with a compact type, color, composition, image, and motion description. These are decisions for this product, not universal rules.

## 3. Build one complete, characteristic experience

Choose the smallest complete flow that carries the direction. “Complete” means a useful beginning, action, response, and way back. For Soma, inspecting and saving a particular object matters more than adding a fake checkout. For Interval, hearing, pausing, and seeking a composition matters more than drawing a large music library.

Make the subject-specific assets early. Typography, imagery, diagrams, illustrations, and actual content are major parts of the design. Do not postpone them and then disguise empty space with generic gradients, stock icons, or fabricated metrics. Commission, license, generate, or author the right assets and record their provenance. A placeholder must stay explicitly a placeholder.

Build at the intended viewing sizes. A smaller screen may need a different composition, not a scaled-down desktop. Let content stay reachable when text grows. Treat details, empty states, errors, and confirmation as parts of the same visual identity.

Use semantic HTML or well-supported interaction primitives for behavior. Libraries can supply focus management or input mechanics. They do not decide the site's hierarchy or identity. Keep technical constraints present from the start so the design does not depend on illegible type or inaccessible interaction. Run their detailed checks separately from aesthetic editing.

**Output:** a working browser experience with the intended assets and the real interaction sequence.

## 4. Edit what the browser actually shows

Look at the page at full size, on a narrow screen, and in the states a person reaches. Read it. Tab through it. Open and close things. Change your mind halfway through. Listen where sound is part of the work. Do not pronounce the implementation beautiful from its source code.

Work from the largest visible problem downward. Is the composition wrong? Is the intended subject visually weak? Are the proportions or line breaks unconvincing? Does the interaction interrupt the experience? Fix the main problem before polishing corner radii. One coherent edit is more useful than changing everything at once.

Tie observations to visible elements and actual states. “The object loses its prominence because its caption and the promotion carry equal weight” is actionable. “Make it more premium” is not. A statement about taste remains a judgment, even when the author is a model. Keep alternatives where that judgment is genuinely uncertain.

Record meaningful corrections with the element, the observed problem, the change, and the retained tradeoff. This is a design decision record, not a transcript of private reasoning. A technical test can establish that the page does not overflow. It cannot establish that the page is exceptional.

**Output:** the edited interface and a short record of consequential changes.

## 5. Keep the identity intact as the product grows

Separate invariants from freedoms. A site's type relationships, interaction vocabulary, treatment of imagery, and tonal intent may remain stable. The exact page composition should respond to content and task. Do not turn the first successful landing page into the template for every screen.

Keep the direction, the representative implementation, and a small set of actual screenshots together. Revisit them when expanding a flow. Save accepted and rejected decisions with reasons so future changes are not driven by whatever aesthetic is easiest to generate next.

One person or agent can perform these roles sequentially. Additional specialists are useful when they contribute distinct expertise or evidence. More agents are not themselves a design improvement, and a consensus is not evidence of taste.

## A usable instruction for a future build

> Read the product brief and the relevant design references. Create a distinct visual direction grounded in the subject, explain the consequential decisions briefly, and build a complete working experience. Use real or explicitly identified concept content. Author the assets that carry the direction. Inspect the rendered interface at its actual sizes and states, then correct the largest visible and experiential weaknesses. Preserve keyboard access, reduced motion, understandable feedback, and recovery. Deliver the implementation, the direction, and the review evidence. Do not deliver a model benchmark, a beauty score, or a recolored version of an unrelated example.

## What counts as done for a delivery

The selected direction is visibly present. The main flow works. The design remains coherent on the supported screens and states. Known technical defects are fixed or explicitly scoped. The sources, asset provenance, tradeoffs, and remaining uncertainties are documented. The owner can inspect the real interface and make a taste decision.

This is a release decision, not a claim that design has a universal optimum. Continue when there is a specific unresolved problem to improve, not merely because another iteration can be generated.
