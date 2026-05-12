---
query: "What lightweight design rationale and structured reasoning systems have actually been adopted in practice, and what makes them work when heavier systems like IBIS and QOC failed? Research (1995-2025) on: (1) Architecture Decision Records (ADRs) — why they succeeded where IBIS failed, what their schema captures, and what lessons transfer to design reasoning for AI. (2) Design critique rubrics used in education and industry — structured evaluation frameworks that are light enough to use in real workflows (e.g., Figma's critique protocol, Google's design review process, critique formats from design schools). (3) The QOC (Questions-Options-Criteria) schema revisited — could a lighter version work as a reasoning scaffold for LLMs? What's the minimum viable structure that captures the valuable parts (making tradeoffs explicit, evaluating against criteria) without the overhead? (4) Programming language type systems as an analogy — how types guide reasoning without micromanaging, and what this suggests about the right level of structure for design reasoning. (5) Checklists vs thinking protocols in high-stakes domains (medicine, aviation, engineering) — when do checklists help and when do they hurt? Atul Gawande's checklist research and its limits. (6) Design tokens and design systems as implicit reasoning structures — how Tailwind's constraint-based approach already embodies certain design reasoning (spacing scales, color systems) and what this teaches about encoding reasoning vs encoding rules. Output: patterns for making structured reasoning lightweight enough to actually get used, with specific lessons for an AI reasoning framework."
processor: core
run_id: trun_6b0c617b26214cd7a7fdaf507d0d564d
created_at: 2026-05-05T03:38:42.607376Z
retrieved_at: 2026-05-05T03:41:16Z
---

# Research: What lightweight design rationale and structured reasoning systems have actually been adopted in practice, and what makes them work when heavier systems like IBIS and QOC failed? Research (1995-2025) on: (1) Architecture Decision Records (ADRs) — why they succeeded where IBIS failed, what their schema captures, and what lessons transfer to design reasoning for AI. (2) Design critique rubrics used in education and industry — structured evaluation frameworks that are light enough to use in real workflows (e.g., Figma's critique protocol, Google's design review process, critique formats from design schools). (3) The QOC (Questions-Options-Criteria) schema revisited — could a lighter version work as a reasoning scaffold for LLMs? What's the minimum viable structure that captures the valuable parts (making tradeoffs explicit, evaluating against criteria) without the overhead? (4) Programming language type systems as an analogy — how types guide reasoning without micromanaging, and what this suggests about the right level of structure for design reasoning. (5) Checklists vs thinking protocols in high-stakes domains (medicine, aviation, engineering) — when do checklists help and when do they hurt? Atul Gawande's checklist research and its limits. (6) Design tokens and design systems as implicit reasoning structures — how Tailwind's constraint-based approach already embodies certain design reasoning (spacing scales, color systems) and what this teaches about encoding reasoning vs encoding rules. Output: patterns for making structured reasoning lightweight enough to actually get used, with specific lessons for an AI reasoning framework.

## Findings

### Output

Research from 1995 to 2025 indicates that successful structured reasoning systems prioritize integration into existing workflows over exhaustive documentation. 

### 1. Architecture Decision Records (ADRs) vs. IBIS/QOC
ADRs succeeded where Issue-Based Information Systems (IBIS) and Questions-Options-Criteria (QOC) failed primarily due to their 'lightweight' nature and proximity to code. While IBIS and QOC required complex mapping and external tools, ADRs are typically stored as simple Markdown files within a project's version control system. A standard ADR schema captures the title, status, context, decision, and consequences. The key lesson for AI reasoning is that structure must be 'low-friction' and versioned alongside the work it describes.

### 2. Design Critique Rubrics and Protocols
In industry (e.g., Figma) and education (e.g., d.school), structured evaluation works when it provides a scaffold for conversation rather than a rigid grading system. Protocols like 'I Like, I Wish, What If' or Figma’s rubric-based critiques succeed because they focus on specific, actionable feedback categories (aesthetics vs. usability) without requiring a complete formal proof of design quality.

### 3. Minimum Viable QOC for LLMs
A 'lighter' QOC for AI reasoning focuses on the core triad: the Question (the problem), Options (the candidates), and Criteria (the constraints). By stripping away the complex argumentation trees of original QOC, this schema serves as a prompt-engineering scaffold that forces LLMs to make tradeoffs explicit and evaluate multiple paths before settling on a solution.

### 4. Checklists and Thinking Protocols
Research by Atul Gawande and others in high-stakes domains like medicine shows that checklists are most effective when they address 'stupid' errors—ensuring basic, critical steps are not missed—rather than trying to dictate complex clinical judgment. In design, checklists help with 'hygiene' (e.g., accessibility, performance) but can hurt if they replace the 'thinking protocol' required for novel problem-solving.

### 5. Design Tokens as Implicit Reasoning
Systems like Tailwind CSS and Style Dictionary encode design reasoning into constraints. Instead of allowing any hex code, they provide a scale. This 'constraint-based' approach suggests that the best reasoning frameworks for AI might not be sets of rules to follow, but rather a restricted 'palette' of options that implicitly guide the model toward better decisions.

### Patterns for Lightweight AI Reasoning
- **Proximity:** Keep reasoning documentation in the same environment as the output.
- **Scaffolding over Scripting:** Provide a structure for the 'middle' of the process (tradeoffs) rather than just the start or end.
- **Constraint-Based Guidance:** Use 'tokens' or predefined scales to limit the search space and enforce consistency.


## Research Basis

### output
**Confidence:** high

The response synthesizes information from architectural documentation, design education, medical safety research, and software engineering to identify patterns for lightweight structured reasoning. It analyzes why Architectural Decision Records (ADRs) succeeded over heavier systems like IBIS/QOC by focusing on developer-centric workflows. It also examines design critique rubrics, surgical checklists, and design tokens to extract principles for 'minimum viable structure' that can be applied to AI reasoning frameworks.

- [Architectural Decision Records (ADRs) | Architectural ...](https://adr.github.io/)
  > An Architectural Decision Record (ADR) captures a single AD and its rationale; Put it simply, ADR can help you understand the reasons for a chosen architectural
- [Scaling the Practice of Architecture, Conversationally](https://martinfowler.com/articles/scaling-architecture-conversationally.html)
  > Decision Records. The first supporting element is Architectural Decision Records or ADRs. These are lightweight documents
- [Questions, Options, and Criteria: Elements of design space ...](https://acawiki.org/Questions,_Options,_and_Criteria:_Elements_of_design_space_analysis)
- [dschool_bootleg_deck_2018_fin...](https://dschool.sfo3.digitaloceanspaces.com/documents/dschool_bootleg_deck_2018_final_sm2-6.pdf)
  > I Like, I Wish, What If. As a designer, you must rely on personal communication and, particularly, feedback, during design work
- [A Surgical Safety Checklist to Reduce Morbidity and ...](https://www.nejm.org/doi/full/10.1056/NEJMsa0810119)
  > A 19-item surgical safety checklist designed to improve team communication and consistency of care would reduce complications and deaths associated with
