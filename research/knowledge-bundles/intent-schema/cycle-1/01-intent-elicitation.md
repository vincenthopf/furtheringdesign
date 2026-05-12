---
query: "How do expert designers elicit and structure design intent from client briefs, stakeholder interviews, brand guidelines, and user research? Research: (1) The structure of creative briefs and design briefs in professional practice — what fields do agencies like IDEO, Pentagram, and product design teams at Google/Apple use? (2) Jobs-to-be-Done (JTBD) framework applied to UI/UX design — how do teams articulate user goals, desired outcomes, and switching motivations? (3) How do senior designers translate ambiguous client requests into structured requirements they can design against? (4) What questions do design leads ask during kickoff meetings and discovery phases? (5) Existing templates for design intent documentation (design brief templates, product requirement documents, UX strategy documents). Output: a structured account of how intent gets captured in professional practice, with specific field names and structures used."
processor: core
run_id: trun_6b0c617b26214cd7b11f0f1f850e0f01
created_at: 2026-05-05T03:15:02.456717Z
retrieved_at: 2026-05-05T03:16:59Z
---

# Research: How do expert designers elicit and structure design intent from client briefs, stakeholder interviews, brand guidelines, and user research? Research: (1) The structure of creative briefs and design briefs in professional practice — what fields do agencies like IDEO, Pentagram, and product design teams at Google/Apple use? (2) Jobs-to-be-Done (JTBD) framework applied to UI/UX design — how do teams articulate user goals, desired outcomes, and switching motivations? (3) How do senior designers translate ambiguous client requests into structured requirements they can design against? (4) What questions do design leads ask during kickoff meetings and discovery phases? (5) Existing templates for design intent documentation (design brief templates, product requirement documents, UX strategy documents). Output: a structured account of how intent gets captured in professional practice, with specific field names and structures used.

## Findings

### Output

Expert designers capture design intent by translating inputs such as client briefs, stakeholder interviews, and research into a small set of canonical artifacts. These artifacts contain consistent fields to ensure traceability, measure success, and limit ambiguity.

### 1. Design / Creative Brief (Agency-Style)
Used widely by creative agencies to align on high-level goals, this artifact typically includes:
- **Project Title / One-line Brief**: A concise summary of the project.
- **Background / Context**: Why the project is happening now and the business problem it addresses.
- **Objectives / Project Goals**: Primary business and user goals.
- **Success Metrics / KPIs**: Quantitative targets like conversion lift or task completion.
- **Target Audiences**: Primary user segments defined by demographics, behaviors, and jobs.
- **Key User Insights / Problem Statements**: Synthesized findings from research.
- **Single-minded Proposition**: A design intent statement of what the design should communicate.
- **Deliverables / Scope**: Specific screens, flows, or brand assets to be produced.
- **Constraints & Dependencies**: Technical, legal, accessibility, or brand mandatories.
- **Stakeholders & Decision Owners**: Governance and approval structure.

### 2. Discovery Outputs (Research & JTBD)
Teams use the Jobs-to-be-Done (JTBD) framework to articulate user goals and switching motivations:
- **JTBD Statements**: Standardized syntax: "When [situation], I want to [job], so I can [desired outcome]."
- **Outcome Statements**: Measurable statements (e.g., "reduce time-to-booking to < 2 minutes").
- **Forces of Progress**: Triggers, anxieties, habits, and push/pull factors that influence user behavior.
- **Journey Maps**: Task flows highlighting opportunity areas and metrics at each stage.
- **Evidence & User Quotes**: Verbatim support linked to specific claims.

### 3. Product Requirements Document (PRD) / UX Requirements
Modern product organizations (e.g., Google, Figma, Intercom) use PRDs to bridge design and engineering:
- **Executive Summary & Problem Statement**: High-level overview of the 'why'.
- **Goals & Success Metrics**: Specific KPIs that will change.
- **User Stories / Scenarios**: JTBD-linked use cases.
- **Functional Requirements**: Detailed behaviors and acceptance criteria.
- **UX & Interaction Notes**: Design intent section explaining why specific UX choices were made.
- **Analytics & Measurement Plan**: Events, funnels, and dashboards for tracking.
- **Decision Log**: A record of open issues and resolved decisions.

### 4. Design Intent Document / Design Rationale
A living record used to keep teams aligned on the 'why' behind visible choices:
- **Design Principles & Heuristics**: Guiding rules like simplicity or discoverability.
- **Decisions & Trade-offs**: What was chosen, what was rejected, and why.
- **Assumptions & Risks**: Explicitly prioritized items to be validated.
- **Interaction Details & Edge Cases**: Error states, empty states, and microcopy decisions.

### 5. Senior Designer Translation Workflow
To move from ambiguous requests to structured requirements, senior designers:
- **Reframe the Brief**: Convert vague asks into measurable goals.
- **Stakeholder Alignment**: Extract assumptions and success criteria via workshops.
- **Assumptions Mapping**: Create a backlog of what is unknown and needs validation.
- **Lock Scope via MVP**: Define what must be in the first release versus non-goals.
- **Kickoff Questions**: Ask critical questions regarding business outcomes ("Why now?"), user evidence ("What do we already know?"), and validation ("How will we measure success?").


## Research Basis

### output
**Confidence:** high

The response synthesizes common patterns across agency creative briefs, product PRDs, JTBD best practices, and discovery guidance from industry leaders. It identifies that expert designers translate ambiguous inputs into a set of canonical artifacts: the design brief, discovery outputs, product requirements documents (PRD), and living design-intent records. The field names and structures provided are those that consistently appear in public templates and professional practice write-ups from organizations like IDEO, Intercom, and NN/g.

- [Design Brief Example](http://wavespace.agency/blog/design-brief-example)
  > Types of Design Briefs: Find out how design briefs are applied in different industries by UI/UX design agencies, UX design firms, and branding.
- [Design Thinking Framework, Innovation & Methodology](https://www.ideou.com/pages/design-thinking)
- [Stakeholder Interviews 101 - NN/G](https://www.nngroup.com/articles/stakeholder-interviews/)
  > A stakeholder interview is a conversation with a person who has a vested interested in a project with a goal of gathering insights to drive the project's 
- [Jobs to Be Done (JTBD) in UX Research](https://www.userinterviews.com/ux-research-field-guide-chapter/jobs-to-be-done-jtbd-framework)
- [10 Great Jobs to Be Done Examples](https://www.uxtweak.com/jobs-to-be-done/examples/)
  > Discover 10 Jobs To Be Done examples from leading companies, and tips on how to apply them to set your current or next product development up for success! 
- [The ultimate collection of PRD templates - Edo van Royen](https://www.edovanroyen.com/p/the-ultimate-collection-of-prd-templates)
  > This is the ultimate collection of PRD templates from great companies like Miro, Figma, Asana, Intercom & many more.
- [[PRD Template] How Intercom Writes Product ...](https://www.cycle.app/blog/how-intercom-writes-product-requirements-documents-prd)
  > Ever wondered how a top-notch product org like Intercom writes a PRD? Here's their template.
- [Questions we ask during a project design kickoff](https://blog.prototypr.io/questions-we-ask-during-a-project-design-kickoff-a54d72dadc79)
  > Q: Why are we doing this? · Q: What does success look like? · Q: How will success be measured? · Q: When do you need it completed by and why?
- [17 Questions for Project Kick-Off Meetings + Checklist](https://rebelsguidetopm.com/16-essential-questions-for-project-initiation/)
  > Why is this project important? · What's the problem you are trying to solve? · What are you expecting the project 
