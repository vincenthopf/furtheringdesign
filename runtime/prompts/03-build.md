# Phase 3: build isolated candidates

Build each candidate in isolation from the same immutable baseline and the same approved content and data shape.

Before editing, declare:

- baseline ref
- allowed paths
- protected paths
- supported states
- tokens and reusable primitives
- rollback command or recovery path

Apply scoped diffs only. Never replace unrelated files. Never silently remove working content. Never use hidden placeholders for missing content. Mark missing approved material explicitly.

Render every required state. Preserve semantic structure, keyboard operation, responsive re-composition, reduced-motion behaviour, and browser compatibility. Record design decisions that future agents must preserve or consciously revise.
