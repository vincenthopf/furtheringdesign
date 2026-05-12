---
query: "How are conflicts between competing design goals represented, detected, and resolved in multi-stakeholder design contexts? Research: (1) Value-sensitive design — how conflicting values (privacy vs personalization, accessibility vs aesthetics, trust vs conversion) are formalized and negotiated. (2) Design trade-off analysis — methods from engineering design for handling Pareto-optimal solutions when goals are in tension. (3) Brand vs usability conflicts — documented cases where brand guidelines conflict with usability best practices (e.g., fashion brands with tiny text, luxury brands with minimal navigation) and how these are resolved. (4) Business goals vs user goals — the fundamental tension in product design between what the business wants (conversion, engagement, data collection) and what the user wants (speed, privacy, simplicity). How do product teams formalize and resolve this? (5) Accessibility constraints as non-negotiable goals — how WCAG requirements interact with other design goals, and the hierarchy of obligation. (6) Priority inheritance in goal models — when goals conflict, what determines which wins? Are there formal priority schemas? (7) The role of design principles as tie-breakers — how companies use stated design principles (e.g., 'user trust always wins') to resolve conflicts between competing objectives. Output: a formal model for representing, detecting, and resolving conflicts between intent dimensions in design."
processor: pro
run_id: trun_6b0c617b26214cd79593876c9acb88a4
created_at: 2026-05-05T03:19:23.160587Z
retrieved_at: 2026-05-05T03:32:35Z
---

# Research: How are conflicts between competing design goals represented, detected, and resolved in multi-stakeholder design contexts? Research: (1) Value-sensitive design — how conflicting values (privacy vs personalization, accessibility vs aesthetics, trust vs conversion) are formalized and negotiated. (2) Design trade-off analysis — methods from engineering design for handling Pareto-optimal solutions when goals are in tension. (3) Brand vs usability conflicts — documented cases where brand guidelines conflict with usability best practices (e.g., fashion brands with tiny text, luxury brands with minimal navigation) and how these are resolved. (4) Business goals vs user goals — the fundamental tension in product design between what the business wants (conversion, engagement, data collection) and what the user wants (speed, privacy, simplicity). How do product teams formalize and resolve this? (5) Accessibility constraints as non-negotiable goals — how WCAG requirements interact with other design goals, and the hierarchy of obligation. (6) Priority inheritance in goal models — when goals conflict, what determines which wins? Are there formal priority schemas? (7) The role of design principles as tie-breakers — how companies use stated design principles (e.g., 'user trust always wins') to resolve conflicts between competing objectives. Output: a formal model for representing, detecting, and resolving conflicts between intent dimensions in design.

## Findings

### Executive Summary

The proposed Design-Intent Conflict Model (DICM) is a formal framework designed to represent, detect, and resolve conflicts that arise between competing design intents in multi-stakeholder projects. It addresses common tensions such as privacy versus personalization, brand aesthetics versus usability, and business goals versus user needs. The core purpose of the model is to provide a structured process that ensures traceability from high-level principles and obligations (like legal constraints and accessibility standards) down to concrete design decisions. By employing the DICM, design and product teams can consistently represent complex, value-laden design intents, detect potential conflicts early in the process using both qualitative and formal methods, and resolve these conflicts through a principled, auditable procedure. This process prioritizes non-negotiable obligations and user trust while still enabling the achievement of business objectives, leading to more robust and ethically sound design outcomes.

### Formal Model Overview

The Design-Intent Conflict Model (DICM) is an integrated, three-part formal model that synthesizes concepts from Goal-Oriented Requirements Engineering (RE), Value-Sensitive Design (VSD), and decision theory to manage design conflicts.

1. Representation: The model uses a rich set of artifacts to capture design intent. Core elements include 'Goals' and 'Softgoals' (intents with varying satisfaction criteria), which are broken down through 'Refinements' (AND/OR structures). The relationships between goals are modeled with signed and weighted 'Contribution links' (Make, Help, Hurt, Break) and explicit 'Conflict links'. Crucially, the model elevates certain goals to 'Constraints'—non-negotiable obligations like legal requirements (e.g., GDPR) or accessibility standards (e.g., WCAG 2.x AA), which are modeled as mandatory, high-priority hard goals. 'Principles' (e.g., 'Focus on the user') act as meta-preferences for tie-breaking. The model also captures 'Stakeholders', 'Metrics' (including guardrail metrics for negative side effects), concrete 'Scenarios/Options', and potential 'Obstacles/Risks'. This structure is designed to be interoperable with established RE notations like KAOS, NFR, and Softgoal Interdependency Graphs (SIG).

2. Detection: Conflicts are surfaced through a multi-faceted approach. 
- Structural Detection: Identifies explicit 'Conflict' links and implicit tensions revealed by negative 'Hurt' or 'Break' contribution links between softgoals.
- Formal/Logical Detection: Employs divergence analysis to find boundary conditions where goals become inconsistent and uses obstacle analysis to preemptively identify conditions that could obstruct goals.
- Qualitative Propagation: Applies label propagation (e.g., 'satisficed', 'denied') on a Softgoal Interdependency Graph (SIG) to see how the choice of a low-level design option impacts high-level goals.
- Empirical Detection: Uses scenarios, user testing, and live monitoring to detect practical conflicts. For example, a design change might pass a brand review but trigger a guardrail metric by reducing accessibility (e.g., dropping below WCAG contrast ratios) or harming usability (e.g., lower task success rate).
- Optimization Lens: For measurable intents, the model maps them into a multi-objective space to reveal Pareto fronts, visually demonstrating the trade-offs between competing goals.

3. Resolution: The model provides a hierarchical and principled process for decision-making.
- Hierarchy of Obligation: The resolution process mandates that non-negotiable 'Constraints' (safety, law, accessibility) are satisfied first. These act as a floor for any acceptable solution.
- Principle-Based Tie-Breaking: If multiple options satisfy the constraints, organizational 'Principles' are applied as meta-preferences to guide the choice (e.g., a 'user-first' principle would prioritize the option with better user outcomes).
- Structured Negotiation and Trade-offs: For the remaining conflicts between optional goals, the model supports structured negotiation by capturing stakeholder win conditions. Decisions among alternatives are made using methods like qualitative SIG evaluation, quantitative multi-criteria decision analysis (MCDA) or Weighted Shortest Job First (WSJF), and Pareto-front analysis to find an optimal balance. 
- Documentation and Traceability: Every decision, along with its justification, impact on goals, and evidence of compliance with constraints, is logged for full traceability and auditability.

### Goal Representation Formalisms

The formal representation of design intents involves a set of core artifacts. 'Goals' and 'Softgoals' are used to capture intent statements at various levels of abstraction; hard goals have clear satisfaction criteria, while softgoals are 'satisficed' to an acceptable degree. This distinction allows for modeling both functional requirements (often as hard goals) and non-functional requirements like usability or performance (as softgoals). These goals are organized into 'Refinements' using AND/OR structures to show how a high-level goal can be achieved through a combination of subgoals (AND) or alternative options (OR). Business goals (e.g., conversion), user goals (e.g., simplicity), and human values (e.g., trust, privacy) are typically modeled as softgoals with associated 'Metrics' to track their achievement. Crucially, 'Constraints' represent non-negotiable obligations like legal requirements (e.g., GDPR), safety standards, or accessibility mandates (e.g., WCAG), which are modeled as high-priority hard goals. 'Principles' act as high-level organizational tie-breakers (e.g., 'Focus on the user'). Other key artifacts include 'Stakeholders' and their responsibilities, 'Scenarios/Options' as concrete design alternatives, and 'Obstacles/Risks' that could impede goal satisfaction. A formal data model underpins this, with canonical fields for each artifact, such as `Goal(id, name, type{hard|soft}, category{functional|NFR|value|legal}, priority, spec, owner)`.

### Interdependency And Conflict Modeling

**Modeling Structure:** The model uses graphical structures such as Goal/Softgoal graphs, drawing from established practices like the KAOS and NFR frameworks. Specifically, it employs Softgoal Interdependency Graphs (SIGs) to represent goals and their relationships. The structure is further defined by AND/OR decomposition trees, where 'OR' refinements represent alternative means–ends options for achieving a goal, and 'AND' refinements represent a conjunction of mandatory subgoals.

**Relationship Types:** Interdependencies between goals are modeled using two main types of links: 1) 'Contribution links' are directed, signed, and potentially weighted connections that describe how the satisfaction of one goal impacts another (e.g., positively or negatively). 2) 'Conflict links' are used to model explicit, direct structural opposition, indicating that the satisfaction of one goal is likely to prevent the satisfaction of another.

**Contribution Link Examples:** The framework adopts contribution types from the NFR (Non-Functional Requirements) framework. These include 'Make' (a strong positive contribution, sufficient to satisfice the goal), 'Help' (a partial positive contribution), 'Hurt' (a partial negative contribution), and 'Break' (a strong negative contribution, sufficient to deny the goal). The model also allows for optional numerical weights (e.g., within a range like [-1.0, +1.0]) to be assigned to these links to quantify the strength of the impact.

**Formal Conflict Definition:** A conflict is formally defined in two primary ways. The first is a structural definition via an explicit 'Conflict link' between two goals, which signifies that 'the satisfaction of one may prevent the other from being satisfied'. The second is a more formal, logical definition of a 'divergence,' which is an inconsistency between goals that emerges under a specific boundary condition. These divergences are identified through formal analysis techniques.


### Conflict Detection Techniques

The model outlines several systematic methods for detecting conflicts. 
1. **Structural Detection:** This involves identifying explicit 'Conflict links' that have been manually added to the model, as well as discovering implicit tensions by finding negative 'contribution links' (e.g., 'Hurt' or 'Break') between important goals. It also includes checking for mutually exclusive sub-plans within AND/OR decompositions.
2. **Formal/Logical Detection:** This uses more rigorous techniques. 'Divergence analysis' is used to formally identify boundary conditions under which goals become logically inconsistent. 'Obstacle analysis' is another technique used to abductively generate conditions or events that could obstruct goal satisfaction, which can be precursors to conflicts.
3. **Qualitative Propagation:** This technique applies a label propagation algorithm to a Softgoal Interdependency Graph (SIG). By assigning an initial satisfaction status to low-level design options, the algorithm propagates this evaluation up the graph to reveal whether high-level goals become 'satisficed', 'denied', or 'conflicting'.
4. **Scenario and Empirical Detection:** Conflicts are also detected through practical validation. This includes running scenarios, conducting usability tests, and monitoring key metrics. 'Guardrail metrics' are particularly important; a breach (e.g., readability falling below WCAG contrast standards, or customer complaint rates spiking after a change) indicates a real-world conflict between a design change and a user or accessibility goal.
5. **Optimization Lens:** For measurable intents, goals can be mapped into a multi-objective optimization space. This allows for the generation of Pareto fronts, which visually expose the inherent trade-offs between competing goals and help identify 'knee' points that represent optimal compromises.

### Qualitative Reasoning For Detection

**Originating Framework:** The Non-Functional Requirements (NFR) Framework provides the basis for this reasoning technique. It uses graphical models, specifically Softgoal Interdependency Graphs (SIGs), to represent and reason about qualitative goals that lack clear, binary satisfaction criteria.

**Reasoning Algorithm:** The model uses a label propagation algorithm that operates on the Softgoal Interdependency Graph (SIG). The process starts by assigning initial evaluation labels to the lowest-level goals or design alternatives (operationalizations). The algorithm then propagates these labels upwards through the graph, following the contribution links, to determine the resulting evaluation status of the higher-level parent goals.

**Evaluation Labels:** The reasoning process uses a set of qualitative labels to evaluate the status of each softgoal. The key labels mentioned are 'satisficed' (indicating the goal is sufficiently achieved), 'denied' (the goal is sufficiently refuted), and 'conflicting' (the goal is subject to strong positive and negative contributions simultaneously). An 'undetermined' label may also apply if there is insufficient information to make a judgment.

**Purpose:** The primary purpose of this reasoning process is to evaluate the impact of concrete design decisions and alternatives on high-level, non-functional goals (softgoals). It allows stakeholders to systematically analyze trade-offs and understand how specific choices contribute positively or negatively to various strategic intents, thereby surfacing conflicts that might otherwise be hidden.


### Conflict Resolution Strategies

The Design-Intent Conflict Model (DICM) provides a catalog of resolution strategies centered around a clear hierarchy of obligations, negotiation, and goal transformation. The primary strategy is a hierarchical decision-making process:
1.  **Satisfy Non-Negotiable Constraints:** The highest priority is given to satisfying immutable constraints, which are modeled as mandatory hard goals. This includes legal requirements, safety standards, and accessibility obligations (e.g., WCAG 2.x Level AA). Any design option that violates these is immediately discarded.
2.  **Apply Organizational Principles:** When multiple feasible options remain, organization-level principles act as meta-preferences or tie-breakers. For example, a principle like "Focus on the user and all else will follow" would prioritize options that enhance user trust and experience over those that might offer short-term business gains at the user's expense.
3.  **Analyze and Choose Alternatives:** Within the feasible region defined by constraints and principles, a choice is made using a combination of qualitative and quantitative methods. These include Softgoal Interdependency Graph (SIG) evaluation, Multi-Criteria Decision Analysis (MCDA), Weighted Shortest Job First (WSJF) for prioritization, and Pareto-front analysis to balance competing intents under established guardrail metrics.

Beyond this hierarchy, the model includes several transformation and mitigation strategies derived from goal-oriented analysis:
*   **Negotiation and Agreements:** For multi-stakeholder conflicts, a structured process is used to capture stakeholder 'win conditions', frame the conflict as 'issues', explore 'options', and document formal 'agreements'.
*   **Goal Transformation:** Conflicts can be resolved by modifying the goals themselves. This includes 'goal weakening' (narrowing a goal's scope), 'goal substitution' (achieving the underlying value via a different mechanism), and 'agent substitution' (reassigning responsibility).
*   **Obstacle Resolution:** This involves proactively addressing conditions that could obstruct goals through 'obstacle mitigation' (adding new controls), 'obstacle prevention', or defining 'restoration' fallbacks.

### Negotiation Based Resolution

**Model Name:** WinWin Negotiation Model

**Key Proponent:** Barry Boehm

**Core Artifacts:** The key artifacts generated during the WinWin negotiation process are: 'Win Conditions' (representing the goals and desired outcomes for each stakeholder), 'Issues' (which document the conflicts identified between different stakeholders' win conditions), 'Options' (proposed alternative solutions or goal formulations to address the issues), and 'Agreements' (the mutually accepted set of goals, constraints, and chosen alternatives that reconcile the conflict).

**Process Overview:** The negotiation process is an iterative, three-step model designed for multi-stakeholder conflict resolution. The process begins by (1) identifying the key stakeholders and eliciting their individual 'win conditions'. Next, (2) the model is used to detect conflicts between these win conditions, which are then structured as 'issues'. Finally, (3) the stakeholders reconcile these conflicts through negotiation, exploring various 'options' to reach a mutually agreed-upon set of goals, constraints, and alternatives, which is then formalized as an 'agreement'.


### Trade Off And Optimization Analysis

**Technique Name:** Design Trade-off and Optimization Analysis (using Pareto Fronts and WSJF)

**Core Concept:** The central idea is to approach design conflicts as a multi-objective optimization problem. Measurable design intents (e.g., conversion rate vs. user trust) are mapped into a multi-objective space to identify the 'Pareto-optimal front'. This front is a set of non-dominated solutions where it's impossible to improve one objective without degrading another. Visualizing this front reveals the inherent trade-offs and helps identify optimal compromise solutions, such as 'knee' points that offer a good balance. Clustering can be used to ensure a diverse spread of solutions along the front.

**Example Formula:** While Pareto analysis is a visualization and selection concept, it is often used with quantitative prioritization methods. A key example provided is for Weighted Shortest Job First (WSJF), used for sequencing work: 'WSJF = Cost of Delay / Job Duration'. The Cost of Delay itself can be a composite score including factors like user business value, time criticality, and risk reduction.

**Application:** This technique is applied to make informed, data-driven decisions when goals are in tension. For example, a team can use it to select from a set of 'Pareto-efficient' design variants that sustain business conversion goals while respecting user experience guardrails (e.g., low complaint rates, high task success). It allows teams to move beyond simple win/loss decisions and find optimal balances. Once a design option is selected from the Pareto front, WSJF can then be used to prioritize its implementation relative to other features in a backlog by quantifying its economic value against its implementation size.


### Prioritization And Goal Hierarchy

**Prioritization Schema:** Priority is established through a formal attribute attached to goals within a goal model. This attribute can define priority in several ways, including as 'mandatory' or 'optional', or through a specific 'rank' or 'weight'. This priority information is then explicitly used for resolving conflicts between competing goals. The hierarchical structure of goals, with parent goals and subgoals (refinements), allows for a structured understanding of how priorities relate across different levels of abstraction.

**Weighting Method:** The model employs both qualitative and quantitative techniques for assigning importance to goals. Qualitatively, 'Contribution links' define the relationship between goals using signed types like 'Make', 'Help', 'Hurt', or 'Break'. Quantitatively, these links can be assigned numerical weights (e.g., within a range of -1.0 to +1.0) to specify the strength of the impact. For choosing among alternatives, the model suggests using quantitative methods like Multi-Criteria Decision Analysis (MCDA) and Weighted Shortest Job First (WSJF) to balance various intents and constraints.

**Hierarchy Of Obligation:** A distinct hierarchy of obligation is a core resolution principle. Non-negotiable constraints, which include legal requirements, safety standards, and accessibility standards (e.g., WCAG 2.x Level AA), are treated as 'mandatory hard goals' with the highest possible priority. These constraints must be satisfied first. Any design option that violates these constraints is automatically excluded. For example, if a brand's aesthetic conflicts with accessibility contrast requirements, the accessibility requirement 'wins by rule'.


### Design Principles As Resolution Mechanism

**Principle Role:** Design principles function as high-level, organization-specific 'tie-breakers' or 'meta-preferences' within the decision-making process. They are not the first consideration but are applied after non-negotiable constraints (like legal and accessibility requirements) have been met. Their purpose is to guide choices and resolve conflicts between competing objectives or design options that are otherwise equally weighted or viable.

**Company Example 1:** Google's core philosophy, 'Focus on the user and all else will follow,' is cited as a specific example of an organization-level principle that acts as a tie-breaker in design decisions.

**Company Example 2:** The principle of 'customer-obsession precedence' is mentioned as a mechanism for resolving conflicts. This principle, famously associated with Amazon, dictates that in a conflict, the choice that best serves the customer should be prioritized.

**Application Context:** Principles are applied in situations where a choice must be made between competing goals that have survived the initial filter of non-negotiable constraints. For example, when resolving the tension between business conversion goals and user experience (e.g., removing dark patterns), a 'user-first' principle is applied. Similarly, when navigating the trade-off between privacy and personalization, the final decision and its rationale can be logged and justified under a 'user trust' principle. They provide a consistent, value-based framework for making decisions in ambiguous situations.


### Foundational Frameworks And Theories

| Framework Name | Key Proponents | Core Concept | Contribution To Model |
| --- | --- | --- | --- |
| Goal-Oriented Requirements Engineering (GORE) - KAOS & NFR Frameworks | A. van Lamsweerde (KAOS), L. Chung (NFR Framework) | GORE involves capturing system objectives as 'goals' (for functional requirements with clear satisfaction criteria) and 'softgoals' (for non-functional requirements like usability or security that are 'satisficed' rather than strictly satisfied). These goals are refined into hierarchies using AND/OR decompositions. The NFR Framework specifically uses Softgoal Interdependency Graphs (SIGs) to model how different goals contribute positively (Make, Help) or negatively (Hurt, Break) to each other, allowing for qualitative reasoning about design alternatives through a label propagation process. | GORE provides the fundamental representational artifacts for the Design-Intent Conflict Model (DICM). This includes the concepts of Goals, Softgoals, Refinements (AND/OR structures), and Contribution links. The DICM adopts the NFR framework's SIGs and label propagation for its qualitative evaluation of design options. Furthermore, it incorporates formal methods from GORE/KAOS, such as 'divergence analysis' to find inconsistencies between goals and 'obstacle analysis' to proactively identify conditions that could obstruct goal achievement, which are key components of the model's conflict detection mechanism. |
| Value-Sensitive Design (VSD) | Batya Friedman, Peter Kahn, Jr., Alan Borning | VSD is a design methodology that advocates for the proactive and principled consideration of human values throughout the entire technology design process. It employs a tripartite methodology involving conceptual (defining values), empirical (understanding how stakeholders experience values), and technical (embedding values into the technology's architecture and features) investigations. | VSD provides the ethical and methodological imperative for the DICM to treat human values, such as privacy, trust, and transparency, as first-class design intents. It guides the elicitation process to ensure these values are identified and modeled explicitly as softgoals within the framework. This allows the DICM to systematically analyze and resolve conflicts involving fundamental human values, such as the tension between privacy and personalization, by making them visible and subject to the same rigorous analysis as functional or business goals. |
| WinWin Negotiation Model | Barry Boehm | The WinWin model is a stakeholder-centric negotiation framework for requirements engineering. It follows an iterative process where stakeholders first define their individual 'win conditions' (what they need to succeed). The model then helps identify conflicts between these conditions. Finally, it facilitates a structured negotiation where stakeholders invent options and forge agreements that reconcile conflicts and lead to a mutually satisfactory outcome. | The WinWin model provides the structural basis for the conflict resolution and negotiation phase within the DICM. It informs the process of capturing stakeholder win conditions and structuring the resolution of conflicts around a cycle of identifying issues, generating options, and documenting agreements. This ensures that when conflicts arise between different stakeholders' goals, there is a collaborative and transparent process for reaching a decision that all parties can agree to, which is then logged for traceability. |
| Multi-Objective Optimization & Pareto Analysis | Vilfredo Pareto (originator of the concept) | This is a mathematical and computational approach used in engineering and economics to find optimal solutions for problems with multiple, often competing, objectives. A solution is 'Pareto optimal' if it's impossible to improve one objective without degrading at least one other. The set of all such optimal solutions is called the 'Pareto front,' which visually represents the trade-offs between the objectives. | This framework provides a quantitative method for conflict detection and resolution in the DICM, especially when goals can be measured. By mapping measurable design intents (e.g., conversion rate vs. page load time) into a multi-objective space, the model can identify the Pareto front of design alternatives. This allows teams to move beyond simple win/loss decisions and instead analyze the entire trade-off space, helping them select 'non-dominated' options that offer the best possible balance between competing goals, such as identifying a 'knee' point that provides a good compromise. |

### Case Study Brand Vs Usability

**Conflicting Goal 1:** Brand minimalism, low-contrast color palettes, and flat UI aesthetics.

**Conflicting Goal 2:** Usability best practices, including readability, discoverability, and accessibility (WCAG contrast ratios).

**Specific Example:** A mobile e-commerce site with severe contrast issues where white text is overlaid on images, making it almost impossible to read. Another example is the use of flat UI with weak signifiers that require more user effort to identify clickable elements.

**Analysis Source:** Baymard Institute and Nielsen Norman Group (NNG)


### Case Study Business Vs User Goals

**Business Goal Example:** Increase business conversion and implement growth tactics, which may include dark patterns or other forms of Online Choice Architecture (OCA).

**User Goal Example:** Maintain user trust, ensure task success, and have a positive user experience free from manipulative patterns.

**Resolution Mechanism:** Guardrail metrics

**Mechanism Description:** Monitoring key user experience and trust indicators (e.g., complaint rate, opt-out rate, support contacts) to act as constraints. While pursuing a primary business goal like conversion, the team ensures these guardrail metrics do not degrade or cross a predefined negative threshold, thus preventing harm to the user experience.


### Case Study Accessibility As A Constraint

**Constraint Standard:** Web Content Accessibility Guidelines (WCAG) 2.x Level AA, including specific criteria for text contrast (e.g., 4.5:1) and non-text control contrast (e.g., 3:1).

**Nature Of Goal:** A non-negotiable, mandatory hard goal that is treated as a precondition for release.

**Hierarchy Impact:** It establishes a clear hierarchy of obligation where accessibility requirements must be satisfied first. In any conflict with other design goals, such as brand aesthetics or layout preferences, accessibility wins by rule, forcing the other goals to adapt.

**Legal Context:** Conformance to legal and regulatory requirements such as the US Section 508 standards, which explicitly incorporate WCAG 2.0 Level AA by reference.


### Model Implementation Guidelines

The implementation of the Design-Intent Conflict Model (DICM) follows a structured, iterative workflow designed to integrate conflict management into the design process from start to finish. The process begins with **1) Eliciting intents and stakeholders**, where teams derive goals and softgoals from various sources (e.g., user research, business requirements) and use techniques like asking 'WHY' and 'HOW' to build a hierarchical goal model. Concurrently, the win conditions for all key stakeholders are identified. Next, in step **2) Attach principles, constraints, and metrics**, the model is enriched with foundational rules. This involves declaring non-negotiable constraints such as legal regulations (e.g., GDPR), safety standards, and accessibility obligations (e.g., WCAG 2.x AA), as well as organization-level design principles that act as tie-breakers. For each significant goal, measurable outcome metrics and protective 'guardrail' metrics (to monitor for negative side-effects) are defined. Step **3) Map contributions and responsibilities** involves detailing the relationships within the model by connecting goals with signed and weighted contribution links (e.g., 'Help', 'Hurt') and formally noting any explicit conflicts. Responsibilities for each goal are assigned to specific stakeholders. With the model structured, step **4) Generate options and obstacles** focuses on creativity and risk analysis, where teams propose concrete design alternatives that operationalize the goals and run obstacle analysis to anticipate potential failures and devise mitigation strategies. Step **5) Evaluate alternatives** is the core analytical phase, employing a multi-faceted approach: qualitative evaluation via label propagation in Softgoal Interdependency Graphs (SIG), formal analysis to detect logical divergences, empirical validation through user testing and scenarios, and quantitative analysis using methods like Pareto front exploration, Multi-Criteria Decision Analysis (MCDA), or Weighted Shortest Job First (WSJF). In step **6) Decide and log**, a decision is made by first applying the strict hierarchy of obligations (non-negotiable constraints must be met), then using company principles to guide choices among the remaining feasible options. The selected option set, along with the detailed rationale, supporting evidence, and stakeholder agreements, is meticulously documented in a decision log for future reference and auditability. Finally, step **7) Operationalize and monitor** translates the decision into actionable engineering tickets, test cases, and conformance checks. Monitoring systems are established to track the defined metrics and guardrails in the live product, providing continuous feedback that informs the next iteration of the design cycle.

### Conclusion And Future Directions

The Design-Intent Conflict Model (DICM) offers a significant strength by providing a systematic, transparent, and auditable process for navigating the complex and often value-laden trade-offs inherent in modern design. Its foundation in established theories from Goal-Oriented Requirements Engineering, combined with the practical application of guardrail metrics and non-negotiable constraints like accessibility, ensures that teams can pursue business objectives without sacrificing user trust or ethical obligations. By making intents, conflicts, and resolutions explicit, the model facilitates clearer communication and more deliberate decision-making among diverse stakeholders.

For future work, several directions could enhance the model's utility and adoption. A primary area is the development of a supporting 'DICM toolkit'. This could include:
- **Automation of Conflict Detection:** Creating software tools that can automatically parse goal models to perform divergence analysis, flag negative contribution loops in Softgoal Interdependency Graphs, and identify potential conflicts based on formal logic.
- **Integrated Conformance Scanners:** Building plugins for design and development environments that automatically check against non-negotiable constraints, such as running WCAG contrast checkers on design mockups or code commits.
- **Expansion of Resolution Pattern Libraries:** Systematically documenting more application patterns for common tensions (e.g., security vs. convenience, speed vs. feature richness). This would create a library of pre-analyzed strategies and design transformations that teams could draw upon.
- **Interactive Decision Aids:** Developing tools like Pareto-front explorers for visualizing trade-offs between measurable goals and integrated WSJF calculators to help teams prioritize work in a way that is consistent with the model's principles. 
- **Enhanced Decision Logging:** Creating a standardized decision register format and associated tools to streamline the process of logging choices, justifications, and evidence, making traceability even more robust.


## Research Basis

### qualitative_reasoning_for_detection
**Confidence:** high

The finegrained field value asserts that the NFR Framework uses Softgoal Interdependency Graphs (SIGs) to model qualitative goals and that a label propagation algorithm is used to move evaluations from low-level goals up to higher-level goals. It also specifies qualitative labels such as satisficed, denied, and conflicting, and describes the ultimate purpose as evaluating how design decisions affect high-level softgoals and surfacing conflicts. The most directly supportive excerpts explicitly define the SIG within the NFR framework, show the relationship between softgoals and their operationalized contributions, and describe the propagation of labels along contribution links to higher-level goals. They also explicitly mention the evaluation labels and the goal-oriented reasoning process. Additional excerpts discuss related aspects such as conflict analysis and goal-driven requirements engineering, which align with the propagation and conflict-resolution theme, reinforcing how such reasoning operates within this framework.

- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.
- [Softgoal Interdependency Graph](https://www.researchgate.net/figure/Softgoal-Interdependency-Graph_fig1_252433775)
  > Throughout the paper we use NFR-framework notations [Chung, Nixon, Yu and Mylopoulos 2000] to indicate how the operationalised softgoals (bold cloud) satisfy a
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–

### executive_summary
**Confidence:** medium

The core idea is a formal approach to identifying and resolving conflicts between competing design intents in multi-stakeholder settings, with traceability from high-level obligations to concrete design choices. The most directly relevant excerpt discusses goal-level conflict resolution and notes that conflict resolution is down-propagated to requirements via goal-based negotiation, which aligns with a model that formalizes detection and resolution of conflicts among intents. Another excerpt explicitly frames conflict analysis in goal-driven requirements engineering by highlighting obstacle and conflict analysis as a technique, which supports a structured, formal method. Additional excerpts introduce foundational approaches to value tensions in design (Value Sensitive Design) and its role in accounting for human values when balancing competing objectives, which underpin the normative basis of a design-intent conflict model. Further support comes from references to a framework where high-level goals and non-functional requirements are linked (via a framework that relates architectural decisions to softgoals), reinforcing the idea of traceability from principles/obligations to design decisions. Several excerpts address non-negotiable constraints and accessibility standards (WCAG/508), illustrating how obligations interact with design goals and should be integrated into any formal conflict-resolution model. Collectively, these excerpts provide the theoretical components (goal-level conflict analysis, traceability to requirements, value considerations, and obligations) that underpin a formal model like the Design-Intent Conflict Model described in the executive_summary.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Goal-oriented requirement language model analysis using ...](https://journals.sagepub.com/doi/10.3233/MGS-220242)
  > A GRL diagram illustrates stakeholders' high-level strategic goals, non-functional requirements and alternative options to accomplish the business objectives.
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [General Data Protection Regulation (GDPR) – Legal Text](https://gdpr-info.eu/)
  > Here you can find the official PDF of the Regulation (EU) 2016/679 (General Data Protection Regulation) in the current version of the OJ L 119, 04.05.2016
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.

### conflict_detection_techniques
**Confidence:** high

- The notion of managing conflicts in goal-driven requirements engineering directly supports the overall objective of detecting and resolving tensions among design intents, illustrating a structured approach to identifying conflicts and presenting methods that can be formalized within a model. The excerpt discusses how conflicts are analyzed within goal-driven frameworks, aligning with the formal, methodical detection dimension of the desired model. 
- An explicit treatment of design obstacles as a form of conflict analysis provides concrete techniques for identifying when goals cannot be satisfied simultaneously, and frames obstacle analysis as a degenerate case of conflict analysis, which maps cleanly onto the obstacle/constraint reasoning part of the fine-grained field value. 
- References that describe detecting conflicts and inconsistencies in requirements and big projects using model-based approaches emphasize systematic detection, which reinforces the structural and scenario-based detection components of the model, including managing interdependencies among goals and their satisfactions. 
- Scenario-driven and empirical detection, including mentions of running usability scenarios and guardrail metrics as indicators of real-world conflicts between design changes and goals (e.g., readability or user outcomes), align with the empirical validation and ongoing monitoring aspects of the model. 
- The literature on goal-oriented requirements engineering, including mentions of conflict resolution and the down-propagation of goal-level decisions to requirements, supports the idea that detected conflicts can be analyzed and resolved within a formal framework, including the potential use of Pareto-optimal analysis for trade-offs. 
Collectively, these excerpts map well to a formal model for representing, detecting, and resolving conflicts among intent dimensions by providing structured methods (structural, formal/logical, propagation, empirical validation) and points of practical application (scenarios, guardrails, and optimization perspectives).

- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Detecting Web requirements conflicts and inconsistencies ...](https://www.sciencedirect.com/science/article/abs/pii/S0164121213001337)
  > by MJ Escalona · 2013 · Cited by 29 — This article presents an approach for the systematic conciliation of requirements in big projects dealing with a model-based approach. The article presents a
- [Detecting Conflicts and Inconsistencies in Web Application ...](https://idus.us.es/bitstreams/d2172526-69c0-41a1-821a-5d5c4789e5ec/download)
  > by M Urbieta · Cited by 29 — The analysis and detection of conflicts in the requirements phase are one of the most critical tasks in requirements engineering [15]. A global view presented
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [ITU-T Recommendation database](https://www.itu.int/ITU-T/recommendations/rec.aspx?rec=9623&lang=en)
  > Nov 13, 2008 — The goal sub-notation is called goal-oriented requirements language (GRL) and the scenario sub-notation is called use case map (UCM).

### negotiation_based_resolution
**Confidence:** high

The core fine-grained field value describes a formal WinWin negotiation model where conflicts between stakeholder goals are captured as win conditions and issues, resolved through iterative negotiation, and formalized into agreements including goals, constraints, and chosen alternatives. The most directly relevant excerpt explicitly states that stakeholders begin by entering their win conditions, that conflicts among these conditions are documented as issues, and that negotiation explores options to produce mutually accepted agreements that reconcile goals, constraints, and alternatives. Supporting detail from related sources describes the broader practice of resolving conflicts at the goal level (and propagating resolutions to requirements), the notion of a conflict link between goals, and the use of structured goal models to rationalize and resolve conflicts. Collectively, these excerpts map onto the described three-step process (identify stakeholders and win conditions, detect conflicts as issues, reconcile via negotiation to a formal agreement) and the artefacts involved (win conditions, issues, options, agreements). The additional excerpts reinforce that conflict analysis is a formal, goal-oriented activity and that negotiation outcomes are captured within goal-model frameworks, providing a cohesive evidence base for the proposed formal model of representing, detecting, and resolving conflicts between intent dimensions in design.

- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Rationalization of Goal Models in GRL using Formal ...](http://www.florisbex.com/papers/RENext.pdf)
  > by M van Zee · Cited by 40 — GRL allows for several types of analysis and evaluation techniques to assess the satisfaction of goals and thus to decide on high-level alternatives. Although

### conflict_resolution_strategies
**Confidence:** high

The core finegrained field value describes a formal model with a clear hierarchy of obligations and a structured process for resolving conflicts among design intents. A key excerpt explicitly notes that conflict resolution at the goal level is propagated down to requirements and mentions goal-based negotiation, indicating that resolving conflicts is an organized, hierarchical process rather than ad hoc. Another excerpt defines a conflict link between two goals as arising when the satisfaction of one prevents the other, which directly supports the idea of formalized conflict relationships that must be managed. Additional sources describe conflict management in goal-driven requirements engineering, reinforcing the notion of structured negotiation and formal agreements to resolve disputes. Further, discussions of obstacle analysis as a degenerate form of conflict analysis illustrate transformation and mitigation mechanisms that modify goals or constraints to resolve conflicts. The presence of softgoal interdependency graphs and structured evaluation frameworks (SIG) and related NFR/GRL notions demonstrates the use of formal tools to support decision-making in conflict scenarios. Together, these excerpts align with a hierarchical decision-making model that prioritizes non-negotiable constraints, applies organizational principles as tie-breakers, and uses quantitative/qualitative methods to analyze and choose between alternatives, including negotiation, goal transformation, and obstacle mitigation.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007

### case_study_business_vs_user_goals
**Confidence:** high

The most directly relevant material describes guardrail metrics as a mechanism to balance competing objectives and to monitor indicators that prevent harm to the user experience while pursuing business goals. The first excerpt on guardrail metrics presents a direct guide to these concepts in product design, aligning with the stated resolution mechanism of monitoring key UX and trust indicators to constrain business objectives. Related discussions about guardrail metrics in other sources reinforce this approach as a governance or decision-support tool rather than a pure optimization technique, which supports the idea of an explicit mechanism to resolve business-user conflicts. Additional excerpts describe trade-off evaluation and characterizing conflicts in goal-driven requirements engineering: these provide foundational methods for how to understand and navigate tensions between goals and how to operationalize resolution, including when to prefer certain goals or how to propagate satisfaction through the design. The presence of Win/Win and goal-negotiation literature shows formal ways to reason about conflicts at the goal level and how to translate those resolutions into design decisions, which buttress the concept of a formal model. The Value Sensitive Design and design-principle discussions offer tie-breaker guidance that organizations may rely on when guardrails alone are insufficient to resolve disputes, illustrating higher-level governance rules that can influence which goals prevail. Contextual references to WCAG and accessibility constraints give boundary conditions that must be respected within any guardrail-based model, ensuring accessibility considerations are not overridden by business imperatives.

- [What are Guardrail Metrics?](https://www.harness.io/harness-devops-academy/guardrail-metrics)
  > Dec 9, 2024 — Guardrail metrics are business metrics designed to indirectly measure business value and provide alerts about any potentially misleading or
- [North Star and Guardrail Metrics Aligning Product Success ...](https://siftfeed.com/guides/north-star-guardrail-metrics)
  > Guardrail Metrics (or counter-metrics) are secondary measures used to monitor for potential negative impacts of changes or experiments. For instance, if
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Online Choice Architecture: How digital design can harm ...](https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers)
  > Apr 5, 2022 — The discussion paper “Online Choice Architecture: how digital design can harm competition and consumers” provides an overview of what OCA is and

### goal_representation_formalisms
**Confidence:** high

The field value outlines a comprehensive formal model for representing design intents, where goals (hard) and softgoals capture functional and non-functional aspirations, respectively. It also emphasizes refinements decomposed via AND/OR structures to show how a high-level goal is achieved through subgoals, and it treats constraints such as legal or accessibility mandates as high-priority hard goals. The model includes stakeholders, scenarios/options, obstacles/risks, and design principles as tie-breakers to resolve conflicts among competing objectives. The most directly relevant sources describe how goal-oriented requirements engineering formalizes goals, softgoals, and refinements, and how conflicts among goals are analyzed and resolved. They also connect non-functional requirements to architectural decisions via contribution links, and describe formal notations (GRL, NFR framework, KAOS) that support this kind of representation. Additional excerpts discuss obstacle analysis and conflict detection/resolution techniques, which are essential for turning the qualitative model into a decision-making process with explicit priorities and tie-breakers. Taken together, these excerpts substantiate a formal data model with Goal(id, type, category, priority, spec, owner), softgoals with metrics, hard goals as obligations, Refinements with AND/OR structures, Constraints as non-negotiables, and Principles as organizational tie-breakers. The content also covers the alignment of architectural decisions with softgoals via contribution links, and the prioritization rules that determine which goals win in conflicts, confirming the feasibility of the described formal model for representing, detecting, and resolving intent conflicts in design.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Z.151](https://www.itu.int/rec/dologin_pub.asp?lang=f&id=T-REC-Z.151-200811-S!!PDF-E&type=items)
  > GRL has its roots in two widespread goal-oriented modelling languages: i* and the NFR Framework. Major benefits of GRL over other popular notations include the.
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Detecting Web requirements conflicts and inconsistencies ...](https://www.sciencedirect.com/science/article/abs/pii/S0164121213001337)
  > by MJ Escalona · 2013 · Cited by 29 — This article presents an approach for the systematic conciliation of requirements in big projects dealing with a model-based approach. The article presents a

### prioritization_and_goal_hierarchy
**Confidence:** high

The concept of prioritizing competing goals in a goal-driven requirements engineering context is illustrated by discussions of prioritization at the goal level and how conflicts are resolved. Specifically, an examination of goal-based negotiation shows that resolving conflicts involves propagating considerations from higher-level goals to lower-level requirements, providing a mechanism for establishing which goals take precedence when tensions arise. When a direct link between goals indicates that satisfying one may prevent another, this frames the core idea of prioritization and potential trade-offs in the model. Additionally, descriptions of obstacle and conflict analysis emphasize analyzing where goals clash and how to determine which goals should prevail, supporting the notion of a formal hierarchy and resolution order. The literature also highlights the use of both qualitative contribution links (Make, Help, Hurt, Break) and quantitative weights to express the strength of goal interactions, which aligns with the described weighting methods. Together, these sources illustrate a formal schema where goals carry priority levels (e.g., mandatory vs optional, or rank/weight), where conflicts are resolved through structured analysis and negotiation, and where hard obligations (such as WCAG accessibility requirements) trump other considerations when necessary. The inclusion of softgoal interdependency graphs and their use for relating architectural decisions to softgoals further demonstrates how hierarchy and contribution influence prioritization decisions. In sum, the field value aligns with a model that (a) assigns explicit priority to goals, (b) supports both qualitative and quantitative weighting of goal interactions, and (c) enforces a hierarchy of obligation that elevates mandatory constraints above negotiable objectives.


- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a

### trade_off_and_optimization_analysis
**Confidence:** high

The target fine-grained field value describes a rigorous method for handling design conflicts as a multi-objective optimization problem. Evidence from the referenced excerpts shows a cohesive set of techniques: first, a Pareto-optimal front is used to show non-dominated design variants that balance competing goals; this provides the core representation of trade-offs and the space in which choices are made. Second, explicit discussion of trade-offs and their management demonstrates how to reason about competing objectives beyond binary win/lose outcomes. Third, the Weighted Shortest Job First (WSJF) formula is presented as a concrete prioritization mechanism to sequence work on selected design variants, incorporating factors like costs of delay and job duration, which aligns with prioritizing trade-off resolutions in a backlog or project plan. Additional material on goal conflict analysis and obstacle handling offers practical methods for detecting conflicts, analyzing their causes, and applying principled tie-breakers, which can be embedded into the model as steps for conflict identification, impact assessment, and resolution strategies. Collectively, these excerpts support constructing a formal model that (a) maps design intents to a multi-objective space, (b) identifies Pareto-efficient options, (c) uses structured criteria (e.g., cost of delay) to compare options, and (d) provides explicit rules to resolve remaining tensions when trade-offs are still ambiguous. The model can therefore formalize detection of conflicts, evaluation of trade-offs, and principled resolution using Pareto analysis complemented by WSJF-based prioritization and formal tie-breakers drawn from design principles and obstacle analysis.

- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [Weighted Shortest Job First (WSJF) | Glossary](https://www.productplan.com/glossary/weighted-shortest-job-first-wsjf)
  > How is WSJF calculated? Often, Weighted Shortest Job First is a simple formula: Cost of Delay divided by Job Duration (or Size). Step 1: Calculate
- [Definition of weighted shortest job first (WSJF)](https://airfocus.com/glossary/what-is-weighted-shortest-job-first/)
  > Cost of delay / Job duration = WSJF value. What you end up with after dividing the cost of delay by the job duration for all jobs being considered is a value
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Detecting Web requirements conflicts and inconsistencies ...](https://www.sciencedirect.com/science/article/abs/pii/S0164121213001337)
  > by MJ Escalona · 2013 · Cited by 29 — This article presents an approach for the systematic conciliation of requirements in big projects dealing with a model-based approach. The article presents a

### formal_model_overview
**Confidence:** high

The finegrained field value describes a unified, three-part formal model (representation, detection, resolution) that combines Goal-Oriented RE, Value-Sensitive Design, and decision theory, with elements like Goals, Softgoals, Refinements, contribution links (Make, Help, Hurt, Break), and Conflict links, plus non-negotiable Constraints (legal, accessibility) and tie-breakers via Principles. Excerpts explicitly detailing goal-oriented requirements engineering and their conflict-resolution mechanisms map directly to representation (how goals and refinements are structured), detection (how conflicts are surfaced via explicit conflict links and negative contributions, obstacle analysis, and SIG propagation), and resolution (hierarchy of obligation for constraints, principle-based tie-breaking, and structured negotiation using MCDA/WSJF or Pareto-front analysis). For example, discussions of propagating conflict implications from low-level design options to high-level goals via SIG and labelled contributions align with the Representation and Detection facets. Descriptions of using obstacle analysis and divergence analyses to preemptively identify conflicting conditions echo the Detection facet. Finally, references to resolving conflicts through prioritizing constraints (safety, law, accessibility) and applying principles to steer choices, as well as using structured negotiation and trade-offs (MCDA, WSJF, Pareto fronts), align with the Resolution facet. The cited sources also illustrate including stakeholder win conditions, traceability, and interoperability with established notations (KAOS, NFR, GRL), which would support an interoperable formal model like the Design-Intent Conflict Model (DICM). In sum, the selected excerpts collectively substantiate the core components and processes described in the finegrained field value, enabling a cohesive formal model for representing, detecting, and resolving design conflicts across intent dimensions.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Rationalization of Goal Models in GRL using Formal ...](http://www.florisbex.com/papers/RENext.pdf)
  > by M van Zee · Cited by 40 — GRL allows for several types of analysis and evaluation techniques to assess the satisfaction of goals and thus to decide on high-level alternatives. Although
- [Reasoning about Partial Goal Satisfaction for ...](https://webperso.info.ucl.ac.be/~avl/files/avl-FSE04.pdf)
  > by E Letier · 2004 · Cited by 405 — The paper presents techniques for specifying partial degrees of goal satisfaction and for quantifying the impact of alternative system designs on the degree of
- [RationalGRL: A framework for argumentation and goal ...](https://journals.sagepub.com/doi/10.3233/AAC-200527)
  > RationalGRL provides a formal semantics and tool support to capture the discussions and outcomes of the argumentation process that leads to a goal model.
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
  > by A van Lamsweerde · 2003 — "Confidentiality goals are Avoid goals (on Knows predicates)". "Safety goals have higest priority in conflict resolution" more specific types & categories.
- [Goal-oriented requirement language model analysis using ...](https://journals.sagepub.com/doi/10.3233/MGS-220242)
  > A GRL diagram illustrates stakeholders' high-level strategic goals, non-functional requirements and alternative options to accomplish the business objectives.

### design_principles_as_resolution_mechanism
**Confidence:** high

The most relevant content directly asserts or exemplifies the use of design principles as guiding rules or tie-breakers in design decisions. The excerpt describing a motto to focus on the user and all else will follow demonstrates a concrete user-centric principle that organizations invoke to resolve competing design objectives. The companion excerpt reiterating that focus on the user should precede other considerations reinforces the role of a core guiding principle in decision-making when tensions arise between goals. A third excerpt explicitly names leadership principles such as customer obsession, illustrating how such principles function as tie-breakers to prioritize customer needs in conflicts. Additional excerpts discuss the value of design principles (as guiding notions) and reference practical applications in organizations (e.g., Shopify Polaris and Airbnb case study), underscoring that principles are used to structure decisions and justify trade-offs. Taken together, these excerpts connect the field value to a model where principles act after non-negotiable constraints to resolve conflicts between competing objectives, with real-world examples of the mechanism in large tech companies and design systems. They also align with the idea of logging rationale when applying user-centered or trust-oriented principles to disputes like privacy versus personalization. The overall narrative across these excerpts supports the notion that design principles serve as a principled tie-breaker mechanism in multi-objective design contexts, consistent with the provided finegrained field value.

- [People, Products, and Epiphanies](https://design.google/library/people-products-epiphanies)
  > ... Focus on the user and all else will follow” is the first principle in our founding philosophy. It also set the precedent for Google's very first user tests
- [“Focus on the User and All Else Will Follow”](https://www.linkedin.com/pulse/focus-user-all-else-follow-kate-winter-schoedel)
  > 1. Focus on the user and all else will follow. · 2. It's best to one thing really, really well. · 3. Fast is better than slow. · 4. Democracy on
- [Leadership Principles](https://www.amazon.jobs/content/en/our-workplace/leadership-principles)
  > Customer Obsession. Download video transcript. Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust.
- [10 Ways to Establish Trust on Ecommerce Sites and Apps](https://www.shopify.com/partners/blog/establish-trust)
  > Oct 26, 2021 — "Trust is the first principle of conversion." In this kind of environment, building trust with customers is key—especially since trust is the
- [Design — Shopify Polaris React](https://polaris-react.shopify.com/design)
  > Design principles serve as guiding notions that shape the design of the Shopify admin, with Polaris providing support in implementing these principles
- [Design-Focused Principles — Airbnb's Success Story](https://medium.com/design-bootcamp/design-focused-principles-airbnbs-success-story-ebff55172d7a)
  > A major key factor in Airbnb's success is its focus on the design and user experience of the platform.

### model_implementation_guidelines
**Confidence:** high

The finegrained field value describes a formal, multi-step workflow for implementing a Design-Intent Conflict Model (DICM) that integrates conflict management into design processes. This strongly aligns with excerpts that discuss (a) resolving conflicts at the goal level and propagating those resolutions down to requirements, (b) explicit use of a conflict/obstacle analysis to foresee and mitigate tensions, and (c) the use of structured frameworks to model softgoals, contributions, and dependencies in a goal-oriented context. One part notes that conflict resolution at the goal level is down-propagated to requirements, which directly supports the idea of a structured, hierarchical goal model with traceable impact, a core aspect of a formal conflict model. Another excerpt mentions that a conflict link between two goals is introduced when satisfying one may prevent the other, which mirrors the formalization of competing intents. A third excerpt describes obstacle analysis as part of handling conflicts, which matches the step in the DICM workflow dedicated to anticipating failures and devising mitigations. Supporting the methodological backbone, another excerpt discusses the Softgoal Interdependency Graph (SIG) and related contributions, which provides the modeling notation to capture satisfaction or denial relationships among softgoals and their impact on decisions. Finally, a reference to multi-objective optimization concepts like Pareto fronts showcases how the evaluation of alternatives can be conducted when goals are in tension, aligning with the step that evaluates and compares design options before deciding, and a separate excerpt on incorporating value-sensitive and design-framework notions helps situate the DICM within broader, formal design-economy contexts. Collectively, these excerpts map onto the seven-step DICM workflow by supplying: (i) a language and mechanism for goal-to-requirement propagation, (ii) explicit conflict links between competing goals, (iii) strategies for obstacle/conflict analysis, (iv) a SIG-oriented modeling approach to quantify satisfaction/harm, (v) mechanisms for evaluating trade-offs across alternatives, and (vi) the role of objective hierarchy and tie-breakers in decision logging. In essence, they provide the theoretical and methodological scaffolding necessary to represent, detect, and resolve conflicts between intent dimensions in design as described by the fine-grained field value.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007

### case_study_brand_vs_usability
**Confidence:** medium

The most relevant information directly addresses brand-driven design decisions in luxury/ecommerce contexts and how such brand expectations can clash with usability and accessibility requirements. Excerpts describing luxury ecommerce UX pitfalls and audits illustrate concrete cases where brand presentation or luxury conventions may conflict with usability best practices, such as readability, discoverability, and overall user experience. These sources explicitly discuss how brand considerations influence UX outcomes and decision-making, which is central to understanding and modeling conflict between brand-oriented goals and usability constraints. Additional sources discuss trust as a design priority in ecommerce, which can further illuminate how brand priorities compete with usability objectives in practical product decisions. On the accessibility side, explicit guidance on WCAG contrast requirements and non-text contrast provides concrete constraints that must be reconciled with brand and usability goals, showing how accessibility obligations can act as non-negotiable goals or tie-breakers in design decisions. Together, these excerpts supply the core evidence for representing, detecting, and resolving conflicts between intent dimensions related to brand-driven aesthetics, usability/readability, and accessibility constraints in multi-stakeholder design. Direct references to luxury-focused UX research and to WCAG contrast criteria are especially pertinent for modeling trade-offs and resolution strategies in the specified case study.

- [15 Common UX Pitfalls Luxury Retail E-Commerce Sites ...](https://baymard.com/blog/2021-luxury-ecommerce-benchmark)
  > Jun 8, 2021 — In this article we'll analyze this dataset to provide you with an overview of the UX performance of Luxury Retail e-commerce, and outline 15 common design
- ['Luxury Goods' Ecommerce UX Audit](https://baymard.com/audits/luxury-goods)
  > The in-depth Luxury Goods UX audit will be based on 500+ weighted UX parameters uncovered during our large-scale UX testing.
- [Luxury Goods Ecommerce UX Research](https://baymard.com/research/luxury-goods)
  > Discover how to optimize user experience for luxury goods websites. Our large-scale ecommerce UX research reveals best practices for checkout flows and UI.
- [10 Ways to Establish Trust on Ecommerce Sites and Apps](https://www.shopify.com/partners/blog/establish-trust)
  > Oct 26, 2021 — "Trust is the first principle of conversion." In this kind of environment, building trust with customers is key—especially since trust is the
- [Design-Focused Principles — Airbnb's Success Story](https://medium.com/design-bootcamp/design-focused-principles-airbnbs-success-story-ebff55172d7a)
  > A major key factor in Airbnb's success is its focus on the design and user experience of the platform.
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
  > May 6, 2025 — Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;. Incidental. Text or images of text that are part of an
- [Understanding WCAG SC 1.4.11 Non-text Contrast](https://www.digitala11y.com/understanding-sc-1-4-11-non-text-contrast/)
  > This success criterion sets out to ensure that the luminosity contrast of such elements meet a minimum contrast ratio of 3:1 with their adjacent color.
- [1.4.11 Non-Text Contrast (AA) | New Success Criteria in ...](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)
  > Success Criterion 1.4.11 Non-text Contrast (Level AA):. The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):.
- [Homepage & Navigation UX Best Practices 2025](https://baymard.com/blog/ecommerce-navigation-best-practice)
  > Sep 30, 2025 — Discover 11 Homepage & Category Navigation UX best practices to follow, backed by our 2025 UX benchmark data.
- [Homepage UX Best Practices 2021](https://baymard.com/blog/ecommerce-homepage-ux)
  > Jul 13, 2021 — Below we'll discuss the UX performance and 8 common pitfalls and the correspodning Homepage best practices to be aware of for Homepage.

### conclusion_and_future_directions
**Confidence:** medium

The user’s finegrained field value describes a formal model for navigating design conflicts, leveraging goal-oriented requirements engineering (GORE) foundations, softgoal interdependencies, and multi-objective trade-offs. The most relevant sources directly address conflict analysis and resolution in goal-oriented or multi-objective settings. Obstacle and conflict analysis is framed as a pathway to resolving conflicts between competing goals, which aligns with the proposed DICM’s goal of formal conflict detection and resolution. Multi-objective optimization and Pareto fronts provide concrete mechanics for identifying trade-offs when goals are in tension, which supports the idea of explicit, auditable trade-offs in DICM. References that discuss how softgoals relate to architectural decisions (via the Softgoal Interdependency Graph) and NFR frameworks ground the model in established representation schemes that tie high-level intents to concrete requirements and constraints, including non-negotiables like accessibility. Value-sensitive design literature is relevant because it demonstrates formal approaches to balancing competing values (privacy vs usability, accountability vs privacy, etc.), which dovetail with DICM’s aim to formalize and document value trade-offs and resolutions. Taken together, these excerpts collectively substantiate a path to a formal modeling approach that detects conflicts, analyzes trade-offs, and prescribes resolution patterns, while also supporting future tool-assisted automation, conformance checking, and a library of resolution strategies. Specific mechanisms and terms drawn from these excerpts include: obstacle analysis as a form of conflict analysis; the interpretation of Pareto-optimal fronts to manage competing objectives; use of guardrails and non-negotiables to constrain design space; the Softgoal Interdependency Graph for linking goals to architectural decisions; and foundational Value-Sensitive Design frameworks for formalizing value tensions.

- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Softgoal Interdependency Graph](https://www.researchgate.net/figure/Softgoal-Interdependency-Graph_fig1_252433775)
  > Throughout the paper we use NFR-framework notations [Chung, Nixon, Yu and Mylopoulos 2000] to indicate how the operationalised softgoals (bold cloud) satisfy a
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Value Sensitive Design: Theory and Methods](https://research.cs.vt.edu/ns/cs5724papers/6.theoriesofuse.cwaandvsd.friedman.vsd.pdf)
  > by B FRIEDMAN · Cited by 822 — Value Sensitive Design is a theoretically grounded approach to the design of technology that accounts for human values in a principled and comprehensive manner

### foundational_frameworks_and_theories
**Confidence:** high

The targeted field value centers on a design-intent conflict model built on established goal-oriented requirements engineering foundations. Foundational descriptions of resolving conflicts at the goal level in GO-RE approaches explain that goals are refined and conflicts are handled through structured reasoning (for example, resolving conflicts by propagating goal satisfaction down to requirements). This aligns with the DICM’s use of goals, softgoals, and refinements to model design intents and to assess alternatives via contribution links and a hierarchical structure. References that explicitly discuss obstacle analysis and conflict analysis within goal-oriented requirements engineering provide a mechanism for proactively identifying conditions that obstruct goal achievement and for guiding resolution decisions, which is core to the proposed conflict model. The WinWin negotiation framework offers a stakeholder-centric process to surface win conditions, generate options, and reach agreements, supporting transparent, collaborative conflict resolution within the model. The inclusion of multi-objective optimization concepts, such as Pareto optimality and trade-off analysis, supplies a quantitative lens for evaluating competing intents (e.g., privacy vs personalization, usability vs brand constraints) and identifying non-dominated design options. Value-Sensitive Design introduces a principled method to elevate human values (privacy, trust, transparency) to the level of design intents, ensuring these values are explicitly modeled as softgoals and subjected to the same analysis as functional or business goals. Finally, references to NFR frameworks (through Softgoal Interdependency Graphs and label propagation) illustrate how qualitative contributions between goals and softgoals can be reasoned about to support the detection and resolution of conflicts among intent dimensions. Together, these excerpts collectively substantiate the model’s components (GOALs, SOFTgoals, refinements, SIGs, contribution links), methods for evaluating design options (label propagation, Pareto analysis), and conflict-resolution mechanisms (obstacle analysis, WinWin negotiation, value-sensitive considerations) that constitute the Design-Intent Conflict Model (DICM).

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one

### case_study_accessibility_as_a_constraint
**Confidence:** high

The fine-grained field value represents a mandatory accessibility constraint aligned with WCAG 2.x Level AA, specifying exact text contrast (e.g., 4.5:1) and non-text control contrast (e.g., 3:1), and it asserts a hierarchy where accessibility must be satisfied first, with legal conformance referenced (Section 508/ WCAG). The most direct support comes from excerpts that define WCAG guidelines and specific contrast requirements: an excerpt describing WCAG 2.1 with a stated contrast ratio of at least 3:1 for text and related guidance on non-text contrast directly aligns with the specified 3:1 non-text contrast and 4.5:1 text contrast expectations. Additional excerpts provide the legal/regulatory context that WCAG 2.x is adopted by standards like Section 508, which establishes the obligation hierarchy and legal framing for accessibility as a non-negotiable prerequisite. Further excerpts corroborate the existence and interpretation of non-text contrast criteria as part of WCAG guidance, reinforcing the specific contrast thresholds and the priority given to accessibility in decision-making. In sum, these excerpts collectively support a formal model where WCAG 2.x Level AA requirements (including text and non-text contrast) are non-negotiable preconditions, backed by Section 508 alignment and policy/standards references.

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
  > May 6, 2025 — Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;. Incidental. Text or images of text that are part of an
- [Understanding WCAG SC 1.4.11 Non-text Contrast](https://www.digitala11y.com/understanding-sc-1-4-11-non-text-contrast/)
  > This success criterion sets out to ensure that the luminosity contrast of such elements meet a minimum contrast ratio of 3:1 with their adjacent color.
- [1.4.11 Non-Text Contrast (AA) | New Success Criteria in ...](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)
  > Success Criterion 1.4.11 Non-text Contrast (Level AA):. The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):.
- [Applicability & Conformance Requirements | Section508. ...](https://www.section508.gov/develop/applicability-conformance/)
  > The Revised 508 Standards incorporate by reference the WCAG 2.0 Level AA Success Criteria, and apply the WCAG 2.0 Level AA success criteria and conformance
- [Web Content Accessibility Guidelines - Academic Affairs](https://campus.kennesaw.edu/faculty-staff/academic-affairs/curriculum-instruction-assessment/digital-learning-innovations/academic-web-accessibility/advanced-accessibility-solutions/regulations-policies-standards/web-content-accessibility-guidelines.php)
  > As of January 2017, Section 508 adopted WCAG's 2.0 criteria to Level AA conformance. ... https://www.w3.org/WAI/standards-guidelines/wcag/glance/. McKenzie
- [Web Accessibility Laws & Policies](https://www.w3.org/WAI/policies/)
  > This page lists governmental policies related to web accessibility, although it is not a comprehensive or definitive listing. W3C does not make regulations.

### negotiation_based_resolution.key_proponent
**Confidence:** high

The target field seeks identification of the designated proponent associated with negotiation-based conflict resolution in design contexts. The excerpt explicitly references a person named Boehm (encoded as 'B BOEHM') in the description of a conflict-resolution mechanism (WinWin) where stakeholders enter their win conditions through a schema. This directly supports the idea that Barry Boehm is a proponent of a formal negotiation-based resolution approach. Other excerpts discuss related conflict-resolution concepts (goal-based negotiation, obstacle analysis, etc.) but do not mention Boehm, making them only tangentially relevant for identifying the specific proponent value. Therefore, the most relevant content is the excerpt that explicitly names Boehm within a structured conflict-resolution framework, which aligns with the requested field value.


- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.

### qualitative_reasoning_for_detection.originating_framework
**Confidence:** high

The claim asserts that the Non-Functional Requirements (NFR) Framework underpins the reasoning technique and uses Softgoal Interdependency Graphs (SIGs) to model qualitative goals without binary satisfaction criteria. Excerpt content directly references the NFR Framework and its SIGs as a modeling tool for qualitative goals, establishing the foundational basis for reasoning about non-binary satisfaction. Additional excerpts reinforce how SIGs function in practice: they discuss evaluation methods via SIGs, and they situate the NFR approach within goal-driven requirements engineering, including negotiation and conflict resolution. This body of excerpts collectively supports the idea that the NFR Framework provides the basis for representing and reasoning about qualitative, non-binary goals using SIGs, which aligns with the requested finegrained field value. The inclusion of passages on goal-based negotiation and conflict handling further connects to how such a framework would handle competing design goals and the resolution process within a multi-stakeholder context. Thus, the most relevant content centers on foundational statements about NFR, SIGs, and their role in representing qualitative goals and facilitating negotiation and resolution among conflicting objectives, with secondary support from discussions on evaluation and conflict management in GO requirements engineering.

- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a
- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.
- [Softgoal Interdependency Graph](https://www.researchgate.net/figure/Softgoal-Interdependency-Graph_fig1_252433775)
  > Throughout the paper we use NFR-framework notations [Chung, Nixon, Yu and Mylopoulos 2000] to indicate how the operationalised softgoals (bold cloud) satisfy a
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–

### negotiation_based_resolution.model_name
**Confidence:** medium

The most directly relevant content describes stakeholders entering their win conditions using a schema provided by the WinWin system, which directly matches a formal model intended to represent, detect, and resolve conflicts among win conditions. This supports the existence and usage of a structured negotiation framework akin to a WinWin Negotiation Model. Additional passages describe how conflicts between goals are introduced, handled, and resolved through goal-based negotiation and GO requirements engineering, which maps closely to how a formal negotiation model would function in practice: conflicts arise when satisfying one goal impedes another, and resolution can propagate from goals to requirements. Other excerpts discuss obstacle analysis, tie-breaking, and formal methods for reasoning about GO conflicts, which further describe mechanisms a WinWin-like model would employ to detect and resolve conflicts, even if they do not name the specific model. In sum, the combination of a directly named WinWin system and the surrounding GO/negotiation literature provides coherent support for a WinWin Negotiation Model as the formal framework for representing, detecting, and resolving conflicts between intent dimensions in design.

- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Rationalization of Goal Models in GRL using Formal ...](http://www.florisbex.com/papers/RENext.pdf)
  > by M van Zee · Cited by 40 — GRL allows for several types of analysis and evaluation techniques to assess the satisfaction of goals and thus to decide on high-level alternatives. Although
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques

### negotiation_based_resolution.process_overview
**Confidence:** high

The requested negotiation-based resolution model is clearly supported by sources that describe stakeholders entering win conditions and identifying conflicts among them, which forms the initial step of the model. This aligns with the first phase of eliciting stakeholders' win conditions and recognizing conflicts. The idea that conflicts at the goal level can be resolved through negotiation and that such conflicts can be propagated or down-propagated to subsequent levels further supports a structured, multi-step negotiation process. Additional sources discuss the presence of conflict links between goals when their satisfaction is incompatible, and the broader management of conflicts in goal-driven requirements engineering, including obstacle analysis and formal techniques to resolve conflicts. Collectively, these excerpts map onto a three-stage interpretation: (1) identify stakeholders and their win conditions, (2) detect and structure conflicts as issues, and (3) negotiate options to reach a mutually agreed set of goals and constraints, leading to a formal agreement, which matches the described model for resolving tensions between intent dimensions in design. The quotes illustrate entering win conditions and conflicts, conflict links in goals, goal-level negotiation, conflict management techniques, obstacle and conflict analysis, and formal evaluation techniques that collectively underpin a formal resolution model.

- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Rationalization of Goal Models in GRL using Formal ...](http://www.florisbex.com/papers/RENext.pdf)
  > by M van Zee · Cited by 40 — GRL allows for several types of analysis and evaluation techniques to assess the satisfaction of goals and thus to decide on high-level alternatives. Although

### negotiation_based_resolution.core_artifacts
**Confidence:** high

The description of stakeholders entering win conditions under a framework that provides a schema for capturing stakeholder goals directly supports the artifact Win Conditions as the representation of stakeholder objectives within a negotiation context. It also describes how conflicts among these win conditions arise, which is essential for detecting conflicts between intent dimensions. The discussion about conflict resolution at the goal level, and its propagation down to the requirements level, aligns with the artifact Agreements and the process by which negotiated outcomes are translated into concrete requirements and mutually accepted goals or constraints. The notion of a conflict link between goals explicitly shows how competing objectives are identified and analyzed, supporting the structure where Issues document divergences among stakeholder aims. Frameworks like GRL and KAOS are cited as formal methods for analyzing goals and evaluating satisfaction, which underpin Options (alternative solutions) and Agreements (mutually accepted sets of goals and constraints) by providing formal techniques to explore and select among trade-offs. The collection of sources that discuss obstacle and conflict analysis in goal-oriented requirements engineering, as well as the systematic management of conflicts, reinforces the overall model for detecting and resolving conflicts through structured negotiation artifacts. In sum, the artifacts Win Conditions, Issues, Options, and Agreements are consistently mapped to explicit mechanisms for conflict identification, negotiation, and translation into implementable requirements, as described across these excerpts.

- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Rationalization of Goal Models in GRL using Formal ...](http://www.florisbex.com/papers/RENext.pdf)
  > by M van Zee · Cited by 40 — GRL allows for several types of analysis and evaluation techniques to assess the satisfaction of goals and thus to decide on high-level alternatives. Although
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–

### trade_off_and_optimization_analysis.application
**Confidence:** high

The finegrained field value centers on using a structured technique to navigate tension between goals by identifying Pareto-efficient design variants and then applying a prioritization method (WSJF) to determine implementation order within a backlog. The most directly relevant content explicitly references Pareto-optimal fronts and how they can be used to choose designs that balance business conversion with user experience guardrails, which directly supports the idea of data-driven, tension-aware decision making. Additional passages explain that the Pareto front helps understand trade-offs and that WSJF is a practical formula to rank such options by economic value and size, which underpins the workflow described in the field value. Other excerpts discuss managing conflicts in goal-driven requirements and general approaches to prioritization, providing broader context about conflict resolution in design, but they are less central to the specific technique of Pareto-based selection followed by WSJF prioritization outlined in the field value.

- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Weighted Shortest Job First (WSJF) | Glossary](https://www.productplan.com/glossary/weighted-shortest-job-first-wsjf)
  > How is WSJF calculated? Often, Weighted Shortest Job First is a simple formula: Cost of Delay divided by Job Duration (or Size). Step 1: Calculate
- [Definition of weighted shortest job first (WSJF)](https://airfocus.com/glossary/what-is-weighted-shortest-job-first/)
  > Cost of delay / Job duration = WSJF value. What you end up with after dividing the cost of delay by the job duration for all jobs being considered is a value
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Detecting Web requirements conflicts and inconsistencies ...](https://www.sciencedirect.com/science/article/abs/pii/S0164121213001337)
  > by MJ Escalona · 2013 · Cited by 29 — This article presents an approach for the systematic conciliation of requirements in big projects dealing with a model-based approach. The article presents a

### design_principles_as_resolution_mechanism.principle_role
**Confidence:** high

Design principles are described as guiding notions that shape design practice, implying they serve as a higher-order policy to steer decisions when faced with competing options. This aligns with the notion of using principles as meta-preferences or tie-breakers after harsher constraints (like legal or accessibility requirements) have been satisfied, to resolve conflicts between otherwise equally viable design choices. The Airbnb example emphasizes a principled focus on design and user experience, illustrating how explicit design-oriented guidance informs prioritization and resolution in practice. Leadership and trust-oriented excerpts reinforce the idea that organizations articulate principles (e.g., customer obsession, trust) to steer decisions toward user-centered outcomes, especially when trade-offs between business goals and user needs arise. The Shopify Polaris reference reinforces that design principles function as guiding notions that shape the design system, which can modularly influence decisions when multiple viable options exist. The trust-focused piece from ecommerce contexts highlights how trust considerations often underpin principled decisions, particularly in conversion-oriented scenarios, which is consistent with using principles to resolve tensions between competing objectives. The more general focus-on-user excerpts further support that principles sit above individual goals, guiding overall direction in alignment with user-centric outcomes rather than being the sole driver. Taken together, these excerpts corroborate that design principles can act as tie-breakers by providing a formal mechanism or policy that resolves conflicts among competing objectives once non-negotiable constraints are satisfied.

- [Design — Shopify Polaris React](https://polaris-react.shopify.com/design)
  > Design principles serve as guiding notions that shape the design of the Shopify admin, with Polaris providing support in implementing these principles
- [Design-Focused Principles — Airbnb's Success Story](https://medium.com/design-bootcamp/design-focused-principles-airbnbs-success-story-ebff55172d7a)
  > A major key factor in Airbnb's success is its focus on the design and user experience of the platform.
- [Leadership Principles](https://www.amazon.jobs/content/en/our-workplace/leadership-principles)
  > Customer Obsession. Download video transcript. Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust.
- [10 Ways to Establish Trust on Ecommerce Sites and Apps](https://www.shopify.com/partners/blog/establish-trust)
  > Oct 26, 2021 — "Trust is the first principle of conversion." In this kind of environment, building trust with customers is key—especially since trust is the
- [People, Products, and Epiphanies](https://design.google/library/people-products-epiphanies)
  > ... Focus on the user and all else will follow” is the first principle in our founding philosophy. It also set the precedent for Google's very first user tests
- [“Focus on the User and All Else Will Follow”](https://www.linkedin.com/pulse/focus-user-all-else-follow-kate-winter-schoedel)
  > 1. Focus on the user and all else will follow. · 2. It's best to one thing really, really well. · 3. Fast is better than slow. · 4. Democracy on

### qualitative_reasoning_for_detection.reasoning_algorithm
**Confidence:** medium

The field value centers on a propagation-based reasoning over a Softgoal Interdependency Graph (SIG) where evaluation labels are assigned to the lowest-level goals and propagated through the graph to determine higher-level outcomes. This concept is established in the literature that frames the SIG and softgoal notions as a representation for how non-functional requirements and related goals interact and influence overall design decisions. One excerpt explicitly discusses conflict resolution at the goal level and notes that resolution effects propagate to lower-level requirements, illustrating a propagation mechanism within goal-focused reasoning. Another excerpt references the managing of conflicts in goal-driven requirements engineering, which aligns with the idea of formal mechanisms for detecting and resolving tensions among competing objectives within a structured goal model. Additional excerpts introduce the SIG framework as a core representation for evaluating non-functional requirements and the interdependencies among them, which provides the context in which a propagation-based evaluation could operate. Taken together, these excerpts support the idea of a formal model where goals and softgoals are organized in a graph, conflicts are resolved through propagation mechanics and rule-informed tie-breaks, and where higher-level assessments emerge from lower-level evaluations through defined links and relationships.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.
- [Softgoal Interdependency Graph](https://www.researchgate.net/figure/Softgoal-Interdependency-Graph_fig1_252433775)
  > Throughout the paper we use NFR-framework notations [Chung, Nixon, Yu and Mylopoulos 2000] to indicate how the operationalised softgoals (bold cloud) satisfy a
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a

### qualitative_reasoning_for_detection.evaluation_labels
**Confidence:** medium

The field value centers on using qualitative labels to evaluate softgoal status and on how conflicts among design goals are detected and resolved within a structured requirements framework. Sentences that explicitly refer to resolving conflicts at the goal level and engaging in goal-based negotiation support the idea that a formal process exists to determine which goals are satisfied, denied, or conflicted. References to the Softgoal Interdependency Graph (SIG) and the NFR framework indicate a structured approach to modeling softgoals, their interdependencies, and how evaluation or labeling could propagate to determine overall status. For instance, one excerpt notes that there is conflict resolution at the goal level and mentions goal-based negotiation, which directly aligns with a framework for adjudicating competing intents. Another excerpt discusses managing conflicts in goal-driven requirements engineering, signaling systematic handling of competing objectives. Additional excerpts describe the SIG and evaluation through label propagation, which provides mechanisms for assigning qualitative labels to goals and measuring them using labeled metrics. Together, these elements converge on a formal model for representing, detecting, and resolving conflicts among intent dimensions using qualitative labels, as described in the field value.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Softgoal Interdependency Graph](https://www.researchgate.net/figure/Softgoal-Interdependency-Graph_fig1_252433775)
  > Throughout the paper we use NFR-framework notations [Chung, Nixon, Yu and Mylopoulos 2000] to indicate how the operationalised softgoals (bold cloud) satisfy a
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a

### case_study_business_vs_user_goals.user_goal_example
**Confidence:** medium

The core finegrained field value envisions a design practice that prioritizes user trust and a positive, non-manipulative experience while ensuring task success. Value Sensitive Design directly addresses conflicts between values such as accountability, privacy, trust and security, and highlights the need to formalize and negotiate these tensions, which directly supports preserving trust and designing for a respectful user experience. Discussion of handling obstacles in goal-oriented requirements points to structured methods for resolving conflicts among stakeholder goals, which aligns with maintaining user-centric outcomes when multiple objectives compete. The WinWin requirements framework likewise centers on reconciling stakeholder win conditions, providing a mechanism to resolve conflicts with a focus on satisfactory user outcomes. Online choice architecture considerations emphasize the risk of manipulative design and memory of how to avoid such patterns, reinforcing the non-manipulative aspect of the user experience. Trade-off analyses and Pareto-front discussions illustrate how to balance competing objectives such as usability, business goals, and performance, contributing to a path toward task success and a positive UX when guided by user-centered priorities. Additional excerpts about measurement and guardrails offer supportive context for evaluating whether the design maintains trust and usability while achieving business aims, though they are less directly about user trust itself. Overall, the cited material supports the existence of formalized conflict resolution frameworks and principled design practices that prioritize user trust and non-manipulative UX, guiding how to represent and resolve conflicts among intent dimensions in design.

- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.
- [Online Choice Architecture: How digital design can harm ...](https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers)
  > Apr 5, 2022 — The discussion paper “Online Choice Architecture: how digital design can harm competition and consumers” provides an overview of what OCA is and
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [What are Guardrail Metrics?](https://www.harness.io/harness-devops-academy/guardrail-metrics)
  > Dec 9, 2024 — Guardrail metrics are business metrics designed to indirectly measure business value and provide alerts about any potentially misleading or
- [North Star and Guardrail Metrics Aligning Product Success ...](https://siftfeed.com/guides/north-star-guardrail-metrics)
  > Guardrail Metrics (or counter-metrics) are secondary measures used to monitor for potential negative impacts of changes or experiments. For instance, if

### trade_off_and_optimization_analysis.core_concept
**Confidence:** high

The most relevant content directly supports the central idea that design conflicts can be modeled as a multi-objective optimization problem and that Pareto fronts are used to identify non-dominated, trade-off solutions. One excerpt states that once a Pareto-optimal front is found, it is stored and that clustering ensures a spread among non-dominated solutions, which directly aligns with the notion of mapping design intents into a multi-objective space and using clustering to explore diverse compromises. Another excerpt discusses examining the Pareto front to determine which blend of trade-offs best fits constraints, directly illustrating how the Pareto front informs practical compromise choices. A third excerpt notes that the Pareto front helps understand trade-off sensitivities, reinforcing the idea of visualizing and interpreting trade-offs to identify optimal balances, including knee points. A fourth excerpt, while more focused on requirements conflicts in goal-driven contexts, nonetheless relates to the general theme of resolving tensions among goals by structured analysis, which supports the broader framework of conflict resolution in design contexts. Additional excerpts introduce prioritization methods (such as WSJF) which, while not central to Pareto-front theory, are conceptually adjacent as they concern ranking and selecting among competing objectives, thereby providing annotations on ordering priorities within multi-objective contexts. The least directly supporting excerpts touch on broader conflict detection in requirements and model-based approaches to conciliation, which are relevant context but do not directly demonstrate Pareto-front modeling or knee-point identification. Overall, the strongest support comes from explicit Pareto-front references, front visualization for trade-offs, and clustering for diversity; next comes explicit trade-off examination guidance; and the weaker support comes from adjacent conflict-resolution and prioritization methodologies that are not core to the proposed formal model.


- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Weighted Shortest Job First (WSJF) | Glossary](https://www.productplan.com/glossary/weighted-shortest-job-first-wsjf)
  > How is WSJF calculated? Often, Weighted Shortest Job First is a simple formula: Cost of Delay divided by Job Duration (or Size). Step 1: Calculate
- [Definition of weighted shortest job first (WSJF)](https://airfocus.com/glossary/what-is-weighted-shortest-job-first/)
  > Cost of delay / Job duration = WSJF value. What you end up with after dividing the cost of delay by the job duration for all jobs being considered is a value
- [Detecting Web requirements conflicts and inconsistencies ...](https://www.sciencedirect.com/science/article/abs/pii/S0164121213001337)
  > by MJ Escalona · 2013 · Cited by 29 — This article presents an approach for the systematic conciliation of requirements in big projects dealing with a model-based approach. The article presents a

### trade_off_and_optimization_analysis.example_formula
**Confidence:** high

The target field value centers on a formal prioritization method (WSJF) used within Pareto-based decision frameworks. The most relevant information directly states the WSJF formula, showing that a prioritization score is computed as Cost of Delay divided by Job Duration, which is the core quantitative mechanism requested. Additionally, the content notes that the Cost of Delay can be a composite score (including factors like user business value, time criticality, and risk reduction), aligning with the described need to formalize and combine multiple intent dimensions into a single prioritization metric. The Pareto-front excerpts provide essential context for how trade-offs are visualized and selected within a multi-objective search, reinforcing why such prioritization methods are used in design contexts where goals compete. Supporting excerpts discuss general conflict handling in requirements engineering, which, while not central to the WSJF formula, underpins the broader theme of resolving competing objectives in multi-stakeholder design. Collectively, the highest-relevance excerpts establish the WSJF formula and the idea of Cost of Delay as a composite score, while the surrounding Pareto-context excerpts help situate how these methods function within a trade-off analysis framework.

- [Weighted Shortest Job First (WSJF) | Glossary](https://www.productplan.com/glossary/weighted-shortest-job-first-wsjf)
  > How is WSJF calculated? Often, Weighted Shortest Job First is a simple formula: Cost of Delay divided by Job Duration (or Size). Step 1: Calculate
- [Definition of weighted shortest job first (WSJF)](https://airfocus.com/glossary/what-is-weighted-shortest-job-first/)
  > Cost of delay / Job duration = WSJF value. What you end up with after dividing the cost of delay by the job duration for all jobs being considered is a value
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Detecting Web requirements conflicts and inconsistencies ...](https://www.sciencedirect.com/science/article/abs/pii/S0164121213001337)
  > by MJ Escalona · 2013 · Cited by 29 — This article presents an approach for the systematic conciliation of requirements in big projects dealing with a model-based approach. The article presents a

### trade_off_and_optimization_analysis.technique_name
**Confidence:** high

The requested fine-grained field value names a design analysis approach that explicitly combines trade-off and optimization analysis using Pareto fronts and WSJF. Directly relevant content includes sources that describe Pareto-optimal fronts and how they support decision-making in multi-objective optimization, which aligns with the Pareto Front aspect of the technique. The excerpts describe storing a Pareto-optimal front, clustering for solution spread, and examining the Pareto front to select trade-offs suited to constraints, all of which illustrate the core Pareto-based trade-off analysis component. Additional support comes from sources that define WSJF as a simple ratio of cost of delay to job duration, which matches the WSJF aspect of the technique. These sources collectively map to a structured method where Pareto optimization identifies trade-offs and WSJF provides a prioritization metric, forming the exact named approach. Other excerpts discuss broader conflict management and requirement reconciliation, which, while relevant to design decision contexts, do not directly define the specified technique and thus provide only contextual background rather than direct methodological support. Therefore, the most directly relevant content is evidenced by explicit references to Pareto fronts and Pareto-optimal solutions in multi-objective optimization, as well as the explicit WSJF formulation, followed by supplementary material on managing design goals and conflicts that underpin the broader practitioner context.

- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [Weighted Shortest Job First (WSJF) | Glossary](https://www.productplan.com/glossary/weighted-shortest-job-first-wsjf)
  > How is WSJF calculated? Often, Weighted Shortest Job First is a simple formula: Cost of Delay divided by Job Duration (or Size). Step 1: Calculate
- [Definition of weighted shortest job first (WSJF)](https://airfocus.com/glossary/what-is-weighted-shortest-job-first/)
  > Cost of delay / Job duration = WSJF value. What you end up with after dividing the cost of delay by the job duration for all jobs being considered is a value
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Detecting Web requirements conflicts and inconsistencies ...](https://www.sciencedirect.com/science/article/abs/pii/S0164121213001337)
  > by MJ Escalona · 2013 · Cited by 29 — This article presents an approach for the systematic conciliation of requirements in big projects dealing with a model-based approach. The article presents a

### qualitative_reasoning_for_detection.purpose
**Confidence:** high

The requested modeling centers on how conflicting design intents (e.g., business vs user goals, brand vs usability) are formalized and resolved through goal-oriented reasoning. Excerpts that discuss conflict resolution at the goal level, goal-based negotiation, and how conflicts in goal-driven requirements engineering are managed provide direct, structural guidance for constructing a formal model. Specifically, the source noting that conflict resolution at the goal level propagates down to requirements demonstrates a mechanism for how trade-offs are traced and resolved within a formal framework. The companion sources about managing conflicts in goal-driven requirements engineering reinforce this by detailing established approaches to priority, negotiation, and resolution strategies. Additional excerpts describing Softgoal Interdependency Graphs and the placement of softgoals within SIGs offer the essential formal structures (softgoals, interdependencies) needed to represent, detect, and reason about trade-offs and conflicts. Other excerpts that discuss SIG concepts and evaluation approaches (e.g., label propagation) provide supportive methods for quantifying or assessing the impact of design decisions on softgoals, which is valuable for the detection and evaluation stage of the model. Collectively, these excerpts map directly onto creating a formal model for representing, detecting, and resolving conflicts among intent dimensions in design, with softgoals as central elements and goal-level negotiation as the resolution mechanism.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Softgoal Interdependency Graph](https://www.researchgate.net/figure/Softgoal-Interdependency-Graph_fig1_252433775)
  > Throughout the paper we use NFR-framework notations [Chung, Nixon, Yu and Mylopoulos 2000] to indicate how the operationalised softgoals (bold cloud) satisfy a
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a
- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.

### design_principles_as_resolution_mechanism.company_example_1
**Confidence:** high

The field value asserts that Google’s core philosophy, specifically the maxim “Focus on the user and all else will follow,” is cited as a concrete example of an organization-level principle functioning as a tie-breaker in design decisions. The most directly supportive excerpt explicitly references Google and the phrase or closely matching principle, grounding the claim in the company’s founding philosophy and its use to prioritize users in testing and decision-making. A second excerpt mirrors this idea by presenting the same principle as a focal company-wide rule to prioritize the user, reinforcing that this user-first stance is a guiding factor in prioritizing design choices. A third excerpt strengthens the context by discussing customer-centric leadership principles, which align with the idea of using user-focused values as overarching guides or tie-breakers, even if it doesn’t quote Google verbatim. Taken together, these excerpts corroborate the existence and deployment of a user-centered tie-breaker principle at the organizational level (as exemplified by Google) and provide supportive context about how such principles guide design decisions across teams.

- [People, Products, and Epiphanies](https://design.google/library/people-products-epiphanies)
  > ... Focus on the user and all else will follow” is the first principle in our founding philosophy. It also set the precedent for Google's very first user tests
- [“Focus on the User and All Else Will Follow”](https://www.linkedin.com/pulse/focus-user-all-else-follow-kate-winter-schoedel)
  > 1. Focus on the user and all else will follow. · 2. It's best to one thing really, really well. · 3. Fast is better than slow. · 4. Democracy on
- [Leadership Principles](https://www.amazon.jobs/content/en/our-workplace/leadership-principles)
  > Customer Obsession. Download video transcript. Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust.

### design_principles_as_resolution_mechanism.application_context
**Confidence:** high

The field value asserts that design principles act as a consistent, value-based mechanism to resolve tensions between competing goals, with concrete instances like applying a user-first principle when balancing business conversion with user experience, or a user-trust principle when navigating privacy versus personalization. Excerpts that discuss design principles as guiding notions shaping design decisions provide direct support for this mechanism. They also illustrate how principles can be invoked in real-world conflicts (e.g., balancing trust, usability, and brand considerations) and how emphasis on user-centric or trust-oriented priorities grounds decision-making. Additional excerpts emphasize that leadership and organizational practices center on the customer or user, reinforcing that principles are used to justify and communicate the chosen path when trade-offs are necessary. Taken together, these excerpts support the notion that principles function as a resolution framework and as a justification mechanism for design choices in multi-stakeholder contexts.

- [Design — Shopify Polaris React](https://polaris-react.shopify.com/design)
  > Design principles serve as guiding notions that shape the design of the Shopify admin, with Polaris providing support in implementing these principles
- [Design-Focused Principles — Airbnb's Success Story](https://medium.com/design-bootcamp/design-focused-principles-airbnbs-success-story-ebff55172d7a)
  > A major key factor in Airbnb's success is its focus on the design and user experience of the platform.
- [10 Ways to Establish Trust on Ecommerce Sites and Apps](https://www.shopify.com/partners/blog/establish-trust)
  > Oct 26, 2021 — "Trust is the first principle of conversion." In this kind of environment, building trust with customers is key—especially since trust is the
- [People, Products, and Epiphanies](https://design.google/library/people-products-epiphanies)
  > ... Focus on the user and all else will follow” is the first principle in our founding philosophy. It also set the precedent for Google's very first user tests
- [Leadership Principles](https://www.amazon.jobs/content/en/our-workplace/leadership-principles)
  > Customer Obsession. Download video transcript. Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust.
- [“Focus on the User and All Else Will Follow”](https://www.linkedin.com/pulse/focus-user-all-else-follow-kate-winter-schoedel)
  > 1. Focus on the user and all else will follow. · 2. It's best to one thing really, really well. · 3. Fast is better than slow. · 4. Democracy on

### prioritization_and_goal_hierarchy.weighting_method
**Confidence:** medium

The most relevant content describes how conflicts between goals are identified and resolved at the requirement level, which is foundational to any weighting or prioritization mechanism. The notion that a conflict link exists between competing goals and that resolution can propagate down to the requirements level directly informs how one might formalize importance: by modeling which goals support or hinder others and thus assigning relative weight to goals based on their contribution or obstruction to higher-level objectives. Additional context comes from obstacle analysis, which reframes conflicts as conditions to be satisfied or avoided, providing a structured way to rank or filter competing intents. The discussion of goal-driven conflict management and the use of formal techniques to analyze conflicts lays groundwork for a weighting schema, even if the excerpts themselves do not spell out a numeric method. Presence of a framework that models interdependencies among softgoals and accounts for how conflicts are negotiated within a system adds to the feasibility of a formal prioritization model. Finally, value-sensitive design and NFR-related discussions give domain-specific perspectives on balancing competing objectives (e.g., privacy vs. usability or trust vs. security) that any weighting approach must accommodate, even if they do not provide explicit MCDA or WSJF formulas. Together, these excerpts outline the components and mechanisms (conflict links, obstacle analysis, softgoal interdependencies, domain balancing) that would support a formal model for prioritization and weighting of goals in multi-stakeholder design contexts.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and

### case_study_business_vs_user_goals.mechanism_description
**Confidence:** high

The most directly relevant information describes guardrail metrics as dedicated metrics that monitor for negative impacts and serve as alerts, which aligns with the idea of monitoring UX and trust indicators as constraints during optimization for business goals. For example, the notion that guardrail metrics are designed to indirectly measure value and alert to misleading signals supports using similar constraints to protect user experience while aiming for conversions. Additionally, guardrail metrics are described as secondary measures used to monitor potential negative impacts of changes, which mirrors the concept of enforcing constraints on complaint rates, opt-out rates, and support contacts as non-negotiable guardrails in design processes. The broader discussion of designing with conflicts in goal-driven contexts—where stakeholders’ win conditions and competing objectives require negotiation—helps justify incorporating formal priority or tie-breaker rules, such as design principles or WinWin-style schemas, to resolve tensions between business goals and user goals. Value Sensitive Design literature provides concrete examples of conflicts (e.g., privacy vs. accountability, trust vs. security) that should be negotiated within a formal model, illustrating how legitimate user-centric constraints can be formalized alongside business ambitions. Related treatment of goal conflicts and obligation hierarchies emphasizes the need for a structured approach to determine which objectives prevail, reinforcing the idea of guardrails as constraints in the decision space. The material on Pareto optimization and multi-objective trade-offs offers methods to explore acceptable trade-offs without violating guardrails, supporting a formal mechanism for balancing business goals with user protections. Finally, literature on WinWin and goal-driven requirements engineering underlines practical ways to capture stakeholder win conditions and resolve conflicts in a principled way, which complements the idea of guardrails as stabilizing constraints within multi-stakeholder design decisions.

- [What are Guardrail Metrics?](https://www.harness.io/harness-devops-academy/guardrail-metrics)
  > Dec 9, 2024 — Guardrail metrics are business metrics designed to indirectly measure business value and provide alerts about any potentially misleading or
- [North Star and Guardrail Metrics Aligning Product Success ...](https://siftfeed.com/guides/north-star-guardrail-metrics)
  > Guardrail Metrics (or counter-metrics) are secondary measures used to monitor for potential negative impacts of changes or experiments. For instance, if
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.

### prioritization_and_goal_hierarchy.hierarchy_of_obligation
**Confidence:** medium

The finegrained field value describes a formal hierarchy where non-negotiable constraints are treated as mandatory hard goals with the highest priority, and any option violating them is excluded. This aligns with discussions of prioritization and conflict handling in goal-oriented and softgoal frameworks. The most directly relevant material notes that softgoals can be organized within a graph that clarifies interdependencies and priorities, with softgoals often placed at the top of the structure in practice. This supports the idea of a top-level priority schema where some goals (hard constraints) outrank others and drive exclusion decisions. Related material discusses how conflicts between goals are identified and how resolving one goal may require adjustments or down-propagation to related requirements, which is a mechanism that mirrors enforcing a hierarchy of obligation by ensuring that hard constraints drive the ultimate design choices. Additional excerpts describe linking conflicts between goals and how satisfying one may prevent another, illustrating the need for an ordering principle to resolve trade-offs. Other sources discuss broad strategies for conflict analysis and resolution in goal-driven design, which underpin a formal model that represents, detects, and resolves conflicts among intent dimensions by forcing non-negotiable constraints to take precedence. Together, these excerpts provide the structural elements (hard goals as top-priority constraints, mechanisms for propagating impact, and conflict resolution strategies) needed to formalize a hierarchy of obligation in design contexts.

- [Software Architecture Adaptability: An NFR Approach](https://dl.acm.org/doi/pdf/10.1145/602461.602470)
  > While the NFR Framework helps develop adaptable software ... noted in a softgoal interdependency graph. Such ... the NFR softgoals at the top of the SIG using a
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques

### case_study_brand_vs_usability.analysis_source
**Confidence:** medium

The target field value asserts two sources: Baymard Institute and Nielsen Norman Group (NNG). The excerpts provided include multiple items that explicitly reference Baymard as a source or basis for UX research and audits (for example, a Baymard blog analyzing luxury e-commerce UX, as well as a Baymard Luxury Goods UX audit and other Baymard UX-focused content). These excerpts demonstrate that Baymard Institute is a documented source within the provided material and serve as direct support for the Baymard portion of the field value. While none of the excerpts explicitly mention Nielsen Norman Group (NNG), the absence of NN G evidence means the claim about NN G cannot be corroborated from these excerpts. Therefore, the strongest-supported portion of the field value is the Baymard Institute component, while the NN G component remains unverified in the supplied excerpts. The quoted content highlights Baymard as a named source and as the basis for UX benchmarking and audits, which aligns with the intended use of a source-focused field in a design-conflict model. In summary, the excerpts collectively support the Baymard Institute part of the field value and establish Baymard as a credible, cited source in the context of brand vs usability discussions, while providing no corroboration for Nielsen Norman Group within these excerpts.

- [15 Common UX Pitfalls Luxury Retail E-Commerce Sites ...](https://baymard.com/blog/2021-luxury-ecommerce-benchmark)
  > Jun 8, 2021 — In this article we'll analyze this dataset to provide you with an overview of the UX performance of Luxury Retail e-commerce, and outline 15 common design
- ['Luxury Goods' Ecommerce UX Audit](https://baymard.com/audits/luxury-goods)
  > The in-depth Luxury Goods UX audit will be based on 500+ weighted UX parameters uncovered during our large-scale UX testing.
- [Luxury Goods Ecommerce UX Research](https://baymard.com/research/luxury-goods)
  > Discover how to optimize user experience for luxury goods websites. Our large-scale ecommerce UX research reveals best practices for checkout flows and UI.
- [Homepage & Navigation UX Best Practices 2025](https://baymard.com/blog/ecommerce-navigation-best-practice)
  > Sep 30, 2025 — Discover 11 Homepage & Category Navigation UX best practices to follow, backed by our 2025 UX benchmark data.
- [Homepage UX Best Practices 2021](https://baymard.com/blog/ecommerce-homepage-ux)
  > Jul 13, 2021 — Below we'll discuss the UX performance and 8 common pitfalls and the correspodning Homepage best practices to be aware of for Homepage.

### case_study_business_vs_user_goals.resolution_mechanism
**Confidence:** high

To support the finegrained field value of a resolution mechanism named Guardrail metrics, we can connect explicit descriptions of guardrail metrics as instruments for monitoring indirect impacts and guiding decision-making. Guardrail metrics are described as secondary measures used to monitor for potential negative impacts of changes or experiments and to align product decisions with overarching goals, which directly informs how a resolution mechanism can prevent undesirable outcomes while pursuing business or design goals. Building on this, discussions of Pareto-front trade-offs illustrate how decisions can balance competing objectives (e.g., business goals vs user goals) by identifying a set of optimal trade-offs, then selecting a preferred solution given constraints. This complements a guardrail approach by providing a formal method to explore feasible design spaces while guarding against precarious outcomes. Additional sources on resolving conflicts in goal-driven requirements engineering and WinWin-style win conditions demonstrate concrete formal schemas for resolving stakeholder conflicts, which can be integrated into a Guardrail metrics framework as monitoring signals and tie-breakers. Value-sensitive design themes show typical value conflicts (privacy vs usability, trust vs security) that a guardrail system would need to recognize and accommodate when defining metrics and thresholds. Taken together, these excerpts collectively describe a comprehensive approach to representing, detecting, and resolving conflicts between intent dimensions, anchored by guardrail metrics as the primary mechanism and supplemented by well-established resolution strategies and design principles.

- [What are Guardrail Metrics?](https://www.harness.io/harness-devops-academy/guardrail-metrics)
  > Dec 9, 2024 — Guardrail metrics are business metrics designed to indirectly measure business value and provide alerts about any potentially misleading or
- [North Star and Guardrail Metrics Aligning Product Success ...](https://siftfeed.com/guides/north-star-guardrail-metrics)
  > Guardrail Metrics (or counter-metrics) are secondary measures used to monitor for potential negative impacts of changes or experiments. For instance, if
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Online Choice Architecture: How digital design can harm ...](https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers)
  > Apr 5, 2022 — The discussion paper “Online Choice Architecture: how digital design can harm competition and consumers” provides an overview of what OCA is and

### design_principles_as_resolution_mechanism.company_example_2
**Confidence:** medium

The most relevant excerpt explicitly frames customer-centricity as a core leadership principle, stating that leaders start with the customer and work backwards, with a goal of earning and keeping customer trust. This provides a direct analogue to a formal mechanism that prioritizes customer needs in conflict resolution. Related excerpts reinforce the mechanism through broader emphasis on customer focus and trust as central design considerations: a passage that elevates the idea of focusing on the user as a prioritization principle, another that treats trust as foundational to conversion, and additional passages describing design principles or guidelines that steer decisions toward user-centric outcomes. Collectively, these excerpts support the existence of a formalized, customer-first approach to resolving competing objectives, by grounding decisions in customer value and trust, which aligns with the proposed mechanism of prioritizing customer needs when conflicts arise.

- [Leadership Principles](https://www.amazon.jobs/content/en/our-workplace/leadership-principles)
  > Customer Obsession. Download video transcript. Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust.
- [People, Products, and Epiphanies](https://design.google/library/people-products-epiphanies)
  > ... Focus on the user and all else will follow” is the first principle in our founding philosophy. It also set the precedent for Google's very first user tests
- [“Focus on the User and All Else Will Follow”](https://www.linkedin.com/pulse/focus-user-all-else-follow-kate-winter-schoedel)
  > 1. Focus on the user and all else will follow. · 2. It's best to one thing really, really well. · 3. Fast is better than slow. · 4. Democracy on
- [10 Ways to Establish Trust on Ecommerce Sites and Apps](https://www.shopify.com/partners/blog/establish-trust)
  > Oct 26, 2021 — "Trust is the first principle of conversion." In this kind of environment, building trust with customers is key—especially since trust is the
- [Design — Shopify Polaris React](https://polaris-react.shopify.com/design)
  > Design principles serve as guiding notions that shape the design of the Shopify admin, with Polaris providing support in implementing these principles
- [Design-Focused Principles — Airbnb's Success Story](https://medium.com/design-bootcamp/design-focused-principles-airbnbs-success-story-ebff55172d7a)
  > A major key factor in Airbnb's success is its focus on the design and user experience of the platform.

### foundational_frameworks_and_theories.1
**Confidence:** high

The most relevant excerpt directly defines Value-Sensitive Design and outlines typical value conflicts such as accountability vs. privacy, trust vs. security, and privacy vs. security, illustrating how VSD frames and analyzes value tensions in design. This supports the field value’s core idea that values are central design intents and that conflicts among them can be identified and negotiated within a principled framework. The next excerpt discusses Value-Sensitive Design as a design approach and references value tensions in design, reinforcing the notion that VSD provides methods to formalize and manage competing values during the design process. The third directly addresses Value-Sensitive Design in a concise manner, underscoring the role of human values in design and the necessity of considering them in system development, which aligns with the field value’s emphasis on proactive value integration and conflict resolution. The following excerpts expand the context by showing how conflict analysis and obstacle analysis relate to goal-driven or value-based design strategies, illustrating practical methods for identifying and resolving conflicts in design requirements and goals. They support the broader idea that value conflicts must be analyzed and resolved within a structured methodological framework, even if they are not exclusively focused on VSD.

- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between

### case_study_business_vs_user_goals.business_goal_example
**Confidence:** medium

The most relevant excerpt directly discusses the concept of online choice architecture and how digital design can be used to influence competition and consumers, which aligns with pursuing growth tactics and may entail tactics like dark patterns. The next highly relevant item explicitly outlines the tension between business goals (e.g., conversion, engagement) and user goals (e.g., speed, privacy, simplicity), which is exactly the context of resolving those tensions in product design. A closely related item introduces Value Sensitive Design, highlighting typical conflicts (privacy vs trust, accountability vs privacy), which maps to the need to formalize and negotiate values when pursuing business-oriented growth.Beyond these, several excerpts frame how to handle competing objectives via trade-off analysis and Pareto-optimal considerations, which provides a formal mechanism for balancing multiple goals toward a preferred mixture. Another excerpt discusses the management of conflicts in goal-driven requirements engineering, which is directly relevant to resolution strategies when business and user goals clash. A WinWin-like requirements piece further illustrates stakeholder conflict resolution frameworks, helpful for formalizing who wins in conflicts. The remaining excerpts touch on measurement (guardrail metrics) and general optimization concepts; while informative, they are less directly tied to the explicit field value about increasing conversion through growth-focused tactics and OCA, reducing their direct relevance to the precise field value. Overall, the supporting evidence aligns best with the notion that conflicts between business growth imperatives and user-centric considerations can be modeled and mitigated using design principles, trade-off analysis, and structured requirement engineering approaches, including OCA considerations where applicable.

- [Online Choice Architecture: How digital design can harm ...](https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers)
  > Apr 5, 2022 — The discussion paper “Online Choice Architecture: how digital design can harm competition and consumers” provides an overview of what OCA is and
- [Multiobjective Optimization](https://mdobook.github.io/html/multiobj/)
  > by JRRAMA Ning — The Pareto front is helpful to understand trade-off sensitivities. For example, the left endpoint represents the maximum power solution, and the right endpoint
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Mastering Trade-Offs: Balancing Competing Objectives in ...](https://nag.com/insights/balancing-competing-objectives-in-multi-objective-optimization/)
  > Feb 28, 2025 — Decision-makers can examine the Pareto front to determine which specific blend of trade-offs best suits their operational constraints and
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Requirement](http://csis.pace.edu/~marchese/CS775/Papers/Boehm_In.pdf)
  > by B BOEHM · Cited by 565 — Stake- holders begin by entering their win conditions, using a schema provided by the WinWin system. If a conflict among stakeholders' win conditions is.
- [North Star and Guardrail Metrics Aligning Product Success ...](https://siftfeed.com/guides/north-star-guardrail-metrics)
  > Guardrail Metrics (or counter-metrics) are secondary measures used to monitor for potential negative impacts of changes or experiments. For instance, if
- [What are Guardrail Metrics?](https://www.harness.io/harness-devops-academy/guardrail-metrics)
  > Dec 9, 2024 — Guardrail metrics are business metrics designed to indirectly measure business value and provide alerts about any potentially misleading or

### foundational_frameworks_and_theories.2
**Confidence:** medium

The fine-grained field value describes a WinWin Negotiation Model with a stakeholder-centric approach to requirements conflicts: stakeholders articulate their individual win conditions, conflicts are identified, and a structured negotiation processes generates options and agreements to reach mutually satisfactory outcomes, with a traceable record. Excerpts that discuss resolving conflicts in goal-driven or requirements contexts align with this model by describing how conflicts at the goal or requirements level are analyzed, how obstacles and conflicting goals are handled, and how negotiation or structured resolution can decompose issues into options and agreements. Specifically, material that discusses down-propagating conflict resolution to the requirements level, goal-based conflict analysis, and formal techniques for reasoning about obstacles to goal satisfaction provides direct support for a framework that seeks to identify conflicts between stakeholder goals, analyze them, and guide the generation of negotiated resolutions. Text that treats obstacle analysis as a degenerate form of conflict analysis helps ground the idea that conflicts are pervasive across goal structures and require systematic handling. Discussions of Pareto or multi-objective considerations offer a technical parallel to balancing competing objectives when WinWin-style negotiations yield multiple viable options. Broader value-sensitive or design-principle perspectives referenced in the excerpts offer contextual support for why conflicting stakeholder goals arise in design settings and why a negotiation-based approach is appropriate to reconcile values, usability, privacy, and other concerns. Taken together, these excerpts sketch the core activities of the WinWin-inspired framework: identify win conditions, surface conflicts, propose options, reach agreements, and record decisions for traceability.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one

### foundational_frameworks_and_theories.3
**Confidence:** medium

The field value centers on using Multi-Objective Optimization and Pareto Analysis to detect and resolve conflicts among design goals. The most directly supportive material states that once a Pareto-optimal front is found, it is stored and that clustering helps ensure a spread among non-dominated solutions, illustrating a concrete workflow for identifying trade-offs and selecting among non-dominated alternatives. This aligns with the idea of mapping competing design intents (e.g., performance vs. cost) into a multi-objective space and identifying the knee point or balanced solutions, which is central to the proposed formal model. Other excerpts discuss conflict analysis and obstacle handling in goal-driven requirements, offering methodologies for recognizing conflicts and reasoning about how to mitigate them, which complements the overall approach by providing mechanisms to detect and analyze conflicts before applying Pareto-based resolution. Taken together, these excerpts collectively support a formal, quantitative treatment of conflicts through Pareto-optimal analysis and related goal-conflict handling techniques.

- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements

### case_study_brand_vs_usability.conflicting_goal_1
**Confidence:** medium

The target field value emphasizes a design scenario where brand-driven aesthetics—specifically minimalism, low-contrast color palettes, and flat UI—may collide with usability and accessibility requirements. The most directly supportive content is the WCAG-focused material, which formalizes contrast requirements and non-text contrast criteria. These excerpts describe that visual elements must meet minimum contrast ratios and that non-text elements require adequate contrast, which creates an explicit boundary for any low-contrast branding choices and can drive tension between brand minimalism and accessibility. The broader design-principles excerpt highlights that firms use overarching design principles to resolve conflicts, which provides a mechanism by which brand-leaning aesthetics could be weighed against usability and accessibility needs. Collectively, these excerpts support the idea that while brand minimalism may be desirable, there are formal accessibility standards and decision frameworks that constrain or guide resolutions when such branding conflicts arise with usability goals.

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
  > May 6, 2025 — Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;. Incidental. Text or images of text that are part of an
- [Understanding WCAG SC 1.4.11 Non-text Contrast](https://www.digitala11y.com/understanding-sc-1-4-11-non-text-contrast/)
  > This success criterion sets out to ensure that the luminosity contrast of such elements meet a minimum contrast ratio of 3:1 with their adjacent color.
- [1.4.11 Non-Text Contrast (AA) | New Success Criteria in ...](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)
  > Success Criterion 1.4.11 Non-text Contrast (Level AA):. The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):.
- [Design-Focused Principles — Airbnb's Success Story](https://medium.com/design-bootcamp/design-focused-principles-airbnbs-success-story-ebff55172d7a)
  > A major key factor in Airbnb's success is its focus on the design and user experience of the platform.

### foundational_frameworks_and_theories.0
**Confidence:** high

The finegrained field centers on formal models for representing and resolving conflicts among design intents, anchored in Goal-Oriented Requirements Engineering (GORE) and KAOS, with the NFR framework’s Softgoal Interdependency Graphs guiding qualitative reasoning about trade-offs via label propagation. The most relevant information emphasizes conflict resolution as a process that is propagated from goals down to the requirements level, i.e., resolving goal-level conflicts and then translating those resolutions into the requirements, which directly supports the idea of a structured conflict model. Additional highly relevant material treats obstacle analysis as a specialized form of conflict analysis, highlighting how obstacles indicate conditions that block goal achievement and thus are integral to detecting and resolving tensions between goals and constraints. Further, discussions about handling obstacles within goal-oriented requirements engineering formalize the idea that conflicts can be analyzed, categorized, and managed through defined techniques, reinforcing the core concept of a formal, rule-based conflict resolution mechanism.

Supplementary content discusses the NFR framework and its relation to softgoals, relating architectural decisions to measurable or qualitative contributions (Make/Help vs. Hurt/Break), which aligns with how a Design-Intent Conflict Model would evaluate design options through a structured SIG-based approach. Even though some excerpts broaden to value-sensitive topics or optimization trade-offs, they still complement the central theme by showing complementary methods for prioritizing or negotiating conflicting objectives (e.g., Pareto-optimal considerations in multi-objective contexts, and value tensions). The cited works on goal-oriented requirements engineering and obstacle management collectively provide the core models (GOALs, softgoals, refinements, contribution links) and the mechanisms (divergence analysis, obstacle analysis) needed to detect and resolve conflicts between intent dimensions in design. As such, the most relevant content directly supports the existence of a formal model that captures, detects, and resolves conflicts using goal structures, obstacle analysis, and SIG-based qualitative reasoning, which corresponds to the described fine-grained field value.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements

### case_study_accessibility_as_a_constraint.hierarchy_impact
**Confidence:** high

The field value asserts that accessibility requirements must be satisfied first and that, in conflicts with other design goals, accessibility wins by rule, forcing other goals to adapt. This is supported by references to formal accessibility standards and conformance regimes. Specifically, conformance requirements indicate that established accessibility criteria (such as WCAG and Section 508) are adopted or required, implying an obligation hierarchy where accessibility is non-negotiable. Additional policy-focused sources emphasize that accessibility-related rules are binding for compliance, reinforcing the idea of accessibility as a top-priority constraint that shapes design decisions when conflicts arise. The combination of explicit conformance statements and policies provides a foundation for treating accessibility as an overriding constraint that other goals must accommodate. If a project must satisfy WCAG criteria and federal or organizational policies, then the hierarchy places accessibility above aesthetic or brand considerations, guiding resolution towards adjusting non-accessibility goals to meet accessibility obligations. Excerpts referencing specific WCAG success criteria and conformance references illustrate the practical implementation of these non-negotiable requirements, while policy and regulatory pages reinforce the binding nature of these obligations in real-world design contexts. 

- [Applicability & Conformance Requirements | Section508. ...](https://www.section508.gov/develop/applicability-conformance/)
  > The Revised 508 Standards incorporate by reference the WCAG 2.0 Level AA Success Criteria, and apply the WCAG 2.0 Level AA success criteria and conformance
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
  > May 6, 2025 — Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;. Incidental. Text or images of text that are part of an
- [Web Content Accessibility Guidelines - Academic Affairs](https://campus.kennesaw.edu/faculty-staff/academic-affairs/curriculum-instruction-assessment/digital-learning-innovations/academic-web-accessibility/advanced-accessibility-solutions/regulations-policies-standards/web-content-accessibility-guidelines.php)
  > As of January 2017, Section 508 adopted WCAG's 2.0 criteria to Level AA conformance. ... https://www.w3.org/WAI/standards-guidelines/wcag/glance/. McKenzie
- [Understanding WCAG SC 1.4.11 Non-text Contrast](https://www.digitala11y.com/understanding-sc-1-4-11-non-text-contrast/)
  > This success criterion sets out to ensure that the luminosity contrast of such elements meet a minimum contrast ratio of 3:1 with their adjacent color.
- [1.4.11 Non-Text Contrast (AA) | New Success Criteria in ...](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)
  > Success Criterion 1.4.11 Non-text Contrast (Level AA):. The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):.
- [Web Accessibility Laws & Policies](https://www.w3.org/WAI/policies/)
  > This page lists governmental policies related to web accessibility, although it is not a comprehensive or definitive listing. W3C does not make regulations.

### case_study_accessibility_as_a_constraint.nature_of_goal
**Confidence:** high

The most directly relevant evidence shows that regulatory and standards-based accessibility criteria are treated as mandatory. Excerpts describing conformance requirements explicitly state that revised accessibility standards reference WCAG criteria and require conformance, which aligns with the idea of accessibility being a non-negotiable precondition for release. Additional excerpts note that accessibility compliance (through laws and policies) governs release decisions and that authorities adopt WCAG criteria as mandatory benchmarks. Further, excerpts mentioning WCAG guidance and non-text contrast illustrate concrete accessibility requirements that constrain design choices, reinforcing the view that accessibility is a hard-goal prerequisite rather than a flexible preference. Collectively, these pieces support the notion that accessibility constraints function as non-negotiable, mandatory preconditions in product development and release processes.

- [Applicability & Conformance Requirements | Section508. ...](https://www.section508.gov/develop/applicability-conformance/)
  > The Revised 508 Standards incorporate by reference the WCAG 2.0 Level AA Success Criteria, and apply the WCAG 2.0 Level AA success criteria and conformance
- [Web Content Accessibility Guidelines - Academic Affairs](https://campus.kennesaw.edu/faculty-staff/academic-affairs/curriculum-instruction-assessment/digital-learning-innovations/academic-web-accessibility/advanced-accessibility-solutions/regulations-policies-standards/web-content-accessibility-guidelines.php)
  > As of January 2017, Section 508 adopted WCAG's 2.0 criteria to Level AA conformance. ... https://www.w3.org/WAI/standards-guidelines/wcag/glance/. McKenzie
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
  > May 6, 2025 — Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;. Incidental. Text or images of text that are part of an
- [Web Accessibility Laws & Policies](https://www.w3.org/WAI/policies/)
  > This page lists governmental policies related to web accessibility, although it is not a comprehensive or definitive listing. W3C does not make regulations.
- [Understanding WCAG SC 1.4.11 Non-text Contrast](https://www.digitala11y.com/understanding-sc-1-4-11-non-text-contrast/)
  > This success criterion sets out to ensure that the luminosity contrast of such elements meet a minimum contrast ratio of 3:1 with their adjacent color.
- [1.4.11 Non-Text Contrast (AA) | New Success Criteria in ...](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)
  > Success Criterion 1.4.11 Non-text Contrast (Level AA):. The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):.

### case_study_accessibility_as_a_constraint.legal_context
**Confidence:** high

The finegrained field value asserts that conformance is achieved by regulatory requirements (like US Section 508) that explicitly refer to WCAG 2.0 Level AA. The most relevant excerpt directly states that Section 508 Standards incorporate WCAG 2.0 Level AA Success Criteria by reference and apply those criteria for conformance. A closely related excerpt notes that a government-adopted policy ecosystem (Section 508) has integrated WCAG 2.0 Level AA conformance, reinforcing the regulatory linkage. Additional excerpts discuss web accessibility policies and general WCAG criteria; these support the broader context of accessibility standards and governance but do not as directly confirm the regulatory incorporation by reference. The remaining accessibility-focused excerpts about WCAG 2.1 non-text contrast provide related but tangential standards not explicitly tied to the regulatory conformance claim here. Collectively, the strongest support comes from the explicit statements about Section 508 incorporating WCAG 2.0 Level AA by reference, followed by corroborating notes on adoption under policy/policy-related pages, with peripheral context from WCAG 2.1 specifics."

- [Applicability & Conformance Requirements | Section508. ...](https://www.section508.gov/develop/applicability-conformance/)
  > The Revised 508 Standards incorporate by reference the WCAG 2.0 Level AA Success Criteria, and apply the WCAG 2.0 Level AA success criteria and conformance
- [Web Content Accessibility Guidelines - Academic Affairs](https://campus.kennesaw.edu/faculty-staff/academic-affairs/curriculum-instruction-assessment/digital-learning-innovations/academic-web-accessibility/advanced-accessibility-solutions/regulations-policies-standards/web-content-accessibility-guidelines.php)
  > As of January 2017, Section 508 adopted WCAG's 2.0 criteria to Level AA conformance. ... https://www.w3.org/WAI/standards-guidelines/wcag/glance/. McKenzie
- [Web Accessibility Laws & Policies](https://www.w3.org/WAI/policies/)
  > This page lists governmental policies related to web accessibility, although it is not a comprehensive or definitive listing. W3C does not make regulations.
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
  > May 6, 2025 — Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;. Incidental. Text or images of text that are part of an
- [Understanding WCAG SC 1.4.11 Non-text Contrast](https://www.digitala11y.com/understanding-sc-1-4-11-non-text-contrast/)
  > This success criterion sets out to ensure that the luminosity contrast of such elements meet a minimum contrast ratio of 3:1 with their adjacent color.
- [1.4.11 Non-Text Contrast (AA) | New Success Criteria in ...](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)
  > Success Criterion 1.4.11 Non-text Contrast (Level AA):. The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):.

### case_study_brand_vs_usability.specific_example
**Confidence:** high

The described issues—text readability against images and weak signifiers in a flat UI—directly relate to accessibility and readability constraints. The first highly relevant excerpt states a WCAG-based contrast requirement: a minimum contrast ratio of 3:1 for large-scale text and images, establishing a concrete threshold that would be violated by white text over images on a mobile e-commerce site. The second closely related excerpt expands on the same accessibility goal by detailing that the luminance contrast of elements should meet a minimum 3:1 against adjacent colors, reinforcing how contrast governs readability in UI elements. The third excerpt reinforces the exact criterion by explicitly noting that visual presentation must maintain a contrast ratio of at least 3:1 against surrounding colors, which supports the notion that weak contrast and poor signifiers impede usability. Collectively, these excerpts provide formal criteria and terminology (contrast ratio, non-text contrast) that underpin the modeled scenario of contrast issues and weak affordances in a brand-versus-usability context. This grounds the proposed model in established accessibility standards for detecting and resolving such conflicts in design intent dimensions.

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
  > May 6, 2025 — Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;. Incidental. Text or images of text that are part of an
- [Understanding WCAG SC 1.4.11 Non-text Contrast](https://www.digitala11y.com/understanding-sc-1-4-11-non-text-contrast/)
  > This success criterion sets out to ensure that the luminosity contrast of such elements meet a minimum contrast ratio of 3:1 with their adjacent color.
- [1.4.11 Non-Text Contrast (AA) | New Success Criteria in ...](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)
  > Success Criterion 1.4.11 Non-text Contrast (Level AA):. The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):.

### case_study_brand_vs_usability.conflicting_goal_2
**Confidence:** high

The field value centers usability best practices, specifically readability, discoverability, and accessibility with WCAG contrast considerations. Direct guidance in the excerpts establishes that accessibility requirements, such as WCAG contrast ratios, are formal criteria that must be met (for example, a contrast ratio of at least 3:1 for large-scale text or images of text, and related non-text contrast criteria). These passages explicitly describe the accessibility metrics and criteria that constrain design decisions, demonstrating how accessibility is formalized as an obligation and interacts with other design goals. Additional excerpts discuss trust and brand considerations, as well as general design principles, which illuminate how organizations balance brand goals with usability constraints and how principles can function as tie-breakers. Together, these sources illustrate a model where accessibility constraints act as non-negotiable requirements that compete with or override conflicting brand or business goals, and where design principles or best practices help resolve tensions when exact metrics are not prescriptive. The most directly supportive content is the articulation of WCAG-related requirements and contrast criteria, which provide concrete, testable standards that must be satisfied, thereby structuring how conflicts involving readability, discoverability, and accessibility are detected and resolved. The surrounding discussions about trust, brand guidelines, and design principles offer context for how those accessibility constraints become formalized decision criteria within a broader multi-criteria optimization or governance model.

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
  > May 6, 2025 — Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;. Incidental. Text or images of text that are part of an
- [Understanding WCAG SC 1.4.11 Non-text Contrast](https://www.digitala11y.com/understanding-sc-1-4-11-non-text-contrast/)
  > This success criterion sets out to ensure that the luminosity contrast of such elements meet a minimum contrast ratio of 3:1 with their adjacent color.
- [1.4.11 Non-Text Contrast (AA) | New Success Criteria in ...](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)
  > Success Criterion 1.4.11 Non-text Contrast (Level AA):. The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):.
- [10 Ways to Establish Trust on Ecommerce Sites and Apps](https://www.shopify.com/partners/blog/establish-trust)
  > Oct 26, 2021 — "Trust is the first principle of conversion." In this kind of environment, building trust with customers is key—especially since trust is the
- [Design-Focused Principles — Airbnb's Success Story](https://medium.com/design-bootcamp/design-focused-principles-airbnbs-success-story-ebff55172d7a)
  > A major key factor in Airbnb's success is its focus on the design and user experience of the platform.
- [Homepage & Navigation UX Best Practices 2025](https://baymard.com/blog/ecommerce-navigation-best-practice)
  > Sep 30, 2025 — Discover 11 Homepage & Category Navigation UX best practices to follow, backed by our 2025 UX benchmark data.
- [Homepage UX Best Practices 2021](https://baymard.com/blog/ecommerce-homepage-ux)
  > Jul 13, 2021 — Below we'll discuss the UX performance and 8 common pitfalls and the correspodning Homepage best practices to be aware of for Homepage.
- [15 Common UX Pitfalls Luxury Retail E-Commerce Sites ...](https://baymard.com/blog/2021-luxury-ecommerce-benchmark)
  > Jun 8, 2021 — In this article we'll analyze this dataset to provide you with an overview of the UX performance of Luxury Retail e-commerce, and outline 15 common design
- ['Luxury Goods' Ecommerce UX Audit](https://baymard.com/audits/luxury-goods)
  > The in-depth Luxury Goods UX audit will be based on 500+ weighted UX parameters uncovered during our large-scale UX testing.
- [Luxury Goods Ecommerce UX Research](https://baymard.com/research/luxury-goods)
  > Discover how to optimize user experience for luxury goods websites. Our large-scale ecommerce UX research reveals best practices for checkout flows and UI.

### case_study_accessibility_as_a_constraint.constraint_standard
**Confidence:** medium

The most directly relevant excerpts confirm the WCAG framework and specific contrast requirements. One excerpt explicitly discusses non-text contrast with a minimum ratio of 3:1, which aligns with the non-text contrast criterion often considered in WCAG Level AA conformance. Another excerpt reiterates the 3:1 requirement for non-text contrast, reinforcing the same constraint. A third excerpt references WCAG-related criteria and conformance, tying accessibility standards to overall conformance expectations. Additional excerpts address the broader WCAG guidance and governance (e.g., policy pages and higher-level conformance references) which establish that WCAG Level AA criteria are the standard against which accessibility constraints are measured and negotiated in design contexts. Collectively, these excerpts support the idea that WCAG 2.x Level AA, including at least non-text contrast and general contrast considerations, serves as a formal constraint standard in design decision-making, which the finegrained field value describes. The explicit mention of 4.5:1 for text contrast is not present in these excerpts, but the presence of 3:1 non-text contrast and WCAG Level AA conformance provides substantial alignment with the stated constraint model and informs resolution mechanisms in multi-stakeholder design contexts.

- [Understanding WCAG SC 1.4.11 Non-text Contrast](https://www.digitala11y.com/understanding-sc-1-4-11-non-text-contrast/)
  > This success criterion sets out to ensure that the luminosity contrast of such elements meet a minimum contrast ratio of 3:1 with their adjacent color.
- [1.4.11 Non-Text Contrast (AA) | New Success Criteria in ...](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast)
  > Success Criterion 1.4.11 Non-text Contrast (Level AA):. The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):.
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
  > May 6, 2025 — Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;. Incidental. Text or images of text that are part of an
- [Web Content Accessibility Guidelines - Academic Affairs](https://campus.kennesaw.edu/faculty-staff/academic-affairs/curriculum-instruction-assessment/digital-learning-innovations/academic-web-accessibility/advanced-accessibility-solutions/regulations-policies-standards/web-content-accessibility-guidelines.php)
  > As of January 2017, Section 508 adopted WCAG's 2.0 criteria to Level AA conformance. ... https://www.w3.org/WAI/standards-guidelines/wcag/glance/. McKenzie
- [Applicability & Conformance Requirements | Section508. ...](https://www.section508.gov/develop/applicability-conformance/)
  > The Revised 508 Standards incorporate by reference the WCAG 2.0 Level AA Success Criteria, and apply the WCAG 2.0 Level AA success criteria and conformance
- [Web Accessibility Laws & Policies](https://www.w3.org/WAI/policies/)
  > This page lists governmental policies related to web accessibility, although it is not a comprehensive or definitive listing. W3C does not make regulations.

### foundational_frameworks_and_theories.3.contribution_to_model
**Confidence:** high

The fine-grained field value describes a formal model that detects and resolves conflicts between design goals by mapping measurable intents (e.g., conversion vs page load time) into a multi-objective space, identifying non-dominated options, and locating knee points for balanced trade-offs. The most directly relevant excerpt discusses Pareto-optimal fronts and the idea of storing non-dominated solutions, which aligns with the notion of representing and exploring trade-offs rather than forcing a win/lose outcome. A closely related excerpt discusses resolving conflicts at the goal level and how such conflict resolution can propagate down to requirements, which provides a mechanism for translating high-level trade-offs into concrete design decisions. Additional excerpts explicitly address handling conflicts in goal-driven requirements engineering, highlighting formal management of conflicting goals, and frame obstacles as a special case of conflict analysis, which broadens the model to accommodate impediments within goals. Further excerpts describe formal techniques for reasoning about obstacles to goals and requirements, reinforcing the idea that a structured, technique-driven approach underpins the resolution process. Collectively, these excerpts support a model that (a) maps competing design intents into a trade-off space, (b) identifies non-dominated or Pareto-efficient options, (c) resolves conflicts at the goal level and propagates decisions to requirements, and (d) employs formal techniques to reason about obstacles and conflicts in order to reach balanced, justifiable design choices.

- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements

### foundational_frameworks_and_theories.3.framework_name
**Confidence:** high

The most pertinent information directly maps to the notion of handling trade-offs among competing objectives and achieving a Pareto-efficient set of solutions. The excerpt describing Pareto-optimal fronts and clustering among non-dominated solutions directly aligns with the core idea of Multi-Objective Optimization and Pareto Analysis, illustrating how solutions are evaluated, organized, and diversified to reflect multiple goals. The following excerpts discuss conflict management and negotiation within goal-driven and goal-oriented requirements contexts, which are essential for formalizing how conflicting intents are identified, analyzed, and resolved when goals compete. They describe how conflicts are detected at the goal level, propagated to requirements, and resolved through negotiation and obstacle analysis, which complements the Pareto analysis by providing mechanisms to resolve trade-offs in practice. Additional excerpts address formal techniques for reasoning about obstacles to goals and requirements, reinforcing a structured approach to handling constraints and conflicts in design contexts. Collectively, these pieces support a model that represents multiple goals, detects conflicts, evaluates trade-offs, and applies negotiation and obstacle-analysis-based resolution methods to converge on a design that balances competing intents.

- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements

### foundational_frameworks_and_theories.3.core_concept
**Confidence:** medium

The targeted field description centers on a mathematical and computational approach to solving problems with multiple, competing objectives, where a solution is Pareto optimal if improving one objective would degrade another, and the set of all such optimal solutions is the Pareto front that visualizes trade-offs. The clearest support for this exact framing appears in the first excerpt, which explicitly mentions a Pareto-optimal front, external population storage, and clustering to ensure a spread among non-dominated solutions. This directly aligns with the formal model of representing and analyzing trade-offs among objectives. Related excerpts discuss how conflicts among goals are identified and resolved within goal-driven systems, which is thematically adjacent to multi-objective decision contexts but does not directly define or exemplify Pareto optimality. These sources describe conflict management, obstacle analysis, and negotiation/resolve mechanisms in goal-oriented requirements engineering, offering context for how conflicts can be handled in design processes but not providing the core Pareto formalism itself. The combination of these excerpts helps situate the Pareto-based approach within a broader landscape of goal conflicts and trade-off analysis, reinforcing the notion that multiple objectives and their interactions require systematic resolution mechanisms, even though the primary concept of Pareto optimality remains rooted in the first excerpt.

- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements

### foundational_frameworks_and_theories.1.core_concept
**Confidence:** high

The finegrained field value defines VSD as a design methodology that proactively and principledly considers human values across the design process, with a tripartite approach (conceptual, empirical, technical) to define values, understand stakeholder experiences, and embed values into the architecture. The most directly supporting excerpt explicitly presents Value Sensitive Design and highlights typical value conflicts in design contexts, which aligns with the core premise of VSD as a structured approach to balancing competing values. Related excerpts explicitly discuss value tensions within VSD and its design-oriented implications, reinforcing the characterization of VSD as a method that formalizes values and addresses tensions between competing considerations. While other excerpts discuss goal-oriented conflict resolution or obstacle analysis, these provide complementary methods for handling design conflicts but do not define VSD itself. Taken together, the most relevant pieces directly substantiate the defined VSD description and its emphasis on principled value consideration and embedding values into design, with additional context from closely related discussions that illuminate how value tensions are formalized and negotiated in design practice.

- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires

### foundational_frameworks_and_theories.1.key_proponents
**Confidence:** medium

The target field value identifies a specific trio of individuals associated with Value Sensitive Design. An excerpt that explicitly mentions one of these proponents (Batya Friedman) within the context of VSD provides direct support for that part of the field value. The excerpt that cites Friedman as part of the discussion on value-sensitive design literature directly aligns with the field value by naming a principal proponent. Another excerpt discusses Value Sensitive Design at a conceptual level, outlining the core idea of balancing and negotiating competing values, which is foundational to the framework and contextualizes the role of its proponents. While other excerpts discuss related design conflict resolution and trade-off analysis, they do not explicitly name the key individuals, so they offer indirect support. Together, these excerpts support identifying Friedman as a key proponent and provide contextual grounding for the VSD framework that would be associated with Kahn and Borning as well, even though that direct association is not named in the text.

- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and

### foundational_frameworks_and_theories.1.contribution_to_model
**Confidence:** high

The field value asserts that Value-Sensitive Design (VSD) provides an ethical and methodological imperative to treat human values such as privacy, trust, and transparency as central design intents, and that elicitation should formalize these values as softgoals within the framework to systematically analyze and resolve conflicts like privacy versus personalization. The most directly supportive content describes typical value conflicts within VSD, highlighting tensions such as accountability versus privacy and trust versus security, which aligns with the need to formalize and negotiate competing intents. Additional supportive material notes that VSD discusses value tensions in design, further underscoring the role of explicit values in guiding design decisions. A related source expands on the broader use of value-sensitive design in design and development contexts, reinforcing the emphasis on identifying and negotiating value-related conflicts. Contextual methods literature on goal-oriented conflict resolution provides a broader mechanism for resolving conflicts but is less specific to the VSD-focused framing; it nonetheless supports the general approach of resolving competing objectives through structured analysis. Together, these excerpts corroborate that VSD-informed frameworks can model, detect, and resolve conflicts among human values and design intents within a multi-stakeholder context.

- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between

### foundational_frameworks_and_theories.2.contribution_to_model
**Confidence:** medium

The field value describes a formal model where conflicts among stakeholder goals are resolved through a structured, transparent cycle of identifying issues, generating options, and documenting agreements, with an emphasis on collaboration and traceability. Evidence in the excerpts aligns with this in several ways: one excerpt explicitly discusses conflict resolution at the goal level and describes goal-based negotiation as a mechanism to propagate resolution down to requirements, which directly supports the idea of a structured negotiation framework that captures stakeholder intent and resolves tensions. Another excerpt references the NFR framework’s approach to relating architectural decisions to soft goals via labelled contribution links, illustrating a formal method to connect objectives (and tensions between them) to design decisions, thereby supporting a model that formalizes win conditions and how they influence decisions. A third excerpt surveys value-sensitive design, listing typical conflicts such as accountability vs privacy and trust vs security, which underscores the need for a formalized method to resolve competing values, consistent with a WinWin-style model that enumerates stakeholder concerns and negotiates trade-offs. Additional excerpts describe obstacle and conflict analysis as a degenerate form of conflict analysis, and formal techniques for reasoning about obstacles to goal satisfaction, which reinforce the existence of disciplined, repeatable methods for detecting and resolving conflicts. Consideration of multi-objective optimization and Pareto-front reasoning further complements the idea of balancing competing goals within a principled framework, a natural complement to WinWin-style negotiation cycles. Finally, the broader discussion of value-sensitive design and the mapping of design goals to interactions with usability, privacy, and other dimensions demonstrates the kinds of value tensions that a formal conflict-resolution model must address. Together, these excerpts collectively support a model where conflicts are detected, analyzed, and resolved through structured negotiation, stakeholder-win condition capture, option generation, and documented agreements for traceability.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.

### foundational_frameworks_and_theories.3.key_proponents
**Confidence:** low

The most relevant content discusses Pareto-optimal fronts in multi-objective optimization, stating that once a solution front is Pareto-optimal, it is stored and that clustering helps spread non-dominated solutions. This confirms the existence and use of the Pareto concept within multi-objective design contexts, which aligns with the target field value about Vilfredo Pareto initiating the concept. However, none of the excerpts explicitly mention Vilfredo Pareto or identify him as the originator. Therefore, the evidence is indirect: it supports the concept associated with Pareto but does not confirm authorship attribution in the excerpts themselves. No other excerpts mention Pareto or its origin, making them less relevant for establishing origin. Based on this, the justification for linking Vilfredo Pareto to the field value rests on the presence of the concept rather than explicit attribution in the provided excerpts.

- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.

### foundational_frameworks_and_theories.1.framework_name
**Confidence:** high

The most directly relevant information is a source explicitly titled 'Value Sensitive Design', which clearly aligns with the target field value and provides foundational context for VSD as a design approach that addresses conflicting values. Closely related excerpts discuss 'Value-Sensitive Algorithm Design' and general discussions of value-sensitive design in various scholarly works. These provide supplementary support by situating VSD within broader debates about values in design, even though they may emphasize selective aspects or applications rather than a formal definition alone. Further excerpts focus on goal-oriented requirements and obstacle analysis in design, which touch on conflict resolution and trade-offs but do not explicitly name Value-Sensitive Design; they are provided for contextual grounding on how conflicts and negotiation are handled in design, which reinforces the surrounding relevance of value considerations without directly naming VSD. Overall, the strongest support comes from the explicit naming of Value Sensitive Design, with clear corroboration from related discussions that explore how values influence design decisions and how such tensions might be negotiated in practice.

- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between

### foundational_frameworks_and_theories.2.core_concept
**Confidence:** medium

The most directly relevant information connects conflict resolution to goal-oriented requirements engineering and to negotiation among stakeholders. One excerpt explicitly notes that conflict resolution at the goal level is propagated to the requirements level and mentions goal-based negotiation as a mechanism for resolving conflicts, which aligns with the WinWin emphasis on stakeholders defining win conditions, identifying conflicts, and negotiating options to reach mutually satisfactory agreements. Another excerpt discusses managing conflicts in goal-driven requirements engineering, underscoring a formal approach to recognizing and addressing tensions between goals. A third excerpt describes formal techniques in reasoning about obstacles and conflicts with goals and requirements, which supports the broader methodological context for identifying where negotiations are needed and how to structure them. Related items discuss obstacle and conflict analysis within KAOS-like frameworks and the linkage between architectural decisions and soft goals, which helps situate the WinWin-style process within established design frameworks and goal hierarchies. Value-sensitive design sources contribute understanding of how competing values might conflict (privacy vs. security, accountability vs. privacy), which informs the kinds of conflicts stakeholders might negotiate, though they are not specific to the WinWin process itself. Overall, the strongest alignment is with goal-level conflict handling and explicit negotiation, followed by explicit conflict-analysis techniques and value-conflict context; these collectively support a model where win conditions are defined, conflicts identified, and options negotiated toward mutually acceptable outcomes.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.

### foundational_frameworks_and_theories.0.framework_name
**Confidence:** high

The most directly relevant material presents a KAOS-centered view of Goal-Oriented Requirements Engineering and explicitly situates GOAL analysis, obstacle/conflict analysis, and the use of formal techniques to resolve conflicts among goals. One excerpt describes a KAOS-enabled presentation of goal-oriented requirements engineering with emphasis on obstacle and conflict analysis and references to KAOS. Another excerpt provides an overview of GORE and notes how soft goals (NFRs) relate to architectural decisions, illustrating how nonfunctional requirements are integrated into goal structures via contribution links. A further excerpt discusses conflict resolution at the goal level and how it can be down-propagated to the requirements level, indicating a formal mechanism for translating high-level conflicts into actionable requirements changes, consistent with a KAOS framework. Additional excerpts explicitly address handling obstacles and conflicts within GO requirements engineering, and show formal techniques for reasoning about obstacles to goal satisfaction, which aligns with detection and resolution mechanisms in a formal model. Collectively, these sources map onto a formal model where goals, soft goals (NFRs), and obstacles are analyzed for conflicts, with resolution strategies guided by goal-based negotiation, contribution links, and formal techniques to propagate resolutions to lower levels of the specification. This supports a representation that detects conflicts among competing intents, prioritizes resolution through defined schemes (e.g., goal-based negotiation, obstacle analysis), and yields updated requirement specifications reflecting resolved goals, aligned with KAOS and NFR frameworks.

- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one

### foundational_frameworks_and_theories.0.core_concept
**Confidence:** high

The most relevant material describes a formal approach where design objectives are captured as goals, with non-functional requirements represented as softgoals. One excerpt explicitly notes that an NFR framework relates architectural decisions to softgoals through appropriate contribution links, enabling the mapping of design alternatives to goal satisfaction via labeled contributions for different objectives. This directly aligns with the requested model: hierarchically decomposed goals using AND/OR structures, and a mechanism (SIGs and label propagation) to reason qualitatively about how various design choices impact both functional and non-functional objectives. Another excerpt discusses goal-level conflict resolution, explaining that resolving conflicts at the goal level can propagate down to requirements, which is consistent with a hierarchical model where top-level objectives constrain or guide lower-level requirements. Additional excerpts address managing conflicts in goal-driven requirements engineering, indicating formal methods to reason about and resolve tensions between competing goals, matching the need for a formal process to detect and resolve conflicts among intent dimensions. An excerpt modeling obstacles as conditions for conflicts reinforces the idea that constraints impede goal satisfaction, which is relevant for detecting when trade-offs are necessary. Finally, a KAOS/goal-oriented requirements engineering resource provides context on dedicated methodologies for goal-oriented analysis and conflict handling, supporting the existence of a formal framework for representing, detecting, and resolving conflicts among design intents. Collectively, these excerpts substantiate a formal model where goals and softgoals are structured, interrelated via contribution links, and resolved through propagation-based reasoning and conflict management techniques, as described in the finegrained field value.

- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques

### foundational_frameworks_and_theories.0.key_proponents
**Confidence:** high

The most relevant excerpt explicitly cites the KAOS approach and A. van Lamsweerde as a foundational figure in GO requirements engineering, aligning with the idea of a formal framework for engineering goals and conflicts. It also references obstacle and conflict analysis, which ties to how conflicts between intent dimensions can be analyzed and resolved within a KAOS-like lineage. The next excerpt introduces the NFR framework and L. Chung, showing the complementary foundational work that links architectural decisions to soft goals, and naming Chung, which matches the second key proponent in the fine-grained field value. Following that, excerpts describe conflict resolution at the goal level and the existence of goal-driven requirements engineering work by van Lamsweerde, supporting the claim that these authors are central to formalizing and resolving conflicts in this domain. Additional excerpts discuss obstacle and conflict analysis within the same GO requirements context, reinforcing the methodological basis for detecting and addressing conflicts between design goals. Taken together, these excerpts establish KAOS (van Lamsweerde) and the NFR Framework (Chung) as foundational proponents, and illustrate how their frameworks handle conflict analysis and resolution in multi-goal design contexts.

- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between

### foundational_frameworks_and_theories.0.contribution_to_model
**Confidence:** medium

The fine-grained field value centers on a formal model for design-intent conflicts, integrating Goal-Oriented Requirements Engineering (GORE) concepts with the Design-Intent Conflict Model (DICM), including goals, softgoals, refinements, and contribution links. It also references divergence analysis and obstacle analysis as core methods for detecting inconsistencies and obstructions to goal achievement, drawing on GORE/KAOS and the NFR framework. Texts that describe goal-level conflict resolution, obstacle analysis, and the propagation of resolutions from goals to requirements directly support the existence and mechanics of a formal conflict model. Specifically, material that discusses how conflict resolution is propagated to requirements, how obstacles are analyzed as a form of conflict between goals, and the relationship between goal-oriented approaches and formal techniques (including KAOS/NFR lineage) directly maps to the described DICM and its conflict-detection mechanisms. Contextual works on value-sensitive design and multi-objective optimization provide important adjacent considerations (e.g., value tensions and Pareto-optimal thinking) but are secondary to the explicit formal artifacts, methods, and integration described in the field value. The cited items collectively support a model where conflicts are identified, analyzed, and resolved through structured, formal reasoning rooted in established goal-oriented and requirements-engineering frameworks, with explicit mechanisms for propagating resolutions and detecting inconsistencies across the design rationale.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Value-Sensitive Algorithm Design: Method, Case Study, ...](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)
  > by H ZHU · 2018 · Cited by 250 — Value Tensions in Design: The Value Sensitive. Design, Development, and Appropriation of a Corporation's Groupware System. In Proceedings of the 2007
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one

### prioritization_and_goal_hierarchy.prioritization_schema
**Confidence:** medium

To support a formal prioritization schema within a goal model, information from goal-oriented and goal-driven requirements literature is most relevant. First, there is explicit discussion of conflict resolution at the goal level and the idea that resolving conflicts can propagate down to associated requirements, which suggests a mechanism for embedding priority decisions at higher levels and ensuring they influence lower-level artifacts. The notion of a conflict link between goals—activated when satisfying one goal prevents another from being satisfied—provides a structural basis for encoding mutual exclusion and the need for a ranking rule. Additional sources describe managing conflicts in goal-driven requirements engineering, which reinforces the practical need for formal processes to adjudicate competing objectives. The idea that obstacle analysis can be viewed as a special case of conflict analysis further implies that priority rules could be consistent across both goal-driven and constraint-driven views of design space. Value-related discussions illustrate how competing objectives (e.g., accountability vs. privacy) may require explicit balancing criteria, which a prioritization schema could formalize as tie-breakers or weightings. Finally, references to softgoal interdependency graphs in the NFR context demonstrate a concrete modeling artifact for representing non-functional requirements and their interdependencies, which can be extended to encode priority and resolution rules. Taken together, these perspectives illuminate how one would construct a formal model: goals with explicit priority attributes, defined relations (conflict/enablement), propagation of priority decisions through refinements, and tie-breaking rules grounded in overarching design principles or stakeholder values.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [NFR Framework Support](https://personal.utdallas.edu/~chung/Sam_Supakkul/RE-Tools/NFR-Framework.html)
  > The following is a Softgoal Interdependency Graph (SIG) that models account security, its definition and corresponding security measures.

### interdependency_and_conflict_modeling
**Confidence:** high

The field value describes a formal model for representing interdependencies and conflicts among intent dimensions in design, drawing on SIGs from the NFR framework and goal-oriented requirements engineering approaches such as KAOS. The most directly relevant pieces articulate an explicit structure where softgoals are connected via interdependencies in a graphical form (Softgoal Interdependency Graphs) and where the NFR framework links architectural decisions to softgoals through contribution links like Make, Help, Hurt, and Break, optionally weighted to express strength. These passages also cover how goals can be decomposed using AND/OR refinements to represent alternative means–ends and how inter-goal tensions are captured through explicit contribution and conflict links, including the formal notion that a conflict link signals that satisfying one goal may prevent another. Additional excerpts describe goal-oriented requirements engineering and its conflict resolution mechanisms (including down-propagation of goal-level conflict resolution to requirements level), which aligns with the idea of resolving tensions between competing objectives. Acknowledging the role of obstacles analysis further supports a formal treatment of conflicts and divergences within goal models, reinforcing the formal approach to resolving interdependencies. Collectively, these excerpts provide the foundational modeling constructs (SIGs, KAOS/NFR mappings, contribution and conflict links, AND/OR refinements, and obstacle/conflict analysis) that underpin a formal model for representing, detecting, and resolving conflicts between intent dimensions in design as described in the field value.

- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — "Confidentiality goals are Avoid goals (on Knows predicates)". "Safety goals have higest priority in conflict resolution" more specific types & categories.
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between

### foundational_frameworks_and_theories.2.framework_name
**Confidence:** medium

The most directly supportive evidence describes explicit mechanisms for resolving conflicts between goals through negotiation and structured analysis. One excerpt discusses conflict resolution at the goal level and explicitly mentions goal-based negotiation, which aligns with a WinWin approach that seeks acceptable trade-offs and mutual gains by resolving tensions between competing intents. Another excerpt focuses on managing conflicts in goal-driven requirements engineering, highlighting formal approaches to reconciling competing objectives, a core aspect of any WinWin-style model. A third excerpt covers how Pareto-optimal fronts from multi-objective optimization can be used to illustrate trade-offs among competing goals, which is a foundational method for documenting and selecting mutually beneficial solutions when interests conflict. A fourth excerpt references the NFR framework and contributes links that relate architectural decisions to soft goals, providing a structured way to reason about how different design objectives influence one another and where compromises may be needed. Additional excerpts discuss value conflicts in value-sensitive design and obstacle analysis as ways to formalize and reason about conflicts, further enriching the repertoire of techniques that a WinWin model could incorporate (e.g., identifying conflicting values and obstacles to goal satisfaction). The remaining excerpts offer broader context on conflict analysis and design principles that can serve as tie-breakers or additional constraints in a WinWin negotiation process, such as how design principles are used to resolve conflicts between objectives. Taken together, the cited passages collectively inform a formal model for representing, detecting, and resolving conflicts by capturing goal-level negotiations, obstacles, trade-offs, and principled resolutions, which are all essential components of a WinWin negotiation framework.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Handling Obstacles in Goal-Oriented Requirements ...](https://dl.acm.org/doi/10.1109/32.879820)
  > A. van Lamsweerde R. Darimont and E. Letier, “Managing Conflicts in Goal-Driven Requirements Engineering,” IEEE Trans. Software Eng., vol. 24, no. 11, pp. 908–
- [Lecture 9: Multi-Objective Optimization](https://engineering.purdue.edu/~sudhoff/ee630/Lecture09.pdf)
  > ▫ Once a solution Pareto-optimal front is found, it is stored in the external population. ▫ Clustering ensures a spread among the non- dominated solutions.
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Value Sensitive Design](https://www.publicsphereproject.org/content/value-sensitive-design)
  > Typical value conflicts include accountability vs. privacy, trust vs. security, environmental sustainability vs. economic development, privacy vs. security, and
- [friedman96valuesensitivedesign.pdf](https://old.vsdesign.org/publications/pdf/friedman96valuesensitivedesign.pdf)
  > by B Friedman · Cited by 1258 — Thus, I have suggested that in the design of computer technology we value human values as understood from an ethical standpoint. This is not to say that one
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Handling obstacles in goal-oriented requirements ...](https://www.computer.org/csdl/journal/ts/2000/10/e0978/13rRUzp02pR)
  > This paper presents formal techniques for reasoning about obstacles to the satisfaction of goals, requirements, and assumptions elaborated in the requirements
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques

### interdependency_and_conflict_modeling.relationship_types
**Confidence:** high

The target field describes two canonical interdependency mechanisms in GO-RE: (a) contribution links that are directed, signed, and optionally weighted to express how one goal's satisfaction affects another, and (b) conflict links that model explicit opposition between goals. The most directly supportive excerpts describe exactly these constructs: one discusses relating architectural decisions to softgoals via labelled contribution links, establishing how one goal’s satisfaction contributes to another’s. Another covers conflict resolution at the goal level and the idea of negotiating between goals to satisfy conflicting objectives. A separate excerpt introduces obstacle/conflict analysis as a way to analyze and resolve conflicts between goals, reinforcing that conflicts can be analyzed to inform design decisions. Additional excerpts explicitly mention that a conflict link represents direct structural opposition between goals and that conflict resolution can be guided by priority considerations or tie-breakers, which aligns with formal priority schemas and rule-based resolutions. Contextual pieces on obstacle analysis and the idea that conflicts can be resolved through goal-based negotiation provide supplementary support for a formalized model, by illustrating the practical procedures and considerations used in resolving interdependencies. Taken together, these excerpts collectively support the construction of a formal model where interdependencies are captured via signed contribution links and explicit conflict links, along with a procedure for resolving them through negotiated priorities and rules.

- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — "Confidentiality goals are Avoid goals (on Knows predicates)". "Safety goals have higest priority in conflict resolution" more specific types & categories.
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.

### interdependency_and_conflict_modeling.contribution_link_examples
**Confidence:** medium

The core idea in the field value is that a formal model represents interdependencies between goals through contribution links (Make, Help, Hurt, Break) and enables weighting to express the strength of impact. The cited literature shows that contribution links are a recognized mechanism to connect architectural decisions and softgoals within the Non-Functional Requirements (NFR) framework, explicitly describing how architectural decisions relate to softgoals via labeled contribution links. This supports the notion of structured, semi-quantitative links that quantify impact. The same body of work also discusses conflict resolution at the goal level and notes that resolving such conflicts involves negotiation approaches, indicating a formal process for balancing competing objectives. Additionally, the SIG (Softgoal Interdependency Graph) concept is described as a framework for evaluating interdependencies and labels, with emphasis on quantitative evaluation driven by labels and priorities, which aligns with attaching weights to contribution links. Other excerpts discuss obstacle and conflict analysis as formal techniques within goal-oriented requirements engineering, highlighting that conflict analysis can be treated as part of obstacle analysis and that formal techniques are used to resolve conflicts, further supporting a structured approach to interdependent goals. Collectively, these sources provide the building blocks for a formal model that uses contribution links and optional numerical weights to detect and resolve conflicts among intent dimensions in design. However, while the excerpts clearly establish the existence of contribution links, goal-based negotiation, and quantitative labeling, they do not provide the exact syntax or a complete enumerated set of contribution types (Make, Help, Hurt, Break) within the given field value; they do support the general framework and weighting concept, which is why the evidence is strong but not perfectly complete for every claimed facet of the field value.

- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — "Confidentiality goals are Avoid goals (on Knows predicates)". "Safety goals have higest priority in conflict resolution" more specific types & categories.
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques

### interdependency_and_conflict_modeling.modeling_structure
**Confidence:** high

The core claim is that a formal model for interdependencies and conflicts in design goals is realized through graphical structures like Softgoal Interdependency Graphs (SIGs), drawing on established frameworks such as KAOS and NFR, and that goal decomposition uses AND/OR refinements to represent alternative or mandatory subgoals. The most directly supporting material identifies SIGs as the Softgoal Interdependency Graph and notes quantitative evaluation via label propagation, which anchors the idea of a graphical interdependency model. Related material shows that the NFR framework connects softgoals to architectural decisions via contribution links, reinforcing the role of softgoals and their interdependencies in formal modeling. Additional sources discuss how conflicts at the goal level are resolved or negotiated, including goal-based negotiation and explicit conflict/obstacle analysis, which substantiates the conflict-resolution aspect of the model. Other excerpts reference KAOS and general GO requirements engineering with notes on obstacle analysis and conflict analysis, which align with the formalization and methods used to resolve competing objectives. Finally, discussions of obstacle and conflict analysis in GO requirements provide complementary methods to handle conflicts when satisfying one goal may hinder another. Collectively, these excerpts map onto a model that uses graphical goal/softgoal representations, explicit interdependencies, principled conflict resolution strategies, and structured refinements (AND/OR) to describe how competing intents can be modeled, detected, and resolved in multi-stakeholder design contexts.

- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — "Confidentiality goals are Avoid goals (on Knows predicates)". "Safety goals have higest priority in conflict resolution" more specific types & categories.
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between

### interdependency_and_conflict_modeling.formal_conflict_definition
**Confidence:** high

The strongest support comes from passages that explicitly mention a conflict link between goals, indicating that the satisfaction of one goal may prevent another from being satisfied, which directly maps to the structural definition of conflict in the field. Additionally, descriptions of goal-level conflict resolution, including how conflict links drive negotiation or prioritization, align with the formal mechanisms for resolving divergences. References that discuss highest priority or explicit prioritization rules during conflict resolution further corroborate how conflicts are managed in practice. Related material on obstacle analysis framing conflicts as a degenerate case of conflict analysis and softgoal interdependencies provide context for how conflicts cascade through a requirements model and how evaluation frameworks consider these interdependencies. Collectively, these excerpts cover both the structural (conflict link) and the formal (divergence under boundary conditions) aspects of the finegrained field value, illustrating how conflicts are defined, detected, and resolved within GORE. The most relevant portions explicitly state that a conflict link exists between goals, that resolving one may prevent the other from being satisfied, and that conflict resolution often involves prioritization or negotiations, which matches the formal model described in the field value.

- [Goal-oriented requirements engineering: a guided tour](https://homepages.uc.edu/~niunn/courses/RE-refs/GuidedTour01.pdf)
  > , a conflict link
between two goals is introduced when the satisfaction of
one of them may prevent the other from being satisfied.
  > by A van Lamsweerde · Cited by 2890 — Finally, the conflict resolution at goal level is down propagated to the requirements level. 5.5 Goal-based negotiation. Conflict resolution often requires
- [Goal-Oriented Requirements Engineering: - Objectiver](https://objectiver.com/fileadmin/download/documents/presentations/KaosCEE-AvL.pdf)
  > by A van Lamsweerde · 2003 — "Confidentiality goals are Avoid goals (on Knows predicates)". "Safety goals have higest priority in conflict resolution" more specific types & categories.
  > by A van Lamsweerde · 2003 — Goal-Oriented Requirements Engineering. May 2003. © A. van Lamsweerde. 12. 23 ... ◇ 1-5: Obstacle & conflict analysis: – cfr. below: use of formal techniques
- [Handling Obstacles in Goal-Oriented Requirements ...](https://webperso.info.ucl.ac.be/~avl/files/TSE-Obstacles.pdf)
  > by A van Lamsweerde · Cited by 889 — In [Lam98b], we have shown that obstacle analysis can be seen as a degenerate case of conflict analysis; an obstacle amounts to a condition for conflict between
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
  > by A Lapouchnian · 2005 · Cited by 301 — The NFR framework allows for relating architectural decisions to softgoals through appropriately labelled contribution links. Chung et al.
- [Non-Functional Requirements Functional Requirements](https://www.utdallas.edu/~chung/RE/NFR-18.pdf)
  > Softgoal Interdependency Graph (SIG):. Evaluation Thru Label Propagation. Quantitative evaluation as a function of numeric values for labels and priorities. 1.
