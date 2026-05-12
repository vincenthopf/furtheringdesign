# Knowledge Bundle: Mismatch Detection Framework

> **Topic:** Computational wrongness detection for design — multi-layered detection systems approximating expert designers' pre-verbal mismatch signals. Focus on implementable mechanisms, nondeterminism handling, and confidence calibration.
> **Cycles:** 2 (Cycle 1: 5 core-tier queries · Cycle 2: 3 pro-tier queries)
> **Total queries:** 8
> **Run date:** 2026-05-05
> **Total cost:** ~$0.425
> **Builds on:** `.building/knowledge-bundles/ai-design-thinking/` (9 queries, 2 cycles)

---

## 1. Executive Summary

The mismatch detection problem is computationally tractable but fundamentally layered — each layer has different characteristics, different tools, and different confidence properties. The research confirms that a 4-layer architecture (prediction error → chunking mismatch → processing fluency → intent alignment) maps cleanly to available computational mechanisms, with each layer becoming progressively more uncertain and more dependent on context.

**What's implementable now:**
- Layer 1 (Prediction Error / Rule Violation): Fully deterministic. Axe-core, spacing validators, grid adherence checks, contrast ratio computation. Binary pass/fail with 0.85-0.99 confidence.
- Layer 2 (Chunking Mismatch): Partially deterministic, partially LLM-based. DOM/Figma tree parsing can measure intra-group consistency (spacing variance, alignment deviation). LLM-based semantic grouping can identify chunks and flag elements that break group logic. Confidence: 0.55-0.90.
- Layer 3 (Processing Fluency): Hybrid. Computable metrics (edge density, feature congestion, whitespace distribution, alignment consistency) correlate with human fluency judgments. LLM scan simulation adds semantic hierarchy analysis. Confidence: 0.55-0.75.
- Layer 4 (Intent Alignment): Almost entirely LLM-based, requires Intent Schema. Whether the visual hierarchy serves the primary action for this audience. Confidence: 0.40-0.60 — system should present alternatives, not verdicts.

**The core insight from Cycle 2:** Multi-signal fusion architectures from medical diagnosis, cybersecurity, and quality control provide proven patterns for combining these layers. The framework should use:
1. A **cascading architecture** (cheap deterministic checks gate expensive LLM checks)
2. **Dempster-Shafer belief intervals** for representing uncertainty (not point estimates)
3. **Confidence tiering** based on issue type (objective violation → strong convention → weak convention → subjective preference)
4. **Disagreement detection** via multi-sample consistency and explicit "reasonable designers would disagree" flagging

**The hard problem (confirmed):** Distinguishing intentional deviation from error. The research reveals practical heuristics: consistency (repeated deviation = likely deliberate), contextual fit (aligns with higher-level structure), co-variation (changes in coherent bundles), and metadata signals (Figma component overrides, detached instances). But without explicit intent annotation, this remains probabilistic.

---

## 2. Territory Map

### 2.1 Layer 1: Prediction Error Detection (Deterministic)

The computational analog of the brain's prediction error signal. Detects violations of learned statistical regularities — elements that don't match expected patterns.

**Computable mechanisms:**
- **Rule-based validators:** axe-core (WCAG contrast, labels, target sizes), spacing/grid consistency checks, typographic scale adherence, color palette compliance
- **Bayesian surprise models:** KL-divergence between element's visual properties and corpus-learned distribution. High surprise = statistically unusual for this context
- **Saliency-based anomaly detection:** UEyes/DeepGaze fixation prediction models can flag elements that attract unexpected attention — the computational "double take"
- **Masked-patch prediction:** Train a model to predict a UI patch from surrounding context; high reconstruction error = prediction error

**Measurable quantities:** Surprisal (bits), KL-divergence, information gain, element-level Z-scores normalized against corpus

**Known limits:** Semantic gap — can flag "unexpected" but cannot distinguish good surprise (intentional focal point) from bad surprise (design error). Prior-sensitive (biased toward training corpus norms).

### 2.2 Layer 2: Chunking Mismatch Detection (Hybrid)

The computational analog of expert chunking. Experts see layouts as semantic groups (navigation, hero, product card). Mismatch fires when an element breaks its group's internal logic.

**Computable mechanisms:**
- **Proximity/grouping from DOM/Figma tree:** Delaunay triangulation on element centroids, RANG pruning, k-NN neighborhood graphs → identify perceptual groups
- **Intra-group consistency measurement:** For each identified group, compute variance in spacing, alignment, typography, color. Flag elements >3σ from group mean
- **VIPS algorithm:** Vision-based Page Segmentation produces hierarchical content tree with Degree of Coherence (DoC) scores
- **Layout-Parser + PubLayNet:** Deep learning block detection (headers, cards, navigation, footer) from screenshots
- **LLM semantic chunking:** Ask VLM to identify perceptual groups and check each element's membership. "What are the groups? Does each element belong?"

**Gap between pixel and semantic:** Geometric proximity ≠ semantic grouping. A "related links" section might be geometrically close to "footer" but semantically distinct. Hybrid approaches combining geometric analysis with structural metadata (ARIA roles, Auto Layout constraints, component hierarchy) are required.

### 2.3 Layer 3: Processing Fluency Detection (Hybrid)

The computational analog of perceptual fluency. Designs that are harder to process than they should be generate negative affect before conscious analysis.

**Computable metrics (validated against human judgments):**
- **Image-based:** Edge density (Canny), feature congestion (Rosenholtz), subband entropy (wavelets), JPEG file size proxy, color entropy, fractal dimension
- **Layout-based:** Alignment consistency (element edges → grid clustering → mean distance to nearest grid line), whitespace distribution uniformity (CoV across grid cells), density variance across regions
- **Attention-based:** DeepGaze III saliency-to-hierarchy correlation (predicted attention vs intended importance), F/Z-pattern adherence, fixation count prediction

**Validation:** Empirical studies confirm edge density and feature congestion predict search time and NASA-TLX cognitive load scores. No universal thresholds — use distribution-relative flagging (top/bottom 10-20% of domain-specific corpus).

**LLM augmentation:** Scan simulation ("What draws attention first? Is that the intended hierarchy?"), competing-alignment detection, visual noise assessment.

### 2.4 Layer 4: Intent Alignment (LLM-Dependent)

The computational analog of somatic/affective markers. "This feels like a design I've seen fail before." Requires understanding what the design is trying to achieve.

**Dependency:** Requires Intent Schema (separate foundation). Without intent, this layer cannot function.

**Mechanism:** Given intent ("convert visitors to trial signups for a developer tool"), evaluate whether visual hierarchy, information architecture, and interaction patterns serve that intent for the specified audience.

**Confidence characteristics:** Lowest confidence layer. Expert designers themselves disagree on intent alignment at high rates. Inter-rater reliability for general usability evaluation: any-2 overlap ~27% (typical) to ~59% (controlled). System should present alternatives with trade-off analysis, not single verdicts.

### 2.5 The Nondeterminism Problem

Every layer except the deterministic checks in Layer 1 is probabilistic. The research confirms:

- **LLM verbalized confidence is miscalibrated.** Models report "90% sure" when actual accuracy is much lower. Raw self-reported probabilities cannot be trusted.
- **Self-consistency is the best available proxy.** M=5-10 samples, measure agreement rate. High disagreement = low confidence.
- **Aleatoric vs epistemic uncertainty must be distinguished.** High variance from multiple samples may mean "the question is ambiguous" (aleatoric — present alternatives) or "the model lacks knowledge" (epistemic — trigger abstention or escalation).
- **UIClip inter-rater reliability:** Krippendorf's α ≈ 0.37 among designers. Even expert ground truth is noisy.
- **VLMs:** >75% on Likert-scale ratings but near-chance on nuanced pairwise comparisons.

### 2.6 Multi-Signal Fusion Architecture

The research found mature frameworks for combining signals:

**Recommended approach: Parallel/Late Fusion with Cascading Gates**

```
Stage 0: Input normalization (screenshot + DOM/Figma tree + Intent Schema)
Stage 1: Deterministic validators (axe-core, spacing audit, grid check) — FAST, HIGH RECALL
    → Immediate findings with 0.85-0.99 confidence
Stage 2: Computed metrics (fluency scores, grouping consistency, saliency) — MEDIUM COST
    → Findings with 0.55-0.85 confidence
Stage 3: LLM-based evaluation (chunking analysis, scan simulation, intent check) — EXPENSIVE
    → Only triggered for elements/areas that passed Stages 1-2 without clear verdict
    → Uses multi-sample consistency for calibration
Stage 4: Fusion and reporting
    → Dempster-Shafer belief intervals combine evidence from all layers
    → Disagreement detection triggers "Experts may disagree" flagging
```

**Key fusion algorithms applicable:**
- Calibrated Logistic Fusion: baseline, well-understood
- Dempster-Shafer: when representing ignorance and conflict explicitly
- Cascading/Coarse-to-Fine: for cost management
- Safety-first overrides: critical accessibility failures bypass fusion

### 2.7 Intentional Deviation Detection

Cross-domain research (music analysis, code linting, NLP dialect detection, design systems) reveals practical heuristics:

| Signal | Interpretation | Confidence Modifier |
|--------|---------------|-------------------|
| Consistency (same deviation repeated k≥3 times) | Likely deliberate | +0.2 toward "intentional" |
| Contextual fit (aligns with higher-level structure) | Likely deliberate | +0.15 |
| Co-variation (changes in coherent bundles) | Likely deliberate | +0.15 |
| Figma component override (via properties) | Sanctioned deviation | +0.3 |
| Figma instance detachment | Significant deviation | +0.2 (but review) |
| Isolated, one-off violation | Likely error | -0.1 |
| No supporting context or rationale | Likely error | -0.15 |

**Counterfactual test:** If "fixing" the deviation would degrade the design's coherence or break its internal logic, the original was likely intentional.

---

## 3. Load-Bearing Claims

- **Claim:** Bayesian surprise (KL-divergence between prior and posterior beliefs) is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than average.
- **Excerpt:** "Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average."
- **Source URL:** https://www.sciencedirect.com/science/article/pii/S0042698908004380
- **Confidence:** high
- **Full basis ref:** ai-design-thinking/cycle-2/01-mismatch-signal-and-reasoning-architectures.md#computational_models_for_wrongness_detection
- **Cycle:** Prior research

---

- **Claim:** Inter-rater reliability for usability problem detection averages ~27% any-2 overlap in typical evaluations, rising to ~59% in controlled settings.
- **Excerpt:** "The average agreement between evaluators is 27%. This includes studies in this review that had little control..."
- **Source URL:** https://measuringu.com/evaluator-effect/
- **Confidence:** high
- **Full basis ref:** cycle-2/03-disagreement-detection-confidence-tiers.md#inter_rater_reliability_overview
- **Cycle:** 2

---

- **Claim:** Manual accessibility checks against objective criteria (WCAG) achieve moderate to substantial inter-rater reliability (Cohen's κ = 0.59 to 0.71).
- **Excerpt:** "A subset of issues were analyzed for inter-rater reliability, achieving a Cohen's kappa agreement value of κ = 0.59"
- **Source URL:** https://faculty.washington.edu/ajko/papers/Mitchell2026AccessHeuristics.pdf
- **Confidence:** high
- **Full basis ref:** cycle-2/03-disagreement-detection-confidence-tiers.md#tier_1_objective_violations
- **Cycle:** 2

---

- **Claim:** UIClip inter-rater reliability among professional designers is only α ≈ 0.37, confirming that even expert ground truth for design quality is noisy.
- **Excerpt:** From UIClip paper — inter-rater Krippendorf's alpha for design quality ratings.
- **Source URL:** https://www.cs.cmu.edu/~jbigham/pubs/pdfs/2024/uiclip-interface-design.pdf
- **Confidence:** high
- **Full basis ref:** cycle-1/04-aesthetic-scoring-models-limits.md#output
- **Cycle:** 1

---

- **Claim:** Self-consistency and perturbation-based methods achieve AUROC 0.78-0.90 for LLM confidence estimation, substantially outperforming verbalized confidence.
- **Excerpt:** "self-evaluation methods (verbalized, P(True)) achieve AUROC 0.42-0.76, while perturbation methods (semantic entropy, self-consistency, and our Multi-Format Agreement) achieve AUROC 0.78-0."
- **Source URL:** https://arxiv.org/abs/2604.12491
- **Confidence:** high
- **Full basis ref:** cycle-1/05-confidence-calibration-nondeterminism.md#output
- **Cycle:** 1

---

- **Claim:** Feature congestion and edge density are validated predictors of visual search difficulty and cognitive load, correlating with NASA-TLX scores and search time.
- **Excerpt:** "Visual complexity was computationally measured using edge density, feature congestion, and subband entropy. The three measures of visual complexity were significantly correlated with each other"
- **Source URL:** https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5778470/
- **Confidence:** high
- **Full basis ref:** cycle-1/03-processing-fluency-complexity-metrics.md#output
- **Cycle:** 1

---

- **Claim:** NIMA suffers from severe domain shift when applied to UI design — it cannot distinguish between a "pretty" photo and a functional interface.
- **Excerpt:** "NIMA predicts a distribution of human opinion scores. While it can rank images by aesthetic quality, it suffers from severe domain shift when applied to UI design."
- **Source URL:** https://arxiv.org/pdf/1709.05424.pdf
- **Confidence:** high
- **Full basis ref:** cycle-1/04-aesthetic-scoring-models-limits.md#output
- **Cycle:** 1

---

- **Claim:** Dempster-Shafer theory explicitly quantifies conflict between evidence sources and can represent uncertainty/ignorance — making it suitable for design evaluation where "I don't know" is a valid answer.
- **Excerpt:** "Dempster-Shafer 'theory of evidence' was shown to be a practical approach to implementing the sensor fusion system architecture."
- **Source URL:** https://www.cs.cmu.edu/~whd/publications/7179.pdf
- **Confidence:** high
- **Full basis ref:** cycle-2/01-multi-signal-fusion-architectures.md#dempster_shafer_theory_of_evidence
- **Cycle:** 2

---

- **Claim:** A single isolated deviation is likely an error; a repeated deviation (k≥3 consistent occurrences) is likely a deliberate choice. This principle applies across music, code, language, and design.
- **Excerpt:** "A single, isolated rule break is likely an error, but a deviation that recurs consistently across a defined scope suggests a deliberate choice."
- **Source URL:** Cross-domain synthesis from Cycle 2 research
- **Confidence:** high
- **Full basis ref:** cycle-2/02-intentional-deviation-vs-error.md#key_disambiguation_principles
- **Cycle:** 2

---

## 4. Contested or Uncertain Areas

### 4.1 Whether aesthetic scoring models can be made context-aware

NIMA/UIClip/HPS output relative rankings, not calibrated probabilities. UIClip supports textual conditioning (platform prefixes), but true audience-specific conditioning requires fine-tuning on data from that demographic. The field is split on whether aesthetic preference is learnable as a general capacity or is fundamentally context-dependent. Evidence leans toward context-dependent (good design serves specific intent, not universal taste).

### 4.2 Whether LLM multi-sample consistency actually calibrates well for design

Self-consistency (M=5-10 samples) works for factual questions. For aesthetic/design judgments, high consistency might just mean the model has a strong prior, not that it's correct. Calibration on design-specific evaluation tasks hasn't been validated. This is a DEAD gap — needs empirical testing.

### 4.3 Whether the 4-layer model has clear boundaries

The layers were decomposed from cognitive science, but computationally they may overlap. A "prediction error" about alignment (Layer 1) might also be a "chunking mismatch" (Layer 2) and a "fluency drop" (Layer 3). The question is whether to maintain the conceptual layers as separate computation passes or to collapse them into a unified scoring system. The research suggests maintaining separation for explainability and confidence calibration — each layer has different confidence characteristics.

### 4.4 Whether Dempster-Shafer is overkill vs simpler weighted fusion

DS theory is theoretically principled but adds complexity. For a system with only 4 layers, calibrated logistic fusion (weighted sum with learned weights) might perform comparably with lower implementation cost. No empirical comparison exists for design-specific multi-layer evaluation. The key advantage of DS is explicit ignorance representation — it can say "I don't have enough evidence" which weighted sums cannot.

---

## 5. Frontier and Open Questions

**FQ1 — Design-specific confidence calibration data**
No dataset exists with ground-truth design quality annotations + calibrated confidence levels. Building one requires: expert panel (n≥20), multiple-pass annotation, explicit disagreement recording, and severity consensus measurement. Would need ~500-1000 annotated screens.

**FQ2 — Optimal number of LLM samples for design judgment**
Is M=3 sufficient for consistency-based confidence, or does design's subjectivity require M=10? Empirical question. Higher M = higher cost. The tradeoff hasn't been measured for design evaluation specifically.

**FQ3 — Multi-screen flow coherence detection**
All computable metrics work on single screens. Detecting mismatches across a multi-step flow (e.g., inconsistent button styles between checkout steps) requires session-level analysis. No validated approach exists — this extends the framework beyond single-screen evaluation.

**FQ4 — Cultural norm encoding**
Western minimalist tech vs. information-dense Asian e-commerce vs. enterprise B2B have fundamentally different expected patterns. How does the system know which norms to apply? Likely requires explicit "design context" parameter in the Intent Schema.

**FQ5 — Evaluating the evaluator**
How do you validate that this framework is useful? UIClip's α≈0.37 means experts disagree. "Correct detection" may need to be defined as "agreement with the majority of a 5-expert panel" rather than binary truth. Evaluation methodology is itself an open problem.

---

## 6. User Questions (Deferred)

**U1 — Target design domain?**
Web/UI, mobile, or broader? Determines which corpus norms the prediction error layer uses, which conventions count as "strong," and which metrics are validated.

**U2 — Real-time or batch?**
Real-time feedback during authoring requires the cascading architecture (fast checks only). Batch review allows full multi-layer + multi-sample evaluation. Determines whether M=5-10 LLM samples are viable.

**U3 — Integration surface?**
Figma plugin? CLI tool? Part of a build pipeline? Determines whether DOM tree, Figma layer tree, or screenshot is the primary input modality.

---

## 7. Run Metadata

**Cycles run:** 2
**Queries by tier:**
- Cycle 1: 5 × core ($0.025 each) = $0.125
- Cycle 2: 3 × pro ($0.10 each) = $0.30
- **Total: $0.425**

**Top 3 learnings:**

1. **Multi-signal fusion is a solved problem in other domains.** Medical diagnosis, cybersecurity, and quality control all combine binary validators with probabilistic models. Dempster-Shafer theory, cascading architectures, and calibrated logistic fusion are mature, well-documented approaches. We don't need to invent the fusion architecture — we need to adapt it.

2. **Confidence tiering by issue type is the key design decision.** The research reveals a natural 4-tier confidence structure: Objective Violations (0.85-0.99), Strong Conventions (0.70-0.90), Weak Conventions (0.55-0.75), Subjective Preferences (0.40-0.60). This maps almost perfectly to the 4 cognitive layers. The system's credibility depends on correctly classifying which tier each finding belongs to.

3. **Intentional deviation detection has practical cross-domain solutions.** The music/code/NLP/design-system research converges on the same heuristics: consistency, contextual fit, co-variation, and metadata signals. These are implementable without requiring the designer to explicitly annotate intent — the system can infer intent from patterns.

**Suggested next actions:**

1. Design the Mismatch Detection Framework specification using this research as foundation
2. Define the interface contract with the Intent Schema (what data does Layer 4 need?)
3. Prototype Layer 1 + Layer 2 deterministic checks on a sample Figma file or DOM tree to validate feasibility
4. Run calibration experiments: M=3 vs M=5 vs M=10 LLM samples on 50 design screenshots with expert annotations
