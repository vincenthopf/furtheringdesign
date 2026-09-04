# The direction of the two studies

These decisions describe these interfaces. They are not a style to impose on another product.

## Soma

**Intent.** Let a visitor discover a small sculptural collection, inspect an object, and keep a personal selection. The desired feeling is warmth and curiosity without sales pressure.

**Composition.** The lamp is the hero, not an abstract shape beside a sales pitch. The large text and the large silhouette share the first view. Three real finish choices and the light switch sit immediately beneath the object they affect. The rest of the collection is deliberately small and the explanatory note comes afterward. Equal catalog frames support comparison among three objects. They are not a default page-building grid.

**Type.** Arial/Helvetica system sans, regular display weight, close display spacing, calm body text. The rounded counters echo the objects without requiring a decorative font. System fonts avoid a network dependency and make the source directly usable. Font substitution can change wrapping on another operating system, so inspect the result there before product release.

**Color.** Lilac `#e8e2f0` makes orange light and green forms distinct without defaulting to a cream-and-clay luxury theme. Ink `#302238` carries text and the main action. Paper `#f5f2f7` gives the catalog a quieter ground. Moss `#d5dfcc` changes the pace of the final note. Accent `#bd431b` belongs to the lamp and the small brand mark.

**Images.** Original SVG object drawings. Gradients describe material and light, not empty page decoration. The original forms are a pleated dome, a twin-arch stool, and a folded vessel. They are illustrations, not photographs of manufactured products.

**Interaction.** The switch changes the lamp's illumination. Finish selection changes the rendered object and its text label. A detail dialog preserves the selected object and offers a reversible save action. Confirmation lives inside the active dialog rather than behind it. Empty and storage-unavailable states explain what is possible.

**Motion.** A short response to the light switch, a restrained image enlargement on hover, and a small dialog entrance. There is no scroll interception, delayed content reveal, or ambient animation. Reduced motion removes these transitions.

**Rejected direction.** A conventional product-store design with prices, reviews, and checkout would invent business facts and distract from examining the objects. A cream background and serif “luxury” headline would not be enough to give this collection its own identity.

## Interval

**Intent.** Let a visitor choose and hear a short original sound, adjust the listening experience, and leave without a feed or account.

**Composition.** This is a media interface, not a marketing funnel. A dominant cover sits beside a compact, complete queue. The player is a single continuous control surface, not a collection of floating widgets. At smaller widths the cover, queue, and player become a readable sequence. The player remains in document flow so it does not cover other controls.

**Type.** A Georgia wordmark and page title introduce a quieter editorial voice. Sans-serif cover lettering, queue labels, and controls keep selection and playback direct. The giant cover lettering is part of the artwork, not a duplicate marketing headline.

**Color.** Cobalt `#2248da` and paper `#f6f7fb` establish the listening room. Ink `#182b62` and muted text `#586486` support reading. Each sound has its own cover palette and geometry: cobalt elliptical rings, peach overlapping ellipses, and yellow rising circles. The controls stay in the same place while artwork changes.

**Assets.** Original SVG cover compositions and finite, original sine-tone compositions created with Web Audio. No external recordings or artist identities. Each track's duration in the queue is the duration the player actually uses.

**Interaction.** Track rows explicitly play a sound. The main button toggles play and pause. Seeking preserves the chosen sound. Previous and next preserve whether the listener was already playing. Sound URLs select without autoplay. Audio startup failures keep an understandable retry action. Audio is bounded in duration and begins at a conservative application volume, though the person's device level remains outside application control.

**Motion.** The progress control moves because sound is advancing. The artwork does not need to spin to prove that the interface is alive. There is no autoplay, looping carousel, or automatic next track.

**Rejected direction.** A full streaming dashboard would require fake artists, data, and service operations. Reusing Soma's product grid would obscure playback. A “wellness” landing page would replace the useful listening experience with claims the work cannot substantiate.

## Shared behavior, independent appearance

Native controls, readable feedback, focus visibility, reduced motion, stable selection, and responsive layout are shared expectations. Palette, hierarchy, typography, artwork, density, and composition belong to the individual subject. No numeric aesthetic threshold selects these designs.
