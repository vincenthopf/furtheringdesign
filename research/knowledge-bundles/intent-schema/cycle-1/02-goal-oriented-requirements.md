---
query: "How does Goal-Oriented Requirements Engineering (GORE) formalize goals, soft-goals, constraints, and success criteria into computable structures? Research: (1) The KAOS framework — how it represents goals, obstacles, agents, operations, and goal refinement hierarchies. (2) The i* (i-star) framework — strategic dependency models, actor goals, soft-goals, tasks, and resources. (3) Tropos — goal-based agent modeling for software systems. (4) How soft-goals (non-functional requirements like usability, trust, delight) are represented and traded off in GORE frameworks. (5) Goal decomposition patterns — AND/OR refinement, contribution links, conflict detection. (6) How GORE handles goal conflicts and priority resolution. (7) Any application of GORE to UI/UX design, HCI, or user experience requirements specifically. Output: the structural primitives these frameworks use to represent intent, and how they handle hierarchical decomposition and conflict."
processor: core
run_id: trun_6b0c617b26214cd7bca1756f90867e3b
created_at: 2026-05-05T03:15:08.769940Z
retrieved_at: 2026-05-05T03:17:09Z
---

# Research: How does Goal-Oriented Requirements Engineering (GORE) formalize goals, soft-goals, constraints, and success criteria into computable structures? Research: (1) The KAOS framework — how it represents goals, obstacles, agents, operations, and goal refinement hierarchies. (2) The i* (i-star) framework — strategic dependency models, actor goals, soft-goals, tasks, and resources. (3) Tropos — goal-based agent modeling for software systems. (4) How soft-goals (non-functional requirements like usability, trust, delight) are represented and traded off in GORE frameworks. (5) Goal decomposition patterns — AND/OR refinement, contribution links, conflict detection. (6) How GORE handles goal conflicts and priority resolution. (7) Any application of GORE to UI/UX design, HCI, or user experience requirements specifically. Output: the structural primitives these frameworks use to represent intent, and how they handle hierarchical decomposition and conflict.

## Findings

### Output

Goal-Oriented Requirements Engineering (GORE) formalizes stakeholder intent using a set of structural primitives organized into computable hierarchies. Frameworks like KAOS, i*, and Tropos use these constructs to reason about satisfaction, trade-offs, and conflicts.

### Structural Primitives
- **Goals and Soft-goals:** Goals represent functional objectives with clear satisfaction criteria. Soft-goals represent non-functional requirements (e.g., usability, trust) that are "satisficed" rather than strictly satisfied. They are modeled as nodes with metadata such as importance and utility.
- **Agents and Actors:** These are parties (human or system) responsible for achieving goals. In i*, actors have strategic dependencies on one another.
- **Tasks/Operations and Resources:** Tasks are executable behaviors that realize goals, while resources are physical or informational objects required for task execution.
- **Obstacles:** Conditions that prevent goal achievement, used primarily in KAOS for risk analysis.

### Hierarchical Decomposition and Refinement
- **AND/OR Refinement:** Goals are decomposed into subgoals. AND-refinement requires all subgoals to be satisfied; OR-refinement (or means-ends) represents alternative ways to achieve a higher-level goal.
- **Refinement Patterns:** KAOS uses formal temporal logic patterns (e.g., milestone, case-driven) to ensure refinement proofs. i* uses task decomposition and means-ends links to show how an actor's goals are achieved.
- **Operationalization:** This is the process of linking high-level goals to specific operations or constraints that can be monitored and controlled by assigned agents.

### Handling Soft-goals and Conflicts
- **Contribution Links:** Soft-goals are interlinked by contribution links (e.g., +, ++, -, --) that indicate how tasks or goals influence them. These are aggregated using label propagation algorithms (qualitative) or weighted averages (quantitative).
- **Conflict Detection:** Conflicts are identified through logical inconsistencies (e.g., a goal and its negation both being required) or opposing contribution links to the same soft-goal.
- **Resolution and Trade-offs:** Conflicts are resolved through stakeholder negotiation, priority weighting, or formal obstacle mitigation (e.g., introducing avoidance goals). Quantitative approaches allow for automated selection among alternatives based on utility and feasibility.

### Application to UI/UX
In HCI, GORE represents user experience qualities like "delight" as soft-goals. Design options are treated as tasks, and contribution links are used to evaluate which interface configurations best satisfy the user's experience goals. This allows for goal-based user variability modeling to customize interfaces for specific user needs.


## Research Basis

### output
**Confidence:** high

The response synthesizes information from established Goal-Oriented Requirements Engineering (GORE) frameworks including KAOS, i*, and Tropos. It identifies the core structural primitives (goals, soft-goals, agents, etc.) and explains the formal mechanisms for refinement (AND/OR), contribution, and conflict resolution. The analysis also covers how non-functional requirements (soft-goals) are handled through qualitative and quantitative propagation and how these models apply to user experience design.

- [KAOS Tutorial](https://www.cse.msu.edu/~cse870/Materials/GoalModeling/KaosTutorial-2007.pdf)
- [Goal-Driven Requirements Engineering: the KAOS Approach](https://webperso.info.ucl.ac.be/~avl/gore.php)
- [i* Wiki | iStarGuide](http://istar.rwth-aachen.de/tiki-index.php?page=iStarGuide)
- [Goal-Oriented Requirements Engineering: An Overview of ...](https://www.cs.utoronto.ca/~alexei/pub/Lapouchnian-Depth.pdf)
- [Reasoning About Alternative Requirements Options*](https://webperso.info.ucl.ac.be/~avl/files/MylopoulosTribute.pdf)
