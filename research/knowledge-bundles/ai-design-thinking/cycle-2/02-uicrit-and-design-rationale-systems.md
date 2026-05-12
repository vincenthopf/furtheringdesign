---
query: "Deep dive into existing structured design reasoning data and systems: (1) UICrit dataset — what is its exact schema, what design dimensions does it cover, how were critiques collected and annotated, what are its known limitations, what follow-on research has used it, and how could it be extended? (2) Design rationale capture systems — IBIS (Issue-Based Information Systems), QOC (Questions-Options-Criteria), DRed, and Design Knowledge Support Networks (DKSN). What did these systems produce? Were they adopted in practice? What did they successfully capture and what did they fail to capture about design reasoning? How do their schemas map to what an LLM training pipeline would need? Are there more recent successors to these systems (2015-2025)? What is the current state of design rationale research as a field?"
processor: pro
run_id: trun_6b0c617b26214cd79237d634f40cd607
created_at: 2026-05-03T07:09:06.226166Z
retrieved_at: 2026-05-03T07:19:59Z
---

# Research: Deep dive into existing structured design reasoning data and systems: (1) UICrit dataset — what is its exact schema, what design dimensions does it cover, how were critiques collected and annotated, what are its known limitations, what follow-on research has used it, and how could it be extended? (2) Design rationale capture systems — IBIS (Issue-Based Information Systems), QOC (Questions-Options-Criteria), DRed, and Design Knowledge Support Networks (DKSN). What did these systems produce? Were they adopted in practice? What did they successfully capture and what did they fail to capture about design reasoning? How do their schemas map to what an LLM training pipeline would need? Are there more recent successors to these systems (2015-2025)? What is the current state of design rationale research as a field?

## Findings

### Report Summary

This report provides a deep dive into structured design reasoning, contrasting the modern UICrit dataset with historical design rationale (DR) capture systems like IBIS, QOC, and DRed. UICrit is a recent, large-scale dataset of 3,059 design critiques on 983 mobile UI screens, featuring a flat CSV schema that links natural language critiques and quality ratings (for aesthetics, usability, etc.) to specific UI regions via bounding boxes. Its primary purpose is to facilitate the training of automated UI evaluation and critique models. While strong in capturing visual design and learnability issues, its reliance on static, single screens means it underrepresents dynamic UX heuristics like error prevention and system status feedback. In contrast, historical DR systems aimed to capture the *process* of design deliberation. Systems like IBIS produced argumentation graphs (Issues, Positions, Arguments), while QOC mapped out design spaces (Questions, Options, Criteria). These systems provided rich, semantic structures for understanding design trade-offs but largely failed to achieve widespread, sustained industrial adoption due to high cognitive overhead and authoring costs. Notable exceptions include DRed's use in engineering and the pragmatic success of a more recent, lightweight successor, Architectural Decision Records (ADRs), in software engineering. The advent of LLMs has revitalized the field, creating a clear application for both types of data: UICrit's grounded, multimodal data is ideal for fine-tuning models for automated critique, while the structured graphs from historical systems offer a blueprint for training models to perform complex, deliberative reasoning.

### Uicrit Dataset Overview

UICrit is a publicly available dataset designed to advance the field of automated User Interface (UI) evaluation. It comprises a substantial collection of 3,059 design critiques and quantitative design quality ratings for 983 unique mobile UI screens, which were originally sourced from the CLAY dataset. The primary contribution of UICrit is to provide a structured and grounded resource for training and evaluating machine learning models, particularly multimodal Large Language Models (LLMs), to perform design critique tasks. Each critique is linked to a specific region of the UI via bounding box coordinates, and is accompanied by a set of quality ratings, making it a valuable asset for developing more sophisticated automated UI assessment tools.

### Uicrit Schema Details

**Rico Id:** The screen ID from the original RICO dataset, used to identify each unique UI screen.

**Task:** A description of the main task the UI screen is designed to accomplish, as annotated by professional designers.

**Aesthetics Rating:** 8.0

**Learnability Rating:** 3.0

**Efficiency Rating:** 3.0

**Usability Rating:** 8.0

**Design Quality Rating:** 8.0

**Comments:** A list of textual design critiques for the UI screen. Each comment is associated with specific bounding box coordinates, which are normalized by the screenshot's dimensions, to ground the critique in a particular visual region of the interface.

**Comments Source:** Specifies the origin of each design comment. The value can be 'human' if written by a human annotator, 'llm' if generated by a large language model, or 'both' if an LLM-generated comment was validated and potentially edited by a human.


### Uicrit Design Dimensions Covered

**Rating Dimensions:** The dataset uses a multi-faceted quantitative rating system to evaluate each UI. The overall 'design_quality_rating' (1-10) is decomposed into 'aesthetics_rating' (1-10) and 'usability_rating' (1-10). The usability rating is further broken down into 'learnability' (1-5 Likert scale) and 'efficiency' (1-5 Likert scale), providing a granular assessment of different aspects of the user experience.

**Critique Topic Clusters:** Analysis of the critique comments shows strong coverage of topics related to visual design and learnability. There is also some coverage of issues concerning user control and flexibility. The critiques were structured based on Sadler's feedback format, requiring annotators to identify an expected standard, the observed gap, and a suggestion to close the gap, providing a consistent structure for the qualitative feedback.

**Underrepresented Heuristics:** Due to its focus on static, single-screen UIs, the dataset has limited or no coverage of design heuristics related to dynamic interactions or multi-screen flows. Specifically, heuristics such as 'error prevention', 'visibility of system status' (which had only two critiques in the entire dataset), 'feedback and consistency across screens', 'direct manipulation', and 'help and documentation' are noted as being underrepresented or largely absent.


### Uicrit Critique Collection And Annotation

**Annotator Profile:** The data was collected and annotated by a group of seven professional designers. Their experience levels varied, ranging from 1 to 16 years in the design industry, ensuring a degree of expert evaluation in the critiques and ratings.

**Annotation Methodology:** A multi-part annotation process was employed over a two-week period. Initially, 1,000 UIs were randomly sampled from the CLAY dataset. The process for annotators was: (1) Annotate the main task of the UI. (2) Draw bounding boxes around problematic areas and write structured design critiques. (3) Validate critiques that were generated by an LLM. (4) Complete a rubric to provide quantitative ratings for aesthetics, usability (learnability and efficiency), and overall design quality. This process resulted in 983 fully annotated screens.

**Referenced Guidelines:** To standardize the critique process, annotators were provided with three sets of well-established design guidelines for reference: Nielsen Norman's 10 Usability Heuristics, the CrowdCrit Visual Design Critiques, and Apple's Human Interface Guidelines (HIG).

**Llm Critique Integration:** Large Language Models were used to augment the human annotation process. Specifically, Gemini Pro Vision was prompted in a zero-shot manner, using the design guidelines as context, to generate design comments. These LLM-generated critiques were then presented to the human annotators for validation. The process revealed a significant quality gap, as only 776 out of 5,927 generated comments (13.1%) were deemed valid by the human experts, highlighting the need for more advanced techniques like fine-tuning.


### Uicrit Known Limitations

**Limitation Category:** Dataset Scope and Methodology

**Description:** The UICrit dataset has several documented limitations. The annotator pool was small, consisting of only seven professional designers, which restricts the diversity of feedback. The dataset is composed of static, single-screen UIs, meaning it fails to capture critiques related to dynamic user flows or multi-screen interactions. This leads to the underrepresentation of important usability heuristics such as error prevention and visibility of system status. The methodology used to generate supplementary critiques with an LLM (Gemini Pro Vision) involved a light-weight, few-shot prompting approach that resulted in a high rate of hallucinations, with only 13.1% of generated comments being validated by human annotators. Furthermore, the study did not include an in-practice implementation phase to assess the real-world helpfulness and impact of the collected critiques on design outcomes.


### Uicrit Follow On Research

| Paper Title | Venue | Summary Of Use |
| --- | --- | --- |
| Stagewise Human–AI co-critique | CHI 2026 | This work reportedly uses the UICrit dataset, along with other related datasets, as a foundation for building and evaluating co-critique pipelines where humans and AI collaborate in a stagewise process to critique user interfaces. |
| UIClip | UIST 2024 | This research is part of a broader ecosystem of automated UI assessment models that can leverage the UICrit dataset for training and evaluation purposes, indicating its use in developing new models for automated UI analysis. |

### Uicrit Potential For Extension

The original paper and analysis suggest numerous ways the UICrit dataset could be extended. A primary opportunity is to use the dataset to fine-tune multimodal Large Language Models (LLMs) like Gemini Pro Vision, potentially exploring the value of different input modalities like screenshots alone versus screenshots combined with XML view hierarchies. The dataset's scope could be significantly broadened by increasing the number of annotators to enhance diversity and adding more UI screens to fill gaps in UI and task types. A crucial extension would be to include multi-screen flows and task traces, which would enable the collection of critiques on dynamic heuristics (e.g., error prevention, feedback, consistency) that are absent in the current static-screen format. The data could also be enriched by adding richer metadata such as widget types, view hierarchy linkages for better grounding, critique severity/priority ratings, and rationale attributes. Further ideas include diversifying the guideline frameworks and personas used, capturing before-and-after redesign outcomes for causal evaluation, and incorporating inter-annotator agreement measures. Finally, the dataset could be augmented with counterfactual 'fix' proposals paired with critiques to create a valuable resource for supervised training of generative design models.

### Analysis Of Historical Design Rationale Systems

| System Name | Artifacts Produced | Adoption In Practice | Successes | Failures And Limitations | Schema Structure |
| --- | --- | --- | --- | --- | --- |
| IBIS (Issue-Based Information Systems) / gIBIS | The system produces argumentation graphs, often referred to as issue-based discussion maps. These graphs are generated using a hypertext tool (gIBIS) designed for real-time or near-real-time capture of deliberations. The output preserves the sequence of the discussion and the various alternatives considered, structuring the conversation around key issues. | Adoption has been mixed. Field studies, such as with itIBIS, showed benefits for improving team memory and tracking decisions, but this required significant training. Meetings without participants literate in the IBIS method were often described as frustrating. Attempts to implement IBIS in policy organizations typically did not advance beyond the prototype stage due to issues with complexity and control. While practitioner communities like Dialogue Mapping and Compendium have emerged with case studies, sustained, organization-wide adoption remains rare and often depends on a dedicated facilitator. | IBIS is successful at capturing the structure of deliberation, including the alternatives considered and the arguments for and against them. When used with a facilitator, it can improve the structure of meetings and enhance group memory. Its primary strength is in preserving the narrative and process of the design discussion. | The main barriers to adoption are the high cognitive overhead and the cost associated with authoring the rationale. The resulting IBIS structures can become overwhelmingly complex and difficult to parse. Capturing rationale in real-time is challenging and necessitates specialized training or a facilitator. The system also suffered from a lack of control over issue scope and filtering, which could lead to unwieldy and unmanageable maps. | The underlying schema is an argumentation-based graph structure composed of three main elements: 'Issues' (questions or problems to be addressed), 'Positions' (potential answers or solutions to an Issue), and 'Arguments' (statements that either support or object to a Position). These elements are connected by typed links. |
| QOC (Questions-Options-Criteria) / Design Space Analysis | QOC produces semi-formal structures that represent a design space analysis. These artifacts articulate and compare different design alternatives, emphasizing reusable and comparative reasoning rather than a narrative of the process. The output is a coherent structure of Questions, Options, and Criteria. | QOC has had substantial influence in academia and has been used effectively in case studies and for communicating HCI knowledge. However, there is less evidence of its long-term, routine adoption in industrial settings. The cognitive overhead required to construct and maintain the rationalized design spaces was a noted barrier to practical adoption. | The system excels at capturing comparative rationale, clearly laying out the trade-offs between different design alternatives based on explicit criteria. This makes it a valuable tool for teaching and explaining design choices, as well as for reusing design knowledge across different projects. | A significant limitation is the cognitive overhead involved in creating the rationalized structures. The process of rationalization tends to filter out the narrative sequence and the more ephemeral, opportunistic aspects of design exploration. The long-term utility of the system is critically dependent on the sustained effort to populate the design space and the availability of effective search and navigation tools. | The system uses a semi-formal notation based on 'Questions' which identify key design issues; 'Options', which are the potential solutions or answers to a Question; and 'Criteria', which form the basis for assessing and comparing the Options. The schema also includes 'Assessments' and 'Arguments' to link Criteria to Options. |
| DRed (Design Rationale editor) | DRed produces rationale maps that are directly linked to specific engineering problems. Inspired by IBIS, its output goes beyond simple rationale capture to serve as a comprehensive problem management tool within engineering contexts. | DRed has seen notable industrial uptake, with Rolls-Royce being a prominent example. Published evaluations and impact summaries confirm its successful deployment and evolution into a second version (DRed 2.0). It is considered one of the clearest success stories of a design rationale system being adopted and routinized in an industrial engineering domain. | DRed successfully operationalized the capture of design rationale within a demanding industrial workflow. It effectively ties rationale to specific design artifacts and has proven valuable as a broader problem management tool, demonstrating a clear return on investment in its target domain. | The provided context focuses heavily on DRed's successes, but like all such systems, it would have faced inherent challenges related to capture cost and integration. However, its documented success suggests it developed effective methodologies to overcome these barriers, for instance, by providing a clear industrial deployment process and demonstrating value beyond pure rationale capture. | The system uses a graph-based structure inspired by IBIS but specifically tailored for the needs of engineering design. It allows designers to record rationale and link it directly to engineering problems as the design progresses. |
| DKSN (Design Knowledge Semantic Network) | DKSN produces a three-dimensional semantic knowledge network. In this network, design rationale is treated as a first-class node type, allowing it to be integrated with knowledge from multiple sources through fusion methods. The output is a rich, interconnected network that enables advanced internalization and retrieval of design knowledge. | As a recent academic proposal (circa 2023), DKSN has undergone initial validations, but its adoption in practice is yet to be determined. It represents a current research direction rather than an established industrial tool. | The system successfully proposes a novel method for integrating design rationale deeply into a broader design knowledge network. By treating rationale as a primary entity, it enables the fusion of information from disparate sources and supports sophisticated knowledge retrieval and analysis. | Being a recent academic concept, its practical limitations in real-world industrial settings are not yet documented. Potential challenges likely include the complexity of creating, maintaining, and scaling the comprehensive semantic network required by the metamodel. | DKSN is based on a design-rationale-centric knowledge network metamodel. This model integrates multi-source knowledge into a 3D semantic network, where design rationale is a specific type of node, enabling it to be linked with other design knowledge elements. |
| PHI/JANUS/PHIDIAS | These systems produced reusable issue bases and linked argumentation that could be accessed directly from selected objects within a CAD environment. A key feature was the use of 'critics' that monitored design artifacts and automatically linked detected violations of design principles to the underlying rationale. | Evaluations showed that designers found the critic feature valuable. However, there is limited evidence of sustained, industry-wide adoption. The primary legacy of this line of research was its influence on the design of subsequent rationale-aware tools rather than its own widespread use. | The systems were successful in tightly coupling design rationale to specific design artifacts (e.g., CAD objects). The critic mechanism was particularly effective at surfacing tacit knowledge and implicit guidelines at the moment of design, connecting them to a formal rationale structure. | A major failure point was the difficulty and distraction caused by attempting to capture the rationale (the Procedural Hierarchy of Issues, or PHI) concurrently with the creative design construction phase. This high overhead during active design work hindered its practical application. | The schema was based on a 'Procedural Hierarchy of Issues' (PHI). This structure was populated by critics that would link the state of design artifacts to an issue-based argumentation network, making the rationale accessible from the design object itself. |

### Recent Successors To Rationale Systems 2015 2025

**Practice Name:** Architecture Decision Records (ADRs)

**Description:** An Architecture Decision Record (ADR) is a lightweight text document, often written in Markdown, that captures a single significant architectural decision along with its context and consequences. The core principle is to document the 'why' behind a decision, including the forces at play and the rationale for the chosen path, to help future team members understand the system's evolution.

**Adoption Level:** ADRs are widely adopted across the software engineering industry and have become a de facto standard for lightweight architecture documentation. Their use is recommended by major technology vendors such as AWS (in the Well-Architected Framework) and Microsoft, as well as by influential practitioners like Martin Fowler.

**Comparison To Classic Systems:** Compared to classic heavyweight systems like IBIS or QOC, ADRs are fundamentally more pragmatic, lightweight, and developer-friendly. They have a very low overhead, as they are simple text files that can be version-controlled alongside source code. They focus on capturing individual, atomic decisions rather than building complex, interconnected graphs of argumentation, which makes them easier to create, maintain, and consume within agile development workflows.


### Current State Of Design Rationale Research

The field of design rationale research is characterized by a shift from formal, heavyweight systems towards more practical, integrated, and AI-driven approaches. While the foundational theories and notations from systems like IBIS, QOC, and DRL are mature and well-understood, their sustained industrial adoption has been limited due to persistent challenges, primarily the high cognitive overhead and cost of capturing rationale, and difficulties with workflow integration. The value of these systems often could not be realized without strong facilitation or organizational mandates.

In practice, there has been a significant move toward lightweight, textual decision records, with Architecture Decision Records (ADRs) becoming a de facto standard in software engineering. This reflects a preference for pragmatic, developer-friendly methods over complex, standalone tools. There is also a trend towards embedding rationale within broader enterprise systems like knowledge graphs, Product Lifecycle Management (PLM), and Application Lifecycle Management (ALM) platforms, rather than siloing it.

A new wave of momentum is being driven by advancements in AI, particularly large multimodal models. Datasets like UICrit, which contains thousands of design critiques grounded in UI screenshots, are enabling new research into automated design evaluation. Current research focuses on fine-tuning multimodal LLMs for critique generation, using bounding regions for grounding, and training reward models to assess design quality. There is a significant opportunity to combine the structured, deliberative schemas of classic systems (e.g., QOC's Question-Option-Criteria) with the power of LLMs to create semi-automated tools for structured argument extraction and guided deliberation. Future research opportunities lie in creating standard ontologies for design rationale, collecting longitudinal data to evaluate the utility of rationale, capturing rationale for dynamic multi-screen tasks, and developing human-in-the-loop co-critique systems.

### Mapping Schemas To Llm Training Needs

The schemas from both UICrit and historical design rationale systems map directly to distinct but complementary needs of an LLM training pipeline for design reasoning. An ideal training corpus would contain structured nodes (issues, alternatives, arguments), rich natural language, grounded references to artifacts (like screenshots), negative examples (rejected options), and quality labels for training reward models.

**UICrit's Contribution:** The UICrit dataset's schema is exceptionally well-suited for training multimodal LLMs. It provides a direct mapping of `(image, text, region, ratings)` tuples. Specifically:
- The UI screenshot (`image`) paired with natural language critiques (`text` from the 'comments' column) and bounding box coordinates (`region`) provides perfect data for multimodal alignment. This can be used to fine-tune models to generate critiques for specific parts of a UI.
- The scalar ratings for aesthetics, usability, and overall design quality serve as ideal labels for training reward models or supervised quality estimators. A model could be trained to predict these scores from a UI screenshot.
- The `task` label provides context that can be used in prompts to generate more relevant critiques.

**Historical Systems' (IBIS, QOC, etc.) Contribution:** The graph-based schemas of systems like IBIS, QOC, and DRed offer a blueprint for training LLMs in structured, deliberative reasoning. Their outputs can be serialized into formats like JSON or RDF triples.
- The `Question-Option-Criteria` structure from QOC maps cleanly to prompt templates for multi-turn conversational AI, guiding the model to explore a design space by identifying a core question, proposing multiple options, and evaluating them against explicit criteria.
- The `Issue-Position-Argument` structure from IBIS can be used to train models to extract or generate argumentation structures from text, identifying claims and their supporting or opposing arguments.
- The explicit links to artifacts, decisions, and dependencies in systems like DRL and PHIDIAS provide structured data for training models on causal reasoning and dependency tracking within a design process.

**Gaps and Integration:** To bridge the gaps for a comprehensive training pipeline, several steps are needed. The historical data is often not available at a large scale or in modern, standardized formats. A key challenge is to create large, domain-diverse corpora that combine the grounded, multimodal nature of UICrit with the rich semantic, graph-based structure of historical rationale systems. This would involve standardizing ontologies, augmenting data with post-decision outcomes, and capturing conversational traces to provide narrative context.

### Comparative Analysis Of Approaches

UICrit and historical design rationale systems like IBIS and QOC represent two fundamentally different approaches to structuring design reasoning, differing in their core goals, data structure, and practical application.

**Core Goals:**
- **UICrit:** The primary goal is **evaluation and critique**. It is designed to create a dataset for training and benchmarking AI models that can automatically assess the quality of a user interface and provide constructive feedback. It captures the *outcome* of a design evaluation process.
- **Historical Systems (IBIS, QOC, DRed):** The primary goal was **process capture and deliberation support**. These systems were created to help design teams document their reasoning, explore alternatives, and preserve the 'why' behind decisions for future reference and team memory. They capture the *process* of design deliberation.

**Data Structure:**
- **UICrit:** The structure is a **flat data table** (a single CSV file). Each row represents an evaluation by one annotator for one UI. The key elements are natural language critiques, scalar quality ratings, and bounding boxes that ground the critique to a specific region of a static image. The relationships are implicit (e.g., a critique pertains to a UI).
- **Historical Systems:** The structure is a **semantic graph or network**. IBIS creates a directed graph of Issues, Positions, and Arguments. QOC creates a semi-formal structure of Questions, Options, and Criteria. These systems use typed nodes and explicit links to represent the logical and argumentative relationships between different pieces of the design rationale.

**Strengths and Weaknesses:**
- **UICrit:**
    - *Strengths:* Provides a large-scale, modern dataset with direct, multimodal grounding (text-to-image-region). The data is immediately useful for supervised fine-tuning and reward modeling for generative AI. Its schema is simple and easy to process.
    - *Weaknesses:* Its focus on static, single screens limits its ability to capture reasoning about dynamic interactions, user flows, or system-level consistency. The critiques are post-hoc evaluations and do not capture the original designer's intent or trade-offs.
- **Historical Systems:**
    - *Strengths:* Capable of capturing complex, nuanced design trade-offs and the argumentation process. The graph structure makes the design space and decision logic explicit and potentially reusable. Systems like DRed demonstrated success in linking rationale directly to engineering artifacts in an industrial context.
    - *Weaknesses:* Suffered from severe practical limitations, primarily the high cognitive overhead and authoring cost required to populate the structures. This led to low adoption rates, as capturing rationale was often seen as a distraction from the primary design task. The resulting rationale maps could become overly complex and difficult to navigate.

### Conclusion And Future Directions

The field of design rationale research has evolved from creating comprehensive but cumbersome capture systems to a more pragmatic, AI-driven landscape. The key takeaway from historical systems like IBIS and QOC is that while they provided powerful formalisms for representing design reasoning, their high authoring cost and cognitive overhead proved to be insurmountable barriers to widespread adoption. The practical needs of developers led to the rise of lightweight, pragmatic successors, most notably Architectural Decision Records (ADRs), which became a de facto standard in software engineering between 2015-2025 for their low-overhead, text-based approach to capturing key decisions.

The current state of the field is characterized by a resurgence of interest, fueled by advancements in AI and multimodal models. This new wave is less focused on manual capture and more on automated analysis and generation. Datasets like UICrit are pivotal to this shift, enabling the development of AI tools that can perform grounded, automated design critiques. The focus has moved towards embedding rationale within broader knowledge graphs (e.g., DKSN) and DevOps toolchains, rather than in standalone applications.

Future directions and research opportunities lie at the intersection of classic rationale structures and modern AI capabilities:
1.  **Hybrid Data and Standard Ontologies:** Developing standardized ontologies to merge the rich, semantic graphs of historical systems with the grounded, multimodal data of modern datasets like UICrit. This would create powerful training corpora for more sophisticated design-aware AI.
2.  **Semi-Automated Authoring and Co-Critique:** Using LLMs to reduce the authoring burden by semi-automating the capture of rationale from design artifacts, conversations, and code. This leads to human-in-the-loop systems where AI acts as a co-pilot or co-critic in the design process, as explored in recent research.
3.  **Outcome-Driven Rationale:** Collecting longitudinal data that links design rationale not just to the design artifact, but to its real-world performance and outcomes. This would allow for the creation of causal models to evaluate the actual utility of design decisions and the rationale behind them.
4.  **Expanding Scope:** Moving beyond static, single-screen analysis to capture rationale for complex, multi-screen user flows and dynamic interactions, a key limitation of current datasets.

In essence, the future of design rationale is not about forcing designers to use rigid tools, but about creating intelligent systems that can infer, structure, and leverage design knowledge from the natural workflow, blending the explicit reasoning of classic DR with the generative power of modern AI.


## Research Basis

### recent_successors_to_rationale_systems_2015_2025
**Confidence:** high

Architectural Decision Records are presented as a lightweight, text-based mechanism specifically designed to capture single architectural decisions along with its context and consequences, including the rationale for the chosen path. This directly supports the notion of ADRs as the modern, pragmatic successor or at least a practical evolution in the design rationale space, aligning with the description of ADRs as a simple, version-controlled means to document decisions and their implications for future team members. Further emphasis on ADRs as central artifacts for decision-making and their practical adoption is evidenced by discussions on maintaining and mastering ADRs in organizational workflows, indicating widespread adoption and mature best practices. In this way, the excerpts collectively establish ADRs as a recognized successor/alternative to heavier rationale systems by highlighting their core characteristics, practical benefits, and established usage patterns across teams and industries. The surrounding literature also notes the ongoing conversation about how to capture rationale, including challenges and research directions, which provides context for why lighter ADR formats have gained traction as complements or alternatives to traditional systems like IBIS/QOC. The combination of a clear definition, explicit focus on the “why” behind decisions, and recommendations for adoption and maintenance supports the field value of ADRs as a contemporary successor in design rationale practice.

- [Architectural Decision Records](https://adr.github.io/)
  > An Architectural Decision Record (ADR) captures a single AD and its rationale; Put it simply, ADR can help you understand the reasons for a chosen architectural
- [Master architecture decision records (ADRs): Best ...](https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/)
  > Mar 20, 2025 — Architecture decision records (ADRs) help you document and communicate important process and architecture decisions in your engineering projects.
- [Maintain an architecture decision record (ADR)](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)
  > Learn about the benefits of creating an architecture decision record in the design process to document decisions, justifications, and implications.
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than

### uicrit_design_dimensions_covered
**Confidence:** high

The finegrained field value describes the internal structure of the UICrit dataset’s rating system and what design aspects it covers. The most directly relevant excerpts enumerate the exact design-dimension schema used by UICrit: the dataset provides aesthetics_rating, usability_rating, learnability, and efficiency as part of a multi-dimensional design quality assessment, and design_quality_rating as an overall composite. These excerpts also articulate how each UI screen is annotated with task context and design critiques tied to bounding boxes, which directly supports the notion of a multi-faceted rating system and the granular critique structure. Additional excerpts confirm the exact scoring scales for those dimensions (e.g., 1-10 for aesthetics/usability and 1-5 for learnability/efficiency), and describe the bounding-box-linked critiques that populate the critique_topic_clusters and the structured feedback format, which aligns with the stated analysis of critique topics and their organization. References discussing the CSV/metadata fields (e.g., rico_id, task, the various rating columns) further corroborate the precise schema and column-level details. Other excerpts describe the broader context and usage (e.g., data collection details and how critiques are collected from annotators), which support the field value’s claims about what dimensions are captured and how critiques are structured, even if they don’t enumerate the exact field names themselves. Some additional sources discuss the UICrit dataset in practice and in relation to design rationale systems, which provides context for why such dimension-specific data is valuable for design reasoning pipelines and potential extensions, mapping to how an LLM training pipeline might ingest such structured multi-dimensional ratings and critique topics.


- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated

### uicrit_dataset_overview
**Confidence:** high

The most relevant passages explicitly describe UICrit as a dataset and outline its core components: a large number of critiques (3,059) tied to 983 mobile UIs, collected from multiple designers, with critiques linked to specific UI regions via bounding boxes and accompanied by quality ratings. This directly matches the claimed public availability, dataset size, linkage to UI regions, and the multimodal/LLM-centric use-case for training/evaluating design critique capabilities. Additional excerpts reinforce these points by detailing data collection in depth, the per-entry fields (e.g., rico_id, tasks, various ratings, and bounding box information), and the existence of a public repository with CSV representations. Excerpts describing the historical rationale capture, IOI-style design rationale systems, or generic discussions of design rationale provide contextual support about related concepts but do not directly substantiate the specific UICrit schema, public availability, or the exact dataset composition, so they are less central to this finegrained field value. The combination of explicit size, structure, provenance (CLAY-derived), linkage to UI regions, and public availability constitutes the strongest support for the field value, with supplementary details from related sources increasing the completeness of the picture.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [Enhancing Automated Design Evaluation with a UICritique ...](https://arxiv.org/abs/2407.08850)
  > by P Duan · 2024 · Cited by 37 — We carried out an in-depth analysis to characterize the dataset's features. We then applied this dataset to achieve a 55% performance gain in
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
  > The source for each comment (human, llm, or both) can be found at its corresponding list index in “comments_source”.
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,

### uicrit_schema_details
**Confidence:** high

The most directly relevant information comes from excerpts that list the exact schema-like fields and their data types. One excerpt enumerates the CSV columns and explicitly names fields such as rico_id, task, aesthetics_rating, learnability, efficiency, usability_rating, design_quality_rating, comments_source, and comments, which align precisely with the requested finegrained field value and show how a UICrit row would be grounded with a bounding box and a list of textual critiques. Another excerpt also notes the presence of the RICO ID and the association of critiques with design dimensions and multiple numeric ratings, mirroring the structure described in the finegrained field value. A third excerpt references the UICrit dataset as containing human-generated critiques, bounding boxes for each critique, and the corresponding design attributes, reinforcing the same schema components. Additional excerpts provide broader context about the UICrit dataset (e.g., UI critique counts, annotator details, and data collection notes) that support the existence and composition of the fields, though they are less prescriptive about exact field names. Together, these excerpts support a structured record with: a unique screen identifier from RICO, the main task description, several numeric quality ratings, a list of critique comments grounded to bounding boxes, and a source indicator for each comment, which matches the finegrained field value’s components.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [UIClip: A Data-driven Model for Assessing User Interface ...](https://dl.acm.org/doi/10.1145/3654777.3676408)
  > Oct 11, 2024 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.
- [Aalto Interface Metrics (AIM) | Adjunct Proceedings of the ...](https://dl.acm.org/doi/abs/10.1145/3266037.3266087)
  > by A Oulasvirta · 2018 · Cited by 88 — CKim DKo M(2026)Criticmate: Stagewise Human–AI Co-Critique in Single-Screen UI EvaluationProceedings of the 2026 CHI Conference on Human Factors in
- [Enhancing Automated Design Evaluation with a UICritique ...](https://arxiv.org/abs/2407.08850)
  > by P Duan · 2024 · Cited by 37 — We carried out an in-depth analysis to characterize the dataset's features. We then applied this dataset to achieve a 55% performance gain in

### current_state_of_design_rationale_research
**Confidence:** high

The most directly supportive materials describe the current and practical state of design rationale practice. Architectural Decision Records (ADRs) are highlighted as a lightweight, widely adopted mechanism to capture decisions and rationale within software engineering, which aligns with the described shift away from heavyweight notations toward pragmatic, developer-friendly methods and integration into broader systems. Related items discuss the broader adoption and best practices for ADRs, reinforcing that this lightweight, embedded approach has become a mainstream alternative to pure design-rationale tools. Historical and evaluative treatments of DRed illustrate how first-generation rationale capture tools influenced practice and how organizations evaluated their effectiveness, supporting the idea that formal tools faced adoption barriers and that contemporary practice favors more integrated approaches. Discussions of IBIS and QOC/DT-style design rationale notations provide the lineage and terminology that modern research references, establishing that while these formal systems are well-understood, the practical adoption has been limited by cognitive overhead and workflow integration challenges. The inclusion of AI-oriented and data-centric angles (e.g., design rationale work embedded in PLM/ALM, and datasets like UICrit) supports the claim that the field is moving toward AI-assisted, ground-grounded, multi-modal and integrated approaches, where rationale is embedded and more easily utilized in real-world pipelines and knowledge networks. Collectively, these excerpts map well to the described landscape: mature formal notations exist, practical adoption is constrained, ADRs have become a de facto standard in software contexts, and AI-enabled, integrated tools and datasets are driving current research directions.

- [Architectural Decision Records](https://adr.github.io/)
  > An Architectural Decision Record (ADR) captures a single AD and its rationale; Put it simply, ADR can help you understand the reasons for a chosen architectural
- [Master architecture decision records (ADRs): Best ...](https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/)
  > Mar 20, 2025 — Architecture decision records (ADRs) help you document and communicate important process and architecture decisions in your engineering projects.
- [Maintain an architecture decision record (ADR)](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)
  > Learn about the benefits of creating an architecture decision record in the design process to document decisions, justifications, and implications.
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [Capturing design rationale](https://www.sciencedirect.com/science/article/abs/pii/S0010448508001899)
  > by R Bracewell · 2009 · Cited by 289 — This is a simple and unobtrusive software tool that allows engineering designers to record their rationale as the design proceeds.
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Elements of Design Space Analysis](https://www.tandfonline.com/doi/abs/10.1080/07370024.1991.9667168)
  > by A MacLean · 1991 · Cited by 1514 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Building a Design-Rationale-Centric Knowledge Network ...](https://www.mdpi.com/2076-3417/13/3/1539)
  > by G Yue · 2023 · Cited by 8 — This study proposes a three-dimensional design knowledge network metamodel, Design Knowledge Semantic Network (DKSN), and a DKSN-based knowledge fusion method.
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international
- [Design rationale](https://grokipedia.com/page/Design_rationale)
  > Design rationale is the representation of the reasoning, arguments, and decisions underlying the creation of an artifact or system, documenting why specific

### analysis_of_historical_design_rationale_systems
**Confidence:** high

The most relevant excerpts directly discuss established design rationale systems and their core outputs. Excerpts describing gIBIS and IBIS establish the fundamental artifact type (argumentation graphs or issue-based maps) and the real-time capture use case, which aligns with the field value’s claim about producing argumentation structures and the narrative of deliberations. Excerpts that elaborate on the QOC/Design Space Analysis notation explain how the rationale is semi-formalized into Questions, Options, and Criteria, which matches the field value’s reference to schema structures. Excerpts about DRed (Design Rationale editor) describe its production of rationale maps and its industrial uptake, directly supporting the field value’s points about outputs, adoption, and value in engineering contexts. Excerpts mentioning PHI/JANUS/PHIDIAS provide supplementary schema-context about coupling rationale to artifacts and critic-based linking, which reinforces the claim about schema structures and integration with design objects. Excerpts discussing broader design rationale literature (design rationale, gIBIS history, and IBIS lineage) support the historical and theoretical grounding of these systems and provide explicit details about their strengths and limitations, which correspond to the field value’s sections on successes and failures. Taken together, the most relevant content paints a coherent picture: these systems generate structured rationales (graphs, maps, or semi-formal design spaces), have had mixed adoption due to cognitive and operational overhead, and rely on explicit schema elements (issues, positions, arguments; questions, options, criteria; and artifact-linked rationale) that map well to training data pipelines needing explicit, traceable reasoning structures.

- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [Design rationale](https://grokipedia.com/page/Design_rationale)
  > Design rationale is the representation of the reasoning, arguments, and decisions underlying the creation of an artifact or system, documenting why specific
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [Questions-Options-and-Criteria-Elements-of-Design-Space ...](https://www.researchgate.net/profile/Victoria_Bellotti/publication/233367028_Questions_Options_and_Criteria_Elements_of_Design_Space_Analysis/links/00b7d53211940ad48e000000/Questions-Options-and-Criteria-Elements-of-Design-Space-Analysis.pdf)
  > Design rationale is important because an artifact needs to be understood by a wide variety of people who have to deal with it. This variety of people ranges.
- [Designing Effective Knowledge Networks](https://sloanreview.mit.edu/article/designing-effective-knowledge-networks/)
  > by K Pugh · 2013 · Cited by 317 — By paying careful attention to eight dimensions of network design, leaders of knowledge networks can facilitate desired behaviors and outcomes.
- [Master architecture decision records (ADRs): Best ...](https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/)
  > Mar 20, 2025 — Architecture decision records (ADRs) help you document and communicate important process and architecture decisions in your engineering projects.

### mapping_schemas_to_llm_training_needs
**Confidence:** high

The most directly relevant passages describe UICrit as a dataset with a structured schema that includes image data (UI screenshots), natural language critiques, bounding boxes (regions), and multiple scalar ratings for aesthetics, learnability, efficiency, usability, and overall design quality. This directly supports the claim that UICrit provides structured multimodal nodes and grounded references that can train multimodal LLMs and reward models. Additional passages enumerate the specific fields (task labels, region coordinates, and per-UI metadata) that are essential for aligning visual content with textual critiques and quantitative scores, which matches the described need for an ideal training corpus containing structured nodes, rich language, and grounded artifact references. Beyond UICrit, several sources describe design rationale capture systems and their output formats—QOC (Questions, Options, Criteria) and IBIS (Issues, Positions, Arguments)—and how these schemas map to programmatic or machine-readable representations such as JSON or RDF. These excerpts illustrate how the design-space reasoning notation aligns with prompts and structured data representations used for training models in deliberative tasks, including the explicit linkages to artifacts and decisions. They also discuss DRed and related evaluations, reinforcing the point that historical design rationale systems provide a blueprint for structured reasoning in training pipelines. Collectively, these excerpts corroborate the claim that UICrit’s schema is well-suited for multimodal LLM training and that historical rationale schemas offer complementary structured templates that can be serialized and integrated into learning pipelines. The remaining excerpts expand on the origins and evolution of these notations, detailing gIBIS/IBIS, QOC, and related tools, which reinforces the idea of mapping traditional rationale models to modern data representations and training workflows.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > The source for each comment (human, llm, or both) can be found at its corresponding list index in “comments_source”.
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [Capturing design rationale](https://www.sciencedirect.com/science/article/abs/pii/S0010448508001899)
  > by R Bracewell · 2009 · Cited by 289 — This is a simple and unobtrusive software tool that allows engineering designers to record their rationale as the design proceeds.
  > by R Bracewell · 2009 · Cited by 289 — Case study of design rationale capture using DRed. The best way to describe the functionality and interface of DRed is to use the example of a real case
  > Section 2 describes the background on design rationale capture.
  > Section 3, an answer to question (1) is provided by presenting the underlying concepts, major features and typical applications of DRed using a worked example from RR.
- [Elements of Design Space Analysis](https://www.tandfonline.com/doi/abs/10.1080/07370024.1991.9667168)
  > by A MacLean · 1991 · Cited by 1514 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for team design deliberation](https://dl.acm.org/doi/10.1145/317426.317444)
  > gIBIS: a hypertext tool for team design deliberation ... Conklin, J., "The Capture of Design Rationale". Paper in progress, to be MCC TR in fall of 1987.
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [Building a Design-Rationale-Centric Knowledge Network ...](https://www.mdpi.com/2076-3417/13/3/1539)
  > by G Yue · 2023 · Cited by 8 — This study proposes a three-dimensional design knowledge network metamodel, Design Knowledge Semantic Network (DKSN), and a DKSN-based knowledge fusion method.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.

### report_summary
**Confidence:** medium

The finegrained field value describes a detailed comparison between the modern UICrit dataset and historical design rationale capture systems (such as IBIS, QOC, and DRed), including concrete dataset specifics (size, schema, bounding boxes, and task-oriented design critiques) and the evolution toward lightweight successors like ADRs. The most directly relevant excerpts provide explicit, concrete details about UICrit: its dataset contents and structure (human-generated natural language critiques linked to UI regions via bounding boxes, with fields such as rico_id, task, aesthetics_rating, learnability, efficiency, usability_rating, design_quality_rating, and comments sources), and the exact counts and collection process (3,059 critiques, 983 UI screens, seven designers). These passages also describe the CSV/flat-schema nature of the dataset and how the critiques map to UI metadata, which aligns with the field’s emphasis on a practical training/input schema for models. Additional excerpts outline the historical DR systems (IBIS, QOC) and their design-space or argumentation semantics (Issues, Positions, Arguments; Questions, Options, Criteria), which supports the comparative aspect of the field value. Other excerpts touch on related design-rationale tools (DRed) and the more recent Architectural Decision Records (ADRs) as a pragmatic successor, which supports the evaluative portion of the field value describing what was captured, what failed, and what evolved in practice. Collectively, these excerpts substantiate the claim that UICrit represents a modern, large-scale, grounded dataset for UI critique with a relatively flat schema, while historical DR systems offered richer semantic structures for deliberation but faced adoption challenges, and ADRs represent a lighter-weight, contemporary alternative in software engineering. This combination directly supports the field value’s core points: the nature and scope of UICrit, its design for training critique models, the contrast with DR approaches, and the practical adoption trajectory toward ADRs.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [Enhancing Automated Design Evaluation with a UICritique ...](https://arxiv.org/abs/2407.08850)
  > by P Duan · 2024 · Cited by 37 — We carried out an in-depth analysis to characterize the dataset's features. We then applied this dataset to achieve a 55% performance gain in
- [Capturing design rationale](https://www.sciencedirect.com/science/article/abs/pii/S0010448508001899)
  > by R Bracewell · 2009 · Cited by 289 — This is a simple and unobtrusive software tool that allows engineering designers to record their rationale as the design proceeds.
- [Elements of Design Space Analysis](https://www.tandfonline.com/doi/abs/10.1080/07370024.1991.9667168)
  > by A MacLean · 1991 · Cited by 1514 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been

### conclusion_and_future_directions
**Confidence:** high

The field value describes a historical-to-modern shift in design rationale research: early, comprehensive but costly capture systems (such as IBIS and QOC) gave way to lightweight, pragmatic successors (ADRs) that became widely adopted in software engineering during 2015–2025 due to low overhead, text-based capture, and practicality. It also notes a current AI-driven resurgence, where datasets like UICrit and knowledge-network integrations (e.g., DKSN) enable automated analysis and embedding of rationale into broader systems. The excerpts support these claims in several ways: the discussion of IBIS as an early explicit design rationale representation and its adoption challenges highlights why modern approaches sought lower-cost alternatives (noting that DRed and QOC are described as influential design-space notations and capture tools); references to QOC and Design Space Analysis establish the lineage of rationale notation and its role in structuring decisions and criteria; explicit mentions of ADRs as a practical, widely adopted artifact in software engineering during the past decade reinforce the claimed shift to lightweight, durable artifacts. The sources on gIBIS and gIBIS-like tools illustrate the evolution of tooling from hypertext-based exploration to broader rationale capture frameworks. The DKSN line of work represents a contemporary move toward integrating design rationale into knowledge networks, indicating the field’s expansion beyond standalone tools toward interconnected representations. The DRed-related discussions provide a progression from early, formal tools to deployment and ongoing evaluation in industry. Finally, the ADR and related best-practice materials emphasize a modern, pragmatic approach that has become a standard in practice, aligning with the field’s move toward more scalable, usable capture methods. Together, these excerpts map a coherent narrative: the field started with high-overhead systems that hindered adoption, evolved toward practical artifacts like ADRs, and now embraces AI-enabled and graph-based knowledge integration to scale design rationale in real-world pipelines. The future directions outlined—hybrid data ontologies, semi-automated authoring via AI, outcome-driven rationale, expanded scope to multi-screen contexts—are directly reflected in the cited discussions of ontology-like structures (DKSN), AI-assisted critique datasets (UICrit), and the integration of rationale into DevOps/toolchains, signaling a shift from isolated design rationale capture to embedded, machine-assisted reasoning in practice.

- [Master architecture decision records (ADRs): Best ...](https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/)
  > Mar 20, 2025 — Architecture decision records (ADRs) help you document and communicate important process and architecture decisions in your engineering projects.
- [Maintain an architecture decision record (ADR)](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)
  > Learn about the benefits of creating an architecture decision record in the design process to document decisions, justifications, and implications.
- [Building a Design-Rationale-Centric Knowledge Network ...](https://www.mdpi.com/2076-3417/13/3/1539)
  > by G Yue · 2023 · Cited by 8 — This study proposes a three-dimensional design knowledge network metamodel, Design Knowledge Semantic Network (DKSN), and a DKSN-based knowledge fusion method.
- [Building a Design-Rationale-Centric Knowledge Network ...](https://www.researchgate.net/publication/367410886_Building_a_Design-Rationale-Centric_Knowledge_Network_to_Realize_the_Internalization_of_Explicit_Knowledge)
  > Jan 8, 2023 — To address this issue, this study proposes a three-dimensional design knowledge network metamodel, Design Knowledge Semantic Network (DKSN), and
- [Elements of Design Space Analysis](https://www.tandfonline.com/doi/abs/10.1080/07370024.1991.9667168)
  > by A MacLean · 1991 · Cited by 1514 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [Design rationale](https://grokipedia.com/page/Design_rationale)
  > Design rationale is the representation of the reasoning, arguments, and decisions underlying the creation of an artifact or system, documenting why specific
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international

### uicrit_critique_collection_and_annotation
**Confidence:** high

The most relevant content clearly states that UICrit consists of a targeted dataset of thousands of design critiques collected from a small group of professional designers, with a defined two-week data collection window and a process that culminates in a subset of screens that are fully annotated. Specifically, we have confirmation that seven designers contributed critiques and ratings, and that after a two-week collection phase, clean annotations were obtained for 983 UI screens, out of an initial sampling of 1,000 UIs, yielding 3,059 critiques in total. This directly maps to the finegrained field’s annotator_profile and annotation_methodology details, and the 983 fully annotated screens aligns with the summarized methodology. The excerpts also corroborate the use of a rubric to gauge aesthetics, usability, and overall design quality, which matches the referenced guidelines and the structure implied in the finegrained field. The existence of binding metadata such as the RICO ID and bounding box coordinates for critique regions, along with multi-dimensional ratings, supports the referenced_guidelines and the annotation workflow, indicating a standardized and multi-part evaluation process. Moreover, references to the integration of large language model-generated critiques, which were then validated by human annotators (a key piece of the llm_critique_integration portion), align with the claimed validation outcomes and the 13.1% validity figure described in the field value. The GitHub-hosted dataset pages further reinforce the practical availability and schema aspects (e.g., CSV columns listing rico_id, task, various ratings, and comments) that underpin the described annotation schema. Finally, the broader context notes the existence of the UICrit dataset and related publications, supporting the ongoing design rationale discussion and successors within the 2015-2025 window.

In summary, the most directly supportive content confirms: (a) seven professional designers as annotators, (b) a two-week, multi-step annotation process leading to 983 fully annotated screens out of 1,000 sampled, (c) the use of established guidelines for standardization, (d) the augmentation of human critiques with LLM-generated comments subsequently validated by humans, and (e) concrete data schema elements like bounding boxes, RICO IDs, and per-criterion ratings reflected in the GitHub data and CSV structure.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at

### uicrit_follow_on_research
**Confidence:** medium

The most directly relevant excerpt states that stagewise human–AI co-critique in CHI 2026 builds on the UICrit dataset and uses it as a foundation for stagewise human–AI collaboration to critique UIs. This directly substantiates the claim about follow-on work leveraging UICrit as a basis for new co-critique pipelines. Another excerpt confirms the existence and core content of UICrit as a dataset, which underpins the claim that subsequent research can build upon it. Additional excerpts describe the UICrit dataset’s columns and accessible metadata, reinforcing that the dataset is a structured resource that follow-on research can utilize. The excerpt mentioning UICrit Dataset in the context of a public repository and its described contents provides supporting context that follow-on research can reference the same data source. An excerpt referencing UIClip’s role as a model for assessing UI design quality and its relation to data-driven approaches suggests that UIClip represents a line of research where UICrit can be leveraged for training and evaluation, aligning with the described use in the field value. Collectively, these excerpts establish that Stagewise co-critique and UIClip are connected to UICrit as a data resource and as a foundation for subsequent methods in design critique and evaluation.

- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
- [UIClip: A Data-driven Model for Assessing User Interface ...](https://dl.acm.org/doi/10.1145/3654777.3676408)
  > Oct 11, 2024 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.

### comparative_analysis_of_approaches
**Confidence:** high

The finegrained field value describes a clear distinction between UICrit and historical design rationale systems. Excerpts that describe UICrit emphasize a flat, tabular data structure: a single CSV with per-UI critiques, including fields such as rico_id, task, various ratings, bounding box groundings, and a direct ground between critiques and UI regions. This supports the claim that UICrit is designed for evaluation/critique outcomes and is simple, table-like in structure, and immediately usable for supervised learning or reward modeling. The accompanying excerpts about UICrit also note the existence of bounding boxes and the grounding of critiques to image regions, reinforcing the idea that its data relationships are implicit to the UI rather than deeply structured as nodes and links in a graph. In contrast, excerpts about IBIS, QOC, and DRed describe design rationale capture as process-focused, graph-based representations with explicit nodes and links (Issues, Positions, Arguments for IBIS; Questions, Options, Criteria for QOC). These excerpts illustrate that historical systems aim to capture the reasoning process and the rationale behind decisions, preserving the “why” and the argumentative structure, rather than producing post-hoc evaluations tied to a single artifact. Additional excerpts discuss the adoption challenges and the specific strengths/weaknesses of graph-based rationale tools (high cognitive overhead, authoring cost, risk of overly complex maps), which further supports the contrast with UICrit’s flat, evaluation-oriented data schema. The entry describing the UICrit dataset’s CSV schema explicitly lists fields like rico_id, task, aesthetics_rating, usability_rating, design_quality_rating, comments, and a bounding box grounding for each critique, directly supporting the claim that UICrit’s core data structure is flat and ground-traced to UI regions, oriented toward output-quality assessment rather than structured design rhetoric graphs. Other excerpts describe the RICO linkage to screenshots and metadata, underlining the explicit grounding of critiques to visual artifacts, which reinforces the field value’s point about UICrit’s design goals and data arrangement. The historical rationale sources confirm that IBIS and QOC frameworks, as well as tools like DRed, were designed to encode deliberation processes with explicit relationships, which is conceptually opposite to UICrit’s evaluation-focused, ground-truthing approach. Taken together, the most directly supportive content centers on UICrit’s flat CSV, grounding to UI regions, and evaluation focus, while the most relevant contrastive content centers on the graph-based, rationale-capture nature of IBIS/QOC and their associated adoption challenges and structural characteristics.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [Elements of Design Space Analysis](https://www.tandfonline.com/doi/abs/10.1080/07370024.1991.9667168)
  > by A MacLean · 1991 · Cited by 1514 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [gIBIS: a hypertext tool for team design deliberation](https://dl.acm.org/doi/10.1145/317426.317444)
  > gIBIS: a hypertext tool for team design deliberation ... Conklin, J., "The Capture of Design Rationale". Paper in progress, to be MCC TR in fall of 1987.
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

- [Design rationale](https://grokipedia.com/page/Design_rationale)
  > Design rationale is the representation of the reasoning, arguments, and decisions underlying the creation of an artifact or system, documenting why specific
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [Architectural Decision Records](https://adr.github.io/)
  > An Architectural Decision Record (ADR) captures a single AD and its rationale; Put it simply, ADR can help you understand the reasons for a chosen architectural

### uicrit_known_limitations
**Confidence:** medium

- The text states that UICrit is a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, which directly evidences the limitation related to a small annotator pool and limited diversity of feedback. This supports the category concerning dataset scope and the methodology constraint of having a small designer pool.
- The description that each UI screen entry includes the RICO ID, metadata, the main task, bounding box coordinates, and multiple numerical ratings across aesthetics, usability, efficiency, etc., demonstrates the concrete scope of data collected and the types of critiques captured, which aligns with the described limitations about the dataset’s scope and what it covers or omits (e.g., dynamic interactions not captured by single-screen data).
- The mention that the dataset was built from a defined set of UI screens and includes bounding boxes for critiques provides a concrete basis for understanding the static, screen-at-a-time nature of the data, supporting the relevance of static-single-screen limitation in the field value.
- The excerpts that describe the dataset’s collection process and scale (e.g., two-week data collection with seven annotators working full-time to obtain clean annotations for 983 screens) corroborate the notion of a limited, highly controlled annotation process, which is part of the limitations related to methodology and potential coverage gaps.
- While the excerpts confirm some aspects (annotator count, dataset size, and data fields), they do not cover every item in the described limitations (e.g., explicit hallucination rates from LLM-based augmentation or in-practice deployment). Therefore, the reasoning ties to the aspects directly evidenced by the excerpts and recognizes partial support for the full set of claimed limitations.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated

### recent_successors_to_rationale_systems_2015_2025.practice_name
**Confidence:** high

The target field value is Architecture Decision Records (ADRs). The most directly supportive content defines what an Architectural Decision Record is and its purpose: capturing a single architectural decision and its rationale helps understand the reasons for a chosen design. This directly aligns with ADRs as the primary concept. Next, guidance on master ADR practices and best practices for effective decision-making reinforces how ADRs are used in real projects to document decisions, communications, and the implications of choices, which is precisely what ADRs aim to accomplish. The third excerpt explicitly discusses maintaining ADRs, including documenting decisions, justifications, and implications, which further supports the notion and utility of ADRs in design rationale work. The fourth excerpt, while about design rationale research under uncertainty, provides contextual surface-level information about the challenges of capturing rationale and may connect to the broader field but does not directly define ADRs or their practice; it supplements the understanding of rationale capture in relation to ADRs.

- [Architectural Decision Records](https://adr.github.io/)
  > An Architectural Decision Record (ADR) captures a single AD and its rationale; Put it simply, ADR can help you understand the reasons for a chosen architectural
- [Master architecture decision records (ADRs): Best ...](https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/)
  > Mar 20, 2025 — Architecture decision records (ADRs) help you document and communicate important process and architecture decisions in your engineering projects.
- [Maintain an architecture decision record (ADR)](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)
  > Learn about the benefits of creating an architecture decision record in the design process to document decisions, justifications, and implications.
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than

### uicrit_potential_for_extension
**Confidence:** medium

The finegrained field value posits several concrete extension opportunities for the UICrit dataset, including multimodal fine-tuning with LLMs, exploring input modalities (screenshots alone vs. screenshots with XML view hierarchies), increasing annotator diversity, expanding UI coverage with multi-screen flows and task traces, adding richer metadata (widget types, view hierarchy linkages, critique severity, rationale attributes), and introducing counterfactual ‘fix’ proposals for supervised training of design models. The most directly supportive excerpts describe the core composition and schema of UICrit: a dataset of hundreds of UI screens with thousands of critiques, bounding boxes for each critique, and associated UI metadata such as the RICO screen ID, the main task, and multiple rating dimensions (aesthetics, learnability, efficiency, usability, design quality). This establishes that the dataset has a concrete, extensible structure and clearly documented fields (e.g., rico_id, task, various ratings, comments_source, comments with bounding boxes), which is a necessary foundation for any proposed extension. Additional excerpts confirm that the dataset is indeed used as a source for subsequent research and practical UI critique work, which supports the notion that extending it (e.g., for multimodal training or richer provenance) would be feasible and potentially valuable. Specific phrases like the CSV columns listing inputs and ratings, and the existence of a public UICrit CSV file, underscore the concrete, extensible data schema. Together, these excerpts substantiate that UICrit has concrete, well-described contents and a documented data schema, enabling the kinds of extensions described in the field value. The Stagewise and UI critique-related references further illustrate practical uses of UICrit in downstream tasks, reinforcing the plausibility of extending the dataset for advanced modeling or evaluation tasks. These connections collectively support the idea that the proposed extensions are grounded in the dataset’s current structure and documented capabilities, even if they do not enumerate every proposed extension verbatim in the excerpts themselves.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated

### recent_successors_to_rationale_systems_2015_2025.description
**Confidence:** high

The most relevant excerpt directly defines an Architectural Decision Record (ADR) as a record capturing a single architectural decision and its rationale, including the why behind the decision and the context and consequences. This aligns with the finegrained field value’s core claim about ADRs being lightweight documents that justify decisions and document rationale for future team members. The next excerpt reinforces this by describing ADRs as documents that capture and communicate important process and architecture decisions, highlighting documentation of decisions, justifications, and implications. The third excerpt explicitly discusses maintaining ADRs and the benefits of documenting decisions and their implications, which supports the practical aspects of ADR usage described in the field value. The fourth excerpt, while about design rationale research, provides broader context on rationale capture but is less directly about ADRs themselves, making it the least specific but still related to the overarching topic of rationale in design decisions.

- [Architectural Decision Records](https://adr.github.io/)
  > An Architectural Decision Record (ADR) captures a single AD and its rationale; Put it simply, ADR can help you understand the reasons for a chosen architectural
- [Master architecture decision records (ADRs): Best ...](https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/)
  > Mar 20, 2025 — Architecture decision records (ADRs) help you document and communicate important process and architecture decisions in your engineering projects.
- [Maintain an architecture decision record (ADR)](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)
  > Learn about the benefits of creating an architecture decision record in the design process to document decisions, justifications, and implications.
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than

### uicrit_schema_details.comments_source
**Confidence:** high

The finegrained field defines the origin of each design comment, with possible values indicating human authorship, LLM authorship, or a combination validated by humans. The most directly relevant excerpt explicitly names the field comments_source and explains that each item specifies the source of its corresponding comment, listing the possible sources as human, llm, and both. This provides exact alignment with the field value and its semantics. The accompanying excerpts describe related aspects of UICrit (such as the presence of design critiques, bounding boxes, and various ratings) which help corroborate the overall dataset context but do not redefine the origin field themselves; they support understanding of what the comments and related annotations encompass, which helps confirm the field’s role within the dataset schema.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,

### uicrit_design_dimensions_covered.rating_dimensions
**Confidence:** high

The field value describes a multi-layered rating schema for UI design quality, where several quantitative dimensions are defined and decomposed. The most directly supportive excerpt explicitly enumerates the schema: it lists each rating column, including aesthetics_rating, learnability, efficiency, usability_rating, and design_quality_rating, and notes that these ratings form the basis for an overall design quality measure. This excerpt also mentions that the design_quality_rating is a composite of usability and aesthetics, which aligns with the described decomposition. A second closely related excerpt reinforces this by stating that data includes a set of numerical ratings along various dimensions, including aesthetics, usability, and the overall design quality. A third excerpt complements these by describing that the UI Critique dataset includes the main task, a set of design critiques with bounding box coordinates, and numerical ratings across dimensions such as aesthetics, usability, and overall design quality. Collectively, these excerpts confirm the structure where an overall design_quality_rating is decomposed into aesthetics_rating and usability_rating, with usability further broken into learnability and efficiency, matching the finegrained field value. Additional excerpts provide context about the dataset, its origin, and how critiques and ratings are collected, which corroborates the existence and use of such a multi-faceted rating system in UICrit, though they are less focused on the exact schema details and scales. Overall, the most relevant material directly supports the exact field composition and the scale relationships implied by the field value, while supporting excerpts provide corroborating details about the dataset and its evaluation dimensions.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated

### uicrit_design_dimensions_covered.critique_topic_clusters
**Confidence:** medium

The most relevant content directly confirms the existence of design-dimension annotations such as aesthetics, learnability, usability, and overall design quality, which aligns with the claim that visual design and learnability topics are strongly covered in the critique comments. It also notes that critiques come with bounding box coordinates referencing UI regions, which supports a structured, location-based critique representation. Additional relevant passages describe the dataset as containing thousands of critiques with quality ratings, and that critiques are tied to UI screens via RICO, which supports the claimed comprehensive coverage and data collection process. Although the excerpts confirm the presence of design dimensions and structured critiques, they do not explicitly state that the critiques are organized strictly according to Sadler's feedback format (expected standard, observed gap, suggestion to close the gap). Therefore, the evidence strongly supports coverage of visual design and learnability, and the existence of a structured critique representation (bounding boxes and ratings), but leaves some ambiguity around the exact Sadler-format claim. The combination of these points supports the fine-grained field value to a medium level of confidence, given the strong direct evidence for some aspects and partial or indirect evidence for the others.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,

### recent_successors_to_rationale_systems_2015_2025.comparison_to_classic_systems
**Confidence:** medium

Architectural Decision Records are described as records capturing a single architectural decision and its rationale, which directly aligns with the notion of documenting decisions rather than building a complex graph. This supports the idea that ADRs serve as a lightweight, decision-centric artifact compared with heavier, graph-based argumentation systems. Further, guidance on maintaining ADRs and best practices emphasizes documenting and communicating important decisions and their justifications within projects, which reinforces the practical, decision-focused nature of ADRs and their integration into engineering workflows. The broader design rationale literature note that capturing rationale is challenging, which provides context for why ADRs may be favored for pragmatic and lightweight documentation in agile environments. The design rationale article about uncertainty is more about the general challenges of capturing rationale and is less directly supportive of ADRs themselves, but it frames the overall context in which ADRs exist.

- [Architectural Decision Records](https://adr.github.io/)
  > An Architectural Decision Record (ADR) captures a single AD and its rationale; Put it simply, ADR can help you understand the reasons for a chosen architectural
- [Master architecture decision records (ADRs): Best ...](https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/)
  > Mar 20, 2025 — Architecture decision records (ADRs) help you document and communicate important process and architecture decisions in your engineering projects.
- [Maintain an architecture decision record (ADR)](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)
  > Learn about the benefits of creating an architecture decision record in the design process to document decisions, justifications, and implications.
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than

### uicrit_schema_details.learnability_rating
**Confidence:** medium

The most directly relevant excerpt explicitly lists the dataset schema, including a field described as a numerical rating for learnability on a defined scale, which directly corroborates the existence of a learnability_rating field and its 1-5 scale. This aligns with the target field path requiring a learnability_rating value. Additional excerpts corroborate the broader rating framework (aesthetics, usability, overall design quality) and describe the dataset composition (UI screens, critiques with bounding boxes, and numerical ratings), which helps corroborate that learnability is among multiple ratings captured by UICrit. Some excerpts also mention the dataset’s construction details (e.g., main task, bounding boxes, and the existence of human-generated critiques), which provide supporting context for how such a learnability_rating would be obtained and interpreted within the overall schema. However, none of the excerpts independently confirms the exact numeric value of 3.0 for learnability_rating; they collectively establish that a learnability_rating field exists, uses a 1-5 scale, and is part of a broader set of design-quality ratings.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UIClip: A Data-driven Model for Assessing User Interface ...](https://dl.acm.org/doi/10.1145/3654777.3676408)
  > Oct 11, 2024 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.

### uicrit_schema_details.efficiency_rating
**Confidence:** high

The target field is an efficiency rating within the UICrit schema, represented as a numerical score on a defined scale. The most relevant excerpt presents a concrete schema fragment where the efficiency of a UI screen is captured as a numerical rating on a 1-5 scale, labeled with a field that corresponds to efficiency. This excerpt also shows the exact nature of the metric (efficiency) and its rating range, which directly informs how a value of 3.0 should be interpreted within the same schema. Although there is a minor spelling variation in the field name (efficency vs efficiency), the semantic meaning is the same and the surrounding description clearly ties the rating to the UI screen’s efficiency. The other excerpts discuss related design quality dimensions (aesthetics, usability, overall design) or provide general context about UICrit data collection, but do not directly specify an efficiency rating schema or its scale, making them less directly supportive of the specific field value.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co

### analysis_of_historical_design_rationale_systems.1
**Confidence:** high

The finegrained field value indicates that QOC (Questions-Options-Criteria) is a semi-formal design-space analysis notation used to represent and compare design alternatives, emphasizing reusable and comparative reasoning rather than a narrative. The excerpt describing Design Space Analysis explains that it uses a semiformal notation with key elements (Questions, Options, and Criteria) to structure design space analysis and connect Criteria to Options, which directly supports the asserted schema structure and purpose. Another excerpt explicitly states that QOC represents the argumentation as questions, options, and criteria for choosing options and is a recognized design rationale notation. A third excerpt discusses Design Space Analysis in detail, including its role in capturing and comparing design alternatives and the cognitive overhead associated with rationalized structures, which aligns with the claimed adoption limitations and utility. Taken together, these excerpts corroborate the field value’s claims about QOC/Design Space Analysis, their produced artifacts, and their practical adoption challenges, as well as the stated schema components (Questions, Options, Criteria) and their role in design rationale.

- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions-Options-and-Criteria-Elements-of-Design-Space ...](https://www.researchgate.net/profile/Victoria_Bellotti/publication/233367028_Questions_Options_and_Criteria_Elements_of_Design_Space_Analysis/links/00b7d53211940ad48e000000/Questions-Options-and-Criteria-Elements-of-Design-Space-Analysis.pdf)
  > Design rationale is important because an artifact needs to be understood by a wide variety of people who have to deal with it. This variety of people ranges.

### uicrit_schema_details.usability_rating
**Confidence:** high

The most directly relevant information describes the usability_rating as a numerical rating with a defined scale. One excerpt states that usability_rating is a numerical rating on a scale of 1-10, which directly establishes the valid value range and interpretation for an 8.0 usability score within this dataset. This provides the essential context for evaluating or interpreting a specific usability rating value. Another excerpt explains that the data collection yielded clean annotations for UI screens and includes a set of design critiques with numerical ratings along various dimensions, including usability, which confirms that usability is indeed quantified alongside other metrics and that values like 8.0 would be placed within the same evaluative framework. Additional excerpts expand on the dataset contents by noting the main task each UI screen is designed for and the presence of design critiques with bounding boxes and numerical ratings, reinforcing that usability is one of several structured, numeric quality indicators captured in the dataset. Further excerpts summarize the dataset’s scope, including the total number of critiques and the fact that these ratings cover usability among other dimensions, which again situates an 8.0 value within the intended design-evaluation schema. A concluding excerpt describes the broader work on UICrit, including the size of the critique set and the inclusion of rated usability, which corroborates the consistency and applicability of the usability_score across the dataset. Taken together, these excerpts consistently support that usability_rating is a numeric field on a 1-10 scale, and that an 8.0 value would be interpreted within this framework as a relatively high usability assessment within the UICrit design critique corpus.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.

### analysis_of_historical_design_rationale_systems.2
**Confidence:** high

The extract about DRed notes that the system was initially aimed at capturing design rationale and later broadened to function as a comprehensive problem management tool within engineering contexts, which directly aligns with the field value’s claim that DRed outputs rationale maps linked to specific engineering problems and serves broader management purposes. The mention of DRED 2.0 indicates an evolution of the method and tooling for capturing and communicating design knowledge deliberated during technical product creation, supporting the field value’s assertion of a successor version and continued refinement. A discussion of design rationale research indicating capture remains a key difficulty while acknowledging adoption challenges provides a balanced context, reinforcing that while DRed has notable industrial uptake, there are broader concerns about capturing and operationalizing design rationale in practice. Supplemental excerpts about gIBIS, IBIS, and QOC underscore the lineage and environmental context in which DRed sits (graph-based IBIS-inspired structures for capturing design rationale), supporting the field value’s structural and schema-related aspects by illustrating the family of systems DRed emerges from and relates to. Together, these excerpts corroborate that DRed and its successor, DRed 2.0, produced rationale-linked knowledge artifacts with practical industrial adoption, while also situating its design within IBIS-inspired, graph-based schemas common to design rationale tools and highlighting ongoing adoption and capture challenges in practice.

- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by

### uicrit_critique_collection_and_annotation.annotator_profile
**Confidence:** medium

The most directly supportive excerpt states that data was collected from seven designers, each with at least a year of professional experience, which aligns with the notion of seven professional designers with some minimum experience. The second excerpt notes that seven annotators completed full-time data collection and produced clean annotations, reinforcing the involvement of seven individuals in the annotation process, though it does not quantify their exact years of experience. Together, these excerpts support the idea that a small team of designers performed the collection and annotation, with at least minimal professional experience, but they do not provide the upper bound of 16 years explicitly. The other excerpts describe dataset contents and processes but do not speak to the annotator profiles, so they are less relevant for this specific field value.


- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.

### uicrit_follow_on_research.1
**Confidence:** high

The finegrained field value describes UIClip (a UI design assessment model) released at UIST 2024 and frames UICrit as part of a broader ecosystem for training and evaluating automated UI analysis models. Excerpts that explicitly reference UIClip confirm the existence and role of this model within the UI design evaluation landscape, aligning with the field value’s statement about follow-on research and model development leveraging UICrit. Additionally, excerpts that detail the UICrit dataset—its size, the nature of critiques, ratings, and how it has been used to inform UI evaluation—support the claim that UICrit serves as a foundational dataset for subsequent models and research pipelines. These together establish both the existence of UIClip as part of UI evaluation tooling and the functional relevance of UICrit to downstream research and model training/assessment tasks. Specifically, content describing a targeted dataset of design critiques and quality ratings, and the description of how UICrit is used to enhance automated design evaluation, directly corroborate the pathways by which UIClip and related follow-on research can leverage UICrit for training and evaluation. The excerpt detailing UIClip as a data-driven model for assessing UI quality and relevance provides direct evidence of the claimed model and its UI-focused application, which is central to the field value. The remaining excerpts elaborating the UICrit dataset’s structure (critiques, bounding boxes, and multiple ratings) supply additional context on the dataset’s richness and its suitability for training complex design-reasoning models, further supporting the claim of an ecosystem where UIClip and similar systems build upon UICrit.


- [UIClip: A Data-driven Model for Assessing User Interface ...](https://dl.acm.org/doi/10.1145/3654777.3676408)
  > Oct 11, 2024 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.
- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co

### uicrit_schema_details.task
**Confidence:** high

The core finegrained field value is the description of the main task the UI screen is designed to accomplish, as annotated by professional designers. The most relevant excerpts directly state that the dataset includes a field describing the main task for each UI screen. For example, one excerpt notes that the CSV columns include a 'task' entry that represents the main task the UI screen is designed for. Another excerpt explicitly describes that the data for each UI screen includes the main task the UI screen is designed for, along with a set of design critiques and various ratings. These passages directly map to the intended field value by identifying or defining the main task associated with each screen. A third excerpt references the presence of the UI Crit dataset containing natural language design critiques and bounding boxes for each critique, which is contextually connected to the notion of documenting design-related information about UI screens, though it does not restate the task field itself. Taken together, these excerpts provide clear support for identifying a field that captures the task description, as annotated by designers, with the strongest support coming from explicit mentions of the task field and its purpose.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,

### uicrit_follow_on_research.0
**Confidence:** high

The most relevant excerpt directly states a Stagewise Human–AI Co-Critique in Single-Screen UI and notes that the UICrit dataset was used, which aligns with the field value describing a co-critique pipeline leveraging UICrit. Additional excerpts describe the UICrit dataset itself, including the number of design critiques, ratings, and the collection process from designers, which supports understanding what the dataset contains and how it could underpin a co-critique system. Other UICrit-focused excerpts detail the dataset’s schema and annotations (e.g., critiques, bounding boxes, and various design quality metrics), which are precisely the type of schema/content that would be relevant for mapping to an LLM training or evaluation pipeline in a design rationale context. An excerpt on a UI assessment model, while related to UI evaluation, is less directly tied to the Stagewise co-critique framing but still provides contextual background about using UI datasets for critique-like tasks. Collectively, these excerpts support the claim that Stagewise Human–AI co-critique work is built on or alongside the UICrit dataset and related design critique resources, and they illuminate the dataset’s composition and potential utility for extended design rationale research.

- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co

### analysis_of_historical_design_rationale_systems.0
**Confidence:** medium

The fine-grained field value centers on IBIS and its gIBIS extension, specifically what artifacts these systems produce, how they are adopted in practice (including benefits and barriers), the successes and failures in capturing design rationale, and the explicit description of the underlying schema (issues, positions, arguments, and their links). Excerpts describing gIBIS as a hypertext tool to capture early design deliberations and to produce issue-based discussion maps directly map to the claimed output artifacts and the emphasis on preserving the narrative and process of design discussions. Statements about adoption in practice—benefits like improved team memory and decisions trackings and challenges such as high cognitive overhead, complexity of maps, need for facilitator, and limited organization-wide adoption—align with the described successes and failures. The excerpt that outlines the IBIS/gIBIS output as argumentation graphs, with discussions organized around issues, positions, and arguments, provides a direct match to the claimed schema. Additional excerpts that discuss related works on design rationale (e.g., QOC) and broader contextual definitions of design rationale give supportive context, clarifying how these systems relate to broader design-rationale methodologies and how their schemas map to needs of an LLM training pipeline. Taken together, the most relevant pieces directly corroborate the existence of outputs (argumentation graphs, issue/position/argument structure), direct experiences of adoption and its limitations, and the formal schema, while related systems and definitional discussions provide necessary context to situate IBIS/gIBIS within the broader field of design rationale research. 

- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [Design rationale](https://grokipedia.com/page/Design_rationale)
  > Design rationale is the representation of the reasoning, arguments, and decisions underlying the creation of an artifact or system, documenting why specific
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An

### uicrit_critique_collection_and_annotation.referenced_guidelines
**Confidence:** low

The fine-grained field value claims that annotators were provided with three established design guideline sets to standardize the critique process. The most directly relevant excerpts are those describing UICrit as a dataset of human-generated design critiques with bounding boxes and various ratings, which establish that a structured guideline-informed critique process exists, even if they do not specify the exact guideline sets. For example, mentions that UICrit contains human-generated critiques, bounding boxes for each critique, and multiple quality ratings indicate a structured, guideline-informed approach to critique collection. Additional excerpts detail task scope, UI IDs, and various rating dimensions, reinforcing that the dataset is designed to support standardized critique activities. However, none of the excerpts explicitly enumerate Nielsen Norman’s heuristics, CrowdCrit, or Apple’s HIG as the reference sets used. Therefore, while the dataset is clearly structured and aims to standardize critiques, the exact guideline sources referenced in the field value are not confirmed by the excerpts. This yields partial support for the existence of a standardized critique process, but no direct confirmation of the three specific guideline sets in use. The strongest support comes from descriptions of UICrit as a structured dataset with critiques and metadata; weaker or absent support exists for the explicit naming of the three guideline sources.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,

### recent_successors_to_rationale_systems_2015_2025.adoption_level
**Confidence:** low

To assess whether ADRs are widely adopted as a de facto standard and are recommended by major vendors and practitioners, we look for explicit statements about adoption levels or industry-wide status. The excerpt describing best practices for ADRs indicates that ADRs help document and communicate important decisions in engineering projects, which supports the idea that ADRs are valued as a practice. The excerpt outlining the benefits of ADRs reinforces that ADRs provide documented decisions, justifications, and implications, which aligns with a mature practice but does not by itself quantify adoption. The definition excerpt explains what an ADR captures and its rationale, establishing the fundamental purpose of ADRs, which is foundational but not a claim about widespread adoption. The design rationale under uncertainty excerpt discusses broader challenges with capturing rationale rather than the specific adoption or status of ADR-like records; it helps contextualize why adoption might vary but does not verify broad uptake of ADRs. Collectively, these excerpts support that ADRs are a recognized practice with documented benefits and prescribed usage, but they do not provide explicit evidence that ADRs are universally adopted across the software industry or that they are a de facto standard, nor do they confirm current 2015-2025 adoption trends. Therefore, the most relevant points are those that describe ADRs as a documented practice and their benefits; less directly relevant are the explicit adoption claims, and the rationale challenges provide contextual background rather than direct support for adoption status.

- [Master architecture decision records (ADRs): Best ...](https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/)
  > Mar 20, 2025 — Architecture decision records (ADRs) help you document and communicate important process and architecture decisions in your engineering projects.
- [Maintain an architecture decision record (ADR)](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)
  > Learn about the benefits of creating an architecture decision record in the design process to document decisions, justifications, and implications.
- [Architectural Decision Records](https://adr.github.io/)
  > An Architectural Decision Record (ADR) captures a single AD and its rationale; Put it simply, ADR can help you understand the reasons for a chosen architectural
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than

### uicrit_design_dimensions_covered.underrepresented_heuristics
**Confidence:** medium

The strongest support comes from passages that explicitly describe UICrit’s per-screen data collection and the inclusion of bounding-box annotations tied to individual screens. This indicates a scope centered on single UI screens rather than multi-screen journeys, which aligns with the claim that dynamic interactions and multi-screen flows are not the primary focus. Additional excerpts reinforce the per-screen design critique framework, including the presence of various ratings and comments tied to a specific screen, further suggesting a static, screen-level vantage point. Some excerpts provide broader publication and dataset context (e.g., papers introducing UICrit or updates announcing the dataset) that help establish the overall scope and aims, even if they do not explicitly state the limitations around dynamic or multi-screen coverage. Collectively, these excerpts support the idea that the dataset’s design critiques and metrics are anchored to individual screens, which would naturally underrepresent dynamic, cross-screen, or interaction-driven heuristics like error prevention, system status visibility, and cross-screen feedback. The supporting points are primarily the per-screen data description and the bounding-box annotation scheme, which imply a static, single-screen focus rather than a holistic multi-screen dynamic analysis.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated

### uicrit_schema_details.rico_id
**Confidence:** high

The most directly relevant information is that the dataset includes a field called rico_id, which is the corresponding Screen ID from the RICO dataset. This establishes that each UI screen in UICrit is linked to a unique RICO screen identifier, allowing cross-referencing to the original UI screen. The description also notes that this identifier enables access to the associated screenshot and metadata from the original RICO dataset, reinforcing its role as the primary linkage to the RICO Screen ID. Additional excerpts describe that the data includes the RICO ID and other metadata for each screen, further supporting that the RICO identifier is a core, explicit component of the dataset’s schema and is used to identify each unique UI screen. Other excerpts discuss the presence of design critiques, bounding boxes, and various quality ratings, which provide context about the dataset’s contents but do not directly state the exact role or field name of the RICO screen identifier. Taken together, these excerpts confirm that the RICO screen ID is an integral part of the UICrit schema and is used to identify each unique UI screen in relation to the original RICO dataset.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,

### uicrit_schema_details.aesthetics_rating
**Confidence:** medium

The most relevant excerpt directly enumerates the exact column related to this field, aesthetics_rating, including its scale from 1 to 10, which is essential for validating a numeric value like 8.0. The next excerpt confirms that the dataset includes a set of numerical ratings along several dimensions including aesthetics, which corroborates the presence of a dedicated aesthetics rating in the data. A third excerpt reiterates that numerical ratings cover aesthetics among other design quality dimensions, reinforcing the context for where an 8.0 would fit within the scoring system. Subsequent excerpts provide broader context about the UICrit dataset — such as the existence of design critiques and overall design quality measurements — which is supportive but less directly tied to the specific field value. Other excerpts discuss related works and papers about UICrit or design critique systems in general; they help frame the environment and lineage of the dataset but do not add direct details about the aesthetics_rating field beyond confirming its inclusion in the rating schema and its place among design quality metrics.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [UIClip: A Data-driven Model for Assessing User Interface ...](https://dl.acm.org/doi/10.1145/3654777.3676408)
  > Oct 11, 2024 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.
- [Aalto Interface Metrics (AIM) | Adjunct Proceedings of the ...](https://dl.acm.org/doi/abs/10.1145/3266037.3266087)
  > by A Oulasvirta · 2018 · Cited by 88 — CKim DKo M(2026)Criticmate: Stagewise Human–AI Co-Critique in Single-Screen UI EvaluationProceedings of the 2026 CHI Conference on Human Factors in
- [Enhancing Automated Design Evaluation with a UICritique ...](https://arxiv.org/abs/2407.08850)
  > by P Duan · 2024 · Cited by 37 — We carried out an in-depth analysis to characterize the dataset's features. We then applied this dataset to achieve a 55% performance gain in

### uicrit_schema_details.design_quality_rating
**Confidence:** low

The exact field value is a numeric rating for the overall design quality within the UICrit dataset. The most directly relevant excerpt explicitly describes the design_quality_rating as a numerical rating on a 1-10 scale for the UI's overall design quality, which directly anchors the existence and scale of the field. Additional excerpts discuss that the dataset includes a range of design critiques and multiple rating dimensions (such as aesthetics, usability, learnability, and overall design quality), illustrating that design quality is assessed via a structured scoring scheme and that design_quality_rating is part of that scheme. Other excerpts confirm that UICrit collects human critiques with bounding boxes and multiple evaluation metrics, reinforcing that a formal, multi-dimensional evaluation framework exists in which a numeric overall-design score (on a 1-10 scale) is plausible and aligned with the described design critique workflow. While these excerpts establish the presence and context of the rating field and its scale, they do not provide the exact value of 8.0 itself, so the claim remains supported in context but not independently verified as 8.0 by the excerpts alone.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [Enhancing Automated Design Evaluation with a UICritique ...](https://arxiv.org/abs/2407.08850)
  > by P Duan · 2024 · Cited by 37 — We carried out an in-depth analysis to characterize the dataset's features. We then applied this dataset to achieve a 55% performance gain in
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at

### uicrit_critique_collection_and_annotation.llm_critique_integration
**Confidence:** low

The fine-grained field describes a pipeline where a large language model (Gemini) was prompted in zero-shot mode using design guidelines to generate design comments, which were then validated by human annotators. Among the excerpts, there is a passage that explicitly discusses the presence of different sources for comments (human, llm, or both) within the UICrit dataset's comment metadata. This directly supports the idea that an LLM contributed to the critique generation and that its outputs could be categorized by source and then subjected to human validation. While the excerpt does not specify Gemini Pro Vision or provide the exact numeric validation results (e.g., the 776 of 5,927 valid comments), it does establish the key elements of an LLM-augmented annotation pipeline and the existence of an LLM-derived comment stream that requires human verification, which align with the field value’s core claim. The other excerpts describe the dataset structure, critique collection details, and attribute fields but do not address LLM augmentation or Gemini, so they offer contextual support but not direct evidence for the specified LLM-based process.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co

### uicrit_schema_details.comments
**Confidence:** high

The field value specifies that the data should include a list of textual design critiques for the UI screen, with each critique tied to specific bounding box coordinates that are normalized by the screenshot dimensions. Excerpt describing the UICrit dataset notes that it contains a list of design comments and includes bounding box coordinates for the corresponding screen regions, with these coordinates normalized by the screenshot dimensions, directly matching the grounding mechanism described by the field value. Further, the description of the UICrit dataset emphasizes that critiques are collected for UI screens and are associated with bounding boxes, which corroborates both the existence of the textual critiques and their spatial grounding. Additional excerpts indicate that the dataset comprises design critiques with bounding box coordinates and that the data includes the main task and corresponding metadata, reinforcing the interpretation that critiques are ground-truthed to UI regions. Other excerpts corroborate that design critiques are provided with bounding boxes and that there is a collection of such critiques across UI screens, supporting the overall construct of critiques tied to ground-truth visual regions. Taken together, these excerpts collectively support the field value's core claim about a list of textual critiques, each grounded to a specific UI region via normalized bounding box coordinates.

- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,

### uicrit_known_limitations.description
**Confidence:** medium

The most relevant excerpt describes the dataset as consisting of 3,059 design critiques collected from seven designers, which directly supports the aspect of a small annotator pool — a core limitation related to diversity of feedback. A closely related excerpt notes that annotations were obtained clean for 983 UI screens, illustrating high-quality labeling but not necessarily addressing broader limitations; this helps triangulate that there were structured annotation efforts but limited designer diversity. The excerpt mentioning that the Stagewise Human–AI Co-Critique study used UICrit indicates the dataset’s adoption in downstream research, which can be relevant to understanding practical impact or evaluative follow-through, though it does not by itself enumerate limitations. Another excerpt introduces UICrit as the first targeted dataset of design critiques for 983 mobile UI screens, which contextualizes scope but again does not enumerate limitations. Additional excerpts describe the dataset's schema (fields like rico_id, task, and various ratings) and the sources of comments (human/llm/both); these support understanding of data composition but do not directly articulate limitations. Collectively, these excerpts support partial aspects of the stated limitations (notably the small pool of annotators and reliance on a particular processing/annotation approach) but do not provide explicit evidence for other claimed limitations such as lack of dynamic multi-screen coverage or quantified hallucination rates. Therefore, the strongest support concerns annotator pool size and annotation quality, with weaker or indirect support for broader limitations. This justifies a mixed confidence level leaning toward medium/high for the parts that are supported, and lower for aspects not directly evidenced in the excerpts.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design

### uicrit_critique_collection_and_annotation.annotation_methodology
**Confidence:** high

The most relevant evidence directly supports the core claim of a two-week annotation process with multiple annotators and the final yield of 983 annotated UIs. Specifically, one excerpt states that the data collection took around two weeks and that seven annotators worked full-time, yielding clean annotations for 983 UI screens. This aligns with the described multi-step annotation workflow, including task annotation, bounding-box labeling, critique generation, and validation, culminating in the stated final set of 983 annotated screens. Another excerpt describes the dataset as a targeted collection of design critiques for 983 mobile UI screens, collected from seven designers, which corroborates the sampling, annotator pool, and final screen count. Additional excerpts outline the data schema, including per-screen fields such as the RICO ID, task, bounding-box coordinates for critiques, and multiple ratings (aesthetics, usability, and overall design quality), as well as the comments source, providing concrete evidence for the structured design critique data element described in the finegrained field value. Supporting excerpts from the UICrit Dataset documentation note that critiques are human-generated and include bounding boxes, which reinforces the described annotation methodology and data structure. Together, these excerpts substantiate the two-week annotation window, the sampling and annotator setup, the multi-step process (annotation, bounding boxes, critique generation, rubric-based ratings), and the final outcome of 983 fully annotated screens, along with the associated data fields and schema used in the annotation process.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [uicrit/uicrit_public.csv at main · google-research-datasets ...](https://github.com/google-research-datasets/uicrit/blob/main/uicrit_public.csv)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique,

### analysis_of_historical_design_rationale_systems.1.system_name
**Confidence:** high

The exact field value identifies QOC (Questions-Options-Criteria) and Design Space Analysis as the design rationale approach of interest. The most direct support comes from passages that explicitly state that Design Space Analysis uses a semiformal notation called QOC (Questions, Options, and Criteria), connecting QOC directly to the concept of design rationale representation within a design space framework. Additional support comes from descriptions of QOC as representing the argumentation in terms of questions, options, and criteria for choosing among options, which underscores its role as a design rationale capture mechanism. A further excerpt reinforces this mapping by describing Design Space Analysis and the related elements under the umbrella of design rationale, including references to the QOC framework and its relation to design-space analysis. Taken together, these excerpts substantiate that the system name in the queried path corresponds to QOC within Design Space Analysis and situates it among related approaches like IBIS, illustrating a continuum of design rationale capture systems and their schemas.

- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions-Options-and-Criteria-Elements-of-Design-Space ...](https://www.researchgate.net/profile/Victoria_Bellotti/publication/233367028_Questions_Options_and_Criteria_Elements_of_Design_Space_Analysis/links/00b7d53211940ad48e000000/Questions-Options-and-Criteria-Elements-of-Design-Space-Analysis.pdf)
  > Design rationale is important because an artifact needs to be understood by a wide variety of people who have to deal with it. This variety of people ranges.

### analysis_of_historical_design_rationale_systems.2.system_name
**Confidence:** high

The target field value specifies the system name of a design rationale editor, namely DRed (Design Rationale editor). The most directly supportive content states that DRed was initially aimed at capturing design rationale and later broadened into a broader 'problem management' tool, clearly tying DRed to design rationale capture functionality. A second excerpt explicitly discusses DRED 2.0 as a method and tool for capture and communication of design knowledge deliberated in product creation, describing an enhancement to an existing graph-based tool for design rationale capture. Together, these passages confirm the identity of DRed as a design rationale editor/tool and describe its evolution and capabilities, which aligns with the requested field value. Other excerpts discuss related design rationale systems (IBIS, QOC, gIBIS) but do not directly identify the DRed editor itself, so they are less relevant to the specific field value.

- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international

### analysis_of_historical_design_rationale_systems.1.successes
**Confidence:** medium

The targeted fine-grained field value asserts that a historical design rationale system excels at capturing comparative rationale and laying out trade-offs based on explicit criteria, with subsequent usefulness for teaching and reusing knowledge. The most directly relevant material describes how design rationale is organized around questions, options, and criteria, and notes that QOC represents arguments for choosing among options, which aligns with capturing comparative reasoning and explicit trade-offs. The secondary excerpt reinforces that IBIS and QOC are established forms of capturing design rationale, framing design reasoning as structured argumentation, which supports the idea that these systems are designed to capture explicit reasoning and trade-offs. The third excerpt emphasizes the broader importance of design rationale in making artifacts understandable to diverse stakeholders, which underpins the utility for teaching and transferring knowledge. Taken together, the excerpts substantiate that the field and its systems focus on structured, comparative reasoning and knowledge sharing, though they do not provide explicit performance evaluations or claimed levels of excellence. Therefore, the argument that such systems are designed for and support capturing comparative rationale and explicit criteria is supported, while explicit superiority claims are not directly evidenced. The most substantial alignment is with the description of QOC and its role in structuring design rationale as questions, options, and criteria; followed by the portrayal of these systems as established forms of design rationale; and finally the emphasis on the broader educational and knowledge-sharing value of design rationale-infrastructure.

- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Questions-Options-and-Criteria-Elements-of-Design-Space ...](https://www.researchgate.net/profile/Victoria_Bellotti/publication/233367028_Questions_Options_and_Criteria_Elements_of_Design_Space_Analysis/links/00b7d53211940ad48e000000/Questions-Options-and-Criteria-Elements-of-Design-Space-Analysis.pdf)
  > Design rationale is important because an artifact needs to be understood by a wide variety of people who have to deal with it. This variety of people ranges.

### uicrit_known_limitations.limitation_category
**Confidence:** medium

The most relevant information for Dataset Scope and Methodology comes from excerpts that specify concrete collection details: the total number of critiques and UI screens, the number of annotators, and the data collection duration. These pieces establish the practical scope (what was collected and in what quantity) and the workflow (who annotated, how long, and whether annotations were complete). Excerpts that describe additional data fields such as RICO IDs, design task, bounding boxes, and numeric ratings further define the scope by clarifying what metadata accompanies each item, which is essential to understand the methodology and potential limitations of the dataset. Excerpts that reiterate the existence of the dataset or provide high-level descriptions without numbers or process details contribute less directly to the precise methodology and scope and thus are considered less relevant. Overall, the strongest support comes from explicit counts and process details; supportive context about data fields and linkage to the RICO dataset provides additional depth, while more superficial summaries offer minimal additional methodological insight.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The data collection took around two weeks to complete, with all
seven annotators working full-time. At the conclusion of the data
collection, we obtained clean annotations (i.e. not missing any data)
for 983 UI screens and collected a total of 3,059 critiques.
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
  > The data
for each UI screen includes the RICO ID, which can be used to access
the screenshot, android view hierarchy, and other metadata from
the original RICO dataset, the main task the UI screen is designed
for, a set of design critiques with bounding box coordinates of
corresponding screen regions, and numerical ratings along various
dimensions including the aesthetics, usability, and overall design
quality.
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > by P Duan · 2024 · Cited by 38 — To advance the effort towards improving automated UI feedback, we introduce UICrit, the first targeted dataset of design critiques for 983 mobile UI screens.
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated

### analysis_of_historical_design_rationale_systems.1.schema_structure
**Confidence:** medium

The field value describes a semi-formal notation built around three core elements: Questions that identify design issues, Options as potential solutions, and Criteria for evaluating Options. It also mentions a schema that includes Assessments and Arguments to link Criteria to Options. The first and second excerpts directly discuss this design-rationale notation: one identifies Design Space Analysis using QOC (Questions, Options, and Criteria) as a semiformal notation for design rationale, and the other explains that QOC represents argumentation with questions, options, and criteria, highlighting the same trio of components used to compare and justify design choices. These passages align with the field value’s emphasis on Questions, Options, and Criteria as foundational elements. The third excerpt adds contextual relevance by discussing Elements of Design Space Analysis and the broader importance of design rationale, which corroborates the existence of structured design rationale representations but is slightly less explicit about the exact trio (Questions/Options/Criteria) and about Assessments and Arguments. Taken together, these excerpts support the notion of a semi-formal design-rationale notation centered on Questions, Options, and Criteria and mention related approaches (IBIS/KOC-style systems) that map to this idea, while leaving a potential gap regarding explicit inclusion of Assessments and Arguments as named in the field value.

- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions-Options-and-Criteria-Elements-of-Design-Space ...](https://www.researchgate.net/profile/Victoria_Bellotti/publication/233367028_Questions_Options_and_Criteria_Elements_of_Design_Space_Analysis/links/00b7d53211940ad48e000000/Questions-Options-and-Criteria-Elements-of-Design-Space-Analysis.pdf)
  > Design rationale is important because an artifact needs to be understood by a wide variety of people who have to deal with it. This variety of people ranges.

### analysis_of_historical_design_rationale_systems.2.failures_and_limitations
**Confidence:** medium

The field value asserts that the system faced inherent challenges related to capture cost and integration, yet had documented successes such as a clear deployment process and demonstrated value beyond pure rationale capture. The most relevant excerpt notes that capture remains a key difficulty and that there is evidence about costs and adoption in practice, including uncertainty around whether costs are higher than benefits. This aligns with the claim of inherent challenges in capture cost and integration, while indicating that some data exists regarding adoption and potential value. The next excerpt discusses how DRed broadened its capability to serve as a problem-management tool and mentions deployment in an industrial context, which supports the notion of a deployment process and practical value beyond mere capture, thereby illustrating both success aspects and the deployment context. The other excerpt describes extending a graph-based tool for capture and communication of design knowledge, which reinforces experiences around tool evolution, practical use, and potential limitations in terminology or scope, contributing to understanding of what was successfully captured and what might have been missed or constrained in practice. Taken together, these excerpts connect to the field value by providing evidence of both the documented challenges (capture costs, adoption) and the practical successes (deployment processes, broader utility) of DRed and related design rationale tools.

- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international

### analysis_of_historical_design_rationale_systems.1.artifacts_produced
**Confidence:** high

The core claim is that QOC yields semi-formal structures for design space analysis that articulate and compare alternatives, emphasizing reusable and comparative reasoning over a narrative of process, and that the output takes the form of a coherent structure comprising Questions, Options, and Criteria. The most directly supportive content states that QOC uses a semiformal notation and is explicitly described as “Questions, Options, and Criteria.” It also notes that QOC represents the argumentation as questions, options, and criteria for choosing the options, which aligns with producing a structured, reusable design space representation rather than a narrative. Additionally, the material on related design rationale approaches (IBIS) provides context that these families of approaches capture design reasoning artifacts, while the third excerpt confirms the terminology and elements of design space analysis related to Questions, Options, and Criteria. Together, these excerpts reinforce that the QOC framework produces semi-formal design space artifacts consisting of a structured set of Questions, Options, and Criteria used to compare alternatives in a reusable manner. This directly supports the field value describing the nature and role of QOC artifacts in design space analysis.

- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions-Options-and-Criteria-Elements-of-Design-Space ...](https://www.researchgate.net/profile/Victoria_Bellotti/publication/233367028_Questions_Options_and_Criteria_Elements_of_Design_Space_Analysis/links/00b7d53211940ad48e000000/Questions-Options-and-Criteria-Elements-of-Design-Space-Analysis.pdf)
  > Design rationale is important because an artifact needs to be understood by a wide variety of people who have to deal with it. This variety of people ranges.

### analysis_of_historical_design_rationale_systems.2.schema_structure
**Confidence:** medium

The field value describes a graph-based structure drawn from IBIS and tailored for engineering design to record rationale linked to problems as design progresses. Excerpt describing IBIS as the first explicit design rationale representation provides direct historical context for the graph-based rationale concept and establishes a basis for how such representations evolved. Excerpt describing gIBIS as a hypertext vehicle for exploring issue-based methodologies and capturing design rationale aligns with the idea of a structured, interconnected representation that supports traceability of design reasoning. Excerpt noting that QOC represents argumentation with questions, options, and criteria, alongside IBIS, reinforces the notion of a structured, rationale-focused schema that captures decision-making elements in a design context. Taken together, these excerpts substantiate the key aspects of the field value: a lineage from IBIS to graph-like, rationale-focused representations, with relevance to engineering design needs; they imply a structured approach to linking rationale to design problems, which matches the described tailored schema. The excerpts do not provide a precise formal schema, but they corroborate the core concepts of graph-like rationale capture inspired by IBIS and its application to design engineering contexts.

- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used

### analysis_of_historical_design_rationale_systems.2.artifacts_produced
**Confidence:** high

The field value claims that DRed produces rationale maps directly linked to specific engineering problems and, inspired by IBIS, its output extends beyond mere rationale capture to function as a comprehensive problem management tool within engineering contexts. The most directly supportive evidence is that DRed was initially aimed at capturing design rationale but broadened to become a problem management tool, which aligns with the notion of output (rationale maps) that are tied to concrete engineering problems and serve broader management purposes. The DRED 2.0 entry reinforces this by describing an extended, graph-based design knowledge capture tool, indicating its outputs are designed for communication and capture of deliberated design knowledge, presumably linked to problems. Contextual references to IBIS and other design rationale systems (IBIS, QOC, gIBIS) support the lineage and design rationale ecosystem from which DRed draws inspiration, explaining why its outputs would be structured to map to engineering problems and broader management workflows. A cognitive analysis source noting IBIS as an early explicit design rationale representation provides historical grounding for why DRed might adopt similar outputs (maps linked to problems) as part of its design rationale capture, further supporting the claimed linkage to problems and the inspiration. Collectively, these excerpts coherently connect DRed’s output (rationale/problem maps) to specific engineering problems and to IBIS-inspired design rationale practices, with additional context about the adequacy and evolution of such systems in practice.

- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than

### analysis_of_historical_design_rationale_systems.1.adoption_in_practice
**Confidence:** medium

The concept of QOC is described as a semiformal notation for design rationale, where design space analysis uses Questions, Options, and Criteria, indicating its role in structuring design reasoning within scholarly work. This supports the claim that QOC has had significant influence in academic contexts by providing a formalized approach to design rationale. Additional excerpts note that QOC represents argumentation in terms of questions, options, and criteria, and that design rationale systems like IBIS have been used to capture such reasoning, aligning with the idea that these approaches were studied and applied in research settings. A broader statement about the importance of design rationale itself is also present, underscoring that reasoning about design is a valued topic in the field. Taken together, these excerpts support the view that QOC has been influential academically and used for communicating design knowledge in case studies, while they do not provide explicit evidence about long-term industrial adoption or explicit cognitive overhead, which would be necessary to fully corroborate the latter parts of the field value.


- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions-Options-and-Criteria-Elements-of-Design-Space ...](https://www.researchgate.net/profile/Victoria_Bellotti/publication/233367028_Questions_Options_and_Criteria_Elements_of_Design_Space_Analysis/links/00b7d53211940ad48e000000/Questions-Options-and-Criteria-Elements-of-Design-Space-Analysis.pdf)
  > Design rationale is important because an artifact needs to be understood by a wide variety of people who have to deal with it. This variety of people ranges.

### uicrit_follow_on_research.0.paper_title
**Confidence:** high

The strong hit is the excerpt that explicitly displays a title matching the field value: 'Stagewise Human–AI Co-Critique in Single-Screen UI'. This excerpt also situates the work within the UICrit framework and notes a publication date, which directly supports the existence and relevance of this specific title. Other excerpts discuss UICrit-related work and datasets (e.g., 'UICrit: Enhancing Automated Design Evaluation with a UI...', 'UICrit Dataset'), which provides contextual support about the dataset and its researchers, but do not quote the exact title in question. These corroborate the broader research area (UICrit usage, critiques, and related publications) and help establish that the field value belongs to a real, published item, even though they do not confirm the exact title. The remaining excerpt content describes dataset schema details and fielded annotations, which reinforces the overall topic (UICrit) but does not directly mention the specific title, thus offering supplementary contextual support without asserting the precise title. Taken together, the most relevant evidence centers on the explicit title mention, with strong contextual support from related UICrit publications to situate its credibility.

- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co

### analysis_of_historical_design_rationale_systems.2.adoption_in_practice
**Confidence:** low

To support the specific field value, we need evidence that DRed was adopted in industry and evolved into a newer version. The first excerpt indicates that DRed broadened beyond its initial purpose to become a problem-management tool, which aligns with signs of adoption and expansion in practice. The second excerpt discusses DRed 2.0, described as a method and tool for capture and communication of design knowledge deliberated in the creation of technical products, which implies continued development and application in real-world settings. While these excerpts corroborate ongoing development and potential industry use, they do not provide explicit names of adopters (e.g., Rolls-Royce) or confirm specific industrial deployments. Therefore, the connection supports a narrative of industrial relevance and continued evolution, but with limited direct evidence for the claimed Rolls-Royce adoption and quantified impact.

- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international

### analysis_of_historical_design_rationale_systems.0.system_name
**Confidence:** high

The target field value identifies the system name as IBIS (Issue-Based Information Systems) and gIBIS. Excerpts that describe gIBIS as a hypertext tool for exploratory policy discussion and explicitly state its purpose for capturing design rationale directly support this field value, confirming that gIBIS is a vehicle for the capture of design rationale within the IBIS family. Additional excerpts explicitly noting IBIS as the first explicit representation for reasoning in a design context reinforce the inclusion of IBIS as a foundational design rationale system. In combination, these excerpts establish that IBIS and its variant gIBIS are central to historical design rationale systems, aligning with the requested field value that names IBIS and gIBIS as the system reference. Some excerpts also discuss related methods (QOC, IBIS) and their roles, which provides contextual support for the relationship and scope of these systems within design rationale research, though the core claim is substantiated by the explicit descriptions of gIBIS/IBIS and their purpose in design reasoning.

- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used

### analysis_of_historical_design_rationale_systems.1.failures_and_limitations
**Confidence:** medium

The field value centers on a significant limitation tied to design rationale systems: the cognitive overhead of creating rationalized structures, the tendency for rationalization to erase narrative sequence and opportunistic exploration, and the need for sustained effort and effective navigation to make long-term utility possible. The most directly relevant information comes from excerpts that explicitly discuss how design rationale is organized around structured representations: one excerpt notes that QOC represents argumentation as questions, options, and criteria, which foregrounds the structured, potentially cognitively demanding nature of capturing design rationale. Another excerpt highlights that design rationale can be captured via IBIS, indicating the existence of semiformal, structured approaches to argumentation in design. A third excerpt emphasizes that design rationale is important for artifact understanding, which contextualizes why such rationalization systems exist and are used, though it does not directly name cognitive overhead. Taken together, these excerpts support the idea that while these systems provide formal methods for capturing design reasoning, they introduce complexity and require ongoing effort and navigation support to be valuable in practice.

- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Questions-Options-and-Criteria-Elements-of-Design-Space ...](https://www.researchgate.net/profile/Victoria_Bellotti/publication/233367028_Questions_Options_and_Criteria_Elements_of_Design_Space_Analysis/links/00b7d53211940ad48e000000/Questions-Options-and-Criteria-Elements-of-Design-Space-Analysis.pdf)
  > Design rationale is important because an artifact needs to be understood by a wide variety of people who have to deal with it. This variety of people ranges.

### analysis_of_historical_design_rationale_systems.0.successes
**Confidence:** medium

The strongest support comes from noting that IBIS was the first explicit representation for reasoning in a design context, i.e., it formalizes design rationale and positions it as a foundational notation for capturing deliberations. This aligns with the claim that IBIS captures the structure of deliberation and the arguments surrounding design decisions. Further support comes from sources describing gIBIS/IBIS as a tool designed to facilitate the capture of early design deliberations, which directly points to capturing the deliberative structure and the associated arguments. Additional context is provided by references that frame IBIS within a family of design rationale approaches (e.g., QOC and IBIS as design rationale representations) and describe how such frameworks model issues, options, criteria, and arguments, thereby supporting the claim that IBIS captures the narrative and reasoning structure of design conversations. Taken together, these excerpts support the core aspects of the field value: (a) IBIS as a foundational, explicit design rationale representation; (b) its role in capturing deliberation structure and argumentative content; (c) its relevance to design rationale practices beyond a single case study. However, the excerpts do not explicitly confirm facilitator-assisted improvements to meetings or explicit preservation of group memory, so those parts of the field value are not directly evidenced here and are treated as plausible extensions rather than asserted claims.

- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),

### uicrit_follow_on_research.1.venue
**Confidence:** high

The precise venue value 'UIST 2024' is supported by excerpts that reference the UICrit work and its associated publication context. One excerpt points to a file path that explicitly encodes the UIST 2024 conference (uicrit-uist2024.pdf), indicating the work is tied to that venue. This same excerpt describes a targeted dataset and design critiques associated with UICrit, which directly confirms the paper’s association with UIST 2024. Another excerpt provides parallel information about the UICrit work with a date around the same period (October 11, 2024) and a title indicating a UICrit-related publication, further corroborating the venue context. Taken together, these excerpts strongly support the field value asserting the venue as UIST 2024, while other excerpts mentioning UICrit without a venue cue offer contextual background but do not directly confirm the venue.


- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at

### analysis_of_historical_design_rationale_systems.2.successes
**Confidence:** medium

The finegrained field value asserts that DRed successfully operationalized the capture of design rationale in a demanding industrial workflow, ties rationale to specific design artifacts, and delivered measurable return on investment by expanding its use beyond just rationale capture to broader problem management. The most directly supporting content notes that DRed was initially aimed at capturing design rationale and subsequently broadened to function as a problem management tool, indicating practical adoption and extended utility in real-world workflows. Additionally, the related excerpt describing DRed as having been extended with a method and tool for capture and communication of design knowledge deliberated in product creation reinforces the notion that DRed’s approach was formalized and applied, supporting the claim of operationalization within industrial contexts. While other excerpts discuss related systems (IBIS, QOC, gIBIS), they do not directly substantiate DRed’s specific successes, so their relevance to the finegrained field value is more contextual than evidentiary.”,

- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [DRED 2.0: A METHOD AND TOOL FOR CAPTURE AND ...](https://www.designsociety.org/download-publication/28740/dred_2_0_a_method_and_tool_for_capture_and_communication_of_design_knowledge_deliberated_in_the_creation_of_technical_products)
  > by R Bracewell · 2009 · Cited by 31 — Our solution approach is to extend an existing graph based software tool for design rationale capture that has been in widespread use in an international

### analysis_of_historical_design_rationale_systems.4
**Confidence:** medium

The finegrained field value centers on a historical family of design rationale systems and a specific Procedural Hierarchy of Issues (PHI) concept, including how critics linked design artifacts to rationale and the claim that PHI expands the concept of ‘Issue’ and introduces inter-Issue relationships. The most directly relevant excerpt explicitly states that PHI expands the definition of Issue and introduces inter-Issue relationships, which aligns with the notion of a procedural hierarchy guiding how issues and arguments are organized. Several excerpts discuss core design rationale frameworks (IBIS, gIBIS, QOC) and their modes of capturing design reasoning as issues, options, and criteria, or as arguments and links to design artifacts; these provide the contextual backdrop for understanding how a PHI-like structure would be used to organize rationale in CAD-oriented design environments. Additional excerpts describe how these systems coupled rationale with artifacts (e.g., CAD objects) and included mechanisms like critics to surface tacit knowledge at the moment of design, which matches the described feature set in the field value. Some excerpts also address adoption challenges and design rationale research findings, noting that while such systems captured rationale and linked it to design objects, broad industry adoption was limited and costs/complexity were barriers, which supports the “limited adoption” aspect of the field value. Finally, discussions about related design rationale tools (e.g., DRed) and developments in the field reinforce that these systems produced structured rationale artifacts and faced practical adoption constraints, corroborating the overall narrative described in the field value.

- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than

### analysis_of_historical_design_rationale_systems.0.schema_structure
**Confidence:** high

The finegrained field states that the underlying schema is an argumentation-based graph with three main elements: Issues (or questions), Positions (possible answers), and Arguments (supporting or opposing positions) connected by typed links. Several excerpts directly map to this claim:
- One excerpt explicitly describes a design rationale scheme where the representation uses questions, options, and criteria, highlighting the triad of Questions (Issues), Options (Positions), and Criteria (a way to evaluate options). This aligns with the core idea of an argumentation graph where Issues lead to multiple Positions, with Arguments supporting or refuting those Positions and links formalizing those relationships.
- Another excerpt notes IBIS as an explicit design rationale notation, commonly understood as a framework that captures issues and positions with supporting or opposing arguments, which maps directly to the three-element schema described in the field value.
- A third excerpt discusses gIBIS in the context of enabling the capture of design deliberations, reinforcing that these systems are built to represent structured argumentation around design decisions, again compatible with the idea of an argumentation-based graph with linked elements.
- Additional excerpts provide broader definitions of design rationale as the representation of reasoning and decisions behind artifacts, which supports the interpretation that such systems are built to capture structured argumentation, even if not naming every component explicitly.
- Supporting context about the evolution and variations of these systems (QOC, IBIS, gIBIS) reinforces that a graph-like, linked-argument structure underpins these approaches, consistent with the described three-element schema and typed links.
Overall, the most directly relevant content anchors the field value to a tri-partite, linked-argument representation (Issues/Questions, Positions/Options, and Arguments), with the links between them forming the graph. The adjacent discussions of QOC and IBIS further corroborate the specific component naming and their role in modeling design rationale.


- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.
- [Design rationale](https://grokipedia.com/page/Design_rationale)
  > Design rationale is the representation of the reasoning, arguments, and decisions underlying the creation of an artifact or system, documenting why specific
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than

### analysis_of_historical_design_rationale_systems.0.adoption_in_practice
**Confidence:** medium

The most useful excerpts directly address adoption and practical use of design rationale methods. Excerpts describing the capture and adoption challenges suggest adoption has been mixed: capture remains difficult, training is required, and many implementations did not progress beyond prototypes due to complexity or control issues. Excerpts explicitly inquiry into whether these methods were adopted in practice and what was successfully captured versus what failed to be captured provide concrete support for assessing adoption in real-world settings. Other excerpts provide historical context about the rationale representations (IBIS, gIBIS, QOC) and their foundational ideas, which helps explain why adoption may be challenging (complexity, need for literate participants, facilitator roles). In particular, the most directly relevant statements indicate: (a) design rationale capture remains difficult and training costs are significant, (b) practitioner communities and initiatives exist but sustained organization-wide adoption is rare and facilitator-supported, (c) IBIS frames rationale in a structured way but practical adoption depends on facilitation and organizational context, (d) questions about adoption in practice and what was captured versus what failed to be captured are central concerns in evaluating these systems. These points collectively support the fine-grained field value that adoption has been mixed, with benefits in memory and decision tracking but requiring substantial training and often not progressing beyond prototypes in many organizations.

- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > IBIS was the first
explicit representation for reasoning in a design context—the first design rationale
notation.

  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [Design rationale](https://grokipedia.com/page/Design_rationale)
  > Design rationale is the representation of the reasoning, arguments, and decisions underlying the creation of an artifact or system, documenting why specific

### analysis_of_historical_design_rationale_systems.0.artifacts_produced
**Confidence:** high

The described system is explicitly presented as a vehicle for capturing design rationale using issue-based methodologies, which aligns with the concept of argumentation graphs or issue-based discussion maps. The hypertext nature of the tool is highlighted as enabling the capture of early design deliberations, and other excerpts emphasize that argumentation can be represented as questions, options, and criteria (QOC) or as IBIS-style structures, which further supports that the outputs are structured representations of rationale around key issues and the sequence of deliberations. Collectively, these excerpts map directly to a system that outputs argumentation graphs or maps, preserves the discussion sequence, and organizes alternatives around central issues.

- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An

### uicrit_follow_on_research.1.summary_of_use
**Confidence:** high

The finegrained field value claims that UICrit is part of a broader ecosystem of automated UI assessment models and is used for training and evaluating new models. This is directly supported by excerpts describing practical uses of UICrit in automated design evaluation and model-invocation contexts. Specifically, one excerpt explicitly discusses a targeted dataset of thousands of design critiques and quality ratings gathered from multiple designers, highlighting its role in evaluation and potential training data. Another excerpt describes the UICrit dataset in concrete terms—what it contains (natural language critiques, bounding boxes, and design-related metadata across UI screens)—which underpins its utility for supervised training and model development. Additional excerpts enumerate the dataset’s structure and columns (e.g., IDs, task descriptions, and various ratings), reinforcing how this data could feed UI assessment pipelines. A separate excerpt confirms the existence and availability of the UICrit Dataset with details relevant to its use in research workflows. Finally, while one excerpt centers on a UI assessment model (UIClip) that uses UI data and descriptions, its inclusion illustrates the broader ecosystem of model-centered work that could leverage UICrit as input data for training or evaluation. Collectively, these excerpts align with the idea that UICrit is integrated into automated UI analysis research and used to train and evaluate models across the design assessment pipeline.

- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co
- [UIClip: A Data-driven Model for Assessing User Interface ...](https://dl.acm.org/doi/10.1145/3654777.3676408)
  > Oct 11, 2024 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.

### uicrit_follow_on_research.1.paper_title
**Confidence:** high

The fine-grained field value corresponds to a paper title present in one excerpt, which explicitly introduces UIClip as a data-driven model that assesses design quality and visual relevance of a UI from screenshots and natural language descriptions. This directly confirms the existence and focus of a work named UIClip, matching the requested field. The excerpt provides a precise, claim-level connection: UIClip is described as a data-driven model for evaluating UI design quality and visual relevance based on screenshots and descriptive text, which is exactly the kind of information sought when identifying the paper title that matches UIClip.

- [UIClip: A Data-driven Model for Assessing User Interface ...](https://dl.acm.org/doi/10.1145/3654777.3676408)
  > Oct 11, 2024 — We develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description.

### analysis_of_historical_design_rationale_systems.0.failures_and_limitations
**Confidence:** medium

The most relevant information points to key difficulties in using design rationale systems: capture remains a persistent challenge to adopting rationale in practice, and there is ongoing debate about whether the costs justify the benefits. This directly supports the claim that high cognitive overhead and authoring costs are barriers to adoption, and that real-time capturing of rationale is problematic without specialized resources. Additional context notes that QOC and IBIS are established forms of design rationale (questions, options, and criteria; issue-based information), which helps explain why such systems might be complex and demanding to operate, contributing to the barriers described. Together, these excerpts underscore that adoption hurdles are tied to cognitive load, cost concerns, and the need for training or facilitation, which align with the described field value about complexity, authoring burdens, and control challenges in designing and maintaining rationale maps.

- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [reasoning with design rationale](http://www.cs.wpi.edu/~dcb/Papers/AID00-janet.pdf)
  > by J BURGE · Cited by 140 — QOC represents the argumentation as questions, options, and criteria for choosing the options. Another notation is Issue Based Information. Systems (IBIS), used

### analysis_of_historical_design_rationale_systems.4.failures_and_limitations
**Confidence:** high

The finegrained field value claims a major failure point: the difficulty and distraction of capturing the design rationale (Procedural Hierarchy of Issues) during the creative design process, leading to high overhead and hindered practical application. The most directly supporting excerpt notes that capture remains a key difficulty and that practical adoption is hampered by this overhead. This aligns with the notion that attempting to document rationale in parallel with active design work introduces substantial cognitive and workflow burden, which undermines the usefulness and adoption of rationale capture systems. Additional excerpts discuss related systems and challenges in capturing rationale, which provides contextual support but does not directly affirm the specific overhead barrier as clearly as the cited source about capture difficulties.

- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than

### analysis_of_historical_design_rationale_systems.4.system_name
**Confidence:** low

The fine-grained field value appears to refer to a named set of design rationale tools (PHI/JANUS/PHIDIAS). Reviewing the excerpts, several discuss foundational design rationale systems (gIBIS, IBIS, QOC) and their capabilities, such as capturing early design deliberations, exploring design rationale, and framing issues and arguments. These excerpts describe how design rationale was represented and what each system aimed to capture, which is relevant context for understanding where PHI/JANUS/PHIDIAS might fit in the historical landscape. However, none of the excerpts explicitly mention PHI, JANUS, or PHIDIAS, nor provide evidence tying PHI/JANUS/PHIDIAS to a concrete schema, adoption history, or limitations. As a result, while the excerpts are highly relevant for understanding the domain of design rationale tools and their evolution, they do not substantiate the specific fine-grained field value. Consequently, the connection to the target field value is inferential at best and not directly evidenced by the excerpts.

- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.

### uicrit_follow_on_research.0.summary_of_use
**Confidence:** high

The field value states that the work reportedly uses the UICrit dataset, along with related datasets, as a foundation for building and evaluating co-critique pipelines where humans and AI collaborate in a stagewise critique process of user interfaces. The most directly supportive information is that the Stagewise Human–AI Co-Critique work explicitly notes using the UICrit dataset and describes it as comprising mobile UI screenshots annotated with task descriptions, which provides the foundational data for co-critique. Additional excerpts reinforce this by detailing that a targeted dataset of thousands of design critiques and quality ratings for hundreds of UIs exists, created by multiple designers, which is exactly the kind of rich critique data useful for co-critique pipelines. Further support comes from descriptions of the UICrit dataset’s contents, including human-generated natural language critiques and bounding boxes for critiques, which illustrate the annotation richness needed for stagewise critique workflows. Additional excerpts enumerate the dataset’s structured columns (e.g., aesthetics_rating, learnability, usability_rating, design_quality_rating, and comments with sources and bounding boxes), underscoring the depth and variety of design rationale captured, which aligns with what an LLM training/evaluation pipeline would require for design rationale and critique reasoning integration. In sum, these excerpts collectively corroborate that UICrit is used as a foundational resource for co-critique pipelines, and they provide concrete data characteristics that underpin such use (sizes, task descriptions, critique texts, bounding boxes, and multi-faceted ratings).

- [Stagewise Human–AI Co-Critique in Single-Screen UI ...](https://dl.acm.org/doi/10.1145/3772318.3790929)
  > Apr 13, 2026 — We used the UICrit dataset [16], which contains 1,000 mobile UI screenshots with task descriptions sampled from Rico [15]. Each UI was annotated
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > by P Duan · 2024 · Cited by 38 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at least a year of pro
- [UICrit: Enhancing Automated Design Evaluation with a UI ...](https://dl.acm.org/doi/10.1145/3654777.3676381)
  > Oct 11, 2024 — We present a targeted dataset of 3,059 design critiques and quality ratings for 983 mobile UIs, collected from seven designers, each with at
- [UICrit Dataset](https://github.com/google-research-datasets/uicrit)
  > Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
  >  columns in the CSV file are as follows:
* “rico_id”: The corresponding Screen ID from the [RICO dataset](http://www.interactionmining.org/rico.html) , which can be used to get the Mobile UI screenshot
* “task”: The main task that the UI screen is designed for
* “aesthetics_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s aesthetics
* “learnability”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s learnability (i.e. inuititiveness)
* “efficency”: A numerical rating (on a scale of 1-5) of the quality of the UI screen’s efficiency (i.e. how quickly users can complete tasks)
* “usability_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI screen’s usability (i.e. how easy it is to use)
* “design_quality_rating”: A numerical rating (on a scale of 1-10) of the quality of the UI’s overall design, which depends on its usability and aesthetics ratings
* “comments_source”: A list, where each item specifies the source of its corresponding comment in the “comments” column. The different sources are “human” (from a human annotator), “llm” (from Gemini), and “both” (from both a human rater and Gemini)
* “comments”: A list of design comments for the UI screen. Each comment also includes bounding box coordinates for its relevant region in the UI screenshot. The bounding box coordinates are normalized by the screenshot's dimensions.
The source for each comment (human, llm, or both) can be found at its co

### analysis_of_historical_design_rationale_systems.4.schema_structure
**Confidence:** high

The target field asserts that there exists a PHI-based schema where design issues form a procedural hierarchy, and that a network of issue-based argumentation links design artifact states to rationale, making the reasoning observable from the design object. The most direct support is the statement that the PHI framework expands the definition of Issue and introduces inter-Issue relationships, indicating an organized, hierarchical, issue-centric structure. It is reinforced by references describing IBIS as a framework that explicitly frames rationale in terms of issues, positions, and arguments, which matches the notion of an issue-based network governing design rationale. Additional excerpts describe gIBIS as a tool aimed at capturing early design deliberations via issue-based methodologies, which aligns with the idea of an argumentation network underpinning rationale capture. Together, these excerpts corroborate the existence of an organized, issue-centered schema and the practical tooling that embodies such a framework, while also situating it within the broader landscape of design rationale capture approaches (QOC, DRed) that map design decisions to justificatory structures. The cited materials collectively support the components of the claim: (a) an issue-based, hierarchical organization of rationale (PHI), (b) linking design states to issue-based arguments, and (c) accessibility of rationale from the design object via dedicated representational frameworks.

- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been

### analysis_of_historical_design_rationale_systems.4.artifacts_produced
**Confidence:** medium

The most directly relevant passages describe IBIS and gIBIS as frameworks that structure design rationale into defined elements such as issues, positions, and arguments, which aligns with the idea of reusable issue bases and linked argumentation. Specifically, the framework treating rationale as issues (design questions), positions (answers), and arguments (support/refute) maps closely to the notion of reusable, linked design rationale components. The references to gIBIS as a tool for exploratory policy discussion further support the idea that such rationale artifacts could be created, organized, and accessed as structured objects. Additional context from related systems (DRed) shows a lineage of design rationale capture tools, reinforcing that these systems were designed to capture and organize rationale content, and that capture and adoption challenges are a known theme. Broader cognitive analyses of design rationale representation add depth by discussing concepts like inter-issue relationships, which underpins the idea of interconnected rationale artifacts. Collectively, these excerpts support the claim that such systems produced structured, citable rationale artifacts with linked arguments and issue-based organization, and that these systems were studied for adoption and practical use, while acknowledging ongoing capture-related challenges.

- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.

### analysis_of_historical_design_rationale_systems.4.adoption_in_practice
**Confidence:** medium

The most directly relevant excerpt states that capture remains a key difficulty to rationale adoption, which directly aligns with the proposed limited evidence of sustained, industry-wide adoption. This supports the claim that while there may be perceived value in capturing rationale, practical adoption has been constrained by persistent capture challenges. Additional excerpts show that IBIS-based approaches frame rationale in terms of issues, positions, and arguments, indicating a formalized structure that could influence later tooling but does not by itself demonstrate broad, lasting adoption in industry. Other excerpts describe early tools and their applications (gIBIS, gIBIS-related designs, and related hypertext systems) and notes about design rationale research evolving over time, suggesting influence on later systems but not guaranteed widespread practice. A broader discussion of capture challenges and the evolution of rationale-aware tooling reinforces the interpretation that adoption was limited in practice, even as the conceptualbase shaped subsequent design reasoning tools.

- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been

### analysis_of_historical_design_rationale_systems.4.successes
**Confidence:** low

The finegrained field value asserts two specific points: (a) a successful coupling of design rationale to concrete design artifacts (like CAD objects) via the system, and (b) a critic mechanism that surfaces tacit knowledge at the moment of design and ties it to a formal rationale structure. The most directly relevant excerpt discusses a framework that frames rationale as issues (design questions), positions (answers), and arguments (support/refute), which reflects a formal, structured approach to design rationale capable of linking design deliberations to a rationale structure. This supports the idea that rationale can be organized in a way that could be aligned with artifacts and design moments, though it does not explicitly mention CAD object coupling or live critic mechanisms. Another excerpt explicitly notes that capture remains a key difficulty for rationale adoption, which challenges the claim of successful coupling and practical utility, suggesting that the claimed success may be overstated or limited in real-world contexts. Other excerpts describe gIBIS and related tools for capturing early design deliberations, or discuss the evolution and evaluation of design rationale systems (e.g., IBIS, QOC, DRed), which provide contextual support that such systems exist and have been studied, but do not provide direct evidence of tight artifact coupling or real-time tacit-knowledge critique at design time. Taken together, the strongest connections are about formalizing rationale (issues, options, criteria, positions, arguments) and about capture challenges; there is no unambiguous evidence in the excerpts that the claimed tight coupling to artifacts and live critic surfacing of tacit knowledge were realized in practice.

- [Feature, specification and evidence framework for ...](https://www.cambridge.org/core/journals/design-science/article/feature-specification-and-evidence-framework-for-communicating-design-rationale/324229D6DCBE5CE472AA3F47BC35665D)
  > by Y Mirabito · 2024 · Cited by 2 — IBIS frames rationale as issues (design questions), positions (answers to the design questions) and arguments (support/refute positions). An
- [Design rationale: Researching under uncertainty | AI EDAM](https://www.cambridge.org/core/journals/ai-edam/article/design-rationale-researching-under-uncertainty/CA05C6AE6DDD832D828B28590ACAE23D)
  > by JE Burge · 2008 · Cited by 55 — Capture remains a key difficulty to rationale adoption. There is little data available to indicate if the costs are, indeed, greater than
- [A Cognitive Analysis of Design Rationale Representation](https://simon.buckinghamshum.net/wp-content/uploads/2008/05/Shum_PhD_Final_1992_A_Cognitive_Analysis_of_Design_Rationale_Representation.pdf)
  > y Rittel.  PHI expands the
definition of Issue and introduces a new set of inter-Issue relationships.
- [glBIS: A Hypertext Tool for Exploratory Policy Discussion](http://csis.pace.edu/~marchese/CS835/Readings/p303-conklin_gibis.pdf)
  > by J CONKLIN · 1988 · Cited by 2323 — gIBIS is primarily a vehicle for the exploration of Issue-based methodologies for the capture of design rationale. It was intended from the start to be used by
- [glBIS: A Hypertext Tool for. Exploratory Policy Discussion](https://ase.in.tum.de/lehrstuhl_1/files/teaching/Lehrstuhl/DesignRationaleWiSe2003/conklin_1988.pdf)
  > by J Conklin · Cited by 2323 — ABSTRACT. This paper describes an application specific hypertext sys- tem designed to facilitate the capture of early design delib- erations.
- [DRed](https://impact.ref.ac.uk/casestudies/CaseStudy.aspx?Id=14057)
  > DRed was initially aimed at capturing design rationale, but subsequently broadened in its capability to become a `problem management' tool. DRed has been
- [Questions, options, and criteria: elements of design space ...](https://dl.acm.org/doi/abs/10.1207/s15327051hci0603%25264_2)
  > by A MacLean · 1991 · Cited by 1512 — Design Space Analysis is an approach to representing design rationale. It uses a semiformal notation, called QOC (Questions, Options, and Criteria),
- [gIBIS: a hypertext tool for exploratory policy discussion](https://dl.acm.org/doi/10.1145/62266.62278)
  > by J Conklin · 1988 · Cited by 2323 — This paper describes an application specific hypertext system designed to facilitate the capture of early design deliberations.
