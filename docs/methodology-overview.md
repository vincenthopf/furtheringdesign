# AI Design Thinking System — Methodology Overview

## Goal

Teach AI to *reason* about design, not copy patterns. Replace the existing rule-based UI skill (39 rule files, mediocre output) with a multi-agent reasoning system where every design decision is intent-anchored, reasoning-grounded, mismatch-checked, and structurally-actionable.

---

## Core Insight

Expert design judgment decomposes into:
- **Formalizable parts** — pattern-based expertise, explicit heuristics, rationale fragments, structured critique
- **Resistant parts** — reflection-in-action, aesthetic judgment in shifting contexts, socialized tacit knowledge

The formalizable parts can be encoded through structured reasoning frameworks, not more rules. The expert's pre-verbal "mismatch signal" (something is wrong before I can say what) is cognitively traceable to predictive processing, chunking, perceptual fluency, and somatic markers — each with computational analogs.

**Rules are the problem, not the solution.** Anthropic's own research shows specific rules damage LLM generalization; broad principles outperform prohibitive rules; 3–6 hard constraints is the upper limit before instruction interference degrades output. The current 39 rule files actively make design worse.

---

## Architecture: Multi-Agent System, Not a Skill

A single agent cannot hold all of this context. The system is composed of 7 specialized agents:

### Foundations (sequential)

1. **Intent Schema (F1)** — The backbone. A structured format capturing what a design is trying to achieve, for whom, under what constraints. Without intent, nothing else has an anchor.
   - Six-dimension universal core: Problem/outcome, Audience/context, Deliverable/scope, Constraints, Success criteria, Degrees of freedom
   - Brand as values alignment (positive vector), not just constraints
   - Five-level cascade: Product → Page → Section → Component → Instance
   - Three-tier conflict resolution

2. **Design Reasoning Framework (F2)** — Reasoning patterns, not rules. The three-tier constraint framework:
   - **Class A** — Hard constraints (accessibility, legal). Binary validators.
   - **Class B** — Soft heuristics (spacing, contrast, density). Measurable scorers.
   - **Class C** — Open reasoning patterns (framing, satisficing, tradeoff resolution). Probabilistic, intent-anchored.
   - Phased architecture: Generate (Class C) → Score (Class B) → Validate (Class A). Never mix.

3. **Mismatch Detection (F3)** — Four-layer wrongness detection approximating expert cognition:
   - Layer 1: Prediction error (axe-core, VIPS, saliency models)
   - Layer 2: Chunking mismatch (Layout-Parser, perceptual grouping)
   - Layer 3: Processing fluency drop (edge density, feature congestion)
   - Layer 4: Affective/aesthetic (NIMA, UIClip, VLM scoring)
   - Four-tier confidence framework: Objective Violations (0.85-0.99) → Strong Conventions (0.70-0.90) → Weak Conventions (0.55-0.75) → Subjective Preferences (0.40-0.60)
   - Cascading architecture: cheap deterministic checks first, expensive probabilistic checks only if needed
   - Multi-signal fusion adapted from medical diagnosis and cybersecurity (Dempster-Shafer, cascading architectures)

### Capability Layers (parallelizable)

4. **Flow-Level Understanding** — Multi-screen reasoning, state awareness, transition coherence, progressive disclosure, error recovery. Current datasets are all single-screen; this layer fills that gap.

5. **Training Data Pipeline** — Extract design reasoning from YouTube design process videos (DesignCourse, The Futur, Relume Design League) via ASR + frame alignment. Synthetic rationale generation. Before/after counterfactual pair extraction.

6. **Structural Grounding** — Ground critique to DOM/Figma node tree/component hierarchy rather than pixel bounding boxes (which VLMs fail at — IoU 0.222 even with visual aids). Programmatic verifiers (axe-core, WCAG) as ground truth.

7. **Orchestration** — Multi-agent coordination. Workflow: intent established → reasoning produces candidates → mismatch detection evaluates → structural grounding makes feedback actionable → iteration loops. Human-in-the-loop at intent validation, aesthetic disagreement, and final approval.

---

## Key Principles

1. **Reasoning patterns, not rules.** More rules degrade output; broad principles enable generalization.
2. **Intent is the anchor.** Every decision, critique, and detection resolves back to intent.
3. **Nondeterminism is real.** Expert designers agree at κ≈0.3. Confidence tiering, not fake certainty.
4. **Specialized agents with focused context.** No single agent holds everything.
5. **Structural grounding over pixel grounding.** Reference elements semantically.
6. **Phased, not mixed.** Hard constraints don't poison creative generation when separated by phase.

---

## What Makes This Different

- **Cognitive grounding** — built on actual cognitive science of expert design judgment (chunking, mismatch negativity, predictive processing, perceptual fluency), not just heuristics
- **Three-tier constraint model** — different mechanisms for different types of design decisions, not one approach for all
- **Honest about uncertainty** — confidence tiers, designer disagreement as signal, no hallucinated certainty
- **System, not skill** — multi-agent orchestration with specialized context per agent
- **Intent-first** — every reasoning step resolves back to a structured intent schema
- **Empirically validated components** — Constitutional AI, Process Reward Models, DPO, multimodal grounding all individually validated in other domains; this system composes them for design

---

## Status

Foundations 1–3 have completed recursive research and produced knowledge bundles. Awaiting confirmation to proceed to actual framework/schema design. Layers 4–7 are scoped and ready to dispatch.

Total foundational research investment to date: ~$2.00 across 25+ deep research queries, 3 knowledge bundles, plus the master ai-design-thinking bundle.
