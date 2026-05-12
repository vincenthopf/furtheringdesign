# Gap Analysis — Cycle 1: Design Reasoning Framework

## Coverage Summary

Cycle 1 produced strong results across all 5 angles. The research confirms the core thesis: expert design reasoning operates through a small set of cognitive patterns (abductive reasoning, framing, co-evolution, satisficing, analogical transfer, reflection-in-action, critique-as-hypothesis-test) that are teachable as scaffolds rather than rules. Design pedagogy literature confirms these can be transferred through structured thinking prompts rather than rule lists. LLM research confirms that principle-based reasoning outperforms dense rule sets for creative tasks, with a recommended ceiling of 3-6 hard constraints and principle-level guidance beyond that.

## High-Priority Gaps (KNOWLEDGE)

### GAP-K1: How to encode reasoning patterns as actual LLM prompts/processes
**Priority:** HIGH
**What's missing:** Cycle 1 identified what the reasoning patterns ARE and that they can be scaffolded. But the research didn't produce concrete examples of how these scaffolds perform when given to an actual LLM for design tasks. The LLM scaffold examples in 01-expert-reasoning-patterns.md are theoretical suggestions, not empirically tested. We need deeper research on prompt engineering specifically for multi-criteria design reasoning — what prompt structures have been tested, what worked, what failed.
**Suggested query angle:** How have reasoning scaffolds, thinking protocols, and structured reasoning prompts been implemented for LLMs in design, code review, and other creative evaluation tasks? Concrete examples of prompt architectures that encode reasoning patterns. Evidence on Self-Refine and Constitutional AI-style critique applied to design or creative domains.

### GAP-K2: The spectrum from hard constraints to open reasoning
**Priority:** HIGH
**What's missing:** The research established that rules have a cost ("rules tax") and reasoning frameworks are better. But the CURRENT 39 rule files contain a mix of genuine hard constraints (accessibility, Tailwind syntax), soft heuristics (typography sizing), and aesthetic preferences (color defaults). The framework needs a clear taxonomy of WHEN to use rules vs reasoning patterns. Not everything should be a reasoning pattern — some things ARE rules (WCAG contrast ratios). The research didn't address this spectrum clearly enough.
**Suggested query angle:** How do high-performing AI coding/design systems distinguish between hard constraints (must follow), soft heuristics (follow unless there's a reason not to), and open reasoning patterns (think through using principles)? Evidence from code linters, design systems, accessibility checkers, and AI-assisted design tools on where rigid rules help vs where they constrain.

### GAP-K3: Nondeterministic judgment and designer disagreement
**Priority:** HIGH  
**What's missing:** The LLM research noted models tend to "collapse to a single best output" and suggested self-consistency sampling as a mitigation. But we need deeper research on: how to handle design decisions where reasonable experts disagree, how to express uncertainty/confidence in design reasoning, and how to present alternatives without the model appearing indecisive. This is the "taste" problem — how to reason about subjective quality.
**Suggested query angle:** How do AI systems handle subjective judgment, expert disagreement, and nondeterministic evaluation? Research on confidence calibration in creative domains, presenting design alternatives with rationale, and the difference between "this is wrong" (objective) vs "I would do it differently" (subjective).

## Medium-Priority Gaps (KNOWLEDGE)

### GAP-K4: Intent-anchored reasoning mechanisms
**Priority:** MEDIUM
**What's missing:** The research frequently references intent as the anchor for reasoning, but the actual mechanism of how reasoning patterns consume intent is underspecified. This partially depends on F1 (Intent Schema agent) but there's a design reasoning question here too: how does a reasoning scaffold reference intent at each step? How does intent guide which reasoning patterns to activate?
**Note:** This may resolve once the Intent Schema is designed. Defer to cycle 2 if still unclear.

### GAP-K5: How reasoning frameworks compose and sequence
**Priority:** MEDIUM  
**What's missing:** The 7 reasoning patterns identified don't come with a clear sequencing model. In practice, a designer doesn't run all 7 for every decision. Problem framing happens early, satisficing happens late, critique-as-hypothesis-test happens during iteration. The framework needs a temporal/phased model of when each pattern applies.
**Note:** This is partly addressed by the "reasoning chain structure" deliverable, but needs more research depth.

## Low-Priority / Deferred Gaps

### GAP-K6: Evaluation methodology
**Priority:** LOW (may be out of scope)
**What's missing:** How do we evaluate whether the reasoning framework produces better design output than the current 39-rule system? Need baseline comparison methodology.

### GAP-U1: What the Intent Schema interface looks like
**Type:** USER/DEPENDENCY
**Note:** Depends on F1 agent output. Log as open question.

## Decision Recommendation

**DRILL** on gaps K1, K2, K3. Run Cycle 2 with 3 pro-tier queries targeting:
1. Concrete prompt architectures for design reasoning (K1)
2. The hard constraint / soft heuristic / open reasoning spectrum (K2)
3. Handling nondeterministic judgment and expressing confidence (K3)
