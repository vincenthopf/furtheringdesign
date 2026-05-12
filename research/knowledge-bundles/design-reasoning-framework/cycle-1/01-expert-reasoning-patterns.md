---
query: "What are the specific reasoning patterns expert designers use that go beyond applying rules? Survey cognitive science, design studies, and protocol analysis research (1985-2025) on: (1) Abductive reasoning in design — how designers infer 'what would have to be true for this to work' rather than deducing from rules. (2) Reflection-in-action — Schon's concept of real-time problem reframing during design, how experts 'have a conversation with the situation.' (3) Co-evolution — how the problem and solution evolve together, how experts reframe the brief while generating solutions. (4) Problem framing — how experts 'name and frame' a situation before solving it, vs novices who jump to solutions. (5) Analogical transfer — how experts retrieve deep functional analogies rather than surface-similar examples. (6) Satisficing — how designers balance competing priorities without optimizing any single dimension. (7) Critique-as-hypothesis-test — how experts use iteration not as trial-and-error but as hypothesis testing. For each pattern, describe: what the cognitive operation actually is, how it differs from rule-following, whether it has been successfully taught to novices through explicit instruction, and what a 'prompt' or 'thinking scaffold' version of it would look like for an LLM. Output as a structured taxonomy of reasoning patterns."
processor: core
run_id: trun_6b0c617b26214cd7bc11ed0ccb20851c
created_at: 2026-05-05T03:37:59.653148Z
retrieved_at: 2026-05-05T03:41:48Z
---

# Research: What are the specific reasoning patterns expert designers use that go beyond applying rules? Survey cognitive science, design studies, and protocol analysis research (1985-2025) on: (1) Abductive reasoning in design — how designers infer 'what would have to be true for this to work' rather than deducing from rules. (2) Reflection-in-action — Schon's concept of real-time problem reframing during design, how experts 'have a conversation with the situation.' (3) Co-evolution — how the problem and solution evolve together, how experts reframe the brief while generating solutions. (4) Problem framing — how experts 'name and frame' a situation before solving it, vs novices who jump to solutions. (5) Analogical transfer — how experts retrieve deep functional analogies rather than surface-similar examples. (6) Satisficing — how designers balance competing priorities without optimizing any single dimension. (7) Critique-as-hypothesis-test — how experts use iteration not as trial-and-error but as hypothesis testing. For each pattern, describe: what the cognitive operation actually is, how it differs from rule-following, whether it has been successfully taught to novices through explicit instruction, and what a 'prompt' or 'thinking scaffold' version of it would look like for an LLM. Output as a structured taxonomy of reasoning patterns.

## Findings

### Output

Expert design reasoning is characterized by non-linear, generative cognitive patterns that transcend simple rule-following. Below is a structured taxonomy of these patterns based on research from 1985 to 2025.

### 1. Abductive Reasoning
*   **Cognitive Operation:** The inference to the best explanation or 'innovative abduction.' It involves proposing a new 'what' (form) and 'how' (working principle) to achieve a desired 'result' (value/function).
*   **Difference from Rule-Following:** Unlike deduction (applying a rule to a case to find a result) or induction (observing cases to find a rule), abduction creates the rule and the case simultaneously to explain a desired outcome.
*   **Teachability:** Research suggests it can be taught by framing design as a 'double-abductive' process, though it requires significant domain knowledge to generate plausible hypotheses.
*   **LLM Scaffold:** "Given the desired outcome [X], what novel configuration of [Form] and [Working Principle] could plausibly create this result? Propose three 'what-if' hypotheses."

### 2. Reflection-in-Action
*   **Cognitive Operation:** A 'conversation with the situation' where the designer makes a move, observes the 'back-talk' (unexpected consequences), and reframes the problem in real-time.
*   **Difference from Rule-Following:** It is an improvisational response to unique, 'swampy' problems that lack pre-defined rules or categories.
*   **Teachability:** Difficult to teach as a rote skill; it is typically fostered through 'reflective practicums' and studio-based coaching where novices are forced to articulate their 'moves.'
*   **LLM Scaffold:** "Review the current design state. Identify one unexpected conflict or 'back-talk' from the constraints. How does this change your understanding of the original goal?"

### 3. Co-evolution of Problem and Solution
*   **Cognitive Operation:** The simultaneous development of the problem space and the solution space. Designers use solution ideas to better understand the problem constraints.
*   **Difference from Rule-Following:** Rule-following assumes a fixed problem definition. Co-evolution treats the 'brief' as a fluid entity that is redefined as solutions emerge.
*   **Teachability:** Protocol studies show experts do this naturally; novices can be prompted to 're-read the brief' after every major prototyping phase.
*   **LLM Scaffold:** "Based on the solution you just proposed, what new constraints or opportunities have you discovered that were not in the original problem description? Update the problem statement."

### 4. Problem Framing
*   **Cognitive Operation:** The act of 'naming and framing'—selecting the specific elements of a situation to attend to and setting the boundaries of the inquiry.
*   **Difference from Rule-Following:** Rules are applied *within* a frame. Framing is the act of *creating* the frame that determines which rules are even relevant.
*   **Teachability:** Novices tend to accept frames as given. They can be taught to 'frame-shift' by being required to generate three different 'points of view' on the same brief.
*   **LLM Scaffold:** "Before solving this, propose three different ways to 'frame' this problem (e.g., as a technical challenge, a social experience, or a resource optimization problem)."

### 5. Analogical Transfer
*   **Cognitive Operation:** Mapping deep structural or functional relationships from a source domain to a target domain (e.g., using the structure of a heart valve to design a plumbing joint).
*   **Difference from Rule-Following:** It relies on relational similarity rather than surface-level attributes or pre-existing domain rules.
*   **Teachability:** Highly teachable through 'structure mapping' exercises and prompting students to look for 'near' vs. 'far' analogies.
*   **LLM Scaffold:** "Identify a system in a completely different domain (e.g., biology, music, or transit) that shares the same functional goal as this design. Map its structure to this problem."

### 6. Satisficing
*   **Cognitive Operation:** Searching through a solution space until a candidate meets a pre-defined 'aspiration level' across multiple competing dimensions, rather than seeking a single optimum.
*   **Difference from Rule-Following:** Optimization (rule-following) is often computationally impossible in design. Satisficing uses heuristics to find 'good enough' trade-offs.
*   **Teachability:** Can be taught by setting 'thresholds' for success across multiple criteria and asking students to stop once all thresholds are met.
*   **LLM Scaffold:** "List the five competing priorities for this design. Define a 'minimum viable' threshold for each. Propose a solution that meets all thresholds without over-optimizing any single one."

### 7. Critique-as-Hypothesis-Test
*   **Cognitive Operation:** Treating every design iteration as an experiment designed to test a specific hypothesis about how the design will perform or be perceived.
*   **Difference from Rule-Following:** It is not 'trial and error.' It is a structured inquiry where the 'rule' being tested is the designer's own assumption.
*   **Teachability:** Taught through the 'crit' (critique) process, where designers must state what they are trying to learn from a specific prototype.
*   **LLM Scaffold:** "Treat this design proposal as a hypothesis. What specific assumption about user behavior or technical performance does this design test? How would a failure of this test change the design?"


## Research Basis

### output
**Confidence:** high

The response was synthesized by analyzing literature from design studies, cognitive science, and protocol analysis (1985–2025). Key concepts were extracted from authoritative sources such as Donald Schön's work on reflective practice, Herbert Simon's theories on bounded rationality, and various research papers on design cognition and abduction. Each reasoning pattern was broken down into its cognitive operation, its distinction from rule-following, evidence regarding its teachability, and a corresponding LLM scaffold based on the theoretical frameworks identified in the search results.

- [Donald Schön - Wikipedia](https://en.wikipedia.org/wiki/Donald_Sch%C3%B6n)
  > Schön then addressed this problem when he developed his "reflection-in-action" notion explained in the book. This involved the examination of the thinking, talking, and interacting processes through a series of case studies involving different professionals
- [On Abduction in Design | Request PDF](https://www.researchgate.net/publication/288255845_On_Abduction_in_Design)
- [A Classification of Methods and Constructs in Design ...](https://www.researchgate.net/publication/366868956_A_Classification_of_Methods_and_Constructs_in_Design_Cognition_Research)
