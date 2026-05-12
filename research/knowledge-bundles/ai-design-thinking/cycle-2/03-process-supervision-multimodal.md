---
query: "Deep dive into two technical bridges for AI design reasoning: (1) Process supervision and chain-of-thought for design — OpenAI's process reward models trained on reasoning steps (not just answers) transformed math reasoning. Has anyone applied this paradigm to design judgment? Is there research on training models to produce step-by-step design reasoning chains, where each step is verifiable and the process itself is the training signal? What would 'design process supervision' look like — who labels the steps, what makes a step correct? Include any chain-of-thought prompting research specifically for design critique or evaluation tasks. (2) Multimodal alignment of design reasoning to visual elements — linking verbal critique/reasoning to specific visual regions (bounding boxes, Figma layers, UI elements). What vision-language model capabilities exist for grounding text reasoning in visual design artifacts? How does GPT-4V, Gemini Vision, or Claude vision perform on design critique that references specific elements? What technical approaches exist for spatially-grounded design reasoning?"
processor: pro
run_id: trun_6b0c617b26214cd7a54f50e2fa1f3b25
created_at: 2026-05-03T07:09:06.225185Z
retrieved_at: 2026-05-03T07:18:26Z
---

# Research: Deep dive into two technical bridges for AI design reasoning: (1) Process supervision and chain-of-thought for design — OpenAI's process reward models trained on reasoning steps (not just answers) transformed math reasoning. Has anyone applied this paradigm to design judgment? Is there research on training models to produce step-by-step design reasoning chains, where each step is verifiable and the process itself is the training signal? What would 'design process supervision' look like — who labels the steps, what makes a step correct? Include any chain-of-thought prompting research specifically for design critique or evaluation tasks. (2) Multimodal alignment of design reasoning to visual elements — linking verbal critique/reasoning to specific visual regions (bounding boxes, Figma layers, UI elements). What vision-language model capabilities exist for grounding text reasoning in visual design artifacts? How does GPT-4V, Gemini Vision, or Claude vision perform on design critique that references specific elements? What technical approaches exist for spatially-grounded design reasoning?

## Findings

### Executive Summary

The application of process supervision and multimodal alignment as technical bridges for AI-powered design reasoning is an emerging field with significant progress in foundational components but no standardized, end-to-end implementation yet. For process supervision, analogous to OpenAI's work in mathematics, the key is to train models on the intermediate steps of a design critique rather than just the final outcome. While direct Process Reward Models (PRMs) for design are not yet common, datasets like UICrit are paving the way by providing process-like labels, including textual critiques, corresponding bounding boxes, and quality ratings from professional designers. This data structure makes it feasible to train models on verifiable steps, such as identifying an element, citing a design principle, and providing evidence. Methodologies from multimodal Chain-of-Thought (CoT) research, like Visual CoT and Grounded CoT, provide templates for training models to produce step-by-step reasoning grounded in visual evidence.

For multimodal alignment, the goal is to link this textual reasoning to specific visual elements. Specialized Vision-Language Models (VLMs) like Google's ScreenAI and datasets such as UGround/ScreenSpot have demonstrated strong capabilities in UI element localization and understanding. However, general-purpose flagship models like Gemini Vision, GPT-4o, and Claude 3.5 Sonnet, while capable of generating critiques, exhibit limited out-of-the-box accuracy in precisely localizing the elements they refer to, as shown by low Intersection over Union (IoU) scores in studies using the UICrit dataset. Their performance on nuanced design judgment also degrades on subtle comparisons. The path forward involves a synthesis of these two bridges: using rich, process-annotated datasets to fine-tune multi-task VLMs that can simultaneously generate coherent reasoning chains and accurately ground each step to a specific region in the design. Future work points towards integrating these capabilities directly into design tools like Figma and using programmatic verifiers for objective feedback.

### Process Supervision For Design Reasoning

Process supervision in the context of design is analogous to the Process Reward Models (PRMs) that have been successfully applied in domains like mathematics. Instead of training a model solely on the final outcome, such as a simple 'good' or 'bad' rating for a user interface, the model is trained and rewarded based on the intermediate, verifiable steps of a critique process. This approach focuses on the quality and correctness of the reasoning chain itself. In a design context, these steps could be broken down as follows: 1) Identify the specific UI element or elements of concern. 2) State the relevant design principle or heuristic that is being violated or followed (e.g., consistency, hierarchy, accessibility). 3) Measure or point to concrete evidence within the design, such as a specific color contrast ratio, a font size relative to the viewport, or an inconsistency in spacing. 4) Propose a specific fix or improvement. 5) Predict the likely impact of the issue or the proposed fix on the user experience. 6) Provide a confidence score for the critique. Each of these steps can serve as an individual training target or a signal for a reward model, teaching the AI not just *what* to conclude about a design, but *how* to reason its way to that conclusion in a structured and evidence-based manner.

### Current Research On Design Process Supervision

While the direct application of Process Reward Model (PRM) style reinforcement learning from human feedback (RLHF) is not yet a standard practice in the design domain, current research provides strong foundations and points toward this future. The most relevant work is centered around the UICrit dataset, which contains 3,059 human critiques of mobile UIs, complete with bounding boxes, quality ratings, and topical tags. The authors of the UICrit paper explicitly suggest that this dataset can be used to fine-tune multimodal LLMs and to train reward models on the quality of design critiques and ratings. Their research introduces a 'prompt chain' that first generates critiques and ratings, and then localizes the relevant bounding boxes in a separate step. This separation of process stages (reasoning then localization) and its validation via expert evaluation is a key step toward process supervision. The dataset's structure, with its region-of-evidence (bounding box) and rationale (critique text), makes per-step supervision feasible. For example, a reasoning step could be deemed 'correct' if its referenced region has a high Intersection over Union (IoU) with the ground-truth bounding box and its stated issue aligns with the labeled topics. Additionally, research on Multimodal Chain-of-Thought, such as Visual CoT and Grounded Chain-of-Thought (GCoT), provides established methodologies and datasets for training models on stepwise reasoning that is explicitly aligned with visual regions. Although not specific to UI design, these frameworks for creating and evaluating verifiable, grounded reasoning chains can be directly adapted for UI critique tasks.

### Chain Of Thought For Design Critique

Research has demonstrated the effectiveness of Chain-of-Thought (CoT) and similar step-by-step prompting techniques for improving AI-driven design critique and evaluation. The most prominent example is from the UICrit paper, which developed a high-performing pipeline using a multi-step prompt chain with Gemini Vision. Their best method involved: 1) A first prompt using targeted few-shot examples (selected based on task and visual similarity) to elicit textual critiques and quality ratings. 2) A second, separate prompt for localization, which provided the model with the generated critique and an enhanced screenshot featuring coordinate rulers or a patch grid to help it output precise bounding boxes. The authors found that separating critique generation from localization was crucial to avoid task overload and improve performance. This approach was validated through a user study with six design experts, who judged the critiques from this pipeline to have 55% higher quality scores than those from a simple zero-shot prompt. Furthermore, a separate study titled 'MLLM as a UI Judge' evaluated the performance of models like GPT-4o, Claude 3.5 Sonnet, and Llama-3.2-Vision on UI judgment tasks. While these models achieved over 75% accuracy in aligning with human Likert scores, their performance dropped significantly on nuanced pairwise comparisons. The authors of that study explicitly proposed exploring CoT prompting and reinforcement learning (RLHF) as key areas for future work to improve the fidelity and reliability of AI design judgment.

### Defining Design Process Supervision

**Labeling Process And Personnel:** The labeling process would be conducted by human experts, primarily professional designers and accessibility specialists. These labelers would be tasked with producing detailed critiques of user interfaces. Their process would involve not just writing the critique but also explicitly linking the textual feedback to specific regions in the UI, typically by drawing bounding boxes or referencing element IDs. They would also assign issue categories (e.g., layout, contrast, readability), justify their reasoning with measurable evidence where possible (e.g., citing contrast ratios, font sizes, or WCAG guidelines), and provide ratings for severity or overall quality. This human-generated data could be supplemented by automated checks, such as running an accessibility engine like axe-core, to serve as objective verifiers for certain types of issues.

**Step Correctness Criteria:** A reasoning step within a design critique chain would be considered 'correct' based on a multi-faceted evaluation. The criteria for correctness would include: (a) Grounding Accuracy: The referenced region (e.g., bounding box) must align with the ground-truth region identified by human labelers, typically measured by an Intersection over Union (IoU) threshold. (b) Factual Correctness: The stated issue must match the labeled topic or pass objective rule checks. For example, if the critique mentions a color contrast issue, the measured contrast ratio for the specified elements must indeed fall below the WCAG 2.x standard of 4.5:1. (c) Guideline Consistency: Any proposed fix must be consistent with established design principles and guidelines. (d) Predictive Alignment: If the model predicts a change in a quality rating based on the issue, the direction of that change should align with the ratings provided in the source dataset. Reward models could be trained to score rationales based on these criteria.

**Training Data Structure:** The training data would be structured to support the supervision of a multi-task model with distinct heads for reasoning generation and element localization. A typical training instance would be a complex data structure, akin to a tuple, containing: the input UI (e.g., a screenshot), a complete reasoning chain (the critique text), and the final critique summary or rating. The reasoning chain itself would be broken down into steps, with each step potentially linked to auxiliary labels such as: (i) a topic classification (e.g., 'layout', 'color'), (ii) a predicted quality rating, (iii) bounding box coordinates for grounding, and (iv) extracted evidence (e.g., text spans or measurements like '12pt font'). The evaluation protocol would then use this structure to optimize for multiple objectives, including critique validity, grounding IoU, topic F1 score, and rating Mean Absolute Error (MAE).


### Multimodal Alignment In Design Reasoning

Spatially-grounded design reasoning refers to the capability of AI systems to connect abstract reasoning, such as a textual design critique, to specific, concrete regions within a visual design artifact. The primary technical challenge is to create a reliable link between a verbal or written statement (e.g., "This button's contrast is too low") and the corresponding visual element on the screen (e.g., the exact bounding box of the button). This process, known as grounding, is crucial for making AI-generated feedback actionable and verifiable. The artifacts can range from static UI screenshots to structured files like Figma documents or HTML DOMs. The goal is to move beyond high-level, ungrounded feedback and enable precise, element-specific analysis, which is a foundational step for automated design review, critique, and assistance. Datasets like UICrit, which pairs human critiques with bounding boxes, and UGround, which links referring expressions to UI elements, directly address this challenge by providing the necessary data to train and evaluate models on this multimodal alignment task.

### Vision Language Model Performance On Design Critique

Current leading vision-language models (VLMs) show promising but limited performance on design critique tasks that require grounding. A study using the UICrit dataset found that Gemini Vision, when prompted with few-shot examples and visual aids (like a patch grid), produced critiques that design experts judged as having a 55% quality improvement over zero-shot prompting. However, its localization accuracy remained modest, achieving a mean Intersection over Union (IoU) of 0.222 for bounding boxes, indicating that while it can generate relevant critique, precisely identifying the corresponding element is challenging without fine-tuning. Another benchmark evaluating models as 'UI Judges' found that GPT-4o and Claude 3.5 Sonnet could align with human Likert-scale ratings with over 75% accuracy, but their performance dropped to near-chance levels when asked to make pairwise preference judgments between UIs with subtle differences. This suggests they struggle with nuanced design evaluation. Furthermore, results from the UGround/ScreenSpot grounding benchmark show that general-purpose models like GPT-4 and GPT-4o are outperformed by specialized models that are purpose-trained or fine-tuned on large-scale UI grounding datasets. In summary, while today's VLMs can generate high-level design feedback and perform moderately well on absolute quality scoring, they lack the precision for accurate spatial grounding and nuanced comparative judgment without specific fine-tuning or advanced prompting techniques.

### Technical Approaches For Visual Grounding

**Bounding Box Generation:** A primary method for generating bounding boxes is to use multi-task or two-head models that are trained to jointly produce textual output (the critique) and spatial coordinates (the bounding box). These models typically use a shared visual encoder. Datasets like UICrit, which contains critiques paired with ground-truth bounding boxes, are essential for training such models. Another approach involves a prompt chain, as demonstrated in the UICrit paper, where a VLM first generates the critique and then, in a separate step, is prompted to output the bounding box for a referenced element. Furthermore, models like Google's ScreenAI are explicitly trained on a 'Screen Annotation' task, which requires them to identify an element's type, description, and location (bounding box), building this capability directly into the model's skillset. Research on Grounded Chain-of-Thought (GCoT) also proposes training models to interleave reasoning steps with coordinate outputs, directly linking parts of a rationale to specific visual regions.

**Visual Prompting Methods:** Visual prompting involves augmenting the input image to provide the model with explicit spatial information, which can significantly improve localization accuracy without altering the model's weights. The research on the UICrit dataset demonstrated this effectively. By overlaying visual aids on the UI screenshot, they could improve the model's ability to reference specific regions. The techniques tested include adding coordinate rulers along the borders of the image or dividing the image into a grid of labeled patches. The results showed that while a model using the screenshot alone had a negligible Intersection over Union (IoU) of 0.004, adding a coordinate system improved it to 0.186, and using labeled patches achieved the best result with an IoU of 0.222. This shows that providing a frame of reference directly in the visual input helps the model ground its textual output more accurately.

**Structural Data Parsing:** A more precise and robust approach to grounding, moving beyond pixel-based analysis, is to parse the underlying structural data of the design artifact. This method, referred to as 'element-graph grounding,' involves using the view hierarchy from sources like an Android XML layout, an HTML DOM tree, or a Figma file's node tree. By accessing this data, a model can align its critique not just to a pixel region but to a specific, semantically meaningful element ID (e.g., 'button-submit', 'layer-header'). This provides unambiguous grounding and retains the hierarchical context of the design (e.g., knowing an element is inside a specific container). The Figma REST API, for example, exposes the entire node and layer tree, including geometry and text content, allowing an AI tool to precisely link a critique like "increase font size" to the specific text layer object within the design file. This is more robust than bounding boxes, which can be ambiguous or fail with overlapping elements.


### Key Models And Frameworks

| Name | Purpose | Architecture And Training | Key Capabilities |
| --- | --- | --- | --- |
| ScreenAI | A Visual Language Model (VLM) from Google designed specifically for understanding User Interfaces (UIs) and other visually-situated language tasks. | ScreenAI is trained on a diverse mix of datasets and tasks. This includes a novel 'Screen Annotation' task, which requires the model to identify the type, location, and description of UI elements. It is fine-tuned using public datasets for question answering (ScreenQA, WebSRC), navigation (Referring Expressions, MoTIF), and summarization (Screen2Words). | Core capabilities include UI element identification (outputting type, location, and description), answering questions about screens (ScreenQA), following navigation instructions based on referring expressions, and summarizing screen content. Its ability to output element locations is fundamental for grounded design critiques. |
| Pix2Struct | A model designed for visually-situated language understanding, which is pretrained by parsing screenshots of web pages and other visual documents. | The model is pretrained on a 'screenshot parsing' objective, which involves reconstructing a simplified HTML representation from a screenshot, encouraging it to understand visual structure. | Pix2Struct is benchmarked on various UI-centric tasks, demonstrating its ability to map language to UI elements. These tasks include referring expression comprehension (RefExp), widget captioning, and screen summarization (Screen2Words), as well as document and chart question answering. |
| UIClip | A CLIP-style model developed to assess the design quality and the relevance of a UI's visual appearance to a corresponding natural language description. | UIClip is a variant of CLIP that was pretrained on the JitterWeb dataset. It learns to associate images with text, specifically in the context of UI design principles and descriptions. | The model excels at scoring UIs for design quality and text-image relevance, outperforming other general-purpose vision-language models on these tasks. It provides a crucial supervised signal for 'quality' and 'relevance' that can be used to train reward models for generating better design critiques. |
| Grounded Chain-of-Thought (GCoT) / Visual CoT | These are methodological frameworks for training and prompting models to produce step-by-step reasoning (Chain-of-Thought) that is explicitly linked or 'grounded' to specific regions in an image. | These are not specific model architectures but rather approaches that train models to output interleaved sequences of text (reasoning steps) and spatial coordinates (e.g., bounding boxes). They introduce new datasets (MM-GCoT, Visual CoT dataset) specifically for this purpose. | These frameworks enable the generation of verifiable and interpretable AI reasoning, where each step in a rationale is supported by visual evidence. They also introduce evaluation protocols that measure not just the final answer's accuracy, but also the accuracy of the grounding and the consistency between the reasoning and the visual evidence, providing a template for grounded design critique systems. |
| SeeClick | A model focused on GUI (Graphical User Interface) grounding, which involves localizing a specific UI element based on a natural language instruction. | The context identifies SeeClick as a baseline model for GUI grounding, which is evaluated on the ScreenSpot benchmark. Newer models like UGround have been shown to outperform it under certain conditions. | The primary capability is localizing UI elements from text descriptions. It serves as a benchmark for performance on GUI grounding tasks. |
| AutoGUI | A pipeline designed to automatically annotate large quantities of UI elements with detailed descriptions of their functionality. | The AutoGUI pipeline uses Large Language Models (LLMs) to infer the function of UI elements by simulating interactions. It includes an LLM-aided rejection and verification step to ensure the quality of the annotations reaches a human-level of correctness. | This framework produces the AutoGUI-704k dataset, which, when used for fine-tuning Vision-Language Models (VLMs), significantly enhances their UI grounding capabilities. |
| Axe-core | A software framework and rule engine for automated accessibility testing of web and other applications. | Axe-core is not a machine learning model but a software library that codifies and implements rules from the Web Content Accessibility Guidelines (WCAG). It is regularly updated to cover WCAG 2.0, 2.1, and 2.2 at levels A, AA, and AAA. | It can be integrated into an AI reasoning system as a 'programmatic verifier' or 'tool'. The AI can call Axe-core to check for specific accessibility violations (e.g., insufficient color contrast, missing alt text), providing objective, verifiable evidence to support its design critiques. |
| Figma REST API | An Application Programming Interface (API) that provides programmatic access to data within Figma design files. | This is a standard REST API, not a machine learning model. | The API allows developers to retrieve the full layer tree, properties, and text content of any object in a Figma file. This enables a level of grounding for design critiques that is more precise than pixel-based bounding boxes, as critiques can be linked directly to specific design layers or element IDs. |

### Relevant Datasets And Benchmarks

| Name | Purpose | Size And Scope | Annotation Details | Platform |
| --- | --- | --- | --- | --- |
| UICrit | To enable the training and evaluation of multimodal models on the task of generating design critiques, localizing relevant regions, and predicting design quality. | Contains 3,059 design critiques for 983 unique mobile UI screens, collected from experienced designers. | Annotations are rich, including: (1) textual critiques, (2) bounding boxes that mark the specific UI region relevant to the critique, (3) numeric design quality ratings, and (4) topical tags (e.g., layout, readability). | Mobile |
| UGround | To provide the largest-to-date dataset for training models on GUI visual grounding, i.e., locating a UI element from a natural language description. | A massive dataset containing 10 million GUI elements with their corresponding referring expressions, sourced from 1.3 million screenshots. | The dataset consists of pairs of referring expressions (text) and bounding box coordinates for the target UI element. It was synthesized using data from Common Crawl, including screenshots and HTML metadata. | Web (95% of the data) |
| ScreenSpot | A comprehensive evaluation benchmark designed to test the performance of GUI grounding models across a wide variety of platforms and environments. | Comprises over 1,200 instructions covering five different environments. | Each item consists of a single-step natural language instruction and the ground-truth bounding box of the target UI element. | Cross-platform (iOS, Android, macOS, Windows, Web) |
| Mind2Web | A dataset for developing and evaluating generalist web agents that can follow language instructions to complete complex, multi-step tasks on any website. | A large-scale dataset covering complex tasks across a diverse set of websites. | Provides high-level language instructions paired with the corresponding action sequences. These actions are linked to DOM elements and screenshots, making it valuable for research in grounded instruction following. | Web |
| OSWorld | A scalable, real-world benchmark environment for developing and evaluating multimodal agents that can operate a computer. | An interactive computer environment, not a static dataset. It supports dynamic task setup and evaluation. | Evaluation is 'execution-based', meaning an agent's success is determined by its ability to complete tasks correctly within the live operating system environment. | Desktop (Operating System) |
| Screen2Words | The first large-scale dataset and benchmark dedicated to the task of UI screen summarization. | Contains 112,085 human-written annotations for 22,417 unique screens. | Provides high-quality, functional summaries of what a user can do on a given UI screen. | Android |
| ENRICO | A dataset that provides topic-level supervision for mobile UI designs, useful for training models to classify design principles or issues. | A high-quality collection of 1,460 mobile UI designs. | Each UI screenshot is categorized according to 20 predefined design topics (e.g., 'Badges', 'Login Form'). | Mobile |
| AutoGUI-704k | A large-scale dataset created to enhance the UI grounding capabilities of Vision-Language Models (VLMs) by providing functionality-focused annotations. | Contains 704,000 annotations for UI elements. | Features detailed descriptions of what each UI element does (its functionality). The annotations were generated and verified using LLMs to ensure human-level correctness. | UI (General) |
| Rico | A large-scale dataset of mobile user interfaces widely used for a variety of UI-related research tasks. | A well-known dataset containing thousands of mobile UI screens. | The context mentions it contains UI elements and structures. It is known to provide UI screenshots along with their corresponding view hierarchy (XML), which details the structure and properties of UI elements. | Mobile (Android) |
| MM-GCoT | A dataset created to train and evaluate Grounded Chain-of-Thought (GCoT) models, which generate step-by-step reasoning grounded in visual evidence. | Consists of 24,022 examples of grounded reasoning chains. | Each example includes a step-by-step rationale where each step is explicitly linked to grounding coordinates (bounding boxes) in the associated image. | General Visual |
| Visual CoT dataset | A large-scale dataset designed to train models to produce interpretable, step-by-step visual reasoning (Visual Chain-of-Thought). | Comprises 438,000 question-answer pairs. Of these, approximately 98,000 include detailed, step-by-step reasoning chains. | Annotations include intermediate bounding boxes that highlight the key visual regions relevant to each step of the reasoning process. | General Visual |

### Figma Api For Reasoning Grounding

The Figma REST API provides a powerful mechanism for grounding AI reasoning directly within the structured source of a design, moving beyond simple pixel-based analysis of screenshots. By using the API's file endpoints, specifically the `GET file nodes` endpoint, a system can retrieve a complete representation of the design file as a JSON object. This object details the entire layer tree, including every node, its properties (like color, font size, and constraints), geometry (position and dimensions), and raw text content. This allows an AI to connect its reasoning to specific, unique layer or node IDs. For example, when generating a critique like "The text in this button is not centered," the AI can ground this statement by referencing the unique ID of the text layer and the unique ID of its parent button layer. This is significantly more robust than generating a bounding box, as it avoids ambiguity with overlapping elements and is tied to the editable structure of the design. This deep integration enables not only precise critique but also the generation of actionable suggestions, such as proposing specific property changes (e.g., "change `text-align` to `center` on layer `id-123:45`") that could be applied automatically.

### Verifiable Reasoning With Design Standards

Established, verifiable standards like the Web Content Accessibility Guidelines (WCAG) are crucial for creating an objective basis for training and evaluating design reasoning within a process supervision framework. These standards transform subjective aspects of design into measurable, binary-pass/fail checks. For example, a model's reasoning step that claims 'the button text has low contrast' can be objectively verified. By integrating a tool like the axe-core engine, the system can programmatically extract the foreground and background colors of the specified element and calculate the contrast ratio. This computed ratio can then be compared against the WCAG 2.x standard (e.g., a ratio of at least 4.5:1 for normal text). If the model's claim is confirmed by the tool's output, that step in its reasoning chain is verified as correct. This approach can be applied to numerous accessibility and design rules, including minimum font sizes, tap target dimensions, and the presence of alt-text for images. By incorporating these programmatic verifiers and computed metrics as 'tool calls' within the model's reasoning loop, their outputs can be used as strong reward signals during training or as definitive checks during evaluation, ensuring the model's critiques are grounded in established, verifiable facts rather than just correlation.

### Challenges And Limitations

**Subjectivity And Ambiguity:** A significant challenge is the inherent subjectivity of design judgment. Unlike mathematical problems with a single correct answer, design quality often involves aesthetic preferences, context-dependent usability, and nuanced principles that are difficult to quantify. This makes defining a 'correct' step in a reasoning process challenging. For example, while a contrast ratio violation is objective, critiques about 'visual balance' or 'unappealing color palettes' are subjective. Research such as 'MLLM as a UI Judge' demonstrates this limitation, showing that while models like GPT-4o and Claude 3.5 Sonnet achieve over 75% accuracy in aligning with human Likert scores, their performance drops to near-random chance on pairwise preference tasks where the design differences are subtle. This indicates that current models struggle with the nuanced, subjective judgments that are a core part of expert design critique.

**Data Availability And Cost:** The development of process-supervised models is heavily constrained by the scarcity and high cost of creating suitable training data. Generating high-quality, step-by-step design critiques requires the expertise of professional designers and accessibility experts. These experts must not only write the critique but also meticulously link it to specific regions (e.g., via bounding boxes), categorize the issue, and provide ratings. The UICrit dataset, with its 3,059 critiques from experienced designers, exemplifies the effort required. Scaling such a dataset to cover a vast range of UI styles, platforms, and design principles is a formidable and expensive task. This data bottleneck is a primary obstacle to fine-tuning robust models and is the motivation behind research like AutoGUI, which attempts to automate the annotation of UI element functionality to reduce this cost.

**Model Technical Limitations:** Current Vision-Language Models (VLMs) have several technical limitations that impede their effectiveness as design critics. A primary issue is poor localization accuracy. The UICrit paper reported that even with advanced visual prompting techniques, Gemini Vision achieved a bounding box Intersection over Union (IoU) of only 0.222 (with patches) and 0.186 (with coordinates), indicating a significant gap between the model's referenced area and the ground truth. This suggests that without specific fine-tuning, these models struggle to precisely ground their textual critiques. Furthermore, research on benchmarks like ScreenSpot shows that specialized, purpose-trained grounding models consistently outperform general-purpose MLLMs. Other limitations include visual hallucination (referencing elements that are not present) and performance degradation on complex tasks that require understanding the interplay of multiple elements, as noted in the 'MLLM as a UI Judge' study on subtle design differences.


### Future Outlook And Research Directions

**Model Advancements:** Future research is directed towards developing more sophisticated models specifically for design reasoning. One key direction, suggested by the authors of UICrit, is to fine-tune large multimodal models like Gemini and GPT-4V on specialized datasets containing critiques, bounding boxes, and ratings. This would move beyond zero-shot or few-shot prompting to build inherent domain knowledge. Another promising avenue is the development of Process Reward Models (PRMs) or using reinforcement learning from human feedback (RLHF) and Direct Preference Optimization (DPO) on critique chains to teach models to generate higher-quality, more faithful reasoning. This could involve training multi-task models with separate heads for generating critique text, predicting bounding boxes, classifying issue topics, and estimating quality ratings. Furthermore, creating hybrid models that process not just pixels but also structured data—such as the layer hierarchy from a Figma file (via its REST API) or a website's DOM—could enable more precise grounding and semantic understanding.

**Dataset And Benchmark Development:** The advancement of AI in design reasoning is critically dependent on the creation of larger, more comprehensive datasets and benchmarks. While UICrit provides a strong foundation for critique-based supervision, future datasets need to expand in several dimensions. This includes covering a wider array of tasks beyond single-screen critique, such as evaluating multi-step user flows. There is also a need for greater diversity in platforms (mobile, web, desktop) and UI types. Expanding datasets to include more design issues, especially those related to complex interactions, accessibility (beyond what automated checkers can find), and cognitive load, is crucial. The development of robust benchmarks, like ScreenSpot for grounding, is essential for systematically evaluating and comparing the performance of different models and approaches, driving progress in the field.

**Tool Integration:** A major future direction is the seamless integration of these AI capabilities directly into the workflow of designers. The ultimate goal is to move from standalone evaluation to real-time, interactive assistance within design tools like Figma, Sketch, or Adobe XD. The Figma REST API, for instance, allows programmatic access to the file's layer tree, node properties, and text content. This enables a future where an AI assistant could not only highlight a problematic area on the canvas but also link its critique directly to the specific Figma layer or component. It could then propose concrete fixes (e.g., 'Change the fill color of `Button-Primary` to #FFFFFF') that can be applied with a single click. Additionally, integrating programmatic verifiers, such as the axe-core engine for accessibility, as 'tools' that the AI can call within its reasoning loop would allow it to ground its critiques in objective, verifiable data, making its feedback more trustworthy and actionable.



## Research Basis

### multimodal_alignment_in_design_reasoning
**Confidence:** high

The target fine-grained field value is about spatial grounding of design reasoning: linking a verbal critique or reasoning statement to a specific region or element in a visual design artifact (e.g., a bounding box, UI element, or Figma layer). Excerpts that explicitly discuss datasets, methods, or systems for GUI grounding, UI element localization, or grounding-by-centers (bounding boxes, regions, or referring expressions) directly address this capability. Text that mentions bounding boxes tied to critiques (UI critiques with spatial annotations), GUI grounding benchmarks, or tools/datasets designed to map language to specific UI regions strongly supports the stated field value. For example, references that describe UICrit as pairing human design critiques with bounding boxes, or UGround linking referring expressions to UI elements, provide concrete evidence of methods and data that operationalize grounding between verbal/design reasoning and precise visual regions. Reports on SeeClick and ScreenAI-type systems that ground actions or descriptions to GUI regions further substantiate the notion of spatially-grounded design reasoning in practice. Discussions of visual-grounding benchmarks and multi-stage grounding approaches (including visual prompts that identify exact regions) reinforce the idea that the field value seeks a reliable link between critique text and exact visual regions, which is precisely what grounding datasets and grounding-method papers aim to accomplish. Taken together, these excerpts indicate a mature line of work and concrete resources (datasets, benchmarks, and systems) that enable spatial grounding of design reasoning, aligning with the described multimodal grounding objective. The strongest support comes from explicit datasets and benchmarks that pair design critiques or UI descriptions with bounding regions, followed by papers describing GUI grounding capabilities and methods to locate and refer to exact UI elements in visual artifacts. The reasoning also notes that advanced grounding approaches (like visual CoT and multimodal grounding pipelines) expand the space from simple text-to-image mappings to structured, verifiable element-level reasoning, which aligns with the goal of verifiable, design-focused grounding.

- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > UGround (Ours)
  > GUI Visual Grounding
  > The benchmark consists of single-step instructions and the corresponding bounding box of the target elements across mobile (e.g., iOS and Android), desktop (e.g., macOS and Windows), and web environments.
  > These elements vary between text-based elements, icons (e.g., the trash can icon) and widgets (e.g., to-do lists), representing diverse GUI element types.
- [The model, data and code for the visual GUI Agent SeeClick](https://github.com/njucckevin/SeeClick)
  > ScreenSpot is an evaluation benchmark for GUI grounding, comprising over 1200 instructions from iOS, Android, macOS, Windows and Web environments,
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  >  
  >  
  >  
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure
- [Fetched web page](https://proceedings.mlr.press/v202/lee23g/lee23g.pdf)
  > Pix2Struct: Screenshot Parsing as Pretraining for Visual Language Understanding
  > Pix2Struct: Screenshot Parsing as Pretraining for Visual Language Understanding
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [A Data-driven Model for Assessing User Interface Design](https://arxiv.org/abs/2404.12500)
  > by J Wu · 2024 · Cited by 52 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt

### defining_design_process_supervision
**Confidence:** high

The notion of a labeling process conducted by human experts who provide detailed UI critiques and explicitly link textual feedback to specific UI regions directly supports the core idea of design process supervision. In the cited work describing a targeted dataset of design critiques and quality ratings for mobile UIs, designers supply critique content along with quality assessments, which mirrors the proposed practice of grounding critique steps in concrete UI regions and issuing severity or rating labels. The accompanying material emphasizing that the dataset will be released to the community reinforces the feasibility of publicly sharing supervised, stepwise data for training. A related excerpt describing UICrit explicitly states that the dataset contains human-generated design critiques with corresponding bounding boxes for each critique, which precisely aligns with grounding each design critique to concrete UI elements. Together, these pieces substantiate both the labeling workflow (experts drafting critiques) and the grounding mechanism (bounding boxes or element references) that would form the backbone of the supervision signal for training models to generate verifiable, stepwise design reasoning. The discussion of chain-of-thought prompting in the context of design UX research introduces the idea of decomposing reasoning into steps, which complements the proposed approach of evaluating each reasoning step for grounding accuracy, factual correctness, and guideline consistency. The UIClip work demonstrates a concrete data-driven design evaluation model that assesses design quality and relevance of UI descriptions, underscoring practical tasks that a supervised model would perform (design quality scoring, improvements, and grounding relevance) and suggesting a training and evaluation setup that could integrate the proposed stepwise, grounded reasoning objective. Additional sources focusing on grounding, such as reports on GUI grounding benchmarks and datasets, provide broader context for how textual critiques can be linked to specific GUI elements or regions, supporting the feasibility of annotating reasoning steps with precise spatial grounding. Overall, the combination of human-annotated design critique datasets with bounding-box grounding, along with frameworks for design quality assessment and grounded reasoning, coherently supports the requested supervision design and provides concrete data structures and evaluation criteria that could be used to train and verify stepwise design reasoning grounded in UI regions.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

  > The dataset will be released to the research community.
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.


### vision_language_model_performance_on_design_critique
**Confidence:** medium

The field describes current leading vision-language models and their design-critique grounding capabilities, including quantitative results. Excerpt describing the UICrit dataset explicitly notes design critiques and bounding boxes, which directly supports claims about grounding in design critique tasks. Excerpts reporting that models like GPT-4o and Claude 3.5 Sonnet align with human ratings at high levels but falter on finer pairwise judgments support the claim that leading LLMs have strong but imperfect design-evaluation capabilities without fine-tuning. Benchmark results indicating that general-purpose models lag behind models fine-tuned on UI grounding datasets reinforce the need for specialized training to achieve precise spatial grounding. Additional references to visual-grounding benchmarks (ScreenSpot/Uground) and to models such as Gemini Vision and their performance metrics (e.g., IoU scores) provide concrete support for the claim that grounding precision remains a challenge despite high-level critique capabilities. Collectively, these excerpts substantiate the summarized view that current leading VLMs show promising but limited grounding performance in design critique tasks unless guided by specialized datasets or prompting strategies, and that precise localization remains a key bottleneck while high-level critique can be generated reliably. The cited UI-grounding and design-evaluation papers also illustrate the range of capabilities and limitations across models, corroborating the overall assessment.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [MLLM as a UI Judge: Benchmarking Multimodal LLMs for ...](https://arxiv.org/html/2510.08783v1)
  > Oct 9, 2025 — Recent advances in multimodal large language models (MLLMs) offer a promising opportunity to act as early evaluators, helping designers narrow
  > models we use (Claude 3.5 Sonnet, GPT-4o, and Llama-3.2-11B-Vision-Instruct) all have an accuracy score greater than 75%.
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.


### technical_approaches_for_visual_grounding
**Confidence:** high

The most directly relevant material describes methods and datasets for grounding design critiques to specific visual regions or elements. For example, the ScreenAI work explicitly trains on a Screen Annotation task that requires identifying UI element information such as type, location, and description, i.e., bounding boxes, which directly aligns with a field about bounding-box grounded design reasoning. A companion emphasis on a UI element’s location and description in ground-truth data (and the grounding task itself) reinforces the claim that multi-task models can jointly output text critiques and spatial coordinates, using a shared visual encoder. Further, a prominent UI-grounding dataset like UICrit provides critiques paired with ground-truth bounding boxes, illustrating how bounding-box grounded design critique can be trained and evaluated, which supports the idea that bounding boxes are a core component of grounding design reasoning. Additional grounding-focused resources, such as ScreenAnnotation-enabled models, and comprehensive GUI grounding benchmarks (which discuss bounding boxes, element types, and spatial regions) further substantiate the importance of bounding-box generation and spatial grounding in the design critique context. The Grounded Chain-of-Thought literature expands this by proposing reasoning steps that are tied to specific visual regions, i.e., interleaving reasoning with coordinate outputs, which directly elaborates how a design critique could map to precise UI regions. Supporting datasets and methods include multi-dataset UI grounding research, including GUI element grounding benchmarks and ground-truth annotations that connect textual critiques to exact elements and regions. Taken together, these excerpts substantiate the core ideas of: (1) generating bounding boxes via models trained to produce both textual critiques and spatial coordinates, (2) using ScreenAI’s Screen Annotation to tie element type/location/description to bounding boxes, (3) employing UICrit-style ground-truth bounding boxes to train and evaluate grounded critiques, and (4) leveraging Grounded Chain-of-Thought approaches to interleave reasoning with spatial outputs so that rationale maps to specific visual regions. 

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > The benchmark consists of single-step instructions and the corresponding bounding box of the target elements across mobile (e.g., iOS and Android), desktop (e.g., macOS and Windows), and web environments.
  > These elements vary between text-based elements, icons (e.g., the trash can icon) and widgets (e.g., to-do lists), representing diverse GUI element types.
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [Google Trains User Interface and Infographics ...](https://www.infoq.com/news/2024/04/google-screenai/)
  > Apr 16, 2024 — Google Research recently developed ScreenAI, a multimodal AI model for understanding infographics and user interfaces.
- [A Data-driven Model for Assessing User Interface Design](https://arxiv.org/abs/2404.12500)
  > by J Wu · 2024 · Cited by 52 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.
- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure

### key_models_and_frameworks
**Confidence:** high

The core fine-grained value seeks a structured view of leading models and grounding frameworks for UI design reasoning, including: (a) ScreenAI as a UI-focused VLM with a Screen Annotation task for identifying UI element type, location, and description; (b) Pix2Struct as a visually-situated model that parses UI-relevant visuals; (c) UIClip as a CLIP-like model scoring design quality and text-image relevance to UI descriptions, which provides a supervised signal for design critique and grounding; (d) Grounded/Visual Chain-of-Thought (GCoT/Visual CoT) paradigms that couple reasoning steps with visual evidence (bounding boxes, regions) to enable verifiable, grounded design critique reasoning; (e) SeeClick as a GUI grounding baseline that localizes UI elements from language; (f) AutoGUI as an automated pipeline to annotate UI elements with detailed functionality, boosting grounding data; (g) Axe-core as a programmatic verifier to provide objective evidence for accessibility related design critiques; (h) Figma REST API as a non-model grounding source enabling element-layer grounding by directly referencing design layers/elements; these together form a cohesive set of models, training signals, datasets, and grounding tools relevant to the user’s interest in grounded design reasoning and evaluation. Directly applicable passages include descriptions of ScreenAI’s UI element identification capabilities and Screen Annotation task, UIClip’s emphasis on design-quality and relevance scoring, descriptions of grounded reasoning frameworks (GCoT/Visual CoT) and their aim to bind reasoning steps to visual evidence, and notes on SeeClick/AutoGUI as grounding-oriented approaches and datasets. The Figma API excerpt highlights grounding at the design-layer level, which supports precise localization of critique references. The supplementary mentions of chain-of-thought prompting in related design UX literature further reinforce the relevance of stepwise, verifiable reasoning in design critique contexts.

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > ncluding a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen. Thes
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.

### process_supervision_for_design_reasoning
**Confidence:** high

The strongest support comes from works that introduce grounded or multimodal chain-of-thought (GCoT/MM-GCoT) specifically for visual design contexts, showing how reasoning steps can be generated and annotated alongside visual regions or UI elements. These works demonstrate that a dataset can be built with intermediate reasoning traces (steps) and corresponding grounding (e.g., bounding boxes or UI regions) to supervise a model’s design critique reasoning, which aligns directly with the concept of process supervision in design. Related papers present stepwise or multi-turn reasoning pipelines and visual reasoning traces that accompany design-related tasks, illustrating practical approaches to train models not just on final judgments but on the entire reasoning process. Additional sources discuss chain-of-thought prompting in design- or UX-focused settings, underscoring the potential for prompting strategies to yield structured, verifiable reasoning for evaluation or critique tasks. Finally, several UI critique and design evaluation datasets demonstrate concrete targets for design-specific reasoning, such as critic-style comments or design-quality judgments that can be tied to intermediate reasoning steps and targeted improvements. Collectively, these excerpts provide a coherent picture of how a design-process supervision paradigm could be implemented: identify design elements, articulate applicable design principles, anchor reasoning in concrete evidence from the design, propose fixes, assess impact, and assign a confidence score, all while producing verifiable step-wise reasoning that serves as training signals for a PRM-like framework in design contexts.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [[2603.13878] Step-CoT: Stepwise Visual Chain-of-Thought ...](https://arxiv.org/abs/2603.13878)
  > by L Fan · 2026 — Abstract:Chain-of-thought (CoT) reasoning has advanced medical visual question answering (VQA), yet most existing CoT rationales are
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.

### current_research_on_design_process_supervision
**Confidence:** medium

The most directly relevant content describes a dataset built around human design critiques with bounding boxes and related design topics, and the authors explicitly suggest potential use for fine-tuning multimodal models and training reward models on the quality of critiques and ratings. This aligns with process supervision by enabling per-step evaluation of reasoning (critiques) and localization (bounding boxes) as separate stages, a core idea of process supervision. Work on Grounded Chain-of-Thought and Visual CoT provides concrete methodologies for creating and evaluating stepwise reasoning that is explicitly tied to visual regions, which maps well to design critique where reasoning should reference specific UI elements or regions. Descriptions of Visual CoT and related multi-modal reasoning datasets emphasize bounding-box-annotated reasoning steps, which supports the notion of verifiable, grounded reasoning steps in a design context. Additional items discuss targeted design critique datasets and improvements gained through prompting, which reinforces the idea that structured, stepwise reasoning can be guided via prompts and evaluated for quality. Finally, UIClip and related UI design evaluation work offer a concrete model for scoring design relevance and quality, potentially serving as reward signals or evaluation criteria for process-supervised design reasoning. Taken together, these excerpts support the view that the design domain is moving toward process-supervised, verifiable, and grounded chain-of-thought-style reasoning, with explicit planning of steps, localization to visual elements, and evaluation by expert-grounded criteria.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  >  
  >  
  >  
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > The dataset will be released to the research community.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.

### challenges_and_limitations
**Confidence:** high

The most directly relevant material comes from datasets and benchmarks that anchor how design critiques are produced and evaluated, often with explicit bounding boxes or regions tied to critiques. For example, a study introducing a visual CoT resource provides a dataset where reasoning steps are attached to bounding boxes identifying key regions, demonstrating that it is possible to link critique reasoning to specific visual regions, which aligns with the need for verifiable, stepwise design reasoning. Related work extending this idea discusses a broader visual CoT setup with bounding boxes and intermediate reasoning, reinforcing that the field has started to ground reasoning in concrete image regions, which is essential for design critique contexts. A dataset dedicated to UI critique contains thousands of human-generated critiques with corresponding bounding boxes, illustrating the scale and granularity required to associate critique with precise UI elements. This directly supports the observation that data availability and the cost of generating high-quality, step-by-step critiques and their region-level labels pose a significant challenge. Additional literature on UI critique datasets and automated design evaluation shows improvements when task-specific, ground-truth grounded evaluation is used, highlighting the importance of specialized data and grounding capabilities over generic multimodal models. The UI grounding literature, including works that benchmark grounding accuracy and localization challenges, provides concrete evidence that current general-purpose multimodal models struggle with precise grounding, as seen in reported grounding performance gaps and the emergence of specialized datasets and grounding-focused models that outperform general LVLMs on design-grounding tasks. Finally, there is documenting evidence that researchers are exploring chain-of-thought prompting and stepwise reasoning in design contexts, indicating growing interest in making design critiques transparent and debatable in a way that can be evaluated, though the effectiveness varies with task subtleties and design-domain complexity. Collectively, these excerpts substantiate all three facets of the field value: subjectivity in judgments, data/cost barriers for stepwise critiques, and technical grounding limitations in current models.

- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [MLLM as a UI Judge: Benchmarking Multimodal LLMs for ...](https://arxiv.org/html/2510.08783v1)
  > Oct 9, 2025 — Recent advances in multimodal large language models (MLLMs) offer a promising opportunity to act as early evaluators, helping designers narrow
- [[2603.13878] Step-CoT: Stepwise Visual Chain-of-Thought ...](https://arxiv.org/abs/2603.13878)
  > by L Fan · 2026 — Abstract:Chain-of-thought (CoT) reasoning has advanced medical visual question answering (VQA), yet most existing CoT rationales are
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.

### relevant_datasets_and_benchmarks
**Confidence:** high

The finegrained field value concerns a set of datasets and benchmarks that are specifically built for design critique, GUI grounding, and grounded chain-of-thought reasoning. The most directly relevant excerpts explicitly name and describe such datasets and benchmarks and provide concrete details (size, scope, annotation types, platforms) that match the field values. Excerpts describing UI Critique datasets align with the category of design critiques and bounding-box annotations used to localize critiques to UI elements. Excerpts mentioning UICrit provide exact figures (thousands of critiques, hundreds of screens, bounding boxes, quality ratings, topical tags) that support the field value’s claims about content, scale, and annotation richness. Excerpts referring to UGround clearly describe the world’s largest GUI grounding dataset with billions or millions of elements and referring expressions, which aligns with the field value’s grounding and localization aspects. Excerpts about ScreenSpot as an evaluation benchmark for GUI grounding across platforms, and Screen2Words as a screen-summarization dataset, corroborate the field value’s emphasis on design-facing, text-to-UI grounding tasks. Excerpts about ENRICO, AutoGUI-704k, Rico, Mind2Web, OSWorld, MM-GCoT, and Visual CoT provide parallel support for the kinds of datasets the field value enumerates (topic-level supervision, large-scale UI grounding with functionality, web-agent grounding with UI structure, and grounded chain-of-thought/visual reasoning). The presence of these datasets in multiple sources strengthens the claim that the field value is describing a curated landscape of benchmarks applicable to design critique, UI grounding, and reasoning tasks across UI and web domains. In summary, the most relevant excerpts are those that directly name and describe datasets like UICrit, UGround, ScreenSpot, Screen2Words, ENRICO, AutoGUI-704k, Rico, Mind2Web, OSWorld, MM-GCoT, and Visual CoT, along with supporting context about their scale, annotation types, and platforms. Less directly supportive but still pertinent are excerpts describing related benchmarking and grounding datasets that illustrate the broader ecosystem of design-focused multimodal evaluation and grounding tasks.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > The dataset will be released to the research community.
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

- [AutoGUI: Scaling GUI Grounding with Automatic ...](https://openreview.net/forum?id=wl4c9jvcyY)
  > AutoGUI: Scaling GUI Grounding with Automatic Functionality Annotations from LLMs
## Hongxin Li , Jingran Su , Jingfan CHEN , Yuntao Chen , Qing Li , Zhaoxiang Zhang
**Abstract:** User interface understanding with vision-language models has received much attention due to its potential for enabling next-generation software automation. However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale. Specifically, we leverage large language models (LLMs) to infer element functionality by comparing the UI content changes before and after simulated interactions with specific UI elements. To improve annotation quality, we propose LLM-aided rejection and verification, eliminating invalid and incorrect annotations without human labor. We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets. Human evaluation shows that the **AutoGUI** pipeline achieves annotation correctness comparable to trained human annotators. Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets.
  > However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale.
  > Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > UGround (Ours)
  > Table 3: Grounding accuracy on ScreenSpot (Agent Setting) with planner-generated REs.
  > UGround
  > ScreenSpot
- [The model, data and code for the visual GUI Agent SeeClick](https://github.com/njucckevin/SeeClick)
  > ScreenSpot is an evaluation benchmark for GUI grounding, comprising over 1200 instructions from iOS, Android, macOS, Windows and Web environments,
- [Screen2Words - OpenDataLab](https://opendatalab.com/OpenDataLab/Screen2Words)
  > The dataset contains more than 112k language summarization across 22k unique UI screens. This dataset can be used for Mobile User Interface Summarization
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > by B Wang · 2021 · Cited by 242 — To aid the development of Screen2Words, we collected the first large-scale screen summarization dataset, which consists of human annotations for 22,417 Android
  > We collect, analyze, and open-source <sup>2</sup> the first dataset dedicated for UI screen summarization. It contains 112,085 quality human annotations for 22,417 unique Android screens, collected with a carefully designed labeling process and guideline, which achieve a high inter-labeler agreement for both linguistic coherence and on-screen focus area consistency.
  > Large-scale mobile GUI data repositories are crucial building blocks for data-driven model development. The Rico dataset  [7 , 30 ] contains visual, textual, structural, and interactive design properties of 66k unique UI screens from 9.7k Android apps spanning 27 categories in the Google Play Store.
- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/fullHtml/10.1145/3406324.3410710)
  > by LA Leiva · 2020 · Cited by 103 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/10.1145/3406324.3410710)
  > Feb 25, 2021 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A High-quality Dataset for Topic Modeling of Mobile ...](https://userinterfaces.aalto.fi/enrico/)
  > Presents a high-quality dataset of mobile UI designs, categorized according to 20 design topics. Reports validation of computational models for topic
- [Mind2Web: Towards a Generalist Agent for the Web](https://osu-nlp-group.github.io/Mind2Web/)
  > Mind2Web is a dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website
- [Pix2Struct](https://huggingface.co/docs/transformers/model_doc/pix2struct)
  > We present Pix2Struct, a pretrained image-to-text model for purely visual language understanding, which can be finetuned on tasks containing visually-situated
- [Mind2Web: Towards a Generalist Agent for the Web](https://arxiv.org/html/2306.06070v3)
  > We introduce Mind2Web, the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex
- [Mind2Web: Towards a Generalist Agent for the Web](https://github.com/OSU-NLP-Group/Mind2Web)
  > Mind2Web is the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  >  
  >  
  >  
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
- [OSWorld: Benchmarking Multimodal Agents for Open-Ended ...](https://os-world.github.io/)
  > OSWorld is a first-of-its-kind scalable, real computer environment for multimodal agents, supporting task setup, execution-based evaluation, and interactive
- [UGround Homepage](https://osu-nlp-group.github.io/UGround/)
  > We collect the largest dataset for GUI visual grounding so far, containing 10M GUI elements (~95% from web) and their referring expressions over 1.3M
- [MLLM as a UI Judge: Benchmarking Multimodal LLMs for ...](https://arxiv.org/html/2510.08783v1)
  > Oct 9, 2025 — Recent advances in multimodal large language models (MLLMs) offer a promising opportunity to act as early evaluators, helping designers narrow
  > models we use (Claude 3.5 Sonnet, GPT-4o, and Llama-3.2-11B-Vision-Instruct) all have an accuracy score greater than 75%.
- [Improved GUI Grounding via Iterative Narrowing](https://arxiv.org/html/2411.13591v3)
  > Nov 28, 2024 — We introduce a visual prompting framework that employs an iterative narrowing mechanism to improve the performance of both general and fine-tuned models in GUI
- [xlang-ai/OSWorld: [NeurIPS 2024] ...](https://github.com/xlang-ai/osworld)
  > [NeurIPS 2024] OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments - xlang-ai/OSWorld.
- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://arxiv.org/abs/2108.03353)
  > by B Wang · 2021 · Cited by 242 — We present Screen2Words, a novel screen summarization approach that automatically encapsulates essential information of a UI screen into a coherent language

### future_outlook_and_research_directions
**Confidence:** high

The most compelling support for future design reasoning advancements comes from work explicitly introducing grounded chain-of-thought in multimodal settings and datasets designed to train and evaluate visual reasoning with intermediate steps. This body of work argues for constructing tasks and datasets that require models to produce stepwise, verifiable reasoning while grounding those steps in concrete visual regions or UI elements. Such work also describes creating specialized datasets (for example, with bounding boxes and referred regions) to enable evaluation of grounding fidelity, which directly informs future directions that seek to move beyond generic prompting to structured, multi-task reasoning heads and training signals. Additionally, there is clear emphasis on multi-modal grounding where verbal critique is connected to specific visual components (UI elements, layers, bounding boxes), which supports the proposed direction of integrating structured design data such as Figma layer trees or DOM information into the reasoning process. This aligns with the idea of developing Process Reward Models or RLHF-based training signals that reward high-quality, faithful design reasoning and critiques, as well as the concept of hybrid models that can process both pixel data and structured artifacts like Figma’s API outputs or a website’s DOM. Several excerpts explicitly discuss the creation and use of Grounded Chain-of-Thought datasets and multimodal groundings (including bounding boxes tied to reasoning steps) and highlight that such grounding improves evaluation in tasks requiring precise localization and justification. There is also strong alignment with the notion of UI critique datasets and scoring to train models to generate actionable, design-focused feedback, which complements the proposed design-process supervision paradigm. In terms of tooling integration, the references to programmatic access to design files (e.g., Figma REST API to extract layer trees and properties) support the envisioned tool integration direction, enabling AI critiques to reference exact layers or components and even propose concrete edits. Finally, UI-focused benchmarks and datasets (e.g., UI Critique, ScreenSpot) demonstrate how robust evaluation can drive progress in grounding and critique capabilities, reinforcing the role of benchmarks in shaping future research directions. Taken together, the excerpts substantiate a cohesive vision where future work centers on (a) training models with grounded, stepwise design reasoning and verifiable steps, (b) grounding design critiques to explicit visual/UI elements and structured design data, and (c) integrating evaluation benchmarks and design-tool APIs to enable end-to-end design QA and tooling integration.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > The dataset will be released to the research community.
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .

### verifiable_reasoning_with_design_standards
**Confidence:** medium

The core idea in the target field value is to instantiate verifiable checks within a design-reasoning process by leveraging objective standards (such as WCAG) and automated tools (like axe-core) to confirm or refute a model’s stepwise critique. The most directly supportive material demonstrates a model and data pipeline that ties design evaluation to explicit, measurable signals: UIClip provides a data-driven model for assessing design quality and relevance, with tasks including design quality, improvement suggestions, and design relevance, and reports that UI models can be benchmarked against held-out UI screens. This establishes a concrete, verifiable evaluation framework that aligns with the idea of turning subjective critique into verifiable steps. Related excerpts describe UI critique datasets (UICrit) containing human-generated critiques paired with bounding boxes for UI elements, which illustrate grounding critiques to specific design regions and provide a precedent for associating textual critiques with verifiable design-grounded evidence. Papers on enhancing automated design evaluation with UI critiques show measurable improvements when critiques are grounded and evaluated, supporting the use of verifiable steps as reward signals or verification checks. Additional references discuss how grounding critiques to UI elements and specific design attributes (e.g., element types, locations) enables targeted, verifiable reasoning about design quality. Taken together, these excerpts substantiate a path toward a process supervision framework where design critiques are constrained and validated by objective, programmatic verifications (contrast ratios, font sizes, alt-text presence) and by grounded references to UI elements, thus turning design reasoning into a sequence of verifiable steps. The order places primary emphasis on the emergence of verifiable design evaluation models and datasets (UIClip and UICrit) and then on mechanisms to improve and ground critiques, culminating with broader grounding benchmarks that contextualize the capabilities of multimodal evaluation systems.

- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > The dataset will be released to the research community.
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.


### figma_api_for_reasoning_grounding
**Confidence:** high

The most relevant excerpt explicitly discusses the REST API endpoints for Figma, including the GET file nodes endpoint and the ability to retrieve the complete design file as a JSON object detailing the layer tree, properties, geometry, and text. This directly supports the field value’s claim that grounding AI reasoning in the design’s structured source (via the API and its JSON representation) provides unambiguous IDs for layers and elements, enabling precise critique tied to unique IDs. The second most relevant excerpt notes that Figma concerns itself with grounding design work, highlighting constraints of grounding such as visibility, reviewability, and simultaneity, which reinforces why tying critiques to concrete, identifiable nodes would improve grounding reliability. A third excerpt discusses Figma’s design critique practices, which contextualizes how critiques are conducted in a design organization and why structured grounding could enhance critique quality. A fourth excerpt mentions SeeClick and grounding in GUI scenarios, which, while not Figma-specific, illustrates the broader value of grounding reasoning in GUI elements, reinforcing the utility of grounding in structured design representations. A fifth excerpt, while less direct, references broader grounding work in related UI/UX contexts, supporting the general theme of grounding reasoning in design artifacts rather than purely perceptual cues.


- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [How we do design critiques at Figma | Figma Blog](https://www.figma.com/blog/design-critiques-at-figma/)
  > Sep 4, 2019 — Learn six unique methods for design critique used by the Figma design team, along with some tips and best practices for running them effectively.
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [Google Trains User Interface and Infographics ...](https://www.infoq.com/news/2024/04/google-screenai/)
  > Apr 16, 2024 — Google Research recently developed ScreenAI, a multimodal AI model for understanding infographics and user interfaces.

### executive_summary
**Confidence:** medium

The executive summary centers on two technical bridges for AI-powered design reasoning: (a) process supervision and chain-of-thought for design critique, and (b) multimodal alignment of reasoning to visual design elements. Directly relevant are pieces that show concrete progress toward these goals. First, a prominent UI-focused vision-language model demonstrates the feasibility of grounding UI elements and infographics in multimodal understanding, illustrating a foundation for grounding textual critique in visual design artifacts. This source also discusses a specialized UI element identification task and a fine-tuning regimen that emphasizes UI-relevant capabilities, which aligns with the idea of producing stepwise, verifiable design critiques grounded in visuals. Second, datasets and benchmarks focused on design critiques provide concrete data structures for training models on progressive reasoning steps tied to visual evidence: for example, a dataset comprising textual critiques, corresponding bounding boxes, and quality ratings from professional designers. This supports the notion that design critique can be learned with process-like labels, enabling models to cite elements, apply design principles, and furnish evidence step by step. Third, methodologies that explicitly study grounded or visual chain-of-thought reasoning establish templates and evaluation paradigms for producing reasoned outputs that reference specific visual regions. Visual CoT and Grounded CoT offer frameworks where reasoning is accompanied by visual grounding, which is essential for linking each design critique step to a particular UI region or element. Fourth, models and datasets focused on UI design assessment and grounding—such as a data-driven UI design assessment model (UIClip) and UI grounding benchmarks—demonstrate practical capabilities for judging design quality and grounding descriptions to UI elements, providing a path toward end-to-end systems that combine critique generation with precise visual localization. Taken together, the excerpts indicate a credible trajectory toward integrating process-supervision-style reasoning with multimodal grounding, using ScreenAI-style UI-grounding models, design- critique datasets like UICrit, and visual grounding frameworks such as Visual CoT/Grounded CoT, culminating in practical tools for design evaluation and critique integration into design tools.

- [Google Trains User Interface and Infographics ...](https://www.infoq.com/news/2024/04/google-screenai/)
  > Apr 16, 2024 — Google Research recently developed ScreenAI, a multimodal AI model for understanding infographics and user interfaces.
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt

### chain_of_thought_for_design_critique
**Confidence:** high

The most directly supporting information comes from references describing UICrit as a dataset of design critiques with bounding boxes and the reported improvements from using targeted, multi-step prompting. Specifically, the existence of a design critique dataset and the notion that prompting prompts can yield higher-quality critiques is evidenced by statements describing a dataset of design critiques and quality ratings, and an accompanying claim of a 55% quality uplift demonstrated via a user study with designers. Further, discussions about UICrit in related works on UI judgment with multimodal models reinforce the idea that chain-of-thought style prompting and structured reasoning play a role in design evaluation tasks beyond crude, single-step prompts. Supporting context about chain-of-thought in multimodal design reasoning is provided by works proposing grounded or visual chain-of-thought, which formalizes the idea of producing intermediate reasoning steps that align with visual regions or UI elements. Additional corroboration comes from UI design evaluation literature that uses large language models to assess design quality and relevance, showing that design critique and evaluation tasks are being systematically studied in a multimodal setting. Together, these excerpts substantiate the claim that CoT-like prompting and stepwise design critique methodologies have been explored, with UICrit as a central example and related work exploring bounding-box localization and visual grounding in design tasks. The cited user study and performance observations in related UI judgement research further support the idea that such stepwise, verifiable reasoning processes can improve alignment with human judgments in design critique contexts.

- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

- [Do MLLMs Capture How Interfaces Guide User Behavior? ...](https://arxiv.org/html/2505.05026v3)
  > Aug 4, 2025 — UICrit: Enhancing Automated Design Evaluation with a UI Critique Dataset. In Proceedings of the 37th Annual ACM Symposium on User Interface
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a

### key_models_and_frameworks.4
**Confidence:** medium

The finegrained field value identifies SeeClick as a GUI grounding model whose primary capability is localizing a UI element from text descriptions, and notes its status as a baseline evaluated on the ScreenSpot benchmark with newer models sometimes outperforming it. The first excerpt describes SeeClick as a GUI grounding method designed to localize UI elements based on natural language instructions, including its focus on grounding tasks. The second excerpt reinforces SeeClick’s role as a GUI grounding model and provides context about its evaluation setting (as a baseline) and its relation to newer models like UGround that may outperform it under certain conditions. Together, these excerpts directly confirm the model’s purpose, capabilities, and benchmarking context, matching the field value’s content precisely. Other excerpts discuss related UI grounding work (ScreenAI, UIClip) but do not mention SeeClick, so they offer contextual relevance but not direct support for the specific SeeClick-centered field value.

- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.

### defining_design_process_supervision.step_correctness_criteria
**Confidence:** high

The finegrained field value specifies a multi-criterion definition of when a design critique step is “correct.” It requires grounding accuracy by ensuring the referenced region aligns with the ground-truth region (often via IoU), factual correctness by matching the stated issue to the labeled topic or objective rules, guideline consistency by ensuring fixes align with established design principles, and predictive alignment by ensuring any changes in quality ratings match the source dataset. Excerpts that describe datasets and annotations for design critiques (including bounding boxes and ground-truth regions) directly support the grounding and factual-correctness aspects, showing how critiques are linked to validated regions and labels. For example, a dataset that provides natural-language critiques with corresponding bounding boxes and design annotations demonstrates how a critique step can be tied to a verifiable region and topic. This supports grounding accuracy and factual correctness through concrete labels and regions. Other excerpts discuss the performance gains from using such critiques and the existence of a scoring regime where design quality, relevance, and improvement are assessed, which informs the predictive alignment and guideline-consistent evaluation framework. References to chain-of-thought prompting in design contexts lend context for how process supervision could be structured, showing how multi-step reasoning might be elicited and evaluated, which is relevant for the broader idea of stepwise critique processes. Additionally, references to UIClip and related LVLM evaluations illustrate practical mechanisms for grounding text reasoning to design elements, which aligns with the idea of grounding in visual design artifacts. Taken together, these excerpts collectively substantiate the notion that a design-critique step can be deemed correct when it accurately references the right region, adheres to design-grounded criteria, and aligns with established evaluation and scoring practices.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a

### defining_design_process_supervision.labeling_process_and_personnel
**Confidence:** high

The most relevant content directly describes a dataset where human-generated design critiques are paired with spatial grounding information such as bounding boxes, and design critique data that can support a labeling workflow where experts link textual feedback to specific UI regions. This aligns with the proposed labeling process that requires linking textual critiques to precise UI regions and could include element IDs or bounding boxes for grounding. The second excerpt supports the idea that there exists a dataset of critiques and corresponding quality ratings, illustrating that human designers annotate or critique designs and assign quality metrics, which informs how the labeling process could capture severity, categories, and justification. The third set of content references UI grounding and evaluation against design elements, reinforcing the practicality of grounding textual feedback to visual regions in UI contexts, which is central to the requested process supervision and verification via bounding boxes or element references. Together, these excerpts collectively endorse a human-centric labeling workflow with explicit region-grounded critique and measurable evaluation, consistent with the requested field value. 

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design

### key_models_and_frameworks.7
**Confidence:** high

The most relevant excerpts directly describe grounding and tooling surrounding Figma or similar UI design tooling. Excerpt describing a REST API for Figma file endpoints explicitly states that the API retrieves the full layer tree, properties, and text content, enabling grounding for design critiques to be linked to specific design layers or element IDs. This directly supports the field value’s assertion about programmatic access to design data and precise grounding to design elements. Also, excerpts about SeeClick and GUI grounding discuss methods for grounding visual data to GUI elements and actions, which reinforces the concept of associating textual design critique with concrete visual artifacts in a UI design context. Additional excerpts that touch on Figma-grounding concepts (constraints of grounding in Figma) provide context for how grounding is achieved within Figma workflows. The UIClip and ScreenAI excerpts, while focused on UI understanding and evaluation in visual-language models, offer broader context on evaluating and grounding design annotations, though they are less directly tied to the Figma REST API specifics. Taken together, the strongest support comes from explicit references to Figma REST API capabilities, followed by GUI grounding in related tooling, and then broader grounding methodologies in design-language tasks.

- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 

### key_models_and_frameworks.2
**Confidence:** high

The fine-grained field value describes a UIClip model that is a CLIP-style architecture tailored for UI design evaluation: it is pretrained on UI-focused data, scores UI design quality and text-image relevance, and provides a supervised signal for training reward models used in design critique. The most directly supportive excerpts state that UIClip outperformed other models on UI and infographic tasks, and that it is a computational model scoring UI screenshots for relevance to a textual description and design quality. Additional excerpts explain that UIClip benchmarks against other LVLMs on UI screens and that it assesses UI element relevance, which aligns with grounding judgments in design artifacts. A detailed excerpt notes UIClip’s data-driven training and dataset foundations, reinforcing claims about its architecture and training signals. Together, these excerpts corroborate the field value’s assertions about UIClip being a specialized CLIP-like model for UI design evaluation, its purpose (design quality and relevance scoring), and its role as a source of supervised signals for design critique models.

- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt

### relevant_datasets_and_benchmarks.4
**Confidence:** high

The finegrained field value describes OSWorld as a scalable, real-world benchmark environment for developing and evaluating multimodal agents that can operate a computer, with execution-based evaluation in a live OS environment. Excerpts that explicitly name OSWorld and describe its core characteristics align directly with this field value: one excerpt presents OSWorld as a benchmark for multimodal agents in real computer environments, emphasizing open-ended tasks and live execution, and another excerpt similarly references OSWorld and its benchmarking role. These passages provide direct alignment to the defined field attributes such as scalability, real-world task setup, execution-based evaluation, and desktop operating system context. Other excerpts discuss related UI/vision-grounding datasets or general GUI grounding, but do not specifically identify OSWorld or its execution-based benchmarking in a real OS setting, so they are less relevant to the precise OSWorld field value.

- [xlang-ai/OSWorld: [NeurIPS 2024] ...](https://github.com/xlang-ai/osworld)
  > [NeurIPS 2024] OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments - xlang-ai/OSWorld.
- [OSWorld: Benchmarking Multimodal Agents for Open-Ended ...](https://os-world.github.io/)
  > OSWorld is a first-of-its-kind scalable, real computer environment for multimodal agents, supporting task setup, execution-based evaluation, and interactive

### key_models_and_frameworks.0
**Confidence:** high

The finegrained field value describes ScreenAI as a Google-developed Visual Language Model tailored for UI and visually-situated tasks, with a dedicated Screen Annotation task that identifies UI element type, location, and description, and a training/fine-tuning setup spanning QA, summarization, and navigation datasets. The most relevant excerpts explicitly state that ScreenAI is a vision-language model for UI and infographics, that it includes a Screen Annotation task to identify UI element information (type, location, description), and that it is fine-tuned on QA, summarization, and navigation datasets for UI-related tasks. These points directly support the field’s claims about purpose, task design, and training signals. Additional excerpts reinforce that ScreenAI achieves strong UI/infographic-task performance and that Screen Annotation enables layout and spatial understanding capabilities, which align with the field’s emphasis on grounded design critique and element localization. Together, these excerpts corroborate the model’s architecture-and-training narrative and its core grounding capabilities, providing coherent support for the stated field value.

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas

### relevant_datasets_and_benchmarks.3
**Confidence:** high

The field value describes Mind2Web as a large-scale dataset for developing and evaluating generalist web agents that can follow language instructions to complete complex, multi-step tasks on any website. The first excerpt directly introduces Mind2Web as a dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website, which matches the name, purpose, and scope in the field value. The second excerpt discusses Mind2Web in the context of a related research work (an arXiv entry) that presents Mind2Web as a benchmark or dataset for web instruction-following tasks, reinforcing the description of its purpose and use. The third excerpt mentions Mind2Web on GitHub, indicating the availability and community-accessible nature of the Mind2Web project, which supports its role as a large-scale dataset for generalist web agents. Taken together, these excerpts corroborate the field value’s components: generalist web agents, instruction-following on websites, complex multi-step tasks, and web-wide applicability. The content explicitly ties Mind2Web to evaluating agents that operate across websites, aligning with the field value’s emphasis on language-driven, task-oriented web agent capabilities and dataset scale.

- [Mind2Web: Towards a Generalist Agent for the Web](https://osu-nlp-group.github.io/Mind2Web/)
  > Mind2Web is a dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website
- [Mind2Web: Towards a Generalist Agent for the Web](https://arxiv.org/html/2306.06070v3)
  > We introduce Mind2Web, the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex
- [Mind2Web: Towards a Generalist Agent for the Web](https://github.com/OSU-NLP-Group/Mind2Web)
  > Mind2Web is the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any

### relevant_datasets_and_benchmarks.6
**Confidence:** high

The field value specifies a dataset named ENRICO that provides topic-level supervision for mobile UI designs, with a high-quality collection of 1,460 mobile UI designs and 20 predefined design topics (illustrative topics include categories like 'Badges' and 'Login Form'). The most directly supportive content identifies ENRICO as a dataset for topic modeling of mobile UI designs and explicitly mentions the 1,460 UIs and 20 topics, establishing both the purpose (topic-level supervision/classification of design principles) and the scale and taxonomy. The corroborating excerpts reinforce this by restating the ENRICO dataset name and its topic-focused labeling scheme, including the count of UIs and the presence of predefined design topics. Together, these excerpts coherently confirm the described field value: ENRICO provides topic-level supervision for mobile UI designs, with a dataset of 1,460 UIs organized into 20 topics, aiding models in classifying design principles or issues. The additional excerpts mentioning ENRICO’s topic modeling framing further support the interpretation of its purpose and design-topic taxonomy, aligning with the field value’s assertions about supervision and topic categories.

- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/fullHtml/10.1145/3406324.3410710)
  > by LA Leiva · 2020 · Cited by 103 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/10.1145/3406324.3410710)
  > Feb 25, 2021 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A High-quality Dataset for Topic Modeling of Mobile ...](https://userinterfaces.aalto.fi/enrico/)
  > Presents a high-quality dataset of mobile UI designs, categorized according to 20 design topics. Reports validation of computational models for topic

### key_models_and_frameworks.5
**Confidence:** medium

The most pertinent passages describe methods and datasets for grounding visual UI content to textual or linguistic reasoning. SeeClick explicitly targets GUI grounding for advanced visual tasks, which aligns with the field’s focus on grounding design reasoning to visual artifacts. SeeClick’s emphasis on GUI grounding directly supports the idea of spatially anchored reasoning in UI contexts. The UIClip paper evaluates models on design quality and grounding tasks, showing a computational approach to scoring UI screenshots against textual descriptions, which closely mirrors the notion of annotating UI elements with descriptive functions and grounding them in visuals, a core aspect of AutoGUI. Additional UI-grounding and evaluation content in UIClip that reports superior performance across grounding-related tasks reinforces the feasibility and effectiveness of such pipelines for large-scale UI element annotation and grounding. Other UI-oriented papers discuss ScreenAI’s Screen Annotation task, which involves identifying UI element information (type, location, description) on a screen, demonstrating concrete mechanisms for linking textual reasoning to spatial UI features, a direct parallel to AutoGUI’s goals. The general discussion of chain-of-thought prompting in UX research contexts provides a methodological touchstone for training designs that use stepwise reasoning, which is conceptually aligned with the AutoGUI emphasis on verifiable reasoning steps and training signals beyond final answers. Figma grounding discussions and REST API references provide practical context for how UI elements and their attributes are handled in tooling and data pipelines, which complements the AutoGUI objective of structured, verifiable UI element annotations. The remaining excerpts offer broader coverage of UI-grounding capabilities and related research that, while not mentioning AutoGUI explicitly, establish the state of the art in grounding reasoning to design elements and evaluation. Overall, the strongest support comes from sources that demonstrate explicit UI grounding tasks, evaluation against UI features, and methods to tie textual interpretations to concrete visual UI regions; additional context about reasoning pipelines and tooling solidifies the alignment to AutoGUI’s described architecture and dataset objectives.

- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > ## 1. Introduction
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas
  > ncluding a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen. Thes
- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .

### defining_design_process_supervision.training_data_structure
**Confidence:** high

The field value specifies a multi-task training data structure that includes: (a) an input UI such as a screenshot, (b) a complete reasoning chain broken into steps, and (c) a final critique summary or rating. It also specifies auxiliary labels for each step, including topic classification, a predicted quality rating, grounding coordinates (bounding boxes) for visual grounding, and extracted evidence like text spans or measurements. Excerpts that explicitly describe a dataset with natural language UI design critiques and corresponding bounding boxes provide direct evidence for the grounding aspect and the stepwise reasoning concept. Excerpts that discuss UIClip and performance on UI design tasks demonstrate a concrete instantiation of a model and data pipeline that supports grounding and evaluation across multiple objectives, which aligns with the described multi-task supervision and multi-head architecture. Additional excerpts that cover chain-of-thought prompting in design contexts offer contextual support for the idea of stepwise reasoning as part of the training data, even if not all details of the auxiliary labels are spelled out in every passage. Overall, these excerpts collectively corroborate the core components of the field value: a structured, multi-part training instance linking a UI input, a detailed, stepwise critique reasoning, grounding information to UI elements, and evaluative targets for multi-task learning.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a

### challenges_and_limitations.data_availability_and_cost
**Confidence:** medium

The most relevant excerpt explicitly describes UICrit as a dataset with thousands of designer-provided critiques plus bounding boxes, illustrating the depth and labor involved in creating verifiable, region-grounded design critiques. This directly supports the claim that high-quality, step-by-step design reasoning data necessitates expert involvement and region annotations, driving up cost. Related excerpts reinforce this by showing that datasets exist to capture design critiques and reasoning (bounding boxes, detailed steps), and that broader work explores chain-of-thought or stepwise reasoning in vision-language settings, which aligns with the idea of training signals built from reasoning steps rather than just final answers. Additional excerpts demonstrate that UI design evaluation models rely on substantial annotated data and grounding, underscoring the scalability challenge and cost barrier. Collectively, these sources substantiate the core assertion: data scarcity and high annotation cost are central obstacles to developing robust, process-supervised design reasoning models, and existing efforts (like AutoGUI and UI critique datasets) are motivated by the need to reduce annotation burden while improving grounding and verifiability.

- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [[2603.13878] Step-CoT: Stepwise Visual Chain-of-Thought ...](https://arxiv.org/abs/2603.13878)
  > by L Fan · 2026 — Abstract:Chain-of-thought (CoT) reasoning has advanced medical visual question answering (VQA), yet most existing CoT rationales are
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design

### relevant_datasets_and_benchmarks.9
**Confidence:** high

The most directly relevant excerpt introduces the idea of grounded chain-of-thought for multimodal tasks and explicitly names the MM-GCoT dataset, which matches the field value’s description of Grounded Chain-of-Thought in a multimodal setting. It also signals that this line of work studies grounding reasoning in visual evidence, aligning with the field value’s emphasis on grounding steps to visual data. Another highly relevant excerpt provides the exact dataset name and a concrete size, stating that MM-GCoT consists of 24,022 examples of grounded reasoning chains across thousands of images, which directly corroborates the field value’s size and scope. Additional excerpts discuss bounding boxes and explicit step-by-step reasoning linked to those visual coordinates, which aligns with the field value’s annotation details about grounding each reasoning step to bounding box coordinates. Other excerpts discuss related visual chain-of-thought efforts (e.g., Visual CoT) and general UI grounding work, which provide context and related methods but are less directly about MM-GCoT itself, making them supportive but secondary to the core MM-GCoT-specific claims.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  >  
  >  
  >  

### relevant_datasets_and_benchmarks.2
**Confidence:** high

The target field value defines ScreenSpot as a cross-platform GUI grounding benchmark with over 1,200 instructions, each instruction paired with a ground-truth bounding box for a UI element, spanning iOS, Android, macOS, Windows, and Web. The most pertinent excerpt explicitly describes ScreenSpot as an evaluation benchmark for GUI grounding, comprising over 1,200 instructions across five environments, and notes that each item consists of a single-step instruction with a ground-truth bounding box, while also detailing platform coverage. This directly validates the size, structure, and cross-platform nature of the benchmark as described in the field value. A related excerpt mentions a table evaluating grounding accuracy on ScreenSpot in an agent setting, which corroborates that ScreenSpot is used for benchmarking GUI grounding performance, reinforcing its role as an evaluation benchmark and its practical application. Additional references identify ScreenSpot by name and connect it to the GUI grounding context, further substantiating its identity and relevance to the described benchmarking scenario. Collectively, these excerpts support the key attributes of ScreenSpot captured by the finegrained field value: a cross-platform GUI grounding benchmark with a large, well-defined instruction set and bounding-box annotations.

- [The model, data and code for the visual GUI Agent SeeClick](https://github.com/njucckevin/SeeClick)
  > ScreenSpot is an evaluation benchmark for GUI grounding, comprising over 1200 instructions from iOS, Android, macOS, Windows and Web environments,
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > Table 3: Grounding accuracy on ScreenSpot (Agent Setting) with planner-generated REs.
  > UGround
  > ScreenSpot

### technical_approaches_for_visual_grounding.bounding_box_generation
**Confidence:** high

The most relevant information comes from sources that directly link design critique with bounding boxes and grounding. A dataset like UICrit provides human-generated critiques paired with bounding boxes for each critique, establishing a concrete foundation for training models to jointly produce a textual design critique and the spatial coordinates of the referenced element. This directly supports the idea that a primary method for generating bounding boxes is to use multi-task or two-head models that are trained to produce both textual output and spatial coordinates, sharing a visual encoder. Relatedly, ScreenAI demonstrates a vision-language model specialized for UI and infographics, with a Screen Annotation task requiring the model to identify an element’s type, description, and location (bounding box); this shows a practical integration of grounding in a production-grade model. The Screen Annotation task and the ScreenAI work together underline how grounding capabilities can be built into model skillsets, aligning with the proposed approach of joint text and bounding-box outputs. Grounded Chain-of-Thought (GCoT) research explicitly studies interleaving reasoning steps with coordinate outputs, effectively tying parts of the rationale to specific visual regions, which directly substantiates the claim that a prompt chain or chain-of-thought approach can be used to produce spatially grounded design reasoning. Complementary datasets and work in the Visual CoT line, which includes datasets annotated with intermediate bounding boxes and reasoning steps, reinforce that bounding-box grounding can be learned from many examples where textual reasoning is tied to precise visual regions. Additional related work on multi-modal grounding and visual grounding for GUI elements, including universal visual grounding benchmarks and the variety of GUI element types, demonstrates that spatial grounding in design contexts is a well-explored area with established benchmarks. Together, these sources support a coherent view: use a shared visual encoder in multi-task architectures to jointly predict critique text and bounding-box coordinates; leverage datasets like UICrit to train such models; employ prompt-chain techniques to separate reasoning from coordinate outputs; and leverage ScreenAI-style grounding tasks to imbue models with explicit grounding capabilities for UI elements. The inclusion of the Grounded Chain-of-Thought and MM-GCoT datasets provides evidence that large-scale, grounded reasoning data can improve the alignment between verbal critique and precise visual regions, which addresses the core need of spatially-grounded design reasoning.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
- [A Data-driven Model for Assessing User Interface Design](https://arxiv.org/abs/2404.12500)
  > by J Wu · 2024 · Cited by 52 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.
- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > The benchmark consists of single-step instructions and the corresponding bounding box of the target elements across mobile (e.g., iOS and Android), desktop (e.g., macOS and Windows), and web environments.
  > These elements vary between text-based elements, icons (e.g., the trash can icon) and widgets (e.g., to-do lists), representing diverse GUI element types.
- [Google Trains User Interface and Infographics ...](https://www.infoq.com/news/2024/04/google-screenai/)
  > Apr 16, 2024 — Google Research recently developed ScreenAI, a multimodal AI model for understanding infographics and user interfaces.

### key_models_and_frameworks.6
**Confidence:** low

The finegrained field value describes Axe-core as a non-ML library that codifies accessibility rules from WCAG and can act as a programmatic verifier within an AI design critique workflow. None of the excerpts explicitly mention Axe-core, WCAG, or an accessibility-rule engine. However, there are excerpts that discuss designing and evaluating UI/UX with an emphasis on grounding reasoning in UI elements and using design-quality and improvement-focused evaluation as a task for AI models. The SeeClick-related work focuses on GUI grounding and automating actions by observing UI interfaces, which aligns with the concept of tying textual or reasoning outputs to concrete visual elements. The UIClip paper discusses tasks like design quality, improvement suggestions, and design relevance, which reflects a formalized approach to critiquing design that could conceptually dovetail with a rule-based verifier supplying objective criteria. The combination of these pieces indicates a pathway where an AI system’s stepwise design critique could be constrained or checked by a formal verifier or grounding mechanism, even though the excerpts do not explicitly implement Axe-core or WCAG rules.

- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > ## 1. Introduction

### relevant_datasets_and_benchmarks.7
**Confidence:** high

The most relevant excerpt directly states the existence of an AutoGUI pipeline for automatically annotating UI elements with detailed functionality descriptions at scale and explicitly mentions constructing an AutoGUI-704k dataset, including the scope (704k annotations) and the annotation quality control via LLMs to ensure human-level correctness. This aligns with the fine-grained field value’s description of a large-scale dataset intended to enhance UI grounding through functionality-focused annotations and the use of LLMs for verification. A closely related excerpt reiterates the construction of the AutoGUI-704k dataset and highlights the dataset’s scale and its impact on UI grounding capabilities, which supports the field value’s claims about usefulness and scale. Another excerpt also mentions AutoGUI-704k in the context of dataset construction and its role in annotation quality, reinforcing the same key facts about size, annotation details, and the pipeline. A fourth excerpt discusses the AutoGUI pipeline for annotating UI elements with functionality descriptions at scale, which provides context for how the dataset was generated and validated, further supporting the field value’s description of the methodology and purpose. Taken together, these excerpts directly support the existence, scale, purpose, and verification approach of AutoGUI-704k as described in the fine-grained field value.

- [AutoGUI: Scaling GUI Grounding with Automatic ...](https://openreview.net/forum?id=wl4c9jvcyY)
  > AutoGUI: Scaling GUI Grounding with Automatic Functionality Annotations from LLMs
## Hongxin Li , Jingran Su , Jingfan CHEN , Yuntao Chen , Qing Li , Zhaoxiang Zhang
**Abstract:** User interface understanding with vision-language models has received much attention due to its potential for enabling next-generation software automation. However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale. Specifically, we leverage large language models (LLMs) to infer element functionality by comparing the UI content changes before and after simulated interactions with specific UI elements. To improve annotation quality, we propose LLM-aided rejection and verification, eliminating invalid and incorrect annotations without human labor. We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets. Human evaluation shows that the **AutoGUI** pipeline achieves annotation correctness comparable to trained human annotators. Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets.
  > However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale.

### relevant_datasets_and_benchmarks.10
**Confidence:** high

The most directly relevant excerpts describe Visual CoT as a dataset for advancing multimodal reasoning, including the presence of a visual chain-of-thought with a large number of annotated reasoning steps and bounding boxes highlighting key visual regions. This aligns with the field value which specifies a large-scale Visual CoT dataset designed to train models to produce interpretable, step-by-step visual reasoning, with a substantial subset containing detailed reasoning chains and intermediate visual region annotations. Specifically, the excerpts stating that Visual CoT comprises a large dataset with many items and includes bounding boxes that highlight regions essential for the reasoning steps directly map to the described fields: scale (438,000 QA pairs; ~98,000 with detailed steps) and annotation details (intermediate bounding boxes for each step). Related passages discuss grounded chain-of-thought datasets and the use of visual regions to support reasoning, which reinforces the interpretation that Visual CoT is intended to ground reasoning in visual evidence, consistent with the finegrained field value’s emphasis on verifiable, step-by-step reasoning anchored in visual elements. Therefore, these excerpts collectively support the claim about a large-scale Visual CoT dataset with interpretable visual reasoning steps and bounding-box annotations, matching the requested finegrained field value.

- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  >  
  >  
  >  
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.

### technical_approaches_for_visual_grounding.structural_data_parsing
**Confidence:** high

The most relevant sources discuss grounding design reasoning to specific UI elements rather than just image regions. One source emphasizes that the Rico dataset contains visual, textual, structural, and interactive design properties for thousands of UI screens and elements, supporting the use of structural design data to anchor critiques in concrete elements. Another source explicitly frames universal visual grounding for GUI agents and notes that elements vary from text-based items to icons and widgets, highlighting the importance of referencing target UI elements rather than generic regions. Additional sources describe grounded chain-of-thought and multimodal reasoning datasets that pair reasoning steps with visual-grounding annotations (e.g., bounding boxes and intermediate grounding data), which align with building a grounding signal around structured design elements. Further, several pieces discuss ScreenAI and related visual grounding work for UI tasks, underscoring progress in linking critique to UI elements and regions, which provides a methodological backdrop for integrating structural grounding into multimodal critique. Finally, one source discusses UI design assessment models that relate screenshot understanding to design quality, indicating practical applications of structural grounding in evaluating UI components, not just pixels. Taken together, the excerpts support the claim that robust grounding benefits from leveraging underlying structural data (node trees, DOM, layout hierarchies, Figma layers) and from datasets or methods that annotate or anchor reasoning to specific design elements rather than solely to pixel regions. This directly aligns with the proposed approach of attaching critiques to explicit element IDs (e.g., “button-submit”, “layer-header”) with hierarchical context. 


- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > The benchmark consists of single-step instructions and the corresponding bounding box of the target elements across mobile (e.g., iOS and Android), desktop (e.g., macOS and Windows), and web environments.
  > These elements vary between text-based elements, icons (e.g., the trash can icon) and widgets (e.g., to-do lists), representing diverse GUI element types.
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
- [A Data-driven Model for Assessing User Interface Design](https://arxiv.org/abs/2404.12500)
  > by J Wu · 2024 · Cited by 52 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design

### challenges_and_limitations.model_technical_limitations
**Confidence:** medium

The finegrained field value asserts that current Vision-Language Models struggle with precise grounding when used as design critics, citing concrete evidence from grounding-focused datasets and benchmarks. Excerpt that describes the UICrit dataset explicitly states it provides human-generated natural language design critiques with corresponding bounding boxes, which is directly relevant to grounding design critique in visual interfaces. The accompanying paper on UICrit elaborates that the dataset collects professional critiques, reinforcing that real-world design evaluation relies on grounded references rather than purely textual analysis, which supports the notion of grounding limitations in generic models. SeeClick contributes to GUI grounding by enabling grounding of actions to specific interface elements, illustrating practical challenges in linking textual critique to concrete visual components. UIClip work benchmarks UI design critique and grounding performance in UI contexts, which provides evidence that even specialized models may be evaluated on grounding-related tasks, aligning with the claim of limitations in grounding accuracy. Benchmarking discussions in MLLM as a UI Judge further corroborate that multimodal judges are evaluated on design critique tasks, highlighting the broader context in which grounding reliability is scrutinized, thereby supporting the claim of current technical limitations in grounding design reasoning to visual elements.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
- [MLLM as a UI Judge: Benchmarking Multimodal LLMs for ...](https://arxiv.org/html/2510.08783v1)
  > Oct 9, 2025 — Recent advances in multimodal large language models (MLLMs) offer a promising opportunity to act as early evaluators, helping designers narrow

### technical_approaches_for_visual_grounding.visual_prompting_methods
**Confidence:** high

The most directly relevant excerpt describes a dataset that pairs design critiques with bounding boxes, establishing a foundation for groundable design reasoning. This shows explicit links between textual critiques and spatial targets, which is central to visual prompting for grounding textual output in visual regions. Related excerpts describe universal visual grounding across GUI elements and bounding-box annotations, reinforcing the idea that visual grounding relies on explicit spatial annotations. Other excerpts introduce grounded chain-of-thought and multimodal reasoning datasets that provide stepwise reasoning with visual references, which aligns with the notion of structuring design reasoning in a way that can be verified or grounded in visual artifacts. Additional references discuss tools or models for UI grounding (bounding boxes, UI element descriptions) and datasets like UIClip or RICO that provide rich visual-structure data to support grounding. Together, these excerpts collectively support the claim that augmenting inputs with explicit spatial cues (coordinate references, grids, labeled patches, bounding boxes) improves a model’s ability to reference and localize specific visual regions during design critique or evaluation tasks.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > The benchmark consists of single-step instructions and the corresponding bounding box of the target elements across mobile (e.g., iOS and Android), desktop (e.g., macOS and Windows), and web environments.
  > These elements vary between text-based elements, icons (e.g., the trash can icon) and widgets (e.g., to-do lists), representing diverse GUI element types.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
- [A Data-driven Model for Assessing User Interface Design](https://arxiv.org/abs/2404.12500)
  > by J Wu · 2024 · Cited by 52 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.
- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen

### key_models_and_frameworks.4.name
**Confidence:** high

The field value is the name of a specific model/framework referenced in the document. The excerpts describe SeeClick as a method focused on GUI grounding and driver for automated interaction with visual interfaces, which directly supports identifying the name SeeClick as a concrete item in a collection of models/frameworks related to GUI grounding and visual design reasoning. The first excerpt presents SeeClick as a method to automate GUI grounding data curation and adapt mobile UI datasets, indicating it is a named approach. The second excerpt corroborates this by detailing SeeClick’s capability to perform low-level actions from interface observations, reinforcing that SeeClick is a concrete named framework suitable for design-grounded reasoning tasks.

- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.

### key_models_and_frameworks.4.purpose
**Confidence:** high

The finegrained field value describes a model focused on GUI grounding, localizing a specific UI element based on a natural language instruction. The most relevant excerpt discusses SeeClick, a method designed to automate GUI grounding by observing interface data to obtain mobile grounding data, which directly aligns with localizing UI elements from natural language for grounding tasks. The second excerpt describes SeeClick further as designed to perform low-level actions like clicking or typing directly by observing interface screenshots, which reinforces the grounding capability in GUI contexts and its applicability to linking language instructions to interface components. Taken together, these excerpts provide direct support for a model that grounds natural language to visual UI elements and handles UI localization tasks, matching the described finegrained field value.

- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.

### key_models_and_frameworks.7.name
**Confidence:** high

The target field value is the name of a Figma-related model or framework, specifically 'Figma REST API'. The most directly supporting information is a statement describing the REST API for Figma, including that it is a REST API and that it can GET file nodes, with mentions of referencing nodes by IDs and using a file key. This directly demonstrates the existence and nature of a Figma REST API and its basic operation. Additional support comes from a discussion about Figma grounding and constraints in design tooling, which reinforces the context that Figma is a central design tool and that grounding/connections to design data are relevant, even though it does not explicitly name the REST API. Together, these excerpts corroborate that the field value corresponds to the Figma REST API as a concrete entity and context within design tooling and programmatic access to design artifacts.

- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly

### relevant_datasets_and_benchmarks.1
**Confidence:** high

The strongest excerpt states the existence of UGround and describes it as the largest dataset for GUI visual grounding collected to date, containing 10 million GUI elements with referring expressions over 1.3 million screenshots, and notes that 95% of the data is web-derived. This directly aligns with the field value’s claims about scale (10 million elements), coverage (1.3 million screenshots), and the composition (pairs of referring expressions and their bounding box coordinates). The second excerpt explicitly identifies UGround as a dataset and provides its naming context, reinforcing the field value’s identity and focus. Together, these excerpts firmly support the field value’s key attributes: name (UGround), purpose (GUI visual grounding via bounding boxes and referring expressions), size/scope (10M elements, 1.3M screenshots), annotation details (pairs of text expressions and bounding boxes), and platform (Web-dominant, ~95%).

- [UGround Homepage](https://osu-nlp-group.github.io/UGround/)
  > We collect the largest dataset for GUI visual grounding so far, containing 10M GUI elements (~95% from web) and their referring expressions over 1.3M
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > UGround (Ours)

### challenges_and_limitations.subjectivity_and_ambiguity
**Confidence:** high

The field value asserts that design judgment is inherently subjective and that defining a universally “correct” step in design reasoning is challenging. Evidence from recent UI evaluation research shows that even capable multimodal LLMs achieve high alignment with human Likert judgments in some cases but drop to near random performance on subtler, pairwise design differences, highlighting the ambiguity and context-dependence of design quality. This supports the central claim of subjectivity in design critique. Further, multiple sources document the use of chain-of-thought and visual-grounded reasoning approaches to tackle design tasks: (a) datasets and prompts that collect step-by-step reasoning and bounding regions to ground critiques provide a concrete mechanism for making design judgments more verifiable, (b) visual CoT and related datasets demonstrate how intermediate reasoning steps can be anchored to visual regions, aiding grounding in design artifacts, and (c) SeeClick and GUI grounding works illustrate methods to connect verbal critique to specific UI elements, which is crucial for spatially-grounded design reasoning. Together, these excerpts illustrate both (i) the existence of subjectivity in design critique and (ii) concrete strategies—CoT, visual CoT, and GUI grounding—to structure and verify design reasoning steps. The cited performance gaps and the existence of grounding datasets corroborate that the field is actively exploring how to quantify and improve design judgments while acknowledging that current models struggle with nuanced, subjective judgments that lack a single objective correct answer.

- [MLLM as a UI Judge: Benchmarking Multimodal LLMs for ...](https://arxiv.org/html/2510.08783v1)
  > Oct 9, 2025 — Recent advances in multimodal large language models (MLLMs) offer a promising opportunity to act as early evaluators, helping designers narrow
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [[2603.13878] Step-CoT: Stepwise Visual Chain-of-Thought ...](https://arxiv.org/abs/2603.13878)
  > by L Fan · 2026 — Abstract:Chain-of-thought (CoT) reasoning has advanced medical visual question answering (VQA), yet most existing CoT rationales are

### key_models_and_frameworks.3
**Confidence:** medium

The most relevant content directly discusses chain-of-thought prompting and its extension to grounding reasoning in visual contexts. An excerpt describing Chain-of-Thought prompting as a technique that breaks a process into pieces is directly aligned with the notion of stepwise reasoning, and it mentions the broader idea of generating design-focused reasoning. Closely related are excerpts that describe GUI grounding and grounding data for UI elements, which relate to tying verbal critique or reasoning to specific UI regions or elements. Specifically, sources that discuss automating the curation of grounding data for GUI tasks, and reports on grounding in UI-focused models, provide context for how ground-truth spatial evidence can support verifiable design critique steps. Additional items discuss constraints of grounding in design tools (e.g., Figma) and evaluation of UI design through grounded language models, which reinforce the connection between readable reasoning steps and their spatial grounding. Taken together, these excerpts support the field value’s core ideas: producing verifiable, step-by-step reasoning linked to visual evidence, using datasets and evaluation protocols designed to measure both the quality of the reasoning and its grounding to visual elements, within design-focused tasks.

- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > ncluding a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen. Thes
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas

### relevant_datasets_and_benchmarks.8
**Confidence:** high

The field value describes Rico as a well-known, large-scale mobile UI dataset that provides UI screenshots along with their view hierarchy (XML) detailing structure and properties of UI elements, and that it spans thousands of UI screens. The most directly supportive excerpts state that Rico contains visual, textual, structural, and interactive design properties for tens of thousands of UI screens and millions of UI elements, which aligns with the field value’s emphasis on scale and the types of data (visuals, structure). Additional excerpts confirm Rico’s role as a foundational dataset in UI research and its mention within related works, reinforcing its scope and utility for UI-related tasks. The combination of explicit scale (66k screens, 3M elements) and the description of structural/interactive properties provides strong, direct support for the field value’s claims about Rico’s size, contents, and purpose. The surrounding context mentioning Rico alongside Screen2Words corroborates its prominence and typical usage in UI design research.

- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > Large-scale mobile GUI data repositories are crucial building blocks for data-driven model development. The Rico dataset  [7 , 30 ] contains visual, textual, structural, and interactive design properties of 66k unique UI screens from 9.7k Android apps spanning 27 categories in the Google Play Store.

### future_outlook_and_research_directions.dataset_and_benchmark_development
**Confidence:** medium

The most directly relevant material discusses concrete UI critique datasets and the role of benchmarks in advancing automated design evaluation. A targeted design-critique dataset with thousands of entries and quality ratings demonstrates a path toward scalable supervision signals for evaluation models, aligning with the field value’s emphasis on expanding datasets and benchmarking. The note that such a dataset led to substantial performance improvements in practice supports the claim that richer datasets can drive progress in design reasoning. Additionally, explicit calls for releasing datasets to the research community reinforce the outlook that broader data resources, including multi-task and multi-platform considerations, are essential for robust progress. Other excerpts describe UI-focused datasets and evaluation frameworks (UIClip) that quantify design relevance and quality, illustrating concrete steps toward standardized benchmarking and grounding in UI artifacts. Prominent chain-of-thought prompting work in UX research contexts signals a trend toward structured reasoning as a supervision signal, which complements the proposed dataset-centric research direction. Platform/tooling references (like a Figma REST API) underscore the need to ground research in real design assets and facilitate scalable data collection across mobile, web, and desktop contexts. Collectively, these excerpts map onto the field value by reinforcing: (a) the necessity of larger, more diverse, and task-spanning datasets and benchmarks for design reasoning; (b) the utility of critique-based supervision and explainable reasoning prompts; (c) the importance of diverse design platforms and grounding in visual/UI elements to ensure practical applicability; (d) the progress demonstrated by concrete datasets and evaluation pipelines, which supports a forward-looking research direction toward ScreenSpot-like grounding benchmarks and broader accessibility considerations.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

  > The dataset will be released to the research community.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.

### future_outlook_and_research_directions.model_advancements
**Confidence:** medium

The target field value outlines several concrete research directions: (a) developing process supervision and chain-of-thought mechanisms for design reasoning, including training signals beyond final answers (e.g., stepwise reasoning traces that are verifiable); (b) grounding design reasoning to visual elements with bounding boxes, layers, and UI components, leveraging vision-language capabilities; (c) multi-task models with heads for critique generation, bounding box prediction, issue-topic classification, and quality rating; and (d) integrating structured data from design tools (like the Figma REST API) to improve grounding and semantic understanding. Excerpts describing Grounded Chain-of-Thought and Visual CoT establish the feasibility and tooling for stepwise multimodal reasoning and the importance of bounding boxes and visual grounding. They also discuss datasets that pair questions with intermediate visual reasoning steps and bounding boxes, which directly support the idea of training or prompting models to produce verifiable design reasoning paths. Additional excerpts present UI design critique datasets and evaluation models (UIClip and related work) that assess design quality and provide critiques, which aligns with the multi-task objective of generating critique text alongside design-grounding signals. The utility of a design-data ecosystem extending to actual design artifacts is reinforced by references to UI design evaluation pipelines and proposals to leverage design file structures, including the Figma REST API, to ground reasoning in real UI elements. Collectively, these sources substantiate the vision of more sophisticated, grounded, and multi-task design reasoning systems, combining stepwise reasoning, bounding-box grounding, and structured design data to enable richer, more faithful critique capabilities.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://openreview.net/forum?id=aXeiCbMFFJ)
  > by H Shao · Cited by 308 — The paper is a straightforward one, contributing a dataset for visual chain-of-thought reasoning, by provding bounding boxes and reasoning steps.
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > The dataset will be released to the research community.
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .

### relevant_datasets_and_benchmarks.4.name
**Confidence:** high

The target field value is OSWorld, specifically the name of a dataset/benchmark. The excerpts describe OSWorld in two forms: a GitHub project titled OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments, and an official webpage stating that OSWorld is a scalable, real computer environment for multimodal agents with task setup and evaluation features. Both excerpts provide direct evidence that the dataset/benchmark name is OSWorld and indicate its purpose and context (multimodal agents, real computer environments, benchmarks). The first excerpt supports the exact naming by embedding OSWorld in the project title and repository context; the second supports it by describing the project scope and its benchmarking capabilities. Together, they corroborate that the finegrained field value OSWorld matches the referenced dataset/benchmark name. No excerpts contradict the value.

- [xlang-ai/OSWorld: [NeurIPS 2024] ...](https://github.com/xlang-ai/osworld)
  > [NeurIPS 2024] OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments - xlang-ai/OSWorld.
- [OSWorld: Benchmarking Multimodal Agents for Open-Ended ...](https://os-world.github.io/)
  > OSWorld is a first-of-its-kind scalable, real computer environment for multimodal agents, supporting task setup, execution-based evaluation, and interactive

### future_outlook_and_research_directions.tool_integration
**Confidence:** medium

The target field describes a future where AI critiques are tightly coupled with design tools (e.g., Figma) through programmatic access to the file structure and layers, enabling the AI to point to exact layers or components and propose concrete, one-click fixes. Excerpt discussing the Figma REST API shows that programmatic access to the file’s layer tree, node properties, and text content exists, which directly supports the feasibility of linking AI critiques to specific design elements. Excerpts describing targeted UI critique datasets and UI design evaluation models demonstrate progress toward grounding reasoning in actual visual design artifacts and obtaining interpretable, element-level feedback, which aligns with the goal of spatially-grounded design reasoning and actionable suggestions. Additional context from multimodal grounding and visual chain-of-thought works illustrates how models can connect textual critiques to visual regions or UI components, providing a technical foundation for integrating reasoning steps with visual design artifacts. Taken together, these excerpts support the idea that seamless tool integration and verifiable grounding in design artifacts are plausible directions, with credible precedent in tooling access (APIs) and in grounding design reasoning to visual elements. The cited works on multimodal grounding and visual CoT further reinforce the feasibility of linking design critique to specific UI regions or layers, which underpins the proposed workflow integration and tool-augmented reasoning loop proposed in the field value.

- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven experienced designers. We
  > esulted in a 55 percent improvement in performance over zero shot prompting, which was confirmed by design experts via a user study, demonstrating the value of this dataset in improving automated design comments generation.

  > The dataset will be released to the research community.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  > # UIClip: A Data-driven Model for Assessing User Interface Design
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-

### relevant_datasets_and_benchmarks.4.size_and_scope
**Confidence:** high

The finegrained field value describes an interactive computer environment that supports dynamic task setup and evaluation, contrasting with static datasets. The excerpts describe OSWorld as a real computer environment designed for multimodal agents with task setup, execution-based evaluation, and interactive capabilities. This directly supports the notion of an interactive, dynamic environment rather than a static dataset, aligning with the emphasis on interactive task configuration and evaluation. The first excerpt notes that OSWorld benchmarks multimodal agents for open-ended tasks in real computer environments, implying an interactive and dynamic evaluation context. The second excerpt emphasizes that OSWorld provides a scalable real computer environment for multimodal agents, with features for task setup, execution-based evaluation, and interactive aspects, reinforcing the match to a dynamic, interactive platform. Taken together, these excerpts provide direct support for the field value’s claim about an interactive, non-static environment that enables dynamic task setup and evaluation.

- [xlang-ai/OSWorld: [NeurIPS 2024] ...](https://github.com/xlang-ai/osworld)
  > [NeurIPS 2024] OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments - xlang-ai/OSWorld.
- [OSWorld: Benchmarking Multimodal Agents for Open-Ended ...](https://os-world.github.io/)
  > OSWorld is a first-of-its-kind scalable, real computer environment for multimodal agents, supporting task setup, execution-based evaluation, and interactive

### key_models_and_frameworks.4.key_capabilities
**Confidence:** high

The target field value describes a capability focused on localizing UI elements from text descriptions and positions this as a benchmark for GUI grounding tasks. The first excerpt explains a method to automate the curation of GUI grounding data and to adapt public mobile UI datasets to obtain mobile grounding data, which directly supports building and benchmarking UI element grounding systems. The second excerpt describes a system designed to understand the interface and perform actions by observing interface screenshots, which illustrates a concrete grounding capability in practice—mapping textual or descriptive intent to specific GUI elements. Together, these excerpts underpin both the data-driven benchmarking aspect and the practical grounding capability required to localize UI elements from descriptions, aligning with the field value as a primary UI-element localization benchmark in GUI grounding tasks.

- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick

### key_models_and_frameworks.2.name
**Confidence:** high

The finegrained field seeks the value of the name at the path corresponding to key_models_and_frameworks.2.name, which is expected to be the model name. The provided excerpts repeatedly mention a model named UIClip as a data-driven approach for assessing user interface design, including discussions of its performance, tasks it was evaluated on, benchmarking against other vision-language models, and its role as a computational model for scoring UI designs. Specifically, one excerpt explicitly states the model name UIClip and notes that it outperformed others, another excerpt presents UIClip as the subject of an assessment across design quality and relevance tasks, and additional excerpts describe UIClip's benchmarking, dataset, and evaluation results. Collectively, these excerpts establish that UIClip is a named UI-design-focused model, matching the field value sought at the designated path. The strongest support comes from statements that directly identify UIClip and describe its capabilities in design assessment and benchmarking; additional excerpts provide context about the model's evaluation scenarios and data. In sum, the field value UIClip is corroborated by multiple excerpts that name the model and describe its UI-design focus and evaluation, confirming its relevance to the queried finegrained field.

- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt

### relevant_datasets_and_benchmarks.5
**Confidence:** high

The most relevant excerpt explicitly states the first large-scale UI screen summarization dataset (Screen2Words) and includes its scope and purpose as a dataset dedicated to UI screen summarization. It provides concrete details about the dataset’s scale (112,085 annotations for 22,417 Android screens) and its role in evaluating UI screen summaries, which directly aligns with the finegrained field value describing Screen2Words as the first large-scale dataset and benchmark for UI screen summarization. The next-highest relevance comes from excerpts that describe Screen2Words in the context of automatic mobile UI summarization and dataset construction, including the notion of automatic summarization and the availability/open-sourcing of the dataset, which supports the same core claim about its purpose and significance. An additional excerpt explicitly mentioning Screen2Words in a general sense and linking it to mobile UI summarization reinforces the alignment. A supporting excerpt discusses related UI summarization datasets and benchmarks, like Rico, to provide context about the UI data landscape but does not directly restate Screen2Words’ specific size or purpose; it still remains relevant as it situates Screen2Words within the broader field of UI datasets.

- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > We collect, analyze, and open-source <sup>2</sup> the first dataset dedicated for UI screen summarization. It contains 112,085 quality human annotations for 22,417 unique Android screens, collected with a carefully designed labeling process and guideline, which achieve a high inter-labeler agreement for both linguistic coherence and on-screen focus area consistency.
  > by B Wang · 2021 · Cited by 242 — To aid the development of Screen2Words, we collected the first large-scale screen summarization dataset, which consists of human annotations for 22,417 Android
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://arxiv.org/abs/2108.03353)
  > by B Wang · 2021 · Cited by 242 — We present Screen2Words, a novel screen summarization approach that automatically encapsulates essential information of a UI screen into a coherent language
- [Screen2Words - OpenDataLab](https://opendatalab.com/OpenDataLab/Screen2Words)
  > The dataset contains more than 112k language summarization across 22k unique UI screens. This dataset can be used for Mobile User Interface Summarization

### key_models_and_frameworks.2.purpose
**Confidence:** high

The finegrained field value describes a CLIP-style model developed to assess how well a UI’s visual appearance aligns with a natural language description and to evaluate design quality. The excerpt stating that UIClip is a computational model that scores UI screenshots based on relevance to a textual description and design quality directly confirms this core function. Another excerpt notes that the model is evaluated on tasks including design quality, suggesting a CLIP-like objective of matching visuals to descriptions and assessing quality. Additional excerpts indicate benchmarking UIClip against other large vision-language models, which aligns with evaluating a CLIP-style model’s grounding and comparative performance. A further excerpt asserts that UIClip outperformed other models, which supports the claim of strong design-critique or relevance-grounding performance. Collectively, these pieces of evidence map cleanly onto the described field value by confirming the model type (CLIP-style), its purpose (assessing design quality and description-visual relevance), and its evaluative performance context.


- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt
  > # UIClip: A Data-driven Model for Assessing User Interface Design

### relevant_datasets_and_benchmarks.4.purpose
**Confidence:** high

The fine-grained field value specifies a scalable, real-world benchmark environment for developing and evaluating multimodal agents that can operate a computer. The first excerpt states that OSWorld benchmarks multimodal agents for open-ended tasks in real computer environments, directly matching the idea of a real-world benchmarking environment. The second excerpt elaborates that OSWorld is a scalable, real computer environment designed for multimodal agents, with features for task setup, execution-based evaluation, and interactivity, which further corroborates the described purpose and underscores its scalability and real-world applicability. Together, these excerpts provide clear, complementary evidence that OSWorld fits the given definition of a scalable benchmark environment for multimodal agents operating computers.

- [xlang-ai/OSWorld: [NeurIPS 2024] ...](https://github.com/xlang-ai/osworld)
  > [NeurIPS 2024] OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments - xlang-ai/OSWorld.
- [OSWorld: Benchmarking Multimodal Agents for Open-Ended ...](https://os-world.github.io/)
  > OSWorld is a first-of-its-kind scalable, real computer environment for multimodal agents, supporting task setup, execution-based evaluation, and interactive

### key_models_and_frameworks.7.key_capabilities
**Confidence:** high

The most directly relevant information is that the Figma REST API exposes file nodes and returns a JSON representation of the nodes referenced by given IDs from a specific file, which is precisely the mechanism that would let a design critique be grounded to exact design layers or element IDs. This confirms that a developer can retrieve the full layer tree, along with properties and text content, enabling critiques to anchor to concrete, identifiable design objects rather than abstract regions. Building on that, discussions about grounding in design tools highlight the importance of observable, reviewable references within the design artifact itself, which aligns with the API’s ability to expose layer trees and element identifiers. Additional sources discuss GUI grounding and UI design grounding models, illustrating how textual critiques can be tied to visual elements or UI components, and how vision-language grounding approaches (e.g., grounding critiques to UI elements or layers) can be realized in practice. Together, these excerpts support the idea that a design-critique workflow can be anchored to exact design objects via an API, with grounding enhanced by additional grounding frameworks and UI-focused models that connect verbal reasoning to specific visual elements or layers. 

- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 

### key_models_and_frameworks.0.name
**Confidence:** high

The field value we are validating is the name of the first item in a nested field, which is asserted to be ScreenAI. The excerpts collectively establish that ScreenAI is a vision-language model tailored for UI and visually-situated understanding, with explicit mentions of UI element information, layout annotations, and spatial reasoning. The clearest support is where it is stated that ScreenAI is a visual language model for UI and infographics, and is associated with tasks like Screen Annotation and identifying UI element information. Other excerpts reinforce the same by describing its fine-tuning on UI-related datasets and achieving state-of-the-art results on UI/infographic tasks, all of which corroborate that the model named in the field value is indeed ScreenAI. Taken together, these excerpts strongly support that the specific field value is ScreenAI and that this is the model being described in this context. 

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas

### key_models_and_frameworks.2.key_capabilities
**Confidence:** high

The target field value asserts that the model excels at scoring user interfaces (UI) for design quality and text-image relevance, outperforming other general-purpose vision-language models, and that this capability provides a supervised signal for training reward models used to generate better design critiques. Excerpt describing a model that scores UI screenshots based on relevance to a textual description and design quality directly supports the claim about scoring quality and relevance. Excerpt detailing the evaluation across tasks that include design quality and design relevance corroborates the model’s strengths in those specific dimensions. Excerpt noting that UIClip outperformed all other models in every task substantiates the claim of competitive or superior performance. Excerpts comparing UIClip to other large vision-language models during benchmarking further support the notion of relative superiority. Excerpt mentioning a large-scale dataset of UI designs and descriptions reinforces the context that such scoring and supervision could be trained from enriched data, aligning with the idea of a supervised signal for reward models. Excerpt including retrieval evaluation context and UIClip’s performance in the UI domain adds corroborative detail about robustness in practical UI analysis. Even though some excerpts primarily provide contextual information (e.g., dataset and evaluation tables), they collectively support the core claims of scoring capability, design quality and relevance assessment, and the potential as a training signal.

- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > 
The results of our retrieval evaluation are shown in Table [1](htt
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.


### key_models_and_frameworks.7.architecture_and_training
**Confidence:** medium

The finegrained field value asserts that the subject is a standard REST API, not a machine learning model. The most relevant excerpt explicitly describes a REST API: it mentions a REST API for Figma file endpoints, including retrieving nodes via an API key and returning a JSON object. This supports the notion that the described system is RESTful and provides data in JSON, which aligns with a standard REST API design rather than a machine learning model. The remaining excerpts discuss GUI grounding, UI design models, and vision-language models, which are unrelated to establishing whether a REST API is being used or whether a model is involved; they do not provide evidence about the REST API nature of the subject. Therefore, the most relevant evidence to the field value is the REST API description, while other excerpts offer contextual information about design and grounding but do not directly support or contradict the REST API claim.

- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .

### key_models_and_frameworks.0.purpose
**Confidence:** high

The most relevant excerpts directly describe ScreenAI as a visual language model designed for user interfaces and visually situated language understanding, which matches the defined field value. For example, an excerpt explicitly labels ScreenAI as a visual language model for UI and infographics, establishing the core identity and domain. Another excerpt notes that ScreenAI is trained on data and tasks that include a Screen Annotation task to identify UI element information such as type, location, and description, supporting the grounding aspect in UI elements. Additional excerpts discuss fine-tuning ScreenAI on UI-related QA, summarization, and navigation tasks, reinforcing its specialized UI focus. Further excerpts mention Screen Annotation enabling layout and spatial understanding capabilities, which aligns with the concept of grounding reasoning in visual regions like UI elements. Collectively, these excerpts corroborate the field value by detailing ScreenAI’s purpose, its UI-centric design, and its capacity for spatially grounded understanding within visual UI contexts.

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas

### relevant_datasets_and_benchmarks.4.platform
**Confidence:** high

The fine-grained field value specifies a platform category of Desktop (Operating System). The first excerpt describes OSWorld as a benchmarking platform for multimodal agents operating in real computer environments, which implies an OS-level desktop environment context suitable for evaluating design-related reasoning and grounding tasks on actual computer systems. The second excerpt further characterizes OSWorld as a scalable, real computer environment that supports task setup and interactive evaluation, reinforcing that OSWorld serves as a platform for desktop-like operating-system experiments and benchmarking. Together, these excerpts directly support the notion of a desktop operating system platform used for benchmarking multimodal, design-oriented reasoning tasks in real computer environments.

- [OSWorld: Benchmarking Multimodal Agents for Open-Ended ...](https://os-world.github.io/)
  > OSWorld is a first-of-its-kind scalable, real computer environment for multimodal agents, supporting task setup, execution-based evaluation, and interactive
- [xlang-ai/OSWorld: [NeurIPS 2024] ...](https://github.com/xlang-ai/osworld)
  > [NeurIPS 2024] OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments - xlang-ai/OSWorld.

### relevant_datasets_and_benchmarks.4.annotation_details
**Confidence:** high

The field value states that evaluation is execution-based, meaning success is determined by the agent’s ability to complete tasks correctly within a live operating system environment. One excerpt describes OSWorld as a real computer environment for multimodal agents and explicitly notes that it supports task setup, execution-based evaluation, and interactive investigation, which directly substantiates the execution-based evaluation concept in a live OS setting. Another excerpt frames OSWorld as a benchmarking platform for multimodal agents in real computer environments, which aligns with the notion of evaluating performance through actual task execution within a system, reinforcing that the evaluation paradigm there is grounded in live execution rather than purely static or simulated metrics. Taken together, the excerpts directly support the idea that the relevant datasets/benchmarks employ execution-based evaluation in real OS environments, and they provide context about how evaluation is conducted in such benchmarks (task setup, live execution, interaction).

- [OSWorld: Benchmarking Multimodal Agents for Open-Ended ...](https://os-world.github.io/)
  > OSWorld is a first-of-its-kind scalable, real computer environment for multimodal agents, supporting task setup, execution-based evaluation, and interactive
- [xlang-ai/OSWorld: [NeurIPS 2024] ...](https://github.com/xlang-ai/osworld)
  > [NeurIPS 2024] OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments - xlang-ai/OSWorld.

### key_models_and_frameworks.7.purpose
**Confidence:** medium

The core evidence directly supporting the value is a description of a REST API that retrieves nodes from a Figma file using a key, effectively enabling programmatic access to data within a Figma design file. The statement ‘REST API … GET file nodes … Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key’ aligns exactly with the concept of an application programming interface that provides programmatic access to Figma data. Additional excerpts discuss related topics in the same design tooling ecosystem—grounding concepts for GUIs, UI element identification, and vision-language models for UI analysis. While these do not claim direct API access to Figma data, they corroborate the broader context of programmatic design tooling and evaluation tasks, which is relevant to understanding how an API could support design reasoning and grounding tasks in Figma files. In summary, the primary excerpt establishes the API capability; the surrounding excerpts contextualize the domain and methods for grounding design reasoning to visual UI elements, which complements the API use case but is secondary to the explicit API access claim.

- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 

### relevant_datasets_and_benchmarks.3.name
**Confidence:** high

The target field is the name of a dataset at a specific path, which corresponds to the Mind2Web entries described in the excerpts. The first excerpt states that Mind2Web is a dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website, directly naming Mind2Web and describing its purpose. The second excerpt reiterates Mind2Web as the first dataset for developing and evaluating generalist agents for the web to follow language instructions for complex tasks, reinforcing the same concept. The third excerpt similarly identifies Mind2Web and mentions its hosting on a repository, again confirming the dataset’s purpose and scope. Collectively, these excerpts provide explicit support for Mind2Web as the dataset referenced by the fine-grained field value, aligning with the path that targets the dataset name within the relevant_datasets_and_benchmarks array.

- [Mind2Web: Towards a Generalist Agent for the Web](https://osu-nlp-group.github.io/Mind2Web/)
  > Mind2Web is a dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website
- [Mind2Web: Towards a Generalist Agent for the Web](https://arxiv.org/html/2306.06070v3)
  > We introduce Mind2Web, the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex
- [Mind2Web: Towards a Generalist Agent for the Web](https://github.com/OSU-NLP-Group/Mind2Web)
  > Mind2Web is the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any

### relevant_datasets_and_benchmarks.0
**Confidence:** medium

The most directly supportive excerpt states that UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design. This aligns exactly with the field’s components describing critiques and localization regions. It also notes the design critique focus, which supports the notion of critiques being tied to UI regions, a core part of the fine-grained field value. The next excerpt identifies that the dataset comprises a large collection of natural language design critiques gathered from designers, reinforcing the idea of expert-generated critique content. While it does not repeat the bounding-box detail, it corroborates the existence and scale of critique data, which is consistent with the field value’s emphasis on rich annotations and the potential for multiple design aspects to be evaluated. A third excerpt discusses a related UI critique dataset and the value of datasets in improving automated design comments generation, which supports the notion that critique-style data is a valuable resource for training models on design evaluation tasks and grounding critiques in UI elements, even though it does not mention UICrit by name or provide bounding-box specifics. Together, these excerpts substantiate the field value’s core claims: existence of a critique-rich UI dataset with bounding boxes for localization and a dataset built from professional designers’ critiques that can inform model training for critique generation and evaluation.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > The dataset will be released to the research community.

### relevant_datasets_and_benchmarks.6.name
**Confidence:** high

The fine-grained field value represents the name of a specific dataset/benchmark. The excerpts collectively describe a dataset named Enrico that focuses on topic modeling for mobile UI designs, which aligns with the field being the dataset name. The presence of the exact naming pattern "Enrico" in multiple excerpts strongly supports that the intended value (case-insensitive match to ENRICO) corresponds to this dataset title. The content mentions human-supervised datasets and validation related to Enrico, reinforcing that this name is the label stored in the field under the datasets/benchmarks category. While the field value is uppercase, the core information—the dataset name—matches the excerpts' references to Enrico. Therefore, the most relevant excerpts directly support that the field value is the Enrico dataset name, and no conflicting information is present in the provided excerpts.

- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/fullHtml/10.1145/3406324.3410710)
  > by LA Leiva · 2020 · Cited by 103 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/10.1145/3406324.3410710)
  > Feb 25, 2021 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A High-quality Dataset for Topic Modeling of Mobile ...](https://userinterfaces.aalto.fi/enrico/)
  > Presents a high-quality dataset of mobile UI designs, categorized according to 20 design topics. Reports validation of computational models for topic

### relevant_datasets_and_benchmarks.6.size_and_scope
**Confidence:** high

The field value specifies a high-quality collection of 1,460 mobile UI designs. The most directly relevant information is that a human-supervised, high-quality dataset comprises 1460 UIs and 20 design topics, which matches the size and quality implied by the field value. Both of these excerpts explicitly describe a high-quality dataset with 1460 mobile UIs, aligning precisely with the requested collection size. A third excerpt also notes a high-quality dataset of mobile UI designs categorized by topics, which corroborates the existence and quality of such a dataset and indirectly supports the size claim through its description of a dataset of mobile UI designs (though it emphasizes topic categorization). Taken together, these excerpts consistently support the notion of a high-quality collection of mobile UI designs around the 1,460-unit scale, with explicit mention of dataset quality and size.

- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/fullHtml/10.1145/3406324.3410710)
  > by LA Leiva · 2020 · Cited by 103 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/10.1145/3406324.3410710)
  > Feb 25, 2021 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A High-quality Dataset for Topic Modeling of Mobile ...](https://userinterfaces.aalto.fi/enrico/)
  > Presents a high-quality dataset of mobile UI designs, categorized according to 20 design topics. Reports validation of computational models for topic

### relevant_datasets_and_benchmarks.6.annotation_details
**Confidence:** high

The claim that each UI screenshot is categorized according to a fixed set of design topics is directly supported by the excerpts describing a dataset built around 20 predefined topics for mobile UI designs. Specifically, the material notes that the dataset contains design topics and that UI designs are associated with these topics, illustrating a structured, topic-based categorization framework. The repeated emphasis on a fixed set of 20 topics (e.g., design topics) and the validation of computational models within that topic structure corroborate the described annotation scheme where each screenshot is labeled with one of these predefined topics. The presence of a high-quality dataset with explicit topic categories further reinforces that this labeling scheme is an intentional design choice of the dataset, aligning with the field value indicating such categorization. Collectively, these excerpts consistently support the existence of a predefined 20-topic taxonomy used to annotate UI screenshots, which is the essence of the finegrained field value.

- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/fullHtml/10.1145/3406324.3410710)
  > by LA Leiva · 2020 · Cited by 103 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A High-quality Dataset for Topic Modeling of Mobile ...](https://userinterfaces.aalto.fi/enrico/)
  > Presents a high-quality dataset of mobile UI designs, categorized according to 20 design topics. Reports validation of computational models for topic
- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/10.1145/3406324.3410710)
  > Feb 25, 2021 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different

### key_models_and_frameworks.0.architecture_and_training
**Confidence:** high

The finegrained field describes the model's architecture and training, specifically noting that ScreenAI is trained on a diverse mix of datasets and tasks and includes a novel Screen Annotation task that requires identifying UI element information (type, location, description). The most supportive excerpts explicitly state that ScreenAI was trained on a mix of datasets and tasks and highlight the Screen Annotation task, which aligns precisely with the described training signals and the focus on UI element grounding. Additional excerpts corroborate this by detailing that ScreenAI is fine-tuned on public QA, summarization, and navigation datasets, reinforcing the idea of a diverse training regimen and task variety. Other excerpts note that Screen Annotation enables evaluation of layout annotations and spatial understanding, further reinforcing the connection to architectures and training signals aimed at grounding design-related reasoning in visual UI elements. Collectively, these excerpts provide direct evidence that ScreenAI's training regime includes the Screen Annotation task and diverse datasets, matching the finegrained field value. The reasoning above connects specific aspects such as the Screen Annotation task, the types of datasets used for fine-tuning (QA, navigation, summarization), and the emphasis on UI element grounding to the requested field value. The supporting content does not contradict the field value and consistently reinforces the described training paradigm. 

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas

### relevant_datasets_and_benchmarks.6.platform
**Confidence:** high

The described platform value is 'Mobile', which corresponds to datasets that specialize in mobile UI designs. The excerpts collectively discuss a dataset focused on mobile UI designs, including a human-supervised, high-quality collection of UIs and associated design topics, and the validation of models on mobile UI design topics. The mention of mobile UIs and the creation/validation of topic models specifically anchored to mobile design tasks directly supports the idea of a mobile platform. One excerpt notes a high-quality dataset of mobile UI designs categorized by 20 topics, illustrating the concrete mobile platform context. The other excerpts reinforce this by detailing the mobile focus and design-topic validation within mobile contexts. Taken together, these excerpts substantiate the field value by explicitly tying the platform to Mobile UI design datasets and benchmarking for mobile contexts.

- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/fullHtml/10.1145/3406324.3410710)
  > by LA Leiva · 2020 · Cited by 103 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/10.1145/3406324.3410710)
  > Feb 25, 2021 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A High-quality Dataset for Topic Modeling of Mobile ...](https://userinterfaces.aalto.fi/enrico/)
  > Presents a high-quality dataset of mobile UI designs, categorized according to 20 design topics. Reports validation of computational models for topic

### relevant_datasets_and_benchmarks.3.annotation_details
**Confidence:** medium

The requested finegrained field value describes a dataset/benchmark that pairs high-level language instructions with corresponding action sequences tied to DOM elements and screenshots, which is exactly the purpose of a grounded instruction-following dataset in a web context. The excerpts collectively mention Mind2Web as a dataset for developing and evaluating generalist web agents that can follow language instructions to complete complex tasks on websites. This alignment indicates that Mind2Web serves as a benchmark for grounding instructions in web actions, which can include interactions with DOM elements and visual representations when mapping instructions to actionable steps. While the excerpts do not explicitly state binding to DOM nodes or screenshots, they establish the core function of the dataset—instruction-driven, web-based task execution—consistent with the concept of grounded instruction following. Therefore, these excerpts collectively support the notion of a dataset/platform providing instruction-action grounding for web agents, albeit with partial explicit references to DOM/screenshot linkage.

- [Mind2Web: Towards a Generalist Agent for the Web](https://osu-nlp-group.github.io/Mind2Web/)
  > Mind2Web is a dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website
- [Mind2Web: Towards a Generalist Agent for the Web](https://arxiv.org/html/2306.06070v3)
  > We introduce Mind2Web, the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex
- [Mind2Web: Towards a Generalist Agent for the Web](https://github.com/OSU-NLP-Group/Mind2Web)
  > Mind2Web is the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any

### relevant_datasets_and_benchmarks.3.purpose
**Confidence:** high

The targeted field value identifies a dataset meant to develop and evaluate generalist web agents capable of following language instructions to complete complex, multi-step tasks on any website. The most direct support comes from excerpts describing Mind2Web as a dataset for developing and evaluating generalist web agents that can follow language instructions to complete complex tasks on any website. The accompanying details in these excerpts affirm that Mind2Web serves as a benchmark/dataset for web-enabled agents, aligning with the field value’s emphasis on generalist, instruction-following, multi-step web tasks. The remaining excerpts reinforce this by explicitly naming Mind2Web and describing its scope and purpose across platforms (web dataset, generalist agents, and web task completion), which corroborates the same core description. Therefore, the cited passages collectively substantiate the field value, with the strongest connections coming from the explicit description of Mind2Web as a dataset for generalist web agents and its task-oriented objective, and supporting context from the other mentions of the Mind2Web project.

- [Mind2Web: Towards a Generalist Agent for the Web](https://arxiv.org/html/2306.06070v3)
  > We introduce Mind2Web, the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex
- [Mind2Web: Towards a Generalist Agent for the Web](https://osu-nlp-group.github.io/Mind2Web/)
  > Mind2Web is a dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website
- [Mind2Web: Towards a Generalist Agent for the Web](https://github.com/OSU-NLP-Group/Mind2Web)
  > Mind2Web is the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any

### key_models_and_frameworks.4.architecture_and_training
**Confidence:** medium

The finegrained field value asserts that SeeClick is identified as a baseline model for GUI grounding and that its performance is compared to newer models like UGround. The first excerpt explicitly discusses SeeClick in the context of automating GUI grounding data curation and adapting UI datasets to obtain grounding data, which supports the idea of SeeClick as a GUI grounding baseline. The second excerpt notes that SeeClick was designed to perform low-level actions by observing interface screenshots, reinforcing its role as a GUI grounding method. Together, these excerpts corroborate that SeeClick is a foundational GUI grounding model within architecture and training discussions and that it is benchmarked against newer approaches, aligning with the mention of a ScreenSpot benchmark and performance comparisons to newer models in the field value. However, the exact benchmark name (ScreenSpot) and the precise claim that newer models outperform SeeClick are not fully elaborated in the excerpts, which is why the evidence supports the baseline/GUI grounding context but not every specific detail of the field value.

- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.

### relevant_datasets_and_benchmarks.9.name
**Confidence:** high

The finegrained field value corresponds to the dataset name MM-GCoT under a benchmarks/datasets structure. An excerpt that states a dataset called multimodal grounded chain-of-thought (MM-GCoT) is introduced and provides its creation details directly supports the field value as the—the recognized dataset name. The first excerpt explicitly names MM-GCoT and situates it as a ground-truth concept for a grounded chain-of-thought in a multimodal setting, aligning directly with the field value for the specified dataset name. The second excerpt reinforces this by stating the construction of a dataset named multimodal grounded chain-of-thought (MM-GCoT) and quantifies its size, providing concrete evidence that MM-GCoT is indeed the dataset in question and clarifying its scope with numbers (24,022 GCoT examples for 5,033 images). Together, these excerpts unambiguously support the presence and identity of MM-GCoT at the target path, with the second excerpt adding corroborating detail that strengthens the match.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.

### relevant_datasets_and_benchmarks.3.size_and_scope
**Confidence:** high

The most directly relevant excerpt states that the dataset is for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website. This explicitly conveys a broad, cross-website scope and the aim to handle complex tasks, which supports the idea of a large-scale dataset designed for diverse websites. The next excerpt reinforces this by describing Mind2Web as the first dataset for developing and evaluating generalist agents for the web, emphasizing its role in broad web tasks, thereby supporting the scale and scope claim. The final excerpt similarly describes Mind2Web as a dataset with capabilities across the web, underscoring its generalist, cross-site orientation, further corroborating the large-scale, diverse-task nature of the dataset. Taken together, these excerpts collectively substantiate that Mind2Web is a large-scale dataset intended to cover complex tasks across a diverse set of websites, aligning with the finegrained field value.

- [Mind2Web: Towards a Generalist Agent for the Web](https://arxiv.org/html/2306.06070v3)
  > We introduce Mind2Web, the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex
- [Mind2Web: Towards a Generalist Agent for the Web](https://osu-nlp-group.github.io/Mind2Web/)
  > Mind2Web is a dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website
- [Mind2Web: Towards a Generalist Agent for the Web](https://github.com/OSU-NLP-Group/Mind2Web)
  > Mind2Web is the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any

### relevant_datasets_and_benchmarks.9.purpose
**Confidence:** medium

The most directly supporting information is a dataset explicitly named multimodal grounded chain-of-thought (MM-GCoT), described as a dataset consisting of over 24k GCoT examples across thousands of images, which directly aligns with a dataset created to train and evaluate Grounded Chain-of-Thought models grounded in visual evidence. The next strongest support comes from a description of a dataset comprising 438k data items related to visual chain-of-thought reasoning, which again points to a large-scale resource intended for grounded, step-by-step reasoning tied to visual inputs. Additional excerpts discuss related concepts (Visual CoT, grounding in visual regions, and multimodal reasoning pipelines) that provide context about the field and related benchmarks but do not claim to be the exact dataset described by the finegrained field value. Together, these excerpts support the existence and purpose of datasets used to train/evaluate GCoT-style models and confirm the emphasis on grounding reasoning in visual evidence.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  >  
  >  
  >  

### key_models_and_frameworks.5.architecture_and_training
**Confidence:** medium

The field value describes an automated pipeline where an LLM infers the function of UI elements by simulating interactions, and includes a validation step to achieve human-level correctness. Content within the excerpts directly aligns with this: chain-of-thought prompting applied to design critique and evaluation demonstrates breaking complex UI reasoning into steps that can be verifiable, which underpins the idea of simulating interactions to reason about UI behavior. Vision-language models focused on UI contexts (ScreenAI) emphasize grounding model outputs in real UI elements, including identifying element types, locations, and descriptions, which provides a concrete mechanism for tying reasoning to specific visual regions and UI components. Papers on UI design evaluation with LVLMs show models scoring relevance to textual descriptions and design quality, highlighting how models assess and critique UI designs, which supports the notion of a verification/quality control layer in automated design reasoning. Collectively, these excerpts establish the feasibility and methodology of LLM-driven, visually grounded, and verifiable UI reasoning pipelines that align with the described AutoGUI-like approach.

- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > ncluding a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen. Thes

### key_models_and_frameworks.2.architecture_and_training
**Confidence:** medium

The field value describes UIClip as a variant of CLIP pretrained in a UI-design context, learning to associate images with text specifically for UI design principles and descriptions. Excerpt describing a computational model that scores UI screenshots based on relevance to a textual description and design quality directly supports the idea of a text-to-image/text-to-design association framework used for UI critique. Excerpts noting that UIClip is a data-driven model for assessing UI design, and that UIClip is benchmarked against other models and evaluated on tasks including design quality and relevance, corroborate its function as an image-text grounding system focused on UI elements. The mention of a large-scale UI design dataset composed of synthetic and human-generated ratings further supports the data-driven, text-image alignment objective central to a CLIP-like approach in this domain. Together, these excerpts substantiate that UIClip exists as a UI-focused, image-text grounding model with evaluative tasks around design quality and relevance and supported by a UI design dataset, even though they do not explicitly state the pretrained dataset name (JitterWeb). This combination aligns with the field value, which asserts UIClip is a UI-design-oriented CLIP variant with image-text association capabilities. The strongest support comes from explicit statements that UIClip is a data-driven model for UI design and that it scores UI screenshots by relevance to textual descriptions, while supplementary support comes from benchmarking, design-quality tasks, and the UI-design dataset description. 

- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt
  > # UIClip: A Data-driven Model for Assessing User Interface Design

### key_models_and_frameworks.0.key_capabilities
**Confidence:** high

The most directly relevant content states that the model performs Screen Annotation by identifying UI element information such as type, location, and description, which directly aligns with the field’s emphasis on element identification and grounded design critique. Additionally, statements that Screen Annotation enables evaluation of layout annotations and spatial understanding reinforce the grounding capability. Claims about the model achieving state-of-the-art results on UI and infographic tasks provide support for the model’s strong UI-grounding performance, which underpins its ability to critique or summarize screens. References describing training on a variety of UI-related datasets, including a Screen Annotation task, further support the claim that the model is designed to identify, locate, and describe UI elements within screens, a core component of grounded design reasoning. Excerpts discussing QA, navigation tasks, and dataset composition provide supplementary context showing how the model handles questions about screens and navigational guidance, which complements the core capabilities of identifying elements and grounding reasoning in visual design artefacts. Overall, the cited statements collectively corroborate the field value’s core components: UI element identification with location and description, grounding/ spatial understanding of design elements, and the ability to critique or reason about screen content with referential grounding.

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.

### relevant_datasets_and_benchmarks.3.platform
**Confidence:** high

The field value indicates the platform should be the Web. All three excerpts describe Mind2Web as a dataset or benchmark specifically for developing and evaluating generalist agents for the web, i.e., the Web is the intended platform for these benchmarks. The first excerpt notes Mind2Web as a dataset for agents that can follow language instructions to perform tasks on any website, which inherently places the platform in the web domain. The second excerpt reiterates Mind2Web as the first dataset for developing and evaluating generalist agents for the web, reinforcing the same platform association. The third excerpt describes Mind2Web hosted on a repository and frames it as a dataset for tasks on the web, again confirming the Web platform context. Collectively, these excerpts establish that Mind2Web and its benchmarking focus are inherently about web-based tasks and environments, aligning with the requested field value of the Web.

- [Mind2Web: Towards a Generalist Agent for the Web](https://osu-nlp-group.github.io/Mind2Web/)
  > Mind2Web is a dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any website
- [Mind2Web: Towards a Generalist Agent for the Web](https://arxiv.org/html/2306.06070v3)
  > We introduce Mind2Web, the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex
- [Mind2Web: Towards a Generalist Agent for the Web](https://github.com/OSU-NLP-Group/Mind2Web)
  > Mind2Web is the first dataset for developing and evaluating generalist agents for the web that can follow language instructions to complete complex tasks on any

### key_models_and_frameworks.5.purpose
**Confidence:** high

Direct support for the target field comes from mentions of a Screen Annotation task that requires models to identify UI element information (type, location and description) on a screen. This directly maps to automatically annotating UI elements with detailed descriptions of their functionality. Related items discuss vision-language models and UI grounding/annotation capabilities (ScreenAI and UI-focused papers) that align with scalable, automated annotation pipelines for UI artifacts. SeeScreenAI discussions emphasize identifying UI element information and grounding textual reasoning in UI components, which strongly supports the existence and design of an automated annotation pipeline for UI elements. Additional entries discuss GUI grounding and UI design evaluation models, which provide contextual support for systems that automatically relate textual descriptions to visual UI regions, reinforcing the feasibility and design space for such a pipeline. Some entries cover broader UI-grounding and design critique capabilities rather than explicit automated element-wise description pipelines, offering contextual support for how such a pipeline would function within multimodal models. Overall, the strongest, direct evidence is the explicit Screen Annotation task requiring identification of UI element type, location, and description; supporting evidence from related UI-grounding and design evaluation work provides complementary validation for scalable, automated annotation of UI elements with functional descriptions.

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > ncluding a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen. Thes
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > 
The results of our retrieval evaluation are shown in Table [1](htt
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .

### relevant_datasets_and_benchmarks.6.purpose
**Confidence:** high

The field value refers to a dataset that provides topic-level supervision for mobile UI designs, intended to aid training models to classify design principles or issues. The excerpts collectively describe such a dataset (Enrico) focused on topic modeling for mobile UI designs, explicitly noting features like human supervision, a finite set of design topics (20 topics), and the dataset serving as a validation or training resource for computational models tackling design classification or topic analysis. The first excerpt emphasizes a human-supervised, high-quality dataset with 1460 UIs and 20 design topics, which directly supports the notion of topic-level supervision. The second excerpt reinforces this by reiterating the human-supervised nature and the topic count. The third excerpt describes a high-quality dataset categorized by the same 20 design topics and highlights its use for validating computational models, which further solidifies the intended use case of training models to classify design principles or issues. Taken together, these excerpts consistently support the existence and purpose of a topic-level supervision dataset for mobile UI designs, aligning with the field value.

- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/fullHtml/10.1145/3406324.3410710)
  > by LA Leiva · 2020 · Cited by 103 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A Dataset for Topic Modeling of Mobile UI Designs](https://dl.acm.org/doi/10.1145/3406324.3410710)
  > Feb 25, 2021 — A human-supervised high-quality dataset comprising 1460 UIs and 20 design topics. As a validation example, we train a deep learning model for three different
- [Enrico: A High-quality Dataset for Topic Modeling of Mobile ...](https://userinterfaces.aalto.fi/enrico/)
  > Presents a high-quality dataset of mobile UI designs, categorized according to 20 design topics. Reports validation of computational models for topic

### relevant_datasets_and_benchmarks.9.platform
**Confidence:** high

The field value characterizes general visual reasoning capabilities in design critique contexts. Excerpts that introduce and describe grounded or visual chain-of-thought (Grounded GCoT, Visual CoT) directly address how language models reason about or justify conclusions using visual evidence. They discuss multimodal datasets and benchmarks created to enable visual grounding, bounding-box or region-focused reasoning, and attention to specific visual elements, all of which underpin a general visual reasoning capability. Consequently, excerpts describing the Grounded Chain-of-Thought approach, the MM-GCoT dataset, and the Visual CoT work provide direct support by illustrating methodologies, datasets, and evaluation paradigms for grounding reasoning in visual design artifacts. Parts that mention specific datasets and visual-regions alignment further reinforce the idea of grounding textual reasoning in visual design components, which aligns with a general visual capability rather than any single narrow instance.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  >  
  >  
  >  

### relevant_datasets_and_benchmarks.2.annotation_details
**Confidence:** high

The field value specifies a dataset characteristic: each item is composed of a single-step natural language instruction and the precise ground-truth bounding box for a UI element. Excerpts that explicitly reference GUI grounding benchmarks and ground-truth annotations align with this concept. The first excerpt mentions a GUI grounding benchmark (ScreenSpot) comprising instructions across multiple platforms, which closely matches the notion of per-item instructions tied to UI elements. The fourth excerpt also references ScreenSpot in the context of GUI grounding, reinforcing the idea of ground-truth localization for UI components. The second excerpt discusses universal visual grounding for GUI agents and notes grounding accuracy on ScreenSpot with planner-generated resolution expressions, which further supports the idea of per-item grounding data and evaluation. The third excerpt mentions ScreenSpot again, underscoring its role in GUI grounding tasks. Collectively, these excerpts corroborate the existence and characteristics of datasets where each item pairs a single-step instruction with a corresponding UI element bounding box, even though the exact phrasing in the field value is not verbatim in any single excerpt.


- [The model, data and code for the visual GUI Agent SeeClick](https://github.com/njucckevin/SeeClick)
  > ScreenSpot is an evaluation benchmark for GUI grounding, comprising over 1200 instructions from iOS, Android, macOS, Windows and Web environments,
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > ScreenSpot
  > Table 3: Grounding accuracy on ScreenSpot (Agent Setting) with planner-generated REs.
  > UGround

### relevant_datasets_and_benchmarks.7.annotation_details
**Confidence:** high

The fine-grained field value asserts that each UI element has a detailed functionality description, generated and verified by LLMs to ensure human-level correctness. Excerpt describing automatic UI element annotation with detailed functionality descriptions at scale directly confirms that systems exist to produce such detailed functionality descriptions. It also notes LLM-aided rejection and verification to improve annotation quality, which supports the claim that the process includes verification by LLMs to achieve high correctness. Excerpt describing the AutoGUI-704k dataset emphasizes the presence of detailed functionality annotations across many elements in diverse contexts, reinforcing the notion of comprehensive element-level functionality descriptions. Excerpt noting that these annotations are generated and annotated at scale further supports the existence and feasibility of such a workflow. Additionally, mention of extensive experimental results demonstrating UI grounding improvements and the role of annotated functionality descriptions aligns with the claim that these annotations are valuable and systematically produced.Overall, the cited passages align with the idea that UI elements are described by detailed, LL-generated functionality descriptions that are produced and validated as part of a scalable annotation pipeline.

- [AutoGUI: Scaling GUI Grounding with Automatic ...](https://openreview.net/forum?id=wl4c9jvcyY)
  > AutoGUI: Scaling GUI Grounding with Automatic Functionality Annotations from LLMs
## Hongxin Li , Jingran Su , Jingfan CHEN , Yuntao Chen , Qing Li , Zhaoxiang Zhang
**Abstract:** User interface understanding with vision-language models has received much attention due to its potential for enabling next-generation software automation. However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale. Specifically, we leverage large language models (LLMs) to infer element functionality by comparing the UI content changes before and after simulated interactions with specific UI elements. To improve annotation quality, we propose LLM-aided rejection and verification, eliminating invalid and incorrect annotations without human labor. We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets. Human evaluation shows that the **AutoGUI** pipeline achieves annotation correctness comparable to trained human annotators. Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale.
  > We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets.
  > Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.

### key_models_and_frameworks.5.key_capabilities
**Confidence:** high

The most relevant material directly discusses vision-language models tailored to UI grounding and the ability to identify and annotate UI elements or grounding regions. For example, the discussion of ScreenAI as a visual language model for UI and visually situated language understanding, including a Screen Annotation task that requires identifying UI element information such as type, location, and description on a screen, directly aligns with the concept of grounding textual reasoning in specific UI regions. This shows a concrete mechanism by which grounding is achieved and evaluated, which supports the claim that a dedicated dataset for UI grounding can enhance model capabilities when used to fine-tune VLMs. Additionally, materials describing UIClip as a data-driven model for assessing UI design—scoring relevance to textual descriptions and design quality, and benchmarking against other LVLMs on UI-related tasks—underscore the value of data-driven grounding in UI contexts and the role of task-focused evaluation in improving grounding performance. SeeClick-related work on GUI grounding data curation and adapting mobile UI datasets to obtain grounding data also reinforces the idea that curated grounding data is central to improving model grounding in real-world interfaces. Together, these excerpts illustrate that specialized UI-grounding datasets and task-centric training/evaluation strategies can plausibly enhance UI grounding capabilities in VLMs, which is the practical analogue of what an AutoGUI-704k dataset would aim to achieve as a training signal for improved grounding. There is additional support from broader UI-grounding research (e.g., design-focused UI evaluation and grounding datasets) that complements and contextualizes the core idea. In sum, the excerpts converge on a narrative that curated UI-grounding data and grounding-oriented tasks improve model grounding in UI contexts, which is consistent with the proposed benefit of the AutoGUI-704k dataset for fine-tuning VLMs to achieve stronger UI grounding.

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  > The results showed that UIClip outperformed all other models in every task, despite being smaller in size.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > 
The results of our retrieval evaluation are shown in Table [1](htt
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [Endpoints | Developer Docs](https://developers.figma.com/docs/rest-api/file-endpoints/)
  > REST API ... GET file nodes​. Returns the nodes referenced to by :ids as a JSON object. The nodes are retrieved from the Figma file referenced to by :key .

### relevant_datasets_and_benchmarks.7.size_and_scope
**Confidence:** high

The target field value asserts that the dataset contains 704,000 annotations for UI elements. Excerpt about constructing an AutoGUI-704k dataset explicitly names the dataset and describes its characterization, including multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations, which together imply a very large-scale annotation effort consistent with the stated size. Another excerpt confirms the existence and utility of the AutoGUI-704k dataset and notes that it enhances VLM UI grounding capabilities, reinforcing both the dataset's scale and its purpose. A third excerpt also mentions the AutoGUI-704k dataset and its annotation content, further supporting the notion of a large-scale annotated dataset. A fourth excerpt references AutoGUI generally and describes the pipeline and annotation approach but does not explicitly confirm the 704k annotation count, making it the least directly aligned with the exact field value. Collectively, the first three excerpts provide clear support for the 704,000-annotation claim, while the last excerpt provides contextual relevance without confirming the specific size.

- [AutoGUI: Scaling GUI Grounding with Automatic ...](https://openreview.net/forum?id=wl4c9jvcyY)
  > We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets.
  > AutoGUI: Scaling GUI Grounding with Automatic Functionality Annotations from LLMs
## Hongxin Li , Jingran Su , Jingfan CHEN , Yuntao Chen , Qing Li , Zhaoxiang Zhang
**Abstract:** User interface understanding with vision-language models has received much attention due to its potential for enabling next-generation software automation. However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale. Specifically, we leverage large language models (LLMs) to infer element functionality by comparing the UI content changes before and after simulated interactions with specific UI elements. To improve annotation quality, we propose LLM-aided rejection and verification, eliminating invalid and incorrect annotations without human labor. We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets. Human evaluation shows that the **AutoGUI** pipeline achieves annotation correctness comparable to trained human annotators. Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale.

### relevant_datasets_and_benchmarks.10.purpose
**Confidence:** high

The target field describes a large-scale dataset designed to train models to produce interpretable, step-by-step visual reasoning (Visual Chain-of-Thought). Excerpts that explicitly discuss a large visual CoT dataset, datasets annotated with step-by-step reasoning, or benchmarks for grounding or visual reasoning in multimodal models directly address this field value. The most direct support comes from the mention of a visual chain-of-thought dataset comprising hundreds of thousands of items, which aligns with the notion of a large-scale, interpretable visual reasoning dataset. Related items describe additional datasets or benchmarks in the same space (e.g., a multimodal grounded chain-of-thought dataset and grounded CoT concepts), further substantiating the existence and scope of such data resources. Some excerpts also describe pipelines or benchmarks that emphasize interpretable thoughts and local visual region grounding, which corroborate the idea of a dataset designed to train models to produce verifiable, step-by-step design or visual reasoning, as described in the target field value. Collectively, these excerpts support the notion of large-scale, annotated datasets for visual chain-of-thought and related ground-truth reasoning steps, which is the essence of the finegrained field value, and thus are highly relevant to it.

- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-

### relevant_datasets_and_benchmarks.10.name
**Confidence:** high

The field value is the name of a specific multimodal dataset. Excerpts that explicitly mention the Visual CoT dataset and describe its characteristics directly support this field value. For example, statements describing a Visual CoT dataset with hundreds of thousands of items, annotated with intermediate bounding boxes or reasoning steps, establish the existence and scope of the dataset as the object of interest. Related excerpts that discuss grounded chain-of-thought tasks or benchmarks are relevant context and help corroborate the broader research area, but they do not name the dataset as clearly or provide core attributes as directly as the excerpts that explicitly reference Visual CoT as a dataset. Therefore, the most relevant pieces are those that explicitly name Visual CoT and describe its data composition and multimodal reasoning annotations, while the rest provide supportive context about the associated research Landscape or related datasets/benchmarks.

- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  >  
  >  
  >  
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.

### relevant_datasets_and_benchmarks.2.name
**Confidence:** high

The field value identifies ScreenSpot as the dataset/benchmark of interest for GUI grounding in visual design contexts. The most directly supportive excerpt explicitly states that ScreenSpot is an evaluation benchmark for GUI grounding and lists multiple operating systems and environments, confirming ScreenSpot’s role as a GUI-grounding benchmark dataset. Another excerpt reinforces this by naming ScreenSpot in the context of grounding performance results. A third excerpt likewise references ScreenSpot when discussing grounding accuracy on that benchmark, underscoring its function as a standard assessment dataset for GUI grounding tasks. A fourth excerpt mentions a related GUI grounding dataset (UGround) but does not center ScreenSpot, making it a less direct source of support for the specific field value. Together, these excerpts corroborate that ScreenSpot is used as a GUI grounding benchmark and is a named benchmark within the relevant literature, which directly supports the finegrained field value identifying ScreenSpot as the benchmark name.

- [The model, data and code for the visual GUI Agent SeeClick](https://github.com/njucckevin/SeeClick)
  > ScreenSpot is an evaluation benchmark for GUI grounding, comprising over 1200 instructions from iOS, Android, macOS, Windows and Web environments,
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > ScreenSpot
  > Table 3: Grounding accuracy on ScreenSpot (Agent Setting) with planner-generated REs.
  > UGround

### relevant_datasets_and_benchmarks.10.annotation_details
**Confidence:** high

The target field asserts that annotations include intermediate bounding boxes that pinpoint visual regions relevant to each reasoning step. Excerpts describing Visual CoT explicitly mention intermediate bounding boxes highlighting key regions essential for answering questions, and a substantial portion notes that reasoning steps are annotated and that there exists a dataset with visual bounding-box annotations tied to the reasoning process. This directly supports the notion of step-wise reasoning tied to spatial regions. Additional related works introduce the idea of grounded or multimodal chain-of-thought, including datasets specifically built for grounding reasoning in visual content (MM-GCoT) and papers proposing grounded chain-of-thought approaches, which reinforce the core idea of linking textual reasoning steps to concrete visual regions. Collectively, these excerpts corroborate the existence of datasets and benchmarks where annotations (including bounding boxes) connect intermediate reasoning to visual elements, matching the described field value.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.

### relevant_datasets_and_benchmarks.2.purpose
**Confidence:** high

The field value describes a comprehensive evaluation benchmark for GUI grounding across many platforms and environments. The most relevant passages explicitly identify ScreenSpot as an evaluation benchmark for GUI grounding and cite its multi-platform scope (iOS, Android, macOS, Windows, Web). Additionally, explicit mentions of grounding accuracy results on ScreenSpot further corroborate that it is a broad, evaluation-focused benchmark used to assess GUI grounding models. An adjacent excerpt mentions a universal visual grounding framework for GUI agents and a related benchmark-centered work; while it supports the domain of GUI grounding, it does not directly define the benchmark in question, so it is somewhat less central to the exact field value. Overall, the excerpts collectively confirm the existence of ScreenSpot as a wide-ranging GUI grounding benchmark, matching the described field value about a comprehensive evaluation benchmark across platforms and environments.

- [The model, data and code for the visual GUI Agent SeeClick](https://github.com/njucckevin/SeeClick)
  > ScreenSpot is an evaluation benchmark for GUI grounding, comprising over 1200 instructions from iOS, Android, macOS, Windows and Web environments,
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > Table 3: Grounding accuracy on ScreenSpot (Agent Setting) with planner-generated REs.
  > ScreenSpot
  > UGround

### relevant_datasets_and_benchmarks.7.name
**Confidence:** high

The specific field value AutoGUI-704k corresponds to a dataset name mentioned in the excerpts. The most directly supportive excerpt states that an AutoGUI-704k dataset is constructed using the proposed pipeline, featuring multi-resolution, multi-device screenshots and diverse data domains, with detailed functionality annotations, and that the dataset yields annotation quality comparable to trained humans. This directly confirms the existence of the AutoGUI-704k dataset and its purpose in scaling UI grounding capabilities. Another excerpt explicitly references the AutoGUI-704k dataset and notes that it remarkably enhances VLM’s UI grounding capabilities and outperforms other data types, establishing the dataset’s impact on grounding performance. A third excerpt also mentions constructing the AutoGUI-704k dataset and its characteristics, reinforcing its role and scope. Taken together, these excerpts directly support the field value by confirming the dataset name, its composition, and its effect on vision-language grounding in UI contexts.

- [AutoGUI: Scaling GUI Grounding with Automatic ...](https://openreview.net/forum?id=wl4c9jvcyY)
  > AutoGUI: Scaling GUI Grounding with Automatic Functionality Annotations from LLMs
## Hongxin Li , Jingran Su , Jingfan CHEN , Yuntao Chen , Qing Li , Zhaoxiang Zhang
**Abstract:** User interface understanding with vision-language models has received much attention due to its potential for enabling next-generation software automation. However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale. Specifically, we leverage large language models (LLMs) to infer element functionality by comparing the UI content changes before and after simulated interactions with specific UI elements. To improve annotation quality, we propose LLM-aided rejection and verification, eliminating invalid and incorrect annotations without human labor. We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets. Human evaluation shows that the **AutoGUI** pipeline achieves annotation correctness comparable to trained human annotators. Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets.

### relevant_datasets_and_benchmarks.7.platform
**Confidence:** high

The most relevant excerpt describes a complete pipeline (AutoGUI) for scaling GUI grounding with automatic functionality annotations for UI elements, including how LLMs infer element functionality by comparing UI content changes, and how the pipeline uses verification to improve annotation quality. This directly supports a general UI grounding and design reasoning context, making it highly relevant to a UI (General) field. The next piece highlights an explicit claim that AutoGUI-derived data enhances visual-language grounding capabilities and demonstrates scaling effects, which reinforces the UI-grounding relevance but focuses more on results rather than the conceptual grounding mechanism itself. A third excerpt discusses constructing a large AutoGUI-704k dataset with multi-resolution, multi-device UI scenes and detailed functionality annotations, further anchoring the UI datasets/benchmarks angle for general UI reasoning tasks. The fourth excerpt notes the limitations of existing UI datasets and positions AutoGUI as a pipeline for automatic, scalable UI element annotation, which provides context about the problem space and the proposed solution but is somewhat more contextual than the direct pipeline description. Collectively, these excerpts map well to the concept of UI grounding and design-oriented critique within a dataset/benchmark framework, supporting the UI (General) field value.

- [AutoGUI: Scaling GUI Grounding with Automatic ...](https://openreview.net/forum?id=wl4c9jvcyY)
  > AutoGUI: Scaling GUI Grounding with Automatic Functionality Annotations from LLMs
## Hongxin Li , Jingran Su , Jingfan CHEN , Yuntao Chen , Qing Li , Zhaoxiang Zhang
**Abstract:** User interface understanding with vision-language models has received much attention due to its potential for enabling next-generation software automation. However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale. Specifically, we leverage large language models (LLMs) to infer element functionality by comparing the UI content changes before and after simulated interactions with specific UI elements. To improve annotation quality, we propose LLM-aided rejection and verification, eliminating invalid and incorrect annotations without human labor. We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets. Human evaluation shows that the **AutoGUI** pipeline achieves annotation correctness comparable to trained human annotators. Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale.
  > Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets.

### relevant_datasets_and_benchmarks.7.purpose
**Confidence:** high

The most relevant information directly supports the stated purpose: the work introduces AutoGUI as a pipeline and dataset for automatically annotating UI elements with detailed functionality descriptions, aiming to enhance UI grounding capabilities for vision-language models. The excerpt explicitly describes constructing a large-scale dataset (AutoGUI-704k) with multi-resolution, multi-device data and detailed functionality annotations, which aligns with the goal of providing functionality-focused annotations to improve VLM grounding. A second highly relevant point is the description of the dataset construction process, including the scale and diverse data domains, which reinforces the intent to create a large-scale resource for this purpose. A third piece highlights the overall pipeline for automatic annotation and verification, emphasizing how LLMs contribute to high-quality functional descriptions without manual labor, further supporting the dataset’s purpose. A fourth excerpt, while focusing on results and evaluation, still corroborates the dataset’s impact on UI grounding capabilities and the importance of the annotated data for training and evaluation of VLMs in grounding UI elements and functionality. Together, these excerpts substantiate the claim that the dataset exists to enhance UI grounding capabilities of VLMs via functionality-focused annotations.

- [AutoGUI: Scaling GUI Grounding with Automatic ...](https://openreview.net/forum?id=wl4c9jvcyY)
  > AutoGUI: Scaling GUI Grounding with Automatic Functionality Annotations from LLMs
## Hongxin Li , Jingran Su , Jingfan CHEN , Yuntao Chen , Qing Li , Zhaoxiang Zhang
**Abstract:** User interface understanding with vision-language models has received much attention due to its potential for enabling next-generation software automation. However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale. Specifically, we leverage large language models (LLMs) to infer element functionality by comparing the UI content changes before and after simulated interactions with specific UI elements. To improve annotation quality, we propose LLM-aided rejection and verification, eliminating invalid and incorrect annotations without human labor. We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets. Human evaluation shows that the **AutoGUI** pipeline achieves annotation correctness comparable to trained human annotators. Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.
  > We construct an **AutoGUI-704k** dataset using the proposed pipeline, featuring multi-resolution, multi-device screenshots, diverse data domains, and detailed functionality annotations that have never been provided by previous datasets.
  > However, existing UI datasets either only provide large-scale context-free element annotations or contextualized functional descriptions for elements at a much smaller scale. In this work, we propose the **AutoGUI** pipeline for automatically annotating UI elements with detailed functionality descriptions at scale.
  > Extensive experimental results show that our **AutoGUI-704k** dataset remarkably enhances VLM's UI grounding capabilities, exhibits significant scaling effects, and outperforms existing web pre-training data types.

### key_models_and_frameworks.6.key_capabilities
**Confidence:** medium

The most relevant excerpts discuss modeling and evaluation of UI design with data-driven grounding and design critique tasks. Specifically, one excerpt presents a data-driven model for assessing UI design, including design quality and improvement suggestions, which maps to the idea of structuring critique around verifiable, inspectable aspects of a design. Another excerpt describes UI grounding for automated curation of visual data and adapting UI datasets to obtain grounding data, which aligns with tying reasoning to concrete visual elements and potentially bounding regions or design elements. The third excerpt also relates to UI design assessment and grounding, reinforcing the connection between verbal critique and visual design grounding. While none of the excerpts mention a specific programmatic verifier like Axe-core or an accessibility-checking tool, they collectively support the notion of making design critiques more objective and tied to verifiable visual grounding, which conceptually supports integrating a verifier in a reasoning system. Given the explicit mention of grounding, design assessment, and critique tasks, these excerpts provide partial, indirect support for the field value, with the strongest relevance from the UI design assessment and grounding-focused pieces and slightly less relevance from the general grounding data curation piece.

- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  > ## 1. Introduction
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick

### relevant_datasets_and_benchmarks.2.platform
**Confidence:** high

The finegrained field value specifies a cross-platform set of platforms (iOS, Android, macOS, Windows, Web). Excerpt 0 directly says that ScreenSpot is an evaluation benchmark for GUI grounding and explicitly lists iOS, Android, macOS, Windows and Web environments, which exactly matches the cross-platform scope described. The other excerpts discuss GUI grounding and universal grounding in general but do not enumerate or tie the platforms to a cross-platform benchmark in the same explicit way. Therefore, excerpt 0 provides direct support for the field value, while the others provide contextual but not platform-specific confirmation. 

- [The model, data and code for the visual GUI Agent SeeClick](https://github.com/njucckevin/SeeClick)
  > ScreenSpot is an evaluation benchmark for GUI grounding, comprising over 1200 instructions from iOS, Android, macOS, Windows and Web environments,

### relevant_datasets_and_benchmarks.1.name
**Confidence:** high

The finegrained field value is the dataset name within a nested structure about datasets and benchmarks. The most relevant excerpt directly states that the work collects the largest GUI visual grounding dataset and explicitly names the dataset as UGround, including quantitative detail (10M GUI elements) and source context. The next excerpt explicitly references the work Universal Visual Grounding for GUI Agents and labels UGround as part of that project, effectively confirming the dataset name within a broader publication context. Together, these excerpts directly support the claim that the dataset name is UGround and provide corroborating context about its role and branding in GUI visual grounding research.

- [UGround Homepage](https://osu-nlp-group.github.io/UGround/)
  > We collect the largest dataset for GUI visual grounding so far, containing 10M GUI elements (~95% from web) and their referring expressions over 1.3M
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > UGround (Ours)

### relevant_datasets_and_benchmarks.9.size_and_scope
**Confidence:** medium

The key claim to support is that a dataset of grounded reasoning chains contains exactly 24,022 examples. The most directly supportive excerpt states that a dataset called multimodal grounded chain-of-thought (MM-GCoT) consists of 24,022 GCoT examples for 5,033 images, which directly matches the finegrained field value. Additional excerpts describe related datasets and numbers (such as a 438k-item Visual CoT dataset and about 98k annotated reasoning steps or pairs). These provide corroborating context about the field (grounded chain-of-thought in multimodal settings and the scale of these datasets) but do not repeat the exact figure as precisely. Together, they reinforce the interpretation that the field value refers to a dataset scale for grounded reasoning chains, with the most critical validation coming from the explicit 24,022 figure, and the rest offering supporting context about comparable datasets and broader scales in the same research area.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  >  
  >  
  >  

### relevant_datasets_and_benchmarks.1.platform
**Confidence:** high

The finegrained field value specifies the platform as Web with 95% of the data. The first excerpt directly states that the GUI grounding dataset contains 10M GUI elements and that 95% of the data is from the web, which precisely supports the requested platform and share. The second excerpt identifies UGround and frames it as a universal visual grounding project for GUI agents, which corroborates the context of GUI-grounding datasets that are web-derived and reinforce the notion of a web-centric data platform. Together, these excerpts substantiate the claim about the data platform and its data composition, with the first excerpt providing direct support for the 95% web share and the second excerpt offering contextual relevance to GUI grounding datasets.

- [UGround Homepage](https://osu-nlp-group.github.io/UGround/)
  > We collect the largest dataset for GUI visual grounding so far, containing 10M GUI elements (~95% from web) and their referring expressions over 1.3M
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > UGround (Ours)

### relevant_datasets_and_benchmarks.9.annotation_details
**Confidence:** high

The field value requires that each example’s step-by-step rationale be explicitly linked to grounding coordinates in the image. Excerpt describing a Visual CoT setup notes an annotated dataset where intermediate bounding boxes highlight key regions essential for answering questions, which directly demonstrates stepwise reasoning tied to specific visual regions. Another excerpt states that there are 98k pairs annotated with detailed reasoning steps, indicating explicit, structured reasoning accompanying the data. A further excerpt mentions a visual chain-of-thought dataset with many items dedicated to multi-modal models exhibiting visual chain-of-thought reasoning, aligning with stepwise, grounded justification. Additional references to grounded chain-of-thought for multimodal inputs, and pipelines that focus processing toward visual inputs with interpretable thoughts, reinforce the idea of grounding textual reasoning in visual coordinates. Other items describe datasets built to enable grounding and evaluation of region-specific grounding, further substantiating the existence and framing of the requested field value. Collectively, these excerpts map directly to the concept of step-by-step, bounding-box-grounded reasoning within multimodal design evaluation contexts, supporting the presence and structure of the requested field value. 

- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.

### relevant_datasets_and_benchmarks.1.size_and_scope
**Confidence:** high

The most relevant excerpt explicitly states that the dataset is the largest for GUI visual grounding and quantifies it as containing 10 million GUI elements and their referring expressions, with the elements sourced from around 1.3 million screenshots. This directly corroborates the field value describing the dataset size and composition. A secondary excerpt references the same system (UGround) and its role in universal visual grounding for GUI agents, which provides contextual support that this dataset is used for GUI grounding tasks and may be the same large-scale resource described in the field value. Together, these excerpts support the claim about a massive GUI visual grounding dataset with millions of elements and corresponding referring expressions, sourced from a large set of screenshots. The strongest support comes from the explicit numeric claim, while the secondary excerpt reinforces the context and provenance (UGround project).

- [UGround Homepage](https://osu-nlp-group.github.io/UGround/)
  > We collect the largest dataset for GUI visual grounding so far, containing 10M GUI elements (~95% from web) and their referring expressions over 1.3M
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > UGround (Ours)

### relevant_datasets_and_benchmarks.2.size_and_scope
**Confidence:** high

The target field value states that the benchmark comprises over 1,200 instructions covering five different environments. The most directly supportive excerpt explicitly says that ScreenSpot is an evaluation benchmark for GUI grounding and includes over 1,200 instructions from iOS, Android, macOS, Windows and Web environments, which precisely matches the claimed size and the five-environment scope. Additional excerpts reinforce the relevance by identifying ScreenSpot as a grounding benchmark and mentioning related work (e.g., universal visual grounding for GUI agents and related grounding research), thereby corroborating the benchmark’s role and its multi-environment coverage, even if they do not repeat the exact numerical figure. Collectively, these excerpts confirm both the existence of a GUI-grounding benchmark named ScreenSpot and its scale across multiple platforms, aligning with the described finegrained field value.

- [The model, data and code for the visual GUI Agent SeeClick](https://github.com/njucckevin/SeeClick)
  > ScreenSpot is an evaluation benchmark for GUI grounding, comprising over 1200 instructions from iOS, Android, macOS, Windows and Web environments,
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > Table 3: Grounding accuracy on ScreenSpot (Agent Setting) with planner-generated REs.
  > ScreenSpot
  > UGround

### relevant_datasets_and_benchmarks.10.platform
**Confidence:** high

The strongest support comes from pieces that explicitly frame grounded, multimodal chain-of-thought and visual grounding tasks, which directly map to a broad visual platform that supports reasoning about images and design elements. For example, discussions of a multimodal grounded chain-of-thought dataset and the idea of grounding reasoning in visual content indicate a platform designed for general visual reasoning and critique. Similarly, references to a visual chain-of-thought dataset with intermediate bounding boxes and regions highlight a visual-centric evaluation environment. Additional excerpts describe a comprehensive Visual CoT dataset with numerous items and a pipeline that focuses on visual inputs and interpretable thoughts, further reinforcing the notion of a general-purpose visual platform. Other excerpts that mention a benchmark for local region identification or grounding tasks support the idea that the platform covers visual regions, which is characteristic of a general visual reasoning platform used for design-related tasks. Taken together, these excerpts collectively validate that a General Visual platform exists for visual grounding, multimodal reasoning, and stepwise design critique, rather than being limited to a narrowly scoped task.

- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
  > the related benchmark to evaluate the MLLMs in scenarios requiring specific local region identification.
  >  we propose a multi-turn processing pipeline that dynamically focuses on visual inputs and provides interpretable thoughts. We 
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  >  
  >  
  >  

### relevant_datasets_and_benchmarks.10.size_and_scope
**Confidence:** high

The target field describes a dataset with a total size of 438,000 QA-style items and a subset (approximately 98,000) that includes detailed, step-by-step reasoning chains. The most direct support comes from excerpts that explicitly state these figures: one excerpt describes a visual chain-of-thought dataset comprising 438k data items, and another notes that about 98k pairs are annotated with detailed reasoning steps. A third excerpt corroborates the 438k figure and adds that the dataset includes question-answer pairs with intermediate bounding boxes, which reinforces the scale and multimodal nature of the dataset. Additional excerpts introduce the broader concept of grounded chain-of-thought datasets in multimodal contexts, providing methodological context that strengthens the relevance of the field to the asked value. Taken together, these excerpts strongly support the stated size (438k total items) and the subset with reasoning chains (~98k), while also situating the claim within multimodal CoT research. Given the explicit numerical claims and clear alignment with the described field, confidence is high.


- [Visual CoT: Advancing Multi-Modal Language Models with ...](https://neurips.cc/virtual/2024/poster/97623)
  > We present a visual chain-of-thought dataset comprising 438k data items ... multi-modal large language models with visual chain-of-thought reasoning.
  > Additionally, about 98k pairs of them are annotated with detailed reasoning steps.
  > e Visual CoT dataset comprising 438k question-answer pairs, annotated with intermediate bounding boxes highlighting key regions essential for answering the questions. A
- [[2503.12799] Grounded Chain-of-Thought for Multimodal ...](https://arxiv.org/abs/2503.12799)
  > by Q Wu · 2025 · Cited by 34 — In this paper, we study this problem from the perspective of visual-spatial reasoning, and propose a new learning task for MLLMs, termed Grounded Chain-of-
  > and construct a dataset called multimodal grounded chain-of-thought (MM-GCoT) consisting of 24,022 GCoT examples for 5,033 images.

### relevant_datasets_and_benchmarks.1.purpose
**Confidence:** high

The most relevant excerpt explicitly states that a large GUI visual grounding dataset has been collected, described as the largest dataset for GUI visual grounding to date, with concrete details about the scale (10 million GUI elements) and the origin of annotations (textual referring expressions). This directly supports the finegrained field value’s focus on providing a large-to-date dataset for locating UI elements from natural language descriptions. The other excerpt identifies a broader visualization-grounding effort under the umbrella title Universal Visual Grounding for GUI Agents and names the project (UGround). While it reinforces the existence and framing of GUI grounding work, it complements the first excerpt by situating the dataset within a broader universal grounding effort and confirms the existence of a GUI-grounding initiative, thereby strengthening the relevance to a dataset-based approach for GUI element localization from NL descriptions. Taken together, these excerpts substantiate both the scale claim and the contextual relevance of GUI grounding datasets to support training models for grounding UI elements from descriptive language, matching the finegrained field value’s intent.

- [UGround Homepage](https://osu-nlp-group.github.io/UGround/)
  > We collect the largest dataset for GUI visual grounding so far, containing 10M GUI elements (~95% from web) and their referring expressions over 1.3M
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > UGround (Ours)

### relevant_datasets_and_benchmarks.8.name
**Confidence:** high

The requested field value is the dataset name 'Rico' located within a dataset/benchmark listing. The excerpts consistently describe the Rico dataset as having visual, textual, structural, and interactive design properties across many UI screens and elements, directly confirming the presence and characteristics of Rico in the relevant datasets/benchmarks collection. One excerpt notes that the Rico dataset contains 66k unique UI screens and 3M UI elements, while another reiterates the Rico dataset’s properties, providing convergent evidence for the dataset name in question. A different excerpt references Rico in the context of a larger data repository for mobile GUIs, further validating its role as a recognized dataset within this domain. Taken together, these excerpts strongly support that the finegrained field value matches the dataset named Rico in the specified path.

- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > Large-scale mobile GUI data repositories are crucial building blocks for data-driven model development. The Rico dataset  [7 , 30 ] contains visual, textual, structural, and interactive design properties of 66k unique UI screens from 9.7k Android apps spanning 27 categories in the Google Play Store.

### relevant_datasets_and_benchmarks.1.annotation_details
**Confidence:** medium

The fine-grained field value describes a dataset that pairs referring expressions (text) with bounding box coordinates for target UI elements, and notes that the data were synthesized from sources like Common Crawl with screenshots and HTML metadata. The first excerpt directly mentions collecting the largest dataset for GUI visual grounding, consisting of GUI elements and their referring expressions, which aligns with the idea of text-to-GUI-grounding pairs. This supports the notion of a dataset that contains textual references to GUI elements (referring expressions) intended for grounding in visual UI contexts. The second excerpt confirms the existence of a universal visual grounding effort for GUI agents under the UGround framework, reinforcing the context that such datasets exist and are used for grounding text in GUI imagery or layouts. Together, these excerpts corroborate the core idea of a dataset that associates textual referring phrases with GUI elements and supports grounding tasks, though they do not explicitly enumerate bounding box coordinates or the exact synthesis provenance described in the field value. The claim about bounding box coordinates as part of the dataset is strongly suggested by the general grounding/data-annotation context but is not verbatim confirmed in the excerpts; therefore, it is treated as plausible given the cited GUI grounding work.

- [UGround Homepage](https://osu-nlp-group.github.io/UGround/)
  > We collect the largest dataset for GUI visual grounding so far, containing 10M GUI elements (~95% from web) and their referring expressions over 1.3M
- [Universal Visual Grounding for GUI Agents](https://arxiv.org/html/2410.05243v1)
  > UGround (Ours)

### relevant_datasets_and_benchmarks.8.size_and_scope
**Confidence:** high

To support the field value describing a well-known dataset containing thousands of mobile UI screens, the most relevant excerpts are those that directly identify the Rico dataset and quantify its size. The excerpts state that the Rico dataset contains visual, textual, structural, and interactive design properties for a large collection of UI screens and elements, with explicit figures such as 66k UI screens and 3M UI elements. This directly aligns with the notion of thousands of screens and reinforces that the dataset is well-known in the domain. Additional excerpts reiterate Rico’s scale and role as a foundational dataset for data-driven modeling, which further corroborates its status as a large, widely recognized resource. All cited excerpts contribute relevant context, with those explicitly naming Rico and providing concrete counts being the strongest support for the field value.

- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > Large-scale mobile GUI data repositories are crucial building blocks for data-driven model development. The Rico dataset  [7 , 30 ] contains visual, textual, structural, and interactive design properties of 66k unique UI screens from 9.7k Android apps spanning 27 categories in the Google Play Store.

### relevant_datasets_and_benchmarks.5.name
**Confidence:** high

The finegrained value corresponds to the dataset name Screen2Words, which is explicitly mentioned across the provided excerpts as the focus of UI screen summarization research. One excerpt introduces Screen2Words as a novel approach that automatically encapsulates essential information of a UI screen into coherent language, directly naming the dataset and its purpose. Another excerpt details the Screen2Words dataset as the first large-scale screen summarization dataset, noting a substantial collection of human annotations across many Android screens, reinforcing that Screen2Words is a prominent dataset in this area with a rigorous labeling process. A third excerpt reiterates the existence of Screen2Words, describing the dataset’s scale (112k language summarizations across 22k screens), underscoring its role as a primary resource for mobile UI summarization. The remaining excerpt explicitly ties to the same topic by referencing the dataset’s size and labeling guidelines in a similar context. Collectively, these excerpts most directly support the specific field value by confirming the dataset name, its purpose (UI screen summarization), and its scale and annotation quality. The less detailed, later-mentioned reference adds corroboration of the dataset’s existence and relevance. Stripped to essentials, the reasoning shows direct alignment between the field value and each excerpt’s described content about Screen2Words and its role in UI screen summarization research.

- [Screen2Words: Automatic Mobile UI Summarization with ...](https://arxiv.org/abs/2108.03353)
  > by B Wang · 2021 · Cited by 242 — We present Screen2Words, a novel screen summarization approach that automatically encapsulates essential information of a UI screen into a coherent language
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > We collect, analyze, and open-source <sup>2</sup> the first dataset dedicated for UI screen summarization. It contains 112,085 quality human annotations for 22,417 unique Android screens, collected with a carefully designed labeling process and guideline, which achieve a high inter-labeler agreement for both linguistic coherence and on-screen focus area consistency.
  > by B Wang · 2021 · Cited by 242 — To aid the development of Screen2Words, we collected the first large-scale screen summarization dataset, which consists of human annotations for 22,417 Android
- [Screen2Words - OpenDataLab](https://opendatalab.com/OpenDataLab/Screen2Words)
  > The dataset contains more than 112k language summarization across 22k unique UI screens. This dataset can be used for Mobile User Interface Summarization

### key_models_and_frameworks.3.name
**Confidence:** high

The most relevant piece directly references a well-known CoT technique, describing how Chain-of-Thought prompting decomposes reasoning steps, which is the core concept behind generating Verifiable or traceable reasoning chains. This establishes the baseline for chain-of-thought in design contexts. Additional grounding-oriented items discuss strategies and systems for tying reasoning to concrete visual artifacts or UI elements. These sources show that grounding the reasoning to visual regions, UI elements, and design artifacts (e.g., screenshots, UI layers, bounding boxes) is an active area in vision-language UI models and grounding datasets. Together, these excerpts support the notion of Grounded Chain-of-Thought by (a) confirming the existence and use of process-level reasoning prompts, and (b) illustrating practical grounding mechanisms (e.g., identifying UI element types, locations, descriptions, and linking verbal critique to specific visual components). In a design critique or evaluation setting, such grounding would be essential to verify the validity of each reasoning step against observable design elements. Specifically, the materials describing SeeClick-style GUI grounding, Figma grounding constraints, and ScreenAI’s UI element annotation tasks provide concrete methods and benchmarks for associating textual reasoning with precise visual regions or UI components, aligning well with Grounded Chain-of-Thought concepts. The UIClip and related UI design evaluation work further demonstrate how design reasoning can be evaluated against visual data, reinforcing the feasibility of grounding reasoning in design contexts. 

- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > ncluding a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen. Thes
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.

### relevant_datasets_and_benchmarks.8.annotation_details
**Confidence:** medium

The field value describes a context where a dataset/benchmark provides UI screenshots along with a view hierarchy (XML) that details the structure and properties of UI elements. Excerpts focusing on the Rico dataset explicitly state that it contains visual, textual, structural, and interactive design properties for thousands of UI screens and millions of UI elements, which aligns with the idea of UI elements and their structures being captured in a dataset. The mention that Rico includes UI screens and a large collection of UI elements directly supports the notion of visual content (screenshots) and structural/element-level information (properties of UI elements) being part of the dataset. Additionally, the Screen2Words excerpts reiterate that large-scale mobile GUI data repositories include the Rico dataset with visual, textual, and structural properties, which reinforces the presence of UI-related structure and elements in the dataset context. While none of the excerpts explicitly state the XML view hierarchy, the combination of UI screenshots, structural properties, and detailed UI element counts strongly supports the field value’s claim about such datasets providing UI imagery and element-level structure.


- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > Large-scale mobile GUI data repositories are crucial building blocks for data-driven model development. The Rico dataset  [7 , 30 ] contains visual, textual, structural, and interactive design properties of 66k unique UI screens from 9.7k Android apps spanning 27 categories in the Google Play Store.

### key_models_and_frameworks.3.architecture_and_training
**Confidence:** medium

The target field value describes a design-focused approach where models output step-by-step reasoning alongside spatial coordinates that locate those reasoning outputs, and mentions the creation of datasets specifically for this purpose. A direct match is found in discussions of chain-of-thought prompting, where the model’s reasoning is broken into pieces, which is foundational to producing verifiable stepwise reasoning as a training signal. This aligns with the idea of interleaving reasoning steps with spatial outputs, since such prompts underpin transparent, inspectable processes. Grounding concepts are central in GUI grounding work and design critique workflows, where systems tie textual reasoning to concrete visual elements such as interfaces and UI components, supporting the notion of spatially anchored reasoning. Works detailing how to automate GUI-grounded data collection and to connect descriptions to visual regions (e.g., identifying UI element types and their locations) demonstrate the practical feasibility of spatially grounded reasoning in design contexts. Model-focused papers on UI evaluation and grounding (UIClip) show concrete implementations where an image or screenshot is scored or annotated with design-relevant information, including design quality and relevance to textual descriptions, illustrating how reasoning can be tied to design visuals. Further, vision-language models that annotate screens with element-level information (type, location, description) demonstrate the specific capability that the field value highlights—associating reasoning with precise visual coordinates. While no excerpt explicitly names the MM-GCoT or Visual CoT datasets, the described approaches (stepwise reasoning, spatial grounding, and scene-to-structure annotations) provide clear, supporting context for how such datasets could be constructed and used as training signals.

- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > ncluding a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen. Thes
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.

### relevant_datasets_and_benchmarks.8.purpose
**Confidence:** high

The field value states a large-scale dataset of mobile user interfaces widely used for UI research. Excerpt describing Screen2Words and Rico notes that large-scale mobile GUI data repositories are crucial for data-driven model development and that the Rico dataset contains visual, textual, structural, and interactive properties for tens of thousands of UI screens, highlighting both mobile focus and extensive scale. This directly supports the claim of a large-scale mobile UI dataset used for UI research. Additional excerpts reiterate the Rico dataset’s scale (66k UI screens) and its comprehensive properties (visual, textual, structural, interactive), reinforcing the idea of a broadly used, large-scale dataset for UI-related tasks. Collectively, these excerpts establish the dataset’s scale, mobile focus, and research relevance, aligning with the finegrained field value.

- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > Large-scale mobile GUI data repositories are crucial building blocks for data-driven model development. The Rico dataset  [7 , 30 ] contains visual, textual, structural, and interactive design properties of 66k unique UI screens from 9.7k Android apps spanning 27 categories in the Google Play Store.
- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure

### relevant_datasets_and_benchmarks.5.platform
**Confidence:** high

The target field value identifies the platform as Android. The most directly pertinent evidence describes a dataset dedicated to Android UI screens, including explicit mention of Android and the scale of Android screens annotated for UI summarization. The accompanying entries reinforce this Android focus by detailing the dataset size and its purpose for mobile UI summarization, which strongly supports Android as the platform. Additional entries discuss the Screen2Words dataset more generally within the mobile UI domain, still aligning with the Android platform through the mobile UI context, though with slightly less explicit mention of Android itself. Collectively, these excerpts provide direct and contextual support for the field value by tying the Screen2Words dataset to Android-based mobile UI screens and their summarization/annotation process.

- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > We collect, analyze, and open-source <sup>2</sup> the first dataset dedicated for UI screen summarization. It contains 112,085 quality human annotations for 22,417 unique Android screens, collected with a carefully designed labeling process and guideline, which achieve a high inter-labeler agreement for both linguistic coherence and on-screen focus area consistency.
  > by B Wang · 2021 · Cited by 242 — To aid the development of Screen2Words, we collected the first large-scale screen summarization dataset, which consists of human annotations for 22,417 Android
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://arxiv.org/abs/2108.03353)
  > by B Wang · 2021 · Cited by 242 — We present Screen2Words, a novel screen summarization approach that automatically encapsulates essential information of a UI screen into a coherent language
- [Screen2Words - OpenDataLab](https://opendatalab.com/OpenDataLab/Screen2Words)
  > The dataset contains more than 112k language summarization across 22k unique UI screens. This dataset can be used for Mobile User Interface Summarization

### relevant_datasets_and_benchmarks.0.annotation_details
**Confidence:** medium

The fine-grained field value enumerates four annotation components: textual critiques, bounding boxes marking the UI region relevant to the critique, numeric design quality ratings, and topical tags. The strongest support comes from the description of the UICrit dataset, which explicitly lists both textual critiques and bounding boxes for each critique, which matches two of the components directly. The second excerpt reinforces the existence of a sizable collection of design critiques authored by professional designers, which underpins the textual critique component and the annotation context, albeit without explicit bounding boxes. The third excerpt references a dataset aimed at enhanced automated design evaluation, implying the existence of annotated materials for design critique tasks and evaluation, aligning with the overall annotation theme but providing the least direct detail about the specific components. Collectively, these excerpts map onto the requested annotation schema, with the strongest direct evidence for textual critiques and bounding boxes, and supportive context for the remaining components.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > The dataset will be released to the research community.

### relevant_datasets_and_benchmarks.0.purpose
**Confidence:** high

The field value states a goal of enabling training and evaluation of multimodal models for three capabilities: (a) generating design critiques, (b) localizing relevant regions in the design (bounding boxes, UI layers), and (c) predicting design quality. The first excerpt describes a dataset that pairs natural-language design critiques with bounding boxes, directly enabling both critique generation and spatial grounding. The second excerpt describes a large, professionally-curated dataset of design critiques from multiple designers, which provides realistic training data and variation essential for evaluating design judgment and critique quality. The third excerpt mentions an automated design-evaluation dataset and its release, reinforcing the existence of benchmarks for training and assessing models on design critique and evaluation tasks. Collectively, these sources establish the existence and utility of datasets and benchmarks required by the finegrained field value, including localization of critiques to visual design artifacts and assessment of design quality.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > The dataset will be released to the research community.

### key_models_and_frameworks.3.key_capabilities
**Confidence:** medium

The targeted field value describes frameworks that (a) enable generation of verifiable and interpretable reasoning with each step supported by visual evidence, (b) establish evaluation protocols that measure both the final answer accuracy and the grounding consistency between reasoning and visual evidence, and (c) provide a template for grounded design critique systems. Excerpts describing vision-language models with explicit grounding and annotation tasks directly align with the notion of linking reasoning to visual elements and verifying that linkage. For example, an excerpt about ScreenAI highlights a vision-language model for UI that includes a novel Screen Annotation task requiring the model to identify UI element information (type, location, description) on a screen, which exemplifies grounding reasoning in concrete visual evidence. Another excerpt notes that the fine-tuned ScreenAI achieves state-of-the-art results on UI and infographic tasks, supporting the idea of robust grounding in real design contexts. In parallel, references to UIClip describe a data-driven model that scores UI designs based on relevance to a textual description and design quality, illustrating evaluation of grounding relevance and design critique quality. Additional excerpts discuss chain-of-thought prompting and its use for breaking down processes, which relates to making reasoning steps explicit, and grounding concepts from Figma (constraints of grounding: visibility, reviewability, simultaneity), which underpin how steps can be made verifiable and auditable in a design critique setting. Taken together, these excerpts collectively substantiate the claim that there are frameworks and models that generate verifiable, grounded reasoning tied to visual design elements and that they employ evaluation protocols around grounding quality and interpretability, forming a template for grounded design critique systems.

- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick

### relevant_datasets_and_benchmarks.5.annotation_details
**Confidence:** high

The finegrained field value specifies the goal of producing high-quality, functional summaries of UI screen capabilities. The most relevant excerpt explicitly describes Screen2Words as a novel screen summarization approach that automatically encapsulates essential information of a UI screen into a coherent language, directly mapping to creating functional UI summaries. Supporting details come from excerpts that emphasize high-quality outputs: a large-scale dataset with many human annotations and ensured linguistic coherence and on-screen focus area consistency, which together underpin reliable, actionable summaries. Additional context about dataset size and annotation guidelines further corroborates that the system behind these summaries is designed for quality and reproducibility, reinforcing that the generated summaries can be high-quality and functional. The remaining excerpt reinforces the dataset’s breadth (112k language summaries across over 22k screens), which, while broader, still supports the premise that high-quality UI summaries can be produced at scale.

- [Screen2Words: Automatic Mobile UI Summarization with ...](https://arxiv.org/abs/2108.03353)
  > by B Wang · 2021 · Cited by 242 — We present Screen2Words, a novel screen summarization approach that automatically encapsulates essential information of a UI screen into a coherent language
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > We collect, analyze, and open-source <sup>2</sup> the first dataset dedicated for UI screen summarization. It contains 112,085 quality human annotations for 22,417 unique Android screens, collected with a carefully designed labeling process and guideline, which achieve a high inter-labeler agreement for both linguistic coherence and on-screen focus area consistency.
  > by B Wang · 2021 · Cited by 242 — To aid the development of Screen2Words, we collected the first large-scale screen summarization dataset, which consists of human annotations for 22,417 Android
- [Screen2Words - OpenDataLab](https://opendatalab.com/OpenDataLab/Screen2Words)
  > The dataset contains more than 112k language summarization across 22k unique UI screens. This dataset can be used for Mobile User Interface Summarization

### relevant_datasets_and_benchmarks.0.name
**Confidence:** high

The requested field value is the dataset name 'UICrit' located within a nested field path that points to the 'name' of the first item in a list of datasets/benchmarks. The strongest support comes from an excerpt that explicitly names UICrit as a dataset containing human-generated natural language design critiques and bounding boxes, directly aligning with the field value. Another excerpt references the same dataset in a scholarly context, describing the collection and characteristics of critiques, which corroborates the association with UICrit. A third excerpt discusses a UI critique dataset in general terms and mentions design critique, which aligns conceptually with the same research area but does not explicitly assert the acronym 'UICrit'. Collectively, the first two excerpts provide direct evidence for the exact value, while the third offers contextual corroboration without a precise match to the acronym.

- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > The dataset will be released to the research community.

### relevant_datasets_and_benchmarks.8.platform
**Confidence:** high

The most relevant material directly states that the Rico dataset consists of UI screens from Android apps, explicitly connecting to the mobile Android platform described in the field value. Specifically, one excerpt notes that the Rico dataset includes 66k unique UI screens from 9.7k Android apps available on the Google Play Store, which directly supports the notion of a mobile (Android) platform within datasets/benchmarks. An additional excerpt reinforces this by describing Rico as containing visual, textual, structural, and interactive design properties for a large collection of UI screens, which is characteristic of mobile UI benchmarks. The remaining excerpts also describe the Rico dataset’s mobile design properties and Android app coverage, further corroborating the mobile Android relevance, even if they reiterate the same dataset context. Taken together, these excerpts collectively confirm that the relevant platform in the datasets/benchmarks section is Android/mobile.

- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > Large-scale mobile GUI data repositories are crucial building blocks for data-driven model development. The Rico dataset  [7 , 30 ] contains visual, textual, structural, and interactive design properties of 66k unique UI screens from 9.7k Android apps spanning 27 categories in the Google Play Store.
- [http://interactionmining.org/rico](http://interactionmining.org/rico)
  > The Rico dataset contains visual, textual, structural, and interactive design properties of more than 66k unique UI screens and 3M UI elements. RICO figure

### relevant_datasets_and_benchmarks.5.purpose
**Confidence:** high

The requested fine-grained field value identifies a dataset as the first large-scale benchmark for UI screen summarization. The excerpts collectively describe Screen2Words as a dataset dedicated to UI screen summarization, with explicit language indicating it is the first large-scale dataset. One excerpt directly phrases it as the first large-scale screen summarization dataset, which strongest supports the field value. Another excerpt notes that the dataset is the first of its kind in this domain and provides context about its scope (112k annotations across 22k screens), reinforcing both the scale and the dedicated nature of the dataset. Additional excerpts confirm the UI summarization focus and provide supporting details about the dataset’s usage and its methodological grounding, which align with the idea of a benchmark/resource for evaluation in this area. Taken together, these excerpts support the claim that there exists a first large-scale dataset and benchmark for UI screen summarization, even if not every excerpt uses identical phrasing to claim “benchmark” explicitly.

- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > by B Wang · 2021 · Cited by 242 — To aid the development of Screen2Words, we collected the first large-scale screen summarization dataset, which consists of human annotations for 22,417 Android
  > We collect, analyze, and open-source <sup>2</sup> the first dataset dedicated for UI screen summarization. It contains 112,085 quality human annotations for 22,417 unique Android screens, collected with a carefully designed labeling process and guideline, which achieve a high inter-labeler agreement for both linguistic coherence and on-screen focus area consistency.
- [Screen2Words - OpenDataLab](https://opendatalab.com/OpenDataLab/Screen2Words)
  > The dataset contains more than 112k language summarization across 22k unique UI screens. This dataset can be used for Mobile User Interface Summarization
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://arxiv.org/abs/2108.03353)
  > by B Wang · 2021 · Cited by 242 — We present Screen2Words, a novel screen summarization approach that automatically encapsulates essential information of a UI screen into a coherent language

### key_models_and_frameworks.3.purpose
**Confidence:** medium

The most supportive parts point to chain-of-thought prompting as a technique for producing structured reasoning. This establishes the methodological angle that a model can generate step-by-step reasoning rather than single-step answers. Other excerpts directly address grounding reasoning in visual UI contexts, such as identifying UI element information on a screen and related screen-annotation tasks, which align with grounding design reasoning to specific image regions. Several excerpts discuss GUI grounding data, grounding constraints in design tools, and UI-design evaluation models that assess design quality and relevance to textual descriptions, which provide contextual support for applying grounded reasoning to visuals. Overall, the strongest connections come from combining chain-of-thought style reasoning with explicit grounding in UI elements or screen annotations, indicating a research trajectory that ties reasoning steps to visual regions or design artifacts. Some excerpts expand on grounding techniques or UI-focused visual-language models, which strengthens the plausibility of grounding design reasoning to image regions, while others emphasize evaluation frameworks or grounding datasets that support the broader goal of verifiable, region-grounded reasoning in design critique.

- [GenAI for UXR: Few-Shot and Chain-of-Thought Prompting](https://medium.com/design-bootcamp/genai-for-uxr-few-shot-and-chain-of-thought-prompting-99d53bd17ce4)
  > Chain-of-Thought Prompting, also referred to as CoT, is a technique where you break your process into pieces, and usually use the output of a
- [ScreenAI: A visual language model for UI and ...](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
  > We train ScreenAI on a unique mixture of datasets and tasks, including a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen.
  > Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen
  > The fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tasks ( 
  > Screen Annotation: Enables the evaluation model layout annotations and spatial understanding capabilities.
  > Mar 19, 2024 — We introduce ScreenAI, a vision-language model for user interfaces and infographics that achieves state-of-the-art results on UI and infographics-based tasks.
  > We fine-tune ScreenAI using public QA, summarization, and navigation datasets and a variety of tasks related to UIs.
  > ncluding a novel Screen Annotation task that requires the model to identify UI element information (i.e., type, location and description) on a screen. Thes
  > e fine-tuned ScreenAI model achieves state-of-the-art results on various UI and infographic-based tas
- [Figma and constraints of grounding | by Jeanette Ahn](https://medium.com/design-bootcamp/figma-and-constraints-of-grounding-2788bff3e180)
  > Figma demonstrates several concepts from these constraints of grounding, specifically Visibility, Reviewability, and Simultaneity, mainly
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://aclanthology.org/2024.acl-long.505.pdf)
  > by K Cheng · 2024 · Cited by 477 — We devise a method to automate the curation of web grounding data and adapt public mobile UI datasets to obtain mobile grounding data. SeeClick
- [SeeClick: Harnessing GUI Grounding for Advanced Visual ...](https://arxiv.org/html/2401.10935v2)
  > Feb 23, 2024 — SeeClick is designed to perform low-level actions like clicking or typing directly by observing interface screenshots.
- [UIClip: A Data-driven Model for Assessing User Interface Design](https://arxiv.org/html/2404.12500v1)
  > We assess the models on three tasks, including design quality, improvement suggestions, and design relevance.
  >   A computational model that scores UI screenshots based on relevance to a textual description and design quality.
  > # UIClip: A Data-driven Model for Assessing User Interface Design
  > ## 1. Introduction
  > We benchmarked UIClip with other large vision-language models (LVLM) by evaluating them on a held-out set of UI screens.
  >  A large-scale dataset of UI designs and descriptions comprised of synthetic and human-generated design ratings.

  > 
The results of our retrieval evaluation are shown in Table [1](htt

### relevant_datasets_and_benchmarks.0.size_and_scope
**Confidence:** medium

The most relevant excerpt explicitly states the dataset consists of 3,059 natural language design critiques collected from seven designers, indicating a large-scale collection and involvement of professional designers. This directly aligns with the notion of a sizable set of critiques and confirms the total critique count asserted by the field value, though it does not mention 983 unique mobile UI screens. The second-excerpt provides additional support for the existence of the UI Crit dataset by noting it contains human-generated design critiques and bounding boxes for each critique, which reinforces that the dataset has structured annotations and a design-focused scope, consistent with a large, designer-generated critique collection. The third excerpt refers to a related dataset or a related work and mentions the dataset’s release to the research community, which corroborates the context that there is an established UI critique dataset but offers no direct confirmation of the exact counts or screen-level granularity. Taken together, these excerpts support the existence of a large-scale UI critique dataset and the 3,059 critique count, but they do not confirm the 983 unique mobile UI screens mentioned in the field value; thus, the field value is only partially corroborated by the provided excerpts.


- [http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > This dataset consists of 3,059 natural language design critiques collected from seven designers, each with at least one year of professional design experience.
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://arxiv.org/html/2407.08850v2)
  > The dataset will be released to the research community.

### relevant_datasets_and_benchmarks.5.size_and_scope
**Confidence:** high

The exact figures in the field value are directly supported by statements describing a dataset that contains 112,085 annotations across 22,417 unique screens. The strongest support comes from excerpt that explicitly says 'the dataset contains... 112,085 quality human annotations for 22,417 unique Android screens,' which aligns precisely with the field value. Additional excerpts corroborate by repeating the same scale in slightly different wording ('112k language summarization across 22k unique UI screens'), reinforcing the size and scope claim. One excerpt reiterates the dataset purpose and size in a paraphrased form, further validating the numbers as the intended size descriptor for this dataset. Collectively, these excerpts confirm the field value about the dataset size and scope, with no conflicting evidence present.

- [Screen2Words: Automatic Mobile UI Summarization with ...](https://dl.acm.org/doi/fullHtml/10.1145/3472749.3474765)
  > We collect, analyze, and open-source <sup>2</sup> the first dataset dedicated for UI screen summarization. It contains 112,085 quality human annotations for 22,417 unique Android screens, collected with a carefully designed labeling process and guideline, which achieve a high inter-labeler agreement for both linguistic coherence and on-screen focus area consistency.
  > by B Wang · 2021 · Cited by 242 — To aid the development of Screen2Words, we collected the first large-scale screen summarization dataset, which consists of human annotations for 22,417 Android
- [Screen2Words: Automatic Mobile UI Summarization with ...](https://arxiv.org/abs/2108.03353)
  > by B Wang · 2021 · Cited by 242 — We present Screen2Words, a novel screen summarization approach that automatically encapsulates essential information of a UI screen into a coherent language
- [Screen2Words - OpenDataLab](https://opendatalab.com/OpenDataLab/Screen2Words)
  > The dataset contains more than 112k language summarization across 22k unique UI screens. This dataset can be used for Mobile User Interface Summarization
