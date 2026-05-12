# Knowledge Bundle: Design Reasoning Framework

> **Topic:** How to encode expert design reasoning patterns — not rules — into a system that enables AI to think through design decisions the way expert designers do.
> **Cycles:** 2 (Cycle 1: 5 core-tier queries · Cycle 2: 3 pro-tier queries)
> **Total queries:** 8
> **Run date:** 2026-05-05
> **Estimated cost:** ~$0.425

---

## 1. Executive Summary

Expert designers don't follow more rules than novices — they reason differently. The research confirms seven distinct cognitive operations that distinguish expert design reasoning from rule-following: abductive reasoning, reflection-in-action, co-evolution, problem framing, analogical transfer, satisficing, and critique-as-hypothesis-test. Each is teachable as a scaffolded thinking process rather than a rule.

The most important finding for the framework design: **principle-based reasoning outperforms rule-based instruction for LLMs on creative tasks, but there is a tipping point.** Adding more than 3-6 hard constraints to a creative prompt degrades output quality through instruction interference and attention dilution. The optimal architecture uses minimal hard constraints, principle-level guidance for heuristics, and multi-step reasoning protocols for open judgment — organized into distinct phases rather than mixed into a single prompt.

The research establishes a three-tier constraint framework that maps directly to how design decisions should be encoded:
- **Class A (Hard Constraints):** Verifiable, non-negotiable rules (WCAG, security, platform mandates) → enforce via validators, not prompts
- **Class B (Soft Heuristics):** Best practices with documented rationale (typography scales, spacing ratios) → present as weighted suggestions with reasoning
- **Class C (Open Reasoning):** Aesthetic and strategic judgment (layout, hierarchy, emotional register) → guide via reasoning patterns and multi-step critique

Design pedagogy research confirms that expert judgment is transmitted through scaffolded thinking protocols, not rules: studio critique structure, precedent analysis, reflective practice, and cognitive apprenticeship. These are directly translatable to LLM reasoning prompts.

For handling subjectivity, the research provides concrete strategies: separate objective failures from subjective preferences using a two-channel schema, calibrate confidence against empirical inter-rater reliability data (UICrit shows κ≈0.3 "fair" agreement on critique validity), present alternatives with tradeoff analysis via Pareto frontiers, and use ensemble disagreement as a signal for "reasonable experts would disagree here."

---

## 2. Territory Map

### 2.1 Expert Reasoning Patterns (The Cognitive Operations)

Seven reasoning patterns distinguish expert design thinking from rule-following:

| Pattern | Cognitive Operation | How It Differs From Rules | LLM Scaffold |
|---------|-------------------|--------------------------|---------------|
| **Abductive Reasoning** | Inferring "what would have to be true for this to work" — proposing novel form + working principle to achieve a desired outcome | Rules are deductive. Abduction creates the rule and case simultaneously. | "Given outcome X, what configuration could create it? Propose three what-if hypotheses." |
| **Reflection-in-Action** | A conversation with the situation — make a move, observe the back-talk, reframe the problem in real-time | Rules assume categories exist. Reflection-in-action responds to unique situations. | "Review the current state. Identify one unexpected consequence. How does this change the original goal?" |
| **Co-evolution** | Problem and solution evolve simultaneously — solution ideas reveal new constraints about the problem | Rules assume fixed problems. Co-evolution treats the brief as fluid. | "Based on this solution, what new constraints have you discovered? Update the problem statement." |
| **Problem Framing** | Naming and framing — selecting which aspects of a situation to attend to, setting inquiry boundaries | Rules are applied within frames. Framing creates the frame. | "Propose three different ways to frame this problem before solving it." |
| **Analogical Transfer** | Mapping deep structural/functional relationships from other domains | Rules are domain-specific. Analogies transfer structure across domains. | "Identify a system in a different domain with the same functional goal. Map its structure here." |
| **Satisficing** | Finding solutions that meet threshold acceptability across multiple competing dimensions | Rules optimize one dimension. Satisficing balances competing priorities. | "List five competing priorities. Define minimum thresholds for each. Find a solution meeting all." |
| **Critique-as-Hypothesis** | Treating each iteration as an experiment testing a specific assumption | Rules say right/wrong. Hypothesis testing asks what we learned. | "What assumption does this design test? How would failure change the design?" |

### 2.2 The Three-Tier Constraint Framework

Not everything is a reasoning pattern. The research establishes a clear taxonomy:

**Class A — Hard Constraints (enforce, don't reason)**
- WCAG contrast ratios, tap target minimums, security requirements, platform mandates
- Handled by deterministic validators (axe-core, Lighthouse), not prompts
- AI generates → validator checks → violations blocked or auto-repaired
- Override requires documented rationale + mitigation + approver

**Class B — Soft Heuristics (suggest with reasoning)**
- Typography scales, spacing ratios, color contrast above WCAG minimums
- Presented as weighted suggestions with explanations and quick-fix diffs
- Team-configurable thresholds (via policy files)
- AI scores alternatives against these but doesn't block deviations

**Class C — Open Reasoning (think through using patterns)**
- Layout composition, visual hierarchy, brand expression, emotional register
- Guided by multi-step reasoning: plan → propose alternatives → critique → select
- Human-in-the-loop for final decision
- AI provides tradeoff analysis and rationale, not single recommendations

### 2.3 Prompt Architecture Patterns

Six reusable prompt architecture patterns emerged from the research:

1. **Heuristic-Anchored Two-Pass (Detect → Advice):** Separate violation detection from constructive feedback. Pass 1: evaluator finds violations against heuristics. Pass 2: design coach converts violations to actionable feedback using Sadler-style (standard, gap, fix).

2. **Rubric-Guided Judge with Per-Aspect CoT (G-Eval):** Multi-criteria evaluation with Chain-of-Thought per criterion, structured form output. Prevents dimension collapse by forcing separate reasoning per aspect.

3. **Multi-Agent Critic Ensemble:** Parallel specialized critics (UsabilityCritic, AestheticsCritic, AccessibilityCritic) with an Arbiter that consolidates, deduplicates, and resolves conflicts.

4. **Constitutional Critique-and-Revise:** Evaluate draft against principles (not rules), propose revision, note tradeoffs with other principles. Principles as comparative instructions: "Choose the approach that best serves..."

5. **Self-Refine Loop with Stop Conditions:** Generate → Critique → Refine iteratively. Stop when fewer than 2 new issues found or max iterations reached. Feed user dismissals back as negative examples.

6. **Checklist with Counterexamples:** Per-guideline mini-checklist with both positive examples ("do flag when...") and negative examples ("don't flag when...") with concrete counterexamples to reduce false positives.

### 2.4 Design Pedagogy — How Judgment Gets Transferred

Design education research confirms judgment is transmitted through scaffolds, not rules:

- **Studio Habits of Mind** (Harvard Project Zero): envision, stretch/explore, reflect, observe, engage/persist — dispositions, not rules
- **Cognitive Apprenticeship:** Instructor models expert reasoning aloud during desk crits → novice observes → novice attempts with support → support fades
- **Critique as Shared Inquiry:** Socratic questioning forces students to articulate intent and tradeoffs — the language of judgment develops through practice
- **Perceptual Foundations (Bauhaus Vorkurs):** Visual sensitivity before technical skill — rhythm, contrast, materiality as felt qualities before named principles
- **Analytical Precedent Study:** Decompose constraints and decisions behind examples, not surface features — transfer principles, not forms

### 2.5 Tradeoff Resolution

Experts resolve tradeoffs through recurring strategies:

- **Usability vs Aesthetics:** The aesthetic-usability effect means attractive interfaces increase tolerance for minor usability issues. But critical task failures always override aesthetics. Test with mixed measures: task performance + subjective ratings.
- **Information Density vs White Space:** Match density to user task. Scanning → whitespace and scannability. Data analysis → higher density managed via progressive disclosure and "overview → zoom → details-on-demand."
- **Brand vs Convention:** Convention for core, frequent, and safety-critical tasks. Brand expression for secondary layers (visual language, onboarding, empty states). If brand color fails accessibility, use accessible variants for functional UI, retain brand for decorative surfaces.
- **Accessibility vs Visual Design:** Treat as system-level constraint, not binary choice. Use compensatory solutions (non-color cues, high-contrast variants). Priority determined by user task impact.
- **Conversion vs Trust:** Short-term KPIs vs long-term relationships. Measure both immediate conversion and downstream signals (refunds, churn). Dark patterns are governed by ethical constraints and "trust budgets."

### 2.6 Handling Nondeterministic Judgment

The research provides concrete strategies for when the answer is genuinely subjective:

- **Two-Channel Critique Schema:** Separate objective violations (binary test against measurable standard → "error") from subjective recommendations (multiple valid alternatives exist → "hypothesis/suggestion")
- **Confidence Calibration:** Model score distributions, not single points. Calibrate against UICrit κ≈0.3 baseline. High agreement areas (accessibility, alignment) get prescriptive tone. Low agreement areas (typography, color warmth) get exploratory tone.
- **Ensemble Disagreement as Signal:** Multiple evaluation passes; low consensus triggers "experts may disagree" mode and surfaces multiple valid options
- **Pareto-Front Alternatives:** Present 3-5 options positioned along competing objectives. Each with principles it optimizes, expected metric impact, and known downsides.
- **Assertiveness Modes:** Prescriptive for high-confidence objective checks. Exploratory for low-confidence subjective suggestions. Human-in-the-loop for high-stakes uncertain decisions.

---

## 3. Load-Bearing Claims

- **Claim:** Principle-based reasoning (Constitutional AI style) outperforms exhaustive rule lists for LLM creative tasks. Short, broad, comparative principles work better than long, specific rules; specificity "damaged or reduced generalization and effectiveness."
- **Excerpt:** "Something broad that captures many aspects we care about...worked remarkably well. Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness."
- **Source URL:** https://www.anthropic.com/news/claudes-constitution
- **Confidence:** high
- **Full basis ref:** cycle-2/01-prompt-architectures-for-reasoning.md#constitutional_ai_critique_prompts
- **Cycle:** 2

---

- **Claim:** Removing explicit heuristics and rubrics from design critique prompts dramatically reduces output quality and diversity; LLMs collapse to a single issue type (e.g., alignment) with vague feedback.
- **Excerpt:** "The 'General UI Feedback' prompt yielded the worst performance, with the LLM often collapsing its focus to a single issue type (like misalignment) and producing vague feedback."
- **Source URL:** http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf
- **Confidence:** high
- **Full basis ref:** cycle-2/01-prompt-architectures-for-reasoning.md#compliant_vs_reasoned_output_analysis
- **Cycle:** 2

---

- **Claim:** Expert designers agree at only "fair" levels (κ≈0.3) on critique validity and "moderate" levels (κ≈0.55) on preference rankings — nondeterminism in design judgment is empirically real, not just theoretical.
- **Excerpt:** "Fleiss Kappa inter-rater reliability score...0.29, which implies fair agreement...ranking data had an agreement score of 0.55, which indicates moderate agreement."
- **Source URL:** https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf
- **Confidence:** high
- **Full basis ref:** cycle-2/03-nondeterministic-judgment.md#uicrit_dataset_findings
- **Cycle:** 2

---

- **Claim:** Mixing hard rules and open-ended creative instructions in the same undifferentiated prompt degrades constraint compliance — the model treats rules as tradeoffs rather than non-negotiable absolutes.
- **Excerpt:** "When hard rules are presented alongside creative instructions in a single, free-form prompt, the LLM may treat the rules as suggestions or part of a complex set of tradeoffs, rather than non-negotiable absolutes."
- **Source URL:** (synthesized from multiple sources including OpenAI structured outputs, Microsoft Guidance, and CAI documentation)
- **Confidence:** high
- **Full basis ref:** cycle-2/02-constraint-spectrum.md#llm_prompting_strategies
- **Cycle:** 2

---

- **Claim:** Recommended ceiling for hard constraints in creative LLM prompts is 3-6. Beyond that, instruction interference and attention dilution degrade output quality.
- **Excerpt:** "For optimal instruction design in creative tasks, it is recommended to use minimal hard constraints (3–6), prioritize principle-level guidance, and utilize iterative refinement passes rather than long initial checklists."
- **Source URL:** (synthesized from Tree-of-Thoughts, Self-Refine, prompt anchoring research)
- **Confidence:** medium
- **Full basis ref:** cycle-1/04-llm-reasoning-vs-rules.md
- **Cycle:** 1

---

- **Claim:** The optimal prompt structure separates generation (Class C), heuristic scoring (Class B), and hard validation (Class A) into distinct phases rather than combining them.
- **Excerpt:** "A multi-phase interaction model is recommended to ensure both compliance and creativity: Phase 1: Creative Generation...Phase 2: Heuristic Scoring and Refinement...Phase 3: Hard Constraint Validation."
- **Source URL:** (synthesized from ESLint/Prettier patterns, CI/CD pipeline analogies, CAI)
- **Confidence:** high
- **Full basis ref:** cycle-2/02-constraint-spectrum.md#llm_prompting_strategies
- **Cycle:** 2

---

- **Claim:** Design expertise is characterized by a qualitative cognitive shift, not accumulated knowledge. Experts frame problems; novices solve them. The framing is where quality lives.
- **Excerpt:** "Expertise in design is characterized by a qualitative shift in cognitive strategies rather than just an accumulation of facts."
- **Source URL:** https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner...
- **Confidence:** high
- **Full basis ref:** (inherited from ai-design-thinking bundle, cycle-1/02-expert-novice-design.md)
- **Cycle:** 1 (prior bundle)

---

- **Claim:** ADRs succeeded where IBIS/QOC failed because of low friction — simple Markdown files versioned alongside the work, capturing one decision at a time instead of building complex argumentation graphs.
- **Excerpt:** "ADRs are typically stored as simple Markdown files within a project's version control system. A standard ADR schema captures the title, status, context, decision, and consequences."
- **Source URL:** https://adr.github.io/
- **Confidence:** high
- **Full basis ref:** cycle-1/05-lightweight-rationale-systems.md
- **Cycle:** 1

---

- **Claim:** Checklists help with "stupid errors" (ensuring basic critical steps aren't missed) but hurt when they replace the thinking protocol required for novel problem-solving.
- **Excerpt:** "Checklists are most effective when they address 'stupid' errors—ensuring basic, critical steps are not missed—rather than trying to dictate complex clinical judgment."
- **Source URL:** https://www.nejm.org/doi/full/10.1056/NEJMsa0810119
- **Confidence:** high
- **Full basis ref:** cycle-1/05-lightweight-rationale-systems.md
- **Cycle:** 1

---

- **Claim:** Self-Refine (generate→critique→refine) is effective for early-pass design issues but shows diminishing returns on high-quality designs without richer multimodal context.
- **Excerpt:** "This approach is effective for identifying subtle issues in early or low-quality designs. However, its value diminishes as designs improve."
- **Source URL:** https://arxiv.org/pdf/2303.17651
- **Confidence:** high
- **Full basis ref:** cycle-2/01-prompt-architectures-for-reasoning.md#self_refine_for_design_and_visual_tasks
- **Cycle:** 2

---

## 4. Contested or Uncertain Areas

### 4.1 Whether the 3-6 hard constraint ceiling is universal or model-dependent

The research recommends 3-6 hard constraints as a ceiling before quality degrades, but this is synthesized from multiple studies rather than a single controlled experiment on design prompts specifically. The actual tipping point likely varies by model, prompt structure, and task complexity. More capable models may tolerate more constraints.

### 4.2 Whether Self-Refine loops genuinely improve design or just smooth it

Self-Refine shows clear improvement on early-pass issues but diminishing returns on polished designs. There's a risk that iterative self-critique converges to a "safe middle" rather than a genuinely good design — averaging out bold choices in favor of convention. This matches a known problem in RLHF-trained models.

### 4.3 Whether reasoning scaffolds truly teach reasoning or just structured compliance

The pedagogy research shows studio thinking scaffolds work for humans because humans internalize dispositions over time. LLMs don't internalize — they execute prompts. A reasoning scaffold might produce the *appearance* of reasoning (structured output with rationale) without the *substance* (genuine understanding of why a design works). The distinction between compliant output and reasoned output is partially bridgeable via CoT + rubrics, but the gap is real.

### 4.4 Whether the three-tier framework needs a fourth tier

The Class A/B/C distinction is clean but may need a "Class A-" for semi-hard constraints — things that are almost always rules but have legitimate exceptions beyond the pre-documented ones. WCAG has explicit exceptions (logos), but what about cases where a heuristic is so strong it's almost a rule (e.g., "don't use font sizes below 12px") but has legitimate edge cases (footnotes, legal text)?

---

## 5. Frontier and Open Questions

**FQ1 — How does the reasoning framework consume the Intent Schema?**
The framework needs intent to anchor reasoning patterns, but the Intent Schema (F1) doesn't exist yet. The framework must define *what questions it needs answered about intent* without locking into a specific schema format. Key questions the framework needs answered: What is this design trying to achieve? For whom? In what context? What are the competing priorities? What's the success metric?

**FQ2 — How to sequence reasoning patterns in practice**
The seven patterns don't all apply to every design decision. Problem framing comes early, satisficing comes late, critique-as-hypothesis happens during iteration. A temporal model of when to activate which pattern is needed for practical implementation. The orchestration agent (L7) may own this sequencing.

**FQ3 — The multimodal gap**
All current prompt architectures for design critique work on text/JSON representations of UI, not visual screenshots. The research confirms Self-Refine and rubric-based evaluation degrade on polished designs without visual context. A reasoning framework that can't "see" the design has a hard ceiling on quality.

**FQ4 — Evaluation methodology**
How do we measure whether the reasoning framework produces better design than the current 39-rule approach? Options: blind comparison by expert designers, A/B testing on user outcomes, metric improvement on UICrit-style ratings. This needs to be defined before the framework can be validated.

**FQ5 — The calibration corpus**
Confidence calibration requires historical inter-rater data. UICrit provides κ≈0.3 for critique validity. But this is for mobile UI only, with 7 annotators. Calibrating for web design, dashboards, landing pages etc. would require equivalent data that doesn't exist.

---

## 6. User Questions (Deferred)

**U1 — How does this relate to the existing 39 rule files?**
The framework replaces the *approach* (rule-following) but doesn't necessarily discard all content. The 39 files contain a mix of Class A (Tailwind syntax rules), Class B (typography heuristics), and Class C (color preferences). The files need to be triaged into the three-tier framework. Some rules become validators, some become heuristic suggestions, some become reasoning pattern inputs.

**U2 — Should the reasoning framework be a separate system prompt or embedded in the skill?**
The phased architecture (Generate → Score → Validate) suggests the framework might be better implemented as a workflow the orchestration agent enforces, rather than a single prompt document. This depends on the orchestration architecture (L7).

**U3 — What's the minimum viable version?**
The full framework has seven reasoning patterns, a three-tier constraint system, six prompt architecture patterns, and nondeterministic judgment handling. A minimum viable version could start with: (a) three-tier classification of existing rules, (b) problem framing + satisficing as the two most impactful reasoning patterns, (c) the two-pass Detect→Advice prompt architecture, (d) separation of validation from generation.

---

## 7. Run Metadata

**Cycles run:** 2
**Queries by tier:**
- Cycle 1: 5 × core (~$0.025 each) = ~$0.125
- Cycle 2: 3 × pro (~$0.10 each) = ~$0.300
- **Total: ~$0.425**

**Top 3 learnings:**

1. **The constraint spectrum is the architectural key.** The single most important finding is that design decisions fall into three categories (hard constraints, soft heuristics, open reasoning) and mixing them in a single prompt degrades output. The system architecture must separate validation from suggestion from reasoning.

2. **Principle-based reasoning beats rule-based instruction, with evidence.** Anthropic's own experience shows broad comparative principles outperform specific rules. The research on prompt structure confirms: structured CoT + rubrics produce reasoned output; generic prompts or overloaded rule lists produce compliance or degraded output.

3. **Nondeterminism is quantifiable and manageable.** Expert designers agree at κ≈0.3 on critique validity. This isn't a bug — it's the nature of design. The system can use this empirically: calibrate confidence, use ensemble disagreement as a signal, separate prescriptive from exploratory modes, and present alternatives with tradeoff analysis instead of false single answers.

**Suggested next actions:**

1. **Triage existing 39 rule files** into Class A (validators), Class B (heuristic suggestions with reasoning), and Class C (reasoning pattern inputs). This is the immediate bridge from the current system to the new framework.

2. **Implement the phased architecture** (Generate → Heuristic Score → Hard Validate) as the primary workflow, replacing the current "load rules and build" approach.

3. **Start with two reasoning patterns:** Problem Framing and Satisficing. These are the highest-leverage patterns (experts invest in framing; novices jump to solutions) and the most directly implementable as LLM scaffolds.

4. **Wait for Intent Schema (F1)** before implementing the full intent-anchored reasoning chain. The framework can define what it needs from intent without blocking on the schema format.
