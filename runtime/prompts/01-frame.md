# Phase 1: frame

Convert the brief, repository context, approved content, brand material, analytics, user evidence, and existing interface state into a computable intent contract.

Do not design yet.

Produce:

- the problem and desired user change
- primary and secondary audiences in context
- the primary task and observable completion signal
- brand values expressed as positive behaviour and explicit anti-expression
- success signals, quality weights, and non-negotiable floors
- hard and soft constraints
- fixed, open, and forbidden decisions
- required browser, viewport, route, theme, motion, locale, data, empty, loading, error, and success states
- risks, assumptions, conflicts, missing evidence, and open questions

Extract the brief's implicit design principles into explicit obligations. Each principle must have an id, statement, Class A/B/C, severity, quality dimension, required state references, and a verification method. Use optional bounded Playwright automation only for metrics that can be observed directly. Do not convert taste into fake binary rules.

Translate every critical user task into a browser-executable workflow. Use semantic locators by role, label, test id, or visible text. Define completion through observable assertions, not an evaluator's impression. CSS locators are a last resort.

Reject the frame when required fields are missing, weights do not sum to one, fixed and forbidden decisions conflict, a primary task has no audience, a hard constraint has no verification method, a critical principle has no required states, or an interactive product has no executable primary workflow.
