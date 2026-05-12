# Gap Analysis — Cycle 1
## Topic: Teaching AI the Design Thinking Process

---

## What Cycle 1 Covered Well

1. **Design cognition mechanisms** (q1): Co-evolution, dialectics of sketching, abductive reasoning, mismatch signals, satisficing — solid grounding in the actual cognitive acts.
2. **Expert-novice differences** (q2): Problem framing vs. solution-jumping, chunking, abstracted precedent use, reflection-in-action, disciplined iteration — well evidenced.
3. **AI design attempts landscape** (q3): Clear taxonomy of what's been tried (pattern generation, sketch-to-code, heuristic scoring, UICrit, layout transformers). Confirmed the core gap: no system reasons about *why*, only *what*.
4. **Training data sources** (q4): Excellent ranked list. UICrit and RICO confirmed as gold standard. YouTube/portfolio as weak supervision confirmed feasible via ASR alignment. A/B data confirmed as highest-signal but proprietary.
5. **Design critique as signal** (q5): Strong schema proposed (metadata + element links + argumentation frames + evaluation tags + iteration trace). Confirmed critique encodes transferable reasoning structure.
6. **Tacit knowledge formalization** (q6): Clear formalizable/resistant split. Confirms: pattern recognition, rationale fragments, explicit methods → formalizable. Reflection-in-action, aesthetic judgment, socialized norms → resistant.

---

## Gap Classification

### KNOWLEDGE Gaps (answerable by research — fill in cycle 2)

**K1 — HIGH PRIORITY: The "mismatch signal" mechanism and how to replicate it**
Cycle 1 established that expert designers have a pre-verbal "something is wrong" signal before they can articulate why. This is the most critical gap for AI design thinking — it's the signature of genuine design judgment vs. rule application. What is this mechanism precisely? Is it purely pattern recognition mismatch, or does it involve aesthetic affect? Has anyone attempted to model it computationally? This needs a dedicated drill.

**K2 — HIGH PRIORITY: Concrete architectures for encoding design reasoning in LLMs**
Cycle 3 surfaced UICrit and reward modeling, but didn't go deep on *how* to fine-tune an LLM to reason about design decisions rather than generate design outputs. What does a training pipeline that encodes design reasoning actually look like? Chain-of-thought on design rationale? Constitutional AI applied to design principles? RLHF with designer preference? Process supervision (training on reasoning steps, not just outputs)?

**K3 — HIGH PRIORITY: The UICrit dataset in depth**
UICrit came up as the gold standard (3,059 critiques, bounding boxes, 7+ professional designers). But cycle 1 only skimmed it. What exactly is its schema? What design dimensions does it cover? What are its known gaps and limitations? Can it be extended? Is there follow-on work building on it?

**K4 — HIGH: Design rationale capture systems (IBIS, QOC, DRed, DKSN)**
Cycle 6 mentioned these by name but didn't go deep. These are attempts to externalize design reasoning into structured knowledge graphs. What have they produced? Did they work in practice? What did they fail to capture? Could these schemas inform how we structure training data or prompts for AI design reasoning?

**K5 — MEDIUM: Process supervision and chain-of-thought for design**
OpenAI's process supervision (training on reasoning steps) and chain-of-thought prompting have transformed math reasoning in LLMs. Has anyone applied this pattern to design? Is there research on "design chain-of-thought" — asking models to reason step-by-step about design decisions before outputting? What would the training signal look like?

**K6 — MEDIUM: What design education has actually proven works**
Cycle 6 mentioned design schools but didn't go deep. What specific pedagogical techniques transfer explicitly vs. only through practice? Bauhaus foundational exercises, Yale graphic design curriculum, Cranbrook approach — what do these teach and how? This matters because: if we can't teach humans design thinking through text/rules alone, that tells us something about what AI will also struggle with.

**K7 — MEDIUM: Multimodal alignment — linking verbal reasoning to visual elements**
Cycle 5 proposed linking critique utterances to bounding boxes/Figma layer IDs. Has this been implemented? What are the technical challenges? How does this connect to current vision-language model capabilities (GPT-4V, Gemini Vision, Claude vision)? This is the key technical bridge between design reasoning as text and design reasoning grounded in visual artifacts.

**K8 — LOW-MEDIUM: What "design intent" means computationally**
Several cycles mentioned "design intent" as the key missing ingredient but didn't define it precisely. What does design intent mean as a computable construct? Goal of the design? Target audience model? Brand voice? Hierarchy of priorities? Is there any formal definition in the design rationale literature?

---

### USER Gaps (deferred — logged for section 6 of final bundle)

**U1 — Scope of "design" for this project**
The research covers UI/UX, graphic, brand, architecture. Which is the primary domain? The UI skill context suggests UI/UX and web design. Does this narrow the training data and architecture choices?

**U2 — Build vs. encode question**
Is the goal to: (a) build a new fine-tuned model, (b) encode reasoning into a prompt/skill/system prompt that guides an existing LLM, or (c) build a training data pipeline that others could use? This changes which gaps matter most.

**U3 — The "YouTubers who design live" connection**
The original question was about YouTube process videos as signal. The research confirmed this is feasible (weak supervision via ASR). Which specific YouTubers/channels are the right signal sources? This connects to the separate research query running in parallel.

---

### DEAD Gaps (prototyping only — noted, not pursued)

**D1 — Does a design-reasoning prompt actually perform better?**
Only testable by building it and evaluating output quality against the current UI skill. Research can inform the architecture but not validate it.

**D2 — Annotation quality thresholds**
Whether 3,059 UICrit examples is enough for meaningful fine-tuning depends on the task — only empirical testing resolves this.

---

## Decision Recommendation

**DRILL** — Run cycle 2 at `pro` tier on 3 highest-priority gaps:

1. **K1 + K2 combined**: The mismatch signal mechanism + concrete LLM architectures for design reasoning (these are linked — what the signal IS determines how to model it)
2. **K3 + K4 combined**: UICrit deep-dive + design rationale systems (IBIS/QOC/DRed) — what structured design reasoning data actually exists
3. **K5 + K7 combined**: Process supervision for design + multimodal alignment of reasoning to visual elements

Cycle 2 will determine whether we have enough to synthesize or need a cycle 3 on K6 (design education pedagogy) or K8 (design intent as computable construct).
