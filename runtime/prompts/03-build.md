# Phase 3: build isolated candidates

Build each candidate in isolation from the same immutable baseline and the same approved content and data shape.

Before editing, declare:

- baseline ref
- content-addressed candidate artifact ref
- allowed paths
- protected paths
- supported states and workflows
- tokens and reusable primitives
- concrete candidate commitments
- rollback command or recovery path

Apply scoped diffs only. Never replace unrelated files. Never silently remove working content. Never use hidden placeholders for missing content. Mark missing approved material explicitly.

Implement the direction's commitments rather than merely preserving their prose. Add stable semantic roles, labels, names, and test ids where the workflow or evidence contract needs them. Do not add selectors solely to make a false assertion pass.

Render every required state and execute every required workflow. Preserve one result for every declared step and assertion; do not mark a workflow complete when a step is missing or skipped. Preserve semantic structure, keyboard operation, responsive re-composition, reduced-motion behaviour, browser compatibility, content provenance, and the candidate's visual identity. Record the final artifact reference after code changes. Any later code change invalidates evidence and pairwise judgments tied to the previous artifact.
