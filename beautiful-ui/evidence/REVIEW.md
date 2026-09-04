# Rendered review and implementation evidence

Reviewed for the 2026-09-05 Authored UI change. The subject of this review is the two working interfaces, not the capability of a model.

## Visual decisions retained

Soma uses a large original object drawing, close-set regular sans typography, a lilac environment, and controls placed against the object they change. Its collection remains small enough to inspect rather than becoming a scrolling catalog. The desktop and narrow-screen compositions preserve the object, its silhouette, and the main action.

Interval gives its original cover most of the visual area, with a complete three-piece queue and a single continuous playback surface. Its typography, palette, geometry, and activity are different from Soma. On a narrow screen, the cover, queue, and player become a deliberate sequence rather than compressed desktop columns.

Desktop and mobile screenshots were rendered and visually inspected. These are editorial judgments, not a preference study or proof that the examples are the best possible direction. The artwork is intentionally illustrative. A real product with photographs, different content, or a different audience needs its own direction.

## Corrections made after rendering and interaction

The first narrow-screen pass found a control row extending beyond 320 pixels. The finish name now moves beneath the swatches at the smallest widths. A confirmation initially appeared outside a native dialog and was hidden behind the browser's modal top layer. Confirmation now appears within the active dialog.

The lamp finish selection received a distinct keyboard focus style. Dialog tab navigation now wraps among its visible controls, while Escape and native focus restoration remain intact. Removing the last saved object moves focus to the collection heading instead of discarding the visitor's position. Both dialog openers were exercised independently.

Interval's alternate artwork had a crop mismatch in its thumbnails. The SVG viewport now fills its frame consistently. The mobile volume control remains available instead of disappearing. Mute now has a visible crossed icon. Audio scheduling skips expired notes and protects against an outdated asynchronous start completing after a newer action.

## Executed checks

`python beautiful-ui/tests/smoke.py --render-only --chromium /usr/bin/chromium`

The recorded run completed **66 of 66 checks** in Chromium 144.0.7559.96 on Linux. See [last-run.json](last-run.json) for individual results and the execution host's timestamp. The script generates screenshots and an unambiguous JSON report. It stops on a failure rather than manufacturing a complete pass report.

All three pages were rendered at 320, 390, 768, 1024, 1440, and 1920 pixels without document-level horizontal overflow. Checks covered landmarks, duplicate identifiers, button names, JavaScript exceptions, finish and light controls, modal focus, saving, removal, empty recovery, unavailable and malformed storage handling, reduced motion, playback, pause, seek, volume, mute, queue changes, end-of-piece behavior, and audio startup failure.

The audio context advanced and an analyser observed a nonzero digital signal after an explicit play action. This verifies synthesis, not physical speaker output, device loudness, or the subjective quality of the compositions.

Selected text/background contrast calculations were also checked: Soma ink on lilac 11.74:1, muted text on lilac 5.26:1, and muted text on paper 6.01:1. Interval ink on paper 12.57:1, muted text on paper 5.48:1, and white on cobalt 6.98:1. These spot checks do not amount to a full accessibility audit.

## Environment boundaries and release work

The available Chromium environment blocks navigation, including localhost and file URLs, by administrator policy. The tested mode uses a fresh in-memory document for each page. This runs the actual inline HTML, CSS, and JavaScript, but does not provide a normal HTTP origin.

Real URL navigation, Back and Forward integration, deep links, and durable storage across reloads were therefore **not executed**. The test script includes HTTP-mode checks for these paths, to run in an unrestricted development browser. The storage-error path and a deliberately malformed in-memory fixture were exercised. They must not be confused with persistence verification.

Safari, Firefox, physical phones, screen readers, device audio, browser zoom beyond responsive width checks, and a complete accessibility audit were not tested. No user research or designer panel was conducted. Before adapting either study into a real product, run the HTTP checks, inspect on the target devices, listen at a comfortable device volume, and review the actual content and visual direction.

No deployment, backend, checkout, account system, or production service is included. No external assets, fonts, or recordings are required. Existing research remains unchanged and no aesthetic score is used to approve this work.
