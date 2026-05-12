---
query: "Deep dive into two connected questions about encoding design judgment in AI: (1) The 'mismatch signal' — expert designers experience a pre-verbal sense that something is wrong before they can articulate why. Cognitively, what is this? Is it pattern recognition mismatch in long-term memory chunks, affective response, perceptual fluency violation, or something else? Has any computational model attempted to replicate this 'wrongness detection' separate from rule-checking? (2) Concrete LLM architectures for design reasoning — not design generation. What training approaches could teach an LLM to reason step-by-step about WHY a design decision is good or bad, rather than just generating designs? Include: constitutional AI applied to design principles, process supervision on design reasoning chains, RLHF with designer preference as reward, chain-of-thought prompting for design critique, and any published work on training models to produce design rationale rather than design output. What has been tested? What are the theoretical strongest approaches?"
processor: pro
run_id: trun_6b0c617b26214cd7ac377b137678fcac
created_at: 2026-05-03T07:09:06.224181Z
retrieved_at: 2026-05-03T07:18:32Z
---

# Research: Deep dive into two connected questions about encoding design judgment in AI: (1) The 'mismatch signal' — expert designers experience a pre-verbal sense that something is wrong before they can articulate why. Cognitively, what is this? Is it pattern recognition mismatch in long-term memory chunks, affective response, perceptual fluency violation, or something else? Has any computational model attempted to replicate this 'wrongness detection' separate from rule-checking? (2) Concrete LLM architectures for design reasoning — not design generation. What training approaches could teach an LLM to reason step-by-step about WHY a design decision is good or bad, rather than just generating designs? Include: constitutional AI applied to design principles, process supervision on design reasoning chains, RLHF with designer preference as reward, chain-of-thought prompting for design critique, and any published work on training models to produce design rationale rather than design output. What has been tested? What are the theoretical strongest approaches?

## Findings

### Executive Summary

The designer's pre-verbal 'mismatch signal' is a cognitive phenomenon best understood as a fast prediction-error signal emerging from an expert's deeply encoded pattern memory. This 'gut feeling' is an affective expression of a mismatch between a perceived design and the designer's learned prototypes (chunk-based recognition). It has measurable preconscious neural correlates, such as mismatch negativity (MMN) and error-related negativity (ERN), and is often triggered by a decrease in perceptual fluency. Computationally, this 'wrongness detection' is not without precedent; analogs include prediction-error models that quantify 'Bayesian surprise', aesthetic scoring models like NIMA that learn from human ratings, and process reward models (PRMs) that can flag flawed reasoning steps without explicit rules.

To train a Large Language Model (LLM) to reason about why a design is effective or flawed, the most robust theoretical architecture involves a multi-faceted approach. This includes: (1) establishing a 'Design Constitution' of codified principles for training and self-critique (Constitutional AI); (2) employing process supervision with a Process Reward Model (PRM) trained on labeled, step-by-step design critiques; (3) fine-tuning the model based on expert designer preferences using methods like RLHF, DPO, or RRHF; (4) using rationale-first supervised fine-tuning with chain-of-thought and iterative self-reflection (Self-Refine) to improve reasoning quality; and (5) incorporating multimodal signals of visual 'surprise' and aesthetic fluency as auxiliary inputs. While most of these components have been empirically validated in other domains like safety alignment, mathematics, and code generation, their end-to-end application to generate high-quality design rationale remains a significant and promising future research direction.

### Mismatch Signal Cognitive Deep Dive

The pre-verbal 'mismatch signal' that expert designers experience is not a single phenomenon but a convergence of several cognitive and affective processes. It is best understood as a fast, intuitive judgment arising from a deeply learned model of the world, where a deviation from expectation triggers a cascade of neural and emotional signals before conscious articulation is possible. The core components are:

1.  **Predictive Processing and Prediction Error:** The brain is fundamentally a prediction engine that constantly generates models of the world and predicts incoming sensory information. Expertise in design involves building a dense and accurate set of prior expectations ('priors') about visual hierarchy, layout, interaction patterns, and affordances. When a design element violates these learned patterns, a 'prediction error' or 'surprise' signal is generated. For experts, these signals are sharper and occur earlier, manifesting as a feeling of 'wrongness'.

2.  **Expert Pattern Memory and Recognition:** This is grounded in theories like 'chunking' (Chase & Simon) and the Recognition-Primed Decision (RPD) model (Gary Klein). Experts don't see individual elements; they perceive large, meaningful 'chunks' or patterns stored in long-term memory. The mismatch signal is triggered when a stimulus fails to match a recognized prototype. The RPD model explains how this recognition is not a slow, analytical comparison but a rapid, holistic match that immediately suggests expectations and actions. The feeling of 'wrongness' is the detection that the current situation is atypical or violates the primed expectations.

3.  **Preconscious Neural Correlates:** Neuroscience provides measurable evidence for this pre-attentive error detection. Mismatch Negativity (MMN) is a brain response that occurs when a stimulus violates an established sensory rule, even without focused attention. Error-Related Negativity (ERN) is a signal generated by the anterior cingulate cortex within milliseconds of making a mistake, often before the person is consciously aware of the error. These neural signals are the likely physiological basis for the 'gut feeling' of a mismatch.

4.  **Perceptual Fluency and Affect:** Aesthetic pleasure is linked to the ease or 'fluency' with which an object is processed. Designs that are complex, incongruent, noisy, or violate established conventions reduce processing fluency. This difficulty in processing is experienced as negative affect—a subtle feeling of 'offness' or displeasure, which contributes to the judgment that something is wrong.

5.  **Affective and Embodied Signals:** The 'affect heuristic' and the 'somatic marker hypothesis' propose that emotional responses ('gut feelings') are critical for rapid, intuitive judgment. For an expert designer, years of experience create emotional valuations attached to certain patterns; successes feel good, and failures feel bad. The mismatch signal is, in part, the retrieval of these stored negative affective tags, serving as an embodied, somatic warning that the current pattern is associated with past failures.

**Computational Analogs for 'Wrongness Detection':**
Computational models have moved beyond simple rule-checking to replicate this form of judgment:
-   **Prediction-Error/Surprisal Models:** Bayesian surprise models can identify which parts of an image are most likely to draw human attention by flagging elements whose statistics deviate from learned expectations. This serves as a domain-agnostic 'wrongness' or 'novelty' detector.
-   **Learned Aesthetic/UX Scorers:** Models like NIMA (Neural Image Assessment) are trained on large datasets of human ratings (e.g., the AVA dataset) to predict the distribution of aesthetic scores for an image. They learn a sense of 'good' or 'bad' directly from human perception without being given explicit rules, generalizing this concept to design artifacts.
-   **Process Reward Models (PRMs):** Instead of just evaluating a final design, PRMs are trained to score the intermediate steps of a reasoning process. They can learn to flag a faulty step in a design critique (e.g., 'broken hierarchy') based on annotated examples, thus detecting 'wrongness' in the rationale itself.
-   **Multimodal UI Evaluators:** MLLMs like Ferret-UI are being developed to understand, ground, and reason about UI screenshots. Benchmarking these 'LLM-as-a-judge' models shows the feasibility of creating learned evaluators that can identify issues in a UI beyond static, hard-coded rules.

### Neuroscientific Correlates Of Mismatch

| Concept Name | Description | Neural Signal Type | Trigger Condition | Relevance To Design Mismatch |
| --- | --- | --- | --- | --- |
| Mismatch Negativity (MMN) | The Mismatch Negativity (MMN) is an electrophysiological brain response that indexes the pre-attentive detection of a deviation from an established regularity in a sequence of sensory stimuli. It reflects the brain's automatic process of detecting a violation of a learned rule or pattern. | Event-Related Potential (ERP) component | A deviation or violation of a rule established by a sequence of sensory stimuli (e.g., a different tone in a series of identical tones, or a misaligned element in a consistent grid). | MMN provides a direct neural basis for the pre-verbal 'mismatch signal'. An expert designer's brain has learned the 'rules' of good design (e.g., alignment, consistent spacing, color harmony). When a design element violates these implicit rules, the brain can generate an MMN response automatically and pre-attentively, creating the feeling that something is 'off' before the specific problem is consciously identified. |
| Error-Related Negativity (ERN) | The Error-Related Negativity (ERN) is an electrophysiological index of cortical error processing that arises approximately 50-100 milliseconds after a person makes an error. Source localization studies indicate it is generated by the anterior cingulate cortex (ACC) and it often precedes conscious awareness of the error, which is associated with a later component (Pe). | Event-Related Potential (ERP) component | The commission of an incorrect action or the observation of an outcome that mismatches expectation. | The ERN is a candidate for the immediate 'gut feeling' of wrongness. As a designer scans a layout, their brain is implicitly making judgments. When it encounters an element that it classifies as an 'error' (e.g., poor contrast, broken grid), the ERN could be the initial, rapid neural signal that an error has been detected, firing before the designer has had time to consciously analyze and articulate the specific flaw. |

### Pattern Recognition Theories

| Theory Name | Key Proponents | Core Concept | Application To Expertise |
| --- | --- | --- | --- |
| Chunking Theory | William Chase & Herbert Simon | Expertise is developed by organizing information into large, meaningful patterns or 'chunks' in long-term memory. Instead of processing numerous individual pieces of information, an expert perceives and manipulates a few high-level chunks. | An expert designer doesn't see a UI as a collection of buttons, text, and lines. They see it as chunks like 'header navigation,' 'product card,' or 'checkout form.' Their expertise allows for rapid perception and comprehension of complex layouts. The 'mismatch signal' arises when an element is inconsistent with the established structure of a chunk (e.g., a button inside a product card chunk has the wrong style), violating the pattern and signaling an error. |
| Recognition-Primed Decision (RPD) Model | Gary Klein | A model of rapid, intuitive decision-making where experts use their experience to recognize a situation as familiar or prototypical. This recognition primes a set of expectancies, relevant cues, plausible goals, and a typical course of action. The decision-maker then evaluates this course of action via mental simulation, rather than by comparing multiple options. | The RPD model explains how an expert designer can make a quick judgment about a design without a lengthy analytical process. They recognize the design problem and the proposed solution as a familiar pattern. This recognition primes expectations for how the design should work and feel. The pre-verbal 'mismatch signal' is the immediate sense that the current design violates these primed expectancies, indicating the situation is not as typical as it first appeared and the default course of action is flawed. |

### Affective And Perceptual Theories

| Theory Name | Key Proponents | Central Idea | Link To Mismatch Signal |
| --- | --- | --- | --- |
| Somatic Marker Hypothesis | Antonio Damasio | Emotion-based biasing signals, which are derived from bodily (somatic) states, are integrated into the decision-making process to guide judgments, particularly in situations of complexity and uncertainty. | For an expert designer, past experiences with successful and unsuccessful designs create accumulated emotional valuations that become attached to specific patterns. When a new design violates a successful pattern, it triggers a negative somatic marker, which manifests as a pre-verbal, intuitive 'gut feeling' that something is wrong, long before the specific flaw can be consciously articulated. |
| Affect Heuristic | Paul Slovic | This theory posits that people often make judgments and decisions by consulting their emotional responses ('affect') to a stimulus. Positive or negative feelings serve as a simple and efficient shortcut, substituting a complex evaluation with a quick emotional assessment. | When an expert designer encounters a design element that is incongruent with their deeply learned patterns of good design, it can trigger an immediate negative affective response. This feeling acts as a rapid, intuitive signal of 'wrongness,' biasing the designer's judgment toward a negative assessment before a detailed, analytical critique has been formed. |
| Perceptual/Processing Fluency Violation | Reber, Schwarz, & Winkielman | The ease (fluency) with which a person can process a stimulus is inherently linked to aesthetic pleasure. High fluency is experienced as positive, leading to judgments of beauty and correctness, while low fluency (disfluency) is experienced as negative and effortful. | A design that is visually complex, noisy, incongruent, or violates established principles of hierarchy and grouping reduces processing fluency. This disfluency is felt as a subtle 'offness' or negative affect, serving as a pre-attentive mismatch signal that something is aesthetically or structurally wrong with the design. |
| Mismatch Negativity (MMN) and Error-Related Negativity (ERN) | Neuroscience research community | MMN is a pre-attentive brain response to a violation of an expected regularity in sensory input. ERN is a neural signal generated by the anterior cingulate cortex (ACC) within 50-100ms of an error, often preceding conscious awareness. | These are direct, measurable neural correlates of the 'mismatch signal.' They represent the brain's preconscious detection of a deviation from a learned pattern (MMN) or the recognition of an error (ERN). This neural activity is the physiological basis for the feeling of 'wrongness' that surfaces into a designer's awareness. |

### Foundational Design Theories On Intuition

| Theorist Name | Key Concept | Description | Seminal Work |
| --- | --- | --- | --- |
| Donald Schön | Knowing-in-action and Reflection-in-action | Schön's work describes how professionals think in practice. 'Knowing-in-action' refers to the tacit, intuitive knowledge that is expressed through our actions and performance without conscious thought. The 'mismatch signal' triggers 'reflection-in-action,' a process where the practitioner pauses to consciously consider the surprising event, question their underlying knowledge, and experiment with a new course of action. This framework perfectly captures the designer's experience of feeling something is wrong and then investigating why. | The Reflective Practitioner: How Professionals Think In Action (1984) |
| Nigel Cross | Designerly Ways of Knowing | Cross argues that design is a distinct discipline with its own unique forms of knowledge, skills, and cognitive processes. This 'designerly knowledge' is often tacit, non-verbal, and demonstrated through action (like sketching). It encompasses the intuitive ability to synthesize information, solve ill-defined problems, and make qualitative judgments, which includes the pre-verbal sense of whether a design 'works' or not. | Designerly Ways of Knowing |
| Gary Klein | Recognition-Primed Decision (RPD) Model | The RPD model explains how experts make rapid, effective decisions by recognizing a situation as typical based on their vast experience, which immediately suggests a viable course of action without comparing multiple options. In the context of design, the 'mismatch signal' can be understood as a failure of this recognition process. When a design almost fits a familiar, successful pattern but contains a subtle violation, it triggers a sense of 'not fitting,' signaling that the default response is inappropriate and that more careful analysis is required. | A Recognition-Primed Decision (RPD) Model of Rapid Decision Making |

### Computational Models For Wrongness Detection

| Model Name | Purpose | Key Proponents | Mechanism |
| --- | --- | --- | --- |
| NIMA (Neural Image Assessment) | To predict the distribution of human opinion scores for images, effectively learning to assess aesthetic and technical quality without hand-coded rules. | Google Research | A deep convolutional neural network (CNN) trained on the large-scale AVA dataset, which contains images rated by thousands of people. Instead of predicting a single score, NIMA predicts the full distribution of scores, allowing it to capture a nuanced, human-like sense of what 'looks good' or 'looks bad'. |
| Bayesian Surprise | To quantify how 'surprising' a piece of data is, given a model's prior beliefs. It serves as a domain-agnostic detector for novelty or deviation from expectation, which strongly correlates with human attention. | Itti & Baldi | A Bayesian framework that measures the Kullback-Leibler divergence between a model's prior and posterior probability distributions after observing new data. A large shift in beliefs indicates high surprise. In a design context, it can flag visual elements or layouts whose statistics deviate significantly from a learned norm, acting as a computational analog for the 'mismatch signal'. |
| Process Reward Models (PRMs) | To score the intermediate steps in a chain of reasoning, enabling the training of models that can identify faulty logic or incorrect steps in a process, rather than just evaluating the final outcome. | AI research community (e.g., OpenAI, Google DeepMind) | A model trained on human-annotated reasoning chains (e.g., for math or code problems). It learns to assign a reward to each step based on its correctness and logical soundness. This allows it to detect 'wrongness' within a reasoning process, such as a flawed step in a design critique, without relying on a static checklist. |
| Ferret-UI | To achieve an enhanced understanding of mobile user interface (UI) screens, enabling referring, grounding, and reasoning about UI elements and layouts. | Apple | A Multimodal Large Language Model (MLLM) specifically fine-tuned for understanding mobile UIs. By processing screenshots, it can reason about the relationships between elements, identify components, and perform evaluation tasks, demonstrating a learned capability to judge UI correctness and quality beyond static rules. |

### Llm Architectures For Design Reasoning Overview

The primary goal is to train a Large Language Model (LLM) or a Multimodal Large Language Model (MLLM) that can produce explicit, step-by-step rationale when judging design decisions. This moves beyond the common application of AI for design generation. The focus is on creating a system that can reason about why a design is effective or flawed, grounding its judgments in established design principles and the potential impact on the user experience, rather than simply producing new design artifacts.

### Training Approaches For Llm Reasoning

| Approach Name | Abbreviation | Core Principle | Key Paper Or Proponent | Suitability For Design Critique |
| --- | --- | --- | --- | --- |
| Constitutional AI adapted to design principles | CAI | This method involves creating a 'Design Constitution' from established principles (e.g., Gestalt, WCAG, usability heuristics). The model is then prompted to critique designs based on this constitution, self-revise its critiques for better alignment, and is then fine-tuned on these improved outputs. It leverages AI-driven self-critique to instill a set of core principles. | Constitutional AI (Anthropic), as described in arXiv:2212.08073 | This approach is highly suitable as it provides a structured and scalable way to encode expert design knowledge. By creating a constitution from well-documented design principles, the model can learn to generate critiques that are not only accurate but also auditable and grounded in established theory. It effectively transfers the paradigm of AI safety alignment to the domain of design judgment. |
| Process supervision on design reasoning chains | PRM | Instead of rewarding only the final outcome of a critique, this method rewards each intermediate step in the reasoning process. A Process Reward Model (PRM) is trained on datasets of critiques broken down into labeled steps to score the correctness and sufficiency of each part of the reasoning chain. | Validated in math/code domains (arXiv:2305.20050), with advancements like GenPRM (arXiv:2504.00891) and surveyed in arXiv:2510.08049v3. | This is a methodologically straightforward and powerful approach for design critique. It requires curating a dataset where critiques are decomposed (e.g., identify issue -> link to principle -> evidence -> user impact). The resulting PRM can then be used to train more reliable critic models via reinforcement learning or to steer and rerank critique paths at inference time, ensuring a more robust and logical reasoning process. |
| Preference optimization from designer rankings | RLHF/DPO/RRHF | This family of techniques aligns the LLM to what human experts consider high-quality reasoning. It involves collecting pairwise rankings of different critiques from expert designers and using this preference data to optimize the model's policy. Methods include RLHF (learning a reward model), DPO (directly optimizing the policy), and RRHF (rank-based finetuning). | DPO (arXiv:2305.18290), RRHF (arXiv:2304.05302) | This is crucial for capturing the nuances of expert design judgment that go beyond simple correctness. It allows the model to learn what constitutes a 'good' argument, how to weigh trade-offs, and how to communicate a critique effectively. This helps mitigate common LLM failure modes like generating verbose but unhelpful or spurious arguments, aligning the model's output with true expert quality. |
| Rationale-first supervised finetuning and Chain-of-Thought | CoT/Self-Refine | This approach involves supervised fine-tuning (SFT) on examples where the rationale explicitly precedes the final verdict. It is often combined with Chain-of-Thought (CoT) prompting to encourage step-by-step reasoning. The Self-Refine technique adds an iterative loop where the model critiques and improves its own output, leading to higher-quality reasoning. | Self-Refine (arXiv:2303.17651), with faithfulness improvements from selective rationalization techniques (aclanthology.org/2023.emnlp-main.700.pdf). | This is highly effective for improving the quality and faithfulness of design critiques. By forcing the model to 'show its work' before reaching a conclusion and then iteratively refining that work, it produces more robust and transparent reasoning. This helps prevent post-hoc confabulation, where a model makes up a plausible-sounding reason after the fact, ensuring the provided rationale is integral to the conclusion. |
| Multimodal perception and auxiliary signals for 'mismatch' detection | Multimodal Auxiliary Signals | This involves integrating visual encoders into the model that are trained with auxiliary objectives. These objectives can include predicting aesthetic fluency (similar to NIMA), detecting statistical novelty in layouts (Bayesian surprise), or estimating accessibility metrics like color contrast. These perceptual signals then act as inputs or triggers for the higher-level reasoning module. | Inspired by NIMA/AVA for aesthetics (arXiv:1709.05424, research.google/blog/introducing-nima-neural-image-assessment/) and Bayesian surprise for attention (sciencedirect.com/science/article/pii/S0042698908004380). | This approach grounds the abstract reasoning of the LLM in the concrete visual reality of the design. It provides a computational analog to the expert designer's intuitive 'mismatch signal' by flagging areas of visual 'wrongness' or 'surprise'. The LLM must then take these low-level perceptual cues and justify them with high-level, principle-grounded reasoning, creating a more holistic and powerful critique. |
| Inference-time orchestration | Inference Orchestration | This is not a training method but a set of techniques applied during inference to improve output quality. It includes: retrieval-augmented critique (retrieving similar design cases to ground judgments), multi-agent debate (having two models argue for and against a decision), and test-time scaling with a PRM (sampling multiple critique chains and reranking them to select the best one). | Leverages concepts from GenPRM and test-time scaling (arXiv:2504.00891, arXiv:2510.08049v3). | These techniques significantly enhance the final critique's quality and reliability. Retrieval grounds the critique in real-world precedents, debate helps explore trade-offs and counterarguments, and PRM-based reranking ensures that the most logically sound and well-supported reasoning path is chosen from multiple possibilities. This adds a layer of robustness and depth to the generated critique. |

### Rationalization And Explanation Models

| Item Name | Item Type | Originators | Purpose |
| --- | --- | --- | --- |
| Rationale-first supervised finetuning | Training Technique | AI researchers in language model training | To train a model to produce explicit rationales and citations to principles before delivering a verdict. This is achieved by forcing rationales to appear before the final label in training examples, encouraging the model to reason first and answer second. |
| Interventional/Selective Rationalization | Framework/Technique | AI researchers (as cited in a 2023 EMNLP paper) | To ensure the generated rationale is faithful to the model's prediction process. It works by selecting a subsequence of the input (the 'rationale') and verifying that its removal reduces the model's performance, thereby discouraging the model from generating plausible but disconnected post-hoc explanations. |

### Assessment Of Training Approaches

An analysis of the current landscape reveals that while a complete end-to-end system for design rationale has not been comprehensively published, many of its core components are empirically validated in other domains. Methods that have been tested include: Constitutional AI (CAI) for self-critique in safety contexts; Process Supervision (PRMs) for improving reasoning in math and code; preference-based alignment algorithms like RLHF, DPO, and RRHF, which are widely used for model alignment; Chain-of-Thought (CoT) prompting and Self-Refine for enhancing reasoning quality across various tasks; and aesthetic quality modeling (NIMA) for learning a 'taste' signal from human ratings. Furthermore, early work on using MLLMs as UI/UX judges shows the feasibility of learned evaluators.

The strongest theoretical approach, though not yet fully realized in a single published system for design, would be a hybrid architecture combining these validated components. This end-to-end recipe would likely involve: (1) A 'Design Constitution' for principled self-critique (CAI). (2) A Process Reward Model (PRM) trained on critique steps. (3) Preference optimization (DPO/RRHF) using expert designer rankings. (4) Rationale-first supervised fine-tuning (SFT) combined with iterative Self-Refine. (5) Multimodal heads for detecting visual 'surprisal' and aesthetic fluency drops. This would be orchestrated at inference time with retrieval-augmented generation and test-time reranking. Such an architecture is theorized to produce critics that can not only explain design violations but also weigh complex trade-offs, converging toward expert-like tacit judgment while remaining auditable and transparent.

### Existing Applications And Benchmarks

| Name | Type | Description | Relevance To Design Ai |
| --- | --- | --- | --- |
| Ferret-UI | Multimodal LLM (MLLM) | A Multimodal Large Language Model specifically created for a deep understanding of mobile user interface screens. It is equipped with advanced capabilities for referring to, grounding, and reasoning about elements on the screen. | Ferret-UI is a direct application of MLLMs to the UI domain, proving the feasibility of creating models that can perceive and reason about screen layouts. This is a foundational capability for an AI that needs to critique design decisions based on visual evidence from a screenshot. |
| AVA (Aesthetic Visual Analysis) Dataset | Dataset | A large-scale dataset comprising approximately 255,000 images. Each image has been rated for its aesthetic qualities by a large number of amateur photographers, with an average of 200 ratings per photo. | This dataset provides the raw data needed to train models to understand human aesthetic preferences. While its focus is on photography, the methodology of learning from large-scale human ratings is directly transferable to training an AI to judge the aesthetic quality of UI/UX designs. |
| NIMA (Neural Image Assessment) | Model | A neural network designed to predict the distribution of human opinion scores for images, effectively learning to assess aesthetic quality based on the patterns in the AVA dataset. | NIMA serves as a computational analog for learned 'taste' or the 'mismatch signal' designers experience. It shows that a model can learn a sense of what 'looks good' without being given explicit rules. This capability can be integrated as an 'aesthetic fluency' signal in a more comprehensive design critique AI. |
| LLM-as-a-Judge | Evaluation Paradigm | A paradigm where Large Language Models are used to evaluate the quality of various outputs, including user interfaces. This involves systematically comparing the evaluations generated by an LLM with those from human experts to gauge the LLM's reliability and alignment with human judgment. | This paradigm is essential for validating an AI design critic. It provides a method to benchmark and measure the performance of a model's reasoning capabilities against human expert evaluators, confirming the feasibility of using LLMs for reliable UI critique. |
| Constitutional AI (for Design) | Training Framework | An adaptation of the Constitutional AI method where a model learns to self-critique and refine its reasoning based on a predefined 'Design Constitution'. This constitution is a codified set of established design principles, such as Gestalt laws, accessibility standards (WCAG), and usability heuristics. | This framework provides a principled and auditable way to train a design critic. Instead of relying solely on opaque preferences, it grounds the AI's reasoning in established design theory, making its critiques more transparent, consistent, and trustworthy. |
| Process Reward Models (PRMs) | Training/Evaluation Method | A supervision technique where a reward model is trained to score the intermediate steps of a reasoning process, rather than just the final outcome. This allows for more granular feedback. Advanced versions like GenPRM can perform explicit Chain-of-Thought reasoning and verification before scoring. | PRMs are critical for teaching an AI *how* to think like a designer. By rewarding each correct step in a critique (e.g., identifying an issue, linking it to a principle, explaining user impact), it trains the model to produce a well-structured, logical rationale, which is superior to simply rewarding a correct final verdict. |
| Preference Optimization (RLHF/DPO/RRHF) | Training/Alignment Technique | A family of algorithms including Reinforcement Learning from Human Feedback (RLHF), Direct Preference Optimization (DPO), and Rank-based Response Finetuning (RRHF). These methods align a language model with human preferences by training it on pairwise rankings of different outputs provided by expert reviewers. | This technique aligns the AI critic's output with the nuanced judgments of expert designers. It helps capture the subtle aspects of a high-quality critique that may not be fully codified in a design constitution, ensuring the AI's reasoning is not just technically correct but also valuable and insightful to a professional audience. |
| Self-Refine | Training/Inference Technique | An approach that enables a Large Language Model to improve its own initial outputs through an iterative process of generating feedback and refining its work. The model essentially performs self-critique to enhance the quality of its final output. | This mimics the reflective practice of human designers. For design critique, an AI can use Self-Refine to generate an initial analysis, check it against its 'Design Constitution', identify weaknesses or trade-offs in its own reasoning, and then refine the critique to be more thorough and robust. |

### Synthesis Bridging Cognition And Ai

The cognitive 'mismatch signal' in designers can be effectively bridged with computational models by mapping its distinct layers to specific LLM training architectures. The foundational cognitive theory of predictive processing, where the brain flags deviations from expected sensory input as 'prediction errors', finds a direct computational analog in models that calculate Bayesian surprise to highlight statistically unusual visual elements. This same principle extends to Process Reward Models (PRMs), which learn to detect 'errors' in a chain of reasoning, flagging when a critique step deviates from a correct or logical path.

The expert's vast, chunk-based pattern memory, which allows for rapid recognition of archetypes and their violations, is computationally paralleled by the knowledge encoded within an LLM's parameters. This knowledge can be explicitly structured and focused through a 'Design Constitution,' which serves as a set of codified principles, much like an expert's internalized rulebook. The pre-verbal, affective component of the mismatch signal—the 'gut feeling' driven by somatic markers and perceptual fluency—can be modeled using auxiliary scoring heads. For example, a NIMA-style model trained on aesthetic ratings can provide a fast, holistic score for 'visual appeal' or 'fluency,' computationally replicating the immediate affective response without requiring step-by-step analysis.

Finally, the transition from a tacit 'knowing-in-action' to an articulated critique is mirrored by combining several LLM techniques. Chain-of-Thought (CoT) prompting forces the model to externalize its reasoning process, similar to how a designer talks through a problem. The Self-Refine mechanism allows the model to iteratively critique and improve its own rationale, emulating the 'reflection-in-action' process described by Schön. Aligning this entire process with expert preferences via RLHF or DPO ensures that the model's final judgment, while auditable and principle-based, also converges on the nuanced, tacit quality that human experts value. In essence, the proposed AI architecture is a computational scaffold that emulates the designer's journey from a pre-conscious 'something is wrong' signal to a fully-formed, defensible design critique.

### Future Outlook And Challenges

The primary challenge in encoding expert design judgment into AI lies in moving from theoretical architectures to robust, practical implementation. A significant hurdle is data curation; training effective Process Reward Models (PRMs) requires large, high-quality datasets of design critiques broken down into granular, labeled reasoning steps, which are currently not widely available. Another critical challenge is mitigating inherent biases. Models trained on existing design corpora risk overgeneralizing specific aesthetic styles (e.g., minimalist tech UI) and must be explicitly taught to reason about context, including brand identity, audience needs, and platform constraints. Furthermore, the risk of 'rationale confabulation'—where the LLM generates plausible but post-hoc justifications for its decisions—is substantial. Ensuring the generated rationale is faithful to the model's actual 'reasoning' process is a core problem in explainable AI that must be addressed.

Promising future research directions focus on tackling these challenges head-on. The most immediate goal is the end-to-end implementation and testing of the proposed hybrid architecture, combining a Design Constitution, PRMs, preference optimization, and self-refinement. Success will depend on the development of a comprehensive 'Design Critique Reasoning Benchmark' with gold-standard rationales, counterfactuals, and adversarial examples to rigorously measure performance. Future work should also refine the integration of multimodal signals, making detectors for visual surprisal, aesthetic fluency, and accessibility metrics more sophisticated and seamlessly integrated into the reasoning loop. Finally, a crucial research avenue involves human-computer interaction studies. Research must move beyond static benchmarks to investigate how these AI critics can augment human designers in real-world workflows, measuring their impact on metrics like a junior designer's learning curve or an expert's 'time-to-insight'. This will help ensure that the technology evolves not just to be 'correct' but genuinely useful, avoiding the pitfall of optimizing for superficial qualities like aesthetic fluency at the expense of deep usability and user impact.


## Research Basis

### neuroscientific_correlates_of_mismatch
**Confidence:** high

The finegrained field value centers on neuroscientific correlates of the detected “mismatch” signal, specifically the pre-attentive Mismatch Negativity (MMN) and related early error signals like Error-Related Negativity (ERN). The most relevant excerpts directly define MMN as a neural response to violations of a learned rule or pattern, arising automatically when a sequence of sensory stimuli is disrupted, which aligns with the concept of a pre-verbal mismatch signal in design perception. Additional excerpts characterize MMN as a neural prediction-error signal, reinforcing its interpretation as a pre-conscious detection of deviation from established regularities, which supports the idea that an expert designer may sense something is off before articulating why. Further, a visual-variant MMN excerpt extends this by showing MMN-like responses in other sensory domains, underscoring the generality of the mismatch mechanism across modalities. To address the broader concept of a rapid, gut-level signal of error, excerpts describing ERN provide evidence for an even earlier neural index of error processing (occurring within tens of milliseconds after an error), generated in the ACC and preceding conscious awareness, which maps well onto the notion of an immediate intuitively felt wrongness in design critique. Taken together, these sources build a coherent link from automatic mismatch signals (MMN) to ultra-fast error signals (ERN) as neurophysiological substrates for the kind of pre-verbal mismatch and rapid gut-feeling of wrongness described in the field value. The strongest single connection is the explicit definition of MMN as a brain response to rule violations, which directly supports the idea of a pre-attentive mismatch signal. The ERN-related materials extend the chain to even faster, automatic error signals that occur before conscious articulation, strengthening the interpretation that such signals underlie initial design judgments about “wrongness.”

- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect

### mismatch_signal_cognitive_deep_dive
**Confidence:** high

The finegrained field value describes a multifaceted “mismatch signal” that arises quickly and intuitively in expert designers, rooted in predictive processing, pattern recognition in long-term memory (chunking), preconscious neural signals, affective responses, and embodied signals. The most relevant excerpts directly capture the core ideas that underlie this conception: a brain signal for violations of learned rules or expectations (mismatch negativity), and the idea that prediction error in predictive processing drives rapid, pre-conscious judgments of wrongness. These sources explicitly define mismatch-related neural responses as detection of deviations from learned priors and rules, which aligns with the description of a fast, intuitive judgment before conscious articulation. They also establish that such signals can be modulated by processing fluency and affect, which ties into the experiential “gut feeling” or somatic warnings described. Expounding on the computational side, the excerpts discuss predictive-surprisal models and learned evaluators (e.g., NIMA, process reward models) as concrete analogs for how a system might replicate or quantify the wrongness signal in design reasoning. This provides a direct empirical and theoretical scaffolding for understanding the convergence of cognitive, neural, and affective processes that underlie the mismatch signal as described. The remaining excerpts contribute supportive context: some describe broader predictive processing frameworks, while others outline related affective-cognitive constructs (somatic markers, affect heuristic) and design-relevant supervision approaches that could implement or learn from these signals, though they are a step removed from the core mismatch signal mechanism. Overall, the strongest support comes from explicit discussions of mismatch-related neural signals (MMN, ERN) and predictive processing, followed by entries that connect processing fluency and affect to perception of wrongness, and then computational analogs and design-reasoning training approaches that operationalize these ideas in AI systems.

- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf)
  > by R Reber · 2004 · Cited by 4518 — We propose that aesthetic pleasure is a function of the perceiver's processing dynam- ics: The more fluently perceivers can process an object, the more
- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1295305)
  > by R Reber · 2004 · Cited by 4522 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)

### computational_models_for_wrongness_detection
**Confidence:** medium

- The concept of Process Reward Models (PRMs) is directly described as scoring intermediate steps in reasoning to detect faulty logic or incorrect steps within a process, which aligns with the idea of a computational mechanism to detect ‘wrongness’ in design critique or reasoning chains. This supports the notion of a dedicated computational model for wrongness detection within design reasoning workflows. - References to process supervision and PRMs emphasize evaluating and guiding step-by-step reasoning rather than only judging the final output, which matches the interest in training models to reason about why a design decision is good or bad. - Discussions of neural models that assess aesthetics or quality (NIMA) provide a direct analogue to evaluating design outputs (aesthetic/quality judgments) rather than simply generating outputs, aligning with the NIMA component of the field value. - Bayesian surprise discussions provide a framework for detecting deviations from expectations, which is a computational mechanism that can flag elements of a design that violate learned norms or prior beliefs, aligning with a “wrongness” signal in a broader sense. - Ferret-UI is explicitly about a multimodal model trained to understand UI screens, ground elements, and reason about UI layouts, which corresponds to evaluating design correctness and quality in a UI-design context, thus supporting the Ferret-UI portion of the field value. - The other excerpts mentioning constitutional AI or RLHF provide context on safety-aligned and preference-guided evaluation methods, which underpin approaches to evaluating whether a design rationale is good or bad, further supporting the broader theme of design reasoning evaluation. 

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Bayesian surprise attracts human attention](https://www.sciencedirect.com/science/article/pii/S0042698908004380)
  > by L Itti · 2009 · Cited by 1589 — Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average.
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [Small LLMs Can Master Math Reasoning with Self-Evolved ...](https://arxiv.org/html/2501.04519v1)
  > Jan 8, 2025 — As for the reward model, process reward modeling (PRM) shows a great potential by providing fine-grained feedback on intermediate steps (Lightman et al., 2023)
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.

### pattern_recognition_theories
**Confidence:** high

The most directly relevant excerpt defines chunking as a cognitive unit: a chunk is a meaningful pattern recognized as a unit, enabling experts to perceive and manipulate high-level patterns rather than many individual pieces. This directly supports the notion that design expertise emerges from organizing information into large patterns, which underpins how a mismatch could be detected when input does not fit an established chunk. The next most relevant excerpt explains mismatch negativity as a neural signal of prediction error caused by deviations from expected patterns, providing a concrete mechanism for a pre-verbal “wrongness” signal aligned with the idea that a chunk-structure violation triggers an early alert. Following that, an excerpt on mismatch negativity as a prediction-error signal in perception reinforces that expectations (patterns/chunks) guide perception and that deviations elicit error signals. A discussion of predictive processing and prediction error further connects the idea of champions of pattern-based expectations to neural and cognitive mechanisms that could underlie the pre-verbal mismatch signal in design reasoning. An additional excerpt on designerly knowledge and tacit pattern-based recognition adds supportive context about how experts rely on established patterns, which complements the chunking and mismatch signal narrative. Collectively, these excerpts triangulate the core claim that expertise rests on pattern-based chunking and that violations of these chunks generate an early, pre-verbal mismatch signal, with broader theoretical grounding in predictive processing and error signaling.

- [Chunking](https://www.chessprogramming.org/Chunking)
  > Oct 1, 2007 — A chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent

### existing_applications_and_benchmarks
**Confidence:** medium

The most directly relevant excerpts provide explicit reference to concrete components of the field value. For example, one excerpt discusses Ferret-UI as a new UI-focused, multimodal model designed for understanding mobile screens and reasoning about elements on the screen, which directly maps to the item describing Ferret-UI as a Multimodal LLM with screen perception and reasoning capabilities for design critique. Another pair of excerpts describe NIMA and the AVA dataset, illustrating how large-scale human judgments of aesthetics can train models to assess visual quality, which aligns with the item describing NIMA and the AVA-derived aesthetic assessment capability. Additional excerpts address the Constitutional AI framework and its application to design principles, grounding the idea of a principled, auditable critique system in design theory, which corresponds to the constitutional AI for design item. Several excerpts discuss Process Reward Models (PRMs) and related methods (GenPRM, chain-of-thought verification, step-wise supervision), which directly support the field value’s emphasis on training-time and evaluation-time feedback on intermediate reasoning steps for design critique. Further excerpts elaborate on sustained lines of work around process supervision, RLHF variants (RLHF, DPO, RRHF), and ranking-based alignment, all of which are relevant to teaching an LLM to reason about design critiques rather than merely generating outputs. Additional excerpts cover Self-Refine and iterative self-feedback mechanisms as a way to improve design critiques, mirroring professional reflective practice in design. Lastly, there are excerpts describing higher-level UI/UX design research with LLMs and evaluation paradigms (e.g., LLM-as-a-Judge) that provide contextual support for using LLMs to critique and evaluate UI design, which reinforces the applicability of the listed items as benchmarks or components of a design critique AI system.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and

### rationalization_and_explanation_models
**Confidence:** medium

Directly relevant content includes a paper explicitly titled Interventional Rationalization, which aligns with the second item about selecting a rationale subsequence and verifying its influence on the final decision. Additional excerpts discuss chain-of-thought reasoning approaches and process-supervised or rationale-oriented training paradigms. For instance, one excerpt describes a generative process reward model that performs explicit Chain-of-Thought reasoning with code verification before producing output, which maps to the idea of making reasoning steps a verifiable, integral part of the model’s process. Another excerpt covers process supervision that judges each intermediate step for correctness, which supports the broader notion of training to value explicit reasoning and stepwise justification. A third excerpt discusses improving mathematical reasoning with process supervision, reinforcing the concept of rewarding or supervising the reasoning process rather than only the final answer. There is also mention of verifying step-by-step reasoning (Let’s Verify Step by Step), which resonates with the idea of making stepwise rationales faithful and testable. Finally, a self-refinement approach (Self-Refine) illustrates iterative improvement of outputs, which can complement rationale-first strategies by refining the produced rationales and justifications. Taken together, these excerpts collectively support the two components: (a) explicit rationale generation as a trained behavior, and (b) interventional/selective rationalization to ensure faithfulness and causal relevance of the rationale to the model’s decision.

- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the

### future_outlook_and_challenges
**Confidence:** medium

The finegrained field value describes a forward-looking research agenda: the need for end-to-end architectures that combine a Design Constitution, Process Reward Models (PRMs), preference optimization, and self-refinement; the data bottleneck for training effective PRMs with granular, labeled design critiques; biases in design corpora and the necessity to teach models to reason about context (brand identity, audience, platform constraints); and the problem of rationale confabulation where generated justifications do not reflect actual reasoning. Excerpts that discuss explicit process-based supervision and PRMs provide concrete mechanisms and evidence about what has been tested and what remains challenging, including how process supervision can yield more reliable reasoning steps and how reward models can be trained on intermediate reasoning rather than only end outputs. Constitutional AI discussions illuminate strategies for aligning design critique behavior with safety and usability goals, which is essential for trustworthy design reasoning. Papers on design-oriented applications of LLMs and UI/UX design contexts illustrate the practical domain where these methods would be deployed and tested. Additional sources on designer cognition, expert decision-making, and theoretical underpinnings of design critique provide context for how experts think and how to scaffold similar reasoning in AI. Together, these excerpts support the field value by outlining concrete architecture components, data and bias challenges, methods to supervise reasoning, and the real-world design contexts in which such systems must operate. They collectively justify the emphasis on end-to-end hybrid architectures, rigorous evaluation benchmarks, and human-aligned design rationale generation as essential directions. 

- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [Applying Large Language Model to User Experience Testing](https://www.researchgate.net/publication/386123240_Applying_Large_Language_Model_to_User_Experience_Testing)
  > Nov 14, 2024 — Our findings suggest that LLM-based automated UX testing tools can offer more consistent and comprehensive assessments. ... UI/UX design and code quality—can
- [Examining the impact of large language models on design](https://www.sciencedirect.com/science/article/pii/S3050741325000175)
  > by Y Zhou · 2025 · Cited by 14 — this study investigates how LLMs support the entire design process—Discover, Define, Develop, and Deliver—with various functions
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent

### foundational_design_theories_on_intuition
**Confidence:** high

The idea of a pre-verbal, tacit sense that something is not right in design practice is best captured by Donald Schön’s concepts of knowing-in-action and reflection-in-action. These ideas describe how professionals perform skillful work and pause to rethink when something in the action signals a discrepancy, precisely the kind of ‘mismatch signal’ that prompts deliberate reflection to adapt course of action. The reflective practitioner framework is foundational for understanding how practitioners think in action, not just what they produce, which aligns with the user’s description of tacit knowledge becoming explicit through reflection when something seems off. Closely related, designerly ways of knowing describes design knowledge as tacit, non-verbal, and demonstrated through action such as sketching, reinforcing that much of design judgment resides below the explicit verbal level and manifests in tacit capability and intuition. The designerly knowledge concept emphasizes the distinct cognitive style of design, including intuitive assessments of whether a design “works,” which supports the field value’s emphasis on pre-verbal judgment. Additionally, the Recognition-Primed Decision (RPD) model highlights how experts recognize situations as typical and immediately produce viable courses of action based on extensive experience; in the context of a near-miss or mismatch signal, this framework clarifies that the initial sense of wrongness may trigger a rapid, experienced-based re-evaluation rather than a slow, rule-based search. Taken together, these sources provide a coherent theoretical basis for interpreting the mismatch signal as a tacit, action-oriented know-how that can be reflected upon (reflection-in-action), described as designerly knowledge, and supported by rapid recognition processes in expert practice. The seminal works cited anchor these ideas in established theories: Schon’s reflective practice, Cross’s designerly knowing, and Klein’s RPD model.

- [The Reflective Practitioner Donald A Schon](https://lan-portal.uob.edu.ly/url/DOC/9E641Y0991/the-reflective__practitioner_donald__a_schon.pdf)
  > Mar 17, 2026 — Donald Schön&#039;s 1983 book The Reflective Practitioner introduced concepts such as reflection-on-action. Reflective practice is the ability to reflect on
- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you

### llm_architectures_for_design_reasoning_overview
**Confidence:** high

Several excerpts directly address methods to train models to reason about outputs and justify them with explicit steps. One excerpt describes a generative process that performs explicit Chain-of-Thought reasoning with verification steps before producing results, highlighting a structured approach to generate and validate intermediate reasoning, which is core to producing explicit design judgments. Another excerpt discusses Process-Based Supervision, where a learning signal evaluates each intermediate step for correctness, enabling stepwise justification of design reasoning rather than only end results. Related work on Process-Supervised Reinforcement Learning emphasizes self-reflection and multiple self-corrections during problem solving, which supports iterative design critique rather than single-shot outputs. The discussion of Reinforcement Learning from Human Feedback with designer preferences as rewards underscores aligning model judgments with expert design sensibilities, a key to grounding rationale in accepted principles. A paper on constitutional AI-related approaches to design principles and safety further supports grounding outputs in predefined principles. A UI/design-focused study illustrating Ferret-UI shows practical application of such reasoning in design contexts. For broader applicability, works on improving mathematical reasoning with process supervision and related process reward modeling demonstrate that stepwise evaluation can yield more reliable reasoning, not just final answers. Additional works on step-by-step verification and iterative refinement (Let’s Verify Step by Step; Self-Refine) provide concrete methods for ensuring each design critique step is justified and improved over iterations. Collectively, these excerpts map to a design-critique capability that requires explicit, justified reasoning steps, grounding in design principles, and UX impact considerations, implemented via CoT-like reasoning, process supervision, designer-aligned rewards, and iterative refinement.

- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [PROCESS-SUPERVISED REINFORCEMENT LEARNING ...](https://openreview.net/pdf?id=UtEY8lF8q2)
  > by W Tan · Cited by 3 — When solving math problems, language models naturally engage in self- reflection and make multiple self-corrections, which elongates their chain-of-thought (Wei
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [RRHF: Rank Responses to Align Language Models with ...](https://openreview.net/forum?id=EdIGMCHk4l)
  > by H Yuan · Cited by 196 — We evaluate RRHF on the Helpful and Harmless dataset, demonstrating comparable alignment performance with PPO by reward model score and human labeling.

### synthesis_bridging_cognition_and_ai
**Confidence:** medium

The field value centers on bridging a designer’s pre-conscious mismatch signal with a computational model by aligning cognitive theories with training architectures. A core component is predictive processing, where deviations from expectation are coded as prediction errors; this maps to computational analogs like Bayesian surprise that highlight unusual visual elements, providing a concrete mechanism to detect ‘wrongness’ in a design critique. Excerpts that discuss predictive processing and mismatch negativity describe how the brain flags rule violations and prediction errors, offering a direct theoretical bridge to how a model could detect anomalies or surprise in design reasoning. This theoretical backbone is complemented by references that explicitly frame predictive processing as a computational analogue to model-based systems that track expectation violations. Additionally, the design of AI systems to critique their own reasoning and to be auditable aligns with contemporary training approaches that penalize or reward reasoning steps, such as process supervision and process reward models (PRMs), which are designed to evaluate intermediate steps in a chain of thought and flag erroneous steps. This supports the idea that a model can learn to highlight and justify where a critique deviates from correct or logical paths, analogous to how expert designers detect when something is off before articulating why. The concept of a Design Constitution provides a codified principle set to structure expert knowledge, mirroring how a designer’s tacit rulebook can be captured and enforced in an AI system. The pre-verbal, affective mismatch signal (gut feeling) and the related perceptual fluency can be captured with auxiliary scoring heads or holistic evaluators (e.g., NIMA-style aesthetic scoring) to approximate rapid affective responses without full step-by-step analysis, which supports a multi-headed or multi-signal approach rather than relying solely on linear reasoning. The chain-of-thought mechanism, together with iterative Self-Refine, mirrors the designer’s reflection-in-action, enabling ongoing justification and improvement of critique. Finally, aligning model outputs with designer preferences through RLHF or alternatives like Direct Preference Optimization ensures that the system converges toward principled, auditable judgment rather than just producing fashionable designs. Together, these excerpts support a cohesive architecture where predictive processing-inspired signals, PRMs for critique validation, a codified Design Constitution, affective/human-like scoring heads for gut-feel signals, and iterative refinement cycles combine to bridge the cognitive mismatch signal to a robust, justifiable design critique.

- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Visual mismatch negativity: a predictive coding view](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2014.00666/full)
  > by G Stefanics · 2014 · Cited by 416 — An increasing number of studies investigate the visual mismatch negativity (vMMN) or use the vMMN as a tool to probe various aspects of human cognition.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Small LLMs Can Master Math Reasoning with Self-Evolved ...](https://arxiv.org/html/2501.04519v1)
  > Jan 8, 2025 — As for the reward model, process reward modeling (PRM) shows a great potential by providing fine-grained feedback on intermediate steps (Lightman et al., 2023)
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1295305)
  > by R Reber · 2004 · Cited by 4522 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf)
  > by R Reber · 2004 · Cited by 4518 — We propose that aesthetic pleasure is a function of the perceiver's processing dynam- ics: The more fluently perceivers can process an object, the more
- [(PDF) Processing Fluency and Aesthetic Pleasure](https://www.researchgate.net/publication/8144801_Processing_Fluency_and_Aesthetic_Pleasure_Is_Beauty_in_the_Perceiver's_Processing_Experience)
  > May 2, 2016 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive

### executive_summary
**Confidence:** high

The most directly relevant information comes from sources describing mismatch negativity and related error signals, which map to the pre-verbal “gut feeling” of wrongness in design. The discussion of Mismatch Negativity and predictive coding frames helps connect the designer’s pre-verbal signal to a broader neuroscience literature on prediction error, which supports treating the signal as a fast, prediction-error-based cue rather than purely a conscious rule violation. Evidence that mismatch-related components (MMN, ERN) exist and are elicited by deviations or errors helps corroborate the claim that such signals have neural correlates and can be considered preconscious cues. Supplemental content on perceptual fluency and processing fluency provides a mechanism for why a designer might experience a gut sense of mismatch when perceptual processing is less fluent or when prototypes are violated. On the computational side, references to Bayes-style surprise and aesthetic scoring models (e.g., NIMA) illustrate concrete analogs for quantifying surprise or quality judgments, aligning with the idea that “wrongness detection” can be modeled computationally. For training LLMs to reason about design reasoning, the excerpts introduce constitutional AI, process supervision with a design-oriented Process Reward Model, RLHF with designer preferences, and chain-of-thought/stepwise critique methods. These sources collectively support a multi-faceted learning framework where the model not only produces designs but also provides rationale and critique, guided by principled design principles and stepwise evaluation. Additionally, several excerpts discuss process supervision, PRMs, and direct optimization approaches (e.g., RRHF, RLHF, DPO) as robust avenues for teaching models to reason about why a design decision is sound or flawed, which aligns with the field value’s emphasis on design critique and justification rather than mere design generation. In sum, the selected excerpts jointly map the biological/neural basis of the pre-verbal mismatch signal to formal cognitive theories (prediction error, Bayesian surprise), perceptual factors (fluency), and concrete machine-learning strategies (Constitutional AI, PRMs, RLHF, CoT) for training LLMs to articulate design rationale and critique.

- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf)
  > by R Reber · 2004 · Cited by 4518 — We propose that aesthetic pleasure is a function of the perceiver's processing dynam- ics: The more fluently perceivers can process an object, the more
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [PROCESS-SUPERVISED REINFORCEMENT LEARNING ...](https://openreview.net/pdf?id=UtEY8lF8q2)
  > by W Tan · Cited by 3 — When solving math problems, language models naturally engage in self- reflection and make multiple self-corrections, which elongates their chain-of-thought (Wei
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### assessment_of_training_approaches
**Confidence:** medium

- Excerpts detailing Constitutional AI (CAI) provide concrete methodology for training AI to be aligned and to critique outputs within safety and principle-based constraints, which is directly relevant to building a system capable of self-critique and principled reasoning in design tasks. This supports the field’s claim that CAI-like approaches can be used to ground design critique in explicit principles. 
- Excerpts about Process Reward Models (PRMs) describe how intermediate reasoning steps can be judged and rewarded, which directly substantiates the feasibility of training signals that emphasize reasoning quality rather than only end results. This aligns with the field’s emphasis on process-oriented evaluation in design critique and reasoning. 
- Excerpts on RLHF and related preference-based alignment (DPO, RRHF) show widely used methods to align model behavior with human designer preferences, which directly supports the field’s reference to designer-informed reward structures and evaluation criteria for design rationale. 
- Excerpt on Chain-of-Thought prompting and Self-Refine provides concrete procedural tools for improving reasoning quality and iterative improvement, which the field asserts as essential components of a design rationale workflow. 
- Excerpts connecting these ideas to broader training strategies (e.g., process supervision in AI, and performance gains in mathematical reasoning) give empirical grounding that these training paradigms generalize beyond their original domains, reinforcing the field’s claim of cross-domain validation and potential applicability to design rationale tasks. 
- Excerpts mentioning multimodal evaluators and UI/UX-oriented assessments illustrate transferable evaluation signals (e.g., visual ‘surprisal’ or aesthetic literacy) that could be incorporated into an end-to-end design critique system, supporting the proposed hybrid architecture idea. 
- Collectively, these excerpts support the view that while an end-to-end, all-in-one published system for design rationale as a single integrated pipeline might not yet be fully realized, the individual components have empirical support and can be orchestrated to form a principled, auditable design critique system. 
- The strongest theoretical approach suggested by these sources is a hybrid architecture that combines a Design Constitution (CAI-style self-critique), Process Reward Modeling for critique steps, preference-based alignment (DPO/RRHF) using designer rankings, rationale-focused supervised fine-tuning with iterative Self-Refine, and multimodal evaluators to detect design-visual signals, potentially enabled by retrieval-augmented generation and test-time reranking. This composition reflects the most coherent synthesis supported by the cited material, though actual published end-to-end design-specific systems remain forthcoming. 
- In sum, the available excerpts jointly corroborate the feasibility and empirical grounding of the named training approaches, while indicating that a fully published, end-to-end design-rationale system is not yet widely documented as a single, integrated solution. This yields a balanced, evidence-based assessment rather than a guaranteed, proven blueprint for design rationale systems.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [PROCESS-SUPERVISED REINFORCEMENT LEARNING ...](https://openreview.net/pdf?id=UtEY8lF8q2)
  > by W Tan · Cited by 3 — When solving math problems, language models naturally engage in self- reflection and make multiple self-corrections, which elongates their chain-of-thought (Wei
- [RRHF: Rank Responses to Align Language Models with ...](https://openreview.net/forum?id=EdIGMCHk4l)
  > by H Yuan · Cited by 196 — We evaluate RRHF on the Helpful and Harmless dataset, demonstrating comparable alignment performance with PPO by reward model score and human labeling.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.

### affective_and_perceptual_theories
**Confidence:** high

- The Somatic Marker Hypothesis is directly described as emotion-based biasing signals derived from bodily states that guide judgments, especially in complex situations. This provides a concrete mechanism for the pre-verbal, intuitive ‘gut feeling’ of something being wrong, aligning with the idea that past experiences attach emotional valuations to patterns and trigger a somatic cue when violated. This directly supports the field’s inclusion of emotion-based biasing as part of the mismatch signal.
- The Mismatch Negativity and its neural correlates are framed as pre-attentive or early brain responses to deviations from learned patterns. This establishes a concrete physiological basis for a pre-conscious signal of mismatch, which corresponds to the expert designer’s early, non-verbal sense that something is off before explanation or articulation.
- The Error-Related Negativity and related neural signals are similarly described as rapid neural responses following errors, which map onto a pre-conscious detection of mismatch or failure that can inform later corrective reasoning.
- The Affect Heuristic is described as a rapid affective shortcut in judgments, where emotional responses substitute for detailed evaluation. This dovetails with the idea that designers rely on quick affective judgments as a preliminary signal of design elements that fit or violate deep-seated patterns.
- Processing Fluency literature shows that the ease or difficulty of processing (fluency vs. disfluency) correlates with perceptions of beauty, correctness, and fit with established principles. A design that is disfluent can generate a subtle sense that something is wrong, serving as a pre-attentive mismatch signal.
- Collected references on processing fluency and aesthetic pleasure, along with general discussions of fluency as a driver of perceived quality, reinforce that perceptual ease (or lack thereof) can function as an early indicator of mismatch, prior to explicit critique or justification.
- Together, these sources map a coherent picture: the mismatch signal can emerge from bodily emotion (somatic markers), rapid affective judgments (affect heuristic), and perceptual processing dynamics (fluency), with neural instantiations (MMN/ERN) providing measurable correlates. This supports the requested fine-grained field value that links affective and perceptual theories to a pre-verbal mismatch signal in expert design judgment.


- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Mismatch negativity](https://en.wikipedia.org/wiki/Mismatch_negativity)
  > Dec 15, 2019 — The mismatch negativity (MMN) or mismatch field (MMF) is a component of the event-related potential (ERP) to an odd stimulus in a sequence of stimuli.
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf)
  > by R Reber · 2004 · Cited by 4518 — We propose that aesthetic pleasure is a function of the perceiver's processing dynam- ics: The more fluently perceivers can process an object, the more
- [(PDF) Processing Fluency and Aesthetic Pleasure](https://www.researchgate.net/publication/8144801_Processing_Fluency_and_Aesthetic_Pleasure_Is_Beauty_in_the_Perceiver's_Processing_Experience)
  > May 2, 2016 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1295305)
  > by R Reber · 2004 · Cited by 4522 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [The affect heuristic](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/slovic-affect-heuristic-2002.pdf)
  > by P Slovic · 2007 · Cited by 5461 — This paper introduces a theoretical framework that describes the importance of affect in guiding judgments and deci- sions. As used here, ''affect'' means
- [Bayesian surprise attracts human attention](https://www.sciencedirect.com/science/article/pii/S0042698908004380)
  > by L Itti · 2009 · Cited by 1589 — Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average.
- [Curiosity-Driven Exploration via Latent Bayesian Surprise](https://cdn.aaai.org/ojs/20743/20743-13-24756-1-2-20220628.pdf)
  > by P Mazzaglia · 2022 · Cited by 64 — Itti, L.; and Baldi, P. 2006. Bayesian Surprise Attracts Hu- man Attention. In Advances in Neural Information Process- ing Systems, volume 18, 547–554
- [Bayesian surprise shapes neural responses in ...](https://ethz.ch/content/dam/ethz/special-interest/itet/biomedical-engineering/yaniklab-dam/documents/English23_Bayesion%20Surprise.pdf)
  > by G English · 2023 · Cited by 16 — Itti, L., and Baldi, P. (2009). Bayesian surprise attracts human attention. Vision Res. 49, 1295–1306. https://doi.org/10.1016/j.visres.2008.09.007. 4
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [(PDF) Understanding Predictive Processing. A Review](https://www.researchgate.net/publication/354376083_Understanding_Predictive_Processing_A_Review)
  > Sep 5, 2021 — The purpose of this paper is to provide a systematic review of the Predictive Processing framework (hereinafter PP) and to identify its basic theoretical
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### training_approaches_for_llm_reasoning
**Confidence:** high

Constitutional AI for design quality: Excerpts describing Constitutional AI (including the concept of a Design Constitution derived from established design principles and using self-critique to align outputs) directly map to the first approach in the field value. They discuss encoding principles into an auditable framework and using iterative self-critique to improve alignment with those principles. Excerpts that originate from or discuss the broader Constitutional AI literature provide explicit support for adapting a design-oriented constitution and applying it to critique rather than generate, which aligns with the field value’s emphasis on principled evaluation grounded in a constitution.
Process supervision on design reasoning chains: Excerpts describing Process Reward Models (PRMs) and process supervision explicitly address scoring intermediate reasoning steps rather than only final outputs. They describe decomposing critiques into steps, rewarding correct reasoning, and training models to evaluate the sufficiency and correctness of each part of a critique. This directly supports the field value’s emphasis on supervising the reasoning process itself, not just the end result.
Preference optimization and related RLHF/DPO/RRHF: Excerpts summarize family methods for aligning models with designer judgments, including RLHF, Direct Preference Optimization, and RRHF. They explain collecting designer preferences, ranking critiques, and optimizing policies accordingly, which matches the field value’s item on preference-based and reward-based shaping of design reasoning and critique quality.
Chain-of-Thought and rationale-first approaches: Excerpts discuss Chain-of-Thought prompting, rationale-first supervised finetuning, and iterative refinement (Self-Refine) to improve reasoning fidelity and faithfulness. These align with the field value’s emphasis on making the reasoning rationale explicit and refining it, rather than producing design outputs without justification.
Multimodal signals for mismatch detection: Excerpts reference multimodal signals and perceptual cues (e.g., aesthetics and Bayesian surprise) to ground abstraction in perceptual cues, serving as a potential source of mismatch signals that the LLM can justify with principled reasoning. This connects to the field value’s interest in leveraging perceptual indicators of “wrongness” as inputs to design critique.
Inference-time orchestration: Excerpts describe retrieval-augmented critique, multi-agent debate, and test-time scaling with a PRM to select among candidate critique paths. This mirrors the field value’s item about orchestrating multiple reasoning paths at inference to improve critique quality and reliability.
Overall, the selected excerpts collectively cover each component listed in the finegrained field value, offering concrete theories, methods, and published work that directly correspond to the described training approaches for LLM reasoning in design critique. The most direct evidence comes from explicit mentions of Constitutional AI in design contexts, process supervision with PRMs, and explicit chain-of-thought/rationale-focused fine-tuning and refinement techniques; these form the strongest support. The other items (multimodal signals and inference-time orchestration) are supported by related discussions that show how perceptual cues and multiple reasoning paths can be integrated into design critique training and inference pipelines.

- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### neuroscientific_correlates_of_mismatch.1
**Confidence:** medium

The fine-grained field value describes the Error-Related Negativity (ERN) as a rapid electrophysiological index of cortical error processing that occurs shortly after an error, is linked to the anterior cingulate cortex, and can precede conscious awareness of the error. This directly supports the notion that ERN could function as the immediate, pre-conscious ‘gut feeling’ of wrongness a designer experiences when a layout or design element is problematic, prior to articulate reasoning. The referenced excerpts that explicitly discuss ERN and its role in error processing provide the strongest support for this connection. Additional excerpts discuss mismatch negativity (MMN) as a brain response to violations of expected patterns, which offers relevant context about rapid neural detection of mismatches or rule violations, though it is not as directly tied to intentional design critique as ERN. A general definition of MMN and its characterization as a prediction-error signal further reinforces the broader theme of rapid mismatch signaling in the brain, which is contextually supportive but secondary to the ERN-focused evidence. Taken together, the ERN-related excerpts most strongly substantiate the claim that a rapid neural error signal underpins the designer’s early perception of wrongness, while MMN-related sources supply complementary context about fast, expectation-based neural responses to mismatches in perceptual or cognitive domains.

- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the

### existing_applications_and_benchmarks.1
**Confidence:** high

The fine-grained field value centers on the AVA (Aesthetic Visual Analysis) dataset, described as a large-scale image dataset where about 255,000 photos are rated for aesthetic qualities by roughly 200 raters each. The most relevant excerpt explicitly discusses NIMA (Neural Image Assessment) and notes that the AVA dataset contains images rated for aesthetic qualities, with aggregation across many raters. This directly corroborates the existence and purpose of the AVA dataset and its large-scale human-rated aesthetic judgments. The second excerpt provides a Google Research presentation of NIMA and shows example photos from the AVA dataset, reinforcing the same core fact about AVA being used to assess aesthetic quality at scale. Both excerpts thus support the field value’s description of AVA as a large, human-rated image aesthetics dataset, and the note that its methodology (learning from large-scale human ratings) is transferable to training AI to judge UI/UX design aesthetics. While the other excerpts discuss related topics (e.g., process supervision, harmlessness, UI design tooling) they do not address AVA or aesthetic rating datasets, and therefore contribute little direct support to this specific field value. Therefore, the most relevant supporting content are the explicit AVA/NIMA references and the example usage of AVA in illustrating aesthetic judgments at scale.

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### pattern_recognition_theories.0
**Confidence:** medium

The most relevant excerpt directly defines chunking as a semantic unit that is recognized at a glance by an expert, which aligns with the core concept of organizing information into large, meaningful patterns or 'chunks' in long-term memory. The field value emphasizes that expertise arises from such chunk-based representations and that a mismatch signal occurs when something within a chunk violates its established structure, signaling an error. Related excerpts discuss mismatch negativity as a neural signal for violations of a rule or prediction error, which supports the intuition that there is a mismatch signal when patterns are violated within an expected schema. Additional excerpts touch on predictive processing and the idea that prediction error reflects the discrepancy between expected and observed values, which further contextualizes how a mismatch can arise in patterned recognition. A designerly knowledge piece connects the notion of pattern-based understanding to design practices and knowledge frameworks, reinforcing the applicability of chunk-based thinking to design reasoning. In summary, the most pertinent content confirms (a) chunk-based pattern representations in expertise, (b) the mismatch signal as a cue when a component breaches a chunk, and (c) broader theory around prediction error and pattern-based design reasoning that supports the field value’s claims.

- [Chunking](https://www.chessprogramming.org/Chunking)
  > Oct 1, 2007 — A chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.
- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent

### neuroscientific_correlates_of_mismatch.0
**Confidence:** high

The finegrained field value centers on Mismatch Negativity (MMN) as an electrophysiological brain response indexing the automatic detection of deviations from an established rule or pattern in a sensory sequence. The most direct support comes from sources that explicitly describe MMN as a brain response to violations of a rule or expected pattern, typically elicited by deviations in a sequence of stimuli. This establishes MMN as a pre-attentive mismatch signal, aligning with the idea that an expert designer’s brain may generate an analogous implicit signal when a design element violates learned design rules. Additional sources describe MMN as a neural signal of prediction error evoked by deviants from expected input, reinforcing the interpretation of MMN as a general mismatch-detection mechanism rather than a conscious, deliberative process. A broader visual domain investigation considers visual mismatch negativity (vMMN), extending the concept to non-auditory stimuli and supporting the notion that mismatch signals can occur across modalities. Related research on error-related negativity (ERN) discusses another neural index of error processing, which, while not MMN, helps situate mismatch-related neural responses within the broader family of rapid, automatic error signals in the brain. Together, these excerpts corroborate that MMN serves as a pre-verbal, automatic mismatch signal tied to rule-violation detection, which is the core idea captured by the finegrained field value, and they contextualize how such signals are identified and studied in neuroscience.

- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect

### computational_models_for_wrongness_detection.2
**Confidence:** high

The finegrained field value describes a mechanism where a model is trained to assign rewards to individual reasoning steps, enabling detection of incorrect or flawed steps within a process. Excerpts that explicitly discuss process supervision to train more reliable reward models in reasoning tasks directly support this idea, as they describe training objectives and data pipelines that evaluate intermediate steps rather than only outcomes. A survey focused on Process Reward Models aligns with the concept by outlining data generation, modeling, and test-time applications for PRMs, reinforcing the central role of stepwise evaluation. Additional references to process reward modeling in math reasoning and to related alignment approaches (constitutional AI, harmlessness) provide methodological context for how such reward signals could be integrated into broader design-principled AI systems, supporting the feasibility and potential best practices for training and applying PRMs to critique design reasoning. The more peripheral or domain-specific items (such as image aesthetics or UI generation) do not directly contribute to the core concept of PRMs for wrongness detection in reasoning steps and thus are less relevant to the finegrained field value.

- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [Small LLMs Can Master Math Reasoning with Self-Evolved ...](https://arxiv.org/html/2501.04519v1)
  > Jan 8, 2025 — As for the reward model, process reward modeling (PRM) shows a great potential by providing fine-grained feedback on intermediate steps (Lightman et al., 2023)
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.

### foundational_design_theories_on_intuition.1
**Confidence:** high

The finegrained field value describes Nigel Cross’s core concept of Designerly Ways of Knowing, highlighting that design knowledge is tacit, often non-verbal, and demonstrated through action such as sketching, with an intuitive sense of whether a design 'works'. Excerpts discussing Nigel Cross explicitly align with this frame: they present the idea that design constitutes a distinct discipline with its own unique forms of knowledge and cognitive processes, including tacit understanding demonstrated in practice. This directly supports the notion of designerly knowledge being tacit, action-based, and capable of guiding judgment before verbal articulation. The related works emphasize design as a field with its own epistemology beyond traditional rule-based or verbalizable reasoning, reinforcing the pre-verbal, embodied sense of design quality referenced in the finegrained field value. Additional excerpts on tacit knowing-in-action and reflective practice, while somewhat broader, reinforce the same theme: professionals rely on tacit, action-oriented understanding to guide performance in real settings, which complements the designerly knowledge concept. The least directly supportive excerpt concerns a rapid decision model from other domains; it provides context on decision making but does not strengthen the specific designerly epistemology. Overall, the strongest alignment comes from the explicit focus on designerly knowledge and tacit, action-based cognition; next strongest from broader tacit know-how in design practice; and weakest from adjacent decision-making models not specific to designerly knowing. 

- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [The Reflective Practitioner Donald A Schon](https://lan-portal.uob.edu.ly/url/DOC/9E641Y0991/the-reflective__practitioner_donald__a_schon.pdf)
  > Mar 17, 2026 — Donald Schön&#039;s 1983 book The Reflective Practitioner introduced concepts such as reflection-on-action. Reflective practice is the ability to reflect on
- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every
- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you

### computational_models_for_wrongness_detection.0
**Confidence:** high

The finegrained field value specifies a model named NIMA (Neural Image Assessment) whose purpose is to predict the distribution of human opinion scores for images, effectively learning to assess aesthetic and technical quality without hand-coded rules. This aligns with the excerpt describing NIMA as a neural network that operates on the AVA dataset, where images are rated by thousands of people, and where the model predicts a distribution of scores rather than a single rating. Although the excerpt does not explicitly mention Google Research, it confirms the core mechanism and data source that underpin the field value's claim about NIMA’s design and data foundation. No other excerpts directly describe NIMA or its data/methodology, so they provide contextual background rather than direct support for the specific finegrained field value.

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in

### rationalization_and_explanation_models.1
**Confidence:** medium

The most relevant excerpt directly aligns with interventional/selective rationalization by describing how selective rationalizations improve explainability through choosing a subsequence of the input as the rationale. This matches the field value’s core idea of selecting a rationale and ensuring it is functionally tied to the model’s prediction by a verification-style check (removal or assessment of its impact). A closely related excerpt discusses a stepwise verification approach to reasoning, demonstrating that explicitly validating each reasoning step (a form of process supervision or verification) can improve fidelity, which conceptually supports the idea of having a justification that is tested for its causal influence on output. Additional excerpts introduce broader themes of reasoning with chain-of-thought, process supervision, and rationalization approaches, which provide supportive context for how one could structure training or evaluation around rationale generation and its justification, even if they do not instantiate the exact interventional mechanism. Taken together, the strongest support is for the idea of selecting a rationale and verifying its influence on performance, with secondary support from works that explore verifiable reasoning chains and rationale-focused training paradigms to reinforce this behavior.

- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### foundational_design_theories_on_intuition.0
**Confidence:** high

The finegrained field value centers on Donald Schön and the concepts of knowing-in-action and reflection-in-action as mechanisms by which designers detect a mismatch and investigate it. Excerpt describing reflection-on-action directly names the idea that professionals reflect after action, which supports the notion of pausing to question and re-evaluate when something feels wrong. Excerpt discussing tacit knowing-in-action supports the claim that much of professional thinking occurs in action, implicitly guiding design judgment without explicit articulation. Excerpts addressing designerly ways of knowing extend the context by arguing that design expertise rests on a coherent, practice-based knowledge framework rather than purely formal, rule-based knowledge. Together, these excerpts substantiate the finegrained field value by mapping the mismatch signal to a reflective, tacit, action-grounded design cognition framework and situating it within Schön’s seminal work on professional thinking in action. The recognition-primed decision model (while relevant to fast decision making) is less directly tied to the mismatch signal and reflective practice described by Schön, and thus ranks lower in direct relevance to the core field value, though it provides adjacent context about rapid decision processes in design-related cognition.

- [The Reflective Practitioner Donald A Schon](https://lan-portal.uob.edu.ly/url/DOC/9E641Y0991/the-reflective__practitioner_donald__a_schon.pdf)
  > Mar 17, 2026 — Donald Schön&#039;s 1983 book The Reflective Practitioner introduced concepts such as reflection-on-action. Reflective practice is the ability to reflect on
- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you

### rationalization_and_explanation_models.0
**Confidence:** high

The most relevant content directly discusses methods to make models provide explicit rationales before delivering conclusions. One excerpt describes selecting rationales to explain neural network decisions, which aligns with the goal of rationale-first training where explanations precede verdicts. Another excerpt explicitly examines rationalizing predictions by introducing an approach to generate justifications for model outputs, i.e., training or design choices that embed rationale generation in the model’s workflow. A third excerpt focuses on process supervision, rewarding each correct reasoning step during learning to improve stepwise problem solving, which is a core mechanism for enforcing a reasoning-first paradigm. Additional excerpts discuss explicit chain-of-thought reasoning and verification steps (e.g., enabling CoT reasoning with verification before final outputs), further supporting the principle of training models to reason about why a decision is good or bad rather than merely producing outcomes. Collectively, these sources illustrate a spectrum of techniques—rationale selection, process/stepwise supervision, and explicit justification generation—that underpin rationale-first supervised finetuning, consistent with the requested finegrained field value.

- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### foundational_design_theories_on_intuition.2
**Confidence:** high

The fine-grained field value centers on Gary Klein and the Recognition-Primed Decision model as a framework for understanding mismatch signals in expert design intuition. The most directly relevant content states that experts make rapid, effective decisions by recognizing situations as typical based on extensive experience, and that a mismatch occurs when a familiar pattern nearly fits but contains a subtle violation, triggering the need for more careful analysis. This directly maps to the idea of a mismatch signal as a failure in recognition prompting deeper evaluation. Additional excerpts on tacit knowledge and reflective practice provide supportive context about intuition and non-verbal cues in professional design thinking, which aligns with the broader topic but does not explicitly define the mismatch signal within an RPD framework. Taken together, the combination of a clear RPD description and its implications for mismatch-type cognition strongly supports the fine-grained field value; the contextual design theory excerpts supplement the picture but are less central to the exact RPD-based interpretation of mismatch signals.

- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you
- [The Reflective Practitioner Donald A Schon](https://lan-portal.uob.edu.ly/url/DOC/9E641Y0991/the-reflective__practitioner_donald__a_schon.pdf)
  > Mar 17, 2026 — Donald Schön&#039;s 1983 book The Reflective Practitioner introduced concepts such as reflection-on-action. Reflective practice is the ability to reflect on
- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent

### existing_applications_and_benchmarks.0
**Confidence:** high

The field value highlights Ferret-UI as a multimodal LLM crafted for deep understanding of mobile UI screens, with capabilities to refer to, ground, and reason about screen elements. The excerpt explicitly naming Ferret-UI directly supports the field value by providing the exact model and its designed capabilities. Additional excerpts discuss the broader role of large language models in UI/UX design and how researchers approach quality, prompts, and evaluation in AI-assisted design, which provides contextual support for how Ferret-UI-like systems could be used to critique or reason about design decisions rather than just generate designs. Together, the direct mention establishes the concrete example, while the surrounding UI/UX with LLM discussions corroborate the feasibility and evaluation considerations of such design-centric reasoning systems.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.

### existing_applications_and_benchmarks.4
**Confidence:** high

The most relevant excerpts directly describe Constitutional AI approaches and their implications for training models to self-critique and align with a predefined set of principles, which aligns with the idea of a Design Constitution that grounds reasoning in design theory. For example, constitutional AI aims to train a harmless AI assistant through self-improvement without human labels identifying harmful outputs, which supports the notion of a principled, auditable critique framework. Further, described benefits of RLHF and self-improvement frameworks show how shaping internal reasoning chains and constraints can yield more trustworthy, principle-grounded design critiques. Related literature on process supervision demonstrates that rewarding structured reasoning steps (rather than merely outcomes) improves reliability and robustness in complex reasoning tasks, which is highly relevant to teaching an LLM to reason about why a design decision is good or bad. A survey of process reward models provides a broader methodological backdrop for implementing such frameworks, showing how to generate, build, and apply process-based signals in model training. Additional excerpts touch on the broader role of AI in UI/UX and design research, which contextualizes how these principled reasoning frameworks could be applied to design critique and decision-making in practice. Taken together, these excerpts map onto the fine-grained field value by illustrating concrete training paradigms (Constitutional AI, process supervision, and reward-modeling approaches) that could underpin a design-focused, rationale-oriented AI architecture grounded in established design principles such as usability heuristics and accessibility standards.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and

### affective_and_perceptual_theories.2
**Confidence:** medium

The core field value asserts that perceptual fluency (ease of processing) underpins aesthetic pleasure, and that low fluency (disfluency) yields a negative affect and signals some form of mismatch or wrongness in a design. Excerpts that articulate the link between processing fluency and aesthetic judgments directly support this claim by describing how fluency determines perceived beauty and positive evaluation. Additional excerpts discuss affect guiding judgments, which aligns with the broader idea that affective responses track processing ease or disfluency. While some sources focus on neural mismatch signals in sensory domains (mismatch negativity) or error processing, they provide a parallel concept: a system detects deviations from expected patterns which can be analogous to noticing disfluency in a design. Taken together, these pieces support a theory where fluency/disfluency modulates aesthetic and design judgments and where a mismatch-like signal may arise from processing difficulties or expectation violations. The most directly relevant pieces are those that connect fluency to pleasure and to judgment, with secondary relevance from discussions of affect and mismatch-like signals in broader cognitive architectures.

- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf)
  > by R Reber · 2004 · Cited by 4518 — We propose that aesthetic pleasure is a function of the perceiver's processing dynam- ics: The more fluently perceivers can process an object, the more
- [(PDF) Processing Fluency and Aesthetic Pleasure](https://www.researchgate.net/publication/8144801_Processing_Fluency_and_Aesthetic_Pleasure_Is_Beauty_in_the_Perceiver's_Processing_Experience)
  > May 2, 2016 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1295305)
  > by R Reber · 2004 · Cited by 4522 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [The affect heuristic](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/slovic-affect-heuristic-2002.pdf)
  > by P Slovic · 2007 · Cited by 5461 — This paper introduces a theoretical framework that describes the importance of affect in guiding judgments and deci- sions. As used here, ''affect'' means
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)

### affective_and_perceptual_theories.1
**Confidence:** high

The most relevant content directly states that affect or emotional responses guide judgments, acting as quick shortcuts rather than through deliberate analysis. This aligns with the field value’s mechanism: when a designer encounters an element incongruent with deeply learned patterns, an immediate negative affective response can bias judgment toward a negative evaluation before detailed critique. The somatic marker hypothesis expands on how emotion-based bodily signals bias complex decisions, which supports the idea of an affective fast track preceding explicit reasoning. Additional sources discuss emotional biases in decision making, reinforcing the notion that affect can steer evaluation in professional design contexts. Taken together, these excerpts support a model where affective signals serve as rapid, intuitive indicators of mismatch or wrongness, shaping subsequent reasoning and design critique rather than merely reflecting it after deliberation.

- [The affect heuristic](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/slovic-affect-heuristic-2002.pdf)
  > by P Slovic · 2007 · Cited by 5461 — This paper introduces a theoretical framework that describes the importance of affect in guiding judgments and deci- sions. As used here, ''affect'' means
- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### computational_models_for_wrongness_detection.1
**Confidence:** high

The most relevant content directly identifies Bayesian surprise as a mechanism linked to human attention: it is described as a strong attractor of gaze shifts toward locations more surprising than the average. This supports the fine-grained field value’s claim that a Bayesian framework can flag novelty or deviation from expectation, which aligns with using a mismatch signal to detect wrongness. The statement about Bayesian surprise attracting attention provides concrete evidence that a Bayesian surprise signal can function as an indicator of unexpected or 'wrong' input, which is the core idea in the field value. Additional excerpts mentioning process supervision and constitutional AI provide broader context on design rationale and evaluation frameworks but do not directly establish the Bayesian mechanism as the wrongness detector in a design context; they can be seen as complementary background rather than direct evidence for the specific field value.

- [Bayesian surprise attracts human attention](https://www.sciencedirect.com/science/article/pii/S0042698908004380)
  > by L Itti · 2009 · Cited by 1589 — Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average.

### affective_and_perceptual_theories.3
**Confidence:** high

The finegrained field value identifies the mismatch signal as neural correlates MMN and ERN, with MMN described as a pre-attentive brain response to violations of an expected pattern and ERN as an error-related signal in the brain. The most directly supportive content comes from sources that explicitly define mismatch negativity (MMN) as a brain response to violations of rules or learned regularities, and from discussions of mismatch-related neural signals as precursors to conscious awareness of wrongness. Specifically, one excerpt states that mismatch negativity is a brain response to violations of a rule established by a sequence of sensory stimuli, which aligns with the notion of a pre-attentive detection of deviation. Another excerpt provides a broader framing that MMN is a neural signal of prediction error evoked by deviants from expected sensory input, which reinforces the idea of a preconscious detection mechanism. Additional excerpts define MMN as a component linked to difference waveforms and describe it as a pre-attentive mismatch signal, further anchoring the physiological basis for the feeling of wrongness. An excerpt on the error-related negativity (ERN) is relevant as it ties to the broader class of neural signals (including ACC involvement) that precede conscious awareness of an error, which complements the MMN account in explaining the pre-conscious sensing of mismatch or fault. Finally, an earlier reference to the somatic marker framework can loosely contextualize affective or bodily signals associated with decision processes, providing a broader backdrop to how bodily signals may inform judgments prior to verbal articulation. In sum, the strongest support comes from explicit definitions and characterizations of MMN as a pre-attentive, rule-violation brain response and ERN as an early error signal, with supportive framing from broader discussions of pre-conscious signals and affective-body contributions.”, 

- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Mismatch negativity](https://en.wikipedia.org/wiki/Mismatch_negativity)
  > Dec 15, 2019 — The mismatch negativity (MMN) or mismatch field (MMF) is a component of the event-related potential (ERP) to an odd stimulus in a sequence of stimuli.
- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain

### affective_and_perceptual_theories.0
**Confidence:** high

The finegrained field value describes a theory where emotion-based bodily signals (somatic states) are integrated into decision-making, producing a pre-verbal gut feeling of ‘wrongness’ when a new design violates a pattern tied to successful past experiences. The most direct support comes from a foundational discussion of the Somatic Marker Hypothesis, which explicitly posits that body-derived signals bias judgments and are integrated into higher-level decisions. This aligns with the notion that expert designers experience an intuitive signal before they can articulate the reason. Additional excerpts reinforce this link by explicitly naming the Somatic Marker Hypothesis as the framework for affective bodily biases in decision-making and by offering editorial context on its historical role, including its connection to decision making and emotion-based valuations. Together, these sources corroborate that the pre-verbal, bodily gut signal during complex judgments can be understood as somatic markers tied to past success patterns, thereby supporting the described field value. The presence of these sources strengthens the interpretation that the proposed mechanism is the somatic marker account, rather than alternative theories, given their explicit focus on emotion-based bodily signals guiding decisions in the face of uncertainty and complexity.

- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### pattern_recognition_theories.1
**Confidence:** medium

The core fine-grained field value describes a fast, experiential recognition process (Recognition-Primed Decision) where experts rely on familiar patterns to prime expectations and guide immediate action, with a pre-verbal mismatch signal indicating that the current situation violates those primed expectancies and that the default course of action may be flawed. The most relevant excerpt explicitly frames mismatch-related neural responses as violations of a learned rule or pattern, i.e., mismatch negativity as a brain response to deviations from an established sequence, which aligns with the idea of a rapid, pattern-based sense that something is wrong before explicit reasoning unfolds. A closely related excerpt discusses mismatch negativity as a neural signal of prediction error evoked by deviants from expected sensory input, which underpins the notion of an early, automatic detection mechanism that signals misalignment with priors. Another excerpt treats predictive processing and prediction error as central to understanding how expectations guide perception and action, providing a theoretical scaffold for how experts might rely on prior experience to anticipate outcomes and identify when a situation diverges from those anticipations. A fourth piece on chunking describes how pattern-based knowledge is organized into meaningful units and recognized quickly by experts, supporting the idea that rapid recognition of familiar patterns underpins expert judgment. A further excerpt about design studies and designerly knowledge, while not central to the mechanism of recognition-based judgment, offers context on applying design cognition frameworks to design thinking and evaluation, which can be seen as complementary to a design expert relying on internalized patterns. Taken together, the most strongly supportive elements are the references to mismatch signaling as a rule-violation detector and to prediction error as a driver of rapid, expectancy-based processing; the chunking discussion provides ancillary support about pattern-based recognition, and the design cognition context provides peripheral alignment to design thinking practices.

- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors
- [Chunking](https://www.chessprogramming.org/Chunking)
  > Oct 1, 2007 — A chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent

### computational_models_for_wrongness_detection.3
**Confidence:** medium

The core field value describes an ML model focused on understanding mobile UI screens ( Ferret-UI ), with capabilities for referring, grounding, and reasoning about UI elements, and an ability to evaluate UI correctness and quality beyond static rules. The most relevant evidence directly states that Ferret-UI is a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning, and capable of evaluating UI tasks, including judging UI correctness and quality beyond static rules. This directly corroborates the field value’s claims about purpose, mechanism (multimodal understanding, reasoning about UI elements), and the outcome (ability to judge design quality beyond static rules). Other excerpts discuss related topics like process supervision for better reward models, and constitutional AI approaches to alignment and harmlessness. While these provide contextual support for how models can be guided, evaluated, or aligned in design reasoning historically, they do not directly substantiate the specific Ferret-UI capabilities or its architectural focus on UI reasoning and judgment. Therefore, they are considered supportive but indirect, offering background on design reasoning evaluation and supervision rather than direct confirmation of Ferret-UI’s described properties.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [Small LLMs Can Master Math Reasoning with Self-Evolved ...](https://arxiv.org/html/2501.04519v1)
  > Jan 8, 2025 — As for the reward model, process reward modeling (PRM) shows a great potential by providing fine-grained feedback on intermediate steps (Lightman et al., 2023)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Bayesian surprise attracts human attention](https://www.sciencedirect.com/science/article/pii/S0042698908004380)
  > by L Itti · 2009 · Cited by 1589 — Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average.

### existing_applications_and_benchmarks.5
**Confidence:** high

The core finegrained field value describes PRMs as a supervision technique that trains a reward model to score intermediate reasoning steps, enabling explicit chain-of-thought reasoning and verification before scoring. This is directly reflected in the cited material that states process supervision can train more reliable reward models than outcome-only supervision in domains requiring reasoning, such as mathematical reasoning, and that PRMs can involve the full loop of data generation, model building, and usage. Further, there are explicit claims about training models to reward each correct step of reasoning, which aligns with the goal of teaching an AI to explain and justify design decisions rather than merely producing outputs. Additional sources discuss iterative refinement and step-by-step verification, which supports the idea of process-oriented critique and improvement rather than single-shot design generation. Collectively, these excerpts provide a coherent evidentiary basis for PRMs as a mechanism to improve design-oriented reasoning and justification in AI systems, including concepts like chain-of-thought prompting and process supervision, and they illustrate tested outcomes and theoretical guidance for these approaches.

- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### existing_applications_and_benchmarks.7
**Confidence:** high

The fine-grained field value describes Self-Refine as an iterative self-critique process that allows a Large Language Model to improve its own initial outputs by generating feedback, identifying weaknesses in its reasoning, and refining the critique to be more thorough. The most directly relevant excerpt explicitly presents Self-Refine as an approach for improving initial outputs through iterative feedback and refinement, which aligns with the notion of self-critique to enhance design critique and reasoning quality. Supporting this, excerpts discussing process supervision and chain-of-thought-like methods show a broader family of techniques aimed at training models to reason more transparently and robustly, by supervising the reasoning steps rather than only the final output. In the context of design critique and incorporating a Design Constitution, these process-oriented approaches provide concrete mechanisms for instilling the capability to justify design decisions, not just generate designs. Additional excerpts on constitutional AI and process supervision illustrate how models can be guided to follow principles, critique their own reasoning steps, and be rewarded for correct intermediate reasoning, all of which reinforce the feasibility and value of self-critiquing or iterative refinement in design reasoning. Taken together, the strongest support comes from the explicit Self-Refine description, with corroboration from process-supervision and design-principled guidance literature that describes training and evaluation strategies for reasoning and critique chains rather than solely output generation.

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### existing_applications_and_benchmarks.3
**Confidence:** high

The fine-grained field value describes an evaluation paradigm where an LLM is used to judge and benchmark UI design outputs by comparison with human expert judgments. Excerpt discussing process supervision as a method to train reward models demonstrates how we can structure an LLM’s evaluation process to produce reliable judgments and to align its critique with human expectations, which directly supports a ‘judge’ role. Excerpt describing the idea that step-by-step reasoning or critique can be used to supervise evaluation and improve the quality of the model’s judgments further substantiates designing an LLM that can justify its assessments rather than merely produce outputs. Constitutional AI-focused excerpts illustrate how an AI system can be guided to align with safety and quality norms without relying solely on punitive labels, which translates to evaluating UI outputs against principled design criteria. UI/UX-focused discussions about the role of LLMs in UI design provide concrete context where such judging capabilities would be applied to assess design outputs, not just generate them, and discussions on UX research in the era of LLMs illuminate how researchers define quality and benchmark AI outputs against human judgments. The broader implications from these sources collectively support constructing and validating an LLM-as-a-Judge for UI design by outlining methodologies for evaluation, rationale-based critique, alignment with human judgment, and practical UI design contexts.

- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and

### existing_applications_and_benchmarks.2
**Confidence:** high

The finegrained field value describes NIMA (Neural Image Assessment) as a neural network designed to predict distributions of human aesthetic judgments and learn to assess aesthetic quality from data patterns, effectively serving as a computational analog for learned taste. The most relevant excerpts explicitly describe NIMA and its core idea: one excerpt explains that NIMA is a model used to assess aesthetic qualities from a large AVA dataset, where images are rated by many people and scored, illustrating how a model can learn aesthetic judgment from distributional patterns without explicit rules. The other excerpt provides an overview of NIMA and mentions the AVA dataset and demonstration of NIMA rankings on test photos, reinforcing the notion that the model learns to evaluate aesthetics based on crowdsourced judgments. Together, these excerpts directly support the field value’s claim that NIMA is a neural assessment model that captures learned aesthetic taste from data, which aligns with the concept of a mismatch signal or aesthetic fluency signal informing a design critique capability. They also illustrate how such a model could provide a computational analogue to human preference signals in design contexts. 

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### training_approaches_for_llm_reasoning.1
**Confidence:** high

The field value describes a training approach where a Process Reward Model (PRM) is used to assess and reinforce each intermediate step in a reasoning chain, rather than only rewarding the final design critique; this approach has been validated in mathematical reasoning and coding domains and is extended in works proposing scalable generation of process rewards. A source discusses process supervision as training a dedicated model to judge each intermediate step as correct or not, contrasting it with outcome-only supervision, which aligns with the idea of evaluating and guiding design reasoning with step-by-step critique. Other sources report that process supervision can yield more reliable reward models by rewarding each correct step, and that such methods have been shown to improve performance in reasoning-heavy tasks by decomposing problems into labeled steps. Additional material presents step-by-step verification and iterative refinement as practical implementations of process-oriented feedback, which can be applied to design critiques by decomposing critique into issues, linking them to design principles, providing evidence, and outlining user impact. A related set of works explores how process rewards can be generated or scaled (e.g., GenPRM) to produce explicit chain-of-thought reasoning with verification steps, indicating theoretical and practical pathways to implement PRM for design reasoning in LLMs. Collectively, these excerpts provide a cohesive view: PRM-based process supervision is a methodologically straightforward approach to enforce rigorous, stepwise critique in design reasoning, and the literature demonstrates both the mechanism (reward at each step) and evidence of its effectiveness in other domains, suggesting applicability to design rationale generation and evaluation. The most directly relevant elements are the explicit description of process supervision and PRM as scoring intermediate reasoning steps, the reported success in math and code domains, and the discussions around stepwise verification and iterative refinement that can be adapted to design critique workflows.

- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized

### training_approaches_for_llm_reasoning.4
**Confidence:** medium

The finegrained field value describes a design-critique oriented approach that grounds LLM reasoning in perceptual and auxiliary signals, and it emphasizes training methods that teach step-by-step justification for design decisions rather than just producing outputs. Highly relevant excerpts discuss process supervision and evaluating intermediate reasoning steps, which provide concrete mechanisms to align an LLM’s internal reasoning with explicit critique about why a design is good or bad. For example, literature on process supervision describes training reward models that judge each intermediate step for correctness, guiding the model to improve the quality of its reasoning chains rather than only outcomes. This directly supports the idea of teaching the model to reason through a design critique step by step and to value each reasoning step, not just the final result. Related work on improving mathematical reasoning with process supervision shows that rewarding correct steps yields more reliable reasoning, which resonates with the goal of developing a similar capability for design rationale. Additionally, methods that enable chain-of-thought reasoning in models, potentially with verification or structured critique, align with the requirement to justify design decisions, not merely generate designs. The Direct Preference Optimization work is relevant insofar as it demonstrates a way to optimize model behavior toward preferred reasoning patterns without relying solely on outcome-focused signals, which complements the idea of shaping the model to provide explicit rationale in design discussions. While these excerpts do not explicitly cover multimodal perceptual signals in the design critique setting, they collectively establish a methodological foundation for training LLMs to reason about why a design choice is good or bad—precisely the kind of step-by-step, principle-grounded critique the finegrained field value envisions. Therefore, the strongest support comes from the emphasis on process supervision and step-level critique, with supportive context from broader preference-based and chain-of-thought oriented approaches which can be extended toward design rationale.

- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We

### existing_applications_and_benchmarks.1.type
**Confidence:** high

The target field value is 'Dataset' under a path that points to an application/benchmark entry. The first excerpt provides a direct reference to a dataset used for aesthetic assessment (the AVA dataset) and describes its scale and how ratings are collected, which aligns with the concept of a dataset within benchmarking for evaluation. The second excerpt explicitly mentions a dataset related to the AVA collection and presents it in the context of NIMA demonstrations, reinforcing the dataset-related aspect in a benchmarking/research setting. Taken together, both excerpts substantively support the notion that a 'Dataset' is a key element in these existing applications and benchmarks, particularly in datasets used for evaluating image aesthetics and model assessment.

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### training_approaches_for_llm_reasoning.2
**Confidence:** high

The strongest support comes from excerpts that introduce and articulate direct preference-optimization techniques for aligning language models with human preferences and expert judgments. One excerpt explicitly describes Direct Preference Optimization and its ability to optimize a model to adhere to human preferences, including the formalization of reward/policy relationships, which directly underpins the idea of preference optimization from designer rankings. A closely related excerpt details the general concept of policy optimization from designer rankings and enumerates methods like RLHF, DPO, and RRHF, directly mapping to the requested family of techniques and their application to encouraging high-quality design critique through learned preferences. Additional excerpts discuss RRHF and DPO as concrete proponents and mechanisms, reinforcing how these methods capture expert judgments and translate them into improved critique or reasoning quality rather than mere design output. Other excerpts introduce process supervision and stepwise verification (process reward models) that complement preference-based approaches by ensuring intermediate reasoning steps are correct, which is relevant to teaching LLMs to reason about why a design decision is good or bad rather than just producing designs. Some excerpts discuss broader RLHF/constitutional AI themes and process-based supervision as foundational directions that contextualize these preference-based methods within the design-judgment and critique domain. Collectively, these sources support the value of using designer-ranked critiques to train models to reason about design quality, the formal mechanisms (RLHF, DPO, RRHF) involved, and the benefits of combining these with process-supervised reasoning to improve the usefulness and reliability of design critiques.

- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.

### existing_applications_and_benchmarks.1.name
**Confidence:** high

Both excerpts directly discuss the AVA dataset in the context of aesthetic visual analysis and neural image assessment. The first excerpt states that the AVA dataset contains about 255,000 images and is rated by a large number of evaluators, which confirms the dataset’s name and its role in aesthetic quality assessment. The second excerpt notes that AVA is used for ranking photos in the large-scale database, reinforcing the association between the AVA dataset and aesthetic evaluation tasks. Together, these passages establish that the AVA (Aesthetic Visual Analysis) Dataset is a recognized dataset used for aesthetic/image assessment research, aligning exactly with the requested field value. 

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### neuroscientific_correlates_of_mismatch.1.neural_signal_type
**Confidence:** high

The field value designates an ERP component, which refers to a brain signal measured via event-related potentials. Excerpt describing the error-related negativity explicitly frames it as an electrophysiological index of cortical error processing, aligning with the ERP concept. Another excerpt notes that a negative deflection in the ERP waveform occurs shortly after an error, directly tying the phenomenon to ERP measurements. Excerpts about mismatch negativity describe a brain response to rule violations and discuss neural signals that are used in ERP paradigms for detecting prediction errors. Additional entries extend the discussion to MMN as a neural signal tied to deviations from expected sensory input, which is classically captured in ERP studies and difference waves, reinforcing the ERP association. Overall, these excerpts collectively support the notion of ERP components as neural correlates of error detection or rule violation, matching the requested ERP component value. Some excerpts broaden to MMN as a broader category of ERP signals, but remain relevant to the ERP framework, given their established role in ERP literature.

- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the

### neuroscientific_correlates_of_mismatch.1.trigger_condition
**Confidence:** high

The finegrained field value describes a trigger condition that corresponds to a mismatch between expectation and outcome, i.e., a deviation signaling that something went wrong. Excerpts that define mismatch-related neural responses align most closely with this concept. Specifically, a neural signal of prediction error evoked by deviants from expected sensory input directly embodies a mismatch between expectation and actual input, making it highly relevant. Related reviews that characterize mismatch negativity as a brain response to rule violations or deviations from established patterns further substantiate the direct link between expectation violation and neural signals of mismatch. A general account of error processing in the brain, such as error-related negativity, also supports the idea that commissions of incorrect actions elicit neural responses signaling error, tying into the broader notion of a mismatch between intended outcomes and observed results. Additional materials on visual mismatch negativity extend the concept to perceptual domains, reinforcing that the mismatch mechanism spans modalities. Finally, a hierarchical discussion of error-related negativities provides broader context about related neural signatures of error and mismatch, though it is somewhat less directly tied to the explicit mismatch trigger than the purely mismatch-focused discussions.

- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect

### training_approaches_for_llm_reasoning.0
**Confidence:** high

The most relevant material directly describes Constitutional AI as a pathway to align AI behavior with a fixed set of principles, such as a Design Constitution built from established design principles, which matches the field value’s concept of adapting Constitutional AI to design principles and using it to critique designs. It also notes that RLHF and harmlessness via AI feedback are core components, which supports the broader idea of training with principles and feedback to improve critical evaluation rather than just producing outputs. Additional excerpts discuss process supervision and improved reward modeling to guide step-by-step reasoning, which aligns with the field value’s interest in training approaches that teach models to reason about why a design decision is good or bad, not merely produce designs. The combination of a constitution-based critique framework plus process supervision and reward-based incentives provides a coherent set of methods for encoding expert design knowledge, guiding critique, and improving design reasoning chains. Together, these excerpts substantiate the proposed CAI adaptation to design principles and its role in design critique, and outline complementary approaches for training models to produce design rationale rather than only output.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### training_approaches_for_llm_reasoning.5
**Confidence:** medium

The most relevant excerpts directly describe inference-time or stepwise reasoning enhancements akin to the proposed inference-time orchestration. One excerpt discusses GenPRM and explicit chain-of-thought reasoning with code verification before, which closely matches the idea of sampling and reranking multiple critique paths at test time to select the best one. Another excerpt explains process supervision that rewards correct intermediate steps, which aligns with guiding reasoning chains rather than only the final output. Additional excerpts describe how process supervision yields more reliable reward models and how step-by-step verification (verify step by step) improves problem solving, both of which underpin a robust inference-time critique and selection mechanism. A related excerpt on iterative refinement (Self-Refine) supports the notion of ongoing improvement through feedback during generation. Complementary excerpts on constitutional AI and related RLHF methods provide broader context about alignment and training strategies that influence how reasoning and critique could be constrained or supervised, though they are not as directly about inference-time orchestration as the top items. Collectively, the strongest support comes from explicit mentions of GenPRM-style CoT reasoning with verification, and process supervision improving intermediate reasoning steps and reward models, which map well to retrieval-grounded critique, multi-agent debate, and test-time reranking. The remaining excerpts provide supportive or contextual background rather than direct evidence of inference-time orchestration techniques.

- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.

### pattern_recognition_theories.0.application_to_expertise
**Confidence:** high

The most relevant information directly describes chunking as semantic units or patterns that are recognized at a glance, which maps closely to how an expert designer perceives UI structures as composed of higher-level chunks like a header navigation or a product card. This supports the idea that expertise reduces cognitive load by perceiving complex layouts as meaningful units rather than arbitrary collections of elements. A source on designerly ways of knowing further reinforces that design expertise involves coherent, principled understanding of design elements and their relationships, aligning with how an expert would interpret UI components as structured chunks rather than just individual widgets. The discussion of a mismatch signal being triggered when an element violates an established chunk structure provides a mechanism for how experts detect design conflicts: when a component appears in a context where its style or placement disrupts the chunk integrity, a mismatch is perceived, signaling an error. This aligns with the notion of pattern-recognition-based error detection in expert cognition, dovetailing with theories of prediction error and priors that describe how mismatches between expectations and observations are processed. Additional excerpts introduce the general idea of prediction error and mismatch negativity as a neural or theoretical marker of detecting deviations from expected patterns, which can be analogized to detecting UI pattern violations in expert design. Together, these excerpts support the central claim that expert UI designers rely on chunked, pattern-based representations and are sensitive to mismatches that indicate violations of established design structures, and they outline related training or reasoning approaches (design rationale, step-by-step critique, and principled design supervision) that could be studied for learning or modeling such expertise.

- [Chunking](https://www.chessprogramming.org/Chunking)
  > Oct 1, 2007 — A chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.

### training_approaches_for_llm_reasoning.3
**Confidence:** high

The finegrained field value centers on training approaches that prioritize reasoning before verdict (rationale-first supervision) and iterative refinement (Self-Refine) to improve design critique and faithfulness of explanations. Directly supporting this, excerpts describing process-based supervision explain training models to judge intermediate steps or reasoning chains (process rewards and stepwise verification) which aligns with encouraging explicit reasoning as part of the model’s design critique process. The Self-Refine excerpt explicitly introduces iterative improvement of outputs by re-evaluating and refining the model’s own reasoning, which mirrors the requested Self-Refine approach and its faithfulness improvements. Additional excerpts discuss related paradigm shifts that reinforce the connection between reasoning steps and outcomes, such as demonstrations that reward models focusing on correct reasoning steps can yield more reliable problem solving and the step-by-step verification framework. Together, these excerpts substantiate the concepts of supervising the reasoning chain (CoT-style prompting) and employing iterative critique/refinement to produce higher-quality, more faithful design rationale rather than merely final outputs. The combination of these sources directly maps to the described approach name, abbreviation, and core principles in the finegrained field value, and it describes suitability for design critique with emphasis on showing the reasoning process and improving its faithfulness.

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before

### existing_applications_and_benchmarks.1.relevance_to_design_ai
**Confidence:** medium

The finegrained field value posits that a methodology built around large-scale human ratings for aesthetics can be transferred to training AI to judge the aesthetic quality of UI/UX designs. The second excerpt documents a Google Research post describing NIMA and shows that curated test images are scored by humans to produce aesthetic judgments, illustrating a scalable methodology of learning from human ratings. The first excerpt presents the original AVA dataset and explains that images are rated by many people, providing a large, human-annotated basis for training models to assess aesthetics. This directly supports the idea that the core approach—leveraging crowd-sourced aesthetic judgments—can be transferred from photography to UI/UX design evaluation, aligning with the field value’s claim about transferability of the methodology. The connection is strengthened by the emphasis on scoring images based on perceived aesthetics, which is conceptually parallel to scoring UI/UX designs according to human preferences.

- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in

### foundational_design_theories_on_intuition.1.key_concept
**Confidence:** high

The field value corresponds to a well-known design theory concept expressed explicitly as 'Designerly Ways of Knowing.' Excerpts that carry this exact phrasing and situate it within design theory (e.g., as a theoretical basis for treating design as a coherent discipline) are directly aligned with the requested field value. One excerpt states the work is a foundational piece in a series aimed at establishing theoretical bases for treating design as a coherent whole, and the other uses the same title, reinforcing that it is the same concept being discussed in a scholarly context. These passages directly support the notion of 'Designerly Ways of Knowing' as a key epistemological concept in design studies. Other excerpts discuss related ideas (reflective practice, decision models) but do not name or center on the precise concept, so they are less directly connected to the requested field value.


- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent

### neuroscientific_correlates_of_mismatch.0.concept_name
**Confidence:** high

The target field value identifies Mismatch Negativity (MMN) as the concept of interest. The most directly supportive content comes from sources that name MMN explicitly as a brain response to rule violations established by a sequence of sensory stimuli, i.e., a prediction-error-like signal to deviants from expected patterns. One excerpt states that MMN is a brain response to violations of a rule established by sensory stimuli, which directly defines MMN and its core mechanism. Another excerpt characterizes MMN as a neural signal of prediction error evoked by deviants from expected sensory input, directly aligning with the MMN concept. A third excerpt provides a general definition of MMN, describing its latency window in difference waveforms, reinforcing the MMN phenomenology. A fourth excerpt discusses visual MMN, extending the MMN concept to a different sensory modality and thus supporting the broader MMN framework, while still centering on the mismatch detection phenomenon. Collectively, these excerpts coherently map to the field value by defining MMN, its role as a mismatch/prediction-error signal, and its occurrence across modalities, with the primary emphasis on auditory MMN as the canonical instance.

- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the

### computational_models_for_wrongness_detection.2.model_name
**Confidence:** high

The strongest support comes from excerpts explicitly naming process reward modeling (PRM) and describing how PRMs provide fine-grained feedback on intermediate steps or processes, which aligns with the concept of a process-oriented reward mechanism for reasoning and evaluation. One excerpt notes that process reward modeling offers potential by supplying detailed feedback on intermediate steps, which directly supports the idea that PRMs are a deliberate training approach for improving reasoning processes. Another excerpt discusses a survey of PRMs across the full loop of data generation, modeling, and application, reinforcing the notion that PRMs are a distinct, structured approach to reward signal design beyond outcome-only supervision. A third excerpt reinforces this by explicitly stating that PRMs can be used to train reward models in domains requiring reasoning, such as mathematics, illustrating the practical utility and implementation of PRMs as a training paradigm. The remaining excerpts address constitutional AI and RLHF, which are related to alignment and preference-based feedback, providing broader context for how reward signals and design reasoning can be guided, supervised, or constrained, but they are less directly about PRMs themselves. Taken together, these excerpts support the field value by detailing the existence, scope, and utility of Process Reward Models as a concrete approach to training models with process-level supervision and reward signals rather than solely outcome-oriented goals.

- [Small LLMs Can Master Math Reasoning with Self-Evolved ...](https://arxiv.org/html/2501.04519v1)
  > Jan 8, 2025 — As for the reward model, process reward modeling (PRM) shows a great potential by providing fine-grained feedback on intermediate steps (Lightman et al., 2023)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.

### neuroscientific_correlates_of_mismatch.1.description
**Confidence:** high

The field value asserts that the Error-Related Negativity (ERN) is an electrophysiological index of cortical error processing, emerging approximately 50–100 ms after an error, with source localization pointing to the anterior cingulate cortex and precedence before conscious awareness of the error (which is linked to a later component, Pe). The most directly supportive information comes from an excerpt that explicitly identifies ERN as the widely investigated electrophysiological index of cortical error processing, which confirms its domain and significance. Another excerpt describes ERN as a negative deflection in the ERP waveform occurring roughly 50–100 ms after an error and associates it with error processing and, by context, its neural generators, which aligns with the timing and functional interpretation in the field value. These two excerpts together provide strong, direct alignment with the field value. The remaining excerpts discuss mismatch negativity (MMN) and related constructs, which are related phenomena but do not directly support the specific ERN-focused statements about timing, cortical source, and pre-conscious awareness. Therefore, they are less relevant to the precise finegrained value sought here.

- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect

### neuroscientific_correlates_of_mismatch.0.description
**Confidence:** high

The field value identifies MMN as an electrophysiological brain response that indexes pre-attentive detection of deviations from established regularities in sensory sequences, reflecting an automatic process for detecting violations of learned rules or patterns. This is directly supported by the statement that the mismatch negativity is a brain response to rule violations established by a sequence of sensory stimuli, and by the characterization of MMN as a neural signal of prediction error evoked by deviants from expected sensory input. Additional related descriptions clarify that MMN is defined in terms of a negative deflection within a typical latency window, reinforcing the interpretation of MMN as a pre-attentive mismatch detector. While discussions of ERN and broader error-related negativities touch on error processing, they are less direct substitutes for MMN’s pre-attentive mismatch detection and thus are considered supporting but secondary evidence.

- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect

### neuroscientific_correlates_of_mismatch.1.relevance_to_design_mismatch
**Confidence:** high

The most directly relevant information identifies the ERN as the error-processing signal in the brain: it is the error-related negativity and is described as the most widely studied electrophysiological index of cortical error processing. This supports the idea that the ERN could function as the immediate, pre-conscious gut feeling of wrongness a designer experiences when observing a layout. The timing detail—occurring after an error is committed—further supports the notion that this neural signal precedes deliberate, conscious analysis. Related discussions of the mismatch negativity (MMN) provide context for how the brain detects violations of expectations or rules, which helps differentiate general prediction error signals from the specific error-processing signal associated with ERN. This supports the interpretation that the ERN, rather than MMN, is the candidate neural correlate for rapid error detection in design judgments, aligning with the proposed role of pre-articulation gut feelings in evaluating design elements like contrast or grid integrity. Taken together, these excerpts substantiate a plausible neural mechanism (ERN) for the immediate sense of wrongness in design evaluation, while situating it among broader neural mismatch signals to clarify its specificity to error processing rather than generic rule-violation responses.

- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the

### pattern_recognition_theories.0.theory_name
**Confidence:** high

The target field value refers to a named cognitive mechanism, Chunking Theory. The clearest support comes from an excerpt that defines chunking as a group of pieces forming a semantic unit or meaningful pattern that experts recognize at a glance, which directly aligns with the concept of chunking as a cognitive organization principle. This excerpt explicitly uses the term and provides a concrete example of how chunks function in expert pattern recognition, aligning with the hypothesis that chunking is a theory of structuring information into meaningful units. Other excerpts discuss related topics like prediction errors or mismatch phenomena, which are thematically adjacent but do not directly define or exemplify Chunking Theory, and thus offer weaker or indirect support for the specific theory name in question.

- [Chunking](https://www.chessprogramming.org/Chunking)
  > Oct 1, 2007 — A chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.

### computational_models_for_wrongness_detection.2.mechanism
**Confidence:** medium

The finegrained field value describes a model that learns to assign a reward to each reasoning step based on its correctness and logical soundness, enabling detection of wrongness in a chain of thought without a fixed checklist. The most directly supporting passages discuss process supervision and process reward models (PRMs) as mechanisms to obtain fine-grained feedback on intermediate steps, improving reliability of reward signals beyond outcome-only supervision. This aligns with the idea of providing per-step signals rather than global success/failure. Additional support comes from mentions of PRMs providing fine-grained feedback on intermediate steps and the potential of using process data to guide model training. Contextual alignment is evident in references to constitutional AI and related alignment methods, which discuss shaping model behavior and safety through principled feedback and reward structures, though they are not explicitly about per-step reward assignment for wrongness detection. Taken together, these excerpts support the feasibility and benefits of a reasoning-chain reward mechanism for detecting wrongness in design critiques and similar reasoning tasks, even if they do not spell out every technical detail of the exact proposed mechanism.

- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [Small LLMs Can Master Math Reasoning with Self-Evolved ...](https://arxiv.org/html/2501.04519v1)
  > Jan 8, 2025 — As for the reward model, process reward modeling (PRM) shows a great potential by providing fine-grained feedback on intermediate steps (Lightman et al., 2023)
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.

### foundational_design_theories_on_intuition.1.theorist_name
**Confidence:** high

To confirm the hypothesized theorist value, I identify excerpts that state the author associated with the key design theory text. The most direct match is an excerpt stating 'Designerly ways of knowing - Open Research Online' followed by '(source: ... by N Cross)'. This confirms that the theorist in question is Nigel Cross, since 'N Cross' is an abbreviation for Nigel Cross and the work is explicitly attributed to him. Another excerpt similarly lists 'Designerly ways of knowing' with the author 'N Cross', reinforcing the connection between the field value and the referenced designer. Other excerpts discuss related thinkers (such as Donald Schön) and do not mention Nigel Cross, thus they do not directly support the target finegrained field value. Collectively, these two excerpts provide clear, corroborating evidence that Nigel Cross is the theorist associated with the queried intuition about foundational design theories.

- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent

### existing_applications_and_benchmarks.1.description
**Confidence:** high

The target field describes a large-scale dataset of roughly 255,000 images, each rated for aesthetic qualities by a large group of amateur photographers, with an average of about 200 ratings per image. The first excerpt directly states that the AVA dataset contains about 255,000 images and that each photo is scored by an average of 200 people, which aligns precisely with the specified numbers. The second excerpt reinforces the context by describing NIMA and AVA and showing example photos that are ranked by the same dataset, corroborating the scale and evaluation approach. Taken together, these excerpts directly support the existence, scale, and rating process of the dataset described in the finegrained field value.

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### existing_applications_and_benchmarks.6
**Confidence:** high

The most directly relevant material discusses process supervision and PRMs (process reward models), which align with the idea of training models through structured, stepwise reasoning about preferences and judgments rather than just output quality. A survey of process reward models provides a broad taxonomy and full-loop guidance on data generation, model training, and deployment of process-based supervision, directly supporting the concept of learning from intermediate reasoning steps to better capture designer preferences. Follow-on works demonstrate concrete benefits of process supervision in improving reasoning performance, which underpins the notion of reinforcing design critique chains rather than merely producing designs. Constitutional AI literature is highly relevant because it centers on shaping harmless, aligned AI behavior through self-improvement and preference-aligned feedback, echoing the goal of aligning a design critic’s outputs with expert designer judgments. Related studies on stepwise verification and iterative refinement illustrate practical mechanisms for ensuring the model’s reasoning is transparent and corrigible, which is essential when the model must critique or justify design decisions. Contextual UI/UX literature shows how these techniques translate into real-world design guidance and critique, further supporting the applicability of such training paradigms to design reasoning. Overall, the excerpts collectively corroborate the viability and benefits of process-oriented, preference-aligned, and stepwise reasoning approaches in training models for design critique and principled design reasoning.

- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and

### pattern_recognition_theories.0.core_concept
**Confidence:** high

The target field value posits that expert performance emerges when information is organized into large, meaningful patterns or 'chunks' stored in long-term memory, enabling experts to perceive and manipulate high-level patterns rather than many individual details. The most directly relevant excerpt explicitly defines chunking as a group of pieces that forms a semantic unit, a meaningful pattern recognized at a glance by a master, which directly supports the idea of expertise arising from chunk-based pattern recognition. The remaining excerpts discuss broader cognitive theories such as predictive processing and general design cognition. While they discuss pattern processing and cognitive evaluation, they do not directly establish chunking as the mechanism by which expertise is formed or stored in long-term memory, making them less supportive but contextually related. The integration of design-oriented discussion on expertise and coherent knowledge systems provides ancillary support but is not as tightly aligned with the core claim about chunk-based pattern organization in long-term memory.

- [Chunking](https://www.chessprogramming.org/Chunking)
  > Oct 1, 2007 — A chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors

### computational_models_for_wrongness_detection.0.model_name
**Confidence:** high

The target field value is the model name used in computational models for detecting wrongness or assessing design-related perception. The excerpt explicitly presents a model named "NIMA: Neural Image Assessment". This directly satisfies the field value and confirms that the model name in question is NIMA. The surrounding content describes the AVA dataset and how images are rated for aesthetic qualities, which supports the context of a model dedicated to image quality assessment but does not introduce another model name that would contradict or dilute the match. Therefore, this excerpt is the most relevant and directly supports the field value. 

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in

### neuroscientific_correlates_of_mismatch.0.trigger_condition
**Confidence:** high

The most directly relevant content describes the mismatch negativity as a neural response to violations of an established rule formed by a sequence of sensory stimuli, which matches the notion of a deviation or violation of a rule in a sensory sequence. It explicitly states that MMN arises when there is a violation of a rule established by a sequence of sensory inputs, such as deviations in an auditory stream. Another closely related excerpt defines mismatch negativity as a neural signal of prediction error evoked by deviants from expected sensory input patterns, aligning with the concept of detecting a deviation from an expected rule in sensory sequences. A general definition of MMN as a negative deflection in difference waveforms further supports that MMN indices rule-based deviations in sensory processing, even though it frames the measurement more broadly. Additional excerpts discuss error-related negativity and related rapid neural responses to errors, which, while distinct from MMN, share the broader theme of automatic detection of deviations from expected outcomes, contributing context about how the brain marks incorrect or unexpected events. Another excerpt on visual mismatch negativity extends the idea to visual features, illustrating that the mismatch/violation concept applies beyond audition and supports the general notion of a rule-based deviation in sensory processing. Finally, there is content on the hierarchy of error-related negativities, which, like ERN, relates to post hoc evaluation of actions and outcomes, providing a broader framework for understanding rapid deviation signaling in the brain. Overall, the strongest support comes from explicit statements that MMN reflects detection of rule violations or prediction errors in sensory sequences, which directly matches the fine-grained field value describing a deviation or violation of a rule established by a sequence of sensory stimuli.

- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the

### computational_models_for_wrongness_detection.0.mechanism
**Confidence:** medium

The fine-grained field value describes a deep CNN trained on a large-scale AVA dataset to capture a nuanced, human-like sense of aesthetics by predicting the full distribution of scores rather than a single score. The provided excerpt discusses NIMA (Neural Image Assessment), notes that the AVA dataset contains hundreds of thousands of images rated by many evaluators, and that each photo is scored by an average of numerous people. This directly aligns with the core idea of leveraging a CNN trained on a large-scale human-judged dataset to model aesthetic assessment. While the excerpt does not explicitly state that NIMA predicts the full distribution of scores, it strongly supports the general mechanism of learning from broad human judgments on AVA and using a CNN to perform aesthetic assessment, which is consistent with the described field value. Given this alignment but with a caveat about the explicit distribution-predicting claim, the excerpt provides partial support for the fine-grained field value.

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in

### foundational_design_theories_on_intuition.1.seminal_work
**Confidence:** high

The field value corresponds to the well-known 1982 work by Nigel Cross titled 'Designerly Ways of Knowing'. The most relevant excerpts explicitly present this exact work title, including both the Open Research Online entry and the ScienceDirect listing, which state the phrase 'Designerly Ways of Knowing' and attribute it to Cross (1982). These excerpts directly establish the specific seminal work as the object of interest. The other excerpts discuss related concepts in design thinking and professional practice (e.g., reflective practice, tacit knowledge, decision models) but do not mention the exact title in question, so they provide contextual background but do not substantively confirm the finegrained field value.

- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent

### pattern_recognition_theories.0.key_proponents
**Confidence:** low

The field value relies on two specific researchers as proponents of pattern-recognition-based theories. The clearest support in the excerpts is a description of chunking as a semantic unit that experts recognize quickly in chess, phrased as: 'a chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.' This directly aligns with the general idea of chunking in pattern-recognition-based models of expertise, which is strongly associated with Chase (for chunking) and Simon (for cognitive modeling of expertise). However, the excerpts do not name William Chase or Herbert Simon, nor do they explicitly attribute chunking theory to them. Therefore, while there is a direct conceptual link to the chunking idea central to Chase & Simon’s work, the evidence does not explicitly confirm their authorship or endorsement. The other excerpts discuss adjacent topics (predictive processing, MMN, designerly ways of knowing) that touch on cognition and design but do not substantively identify the specific proponents in question.

- [Chunking](https://www.chessprogramming.org/Chunking)
  > Oct 1, 2007 — A chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.

### neuroscientific_correlates_of_mismatch.1.concept_name
**Confidence:** high

The field value refers to Error-Related Negativity (ERN), a well-established ERP index for cortical error processing. The most directly supporting material notes that the error-related negativity remains the most widely investigated electrophysiological index of cortical error processing, establishing ERN as a key marker of error processing. Additionally, a subsequent excerpt defines ERN as a negative deflection in the ERP waveform occurring roughly 50–100 ms after an error is made and states it is thought to reflect the neural processing of error commission. Together, these pieces directly identify ERN, its timing, and its functional interpretation within error processing frameworks. Other excerpts discuss related but distinct phenomena like mismatch negativity (MMN), which describes responses to violations of a rule in sensory input and thus provide contrast rather than direct evidence about ERN; while informative about prediction errors in general, they do not describe ERN itself, reducing their direct relevance to the specified finegrained field value. Alignment: ERN is the central concept across the most relevant excerpts with explicit statements about ERN being the key error-processing ERP component and its timing, while the remaining excerpts clarify related but separate neural signatures (MMN) that are not the focus of the current field value, thereby offering contextual contrast rather than direct support for ERN alone.

- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the

### neuroscientific_correlates_of_mismatch.0.neural_signal_type
**Confidence:** high

The most relevant excerpts explicitly tie the discussed neural phenomena to ERP-related concepts. One excerpt defines mismatch negativity as a negative deflection in difference waveforms, which is a direct description of an ERP component. Another excerpt connects error-related negativity to the ERP waveform, foregrounding ERP as the methodological frame for analyzing neural signals in error processing. A third excerpt discusses visual mismatch negativity in a similar ERP-context through difference waves, reinforcing the ERP association for MMN-like components. Other excerpts describe mismatch negativity as a brain response to rule violations, aligning with ERP-based interpretations of predictive neural signals. Finally, several sources describe MMN as a neural signal of prediction error, situating MMN within ERP literature even if the acronym isn’t repeated with ERP in every sentence. Taken together, these excerpts provide strong support that the target value (an ERP component) corresponds to MMN/vMMN and ERN-related ERP phenomena in the neural literature.

- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.

### rationalization_and_explanation_models.1.item_type
**Confidence:** high

The most relevant excerpts directly discuss methods or frameworks for generating or improving explanations and rationales in AI systems. The opening excerpt describes selective rationalizations as a way to improve explainability by producing rationales. This is a clear framework for how to structure explanations. The next excerpt concerns a method to rationalize predictions via adversarial information, which is another explicit framework for explanation generation. Following that, one excerpt introduces a generative process reward model that enables explicit chain-of-thought reasoning with verification, outlining a concrete technique for reasoning transparency. Another excerpt discusses process supervision to improve reasoning in mathematical tasks, which is a documented framework for guiding reasoning steps. A further excerpt presents Self-Refine, an iterative refinement technique that enhances outputs through feedback loops, another practical method to improve explanations or design reasoning. The remaining excerpt focuses on a step-by-step verification approach to problems, which is a technique aligned with structured reasoning and justification. Collectively, these excerpts map to concrete frameworks and techniques for producing, supervising, or refining rationales and explanations in AI systems, directly addressing the finegrained field value.

- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly

### computational_models_for_wrongness_detection.2.key_proponents
**Confidence:** medium

The finegrained field value identifies the AI research community (e.g., OpenAI, Google DeepMind) as the key proponents behind wrongness-detection and design-reasoning architectures. The most directly relevant excerpts discuss Constitutional AI and related alignment methods, which are central to who advances these ideas in the AI research community. One excerpt explains Constitutional AI as a framework for making AI systems helpful, harmless, and honest, and notes that most AI alignment methods use reward-models and preference-based updates, which aligns with the broader community of researchers developing and evaluating such approaches. This directly supports the notion that prominent players in AI research contribute to these concepts. A second excerpt reiterates the Constitutional AI concept and discusses harmlessness from AI feedback, reinforcing the role of alignment-focused research groups in shaping these design principles. In contrast, the other excerpts center on process reward modeling and mathematical reasoning enhancement, which are valuable but less directly tied to identifying the key proponents in the AI research community for wrongness-detection and design reasoning architectures.

- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.

### foundational_design_theories_on_intuition.0.description
**Confidence:** high

The fine-grained field value centers on Schön's notion of professionals thinking in practice, specifically the idea of knowing-in-action as tacit knowledge expressed through performance, and the mechanism of reflection-in-action that prompts a pause to analyze an unexpected cue and experiment with a new course of action. Excerpt at the start explicitly introduces Schön’s concept of reflection-on-action and frames reflective practice as the ability to reflect, which supports the idea of tacit, action-bound knowledge. The next excerpt reinforces the claim that professional knowing is largely tacit and action-based, aligning with the notion of knowing-in-action as something expressed through performance rather than conscious deliberation. Other excerpts discuss designerly ways of knowing and design thinking in professional practice, which are consistent with the application of Schön’s ideas to design contexts and corroborate the emphasis on tacit, practice-based cognition in designers. A related discussion on rapid decision models (RPD) provides context on decision-making under uncertainty, which complements the broader landscape of design judgment but is not central to Schön’s framework; it nonetheless does not contradict the core claims about reflection-in-action and tacit knowledge. Collectively, the statements from these excerpts map onto the described elements: tacit knowledge expressed in action (knowing-in-action), and the triggering mechanism of reflection-in-action when something feels off, leading to investigation and adaptation.

- [The Reflective Practitioner Donald A Schon](https://lan-portal.uob.edu.ly/url/DOC/9E641Y0991/the-reflective__practitioner_donald__a_schon.pdf)
  > Mar 17, 2026 — Donald Schön&#039;s 1983 book The Reflective Practitioner introduced concepts such as reflection-on-action. Reflective practice is the ability to reflect on
- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you

### foundational_design_theories_on_intuition.0.key_concept
**Confidence:** high

The field value equals the core ideas of knowing-in-action and reflection-in-action from design theory. An excerpt that asserts that our knowledge resides in action and emphasizes tacit knowing-in-action directly supports the field value by linking knowledge to practice and action without explicit articulation. Another excerpt discusses reflection-on-action, which, while focusing on post-hoc reflection, is tightly connected to the practice of recognizing and refining what designers know through their actions. Additional excerpts expand on the broader notion of designerly ways of knowing, situating tacit and experiential understanding within design studies, which contextualizes the field value within the wider discourse on design reasoning and intuition. A final excerpt on rapid decision models centers on decision-making processes rather than the nuanced know-how embedded in design practice, offering less direct support but useful as contextual contrast. Together, these excerpts collectively ground the field value in the established concepts of tacit knowledge in design practice and reflective reasoning, with the strongest support coming from explicit claims about tacit knowing-in-action and action-based knowledge.

- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every
- [The Reflective Practitioner Donald A Schon](https://lan-portal.uob.edu.ly/url/DOC/9E641Y0991/the-reflective__practitioner_donald__a_schon.pdf)
  > Mar 17, 2026 — Donald Schön&#039;s 1983 book The Reflective Practitioner introduced concepts such as reflection-on-action. Reflective practice is the ability to reflect on
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you

### rationalization_and_explanation_models.1.item_name
**Confidence:** high

The finegrained field value corresponds to a labeled concept of Interventional/Selective Rationalization. The most directly relevant excerpt introduces selective rationalizations as a method to improve explainability by extracting a sub-sequence of the input, i.e., rationales, which aligns exactly with the notion of selective justification or justification-based design reasoning. Additional excerpts discuss rationalizing model predictions and approaches to train models to produce step-by-step reasoning or design critique, which provide broader methodological context for how rationale-focused outputs can be generated or supervised. One excerpt describes process-supervision that rewards each correct step of reasoning, which supports the idea of teaching models to reason about why a decision is good or bad rather than only producing outputs. Another excerpt explicitly mentions chain-of-thought reasoning with verification components, further reinforcing how explicit reasoning traces can be integrated into model behavior. A further work on iterative refinement with self-feedback suggests improving the quality of rationales through iterative revision, which complements the goal of robust, interpretable justification. Collectively, these excerpts support the concept of interventional/selective rationalization as a design principle for making model reasoning more explicit and verifiable, with direct emphasis on selecting and validating rationales and on structured, stepwise critique rather than only producing outcomes.

- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### foundational_design_theories_on_intuition.1.description
**Confidence:** high

The core field value centers on Cross’s assertion that design is a distinct discipline with its own tacit, non-verbal knowledge, often demonstrated through action such as sketching, and that this encompasses an intuitive ability to synthesize information, solve ill-defined problems, and make qualitative judgments, including a pre-verbal sense of whether a design works. Directly quoted or paraphrased language from the referenced Cross papers aligns with these points by describing designerly ways of knowing as a theoretical basis for design as a coherent practice, and by emphasizing tacit, action-based expertise that underpins intuition in design judgment. Related lines from Schon reinforce the idea that professional knowing often resides in tacit knowledge and action rather than explicit verbalizable rules, which broadens the interpretation of ‘designerly knowledge’ to include reflection-on-action and tacit competencies. While the RPD model discusses rapid decision-making and intuition in design contexts, it is less central to the explicit claim about designerly knowledge being tacit and demonstrated through action, but it provides ancillary support for how quick, non-verbal judgments may function in design thinking. Altogether, the strongest support comes from Cross’s assertion about tacit, non-verbal, action-based designerly knowledge, with supportive context from Schon on tacit professional knowing, and peripheral contextualization from RPD on rapid, intuition-driven judgments in design scenarios.

- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every
- [The Reflective Practitioner Donald A Schon](https://lan-portal.uob.edu.ly/url/DOC/9E641Y0991/the-reflective__practitioner_donald__a_schon.pdf)
  > Mar 17, 2026 — Donald Schön&#039;s 1983 book The Reflective Practitioner introduced concepts such as reflection-on-action. Reflective practice is the ability to reflect on
- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you

### foundational_design_theories_on_intuition.2.seminal_work
**Confidence:** high

The finegrained field value is the exact title of the Recognition Primed Decision (RPD) Model of Rapid Decision Making. The most relevant excerpt directly presents this exact model title in the context of rapid decision making, confirming the existence and framing of the RPD model. Other excerpts discuss related ideas in design thinking and reflective practice but do not mention the RPD model or its specific title, offering only tangential context. Therefore, the excerpt that explicitly names the model provides clear, direct support for the field value, while the others contribute supportive but non-specific background on related design cognition concepts.

- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you

### existing_applications_and_benchmarks.0.name
**Confidence:** high

The target field value is 'Ferret-UI'. Among the excerpts, only the first one explicitly mentions 'Ferret-UI' as part of describing a paper about improving UI-related models, stating: 'we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens...'. This directly supports the existence and naming of Ferret-UI within an applications/benchmarks context. The other excerpts discuss LLM roles in UI/UX design more generally and do not reference Ferret-UI, thus adding no direct support for the specific field value.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning

### neuroscientific_correlates_of_mismatch.0.relevance_to_design_mismatch
**Confidence:** high

The core concept in the field value is that MMN functions as a pre-attentive neural indicator of mismatch when a rule is violated, which in turn could underpin an expert designer’s pre-verbal sense that something is off. Excerpt explaining MMN as a brain response to violations of a rule established by a sequence of sensory stimuli directly supports the idea that MMN embodies a pre-conscious detection of mismatch. Another excerpt explicitly states that MMN is a neural signal of prediction error evoked by deviants from the expected sensory pattern, which aligns with the idea of an automatic, rule-based mismatch check occurring before conscious reasoning. A general definition of MMN further reinforces that it is a negative deflection associated with mismatches, consolidating the claim that MMN provides a neural basis for detecting rule violations. Content discussing visual mismatch negativity (vMMN) extends the concept from auditory to visual domains, illustrating that such mismatch signals are not limited to one modality and could underlie perceptual assessments in design visuals as well. Related excerpts on error-related negativity (ERN) discuss broader error processing in cortex and its ERP correlates, which complements the understanding of rapid, pre-conscious detection of deviations, although ERN is more about post-error awareness than pre-verbal mismatch signals. Taken together, these excerpts form a coherent support base for the claim that MMN-like signals provide a neural mechanism for early, automatic mismatch detection that could map to expert design judgment and implicit rule adherence, even prior to explicit articulation.

- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The Neural Responses of Visual Complexity in the Oddball ...](https://www.mdpi.com/2076-3425/12/4/447)
  > by R Hu · 2022 · Cited by 20 — To explore whether the visual complexity is a visual feature that causes the visual mismatch negativity (vMMN), we calculated the difference wave of the
- [Error awareness and the error-related negativity](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2012.00088/full)
  > by JR Wessel · 2012 · Cited by 282 — The error-related negativity (ERN) remains the most widely investigated electrophysiological index of cortical error processing.
- [The hierarchical structure of error-related negativities elicited ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC7808877/)
  > by T Suzuki · 2021 · Cited by 9 — The ERN refers to a negative deflection in the ERP waveform that occurs approximately 50–100 ms after the commission of an error. It is thought to reflect

### foundational_design_theories_on_intuition.2.theorist_name
**Confidence:** high

The target field aims to identify the theorist name connected to foundational intuition theories in design. The excerpt describing the Recognition Primed Decision (RPD) Model clearly attributes a leadership role to Gary A. Klein in formulating this intuition-based decision framework. This directly supports the field value by tying a specific theorist to an established intuition-centric design theory. The remaining excerpts discuss related concepts like reflection-on-action and tacit knowledge but do not provide a direct attribution to Gary Klein, making them only tangential context. Therefore, the strongest and most relevant support comes from the excerpt that explicitly names Klein in the context of rapid decision-making and intuitive judgment under design-related considerations.

- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you

### existing_applications_and_benchmarks.0.relevance_to_design_ai
**Confidence:** high

The most relevant excerpt directly mentions Ferret-UI as a new model tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning. This aligns with the finegrained field value’s claim that Ferret-UI is a direct application of MLLMs to the UI domain and demonstrates the feasibility of models that can perceive and reason about screen layouts, laying the foundation for critiquing design decisions based on visual evidence from screenshots. The other excerpts discuss the broader role of large language models in UI/UX design and UX research in the age of LLMs. They provide contextual support that LLMs have a growing role in UI/UX and in defining quality/ prompts for design work, which is consistent with the idea of applying LLM-based reasoning to design critique, but they do not reference Ferret-UI specifically. Taken together, these excerpts support the general feasibility of design-oriented reasoning via AI, with the strongest, most direct evidence being the Ferret-UI excerpt. The reasoning chain here connects the existence of a UI-focused model with its capability to perceive and reason about layouts, which underpins the field value describing critique based on visual evidence from screenshots.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.

### foundational_design_theories_on_intuition.2.key_concept
**Confidence:** high

The target concept is the Recognition-Primed Decision (RPD) Model. The most direct support comes from an excerpt that explicitly names and describes an RPD model of rapid decision making, which matches the requested fine-grained field value. Other excerpts discuss related topics in design cognition (e.g., reflective practice, tacit knowledge, designerly ways of knowing) but do not mention RPD by name or describe the same explicit model, so they provide contextual but not direct support for the specific term. Therefore, the excerpt describing the RPD model provides the strongest, most relevant evidence, while the others offer contextual background about expertise, intuition, and design thinking without confirming the exact model in question.

- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you

### existing_applications_and_benchmarks.0.type
**Confidence:** high

The specific finegrained field value is looking for information about multimodal LLMs (MLLMs) within existing applications and benchmarks. The excerpt that most directly supports this is the one describing Ferret-UI as a new MLLM tailored for enhanced understanding of mobile UI screens, with capabilities like referring, grounding, and reasoning. This directly matches the notion of a Multimodal LLM designed for UI understanding and multimodal grounding. The other two excerpts discuss the broader role of large language models in UI/UX design and UX research in the era of LLMs. While they do not explicitly state Multimodal LLMs, they provide context that LLMs are being integrated into design workflows and research practices, which is consistent with or supportive of the relevance of multimodal LLMs in design-oriented applications. Specifically, the first excerpt reinforces the core concept of an LLM-based system tailored for multimodal UI understanding, while the subsequent excerpts discuss the broader ecosystem and considerations around LLM-enabled design work, which helps situate Multimodal LLMs within current research and practice.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.

### rationalization_and_explanation_models.1.originators
**Confidence:** medium

The target field value specifies that AI researchers (as cited in a 2023 EMNLP paper) are the originators. The excerpt describing Interventional Rationalization explicitly references a 2023 EMNLP publication and discusses selective rationalizations in neural networks, which is the closest direct linkage to identifying AI researchers as originators within that particular EMNLP 2023 paper. Other excerpts discuss related techniques (step-by-step verification, process supervision, chain-of-thought, etc.) but do not directly anchor originators to a 2023 EMNLP citation, making them less relevant to this precise field value. Therefore, the most relevant excerpt is the one that ties AI rationalization concepts to a 2023 EMNLP work, supporting the attribution to AI researchers cited in that paper.

- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.

### computational_models_for_wrongness_detection.2.purpose
**Confidence:** high

The most directly relevant excerpt discusses a reward modeling approach that provides fine-grained feedback on intermediate steps in mathematical reasoning, which aligns with the goal of scoring intermediate steps in a chain of reasoning to identify faulty logic. The second excerpt notes that process supervision can yield more reliable reward models in reasoning domains, reinforcing the idea of evaluating intermediate reasoning rather than only final outcomes. A third excerpt surveys process reward models, detailing how to generate process data and leverage PRMs, which supports the notion of evaluating stepwise reasoning. The remaining excerpts address constitutional AI and AI alignment methods (RLHF, design principles, and harmlessness) as overarching training and evaluation frameworks; while not exclusively about scoring intermediate steps, they are relevant to the broader question of how to guide and evaluate reasoning processes in models. Collectively, these excerpts support the concept of training models to assess intermediate reasoning steps to detect and correct faulty logic, rather than merely judging final results.

- [Small LLMs Can Master Math Reasoning with Self-Evolved ...](https://arxiv.org/html/2501.04519v1)
  > Jan 8, 2025 — As for the reward model, process reward modeling (PRM) shows a great potential by providing fine-grained feedback on intermediate steps (Lightman et al., 2023)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.

### computational_models_for_wrongness_detection.0.purpose
**Confidence:** high

The excerpt presents a model that predicts the distribution of human aesthetic judgments rather than hard-coded criteria, which matches the field value’s aim of learning to assess aesthetic and technical quality without hand-coded rules. It mentions predicting distributions of scores for images sourced from crowdsourced ratings, which directly supports the concept of modeling human opinion distributions. The emphasis on learning from human ratings (rather than coding explicit rules) aligns with the field value’s objective to predict opinion distributions as a proxy for quality assessment.

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in

### existing_applications_and_benchmarks.0.description
**Confidence:** high

The finegrained field describes a Multimodal Large Language Model specialized for deep understanding of mobile user interface screens, with capabilities for referring to, grounding, and reasoning about screen elements. This exact capability is reflected in the first excerpt, which discusses Ferret-UI as a new multimodal LLM tailored for enhanced understanding of mobile UI screens and equipped with referring, grounding, and reasoning. The other excerpts provide broader context about the role of LLMs in UI/UX design and UX research in the age of LLMs, which supports the general landscape in which such a specialized model would be developed, but do not describe a model with the same explicit multimodal, referring/grounding, and reasoning focus described in the field value. Taken together, the first excerpt most directly supports the field value, while the remaining excerpts offer contextual relevance about design-focused LLM research and evaluation approaches.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.

### foundational_design_theories_on_intuition.0.theorist_name
**Confidence:** high

The finegrained field identifies the theorist name as Donald Schön. The most relevant passages explicitly reference Donald Schön and his work on the reflective practitioner and tacit knowing-in-action, which directly support the field value. One excerpt notes that Schön introduced concepts such as reflection-on-action, illustrating his central role in epistemology of reflective practice, thereby confirming the asserted theorist name. Another excerpt explicitly mentions Donald A. Schon and discusses tacit knowing-in-action as part of professionals’ day-to-day practice, further corroborating the attribution to Schön. Excerpts focusing on other designers and theories mention related design education and thinking but do not provide direct evidence about Schön, and thus are less relevant for this precise field value. Collectively, the two most relevant excerpts provide clear, direct support for identifying the theorist as Donald Schön, with the rest offering contextual background in the broader design knowledge landscape.

- [The Reflective Practitioner Donald A Schon](https://lan-portal.uob.edu.ly/url/DOC/9E641Y0991/the-reflective__practitioner_donald__a_schon.pdf)
  > Mar 17, 2026 — Donald Schön&#039;s 1983 book The Reflective Practitioner introduced concepts such as reflection-on-action. Reflective practice is the ability to reflect on
- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every

### rationalization_and_explanation_models.1.purpose
**Confidence:** medium

Directly supporting the idea of using a designated rationale subsequence to explain a model’s behavior, one excerpt discusses how selective rationalizations improve explainability by extracting a sub-sequence of the input as rationales. This aligns with the notion of a reasoned, faithful input-driven rationale rather than generic explanations. Another excerpt highlights explicit Chain-of-Thought-style reasoning accompanied by verification steps before producing a conclusion, which mirrors the principle of grounding reasoning in verifiable steps and an evidence-oriented process, rather than unverified post-hoc claims. A third excerpt describes process supervision aimed at rewarding correct reasoning steps, which maps to training regimes designed to promote transparent, stepwise justification as part of the model’s design reasoning workflow. A fourth excerpt presents Self-Refine as an iterative, self-critique based refinement loop, which can contribute to faithful reasoning by repeatedly improving the coherence and alignment of the rationale with the model’s actual decisions. Additional related material discusses process supervision in mathematical reasoning and process-oriented prompting, further supporting how models can be guided to produce coherent, traceable reasoning chains. Finally, one excerpt explicitly discusses rationalizing predictions with methods to extract more information from the model, which is tangentially relevant to building faithful, interpretable rationales rather than merely post-hoc narratives. Taken together, these excerpts provide a coherent set of approaches for selecting, verifying, and training for faithful design reasoning and rationale generation, consistent with the field value’s emphasis on faithfulness, verifiability, and process-oriented justification.

- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the

### existing_applications_and_benchmarks.4.description
**Confidence:** high

The first excerpt outlines a method for training a harmless AI assistant through self-improvement, without labeling harmful outputs, which essentially embodies a constrained, rule-based alignment strategy typical of constitutional-style approaches. This demonstrates the core idea of guiding model behavior via an internalized normative framework, aligning with the notion of a Design Constitution that codifies principles to govern reasoning and outputs. The second excerpt elaborates on experimental results showing that constitutional-like feedback (via AI feedback loops) improves adherence to instructions, with RLHF enhancing instruction-following. This supports the feasibility and effectiveness of using feedback-driven constraint mechanisms to shape model reasoning, which is precisely the kind of design-principle-driven refinement implied by a Design Constitution. Together, these excerpts provide direct support for adopting a constitutional AI methodology in a design-oriented context, including reinforcement through feedback and iterative self-improvement to refine reasoning.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more

### foundational_design_theories_on_intuition.2.description
**Confidence:** medium

The fine-grained field value describes the Recognition Primed Decision (RPD) model as explaining how experts rapidly identify a situation based on vast experience and select a viable action without evaluating multiple alternatives. It then reframes the idea of a 'mismatch signal' in design as a possible failure of this recognition process, indicating that the default response is inappropriate and warrants deeper analysis. The most relevant content directly references the RPD framework, highlighting rapid, pattern-based recognition leading to action without enumerating options. It also implies that expert judgment relies on recognizable patterns from experience, which is central to the described pre-verbal or intuitive recognition.
Supporting this, materials discussing tacit knowledge and knowing-in-action describe how professionals rely on tacit, action-oriented understanding that is not fully articulated, aligning with the notion of intuition or pre-verbal sense-making that can precede verbal justification. This directly connects to the idea that experts have an implicit sense of when something is wrong (or not fitting) even before they can articulate why, which underpins the concept of a mismatch signal as a recognition-based concern rather than purely rule-based analysis.
Further, discussions of designerly ways of knowing emphasize design expertise as a form of knowledge that is embedded in practice and intuition, rather than solely codified rules. This supports the broader context in which a designer’s sense that something isn’t right may arise from deep, experiential patterns and heuristic judgment, rather than explicit step-by-step reasoning alone.
Collectively, these excerpts provide a cohesive set of sources that map onto the idea of rapid recognition in expert design judgment (RPD), the tacit, in-action nature of such knowledge, and the designerly tradition of knowledge grounded in practice and intuition, all of which underpin the proposed interpretation of the mismatch signal in design cognition.

- [A Recognition Primed Decision (RPD) Model of Rapid ...](https://www.researchgate.net/publication/235418838_A_Recognition_Primed_Decision_RPD_Model_of_Rapid_Decision_Making)
  > Oct 15, 2009 — PDF | On Jan 1, 1993, Gary A. Klein published A Recognition Primed Decision (RPD) Model of Rapid Decision Making | Find, read and cite all the research you
- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every
- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent

### existing_applications_and_benchmarks.4.type
**Confidence:** high

The Training Framework in this context refers to structured approaches for training models to reason about decisions and to critique or justify those decisions step by step. Excerpts explicitly about process supervision show that training can reward correct reasoning steps and reliability of intermediate steps, which aligns with a framework that enforces stepwise design critique rather than only final outputs. The cited work on process supervision demonstrates that guiding models through a sequence of reasoning steps yields more reliable problem solving, which directly supports the idea of a training framework that targets design reasoning chains and justification. The survey on process reward models expands on how to collect process data, build models that evaluate those processes, and apply them at test time, which is a blueprint for a full training framework that integrates data, models, and evaluation of reasoning processes. An example in the same vein shows that training a model to reward each correct step improves performance, offering concrete methodology for a training framework aimed at design reasoning. Additional related work on iterative refinement with self-feedback shows a practical mechanism for a training framework to improve outputs by leveraging feedback on intermediate steps. The constitutional AI references provide context on shaping models via feedback and harmlessness constraints, which can be integrated into a broader training framework to ensure design principles are respected during reasoning. Finally, items that discuss the broader use of process supervision in mathematical reasoning provide transferable insights into how to structure a design-reasoning-focused training framework, including how to align rewards with reasoning quality and how to structure supervision around reasoning steps rather than only final results.

- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more

### foundational_design_theories_on_intuition.0.seminal_work
**Confidence:** high

The target field value is a specific seminal design theory book. The most directly relevant information is an excerpt that explicitly names the work and author, and notes its introduction of reflection-on-action as a concept. The other highly relevant excerpt also references Schön and his book, reinforcing the association between the work and the design cognition ideas attributed to Schön. These passages collectively establish the exact bibliographic attribution to The Reflective Practitioner and its core idea of professionals thinking in action, which aligns with the requested field value. Excerpts discussing related designerly thinking without naming the book provide contextual support but do not directly confirm the exact publication, so they are auxiliary rather than primary evidence.

- [The Reflective Practitioner Donald A Schon](https://lan-portal.uob.edu.ly/url/DOC/9E641Y0991/the-reflective__practitioner_donald__a_schon.pdf)
  > Mar 17, 2026 — Donald Schön&#039;s 1983 book The Reflective Practitioner introduced concepts such as reflection-on-action. Reflective practice is the ability to reflect on
- [Donald A, Schon - The Reflective Practitioner](https://raggeduniversity.co.uk/wp-content/uploads/2025/03/1_x_Donald-A.-Schon-The-Reflective-Practitioner_-How-Professionals-Think-In-Action-Basic-Books-1984_redactedaa_compressed3.pdf)
  > Mar 1, 2025 — It seems right to say that our knowing is in our action. Similarly, the workaday life of the professional depends on tacit knowing-in-action. Every

### rationalization_and_explanation_models.0.purpose
**Confidence:** high

The field value calls for training a model to produce explicit rationales and citations to principles before delivering a verdict. Excerpts that discuss process supervision explicitly reward correct reasoning steps before a final answer, illustrating a training signal that enforces reasoning before verdicts. This aligns directly with the goal of a rationale-first design: the model should justify its reasoning steps prior to giving a conclusion. Additionally, methods that enable explicit chain-of-thought reasoning with verification steps before producing an answer demonstrate a concrete mechanism to ensure that the rationale precedes the verdict, which is central to the target training objective. Works that focus on rationalizing model predictions and producing reasoned outputs with principled justifications further reinforce the same principle by designing systems that front-load reasoning, possibly with citations to established principles. Techniques describing iterative refinement with self-feedback show how reasoning quality can be improved sequentially, which complements the idea of producing thorough rationales and citations before final decisions. Finally, studies and approaches exploring step-by-step verification and process supervision provide practical evidence that the community has experimented with and validated frameworks where reasoning traces are integral to the final output, not merely a post-hoc explanation. Taken together, these excerpts map a coherent landscape of strategies—process supervision, explicit chain-of-thought, rationale-generation with principled citations, and iterative refinement—that collectively support training models to produce explicit rationales and citations prior to verdicts.

- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the

### affective_and_perceptual_theories.2.central_idea
**Confidence:** high

The claim that ease of processing (fluency) correlates with positive evaluation directly aligns with the excerpts stating that fluent processing yields more positive aesthetic experience and beauty perception. Specifically, the excerpts articulate that fluency in processing an object or stimulus is associated with greater aesthetic pleasure, implying more favorable judgments of beauty and, by extension, perceived correctness. This directly supports the finegrained field value by tying ease of processing to positive affect and evaluative judgments, which is the core of the asserted relationship. The remaining excerpts that address processing fluency corroborate the central idea from a slightly different framing, reinforcing that higher fluency yields positive evaluations, while disfluency is linked to more negative or effortful judgments. The excerpts focusing on mismatch negativity discuss neural prediction errors and are less directly connected to aesthetic judgments or perceived correctness, providing only peripheral context in relation to the core concept of fluency and affective evaluation.

- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf)
  > by R Reber · 2004 · Cited by 4518 — We propose that aesthetic pleasure is a function of the perceiver's processing dynam- ics: The more fluently perceivers can process an object, the more
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1295305)
  > by R Reber · 2004 · Cited by 4522 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [(PDF) Processing Fluency and Aesthetic Pleasure](https://www.researchgate.net/publication/8144801_Processing_Fluency_and_Aesthetic_Pleasure_Is_Beauty_in_the_Perceiver's_Processing_Experience)
  > May 2, 2016 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive

### rationalization_and_explanation_models.0.item_name
**Confidence:** medium

The most directly relevant excerpt discusses process supervision, where a model is trained to reward each correct step of reasoning, which is a foundational idea for rationale-first finetuning since it emphasizes explicit reasoning steps as part of training. A closely related excerpt highlights a method to verify step-by-step reasoning, which aligns with ensuring that intermediate rationales are coherent and correct during the design of rationale-first approaches. Another excerpt talks about selective rationalizations that improve explainability by extracting a sub-sequence of input as rationales, directly supporting the idea of training models to produce explicit rationales. Additional excerpts discuss explicit chain-of-thought reasoning and methods that encourage or require a reasoning process (e.g., step-by-step verification, chain-of-thought prompts, and supervised signals tied to reasoning). Collectively, these excerpts map to a research trajectory where the training objective includes or prioritizes the generation of coherent, verifiable rationales before or during the design decision process, thereby aligning with the concept of rationale-first supervised finetuning. The final two excerpts extend the discussion to broader rationale-centric approaches (rationalization via adversarial information, self-refinement) that further support reasoning behavior as a trainable objective rather than treating rationale generation as a post-hoc byproduct.

- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### affective_and_perceptual_theories.1.key_proponents
**Confidence:** high

The finegrained field value identifies Paul Slovic as a key proponent of affective theories, specifically within the affective and perceptual domain. The excerpt describing the affect heuristic explicitly attributes this framework to Paul Slovic, stating that the paper introduces a theoretical framework describing the importance of affect in guiding judgments and decisions, with Slovic as the author. This directly supports the field value by naming Paul Slovic as a primary proponent of affective theories relevant to affective judgment processes. The other excerpts discuss related emotional-cognition theories (such as the somatic marker hypothesis) but do not attribute Paul Slovic as a proponent, thus they do not directly support the precise field value in question and are therefore less relevant to identifying the named proponent.

- [The affect heuristic](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/slovic-affect-heuristic-2002.pdf)
  > by P Slovic · 2007 · Cited by 5461 — This paper introduces a theoretical framework that describes the importance of affect in guiding judgments and deci- sions. As used here, ''affect'' means

### computational_models_for_wrongness_detection.1.purpose
**Confidence:** high

The field value describes a mechanism to quantify how surprising data is to a model given prior beliefs, functioning as a detector for novelty or deviation from expectation. The excerpt notes that Bayesian surprise strongly attracts human attention, with a large proportion of gaze shifts towards more surprising locations, illustrating that a surprise signal can be an effective, domain-agnostic measure of novelty. This directly supports the notion that a computational surprise metric could serve as a general detector of mismatch or novelty across domains, aligning with a prior-belief-based novelty scoring rather than task-specific rules. The content also demonstrates a concrete empirical basis for linking surprise to attention, which bolsters the argument that such a signal can be used to gauge the significance of deviations in data inputs.

- [Bayesian surprise attracts human attention](https://www.sciencedirect.com/science/article/pii/S0042698908004380)
  > by L Itti · 2009 · Cited by 1589 — Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average.

### computational_models_for_wrongness_detection.1.model_name
**Confidence:** high

The field value corresponds to a model name or approach called Bayesian Surprise. The excerpt explicitly describes Bayesian surprise as a mechanism that attracts human attention, which directly names the probabilistic concept “Bayesian surprise” and identifies it as a notable phenomenon. This supports the idea that Bayesian Surprise could be a candidate model or component in designing wrongness-detection or mismatch-detection systems, aligning with the user’s interest in framing and evaluating computational models for wrongness detection beyond mere rule-checking. The content does not discuss alternative models, but it provides direct evidence that Bayesian Surprise is a substantive concept in this space, making it highly relevant for the stated finegrained field.

- [Bayesian surprise attracts human attention](https://www.sciencedirect.com/science/article/pii/S0042698908004380)
  > by L Itti · 2009 · Cited by 1589 — Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average.

### computational_models_for_wrongness_detection.1.key_proponents
**Confidence:** high

The excerpt explicitly cites the authors Itti and Baldi in connection with Bayesian surprise, which is a computational mechanism discussed in studies of attention and surprise. This directly corroborates the field value identifying Itti & Baldi as a key proponent in computational models related to detecting 'wrongness' or unexpected events, since Bayesian surprise is a formalization of unexpectedness that can be tied to mismatch or anomalous signals a designer might perceive. The mention of Itti & Baldi thus provides direct attribution of authorship to the proponents specified in the fine-grained field value.

- [Bayesian surprise attracts human attention](https://www.sciencedirect.com/science/article/pii/S0042698908004380)
  > by L Itti · 2009 · Cited by 1589 — Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average.

### rationalization_and_explanation_models.0.item_type
**Confidence:** high

The most directly relevant items discuss explicit training strategies to improve reasoning and explanation in models. One excerpt reports on process supervision, where a model is rewarded for each correct reasoning step, directly tying training signals to the quality of the design/logic chain. This aligns with training techniques that promote transparent, stepwise justification. Another excerpt describes a step-by-step verification approach to reasoning during training, i.e., process supervision with a focus on proving or validating intermediate steps, which is central to teaching models to reason about why a design decision is good or bad. A third item introduces a scalable approach where chain-of-thought reasoning is trained and verified with additional checks (code verification) before producing final outputs, highlighting an architectural and training pipeline aimed at robust, justifiable reasoning. Additional excerpts address rationalizing predictions and selective rationalizations, which are about eliciting or focusing on rationales as part of the model’s training or output, and iterative refinement techniques that improve initial outputs through feedback, which can be construed as training-time or guidance-time improvements to reasoning quality. Collectively, these excerpts map onto training techniques that promote explicit reasoning, critique, and justification rather than mere generation, covering supervised reasoning signals, verification during reasoning, and iterative improvement signals.

- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the

### affective_and_perceptual_theories.0.key_proponents
**Confidence:** high

The most directly relevant content identifies the somatic marker hypothesis as a framework where emotion-based signals influence decision-making, with explicit reference to Damasio as the originator of the SMH. This directly supports the finegrained field value by locating Antonio Damasio as a central proponent in the affective and perceptual theories discussed in the excerpts. Additional excerpts expand on the SMH and its influence on decision making, reinforcing the association with Damasio and providing corroborating context about the theory’s prominence and subsequent discussions in the literature. Collectively, these excerpts establish Damasio as a foundational proponent in this theoretical area, aligning with the requested finegrained field value.

- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### affective_and_perceptual_theories.1.link_to_mismatch_signal
**Confidence:** high

The idea that an expert designer experiences an immediate negative affective response when a design element conflicts with deeply learned patterns aligns with theories that emotion provides rapid biasing signals in judgment. For instance, the somatic marker hypothesis describes emotion-based signals from the body that bias higher-level decision processes, suggesting that such affective cues can steer evaluation even before explicit analytical reasoning takes place. This supports the notion that a rapid, intuitive signal of wrongness can arise from mismatches with long-learned design priors. Additionally, frameworks emphasizing affect in decision making highlight how affect can guide judgments and decisions, offering a mechanism by which an initial negative feeling can preemptively steer assessment toward unfavorable views. Contextual discussions about implicit emotional biases and the role of emotion in cognitive processing further reinforce that affective signals, whether labeled as somatic markers or general affective heuristics, influence evaluation in ways consistent with a pre-verbal mismatch signal. Collectively, these excerpts corroborate that an affective, fast-processing cue can function as an initial indicator of incongruence with established design knowledge, preceding detailed critique or rule-based analysis.

- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [The affect heuristic](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/slovic-affect-heuristic-2002.pdf)
  > by P Slovic · 2007 · Cited by 5461 — This paper introduces a theoretical framework that describes the importance of affect in guiding judgments and deci- sions. As used here, ''affect'' means
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### affective_and_perceptual_theories.2.key_proponents
**Confidence:** medium

The target field value lists the authors Reber, Schwarz, and Winkielman in the context of affective and perceptual theories. Excerpts that explicitly name Reber and Schwarz discuss Processing Fluency and Aesthetic Pleasure, which aligns with the topic of affective and perceptual processing influencing judgments. These excerpts directly reflect the same substantive topic and authorship present in the field value (Reber and Schwarz). The second excerpt similarly presents the same source material and authors, reinforcing the connection to the same theoretical framework. However, none of the provided excerpts mention Winkielman, so the combination of all three authors as a single provenance cannot be fully supported by the excerpts alone. The remaining excerpts cover related concepts (affect heuristic, mismatch negativity) but do not provide evidence tying Winkielman or the exact trio to the stated field value, making them less relevant to the precise finegrained field.

- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf)
  > by R Reber · 2004 · Cited by 4518 — We propose that aesthetic pleasure is a function of the perceiver's processing dynam- ics: The more fluently perceivers can process an object, the more
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1295305)
  > by R Reber · 2004 · Cited by 4522 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [(PDF) Processing Fluency and Aesthetic Pleasure](https://www.researchgate.net/publication/8144801_Processing_Fluency_and_Aesthetic_Pleasure_Is_Beauty_in_the_Perceiver's_Processing_Experience)
  > May 2, 2016 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive

### rationalization_and_explanation_models.0.originators
**Confidence:** medium

The field value concerns AI researchers who develop training approaches and reasoning techniques for language models. A key excerpt notes that process supervision improves mathematical reasoning in models, and the associated work from a major AI organization exemplifies researchers applying step-by-step reasoning challenges to LLMs. This directly connects to researchers in the language-model training space experimenting with chain-of-thought and process supervision to teach models how to reason about design decisions. Additional excerpts discuss selective rationalization, rationalizing model predictions, and iterative improvement methods, all of which are authored by researchers in AI and NLP who work on model behavior, explanations, and training-time guidance. The strongest link is to process supervision in mathematical reasoning as a successful strategy developed within a leading AI research context, followed by works that focus on rationalization and explanation generation, which align with researchers’ efforts to imbue models with reasoned, explainable behavior. Other excerpts extend these themes to rationales and iterative self-improvement, further illustrating the role of researchers in designing and testing explanatory and design-critique capabilities in AI systems.

- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Interventional Rationalization](https://aclanthology.org/2023.emnlp-main.700.pdf)
  > by L Yue · 2023 · Cited by 13 — Selective rationalizations improve the explain- ability of neural networks by selecting a sub- sequence of the input (i.e., rationales) to ex-.
- [Rationalizing predictions by adversarial information ...](https://www.sciencedirect.com/science/article/abs/pii/S0004370222001680)
  > by L Sha · 2023 · Cited by 13 — In this work, we first propose an alternative method to rationalize the predictions of a neural model. Our method aims to squeeze more information from the
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly

### affective_and_perceptual_theories.3.theory_name
**Confidence:** medium

The finegrained field value identifies two related neural phenomena: Mismatch Negativity (MMN) and Error-Related Negativity (ERN). The excerpts that most strongly support the MMN aspect describe MMN as a brain response to violations of a rule or to deviations from expected sensory patterns, i.e., a prediction-error signal. Specifically, one excerpt characterizes MMN as a brain response to violations of a rule established by a sequence of stimuli, which aligns with MMN being triggered by mismatches to expected patterns. Another excerpt explicitly states that MMN is a neural signal of prediction error evoked by deviants from expected sensory input, underscoring its role as a mismatch detector within a predictive framework. Additional excerpts provide general definitions of MMN, including timing and polarity characteristics, which contextualize MMN as a measurable neural component in mismatch situations. Since the finegrained field value also includes ERN, it is important to note that none of the excerpts directly discuss ERN, so there is no direct evidence for ERN within the provided texts. Overall, the strongest thematic support in these excerpts supports MMN as a mismatch/prediction-error signal and as a response to rule violations, with broader definitional support, while ERN remains unaddressed in the excerpts.

- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Mismatch negativity](https://en.wikipedia.org/wiki/Mismatch_negativity)
  > Dec 15, 2019 — The mismatch negativity (MMN) or mismatch field (MMF) is a component of the event-related potential (ERP) to an odd stimulus in a sequence of stimuli.

### computational_models_for_wrongness_detection.1.mechanism
**Confidence:** medium

The excerpt discusses Bayesian surprise as a strong attractor of human attention, indicating that surprising locations draw gaze shifts due to a probabilistic mismatch between expectation and observation. This aligns with the proposed finegrained field value, which frames a Bayesian framework that uses the divergence between prior and posterior distributions (a measure of surprise) to flag elements that deviate from learned norms. Although the excerpt does not explicitly mention KL-divergence, the core idea of a probabilistic mismatch signaling unexpectedness supports the notion that a large belief update (a surprise) can serve as a computational analog for the misalignment signal in design contexts. Therefore, the content directly supports the concept of using Bayesian surprise as a mechanism for wrongness detection in design representations and visual elements.


- [Bayesian surprise attracts human attention](https://www.sciencedirect.com/science/article/pii/S0042698908004380)
  > by L Itti · 2009 · Cited by 1589 — Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average.

### affective_and_perceptual_theories.1.theory_name
**Confidence:** medium

The target concept 'Affect Heuristic' is explicitly named in the strongest excerpt, which discusses affect as a guiding factor in judgments and decisions. This excerpt directly supports the field value by naming the heuristic in question and situating affect as a driver of cognitive processes. Related excerpts discuss emotion-based biasing signals and affective theories (such as the somatic marker framework), which are conceptually adjacent to the affective influence on decision making but do not employ the exact heuristic name. These provide contextual support that enriches understanding of how affect and perception influence cognition, reinforcing the relevance of affective explanations in decision contexts beyond rule-based or purely rational models. The remaining excerpts focus on broader discussions of emotion and decision making, further connecting the same overarching theme of affective influence but without the explicit term, thus offering indirect reinforcement of the field value. Together, these excerpts establish a coherent link between affect, perception, and decision processes, with the strongest claim supported by an explicit naming of the heuristic and supplementary support from closely related affective theories.

- [The affect heuristic](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/slovic-affect-heuristic-2002.pdf)
  > by P Slovic · 2007 · Cited by 5461 — This paper introduces a theoretical framework that describes the importance of affect in guiding judgments and deci- sions. As used here, ''affect'' means
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### affective_and_perceptual_theories.0.link_to_mismatch_signal
**Confidence:** high

The core field value describes a pre-verbal, intuitive gut feeling in expert designers that arises when a new design violates past successful patterns, rooted in accumulated emotional valuations. The Somatic Marker Hypothesis posits that bodily-emotion signals bias decisions and are integrated into higher-level cognition, which directly explains why an expert experiences a non-conscious “wrongness” signal before articulating the specific flaw. The excerpts collectively establish this emotional-cognitive mechanism: (a) emotion-based biasing signals are integral to decision making, (b) somatic markers can influence judgments in complex tasks, and (c) the relationship between emotions and cognition is central to risk and pattern recognition in decision theories. Taken together, these sources substantiate the idea that a pre-verbal affective response can guide design judgment beyond explicit rule-based reasoning, consistent with the described mismatch signal in expert designers.

- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### affective_and_perceptual_theories.1.central_idea
**Confidence:** high

The most directly relevant content comes from passages that explicitly frame affect as guiding judgment and decision making, and that describe affect as a shortcut or heuristic. The passage detailing the affect heuristic presents a framework where affect guides judgments and decisions, aligning with the core claim that positive or negative feelings act as a quick substitute for more thorough evaluation. This provides a direct theoretical basis for affect serving as a simple, efficient shortcut in evaluation. Subsequent material on the somatic marker hypothesis introduces emotion-based bodily signals that bias cognition, offering a mechanistic account of how affective states influence decisions, reinforcing the idea that affect can steer judgment beyond explicit rule-based reasoning. Additional sources discuss implicit emotional biases and the broader link between emotion and cognition, which support the same overarching view that affective processes shape judgments, even if not always in the exact same framing as a heuristic shortcut. Finally, a broader editorial on the somatic marker hypothesis situates the discussion in a long-running debate about emotion’s role in decision making, further corroborating the relevance of affective processes to evaluation, albeit with broader context. Overall, these excerpts collectively converge on the idea that affective processes provide rapid, influential guidance in judgment and decision making, consistent with the finegrained field value.

- [The affect heuristic](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/slovic-affect-heuristic-2002.pdf)
  > by P Slovic · 2007 · Cited by 5461 — This paper introduces a theoretical framework that describes the importance of affect in guiding judgments and deci- sions. As used here, ''affect'' means
- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### affective_and_perceptual_theories.0.central_idea
**Confidence:** high

The finegrained field value describes emotion-based biasing signals that originate from bodily states and are integrated into decision-making to guide judgments under complexity and uncertainty. The most directly relevant information is that the somatic marker hypothesis posits emotion-based bodily signals biasing decision processes and being integrated in higher cognitive functions. This directly supports the idea of bodily-derived affective cues influencing decisions. Related discussions emphasize the relationship between emotions and cognition through the Somatic Marker Hypothesis, reinforcing that bodily states can bias choices. A historical/editorial synthesis note explicitly references the Somatic Marker Hypothesis within the context of decision-making and its influence over judgments, further corroborating that bodily-emotional signals play a role in guiding decisions, particularly in uncertain or complex scenarios. Collectively, these excerpts provide clear, multi-faceted support for the stated finegrained field value, with the strongest support coming from explicit statements about emotion-based bodily signals guiding decision-making and being integrated into higher-order processes, and supplementary context from discussions of related biases and historical framing.

- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### existing_applications_and_benchmarks.4.relevance_to_design_ai
**Confidence:** medium

The target field value describes a framework that grounds a design critic’s reasoning in established design theory to make critiques transparent, consistent, and trustworthy. The most directly relevant excerpts discuss the mechanisms to enable such grounded design critique. First, the idea of process supervision—as opposed to solely rewarding final outcomes—aligns with training an AI to reason step by step about why a design decision is good or bad, which mirrors the goal of a design critique with explicit justification. This is evidenced by work showing that rewarding each correct step of reasoning yields better problem solving and suggests a comparable approach could be adapted to design critique by rewarding principled design considerations and each cogent critique step. Relatedly, process supervision is described as a way to train more reliable reward models by focusing on the reasoning process itself, which supports building a critique framework that relies on interpretable chains of thought anchored in theory. A broader survey on process reward models reinforces how to construct, data-generate, and utilize PRMs to train models that reason through steps rather than only producing outcomes, further supporting the feasibility of a design-critique framework grounded in theory. Examples applying these ideas in practice include work that rewards stepwise reasoning in mathematical contexts, illustrating a concrete instantiation of the process-oriented approach that could be adapted to design reasoning chains. In domain-specific design contexts, literature exploring design-focused AI systems and UI/UX design demonstrates how models are increasingly expected to reason, justify, and ground outputs in domain knowledge, which is precisely the kind of principled grounding the field aims for. Additionally, alignment-focused research on making AI harmless and predictable provides a foundation for constraining and interpreting critiques, ensuring that design judgments adhere to defined principles rather than opaque preferences. Finally, practical work on stepwise verification and iterative refinement emphasizes that breaking down critique into verifiable, intermediate steps improves trust and quality, reinforcing the value of a design critic that reasons through design principles, not just outputs.

- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.

### affective_and_perceptual_theories.3.central_idea
**Confidence:** medium

The fine-grained field value asserts that MMN is a pre-attentive brain response to violations of an expected sensory regularity. Excerpts describing mismatch negativity as a neural signal of prediction error and as a brain response to rule violations directly support this framing. Specifically, the notion that MMN is a prediction-error signal evoked by deviations from expected patterns aligns with the idea of a pre-attentive detection mechanism for irregularities in sensory input. Additionally, a concise definition of MMN as a negative deflection in difference waveforms within a standard latency window reinforces its characterization as an automatic, pre-conscious response to pattern violations. While the field value also mentions ERN and its timing, there is no explicit mention of ERN in the provided excerpts; the closest and strongest support pertains to MMN’s role as a pre-attentive mismatch detector in sensory processing. Excerpt 4 (somatic marker hypothesis) does not pertain to MMN or ERN and thus provides little relevance to the field value.


- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Mismatch negativity](https://en.wikipedia.org/wiki/Mismatch_negativity)
  > Dec 15, 2019 — The mismatch negativity (MMN) or mismatch field (MMF) is a component of the event-related potential (ERP) to an odd stimulus in a sequence of stimuli.

### affective_and_perceptual_theories.0.theory_name
**Confidence:** high

The target value matches the core topic of the first excerpt, which explicitly states that the Somatic Marker Hypothesis proposes emotion-based biasing signals from the body that influence higher-level processing. This directly supports the field value as the proper theory name. The second excerpt also centers on the Somatic Marker Hypothesis within the broader account of emotions and cognition, reinforcing its relevance in decision making and continuing to treat it as the same hypothesis. The third excerpt provides a summary/editorial context about the Somatic Marker Hypothesis, noting its introduction to study decision making, thereby corroborating the field value and situating it within the same theoretical framework. Collectively, these excerpts consistently identify and describe the Somatic Marker Hypothesis, supporting the field value as the named theory in affective-cognitive integration.

- [Critical Review of the Somatic Marker Hypothesis](https://www.mrc-cbu.cam.ac.uk/personal/tim.dalgleish/dunnsmhreview.pdf)
  > by BD Dunn · Cited by 1398 — The somatic marker hypothesis (SMH; Damasio et al., 1991) proposes that emotion- based biasing signals arising from the body are integrated in higher brain
- [Implicit emotional biases in decision making: The case of ...](https://www.sciencedirect.com/science/article/abs/pii/S0278262607001431)
  > by A Stocco · 2008 · Cited by 57 — An influential and paradigmatic account of the relationship between emotions and cognition is given by the Somatic Marker Hypothesis (SMH: Damasio, 1994,
- [Editorial: Twenty Years After the Iowa Gambling Task - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788943/)
  > by YC Chiu · 2018 · Cited by 63 — However, 20 years ago, the “Somatic Marker Hypothesis” (SMH) proposed by the neuroscientist Antonio Damasio was introduced to explore decision-making under

### affective_and_perceptual_theories.2.link_to_mismatch_signal
**Confidence:** medium

The element that processing fluency contributes to aesthetic experience is central to the field value. One excerpt states that aesthetic pleasure tracks processing fluency: the more fluently something can be processed, the more positive the experience. This directly supports the idea that disfluency (lower fluency) would yield less positive affect, i.e., a subtle offness when a design is visually complex or violates expectations. Another excerpt repeats this fluency-aesthetics claim, reinforcing the link between fluent processing and positive affect. A third excerpt explicitly frames aesthetic pleasure as a function of the perceiver’s processing dynamics, which aligns with the notion that disrupted fluency (disfluency) signals something amiss in the design. From a neurocognitive perspective, other excerpts discuss mismatch negativity as a neural or predictive-error signal that occurs when patterns are violated, i.e., deviations from expected input. This supports the idea that a pre-attentive mismatch signal can arise when a design does not conform to established perceptual or structural expectations, manifesting as an early, pre-conscious cue that something is wrong. Additional excerpts articulate the affect heuristic, indicating that affective responses guide judgments, which can help explain why the negative affect accompanying disfluency would bias designers or observers toward perceiving a design as flawed. Together, these sources coherently connect the idea that (a) low processing fluency elicits negative affect or an offness, (b) mismatch or prediction-error signals can occur pre-attentively when expectations are violated, and (c) affective responses influence judgments about design quality, all of which underpin the reported finegrained field value.

- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf)
  > by R Reber · 2004 · Cited by 4518 — We propose that aesthetic pleasure is a function of the perceiver's processing dynam- ics: The more fluently perceivers can process an object, the more
- [(PDF) Processing Fluency and Aesthetic Pleasure](https://www.researchgate.net/publication/8144801_Processing_Fluency_and_Aesthetic_Pleasure_Is_Beauty_in_the_Perceiver's_Processing_Experience)
  > May 2, 2016 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1295305)
  > by R Reber · 2004 · Cited by 4522 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [The affect heuristic](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/slovic-affect-heuristic-2002.pdf)
  > by P Slovic · 2007 · Cited by 5461 — This paper introduces a theoretical framework that describes the importance of affect in guiding judgments and deci- sions. As used here, ''affect'' means

### affective_and_perceptual_theories.2.theory_name
**Confidence:** high

The core idea to support the field value is that perceptual fluency (how easily something is processed) influences judgments or affect. Excerpt content that directly states that more fluent processing leads to more positive or pleasurable responses provides direct support for a perceptual/processing fluency framework. The first excerpt explicitly posits that “aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more” positive they feel, which aligns with the notion of fluency affecting perception. The third excerpt, which discusses processing fluency and aesthetic pleasure, reinforces the same relationship in a different phrasing, further supporting the link between fluency and perceptual judgment. The second excerpt similarly echoes the central claim about processing dynamics and positive experience, reinforcing the same mechanism. The fourth excerpt introduces the affect heuristic, which is about affect guiding judgments, and while not exclusively about fluency, it situates affect as a driver of perception and decision, which can intersect with fluency-related judgments. The remaining excerpts discuss mismatch negativity and rule-violation concepts in neural/perceptual contexts; they are less about perceptual fluency but touch on how deviations from expected patterns can affect perception or cognition, which offers indirect contextual support but is not a direct description of fluency-based processing. Taken together, the strongest support comes from direct statements linking processing fluency to positive perceptual judgments, with secondary support from affective guidance and related deviation-detection concepts.

- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf)
  > by R Reber · 2004 · Cited by 4518 — We propose that aesthetic pleasure is a function of the perceiver's processing dynam- ics: The more fluently perceivers can process an object, the more
- [Processing Fluency and Aesthetic Pleasure: Is Beauty in ...](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1295305)
  > by R Reber · 2004 · Cited by 4522 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [(PDF) Processing Fluency and Aesthetic Pleasure](https://www.researchgate.net/publication/8144801_Processing_Fluency_and_Aesthetic_Pleasure_Is_Beauty_in_the_Perceiver's_Processing_Experience)
  > May 2, 2016 — We propose that aesthetic pleasure is a function of the perceiver's processing dynamics: The more fluently perceivers can process an object, the more positive
- [The affect heuristic](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/slovic-affect-heuristic-2002.pdf)
  > by P Slovic · 2007 · Cited by 5461 — This paper introduces a theoretical framework that describes the importance of affect in guiding judgments and deci- sions. As used here, ''affect'' means
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)

### existing_applications_and_benchmarks.4.name
**Confidence:** medium

The most relevant content directly discusses Constitutional AI and its use in creating harmless AI through AI feedback and alignment methods. These passages describe training regimes that optimize for harmlessness and instruction-following via feedback loops, which closely relate to applying Constitutional AI concepts in design contexts where safety, alignment, and principled reasoning are important. Related materials that describe process supervision, chain-of-thought improvements, and reward-model frameworks provide supporting context for how design-oriented reasoning systems might be trained or evaluated, though they do not themselves name Constitutional AI. Overall, the strongest support comes from explicit Constitutional AI descriptions; the next tier comes from materials describing alignment-driven training and reasoning supervision that could inform a design-focused Constitutional AI approach; remaining items offer broader background on LLM design and evaluation without direct Constitutional AI framing.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in

### pattern_recognition_theories.1.core_concept
**Confidence:** medium

The concept describes a rapid, intuitive recognition of a familiar or prototypical situation, which aligns with the idea of a chunk being a meaningful pattern that experts recognize at a glance. This supports the notion that recognition of patterns serves as a priming mechanism for subsequent reasoning. Relatedly, predictive processing frames decision making as a process where prediction errors and priors guide expectation adjustment; recognizing a familiar pattern informs the expected course of action and what cues are salient, which is then evaluated through mental simulation rather than enumerating many options. Additionally, the literature on mismatch negativity reinforces that the brain detects deviations from established patterns as a form of prediction error, illustrating how recognition-based expectations shape perception and subsequent responses. Taken together, these excerpts map onto the field’s description of rapid, intuitive decision-making driven by pattern recognition that primes expectancies and cues, followed by mental simulation to evaluate the intended action. 

- [Chunking](https://www.chessprogramming.org/Chunking)
  > Oct 1, 2007 — A chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.
- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.

### affective_and_perceptual_theories.3.link_to_mismatch_signal
**Confidence:** high

The finegrained field value identifies the mismatch signal as direct, measurable neural correlates of preconscious detection of deviation from learned patterns, i.e., MMN. Excerpts describe MMN as a neural signal of prediction error evoked by deviations from expected sensory patterns, and as a brain response to rule violations. This aligns with the idea of a preconscious, automatic detection process that signals something is wrong before explicit reasoning. Specifically, one excerpt states that mismatch negativity is a neural signal of prediction error evoked by deviants from expected patterns, directly matching the notion of a preconscious mismatch detector. Another excerpt characterizes MMN as a brain response to violations of a rule established by a sequence of stimuli, reinforcing the connection to automatic detection of irregularities. A further excerpt reframes MMN as a component of ERP to odd stimuli, supporting its interpretation as an automatic neural indicator of mismatch. A fourth excerpt provides a concise definition of MMN in latency terms, which supports the general neural understanding of MMN as a neural correlate of mismatch detection, even though it adds peripheral details such as timing. Collectively, these excerpts substantiate that the neural correlates of mismatch signal (MMN) are about automatic prediction-error-like signals in the brain that flag deviations, consistent with the finegrained field value’s description of preconscious detection of wrongness.


- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Mismatch negativity](https://en.wikipedia.org/wiki/Mismatch_negativity)
  > Dec 15, 2019 — The mismatch negativity (MMN) or mismatch field (MMF) is a component of the event-related potential (ERP) to an odd stimulus in a sequence of stimuli.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.

### computational_models_for_wrongness_detection.3.model_name
**Confidence:** high

The finegrained field aims to identify the specific model name used for right/wrongness detection in the context of design judgment and wrongness detection. The excerpt describes Ferret-UI as a new MLLM tailored for improved understanding of mobile UI screens, with capabilities like referring, grounding, and reasoning. This directly supports the field value by naming Ferret-UI as the model in question, establishing a concrete link between the excerpt content and the target field value. Other excerpts address related topics (process reward models, constitutional AI, etc.) but do not provide evidence about Ferret-UI, and therefore do not strengthen the connection to the specific field value beyond broader context.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning

### existing_applications_and_benchmarks.5.description
**Confidence:** medium

The field value describes a supervision technique where the reward model is trained to score intermediate steps of a reasoning process, enabling granular feedback and enabling explicit Chain-of-Thought reasoning and verification before scoring. The most directly relevant excerpt reports that a process-supervised model solves problems and emphasizes process supervision as a mechanism to improve reasoning reliability, aligning with the idea of scoring intermediate steps rather than only final outcomes. Supporting evidence comes from discussions of training models with rewards tied to each correct step of reasoning, which mirrors the notion of evaluating intermediate steps. Additional excerpts mention that process supervision yields improvements in mathematical reasoning and the development of reward models around the full reasoning loop, which reinforces the concept of granular, stepwise evaluation rather than sole outcome-based scoring. Related content on iterative refinement and self-feedback also aligns with improving reasoning processes, though it focuses more on output refinement than explicit intermediate-step scoring. Collectively, these excerpts substantiate the core idea of a supervision technique targeting intermediate reasoning stages and point to extensions like chain-of-thought prompting and verification-based scoring.

- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and

### existing_applications_and_benchmarks.5.type
**Confidence:** high

The field value pertains to how training and evaluation are conducted for AI systems. Excerpts that discuss process supervision as a training signal (reward models trained with step-wise correctness), the use of process data for improving reasoning capabilities, and methods like chain-of-thought prompting for design critique all address training/evaluation methodologies rather than output generation or architectural design. Specifically, discourse on training models to maximize correct intermediate reasoning steps, improving reward modeling through process supervision, and iterative refinement with self-feedback directly illustrate practical training and evaluation approaches. The survey of process reward models provides a broad methodological context, while the Self-Refine work demonstrates an iterative, evaluative refinement process as a training/evaluation technique. Taken together, these excerpts map tightly to the requested finegrained field value by outlining concrete training signals, evaluation strategies, and methodologies used to judge and improve model reasoning and outputs.

- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and

### pattern_recognition_theories.1.application_to_expertise
**Confidence:** medium

The finegrained field value centers on how expert designers recognize a problem and a proposed solution through pattern recognition, yielding a pre-verbal mismatch signal when primed expectations are violated. Excerpt describing designerly ways of knowing directly addresses design expertise and the role of tacit, pattern-based judgment in design reasoning, which aligns with the notion that experts rely on familiar patterns to evaluate design adequacy rather than lengthy analysis. Excerpts that treat mismatch negativity as a prediction-error signal from prior patterns further support the idea that a rapid, pattern-based cue alerts an expert to potential misfit between expectation and observation, which maps to the pre-verbal mismatch signal described. Additional sources on predictive processing and chunking provide a broader theoretical backdrop: prediction error framed as discrepancies between expected and observed inputs, and chunking as a mechanism by which experts recognize meaningful patterns as units. Collectively, these excerpts support the field value by linking expert pattern recognition to fast, tacit mismatch cues, and situating these cues within recognizable cognitive and design-focused theories. The most directly supportive content comes from designerly ways of knowing, which anchors the concept of design expertise in tacit, pattern-based judgment, followed by sources that frame mismatches as prediction-errors or rule-violation signals in perceptual or cognitive processing, and finally by material that explains chunking as a unit of expert recognition, all of which coherently map to a rapid, pattern-driven assessment process in design practice.

- [Designerly ways of knowing - Open Research Online](https://oro.open.ac.uk/39253/8/Designerly%20Ways%20of%20Knowing%20DS.pdf)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [Designerly ways of knowing](https://www.sciencedirect.com/science/article/pii/0142694X82900400)
  > by N Cross · 1982 · Cited by 2919 — This is the third paper in a series being published in Design Studies, which aims to establish the theoretical bases for treating design as a coherent
- [The mismatch negativity: A review of underlying mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC2671031/)
  > by MI Garrido · 2009 · Cited by 1800 — The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli (typically in the auditory domain)
- [Dissecting Mismatch Negativity: Early and Late ... - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103647/)
  > by YT Huang · 2024 · Cited by 11 — Mismatch negativity (MMN) is commonly recognized as a neural signal of prediction error evoked by deviants from the expected patterns of sensory input.
- [Mismatch Negativity | Encyclopedia MDPI](https://encyclopedia.pub/entry/9812)
  > May 19, 2021 — Mismatch negativity (MMN) is generally defined as a negative polarity deflection viewed across the 150–250 ms latency range in difference waveforms.
- [What we think about when we think about predictive processing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7509909/)
  > by PR Corlett · 2020 · Cited by 31 — Prediction error then refers to the discrepancy between the predicted value of that variable and what is observed. Depending on the relative precision of priors
- [Chunking](https://www.chessprogramming.org/Chunking)
  > Oct 1, 2007 — A chunk is a group of pieces, in some sense a semantic unit, a meaningful pattern that is recognized at a glance by a chess master.

### computational_models_for_wrongness_detection.3.purpose
**Confidence:** high

The field value states a goal to achieve enhanced understanding of mobile UI screens with abilities to refer to, ground, and reason about UI elements and layouts. The closest excerpt explicitly describes Ferret-UI as a model tailored for enhanced understanding of mobile UI screens, and notes that it is equipped with referring, grounding, and reasoning. This directly aligns with the finegrained field value, providing concrete support for both the domain (mobile UI) and the required capabilities (referring, grounding, reasoning). Other excerpts discuss related methodological approaches (process reward models, constitutional AI) but do not address mobile UI understanding or UI-specific reasoning capabilities, so they offer indirect or no support for this field value.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning

### existing_applications_and_benchmarks.5.name
**Confidence:** high

The strongest support comes from an excerpt explicitly titled as a survey of Process Reward Models, which directly names the concept 'Process Reward Models' and discusses their role and use. Other excerpts discuss process supervision and process-based rewards in problem solving and reasoning, which are closely related to the idea of PRMs as a framework for shaping model behavior via process-oriented signals and evaluation, even if the exact term PRMs is not repeated in every case. One excerpt on iterative refinement (Self-Refine) relates to improving outputs via process-level feedback, which aligns with the philosophy of PRMs but is a somewhat broader example. Collectively, these excerpts connect the field value to concrete methods for training and supervising reasoning processes (process supervision, PRMs, and related reward modeling) and illustrate its practical applications and evidence base. The direct mention of a dedicated survey on PRMs provides the clearest, strongest grounding for the specified field value, while the others corroborate and flesh out how process-oriented rewards and supervision are implemented and studied in practice.

- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### existing_applications_and_benchmarks.2.description
**Confidence:** high

The finegrained field value specifies a neural network designed to predict the distribution of human opinion scores for images and learn aesthetic quality patterns from the AVA dataset. The first excerpt explicitly discusses NIMA and notes that the AVA dataset contains images rated by many individuals, which is foundational to learning a distribution of scores. The second excerpt references NIMA in the context of Google Research and shows AVA-ranked examples, illustrating how the model uses diverse human judgments to assess aesthetics. Together, these excerpts directly support the existence and function of a system that predicts score distributions for images based on AVA-derived human judgments.

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### existing_applications_and_benchmarks.7.name
**Confidence:** high

The finegrained value is the name of a specific application/technique in the list. The excerpt stating 'Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement' directly supports that the name of the seventh entry is 'Self-Refine'. Other excerpts discuss related concepts (process supervision, harmless AI, UI design) but do not provide information about the target name, so they do not substantively support the field value. Therefore, the most relevant content is the excerpt that explicitly names the technique, and no additional excerpts provide required confirmation or contradictory information.

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### existing_applications_and_benchmarks.5.relevance_to_design_ai
**Confidence:** medium

The field value posits that assigning rewards to each correct design-critique step teaches the model to construct a well-structured rationale and to reason about design principles and user impact, rather than only producing final verdicts. Among the excerpts, the one describing process supervision as a means to train more reliable reward models for mathematical reasoning directly demonstrates how stepwise evaluation can guide model behavior, which maps to teaching a model to critique design decisions in a structured way. Another excerpt explicitly states that rewarding each correct step of reasoning yields a new state-of-the-art in problem solving, illustrating the same principle in another domain and supporting its applicability to design reasoning. A third excerpt discusses a survey of process reward models, outlining how to generate process data and use PRMs for scaling and evaluation, which provides theoretical and methodological backing for applying PRMs to design-focused critique and rationale. A fourth excerpt introduces an iterative refinement approach where outputs are improved through feedback and refinement, aligning with the idea that chain-of-thought and critique can be honed over time. The remaining excerpt reinforces the general utility of process supervision in training reasoning chains, which further corroborates the approach’s relevance to design-design reasoning tasks. Collectively, these excerpts support the claim that PRMs and process-focused supervision can cultivate design-oriented reasoning in AI, by rewarding correct reasoning steps, enabling critique linked to design principles, and improving rationale quality through iterative refinement.

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and

### existing_applications_and_benchmarks.7.description
**Confidence:** high

The most directly relevant content describes an approach where an LLM improves its initial outputs through iterative feedback and self-refinement, which matches the described method of self-critique to enhance final outputs. One excerpt explains a technique of ‘process supervision’ that rewards correct reasoning steps, providing a concrete mechanism for guiding iterative improvement of internal reasoning before producing a final answer. Another excerpt shows that process supervision can yield more reliable reward signals in reasoning tasks, reinforcing the idea that structured stepwise critique can improve outcomes. Additional excerpts discuss training a harmless or constrained AI through feedback and alignment methods, which underpin safer and more reliable self-improvement workflows. Together, these sources support the notion that iterative self-critique and process-oriented supervision are viable avenues for teaching an LLM to reason more effectively about its own design decisions or outputs, rather than merely generating designs or outputs without reflective critique.

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more

### existing_applications_and_benchmarks.2.relevance_to_design_ai
**Confidence:** high

The concept described in the fine-grained field value is that NIMA provides a computational proxy for a designer’s instinctive sense of aesthetic quality, an implicit 'mismatch signal' that indicates something is off without requiring explicit normative rules. The first excerpt explains that the AVA dataset contains roughly 255,000 images rated for aesthetic quality by about 200 people each, and that images are scored by aggregating human judgments, which demonstrates a learned or crowd-sourced notion of aesthetics without hand-coded rules. The second excerpt reinforces this by showing that NIMA can rank photos from a large-scale database according to these aesthetic judgments. Taken together, these snippets illustrate a concrete modelic approach where a system develops a sense of what looks good (aesthetic fluency) through learned evaluation rather than explicit rule-based design criteria, supporting the claim that NIMA serves as a computational analog for taste and could be integrated as a fluency signal in a design critique AI.

- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### existing_applications_and_benchmarks.3.description
**Confidence:** medium

The strongest support comes from excerpts describing practical systems where LLMs are tailored for UI understanding and UI reasoning, which directly aligns with evaluating the quality of UI outputs using LLMs. One excerpt describes Ferret-UI, a dedicated model for understanding mobile UI screens with reasoning capabilities, which directly supports the idea of using an LLM-based evaluator for UI outputs. Another excerpt surveys the role of large language models in UI/UX design, providing context on how LLMs are used to analyze and contribute to UI-related tasks, which underpins the evaluation paradigm for UI quality and alignment with human judgment. A further excerpt discusses UX research in the era of LLMs, outlining how researchers can define quality and shape the value of AI outputs in UX contexts, which complements the evaluation framework by emphasizing quality criteria and methodological concerns. An excerpt about CLUE, an LLM-powered interviewer that conducts in-the-moment UX interviews, adds empirical flavor by showing how LLMs can interact with users to gauge UX perceptions, relevant to comparing LLM evaluations with human-informed experiences. Additional excerpts on process supervision in reasoning provide methodological parallels: they show how rewarding correct steps of reasoning or supervising the design reasoning chain can improve the reliability of outputs, which can be extended to evaluation tasks rather than generation alone, and another piece discusses improving mathematical reasoning with process supervision, illustrating that structured reasoning supervision can yield more trustworthy assessments. Taken together, these excerpts build a coherent picture of using LLMs to critique or evaluate design outputs (including UI) and to align those evaluations with human expertise, which matches the requested finegrained field value about evaluating quality and matching human judgment in UI contexts.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)

### existing_applications_and_benchmarks.7.relevance_to_design_ai
**Confidence:** medium

The claim envisions a workflow where an AI critiques a design rationale by first producing an initial analysis, then validating or revising it against a governing principle or ‘Design Constitution’, and finally refining the critique to be more robust. The most directly supportive material describes iterative self-improvement and refinement of outputs (Self-Refine), which maps-to a process where an AI self-checks and improves its own critique. The constitutional AI excerpts outline training approaches to align models with harmlessness and principled behavior, which can extend to enforcing design principles during critique and refinement. Excerpts on process supervision describe rewards for correct reasoning steps, which supports a design-rationale-focused training regime where the model is guided to articulate why a design critique is valid or not, not merely generate designs. Citations about training with process supervision, and the distinction between outcome-based vs process-based supervision, provide a foundation for teaching an LLM to reason about why a design decision is good or bad. Additional references to UI/UX design-focused conversations show the application of reasoning-enhanced models in design domains, reinforcing that such reflective critique workflows can be integrated into design workflows. Together, these excerpts sketch a pathway where the AI uses a self-refinement loop, adheres to a constitution of design principles, and relies on process-supervised reasoning to critique and improve design rationale rather than simply producing designs. The inclusion of broader PRM (process reward models) surveys further supports the feasibility of building systems that optimize the quality of the reasoning process itself, not just outcomes. The user’s described goal—an AI that can critique design decisions with transparent rationale and iterative improvement—maps onto these themes across the cited materials, especially where iterative refinement, principled alignment, and process-aware supervision are emphasized.

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning

### existing_applications_and_benchmarks.7.type
**Confidence:** medium

Training/Inference Technique revolves around how models are guided during learning and how they reason during inference. Excerpts that directly discuss constitutional AI show how to shape model behavior through alignment-centric training, which is a fundamental training technique. Excerpts on constitutional AI (in both abstract and full-paper forms) illustrate applying safety and principle-based constraints during training, including the use of reinforcement signals rather than sole human labeling. Excerpts on process supervision demonstrate explicit signals that reward correct steps of reasoning, which is at the heart of teaching models why a design decision is good or bad rather than merely generating outputs, matching the user’s interest in design reasoning guidance. Excerpts about iterative refinement describe a practical feedback loop to improve outputs, aligning with enhanced inference-time correction and iterative design critique workflows. Excerpts on process supervision showing improved reward models strengthen the case that process-oriented training signals outperform outcome-only supervision, reinforcing an engineering stance on training methodology. Collectively, these excerpts map directly to strategies for training and inference that would support a design-oriented reasoning system, including chain-of-thought-like reasoning, critique-focused prompts, and principled supervision signals. The most direct supports are the constitutional AI references, followed by explicit process supervision claims, with iterative refinement offering a practical augmentation to inference-time reasoning.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### existing_applications_and_benchmarks.2.name
**Confidence:** high

The field value corresponds to the name present in the excerpts, which discuss a system or approach named 'NIMA (Neural Image Assessment)'. The first excerpt explicitly names 'NIMA: Neural Image Assessment' and notes its relation to the AVA dataset of aesthetically rated images, indicating that NIMA is a Neural Image Assessment method. The second excerpt, with the title 'Introducing NIMA: Neural Image Assessment - Google Research', confirms the same terminology and provides additional context about sample photos and AVA rankings, reinforcing that the exact project name being analyzed is correctly identified as NIMA (Neural Image Assessment). Together, these excerpts directly support the field value by explicitly naming the program and describing its purpose within aesthetic evaluation of images. The reasoning uses direct paraphrase of the concept and explicit naming to connect to the field value without introducing extraneous, non-supporting details.


- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### existing_applications_and_benchmarks.3.name
**Confidence:** low

The finegrained field seeks a label for an application where an LLM serves as a judge or evaluator of design-related outputs. Direct matches are not present in the excerpts; none explicitly use the phrase or name corresponding to 'LLM-as-a-Judge'. However, several excerpts discuss evaluation-oriented approaches that underpin how an LLM could function as a judge in practice. For example, process supervision is presented as an effective way to train reliable reward models by rewarding correct reasoning steps, which is central to a judging role that evaluates the quality of intermediate reasoning. Constitutional AI discussions address improving model harmlessness and alignment through feedback, which relates to how a judging system would constrain or shape evaluations to avoid harmful conclusions. Other excerpts emphasize designing and supervising the reasoning process, and using feedback loops (e.g., RLHF with designer-reward signals) to guide improvements, all of which are foundational to building an LLM-based evaluation or critique system. Contextual discussions on UI/UX design roles and user-facing research illustrate practical applications where an LLM might critique or evaluate designs, further supporting the relevance of evaluation-oriented capabilities, even if they do not name the exact label. Taken together, these excerpts collectively support the notion that evaluation, critique, and process-guided judgment are active areas, but there is no explicit citation of the exact label in the provided material.

- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and

### training_approaches_for_llm_reasoning.1.abbreviation
**Confidence:** high

The most relevant excerpt explicitly introduces a Process Reward Model (PRM) and describes its role as a reward model that judges each intermediate step for correctness, which directly aligns with the field value PRM. This establishes the core concept of a process-based reward signal applied to reasoning steps, which is exactly what PRM denotes in this context. The second relevant excerpt discusses GenPRM, a generative process reward model that performs explicit Chain-of-Thought reasoning with code verification before proceeding, demonstrating a concrete instantiation or extension of the same PRM idea into a generative setting with verifiable reasoning. Together, these excerpts map directly to the field value by defining PRM and showing a concrete implementation variant (GenPRM) that preserves the core idea of evaluating or guiding step-by-step reasoning rather than only the final outcome.

- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before

### training_approaches_for_llm_reasoning.1.core_principle
**Confidence:** high

The most directly relevant pieces describe concrete mechanisms for evaluating and rewarding reasoning steps rather than only the final result. For example, the notion of a Process Reward Model (PRM) that can judge each intermediate step as correct or not aligns exactly with the idea of scoring intermediate reasoning components. Text that emphasizes step-by-step verification or solving problems by verifying each step supports the same principle of per-step evaluation. Additional work showing that process supervision can train reward models that reward each correct step of reasoning strengthens the claim that a system can assign value to intermediate critiques, not just outcomes. References discussing explicit chain-of-thought reasoning with verification or stepwise critique provide concrete methods that map to labeling and scoring each part of the reasoning chain. Collectively, these excerpts establish a lineage of techniques—from process supervision to stepwise verification and direct incentives for intermediate steps—that underpin the described training approach. Quotations such as guiding learning step-by-step with a Process Reward Model, and evidence that rewarding correct steps yields improvements in reasoning tasks, directly support the proposed field value. In addition, discussions of step-by-step verification methods illustrate practical implementations that align with scoring the sufficiency and correctness of each reasoning segment. While other excerpts expand on constitutional AI, RLHF, and general design principles, their content is ancillary to the specific mechanism of per-step reward signaling for reasoning chains and thus are considered secondary support.Overall, the strongest support comes from descriptions of process supervision and PRMs that score intermediate steps, reinforced by explicit step-by-step verification approaches that validate each part of the reasoning chain.

- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.

### training_approaches_for_llm_reasoning.4.key_paper_or_proponent
**Confidence:** medium

The target field value concerns training approaches to teach an LLM to reason about WHY a design decision is good or bad, with specific references to process supervision, chain-of-thought prompting, and evaluating design reasoning chains. Excerpts that discuss process supervision and guiding learning step-by-step provide direct support for this theme, including methods to reward or supervise intermediate reasoning steps and explicit CoT reasoning with verification. The first excerpt outlines process-supervised learning improving reliability, which aligns with training models to evaluate steps rather than just producing outputs. The fourth excerpt introduces GenPRM and explicit chain-of-thought reasoning with code verification, which closely matches the aim of making models articulate and verify their reasoning steps. The fifth excerpt discusses Direct Preference Optimization, a method to align models with human preferences, which is relevant to training approaches that shape responses and reasoning quality. The second excerpt explicitly describes process-based supervision and the concept of a Process Reward Model for intermediate steps, further supporting the approach of supervising reasoning chains. The remaining excerpts continue to discuss related process-supervision and evaluation strategies that underpin training methods to improve design reasoning or critique abilities. However, none of the excerpts directly mention the exact inspiration sources (NIMA/AVA or Bayesian surprise) referenced in the fine-grained value, so those particular connections are not evidenced here. Overall, the strongest support comes from sources that describe supervising and rewarding step-by-step reasoning and evaluating intermediate steps, with additional supportive content on process-based supervision and preference alignment.”,

- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before

### training_approaches_for_llm_reasoning.1.approach_name
**Confidence:** high

The most relevant excerpts discuss process supervision as a method to reward or judge intermediate steps in reasoning, which directly supports applying a similar approach to design reasoning chains in LLMs. Specifically, statements about training a Process Reward Model that judges each intermediate step as correct or not show how to institutionalize step-by-step evaluation, which is exactly what ‘process supervision on design reasoning chains’ entails when teaching an LLM to reason about why a design decision is good or bad. These excerpts also demonstrate empirical benefits in mathematical reasoning by rewarding correct steps, illustrating how process supervision can improve the quality and reliability of stepwise reasoning, which is transferable to design critique. An additional excerpt discusses explicit chain-of-thought reasoning with verification, aligning with methods that encourage transparent, stepwise reasoning and validation, further supporting the applicability of process supervision concepts to design reasoning chains. Taken together, the supporting content substantiates the viability and benefits of process supervision as a training approach to govern and improve stepwise design reasoning in LLMs.

- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before

### training_approaches_for_llm_reasoning.4.suitability_for_design_critique
**Confidence:** medium

To ground abstract design reasoning in concrete perceptual cues, a process-supervised approach can be used where the model is trained to evaluate each intermediate reasoning step rather than only the final outcome. This aligns with the idea of a Process Reward Model that judges intermediate steps for correctness, which provides a mechanism to link perceptual cues (a potential mismatch) to deliberate critique. Moreover, a generative process-reward framework that enforces explicit chain-of-thought reasoning with pre-verification (such as code verification or other checks) helps ensure that the model’s justification is not only present but also inconsistently aligned with design principles. An approach that rewards each correct step of reasoning has been shown to improve problem solving, indicating that stepwise validation can promote better justification quality. In practice, process supervision has been demonstrated to yield more reliable reward signals than outcome-only supervision, which supports building a design critique system that uses perceptual cues as triggers for deeper principled justification. Additional work illustrating stepwise verification and explicit CoT reasoning provides concrete mechanisms to implement the requested grounding: the model can outline perceptual cues, justify them, and then connect these cues to high-level design principles, enabling a holistic critique grounded in visual reality while remaining auditable and rule-based.

- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.

### training_approaches_for_llm_reasoning.1.suitability_for_design_critique
**Confidence:** high

The target field value describes a methodologically straightforward and powerful approach for design critique that relies on decomposing critiques into a structured chain (identify issue -> link to principle -> evidence -> user impact) and then using a Process Reward Model (PRM) to train more reliable critic models via reinforcement learning or to steer reranking of critique paths at inference time. The most directly relevant content explains process supervision as training a Process Reward Model that judges intermediate reasoning steps, i.e., evaluating each step for correctness rather than only final outcomes. This directly supports building a dataset of critiques where each step can be evaluated and improved, which is central to decomposing critiques into issue-principle-evidence-impact. Additional highly relevant material demonstrates that process supervision can train reward models that reward correct reasoning steps, achieving stronger performance in reasoning tasks, and that supervising processing steps (not just end results) yields more reliable models. There is also explicit evidence that models can be guided to verify step-by-step reasoning and to perform explicit chain-of-thought reasoning with verification before producing conclusions, which aligns with ensuring critiques follow a logical, verifiable path. Another piece discusses step-by-step verification and the effectiveness of process-supervised models, underscoring the utility of structured reasoning and evaluation of intermediate steps in critique-style outputs. Finally, literature on directly optimizing preferences and on leveraging chain-of-thought-type reasoning in a supervised or reward-augmented manner provides additional mechanisms to steer critique quality and path selection, which is consistent with training a critic that not only outputs a critique but does so through a principled, verifiable reasoning process. Taken together, these excerpts support creating a decomposed critique dataset and employing a PRM-based training and inference reranking to yield robust design critiques with transparent reasoning paths.

- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We

### training_approaches_for_llm_reasoning.0.key_paper_or_proponent
**Confidence:** high

The requested fine-grained field value identifies Constitutional AI (Anthropic) as described in arXiv:2212.08073 as the key proponent. The most directly relevant materials are excerpts that explicitly reference Constitutional AI and its role in training harmless, helpful AI via AI feedback mechanisms. The first excerpt introduces Constitutional AI as a method for training a harmless AI assistant through self-improvement without human-labeled harmful outputs, directly supporting the field value as a description of Constitutional AI and its origin. A closely related excerpt reiterates this by detailing prior experiments and the impact of RLHF within that Constitutional AI framework, further grounding the field value in the same paper and its lineage. A third excerpt, though slightly more bibliographic in nature, cites the same work with the full title and author list, reinforcing that Constitutional AI is the central proponent and primary reference for the described approach. Collectively, these excerpts provide direct alignment with the fine-grained field value, confirming both the paper and its core idea as described in arXiv:2212.08073.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more

### training_approaches_for_llm_reasoning.1.key_paper_or_proponent
**Confidence:** high

The field value references validation of training approaches for LLM reasoning in mathematics and code-related domains, anchored by arXiv:2305.20050 which demonstrates that process supervision improves mathematical reasoning by rewarding correct steps, and by GenPRM (arXiv:2504.00891) which introduces a generative process reward model with explicit chain-of-thought reasoning and code verification. Excerpt describing the arXiv:2305.20050 work states that process supervision leads to state-of-the-art performance in mathematical problem solving by rewarding each correct step of reasoning, directly aligning with the notion of validating reasoning-focused training strategies in math domains. Excerpt referencing another arXiv entry confirms the broader class of process-supervised approaches to reasoning tasks and reward modeling in AI systems, reinforcing that such training signals have been validated in similar reasoning-heavy domains. Finally, the GenPRM excerpt explicitly mentions explicit CoT reasoning with code verification, aligning with the idea of advanced training approaches that teach rationale generation alongside outputs. Taken together, these excerpts substantiate the field value’s claim about validated reasoning-focused training strategies in math and code domains, with concrete evidence from the specified papers and related advancements.

- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.

### training_approaches_for_llm_reasoning.2.key_paper_or_proponent
**Confidence:** low

The most directly relevant content discusses Direct Preference Optimization (DPO) as a method for training language models to adhere to human preferences without traditional reward modeling or reinforcement learning, and it also mentions a parameterization of the reward model that enables closed-form extraction of the optimal policy. This aligns squarely with the field value’s first component, identifying DPO (arXiv:2305.18290) as a key proponent in training approaches that embed preference-based signals into model training and decision-making processes. The accompanying excerpts further elaborate on how reward functions relate to optimal policies, which reinforces the notion of preference-aligned training rather than purely outcome-focused generation. Although the excerpts do not provide explicit information about RRHF (arXiv:2304.05302), they establish a strong anchor around DPO and its relevance to design reasoning and evaluation through preference-based supervision. A related excerpt discusses step-by-step verification and process-oriented supervision, which resonates with the broader theme of reasoning transparency and critique in design processes, complementing the DPO emphasis by illustrating how intermediate reasoning considerations can be guided or evaluated during training. Taken together, these excerpts substantiate the DPO component of the field value and offer contextual support for process-oriented approaches to model training, even though explicit RRHF content is not present in the provided excerpts.

- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized

### existing_applications_and_benchmarks.3.relevance_to_design_ai
**Confidence:** high

The most relevant excerpt directly presents a UI-focused model variant (Ferret-UI) engineered for enhanced understanding of UI screens with capabilities like referring, grounding, and reasoning. This aligns closely with a design-critique role where the model must reason about UI decisions and provide justified critiques, which supports the idea of an AI design critic and benchmarks its reasoning capabilities. The next excerpt discusses the role of large language models in UI/UX design, providing context about how LLMs are applied in design workflows and evaluation scenarios, which is important for framing benchmarking against human evaluators in UI contexts. A third related excerpt surveys UX research in the age of LLMs, highlighting quality definition, prompting, and value shaping in UI contexts—key for establishing what constitutes good design critique and how to measure it against human standards. A further excerpt on CLUE describes an LLM-enabled interviewer that gauges user experience in real time, illustrating how design-critique performance could be validated via human-in-the-loop evaluations and feedback, a practical benchmarking paradigm. Additional excerpts discuss process supervision and constitutional AI, which, while not about design critique per se, provide established methods for improving reliability, safety, and alignment of reasoning systems, thus underpinning the reliability and evaluation framework needed for a credible design-critic benchmark. The remaining entries further reinforce the broader landscape of training and evaluation approaches (e.g., reward modeling for reasoning steps, and general improvements in harmlessness and instruction-following) that support the feasibility of measuring model reasoning quality against expert standards in UI design contexts. Overall, the strongest alignment is with concrete UI-oriented architectures and evaluation methodologies; supporting entries provide the reliability and evaluation framework necessary for credible benchmarking of a design-critiquing AI against human experts.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more

### training_approaches_for_llm_reasoning.3.key_paper_or_proponent
**Confidence:** high

The fine-grained field value points to the Self-Refine approach (arXiv:2303.17651) as a proponent for iterative refinement with self-feedback to improve initial LLM outputs. The cited excerpt explicitly states: "Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement." This directly supports the idea that the primary cited paper is about a self-guided iterative refinement process, which aligns with the field value referencing that exact work. While other excerpts discuss related avenues (process supervision, constitutional AI, direct preference optimization, etc.), they do not specify or reinforce the Self-Refine methodology or its faithfulness improvements via selective rationalization. Therefore, the single excerpt most directly supports the fine-grained field value at hand, with the rest providing contextual background on related training approaches but not on this specific Self-Refine citation. 

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### training_approaches_for_llm_reasoning.2.approach_name
**Confidence:** high

The field value corresponds to an approach where the model is trained to align with designer or human preferences through explicit ranking signals rather than only optimizing for final outputs. The most directly supportive content presents a framework for directly optimizing a language model to adhere to human preferences without separate reward modeling or RL steps, indicating a method where the policy is chosen to maximize an explicit preference signal. Additionally, discussions about a redesigned reward model parameterization that enables extraction of the optimal policy in closed form reinforce the idea of optimizing with designer-informed preferences as a core objective, rather than relying solely on post-hoc critiques or outcomes. Further, mentions of using trainer-provided designer preferences as rewards or guidance in the sequence of training align with the notion of pursuing preference optimization driven by designer rankings. These excerpts collectively establish the feasibility and mechanics of preference-based optimization as a design-focused training approach, distinct from purely rule-based or outcome-based supervision and from generic RLHF, while still being conceptually related to it. The supporting passages explicitly describe (a) directly optimizing to satisfy human preferences, (b) parameterizing the reward model to yield favorable policies aligned with those preferences, and (c) using designer rankings as a reward signal, which together map precisely onto the target field value of preference optimization from designer rankings.

- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward

### training_approaches_for_llm_reasoning.5.core_principle
**Confidence:** medium

The most directly relevant excerpt describes GenPRM, a framework for explicit Chain-of-Thought-style reasoning with a verification step before delivering a final answer. This aligns with the notion of reasoning chains and a verification/critique process that could ground inference-time judgments and ground them in verifiable intermediate steps, similar in spirit to a test-time quality control mechanism that selects the best critique chain. The second relevant piece discusses Self-Refine, an approach that improves outputs through iterative feedback and refinement, which resonates with the idea of iterative critique or multi-pass evaluation at inference time to improve answer quality. The third excerpt outlines Process-Based Supervision in AI, highlighting the role of a Process Reward Model to judge intermediate reasoning steps, which is conceptually aligned with incorporating a dedicated critique or evaluation mechanism during inference, akin to retrieval-augmented critique or ground-truth-like evaluation of each reasoning step. The fourth excerpt, on process supervision in mathematical reasoning, directly supports the broader idea that supervising the reasoning process (even if focused on training) improves the reliability and quality of reasoning, which underpins the rationale for inference-time critique and structured reasoning chains as a design principle, even though it centers on training objectives rather than runtime application.

- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)

### computational_models_for_wrongness_detection.3.mechanism
**Confidence:** high

The fine-grained field value describes a Multimodal Large Language Model explicitly fine-tuned to understand mobile UIs by processing screenshots, reasoning about element relationships, identifying components, and evaluating UI correctness and quality. The clearest evidence of this directly exists in the excerpt that introduces a Multimodal LLM specialized for mobile UI understanding with grounding and reasoning capabilities. This supports the core claim that such a model can perform UI-oriented evaluation beyond static rules. The additional excerpts provide relevant methods and frameworks for training and aligning such a model: constitutional AI approaches offer a path to train the model to be helpful and principled in its reasoning about design decisions; process supervision and reward modeling discuss how to shape intermediate reasoning and evaluation steps rather than only final outputs, which is crucial for a model to justify why a UI design is good or bad; and discussions of related multimodal or visual assessment work inform how to handle visual data and evaluation criteria when operating on UI screenshots. Taken together, these excerpts map a plausible ecosystem for developing the described MLLM with capabilities for understanding UI elements, reasoning about design correctness, and producing design rationale.

- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Small LLMs Can Master Math Reasoning with Self-Evolved ...](https://arxiv.org/html/2501.04519v1)
  > Jan 8, 2025 — As for the reward model, process reward modeling (PRM) shows a great potential by providing fine-grained feedback on intermediate steps (Lightman et al., 2023)
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Bayesian surprise attracts human attention](https://www.sciencedirect.com/science/article/pii/S0042698908004380)
  > by L Itti · 2009 · Cited by 1589 — Bayesian surprise is a strong attractor of human attention, with 72% of all gaze shifts directed towards locations more surprising than the average.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and

### training_approaches_for_llm_reasoning.0.suitability_for_design_critique
**Confidence:** high

The target fine-grained field value centers on using a constitutional framework to encode expert design knowledge into a design-critique capability, and on training approaches that enable step-by-step design reasoning and justification rather than only producing designs. Excerpts that discuss Constitutional AI describe training a harmless/alignable agent via a formalized set of principles, which directly supports the idea of encoding design principles as a constitution to ground critiques in established theory. The discussion also notes that RLHF and reward-based alignment improve instruction-following and can be extended to enforce principle-based critique, aligning with the notion of structuring feedback around design principles rather than output alone. Multiple excerpts cover process-based supervision and stepwise reasoning during training, which maps to training approaches that reward correct intermediate design reasoning steps and can produce traceable design critiques. This aligns with the proposed emphasis on chain-of-thought prompting and design rationale generation, moving beyond mere generation to justification. Additional excerpts discuss direct preference optimization and reward modeling for reasoning, which can be leveraged to train models to produce grounded design critiques and verifiable rationales. Finally, approaches such as Self-Refine provide methods for iterative improvement with self-feedback, which is compatible with refining design critique chains rather than only final designs. Taken together, these excerpts collectively support a training strategy that (a) encodes domain knowledge as a constitution to guide critique, (b) uses process supervision and stepwise reasoning to learn design rationale, and (c) leverages preference-based and reward-based methods to reinforce grounded critique behavior and auditability of design reasoning over time.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward

### training_approaches_for_llm_reasoning.2.suitability_for_design_critique
**Confidence:** high

The most relevant material discusses training regimes that explicitly reward, supervise, or refine intermediate reasoning steps, which is central to teaching an LLM to reason about why a design decision is good or bad rather than simply producing a design output. The idea of process-based supervision is described as guiding learning step-by-step through a Process Reward Model that judges intermediate steps for correctness, which directly aligns with teaching an LLM to articulate design critique as a sequence of justified steps. Iterative refinement with self-feedback further supports improving initial outputs by repeatedly evaluating and improving reasoning chains, a mechanism that helps the model learn to justify and sharpen its critiques. Work that makes explicit that the model should perform chain-of-thought style reasoning with verification (for example, reasoning with code verification) demonstrates a concrete method for ensuring that the reasoning is transparent and inspectable, which is essential for design rationale. Standalone stepwise verification and process supervision in mathematical domains provide analogous evidence that guiding reasoning chains improves reliability and justification quality, which is transferable to design critique. Constitutional AI and related work on harmlessness and alignment show how to structure training signals to encourage helpful, honest, and harmless reasoning, which is relevant to ensuring that design critiques are usable and trustworthy. The idea of reward modeling that focuses on human preferences and structured feedback (direct preference optimization) also informs how to shape the critique quality, even though its primary focus is on preference alignment rather than step-by-step design critique per se. Taken together, these excerpts collectively support a view that training approaches which explicitly supervise, supervise intermediate steps, verify reasoning, and align the model with designer-oriented principles are suitable for teaching LLMs to reason about design rationale as opposed to merely generating designs.

- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We

### training_approaches_for_llm_reasoning.2.core_principle
**Confidence:** high

The central claim describes a training approach that aligns an LLM to expert designer judgments by collecting pairwise rankings of critiques and optimizing the model’s policy accordingly. Excerpts that introduce Direct Preference Optimization show a concrete method to optimize an LLM to follow human preferences without traditional reward modeling, and other excerpts discuss RLHF and related policy-optimization frameworks, which directly support the idea of using expert critiques to shape reasoning quality. Additional excerpts on process supervision and stepwise reasoning provide concrete mechanisms (critiques of intermediate steps, ordering of reasoning, and channeling chain-of-thought) that reinforce how the model can be guided to reason more transparently and justifiably. Constitutional AI discussions add a framework for safe and helpful reasoning, which complements the notion of high-quality, designer-aligned reasoning. Together, these excerpts map onto the field value by presenting concrete methods for leveraging expert designer feedback to train LLMs to produce high-quality, transparent design critiques and reasoning chains.

- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)

### training_approaches_for_llm_reasoning.0.approach_name
**Confidence:** high

The most directly relevant materials describe Constitutional AI as a framework for aligning AI behavior with safety and instruction-following objectives through mechanisms like AI feedback loops and harm-avoidance. These sources explicitly discuss training a harmless or helpful AI assistant via constitutional-like guidelines and feedback, which maps well to adapting Constitutional AI to design principles that govern how an AI assesses and critiques design decisions. In particular, statements about training AI to be harmless and to follow instructions through structured feedback provide concrete evidence of applying constitutional-style approaches to AI behavior, which aligns with the requested design-principled adaptation. Additionally, references that describe the broader family of alignment techniques—such as RLHF improvements, reward modeling, and process-based supervision—complement the constitutional approach by outlining practical methods to enforce reasoning quality and design rationale, which are essential when teaching an LLM to critique design decisions rather than merely generate designs. Although some excerpts focus on process supervision or reward-based methods rather than the constitutional framing per se, they support the overall ecosystem of training techniques that would be used to adapt constitutional principles to design reasoning tasks. Taken together, the strongest support comes from the explicit constitutional AI discussions, with subsequent context from related training methodologies that could enable the design-principled adaptation.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before

### training_approaches_for_llm_reasoning.0.core_principle
**Confidence:** medium

The fine-grained field value envisions a training regime where a Design Constitution (built from established principles) guides critique of designs, followed by self-revision of critiques to align outputs, and final fine-tuning on the improved reasoning outputs. Excerpts describing process-based or stepwise supervision explicitly discuss training models to evaluate and reward correct intermediate reasoning steps, which directly supports the idea of teaching models to reason about why a design decision is good or bad through a monitored critique process. For example, process supervision literature explains using a Process Reward Model to judge intermediate steps and reward correct reasoning steps, which aligns with the concept of guiding a model to critique and revise its reasoning iteratively. Other excerpts discuss constitutional AI approaches that train models to follow principled guidance and harm/alignment-oriented feedback, which is thematically adjacent to building a principled Design Constitution for critique and alignment. Additional excerpts offer broader perspectives on RLHF, direct preference optimization, and related reward/critique mechanisms that provide context for how design rationale could be encouraged beyond mere design output. Together, these excerpts support a pipeline where (a) a constitution of principles informs evaluation, (b) the model critiques, (c) self-critiques and revisions occur to improve alignment with the constitution, and (d) the resulting reasoning traces are used to fine-tune the model.

- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward

### training_approaches_for_llm_reasoning.0.abbreviation
**Confidence:** high

The field value CAI corresponds to the concept of Constitutional AI, which is explicitly described in multiple excerpts as a framework for training AI assistants to be helpful and harmless, often via methods like AI feedback and RLHF. The most directly relevant passages discuss Constitutional AI and its use in training harmless AI through feedback mechanisms, which aligns with the meaning of CAI as a governance/alignment approach. The included excerpts also reference the empirical findings and implementation details of Constitutional AI, reinforcing their relevance to the field value. The remaining excerpt expands on how CAI fits within broader alignment narratives and training paradigms (such as demonstrations of RLHF effectiveness and related constitutional/harmlessness themes), providing contextual support for the CAI concept without introducing unrelated topics. Based on this, the strongest support comes from passages that explicitly name Constitutional AI and describe its core methods; secondary support comes from passages that discuss related alignment approaches that contextualize Constitutional AI within the same family of methods.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward

### training_approaches_for_llm_reasoning.3.abbreviation
**Confidence:** high

The most relevant excerpts directly address chain-of-thought and iterative refinement approaches. For example, the description of Self-Refine as a method for improving initial outputs through iterative feedback and refinement provides a concrete mechanism that matches the target field value of CoT combined with self-improvement. Excerpts about process supervision and guiding step-by-step reasoning (judging intermediate steps as correct or not) reinforce the idea of making reasoning explicit and verifiable, which aligns with a CoT or self-refinement mindset applied to design judgments. Additional context on training paradigms such as constitutional AI and RLHF with designer preferences helps situate CoT/Self-Refine within broader frameworks for teaching models to reason about why a design decision is good or bad, not just producing outputs. Taken together, the strongest signal comes from explicit descriptions of iterative, stepwise, and self-guided refinement of reasoning, followed by works emphasizing process-oriented supervision that rewards correct reasoning steps. The other items provide adjacent context (e.g., direct preference optimization, harmlessness via AI feedback) but do not directly claim CoT or Self-Refine mechanics, thus are supportive rather than central to the specific field value.

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before

### training_approaches_for_llm_reasoning.5.abbreviation
**Confidence:** high

The target finegrained field value, Inference Orchestration, refers to how an LLM coordinates and manages its internal reasoning and inference steps during design critique or decision-making, rather than merely producing end results. The most relevant excerpts discuss explicit mechanisms for guiding, supervising, and refining intermediate reasoning steps, which directly map to orchestration of inference chains. For example, an excerpt describes explicit Chain-of-Thought reasoning with code verification before proceeding, which embodies stepwise inference control and verification rules. Another excerpt presents a process-supervised model that solves problems by producing and validating reasoning steps, illustrating how orchestration of each reasoning step improves reliability. Related work on improving mathematical reasoning with process supervision further shows how rewarding correct intermediate steps helps align the reasoning process with correct inferences, effectively orchestrating the inference path. Additional sources on step-by-step verification, iterative refinement through self-feedback, and design-oriented application of process supervision (including reward models that judge each intermediate step) reinforce the concept of structured inference orchestration rather than solely rewarding final outputs. Although some items focus on alignment or preference optimization (which are adjacent to but not identical to reasoning orchestration), they still contribute to the broader context of guiding internal reasoning processes. Collectively, these excerpts support the idea that systematic, verifiable, and supervised reasoning steps constitute a robust approach to Inference Orchestration in LLMs.

- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized

### training_approaches_for_llm_reasoning.3.core_principle
**Confidence:** high

The most relevant excerpt explicitly describes Self-Refine, an iterative loop where the model critiques and improves its own output, which aligns with the idea of an iterative refinement process that enhances reasoning quality before presenting a verdict. It provides a concrete mechanism for how pre-commitment to reasoning structure and subsequent self-evaluation can elevate final judgments, matching the notion of a refined design-reasoning loop. Excerpts about process supervision and step-wise reasoning (training a model to reward correct intermediate steps, i.e., chain-of-thought reasoning) directly support the field value’s emphasis on promoting step-by-step justification and rationale before final outputs. They describe training regimes that incentivize reasoning chains rather than just outcomes, which is central to the principle of making reasoning explicit prior to verdicts. Additional items discuss constitutional AI and RLHF-style approaches that aim to improve alignment and harmlessness, which are relevant to high-level principles for designing robust reasoning systems and how to shape the model’s reasoning behavior in practice. Together, these excerpts map to the core principles in the field value: supervise-and-structure reasoning, promote explicit justification through chain-of-thought, and use iterative self-improvement to reach better conclusions before output. The most supportive pieces are those that describe explicit step-by-step reasoning enforcement and iterative refinement; others provide broader alignment and supervision context that complements the principle.

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward

### training_approaches_for_llm_reasoning.5.approach_name
**Confidence:** medium

- A passage describing a generative process reward model that performs explicit Chain-of-Thought reasoning with code verification before proceeding directly maps to inference-time orchestration because it describes organizing and validating reasoning steps at inference time rather than purely training-time behavior.
- A second passage on Self-Refine describes iterative refinement of initial outputs via feedback during inference, which is a concrete example of orchestrating and improving reasoning as outputs are produced.
- Passages about process supervision and design of reasoning chains (process supervision on design reasoning chains, constitutional AI, RLHF with designer preference) provide methodologies that influence how reasoning is guided, controlled, or evaluated, thus contributing to the broader concept of inference-time orchestration even if they are not exclusively about inference-time action.
- References to prompting for step-by-step design critique (chain-of-thought prompting for design critique) illustrate explicit structuring of reasoning steps at inference time to justify decisions, aligning with the idea of orchestration during inference.
- Additional excerpts on direct preference optimization and related training-time strategies give context on how overall objectives shape reasoning behavior, which indirectly supports inference-time orchestration objectives, though they are less direct about inference-time execution.
- Overall, the most directly relevant content centers on explicit CoT with verification and iterative self-refinement during inference, with other items providing supportive context about how to guide, supervise, or shape reasoning processes in inference.

- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.

### training_approaches_for_llm_reasoning.3.suitability_for_design_critique
**Confidence:** high

The strongest support comes from excerpts that explicitly discuss iterative refinement and process-guided reasoning. One excerpt describes an approach where outputs from LLMs are improved through iterative feedback and refinement, which directly aligns with forcing the model to reveal its work and then refine it, thereby increasing the robustness and transparency of its reasoning in design critique. Related excerpts discuss process supervision that rewards correct reasoning steps, which supports the idea of guiding the model to articulate and verify its reasoning steps before delivering a final critique. Additional items describe leveraging chain-of-thought style prompting and the broader idea of training or supervising models to produce design rationale, not just outputs, which is precisely the aim of improving critique quality and reducing post-hoc confabulation. Some items add broader alignment techniques (constitutional AI, harmlessness through AI feedback) that provide context for how to shape and constrain model reasoning to be more reliable and aligned with design principles. A couple of excerpts introduce methods that optimize preferences or reward models in a way that could support stepwise justification, even if not exclusively focused on design critique; they still offer relevant mechanisms for eliciting explicit reasoning. Finally, there are excerpts specifically noting CoT reasoning, chain-of-thought verification, and related methods that underscore the importance of making the reasoning process explicit and verifiable, which is central to the field value in question.

- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.

### existing_applications_and_benchmarks.6.relevance_to_design_ai
**Confidence:** medium

To align an AI critic with expert designer judgments, sources show that guiding AI with principled alignment (Constitutional AI) helps ensure outputs are not only correct but also useful and safe for professional audiences. Demonstrations of process supervision and stepwise reasoning indicate that rewarding or supervising the correctness of each reasoning step yields critiques that reflect expert-level deliberation rather than surface-level outputs. Techniques like self-refinement and iterative feedback further improve the quality and usefulness of critiques by enabling the system to reassess and improve its design judgments over time. Domain-relevant UI/UX and designer-feedback literature underscores the importance of grounding critiques in practical design considerations and real-world designer expectations, which supports the goal of a critique that resonates with expert designers rather than merely producing technically valid designs.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [The role of large language models in UI/UX design](https://arxiv.org/html/2507.04469v1)
  > Jul 6, 2025 — This systematic literature review examines the role of large language models (LLMs) in UI/UX design, synthesizing findings from 38 peer-reviewed studies.
- [Improving User Interface Generation Models from Designer ...](https://machinelearning.apple.com/research/designer-feedback)
  > Jan 6, 2026 — In this paper, we present Ferret-UI, a new MLLM tailored for enhanced understanding of mobile UI screens, equipped with referring, grounding, and reasoning
- [Same, but new: UX Research in the age of LLMs](https://uxdesign.cc/same-same-but-new-ux-research-in-the-age-of-llms-36285d007845)
  > Jan 6, 2026 — Same, but new: UX Research in the age of LLMs. How researchers can define quality, guide prompts, and shape the value of AI outputs.
- [Understand User Opinions of Large Language Models via ...](https://aclanthology.org/2025.findings-acl.714.pdf)
  > by M Liu · 2025 · Cited by 4 — This paper presents CLUE, an LLM-powered in- terviewer that conducts in-the-moment user experience interviews, right after users inter- act with LLMs, and
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [NIMA: Neural Image Assessment](https://arxiv.org/pdf/1709.05424)
  > by H Talebi · 2017 · Cited by 1528 — The AVA dataset contains about 255,000 images, rated based on aesthetic qualities by amateur photographers1. Each photo is scored by an average of 200 people in
- [Introducing NIMA: Neural Image Assessment - Google Research](https://research.google/blog/introducing-nima-neural-image-assessment/)
  > Dec 18, 2017 — Some test photos from the large-scale database for Aesthetic Visual Analysis (AVA) dataset, as ranked by NIMA, are shown below. Each AVA photo is scored by

### training_approaches_for_llm_reasoning.2.abbreviation
**Confidence:** high

Direct Preference Optimization (DPO) is presented as a parameterization and approach to optimize language models with human preferences, effectively offering an alternative to traditional RLHF pipelines. This directly maps to the field value components by identifying DPO as a concrete RLHF-analog or RLHF-related method for preference-guided training. The RLHF-related content is reinforced by references describing Reinforcement Learning from Human Feedback and its role in guiding model behavior, including discussions of reward modeling and preference-based training strategies. Additional related excerpts discuss process supervision and reward-model training (e.g., process reward models and supervising intermediate reasoning steps), which are closely aligned with training paradigms that complement or extend RLHF and DPO for design reasoning and step-by-step justification. Content on constitutional AI and harmfulness/harmlessness from AI feedback provides broader context on how preferred behaviors and safety constraints are learned, which is relevant to evaluating different training approaches within the same broad family. Excerpts that explicitly describe CoT reasoning with process verification and improvements via process supervision further connect to training methodologies that aim to improve step-by-step justification rather than only final outputs. Taken together, these excerpts support the field value by identifying: (a) DPO as a direct alternative or component to RLHF-based preference optimization, (b) RLHF as a foundational approach, and (c) related supervision and reward-model techniques that shape how models reason about design decisions, aligning with the broader inquiry about training methods for design reasoning and rationale generation.

- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### training_approaches_for_llm_reasoning.5.key_paper_or_proponent
**Confidence:** medium

The most relevant content directly mentions GenPRM as a generative process reward model that performs explicit chain-of-thought reasoning with code verification before proceeding. This aligns with the notion of test-time scaling or optimizing the reasoning process through a structured, verifiable reasoning pipeline, which is central to the requested finegrained field value. The next most relevant materials discuss step-by-step verification and process supervision, which relate to how reasoning chains can be supervised or evaluated to improve reliability and scalability of reasoning in LLMs. These excerpts provide evidence of architectural and training approaches that emphasize intermediate reasoning steps and verifiability, which conceptually support scaling reasoning processes in practice. Remaining excerpts focus on constitutional AI and preference-based optimization, which, while important for broader training regimes, do not directly substantiate GenPRM-based test-time scaling or the exact cited arXiv references. Together, they sketch a landscape where GenPRM-style process rewards and stepwise reasoning are part of a broader family of training approaches aimed at improving the reliability and scalability of LLM reasoning for design-oriented tasks.

- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.

### training_approaches_for_llm_reasoning.3.approach_name
**Confidence:** high

The strongest support comes from works that explicitly enable chain-of-thought or explicit stepwise reasoning in the training objective or evaluation. For example, a study on a generative reward model that performs explicit Chain-of-Thought reasoning with code verification before producing outputs directly demonstrates a rationale-first stance in training and evaluation. This aligns closely with the idea of training objectives that prioritize reasoning traces over purely final outputs. Additional sources discuss process supervision that rewards correct intermediate steps and guides the model to assess each step, which embodies the principle of prioritizing reasoning process fidelity. Other references describe process supervision as a mechanism to judge and reward intermediate steps, or to supervise step-by-step reasoning to improve problem solving, which further supports a rationale-first approach. Several works on conditioning models to follow structured reasoning through stepwise critique, verification, or labeled intermediate reasoning align with training regimes that emphasize why a design decision is good or bad, not only producing the end result. Contextual alignment literature (constitutional AI) provides a broader safety and preference-guided framework that complements the rationale-first objective by shaping how reasoning should be constrained and oriented toward helpful, harmless outcomes. Taken together, the excerpts indicate a coherent cluster of methods: explicit chain-of-thought reasoning, process supervision that rewards intermediate reasoning, and alignment-focused training to ensure reasoning remains principled and aligned with human preferences, all of which support the target finegrained field value about rationale-centric training methods for LLM design reasoning.

- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.

### training_approaches_for_llm_reasoning.5.suitability_for_design_critique
**Confidence:** high

The most relevant excerpts directly support the idea of training objectives and architectures that push LLMs toward verifiable, stepwise reasoning and evaluation of intermediate steps, which strengthens the final critique. For example, a work introducing a generative process reward model explicitly performs chain-of-thought reasoning with a verification step before proceeding, aligning with the idea that the critique should be grounded in traceable reasoning and validated steps. Studies on process supervision show that rewarding each correct step of reasoning leads to more reliable problem solving, which mirrors the requirement for a design critique that explains why decisions are good or bad rather than just outputting designs. Additional sources on process supervision demonstrate that guiding the model through structured, stepwise reasoning improves reliability, which is essential for robust design critique. Works on constitutional AI and RLHF discuss how alignment methods and preference-based training shape outputs to be more helpful and harmless, while still leveraging human feedback to steer reasoning paths, which complements the proposed use of debate or multiple reasoning paths to surface trade-offs and counterarguments. Self-refinement and iterative feedback literature further supports the idea that refining intermediate critiques can enhance final judgments. References to direct preference optimization and reward-model-based approaches underscore the feasibility and value of reranking or selecting among competing reasoning paths to choose the most logically sound critique, aligning with the role of PRM-based reranking. In sum, the cited material provides a coherent foundation for using retrieval-grounded evidence, structured debate-like critique, and PRM-guided path selection to improve design critique quality and robustness.


- [GenPRM: Scaling Test-Time Compute of Process Reward ...](https://arxiv.org/pdf/2504.00891)
  > by J Zhao · 2025 · Cited by 67 — In this work, we introduce GenPRM, a generative process reward model that performs explicit Chain-of-Thought (CoT) reasoning with code verification before
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [Reinforcement Learning from Human Feedback](https://arxiv.org/html/2504.12501v3)
  > Nov 2, 2025 — Process Reward Models require supervision at the end of each ... reward signals to encourage chain of thought reasoning in models throughout 2022 and 2023.
- [http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf](http://linkedin.com/pulse/constitutional-ai-how-claude-learns-helpful-harmless-honest-mizrahi-4ngzf)
  > Constitutional AI: How Claude Learns to Be Helpful, Harmless, and ...
Most AI alignment methods, including OpenAI's initial approach, use RLHF: Collect human preferences: Trainers rank model outputs; Train a reward
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Process-Based Supervision in AI: Guiding Learning Step- ...](https://medium.com/@sanderink.ursina/process-based-supervision-in-ai-guiding-learning-step-by-step-ddad77b17cfc)
  > In AI terms, process supervision often involves training a Process Reward Model (PRM) that can judge each intermediate step as correct or not. This is opposed
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/pdf/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper, we show how to directly optimize a language model to adhere to human preferences, without explicit reward modeling or reinforcement learning. We
- [Direct Preference Optimization: Your Language Model is ...](https://arxiv.org/abs/2305.18290)
  > by R Rafailov · 2023 · Cited by 9001 — In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form.
- [Direct Preference Optimization: Your Language Model is ...](https://neurips.cc/virtual/2023/poster/72164)
  > Dec 9, 2023 — In this paper, we leverage a mapping between reward functions and optimal policies to show that this constrained reward maximization problem can be optimized
- [Constitutional AI: Harmlessness from AI Feedback](https://bibbase.org/network/publication/bai-kadavath-kundu-askell-kernion-jones-chen-goldie-etal-constitutionalaiharmlessnessfromaifeedback-2022)
  > Dec 15, 2022 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more

### existing_applications_and_benchmarks.6.type
**Confidence:** high

The finegrained field value refers to a Training/Alignment Technique. Directly relevant support comes from excerpts describing how to train or align models for better reasoning, safety, and design critique. Constitutional AI papers discuss training a harmless AI assistant through self-improvement and alignment methods, which is a core training technique for alignment. The process supervision literature shows that rewarding intermediate steps or processes can improve reliability and reasoning quality, which is central to training models to reason about design decisions rather than just producing outputs. Iterative refinement approaches show how models can be improved through self-feedback, illustrating a concrete method of alignment via post-hoc improvement cycles. Together, these excerpts map to the concept of training and alignment techniques used to improve design reasoning, evaluation, and safe/desirable outputs, rather than purely producing surface outputs.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.

### existing_applications_and_benchmarks.6.description
**Confidence:** medium

The fine-grained field value concerns concrete training approaches that align language models with human preferences, including RLHF, DPO, and RRHF, as well as research on training models to generate design rationale. Excerpt describing Constitutional AI as a method for creating harmless AI through AI feedback explicitly notes that RLHF significantly improves models' ability to follow instructions, indicating RLHF as a core alignment technique. This directly supports the idea of RLHF being a foundational alignment strategy. The companion excerpt on the Constitutional AI PDF further reinforces this by detailing past experiments and the impact of RLHF on model behavior, strengthening the link between RLHF and improved alignment. Excerpts on process supervision and reward-modeling approaches discuss alternative or complementary strategies to align models (e.g., training reliable reward models via process supervision, improving reasoning with step-by-step supervision). These provide context that alignment research includes various supervision and feedback mechanisms, which is relevant to the broader set of methods listed (DPO, RRHF, RLHF). Excerpts on step-by-step verification and self-refinement illustrate practical implications of iterative feedback and critique, which relate to how alignment signals can be incorporated into training and evaluation beyond standard outcome optimization, aligning with the spirit of RRHF and chain-of-thought style reasoning. In sum, the most directly supportive items are those that explicitly discuss RLHF and its impact on alignment, while the others provide corroborating context about related supervised and feedback-based approaches that inform how DPO or RRHF could be operationalized. The cited content collectively supports the existence and utility of RLHF and related reward/feedback-based alignment methods, with weaker but relevant support for the broader family of process-oriented approaches.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [[2305.20050] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)
  > by H Lightman · 2023 · Cited by 3172 — Our process-supervised model solves 78% of problems from a representative subset of the MATH test set. Additionally, we show that active learning significantly
- [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
  > by A Madaan · 2023 · Cited by 3972 — We introduce Self-Refine, an approach for improving initial outputs from LLMs through iterative feedback and refinement.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and

### existing_applications_and_benchmarks.6.name
**Confidence:** medium

The most directly relevant content comes from excerpts that explicitly discuss RLHF and alignment through preference-based methods. One excerpt states that Constitutional AI and RLHF substantially improve a model’s ability to follow instructions, which directly ties into the idea of optimizing outputs through alignment with stated principles or designer preferences. Another excerpt highlights process supervision as a way to reward correct steps of reasoning, which aligns with the concept of preference optimization where intermediate reasoning steps are valued and reinforced. Additional excerpts describe how process supervision can yield more reliable reward models than outcome-only supervision, reinforcing the notion that preference-driven signals (not just final outcomes) are central to training. Supporting context comes from surveys of process reward models and discussions of reward-model design loops, illustrating the broader ecosystem in which preference optimization methods are researched and evaluated. Finally, constitutional-alignment papers provide a framework for harmlessness and principled behavior that can be integrated with preference-optimization approaches to guide model decision-making without explicit human labeling for every case. Collectively, these excerpts support the idea of optimizing models through structured preferences (RLHF/DPO/RRHF) and related process-supervision strategies, even though a few excerpts discuss adjacent topics (e.g., UI applications or image assessment) that are less directly about preference optimization.

- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/pdf/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — Past experiments [Bai et al., 2022] showed that. RLHF significantly improves the models' ability to follow instructions, and the HH model is significantly more
- [Improving mathematical reasoning with process supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)
  > May 31, 2023 — We've trained a model to achieve a new state-of-the-art in mathematical problem solving by rewarding each correct step of reasoning (“process supervision”)
- [arXiv:2305.20050v1 [cs.LG] 31 May 2023](https://arxiv.org/pdf/2305.20050)
  > May 31, 2023 — We have shown that process supervision can be used to train much more reliable reward models than outcome supervision in the domain of mathematical rea- soning.
- [A Survey of Process Reward Models: From Outcome ...](https://arxiv.org/html/2510.08049v3)
  > 3 days ago — This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)
  > by Y Bai · 2022 · Cited by 3571 — We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs.
