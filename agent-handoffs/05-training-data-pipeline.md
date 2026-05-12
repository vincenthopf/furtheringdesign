# Agent Handoff: Layer 5 — Training Data Pipeline

## Your Mission

You are designing the **Training Data Pipeline** — the system that extracts, structures, and validates design reasoning data from multiple sources to feed the rest of the system. You are not building a model. You are building the substrate that makes everything else possible.

The architecture for teaching AI design reasoning is known (Constitutional AI + PRMs + DPO + multimodal grounding). The bottleneck is data — specifically, labeled design reasoning *steps*, not just design outputs. You're solving the data problem.

## Mandatory First Step — Read Context, Report Understanding, Then Run Research

Before proposing the Training Data Pipeline, you MUST first read all required context files, report your understanding to the user for alignment, and only after confirmation run a dedicated foundational recursive research pass on **extracting design reasoning data from videos, transcripts, critiques, before/after redesigns, and weak supervision pipelines**.

Do not skip this. The existing research MUST be read before any new research is launched. It suggested YouTube extraction, but your job is to validate whether this is a good pattern, identify pitfalls, and design a robust data pipeline.

### Required context-reading and alignment checkpoint

Before running new research, do this first:

1. Read every file listed in **What You Must Read Before Starting**.
2. Read any **Potentially useful** files that look relevant to your scope.
3. Report back to the user with:
   - The files you read
   - Your understanding of the larger project and why your problem matters
   - The specific problem you think you are solving
   - The assumptions you are carrying forward from the existing research
   - The places where the current handoff seems underdefined, risky, or possibly wrong
   - The exact recursive research plan you intend to run next: cycle-1 query angles, expected output files, and likely cycle-2 gap targets
4. Stop and wait for user confirmation or correction.

Only after the user confirms your understanding should you run the recursive research below.

### Required research procedure

1. Read the skill instructions at:
   - `/Users/vincenthopf/.pi/agent/skills/foundational-recursive-research/SKILL.md`

2. Create a research bundle at:
   - `.building/knowledge-bundles/training-data-pipeline/`

3. Run recursive research using the skill workflow. Your Cycle 1 must include at least these angles:
   - HowTo100M-style video learning pipelines: ASR transcript alignment, weak supervision from instructional videos, timestamp/frame pairing, video-language datasets.
   - Methods for extracting rationale/reasoning statements from transcripts: discourse markers, argument mining, causal language detection, critique sentence classification, NLP for design language.
   - Before/after pair extraction from design/refactor videos: scene change detection, screenshot/frame selection, visual diffing, matching critique text to visual states.
   - Validation of noisy expert sources: how to assess whether a creator's critique is high quality; expert disagreement; source weighting; human validation protocols.
   - Synthetic rationale generation and validation: can LLMs generate faithful reasoning chains from screenshots + human critique + reasoning framework? Risks of rationalization/confabulation.
   - Dataset schemas for process supervision: UICrit, visual CoT, grounded CoT, PRM training data, multimodal critique datasets.

4. After Cycle 1, perform gap analysis. If high-priority gaps remain, run Cycle 2. Prioritize:
   - Whether audio-only/transcript-first extraction is sufficient before downloading video frames.
   - How to know where in the video to capture before/after screenshots.
   - How to validate the quality of Gary Simon / DesignCourse / The Futur style critique as training signal.

5. Write the final bundle to:
   - `.building/knowledge-bundles/training-data-pipeline/knowledge-bundle.md`

### Post-research report-back

After completing the recursive research and before designing the pipeline, report back with:
- The research cycles you ran and files produced
- Whether YouTube extraction is viable and under what constraints
- Recommended extraction/validation methodology
- Risks around noisy critique and LLM-generated rationales
- Your updated framing of the problem

Only after user confirms your post-research framing should you propose the Training Data Pipeline.

## The Problem You're Solving

No large-scale corpus of structured design reasoning exists. What exists:
- **UICrit**: 3,059 critiques, 983 mobile UIs, 7 designers. Gold standard quality but tiny, mobile-only, static single screens.
- **RICO**: 66k mobile UI screenshots with view hierarchies. No reasoning, just structure.
- **AVA**: 255k images with aesthetic ratings. Photography, not UI. No verbal rationale.
- **YouTube design process videos**: Massive quantity of narrated design reasoning, completely unstructured.
- **A/B test logs**: Highest-signal data (design → behavioral outcome). Entirely proprietary.
- **Behance/Dribbble case studies**: Medium signal, unstructured, needs cleaning.

The opportunity: **YouTube design process videos are narrated design reasoning in exactly the format needed for training data**, if you can extract, align, filter, and structure the signal. The HowTo100M methodology (ASR → transcript → alignment to video frames) is proven and directly applicable.

But there's a critical validation problem: how do you verify the quality of extracted reasoning? Not every designer's critique is good critique. Not every sentence in a video is a reasoning signal.

## What You Must Read Before Starting

**Core research (required):**
- `.building/knowledge-bundles/ai-design-thinking/knowledge-bundle.md` — read sections 2.4 (data sources ranked), 2.8 (YouTubers as process signal), 5 (frontier questions — FQ4 on YouTube extraction, FQ6 on counterfactual critique), and 7 (suggested next actions).
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/04-training-data-sources.md` — THIS IS YOUR PRIMARY FILE for data sources. Contains the full ranked list, discussion of each data type, and the recommended roadmap. Covers UICrit, RICO, AVA, HowTo100M, and the feasibility of YouTube/portfolio/podcast data.

**Research on what structured data looks like:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/02-uicrit-and-design-rationale-systems.md` — the full UICrit deep dive. Read the schema details, critique collection methodology, limitations, and "Potential for Extension" section. Also covers the historical design rationale systems (IBIS, QOC) and how their schemas map to LLM training pipeline needs. The "Mapping Schemas to LLM Training Needs" section is critical.
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/03-process-supervision-multimodal.md` — covers process supervision, training data structure, and what a complete training instance looks like. Read "Defining Design Process Supervision" section for the labeling process, step correctness criteria, and training data structure.

**Research on the YouTube sources specifically:**
- `research/design-process-youtubers.md` — the full list of design process YouTubers with links, formats, and signal types. Key targets: DesignCourse (Gary Simon) for live UI refactoring, The Futur (Chris Do) for Logo Design Therapy, Will Paterson for logo critique, Relume Design League for competitive live design.

**Potentially useful:**
- `.building/knowledge-bundles/ai-design-thinking/cycle-1/05-design-critique-signal.md` — the structure of critique (argumentation primitives, evaluation dimensions). This defines what you're trying to extract from the videos.
- `.building/knowledge-bundles/ai-design-thinking/cycle-2/01-mismatch-signal-and-reasoning-architectures.md` — read the "Training Approaches for LLM Reasoning" section for what training data needs to look like for each approach (Constitutional AI, PRM, DPO, rationale-first SFT).

## What We've Already Established

From our discussion:

1. **Track B (YouTube extraction) is the primary path.** The pipeline:
   - Download audio from target videos
   - Run ASR with timestamps (Whisper or equivalent)
   - Segment into sentences
   - Filter for reasoning-signal sentences (patterns: "because", "the problem here is", "this works because", "I would change", "what's happening is", "the hierarchy says", "the reason I'm doing this")
   - Pull video frames at those timestamps
   - Pair: `(frame_screenshot, reasoning_text, timestamp, source_video, creator)`
   - Manually validate 50-100 samples before scaling

2. **Track C (synthetic rationale) depends on the Design Constitution/Reasoning Framework.** Take UICrit screenshots, prompt an LLM with the framework + screenshot + human critique, generate a full reasoning chain: identify element → cite principle → state evidence → propose fix → predict user impact. Then human-validate. This is the fastest path but can't start until the Reasoning Framework exists.

3. **Counterfactual pairs (before/after) are the highest-value data type.** Gary Simon's "Brutally Honest UI/UX Reviews" literally show: bad design → narrated critique → live refactor → better design. This is the exact before/after/critique/outcome structure needed for training.

4. **Validation problem:** Not every critique is correct. Gary Simon's aesthetic judgments are one designer's perspective. The *reasoning pattern* ("I see X, the principle says Y, therefore Z should change") is the signal, not whether the specific aesthetic choice is universally correct.

5. **We're NOT building a dataset for publication.** This is a practical training corpus for our system. Pragmatism over academic rigor. But the quality floor must be high enough that the reasoning patterns it teaches are genuinely expert-level, not cargo-cult design.

## What You Need To Produce

1. **Extraction pipeline specification** — detailed technical design for the YouTube → structured reasoning data pipeline:
   - Audio/video download approach
   - ASR system selection and configuration
   - Sentence segmentation strategy
   - Reasoning-signal filtering (patterns, keywords, classifiers)
   - Frame extraction and alignment
   - Pairing format and storage schema
   - Quality control at each stage

2. **Source prioritization** — which creators/videos to start with, why, and in what order. Consider:
   - Signal density (what % of content is design reasoning vs. filler?)
   - Critique format (live refactoring > tutorial > talking head)
   - Domain relevance (UI/UX web design > logo design for our purposes)
   - Before/after availability (refactoring videos > review-only videos)

3. **Before/after extraction protocol** — specifically for counterfactual pair creation from refactoring videos. How to identify the "before" state, the critique, and the "after" state within a single video. What the pairing format looks like.

4. **Synthetic rationale specification (Track C)** — the exact prompt structure, what inputs it needs (screenshot + framework + existing critique), what output format, and how to validate. Include the dependency on the Design Reasoning Framework.

5. **Validation framework** — how to assess whether extracted/generated reasoning data is good enough. Quality dimensions, validation process, sample sizes needed, inter-rater agreement approach.

6. **Data schema** — the structured format for all training data, unified across tracks. What fields are required, optional, and computed. How the data connects to the Intent Schema and Design Reasoning Framework.

## How To Report Back

Present:
- Your understanding of the data bottleneck and why it's the real constraint
- The extraction pipeline specification
- Your source prioritization with reasoning
- The before/after extraction protocol
- The synthetic rationale specification
- The validation framework
- The unified data schema
- Open questions and dependencies on other agents' work
- A realistic assessment of what this pipeline can produce (how much data, at what quality, in what timeframe)
