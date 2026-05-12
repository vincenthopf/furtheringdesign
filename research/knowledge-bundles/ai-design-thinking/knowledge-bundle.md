# Knowledge Bundle: Teaching AI the Design Thinking Process

> **Topic:** Can AI be taught to reason about design, not just copy it? What is design thinking as a cognitive process, and what would it take to encode that into an AI system?
> **Cycles:** 2 (Cycle 1: 6 core-tier queries · Cycle 2: 3 pro-tier queries)
> **Total queries:** 9 + 1 parallel (design YouTubers)
> **Run date:** 2026-05-03
> **Estimated cost:** ~$0.45 (core) + ~$0.30 (pro) = ~$0.75

---

## 1. Executive Summary

The gap between AI that *copies* design and AI that *thinks* about design is real, measurable, and partially closable — but not fully. Design thinking is a cognitive process built from several layers: rapid pattern-recognition (chunking), abductive problem-framing, pre-verbal "mismatch" signals, and reflective iteration. Expert designers do not apply rules — they hold a model of the user, the hierarchy, and the intent simultaneously, then resolve tensions between them. The current UI skill encodes only the surface layer (rules, ratios, patterns) and skips the reasoning layer entirely.

The research reveals that the cognitive process is composed of both **formalizable** and **resistant** components. The formalizable parts — pattern-based expertise, explicit heuristics, rationale fragments, structured critique — can be encoded and are increasingly being encoded through datasets (UICrit, RICO), model architectures (Constitutional AI, Process Reward Models), and multimodal grounding techniques. The resistant parts — real-time reflection-in-action, aesthetic judgment in shifting social contexts, socialized tacit knowledge — are genuinely hard limits that even human design education struggles to transmit through explicit instruction.

The most important finding: **the mismatch signal** — the expert's pre-verbal sense that something is wrong — is not magic. It is cognitively traceable to predictive processing (prediction error), pattern recognition (chunking theory, RPD model), perceptual fluency violation, and affective somatic markers. Each of these has computational analogs. A hybrid architecture combining a Design Constitution, Process Reward Models trained on critique steps, preference optimization from expert rankings, and multimodal visual grounding is theoretically sound and has validated components — it just hasn't been built end-to-end for design yet. That gap is the opportunity.

The data problem is the real bottleneck. UICrit (3,059 critiques, 983 mobile UIs, bounding boxes, 7 professional designers) is the best existing dataset but is too small and too narrow (static single screens, mobile only). YouTube design process videos and design critique podcasts are feasible weak supervision sources via ASR transcript alignment. A/B test data would be the highest-signal source but is entirely proprietary. The near-term path is clear: extend UICrit, build a structured critique corpus from live design process sources, and combine with a Design Constitution for principled self-critique.

---

## 2. Territory Map

### 2.1 What Design Thinking Actually Is (Cognitive Layer)

Design thinking is not a process framework — it is a set of cognitive operations:

- **Co-evolution**: The problem and solution evolve simultaneously. Designers don't solve fixed problems; they reframe them while building answers. Novices treat the brief as fixed. Experts treat it as negotiable.
- **Abductive reasoning**: Not deductive (rules → outputs) or inductive (observations → rules), but abductive — inference to the best explanation of a situation. "What would have to be true for this to work?"
- **Sketching as cognitive loop**: External representations (sketches, wireframes) are not records of thought — they are *inputs* to thought. They surface emergent properties the designer didn't consciously plan. This is the "dialectics of sketching."
- **Chunking and pattern memory**: Expert designers don't see buttons and spacing — they see "navigation pattern," "product card," "checkout flow." Violations of these chunks produce the mismatch signal.
- **The mismatch signal**: Pre-verbal detection of wrongness. Cognitively: prediction error from violated chunk patterns (MMN, ERN neural correlates), perceptual fluency drop, somatic marker activation. This fires *before* the designer can articulate what's wrong.
- **Satisficing**: Designers don't optimize for one dimension — they seek acceptable balances across competing priorities. This is fundamentally different from rule-following, which has no mechanism for resolving tradeoffs.

### 2.2 Expert vs. Novice (What Expertise Consists Of)

Five pillars distinguish expert design judgment:

1. **Problem framing** — experts invest heavily in reframing before solving; novices jump to solutions
2. **Abstracted precedent** — experts use deep functional analogy; novices copy surface similarity (design fixation)
3. **Visual chunking** — experts perceive layouts in large meaningful units; novices see individual elements
4. **Disciplined iteration** — experts use sketches as hypothesis tests; novices use trial-and-error
5. **Hybrid skills** — transferable cognitive routines (framing, analogical mapping) + domain-specific knowledge (codes, affordances, material constraints)

### 2.3 AI Design Attempts (What's Been Tried)

Three tracks since 2018:
- **Pattern generation** (Midjourney, Figma AI, Adobe Firefly) — excellent at visual patterns, zero reasoning about why
- **Sketch-to-code** (pix2code, Sketch2Code, Uizard) — structural understanding, no design judgment
- **Critique automation** (UICrit, UICrit + Gemini, UIClip) — closest to reasoning, but still lags human critique quality (humans preferred 81% of the time)

What's never been done: an end-to-end system that trains on *design reasoning steps*, not design outputs.

### 2.4 Data Sources for Design Reasoning

Ranked by signal quality (reasoning depth):
1. **UICrit** — gold standard, but small and narrow (mobile only, static screens)
2. **Expert critique corpora** — heuristic-linked, high quality but scarce
3. **A/B test outcome logs** — highest possible signal (real behavioral outcomes), entirely proprietary
4. **Aesthetic rating datasets** (AVA, Place Pulse) — good for preference, no verbal rationale
5. **Designer portfolio case studies** (Behance, Dribbble) — medium signal, needs cleaning
6. **YouTube process videos / podcasts** — weak supervision, scalable via ASR alignment
7. **Synthetic rationales** (LLM-generated) — high feasibility, hallucination risk

### 2.5 Design Critique as Structured Signal

Critique has a formalizable structure:
- **Argumentation primitives**: Issue → Claim → Evidence → Warrant → Solution
- **Evaluation dimensions**: hierarchy, contrast, rhythm, balance, affordance, intent alignment, white space, accessibility
- **Grounding**: Each critique point links to a specific UI element (bounding box or Figma layer ID)
- **Contrastive learning**: Before/after comparisons encode causal design reasoning

Historical systems (IBIS, QOC, DRed) attempted to formalize this in the 80s-2000s. They produced rich schemas but failed at adoption due to cognitive overhead. ADRs (Architecture Decision Records) are their pragmatic successor in software. The lesson: structure must emerge from natural workflow, not be imposed.

### 2.6 Formalizable vs. Resistant

| Formalizable | Resistant |
|---|---|
| Pattern-based expertise | Real-time reflection-in-action |
| Explicit heuristics (WCAG, Nielsen's 10) | Aesthetic judgment in shifting social contexts |
| Rationale fragments (IBIS/QOC schemas) | Socialized tacit knowledge |
| Design critique steps (issue → principle → evidence → fix) | Somatic/embodied know-how |
| Preference rankings from experts | "Designerly ways of knowing" |

### 2.7 The Architecture That Could Work

A hybrid system not yet built end-to-end, with all components individually validated in other domains:

1. **Design Constitution** — codified principles (Gestalt, WCAG, usability heuristics, brand voice) used for Constitutional AI-style self-critique
2. **Process Reward Model (PRM)** — trained on labeled critique steps: identify element → cite principle → measure evidence → propose fix → predict user impact
3. **Preference optimization** (DPO/RLHF) — expert designer rankings of critique quality
4. **Rationale-first SFT + Self-Refine** — chain-of-thought reasoning before verdict, iterative self-critique
5. **Multimodal visual grounding** — linking each critique step to a bounding box or Figma layer ID
6. **Inference orchestration** — retrieval-augmented critique (similar cases), multi-agent debate, PRM-based reranking

### 2.8 YouTubers as Process Signal (Parallel Research)

Key live design process sources identified as potential training signal:

| Creator | Format | Signal Type |
|---|---|---|
| DesignCourse (Gary Simon) | Live UI/UX critique & refactor sessions | Layout fixes, typography, spacing, hierarchy narrated in real-time |
| The Futur (Chris Do) | Logo Design Therapy live critique | Principle articulation, brief reading, strategic framing |
| Will Paterson | Good & Grow critique series, Live Logo Reviews | Brand clarity, legibility, vector tradeoffs |
| Relume Design League | Competitive live design (Figma, timed) | Rapid ideation, hierarchy under constraint |
| Flux Academy (Ran Segall) | Live challenges, Q&A | Client context, wireframe-to-hifi transitions |
| CharliMarieTV | Project walkthroughs, watch-alongs | Process narration, career reasoning |
| Pierluigi Giglio | Live Framer case studies | Interaction rationale, component structure |
| Sketch Together | Daily UI/illustration livestreams | Visual iteration, craft decisions |

---

## 3. Load-Bearing Claims

- **Claim:** Expert designers experience a pre-verbal "mismatch signal" before articulating what's wrong — this is cognitively traceable to Mismatch Negativity (MMN) and Error-Related Negativity (ERN) neural responses.
- **Excerpt:** "Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input."
- **Source URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/
- **Confidence:** high
- **Full basis ref:** cycle-2/01-mismatch-signal-and-reasoning-architectures.md#neuroscientific_correlates_of_mismatch
- **Cycle:** 2

---

- **Claim:** The mismatch signal is cognitively explained by chunking theory and the Recognition-Primed Decision model — experts perceive large meaningful patterns; the signal fires when a stimulus fails to match a recognized prototype.
- **Excerpt:** "An expert designer doesn't see a UI as a collection of buttons, text, and lines. They see it as chunks like 'header navigation,' 'product card,' or 'checkout form.' Their expertise allows for rapid perception and comprehension of complex layouts. The 'mismatch signal' arises when an element is inconsistent with the established structure of a chunk."
- **Source URL:** https://www.researchgate.net/publication/250744191_Chunking_Models_of_Expertise_Implications_for_Education
- **Confidence:** high
- **Full basis ref:** cycle-2/01-mismatch-signal-and-reasoning-architectures.md#pattern_recognition_theories
- **Cycle:** 2

---

- **Claim:** Perceptual fluency directly links to aesthetic judgment — designs that reduce processing fluency are experienced as negative affect before conscious analysis.
- **Excerpt:** "We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive..."
- **Source URL:** https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf
- **Confidence:** high
- **Full basis ref:** cycle-2/01-mismatch-signal-and-reasoning-architectures.md#affective_and_perceptual_theories
- **Cycle:** 2

---

- **Claim:** Process supervision — training on reasoning *steps* rather than final answers — has been validated in math reasoning and is directly transferable to design critique.
- **Excerpt:** "We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical reasoning."
- **Source URL:** https://arxiv.org/pdf/2305.20050
- **Confidence:** high
- **Full basis ref:** cycle-2/01-mismatch-signal-and-reasoning-architectures.md#training_approaches_for_llm_reasoning
- **Cycle:** 2

---

- **Claim:** UICrit is the best existing dataset for AI design reasoning training — 3,059 critiques from 7 professional designers, with bounding boxes grounding each critique to a specific UI region.
- **Excerpt:** "columns in the CSV file: 'rico_id', 'task', 'aesthetics_rating', 'learnability', 'efficiency', 'usability_rating', 'design_quality_rating', 'comments_source', 'comments' [with bounding box coordinates]"
- **Source URL:** https://github.com/google-research-datasets/uicrit
- **Confidence:** high
- **Full basis ref:** cycle-2/02-uicrit-and-design-rationale-systems.md#uicrit_schema_details
- **Cycle:** 2

---

- **Claim:** UICrit has critical gaps: 7 annotators only, static single-screen mobile UIs, underrepresents dynamic heuristics (error prevention, system status visibility had only 2 critiques in the entire dataset).
- **Excerpt:** "The dataset is composed of static, single-screen UIs, meaning it fails to capture critiques related to dynamic user flows or multi-screen interactions. This leads to the underrepresentation of important usability heuristics such as error prevention and visibility of system status."
- **Source URL:** https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf
- **Confidence:** high
- **Full basis ref:** cycle-2/02-uicrit-and-design-rationale-systems.md#uicrit_known_limitations
- **Cycle:** 2

---

- **Claim:** Only 13.1% of LLM-generated design critiques (Gemini Pro Vision, zero-shot) were validated by human annotators — confirming the gap between pattern-based AI output and genuine design reasoning.
- **Excerpt:** "only 776 out of 5,927 generated comments (13.1%) were deemed valid by the human experts, highlighting the need for more advanced techniques like fine-tuning."
- **Source URL:** https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf
- **Confidence:** high
- **Full basis ref:** cycle-2/02-uicrit-and-design-rationale-systems.md#uicrit_critique_collection_and_annotation
- **Cycle:** 2

---

- **Claim:** QOC (Questions-Options-Criteria) schema from 1980s design rationale research maps directly to what an LLM training pipeline needs — structured multi-turn reasoning about design trade-offs.
- **Excerpt:** "The Question-Option-Criteria structure from QOC maps cleanly to prompt templates for multi-turn conversational AI, guiding the model to explore a design space by identifying a core question, proposing multiple options, and evaluating them against explicit criteria."
- **Source URL:** https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D
- **Confidence:** high
- **Full basis ref:** cycle-2/02-uicrit-and-design-rationale-systems.md#mapping_schemas_to_llm_training_needs
- **Cycle:** 2

---

- **Claim:** Expert design critique produces a 55% quality improvement over zero-shot prompting when UICrit few-shot examples are used — but localization accuracy (bounding box IoU) remains only 0.222 even with visual aids.
- **Excerpt:** "resulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study"
- **Source URL:** https://arxiv.org/html/2407.08850v2
- **Confidence:** high
- **Full basis ref:** cycle-2/03-process-supervision-multimodal.md#chain_of_thought_for_design_critique
- **Cycle:** 2

---

- **Claim:** Current VLMs (GPT-4o, Claude 3.5 Sonnet) achieve >75% accuracy on Likert-scale UI quality ratings but drop to near-chance on pairwise preference judgments with subtle design differences — the exact territory where design reasoning matters most.
- **Excerpt:** "models we use (Claude 3.5 Sonnet, GPT-4o, and Llama-3.2-11B-Vision-Instruct) all have an accuracy score greater than 75%... performance dropped significantly on nuanced pairwise comparisons."
- **Source URL:** https://arxiv.org/html/2510.08783v1
- **Confidence:** medium
- **Full basis ref:** cycle-2/03-process-supervision-multimodal.md#vision_language_model_performance_on_design_critique
- **Cycle:** 2

---

- **Claim:** The Figma REST API enables element-level grounding more precise than bounding boxes — linking critique to specific layer IDs rather than pixel regions, enabling actionable, specific fixes.
- **Excerpt:** "By using the API's file endpoints... a system can retrieve a complete representation of the design file as a JSON object... This allows an AI to connect its reasoning to specific, unique layer or node IDs."
- **Source URL:** https://www.figma.com/developers/api
- **Confidence:** high
- **Full basis ref:** cycle-2/03-process-supervision-multimodal.md#figma_api_for_reasoning_grounding
- **Cycle:** 2

---

- **Claim:** Axe-core can serve as a programmatic verifier in a design reasoning loop — providing objective, rule-based checks (WCAG contrast ratios, tap target dimensions) as ground truth for training rewards.
- **Excerpt:** "By integrating a tool like the axe-core engine, the system can programmatically extract the foreground and background colors... calculate the contrast ratio... compared against the WCAG 2.x standard (e.g., a ratio of at least 4.5:1 for normal text)."
- **Source URL:** https://arxiv.org/html/2407.08850v2
- **Confidence:** high
- **Full basis ref:** cycle-2/03-process-supervision-multimodal.md#verifiable_reasoning_with_design_standards
- **Cycle:** 2

---

- **Claim:** Expert designers use precedent differently from novices — experts retrieve deep functional relations, while novices copy surface similarity, leading to design fixation.
- **Excerpt:** "Experts utilize precedents as structured, abstracted templates focusing on deep functional relations. In contrast, novices often retrieve surface-similar examples, making them more susceptible to 'design fixation.'"
- **Source URL:** https://www.sciencedirect.com/science/article/pii/S0142694X96000233
- **Confidence:** high
- **Full basis ref:** cycle-1/02-expert-novice-design.md
- **Cycle:** 1

---

- **Claim:** Design expertise involves a qualitative shift in cognitive strategy, not just accumulated knowledge — experts frame problems, novices solve them; the framing is where quality lives.
- **Excerpt:** "Expertise in design is characterized by a qualitative shift in cognitive strategies rather than just an accumulation of facts."
- **Source URL:** https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner...
- **Confidence:** high
- **Full basis ref:** cycle-1/02-expert-novice-design.md
- **Cycle:** 1

---

## 4. Contested or Uncertain Areas

### 4.1 Whether "reflection-in-action" can be approximated by chain-of-thought

Schön's reflection-in-action is real-time, situational, and responsive to the design artifact talking back. Chain-of-thought prompting produces sequential reasoning steps but cannot respond to emergent visual properties the way a designer can when looking at a sketch. The question: does forcing CoT *before* output production approximate this well enough to be useful? No empirical answer yet for design. The MLLM-as-UI-Judge paper suggests current models are brittle on nuanced comparisons — which is exactly where reflection-in-action matters.

### 4.2 Whether tacit knowledge is pattern recognition made large or something else

The optimistic view (Dreyfus vs. Polanyi): design intuition is pattern recognition at scale, which means large enough training data + fine-tuning can approximate it. The pessimistic view: tacit knowledge has an embodied, socialized component that is genuinely irreducible — you cannot read your way to it. Dreyfus explicitly argued that human-level intelligence requires human-like embodiment. If Dreyfus is right, there is a hard ceiling on what any LLM-based system can achieve in design judgment. The field is split. Evidence from process supervision in math (which *is* symbolic, not embodied) suggests the optimistic view may hold for the formalizable parts.

### 4.3 Whether 13.1% LLM critique validity will improve significantly with fine-tuning

Gemini Pro Vision at zero-shot produced 13.1% valid critiques. The UICrit paper achieved 55% quality improvement with few-shot + visual aids, but this is *improvement in critique quality*, not a 55% pass rate on validity. The actual saturation point of fine-tuned models on design critique is unknown. Without a larger, more diverse training corpus, the ceiling may be low.

### 4.4 Aesthetic judgment as learnable preference vs. context-dependent value

NIMA-style models learn aesthetic preference from crowd ratings and generalize it. But good design is not aesthetic consensus — it's design that serves a specific user, context, and intent. A model that "looks good to most people" is not the same as a model that "serves this user in this context." The UICrit critiques reference intent and task context, but most aesthetic datasets do not. This gap matters for building anything beyond a "looks nice" evaluator.

---

## 5. Frontier and Open Questions

**FQ1 — The design PRM training signal problem**
Process Reward Models require labeled reasoning *steps*. In math, steps are verifiable (correct/incorrect). In design, what makes a step correct? The UICrit paper proposes: grounding accuracy (IoU), factual correctness (WCAG checks), guideline consistency, and predictive alignment with quality ratings. This is plausible but untested. Who labels the steps? 7 designers annotated UICrit in 2 weeks full-time — scaling that to a training corpus large enough for a PRM is a major open problem.

**FQ2 — Multi-screen and dynamic flow critique**
All existing datasets (UICrit, RICO, ENRICO) are single-screen, static. Real design reasoning happens across flows, states, and user journeys. A button makes sense or doesn't in the context of the 3-step checkout it belongs to. No dataset currently captures this. Mind2Web and OSWorld capture task completion but not design critique of multi-screen flows.

**FQ3 — Intent-aware design reasoning**
Most critique is evaluated against universal heuristics (WCAG, Nielsen's 10). But expert designers evaluate against *intent*: "Is this achieving what this design is trying to do for this user in this context?" No formal definition of design intent as a computable construct exists. The UICrit `task` field is a rough proxy. The DKSN system treats it as a first-class node. An operationalized, computable definition of design intent is a missing foundation.

**FQ4 — YouTube/video as training corpus: extraction at scale**
The HowTo100M methodology (ASR → transcript → alignment to video frames) is theoretically applicable to design process videos. But design critique vocabulary is domain-specific, and the signal-to-noise in tutorial vs. genuine reasoning narration is high. No one has built a filtered, aligned design-reasoning corpus from video at scale. This is a concrete build.

**FQ5 — The "Design Constitution" composition problem**
Constitutional AI uses a constitution to guide self-critique. A Design Constitution would codify principles (Gestalt, WCAG, Nielsen, brand voice, accessibility). But which principles? Universally applicable ones? Domain-specific ones? Culture-specific ones? The composition of this constitution determines what the model considers "good" — it is a normative choice with large downstream effects. No systematic approach to constructing a design constitution has been published.

**FQ6 — Counterfactual critique as training signal**
The strongest training signal for reasoning would be: "Here is the original design. Here is the critique. Here is the revised design that addresses it. Here is whether the revision improved the quality rating." This before/after/outcome structure doesn't exist at scale. UICrit proposes it as an extension. Building this corpus — even at 500-1000 examples — would be a significant dataset contribution.

---

## 6. User Questions (Deferred)

**U1 — Domain scope**
The research covers UI/UX, graphic, brand, and architectural design. The furtheringdesign project context suggests UI/UX and web design are primary. Narrowing scope changes which training data (UICrit = mobile UI), which heuristics (WCAG vs. brand voice), and which critique dimensions to prioritize. Answer before building.

**U2 — Build path**
Three possible targets:
- (a) Improved prompt/skill for existing LLMs — Design Constitution + structured critique prompting, no training required, implementable now
- (b) Fine-tuned model — requires training corpus + compute, weeks/months of work
- (c) Training data pipeline — builds the substrate that enables (b), most foundational but slowest to show results

Which of these is the right first move for furtheringdesign?

**U3 — YouTube corpus build**
The research confirmed Gary Simon (DesignCourse), Chris Do (The Futur), Will Paterson, and Relume Design League as the highest-signal sources of narrated design reasoning. Is building an ASR-aligned critique corpus from these sources a project furtheringdesign wants to pursue? This would be a novel dataset contribution and could directly feed the Design Constitution or a fine-tuning corpus.

---

## 7. Run Metadata

**Cycles run:** 2
**Queries by tier:**
- Cycle 1: 6 × core (~$0.025 each) = ~$0.15
- Cycle 2: 3 × pro (~$0.10 each) = ~$0.30
- Parallel (YouTubers): 1 × pro = ~$0.10
- **Total: ~$0.55**

**Top 3 learnings:**

1. **The mismatch signal is not magic — it's traceable.** MMN/ERN neural correlates + chunking theory + perceptual fluency + somatic markers give a complete cognitive account. Each layer has a computational analog. This is the most important finding: the "intuition" that seems irreducible is actually decomposable.

2. **The data problem is the real bottleneck, not the architecture.** Constitutional AI, PRMs, DPO — these are all validated. The gap is: labeled design reasoning *steps*, not just design outputs. UICrit is a start (3,059 critiques). A viable next step is extending it with multi-screen flows, before/after pairs, and critique-to-outcome linkage.

3. **YouTube design process videos are a real signal source, not just inspiration.** HowTo100M showed this methodology works at scale. Gary Simon's live UI refactoring sessions, Chris Do's Logo Design Therapy, and the Relume Design League are narrated design reasoning in the exact format needed for ASR-aligned weak supervision. The YouTubers search connects directly to the training data question.

**Suggested next actions:**

1. **Near-term (weeks):** Build a Design Constitution for the UI skill — codify the *why* behind design principles, not just the rules. Use Constitutional AI-style self-critique prompting. This improves the existing skill without training. Testable immediately.

2. **Medium-term (months):** Build a design critique corpus from YouTube. Start with 10-20 DesignCourse and The Futur episodes. ASR → transcript → extract rationale sentences (search for "because", "the reason", "this works because", "the problem is") → align to timestamps → pair with visual frames. Evaluate signal quality manually on a 50-sample subset.

3. **Medium-term:** Propose a UICrit extension. Add: (a) multi-screen flow critiques, (b) before/after redesign pairs with outcome ratings, (c) explicit intent statements per screen, (d) 20+ annotators (not 7). This is a research contribution that would be cited.

4. **Long-term:** The full hybrid architecture (Design Constitution + PRM + DPO + multimodal grounding via Figma API + axe-core verifier) is the right end-state. Build toward it incrementally, starting with the Constitution.
