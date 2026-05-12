---
query: "How have reasoning scaffolds, structured thinking protocols, and principle-based prompts been concretely implemented for LLMs performing design evaluation, code review, and creative critique tasks? Research (2023-2025) on: (1) Concrete prompt architectures that encode multi-step reasoning for evaluation and critique — not just 'use CoT' but actual prompt templates showing how reasoning patterns are structured. Examples from code review agents, design critique systems, UI evaluation, and creative writing critique. (2) How Constitutional AI critique prompts are structured — what does a principle look like when used as a reasoning prompt vs a rule? Show the difference between 'never use offensive language' (rule) and 'consider whether this response could cause harm to any group' (reasoning principle). How Anthropic and others structure constitutional principles. (3) Self-Refine applied to design or visual tasks — has anyone implemented the generate→critique→refine loop specifically for design decisions or visual evaluation? What worked? (4) Multi-criteria reasoning prompts — how do systems that must evaluate across multiple dimensions (usability + aesthetics + accessibility + brand) structure their prompts to avoid collapsing to one dimension? (5) The difference between prompts that produce compliant output vs prompts that produce reasoned output — empirical evidence on how instruction format affects reasoning quality. (6) Examples of 'reasoning pattern libraries' — collections of thinking scaffolds used in AI systems for complex judgment tasks. Output: concrete, reusable prompt architecture patterns for design reasoning, with examples."
processor: pro
run_id: trun_6b0c617b26214cd7be4650e26acf7e88
created_at: 2026-05-05T03:45:17.688638Z
retrieved_at: 2026-05-05T03:57:02Z
---

# Research: How have reasoning scaffolds, structured thinking protocols, and principle-based prompts been concretely implemented for LLMs performing design evaluation, code review, and creative critique tasks? Research (2023-2025) on: (1) Concrete prompt architectures that encode multi-step reasoning for evaluation and critique — not just 'use CoT' but actual prompt templates showing how reasoning patterns are structured. Examples from code review agents, design critique systems, UI evaluation, and creative writing critique. (2) How Constitutional AI critique prompts are structured — what does a principle look like when used as a reasoning prompt vs a rule? Show the difference between 'never use offensive language' (rule) and 'consider whether this response could cause harm to any group' (reasoning principle). How Anthropic and others structure constitutional principles. (3) Self-Refine applied to design or visual tasks — has anyone implemented the generate→critique→refine loop specifically for design decisions or visual evaluation? What worked? (4) Multi-criteria reasoning prompts — how do systems that must evaluate across multiple dimensions (usability + aesthetics + accessibility + brand) structure their prompts to avoid collapsing to one dimension? (5) The difference between prompts that produce compliant output vs prompts that produce reasoned output — empirical evidence on how instruction format affects reasoning quality. (6) Examples of 'reasoning pattern libraries' — collections of thinking scaffolds used in AI systems for complex judgment tasks. Output: concrete, reusable prompt architecture patterns for design reasoning, with examples.

## Findings

### Executive Summary

Based on research from 2023-2025, reasoning scaffolds, structured thinking protocols, and principle-based prompts have been concretely implemented to enhance LLM performance in design evaluation, code review, and creative critique. The key finding is that multi-step, structured critique prompts significantly outperform generic 'give feedback' requests. High-performing systems ground their reasoning in explicit heuristics or principles, separate the process into distinct stages like detection and remediation, enforce structured outputs such as JSON, and use multi-criteria rubrics to prevent the evaluation from collapsing into a single dimension. For instance, a 'Detect→Rewrite' architecture is used in UI evaluation to first identify violations based on a JSON layout and then rephrase them as constructive advice. For multi-criteria tasks (e.g., usability, aesthetics, accessibility), explicit rubrics with definitions and per-criterion scoring are crucial; their removal leads to fewer and less helpful findings. Principle-based 'constitutional' prompts are most effective when framed as comparative reasoning instructions (e.g., 'choose the response that is most X') rather than as hard prohibitions, serving as evaluative lenses. The Self-Refine (generate→critique→refine) loop has been adapted for design critique by separating stages and incorporating user feedback, proving effective for early-pass issue detection but showing diminishing returns on high-quality designs without richer, multimodal context. Finally, instruction formatting is critical; prompts that require Chain-of-Thought reasoning combined with form-filling (like in G-Eval) demonstrate higher alignment with human judgments than unstructured prompts, confirming that the prompt's structure directly influences the quality of the LLM's reasoning.

### Reusable Prompt Architecture Patterns

| Pattern Name | Domain | Description | Prompt Structure | Source Reference |
| --- | --- | --- | --- | --- |
| Heuristic-anchored Two-Pass Critique (Detect→Advice) | Design/UI Critique, Creative Critique | Used for evaluating a UI or creative draft against known heuristics or guidelines. It separates the process into two distinct passes: first detecting violations, and then rephrasing them into constructive, user-facing advice. | A two-pass process. Pass 1 (Detection): The system prompt assigns the LLM the role of a 'UI Heuristic Evaluator' with specific constraints (e.g., 'avoid center-alignment errors on unequal boxes'). The user provides the UI artifact (e.g., in JSON format) and the text of the heuristics. The output is a machine-parseable list of violations. Pass 2 (Advice): The system prompt changes the role to 'Design Coach' to transform the detected violations into constructive feedback, often following a framework like Sadler-style (standard, gap, fix). The input for this pass is the list of violations from Pass 1. The output is a list of actionable advice with priorities. | Duan et al., CHI 2024 |
| Rubric-Guided Judge with Per-Aspect CoT | Multi-criteria Scoring, Design Critique, General NLG Evaluation | Used when multi-criteria scoring and actionable comments are required. This pattern constrains the LLM's reasoning to explicit aspects using a combination of Chain-of-Thought (CoT) for reasoning and a form-filling paradigm for structured output. | The system prompt instructs the LLM to act as an evaluator. It must 'think step-by-step' (CoT) for each evaluation aspect but only output the final completed rubric. The prompt defines the rubric, including aspects (e.g., Consistency, Visual Hierarchy), definitions, and the required output fields for each aspect, such as a score (e.g., 1-5), a rationale, evidence references, and concrete suggestions. The final output is typically a structured JSON object. | Liu et al., EMNLP 2023 (G-Eval) |
| Multi-Agent Critic Ensemble | Code Review, Design Critique | Used to prevent 'dimension collapse,' where an LLM focuses on only one type of issue (e.g., alignment). It avoids this by separating concerns and assigning different evaluation criteria to a set of parallel, specialized critic agents. | Instantiate multiple critic agents, each with a specific, scoped role. For code review, this could be a SecurityCritic, PerformanceCritic, and ReadabilityCritic. For design, it might be a UsabilityCritic, AestheticsCritic, and AccessibilityCritic. Each agent produces structured notes on its specific domain. A final 'Arbiter' agent then consolidates the feedback, resolves conflicts, deduplicates issues, and provides traceable citations back to the source artifact. | Open-source PR reviewers (e.g., PR-Agent), Duan et al., CHI 2024 (conceptual basis) |
| Constitutional Critique-and-Revise | Sensitive Content Generation, Creative Writing, General AI Safety | Used in sensitive domains or when the tone and potential for harm are primary concerns. It guides the critique and revision process based on a set of core principles rather than hard rules. | The system prompt instructs the model to critique and revise a draft based on a list of principles. For each principle, the model performs a multi-step evaluation: 1) Assess the draft against the principle, 2) Propose a revision that better satisfies it, and 3) Note any trade-offs with other principles. The principles are phrased as comparative instructions (e.g., 'Choose the response that is most X...') rather than absolute prohibitions ('Never do Y...'). The final output is a consolidated revised draft with an explanation of any trade-offs. | Anthropic (Claude's Constitution), Collective Constitutional AI (Jun 2024) |
| Self-Refine Critique Loop with Stop Conditions | Code Optimization, Design Critique, General Iterative Improvement | Used when iterative improvement of an output is desired. The model generates an output, critiques its own work against a set of criteria, and then refines the output based on that critique. | An iterative loop of Generate → Critique → Refine. For a design task, this could be: 1) Generate a structured critique of a design. 2) Self-critique the generated feedback for specificity, evidence, and potential false positives. 3) Refine the critique and produce a prioritized list of fixes. The loop includes explicit stop conditions, such as diminishing returns (e.g., fewer than two new high-priority issues found) or reaching a maximum number of iterations. User dismissals of feedback can be cached and fed back into subsequent rounds as negative examples. | Madaan et al., 2023 (Self-Refine), Duan et al., CHI 2024 (adaptation for design) |
| Checklist with Counterexamples | Design/UI Critique, Creative Writing | Used to increase the precision of feedback and reduce the number of false positives that arise from an over-literal application of guidelines. It provides the model with concrete counterexamples to help it understand nuances. | The prompt includes a per-guideline mini-checklist. This checklist contains both positive examples ('Do flag when...') and negative examples ('Don't flag when...'). Crucially, it includes 2-3 concrete counterexamples for each 'Don't flag' case to illustrate situations where a rule might seem to apply but shouldn't. | Duan et al., CHI 2024 |
| Evidence-First Comments | Code Review, Design Critique, Factual Reporting | Used to demand precision and ensure that all feedback is grounded in concrete details of the artifact being reviewed. | The prompt structure enforces a strict order of operations: the model must first cite specific elements (e.g., UI node IDs, code line numbers, or direct quotes) before it is allowed to write any judgment or critique. The prompt specifies that any comments lacking this direct evidence should be discarded. This forces the output to be directly and verifiably tied to the source material. | Implicit in G-Eval ('evidence quotes') and Duan et al. ('evidence_from_json') |
| Aggregation Rules in the Prompt | Design Evaluation, Multi-criteria Decision Making | Used when a model must balance trade-offs between multiple evaluation criteria to arrive at a single overall score or decision. | The prompt includes an explicit, transparent rule for aggregating scores from multiple criteria. This can be a weighted mean (e.g., 'Overall Score = weighted mean with weights {A:0.4, B:0.4, C:0.2}'), a Pareto optimization logic, or another clear decision framework. The prompt also requires the model to explicitly note any trade-offs or conflicts, especially if any single aspect scores below a predefined threshold. | UICrit (2024), G-Eval (conceptual basis) |

### Multi Step Reasoning Prompt Architectures

- Two-pass Detect→Rewrite Architecture (Design/UI): This architecture separates evaluation into two distinct steps. Step 1 (Detection): The LLM acts as a heuristic evaluator, taking a JSON representation of a UI and a set of heuristic definitions as input. It identifies and outputs a machine-parseable list of specific violations, grounded in the provided data. Step 2 (Rephrase to Advice): A second prompt instructs the LLM to act as a 'Design Coach,' taking the list of violations as input and converting each one into constructive, human-readable feedback, often using a framework like Sadler-style (standard, gap, actionable fix). This separation was found to improve both the formatting and completeness of the output compared to a single-call prompt.
- G-Eval's Chain-of-Thought + Form-Filling Architecture: This multi-step process is used for nuanced evaluation. For each criterion in a rubric, the LLM is prompted to first perform a private Chain-of-Thought (CoT) reasoning step to analyze the content. Following this internal reasoning, it then completes the second step of filling out a structured form or rubric. This form requires specific outputs like a numerical score, quotes as evidence, and an actionable comment for that single criterion. The process is repeated for all criteria, ensuring each is evaluated with dedicated reasoning before the final structured output is assembled.
- Self-Refine Iterative Loop (INIT→FEEDBACK→REFINE): This architecture encodes reasoning as an iterative improvement cycle. Step 1 (INIT/GENERATE): The LLM produces an initial output (e.g., a piece of code or a design critique). Step 2 (FEEDBACK): The LLM is prompted to critique its own output against specified criteria (e.g., code readability, feedback specificity), generating a list of flaws or potential improvements. Step 3 (REFINE): The LLM receives the original output and its own feedback, and is prompted to generate a revised version that addresses the critiques. This loop can be repeated multiple times, with stop conditions to prevent infinite cycles, and can be enhanced by incorporating user dismissals as negative examples for the next iteration.
- Multi-Agent Review with Arbiter Consolidation: This architecture uses parallel reasoning steps to avoid dimension collapse. Step 1 (Parallel Critique): Multiple specialized LLM agents are instantiated, each with a narrow role (e.g., Security Critic, Performance Critic, Readability Critic). Each agent reviews the artifact (e.g., a code pull request) concurrently and produces a structured list of issues relevant only to its domain. Step 2 (Arbitration): A final 'Arbiter' agent takes the outputs from all critics as input. It then performs a consolidation step, which involves merging the feedback, deduplicating redundant issues, resolving conflicts between different critics' suggestions, and ordering the final list of feedback by severity.
- Constitutional Critique-and-Revise Process: This architecture structures reasoning around a set of ethical or stylistic principles. For a given draft response, the process is: Step 1 (Evaluate): The LLM assesses the draft against a specific principle (e.g., 'Choose the response that is most harmless'). Step 2 (Propose Revision): Based on the evaluation, it proposes a revised version that better aligns with that principle. Step 3 (Note Trade-offs): The LLM identifies and notes any value conflicts or trade-offs the revision creates with other principles. This multi-step evaluation is performed for each principle in the 'constitution' before a final, consolidated draft is produced.

### Code Review Agent Prompts

| Tool Name | Prompt Command | Purpose | Prompt Template |
| --- | --- | --- | --- |
| Multi-Agent Code Review System (Conceptual) | /review_by_role | To conduct a comprehensive code review by separating concerns into different agent roles, preventing dimension collapse and ensuring specialized feedback. | [System (Arbiter)]: You are an arbiter agent. Your task is to merge notes from multiple critic agents, deduplicate findings, order them by severity, and output a final, consolidated review with references to inline comments. [User]: Here are the reviews from the critics for the given code patch: {SecurityCritic_output}, {ReadabilityCritic_output}, {PerformanceCritic_output}. Please consolidate them.   ---  [System (SecurityCritic)]: You are a Security Critic. Review the provided code patch *only* for security vulnerabilities (e.g., injection flaws, XSS, insecure data handling). Cite the specific file and line number for each issue. Your output must be a JSON object with fields: {issue, severity, evidence, recommendation, diff_patch?}.   ---  [System (ReadabilityCritic)]: You are a Readability Critic. Review the code for naming conventions, complexity, comments, and dead code. Avoid stylistic bikeshedding. Propose minimal, non-breaking diffs for improvements. Cite file and line numbers. |
| CodiumAI PR-Agent | /review | To automatically review a pull request, providing feedback on code quality, suggesting improvements, and adhering to project conventions. | You are a code review assistant. Your role is to analyze the provided code diff and context. You must adhere to the following instructions: 1. Stay within existing formatting and directory conventions—avoid mass refactors. 2. You must cite the specific lines of code your feedback pertains to. 3. Propose minimal, safe diffs for your suggestions. 4. Your review should cover aspects like potential bugs, code simplification, performance issues, and adherence to best practices. Your output should be structured as inline comments on the pull request. |
| Self-Refine for Code Readability | N/A (Iterative Process) | To iteratively improve the readability of a piece of code using a model's self-generated feedback. | This is an iterative process with two main prompts:  1. **FEEDBACK Prompt**: [System] You are a code quality analyst. Your task is to provide feedback on the readability of the following code. Identify areas with unclear naming, high complexity, or poor commenting. Be specific and constructive. [User] {code_snippet}  2. **REFINE Prompt**: [System] You are a senior software engineer. You have been given a piece of code and feedback on its readability. Your task is to rewrite the code to apply the suggested improvements. [User] Original Code: {code_snippet} Feedback: {feedback_from_previous_step} |

### Design And Ui Evaluation Prompts

| Framework | Evaluation Criteria | Prompt Chain Structure | Input Data Format |
| --- | --- | --- | --- |
| Heuristic Evaluation based on Duan et al. (2024) | Violations of known design heuristics (e.g., Nielsen's 10, CrowdCrit visual principles, semantic grouping guidelines). | A two-pass chain:  1. **Detection Pass**: The LLM is prompted to act as a UI heuristic evaluator. It receives the UI layout as JSON and the text of the heuristics. It must identify concrete violations grounded in the JSON and output a machine-parseable list of these violations, including the guideline, location, and evidence. The prompt includes negative constraints, such as 'do not infer center-alignment on unequal-size boxes'. 2. **Advice Pass**: A second LLM call takes the list of violations from the first pass. It is prompted to act as a 'Design Coach' and transform each violation into constructive, actionable feedback following the Sadler-style model (stating the standard, the gap, and a suggested fix). | JSON representation of a single-screen mobile UI layout, including element IDs, bounding boxes, and text content. This is accompanied by the full text of the design heuristics to be applied. |
| G-Eval (Liu et al., 2023) adapted for Design Critique | A multi-criteria rubric including aspects such as: Aesthetics, Usability (broken down into Learnability and Efficiency), Accessibility (contrast, touch targets), and Brand Coherence. | A single, structured prompt that uses a 'Chain-of-Thought + Form-Filling' paradigm. The system prompt instructs the LLM to act as an evaluator, think step-by-step about each criterion, but only output the final, completed rubric in a specified JSON format. For each aspect, the model must provide a score (e.g., 1-5), a rationale citing evidence from the UI, and actionable suggestions. A final aggregation rule (e.g., a weighted mean) is often included in the prompt to calculate an overall score. | UI representation (e.g., JSON, description) and a detailed rubric defining each evaluation aspect, its factors, and the scoring scale. |
| Self-Refine for Design Critique (adapted from Madaan et al., 2023) | Iteratively improved design feedback based on specificity, evidence, and avoidance of false positives. | An iterative loop:  1. **Generate**: Produce an initial design critique based on a rubric.  2. **Critique (Self-Feedback)**: The model evaluates its own generated critique, checking each point for specificity, quality of evidence, and potential false positives. It marks notes to keep or discard with reasons. User dismissals of previous suggestions can be fed in here as negative examples.  3. **Refine**: The model produces an improved, prioritized list of critiques and concrete fix suggestions. The loop continues until a stop condition is met (e.g., diminishing returns, max rounds reached). | UI representation (e.g., JSON) and a history of previous critiques, refinements, and user feedback (dismissals). |

### Creative Critique Prompts

- A 'Peer Review Emulation' prompt structure that guides the LLM to generate a multi-faceted critique by requesting specific sections, such as: 1) Summary of the work, 2) Strengths, 3) Weaknesses, 4) Actionable Suggestions for improvement, 5) An optional Ethics & Harm Check, and 6) An Overall score (e.g., 1-5) with a detailed justification. This is adapted from LLM paper review simulations.
- A 'Critique Checklist with Negative Examples' prompt that refines feedback precision. This involves providing the LLM with per-guideline mini-checklists that include both positive examples ('Do flag when...') and negative counterexamples ('Don't flag when...'). For creative writing, an example is: 'Do not nitpick synonyms unless the tone is significantly affected.'
- A 'Constitutional Critique-and-Revise' prompt that uses comparative principles to guide feedback, especially on tone and potential harm. Instead of a hard rule like 'Never be offensive,' the prompt uses a reasoning principle like: 'Choose the response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, or obnoxious.' The LLM is tasked to critique a draft against a set of these principles and propose revisions that better align with them.
- A 'Rubric-Guided Form-Filling' prompt (similar to G-Eval) where the LLM evaluates a creative work against a predefined rubric with aspects like 'Plot,' 'Character Development,' 'Pacing,' and 'Prose Style.' For each aspect, it must provide a score, a rationale with evidence (quotes), and suggestions, forcing a structured and multi-dimensional evaluation.

### Constitutional Ai Critique Prompts

**Methodology Overview:** The Constitutional AI (CAI) training process, as documented by Anthropic, involves multiple phases. In the first, a supervised learning phase, the model is trained to critique and revise its own responses based on a set of guiding principles, or a 'constitution'. This is achieved by prompting the model with a harmful query, generating an initial response, and then asking the model to critique its own response against principles and rewrite it. This generates a dataset of self-critiqued and revised responses. This is followed by a reinforcement learning phase where preference comparisons are used. The model is shown pairs of responses and asked to choose the one that better aligns with the constitution, using principles formatted as comparative instructions (e.g., 'Choose the response that is more X'). This preference data is used to train a preference model, which in turn is used to fine-tune the AI model via reinforcement learning from AI feedback (RLAIF).

**Critique Prompt Structure:** A prompt designed to elicit a critique based on a constitutional principle is structured as a multi-step evaluation. The model is instructed to act as a critic and systematically assess a draft response against a list of principles. A reusable scaffold for this process is provided: '[System] You will critique and revise the assistant’s draft based on the following principles. For each principle P: - Step 1: Evaluate the draft against P. Record potential risks or value conflicts.' This step forces the model to explicitly reason about how the draft aligns or misaligns with a specific principle, such as harmlessness, privacy, or non-judgmental tone, before any revision is attempted. The output for this step is an assessment of risks or value conflicts related to the principle.

**Revision Prompt Structure:** Following the critique, the revision prompt asks the model to act on its own analysis. The structure is a direct continuation of the critique prompt: '- Step 2: Propose a revision that better satisfies P while preserving helpfulness. - Step 3: Note trade-offs with other principles, if any.' After iterating through each principle, the model is tasked with creating a final, improved version: 'Then provide a consolidated revised draft.' This structure ensures that the revision is not just a generic improvement but a targeted modification directly informed by the critique against specific constitutional principles. The prompt also encourages awareness of competing values by asking for explicit notes on trade-offs.

**Example Principle:** A concrete example of a constitutional principle, as used by Anthropic, is for harmlessness. It is phrased as a comparative instruction rather than a hard rule: 'Please choose the response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage illegal, violent, or unethical behavior. Above all the assistant’s response should be wise, peaceful, and ethical.' This contrasts with a simple rule like 'Never use offensive language.' The principle-based approach guides the model in a reasoning process to select the 'most' harmless option among possibilities, allowing it to handle nuanced situations and trade-offs, whereas a hard rule is a binary filter. This comparative format ('Choose the response that is more X') is key to how principles are operationalized for both critique and preference model training.


### Rule Vs Principle Based Prompts

**Rule Based Definition:** A rule-based prompt is a binary constraint that functions as a hard filter or prohibition. It dictates what an LLM must or must not do without providing guidance on how to handle trade-offs or nuanced situations.

**Rule Based Example:** Never include offensive language.

**Principle Based Definition:** A principle-based prompt is a comparative, evaluative instruction that guides the LLM's reasoning process. It encourages the model to select or revise responses by comparing options against a desired quality (e.g., harmlessness, clarity), functioning as a lens for critique and self-revision.

**Principle Based Example:** When comparing candidate critiques, choose the one least likely to cause harm or offense across diverse groups; prefer language that is respectful and specific. If feedback must mention sensitive content, frame it factually and constructively.


### Self Refine For Design And Visual Tasks

**Process Loop:** The Self-Refine process is an iterative loop designed to improve an initial output through self-generated feedback. The core loop, as defined by Madaan et al. (2023), consists of an optional INIT step to generate an initial output, followed by alternating between two generative steps: FEEDBACK, where the model critiques its own output against specified criteria, and REFINE, where the model revises the output based on the feedback it just generated. This loop can be repeated multiple times, with a stopping condition such as reaching a maximum number of iterations or when the improvement between iterations becomes negligible. For design tasks, a reusable scaffold describes this as a 'Generate -> Critique -> Refine' loop: first, generate a structured design critique; second, self-critique that critique for specificity and evidence; and third, refine the critique and create a prioritized fix list. The loop stops when incremental helpfulness falls below a threshold.

**Feedback Prompt Structure:** The feedback prompt instructs the model to act as a critic of its own previous output. For example, in a code readability task, the FEEDBACK prompt asks the model to 'provide feedback on readability' for a given piece of code. In the context of design, the critique step in the loop involves evaluating its own generated notes for 'specificity, evidence, and potential false positives; mark keep/discard with reasons.' This step is crucial as it forces the model to apply a quality standard to its own reasoning before attempting to refine the final output. The feedback is typically a free-text critique but is guided by the overall task criteria.

**Refine Prompt Structure:** The refine prompt takes the original output and the generated feedback as input and instructs the model to produce an improved version. For a code task, the REFINE prompt would be given the original code and the readability feedback, and asked to apply the edits. For a design critique task, the refine step is to 'Produce an improved critique and a prioritized fix list with concrete UI actions (what to change, where, by how much).' This makes the output more actionable and directly applies the insights from the self-critique step.

**Application To Visual Tasks:** The Self-Refine loop has been adapted for design and UI evaluation tasks, primarily using text-based representations of the UI like JSON. Research by Duan et al. (CHI'24) operationalizes this as a two-call chain: one call to generate a critique (detecting violations), and a second to refine it into constructive advice. This is akin to a single generate-critique-refine cycle. The process is enhanced by feeding user dismissals of bad suggestions back into the system as negative examples for subsequent rounds, and by having the model reflect on its mistakes, which has been shown to improve performance. Key findings indicate this approach is effective for identifying subtle issues in early or low-quality designs. However, its value diminishes as designs improve, suggesting that without richer context (like screenshots or multimodal inputs), the model struggles to provide meaningful feedback on high-quality work. The reliance on JSON-only input limits its ability to make nuanced visual judgments.


### Multi Criteria Reasoning Prompts

**Methodology:** The primary methodologies identified for prompting LLMs to perform multi-criteria evaluation are Rubric-based evaluation and G-Eval. Rubric-based evaluation, as seen in systems like UICrit, involves providing the LLM with an explicit rubric that breaks down a high-level concept like 'design quality' into multiple dimensions (e.g., aesthetics, usability) and sub-dimensions (e.g., learnability, efficiency). G-Eval is a specific framework that combines rubric-based evaluation with a Chain-of-Thought (CoT) and form-filling paradigm to improve alignment with human judgments.

**Prompt Structure:** To avoid collapsing evaluation to a single dimension, prompts are structured around an explicit, detailed rubric. This rubric is included directly in the prompt and defines each evaluation criterion. For each criterion, the prompt specifies what needs to be outputted. A reusable template for design evaluation shows this structure: '[System] Role: Design Rater. Evaluate the UI on these dimensions: Aesthetics, Usability (Learnability, Efficiency), Accessibility (contrast, touch targets, alt text), Brand Coherence. For each dimension: (a) definition; (b) factors checklist; (c) 1–5 rating with rationale citing elements; (d) actionable suggestions.' This forces the model to address each dimension separately and provide evidence-based reasoning for each, preventing it from focusing on a single issue type. Ablation studies show that removing the rubric leads to fewer and less helpful findings.

**Chain Of Thought Integration:** Chain-of-Thought (CoT) reasoning is integrated to ensure the model follows a structured thought process for each criterion before arriving at a score. The G-Eval framework explicitly uses this by instructing the model: 'You are an evaluator. Think step-by-step but only output the completed rubric.' This means the model first generates a rationale for a specific aspect (e.g., 'Visual hierarchy') and then uses that reasoning to determine a score and provide suggestions. This prevents the model from simply outputting a score without justification and has been shown to increase alignment with human judgments compared to naive LLM evaluation.

**Scoring Mechanism:** After evaluating each criterion individually, a final score is generated using a predefined aggregation rule that is often specified in the prompt itself. This makes the final judgment transparent and controllable. The prompt might instruct the model to calculate a weighted mean of the per-aspect scores. For example, a template specifies: 'After all aspects: Overall score = weighted mean (0.25,0.2,0.2,0.2,0.15).' The prompt can also require the model to explicitly report on trade-offs and conflicts between different criteria, providing a more nuanced final verdict than a single aggregated number.


### Compliant Vs Reasoned Output Analysis

Empirical evidence from research between 2023 and 2024 demonstrates that the format of a prompt significantly impacts whether a Large Language Model (LLM) produces a merely compliant output versus a genuinely reasoned one. Studies show that structured, decomposed prompts consistently elicit higher-quality reasoning and more useful outputs. For example, research by Duan et al. (CHI 2024) on UI feedback generation conducted ablation studies comparing a 'Complete (Plugin)' prompt (using a two-pass chain with explicit heuristics) against a 'No Heuristics' prompt and a 'General UI Feedback' prompt. The results were stark: removing the explicit heuristics and rubric text dramatically reduced the number of helpful and diverse outputs. The 'General UI Feedback' prompt yielded the worst performance, with the LLM often collapsing its focus to a single issue type (like misalignment) and producing vague feedback. This indicates that while the LLM complies with the request for feedback, it doesn't engage in deep, multi-faceted reasoning without the scaffold. Similarly, the G-Eval framework (Liu et al., EMNLP 2023) found that instructing an LLM to evaluate text using a combination of Chain-of-Thought (CoT) and a form-filling paradigm significantly improved the correlation of its judgments with human evaluators. This suggests that the instruction format, which forces the model to think step-by-step and structure its output according to a predefined rubric, moves the model from simple compliance to a more structured and reliable reasoning process. The practical implication is that for complex evaluation and critique tasks, prompts should enforce a schema, require per-aspect rationales with evidence, and decompose the task, rather than asking for a generic, summary-only response.

### Reasoning Pattern Libraries Examples

- G-Eval Rubric Patterns: This is a widely reused library of patterns for tasks where an LLM acts as an evaluator ('LLM-as-a-judge'). It provides a framework for aspect-based evaluation that combines Chain-of-Thought (CoT) with a structured form-filling output. The patterns, available in the project's open-source repository, serve as a ready-made scaffold for creating detailed, multi-faceted evaluations.
- UI/Design Heuristic and Rubric Sets: These are collections of principles that serve as ready-made dimensions and checklists for design critique prompts. Examples include established sets like Nielsen's 10 Usability Heuristics, CrowdCrit visual principles, and semantic grouping guidelines. Research projects like UICrit also contribute to this by publishing their rubrics, which decompose design quality into specific, evaluable criteria like aesthetics, usability, learnability, and efficiency.
- Code Review Agent 'Skills' and Checklists: Open-source code review agents, such as those found on the GitHub Marketplace (e.g., PR-Agent), define their capabilities through a library of 'skills' or reviewer roles. Their documentation (e.g., AGENTS.md files) often contains explicit checklists and prompt patterns that function as a reasoning library. These include instructions like 'avoid mass refactors,' 'cite line numbers,' and 'keep suggestions minimal and safe,' which provide reusable scaffolds for generating consistent and helpful code reviews.
- Peer Review Emulation Templates: For creative and scholarly critique, standard academic peer review formats have been adapted into a library of prompt templates. These templates structure the LLM's output into conventional sections like 'Summary,' 'Strengths,' 'Weaknesses,' 'Actionable Suggestions,' and 'Overall Score with Justification.' Research on LLM-based paper review simulations has produced such templates, often shared in appendices, making them a reusable resource for complex critique tasks.

### Key Frameworks And Methods

| Name | Core Concept | Primary Use Case | Reference Paper |
| --- | --- | --- | --- |
| G-Eval | A framework that uses a Large Language Model (LLM) with Chain-of-Thought (CoT) reasoning and a form-filling paradigm. The LLM is prompted to think step-by-step to evaluate an output against a detailed rubric and then fill a structured form with scores, rationales, and evidence. | Natural Language Generation (NLG) evaluation. It is designed to improve the alignment of LLM-based evaluations with human judgments by structuring the evaluation process. | G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment (Liu et al., EMNLP 2023) |
| Self-Refine | An iterative algorithm where an LLM improves its own output. The process involves an initial generation (INIT), followed by a loop of generating feedback on the output against specific criteria (FEEDBACK) and then editing the output based on that feedback (REFINE). | Iteratively improving the quality of generated content. It has been demonstrated on tasks like code optimization, improving code readability, constrained text generation, dialogue, and math reasoning. Adaptations have been used for design critique. | Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023) |
| Constitutional AI (CAI) | A method for training an AI to align with a set of principles (a 'constitution'). During training, the model is prompted to critique and revise its own responses based on these principles, which are typically framed as short, comparative instructions (e.g., 'Choose the response that is more X'). | Aligning LLM behavior with desired ethical and safety standards, such as harmlessness, privacy, and avoiding toxic or biased language. It guides the model's trade-offs and tone. | Claude’s Constitution (Anthropic, May 2023) |
| Two-pass Detect→Rewrite | A prompt architecture that separates critique into two distinct steps. The first pass uses an LLM to detect specific violations of heuristics or guidelines in a given input (e.g., a UI layout), outputting a machine-parseable list. The second pass takes this list and uses an LLM to rephrase the technical violations into constructive, actionable advice for a user. | Generating automatic feedback for UI/UX design mockups. This separation improves the completeness, formatting, and specificity of both the violation detection and the final feedback. | Generating Automatic Feedback on UI Mockups with Large Language Models (Duan et al., CHI 2024) |
| Reflexion | A framework where an agent reflects on task feedback to build and refine its own internal memory of what went wrong. This 'self-reflection' is then used to improve performance on subsequent attempts. The process involves generating a reflection on why a failure occurred and adding this to the prompt context for the next trial. | Improving LLM performance through trial and error, particularly in tasks where learning from past mistakes is crucial. The provided context notes this technique was used to improve UI evaluation by reflecting on designer-dismissed suggestions. | The provided context alludes to this method ('This “self-reflection” has been shown to improve LLM performance') in the work of Duan et al., but does not name the original 'Reflexion' paper. |

### Influential Research And Papers

| Title | Authors | Publication Year | Key Contribution | Url |
| --- | --- | --- | --- | --- |
| Generating Automatic Feedback on UI Mockups with Large Language Models | Duan et al. | 2024.0 | Introduced a two-pass 'Detect→Rewrite' prompt chain for UI critique. The research demonstrated that structured, heuristic-guided prompts significantly outperform generic feedback requests. It also showed that incorporating user-dismissed suggestions as negative examples and using self-reflection improves LLM performance. Ablation studies confirmed that removing heuristics or using a single-call prompt harms output quality and diversity. | http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf |
| Self-Refine: Iterative Refinement with Self-Feedback | Madaan et al. | 2023.0 | Proposed the SELF-REFINE framework, an iterative algorithm where an LLM alternates between generating feedback on its own output (FEEDBACK) and then applying that feedback to improve it (REFINE). The paper provides explicit prompts for this loop, with a key application being the improvement of code readability, demonstrating a concrete method for iterative self-improvement on structured tasks. | https://arxiv.org/pdf/2303.17651 |
| G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment | Liu et al. | 2023.0 | Established the G-Eval framework, which uses a combination of Chain-of-Thoughts (CoT) and a form-filling paradigm for evaluating natural language generation. This structured approach, requiring the LLM to reason step-by-step for each evaluation aspect before filling a rubric, was shown to increase the correlation of LLM judgments with human evaluators, providing a reusable pattern for reasoned evaluation. | https://arxiv.org/pdf/2303.16634 |
| Claude’s Constitution | Anthropic | 2023.0 | Detailed the Constitutional AI (CAI) training methodology, where the model learns to critique and revise its own responses based on a set of principles. It established that principles are most effective when framed as short, broad, comparative instructions (e.g., 'Choose the response that is as harmless and ethical as possible') rather than as long, specific rules, as this improves generalization. | https://www.anthropic.com/news/claudes-constitution |
| Collective Constitutional AI: Aligning a Language Model with Public Input | Not specified in context | 2024.0 | Demonstrated a method to operationalize public feedback by translating qualitative statements (e.g., 'AI should not do X') into CAI-compatible comparative principles using the template 'Choose the response that...'. This allows for the direct use of public input in the critique and preference comparison stages of model training and evaluation. | https://arxiv.org/html/2406.07814v1 |
| UICrit: A Large-Scale Dataset for UI Critique Generation | Not specified in context | 2024.0 | Provided a multi-criteria rubric for evaluating UI design quality, breaking it down into aesthetics and usability (which is further decomposed into learnability and efficiency). The work validates the prompt chain design from Duan et al. (2024) on a large scale, reinforcing the effectiveness of structured, multi-faceted evaluation frameworks. | https://arxiv.org/html/2407.08850v2 |

### Future Research Directions

Current methods for LLM-based reasoning and critique, while powerful, have several limitations that point to key future research directions. Firstly, there is a significant gap in handling visual and design tasks. Text-grounded design critique, which relies on JSON representations of UIs, shows diminishing returns as designs become more polished and complex. The iterative value of frameworks like Self-Refine declines without richer context. Therefore, a major area for future work is the development of multimodal critics that can directly process and reason about visual inputs like screenshots, enabling more nuanced and sustained refinement. Research on direct, peer-reviewed visual Self-Refine loops with image-grounded critics was only beginning to emerge post-2024 and requires significant expansion. Secondly, there is a disconnect between academic research and practical implementation. Many of the most concrete and effective prompt architectures, particularly for code review, are not found in formal papers but are embedded within open-source repositories, marketplace actions, and documentation files (e.g., AGENTS.md). Future research could focus on systematically studying, documenting, and formalizing these practitioner-developed patterns to create more robust and widely accessible 'reasoning pattern libraries'.


## Research Basis

### constitutional_ai_critique_prompts
**Confidence:** high

The most relevant content directly addresses how Constitutional AI critique prompts are structured and used. Excerpts that describe the principle-based prompt design outline a system prompt and per-principle steps to evaluate a draft (for example, the system message telling the model to critique and revise based on a list of principles, followed by Step 1 evaluating the draft against P and noting risks or value conflicts). This mirrors the finegrained field’s focus on critique prompts, multi-step evaluation, and an explicit scaffold for reasoning about guidance principles (harmlessness, privacy, non-judgmental tone, etc.). Other excerpts provide concrete templates such as the comparative instruction format “Choose the response that is more X” used in CAI to train preference models, and descriptions of how these principles are selected, translated, and used in training (supervised learning with self-critique, then reinforcement learning from AI feedback). Additional references discuss the differences between rule-based constraints (e.g., never use offensive language) and principle-based reasoning prompts, which directly aligns with the queried contrast in the research interest. Together, these excerpts collectively substantiate the field value by detailing the structure, example prompts, and evolution of CAI critique prompts, including preparation, revision loops, and principled evaluation workflows.

- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > Jun 12, 2024 — For the Standard constitution, we took the constitution outlined in an Anthropic blog post (Anthropic, 2023a) , which is used to fine-tune the Claude (Anthropic
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > we solicited statements in a more general form, such as “The AI should not do X,” as we found this format to be clearer to participants.
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g
  > Constitutional AI (CCAI
  >  Collective Constitutional AI: Aligning a Language Model with Public Input"
- [Understanding Constitutional AI](https://medium.com/@jonnyndavis/understanding-constitutional-ai-dd9d783ef712)
  > Constitutional AI provides a transparent method of reducing the toxicity and harmful behavior exhibited by generative language models.
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)
  > Are these principles prioritized in any way?
The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase.
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > choose the response that is most respectful of everyone’s privacy, independence, reputation, family, property rights, and rights of association. (11-17)
P
  > Please choose the response that is most respectful of the right to freedom of thought, conscience, opinion, expression, assembly, and religion.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence).
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
- [LLM-Rubric: A Multidimensional, Calibrated Approach to ...](https://arxiv.org/html/2501.00274v1)
  > Dec 31, 2024 — This paper introduces a framework for the automated evaluation of natural language texts. A manually constructed rubric describes how to assess multiple
- [C3AI: Crafting and Evaluating Constitutions for ...](https://arxiv.org/html/2502.15861v1)
  > Feb 21, 2025 — The C3AI framework serves two key functions: (1) crafting constitutions and (2) evaluating whether models adhere to their constitutions.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [LLM-as-a-judge: a complete guide to using LLMs for ...](https://www.evidentlyai.com/llm-guide/llm-as-a-judge)
  > Jul 23, 2025 — LLM-as-a-judge is a common technique to evaluate LLM-powered products. In this guide, we'll cover how it works, how to build an LLM evaluator and craft good
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns
**Confidence:** medium

The finegrained field value describes concrete, reusable prompt architecture patterns for design reasoning, including multi-pass critique, rubric-guided evaluation with per-aspect CoT, multi-criteria reasoning, and evidence-first prompts. The most relevant excerpts directly discuss or exemplify these kinds of prompt architectures and templates. Specifically: 
- The excerpt describing a paper that provides prompt templates used for experiments, including prompts for generating LLM reviews, directly aligns with the notion of concrete, reusable prompt architectures and templates for critique tasks. It also mentions structured prompts and evaluation formats that researchers used, which supports the idea of a library or catalog of reusable patterns. 
- Excerpts that discuss generating UI design feedback with LLMs and an LLM-based heuristic evaluation plugin illustrate concrete, task-specific prompt designs for design critique, including how prompts guide multi-step evaluation and produce actionable feedback, matching the two-pass or multi-stage style of reusable patterns. 
- Excerpts that describe a line of work on automatic feedback, heuristic evaluation, and structured prompts (e.g., form-filling rubrics, per-aspect CoT, and evidence-driven outputs) demonstrate concrete pattern families and how they are instantiated in practice, which is exactly the kind of reusable architecture the field value catalogs. 
- Additional excerpts referencing G-Eval and related evaluation frameworks show how to structure prompts to collect, justify, and organize multi-criteria judgments, reinforcing the pattern of explicit output schemas and evidence-backed reasoning. 
In summary, the strongest support comes from the prompt-template focused paper, followed by UI-critique pattern discussions and concrete evaluation frameworks that articulate multi-step, structured prompt designs. These sources together substantiate a set of concrete, reusable prompt architecture patterns for design reasoning and critique, including detection-to-advice flows, per-aspect CoT with structured outputs, and evidence-first or rubric-based formats.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### compliant_vs_reasoned_output_analysis
**Confidence:** high

The finegrained field value claims that empirical studies between 2023 and 2024 show that prompt format significantly influences whether an LLM provides purely compliant outputs versus genuinely reasoned outputs, with structured, decomposed prompts yielding higher-quality reasoning. It cites concrete examples from UI feedback generation research and from G-Eval style evaluation frameworks to illustrate the impact of instruction structure on reasoning quality. Concrete evidence from the UI domain discusses an ablation study comparing a complete (plugin) prompt with explicit heuristics to prompts lacking heuristics, showing a marked drop in helpful, diverse outputs when heuristics are removed, and that a general, non-scaffolded prompt underperforms due to collapsing to a single issue type. This directly supports the idea that scaffolds, schemas, and per-aspect rationales drive deeper reasoning rather than mere compliance. Additional support comes from work implementing G-Eval-style evaluation, where forcing step-by-step CoT reasoning together with a form-filling rubric improves alignment with human judgments, illustrating how instruction formats shape reasoning quality. Collectively, these excerpts connect concrete prompt architectures and evaluation frameworks to improved reasoning outputs, reinforcing the claim that structured prompts and explicit reasoning schemas outperform simplistic or unstructured prompts in design evaluation, code review, and creative critique tasks. The cited UI-focused studies provide explicit comparisons of prompt templates and their effects on output quality, while G-Eval literature demonstrates the broader benefit of decomposed, rubric-driven reasoning across NLP evaluation tasks, aligning with the proposed multi-task, multi-criteria evaluation context.

- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### creative_critique_prompts
**Confidence:** medium

The most directly relevant content is a paper excerpt that provides explicit prompt templates used for generating LLM reviews, i.e., detailed prompt templates for critique tasks. This matches the requested category of concrete, reusable prompt architecture patterns for design reasoning and critique, including structured sections for evaluation, critique, and scoring. Following that, a source describing a rubric-based evaluation approach (G-Eval) aligns with the requested rubric-guided, multi-dimensional assessment (e.g., plot/character for creative works, or usability/aesthetics for design) implemented as a form-filling process. Next, several excerpts discuss constitutional AI prompts and the use of comparative principles (reasoning principles vs rules) to guide critique and revision, which directly corresponds to the requested contrast between rule-based versus principle-based prompting and the design of ethical/harm-aware critique prompts. Additional excerpts elaborate on the practicalities of CAI principles, including how prompts are structured in training to influence critique and revision behavior, which reinforces the notion of principled critique over hard-rule constraints. Finally, one excerpt explicitly frames how to translate public statements into CAI-compatible principles and use them during evaluation and critique, providing concrete guidance that can be adapted into critique-and-revise workflows.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.

### multi_criteria_reasoning_prompts
**Confidence:** high

The strongest support comes from describing a design-evaluation framework that explicitly splits evaluation into multiple criteria (e.g., aesthetics, usability, accessibility, brand) and uses a rubric with a structured output for each criterion, including definitions, checklists, a rating with rationale, and actionable suggestions. This aligns directly with the field’s emphasis on multi-criteria prompts and explicit rubric-based evaluation. Complementary evidence shows a concrete implementation of G-Eval, which combines rubric-based prompts with a CoT reasoning phase and a form-filling output to obtain structured, human-aligned judgments, including an aggregation rule for final scoring. Together, these sources illustrate concrete prompt architectures that encode multi-step reasoning for evaluation and critique, including how to structure prompts to avoid collapsing to a single dimension and how to integrate reasoning with scoring. Additional supporting material discusses prompt templates used for critique, including templates that enable LLMs to generate and critique UI feedback, which reinforces the practical, reusable patterns for design reasoning. Collectively, these excerpts provide concrete, reusable prompt architectures for design reasoning that embody rubric-based multi-criteria evaluation, CoT integration, and explicit scoring templates, meeting the described research interest. Direct mentions of five-element rubrics, CoT usage in evaluation, and the explicit template structure for design evaluation strongly underpin the target field value; related material on UI critique prompts and critique templates broadens the context to practical design tasks.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### design_and_ui_evaluation_prompts
**Confidence:** high

The target fine-grained field is a nested design_and_ui_evaluation_prompts value that outlines concrete prompt architectures for design reasoning, including a two-pass or multi-step chain structure for UI heuristic evaluation and feedback (e.g., a detection pass that identifies violations and an advice pass that converts those into actionable fixes). Excerpts describing UI evaluation frameworks directly match this need: the first excerpt describes a UI design evaluation framework with five criteria (usability, content, aesthetics, reputation, customization), which aligns with multi-criteria design critique. The second set of UI-focused excerpts shows a chain-of-prompt design across major tasks for UI evaluation, illustrating how prompts are structured to drive multi-step reasoning in design critique workflows. Other UI-centric works discuss LLM-driven heuristic evaluation tools, including applying a structured evaluation plugin to UI mockups, which directly exemplifies concrete prompt architectures for evaluation tasks. Additional items describe a G-Eval style, multi-criteria rubric tailored for design critique (aspects like Aesthetics, Usability, Accessibility, Brand coherence) and a single, structured prompt that uses a Chain-of-Thought + Form-Filling paradigm to produce a rubric with per-aspect scores and evidence, which matches the second major component of the field value (multi-criteria reasoning prompts and structured evaluation rubrics). The referenced Self-Refine pattern for design critique (iterative generation, critique, and refinement) also maps to the generate→critique→refine loop described in the fine-grained field value. Collectively, these excerpts substantiate the described prompt architectures, reasoning passes, and evaluation rubrics for design and UI tasks. The later excerpts discussing G-Eval variants and constitutional AI principles provide additional context on how evaluation criteria can be formalized and codified in prompts, which complements the design-oriented architectures by showing how to structure prompts for coherent, reasoned output versus simple compliance prompts. In sum, the most relevant excerpts contain explicit descriptions of two-pass or multi-pass evaluation prompts, chain-of-thought style reasoning in a design/UI context, and multi-criteria rubrics that align with the fine-grained value components, including concrete prompt templates and evaluation schemas.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### multi_step_reasoning_prompt_architectures
**Confidence:** high

The finegrained field value describes concrete multi-step reasoning architectures for evaluation and critique tasks, including (a) a two-pass design/UI evaluation workflow (detection of violations via heuristic evaluation followed by rewriting into actionable feedback), (b) a chain-of-thought plus form-filling approach for multi-criteria rubrics, (c) an iterative Self-Refine loop that generates, critiques, and refines outputs, (d) a multi-agent review with an arbiter to consolidate feedback across domains, and (e) a constitutional critique-and-revise process that evaluates outputs against guiding principles and then revises accordingly. Excerpts in the source material directly map to these architectures: the Self-Refine paper explicitly defines an INIT → FEEDBACK → REFINE cycle for iterative improvement, matching the described generate → critique → refine loop. The G-Eval lines describe a multi-step process where a private chain-of-thought reasoning step is followed by a structured form-filling output for each criterion in a rubric, aligning with the two-pass and multi-criterion evaluation theme. Related discussions of a two-pass design/UI approach detail a dedicated Detection phase that outputs machine-parseable violations and a subsequent Rewrite/Advice phase, mirroring the structured separation of evaluation and feedback. Additional excerpts describe architectural patterns for multi-agent reviews with an arbiter that consolidates domain-specific critiques, and a constitutional critique-and-revise process that evaluates and revises outputs against a set of guiding principles. Supporting passages on using prompts that template reasoning or principles (as opposed to only “rules”) provide context for how these architectures operationalize reasoning prompts and governance when critiques are produced. Collectively, these excerpts provide concrete, reusable prompts and architectural patterns for multi-step reasoning in design evaluation, code review, and creative critique tasks, including both two-pass evaluation and iterative self-improvement loops, plus principled constraint systems like constitutional AI as a governance layer.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [G-Eval Simply Explained: LLM-as-a-Judge for ...](https://www.confident-ai.com/blog/g-eval-the-definitive-guide)
  > Oct 10, 2025 — G-Eval is a framework that uses LLM-as-a-judge with chain-of-thoughts (CoT) to evaluate LLM outputs based on ANY custom criteria. It leverages an automatic
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)
  > Are these principles prioritized in any way?
The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### rule_vs_principle_based_prompts
**Confidence:** high

Rule-based prompts provide hard prohibitions or instructions, such as directly telling the model to choose the most harmless option without elaboration. In contrast, principle-based prompts guide the model through comparative or evaluative reasoning, functioning as a lens to critique and revise outputs (e.g., selecting the option that is less likely to cause harm, or framing judgments as comparisons rather than absolute bans). The excerpts demonstrate this: one excerpt explicitly states that constitutional AI training uses prompts framed as choosing the response that is more X, which exemplifies a principle-based approach to steer evaluation rather than a binary rule. Additional excerpts show how Claude’s constitution defines prompts to encourage harmless, ethical, and proportionate responses, and how different principle formulations influence model behavior during critique and revision. Collectively, these sources illustrate concrete templates and framing differences: a rule-based prompt gives a fixed prohibition, while a principle-based prompt offers a reasoning guide that evaluates options against a quality criterion and may adapt across contexts (design critique, UI evaluation, code review). The field value is thus supported by evidence that contrasts hard rules with evaluative principles used to steer multi-step reasoning, comparison, and self-refinement, rather than simple binary constraints.

- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)
  > Are these principles prioritized in any way?
The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence).
  > Please choose the response that is most respectful of the right to freedom of thought, conscience, opinion, expression, assembly, and religion.

### self_refine_for_design_and_visual_tasks
**Confidence:** high

The most directly relevant excerpt explicitly presents the Self-Refine approach as an iterative loop with a feedback step and a refine step, including the optional INIT, the FEEDBACK critiquing of the initial output, and the REFINE action to produce an improved result. This aligns with the requested design-focused loop described for design tasks as a Generate -> Critique -> Refine cycle, including concrete actions like producing a prioritized fix list and concrete UI actions. The next excerpt elaborates the feedback prompt structure, illustrating how the model is instructed to critique its own previous output for specificity, evidence, and potential false positives, thus grounding the self-critique in concrete criteria before refining. A third excerpt contributes by providing templates or prompts used in related research for generating critiques and reviews, which helps in constructing concrete prompt architectures (templates) for design reasoning tasks. The fourth excerpt, while centered on code review scaffolds, demonstrates practical, structured prompting for evaluation workflows in a visual/design-adjacent context and shows how prompts can govern an iterative review process, which is valuable for translating self-refine concepts to design/visual tasks. Together, these excerpts support constructing a concrete, reusable prompt architecture pattern that enables a generate -> critique -> refine loop for design and visual evaluation, including how to structure feedback and refinement prompts and how to apply the approach to multimodal design evaluation contexts.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a

### future_research_directions
**Confidence:** high

The most relevant material directly supports the proposed future directions. First, a Self-Refine paradigm described as iterative refinement with self-feedback demonstrates the core mechanism for improving outputs through repeated cycles of generation, critique, and refinement, which is central to the envisioned generate→critique→refine loop for design and visual tasks. This establishes a concrete methodological pattern that can be extended to design decisions and visual evaluations. The related excerpt reinforces the value of refining responses through feedback loops, which aligns with the need for richer context and multimodal grounding in future work. Additionally, practitioner-facing documentation shows how concrete prompt architectures and patterns are already being adopted outside formal papers; this supports the claim that systematic study and formalization of these real-world patterns (a proposed research direction) would be valuable. A focused discussion of a repository-style resource that documents such patterns, including constraints and templates for evaluation and critique prompts used in code review or UI evaluation workflows, directly supports the call for a “reasoning pattern library.” The UI-design-focused excerpts describe a concrete, multi-criteria evaluation framework (usability, aesthetics, etc.), illustrating how multi-dimensional evaluation prompts can be structured in practice, which is relevant for the multi-criteria reasoning prompts direction. The code-review/UI-evaluation oriented excerpt explicitly demonstrates a chain of prompts and a modular task decomposition for evaluating complex artifacts, which underpins the need for concrete, reusable prompt architectures for design reasoning. Taken together, these sources robustly support the future research directions around multimodal design critique, iterative self-improvement loops for visual tasks, and the formalization of practitioner patterns into reusable reasoning architectures. 

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [pr-agent/AGENTS.md at main](https://github.com/The-PR-Agent/pr-agent/blob/main/AGENTS.md)
  > Jan 21, 2026 — Stay within existing formatting and directory conventions—avoid mass refactors, re-sorting of prompts, or reformatting Markdown beyond the touched sections. You
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.

### influential_research_and_papers
**Confidence:** high

The fine-grained field value lists several influential papers and their concrete contributions to reasoning scaffolds, multi-step prompt architectures, and principled prompts. Excerpts that directly discuss UI critique prompt chains and multi-criteria evaluation validate the Duan et al. (2023/2024) line of work on concrete prompt architectures for evaluation and critique, including a defined prompt chain for UI critique and abductive multi-criteria rubrics. Statements that describe a two-pass or heuristic feedback flow for UI evaluation, including a Detected→Rewrite style and self-reflection elements, corroborate the concrete design of evaluation prompts and the efficacy of structured reasoning patterns in design tasks. Papers introducing G-Eval provide a canonical form-filling and CoT-based evaluation pattern that aligns with the need for multi-step, reasoned judgments rather than single-shot outputs, and thus directly support the claimed benefits of structured reasoning prompts in multi-criteria contexts. The Self-Refine work provides an explicit generate-feedback- refine loop that operationalizes self-critique and iterative improvement, a core example of a concrete reasoning scaffold for design or visual tasks. Finally, Claude’s Constitution and related Anthropic CAI materials demonstrate how principles are operationalized as comparative instructions rather than strict rules, illustrating the difference between rule-based prompts and reasoning-based prompts, corroborating the distinction in the user’s query between “never use offensive language” (rule) and “consider whether this response could cause harm” (reasoning principle). Taken together, these excerpts map onto the four affirmed themes in the field value: concrete prompt architectures for evaluation and critique, principled (constitutional) prompts, self-refine loops for design/visual tasks, and multi-criteria reasoning/prompts that preserve multiple evaluation dimensions. The collection also touches on broader related works (UI critique datasets and multi-criteria rubrics) that reinforce the practical implementations of structured reasoning in design contexts.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.

### code_review_agent_prompts
**Confidence:** medium

The requested field value describes a concrete multi-agent code review system with specialized critic roles (SecurityCritic, ReadabilityCritic) and an arbiter that merges notes, deduplicates findings, and orders them by severity, producing a final consolidated review with inline references. Excerpts that discuss rethinking code review workflows with LLM assistance show the idea of integrating LLMs into modern code review processes to improve developer experience, which directly maps to the multi-agent, role-based structure in the field value. Excerpts about AI-assisted code review as a scaffold for code quality illustrate implementing an automated reviewer embedded in the development workflow and emphasizing structured feedback, line-specific citations, and diffs, which aligns with the need for precise file/line references in the field value. Excerpts describing a dedicated code-review assistant that analyzes diffs, cites specific lines, and proposes minimal safe diffs correspond closely to the mandated behavior of the readout (cite exact lines and output structured diffs). Excerpts that discuss prompt templates used for code reviews, including instructions to stay within conventions, cite lines, and propose minimal diffs, map directly to the required prompt architecture patterns for design reasoning and code critique. Excerpts about evaluating LLM evaluators and G-Eval provide broader evaluation best practices and form-filling or CoT-based approaches that can underpin the formality and structure of the arbiter’s JSON output. Finally, references to self-refinement and iterative improvement paradigms offer methodological support for the generate–critique–refine loop concept within design or visual tasks and can inform how the code-review loop might be iterated for quality improvements.

- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### reasoning_pattern_libraries_examples
**Confidence:** medium

The fine-grained field value points to concrete, reusable prompt architecture patterns for design reasoning and evaluation tasks. Excerpts that discuss concrete prompt templates and evaluation scaffolds directly support this. A key excerpt presents the idea of F prompts templates used for experiments, detailing how prompts are structured to generate LLM reviews with organized sections, which aligns with the notion of a structured reasoning library for critique. Related excerpts describe G-Eval as a framework that combines chain-of-thought reasoning with a form-filled output to enable aspect-based evaluation, providing a concrete pattern library for multi-criteria judgments. Additional excerpts outline how G-Eval and related rubrics are formalized in open-source repositories, offering ready-made scaffolds for evaluation tasks. Other excerpts discuss self-refinement in the context of design or visual tasks, illustrating iterative reasoning patterns that can be embedded into a pattern library for critique and improvement cycles. Together, these excerpts map to the listed pattern libraries: a rubric-like, multi-criteria evaluation framework (G-Eval), UI/design heuristic sets that decompose design quality into actionable criteria, code-review agent checklists that function as reviewer-style reasoning libraries, and peer-review emulation templates that structure critique into conventional sections. The cited content demonstrates concrete architectures (prompts) and templates enabling multi-criteria reasoning, not just generic advice, which directly supports the requested field value.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.

### executive_summary
**Confidence:** high

The central claim is that concrete, multi-step reasoning architectures improve evaluation and critique across design, code, and creative tasks. Excerpts describing iterative self-improvement loops (Self-Refine) show a generate→critique→refine pattern that has been adapted for design and visual tasks, providing structured stages that separate evaluation and refinement phases. This directly supports the idea of a structured reasoning protocol rather than generic feedback. Excerpts detailing G-Eval style approaches emphasize form-filling with chain-of-thought reasoning to align assessments with human judgments, illustrating how structured outputs (e.g., JSON) and explicit reasoning prompts lead to higher-quality evaluations. The UI/UX design evaluation papers articulate a concrete five-criterion framework (usability, content, aesthetics, reputation, customization) that exemplifies multi-criteria rubrics, aligning with the executive_summary finding that multi-dimensional evaluation reduces bias toward a single dimension. Excerpts about constitutional AI explain how principle-based prompts function as evaluative lenses when framed as comparative reasoning instructions (e.g., “choose the response that is most X”) rather than strict prohibitions, illustrating the distinction between rules and reasoning principles—the difference the executive_summary highlights as impactful in practice. Additional excerpts show concrete templates and architectures for design critique (e.g., Detect→Rewrite in UI evaluation and prompt templates used for critique in code or design), supporting the claim that concrete architectures outperform generic prompts. Finally, references to multi-step planning and reasoning improving outcomes in prior work reinforce the overall thesis that structured, staged reasoning is beneficial across domains. Taken together, these excerpts substantiate the executive_summary: explicit, reusable prompt architectures with multi-step reasoning, staged outputs, and principled evaluation lead to superior performance on design, code, and creative critique tasks, with demonstrated benefits from Self-Refine iterations and from rubric-based, multi-criteria evaluations. The reasoning is grounded in concrete examples like a detect-then-rewrite pipeline, JSON-formatted critique outputs, and comparative constitutional prompts, all of which map directly to the described executive_summary findings.

- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta

### key_frameworks_and_methods
**Confidence:** high

The most relevant excerpts directly describe concrete evaluation architectures that match the field value. Content detailing G-Eval shows a formal framework using chain-of-thought reasoning and a form-filling paradigm to evaluate NLG outputs against a rubric, which aligns with the core concept of structured, multi-step evaluation prompts and formalized scoring. Related excerpts describe two-step or two-pass approaches where critique and actionable feedback are separated, exemplifying concrete prompt structures for UI/UX evaluation and design critique. Constitutional AI excerpts illustrate how prompts are formatted as principles to guide model behavior, including the distinction between rules (static prohibitions) and reasoning principles (evaluative prompts), which is central to the constitutional AI family of prompts. Additional CAI-related excerpts discuss the design of principles, the way they are applied during training and evaluation, and examples of actual constitutional prompts used by Anthropic. Self-Refine-related content demonstrates a generate→critique→refine loop, which is a concrete iterative refinement architecture applicable to design critique and visual tasks. Reflexion-related excerpts discuss self-reflection for improvements, illustrating how feedback and memory of past mistakes inform future prompts or trials, which is highly pertinent to design evaluation workflows. In sum, the strongest support comes from explicit descriptions of G-Eval’s CoT + form-filling rubric-based evaluation, the two-pass critique architectures for UI feedback, and the Constitution-based prompting and training strategies, all of which map directly onto the field’s described core concepts. Supporting content from Self-Refine and Reflexion provides concrete iterative and reflective frameworks that extend these capabilities to design and visual tasks, while additional excerpts elaborate on how these principles are deployed in practice within CAI and related evaluation literature.

- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://aclanthology.org/anthology-files/pdf/emnlp/2023.emnlp-main.153.pdf)
  > by YLDIY Xu · Cited by 2596 — In this paper, we propose G-EVAL, a framework of using LLMs with chain-of-thoughts (CoT) (Wei et al., 2022) to evaluate the quality of generated texts in a form
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset
- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > Jun 12, 2024 — For the Standard constitution, we took the constitution outlined in an Anthropic blog post (Anthropic, 2023a) , which is used to fine-tune the Claude (Anthropic
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > we solicited statements in a more general form, such as “The AI should not do X,” as we found this format to be clearer to participants.
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [A Survey on Code-Enhanced Reasoning and ...](https://arxiv.org/html/2502.19411v1)
  > Feb 26, 2025 — Recent researches enabled LLMs to autonomously evaluate and improve their outputs, with Self-Refine Madaan et al. (2023) demonstrated how models can generate,
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been

### constitutional_ai_critique_prompts.methodology_overview
**Confidence:** high

The field value describes a CAI training process with a supervised learning phase where the model critiques its own responses against a constitution, followed by a reinforcement learning phase using preference comparisons to align with the constitution. It also notes that prompts are formatted as comparative instructions (for example, choosing the more X output). The most directly supportive content states that the model critiques and rewrites its responses against guiding principles, and that training uses a principle-driven template during evaluation. This is complemented by explicit statements about prompting models to choose the output that is more harmless or ethical, illustrating the concrete prompt architectures and reasoning prompts used. Additional excerpts discuss how the principles are crafted, tested, and tempered to avoid over-constraining, which aligns with the described methodology. Collectively, these excerpts corroborate the two-phase CAI workflow and the concrete prompt templates that encode multi-step reasoning and evaluation guidelines, as requested. 

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Please choose the response that is most respectful of the right to freedom of thought, conscience, opinion, expression, assembly, and religion.
  > choose the response that is most respectful of everyone’s privacy, independence, reputation, family, property rights, and rights of association. (11-17)
P
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > Jun 12, 2024 — For the Standard constitution, we took the constitution outlined in an Anthropic blog post (Anthropic, 2023a) , which is used to fine-tune the Claude (Anthropic
  > we solicited statements in a more general form, such as “The AI should not do X,” as we found this format to be clearer to participants.
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g
- [Understanding Constitutional AI](https://medium.com/@jonnyndavis/understanding-constitutional-ai-dd9d783ef712)
  > Constitutional AI provides a transparent method of reducing the toxicity and harmful behavior exhibited by generative language models.

### multi_criteria_reasoning_prompts.scoring_mechanism
**Confidence:** medium

The target field value describes a scoring mechanism that first evaluates several criteria in isolation and then computes a final overall score using a predefined aggregation rule (such as a weighted mean), while also reporting trade-offs between criteria. The most directly supportive information comes from the UI design evaluation framework that explicitly separates evaluation into multiple criteria (usability, content, aesthetics, reputation, customization), establishing the multi-criteria basis for scoring. The prompts-focused excerpts reinforce how prompt templates can encode structured evaluation workflows and generate reviews, which are the practical means to realize per-criterion assessment and a subsequent final aggregation, including explicit mention of prompt templates used in experiments and design critique systems. Additional excerpts discuss generating UI design feedback within an LLM-driven heuristic evaluation setup, which aligns with building a scoring workflow that aggregates per-criterion judgments into an overall verdict. Together, these excerpts substantiate the existence and structure of multi-criteria evaluation and the possibility of an aggregation rule being specified inside the prompt, along with the need to surface trade-offs, thereby supporting the field value’s concept of a transparent, controllable final score derived from per-criterion scores.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying

### multi_criteria_reasoning_prompts.methodology
**Confidence:** high

The multi-criteria evaluation approach is exemplified by explicit rubrics that decompose design quality into multiple dimensions such as usability and aesthetics, which aligns with the rubric-based evaluation portion of the field value. An excerpt discussing G-Eval describes a framework that uses chain-of-thought reasoning and a form-filling paradigm to assess NLG outputs, directly supporting the G-Eval portion of the field value. Additional excerpts describe concrete prompt templates and critique-oriented prompts used for LLM reviews, which illustrate how structured reasoning patterns and multi-part prompts are engineered in practice. Several sources describe prompts designed for UI critique and design evaluation, often organized as a sequence of tasks with explicit criteria, further supporting the rubric-based/multi-criteria approach. Some papers explicitly present prompt architectures (templates) for generating evaluations and critiques, which is highly relevant to concrete, reusable prompt patterns for design reasoning. Overall, the most relevant material directly demonstrates concrete prompt architectures and structured reasoning for multi-criteria evaluation, with multiple sources corroborating the combination of rubrics and CoT/form-filling strategies in real systems. Less directly relevant are broader discussions of UI feedback mechanisms that, while related, provide context rather than core methodologies.

- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### constitutional_ai_critique_prompts.example_principle
**Confidence:** high

The most directly supporting content is the explicit formulation of the principle in a comparative prompt: it instructs the model to choose the assistant response that is as harmless and ethical as possible, and to avoid toxic or unethical options. This showcases the concrete principle-based approach (rather than a binary rule) that the field value is asking about, and it explicitly contrasts with a simple hard rule like never using offensive language. Related passages describe how a model is guided to pick among multiple principles over iterations, implying a structured, reasoning-based critique and refinement process rather than blunt filtering. Additional excerpts illustrate adjustments to balance well-being with tone (ethical awareness without being condescending), which reinforces the nuanced, principle-driven design ethos. Together, these excerpts corroborate the idea that a concrete, comparative principle is used in practice to drive evaluation and critique tasks, aligning with Anthropic’s constitutional AI approach and its implementation details in critique and refinement workflows.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.

### multi_step_reasoning_prompt_architectures.0
**Confidence:** high

The requested two-pass architecture is exemplified by excerpts describing UI design feedback generation workflows. One excerpt discusses building an LLM-based heuristic evaluation plugin for UI mockups (e.g., Figma) and outlines goals, realization of evaluation steps, and the underlying approach of assessing designs with heuristics before providing feedback. This aligns with a first-pass detection of issues grounded in a structured data representation, followed by a rewrite step that delivers human-readable guidance. Another excerpt presents a separate piece of work on generating automatic feedback on UI mockups with LLMs, detailing a design goals section for an automatic evaluation tool and how the system realizes the evaluation, which supports the idea of a multi-step workflow in a design context. A third excerpt explicitly mentions prompt templates used to generate LLM reviews, including prompts for generating structured critiques, which dovetails with the notion of a designed evaluation-and-feedback pipeline beyond single-call prompts. Additionally, a SELF-REFINE style reference describes iterative refinement with feedback and refinement steps, illustrating the value of modular, multi-step reasoning, which complements the two-pass concept. Finally, a broader discussion of G-Eval and CoT-based evaluation frameworks provides context for how multi-step reasoning can be organized to assess outputs against criteria, reinforcing the architectural pattern of separating evaluation (detection/grounding) from critique (rewriting into actionable guidance). Collectively, these excerpts map onto a concrete, reusable prompt architecture pattern that encodes multi-step reasoning for design evaluation by first identifying violations and then converting them into constructive feedback. The most direct support is the UI-specific design feedback pieces, while the others supply context and evidence that modular, stepwise reasoning improves design critique outputs.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta

### design_and_ui_evaluation_prompts.1
**Confidence:** high

The finegrained field value specifies a design-evaluation prompt architecture that uses a G-Eval-inspired, chain-of-thought plus form-filling paradigm to produce a structured rubric with multi-criteria scoring (Aesthetics, Usability, Accessibility, Brand) and actionable recommendations, along with a final aggregation rule. Excerpts that discuss G-Eval as a framework for evaluating NLG outputs using chain-of-thought reasoning and a form-filling approach directly support this: they describe a principled evaluation flow where the model reasons step-by-step and then fills a predefined output structure, which aligns with the requirement for a final, JSON-formatted rubric and explicit scoring for each evaluation aspect. Additional excerpts discuss the broader use of CoT reasoning in evaluation contexts (including NLG evaluation via GPT-4 with improved alignment) and the application of a structured UI critique framework that segments evaluation into usability, content, aesthetics, reputation, and customization. This supports the idea of decomposing evaluation into discrete criteria and demonstrates concrete instantiations of a rubric-driven, multi-criteria prompt design used in design/UI contexts. Combined, these sources substantiate the specific architecture: a single, structured prompt that leverages chain-of-thought for internal reasoning, coupled with a form-filled, final rubric output that aggregates scores across multiple design-focused criteria, and the procedural elements for input data formats and evidence-based rationales. The UI-focused critique examples further corroborate how such prompts are instantiated in real-world design critique workflows, including example criteria and scoring guidance that map onto usability, aesthetics, and accessibility. Overall, the strongest support comes from the explicit discussion of a G-Eval-style, CoT-enabled evaluation framework and the explicit, form-filling output pattern, with supplementary context from UI critique prompt designs that mirror the multi-criteria evaluation structure in the field value.

- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.

### design_and_ui_evaluation_prompts.0
**Confidence:** high

The most relevant excerpts directly illustrate concrete UI evaluation prompts and architectures. One excerpt describes building an LLM-based heuristic evaluation plugin for a UI design workflow (e.g., Figma), which aligns with a concrete, reusable prompt chain that detects violations and then provides constructive feedback, mirroring the requested two-pass structure. Another excerpt presents a design-evaluation framework that segments UI evaluation into usability, content, aesthetics, reputation, and customization, which matches the specified evaluation criteria. A closely related excerpt discusses a chain-of-thought-enabled evaluation approach (G-Eval) and formal prompt forms for evaluating generated UI-related outputs, reinforcing how reasoning patterns can be structured for multi-step critique. Supporting pieces provide practical demonstrations of automatic feedback on UI mockups and heuristic evaluation toolchains, emphasizing how prompts are organized to identify violations (grounded in a JSON layout and heuristic guidelines) and translate them into actionable suggestions. Less directly but still relevant are discussions of broader evaluator frameworks and reasoning prompts (including CoT-based evaluation and form-filling paradigms) that corroborate the benefits of structured, multi-step reasoning in evaluation tasks. Together, these excerpts substantiate a concrete, reusable prompt architecture pattern for design reasoning that includes a detection phase grounded in design heuristics and a follow-on critique/refinement phase.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### constitutional_ai_critique_prompts.revision_prompt_structure
**Confidence:** high

The finegrained field value describes a concrete two-step revision workflow following a critique: first propose a revision aligned with a given principle, then note trade-offs with other principles, and finally produce a consolidated revised draft. The excerpts collectively show a pattern where constitutional AI prompts are used within a critique-revise cycle and where the system is guided to reassess outputs against a set of principles during training or evaluation. Specifically, one excerpt notes that the model “critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase,” which directly supports the idea of an iterative revision after critique. Other excerpts illustrate how prompts are structured around principles (for example, selecting responses that are harmless, ethical, and less harmful) and how these principles are repeatedly surfaced during training to guide judgment, which underpins the mechanism of using critique-informed prompts to drive revisions. Several excerpts additionally discuss tempering or balancing the application of principles to avoid overreach, ensuring that revisions consider trade-offs and maintain helpfulness, which aligns with the notion of explicitly noting trade-offs in the revision step. The collection also suggests practitioners construct prompts that operationalize constitutional reasoning not as rigid rules but as guiding principles, thereby informing a revision path that is purposeful and principle-aware rather than purely prescriptive. Taken together, these sources corroborate a concrete revision-prompt pattern: after a structured critique, generate a targeted revision guided by the principle, explicitly acknowledge trade-offs with other principles, and conclude with a consolidated revised draft that reflects the critique-informed improvements.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.

### creative_critique_prompts.3
**Confidence:** medium

The finegrained field value describes a concrete, rubric-guided, multi-criteria evaluation prompt for a creative work, requiring per-aspect scores, evidence-backed rationales with quotes, and actionable suggestions. Excerpt describing G-Eval identifies the core architecture: a prompt, an automatic chain-of-thought reasoning component, and a scoring function. This directly maps to a rubric-driven form where each rubric dimension is scored and accompanied by rationale and evidence, aligning with the requested multi-dimensional evaluation. Excerpt detailing detailed prompt templates for LLM reviews provides concrete template evidence that such structured prompts exist and have been used in experiments, which supports the feasibility and concreteness of the requested prompt pattern. Excerpts on Claude’s Constitution and principle-based prompts illuminate how high-level reasoning prompts differ from simple rules, offering guidance on how to craft prompts that induce reasoning rather than mere compliance, which is relevant when designing rubric-based prompts that require justifications rather than opaque, hard rules. Additional excerpts demonstrate practical refinements and variations of constitutional prompts to temper behavior and tailor critique, which can inform how to structure the rubric-driven prompt to produce balanced, non-dogmatic evaluations. Collectively, these sources corroborate the existence and practical construction of multi-criteria, rubric-aligned evaluation prompts with explicit scoring and justification components, and they help distinguish between reasoning-oriented rubric prompts and purely rule-based constraints.

- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.

### reusable_prompt_architecture_patterns.6
**Confidence:** high

The most relevant excerpt explicitly notes the availability of detailed prompt templates used across experiments, including prompts for generating LLM reviews, which aligns with concrete, reusable prompt architectures that enforce evidence-based reasoning. This supports the idea of a standardized prompt pattern where evaluation output must be grounded in artifacts. Another highly relevant excerpt describes G-Eval-style evaluation with explicit CoT reasoning and a form-filling mechanism, illustrating a concrete, multi-part prompting approach that fosters structured justification embedded in the reasoning process. A related excerpt discusses G-Eval for LLM evaluation and highlights components that rely on explicit reasoning steps and evidence quotes, which maps well to the requirement of binding feedback to direct evidence. Additional supporting excerpts describe a chain-of-prompts approach for automated design evaluation that partitions evaluation into usability, content, aesthetics, and other criteria, showing how multi-criteria reasoning prompts are structured to avoid collapsing to a single dimension, which complements an evidence-first philosophy by organizing justification across multiple facets. Other items discuss UI design feedback plugins and critique frameworks that explicitly use task-specific prompts, which reinforces the need for concrete templates and structured reasoning patterns in design critique contexts. The remaining items provide broader context about evaluation frameworks and evidence-oriented prompts, reinforcing the value of templates and evidence-grounding without detailing direct evidence-citation mechanics, which is still relevant for understanding the landscape of evidence-first prompting patterns. Overall, the collection of excerpts supports a cohesive view that concrete prompt architectures with explicit evidence-grounding (cite elements before judgments) are central to design reasoning tasks, as described by the target pattern. 

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.3
**Confidence:** medium

The target field value presents a concrete prompt architecture named 'Constitutional Critique-and-Revise' where a system prompt directs the model to critique and revise a draft against a list of principles, performing multi-step evaluation for each principle, proposing revisions, and noting trade-offs. The reasoning pattern emphasizes principles (not hard prohibitions) and requires a structured process: assess against each principle, propose a revision, and document trade-offs, yielding a consolidated revised draft with explanations. Relevant excerpts document concrete prompt templates and structured evaluation prompts that align with this approach. One excerpt discusses detailed prompt templates used in experiments, including prompts for generating LLM reviews, which exemplifies how to encode multi-step reasoning and critique in a reusable template. This supports the idea of explicit, template-based reasoning patterns rather than vague instructions. Another set of excerpts describes a UI critique framework that splits evaluation into multiple criteria and uses a chain-of-prompts design where prompts target different major tasks, illustrating how multi-criteria evaluation is operationalized through prompt structure—this resonates with the idea of multi-step, principle-based evaluation across dimensions. Additional excerpts discuss evaluation frameworks and prompt designs (coaching CoT-style reasoning and form-filling approaches) that demonstrate how reasoning is made explicit and structured within prompts, which is consistent with a principled critique-and-revise workflow. Finally, a reference to G-Eval and related evaluation tooling shows an ecosystem context where structured, reasoning-enabled prompts are used to produce more analyzable outputs, underscoring the value of concrete prompt architectures beyond simple compliance rules. Taken together, these excerpts provide concrete, reusable prompt pattern concepts (detailed templates, multi-task chains, and evaluation scaffolds) that underpin a constitutional or principle-based critique-and-revise architecture, even if they do not explicitly name the constitutional framing in every case.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples

### creative_critique_prompts.1
**Confidence:** high

Concrete prompt architectures for evaluation and critique are demonstrated by papers and blogs that explicitly describe prompt templates used to guide LLM reviews and evaluations, which aligns with the idea of a structured Critique Checklist with per-guideline mini-checklists. For example, detailed prompt templates used for generating LLM reviews in a critique-focused paper show how reasoning patterns are embedded in templates rather than generic instructions. A discussion of G-Eval highlights that an evaluation framework relies on a structured prompt alongside a chain-of-thought reasoning component and a scoring function, illustrating multi-step reasoning and evaluation flow. The material on Claude’s Constitution provides concrete examples of how a reasoning-oriented principle differs from a straightforward rule, and demonstrates how principles can be invoked during critique and revision to guide behavior without hard-coding prohibitions. Additional material shows how researchers temper or balance principled guidance to avoid over-restrictive or punitive behavior, which informs how a per-guideline checklist could be designed to include both positive and negative exemplars. Collectively, these excerpts support the notion that concrete, reusable prompt architectures for design reasoning and critique can incorporate: (a) explicit templates for critique tasks, (b) structured multi-step reasoning prompts with evaluation hooks, and (c) principled prompting that distinguishes reasoning-based guidance from rigid rules, which is compatible with building a per-guideline mini-checklist that includes positive and negative examples to refine feedback precision in creative critique prompts.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.

### multi_criteria_reasoning_prompts.chain_of_thought_integration
**Confidence:** high

The field value describes a concrete practice: embedding chain-of-thought reasoning within evaluation prompts, particularly in a multi-criteria setting where the model reasons about different aspects (e.g., usability, aesthetics) before assigning scores. The most directly relevant excerpt explains a framework where chain-of-thought is used in conjunction with a form-filling paradigm to assess NLG output quality, and explicitly states that the model should think step-by-step but only output the completed rubric, which is a concrete prompt structure aligning with the described integration. Additional excerpts describe G-Eval as a CoT-based evaluation framework for text quality, including proposals of using CoT to guide scoring, and even formal prompt templates for generating reviews, which collectively substantiate the idea of structured, multi-step reasoning guiding multi-criteria evaluation. Other excerpts discuss prompting scaffolds for UI/UX design critique and automatic feedback, illustrating practical implementations of reasoning patterns in design evaluation tasks. Taken together, these excerpts support the notion that concrete prompt architectures encourage a stepwise reasoning process across multiple criteria before producing a final score or critique, consistent with the finegrained field value’s focus on CoT integration for design evaluation, code review, and creative critique tasks.

- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.7
**Confidence:** high

The strongest support comes from excerpts that explicitly describe a scoring function or a structured decision framework within prompts. One excerpt outlines that the evaluation prompt can include an explicit, transparent rule for aggregating scores across multiple criteria (such as a weighted mean) and requires explicit note of trade-offs when scores dip below a threshold. This directly aligns with the fine-grained field value’s emphasis on aggregation rules and explicit decision frameworks. Related material discusses G-Eval’s architecture, which includes a scoring component and a Chain-of-Thought style reasoning component, signaling that multi-criteria reasoning is often coupled with a formalized scoring mechanism rather than a single, collapsed score. Additional sources describe structuring prompts into a sequence of tasks that evaluate distinct criteria (usability, content, aesthetics, reputation, customization) and then combine results, which demonstrates practical implementations of multi-criteria evaluation and the need to prevent collapse to a single dimension. Other discussions detail concrete prompt templates for evaluating UI design, feedback generation, and critique workflows, which provide concrete patterns that can be adapted to enforce explicit aggregation rules. Taken together, these excerpts corroborate the existence of concrete prompt architectures that encode multi-step reasoning and explicit aggregation/decision rules for design evaluation and related tasks. The more peripheral but supportive sources describe broader multi-criteria evaluation prompts and existing libraries or approaches for reasoning scaffolds and critique workflows, which help situate the aggregation-rule pattern within a broader design-evaluation toolkit.

- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.2
**Confidence:** medium

The requested fine-grained field value describes a Multi-Agent Critic Ensemble approach to evaluation tasks, where multiple specialized critics (e.g., UsabilityCritic, AestheticsCritic, AccessibilityCritic for design; SecurityCritic, PerformanceCritic, ReadabilityCritic for code review) operate in parallel, followed by a final Arbiter that consolidates feedback, resolves conflicts, and provides traceable citations. The most relevant excerpts provide concrete, concrete prompt architectures and chained prompting patterns that align with this design philosophy. One excerpt explicitly discusses detailed prompt templates used for experiments generating LLM reviews, illustrating how prompts are structured to elicit multi-faceted critique rather than a single dimension. Another excerpt describes a chain-of-prompts where each major task is handled by a dedicated prompt module, and another excerpt notes that the design follows established prompt design from prior work, illustrating how reasoning steps are separated into distinct components. Additional excerpts discuss automatic feedback generation and evaluation frameworks (including CoT reasoning and scoring), which demonstrate the practical benefits of decomposing evaluation into structured components and using an Arbiter-like consolidation phase to produce final outputs. Taken together, these sources support the core idea of decomposing evaluation into parallel, specialized agents plus a consolidating step to avoid collapsing to one dimension and to enable traceable, multi-criteria reasoning. The surrounding discussions of prompt templates for reviews, UI critique prompts, and multi-criteria evaluation (usability, aesthetics, etc.) provide concrete, reusable patterns that would feed into a Multi-Agent Critic Ensemble style architecture, even if the exact term is not used in the excerpts themselves.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### creative_critique_prompts.2
**Confidence:** medium

The finegrained field value describes a prompt design that relies on comparative principles to guide feedback and revisions, rather than rigid rules. Excerpts from Claude's Constitution illustrate this design: they contrast broad, general principles with more detailed, but non-restrictive, guidance (for example aiming for responses that are harmless, ethical, and respectful, while avoiding condescension or preachiness). This demonstrates a shift from hard rules like 'Never be offensive' to reasoning prompts that evaluate harm and tone. Additional excerpts show how such principles are leveraged in critique and revision workflows, including lines about selecting responses based on harmfulness and the level of ethical awareness, as well as how a model may pull different principles during critique and training. Together, these sources provide concrete evidence of implementing principle-based critique prompts, showing both the content of the principles and their application in evaluation and revision loops. Supporting excerpts also discuss concrete prompt templates and architectures used in evaluations and critique scenarios, reinforcing the notion of tangible, reusable prompt designs for design reasoning and critique tasks rather than abstract guidelines.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### constitutional_ai_critique_prompts.critique_prompt_structure
**Confidence:** medium

The most relevant excerpts directly illustrate how constitutional AI prompts are formed as iterative or comparative critique prompts, which aligns with a multi-step evaluation scaffold. For example, a concrete template emphasizes selecting the most harmless and ethical response, and templates that instruct the model to critique or evaluate against a principle before revising. The passages show that prompts can be organized around selecting higher-quality responses under a principled rubric, and that principles can be invoked in a structured way (for example, “Please choose the assistant response that is as harmless and ethical as possible,” and “Choose the assistant response that demonstrates more ethical and moral awareness without sounding condescending”). These exemplars demonstrate the general approach of forcing the model to reason about alignment with a principle prior to revision, which matches the described multi-step critique scaffold. Additional excerpts discuss how constitutional principles are generated, tested, and balanced during training to avoid over-specific prompts that hurt generalization, which informs the rationale for a reusable scaffold. While not every excerpt provides an exact step-by-step template identical to the user-provided scaffold, together they establish the core components of a multi-step, principle-driven critique process and show concrete prompt wording and structure that researchers use to elicit reasoning and evaluation rather than merely enforcing a rule. The combination of template phrasing, the emphasis on evaluating against principles, and discussions of instruction formats all support the idea of a reusable, multi-step critique prompt architecture that can be instantiated for design evaluation tasks.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Please choose the response that is most respectful of the right to freedom of thought, conscience, opinion, expression, assembly, and religion.
  > choose the response that is most respectful of everyone’s privacy, independence, reputation, family, property rights, and rights of association. (11-17)
P
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > we solicited statements in a more general form, such as “The AI should not do X,” as we found this format to be clearer to participants.
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g

### reusable_prompt_architecture_patterns.0
**Confidence:** medium

The finegrained field value describes a concrete, reusable prompt architecture pattern named “Heuristic-anchored Two-Pass Critique (Detect→Advice)” that uses a two-pass process: Pass 1 acts as a UI Heuristic Evaluator to detect violations, and Pass 2 rephrases those violations into constructive, user-facing advice, using a design-coach framing with prioritization. Excerpt content explicitly documents a framework for evaluating UI design quality split into usability, content, aesthetics, reputation, and customization, and notes a chain of prompts where each major task is handled by a specific prompt, illustrating a practical two-pass or multi-step approach consistent with the described pattern. The description of a two-pass process where the system first detects violations and then outputs actionable advice, framed with a Sadler-style structure (standard, gap, fix), directly matches the “Detect→Advice” architecture and the prompt structure highlighted in the field value. Additional sources illustrate concrete prompt templates for generating UI critique and automated design evaluation, including papers that show how to generate automatic feedback on UI mockups and a heuristic evaluation plugin for design mockups, which reinforce the idea of concrete, reusable prompt architectures in real systems. These excerpts collectively support the notion of a structured, multi-pass, principle-based prompt design for evaluation and critique tasks across UI/design/creative domains, aligning with the target field value and providing concrete examples of how such patterns are implemented in practice.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### multi_step_reasoning_prompt_architectures.3
**Confidence:** medium

The fine-grained field value describes a concrete multi-step design for analysis: instantiate multiple specialized reviewers (critics) that independently assess an artifact, followed by an arbitration step that merges, deduplicates, resolves conflicts, and orders feedback by severity. The most relevant excerpt directly references the existence of detailed prompt templates used for generating LLM reviews in experimental settings, which aligns with the idea of structured, role-specific critique tasks that could be distributed across parallel agents. The self-refinement excerpt is highly pertinent because it embodies a generate-critique-refine loop, a concrete mechanism that could scale to a multi-agent setup where each agent contributes a distinct critique and subsequent refinement consolidates the output. Other excerpts discuss evaluation frameworks and reasoning-based prompts (e.g., LLMs as judges using chain-of-thought, and G-Eval-style evaluation pipelines), which provide architectural patterns for multi-step reasoning and scoring that support the idea of aggregating diverse perspectives, even if they do not explicitly describe a parallel-critic + arbiter system. Taken together, these sources corroborate the broader theme of structured, multi-step, multi-perspective evaluation workflows and feedback consolidation, which underpins the described arbiter consolidation architecture.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [G-Eval Simply Explained: LLM-as-a-Judge for ...](https://www.confident-ai.com/blog/g-eval-the-definitive-guide)
  > Oct 10, 2025 — G-Eval is a framework that uses LLM-as-a-judge with chain-of-thoughts (CoT) to evaluate LLM outputs based on ANY custom criteria. It leverages an automatic
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.1
**Confidence:** high

The most directly relevant information comes from discussions of structured evaluation prompts that combine reasoning with a rubric-driven, per-aspect output. One excerpt explains G-Eval’s structure: a prompt, automatic chain-of-thought reasoning, and a scoring function, which aligns with the idea of a CoT-based evaluation augmented by a rubric and scoring. Another excerpt emphasizes that G-Eval uses CoT reasoning in combination with a form-filling output, which matches the described pattern of producing a final rubric with predefined fields and structured scores, rationales, evidence, and concrete suggestions. A separate excerpt notes the existence of concrete prompt templates used in critique-focused experiments, explicitly stating that detailed prompt templates are provided for generating LLM reviews, i.e., evaluation prompts that guide reasoning and output format. Further, related material outlines a design-evaluation chain of prompts where prompts are organized per major task, consistent with multi-criterion or per-aspect evaluation workflows. Additional excerpts discuss evaluating across multiple design criteria (usability, content, aesthetics, reputation, customization), which aligns with multi-criteria scoring and separate aspects. Collectively, these sources provide concrete architectures: (1) a rubric-based, per-aspect evaluation flow with CoT reasoning, (2) form-filled, structured outputs that capture scores, rationales, and evidence, and (3) explicit examples and templates of evaluation prompts across design, UI critique, and general NLG evaluation contexts. This directly supports the field value’s core components: named pattern, domain applicability, description of structure (CoT plus rubric), required output fields, and reference to a foundational source (G-Eval, EMNLP 2023). Excerpts discussing UI critique chains and heuristic evaluation plugins further illustrate concrete, task-specific prompt structures that instantiate the broader architecture. Overall, the evidence coherently supports the existence and details of a concrete, reusable prompt architecture pattern that uses CoT within a rubric-driven, multi-criteria evaluation framework and outputs structured rubric-based results.

- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### design_and_ui_evaluation_prompts.2
**Confidence:** medium

The most directly relevant piece describes an LLM-based heuristic evaluation plugin for Figma, which matches the desired context of concrete prompt architectures for design critique workflows. It shows how a design evaluation task can be scaffolded by a prompt-driven tool, directly aligning with the request for concrete prompt templates in design contexts. Complementary to that, a framework that separates UI design quality into distinct criteria (usability, content, aesthetics, reputation, customization) provides concrete multi-criteria evaluation structure that future prompts can adopt or adapt. The notion of a chained prompt design, where multiple major tasks are handled in sequence, resonates with multi-step reasoning architectures and supports the idea of a stepwise evaluation pipeline, which is exactly what a design critique workflow using self-refine would require. In parallel, empirical discussions of LLM evaluators (such as G-Eval) that employ chain-of-thought reasoning and form-filling provide concrete evidence about how prompting formats influence reasoning quality, thereby informing how to structure reasoning prompts versus rule-based prompts. Additional excerpts extend these ideas by illustrating automatic feedback generation on UI mockups with LLMs, which demonstrates practical instantiations of evaluation loops in design contexts. Finally, broader CoT-based evaluation literature reinforces the potential benefits of explicit reasoning in design critique prompts and helps justify the architectural choices for a self-refine loop that iteratively improves critique and fi x suggestions. Taken together, these excerpts collectively support constructing concrete, reusable prompt architectures for design reasoning that employ multi-step, self-critique loops, multi-criteria evaluation, and CoT-driven justification.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying

### reusable_prompt_architecture_patterns.5
**Confidence:** medium

The most relevant excerpt explicitly notes that the paper provides detailed prompt templates used for experiments that generate LLM reviews, indicating concrete, template-based prompt architectures rather than abstract guidance. This aligns with the idea of reusable prompt patterns that structure reasoning steps and critiques in design evaluation tasks. The next highly relevant excerpt describes a chain-of-prompts approach for UI evaluation, illustrating a modular, multi-step prompt design where each major task is guided by a dedicated prompt, which is closely related to constructing a per-guideline structured approach with explicit examples. Another excerpt discusses evaluating UI design quality by separating criteria into multiple dimensions (usability, content, aesthetics, reputation, customization), which supports multi-criteria reasoning and aligns with the goals of a per-guideline checklist that handles multiple dimensions. A further excerpt outlines the G-Eval framework, emphasizing a formal prompt, automatic CoT reasoning, and a scoring function, which demonstrates how reasoning prompts are integrated into evaluation workflows and could accommodate counterexample-like elements within a reasoning rubric. Additional excerpts touch on evaluating LLMs and constructing prompt templates for reviews and feedback, reinforcing the importance of concrete templates and structured reasoning in design/critique contexts. The remaining excerpts reinforce related themes (heuristic evaluation, UI feedback, and evaluator design) that provide context for constructing robust, multi-faceted evaluation prompts but do not directly demonstrate a checklist-with-counterexamples pattern. Overall, the evidence supports that concrete, template-based, multi-criteria, and CoT-enabled prompt architectures exist in the literature, which can be adapted or extended to implement a per-guideline checklist with counterexamples to improve precision and reduce misclassification in design critique tasks.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### rule_vs_principle_based_prompts.rule_based_definition
**Confidence:** medium

The finegrained field value defines a rule-based prompt as a binary, hard constraint with no guidance for trade-offs, contrasted with a principle-based prompt that guides judgment and trade-offs. Excerpts that illustrate rule-like framing are scarce in the provided list, but several entries describe principle-based prompts used in Constitutional AI and related systems, which directly illuminate the contrast you’re querying. Specifically, a statement describing Constitutional AI training as formatted to say “Choose the response that is more X” points to a framing that nudges evaluation through a comparative criterion (a guiding principle rather than a strict prohibition). More directly, example principle texts such as “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical” embody a reasoning-guiding prompt rather than a rigid ban. Additional notes emphasize balancing harm, avoiding condescension, and adjusting emphasis across multiple dimensions, which all illustrate how principles shape nuanced evaluation rather than impose a binary prohibition. Together, these excerpts support the notion that a rule-based prompt would be a hard constraint with no guidance for trade-offs, whereas the cited materials show principle-based prompts providing context, trade-off handling, and evaluative criteria. The contrasts described (principles being selected or prioritized, and prompts that temper or modulate behavior rather than merely forbidding actions) align with the defined finegrained field value and illustrate practical implementations of rule-based versus principle-based prompts in real systems. This collection therefore supports the interpretation that rule-based prompts are distinct from, and less nuanced than, principle-based prompts as used in evaluation and critique pipelines.

- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Are these principles prioritized in any way?
The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence).
  > Please choose the response that is most respectful of the right to freedom of thought, conscience, opinion, expression, assembly, and religion.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)

### rule_vs_principle_based_prompts.rule_based_example
**Confidence:** medium

The most relevant excerpt presents a concrete, high-level example of a guiding principle that seeks to maximize harmlessness and ethical consideration while avoiding toxic or harmful outputs. This aligns with a principle-based approach to prompts that governs output quality without relying on opaque or blanket prohibitions. Other excerpts reinforce this by describing Claude’s Constitution style prompts that select for minimal harm, ethical awareness, and proportionate responses, which illustrate how a principle-based framework operates in practice to constrain or guide reasoning and output. Additional excerpts discuss the general format of principle-driven prompts (for example, choosing the more harmless or ethical response) and how such principles are evaluated and applied during critique or revision phases, which directly relate to the idea of rule-based vs. principle-based prompts. Collectively, these excerpts support the field value by showing concrete principle formulations, their intended effects on reasoning quality, and how they contrast with more prescriptive rules. The content about modifying CAI models and broader classifications of principles provides context for implementation patterns and readiness for reusable prompt architectures in design evaluation, code review, and creative critique tasks.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Are these principles prioritized in any way?
The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase.
  > Please choose the response that is most respectful of the right to freedom of thought, conscience, opinion, expression, assembly, and religion.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence).
- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”

### multi_step_reasoning_prompt_architectures.2
**Confidence:** medium

The target field value names a concrete iterative reasoning architecture called Self-Refine, with a cycle INIT/GENERATE -> FEEDBACK -> REFINE, including how the initial output is produced, followed by a critique stage that yields flaws or improvements, and a refinement stage that revises the output to address those critiques. The most directly supportive content explicitly describes this exact loop: an iterative self-refinement algorithm that alternates between FEEDBACK and REFINE, where the model first generates an initial output, then critiques it against criteria, and then revises it, potentially repeating. This aligns with the requested pattern of encoding reasoning as an iterative improvement cycle for design evaluation or critique tasks. Supporting evidence from related prompts in the literature shows practical deployments of structured, multi-step reasoning in evaluation and critique contexts (for example, prompt templates used to generate LLM reviews), which corroborates the broader feasibility and usefulness of multi-step reasoning scaffolds in design-oriented tasks. Additional sources discuss evaluation frameworks that use chain-of-thought reasoning to assess outputs, illustrating how structured reasoning patterns translate into concrete evaluation and critique workflows in UI/UX and design domains. Together, these excerpts substantiate the existence and practical utility of a self-refine-like loop for design reasoning and critique prompts.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### reusable_prompt_architecture_patterns.4
**Confidence:** medium

The most directly relevant material describes concrete prompt templates used in design-related evaluation and critique contexts, showing how prompts are structured to guide multi-step reasoning and evaluation rather than just generic advice. This aligns with a reusable prompt architecture that can implement a self-refinement process by providing explicit templates for generating critiques, followed by structured refinement steps. Additionally, explicit references to a chained prompt design for design evaluation illustrate how a sequence of tasks (idea generation, critique, refinement) can be codified into a pattern suitable for iterative improvement in design tasks. Supporting context from UI critique frameworks and LLM-based feedback demonstrations demonstrates that multi-criteria evaluation and structured critique prompts are practical in real systems, which reinforces that a self-refine loop with stop conditions can be embedded within such architectures. Mentions of broader evaluation frameworks and reasoning-oriented evaluation tools help justify why and how a self-review phase would be integrated, including the importance of evidence-backed refinements and prioritization of improvements. Collectively, these excerpts sketch the components and surrounding practices that underpin a Self-Refine Critique Loop in design/visual tasks, including concrete prompt templates, chained evaluation prompts, and multi-criteria considerations that prevent collapse to a single dimension.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### self_refine_for_design_and_visual_tasks.application_to_visual_tasks
**Confidence:** high

The targeted field value describes an adaptation of the Self-Refine loop specifically for design and UI evaluation tasks, including a two-call chain: generate a critique (detect violations) and refine into constructive advice, with enhancements like feeding user dismissals as negative examples and model reflection to improve performance. The most directly relevant excerpt explicitly presents SELF-REFINE as an iterative refinement approach and notes the two-step interaction (generate + refine) that aligns with the described design-focused adaptation. A closely related excerpt discusses Self-Refine as an approach to improve initial outputs through iterative feedback and refinement, reinforcing the same core mechanism (critique followed by refinement) and its use in practice. A third excerpt, while not detailing Self-Refine, discusses prompt templates for generating LLM reviews and critiques, which supports the broader theme of structured critique prompts in design/analysis tasks, though it is more tangential to the Self-Refine loop itself. Taken together, these excerpts corroborate the existence of a design/UI-oriented refinement workflow and the general use of critique-then-refine or template-based critique prompts in design-related settings.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta

### creative_critique_prompts.0
**Confidence:** high

The requested fine-grained field specifies a Peer Review Emulation prompt structure with clearly defined sections: a Summary, Strengths, Weaknesses, Actionable Suggestions, an optional Ethics & Harm Check, and an Overall score with justified reasoning. This aligns with excerpts describing concrete prompt templates used to generate LLM reviews and critique prompts in experimental papers, showing how prompts are designed to elicit multi-part evaluations. One excerpt explicitly references detailed prompt templates used throughout a study to generate LLM reviews, indicating that such structured prompts exist and are reusable in practice. Another excerpt discusses G-Eval’s evaluation framework, highlighting a prompt, an automatic chain-of-thought reasoning component, and a scoring function, illustrating how multi-step reasoning and structured evaluation are embedded in prompts. Additional excerpts discuss Claude’s Constitution and the evolution of principles used to critique and refine outputs, including guidance that distinguishes between broad principles and more specific, actionable critique prompts, which is relevant for designing prompts that guide structured, multi-faceted critique rather than simple rule-based outputs. Collectively, these excerpts support the existence and usefulness of concrete, reusable prompt architectures for design reasoning and critique tasks, including multi-section evaluation formats and principled reasoning prompts that could be adapted into a Peer Review Emulation structure with explicit sections and scoring. 

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.

### influential_research_and_papers.1
**Confidence:** high

The field value describes a paper introducing SELF-REFINE, an iterative loop where an LLM generates feedback on its own output (FEEDBACK) and then refines its output (REFINE). It specifically notes that explicit prompts for this loop are provided and highlights an application to improving code readability as a concrete method for iterative self-improvement on structured tasks. The excerpt explicitly states: 'SELF-REFINE: an iterative self-refinement algorithm that alternates between two generative steps—FEEDBACK and REFINE. These steps work in tandem to' and mentions 'explicit prompts for this loop' and 'improvement ... on structured tasks.' This directly confirms the existence of a concrete SELF-REFINE framework with prompts, aligning precisely with the fine-grained field value. 

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### self_refine_for_design_and_visual_tasks.feedback_prompt_structure
**Confidence:** high

The fine-grained field value centers on a feedback prompt structure that causes the model to act as a critic of its own prior work, specifically within design tasks, and to assess aspects like specificity, evidence, and potential false positives before refining output. Excerpt describing SELF-REFINE presents the core mechanism: an iterative feedback and refinement loop where feedback and refinement steps are conducted in tandem, directly supporting the idea of a feedback prompt guiding self-critique. The second excerpt reinforces this by naming SELF-REFINE as an approach to improve initial outputs through iterative feedback and refinement, which aligns with a structured feedback prompt that precedes refinement. The third excerpt references prompt templates for generating LLM reviews, including critique-oriented prompts, which demonstrates concrete prompt structures for evaluative critique tasks, relevant to the design/visual critique context. The fourth excerpt discusses AI-assisted code review as a scaffold for code quality, illustrating practical application of critique prompts within a review workflow, which complements the concept of a feedback-driven critique step used before refinement in multi-domain design tasks. Together, these excerpts collectively support the existence and practical implementation of a feedback prompt structure that enforces self-critique prior to refinement, and they illustrate concrete templates and workflows that embody this pattern in design, code, and review contexts.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a

### multi_criteria_reasoning_prompts.prompt_structure
**Confidence:** high

The finegrained field value describes a concrete, reusable prompt architecture that embeds a structured rubric within the prompt and requires per-dimension evaluation with explicit definitions, checklists, ratings with rationale, and actionable suggestions. Excerpts that discuss a chain of prompts for design evaluation that is organized by major tasks and follow a prompt design that mirrors a multi-dimensional rubric are directly aligned with this requirement. They show a design where evaluation is decomposed into components and where templates demonstrate how to capture per-dimension evidence and recommendations, which supports the claim of a reusable, structured rubric-enabled prompt architecture. Other excerpts illustrate related approaches: UI critique frameworks that separate evaluation into distinct criteria (usability, aesthetics, accessibility, etc.), and the use of prompt templates that enable systematic, dimension-separated feedback for design or UI evaluation. These collectively demonstrate concrete, multi-criterion evaluation patterns and templates that align with embedding a rubric and per-dimension output in prompts. Some excerpts discuss broader evaluation methodologies (G-Eval, CoT-based assessment) and actor-specific prompts for reviews, which provide contextual support but are less central to the explicit, dimensional rubric structure described, yet they corroborate the value of structured reasoning in evaluation tasks. Overall, the strongest support comes from sources that describe explicit task-specific prompt templates and multi-criteria breakdowns, while additional sources provide corroborating context on structured critique and UI evaluation workflows.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### self_refine_for_design_and_visual_tasks.refine_prompt_structure
**Confidence:** high

The field value describes a refinement workflow where the model takes original output and prior feedback to generate an improved version, and for design critique specifically, produces an improved critique plus a prioritized set of UI actions with concrete changes and impact. The strongest support comes from passages that explicitly describe SELF-REFINE as an iterative process consisting of feedback and refinement steps, which directly mirrors the described refine prompt cycle. Additionally, passages that discuss concrete prompt templates and prompts used for reviews illuminate how structured reasoning and multi-step evaluation are embedded in prompts, which is highly relevant to designing a refine prompt structure. The code-review and UI/UX critique contexts in the excerpts illustrate practical applications of such prompts to yield actionable outputs (edits, prioritization, and concrete actions), reinforcing the applicability of a refine-prompt pattern to design and visual tasks. Taken together, these excerpts support the existence and design of a refine prompt structure that ingests original outputs and feedback to produce improved, action-oriented results for design and UI evaluation, consistent with the described fine-grained field value.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a

### multi_step_reasoning_prompt_architectures.1
**Confidence:** high

The described field value refers to a G-Eval style prompt architecture where each evaluation criterion is handled through a two-step process: first, an internal chain-of-thought style reasoning to analyze the content, and second, the completion of a structured form that outputs a numeric score, supporting quotes, and an actionable comment for each criterion. Excerpt that explicitly outlines that G-Eval uses a prompt, includes automatic chain-of-thought reasoning, and a scoring function, directly supports this architecture. Another excerpt reiterates that G-Eval employs chain-of-thoughts to evaluate generated texts, aligning with the internal reasoning step. A third excerpt provides a broad description of G-Eval as a framework using LLMs as judges with CoT for evaluating outputs against custom criteria, which corroborates the multi-criterion evaluation context. Additional related materials discuss UI evaluation tools and heuristic design for evaluation systems, which, while tangential, illustrate practical implementations of evaluation pipelines and can contextualize form-based outputs, even though they do not specify the exact CoT + form-fill structure. Collectively, these excerpts map well to the two-step CoT reasoning followed by structured output per criterion and the mult criteria evaluation workflow described in the field value.

- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [G-Eval Simply Explained: LLM-as-a-Judge for ...](https://www.confident-ai.com/blog/g-eval-the-definitive-guide)
  > Oct 10, 2025 — G-Eval is a framework that uses LLM-as-a-judge with chain-of-thoughts (CoT) to evaluate LLM outputs based on ANY custom criteria. It leverages an automatic
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### influential_research_and_papers.0
**Confidence:** medium

The core finegrained field value references a concrete, two-pass prompt architecture for UI critique that explicitly uses a Detect→Rewrite chain to produce structured, heuristic-guided feedback, with evidence that such prompts improve output quality and diversity compared to generic prompts. The most directly relevant content describes an LLM-based heuristic evaluation plugin designed for UI mockups (e.g., Figma) and lays out the system-level design goals and how the critique is produced, which aligns with the concrete prompt architectures and templates sought. Additional excerpts describe a framework that divides UI evaluation into multiple criteria (usability, content, aesthetics, etc.), illustrating how prompts are structured to address multi-criteria evaluation rather than collapsing to a single dimension, which supports the notion of concrete, multi-faceted prompt templates for design reasoning. Other excerpts discuss an iterative refinement approach in design evaluation contexts (SELF-REFINE), demonstrating a related loop where feedback informs subsequent refinement, which corroborates the value of generate→critique→refine style prompts in design tasks. Collectively, these sources provide concrete examples of UI critique prompts, heuristic evaluation tooling, and iterative refinement loops that map onto the requested two-pass, structured-thinking patterns for design evaluation and critique tasks.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### multi_step_reasoning_prompt_architectures.4
**Confidence:** high

The field value describes a concrete multi-step workflow where an LLM evaluates a draft against a specific constitutional principle, then proposes a revision, and finally notes any value trade-offs or conflicts with other principles, applying this process for each principle before producing a final draft. The most relevant excerpt states that Claude’s Constitution guides critiques and revisions during training and evaluation, with the model selecting principles to apply when critiquing and revising outputs, which directly maps to evaluating against a principle and producing revised output. Supporting evidence shows explicit principle-based behavior, including targeting outputs to be harmless and ethical, which aligns with the Evaluate step against a principle. Additional excerpts discuss balancing or tempering the model’s responses to avoid harm or over-assertiveness, illustrating the Note Trade-offs aspect and the need to compare across multiple principles. Other excerpts elaborate on the broad existence and practical use of constitutional principles, including how they are prioritized or tempered, which provides useful context for the intended per-principle critique loop, even if they don’t spell out every step explicitly. Taken together, these excerpts support the existence and structure of a principle-driven critique-and-revise workflow, including evaluation against a principle, revision proposals, and consideration of trade-offs across principles, prior to producing the final response.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Are these principles prioritized in any way?
The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### code_review_agent_prompts.1
**Confidence:** high

The finegrained field value describes a CodiumAI PR-Agent prompt template for automated pull request reviews, including constraints like citing specific code lines, proposing minimal safe diffs, and structuring output as inline PR comments. Excerpts that directly discuss concrete code-review oriented LLM prompts and architectures provide the strongest support. A paper that presents explicit prompt templates used for experiments and includes prompts for generating LLM reviews aligns closely with the requested concrete prompt architecture patterns for design reasoning and critique tasks in code review contexts. Additional excerpts discuss integrating LLMs into code review workflows and evaluators that rely on step-by-step or chain-of-thought style reasoning, which clarifies how multi-step reasoning and justification are embedded in prompts and evaluation pipelines. Others provide concrete tooling examples (such as GitHub PR integration and automated review agents) that illustrate how such prompts are operationalized in real-world platforms, reinforcing the notion of reusable prompt architectures for complex judgment like code design and review. Collectively, these sources corroborate the existence of structured prompt templates, exemplars for code reviews, and guidelines for citing code lines and proposing minimal diffs, which directly support the requested field value describing a PR review assistant’s prompt template and behavior.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### influential_research_and_papers.2
**Confidence:** high

The finegrained field value centers on a concrete evaluation framework that combines a structured reasoning approach (Chain-of-Thoughts) with a form-filling rubric to evaluate natural language generation, and asserts that this approach raises agreement with human judgments and yields a reusable pattern for reasoning-based evaluation. The most directly supporting content describes a framework (G-Eval) that uses chain-of-thought and a form-filling paradigm to assess NLG outputs, explicitly naming the approach and its goal of better aligning model judgments with human evaluators. The accompanying sources further articulate that the framework involves stepwise reasoning for each evaluation aspect before filling the rubric, which directly maps to the field value’s description of a structured, reusable reasoning pattern. Additional corroboration comes from parallel presentations of the same framework in different venues (conference vs. arXiv) that reiterate the CoT + form-filling approach and its purpose. Context about constitutional prompts (Claude’s Constitution) is informative for broader prompt design but does not directly substantiate the specific G-Eval pattern, so it is mentioned only as peripheral background rather than core support.

- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### code_review_agent_prompts.0
**Confidence:** high

The finegrained field value specifies a concrete multi-agent code review system with a designated command, role-based critics, and an arbiter that merges outputs into a consolidated JSON review with inline references. The most relevant excerpts directly address prompt templates and concrete prompt architectures used for code review or critique tasks. The excerpt detailing detailed prompt templates used for experiments in generating LLM reviews provides explicit structure that aligns with the idea of a reusable prompt architecture for evaluation and critique tasks. The excerpts describing how code review workflows can be integrated with LLMs and how an LLM acts as a reviewer within pull requests offer concrete architectural patterns for implementing a multi-agent code review system and show how roles are separated and how outputs are organized. Additional excerpts discuss evaluating LLM-based evaluators and code-specific tooling, which contextualize the effectiveness and tooling around such systems. Taken together, these excerpts support the notion of a structured, multi-agent approach to code review with role-specific prompts and a consolidation step, illustrating both the prompt design patterns and the system-level workflow implied by the target field value. The strongest alignment is with explicit prompt templates and role-based critique prompts; progressively, the other excerpts extend the architectural and evaluative context for such systems.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### influential_research_and_papers.3
**Confidence:** high

The finegrained field value centers on Claude’s Constitution as a training methodology where principles are used as short, broad, comparative instructions rather than long, specific rules, and where the model critiques and revises its outputs guided by these principles. The most directly relevant excerpt describes how the model pulls a principle during critique and revision and references training phases, which directly supports the notion of a principle-based approach rather than rigid rules. Excerpts detailing tempered application (to avoid condescension or excessive preachiness) further reinforce the idea that principles are used in a nuanced, context-aware manner rather than blunt prohibition rules. Concrete examples that state a principle like choosing the more harmless and ethical response illustrate the shift from rule-bound to principle-guided reasoning. Additional excerpts explicitly compare harfmulness and discuss how to balance safety with helpfulness, which aligns with the principle-based, comparative framing. The overview excerpt succinctly introduces Claude’s Constitution and the general philosophy behind CAI, providing context for the described mechanisms, while the remaining items elaborate the specific effects and careful calibration during evaluation and generation. In sum, the selected excerpts collectively support the claim that CAI emphasizes principle-driven, comparative guidance over rigid rules, with explicit training and refinement behaviors to maintain ethical and effective outputs.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.

### influential_research_and_papers.4
**Confidence:** high

The targeted finegrained field value discusses operationalizing public input into comparative principles within Constitutional AI, specifically through prompts that guide the model to choose outputs based on relative harm, ethics, and usefulness. Excerpt describing that the model calls upon a principle during critique and revision phases demonstrates the core mechanism of employing a set of comparative principles rather than static rules. Excerpts that present explicit template-like prompts—such as choosing the assistant response that is harmless and ethical, and selecting based on ethical and moral awareness without sounding condescending—provide concrete implementation details of how these principles are invoked in practice. Additional excerpts explain tempering the model’s responses to avoid overbearing judgment and to compare harmfulness while remaining measured, which illustrates how a principled, reasoning-based approach is operationalized rather than relying solely on blunt rules. Surrounding discussions of broader constitutional prompts and the general philosophy of CAI provide necessary context about where these templates come from and how they fit into the training and evaluation pipeline. Together, these excerpts directly support the notion of converting public input into principled, template-driven comparison and critique prompts used in design evaluation and related judgment tasks, matching the described field value.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.

### rule_vs_principle_based_prompts.principle_based_example
**Confidence:** medium

The finegrained field value asserts that when comparing candidate critiques, one should choose the critique that is least likely to cause harm or offense, favoring respectful and specific language, and frame sensitive content factually when necessary. Excerpts show concrete principle-based prompts and their intended behavior: a broad principle that encourages selecting the most harmless and ethical response, avoiding toxic or harmful content; guidance that aims for a proportional, non-condescending tone; and the practice of using specific, recurring prompts to steer critique and revision toward safer outputs. For example, a prominent principle instructs: 'Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.' This directly aligns with preferring safer, more respectful language. Additional excerpts describe calibrating the model to avoid judgmental or overly preachy tones while still maintaining moral awareness, which supports the idea of balancing harm minimization with usefulness. There is also explicit evidence that during training, different principles are selected to critique and revise outputs, showing how principle-based prompts guide evaluation rather than generic or rigid rules. The collection also demonstrates that practices exist to structure principles around a spectrum (commonsense safety to philosophical considerations) and to ensure sensitivity framing remains factual and constructive when needed. Together, these sources corroborate the target value about preferring least-harmful, respectful, and precisely framed feedback in design or critique tasks, and they illustrate the concrete architectures and patterns behind such reasoning prompts.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > Are these principles prioritized in any way?
The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase.
  > Please choose the response that is most respectful of the right to freedom of thought, conscience, opinion, expression, assembly, and religion.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)
- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”

### rule_vs_principle_based_prompts.principle_based_definition
**Confidence:** high

The most relevant excerpt confirms that constitutional AI principles are commonly structured as selection tasks: “Choose the response that is more X.” This directly demonstrates the comparative prompt template at the core of a principle-based approach. The next highly relevant excerpt describes explicitly comparing responses to minimize harm, i.e., selecting the less harmful option, which is a concrete instantiation of the comparative reasoning prompt. Another excerpt provides a concrete principle used in training that endorses selecting the most harmless and ethical option, illustrating how the comparative evaluation is framed as a guiding criterion. Additional excerpts elaborate on how the model is prompted to critique and revise by applying principles and by pulling a subset of principles during evaluation, which aligns with the idea of a reasoning scaffold that operates through comparative evaluation rather than rigid rules. Supporting excerpts provide concrete examples of wording (harmless, ethical) and adjustments to behavior (proportionate, non-condescending) that demonstrate how principle-based prompts are tuned to balance evaluation with style, further grounding the concept in practice. The remaining excerpts reinforce that these principles are used across different formulations (harmless, ethical, respectful) and across phases of training and evaluation, which corroborates the broad applicability of comparative, principle-driven prompts in design evaluation, code review, and creative critique contexts. Together, these excerpts substantiate that a principle-based prompt operates as a lens for critique and self-revision through explicit comparative instructions rather than mere compliance rules, and they show how such prompts are implemented in real systems (e.g., CAI and Anthropic practices).


- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Are these principles prioritized in any way?
The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence).
  > Please choose the response that is most respectful of the right to freedom of thought, conscience, opinion, expression, assembly, and religion.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
  > Our principles run the gamut from the commonsense (don’t help a user commit a crime) to the more philosophical (avoid implying that AI systems have or care about personal identity and its persistence)

### self_refine_for_design_and_visual_tasks.process_loop
**Confidence:** high

The target finegrained field value is a description of the Self-Refine process as an iterative loop with two generative steps, FEEDBACK and REFINE, used to improve an initial output, and an explicit design-oriented interpretation where a reusable scaffold describes this as a Generate -> Critique -> Refine loop for design tasks (generate a structured critique, self-critique for specificity/evidence, then refine and produce a prioritized fix list). The most relevant excerpts directly quote or summarize this self-refinement mechanism: one excerpt states that SELF-REFINE is an iterative approach that alternates between FEEDBACK and REFINE to improve outputs, aligning with the described loop and its stopping conditions. Another excerpt explicitly frames SELF-REFINE as a method for improving initial outputs through iterative feedback and refinement. A third excerpt documents prompt templates and materials around LLM reviews, including concrete prompts used for evaluation and critique, which supports the broader context of concrete prompt architectures that encode multi-step reasoning for evaluation and critique, reinforcing the practical implementation of such loops in design/critique tasks. The combination shows both the mechanics of the iterative loop and its concrete application in design/critique prompts, matching the requested field value.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta

### design_and_ui_evaluation_prompts.1.framework
**Confidence:** medium

The fine-grained field value points to a concrete adaptation of the G-Eval evaluation framework for design critique. The most directly relevant excerpt describes a framework for evaluating UI design quality by splitting evaluation into distinct criteria such as usability, content, aesthetics, reputation, and customization, which aligns with the idea of a structured, multi-criteria evaluation system suitable for design critique prompts. Supporting context from the other excerpts shows how G-Eval is built around chain-of-thought reasoning and a form-filling paradigm to assess generated content, which underpins a reusable prompt architecture pattern for structured evaluation tasks. Taken together, these excerpts corroborate the feasibility and structure of applying G-Eval-like reasoning and explicit evaluation templates to design critique workflows, including multi-criteria assessment and form-based reasoning traces. The combination of a UI/ design-focused evaluation framework and the described CoT/form-filling approach provides concrete evidence that a design critique adaptation of G-Eval can exist and be implemented with explicit prompt templates and structured reasoning patterns.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### reasoning_pattern_libraries_examples.3
**Confidence:** medium

The finegrained field value describes a library of prompt templates tailored for critique tasks (creative and scholarly) that structure the LLM output into standardized sections such as Summary, Strengths, Weaknesses, Actionable Suggestions, and an Overall Score with Justification. The most directly supporting excerpt states that the paper provides detailed prompt templates used in experiments, including prompts for generating LLM reviews, which aligns with the idea of concrete, reusable templates for critique tasks. This excerpt explicitly mentions templates intended for review generation, which corresponds to the peer-review emulation aspect described in the field value. A second excerpt discusses G-Eval and the three main components of LLM evaluation prompts, highlighting that the prompt is a key part of the evaluation pipeline and that CoT reasoning and a scoring function are involved. While not explicitly listing the exact peer-review sections, it confirms that there are structured prompt architectures for evaluation tasks and that prompts play a central role in producing reasoned outputs. Taken together, these excerpts support the existence and utility of reusable, structured prompt architectures for critique and evaluation tasks, with direct evidence of detailed review-style templates in one excerpt and a broader emphasis on structured prompts in evaluation systems in the other. 

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### code_review_agent_prompts.2
**Confidence:** medium

The core field value describes a concrete iterative process for improving code readability via a two-prompt loop: a FEEDBACK prompt that critiques readability and a REFINED prompt that rewrites code using the feedback. Excerpts that discuss concrete prompt templates used for LLM reviews or critique show direct alignment with the idea of structured prompts guiding evaluation and critique in code-related tasks. For example, the reference to detailed prompt templates used in experiments, including prompts for generating LLM reviews, indicates a practical, template-based approach to structured reasoning in code review contexts. Similarly, demonstrations of evaluation frameworks like G-Eval, which emphasize reasoning (CoT) and form-filling, illustrate concrete architectures for multi-step evaluation and output formatting that can influence how a self-refine loop might collect feedback and produce improved code. Additional excerpts discuss integrating LLM-assisted code review into real workflows and scaffolds that support code quality assessment, which reinforce the practical viability and design considerations of a self-critique loop in real-world tooling. Together, these excerpts support the notion of concrete, reusable prompt architectures for design reasoning in coding tasks, which aligns with the described Self-Refine for Code Readability pattern. The presence of discussions about prompt templates for generating reviews and about evaluation prompts (including reasoning and form-filling) helps establish the technical and methodological backdrop needed to implement a two-prompt iterative improvement cycle.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### reasoning_pattern_libraries_examples.2
**Confidence:** medium

The field value describes concrete, reusable scaffolds for code review agents, including explicit checklists and prompt patterns that guide how reviews are generated (e.g., avoid certain actions, cite line numbers, keep suggestions minimal and safe). Excerpt 0 directly mentions detailed prompt templates used in experiments for generating LLM reviews, which aligns with the idea of structured, reusable prompt architectures for evaluation or critique tasks. This supports the notion of concrete templates and patterns that could function as a reasoning library or set of skills for code review agents. Excerpt 6 presents Self-Refine, an iterative generate→critique→refine loop, which exemplifies a concrete workflow for improving outputs through structured reasoning and feedback. This aligns with building robust code review routines that can iterate on reviews and refine them, a key component of a reasoning library or skill set. Taken together, these excerpts provide direct evidence of concrete prompt templates and iterative refinement workflows that could be adopted or adapted as code review-specific skills or checklists within a reasoning library. Other excerpts center on evaluation frameworks and general CoT approaches, which are related but less directly tied to code-review-specific skills or checklists.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.

### key_frameworks_and_methods.2
**Confidence:** high

Constitutional AI training is described as using principles that guide the model's outputs. One excerpt notes that principles for Constitutional AI are typically formatted as instructions to the model, with a template such as “Choose the response that is more X,” which directly shows how a principle-based reasoning prompt differs from a simple rule. This aligns with the described distinction between principle-based prompts and rule-based prompts, illustrating how a reasoning prompt can shape judgment rather than merely restrict output. Another excerpt provides an overview of Collective Constitutional AI, explaining that the principles used are intended to align AI behavior with safety and ethical considerations, and that these principles are applied during critique and evaluation phases, which supports the field value’s focus on training-time structures for alignment. Additional content discusses translating public statements into CAI-compatible principles and using a template to minimally modify statements to fit the CAI framework, highlighting practical prompt engineering to encode constitutional reasoning. Further excerpts include concrete examples of Claude’s Constitution, such as the idea that the model selects the most harmless and ethical response and the process by which principles influence grading and selection during training. There is also detail on tempering CAI behavior to avoid being overly condescending or preachy, which demonstrates nuanced principle formulation to balance effectiveness with user experience. Taken together, these excerpts connect directly to how CAI is structured as a reasoning framework (as opposed to a hard rule) and show concrete prompt architectures and templates used to implement constitutional reasoning for alignment tasks.

- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > Jun 12, 2024 — For the Standard constitution, we took the constitution outlined in an Anthropic blog post (Anthropic, 2023a) , which is used to fine-tune the Claude (Anthropic
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.

### influential_research_and_papers.5
**Confidence:** high

The finegrained field value references a 2024 work that provides a multi-criteria rubric for evaluating UI design quality, breaking it into usability and aesthetics, with further decomposition into learnability and efficiency. It also states that this work validates the prompt chain design from a previous 2024 study on UI critique, demonstrating that structured, multi-faceted evaluation prompts can be effective at scale. Excerpts that describe five criteria for UI design evaluation (usability, content, aesthetics, reputation, customization) directly reflect the multi-criteria approach and align with the described rubric in the field value. Excerpts that outline a concrete chain-of-prompts for major tasks and show how prior prompt designs (Duan et al. 2024) are used to structure design evaluation/testing illustrate the explicit connection to a structured prompt architecture for design critique. Concrete UI feedback tooling (e.g., an LLM-based heuristic evaluation plugin for Figma) demonstrates real-world instantiations of such evaluation frameworks, showing how the prompt-driven evaluation can be operationalized in design tools. Additional mention of SELF-REFINE for design or visual tasks shows a related loop where critique and refinement are applied to design decisions, consistent with a structured reasoning workflow in evaluation and critique. Taken together, these excerpts corroborate the field value's claims about (i) a concrete, reusable multi-criteria evaluation framework for UI critique, (ii) validation of a structured prompt-chain design across large-scale evaluation, and (iii) practical instantiations that embody the design-evaluation reasoning workflow.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### key_frameworks_and_methods.4
**Confidence:** high

The most relevant excerpts describe Reflexion as a framework where language agents learn by verbal reinforcement, self-reflection, or updating their behavior based on reflections. One excerpt explicitly names Reflexion and discusses how agents learn to optimize behavior by reflecting on past decisions and leveraging that reflection to guide future tasks, which directly supports the idea of a self-reflection loop that improves performance. Another excerpt provides the HTML-accessible articulation of Reflexion, illustrating how the framework operates in practice and how it supports decision-making, programming, and reasoning tasks through verbal reinforcement and reflection. The third excerpt presents more background context on Reflexion, including discussions of how Verbal Reinforcement Learning applies to Reflexion-driven agents. Together, these excerpts establish the core mechanism (self-reflection to revise internal reasoning and prompts) and its demonstrated impact on performance, aligning with the described use case of improving UI evaluation by reflecting on past designer-suggested (but dismissed) inputs and applying that insight to future trials.

- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been

### design_and_ui_evaluation_prompts.0.evaluation_criteria
**Confidence:** medium

The most relevant content describes concrete UI heuristic evaluation and related tooling. Excerpt describing an LLM-based heuristic evaluation plugin for Figma directly aligns with applying heuristics to evaluate design artifacts, which can reveal violations when known heuristics aren’t satisfied. Excerpt detailing the design goals for an automatic LLM-driven heuristic evaluation tool outlines the intended evaluation criteria and how heuristics are operationalized in practice, providing a basis for identifying where heuristics may be violated. Excerpt outlining a framework that separates UI design quality into distinct criteria offers a structured lens to compare actual results against established heuristics, enabling detection of violations across multiple heuristic dimensions. Excerpt discussing a chain-of-prompts approach for major tasks in UI evaluation demonstrates how reasoning and evaluation steps are encoded, which is relevant to how violations could arise if prompts do not enforce heuristic constraints. Other excerpts center on general evaluation methodologies (NLG, CoT) or non-heuristic aspects of design critique; they provide contextual background but are less directly tied to identifying heuristics violations in design evaluation. Collectively, these sources support understanding how concrete prompt architectures and evaluation prompts can surface violations of known design heuristics when assessing UI and design artifacts.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### reasoning_pattern_libraries_examples.0
**Confidence:** high

The requested field value centers on concrete, reusable prompt architecture patterns for evaluation tasks, specifically G-Eval-style rubric patterns that combine structured reasoning with form-filling outputs. The most directly supportive content identifies actual prompt templates and the structural design of evaluation prompts, including detailed prompts used in experiments and the core components of G-Eval (prompt, automatic chain-of-thought reasoning, and a scoring function). The strongest evidence comes from descriptions of the detailed prompt templates used for generating LLM reviews and from explanations of how G-Eval is composed of prompting, CoT reasoning, and a scoring mechanism. Additional excerpts expand on how CoT-based evaluation is paired with form-filling paradigms to assess NLG outputs, reinforcing the pattern library concept. A related but less central excerpt discusses iterative refinement, which is a broader design technique rather than a core pattern library component for evaluation prompts; it provides contextual relevance but does not directly present the rubric patterns themselves. Taken together, these excerpts support the existence and utility of a library of reasoning patterns for evaluation tasks, with emphasis on multi-step reasoning and structured outputs that align with the finegrained field value. The most relevant pieces directly describe concrete templates and the architectural organization (prompt + CoT reasoning + form-filling) that underpin these rubric patterns, while others offer corroborating details about implementation and evaluation practices that bolster the overall claim.


- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.

### design_and_ui_evaluation_prompts.1.evaluation_criteria
**Confidence:** medium

The strongest support comes from excerpts that explicitly articulate a design/evaluation framework broken into multiple criteria. One excerpt describes a framework for evaluating UI design quality by separating it into usability, content, aesthetics, reputation, and customization, which maps closely to the requirement for a multi-criteria rubric that includes aesthetics and usability. Another excerpt similarly enumerates five criteria for UI design evaluation (usability, aesthetics, etc.), reinforcing the multi-criteria approach and showing concrete templates for judging design quality across dimensions. While these provide solid, concrete patterns for multi-criteria evaluation in design contexts, they do not fully cover accessibility and brand coherence as separate, explicit criteria in every case; however, usability (including learnability and efficiency), aesthetics, and brand-related considerations appear in the cited materials, aligning with the requested rubric components. Other excerpts focus on NLG evaluation with chain-of-thought prompts and form-filling paradigms, which are relevant for reasoning scaffolds in evaluation tasks but do not directly provide the design-focused multi-criteria rubric details requested here. Taken together, the strongest evidence supports a multi-criteria design evaluation rubric that includes aesthetics and usability (and mentions related aspects like customization), while leaving accessibility and brand coherence as gaps to be supplemented from additional sources.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### key_frameworks_and_methods.3
**Confidence:** high

The most directly relevant information describes an iterative self-improvement loop for LLM outputs, which aligns with a two-pass architecture: first, a pass that generates feedback or critique (the detection/feedback phase); second, a pass that refines or rewrites the output based on that critique (the rewrite/refinement phase). One excerpt explicitly defines SELF-REFINE as an iterative self-refinement algorithm that alternates between two generative steps: FEEDBACK and REFINE, which maps cleanly onto a detect-then-rewrite workflow for UI/UX critique. Another excerpt states that Self-Refine improves initial outputs through iterative feedback and refinement, further supporting the notion of a structured two-pass process. Related discussions of language agents using verbal reinforcement and reflexive optimization illustrate the broader family of multi-step reasoning and improvement strategies (e.g., iterative critique, refinement, and alignment) that underpin the design of robust, multi-stage evaluation prompts. Taken together, these excerpts imply that a two-pass detect → rewrite prompt architecture can leverage a first-pass detection/critique to produce structured, machine-parseable feedback, followed by a second-pass rewrite that translates that feedback into concrete, actionable recommendations for UI/UX design.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu

### key_frameworks_and_methods.0
**Confidence:** high

The field value describes a concrete evaluation framework (G-Eval) that combines chain-of-thought reasoning with a form-filling rubric to score and justify NLG outputs. Excerpts that state G-Eval is a framework using LLMs with chain-of-thoughts and a form-filling paradigm to assess NLG outputs align directly with this description. Additional excerpts describe G-Eval as comprising three main components: the prompt, automatic CoT reasoning, and the scoring function, which corroborates the structured, rubric-based evaluation workflow implied by the field value. Other excerpts that discuss G-Eval in a more peripheral way (e.g., code repositories or mentions alongside related works) still support the core idea of a CoT-enabled, rubric-driven evaluation framework, though they are slightly less central unless they tie back to the form-filling rubric and scoring mechanism. Overall, the strongest alignment is with passages explicitly stating (a) G-Eval framework, (b) use of chain-of-thought reasoning, and (c) a form-filling paradigm or structured rubric for scoring/evidence. The included set of excerpts collectively substantiates the presence and structure of G-Eval as described, including its purpose for NLG evaluation and alignment with human judgments.

- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://aclanthology.org/anthology-files/pdf/emnlp/2023.emnlp-main.153.pdf)
  > by YLDIY Xu · Cited by 2596 — In this paper, we propose G-EVAL, a framework of using LLMs with chain-of-thoughts (CoT) (Wei et al., 2022) to evaluate the quality of generated texts in a form
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### reasoning_pattern_libraries_examples.1
**Confidence:** medium

The most directly relevant excerpt describes concrete prompt templates used for generating LLM reviews, which aligns with the request for concrete, reusable prompt architecture patterns for design reasoning and critique prompts. This aligns with the idea of having structured prompts that drive multi-step reasoning in evaluation or critique tasks. The next set of excerpts discuss practical evaluation frameworks (G-Eval, LLM evaluators) and how they employ chain-of-thought reasoning and form-filling paradigms to assess quality, which informs how to encode reasoning steps and rubrics into prompts for UI/design critique. Additional related content covers prompt architectures that enable robust evaluation via multi-part scoring and reasoning, which is pertinent to creating design critique rubrics and heuristic-based prompts. The inclusion of self-refinement work provides insight into iterative generate-critique-refine loops that could be adapted to design or visual tasks, offering practical workflow guidance. The final excerpts discuss broader evaluation methods and evidence about how instruction formats influence reasoning quality, which supports understanding how to structure prompts to produce reasoned outputs rather than solely compliant outputs. Finally, explicit mentions of reasoning pattern libraries and concrete, reusable prompt architectures for design reasoning tie directly to the target field value, but since there is less direct evidence tying those exact UI heuristics to the cited papers, they provide important but slightly less direct support.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.

### design_and_ui_evaluation_prompts.1.prompt_chain_structure
**Confidence:** high

The requested fine-grained field value describes a prompt architecture that uses a Chain-of-Thought reasoning process integrated with a form-filling output scheme, where the system prompt makes the model act as an evaluator that reasons step-by-step about multiple criteria and then outputs a final rubric in JSON, with per-aspect scores, rationales citing UI evidence, and actionable suggestions, plus a final aggregation rule. Excerpts discussing a framework that utilizes chain-of-thoughts (CoT) and a form-filling paradigm for evaluating generated text support the notion of combining CoT with structured output formats. Those excerpts also emphasize evaluating outputs by following a structured process, which matches the idea of a dedicated evaluation rubric that yields JSON-formatted results. Additionally, a UI design evaluation paper that segments evaluation into multiple criteria (usability, content, aesthetics, reputation, customization) provides concrete alignment with multi-criteria evaluation prompts and structured rubrics, which complements the field value’s focus on per-aspect scoring and a final aggregation rule. Collectively, these excerpts substantiate the existence and utility of a single, structured prompt that marries CoT reasoning with a form-filling, rubric-like JSON output, applied to design/UI evaluation contexts rather than raw freeform critique. The most relevant elements are: (i) applying CoT reasoning with a form-filling paradigm to evaluation tasks, (ii) producing a final rubric or structured JSON with per-aspect scores and rationales, and (iii) using multi-criteria evaluation prompts in UI/design contexts that enumerate explicit criteria.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### key_frameworks_and_methods.1
**Confidence:** high

Self-Refine is described as an iterative refinement process that explicitly alternates between generating feedback and refining the initial output, which directly maps to the field value’s core concept of an iterative, self-improving loop for design critique and related tasks. The exact wording indicates an INIT stage followed by a FEEDBACK step and a REFINE step, which matches the described architecture of the loop intended to improve initial outputs. Additional excerpts reinforce the idea by framing Self-Refine as an approach for enhancing outputs through iterative feedback and refinement, and by noting that this line of work has demonstrated how models can generate and improve content, with mention of design critique adaptations. Taken together, these excerpts collectively substantiate the field value’s claim about the Self-Refine loop, its components, and its demonstrated applications, including design-related tasks.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [A Survey on Code-Enhanced Reasoning and ...](https://arxiv.org/html/2502.19411v1)
  > Feb 26, 2025 — Recent researches enabled LLMs to autonomously evaluate and improve their outputs, with Self-Refine Madaan et al. (2023) demonstrated how models can generate,

### design_and_ui_evaluation_prompts.0.input_data_format
**Confidence:** medium

The most relevant excerpts describe concrete approaches to UI design evaluation and feedback generation, including explicit toolings and prompt structures for UI critique. For instance, one excerpt outlines a framework that separates UI design evaluation into five criteria (usability, content, aesthetics, reputation, and customization), which directly informs how to organize multi-criteria design evaluation prompts. Another excerpt details an automatic feedback tool for UI mockups driven by an LLM, including the goals and how such a system is realized, which aligns with concrete prompt architecture patterns for UI reasoning tasks. Additional excerpts describe a chain-of-prompt design derived from earlier UI evaluation work and show how a multi-step reasoning process can be encoded into prompts, including a figure illustrating the prompt design—this directly maps to the request for concrete prompt templates that structure reasoning patterns. Other items describe an LLM-based heuristic evaluation plugin for design tools (e.g., Figma), again providing concrete tooling that embodies prompt architecture in a design context. Less UI-specific but relevant are papers advocating G-Eval-style evaluation with CoT reasoning and form-filling paradigms, which demonstrate how to structure reasoning prompts and evaluation formats, albeit not always tied to a single-screen mobile UI layout. Collectively, these excerpts support the idea that effective design reasoning for UI evaluation relies on explicit, multi-criteria templates and stepwise prompts that guide the model through evaluation, critique, and refinement loops, as well as standardized patterns for reasoning generation and justification.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### design_and_ui_evaluation_prompts.1.input_data_format
**Confidence:** medium

The field value requires a UI-focused evaluation rubric with a structured representation (UI representation in JSON or similar) and a detailed set of evaluation aspects and their scoring. The excerpt describing a framework for automated design evaluation explicitly breaks UI quality into five criteria—usability, content, aesthetics, reputation, and customization—constituting a concrete, multi-criteria rubric that maps directly to the requested UI rubric and its factors and scoring. Other excerpts discuss: (a) the use of chain-of-thought reasoning and form-filling paradigms for evaluating NLG outputs, which informs how to structure prompts that guide evaluation, not the UI rubric itself; (b) evaluations of LLM evaluators and methodologies that show broader approaches to evaluation prompts; (c) general discussions of prompt architectures for evaluation and critique across domains; and (d) the notion of ‘G-Eval’ and CoT in evaluation. These provide contextual support for structuring prompts for multi-step evaluation and reasoning but do not directly provide a UI-specific JSON rubric or its detailed scoring dimensions. Therefore, the strongest support comes from the UI critique framework with explicit multi-criteria rubrics, followed by closely related but broader evaluation and reasoning-prompt strategies that can inform the design of concrete prompt templates for design reasoning and UI evaluation, albeit with less direct alignment to the JSON rubric aspect.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### reusable_prompt_architecture_patterns.6.domain
**Confidence:** medium

The most directly supportive material describes concrete prompt templates used to generate LLM reviews, i.e., structured prompts that encode multi-step reasoning for evaluation or critique tasks. This aligns with the target field value of concrete, reusable prompt architectures for Code Review and Design Critique, and it also touches on producing evaluative or factual reporting through structured critique prompts. Additional excerpts discuss chains of prompts for UI evaluation and a structured design-evaluation framework, which further map to Design Critique and Factual Reporting by outlining separate criteria, explicit evaluation workflows, and plugin-based or automated feedback mechanisms for design artifacts. Together, these excerpts illustrate how reasoning scaffolds are implemented as explicit prompt templates, stepwise critique chains, and multi-criteria evaluation prompts that aim to avoid single-dimension failures and to support reproducible, reportable outputs. The discussion of UI critique chains and criteria (usability, content, aesthetics, reputation, customization) provides concrete design-critique scaffolds, while the emphasis on detailed prompt templates for reviews supports Code Review and Factual Reporting through structured, templated evaluation. An example of a design-evaluation plugin for visual design (e.g., Figma) demonstrates how reusable patterns can be embedded in design workflows, which directly connects to reusable prompt architectures for design reasoning tasks. The remaining excerpts contribute context about evaluation frameworks, CoT-based approaches, and constitutional-like prompting, which enriches understanding of how different reasoning prompts influence the quality and style of outputs, but are slightly less directly focused on the concrete, reusable architecture patterns themselves. Overall, the most relevant material directly demonstrates concrete templates and multi-task critique chains; the other items provide supportive context and variations on evaluation prompts and design critique workflows.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.3.prompt_structure
**Confidence:** medium

The most relevant material directly references concrete prompt templates and multi-step evaluation workflows for critique-type tasks. Specifically, a source that discusses detailed prompt templates used for LLM reviews aligns with a system prompt that guides critique and revision. A source describing chain-of-prompts and prompt designs for multi-task evaluation further supports the idea of structuring prompts into steps and tasks, which corresponds to evaluating against multiple principles and producing revisions. A UI critique framework that splits evaluation into distinct criteria (usability, aesthetics, etc.) demonstrates multi-criteria reasoning and could underpin architecture patterns for evaluating drafts against a set of principles. Additional sources on evaluating LLM evaluators and G-Eval illustrate how reasoning chains and form-based or structured scoring can be integrated into evaluations, aligning with the notion of comparative or multi-rule guidance rather than strict prohibitions. Collectively, these excerpts support the existence of concrete, reusable prompt architectures that encode multi-step, principle-based critique and revision workflows for design-oriented tasks.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### design_and_ui_evaluation_prompts.0.framework
**Confidence:** high

The most relevant excerpt directly describes an automatic feedback tool and heuristic evaluation framework rooted in the 2024 Duan et al. work, detailing how the design goals are realized and how the system operates, which strongly supports a heuristic evaluation approach based on that 2024 reference. Another closely related excerpt discusses a design goals section for an automatic LLM-driven heuristic evaluation tool and explains how these goals are realized in the system, aligning with the Duan et al. 2024 heuristic evaluation lineage. A third excerpt explicitly notes that the prompt design follows the architecture from Duan et al. (2024), providing concrete evidence of embedding that 2024 heuristic framework into a multi-step prompt architecture. A fourth excerpt describes a framework for evaluating UI design quality with a five-criteria scheme and cites Duan et al. 2024 as the source of a prompt design pattern, illustrating how the Duan work informs structured reasoning in design evaluation prompts. An additional item references an LLM-based heuristic evaluation plugin for UI design, reinforcing the general theme of Duan-driven heuristic evaluation in design contexts, though it is a broader/earlier instance. Collectively, these excerpts establish a pattern of concrete prompt architectures and evaluation templates grounded in the Duan et al. (2024) heuristic evaluation work, supporting the target finegrained field value that this is the established basis for heuristic evaluation in design/UI tasks.

- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.3.pattern_name
**Confidence:** medium

The field value represents a named pattern for critique governed by constitutional or principle-based reasoning, followed by a revise step. The most relevant material is a source that provides concrete prompt templates used for LLM reviews and design evaluation prompts, since these are the closest to structured critique prompts that implement reasoning patterns in prompt form. The second-highest relevance comes from sources describing chains of prompts and prompt designs that enable multi-step evaluation and critique (a design- and UI-focused chain of prompts, with a prompt design pattern illustrated). This is complemented by frameworks that explicitly separate reasoning steps (chain-of-thought) from scoring in evaluation settings, which aligns with the idea of a principled critique loop that could be instantiated as a constitutional critique-and-revise pattern. Additional context on UI design evaluation criteria demonstrates multi-criteria reasoning, which supports the concept of evaluating across multiple dimensions when performing critique and revision. Finally, sources discussing general evaluation methods that rely on CoT reasoning and structured prompts underpin the reliability of using principled prompts for critique tasks, even though they do not name the constitutional approach directly.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.7.pattern_name
**Confidence:** high

The finegrained field value refers to aggregation rules used in prompts for multi-criteria evaluation. Excerpt describing the use of detailed prompt templates for generating LLM reviews provides concrete patterns for structuring evaluation tasks and could include how to aggregate judgments across components. The G-Eval related excerpt explicitly mentions a prompt, a chain-of-thought component, and a scoring function, which together imply a design that combines reasoning with an overall score, illustrating an aggregation mechanism within the prompt’s workflow. Another excerpt outlines a framework that splits evaluation into five criteria (usability, content, aesthetics, reputation, customization), which directly demonstrates multi-criteria aggregation in practice, a core part of aggregation rules in prompts. Additional references discuss automatic feedback on UI and UI design evaluation prompts, which often requires aggregating signals from multiple evaluation dimensions and presenting unified feedback or scores. Earlier or supporting works on prompt templates for LLM reviews and critique papers provide concrete templates that can encode multi-dimensional judgments, reinforcing the notion of aggregation rules as a structured part of the prompt design. Taken together, these excerpts collectively illustrate concrete architectures and templates that encode multi-criteria reasoning and scoring, aligning with the concept of aggregation rules embedded in the prompt design for design evaluation tasks.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### design_and_ui_evaluation_prompts.0.prompt_chain_structure
**Confidence:** medium

The finegrained field value describes a concrete two-pass prompt architecture for UI evaluation: first a Detection Pass that identifies concrete violations from a UI JSON using a heuristic, then an Advice Pass that converts those violations into constructive feedback following a design-coach template. Excerpts that explicitly discuss chain-of-thought style or multi-step task prompts for UI/design evaluation provide direct contextual support for building such architectures. The excerpt that outlines a chain of prompts, one per major task, illustrates the idea of decomposing a complex evaluation into structured steps, which aligns with having a separate pass for detection and a subsequent pass for critique/feedback. References discussing G-Eval and CoT-based evaluation demonstrate common prompt design patterns for structured reasoning and form-filling paradigms, which are closely related to organizing multi-step reasoning in evaluation systems. Several sources describe modular evaluation pipelines for UI/UX quality (usability, aesthetics, etc.), which corroborates the notion of designing concrete, reusable prompt architectures for design reasoning across multiple criteria. Collectively, these excerpts support the notion of a multi-step, structured reasoning workflow for evaluation and critique, including the explicit use of task-specific prompts and a subsequent critique/feedback stage. They do not, however, provide an exact verbatim two-pass template, but they offer strong empirical and architectural grounding for implementing such a workflow.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying

### reusable_prompt_architecture_patterns.6.prompt_structure
**Confidence:** high

The fine-grained field value specifies a prompt architecture discipline where a model must first anchor its critique to concrete, verifiable evidence (such as IDs, line numbers, or quotes) before providing any judgment, and that any non-evidence-based comments are discarded. The most relevant material directly discusses concrete prompt templates used in LLM critique/evaluation studies, which is exactly the kind of reusable prompt architecture the field value describes. It notes that the experiments provide detailed prompt templates for generating LLM reviews, indicating a move beyond generic guidance toward structured, template-driven reasoning and critique. Related content shows evidence-driven evaluation workflows: a form of prompt design that explicitly ties reasoning and scoring to structured inputs (e.g., including explicit source references) and a chain of prompts that handles successive tasks (from analysis to critique to refinement). Additional items discuss a multi-task prompt chain and a dedicated UI critique framework that separates usability, aesthetics, and other criteria, alluding to architectures that organize reasoning steps and evidence collection rather than collapsing to a single dimension. Together, these excerpts illustrate concrete, reusable prompt architectures and chain-of-prompt designs that align with the principle of forcing direct, verifiable citations before judgments, thereby supporting the stated finegrained field value about evidence-backed critique prompts.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.

### reusable_prompt_architecture_patterns.3.description
**Confidence:** medium

The target field describes guidance for critique and revision rooted in core principles rather than fixed rules, suitable for sensitive domains. The most relevant excerpts provide concrete, reusable prompt architectures and multi-step reasoning patterns: one excerpt reports on explicit prompt templates used to generate LLM reviews, illustrating actual prompt construction and reasoning templates; another excerpt notes a chain-of-prompts approach for multiple major tasks, illustrating how to structure prompts to cover different evaluation facets; additional excerpts discuss evaluating LLMs with CoT reasoning and the role of prompts in such evaluations, which underpins the need for structured reasoning prompts; further context shows multi-component evaluation frameworks (prompt, automatic reasoning, scoring) that align with building principled critique pipelines. Together these excerpts demonstrate practical patterns for design reasoning and critique workflows, including task decomposition and reasoning scaffolds that can support principled (as opposed to purely rule-based) guidance. The content supports the notion of using core reasoning prompts and templates rather than blunt hard rules to drive critique, evaluation, and revision in design and UI contexts.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.6.pattern_name
**Confidence:** low

The target field seeks a concrete, reusable prompt architecture pattern labeled as 'Evidence-First Comments'. While none of the excerpts explicitly define this exact pattern, several excerpts focus on concrete, repeatable prompt architectures that embed structured reasoning or evidence-based evaluation. The strongest alignment is with evidence-backed prompt templates used for generating critiques, as described in the first excerpt which details actual prompt templates used in experiments. The cited work that outlines a chain-of-prompts approach for each major task demonstrates a multi-step, task-specific architecture, which is directly relevant to designing structured reasoning protocols. Additionally, a design-evaluation framework that decomposes evaluation into usability, aesthetics, and other criteria aligns with multi-criteria reasoning and could be adapted to incorporate evidence-oriented commentary per dimension. Other excerpts discuss LLM evaluators, G-Eval, and form-filling scoring methods, which illustrate how prompts are designed to elicit structured, verifiable outputs and could inform an evidence-first commenting approach. Finally, an example of generating automatic feedback on UI mockups and a heuristic evaluation plugin for design platforms shows practical applications of concrete, reusable patterns in design critique workflows. Taken together, these sources support the concept of concrete prompt architectures with embedded reasoning or evidence components, even though they do not explicitly name the exact pattern requested.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.7.description
**Confidence:** high

The targeted field value describes a need for balancing several evaluation criteria to produce a single overall judgment. Excerpt describing a framework that separates evaluation into distinct criteria (usability, content, aesthetics, reputation, customization) directly demonstrates a multi-criteria approach and the need to balance these factors when forming an overall assessment. Excerpts mentioning a scoring function and a three-part prompt design (prompt, chain-of-thought-like reasoning, and scoring) illustrate concrete mechanisms to consolidate multiple criteria into one score. Additional excerpts show detailed prompt templates and evaluation pipelines (forms, structured templates, and repeatable prompts) that inherently address balancing factors and producing a single outcome. Together, these excerpts showcase concrete architectures and practical patterns for multi-criteria reasoning and single-score decisions in design evaluation contexts. For example, adopting a framework that fragments evaluation into several criteria and then applies a scoring function to yield a single score aligns with the described field value. Similarly, templates that enable stepwise critique and scoring (reasoning followed by a consolidated verdict) support the same objective. Therefore, the most relevant content centers on (a) multi-criteria evaluation structures, (b) explicit scoring or consolidation mechanisms, and (c) concrete prompt templates that operationalize balancing trade-offs across criteria to produce one final decision.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.0.domain
**Confidence:** medium

The most relevant content directly states or implies evaluation and critique of UI design, including a framework for UI design evaluation with usability, content, aesthetics, and related critique-oriented prompts. Specific passages describe applying LLMs for automatic feedback on UI mockups and building heuristic evaluation plugins, which align with concrete Design/UI Critique workflows and prompt templates that structure critique tasks. Further, explicit references to generating LLM reviews and critique prompts provide concrete templates and patterns for critique-oriented reasoning in design contexts. A passage that discusses a paper providing detailed prompt templates used for LLM reviews demonstrates concrete critique-oriented prompting applicable to both design and creative critique. Also, the mention of a chained prompt approach for major tasks and the design of UI critique workflows reinforces the target domain of Design/UI Critique and Creative Critique. Collectively, these excerpts map onto concrete, reusable prompt architectures that enable multi-step reasoning and structured critique in design-related tasks, including UI evaluation and critique generation for creative contexts. The remaining items discuss broader evaluation frameworks and generic CoT reasoning components, which provide supportive background but are less specifically tied to Design/UI or Creative Critique domains compared to the above items.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta

### reusable_prompt_architecture_patterns.7.domain
**Confidence:** medium

The most relevant excerpt explicitly divides design evaluation into five criteria—usability, content, aesthetics, reputation, and customization—presenting a concrete design-evaluation framework that directly supports a multi-criteria approach to design critique. This aligns with the fine-grained field value by providing a structured, multi-dimensional evaluation pattern within the design domain. The next most relevant excerpt describes a chain of prompts for major tasks and references a design-evaluation prompt design lineage, indicating an architecture where multiple facets of design quality are evaluated through structured prompts, which complements multi-criteria reasoning in design contexts. A third excerpt discusses a prompt design framework for UI critique, illustrating a system that evaluates UI design quality across dimensions and demonstrates how to segment the evaluation into task-specific prompts, reinforcing concrete design-evaluation architectures. An excerpt about generating automatic feedback on UI mockups with large language models further supports the idea of using AI to perform heuristic, multi-criterion evaluation of design artifacts, thus contributing to an architecture for design reasoning beyond single-metric judgments. Additional sources describe broader evaluation prompts for LLMs and critique papers that publish prompt templates, illustrating concrete prompt architectures and CoT reasoning in evaluation contexts, which provide ancillary support for reusable design-evaluation patterns though they are not solely focused on multi-criteria design decisions. Lastly, a source on a heuristic evaluation plugin for design tools demonstrates practical, implementable evaluation workflows in a design environment, reinforcing the concrete pattern of multi-criteria assessment in design tasks. These collectively underpin a namespace of reusable prompt-architecture patterns for design reasoning that accommodate multi-criteria decision making.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### reusable_prompt_architecture_patterns.0.prompt_structure
**Confidence:** high

The most relevant excerpt directly describes an LLM-based UI evaluation workflow that uses a heuristic evaluator pass to detect violations, followed by a design coach pass to convert those violations into actionable feedback, which matches the two-pass architecture and role-switching described in the fine-grained field value. Additional excerpts corroborate this approach by detailing prompt chains for UI critique, concrete templates or prompts used in experiments, and UI design feedback generation. Together, these sources show a practical progression from detecting UI issues to providing structured, prioritized recommendations, aligning with the specified Pass 1 and Pass 2 structure and the Sadler-style feedback framing. Other excerpts reinforce the context by outlining UI evaluation frameworks and the use of prompts for critique and evaluation tasks, supporting the overall feasibility and precedent for the architecture but are somewhat more auxiliary to the exact two-pass mechanism.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.2.prompt_structure
**Confidence:** medium

The requested fine-grained field value describes a concrete architecture that uses multiple domain-specific critics (for code or design) and an arbitrating agent to consolidate feedback with traceable citations. Excerpts that present explicit prompt templates or chains for generating reviews and evaluations provide the closest alignment to a reusable prompt architecture for reasoning and critique. In particular, prompt templates used to generate explicit LLM reviews demonstrate how structured reasoning can be captured in prompts, which is foundational for creating specialized critics. Discussions of LLM-based evaluators and their evaluation pipelines show how to organize evaluation tasks (including CoT reasoning and form-based scoring) in a modular way, which supports a multi-critic design with an aggregation step. Descriptions of end-to-end evaluation architectures (G-Eval-style prompts, three-component setups with prompts, reasoning, and scoring) illustrate how to structure multi-component evaluation workflows, including aggregation of outputs. The UI design feedback work demonstrates a practical plugin that evaluates multiple aspects (usability, aesthetics, etc.), illustrating how multiple evaluators can operate on a design artifact. Additional work on automatic feedback for UI mockups and heuristic evaluation further supports the idea of decomposing evaluation into parallel, domain-specific assessments. A broader design-evaluation framework that explicitly separates criteria (usability, content, aesthetics, reputation, customization) aligns with the notion of multiple critics and a consolidated verdict. Lastly, work that outlines chain-of-prompt designs and cross-cilo prompt architectures provides examples of how to encode multi-step reasoning in prompts, which is essential for sustaining diverse critique channels and traceable outputs. Taken together, these excerpts collectively support the feasibility and structure of a reusable pattern: instantiate multiple, scoped critics, each producing domain-specific notes, followed by an Arbiter that resolves conflicts, deduplicates issues, and provides traceable citations back to the source artifacts. They offer concrete examples of how prompts can be organized to realize multi-critic evaluation and consolidation, even if an exact ‘Arbiter’ role is not always named explicitly. Based on this, the strongest support comes from pieces that show explicit, modular prompt templates for reviews, multi-critic evaluation pipelines, and traceable, structured outputs, with additional corroboration from UI-specific multi-criteria evaluation work and general evaluation architectures. The overlap in framing, modularity, and evidence of multi-dimensional assessment makes these excerpts the most relevant to the target pattern, with others providing context and concrete implementations that map to the same architectural idea.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples

### reusable_prompt_architecture_patterns.0.pattern_name
**Confidence:** medium

The most relevant excerpt discusses detailed prompt templates used for generating LLM reviews, including concrete prompts used in evaluation workflows. This directly aligns with the idea of concrete, reusable prompt architectures and structured critique prompts that enable multi-step reasoning, which is central to a heuristic-anchored, multi-pass critique pattern. The next pair of excerpts describes G-Eval-style evaluation pipelines that include a CoT reasoning component and a scoring function, illustrating concrete, multi-step reasoning workflows that can be adapted into a two-pass design: first detect/assess, then provide guidance or critique. Following that, another excerpt discusses generating automatic feedback on UI mockups with LLMs and applying heuristic evaluation plugins for design feedback, which demonstrates tangible templates and prompt flows used in design critique scenarios. Additional excerpts describe UI critique frameworks with criteria-based evaluation (usability, aesthetics, etc.) and other critique-oriented papers that provide prompt templates for generating reviews or evaluations, reinforcing the existence of structured critique patterns in practical systems. While none of the excerpts explicitly name the exact field value “Heuristic-anchored Two-Pass Critique (Detect→Advice),” they collectively provide concrete architectures, templates, and workflows that embody the intended two-pass, heuristic-anchored critique approach in design/evaluation tasks. The most compelling support comes from the prompt-template-centric works and the explicit critique-generation papers, which demonstrate how to structure reasoning steps and outputs in a multi-phase evaluation context. The least direct support comes from general UI critique frameworks that discuss evaluation criteria without detailing the underlying prompt architecture, though they still reflect structured, multi-criteria critique workflows.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.2.domain
**Confidence:** medium

The most relevant content cites concrete prompt templates and structured prompts used to generate evaluations or reviews, which directly connect to design critique and potentially code review workflows. Specifically, the discussion of a paper that provides detailed prompt templates used for generating LLM reviews aligns with the need for concrete, reusable prompt architectures for evaluation tasks, which matches the goal of building code review and design critique prompts. Excerpts describing a plugin for UI design feedback and automatic UI mockup evaluation illustrate concrete applications of design critique prompts in real-world design tooling, reinforcing patterns for evaluating usability, aesthetics, and other criteria. Excerpts that frame UI critique in a multi-criteria fashion or discuss G-Eval-style reasoning architectures provide methodological context for how reasoning is structured in evaluation prompts, which supports understanding how such prompts can be extended to code review or design critique. Overall, the highest-value content directly provides templates or patterns for review-oriented prompts, while surrounding content supplements with concrete applications and evaluation methodologies, helping to generalize the patterns to the requested domains. Accordingly, the most persuasive evidence comes from explicit prompt templates for reviews, followed by applied design critique tooling, with broader evaluation frameworks offering supportive but indirect evidence about reasoning structure and prompt organization.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### reusable_prompt_architecture_patterns.2.description
**Confidence:** medium

The most directly relevant content is the presentation of multi-criteria evaluation approaches, such as separating evaluation into distinct criteria like usability, aesthetics, and customization. This aligns with the idea of preventing dimension collapse by distributing evaluation across parallel, specialized critics rather than collapsing to a single dimension. Additional support comes from references to UI design feedback and heuristic evaluation plugins, which imply practical implementations where multiple aspects are evaluated concurrently by different components. References discussing concrete prompt architectures for reviews and structured evaluation pipelines further corroborate the concept of distinct, parallel reasoning units feeding a composite assessment. Together, these excerpts illustrate concrete prompt patterns and system designs that embody the proposed parallel-critic approach to design reasoning and critique, as described in the finegrained field value.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta

### reusable_prompt_architecture_patterns.6.description
**Confidence:** medium

The finegrained field value specifies that feedback should be grounded in concrete details of the artifact being reviewed and that precision is demanded. The strongest support comes from excerpts describing concrete, artifact-focused evaluation tools and workflows: one discusses building a design evaluation plugin for Figma to assess UI mockups, which directly ties evaluation to tangible design artifacts; another describes a chain of prompts for a UI critique workflow, illustrating a concrete, task-specific prompt architecture that guides evaluation across multiple steps; another reports on automatic feedback generation for UI mockups with LLMs, emphasizing concrete, actionable feedback tied to the artifact. Additional content references concrete prompt templates used in experiments for LLM reviews, which corroborates the emphasis on structured, explicit prompts rather than vague instructions; a framework separating usability, content, aesthetics, etc., shows multi-criteria grounding of evaluation, aligning with the notion of concrete, artifact-bound assessment. Further, sources discussing G-Eval-like evaluation with form-filling and reasoning components demonstrate the value of structured, grounded reasoning formats, even if not all sections explicitly state artifact grounding. Together, these excerpts collectively support the idea that effective, grounded feedback relies on concrete artifact details and explicit, stepwise prompt structures.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.2.pattern_name
**Confidence:** medium

The finegrained field value refers to a concrete, reusable prompt architecture pattern described as a Multi-Agent Critic Ensemble. While no excerpt explicitly uses that exact term, several excerpts describe architectural patterns and evaluation workflows that align with a multi-critic or ensemble-style approach to design evaluation and critique. The most directly relevant information is about concrete prompt templates used to generate structured reviews or critiques, which is a foundational element of any multi-agent critic setup. For example, one excerpt states that the paper provides the detailed prompt templates used for experiments and includes prompts for generating LLM reviews, which maps to having multiple or modular prompts that steer different critique angles or “agents” in an ensemble. This aligns with the idea of organizing several specialized evaluators (critics) behind a cohesive framework. Additionally, discussions of evaluating with chain-of-thought reasoning and structured prompts for evaluation tasks illustrate how reasoning patterns are encoded and orchestrated, which is essential for a critic ensemble to produce diverse and robust judgments. The mention of G-Eval being composed of a prompt, automatic CoT reasoning, and a scoring function further supports the notion of an orchestrated evaluation pipeline, akin to coordinating multiple evaluators that produce a final composite score. Other excerpts describe chains of prompts for major tasks and UI critique frameworks that separate evaluation into distinct criteria (usability, content, aesthetics, reputation, customization). This separation into multiple evaluative axes or sub-prompts mirrors the ensemble idea of having diverse evaluators contributing to a final assessment. Taken together, these excerpts collectively support the concept of an architecture pattern where multiple, modular reasoning components (critics or agents) contribute to a design evaluation or critique task, which is the essence of a Multi-Agent Critic Ensemble, even if the exact term isn’t used in the texts. 

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.1.description
**Confidence:** high

The target finegrained field describes a reusable prompt architecture pattern that combines multi-criteria scoring with actionable comments, constraining reasoning to explicit aspects using a Chain-of-Thought (CoT) approach and a form-filling paradigm for structured output. The most relevant excerpts directly mention these components: one excerpt demonstrates evaluating LLM outputs with CoT reasoning plus a form-filling structure to produce outputs, which aligns with the idea of using CoT for reasoning and a structured, fill-in-form output. Another excerpt notes that G-Eval consists of a prompt, automatic CoT reasoning, and a scoring function, which supports the notion of combining CoT reasoning with a scoring/structured evaluation framework. A separate excerpt explicitly discusses evaluating UI design across five criteria (usability, content, aesthetics, reputation, customization), illustrating multi-criteria scoring and structured critique. Additional excerpts describe prompt design patterns for design evaluation and the use of prompt templates for reviews, which corroborate the idea of reusable, architecture-like prompt patterns. Collectively, these excerpts map onto the description by providing concrete instances where CoT reasoning is paired with structured output (form-filling) and where multi-criteria evaluation guides the prompt and critique process, illustrating reusable patterns for design reasoning prompts.

- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta

### reusable_prompt_architecture_patterns.0.description
**Confidence:** medium

The target field value describes a two-pass approach in design evaluation prompts: first identify violations against heuristics, then rephrase them into constructive, user-facing advice. Excerpt content that directly discusses detailed prompt templates or templates for LLM reviews provides concrete evidence of concrete prompt architectures and multi-step reasoning for formative critique, which is a close match to the requested two-pass pattern. For example, one excerpt reports that a paper provides detailed prompt templates used for experiments in generating LLM reviews, illustrating concrete evaluation prompts rather than generic guidance, which supports the notion of reusable prompt architectures for critique tasks. Another excerpt discusses a UI critique framework that breaks evaluation into usability, content, aesthetics, etc., demonstrating a structured, multi-criteria evaluation pipeline that can be translated into a two-pass workflow (detect issues across criteria, then translate into guidance). Additional excerpts describe automatic feedback generation on UI mockups and plugins for heuristic evaluation, which align with producing actionable, user-facing advice from identified issues. There is also mention of prompting structures that enable chain-of-thought or multi-step reasoning, which supports separating detection from remediation in practice. Finally, discussions around evaluation prompts (G-Eval, CoT reasoning, and prompt design patterns) provide empirical context on how reasoning prompts influence output quality, reinforcing the feasibility and design of structured evaluation architectures. Taken together, these excerpts support the concept of concrete, reusable prompt architectures for design reasoning that can implement a two-pass detect-then-advise workflow.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.7.source_reference
**Confidence:** high

The field value points to two concrete anchors: G-Eval as a conceptual basis for evaluation prompts and UI critique prompts (UICrit) from 2024. The most directly relevant evidence is a source that clearly defines G-Eval’s architecture as comprising a prompt, automatic chain-of-thought reasoning, and a scoring function, establishing the conceptual basis for evaluation pipelines. A closely related source expands on G-Eval by showing how CoT reasoning is used within GPT-4-based evaluation and mentions a form-filling aspect, reinforcing the idea that concrete prompt structures accompany evaluation workflows. Papers that discuss UI critique frameworks provide explicit multi-criteria evaluation (usability, content, aesthetics, reputation, customization), which directly aligns with the UI critique side of the field value. Additionally, a source describing a critique paper with detailed prompt templates used for generating LLM reviews provides concrete prompt architecture patterns for evaluation and critique workflows, further supporting the requirement for reusable prompt architectures. Other UI-oriented works illustrate automatic feedback on UI mockups and heuristics for UI evaluation, which contextualize how UI critique prompts are operationalized in design tasks and visual evaluation. Together, these excerpts substantiate both the conceptual basis for evaluation prompts (G-Eval) and concrete UI critique architectures (UICrit and related prompt patterns). The most direct statements pertain to the G-Eval composition and its use in evaluation, followed by UI critique frameworks and concrete prompt templates and UI-focused evaluation work.

- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.5.domain
**Confidence:** high

The finegrained field value refers to concrete, reusable prompt architecture patterns for design reasoning that cover Design/UI Critique and Creative Writing. Excerpt content that explicitly provides prompt templates or architectures used for generating reviews or critiques directly supports this field value, as opposed to general evaluation methods. In particular, material that describes detailed prompt templates used to generate LLM reviews or critiques aligns with the goal of concrete, reusable prompt architectures for design and UI critique. Additionally, content that demonstrates a chain of prompts for UI critique, and that separates evaluation criteria (usability, content, aesthetics, reputation, customization) into distinct prompt components, directly informs how to structure multi-criterion design evaluation prompts. Reports that discuss automatic feedback on UI mockups with LLMs and the development of UI design feedback plugins provide concrete patterns for actionable critique workflows in design tools. Discussions on broader evaluation frameworks or CoT reasoning for evaluation, while relevant to reasoning quality, are ancillary to the specific request for reusable prompt architectures and concrete templates for Design/UI critique and creative writing critique. Overall, the strongest support comes from sources that present explicit prompt templates or chained prompt designs used to produce systematic reviews or critiques in design contexts, followed by sources that operationalize UI critique across multiple criteria and provide examples of feedback generation in design workflows.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.0.source_reference
**Confidence:** medium

The field value points to a specific citation: Duan et al., CHI 2024. Excerpting content that explicitly references Duan et al. in 2024 and discusses prompt design patterns, templates, or architectures directly supports identifying this citation as part of the reusable prompt architectures for design reasoning. The second excerpt notes a paper that provides detailed prompt templates used for experiments in the UI/evaluation domain. This aligns with the requested concrete prompt architectures and templates that encode multi-step reasoning for evaluation and critique, and it mentions the authors and year associated with the prompt design lineage. The third excerpt likewise discusses automatic feedback and prompts in the context of Duan et al. 2024-era work, reinforcing the link to the same authorial thread and its concretized prompt approaches. The remaining excerpts mention related work by Duan (and others) around similar topics (UI critique, heuristic evaluation, and LLM evaluators) which provides context and corroborates the existence of a broader ecosystem of prompt architectures and reasoning scaffolds studied during that period, though they may not all explicitly name the CHI venue. Collectively, these excerpts corroborate that there are concrete prompt templates and design-evaluation oriented architectures associated with Duan et al. around 2024, which is the lineage behind the citation in question. Direct quotes/paraphrases illustrating concrete template usage include references to a chain of prompts illustrating major tasks and explicit mention of detailed prompt templates used across experiments, which support the claim that reusable prompt architecture patterns exist for design reasoning in these works.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.7.prompt_structure
**Confidence:** medium

The field value requires a prompt structure that (i) aggregates scores across several criteria using a transparent mechanism such as a weighted mean or Pareto optimization, and (ii) forces the model to acknowledge trade-offs or conflicts when scores cross thresholds. The most directly supportive content notes that a prompt architecture for LLM evaluation includes a prompt, an explicit reasoning component (CoT), and a scoring function, which aligns with the idea of an explicit aggregation mechanism embedded in the prompt. Additionally, a design-evaluation framework that splits evaluation into multiple criteria (usability, content, aesthetics, reputation, customization) demonstrates how multi-criteria assessment is organized within the prompt architecture, supporting the notion of structured, multi-dimensional scoring. Concrete prompt templates and CRT-style reviews described in the design/UX critique and UI evaluation literature further illustrate how such architectures are implemented in practice, often by decomposing evaluation into modular components and providing structured outputs that could accommodate explicit aggregation logic. Other related works discussing automatic feedback on UI mockups and heuristic evaluation plugins reinforce the emphasis on reusable, task-specific prompt structures for design reasoning and critique, which are compatible with a scoring/aggregation layer within prompts. The combination of these sources suggests that explicit scoring rules and multi-criteria aggregation are indeed embodied (or at least implied) in concrete prompt designs for design reasoning and critique, and that practitioners discuss or implement multi-criteria prompts and templates capable of expressing trade-offs. The strongest alignment comes from explicit mention of a scoring function embedded in a prompt and a multi-criteria evaluation framework, with additional support from design critique prompt templates and UI evaluation prompts that would naturally incorporate such aggregation logic.

- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### reusable_prompt_architecture_patterns.6.source_reference
**Confidence:** medium

The target field value points to implicit evidence in two strands: (a) G-Eval and its use of evidence quotes as part of evaluating LLM outputs, and (b) Duan et al.’s work where evidence_from_json or similarly structured evidence extraction is discussed. Excerpts that explicitly cover G-Eval and its components (prompt design, chain-of-thought reasoning, and evaluation scaffolding) directly support the notion that evidence quotes are embedded or generated during evaluation prompts and JSON-oriented evidence extraction. Excerpts that describe concrete prompt architectures and templates for design evaluation, UI critique, or feedback generation align with the idea of reusable prompt architecture patterns; they provide concrete, reusable templates or designs that can encode multi-step reasoning and structured critiques, which aligns with the notion of evidence-driven prompts (evidence_from_json) in Duan et al. Furthermore, discussions of prompt templates and a prompt design lineage (as seen in references to prior work and specific figures or prompts) illustrate how structured reasoning patterns are embedded in prompts, which can be interpreted as implicit evidence structure used during evaluation and critique tasks. By connecting these threads, the most relevant material shows (i) the use of explicit evidence or quotes in evaluation prompts (G-Eval) and (ii) concrete, reusable prompt architectures and reasoning scaffolds in design/UI critique literature (Duan et al.), which together substantiate the fine-grained field value about evidence-driven, template-based reasoning and evidence extraction in LLM evaluation tasks.

- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.

### reusable_prompt_architecture_patterns.1.domain
**Confidence:** high

The most relevant excerpt directly aligns with the target field by describing a design-evaluation framework that partitions evaluation into multiple criteria (usability, content, aesthetics, reputation, customization), which matches the notion of multi-criteria scoring and design critique. The next most relevant excerpts discuss a structured chain-of-prompts approach for UI evaluation and a modular prompt design tailored to major tasks, which supports how reasoning scaffolds and practice-oriented prompt architectures can be instantiated for design critique. Further, an excerpt detailing a heuristic evaluation plugin for design tools and another addressing automatic feedback on UI mockups show concrete, implementable prompts and workflows for design-oriented evaluation tasks, reinforcing the practical aspects of multi-criteria design critique. Additional excerpts cover broader LLM-evaluation methodologies (CoT-based reasoning, gpt-4 evaluation) and templates for generating LLM reviews, which provide supportive context for general NLG evaluation and reasoning patterns but are less specifically focused on the design-critique domain. The collective evidence maps well to the requested combination of multi-criteria scoring, design critique workflows, and general NLG evaluation considerations, indicating the field value is well-supported by concrete architectures and templates across design and evaluation domains.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta

### reusable_prompt_architecture_patterns.1.source_reference
**Confidence:** medium

The target field value refers to a specific EMNLP 2023 work (Liu et al., G-Eval). The most directly relevant content in the excerpts describes G-Eval and its core design: one excerpt explains that G-Eval evaluates LLM responses using GPT-4 with Chain-of-Thought reasoning and form-filling, which is foundational to how G-Eval operates in practice. Another excerpt outlines that G-Eval consists of three main components: the prompt, automatic CoT reasoning, and the scoring function, which maps directly to how a reasoning-enabled evaluation pipeline is structured for design and critique tasks. These passages collectively illuminate the concrete prompt architectures and reasoning patterns used in G-Eval-like systems, providing concrete details on prompt templates, CoT reasoning, and scoring that would be expected to be associated with the EMNLP 2023 G-Eval work. A third excerpt, while discussing a later publication (G-Eval for LLM Evaluation by Comet, 2025), reinforces the same structural elements (prompt, automatic CoT reasoning, scoring function) and thus supports understanding of how such reasoning scaffolds are implemented in practice. Although the exact citation (Liu et al., EMNLP 2023) is not present in these excerpts, the cited content strongly supports the Engineering of reasoning prompts and evaluation pipelines typical of G-Eval-style work and provides concrete, reusable patterns relevant to the target field value.

- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta

### reusable_prompt_architecture_patterns.5.description
**Confidence:** medium

The most directly relevant excerpt describes the paper-level inclusion of detailed prompt templates used across experiments, which aligns with the idea of concrete, reusable prompt architectures for driving evaluation and critique tasks. This supports the notion of concrete templates that encode structured reasoning patterns rather than generic advice. Several excerpts describe end-to-end prompt chains or pipelines for UI critique and design evaluation, illustrating practical implementations of multi-step reasoning and layered prompts (designated prompts per task, and structured evaluation criteria). These align with the notion of reusable architectures that couple prompts with specific reasoning steps to achieve higher precision and avoid over-reliance on single-dimensional feedback. Additionally, discussions of evaluation frameworks and feedback generation in UI/UX contexts demonstrate concrete prompts that guide critique across multiple dimensions, which reinforces the benefit of a patterned, reusable approach. Collectively, these excerpts illustrate concrete architectures and templates for reasoning in design evaluation, critique, and UI analysis, which underpin the described field value about using concrete counterexamples or structured reasoning aids to improve precision and nuance. The references to CoT reasoning and formalized scoring mechanisms further corroborate that the approach is about structured, replicable prompt designs rather than ad-hoc prompts, which dovetails with the idea of a reusable pattern library for complex judgments.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### reusable_prompt_architecture_patterns.4.pattern_name
**Confidence:** medium

The target fine-grained field value refers to a concrete prompt-pattern: a Self-Refine Critique Loop with Stop Conditions. Excerpts that discuss concrete prompt templates for LLM reviews, UI critique workflows, and structured evaluation prompts are most directly relevant, as they provide architectural patterns for how reasoning and critique steps are orchestrated in practice. Specifically:

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### reusable_prompt_architecture_patterns.5.pattern_name
**Confidence:** low

The field value seeks a specific reusable prompt architecture pattern that combines a checklist with counterexamples. Among the excerpts, the strongest connections are to discourse on concrete prompt templates and structured prompts used for evaluation and critique. One excerpt discusses detailed prompt templates used for generating LLM reviews, which aligns with the broader idea of reusable templates for structured evaluation tasks. Other excerpts describe multi-criteria evaluation prompts (e.g., usability, aesthetics, accessibility) and UI critique prompts, which reflect patterns for evaluating across dimensions but do not explicitly mention maintaining a checklist or generating counterexamples. There is additional discussion of prompt design practices inspired by established evaluation frameworks, and references to model-driven critique and feedback generation, which conceptually support the existence of structured, reusable patterns. However, none of the excerpts explicitly claim or describe a pattern that combines a checklist with counterexamples as a named, reusable architecture. Based on this, the field value is not directly evidenced, though related material supports the general idea of structured, multi-step evaluation prompts and templates that could be adapted into a checklist-with-counterexamples pattern. In summary, there is partial, indirect alignment through mentions of concrete prompt templates and multi-criteria evaluation prompts, but no explicit confirmation of the exact pattern name or its explicit use of counterexamples.


- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.2.source_reference
**Confidence:** medium

The requested fine-grained field value points to a conceptual basis for open-source PR reviewers and related prompt architectures, specifically citing Duan et al. in CHI 2024 as a foundational reference. The most directly relevant passages are those that discuss Duan et al.’s work on UI design critique and prompt design for evaluation tasks, which align with a conceptual basis for reasoning scaffolds used by PR-review type agents. The excerpt describing applying LLMs to generate automatic feedback on UI mockups explicitly attributes a line of work to P. Duan (2024) and discusses an evaluation workflow that resembles structured reasoning used in design critique and code-review contexts, providing concrete examples of prompt templates and evaluation pipelines. A closely related excerpt from 2023 references Duan’s work on UI design feedback and heuristic evaluation plugins, which helps establish a lineage of design-evaluation prompts and structured critique workflows. Together, these excerpts collectively support the idea of concrete, reusable prompt architectures for design reasoning, and show how multi-task evaluation and critique prompts are decomposed into specialized prompts—precisely the type of conceptual scaffolding that a PR-reviewer-like agent would leverage. Additional excerpts discuss G-Eval and critique templates from related works, illustrating the broader landscape of prompt templates and evaluation pipelines that inform the same design reasoning principles, even though they do not name the PR-Agent or CHI directly. In summary, the excerpts provide evidence of: (a) concrete prompt designs and templates used for design/UX evaluation tasks; (b) explicit attribution to Duan et al. in CHI 2024 as a conceptual basis for such reasoning scaffolds; and (c) related 2023–2024 work showing practical implementation patterns for critique and evaluation workflows that a PR-reviewer style agent would rely on. This aligns well with the asked field value, which centers on foundational literature and concrete prompt architectures tied to Duan et al. CHI 2024 as a conceptual basis for open-source PR review-type tooling.

- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### design_and_ui_evaluation_prompts.2.framework
**Confidence:** medium

The fine-grained field value refers to a Self-Refine loop applied to design critique, inspired by a 2023 work. Among the excerpts, the most relevant items describe concrete design evaluation and UI critique architectures that structure prompts and criteria for evaluating design work. These items show concrete prompt templates and evaluation frameworks (e.g., breaking evaluation into usability, content, aesthetics, reputation, and customization) that would form the substrate for a Multi-step reasoning and critique loop. They demonstrate how prompts are organized to drive systematic critique across multiple dimensions, which is a prerequisite for a Self-Refine style cycle in design critique. Additional items describe automatic feedback generation for UI mockups and heuristic evaluation tools, which illustrate practical implementations of critique-oriented pipelines in design contexts. While these excerpts do not explicitly label or describe a Self-Refine loop or attribute it to Madaan et al., they underpin the scaffolded, multi-step critique workflows that such a loop would employ, and thus support the practical viability and structure of a Self-Refine approach in design critique. The strongest support comes from explicit design-evaluation prompt architectures and multi-criteria critique frameworks; weaker support comes from broader automatic feedback and evaluation system papers that still align with the design critique workflow.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying

### design_and_ui_evaluation_prompts.2.prompt_chain_structure
**Confidence:** medium

The fine-grained field value specifies a three-step iterative loop for design evaluation prompts: (1) generate an initial critique using a rubric, (2) self-critique by evaluating the generated critique for specificity, evidence quality, and potential false positives, and (3) refine to produce a prioritized list of critiques with concrete fixes, continuing until a stop condition is met. Excerpt describing a chain of prompts for UI design evaluation explicitly shows a multi-step prompt design where the process is modularized into tasks and supported by a design-goal framework, which directly supports the idea of an iterative assessment loop. Additional excerpts illustrate practical UI critique tooling and heuristic evaluation pipelines for design systems, demonstrating concrete prompt architectures and evaluation rubrics in real systems. Together, these sources corroborate that concrete, reusable prompt architectures for iterative design reasoning exist, with explicit steps that map to generate, critique, and refine, including mechanisms for prioritization and stopping criteria. The excerpts also show implementations in design tools (e.g., Figma plugins) and UI evaluation frameworks that align with this iterative, multi-step reasoning approach, reinforcing the feasibility and deployment of such prompt chains in design and UI contexts.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### design_and_ui_evaluation_prompts.2.evaluation_criteria
**Confidence:** medium

The most relevant excerpts describe concrete systems and prompts for automatic UI evaluation and feedback generation. For example, an excerpt discussing automatic feedback on UI mockups highlights applying LLMs to generate heuristic evaluations and focuses on design goals, realization in the system, and the underlying mechanics of the feedback loop. This directly aligns with iteratively improving feedback through structured prompts that encode evaluation criteria. Another excerpt details generating UI critique through a framework that decomposes evaluation into usability, content, aesthetics, reputation, and customization, illustrating a multi-criteria scaffold that supports targeted, evidence-based critique rather than a single-score verdict. A further excerpt describes a chain-of-thought-informed evaluation approach (G-Eval) that uses CoT and a form-filling paradigm to assess NLG outputs, which provides concrete reasoning templates and evidence-collection steps that can be adapted to design evaluation prompts, supporting iterative refinement through explicit justification. Additional excerpts outline a multi-step prompt design for UI evaluation, showing how to structure prompts into tasks and sub-tasks, which is a practical instantiation of a design reasoning pipeline, conducive to iterative improvement. There are also references to constitutional or principle-based prompting and critique prompts, which illustrate how reasoning prompts can differ from simple rules, enabling more nuanced critique suitable for iterative refinement. Overall, the strongest support comes from statements that describe concrete UI feedback generators, layered critique frameworks, and multi-step, evidence-driven evaluation prompts, which directly map to the requested iterative, evidence-based, design-focused prompt architectures. Other excerpts contribute supportive context on evaluation frameworks and reasoning patterns (e.g., CoT-based evaluation and form-filling approaches) that can be harnessed to build reusable prompt templates for design reasoning.

- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### influential_research_and_papers.1.authors
**Confidence:** medium

The field value seeks the author(s) associated with influential research on self-refinement and iterative prompting techniques. The excerpt explicitly mentions an author (A Madaan) associated with a paper on SELF-REFINE, which directly supports identifying authors for influential research and papers in this area. The content also contains context about iterative refinement methods that are central to the user’s broader topic (reasoning scaffolds, prompt architectures). This makes the excerpt directly relevant for populating the authors subfield for the cited influential paper, assuming the author list includes Madaan, potentially as the lead author. The presence of the author name in the excerpt provides concrete evidence for the requested field value, even though the exact pluralization (Madaan et al.) is not explicitly confirmed beyond this author name within the excerpt. The connection is therefore relevant and supportive for populating the authors field in the target structure.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### reusable_prompt_architecture_patterns.1.pattern_name
**Confidence:** medium

The target pattern, a Rubric-Guided Judge with Per-Aspect CoT, implies a structured evaluation rubric across multiple criteria and a CoT-driven reasoning flow applied separately to each aspect. Excerpt describing that evaluation has been separated into five criteria such as usability, content, aesthetics, reputation, and customization, which directly aligns with the idea of evaluating across multiple dimensions using a rubric-like structure. This supports the notion of multi-criteria prompts designed to avoid collapsing into a single dimension by organizing prompts around distinct aspects. Excerpts that discuss CoT-based prompting and form-filling within evaluative prompts demonstrate the feasibility and mechanics of per-criterion reasoning, which is the core of applying CoT to each aspect of the rubric. In addition, explicit references to prompt templates for LLM reviews show how reusable prompt architectures can be instantiated for evaluation tasks, which is consistent with delivering a concrete, reusable Rubric-Guided Judge design. Further supportive material includes mentions of a structured chain of prompts per major task and the integration of CoT reasoning with evaluation scoring, which underpins both the rubric and per-aspect reasoning components. Together, these sources coherently map onto a pattern that uses a rubric to drive multi-criteria evaluation and employs a per-aspect CoT reasoning approach, with concrete templates to implement it.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.1.prompt_structure
**Confidence:** high

The finegrained field describes a system prompt that instructs the LLM to think step-by-step (chain-of-thought) for each evaluation aspect, while ultimately outputting a final completed rubric that defines the aspects (such as Consistency and Visual Hierarchy), their definitions, a scoring field (e.g., 1-5), a rationale, evidence references, and concrete suggestions, and to emit a final structured JSON object. The most directly relevant excerpts report: a design where LLM evaluators use CoT reasoning and then fill a form or rubric, i.e., form-filling based on CoT outputs; and a breakdown of an evaluation paradigm into components of prompts, automatic CoT reasoning, and a scoring function. These support the existence of a prompt architecture that encodes multi-aspect evaluation, with explicit output fields and a structured rubric. Additional excerpts discuss concrete prompt templates for critiques and reviews, showing actual prompt structures used in design critique, UI evaluation, and code-review contexts, which align with the idea of concrete, reusable prompt architectures for design reasoning. Further excerpts describe breaking evaluation into multiple criteria (e.g., usability, aesthetics, accessibility, brand) and constructing prompts to avoid collapsing across dimensions, which reinforces the multi-criteria, structured-output nature of the target field. Collectively, these excerpts corroborate the described system prompt pattern: an instruction to reason step-by-step for each evaluation aspect, culminating in a final, structured JSON rubric with defined aspects, scores, rationales, evidence, and concrete suggestions. The remaining excerpts provide additional context about critique templates and multi-task evaluation prompts in related design and UI evaluation domains, further supporting the practical deployment of such prompt architecture patterns in design reasoning tasks.

- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.

### reusable_prompt_architecture_patterns.4.domain
**Confidence:** medium

The most relevant material directly demonstrates concrete prompt architectures and templates for design-focused evaluation and critique, which directly supports Design Critique and General Iterative Improvement. For example, one excerpt describes building an LLM-based heuristic evaluation plugin for UI mockups, illustrating a structured prompt flow for evaluating design artifacts rather than producing generic feedback. This aligns with Design Critique and General Iterative Improvement by showing how reasoning steps and structured prompts guide multi-criteria evaluation of design artifacts. Another excerpt discusses detailed prompt templates used for generating LLM reviews, explicitly providing concrete templates and prompts that encode multi-step reasoning patterns beyond a simple chain-of-thought directive, which is essential for constructing robust Design Critique and Iterative Improvement workflows. A third excerpt outlines a framework for evaluating UI design quality across multiple criteria and references the prompt design lineage, further supporting multi-dimensional assessment relevant to Design Critique and General Iterative Improvement. Additional sources discuss automatic feedback generation using LLMs and evaluation frameworks that rely on structured prompts and reasoning (CoT, critique loops, scoring), which underpin both Code Optimization in terms of generating reasoned, stepwise improvements and the iterative refinement process. Collectively, these excerpts establish concrete, reusable prompt architectures and patterns suitable for design reasoning tasks, critique generation, and iterative improvement workflows, with explicit emphasis on structured reasoning prompts, evaluation prompts, and reasoned outputs rather than only generic guidelines.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.5.prompt_structure
**Confidence:** medium

The concept of concrete prompt templates used to guide LLM reviews and structured evaluation aligns with the idea of a per-guideline mini-checklist embedded in the prompt. For instance, an excerpt describing detailed prompt templates used for experiments in LLM reviews suggests a reusable pattern where evaluation steps and guidelines are explicitly encoded in the prompt, which mirrors having a checklist-like structure. Related material discussing a prompt design that explicitly incorporates chain-of-thought or automatic reasoning components (CoT) to support evaluation and scoring provides direct evidence of organizing prompts to produce multi-step reasoning and structured critique, which is the essence of a design-evaluation scaffold. Documents about evaluating UI design quality by decomposing into usability, content, aesthetics, and other criteria illustrate multi-criteria reasoning prompts and how to avoid collapsing to a single dimension, which is a core aspect of robust prompt architectures for design reasoning. Additional sources that explore automatic feedback generation and UI critique prompts show concrete templates for feedback generation, aligning with the need for reusable prompt structures in design critique workflows. Finally, discussions on generating UI design feedback with LLMs demonstrate the practical realization of these architectures in real-world design tasks, reinforcing the relevance of a modular, scaffolded prompt structure that can be extended with per-guideline checks and example-driven guidance.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.

### influential_research_and_papers.1.publication_year
**Confidence:** high

The excerpt notes that the SELF-REFINE paper was published in 2023 and references an arXiv entry with a 2023 date, indicating that this year is part of the cited influential research under consideration. This directly supports the finegrained field value identifying 2023 as the publication year for influential research in this area. The connection is explicit through the stated year in the citation and the description of the Self-Refine iterative process being associated with that 2023 publication, which aligns with the notion of2023 as a key year for concrete multi-step reasoning and refinement methods in AI systems.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### influential_research_and_papers.1.url
**Confidence:** high

The fine-grained field value is a URL to a specific SELF-REFINE paper. The excerpt explicitly describes SELF-REFINE as an iterative self-refinement algorithm and provides the exact arXiv URL 2303.17651, which directly confirms the location and identity of the cited paper in the field. This direct alignment makes the excerpt highly relevant to validating or linking the URL value for influential_research_and_papers. There is no conflicting information in the excerpt, and it clearly supports the presence and citation of the SELF-REFINE paper.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### design_and_ui_evaluation_prompts.2.input_data_format
**Confidence:** medium

The strongest support for what the field value requires comes from excerpts that explicitly describe automatic feedback generation for UI mockups and UI design evaluation frameworks, including concrete prompt designs for heuristic evaluation and structured critique workflows. These sources discuss how prompts are organized to evaluate UI quality and provide actionable feedback, which aligns with producing a UI representation in a structured data format such as JSON. The second-tier sources show systematic prompt designs and multi-criteria evaluation scaffolds that can be encoded as reusable prompt architectures; they provide concrete templates and stepwise reasoning patterns, which are essential for embedding multi-step reasoning about UI design and critique. Additional sources discuss formal evaluation frameworks (e.g., G-Eval) and CoT-based reasoning patterns that influence how prompts guide structured critique, which supports the idea of designing prompts that yield traceable reasoning and structured outputs. Finally, sources focusing on UI critique plugins and automatic feedback on UI artifacts reinforce the concept of capturing history-like feedback (critiques and refinements) within the prompts, even if they do not always spell out a JSON history structure. In sum, the most relevant excerpts provide direct or near-direct guidance on concrete, reusable prompt architectures for design reasoning and UI evaluation that could be expressed as JSON representations and could be extended to include critique history and user feedback, while other excerpts provide supportive context about evaluation methodologies.

- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### influential_research_and_papers.1.key_contribution
**Confidence:** high

The field value describes a concrete, iterative SELF-REFINE framework that alternates between generating feedback and applying that feedback to improve the output, with explicit prompts for the loop and a demonstrated application to improving code readability in structured tasks. The excerpt explicitly claims: (a) SELF-REFINE is an iterative self-refinement algorithm with two steps (FEEDBACK and REFINE) that work in tandem, (b) there are explicit prompts for this loop, and (c) a key application is improving code readability. This directly supports the existence and concrete nature of the SELF-REFINE framework and its use for iterative improvement in structured tasks like code readability, which matches the finegrained field value describing a concrete method for iterative self-improvement on structured tasks and its application to code readability. Thus, the content of this excerpt is highly relevant and directly corroborates the requested detail about SELF-REFINE and its prompts.


- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### influential_research_and_papers.1.title
**Confidence:** high

The field value seeks the exact or near-exact title of the SELF-REFINE concept. The excerpt describes SELF-REFINE as an iterative self-refinement algorithm and explicitly mentions self-feedback and iterative refinement, which matches the requested title variant. This makes the excerpt highly relevant because it provides the authoritative wording and concept (self-refinement with self-feedback) that the field value references. The connection rests on the explicit naming and description of the SELF-REFINE approach in the excerpt's title.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### reusable_prompt_architecture_patterns.4.source_reference
**Confidence:** medium

- The most directly relevant content describes a concrete LLM-based approach for generating UI design feedback and a planning for evaluation prompts in design contexts. This aligns with the request for concrete prompt architectures and is directly applicable to design evaluation and design critique tasks. - Additional related material covers automatic feedback on UI mockups and heuristic evaluation prompts, which illustrate concrete prompt design patterns for design reasoning and critique. These pieces provide examples of task-specific prompt templates and the structure of reasoning prompts used in design contexts, which are central to reproducing or adapting Self-Refine style workflows for design. - The references to a critique-focused paper with prompt templates and to UI critique frameworks further contextualize how multi-step reasoning and structured prompts are used in design evaluation settings, supporting the notion of reusable prompt architecture patterns for design reasoning. - While some excerpts discuss general LLM evaluation or broad prompt design (not strictly design-specific), they still contribute to the ecosystem of architectures and templates that can be repurposed for design reasoning tasks, thereby offering helpful patterns for multi-task evaluation (usability, aesthetics, etc.). - The materials that discuss G-Eval and general evaluation pipelines provide broader context on how reasoning prompts and CoT components are integrated into evaluation workflows, which can inform the design of architecture patterns but are less focused on design critique per se.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### reusable_prompt_architecture_patterns.4.description
**Confidence:** medium

The most directly relevant information describes concrete prompt templates used in experiments to generate LLM reviews and critique, which aligns with a concrete, reusable pattern for design reasoning. It explicitly mentions detailed prompt templates used across experiments, providing a tangible starting point for reusable architectures. Additional closely related content describes a chain-of-prompts approach for evaluating design and UI, illustrating a stepwise prompt sequence for multiple tasks, and shows a design where evaluation is decomposed into specific criteria, a natural fit for multi-criteria reasoning patterns. Further, descriptions of G-Eval and similar systems emphasize a structure consisting of a prompting component, automatic chain-of-thought (CoT) reasoning, and a scoring/aggregation mechanism, which exemplifies the separation of reasoning from scoring in a reusable architecture. Other excerpts discuss building UI critique and heuristic evaluation tools, including explicit task chains and the use of CoT reasoning for evaluating outputs, which further support an architecture that encodes multi-step reasoning across tasks. Taken together, these sources provide concrete templates, multi-task prompt chains, and a decomposed architecture (prompting + reasoning + scoring) that together realize iterative, critique-based design reasoning patterns suitable for reuse in design evaluation, code review, and creative critique tasks. The content does not contradict the target field value and rather reinforces it by illustrating how iterative critique and structured reasoning are operationalized through prompt templates and modular architectures.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.

### reusable_prompt_architecture_patterns.4.prompt_structure
**Confidence:** high

The target field value describes an iterative loop for design reasoning prompts: generate a structured critique, self-critique for specificity and evidence, then refine the critique and prioritize fixes, with explicit stop conditions and feedback caching for future iterations. Excerpt 0 explicitly references detailed prompt templates used to generate LLM reviews across experiments, which is directly about concrete prompt templates and structured review workflows that could underpin a Generate->Critique->Refine loop in design tasks. Excerpt 3 discusses building an LLM-based heuristic evaluation plugin for Figma, i.e., a concrete design-evaluation workflow where prompts guide evaluation of UI artifacts, aligning with the design-evaluation aspect of the target field value. Excerpt 4 explores using GPT-4 for automated feedback on UI mockups and frames the potential of applying LLMs to automatic feedback, which is relevant to iterative design critique and refinement. Excerpt 1 describes a chain of prompts for major tasks and follows a design from prior work, illustrating how prompts can be structured across steps, which supports multi-step reasoning scaffolds in a design context. Excerpt 5 and Excerpt 6 discuss evaluation prompts and reasoning patterns (CoT-based reasoning, scoring) that influence whether outputs are compliant or reasoned, providing evidence about how instruction formats affect reasoning quality in evaluation tasks. Collectively, these excerpts map onto the requested architecture: concrete prompt templates, multi-step critique/evaluation prompts in design contexts, and considerations for reasoning patterns that influence iterative refinement. The strongest support comes from explicit mentions of structured prompt templates for reviews, and design-evaluation workflows in UI/UX contexts, which underpin a generate-critique-refine cycle. The remaining excerpts provide complementary evidence about evaluation-oriented prompting and reasoning quality, which helps justify the viability of a critique/refine loop in design tasks.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### influential_research_and_papers.0.publication_year
**Confidence:** high

The targeted field value corresponds to the year 2024 in influential design-evaluation research papers. Excerpt describing a framework for evaluating UI design quality and explicitly listing multiple criteria, with a 2024 date, directly supports the existence of 2024-era prompt architectures for design critique. Excerpt detailing a chain-of-prompt approach and referencing a 2024 publication further corroborates concrete 2024-era reasoning scaffolds and multi-step prompt design in design evaluation. Excerpt focusing on design-goals and an automatic, LLM-driven heuristic evaluation tool, with a 2024 date, aligns with concrete prompt architectures that encode multi-step reasoning for evaluation and critique. Collectively, these excerpts show a 2024 period where actionable prompt templates and evaluation pipelines were described, matching the requested fine-grained field value. Excerpts from 2023 are less relevant to the 2024 value, and thus are deprioritized.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying

### reusable_prompt_architecture_patterns.5.source_reference
**Confidence:** medium

The most directly relevant portion comes from a recent 2024 work that discusses generating automatic feedback on UI mockups with large language models, explicitly using Duan as the author. This aligns with the field value by pointing to Duan’s involvement in UI design evaluation prompts and critique workflows, which is the core of the requested CHI 2024 reference. Following that, excerpts describing a chain of prompts for UI critique that follows design-evaluation prompt design from a 2024 Duan et al. work further corroborate the same research thread and institutional context, suggesting a continuity of prompt architectures for design evaluation that would be characteristic of a CHI 2024 contribution. Additional excerpts mention a 2023/2024 Duan work on generating UI design feedback for Figma and related UI evaluation frameworks; these reinforce the association of Duan with prompt-driven design critique and UI evaluation, even though they may not explicitly cite CHI 2024. While multiple excerpts reference Duan and related UI critique prompts, none explicitly states the CHI 2024 venue in the provided text. Consequently, the strongest available signals are the Duan-authored 2024 UI feedback/prompts papers, which support the gist of the target reference but do not confirm the CHI 2024 venue within the excerpts themselves. This yields a moderate level of alignment with the requested field value, given the strong topical and authorial overlap, but with some uncertainty about the exact CHI 2024 attribution.

- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/abs/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 126 — We explore the potential of using large language models for automatic feedback. Specifically, we focus on applying GPT-4 to automate heuristic evaluation.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### influential_research_and_papers.0.authors
**Confidence:** high

The targeted fine-grained field value identifies a specific author (Duan et al.) associated with concrete prompt architectures and design-evaluation prompts. The most directly supportive content is the excerpt describing an LLM-based heuristic evaluation plugin for Figma, which explicitly ties the work to prompting for UI design feedback and cites a concrete implementation by Duan in 2023. Another excerpt outlines the design goals and realization details of an automatic, LLM-driven heuristic evaluation tool and discusses its underlying mechanism, aligning with concrete prompt architectures in design evaluation and again attributed to the same author group in 2024. A third excerpt notes a framework for evaluating UI design quality that is segmented into multiple criteria and cites the chain of prompts and its design lineage, explicitly referencing Duan et al. 2024 as a source for the prompt design approach, strengthening the link to the field value. A fourth excerpt discusses SELF-REFINE as an iterative loop but references a generic iterative refinement approach rather than attributing it to Duan; however, it still provides contextual evidence about iterative reasoning workflows in design/visual tasks and mentions related sources, broadening the landscape of methods around the topic. Collectively, these excerpts connect the field value to concrete prompt architectures and design-evaluation prompts associated with Duan et al., including iterative and multi-criteria reasoning patterns that are central to the user’s research query.

- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples

### influential_research_and_papers.2.key_contribution
**Confidence:** high

The field value states that the G-Eval framework combines chain-of-thought reasoning with a form-filling paradigm to evaluate natural language generation, requiring step-by-step reasoning for each evaluation aspect before filling a rubric, and that this approach increases alignment with human evaluators and serves as a reusable pattern for reasoned evaluation. The first excerpt explicitly describes using G-Eval with chain-of-thoughts and a form-filling paradigm to assess NLG outputs. The second excerpt reiterates the same core idea in a prominent title/abstract, reinforcing the link between CoT, form-filling, and evaluation quality. The third excerpt provides a PDF version confirmation of G-Eval as a framework employing CoT to evaluate generated text and to guide the evaluation process, supporting the claim of a structured, reasoning-based evaluation pattern. Together, these excerpts substantiate the field value by detailing the architecture (CoT + form-fill), the method (step-by-step reasoning per evaluation aspect), and the outcome (better correlation with human judgments) as a reusable pattern for evaluation tasks.

- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### influential_research_and_papers.2.authors
**Confidence:** high

The finegrained field value points to the authors of influential research papers: Liu et al. The excerpts collectively identify Liu as the author (or co-author) of works introducing G-Eval, a framework for evaluating NLG outputs using chain-of-thoughts and a form-filling paradigm. The most directly relevant content states that the work is by Y Liu and discusses G-Eval in the context of evaluating generated text quality, which directly confirms the author attribution. Additional excerpts provide the same authoring attribution and describe the same or closely related G-Eval framework, reinforcing the linkage to Liu. There are no claims that contradict Liu being an author, and the content consistently supports the field value by naming Liu in connection with influential evaluation research. The surrounding details about chain-of-thoughts and evaluation methods further corroborate that these are the Liu et al. papers related to NLG evaluation prompts and scaffolded reasoning. Therefore, the excerpts collectively support the field value with high confidence, with the strongest support coming from explicit author attribution to Liu and the G-Eval framework described in the excerpts.

- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive

### influential_research_and_papers.2.publication_year
**Confidence:** high

The target field value is the year 2023 within the influential_research_and_papers collection, indicating which publications are considered influential for that year. The excerpts collectively reference 2023 as the publication year for works on evaluating NLG outputs with chain-of-thought and form-filling paradigms (a framework identified as G-Eval) and include explicit year indicators in different formats (a PDF version dated in 2023 and arXiv entries dated 2023). These excerpts directly support the notion that certain influential papers in this area were published in 2023, thereby validating the field value. The mention of 2023 in multiple variants strengthens the alignment between the field value and the excerpts’ content, showing consistent year-tagging across sources and formats.

- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.

### influential_research_and_papers.0.title
**Confidence:** medium

The most directly relevant excerpt explicitly discusses generating automatic feedback on UI mockups with an LLM-driven approach, detailing the design goals and the automatic feedback tool. This directly supports the exact field value indicated by the title. Other highly relevant excerpts describe concrete implementations and design goals for automatic UI evaluation tools and heuristics, which corroborate the broader theme of structured reasoning and multi-faceted evaluation in UI design contexts. For instance, one excerpt describes building an LLM-based heuristic evaluation plugin for Figma, illustrating a concrete implementation for designers to evaluate UI mockups. Another excerpt explains a framework for evaluating UI design quality across multiple criteria, which aligns with the multi-criteria reasoning aspect in design evaluation prompts. Additional excerpts discuss a chain of prompts following established prompt designs and reference to prior work that informs structured prompt templates, which supports the notion of concrete, reusable prompt architectures for design reasoning. Finally, a related article on SELF-REFINE is included as it relates to iterative improvement loops in design or visual tasks, illustrating how generate→critique→refine loops can be adapted to design or visual evaluation contexts. Taken together, the set of excerpts builds a coherent picture of concrete prompt architectures and structured reasoning in design evaluation and UI critique systems, with the target item serving as the central exact match for the queried title.

- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### code_review_agent_prompts.1.prompt_command
**Confidence:** high

The target field value corresponds to a command segment used to initiate a review process in a code-review agent. Excerpts that explicitly discuss code review workflows and integrated review prompts provide direct support for concrete prompt architectures that encode multi-step reasoning or structured critique within code review contexts. The excerpt describing how code review workflows can be enhanced by LLMs and integrated into modern PR processes directly supports the idea of structured prompts guiding a review action. Another excerpt presents an automated CodeReviewer action that operates when a pull request is created, illustrating an actionable, prompt-driven review trigger. A third excerpt contains detailed prompt templates used for experiments in critique and reviews, which aligns with concrete, reusable prompt architectures for evaluating and critiquing code. Additional excerpts discuss evaluating LLMs as evaluators and general evaluation approaches (g-Eval) that, while not strictly code-review focused, inform prompt design for multi-step reasoning and structured critique. Finally, related work that frames code review and evaluation prompts in broader contexts (e.g., scaffolds for code quality, evaluation pipelines) supports understanding of how these reasoning patterns are embedded into real-world reviewer agents. Collectively, these sources map onto the requested focus on concrete prompt architectures for design reasoning, code review, and critique tasks, including how prompts are structured to produce reasoning and actionable critique rather than simplistic outputs.

- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### influential_research_and_papers.0.key_contribution
**Confidence:** high

The finegrained field value discusses a concrete two-pass prompt architecture for UI critique (Detect→Rewrite), with findings that structured, heuristic-guided prompts outperform generic feedback, and that incorporating user-dismissed suggestions as negative examples along with self-reflection improves performance. It also notes ablation evidence showing that removing heuristics or collapsing to a single prompt harms output quality and diversity. These points align with excerpts describing concrete, multi-step prompt designs for UI evaluation and critique, and with evidence about how prompt structures influence reasoning quality in design contexts. Directly, the excerpt that describes a chain of prompts for major tasks in UI design evaluation and that it follows prompt design from earlier work provides the strongest support for concrete, multi-step prompt architectures used in design critique. The other excerpts corroborate the broader theme of structured heuristics in UI evaluation (a heuristic evaluation plugin for design tools, and enumerated design criteria such as usability, aesthetics, and accessibility) and the broader concept of iterative refinement in design tasks (Self-Refine) which complements the idea of a two-pass, reflective prompt process. Taken together, these sources support the core claim that concrete, multi-step, heuristic-guided prompt architectures—structured to evaluate design output and allow iterative refinement—improve reasoning quality in UI critique tasks.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### influential_research_and_papers.0.url
**Confidence:** high

The exact finegrained field value is a URL to a specific paper: http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf. Among the excerpts, the one that directly contains this URL is the first candidate in the set, which describes an automatic, LLM-driven heuristic evaluation tool for UI mockups and explicitly includes the target URL, thereby directly supporting the requested field value. Related excerpts discuss the broader context of UI design evaluation and prompts inspired by or building upon the same Duan et al. work, including descriptions of design goals, prompt chains, and iterative refinement approaches, which provide contextual support for the relevance of the URL to this line of research. The other excerpts reference similar topics (UI feedback, design evaluation frameworks, SELF-REFINE, and design critique prompts) and thus offer indirect relevance by situating the target paper within a broader research program around design reasoning with LLMs, but they do not directly confirm the exact URL. Taken together, the most relevant content is the excerpt that explicitly contains the URL; the others add contextual alignment to the research area and methodology (multi-step reasoning prompts, critique chains, and iterative refinement) without confirming the precise URL itself.

- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### influential_research_and_papers.3.authors
**Confidence:** high

The finegrained field value identifies Anthropic as the author in a specific research context. The most directly supportive content notes Anthropic as the source of Claude’s Constitution and discusses how Anthropic structures and applies constitutional principles to guide model behavior, including training-phase principles, evaluation criteria, and attempts at tempering model judgments. Several excerpts explicitly attribute Claude’s Constitution to Anthropic and describe practices such as using principles to compare outputs and to guide harm-awareness and ethical alignment. Other excerpts reiterate how these constitutional prompts influence model behavior during critique and refinement, which strengthens the link to Anthropic as the author behind these influential research pieces. Taken together, these excerpts consistently connect Anthropic with the constitutional AI framework, its principles, and its implementation in evaluation and critique contexts. 

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.

### code_review_agent_prompts.0.prompt_command
**Confidence:** high

The most relevant content directly discusses concrete prompt templates and architectures used to generate reviews or evaluation prompts for code or design tasks, which aligns with implementing a review-by-role command. Specifically, one excerpt details detailed prompt templates used to generate LLM reviews, which maps to a role-based review command structure like /review_by_role. Another excerpt analyzes how to integrate LLMs into code review workflows, illustrating practical, structured prompts and workflows that could inform a role-specific prompt design. An evaluation-oriented excerpt presents a well-known evaluation framework that demonstrates reasoning steps (CoT-style) within prompts, supporting the idea of multi-step reasoning in evaluation prompts. Additional excerpts describe automated code review tooling and reviewer scaffolds, which further corroborate how prompt architecture can be anchored around specific reviewer roles and steps. Remaining excerpts provide broader context on prompt templates and evaluation strategies that reinforce the feasibility of concrete, reusable patterns for design reasoning and critique prompts. Collectively, these excerpts support building concrete, reusable prompt architectures that enforce structured, role-based review processes (such as a /review_by_role command) and illustrate multi-step reasoning patterns within those prompts.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### influential_research_and_papers.2.url
**Confidence:** high

The targeted URL is explicitly present in the PDF-related excerpt, which directly corresponds to the stated fine-grained field value. That excerpt identifies the arXiv identifier and the pdf link for the corresponding paper, making it the strongest direct match to the requested URL. Other excerpts discuss the same paper and its contributions (such as using chain-of-thoughts for evaluating NLG outputs and describing the G-Eval framework) which are thematically aligned and provide useful corroborating context about the work, but do not themselves present the exact pdf URL. Collectively, these excerpts confirm the existence and topic of the paper (evaluation frameworks with CoT, arXiv listing) and reinforce the direct match provided by the explicit pdf URL in the targeted excerpt. Therefore, the most relevant excerpt directly contains the URL, while the other two offer corroborating information about the same research topic and identifiers.

- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.

### influential_research_and_papers.3.key_contribution
**Confidence:** high

The finegrained field value centers on Constitutional AI training methodology: how models learn to critique and revise responses according to a set of principles, and the insight that short, broad, comparative instructions yield better generalization than long, explicit rules. The most directly relevant portion explains what constitutional AI is, what the values are, and how the principles were chosen, which anchors the methodological premise. The next layer of relevance comes from passages showing that principles guide model behavior during critique and selection (e.g., choosing the more harmless, ethical, and less harmful response, with emphasis on balance and tone). Additional excerpts demonstrate the impact of principle length and generalization versus specificity, illustrating that broad, comparative prompts outperform long, rigid rules. Together, these excerpts collectively map the practical design of CAI prompts, including how to structure reasoning prompts (short, comparative principles) rather than prescriptive rules, and how to calibrate outputs toward safety and ethical considerations in evaluation and critique tasks. Some excerpts emphasize the need to compare harmfulness and maintain a respectful tone, which underpins the reasoning framework that the field value advocates. This chain of evidence supports the claim that CAI training favors broad, principle-based prompts framed as comparative judgments to improve reasoning quality and generalization across tasks like critique and revision.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.

### code_review_agent_prompts.0.tool_name
**Confidence:** medium

The most relevant excerpt directly references prompt templates used for generating LLM reviews, which aligns with concrete prompt architectures and templates essential for a Multi-Agent Code Review System. This provides explicit prompt structures that could be repurposed or extended for a multi-agent setting. The next excerpt discusses rethinking code review workflows with LLM assistance, offering practical integration patterns for code review, which informs how agents could coordinate in a multi-agent system. A subsequent excerpt showcases a ChatGPT-based code reviewer action set, illustrating agent-initiated review behavior and automation within the PR lifecycle, which is highly pertinent to tool naming and orchestration in a multi-agent context. Another excerpt analyzes AI-assisted code review as a scaffold for code quality in a collaborative environment, contributing insights on how agents might collaborate with human reviewers and across tasks. Additional items touch on evaluation frameworks (how to measure performance of such systems) and code-for-papers repositories that implement evaluation tools, which are useful for validating a multi-agent code-review approach but are somewhat less about the core prompting scaffolds themselves. Overall, the connection is to extract concrete, reusable prompt architecture patterns and practical workflows for designating a Multi-Agent Code Review System, supported by examples of prompts, agent actions, and integration into code-review processes.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### influential_research_and_papers.2.title
**Confidence:** high

The target field value is the exact paper title describing a framework named G-Eval for evaluating NLG outputs. Excerpts that present G-Eval as a framework and describe its approach—using chain-of-thoughts (CoT) and a form-filling paradigm to assess NLG quality—directly support the existence and framing of this work. The excerpt that provides the PDF version explicitly identifies the paper as G-EVAL and discusses its evaluation framework, making it the most direct corroboration of the field value. The accompanying abstracts and title summaries further confirm the same core concept and title, aligning with the requested field value. The core idea across these excerpts is the same: G-Eval is a framework for NLG evaluation leveraging CoT and structured prompts, which matches the description in the field value.

- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.

### influential_research_and_papers.3.url
**Confidence:** high

The finegrained field value is a URL pointing to Claude's Constitution. The most relevant content is where the excerpts explicitly discuss Claude's Constitution and its guiding principles, showing how those principles are applied in evaluation, critique, and output selection. For example, passages describe that the model pulls from a set of principles during both supervised and reinforcement learning, and that principles are used to temper responses and compare harmfulness, illustrating concrete usage of constitutional prompts. Other excerpts elaborate on broad principles and a concise, ethical aim, which corroborates the existence and function of the constitutional framework. Additional items contextualize the timing and overview of what constitutional AI is and how the values are chosen, reinforcing that the URL corresponds to a canonical source about Claude’s Constitution. Based on these connections, each excerpt supports the field value to varying degrees, with the strongest support coming from statements that tie direct behavior guidance to the constitution and its application in evaluation and response selection.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.

### code_review_agent_prompts.1.purpose
**Confidence:** medium

The core requirement is an automated PR review capability that delivers code-quality feedback, improvement suggestions, and conformity to project conventions. The most directly supportive information comes from excerpts that explicitly describe prompt templates used to generate LLM-based reviews and actions that perform code review automatically within development workflows. For example, a paper detailing detailed prompt templates used to generate LLM reviews provides concrete structures showing how reasoning and critique steps are encoded in prompts, which directly informs how an automated PR review agent could function. Additional excerpts describe integrating LLMs into code review workflows and workflows that automatically perform code reviews in pull requests, which supports the idea of an automated PR review agent aligned with project conventions and practical use in real-world repositories. A related excerpt discusses a code-review-oriented action or tool that performs review automatically in PRs, further reinforcing the concrete implementation of such a system. Other excerpts discuss evaluation frameworks for LLM-based evaluators, which provides context but is less directly about the automated PR review capability itself. The combined evidence indicates a concrete path toward prompt architectures and system designs for an automated PR review agent that reviews code, offers feedback, and adheres to conventions.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### influential_research_and_papers.3.title
**Confidence:** high

The most relevant excerpt directly introduces and explains Claude's Constitution, describing its purpose in constitutional AI and how values are chosen and applied in evaluating responses. This provides a clear linkage to the field value by naming the constitution and outlining its role in guiding model behavior. Additional highly relevant excerpts discuss how principles are applied during training and evaluation, including choosing responses that are harmless, ethical, and balanced in tone, which reinforces the practical implementation of Claude’s Constitution in real-world prompts and comparisons. Other excerpts provide concrete example prompts or guidelines that illustrate how the constitutional framework is operationalized in tasks like critique, harm assessment, and moral consideration, further grounding the field value in concrete practice. The remaining excerpts reinforce contextual aspects like prompt design and comparative harm assessment, which support understanding how Claude’s Constitution informs prompt architecture and governance without introducing unrelated concepts. Overall, the most support comes from excerpts that name Claude’s Constitution and discuss its values and application; the other excerpts provide essential context and concrete application details that buttress the core field value.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.

### influential_research_and_papers.4.authors
**Confidence:** medium

The finegrained field targets the authors of influential research and papers, specifically within the broader set of works on constitutional AI and related prompt design. The excerpts collectively discuss the Claude's Constitution project by Anthropic, including: (a) that a set of principles is used during training and evaluation and that not every principle is applied at once, (b) instructions to prefer harmless, ethical, and non-toxic outputs, (c) mechanisms to temper judgmental or preachy tendencies and to compare harmfulness across candidate responses, (d) guidance to choose responses that balance ethics with being helpful and respectful, (e) reflections on trial-and-error development of principles and the finding that broad, general principles can outperform overly specific ones, and (f) a high-level primer on constitutional AI, its values, and the motivation behind them. While the excerpts do not always name individual authors, they consistently reference the organization and the authorship/origination of the constitutional AI approach, indicating who is responsible for the ideas and the framework. Therefore, the most directly relevant content concerns who devised or authored the works (Anthropic) and the general practice of creating and applying these prompt principles, which is exactly what the finegrained field seeks to identify in terms of influential sources and authorship.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.

### influential_research_and_papers.3.publication_year
**Confidence:** high

The target field value encodes the publication year for influential research and papers. Among the excerpts, the one dated May 9, 2023 explicitly anchors a publication year in 2023, which aligns with the specified value 2023.0. This excerpt discusses constitutional AI, Claude's Constitution, and the principles used in shaping AI behavior, which are squarely within the realm of influential research topics referenced by the user. The other excerpts describe principles and features of Claude's Constitution but do not provide a specific publication year, so they offer context rather than direct evidence for the 2023 year value. Therefore, the 2023-dated excerpt is the most relevant for confirming the field value, while the others add contextual support about the broader area of research without confirming the year.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.

### code_review_agent_prompts.0.prompt_template
**Confidence:** high

The finegrained field value describes a highly structured arbiter prompt that consolidates multiple critic perspectives (SecurityCritic, ReadabilityCritic, etc.), orders findings by severity, and outputs a consolidated review with references. Excerpts that discuss concrete prompt templates for LLM reviews provide direct evidence of how such reasoning scaffolds are implemented in practice. For example, one excerpt mentions detailed prompt templates used in experiments to generate LLM reviews, which aligns with the need for concrete, reusable prompt architectures. Other excerpts discuss integrating LLMs into code-review workflows, showing how evaluation and critique prompts are structured within real-world pipelines (e.g., GitHub PR contexts), which supports how multi-critic reasoning and workflow-aware prompts are designed. Additional excerpts describe actions and prompts for automated code-review agents and evaluator frameworks, illustrating how prompts are constructed to elicit structured, multi-criterion feedback (security, readability, performance) and how form-filling or structured JSON outputs can be used to capture issues with evidence and recommendations. Together, these sources substantiate the existence and form of concrete prompt architectures, critique prompts, and multi-criteria reasoning patterns relevant to a design/evaluation context, as described in the target field value (an arbiter-style aggregation of multiple critic outputs).

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### influential_research_and_papers.4.publication_year
**Confidence:** low

The finegrained field asks for the publication year value (2024.0) within a collection about influential research and papers, specifically connected to Claude’s Constitution and constitutional AI practices. None of the excerpts explicitly state a publication year of 2024. The most directly relevant content across excerpts is discussion of how constitutional principles are selected, balanced, and applied in model critique and evaluation, as this context informs the type of multi-step reasoning and principle-based prompting referenced in the field (even though it does not confirm a 2024 publication year). The excerpts describe: (a) that a principle-guided evaluation process occurs during training and deployment, with selective application of principles rather than universal application, (b) explicit guidelines to choose less harmful or more ethical outputs, and (c) reflections on how broader versus more specific principles affect generalization and behavior. These details are highly relevant to the broader topic of reasoning scaffolds and principle-based prompts, but they do not provide or verify a 2024 publication year for any influential work. Consequently, while all excerpts touch on the mechanisms and design of constitutional or principle-based prompts (which is adjacent to the field value’s research context), none substantiates the exact field value of 2024.0, leading to a low level of direct evidence for the requested specific year while remaining highly relevant to the surrounding topic of reasoning scaffolds and constitutional AI practices.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.

### key_frameworks_and_methods.2.core_concept
**Confidence:** high

The target field value centers on a concrete training methodology where a model is guided by a set of principles embedded as short, comparative prompts (for example, 'Choose the response that is more X') and used to critique and revise its outputs during training. Excerpts that explicitly describe this pattern—formatting principles into instructive templates that compare outputs and instruct the model to select the more desirable option—directly support the described method. One excerpt demonstrates the standard formulation of constitutional prompts as 'Choose the response that is more X' within a CAI framework, showing how principles are embedded into the prompting template to steer evaluation. Another excerpt details translating public statements into CAI-compatible principles by minimally modifying them to fit this comparative instruction format, illustrating the practical adaptation of the template for training. Additional excerpts discuss Claude’s Constitution and related research findings, including how principles are selected during critique and revision phases, how broad versus specific principles affect generalization, and mechanisms to temper judgmental tendencies—this contextualizes the broader training regime and the reasoning/principle-based structuring. Collectively, these excerpts map onto the described approach of guiding model alignment through a principle-based, comparative prompting scheme and an iterative critique/refine training loop. 

- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g
  > Jun 12, 2024 — For the Standard constitution, we took the constitution outlined in an Anthropic blog post (Anthropic, 2023a) , which is used to fine-tune the Claude (Anthropic
- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.

### code_review_agent_prompts.0.purpose
**Confidence:** medium

The field value describes a strategy to conduct code reviews by dividing responsibilities among distinct agent roles, aiming to prevent dimension collapse and to ensure feedback remains specialized. Excerpts that discuss integrating LLMs into code review workflows and using structured prompts/templates to guide reviews align with this goal by implying separation of tasks or roles within the review process. Specifically: the excerpt about rethinking code review workflows with LLMs discusses meaningful integration into modern code review processes, which can imply role-based or structured guidance within reviews; the excerpts describing detailed prompt templates used for generating LLM reviews provide concrete mechanisms for shaping distinct review outputs; material on scaffolds for code quality within PR workflows and human-in-the-loop setups suggests structured decomposition of tasks or stages in review to avoid collapsing across evaluation dimensions; discussions of evaluation frameworks (G-Eval) and reasoning-focused prompting (Constitutional AI-like prompts and reasoning patterns) indicate knowledge of multi-step or multi-criteria reasoning that supports specialized feedback channels rather than a single monolithic response. The remaining excerpts offer related but more tangential context (automatic review agents, code-review bots, and generic evaluation papers) that do not directly address explicit separation into agent roles or multi-dimensional feedback channels, but provide supporting background on the use of prompts and review scaffolds in code-review contexts.

- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.

### code_review_agent_prompts.2.prompt_command
**Confidence:** medium

The finegrained field value points to an iterative, design-evaluation oriented prompting approach within code review contexts. The most relevant material demonstrates concrete, reusable prompt templates used to generate LLM reviews, which directly addresses the request for concrete prompt architectures and structured reasoning patterns in code review tasks. For example, there are explicit mentions of detailed prompt templates used in experiments to produce LLM reviews, which aligns with the goal of showing how reasoning patterns are structured rather than relying on generic tips. Closely related is the notion of automation in code review workflows, where an LLM (or AI assistant) is integrated into the code review process, indicating concrete deployment of prompt-driven reasoning in real-world workflows. A further related thread discusses how code review workflows can be enhanced by LLM assistance, suggesting architectural patterns for integrating evaluation and critique within development pipelines. Additional supportive context includes systems that automate code review actions (such as a CodeReviewer agent) which exemplify end-to-end prompt-driven critique in a PR-centric environment. Supporting, though secondary, is work on evaluating LLM evaluators and evaluation pipelines that use structured reasoning prompts (e.g., form-filling with rationale), which complements the broader theme of multi-step, multi-criteria reasoning in evaluation tasks. Finally, there are sources illustrating code-review-related evaluation tooling and datasets that underpin the design of rationale-oriented prompts, though they are slightly less targeted to concrete code-review prompt templates than the core code-review prompt architectures themselves.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### code_review_agent_prompts.2.prompt_template
**Confidence:** medium

The described field value centers on an iterative two-step prompting pattern for code review: first a FEEDBACK prompt acting as a readability/quality assessor, then a REFINE prompt that rewrites code incorporating the feedback. The most relevant material directly presents concrete prompt templates or structured critique scaffolds used for code review or related design critique contexts. The first excerpt explicitly mentions providing detailed prompt templates used in experiments and includes prompts for generating LLM reviews, which aligns with the notion of concrete, reusable templates for structured critique. The third excerpt discusses an AI-assisted code review scaffold embedded in a workflow, which mirrors the idea of having structured roles and prompts guiding evaluation and subsequent improvement. The second excerpt covers research on rethinking code review workflows with LLM assistance, contributing context on how prompts and reasoning can be integrated into code-review pipelines, which complements the iterative revision concept. The fourth excerpt describes an automated code reviewer action set, illustrating practical prompt-driven interactions in a code review setting, reinforcing the feasibility of prompt-driven iterative critique. The remaining two excerpts touch on evaluation methods and tooling related to LLMs in critique tasks, providing broader methodological support but less direct alignment with the explicit two-prompt iterative pattern requested. Taken together, these excerpts collectively support the notion of concrete, reusable prompt architectures for code-review-like reasoning tasks, including iterative feedback and refinement flows.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### code_review_agent_prompts.1.prompt_template
**Confidence:** high

The most relevant material directly addresses prompt design for code review or automated review workflows. The first excerpt states that the paper provides detailed prompt templates used for experiments, including prompts for generating LLM reviews, which aligns with concrete prompt architectures for code review tasks and shows how reasoning patterns and review outputs can be templated. The next excerpt discusses how LLMs can be meaningfully integrated into modern code review workflows, which supports the operational context of a code-review assistant working within PRs and developer workflows. The third highly relevant piece shows an actionable code-review automation tool (ChatGPT CodeReviewer) that performs reviews and presents information in PR timelines, illustrating concrete tooling and expected output styles. A following excerpt analyzes LLM-assisted code review as a scaffold within GitHub PRs, reinforcing the idea of LLMs as in-PR reviewers and the structured feedback they produce. Additional sources discuss broader evaluation frameworks (G-Eval) and evaluation prompts, which are adjacent to reasoning quality in prompts but less directly tied to the specific output style of inline PR comments; they still inform how prompts influence multi-step or evaluative outputs in code contexts. Overall, the strongest signals are concrete prompt templates for code reviews, followed by real-world code-review tooling and workflows that define how prompts translate into actionable review outputs.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling

### code_review_agent_prompts.2.purpose
**Confidence:** medium

The finegrained field value describes a purpose for a code review agent: to iteratively improve readability of code via the model’s own self-generated feedback. Excerpts that discuss concrete prompt templates and multi-turn review workflows in code review contexts directly support this goal, especially those that show how prompts are used to generate and refine critique within a code review loop. A prompt template-based approach is exactly what is needed to implement iterative, self-guided improvements, since templates encode structured reasoning and sequential critique steps. Excerpts describing LLM-assisted code review integrated into real workflows illustrate how feedback loops can be conducted in practice, where the model reviews, critiques, and potentially guides improvements within a pull-request context. Discussions of code-review-specific scaffolds, critique prompts, and actions taken by a CodeReviewer-like agent align with the idea of self-generated feedback driving readability enhancements. In addition, sources that cover evaluation frameworks and multi-turn reasoning in code evaluation provide context on how to measure the quality of the iterative feedback process, ensuring that readability improvements are not only produced but also assessed. Taken together, the most relevant content centers on concrete prompt templates for code review tasks, the use of LLMs as iterative reviewers within development workflows, and the mechanisms by which a model can produce, critique, and refine its own feedback to improve readability. The less directly aligned items offer supportive context about evaluation methods and broader code-review automation but do not map as tightly to the explicit self-refinement loop described in the target field value. The most relevant details include concrete prompt templates for generating code reviews, examples of LLMs acting as code reviewers within PR workflows, and the notion of iterative critique and refinement loops that could realize self-generated readability improvements.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### key_frameworks_and_methods.4.primary_use_case
**Confidence:** high

The most relevant content describes Reflexion, a framework where language agents improve by reflecting on their own outputs and updating their reasoning strategy through verbal reinforcement rather than altering model weights. This directly embodies a trial-and-error loop: the agent tries a solution, reflects on its performance, and adjusts its subsequent behavior to better solve decision-making, programming, and reasoning tasks. The examples referenced indicate this approach enhances performance on complex tasks and can be applied to evaluation-related scenarios like UI design critique, which matches the user’s interest in improving UI evaluation through reflection on past suggestions. The second excerpt reinforces this by detailing how a Reflexion agent learns to optimize behavior for various reasoning tasks via trial and error, illustrating the practical workflow of reflect → revise → retry. The third excerpt reiterates the same framework and situates it in the context of updating language outputs through reflective processes, which aligns with learning from past mistakes without changing underlying weights, a core aspect of trial-and-error improvement in evaluation-heavy tasks.

- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been

### code_review_agent_prompts.2.tool_name
**Confidence:** medium

The most relevant excerpt clearly discusses concrete prompt templates used for LLM reviews, including prompts for generating reviews. This directly aligns with the notion of concrete prompt architectures for code review tasks and can provide template patterns that could be adapted into a self-refine loop aimed at improving readability in code reviews. A closely related excerpt describes practical GitHub code review tooling and actions, illustrating concrete, action-oriented prompts that drive automated review workflows, which is valuable for building a self-refine cycle where readability is incrementally improved through successive prompts and feedback. Another relevant excerpt frames code review as a scaffold for code quality, which can be extended with iterative refinement steps to target readability issues specifically, helping to ground self-refine approaches in real-world review pipelines. Additional excerpts discuss evaluation methods for LLM-based evaluators and CoT reasoning, which are useful for validating refinement steps and ensuring that readability-focused critiques are justified and well-reasoned. Other excerpts provide broader discussions on code review workflows and evaluation datasets, offering context on how structured reasoning and templates have been used in related tasks, though they are one step removed from direct readability-focused self-refinement in code review. Finally, there are references to general evaluation libraries and prompts for evaluating generated code, which support the broader ecosystem in which a self-refine-for-readability tool would operate.

- [LLMs Assist NLP Researchers: Critique Paper (Meta-) ...](https://aclanthology.org/2024.emnlp-main.292.pdf)
  > by J Du · 2024 · Cited by 113 — F Prompt Templates. We provide the detailed prompt templates used for the experiments throughout the paper. This includes prompts for generating LLM reviews (Ta
- [ChatGPT CodeReviewer · Actions](https://github.com/marketplace/actions/chatgpt-codereviewer)
  > Feb 15, 2023 — The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
- [AI-Assisted Code Review as a Scaffold for Code Quality ...](https://arxiv.org/html/2604.23251v1)
  > Apr 25, 2026 — We investigate an LLM-as-reviewer integrated directly into GitHub pull requests (human-in-the-loop) across two cohorts (¿100 students, 2023–2024). Using a
- [Evaluating the Effectiveness of LLM-Evaluators (aka LLM- ...](https://eugeneyan.com/writing/llm-evaluators/)
  > Aug 19, 2024 — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment demonstrates how to evaluate LLM responses using gpt-4 with CoT reasoning and a form-filling
- [Rethinking Code Review Workflows with LLM Assistance](https://arxiv.org/html/2505.16339v1)
  > May 22, 2025 — This study investigates how LLMs can be meaningfully integrated into modern code review workflows to improve developer experience and potentially support
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### key_frameworks_and_methods.2.primary_use_case
**Confidence:** high

The finegrained field value concerns concrete mechanisms to align LLM behavior with safety and ethics, including how prompts and principles shape reasoning and tone. Excerpt describing a principle that explicitly asks the model to select the most harmless and ethical response (and to avoid toxic, racist, sexist, or illegal content) directly supports the idea of a concrete alignment prompt pattern focused on safety and ethics. Excerpts that discuss adding principles to temper judgment and balance harm (less condescending, less preachy, and proportionate responses) further illustrate how prompt design governs behavior and tone, which is central to the field value. Other excerpts describe the practice of converting public statements into CAI-compatible principles and using templates like 'Choose the response that...' to encode criteria, which demonstrates concrete prompt architectures enabling multi-criterion evaluation and structured reasoning. Descriptions of training-time exposure to principles and their selective application during critique/evaluation elucidate how these prompts influence behavior during inference. Collectively, these excerpts map to how to implement, structure, and balance a reasoning/critique prompt system to achieve harmlessness, privacy protection, and avoidance of biased language, addressing the core aspects of the requested field value.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > Jun 12, 2024 — For the Standard constitution, we took the constitution outlined in an Anthropic blog post (Anthropic, 2023a) , which is used to fine-tune the Claude (Anthropic
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g

### key_frameworks_and_methods.2.name
**Confidence:** high

The field value refers to Constitutional AI (CAI) as a core framework for aligning language models through principles and structured reasoning prompts. Excerpts describe Claude's Constitution and the CAI approach, where principles are used to guide critique and response selection during training and reinforcement learning. For instance, one excerpt explains that the model critiques and revises outputs by pulling from a set of principles encountered during training, indicating a structured, principle-based alignment mechanism. Another excerpt provides concrete principle examples that emphasize harmlessness, ethics, and non-condescending behavior, illustrating how CAI principles are crafted to influence model judgment and output. Additional excerpts discuss modifying CAI models by adjusting the principles to temper behavior, showing the practical engineering of CAI systems. Together, these excerpts establish that CAI is implemented via a systematic set of constitutional principles and templates rather than ad-hoc rules, and they illustrate the real-world instantiation of CAI in model evaluation and critique tasks. The remaining excerpts further corroborate the CAI concept by showing how public-facing descriptions and templates (e.g., “Choose the assistant response that is as harmless and ethical as possible”) operationalize CAI in training and prompting. Consequently, the provided excerpts collectively support the field value as a concrete constitutional AI framework with explicit principles and structured prompts guiding evaluation and critique tasks.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > Jun 12, 2024 — For the Standard constitution, we took the constitution outlined in an Anthropic blog post (Anthropic, 2023a) , which is used to fine-tune the Claude (Anthropic
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g

### key_frameworks_and_methods.4.name
**Confidence:** high

The field value corresponds to a framework name that is explicitly described in the excerpts. One excerpt presents Reflexion as a framework for language agents that learns to optimize behavior through trial, error and verbal reinforcement, which directly aligns with structured reasoning and self-improvement prompts in agent systems. Another excerpt closes in on Reflexion as a framework that reinforces language agents by updating language outputs rather than model weights, underscoring a concrete implementation approach for multi-step reasoning and self-refinement in agents. The third excerpt likewise references Reflexion in the context of decision-making and reasoning tasks, illustrating its role in guiding agent performance. Taken together, these excerpts provide concrete mentions and descriptions of Reflexion as a reasoning scaffolding used to enhance LLM-based agency and problem-solving, which directly supports understanding of the field value at the specified path.

- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,

### key_frameworks_and_methods.4.reference_paper
**Confidence:** medium

The excerpts collectively establish a discourse around self-reflection and reasoning augmentation for language agents. The first excerpt introduces Reflexion: Language Agents with Verbal Reinforcement Learning, indicating a framework where agents improve through a form of self-generated reasoning or verbalized reflection. This directly aligns with the concept of self-reflection as a reasoning scaffold used to enhance decision-making and task performance. The second excerpt reinforces this by describing how a Reflexion agent learns to optimize its behavior for decision-making, programming, and reasoning tasks through trial, error, and presumably internal reflection guided by verbal reinforcement. The third excerpt expands on Reflexion as a framework that reinforces language agents by updating language rather than model weights, further illustrating the mechanism by which self-reflection and reasoning prompts influence outputs. Taken together, these excerpts demonstrate concrete implementations and experimental observations of self-reflection or reasoning augmentation in LLM-based agents, which is precisely the type of method referenced in the fine-grained field value. Although the user’s context specifically notes that the original Reflexion paper is not named, the excerpts provide substantial evidence of the same self-reflection concept and its practical instantiation in LLM systems, thereby supporting the existence and relevance of the described methodological strand. The connection is that the self-reflection or verbal reinforcement frameworks described in these sources exemplify concrete prompt architectures and processes that encode multi-step reasoning for evaluation and critique tasks, aligning with the user’s research interest in concrete patterns and implementations (e.g., prompting structures, maintainable reasoning loops, and reinforcement of reasoning through generated content).

- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been

### influential_research_and_papers.4.key_contribution
**Confidence:** high

The target field value describes a method to operationalize public feedback by turning qualitative statements (for example, 'AI should not do X') into CAI-compatible comparative principles using a template such as 'Choose the response that...'. The most directly relevant excerpts show explicit instructions or motivations for using comparative, principle-based prompts rather than generic rules. For instance, passages emphasize selecting responses that are more harmless, ethical, or less harmful, and they discuss tempering or balancing principles to avoid overly preachy or reactive outputs. These pieces illustrate practical templates and design considerations (e.g., selecting the response that demonstrates more ethical and moral awareness without being condescending or condemnatory), which align with the requested concept of concrete prompt architectures that encode multi-step reasoning through comparative principles. Additional excerpts note that constitutional AI and explicit principles are developed and applied through structured prompting, reinforcing the connection between public feedback and principled evaluation prompts. Taken together, these excerpts directly support the existence and utility of a prompt pattern library or template system that operationalizes qualitative feedback into CAI-friendly comparative prompts used during critique and evaluation stages.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.
  > Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.
  > Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > May 9, 2023 — In this post, we explain what constitutional AI is, what the values in Claude's constitution are, and how we chose them.

### key_frameworks_and_methods.1.name
**Confidence:** high

The most directly relevant excerpt introduces SELF-REFINE as an approach for improving initial outputs from LLMs through iterative feedback and refinement, clearly identifying Self-Refine as a concrete, reusable method for automated reasoning and refinement loops. This aligns with the field value by providing explicit description of a multi-step refinement process central to Self-Refine. The next excerpt describes SELF-REFINE as an iterative self-refinement algorithm that alternates between feedback and refinement steps, reinforcing the concrete protocol nature of Self-Refine and its applicability to enhancing generated content. The final excerpt references Self-Refine in the context of a survey of related work, confirming its prominence and ongoing discussion in the literature, and illustrating its role as a cited method among others. Collectively, these excerpts substantiate that Self-Refine is a concrete, repeatable mechanism for iterative improvement in LLM outputs, which directly supports the finegrained field value.

- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [A Survey on Code-Enhanced Reasoning and ...](https://arxiv.org/html/2502.19411v1)
  > Feb 26, 2025 — Recent researches enabled LLMs to autonomously evaluate and improve their outputs, with Self-Refine Madaan et al. (2023) demonstrated how models can generate,

### key_frameworks_and_methods.0.core_concept
**Confidence:** high

The most relevant excerpt explicitly states that G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function, which directly aligns with the described framework of prompting LLMs to think step-by-step (CoT) and then evaluating via a scoring mechanism. Additionally, it notes that G-Eval includes a form-filling paradigm, which maps to the structured form with scores, rationales, and evidence described in the finegrained field value. Supporting evidence from the other excerpts confirms and elaborate on these points: the idea of using CoT to evaluate generated texts, and the implementation of a form-like rubric to capture evaluation outcomes. Collectively, these excerpts corroborate a concrete, reusable prompt architecture pattern centered on CoT reasoning plus structured scoring and evidence collection, as requested in the user’s query about concrete prompt architectures for evaluation and critique.

- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://aclanthology.org/anthology-files/pdf/emnlp/2023.emnlp-main.153.pdf)
  > by YLDIY Xu · Cited by 2596 — In this paper, we propose G-EVAL, a framework of using LLMs with chain-of-thoughts (CoT) (Wei et al., 2022) to evaluate the quality of generated texts in a form
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### key_frameworks_and_methods.1.core_concept
**Confidence:** high

The most directly supportive content describes an explicit iterative self-improvement loop: an initial generation is produced, followed by a loop of generating feedback against specified criteria (FEEDBACK) and then editing or refining the output based on that feedback (REFINE). This mirrors the exact structure of the finegrained field value, which specifies an initial run (INIT) and a repeated FEEDBACK-REFINE cycle to improve the result. The second excerpt reinforces this by naming SELF-REFINE as an approach for improving initial outputs through iterative feedback and refinement, aligning with the exact mechanism described in the field value. The third excerpt broadens the context by surveying SELF-REFINE in 2025 and noting autonomous evaluation/improvement trends, which supports the existence and relevance of such iterative refinement schemes in contemporary research, reinforcing the connection to the described process. Together, these excerpts corroborate the field value’s characterization of an iterative, self-improving loop with distinct phases (initial generation, feedback, and refinement).

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [A Survey on Code-Enhanced Reasoning and ...](https://arxiv.org/html/2502.19411v1)
  > Feb 26, 2025 — Recent researches enabled LLMs to autonomously evaluate and improve their outputs, with Self-Refine Madaan et al. (2023) demonstrated how models can generate,

### influential_research_and_papers.5.url
**Confidence:** high

The target URL is found explicitly in a source that discusses a framework for evaluating UI design quality by separating evaluation into usability, content, aesthetics, reputation, and customization, indicating a concrete design-evaluation prompt architecture. This same source also mentions a chain-of-prompts approach for major tasks, illustrating structured prompt design and referencing a figure that shows the implementation, which aligns with concrete prompt architectures for evaluation and critique. Additionally, the URL appears again in a related excerpt that cites a related work by Duan et al. and notes that the chain of prompts follows a specific prompt design from prior work, reinforcing that this URL corresponds to a concrete design-evaluation prompt architecture embedded in a real paper. Together, these excerpts support that the specified URL is a concrete, reusable prompt architecture pattern for design reasoning and evaluation tasks, matching the requested fine-grained field value. The quotes indicating the exact URL and the described framework provide direct evidence of the source’s role in formulating structured prompts for design evaluation and critique.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples

### key_frameworks_and_methods.0.name
**Confidence:** high

The target field name and value correspond to the well-known G-Eval framework for NLG/NLP evaluation that repeatedly appears across the excerpts. To validate that the field value is indeed represented in the excerpts, we identify sources that explicitly describe G-Eval as a framework for evaluating generated texts using chain-of-thought reasoning and a form-filling paradigm. The most directly supportive content comes from the arXiv entries that introduce G-Eval as a framework for evaluating the quality of generated text with CoT reasoning. These excerpts explicitly define G-Eval and describe its architecture and methodology, aligning with the goal of concrete prompt architectures and evaluation workflows. Additional corroboration is found in a subsequent explanatory piece (a blog post) that describes G-Eval as comprising three main components: the prompt, automatic CoT reasoning, and the scoring function, reinforcing the same core framework. A repository entry related to the G-Eval paper provides code support for the evaluation framework, illustrating practical implementation. The other excerpt is a duplicate/near-duplicate reference to the same G-Eval work, further supporting the central role of G-Eval in this research landscape. Collectively, these excerpts directly support the presence and structure of the G-Eval prompt-evaluation framework, and they provide concrete details about CoT usage, form-filling paradigms, and implementation aspects relevant to design evaluation, code review, and creative critique contexts. The strongest support comes from the arXiv papers introducing G-Eval, followed by the blog overview and code repository, with all supporting that the field value should be G-Eval.


- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://aclanthology.org/anthology-files/pdf/emnlp/2023.emnlp-main.153.pdf)
  > by YLDIY Xu · Cited by 2596 — In this paper, we propose G-EVAL, a framework of using LLMs with chain-of-thoughts (CoT) (Wei et al., 2022) to evaluate the quality of generated texts in a form
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### key_frameworks_and_methods.3.primary_use_case
**Confidence:** low

The most relevant material describes iterative feedback and refinement mechanisms used to improve generated outputs. This aligns with the idea of generating and refining feedback, which is a core component of automatic critique workflows. The cited works discuss a two-step feedback and refine cycle that enhances initial outputs, which conceptually supports building a system to generate structured feedback. Other excerpts elaborate on verbal reinforcement and reflective reasoning for agents, which relate to designing prompts that prompt an iterative evaluation or critique process. However, none of the excerpts explicitly demonstrate UI/UX-specific prompt templates or concrete architectures for UI/UX design mockup evaluation. They provide high-level concepts (feedback loops, self-improvement through reasoning) rather than concrete, reusable UI/UX prompt templates or separation strategies for violation detection vs final feedback. Therefore, the connection is conceptual rather than evidential for the exact field value, with the strongest signal coming from descriptions of iterative feedback/refinement workflows.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu

### key_frameworks_and_methods.0.primary_use_case
**Confidence:** high

The target field value describes NLG evaluation and the goal of aligning LLM-based evaluation with human judgments through a structured evaluation process. Excerpts that outline G-Eval as a framework for evaluating generated texts, with components such as a prompt, automatic chain-of-thought reasoning, and a scoring function, directly support this description. The excerpt stating that G-Eval is composed of three main components (prompt, automatic CoT reasoning, and scoring function) explicitly maps to the idea of a structured evaluation process designed to improve alignment with human judgments. Additional excerpts that discuss NLG evaluation using GPT-4 with better human alignment, and the broader context of G-Eval in evaluating generated text with form-filling or CoT paradigms, reinforce the same theme by illustrating concrete implementations and variations of the evaluation architecture. A reference to code implementing G-Eval and experiments on evaluation datasets further corroborates the practical, reusable prompt architectures for design and critique tasks within NLG evaluation contexts. Taken together, these excerpts coherently support the field value’s claim about NLG evaluation designed to improve alignment with human judgments through structured evaluation processes, including CoT reasoning and scoring mechanisms.

- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.
- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://aclanthology.org/anthology-files/pdf/emnlp/2023.emnlp-main.153.pdf)
  > by YLDIY Xu · Cited by 2596 — In this paper, we propose G-EVAL, a framework of using LLMs with chain-of-thoughts (CoT) (Wei et al., 2022) to evaluate the quality of generated texts in a form
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset

### key_frameworks_and_methods.4.core_concept
**Confidence:** high

The finegrained field value describes a self-reflection loop where the agent analyzes a failure, generates a reflection, and incorporates that reflection into the prompt context for the next attempt. The first excerpt identifies Reflexion as a framework where language agents optimize behavior through trial and error and includes the idea of verbal reinforcement guiding subsequent actions, which mirrors incorporating reflective insights into future prompts. The second excerpt notes that Reflexion agents learn by reflecting to solve tasks such as decision-making and reasoning, reinforcing the idea of a self-guided improvement loop. The third excerpt explicitly characterizes Reflexion as a framework that updates language (not weights), which supports the notion of updating the agent’s internal, language-based guidance—i.e., memory or reflections—used in future interactions. Collectively, these excerpts support the idea of a self-reflection process that generates reflections on failures and uses those reflections to inform subsequent attempts by altering the language-based reasoning or prompt content, rather than modifying the model itself.

- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been

### key_frameworks_and_methods.3.name
**Confidence:** high

The fine-grained field value identifies a two-pass pattern where an initial output is followed by a diagnostic/verification pass and then a rewrite to improve quality. The most directly relevant material discusses SELF-REFINE, which explicitly describes iterative refinement through alternating feedback and refinement steps—this embodies a concrete two-pass workflow (first generate with a prompt or reasoning step, then critique/adjust in a second pass). The accompanying excerpt further clarifies that this approach improves initial outputs via an iterative loop, matching the two-pass detect→rewrite paradigm. Related excerpts discuss Reflexion and language-agent reinforcement, which describe iterative improvements driven by verbal reinforcement and self-guidance; while not identical in labeling to a two-pass workflow, they illustrate competent structures for iterative reasoning and post-generation modification, reinforcing the broader concept of multi-step reasoning scaffolds. Together, these excerpts support the existence and practicality of two-step iterative patterns (a detect/critique phase followed by a rewrite phase) as a concrete prompt architecture for design evaluation and related tasks. The strongest support comes from the explicit SELF-REFINE description of iterative feedback and refinement, which maps closely to a two-pass approach, while the Reflexion-based works provide corroborating context on iterative reasoning enhancements through self-generated feedback. 

- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu

### influential_research_and_papers.5.publication_year
**Confidence:** high

The finest-grained field value concerns the publication year 2024 for influential research and papers in the area of design evaluation, UI critique, and reasoning scaffolds. Excerpts that explicitly reference 2024—either by date (Jul 15, 2024) or by describing 2024-era methods and systems—directly support the target year. The first excerpt documents a 2024 framework for evaluating UI design quality with clearly defined criteria (usability, content, aesthetics, reputation, customization), which aligns with concrete design evaluation practices in 2024. The second excerpt discusses a chain-of-prompt design illustrated in a 2024 work and references a 2024 source, indicating concrete prompt architectures and multi-step reasoning patterns relevant to 2024-era evaluation and critique. The fourth excerpt describes 2024-era design goals for an automatic LLM-driven heuristic evaluation tool, illustrating practical, published work in 2024 on design evaluation and feedback loops. The remaining excerpts (from 2023) show related but earlier work and thus provide context but are not evidence for the 2024 publication year target. Collectively, these excerpts support that there was active 2024 development in design evaluation prompts and UI critique systems, with concrete architectures and iterative refinement documented in that year.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### key_frameworks_and_methods.3.core_concept
**Confidence:** high

The field value describes a concrete two-pass prompt architecture: in the first pass, an LLM identifies violations or issues (producing a machine-parsable list), and in the second pass, a separate pass rewrites those violations into constructive, actionable guidance. This aligns with the SELF-REFINE concept, which explicitly alternates between FEEDBACK and REFINE steps to iteratively improve outputs. The cited excerpts discuss SELF-REFINE as an iterative self-refinement process for improving initial LLM outputs through a feedback-and-refinement loop, which matches the two-step critique structure described in the field value. Additional excerpts discuss related ideas like Reflexion and verbal reinforcement for agents, illustrating broader iterative improvement scaffolds in reasoning and decision-making tasks, which provide context and support for structured, multi-step critique workflows in design evaluation and related areas. Therefore, the two-step critique architecture is strongly supported, with related iterative refinement techniques reinforcing its viability and practical application across design, UI evaluation, and creative critique domains.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/html/2303.11366)
  > Oct 10, 2023 — For example, in figure 1, a Reflexion agent learns to optimize its own behavior to solve decision-making, programming, and reasoning tasks through trial, error,
- [Reflexion: language agents with verbal reinforcement ...](https://openreview.net/forum?id=vAElhFcKW6)
  > by N Shinn · Cited by 4584 — Reflexion is a framework that reinforces language agents by updating language rather than model weights. Abstract: Large language models (LLMs) have been
- [Reflexion: Language Agents with Verbal Reinforcement ...](https://arxiv.org/abs/2303.11366)
  > by N Shinn · 2023 · Cited by 4612 — Reflexion: Language Agents with Verbal Reinforcement Learning. Authors:Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu

### key_frameworks_and_methods.2.reference_paper
**Confidence:** high

The most relevant excerpts directly describe Claudes Constitution, including how the model uses a set of principles during critique and revision, and how training involves exposing the model to those principles repeatedly. For example, one excerpt explains that the model pulls from a set of principles during critique and evaluation, and that the training process includes evaluating which output is superior while applying those principles. This aligns with the notion of Claudes Constitution as a curated framework used to guide model behavior during assessment and response generation. Another excerpt states that Claudes Constitution was developed through an iterative process, with an explicit example principle emphasizing harmlessness and ethical behavior, and notes that overly long, overly specific principles can harm generalization. This provides concrete detail about the content and design philosophy behind the constitution as described by Anthropic. Additional excerpts describe how the CAI-trained model balances judgments to avoid being overly preachy or condescending, and how the model compares the harmfulness of responses to select the less harmful option, which illustrates the practical effects of the constitutional prompts in practice. Together, these passages establish a coherent picture of Claudes Constitution as a concrete, implementable prompt framework used by Anthropic and related work, including how principles are structured, implemented, and moderated during training and evaluation. There is also corroborating material illustrating that Anthropic public-facing materials describe using a template that translates statements into a CAI-compatible format (e.g., transforming constitutional statements into prompts like Choose the response that is more X), which further ties the cited constitution to concrete prompt architectures and templates used in practice. The remaining excerpts provide additional context about CAI principles and their general formulation, reinforcing the link to Claudes Constitution as a central reference point for principle-based evaluation prompts in this research area.

- [Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)
  > The model pulls one of these principles each time it critiques and revises its responses during the supervised learning phase, and when it is evaluating which output is superior in the reinforcement learning phase. It does not look at every principle every time, but it sees each principle many times during training.
  > 
We developed many of our principles through a process of trial-and-error. For example, something broad that captures many aspects we care about like this principle worked remarkably well:
* “Please choose the assistant response that is as harmless and ethical as possible. Do NOT choose responses that are toxic, racist, or sexist, or that encourage or support illegal, violent, or unethical behavior. Above all the assistant's response should be wise, peaceful, and ethical.”
Whereas if we tried to write a much longer and more specific principle we tended to find this damaged or reduced generalization and effectiveness.
  > Another aspect we discovered during our research was that sometimes the CAI-trained model became judgmental or annoying, so we wanted to temper this tendency. We added some principles that encouraged the model to have a proportionate response when it applied its principles, such as:
* “Choose the assistant response that demonstrates more ethical and moral awareness without sounding excessively condescending, reactive, obnoxious, or condemnatory.”
* “Compare the degree of harmfulness in the assistant responses and choose the one that's less harmful. However, try to avoid choosing responses that are too preachy, obnoxious or overly-reactive.”
* “Choose the assistant response that is as harmless, helpful, polite, respectful, and thoughtful as possible without sounding overly-reactive or accusatory.”
  > This illustrates how it’s relatively easy to modify CAI models in a way that feels intuitive to its developers; if the model displays some behavior you don’t like, you can typically try to write a principle to discourage it.
- [Collective Constitutional AI: Aligning a Language Model ...](https://arxiv.org/html/2406.07814v1)
  > Jun 12, 2024 — For the Standard constitution, we took the constitution outlined in an Anthropic blog post (Anthropic, 2023a) , which is used to fine-tune the Claude (Anthropic
  > The principles for Constitutional AI training are typically formatted as instructions to the language model, in the form: “Choose the response that is more X.”
  > . As a result, we had to translate the public statements into CAI-compatible principles. To create our set of constitutional principles, we manually re-worded statements as instructions by putting them into the template “Choose the response that…”, looking to modify them minimally to avoid bias. E.g

### key_frameworks_and_methods.0.reference_paper
**Confidence:** high

The most directly relevant passages explicitly reference the G-Eval framework and its association with evaluating NLG outputs using chain-of-thoughts, aligning with the topic of concrete prompt architectures for NLG evaluation. Specifically, the exact title appears in multiple excerpts, establishing a direct match to the requested paper. Additional excerpts describe the G-Eval framework, its components (prompt, CoT reasoning, scoring), and the repository/code related to the paper, further corroborating the connection to the specified reference paper. An excerpt that discusses a Comet blog entry about G-Eval provides contextual support about how the framework is discussed in industry-oriented summaries, while an excerpt mentioning code for the paper reinforces the existence and accessibility of the work. Collectively, these excerpts support identifying the specified title as the key reference in the fieldpath provided, with stronger support from those that state the exact title and core methodology (CoT-based evaluation, form-filling/paradigms) and corroborating sources (ArXiv, ACL Anthology).

- [NLG Evaluation using Gpt-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)
  > by Y Liu · 2023 · Cited by 2596 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — We present G-Eval, a framework of using large language models with chain-of-thoughts (CoT) and a form-filling paradigm, to assess the quality of NLG outputs.
- [arXiv:2303.16634v3 [cs.CL] 23 May 2023](https://arxiv.org/pdf/2303.16634)
  > by Y Liu · 2023 · Cited by 2638 — In this paper, we propose G-EVAL, a framework of using LLM with chain-of-thoughts (CoT) to eval- uate the quality of generated texts. We conduct extensive
- [NLG Evaluation using GPT-4 with Better Human Alignment](https://aclanthology.org/anthology-files/pdf/emnlp/2023.emnlp-main.153.pdf)
  > by YLDIY Xu · Cited by 2596 — In this paper, we propose G-EVAL, a framework of using LLMs with chain-of-thoughts (CoT) (Wei et al., 2022) to evaluate the quality of generated texts in a form
- [nlpyang/geval: Code for paper "G-Eval: NLG Evaluation ...](https://github.com/nlpyang/geval)
  > Jun 28, 2023 — Code for paper "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment" [https://arxiv.org/abs/2303.16634] Experiments on SummEval dataset
- [G-Eval for LLM Evaluation - Comet](https://www.comet.com/site/blog/g-eval-for-llm-evaluation/)
  > Jan 28, 2025 — G-Eval is composed of three main components: the prompt, automatic CoT reasoning, and the scoring function.

### influential_research_and_papers.5.key_contribution
**Confidence:** high

The target field describes a concrete, multi-criteria rubric for UI design evaluation, separating aesthetics and usability, with usability further broken into learnability and efficiency. Excerpt 0 presents a framework for UI design evaluation that explicitly separates usability and aesthetics (along with other criteria), which aligns with the multi-criteria rubric in the target value. Excerpt 1 expands on the same UI critique framework and explicitly references a chain of prompts for major tasks, indicating a structured prompt architecture consistent with multi-criteria evaluation workflows. Excerpt 2 discusses a heuristic evaluation plugin for UI design (Figma), illustrating concrete tooling and prompts used to assess UI quality across multiple criteria, which supports practical implementation of the rubric. Excerpt 3 describes the goals and realization of an automatic, LLM-driven heuristic evaluation tool for UI mockups, further reinforcing the multi-criteria evaluation approach in practice. Excerpt 4 introduces SELF-REFINE, an iterative generate-critique-refine loop in design/visual tasks, which complements a multi-criteria evaluation by enabling ongoing refinement of judgments across dimensions. Altogether, these excerpts map onto the requested claim by showing concrete, reusable prompt architectures and evaluation pipelines that support a structured, multi-faceted assessment of UI design quality, including but not limited to aesthetics and usability and their subcomponents. The combination of distinct criteria, explicit prompt chains, and practical tooling demonstrates how reasoning scaffolds and principle-based prompts can be operationalized in real design evaluation settings.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > Jul 15, 2024 — developed a framework for evaluating UI design quality that separated it into five criteria: usability, content, aesthetics, reputation, and customization.
  > Jul 15, 2024 — This chain of prompts, one for each major task, is illustrated in Figure 9 and follows the prompt design from (Duan et al., 2024) . ... LLM on all 938 UI examples
- [Towards Generating UI Design Feedback with LLMs](https://dl.acm.org/doi/abs/10.1145/3586182.3615810)
  > by P Duan · 2023 · Cited by 33 — We build an LLM-based heuristic evaluation plugin for Figma, which designers can use to evaluate their UI mockups.
- [Generating Automatic Feedback on UI Mockups with Large ...](http://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf)
  > by P Duan · 2024 · Cited by 127 — In this section, we describe the set of design goals for an automatic. LLM-driven heuristic evaluation tool, how they are realized in our system, the underlying
- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to

### key_frameworks_and_methods.1.primary_use_case
**Confidence:** high

The finegrained field value describes iterative improvement of generated content through a self-refinement loop and notes that adaptations have been used for design critique. The most directly relevant evidence comes from a description of SELF-REFINE as an iterative self-refinement algorithm that alternates between generating feedback and refining the output, which clearly pins the concept to a structured, repeated improvement process. A closely related excerpt characterizes SELF-REFINE as an approach to improve initial outputs from LLMs via iterative feedback and refinement, which confirms the practical mechanism of iterating on outputs to raise quality. A supporting but broader reference situates Self-Refine within the literature of code-enhanced reasoning and notes that recent work has demonstrated how models can autonomously evaluate and improve their outputs, explicitly mentioning Self-Refine as part of this progression. Collectively, these excerpts substantiate the idea that iterative self-improvement loops have been studied and applied, including in settings that resemble design critique adaptations, aligning with the field value’s emphasis on iterative quality enhancement and its applications to design critique. Therefore, the most pertinent pieces describe the core loop and its empirical use, with the others providing corroborative context on its adoption and relevance to complex reasoning tasks like design critique.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [A Survey on Code-Enhanced Reasoning and ...](https://arxiv.org/html/2502.19411v1)
  > Feb 26, 2025 — Recent researches enabled LLMs to autonomously evaluate and improve their outputs, with Self-Refine Madaan et al. (2023) demonstrated how models can generate,

### key_frameworks_and_methods.1.reference_paper
**Confidence:** high

The finegrained field value corresponds to the paper titled "Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)". The most directly supportive excerpt explicitly describes SELF-REFINE as an iterative self-refinement algorithm that alternates between two generative steps—FEEDBACK and REFINE—which matches the idea of iterative, self-guided improvement in reasoning or outputs. The second directly summarizes Self-Refine as an approach to improve initial outputs from LLMs through iterative feedback and refinement, reinforcing the existence and core mechanism of the method. The third excerpt references Self-Refine as part of a survey of related reasoning capabilities, noting prior work by Madaan et al. and situating it within a broader discussion of code-enhanced reasoning, which provides contextual support and verification of the method’s significance and provenance. Together, these excerpts robustly support the existence, core mechanism (iteration with self-generated feedback and refinement), and scholarly context of the targeted field value.

- [arXiv:2303.17651v2 [cs.CL] 25 May 2023](https://arxiv.org/pdf/2303.17651)
  > by A Madaan · 2023 · Cited by 3994 — We present SELF-REFINE: an iterative self-refinement algorithm that alternates between two gener- ative steps–FEEDBACK and REFINE. These steps work in tandem to
- [SELF-REFINE: iterative refinement with self-feedback](https://dl.acm.org/doi/10.5555/3666122.3668141)
  > Dec 15, 2023 — We introduce Self-Refine, an approach for improving initial outputs from llms through iterative feedback and refinement.
- [A Survey on Code-Enhanced Reasoning and ...](https://arxiv.org/html/2502.19411v1)
  > Feb 26, 2025 — Recent researches enabled LLMs to autonomously evaluate and improve their outputs, with Self-Refine Madaan et al. (2023) demonstrated how models can generate,
