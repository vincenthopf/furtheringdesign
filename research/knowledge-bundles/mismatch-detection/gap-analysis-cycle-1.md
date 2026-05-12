# Gap Analysis — Cycle 1: Mismatch Detection

## Summary of Coverage

Cycle 1 covered the five planned angles with strong breadth:
1. **Bayesian surprise/prediction error** — Well covered. Specific algorithms (KL-divergence, Shannon surprisal, masked-patch prediction, UEyes fixation models). Clear limitation: semantic gap (can't distinguish good surprise from bad surprise).
2. **Computational Gestalt/grouping** — Well covered. Specific algorithms (Delaunay triangulation, RANG, RANSAC line-fitting, VIPS, Layout-Parser). Key insight: >3σ deviation from group mean as detection threshold. Gap: intent-awareness.
3. **Processing fluency metrics** — Well covered. Comprehensive metric taxonomy (edge density, feature congestion, subband entropy, JPEG size, alignment consistency, whitespace distribution, DeepGaze correlation). Key finding: no universal thresholds, use distribution-relative flagging (top/bottom 10-20%).
4. **Aesthetic scoring model limits** — Well covered. NIMA domain shift confirmed. UIClip inter-rater reliability only α≈0.37 — expert ground truth is itself noisy. Models output rankings not calibrated probabilities. Systematic failures on novel/accessible/cultural designs.
5. **Confidence calibration** — Well covered. Self-consistency (M=5-10 samples), multi-format agreement, temperature scaling, ensemble disagreement, aleatoric vs epistemic distinction. Key UX: first-person hedging reduces overreliance.

## HIGH-PRIORITY Gaps (KNOWLEDGE — answerable by further research)

### G1: Combining deterministic + probabilistic signals into unified output
**What's missing:** How do you combine a Layer 1 binary pass/fail (e.g., axe-core contrast check) with a Layer 3 probabilistic fluency score (e.g., 0.72 processing difficulty) into a coherent mismatch report? What aggregation frameworks exist? How do multi-signal fusion systems work in related fields (e.g., medical diagnosis, anomaly detection)?

### G2: Detecting "intentional deviation" vs. "mistake"  
**What's missing:** None of the research addresses how to detect whether a design choice that triggers a mismatch signal is deliberate (brutalist style, emphasis through contrast) or accidental. The Intent Schema dependency is acknowledged but the question of what heuristics the detector can use WITHOUT intent information remains open.

### G3: Multi-layer interaction patterns
**What's missing:** If Layer 1 (programmatic) reports clean but Layer 3 (fluency) flags high complexity, what does that mean? Are there established patterns for how layered detection systems report corroborating vs. conflicting signals? Relevant: medical diagnostic cascades, intrusion detection systems, multi-sensor fusion.

### G4: Practical VLM prompt architectures for design mismatch detection
**What's missing:** The confidence calibration research covers general LLM calibration, but what specific prompt structures would you use to ask an LLM to perform chunking analysis (Layer 2) or scan simulation (Layer 3)? What's the actual prompt design for "identify perceptual groups and check internal consistency"?

## MEDIUM-PRIORITY Gaps

### G5: Cost-performance tradeoffs in multi-layer detection
Cycle 1 notes that ensembles (M=5-10 samples) improve calibration but increase cost. What's the minimum viable architecture that gives useful signal without 5x inference cost?

### G6: Evaluation methodology for the framework itself
How would you validate that this mismatch detector is actually useful? What ground-truth would you measure against? The UIClip finding (α≈0.37 inter-rater) suggests expert agreement is low — so what counts as "correct detection"?

## LOW-PRIORITY Gaps

### G7: Temporal/state-dependent mismatches
All research is on static single-screen analysis. Multi-screen flow mismatches (e.g., inconsistency between checkout step 2 and step 3) remain unaddressed.

### G8: Cultural and domain-specific norm encoding
How does the detector know what norms apply? Western minimalist tech vs. information-dense Asian e-commerce vs. enterprise B2B have different "expected" patterns.

## USER Gaps (deferred)

### U1: What design domains does furtheringdesign target?
Narrows which norms/priors the prediction error layer uses.

### U2: Is real-time feedback required or batch review acceptable?
Determines whether the expensive ensemble/multi-sample approaches are viable.

## DEAD Gaps (require building/testing)

### D1: Actual LLM prompt performance on chunking detection
Can only be answered by prototyping prompts and measuring agreement with expert judgment.

### D2: Whether M=3 samples is enough vs M=10 for design judgments
Empirical question requiring A/B testing.
