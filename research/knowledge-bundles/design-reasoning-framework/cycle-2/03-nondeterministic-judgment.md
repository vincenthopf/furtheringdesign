---
query: "How do AI systems handle subjective judgment, expert disagreement, and nondeterministic evaluation in design and creative domains? Research (2020-2025) on: (1) Confidence calibration for subjective tasks — how should an AI system express certainty vs uncertainty about a design decision when the answer is genuinely subjective? Research on calibrated confidence in creative evaluation, subjective quality assessment, and aesthetic judgment. (2) Inter-rater reliability in design critique — how much do expert designers actually agree with each other? What are the dimensions where agreement is high (accessibility violations, broken layouts) vs low (typography choices, color palettes, emotional register)? UICrit inter-annotator data, design evaluation studies. (3) How to present design alternatives with reasoning — when an AI identifies multiple valid approaches, how should it present them? Research on decision-support systems that present options with tradeoff analysis rather than single recommendations. (4) The difference between 'this is wrong' and 'I would do it differently' — how to distinguish objective design failures (broken hierarchy, inaccessible contrast) from subjective design preferences (font choice, color warmth). Can this distinction be formalized? (5) Ensemble disagreement as a signal — using multiple model samples or evaluation passes to detect when a design decision falls in the 'reasonable experts disagree' zone. Epistemic uncertainty estimation in LLM evaluation. (6) How to avoid false certainty — the tendency of LLMs to present opinions as facts. Techniques for maintaining appropriate uncertainty in subjective domains without appearing indecisive. Output: strategies for AI systems to reason through subjective design decisions with appropriate uncertainty and multi-path reasoning."
processor: pro
run_id: trun_6b0c617b26214cd7b3a3473fe401be5c
created_at: 2026-05-05T03:45:39.644488Z
retrieved_at: 2026-05-05T03:54:21Z
---

# Research: How do AI systems handle subjective judgment, expert disagreement, and nondeterministic evaluation in design and creative domains? Research (2020-2025) on: (1) Confidence calibration for subjective tasks — how should an AI system express certainty vs uncertainty about a design decision when the answer is genuinely subjective? Research on calibrated confidence in creative evaluation, subjective quality assessment, and aesthetic judgment. (2) Inter-rater reliability in design critique — how much do expert designers actually agree with each other? What are the dimensions where agreement is high (accessibility violations, broken layouts) vs low (typography choices, color palettes, emotional register)? UICrit inter-annotator data, design evaluation studies. (3) How to present design alternatives with reasoning — when an AI identifies multiple valid approaches, how should it present them? Research on decision-support systems that present options with tradeoff analysis rather than single recommendations. (4) The difference between 'this is wrong' and 'I would do it differently' — how to distinguish objective design failures (broken hierarchy, inaccessible contrast) from subjective design preferences (font choice, color warmth). Can this distinction be formalized? (5) Ensemble disagreement as a signal — using multiple model samples or evaluation passes to detect when a design decision falls in the 'reasonable experts disagree' zone. Epistemic uncertainty estimation in LLM evaluation. (6) How to avoid false certainty — the tendency of LLMs to present opinions as facts. Techniques for maintaining appropriate uncertainty in subjective domains without appearing indecisive. Output: strategies for AI systems to reason through subjective design decisions with appropriate uncertainty and multi-path reasoning.

## Findings

### Executive Summary

AI systems can handle subjectivity in creative domains by treating evaluation as inherently probabilistic and socially constructed. Instead of providing a single authoritative answer, the primary strategies involve: 1) Separating measurable, objective failures (e.g., accessibility violations) from subjective style choices. 2) Communicating calibrated uncertainty by predicting score distributions instead of single points, using both verbal and numeric confidence indicators, and grounding these in empirical data on human expert disagreement (like the fair-to-moderate agreement found in the UICrit dataset). 3) Presenting a small, diverse set of valid design alternatives, framed along a Pareto frontier that highlights trade-offs between different objectives (e.g., readability vs. brand expression). 4) Using ensemble methods and semantic uncertainty to detect when 'reasonable experts may disagree' and switching from a prescriptive to an exploratory mode. This approach positions the AI as a collaborative decision-support tool that provides well-argued options and transparent reasoning, rather than a false authority.

### Key Strategies For Subjective Reasoning

| Strategy Name | Description | Application |
| --- | --- | --- |
| Confidence Calibration for Subjective/Aesthetic Judgment | Instead of predicting a single score, the AI should model and output a full distribution of potential scores to represent the range of human opinion. This is paired with both numeric (e.g., variance, entropy) and calibrated verbal uncertainty phrases. Uncertainty is estimated not just at the token level but at the semantic level by measuring the diversity of multiple generated options. The model's confidence is calibrated against historical human-to-human agreement data (e.g., from UICrit), and a 'confidence gate' is used to switch the system from making definitive judgments to offering exploratory options when uncertainty is high. | Confidence calibration and uncertainty expression |
| Leveraging Inter-Rater Reliability Data to Frame Disagreement | The AI should be informed by empirical data on how much human experts agree. For example, the UICrit dataset shows only 'fair' agreement (κ≈0.3) on critique validity but 'moderate' agreement (κ≈0.55) on rankings. The system should recognize that agreement is higher for objective, rule-based issues (e.g., WCAG contrast, tap target size) and lower for subjective choices (e.g., typography, color warmth, brand tone). AI feedback should be explicitly tagged as 'objective failure' vs. 'subjective suggestion' and expose the expected level of human agreement for that category. | Understanding and contextualizing expert disagreement |
| Presenting Multiple Design Alternatives with Trade-Offs | Rather than picking a single 'best' design, the AI should generate a set of diverse, high-quality alternatives positioned on a Pareto frontier. Each option should be presented with clear reasoning, including the design principles it optimizes, its impact on key metrics, and its known downsides or trade-offs. This allows users to re-weigh objectives based on their specific context (e.g., enterprise vs. lifestyle app) and make an informed decision. | Decision support and multi-path reasoning |
| Formalizing the Distinction Between Errors and Preferences | A formal distinction is made between objective errors and subjective preferences. A 'two-channel' schema is used: 1) Objective violations are identified through binary tests against measurable standards (e.g., contrast ratio < 4.5:1) and labeled as 'errors' with verifiable evidence. 2) Subjective recommendations are framed as 'hypotheses' or alternative approaches, supported by rationales and examples rather than claims of correctness. A decision tree can route critiques based on whether they reference a measurable standard or if multiple valid alternatives exist. | Structuring and classifying design feedback |
| Using Ensemble Disagreement as an Epistemic Uncertainty Signal | The AI runs multiple independent generation or evaluation passes (an ensemble) to gauge consensus. Low consensus among samples (e.g., from self-consistency checks or semantic clustering) or high semantic dispersion (entropy) across generated rationales is used as a signal for epistemic uncertainty. This signals that the topic is ambiguous or subject to taste, triggering the system to present multiple options or state that 'experts may disagree' rather than asserting a single view. | Epistemic uncertainty estimation |
| Avoiding False Certainty Through Calibrated Language and Interaction | To avoid sounding overly authoritative, the AI uses calibrated language templates that map specific probability ranges to consistent phrases (e.g., 'Likely' for 60-80% confidence). The system's 'assertiveness mode' changes based on the uncertainty level—prescriptive for high-confidence objective errors, and exploratory for low-confidence subjective suggestions. It always provides rationales, evidence, and examples, and can expose known cognitive biases (like position bias) to the user. For high-stakes or high-uncertainty decisions, it defaults to a human-in-the-loop checkpoint. | Calibrated communication and trustworthy interaction |

### Inter Rater Reliability In Design

**Overall Finding:** Research indicates there is nontrivial disagreement even among trained expert designers when evaluating user interfaces. The level of agreement varies significantly depending on the type of design issue being assessed. Studies quantify this agreement as 'fair' for rating the validity of specific critiques and 'moderate' for ranking sets of designs. For more subjective qualities like the 'helpfulness' or 'accuracy' of suggestions, agreement can be as low as 'slight', highlighting the deeply subjective nature of many design decisions.

**High Agreement Dimensions:** Experts tend to have higher agreement on objective, constraint-bound issues that can be measured against established rules or heuristics. These areas include accessibility violations like color contrast ratios (e.g., WCAG failures), insufficient tap target sizes for buttons, clear layout breakages and misalignments, and issues with text legibility due to size or poor contrast. These are often seen as reliable areas for automated evaluation because they map to verifiable rules.

**Low Agreement Dimensions:** Expert agreement is typically lower for subjective and stylistic aspects of design where multiple valid solutions can exist. These dimensions include nuanced typography choices (such as font selection or weight beyond basic legibility), the appropriateness of a color palette's warmth or its alignment with brand tone, subtle differences in visual hierarchy where several arrangements are functional, and the emotional or brand register conveyed by the design. The perceived 'helpfulness' and 'accuracy' of design suggestions also fall into this category.

**Quantitative Finding:** Specific inter-rater reliability scores from cited studies quantify the level of expert agreement. The UICrit dataset reports a Fleiss' Kappa (κ) of approximately 0.29–0.31 for critique validity ratings, which is considered 'fair agreement'. For preference ranking tasks, the agreement is higher, with a Kappa score of ≈0.55, indicating 'moderate agreement'. In contrast, a 2024 CHI study on heuristic evaluation found much lower agreement on subjective qualities, with a Fleiss' Kappa of κ≈0.112 for the 'accuracy' of feedback and κ≈0.100 for its 'helpfulness', both indicating only 'slight agreement'.


### Distinguishing Objective Failures Vs Subjective Preferences

**Formalization Approach:** The distinction can be formalized using a 'two-channel critique schema' that separates objective violations from subjective recommendations. This involves creating a decision tree for the AI: if a critique references a standard with a measurable threshold (like WCAG), it is routed as an 'objective' issue. Otherwise, if the system can generate multiple high-scoring alternative solutions (detected via ensemble variance or a Pareto frontier), the issue is routed as a 'subjective preference'. This approach also mandates different evidence requirements for each channel to reinforce the distinction.

**Objective Failure Criteria:** Objective failures are identified through binary or threshold-based tests against established standards and measurable heuristics. These are treated as verifiable 'errors'. Examples include: a color contrast ratio falling below the 4.5:1 standard for normal text, a primary call-to-action (CTA) button being smaller than 44x44 dp, elements being misaligned by more than a specific pixel threshold, or a broken reading order for screen readers. Claims of objective failure should be supported by quantitative evidence and links to automatic verification checks.

**Subjective Preference Indicators:** Subjective preferences are identified as judgments related to style, brand, or aesthetics where multiple valid solutions exist. These are framed as 'hypotheses' or 'recommendations' rather than errors. Indicators include suggestions like, 'increase the color palette's warmth to better align with a wellness brand's tone' or choosing a different font for stylistic reasons. Such recommendations require exemplar-based reasoning, such as showing comparable designs from pattern libraries, and presenting counterfactuals to illustrate the impact of the suggested change.


### Confidence Calibration For Subjective Tasks

AI systems can express calibrated confidence and uncertainty in subjective design decisions through several research-backed methods. Instead of providing a single scalar score for inherently subjective qualities like aesthetics, the system should model and output a full score distribution. This approach, common in image aesthetic assessment research using datasets like AVA and Earth Mover's Distance (EMD) loss, communicates both the central tendency and the dispersion of human opinions, directly conveying uncertainty. Confidence should be expressed jointly through both numeric and verbal means. This involves pairing a calibrated numeric value (e.g., probability of validity, predicted rating variance, or entropy) with verbal phrases that are specifically tuned for calibration. To avoid vague language, these phrases can be mapped to distinct probability bins and smoothed using token-logit evidence to ensure consistency between the text and the numbers. A key technique is to estimate uncertainty at a semantic level by measuring the diversity or dispersion across multiple generated outputs (semantic entropy or density), rather than relying solely on token-level probabilities; high semantic dispersion signals ambiguous or taste-driven judgments. Furthermore, confidence can be calibrated against historical human-label variability. By fitting calibration curves against human-to-human agreement data from past evaluations (e.g., the 'fair' Kappa scores from the UICrit dataset), the model's confidence can be adjusted so that a 70% likelihood for a 'valid critique' corresponds to an actual 70% acceptance rate by human validators. Finally, a 'confidence gating' mechanism can be implemented. When the system's uncertainty exceeds a predefined threshold (e.g., high entropy or a wide rating distribution), it should switch from a prescriptive mode to an exploratory one, where it offers options or asks clarifying questions instead of issuing a definitive judgment.

### Uncertainty Quantification Techniques

| Technique Name | Description | Primary Use Case | Methodology Type |
| --- | --- | --- | --- |
| Semantic Entropy / Semantic Density | This technique estimates uncertainty by measuring the diversity or semantic dispersion across multiple generated responses or rationales. A higher dispersion in the meaning of the outputs indicates greater epistemic uncertainty or ambiguity related to taste. | Detecting ambiguous or taste-driven judgments, identifying epistemic uncertainty, and triggering alternative system behaviors like presenting options instead of a single answer. It is also used to detect a subset of hallucinations. | Entropy-based / Sampling-based |
| Self-Consistency / Self-Check Methods | This sampling-based approach involves generating multiple critiques or responses (e.g., using Chain-of-Thought) and then evaluating the level of consensus or consistency among them. A low consensus, identified through methods like majority vote or semantic clustering, signals high uncertainty or disagreement. | Detecting hallucinations by checking for internal contradictions, identifying topics where experts are likely to disagree, and triggering system actions like displaying 'experts may disagree' messages or escalating to an exploratory mode. | Sampling-based |
| Predicting Score Distributions | Instead of outputting a single scalar score for a subjective quality like aesthetics, the model is trained to predict a full distribution of potential scores. The spread, variance, or entropy of this predicted distribution serves as a direct measure of uncertainty. | Quantifying uncertainty in subjective and aesthetic judgments, allowing the system to communicate not just a central tendency but also the level of disagreement or ambiguity inherent in the rating. | Distributional Prediction |
| Calibration on Human-Label Variability | This method involves adjusting the model's confidence outputs by fitting calibration curves against historical data on human inter-rater reliability (IRR). For example, the model's confidence is adjusted so that a 70% likelihood for a 'valid critique' corresponds to a 70% acceptance rate by human validators on similar tasks. | To align the model's expressed confidence with the actual, observed levels of human agreement and disagreement for specific types of tasks or critique categories. | Statistical Calibration |

### Ensemble Disagreement As A Subjectivity Signal

Using multiple model samples or evaluation passes is a powerful method for an AI to detect when a design decision falls into a subjective zone where 'reasonable experts disagree.' This disagreement among model outputs serves as a proxy for epistemic uncertainty. Several techniques can be employed: 
1. **Self-Consistency Ensembles**: This involves sampling multiple Chain-of-Thought (CoT) critiques or rationales from the model and then estimating the consensus among them. Consensus can be measured through methods like a majority vote or semantic clustering of the generated responses. A low level of consensus is a strong signal of subjectivity and should trigger the system to display messages like 'experts may disagree' and surface multiple valid options rather than a single answer.
2. **Semantic Entropy/Density**: Instead of just counting votes, this method computes the semantic dispersion across the sampled rationales. A higher dispersion or entropy indicates greater epistemic uncertainty or ambiguity driven by taste. This metric can be used as a trigger for the system to avoid making a single, definitive recommendation and instead present a range of possibilities.
3. **Self-Check Methods**: Techniques like SelfCheckGPT involve comparing independent samples from the model to check for internal contradictions. When conflicts are detected between different generated responses, the system can escalate its behavior to an exploratory mode, where it might ask the user clarifying questions to resolve the ambiguity, or it can simply present the conflicting viewpoints as evidence of subjectivity.
4. **Confidence-Weighted Judging**: In scenarios where a Large Language Model acts as a judge (LLM-as-a-Judge), scores from multiple evaluation passes can be aggregated using uncertainty weights. This approach allows the system to expose confidence intervals for its judgments. When absolute scoring proves to be unstable (indicated by wide intervals or high variance), the system can fall back to the more reliable method of pairwise preference comparisons.

### Strategies To Avoid False Certainty

To mitigate the tendency of LLMs to present subjective opinions as objective facts, several strategies can be implemented to maintain appropriate uncertainty. A foundational strategy is to formalize the distinction between objective failures and subjective preferences. This can be done using a two-channel critique schema: one for 'Objective violations' that are binary or thresholded against measurable standards (e.g., WCAG contrast ratio < 4.5:1), and another for 'Subjective recommendations' which are presented as hypotheses with rationales tied to principles (e.g., 'increase warmth to align with brand tone'). This prevents style choices from being framed as errors. Building on this, AI systems can use 'calibrated language templates' that map specific probability bins to consistent verbal phrases (e.g., 'Very likely' for 80-90% confidence, 'Uncertain/contested' for 40-60%). These templates should also include disclaimers when the topic is one where human experts historically show low agreement. The system's tone can be adjusted by setting 'assertiveness modes' based on uncertainty levels: a prescriptive tone is appropriate for high-confidence, objective checks, while an exploratory, option-centric tone should be used when uncertainty is high or ensemble disagreement is strong. To prevent authoritative framing, the system must 'show why, not just what' by always attaching rationales, references to design guidelines, and measurable evidence for its claims. For subjective advice, providing exemplars and counter-examples is more effective than making a definitive statement. Furthermore, the system should actively work to 'expose known biases,' such as position bias in LLM-as-a-Judge tasks, by randomizing option order and using tie-aware pairwise comparisons. It should also report when minor changes to the prompt or option order lead to a flipped judgment. Finally, for high-stakes or highly uncertain decisions, implementing 'human-in-the-loop checkpoints' that require user confirmation is a crucial safety measure. All uncertainty diagnostics should be logged for audit and system improvement.

### Presenting Design Alternatives With Trade Offs

**Approach:** The overall strategy is to function as a decision-support system by presenting multiple valid options with clear trade-off analysis, rather than promoting a single 'best' recommendation, especially when the Pareto frontier is flat. This involves framing the design problem as a multi-objective challenge. The system should allow for audience or context-conditioned ranking, enabling users to re-weight objectives (e.g., prioritizing accessibility for an enterprise dashboard versus brand expressiveness for a lifestyle brand) and dynamically re-order the presented alternatives. This interactive approach preserves transparency and empowers the user to make the final decision based on their specific priorities.

**Generation Method:** Multiple valid options are generated using a multi-objective framing, specifically through techniques like multi-objective optimization. The goal is to produce a set of 3-5 diverse yet high-quality candidates that are positioned along a Pareto frontier. These alternatives are optimized over competing objectives such as readability, information density, brand expressiveness, accessibility compliance, and implementation cost. One specific method mentioned in the supporting evidence is multi-objective Bayesian design optimization, which is effective at surfacing unique trade-offs across different objectives.

**Presentation Format:** The alternatives are presented as a small, manageable set (3–5 options) to avoid overwhelming the user. The recommended format is 'Pareto-front cards' or a similar layout that visually represents the options along the Pareto frontier. This presentation should include succinct trade-off bullet points and visual overlays, such as hierarchy maps or contrast annotations, to clarify the proposed changes. The 'Alternatives view' is designed to show these cards with pros/cons, changes in key metrics (deltas), and the specific design guidelines each option adheres to.

**Tradeoff Analysis Description:** The trade-offs for each option are explained by explicitly displaying which objectives improve and which decline. For each alternative, the analysis must include: (a) the design principles or specific guideline references it optimizes (e.g., WCAG contrast 1.4.3, Nielsen Norman Group heuristics); (b) the expected impact on key metrics, with concrete measurements (e.g., new contrast ratio, tap target size in dp, text line length); and (c) any known downsides or compromises (e.g., reduced brand distinctiveness, increased implementation cost). This detailed breakdown of pros and cons allows the user to make an informed decision based on a clear understanding of the consequences of each choice.


### Visualization Of Multi Objective Trade Offs

The primary technique for visualizing design trade-offs is the use of a Pareto frontier. This method involves generating and displaying design alternatives positioned along this frontier, which represents the optimal trade-offs between multiple competing objectives. For example, objectives can include readability, information density, brand expressiveness, accessibility compliance, and implementation cost. The visualization helps users understand that improving one objective may require a compromise on another; for instance, a design with high information density might have lower readability. The alternatives are often presented as a set of 'Pareto-front cards,' each detailing the pros, cons, and metric changes for a specific point on the frontier. To enhance user understanding and decision-making, the system can be interactive, allowing users to use sliders to re-weight the importance of different objectives, which dynamically re-orders the options on the frontier, making the trade-off relationships transparent.

### Modeling Subjective Score Distributions

**Concept:** The core idea is to model and output a full distribution of scores for inherently subjective qualities like aesthetics, rather than predicting a single, definitive point score. This approach acknowledges that there is no single correct answer and instead represents the range of human opinions.

**Key Dataset Example:** The AVA (Aesthetic Visual Analysis) dataset is a key example where models are trained on distributions of human ratings, rather than a single average score, to learn aesthetic quality.

**Technical Approach:** The training process often uses Earth Mover's Distance (EMD) loss. This loss function is designed to measure the distance between two distributions, making it suitable for training a model to match the histogram of human votes on subjective ratings.

**Benefit:** This approach allows the AI system to capture and communicate the inherent subjectivity and disagreement found in human ratings. It directly conveys both the central tendency (average rating) and the dispersion (level of disagreement or variance) to the user, providing a more complete picture of the subjective quality being assessed.


### Uicrit Dataset Findings

**Dataset Overview:** The UICrit dataset, as described by Duan et al. (UIST 2024), is a collection of design critiques for user interfaces. It contains 3,059 natural language critiques provided by seven designers for a total of 983 unique UI screens. The dataset also includes numerical ratings from annotators for the aesthetics, usability, and overall design quality of the UIs.

**Inter Annotator Agreement:** The dataset provides quantitative measures of subjectivity in design evaluation. For the task of rating the validity of design critiques, the three annotators achieved a Fleiss' Kappa score between 0.29 and 0.31, which indicates 'fair agreement'. For a separate task involving ranking sets of designs based on preference, the agreement was higher, with a Fleiss' Kappa score of 0.55, indicating 'moderate agreement'.

**Critique Category Taxonomy:** The design critiques within the UICrit dataset are categorized into a topic taxonomy covering five broad areas: layout (e.g., alignment, spacing), color contrast, text readability, button usability (e.g., size, placement), and learnability. The evaluation rubric further breaks down overall design quality into aesthetics and usability, with usability being subdivided into learnability and efficiency.

**Aesthetics Usability Correlation:** A key finding from the analysis of the UICrit dataset is a very high positive correlation between the perceived aesthetics and usability of the user interfaces. The Pearson correlation coefficient (r) between the aesthetics and usability ratings was calculated to be approximately 0.875, suggesting that designers and annotators tend to rate UIs that they find aesthetically pleasing as also being more usable.


### Reliability Of Llm As A Judge Systems

**Core Challenge:** The main difficulty in making LLM-as-a-Judge systems reliable is addressing issues of consistency and bias. Ensuring that the LLM's judgments are stable, fair, and not overly confident is a primary challenge.

**Identified Biases And Issues:** Specific problems observed in LLM judges include position bias (favoring certain positions in a list, e.g., the first option), overconfidence in their judgments, and general issues with robustness and consistency. Formatting biases are also a concern.

**Improvement Strategies:** Proposed techniques to enhance reliability include: using score smoothing that combines token probabilities with explicit scores; implementing risk-aware practices; aggregating scores with uncertainty weights; randomizing option order to mitigate position bias; using tie-aware pairwise comparisons; and falling back to more reliable pairwise preferences when absolute scoring is unstable.

**Evaluation Metrics:** Metrics used to assess the performance of LLM judges include standard agreement metrics like Cohen’s Kappa and Spearman’s correlation to measure agreement with human raters. Additionally, specific metrics for position bias and preference fairness are used to evaluate the system's robustness and lack of bias.


### Future Research Directions

Based on the challenges identified in the provided research, future work should focus on several key areas. First is enhancing the reliability and fairness of 'LLM-as-a-Judge' systems by developing more robust metrics for agreement and creating systematic methods to mitigate known issues like position bias and overconfidence. Second, research into uncertainty quantification needs to expand beyond detecting some hallucinations to developing more comprehensive estimators, like semantic entropy, that can reliably signal a wider range of epistemic uncertainties in complex, taste-driven domains. Finally, there is a need for more advanced research in Human-Computer Interaction (HCI) to design effective interfaces for decision support, particularly in how users can intuitively explore Pareto frontiers, understand complex trade-offs between design alternatives, and interact with AI systems that operate in an exploratory rather than a prescriptive mode.


## Research Basis

### modeling_subjective_score_distributions
**Confidence:** high

The central claim is that subjective design critique yields distributions of opinions rather than a single score, and that reliable evaluation benefits from reporting and analyzing score distributions. The most relevant evidence shows that in the UICrit dataset, human critiques and quality ratings reveal substantial subjective variation and measurable inter-rater reliability levels (or disagreement) across annotators. Specifically, reports of Fleiss’ Kappa values around 0.29–0.31 indicate only fair agreement, which supports the need to represent scores as distributions that capture disagreement. The accompanying figures and descriptions indicate there are distributions and ratings (e.g., a histogram of aesthetics, usability, and overall design quality) and that critiques differ in specificity and actionability, underscoring subjectivity. Additional excerpts describe a large-scale dataset with regions of interest and example critiques, which further illustrate how multiple annotators contribute diverse scores and critiques, reinforcing the approach of modeling score distributions rather than a single point estimate. Some excerpts also note that agreement varies by design dimension, which aligns with the idea of presenting a range of opinions across aspects like typography, color, usability, and aesthetics. Overall, the evidence supports modeling subjective quality as a distribution (with central tendency and dispersion) and using distributional losses or representations (e.g., Earth Mover’s Distance) to align model outputs with human rating distributions.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
  > **Generating**
**Feedback and**
**Ratings for**
**Entire Screen**
  > **Generating**
**Feedback for**
**a Region**
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > **Figure** **8:** **Illustration** **of** **the** **input** **and** **output** **for** **each** **modeling** **task.** **The** **left** **part** **of** **the** **fgure** **illustrates** **the** **generation** **of**
**comments** **for** **a** **specifc** **region** **in** **the** **screenshot** **(marked),** **and** **the** **right** **part** **shows** **the** **generation** **of** **critiques,** **corresponding**
**bounding** **boxes,** **and** **design** **quality** **ratings** **for** **the** **entire** **UI** **screen.** **These** **are** **realistic** **outputs** **from** **our** **best** **performing**
**few-shot** **setup** **for** **each** **task,** **which** **sometimes** **contain** **hallucinations**
  > **Few** **Shot** **Setup**
**Avg.** **Comment**
**Total** **Number** **of**
**Quality** **Score**
**Comments**
8-shot,
0.44
11
Visual Similarity
8-shot,
0.42
10
Semantic Similarity
4-shot,
0.36
20
Visual Similarity
4-shot,
0.34
21
Semantic Similarity
8-shot, Random
0.31
9
**Table** **3:** **Results** **of** **the** **few-shot** **experiments** **for** **the** **top** **5** **per-**
**forming** **set-ups** **for** **the** **task** **of** **generating** **design** **comments**
**for** **a** **region** **of** **interest** **in** **the** **screenshot.** **The** **table** **shows** **the**
**average** **quality** **score** **per** **comment** **(from** **all** **3** **annotators),**
**as** **well** **as** **the** **total** **number** **of** **comments** **generated** **for** **the** **6**
**UIs** **for** **each** **setup.**
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.
  > by P Duan · 2024 · Cited by 127 — The Heuristic Evaluation Study with Human Experts consists of 12 design experts, who each looked for guideline violations in 6 UIs, and finishes with an
- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [a comparative study of AI and human rater agreement and ...](https://link.springer.com/article/10.1007/s10639-026-13949-7)
  > by M Acar Güvendir · 2026 — Building on cognitive theories, this study investigates interrater reliability (IRR) and interrater agreement (IRA) between human raters and artificial int.
- [Calibrating Verbal Uncertainty as a Linear Feature to ...](https://aclanthology.org/2025.emnlp-main.187.pdf)
  > by Z Ji · 2025 · Cited by 3 — We introduce Mechanistic Uncertainty Cali- bration (MUC), an inference-time interven- tion mechanism using VUFs to calibrate verbal uncertainty with semantic

### presenting_design_alternatives_with_trade_offs
**Confidence:** high

The finegrained field value describes a system that acts as a decision-support tool by presenting multiple valid design options with explicit trade-off analyses, organized along a Pareto frontier, and allowing user-driven reweighting of objectives. Excerpt 34 explicitly mentions cooperative multi-objective Bayesian design optimization and the creation of a Pareto frontier to surface candidates that balance competing objectives, which aligns with surfacing multiple valid alternatives and their trade-offs. Excerpt 47 discusses preference-guided multi-objective UI adaptation and ranking to guide exploration along the Pareto frontier, which directly supports the notion of a small, curated set of alternatives informed by user preferences and trade-offs. Excerpt 50 highlights information visualization as a means to improve problem understanding, which supports the proposed presentation approach (Pareto-front cards with visual overlays and deltas) by helping users compare options and understand trade-offs at a glance. Collectively, these excerpts substantiate the approach of generating a limited set of trade-off-aware design alternatives and presenting them in a visually contextualized, decision-support format with explicit pros/cons and metric impacts.

- [Cooperative Multi-Objective Bayesian Design Optimization](https://dl.acm.org/doi/full/10.1145/3657643)
  > by G Mo · 2024 · Cited by 10 — These methods can produce a Pareto frontier that shows the candidates that strike unique and optimal tradeoffs among the objectives. A Pareto frontier
- [Preference-Guided Multi-Objective UI Adaptation](https://dl.acm.org/doi/full/10.1145/3746059.3747645)
  > by Y Song · 2025 · Cited by 4 — In this paper, we employ PL-NSGA-II, which ranks design objectives to guide the dynamic exploration of the Pareto frontier. Our approach outperformed
- [Information visualization and strategic problem ...](https://www.sciencedirect.com/science/article/pii/S0263237323001123)
  > by K Eberhard · 2025 · Cited by 8 — Information visualization leads to higher levels of strategic problem comprehension, as it fosters the integration and comparison of relevant information.

### executive_summary
**Confidence:** medium

The field value emphasizes that AI systems should treat subjective design judgments as probabilistic and socially constructed, communicate calibrated uncertainty, and present multiple valid alternatives on a Pareto frontier, using ensemble and uncertainty techniques to detect when experts may disagree. Excerpts that discuss a shift toward confidence-calibrated evaluation in LLM-based judging, including advocating confidence-driven and risk-aware evaluation, support the idea of moving away from single-authoritative judgments toward uncertainty-aware reasoning. Excerpts addressing uncertainty quantification and calibration in large language models provide direct grounding for how an AI could express uncertainty and distribute predicted scores rather than assert a single verdict. Discussions of inter-rater reliability and disagreement among human evaluators in UI critique datasets (and the observed fair-to-moderate agreement in UICrit) underpin the empirical basis for distinguishing objective failures from subjective preferences and for framing multiple perspectives as part of the evaluation process. Evidence from studies presenting variability in design critique due to subjectivity, and examples where multiple sampling or ensemble-like strategies are used to assess evaluation quality, further justify using an ensemble or multi-path reasoning approach to present diverse design options rather than a single prescriptive answer. Together, these excerpts support a design of AI systems that reason with uncertainty, ground assessments in empirical disagreement data, offer tradeoffs via Pareto-frontier style presentations, and adopt a collaborative, decision-support stance rather than authoritative dictation.

- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.
- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation

### ensemble_disagreement_as_a_subjectivity_signal
**Confidence:** high

The field value posits that detecting subjectivity via ensemble disagreement is valuable and that multiple model outputs can highlight zones where experts may disagree. The most relevant excerpts demonstrate that, in UI critique research, inter-rater reliability is fair to moderate (Fleiss’ Kappa values around 0.29–0.31), which directly supports the idea that disagreement is common and meaningful in subjective design evaluation. This supports using ensemble approaches as signals of epistemic uncertainty and as a rationale for presenting multiple valid options rather than a single answer. Additional relevant content shows that a large design critique dataset (UICrit) collects critiques from multiple designers, emphasizing how variation among evaluators arises and is informative. These pieces collectively justify strategies such as surfacing competing viewpoints, surfacing uncertainty, and using multi-pass evaluation to identify and communicate subjectivity. Related excerpts discuss the percentage agreement and observed disagreements in ratings, reinforcing that agreement levels are often not high, which further validates the utility of ensemble/disagreement signals. Some excerpts also describe how subjective design evaluation is, by design, prone to variability, and how datasets and studies propagate this insight into system design for critique and decision-support. Taken together, the most supportive evidence is the explicit reporting of inter-rater reliability scores and the interpretation that disagreements reflect subjectivity, while additional context about UICrit methodology and the presence of multiple critiques elaborates how to operationalize this in AI systems by presenting multiple options and surfacing uncertainty.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > by P Duan · 2024 · Cited by 127 — The Heuristic Evaluation Study with Human Experts consists of 12 design experts, who each looked for guideline violations in 6 UIs, and finishes with an
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.
- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation

### visualization_of_multi_objective_trade_offs
**Confidence:** medium

The most relevant content directly describes the core mechanism your field value prescribes: using a Pareto frontier to present multiple design alternatives and trade-offs among competing objectives. One excerpt explicitly states that Pareto frontiers can show candidates that strike unique and optimal tradeoffs among objectives, which aligns with modeling readable information density, accessibility, cost, and other criteria, and the idea of visualizing these trade-offs as a frontier of options. Another excerpt reinforces this by describing how design objectives are ranked to guide multi-objective exploration along the Pareto frontier, illustrating the same mechanism of presenting multiple viable options rather than a single recommendation. A related excerpt argues that information visualization supports strategic problem understanding, which complements the goal of helping users grasp trade-offs across multiple objectives. Additional excerpts discuss how evaluation and critique in design contexts often students and practitioners rely on shared understanding and reliability, which underpins the need for clear, multi-criteria presentation rather than a single verdict. Taken together, these excerpts support the field value by illustrating (a) the Pareto-front approach to presenting multiple design alternatives with trade-offs, (b) methods for ranking or presenting options along that frontier, (c) the role of visualization in communicating complex trade-offs to users, and (d) the context of evaluation where subjective judgments matter and clarity of alternatives is beneficial.

- [Cooperative Multi-Objective Bayesian Design Optimization](https://dl.acm.org/doi/full/10.1145/3657643)
  > by G Mo · 2024 · Cited by 10 — These methods can produce a Pareto frontier that shows the candidates that strike unique and optimal tradeoffs among the objectives. A Pareto frontier
- [Preference-Guided Multi-Objective UI Adaptation](https://dl.acm.org/doi/full/10.1145/3746059.3747645)
  > by Y Song · 2025 · Cited by 4 — In this paper, we employ PL-NSGA-II, which ranks design objectives to guide the dynamic exploration of the Pareto frontier. Our approach outperformed
- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation
- [Information visualization and strategic problem ...](https://www.sciencedirect.com/science/article/pii/S0263237323001123)
  > by K Eberhard · 2025 · Cited by 8 — Information visualization leads to higher levels of strategic problem comprehension, as it fosters the integration and comparison of relevant information.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### uicrit_dataset_findings
**Confidence:** high

The finegrained field value comprises four key components that are directly addressed by the most relevant excerpts: (1) a dataset overview describing the scale and content of UICrit, including the number of critiques, screens, and annotators; (2) quantified inter-annotator agreement metrics (Fleiss’ Kappa) indicating the level of subjectivity and disagreement among designers; (3) a taxonomy or categorization of design critique topics and evaluation rubrics; and (4) a reported correlation between aesthetics and usability in the dataset, suggesting a relationship between subjective aesthetic judgments and perceived usability. The most directly supportive excerpts state that UICrit is a large-scale dataset with hundreds of UI screens and thousands of critiques, produced by multiple designers, which establishes the dataset overview. Several excerpts provide explicit inter-rater reliability figures (for critique validity and for ranking conditions), showing fair to moderate agreement levels, which aligns with the inter-annotator agreement component. Other excerpts describe the data collection process, including guidelines and the existence of a design-critique taxonomy, which underpin the taxonomy component. Finally, excerpts report that there is a high positive correlation between aesthetics and usability (e.g., a Pearson r around 0.875), supporting the aesthetics-usability correlation claim. Putting these pieces together, the selected excerpts together reasonably and coherently substantiate the four subfields in the finegrained value: dataset_overview, inter_annotator_agreement, critique_category_taxonomy, and aesthetics_usability_correlation. The excerpts mentioning specific kappa values, the number of screens and critiques, and the observed correlation directly bolster the targeted field value elements, while others provide context for data collection and evaluation practices that reinforce the interpretation of those metrics.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
  > **Generating**
**Feedback and**
**Ratings for**
**Entire Screen**
  > **Generating**
**Feedback for**
**a Region**
  > **Figure** **8:** **Illustration** **of** **the** **input** **and** **output** **for** **each** **modeling** **task.** **The** **left** **part** **of** **the** **fgure** **illustrates** **the** **generation** **of**
**comments** **for** **a** **specifc** **region** **in** **the** **screenshot** **(marked),** **and** **the** **right** **part** **shows** **the** **generation** **of** **critiques,** **corresponding**
**bounding** **boxes,** **and** **design** **quality** **ratings** **for** **the** **entire** **UI** **screen.** **These** **are** **realistic** **outputs** **from** **our** **best** **performing**
**few-shot** **setup** **for** **each** **task,** **which** **sometimes** **contain** **hallucinations**
  > **Few** **Shot** **Setup**
**Avg.** **Comment**
**Total** **Number** **of**
**Quality** **Score**
**Comments**
8-shot,
0.44
11
Visual Similarity
8-shot,
0.42
10
Semantic Similarity
4-shot,
0.36
20
Visual Similarity
4-shot,
0.34
21
Semantic Similarity
8-shot, Random
0.31
9
**Table** **3:** **Results** **of** **the** **few-shot** **experiments** **for** **the** **top** **5** **per-**
**forming** **set-ups** **for** **the** **task** **of** **generating** **design** **comments**
**for** **a** **region** **of** **interest** **in** **the** **screenshot.** **The** **table** **shows** **the**
**average** **quality** **score** **per** **comment** **(from** **all** **3** **annotators),**
**as** **well** **as** **the** **total** **number** **of** **comments** **generated** **for** **the** **6**
**UIs** **for** **each** **setup.**
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### distinguishing_objective_failures_vs_subjective_preferences
**Confidence:** high

The finegrained field value describes a formalization approach that separates objective design violations from subjective recommendations, using a two-channel critique schema that routes objective issues to an objective channel and subjective preferences to a subjective channel, along with evidence requirements for each channel. The most relevant excerpts explicitly discuss the inherent subjectivity of design evaluation and the presence of disagreement among designers, which directly supports the need for distinguishing channels rather than forcing a single, unified verdict. For instance, statements that design critique quality is impacted by subjectivity and that disagreements among annotators exist demonstrate that a single objective standard cannot fully capture design critique, thereby motivating a system that can present multiple, interchangeable options when consensus is weak. Additional excerpts quantify inter-rater reliability (for example, fair agreement scores around 0.30-0.31) and describe datasets (UICrit) that collect critiques from multiple designers, both of which underpin the feasibility and value of a two-channel approach and multi-perspective reasoning. Supporting content that highlights that critiques and ratings vary across experts (and that there is measurable disagreement) reinforces the need to present alternative design recommendations with reasoning rather than declaring a single correct answer. The overall evidence supports constructing a system that (a) flags objective failures with measurable criteria and (b) surfaces subjective preferences as justified, exemplified by showing exemplars from design critiques and documenting where agreement is strong versus weak.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### uncertainty_quantification_techniques
**Confidence:** high

The most directly relevant information comes from a survey on uncertainty quantification in large language models, which frames uncertainty assessment and calibration as central to robust subjective evaluation. This establishes a broad methodological backdrop for uncertainty-aware reasoning in subjective domains. Following that, instructional material on uncertainty quantification in practice (tutorial-style surveys) provides concrete, multi-turn guidance on estimating and communicating uncertainty, including when to express confidence vs. doubt. Next, methods that operationalize uncertainty in generation and evaluation—such as confidence-aware self-consistency (producing multiple critiques and checking consensus), and distributional prediction (forecasting a full score distribution rather than a single value)—map cleanly to how an AI designer might present multiple valid design alternatives with explicit uncertainty. Additional excerpts discuss entropy-based or sampling-based detection of ambiguity or epistemic uncertainty (semantic entropy, self-consistency, and related approaches) and how these can trigger alternative behaviors (e.g., presenting options or escalating to exploratory modes) which aligns with the goal of handling subjective judgments in design. Finally, inter-rater reliability findings in the UI critique domain (e.g., UICrit) illustrate real-world variability in expert judgments, highlighting the necessity of calibrated uncertainty and multi-path reasoning in design evaluation, and support the notion that disagreement is a signal to manage rather than suppress. A supplementary piece on SelfCheckGPT demonstrates a concrete mechanism to detect hallucinations in responses, reinforcing uncertainty monitoring in practice.

- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### reliability_of_llm_as_a_judge_systems
**Confidence:** high

The fine-grained field value describes core challenges and proposed remedies for making LLM-based judges reliable, including addressing consistency, bias, robustness, and the expression of appropriate uncertainty. The most relevant information supports a formal understanding of LLM-as-a-Judge and highlights the necessity of calibration, uncertainty management, and multi-path reasoning. Specific guidance includes: adopting uncertainty-aware evaluation and risk-aware practices; combining scores with token-level probabilities and explicit scores to smooth results; randomizing option order to mitigate position bias; employing pairwise comparisons to avoid unstable absolute scores; and using aggregation strategies that weight uncertainty. Evidence also emphasizes evaluating reliability with established statistics like Cohen’s Kappa and Spearman correlations to quantify agreement with human raters, as well as methods to detect and mitigate hallucinations and false certainty. Collectively, these excerpts map directly onto the field value’s components: reliability challenges, biases observed in judgments, concrete improvement strategies, and evaluation metrics. The overlap between these concepts across multiple sources strengthens the assessment that the field value is well-supported.

- [A Survey on LLM-as-a-Judge](https://arxiv.org/html/2411.15594v4)
  > Feb 1, 2025 — This paper provides a comprehensive survey on LLM-as-a-Judge, offering a formal definition and a detailed classification of its use cases, while focusing on
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Calibrating Verbal Uncertainty as a Linear Feature to ...](https://aclanthology.org/2025.emnlp-main.187.pdf)
  > by Z Ji · 2025 · Cited by 3 — We introduce Mechanistic Uncertainty Cali- bration (MUC), an inference-time interven- tion mechanism using VUFs to calibrate verbal uncertainty with semantic
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Evaluating clinical AI summaries with large language ...](https://www.nature.com/articles/s41746-025-02005-2)
  > by E Croxford · 2025 · Cited by 26 — We hypothesize that the LLM-as-a-Judge framework will achieve inter-rater reliability comparable to expert human evaluators, thus providing an efficient,
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [a comparative study of AI and human rater agreement and ...](https://link.springer.com/article/10.1007/s10639-026-13949-7)
  > by M Acar Güvendir · 2026 — Building on cognitive theories, this study investigates interrater reliability (IRR) and interrater agreement (IRA) between human raters and artificial int.

### strategies_to_avoid_false_certainty
**Confidence:** high

The selected excerpts collectively endorse several key practices for mitigating false certainty in subjective design judgments. First, calibration of uncertainty and deliberate handling of subjective versus objective aspects are repeatedly highlighted as essential. They discuss framing uncertainty explicitly, calibrating verbal uncertainty with structured templates, and maintaining appropriate levels of uncertainty in subjective domains without sacrificing usefulness. This supports the finegrained value’s emphasis on formalizing distinctions between objective design failures and subjective preferences, and on mapping probabilities to calibrated linguistic cues. Second, there is emphasis on uncertainty estimation techniques and the value of multi-sample or ensemble approaches to detect and manage epistemic uncertainty, including methods that assess and communicate confidence across multiple candidate evaluations. This aligns with presenting design alternatives with tradeoffs rather than single recommendations and using ensemble signals to flag when agreement is in the “reasonable experts disagree” zone. Third, several excerpts discuss detecting hallucinations or overconfident assertions by modeling uncertainty and by using mechanisms such as self-consistency or entropy-based probes, which support safeguards against false certainty and help justify when to defer to human judgment. Fourth, inter-rater reliability and reliability-focused evaluation frameworks are cited as ways to understand disagreement and calibrate trust in automated judgments, which informs how to show reasoning paths and rationales with transparency rather than definitive certainty. Finally, practical guidance is offered on including human-in-the-loop checkpoints and exposing biases or prompt-induced flips in judgments, supporting the broader strategy to maintain appropriate uncertainty and auditability in subjective design decisions. In sum, these excerpts collectively back the idea that a robust subjective-design AI should (a) calibrate verbal certainty to probabilistic or evidence-based signals, (b) present multiple well-justified options with tradeoffs, (c) monitor and report ensemble disagreement and potential biases, and (d) include human-in-the-loop validation for high-stakes or highly uncertain cases.

- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Calibrating Verbal Uncertainty as a Linear Feature to ...](https://aclanthology.org/2025.emnlp-main.187.pdf)
  > by Z Ji · 2025 · Cited by 3 — We introduce Mechanistic Uncertainty Cali- bration (MUC), an inference-time interven- tion mechanism using VUFs to calibrate verbal uncertainty with semantic
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Enhancing Clinician Trust in AI Diagnostics: A Dynamic ...](https://www.mdpi.com/2075-4418/15/17/2204)
  > by Y Yu · 2025 · Cited by 27 — Confidence calibration is equally vital for ensuring AI reliability in clinical settings. AI systems that are poorly calibrated may either overestimate or
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [A Survey on LLM-as-a-Judge](https://arxiv.org/html/2411.15594v4)
  > Feb 1, 2025 — This paper provides a comprehensive survey on LLM-as-a-Judge, offering a formal definition and a detailed classification of its use cases, while focusing on

### confidence_calibration_for_subjective_tasks
**Confidence:** high

Content that advocates for uncertainty-aware evaluation and calibration directly supports the finegrained field value. Specifically, discussions of uncertainty quantification in large language models and the need to move from single-score judgments to calibrated confidence distributions map closely to the requested approach of expressing a numeric probability or variance alongside verbal cues. Verbal uncertainty calibrated as a linear feature provides a concrete mechanism to align language with numeric estimates, which is central to calibrating subjective judgments. Work that argues for a confidence-driven, AI-as-a-Judge paradigm emphasizes shifting the evaluation mindset from sole accuracy to risk-aware, uncertainty-aware reasoning, aligning with the demand for multi-path reasoning and scenario-based outputs. Studies on improving inter-rater reliability and providing structured, multiple design critiques (e.g., UICrit) underpin how to ground calibration curves in human agreement evidence, enabling an AI to tune its confidence to actual human validation rates. Additional results showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation reinforce the value of standardized criteria and explanations when presenting design alternatives. In sum, the excerpts collectively support a strategy where AI systems express calibrated confidence through (i) numeric distributions (e.g., predicted validity, rating variance, entropy), (ii) reinforced verbal uncertainty aligned with those distributions, (iii) semantic/dispersion-based uncertainty measures that reflect subjective taste, and (iv) calibration against historical human agreement data to map probabilities to real-world acceptance rates. They also illustrate how to present multiple options or tradeoffs when opinions disagree, instead of forcing a single answer.

- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Calibrating Verbal Uncertainty as a Linear Feature to ...](https://aclanthology.org/2025.emnlp-main.187.pdf)
  > by Z Ji · 2025 · Cited by 3 — We introduce Mechanistic Uncertainty Cali- bration (MUC), an inference-time interven- tion mechanism using VUFs to calibrate verbal uncertainty with semantic
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Information visualization and strategic problem ...](https://www.sciencedirect.com/science/article/pii/S0263237323001123)
  > by K Eberhard · 2025 · Cited by 8 — Information visualization leads to higher levels of strategic problem comprehension, as it fosters the integration and comparison of relevant information.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### key_strategies_for_subjective_reasoning
**Confidence:** high

The most relevant information comes from studies that quantify how much designers agree when rating design critiques, demonstrating that inter-rater disagreement is common in subjective judgments and varies by criterion. This supports the strategy of explicitly modeling disagreement and presenting uncertainty or multiple alternatives rather than asserting a single correct choice. For example, reports showing Fleiss’ Kappa values around 0.30–0.31 for critique agreement and a higher yet still imperfect agreement (0.55) for overall rankings illustrate that objective rule-based aspects tend to have higher agreement than subjective design choices, validating a two-channel approach: label high-certainty objective issues as errors and present subjective suggestions with caveats when disagreement is likely. These excerpts also discuss that the critique quality and the presence of disagreements depend on the task and sample, underscoring the need for calibrated communication about uncertainty and the possibility of multiple viable options. Complementary sources discuss broader uncertainty quantification and confidence calibration in AI evaluation, advocating for distributions over single scores, calibrated verbal uncertainty, and ensemble-based signals to detect epistemic uncertainty. Such work provides concrete methods to express uncertainty in subjective domains, including using multiple plausible options, trade-offs, and explicit confidence framing rather than definitive judgments. Additional references discuss methods to detect and mitigate false certainty (hallucinations) and employ uncertainty signals (self-consistency, multiple samples) to decide when to present alternatives or seek human-in-the-loop checks. Overall, the excerpts collectively substantiate the need for strategies that calibrate confidence, acknowledge expert disagreement, present diverse options with rationales and trade-offs, and separate objective failures from subjective preferences while avoiding overconfident conclusions.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### inter_rater_reliability_in_design
**Confidence:** medium

The fine-grained field value cites that expert designers show nontrivial disagreement and that agreement levels vary by design issue type. It also provides specific quantitative findings: fair agreement for critique validity ratings, and moderate agreement for ranking design sets; and notes that agreement can be as low as slight for subjective qualities like usefulness or accuracy of suggestions. The most directly supportive evidence are excerpts that report explicit Fleiss’ Kappa scores in UI critique studies, including roughly 0.29–0.31 for critique validity (fair agreement) and around 0.55 for ranking agreement (moderate agreement). These numbers align with the described overall finding of nontrivial disagreement with dimension-dependent variance. Additional extracts provide even lower or higher reliability figures in related studies (e.g., 0.112 for accuracy and 0.100 for helpfulness in heuristic evaluations), illustrating that some subjective evaluation aspects exhibit only slight agreement, which reinforces the distinction between objective/hard metrics vs subjective preferences. Contextual details about the UICrit dataset, its methodology, and the reported inter-rater reliability scores further support the claim that reliability in design critique is nuanced and task-dependent, with fair agreement on some tasks and only modest or even low agreement on others. Taken together, these excerpts corroborate the fine-grained field value by supplying concrete, task-specific reliability metrics and by differentiating high-agreement vs low-agreement dimensions (objective criteria vs subjective judgments).

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **Generating**
**Feedback and**
**Ratings for**
**Entire Screen**
  > **Generating**
**Feedback for**
**a Region**
  > **Figure** **8:** **Illustration** **of** **the** **input** **and** **output** **for** **each** **modeling** **task.** **The** **left** **part** **of** **the** **fgure** **illustrates** **the** **generation** **of**
**comments** **for** **a** **specifc** **region** **in** **the** **screenshot** **(marked),** **and** **the** **right** **part** **shows** **the** **generation** **of** **critiques,** **corresponding**
**bounding** **boxes,** **and** **design** **quality** **ratings** **for** **the** **entire** **UI** **screen.** **These** **are** **realistic** **outputs** **from** **our** **best** **performing**
**few-shot** **setup** **for** **each** **task,** **which** **sometimes** **contain** **hallucinations**
  > **Few** **Shot** **Setup**
**Avg.** **Comment**
**Total** **Number** **of**
**Quality** **Score**
**Comments**
8-shot,
0.44
11
Visual Similarity
8-shot,
0.42
10
Semantic Similarity
4-shot,
0.36
20
Visual Similarity
4-shot,
0.34
21
Semantic Similarity
8-shot, Random
0.31
9
**Table** **3:** **Results** **of** **the** **few-shot** **experiments** **for** **the** **top** **5** **per-**
**forming** **set-ups** **for** **the** **task** **of** **generating** **design** **comments**
**for** **a** **region** **of** **interest** **in** **the** **screenshot.** **The** **table** **shows** **the**
**average** **quality** **score** **per** **comment** **(from** **all** **3** **annotators),**
**as** **well** **as** **the** **total** **number** **of** **comments** **generated** **for** **the** **6**
**UIs** **for** **each** **setup.**
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### presenting_design_alternatives_with_trade_offs.generation_method
**Confidence:** high

The fine-grained field value describes generating multiple valid design alternatives using a multi-objective framing, yielding 3-5 diverse candidates along a Pareto frontier, optimized across objectives such as readability, information density, brand expressiveness, accessibility, and cost. The most directly supportive content states that Pareto frontiers reveal optimal tradeoffs among objectives and that a set of candidates can be generated to balance competing goals. Another excerpt explicitly describes a preference-guided multi-objective approach that guides exploration of the Pareto frontier, aligning with producing a diverse yet high-quality set of options. A third excerpt ties information visualization to higher comprehension and the integration and comparison of relevant information, which underpins presenting multiple alternatives side-by-side to aid evaluation. Collectively, these excerpts substantiate the use of multi-objective framing, Pareto frontiers, and visualization-enabled comparison to generate and present multiple valid design alternatives rather than a single solution.

- [Cooperative Multi-Objective Bayesian Design Optimization](https://dl.acm.org/doi/full/10.1145/3657643)
  > by G Mo · 2024 · Cited by 10 — These methods can produce a Pareto frontier that shows the candidates that strike unique and optimal tradeoffs among the objectives. A Pareto frontier
- [Preference-Guided Multi-Objective UI Adaptation](https://dl.acm.org/doi/full/10.1145/3746059.3747645)
  > by Y Song · 2025 · Cited by 4 — In this paper, we employ PL-NSGA-II, which ranks design objectives to guide the dynamic exploration of the Pareto frontier. Our approach outperformed
- [Information visualization and strategic problem ...](https://www.sciencedirect.com/science/article/pii/S0263237323001123)
  > by K Eberhard · 2025 · Cited by 8 — Information visualization leads to higher levels of strategic problem comprehension, as it fosters the integration and comparison of relevant information.

### presenting_design_alternatives_with_trade_offs.tradeoff_analysis_description
**Confidence:** medium

The focal field value requires presenting tradeoffs for each design alternative with explicit references to guiding principles, measurable impact on metrics, and known downsides. The most relevant excerpt discusses constructing a Pareto frontier to identify unique and optimal tradeoffs among objectives, which directly supports the idea of detailing how each option improves or declines across competing criteria. The second excerpt describes a preference-guided multi-objective UI approach that uses objective ranking to guide exploration of the tradeoff space, directly aligning with presenting multiple alternatives and their comparative tradeoffs rather than a single recommendation. The third excerpt highlights information visualization as a means to enhance comprehension and comparison of relevant information, which underpins effective presentation of tradeoffs to users by enabling clear comparison across options. Collectively, these excerpts substantiate the approach of explicitly outlining how each alternative trades off different objectives, with references to guidelines and metrics that can anchor the analysis and presentation, though they stop short of providing a complete, ready-to-deploy template for every specific metric mentioned in the field value.

- [Cooperative Multi-Objective Bayesian Design Optimization](https://dl.acm.org/doi/full/10.1145/3657643)
  > by G Mo · 2024 · Cited by 10 — These methods can produce a Pareto frontier that shows the candidates that strike unique and optimal tradeoffs among the objectives. A Pareto frontier
- [Preference-Guided Multi-Objective UI Adaptation](https://dl.acm.org/doi/full/10.1145/3746059.3747645)
  > by Y Song · 2025 · Cited by 4 — In this paper, we employ PL-NSGA-II, which ranks design objectives to guide the dynamic exploration of the Pareto frontier. Our approach outperformed
- [Information visualization and strategic problem ...](https://www.sciencedirect.com/science/article/pii/S0263237323001123)
  > by K Eberhard · 2025 · Cited by 8 — Information visualization leads to higher levels of strategic problem comprehension, as it fosters the integration and comparison of relevant information.

### presenting_design_alternatives_with_trade_offs.presentation_format
**Confidence:** medium

The proposed presentation format centers on offering a small, manageable set of design alternatives that are clearly differentiated along trade-off axes, visualized on a Pareto frontier, with succinct deltas and guidelines per option. The first excerpt explicitly discusses producing a Pareto frontier to identify candidates with unique and optimal tradeoffs, which directly supports presenting multiple alternatives and highlighting their trade-offs. The second excerpt describes a preference-guided approach that ranks objectives to explore the Pareto frontier, reinforcing the notion of a structured, multi-option presentation rather than a single recommendation. The third excerpt notes that information visualization enhances strategic problem comprehension by enabling integration and comparison of relevant information, which validates including visual overlays, hierarchy maps, and contrast annotations to clarify the proposed changes. Collectively, these excerpts substantiate the core idea of an alternatives view with trade-off analysis, supported by visual aids, even though they do not specify the exact 3–5 option count in every case.

- [Cooperative Multi-Objective Bayesian Design Optimization](https://dl.acm.org/doi/full/10.1145/3657643)
  > by G Mo · 2024 · Cited by 10 — These methods can produce a Pareto frontier that shows the candidates that strike unique and optimal tradeoffs among the objectives. A Pareto frontier
- [Preference-Guided Multi-Objective UI Adaptation](https://dl.acm.org/doi/full/10.1145/3746059.3747645)
  > by Y Song · 2025 · Cited by 4 — In this paper, we employ PL-NSGA-II, which ranks design objectives to guide the dynamic exploration of the Pareto frontier. Our approach outperformed
- [Information visualization and strategic problem ...](https://www.sciencedirect.com/science/article/pii/S0263237323001123)
  > by K Eberhard · 2025 · Cited by 8 — Information visualization leads to higher levels of strategic problem comprehension, as it fosters the integration and comparison of relevant information.

### uicrit_dataset_findings.inter_annotator_agreement
**Confidence:** high

The finegrained field value summarizes quantitative measures of subjectivity in design evaluation and reports specific Fleiss' Kappa values. One excerpt states that the critiques showed inter-rater reliability with a Fleiss' Kappa score of 0.29, which is interpreted as fair agreement, and also notes a separate ranking-based agreement with a Fleiss' Kappa score of 0.55, interpreted as moderate agreement. These exact numbers and their qualitative labels directly substantiate the claim about subjectivity in evaluation and about how agreement varies across tasks (critiques vs. ranking sets). The other excerpt reinforces the same theme by providing a corresponding 0.30 figure for the initial inter-rater agreement and mentions fair agreement, aligning with the overall characterization of subjectivity and reliability in the dataset. Together, they coherently support the field value by giving concrete agreement ranges and their interpretation, confirming that subjective judgments in design critique exhibit measurable variability and that some tasks yield higher consensus than others.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..

### modeling_subjective_score_distributions.concept
**Confidence:** high

The core field value asserts that subjective qualities like aesthetics should be represented as a full distribution of scores rather than a single point estimate. The most directly relevant evidence comes from findings that design critique is inherently subjective and that inter-rater reliability is only fair, which motivates moving away from single scores toward distributions that capture disagreement among evaluators. For example, reports of a fair inter-rater agreement score around 0.29–0.30 demonstrate that multiple evaluators diverge in their judgments, supporting the need to represent a range of opinions (i.e., a distribution) rather than a single consensus score. Discussions that interlink uncertainty with evaluation, and that mention calibration or signaling uncertainty rather than asserting a definitive verdict, further reinforce the need for models to express confidence as a distribution or multi-path reasoning instead of a binary or single-score output. Additional context about data collection, annotation interfaces, and examples of presenting critiques (including region-level and screenshot-level critiques) provide practical illustrations of how subjective judgments are captured and could be aggregated into a distribution over scores. The presence of studies comparing human vs. automated critiques, and references to uncertainty calibration in LLM evaluation, further support the notion that outputs should convey epistemic uncertainty and a spectrum of opinions. Taken together, these excerpts collectively back the fine-grained field value that the preferred approach is to model and output a full distribution of subjective scores rather than a single definitive score, and to present multiple viable design judgments when appropriate.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > **Generating**
**Feedback for**
**a Region**
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **Few** **Shot** **Setup**
**Avg.** **Comment**
**Total** **Number** **of**
**Quality** **Score**
**Comments**
8-shot,
0.44
11
Visual Similarity
8-shot,
0.42
10
Semantic Similarity
4-shot,
0.36
20
Visual Similarity
4-shot,
0.34
21
Semantic Similarity
8-shot, Random
0.31
9
**Table** **3:** **Results** **of** **the** **few-shot** **experiments** **for** **the** **top** **5** **per-**
**forming** **set-ups** **for** **the** **task** **of** **generating** **design** **comments**
**for** **a** **region** **of** **interest** **in** **the** **screenshot.** **The** **table** **shows** **the**
**average** **quality** **score** **per** **comment** **(from** **all** **3** **annotators),**
**as** **well** **as** **the** **total** **number** **of** **comments** **generated** **for** **the** **6**
**UIs** **for** **each** **setup.**
  > **Generating**
**Feedback and**
**Ratings for**
**Entire Screen**
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.
  > by P Duan · 2024 · Cited by 127 — The Heuristic Evaluation Study with Human Experts consists of 12 design experts, who each looked for guideline violations in 6 UIs, and finishes with an
- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [a comparative study of AI and human rater agreement and ...](https://link.springer.com/article/10.1007/s10639-026-13949-7)
  > by M Acar Güvendir · 2026 — Building on cognitive theories, this study investigates interrater reliability (IRR) and interrater agreement (IRA) between human raters and artificial int.
- [Calibrating Verbal Uncertainty as a Linear Feature to ...](https://aclanthology.org/2025.emnlp-main.187.pdf)
  > by Z Ji · 2025 · Cited by 3 — We introduce Mechanistic Uncertainty Cali- bration (MUC), an inference-time interven- tion mechanism using VUFs to calibrate verbal uncertainty with semantic

### presenting_design_alternatives_with_trade_offs.approach
**Confidence:** high

The fine-grained field value specifies that the overall strategy should function as a decision-support system that presents multiple valid options with clear trade-off analysis, rather than a single best recommendation. It explicitly mentions framing the design problem as a multi-objective challenge and using a Pareto frontier to illustrate optimal tradeoffs. The excerpt describing a Pareto frontier that shows candidates with unique and optimal tradeoffs directly supports this emphasis on presenting multiple options and their trade-offs. The subsequent excerpt extends this idea with a preference-guided multi-objective UI approach, detailing how design objectives can be ranked to guide exploration of the Pareto frontier, which aligns with audience- or context-conditioned ranking and dynamic reordering of alternatives. The third excerpt, while focused on information visualization and strategic problem comprehension, relates to how design information is presented to aid comparison and understanding, supporting the broader goal of clear, context-sensitive presentation of options, though it does not lawfully prescribe the exact trade-off mechanism. Taken together, the cited content substantiates the core concept of a multi-objective, transparent, and interactive presentation of design alternatives with trade-offs and re-weightable objectives.

- [Cooperative Multi-Objective Bayesian Design Optimization](https://dl.acm.org/doi/full/10.1145/3657643)
  > by G Mo · 2024 · Cited by 10 — These methods can produce a Pareto frontier that shows the candidates that strike unique and optimal tradeoffs among the objectives. A Pareto frontier
- [Preference-Guided Multi-Objective UI Adaptation](https://dl.acm.org/doi/full/10.1145/3746059.3747645)
  > by Y Song · 2025 · Cited by 4 — In this paper, we employ PL-NSGA-II, which ranks design objectives to guide the dynamic exploration of the Pareto frontier. Our approach outperformed
- [Information visualization and strategic problem ...](https://www.sciencedirect.com/science/article/pii/S0263237323001123)
  > by K Eberhard · 2025 · Cited by 8 — Information visualization leads to higher levels of strategic problem comprehension, as it fosters the integration and comparison of relevant information.

### future_research_directions
**Confidence:** high

Several excerpts directly discuss the core themes in the future work field. First, a family of sources surveys and analyzes LLM-based evaluation and judgment, emphasizing the need for reliable, calibrated, and well-justified assessment when AI systems act as evaluators. These passages collectively argue for formalizing the role of uncertainty, reliability, and bias mitigation in LLM judgments, and they survey both the challenges and proposed approaches for turning subjective evaluation into more trustworthy AI reasoning, including calibration and structured reasoning approaches. For instance, discussions around treating evaluation as a judgment task, the need for uncertainty-aware scoring, and the shift toward confidence-calibrated or risk-aware evaluation are directly aligned with the goal of strengthening LLM-as-a-Judge reliability and reducing overconfidence. Related items advocate self-consistency and uncertainty estimation as diagnostic tools to bound or understand model reasoning, which supports developing broader epistemic uncertainty signals such as semantic entropy to improve signaling in subjective domains. Together, these excerpts provide explicit guidance on how to measure and improve agreement among evaluators (human or AI) and how to quantify and communicate epistemic uncertainty in subjective or taste-driven design domains, which matches the requested future research directions. Additional excerpts discuss decision-support systems that present multiple valid alternatives with tradeoffs, rather than single prescriptions, including methods to visualize Pareto-frontier tradeoffs and to support decision-making in UI design. This directly maps to the user’s interest in enabling users to explore tradeoffs and interact with AI systems in exploratory, decision-support roles. They also describe collaborative decision-support frameworks and multi-objective optimization approaches that can be adapted to design critique contexts, providing concrete directions for interface design and interaction patterns when presenting design alternatives. Excerpts on UI critique reliability and inter-rater experiments further ground the reliability concerns within real design evaluation tasks and illustrate how agreement varies across dimensions, reinforcing the need for robust, calibrated, and explainable evaluation frameworks. Overall, these excerpts collectively substantiate the field’s emphasis on (a) stronger, better-calibrated uncertainty and agreement metrics for AI-driven judgments; (b) richer uncertainty signals (e.g., semantic entropy) beyond mere error detection; and (c) user-facing decision-support interfaces that transparently present multiple viable design paths with reasoning and tradeoffs.

- [A Survey on LLM-as-a-Judge](https://arxiv.org/html/2411.15594v4)
  > Feb 1, 2025 — This paper provides a comprehensive survey on LLM-as-a-Judge, offering a formal definition and a detailed classification of its use cases, while focusing on
  > LLM-as-a-Judge represents an LLM-based paradigm for evaluation, offering a compelling alternative to traditional methods that rely on either human experts or quantitative assessments. By leveraging the powerful capabilities of LLMs, this framework excels in tasks such as scoring, rating, and evaluation, offering exceptional scalability, adaptability, and precision.
  > However, fully realizing the potential of LLM-as-a-Judge requires addressing significant challenges, particularly those concerning reliability. The evaluation process must account for factors such as consistency, bias mitigation, and contextual adaptability, ensuring that the system operates under well-defined rules while delivering human-aligned and objective results.
- [A survey on LLM-as-a-judge](https://www.sciencedirect.com/science/article/pii/S2666675825004564)
  > by J Gu · 2026 · Cited by 1308 — At its core, LLM-as-a-judge denotes the use of LLMs to evaluate objects, actions, or decisions based on predefined rules, criteria, or preferences. It
- [Scalable Best-of-N Selection for Large Language Models ...](https://neurips.cc/virtual/2025/poster/120166)
  > Dec 4, 2025 — Self-consistency [Wang et al., 2022] leverages the model's internal understanding by selecting the most common response from multiple outputs, improving
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [PlanU: Large Language Model Reasoning through ...](https://neurips.cc/virtual/2025/poster/115818)
  > Dec 5, 2025 — Self-consistency improves chain of thought reasoning in language models. In The Eleventh International Conference on Learning Representations, 2023. [3]
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Cooperative Multi-Objective Bayesian Design Optimization](https://dl.acm.org/doi/full/10.1145/3657643)
  > by G Mo · 2024 · Cited by 10 — These methods can produce a Pareto frontier that shows the candidates that strike unique and optimal tradeoffs among the objectives. A Pareto frontier
- [A collaborative group decision-support system: the survey ...](https://www.tandfonline.com/doi/full/10.1080/01605682.2024.2398114)
  > by H Huang · 2025 · Cited by 16 — This study extends the MAMCA software by incorporating survey-based evaluation methods, evolving it into a survey-based decision-support system (DSS).
- [Preference-Guided Multi-Objective UI Adaptation](https://dl.acm.org/doi/full/10.1145/3746059.3747645)
  > by Y Song · 2025 · Cited by 4 — In this paper, we employ PL-NSGA-II, which ranks design objectives to guide the dynamic exploration of the Pareto frontier. Our approach outperformed
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
  > The ranking data had an agreement score of 0.55, which indicates moderate agreement.
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
- [http://github.com/google-research-datasets/uicrit](http://github.com/google-research-datasets/uicrit)
  > UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
Jan 22, 2026 — UICrit is a dataset containing human-generated natural language design critiques, corresponding bounding boxes for each critique, and design
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**

### modeling_subjective_score_distributions.key_dataset_example
**Confidence:** medium

The finegrained field value asserts that the AVA (Aesthetic Visual Analysis) dataset is an example where models learn from distributions of human ratings rather than a single averaged score, to capture aesthetic quality. The most relevant excerpts provide direct support for the core idea of using distributions or rating histograms to represent subjective judgments rather than collapsing to a single score. Specifically, excerpts that present histograms of numerical ratings for aesthetics (and related dimensions like usability and overall design quality) illustrate the practice of leveraging rating distributions to characterize subjective assessments. Additional excerpts describe data collection with multiple raters and inter-rater agreement/variability, which aligns with the notion of aggregating across multiple judgments to model subjective quality, rather than relying on a single value. Further references discuss uncertainty and disagreement in subjective evaluations (e.g., inter-rater reliability scores, potential variability across judgments) and even methodologies for representing or handling uncertainty in design evaluation. Together, these excerpts corroborate the idea of moving beyond a single average score to embracing distributions and multiple judgments when modeling aesthetics and subjective quality. The presence of explicit discussions about multiple raters, agreement scores, and histogram-based rating representations strengthens the link to learning from distributions of human judgments, as described for AVA. The supporting details gradually extend from histogram-based representations to broader themes of uncertainty and multi-path reasoning in subjective design evaluation, which are closely related to how AVA-like distributions could be modeled and used in AI systems.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.
  > by P Duan · 2024 · Cited by 127 — The Heuristic Evaluation Study with Human Experts consists of 12 design experts, who each looked for guideline violations in 6 UIs, and finishes with an
- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its

### uncertainty_quantification_techniques.0
**Confidence:** high

The fine-grained field value describes a semantic entropy / semantic density technique that estimates uncertainty by measuring diversity across multiple generated responses or rationales, signaling epistemic uncertainty and enabling behaviors like presenting options rather than a single answer. The most directly relevant excerpts explicitly discuss entropy-based or semantic entropy approaches to uncertainty quantification in LLMs and related methods. Specifically, one excerpt introduces semantic entropy probes as a cheap, reliable method for uncertainty quantification in large language models, aligning with the idea of measuring dispersion to gauge epistemic uncertainty and to trigger alternative system behaviors. Another excerpt develops entropy-based uncertainty estimators for detecting hallucinations, grounding the concept in statistical approaches to uncertainty and its practical use in spotting misleading outputs. Additional excerpts discuss uncertainty quantification and confidence calibration using multiple generations or rounds to assess consistency, which complements the idea of exploring multiple possible outputs to capture uncertainty rather than committing to a single answer. A related excerpt covers self-consistency and uncertainty as diagnostic tools for reasoning quality, reinforcing the broader theme of managing subjective or ambiguous judgments through explicit uncertainty signals. Other excerpts describe uncertainty quantification in design critique and inter-rater reliability, which provide context for subjective domains (design quality, critique) where uncertainty matters, though they are less about semantic entropy per se. Collectively, these sources support the field value’s emphasis on entropy-based, sampling-driven uncertainty estimation and on leveraging that uncertainty to present tradeoffs or multiple valid approaches rather than definitive single answers.

- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..

### key_strategies_for_subjective_reasoning.1
**Confidence:** high

The fine-grained field value seeks to formalize how to use empirical human disagreement data to contextualize AI feedback in subjective design decisions. The most relevant information from the excerpts shows that in a large-scale design critique dataset, the measured inter-rater reliability for critique validity is fair (Fleiss' Kappa around 0.3), while agreement on rankings is moderate (around 0.55). This supports the claim that objective, rule-based design aspects (like accessibility and contrast) tend to have higher agreement than subjective aspects (such as typography, color warmth, or brand tone). Consequently, an AI system can and should annotate feedback with an explicit tag indicating the expected level of human agreement for a given category (e.g., objectivity vs subjectivity) and present findings with calibrated uncertainty, rather than asserting a single ‘right’ design choice. The literature also notes that design evaluation is inherently subjective, which aligns with the need for multi-path reasoning and tradeoff analysis rather than a single recommendation. Collectively, these excerpts provide concrete metrics and qualitative conclusions that directly back the proposed approach of framing disagreements and calibrating AI feedback accordingly.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### modeling_subjective_score_distributions.technical_approach
**Confidence:** medium

The training objective described in the finegrained field value aims to align the model’s subjective rating distribution with human ratings using a histogram-distance approach, like Earth Mover’s Distance. While there isn’t a direct citation of EMD in the excerpts, several excerpts address the core ideas that underlie this approach. First, evidence about inter-rater reliability and agreement in subjective design critiques shows that human judgments are not perfectly aligned and that agreement levels can be only fair to moderate. This motivates modeling choices that account for distributional variability rather than forcing a single “correct” judgment. Second, discussions of uncertainty quantification and calibration demonstrate that there are established methods to express and manage uncertainty in subjective domains, which supports the idea of training objectives that capture the full distribution of human opinions rather than point estimates. Third, frameworks that consider presenting multiple valid design alternatives and trade-offs align well with a distribution-aware objective: rather than selecting a single verdict, the system can reflect a spectrum of plausible judgments, weighted by their observed frequencies. A specific excerpt notes that evaluators’ inter-rater reliability can be modest, which justifies modeling subjective scores as distributions to be learned rather than deterministic labels. Another excerpt discusses calibrating verbal uncertainty so that uncertainty is expressed in a principled way rather than as unsubstantiated opinion, which aligns with the notion of matching histogram-based distributions to human judgments. Additionally, discussions on uncertainty quantification emphasize detecting and communicating epistemic uncertainty in evaluations, which supports training approaches that preserve and convey the variability of human judgments. Taken together, these excerpts provide indirect yet coherent support for adopting a distribution-aware training objective (e.g., histogram matching or EMD-like loss) to align model outputs with how humans actually rate subjective design qualities, while also incorporating calibrated uncertainty and multi-path reasoning when presenting design alternatives. The connection to multi-path reasoning and presenting alternatives is reinforced by studies that show variation in expert judgments across design dimensions and the value of conveying tradeoffs rather than definitive single recommendations. Overall, while direct evidence for EMD is not present, the themes of unreliable subjective judgments, calibrated uncertainty, and distributional alignment strongly support the proposed direction. 

- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation
- [Calibrating Verbal Uncertainty as a Linear Feature to ...](https://aclanthology.org/2025.emnlp-main.187.pdf)
  > by Z Ji · 2025 · Cited by 3 — We introduce Mechanistic Uncertainty Cali- bration (MUC), an inference-time interven- tion mechanism using VUFs to calibrate verbal uncertainty with semantic
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.
  > by P Duan · 2024 · Cited by 127 — The Heuristic Evaluation Study with Human Experts consists of 12 design experts, who each looked for guideline violations in 6 UIs, and finishes with an
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **Figure** **8:** **Illustration** **of** **the** **input** **and** **output** **for** **each** **modeling** **task.** **The** **left** **part** **of** **the** **fgure** **illustrates** **the** **generation** **of**
**comments** **for** **a** **specifc** **region** **in** **the** **screenshot** **(marked),** **and** **the** **right** **part** **shows** **the** **generation** **of** **critiques,** **corresponding**
**bounding** **boxes,** **and** **design** **quality** **ratings** **for** **the** **entire** **UI** **screen.** **These** **are** **realistic** **outputs** **from** **our** **best** **performing**
**few-shot** **setup** **for** **each** **task,** **which** **sometimes** **contain** **hallucinations**
  > **Few** **Shot** **Setup**
**Avg.** **Comment**
**Total** **Number** **of**
**Quality** **Score**
**Comments**
8-shot,
0.44
11
Visual Similarity
8-shot,
0.42
10
Semantic Similarity
4-shot,
0.36
20
Visual Similarity
4-shot,
0.34
21
Semantic Similarity
8-shot, Random
0.31
9
**Table** **3:** **Results** **of** **the** **few-shot** **experiments** **for** **the** **top** **5** **per-**
**forming** **set-ups** **for** **the** **task** **of** **generating** **design** **comments**
**for** **a** **region** **of** **interest** **in** **the** **screenshot.** **The** **table** **shows** **the**
**average** **quality** **score** **per** **comment** **(from** **all** **3** **annotators),**
**as** **well** **as** **the** **total** **number** **of** **comments** **generated** **for** **the** **6**
**UIs** **for** **each** **setup.**
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > **Generating**
**Feedback and**
**Ratings for**
**Entire Screen**
  > **Generating**
**Feedback for**
**a Region**

### reliability_of_llm_as_a_judge_systems.identified_biases_and_issues
**Confidence:** medium

The most relevant materials directly address core issues around how LLM-based judges reason, express certainty, and handle disagreement or reliability. Specifically, a discussion of overconfidence in LLM-based judging highlights a central reliability concern that aligns with the stated problems in LLM judges about overconfidence and robustness. A general survey on LLM-as-a-Judge provides foundational context for categorizing use cases and evaluating the reliability of these systems, which is essential when examining biases and evaluation stability. Studies questioning whether LLM-based judgments can match expert reliability and exploring inter-rater reliability connect directly to the need to understand agreement and consistency among judgments, which are part of the identified issues. Work on evaluating and detecting hallucinations in LLM outputs, along with methods for uncertainty estimation and calibrated uncertainty in verbal reasoning, directly supports the broader concern with confidence calibration, false certainty, and the presentation of multiple reasonable options. Further, research on how to present design alternatives with tradeoffs and how to avoid false certainty contributes to strategies for maintaining appropriate uncertainty without sacrificing usefulness. Collectively, these excerpts build a picture of how LLM judges handle uncertainty, reliability, and disagreement, which map to the identified biases and issues such as overconfidence, robustness, and consistency in judgments. Direct references to inter-rater reliability and the potential of systems to present options rather than single recommendations also underpin the discussion of biases and evaluation stability in judge-like AI systems. While some excerpts address related methods (e.g., Self-CheckGPT, entropy-based uncertainty estimators, and linear-calibration features), they consistently reinforce the core themes of reliability, uncertainty management, and multi-path reasoning that are central to the requested field value.

- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [A Survey on LLM-as-a-Judge](https://arxiv.org/html/2411.15594v4)
  > Feb 1, 2025 — This paper provides a comprehensive survey on LLM-as-a-Judge, offering a formal definition and a detailed classification of its use cases, while focusing on
- [Evaluating clinical AI summaries with large language ...](https://www.nature.com/articles/s41746-025-02005-2)
  > by E Croxford · 2025 · Cited by 26 — We hypothesize that the LLM-as-a-Judge framework will achieve inter-rater reliability comparable to expert human evaluators, thus providing an efficient,
- [a comparative study of AI and human rater agreement and ...](https://link.springer.com/article/10.1007/s10639-026-13949-7)
  > by M Acar Güvendir · 2026 — Building on cognitive theories, this study investigates interrater reliability (IRR) and interrater agreement (IRA) between human raters and artificial int.
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Calibrating Verbal Uncertainty as a Linear Feature to ...](https://aclanthology.org/2025.emnlp-main.187.pdf)
  > by Z Ji · 2025 · Cited by 3 — We introduce Mechanistic Uncertainty Cali- bration (MUC), an inference-time interven- tion mechanism using VUFs to calibrate verbal uncertainty with semantic
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its

### key_strategies_for_subjective_reasoning.3
**Confidence:** medium

The core field value proposes a two-channel approach to feedback: binary, verifiable objective errors grounded in measurable standards, and subjective recommendations framed as hypotheses or alternatives with rationales. Several excerpts discuss uncertainty calibration, confidence estimation, and multi-path reasoning in AI and evaluation contexts, which support the need to separate what can be measured (objective criteria like contrast or accessibility) from what is subjective (aesthetic preference or style). This aligns with the idea of routing critiques based on whether they reference measurable standards or multiple valid alternatives, enabling AI systems to express uncertainty appropriately rather than presenting a single “correct” answer. Additional excerpts illustrate that design critique is inherently subjective and that there is variability in agreement among experts, which underscores why a two-channel framework and a decision pathway (to triage feedback into objective vs subjective or multiple viable options) would be beneficial in practice.

- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### reliability_of_llm_as_a_judge_systems.improvement_strategies
**Confidence:** medium

To support the proposed reliability-improvement techniques, the strongest evidence comes from sources that address how evaluators (humans or AI) agree or disagree on judgments and how to express or calibrate uncertainty. Direct evidence that inter-rater reliability can be achieved or approximated in AI-assisted evaluation suggests that AI systems can be designed to align with expert judgments or to operate with comparable reliability when properly calibrated. The discussion of inter-rater reliability and expert–AI agreement provides a foundation for approaches like aggregating scores with uncertainty weights or using multiple evaluation passes to stabilize decisions. The literature on uncertainty calibration and verbal uncertainty provides concrete methods that could be integrated into AI design decision processes, such as calibrating verbal uncertainty, modeling epistemic uncertainty, and adopting risk-aware or multi-path reasoning, which align with the goal of presenting multiple valid approaches with appropriate uncertainty. The idea of using confidence calibration in self-consistency, as well as linear-feature calibration of verbal uncertainty, supports practical techniques for expressing and regulating uncertainty in subjective judgments. Together, these excerpts offer a coherent set of strategies: (a) quantify and communicate uncertainty rather than assert absolute conclusions, (b) align AI judgments with human evaluators through reliability studies, (c) adopt multi-pass or ensemble-like approaches to detect disagreement zones, (d) present alternatives with tradeoffs and explicit confidence, and (e) use calibration techniques to prevent false certainty. While some items review general uncertainty or detection of hallucinations rather than explicit scoring schemes, they reinforce the broader practice of improving reliability through calibration, aggregation, and transparent reasoning. The most directly applicable components are the explicit discussions of inter-rater reliability and the development of calibration methods for uncertainty in subjective judgments, which directly map to the proposed techniques such as score smoothing with uncertainty weights, randomizing order to mitigate biases, and preferring robust pairwise comparisons when absolute scoring is unstable.

- [Evaluating clinical AI summaries with large language ...](https://www.nature.com/articles/s41746-025-02005-2)
  > by E Croxford · 2025 · Cited by 26 — We hypothesize that the LLM-as-a-Judge framework will achieve inter-rater reliability comparable to expert human evaluators, thus providing an efficient,
- [a comparative study of AI and human rater agreement and ...](https://link.springer.com/article/10.1007/s10639-026-13949-7)
  > by M Acar Güvendir · 2026 — Building on cognitive theories, this study investigates interrater reliability (IRR) and interrater agreement (IRA) between human raters and artificial int.
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Calibrating Verbal Uncertainty as a Linear Feature to ...](https://aclanthology.org/2025.emnlp-main.187.pdf)
  > by Z Ji · 2025 · Cited by 3 — We introduce Mechanistic Uncertainty Cali- bration (MUC), an inference-time interven- tion mechanism using VUFs to calibrate verbal uncertainty with semantic
- [A Survey on LLM-as-a-Judge](https://arxiv.org/html/2411.15594v4)
  > Feb 1, 2025 — This paper provides a comprehensive survey on LLM-as-a-Judge, offering a formal definition and a detailed classification of its use cases, while focusing on
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### key_strategies_for_subjective_reasoning.0
**Confidence:** medium

The most relevant content directly supports the core idea of modeling subjective judgments with explicit uncertainty and calibrated confidence. A study outlining uncertainty quantification and confidence calibration in evaluating language outputs, and suggesting methods to estimate uncertainty across multiple rounds or samples, provides a concrete basis for expressing and managing subjective uncertainty in design critique. A work focusing on overconfidence in LLMs highlights the risk of presenting opinions as facts and argues for maintaining appropriate uncertainty, which aligns with the proposed idea of avoiding false certainty and using calibrated uncertainty phrases. Additional material on uncertainty quantification and calibration in large-language models reinforces methods for generating multiple options and assessing their consistency, which supports presenting multiple design alternatives with tradeoffs rather than single recommendations. Resources discussing how to calibrate model confidence against historical human agreement data (such as inter-rater reliability studies) directly map to using historical human-to-human agreement data (e.g., UICrit) to anchor confidence levels. Inter-rater reliability discussions from design critique literature illustrate real-world disagreement among experts, clarifying the need for a framework that accommodates varying opinions and conveys uncertainty rather than forcing a single verdict. Additional items that analyze the distribution of ratings and the presence of disagreement provide context for when and why a system should switch from definitive judgments to exploratory options. Together, these excerpts collectively underpin a strategy where the AI outputs a distribution or range of plausible judgments, reports calibrated uncertainty, leverages historical agreement data for calibration, and employs a confidence gate to present alternative approaches when disagreement is high.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### key_strategies_for_subjective_reasoning.2
**Confidence:** medium

The strategy you describe—presenting multiple design alternatives with reasoning and trade-offs—maps to a broader requirement for AI systems to manage epistemic uncertainty and to support multi-path reasoning in subjective domains. Excerpts that discuss uncertainty estimation and confidence calibration show a clear emphasis on revealing the AI’s reasoning under uncertainty and avoiding false certainty. This aligns with the goal of offering several viable options with transparent justifications rather than a single definitive recommendation. Specifically, a piece on uncertainty quantification and confidence calibration reviews methods that estimate and communicate the reliability of model outputs, which is essential when enumerating multiple design options and their respective trade-offs. Another excerpt surveys approaches to quantify and calibrate uncertainty across multiple predictions or generations, supporting the idea of presenting a Pareto-like set of alternatives with clearly stated confidence and trade-offs. A further resource frames uncertainty estimation as a diagnostic tool for evaluating reasoning quality, reinforcing the practice of showing how different design directions fare under uncertainty rather than overcommitting to one conclusion. Additional pieces discuss detecting hallucinations and false certainty in LLMs, which underpins the caution needed when presenting several options to avoid presenting unfounded or misleading alternatives as if they were equally supported. Collectively, these excerpts provide conceptual and methodological backing for presenting multiple design alternatives with transparent reasoning and quantified trade-offs, rather than delivering a single recommendation, which is in line with the described field value. 

- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### reliability_of_llm_as_a_judge_systems.evaluation_metrics
**Confidence:** medium

The fine-grained field value centers on specific evaluation metrics used to gauge LLM judge performance, notably agreement-based metrics that measure how closely AI judgments align with human judgments, as well as considerations of bias and fairness in judgments. The most directly relevant material discusses interrater reliability and interrater agreement between AI and human evaluators, indicating that agreement-based evaluation is a core component of assessing judge performance. Another relevant source reports that interrater reliability with AI comparisons can be comparable to that of expert human evaluators, signaling that established human-evaluator metrics are being used or adapted to evaluate AI judgments. A broader survey on the LLM-as-a-Judge topic provides a high-level view of use cases and classifications for such judges, which supplements understanding of evaluation contexts but does not itself specify the concrete metrics. Taken together, these excerpts support the existence and use of agreement- and reliability-focused metrics as part of evaluating LLM judges, while not explicitly listing Cohen’s Kappa or Spearman correlation. This alignment suggests that standard IRR/IRA-type metrics are central to the evaluation framework, with attention to potential biases and fairness considerations as indicated by related discussions on evaluation design and robustness.

- [a comparative study of AI and human rater agreement and ...](https://link.springer.com/article/10.1007/s10639-026-13949-7)
  > by M Acar Güvendir · 2026 — Building on cognitive theories, this study investigates interrater reliability (IRR) and interrater agreement (IRA) between human raters and artificial int.
- [Evaluating clinical AI summaries with large language ...](https://www.nature.com/articles/s41746-025-02005-2)
  > by E Croxford · 2025 · Cited by 26 — We hypothesize that the LLM-as-a-Judge framework will achieve inter-rater reliability comparable to expert human evaluators, thus providing an efficient,
- [A Survey on LLM-as-a-Judge](https://arxiv.org/html/2411.15594v4)
  > Feb 1, 2025 — This paper provides a comprehensive survey on LLM-as-a-Judge, offering a formal definition and a detailed classification of its use cases, while focusing on

### uncertainty_quantification_techniques.1
**Confidence:** high

The most directly relevant excerpts describe a sampling-based approach that generates multiple responses or critiques and then assesses their internal consensus or consistency to gauge uncertainty or detect hallucinations. This aligns with the idea of Self-Consistency / Self-Check Methods where multiple runs (or branches of reasoning) are examined for agreement, and low consensus signals higher uncertainty or disagreement, triggering system behaviors such as raising an 'experts may disagree' notice or activating exploratory modes. Related content discusses using self-check or multi-sample strategies as diagnostic tools to detect when responses may be unreliable, and to guide uncertainty handling. Additional evidence emphasizes that uncertainty quantification is a diagnostic tool for reasoning quality in LLMs, and that there are concrete methods (e.g., entropy-based estimators) to identify subsets of hallucinations. There is also discussion of calibration in subjective evaluation and the role of inter-rater disagreement as an indicator of subjective uncertainty, which supports the broader notion that disagreement and calibrated uncertainty can be deliberately surfaced rather than suppressed. Collectively, these excerpts support the concept of adopting sampling-based self-consistency checks, uncertainty estimation, and explicit handling of disagreement in subjective design decisions, including when to present multiple options with reasoning rather than a single verdict and when to escalate or display uncertainty to users.

- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### reliability_of_llm_as_a_judge_systems.core_challenge
**Confidence:** high

The field value centers on making LLM-based judgments more reliable by ensuring consistency and fairness, and by avoiding excessive certainty when subjective judgments are involved. Excerpts that directly address inter-rater reliability or agreement with humans (and with AI) directly support the reliability concern. Excerpts discussing detecting hallucinations and whether AI can reliably distinguish factual content from errors further ground the reliability challenge. Excerpts about confidence calibration and explicit handling of uncertainty provide mechanisms to prevent overconfident or biased judgments. Finally, works that examine presenting multiple valid design approaches with tradeoffs align with a broader reliability goal: enabling robust decision-support rather than single blunt judgments. Specifically, inter-rater reliability between AI and human evaluators shows how agreement (or disagreement) informs reliability; studies on AI versus human rater agreement demonstrate where stability is achievable and where it is not. Works on recognizing and mitigating hallucinations, and on calibrating verbal uncertainty, illustrate concrete techniques to reduce bias and excessive confidence. Papers proposing confidence-aware self-consistency and uncertainty quantification provide methodological tools to maintain appropriate uncertainty in subjective domains while preserving usefulness. Collectively, these excerpts map the main difficulty to ensuring stable, fair judgments and avoiding undue overconfidence, which are core to improving reliability in LLM-as-a-Judge systems.

- [Evaluating clinical AI summaries with large language ...](https://www.nature.com/articles/s41746-025-02005-2)
  > by E Croxford · 2025 · Cited by 26 — We hypothesize that the LLM-as-a-Judge framework will achieve inter-rater reliability comparable to expert human evaluators, thus providing an efficient,
- [a comparative study of AI and human rater agreement and ...](https://link.springer.com/article/10.1007/s10639-026-13949-7)
  > by M Acar Güvendir · 2026 — Building on cognitive theories, this study investigates interrater reliability (IRR) and interrater agreement (IRA) between human raters and artificial int.
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Calibrating Verbal Uncertainty as a Linear Feature to ...](https://aclanthology.org/2025.emnlp-main.187.pdf)
  > by Z Ji · 2025 · Cited by 3 — We introduce Mechanistic Uncertainty Cali- bration (MUC), an inference-time interven- tion mechanism using VUFs to calibrate verbal uncertainty with semantic
- [A Survey on LLM-as-a-Judge](https://arxiv.org/html/2411.15594v4)
  > Feb 1, 2025 — This paper provides a comprehensive survey on LLM-as-a-Judge, offering a formal definition and a detailed classification of its use cases, while focusing on
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.

### distinguishing_objective_failures_vs_subjective_preferences.subjective_preference_indicators
**Confidence:** high

The target field value concerns how subjective preferences manifest in design decisions, specifically when multiple valid options exist and recommendations are framed as hypotheses rather than outright errors. The most relevant excerpt explicitly notes that design evaluation is inherently subjective and that disagreement among raters occurs, which directly supports the notion that subjective preferences are a recognized, measurable facet of design critique. It also provides quantitative evidence of disagreement (a fair inter-rater agreement score), illustrating how subjective judgments can diverge even among experts. The second excerpt reinforces this by describing how subjectivity is characterized in a study through an inter-rater reliability metric, showing that even with expertise, judgments can vary (slight agreement). Together, these excerpts support the idea that subjective preferences are recognized as plausible, variable judgments rather than strictly correct/incorrect evaluations, and that presenting multiple perspectives is a rational approach in design critique. The third excerpt discusses typography/readability as a standard design criterion, offering an example of an objective design measure that can be contrasted with subjective preferences; this helps delineate where subjective judgments may be appropriate versus where objective criteria govern assessments. Collectively, the excerpts align with the notion that subjective preference indicators should be identified as judgments about style or aesthetics with multiple valid solutions and that exemplar-based reasoning and counterfactuals can help communicate these alternatives.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### uicrit_dataset_findings.critique_category_taxonomy
**Confidence:** high

The most directly relevant content cites specific typography and readability concerns, which map to the 'text readability' aspect of the field value. For example, an excerpt notes that the expected standard is for text to be easy to read and to respect typography rules, and that the current design has text that is too small, with a suggestion to increase the font size. This directly aligns with the field value’s emphasis on text readability as a design critique dimension. Other highly relevant material discusses how design critiques are collected and the processes used to annotate UI critique data, including the presence of multiple annotators and established guidelines, which supports understanding how a taxonomy of critique topics could be formed and how subjective judgments are guided by standards. Additional excerpts address inter-rater reliability and disagreement in human critiques, highlighting that human evaluations in design are inherently subjective and that agreement levels vary, which is essential for calibrating how an AI system should express certainty vs uncertainty in subjective judgments. Supporting lines also describe the annotation workflow (providing critiques, region-level feedback, and grounding critiques in design guidelines) that helps explain how a topic taxonomy for critiques could be derived from structured human feedback. Collectively, these excerpts provide evidence for (a) how subjective design critiques are collected and scored, (b) concrete examples of readability-related issues that map to one of the taxonomy’s areas, and (c) the existence of measurable disagreement among experts that informs how to present multiple viable design perspectives with appropriate uncertainty.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > **Figure** **8:** **Illustration** **of** **the** **input** **and** **output** **for** **each** **modeling** **task.** **The** **left** **part** **of** **the** **fgure** **illustrates** **the** **generation** **of**
**comments** **for** **a** **specifc** **region** **in** **the** **screenshot** **(marked),** **and** **the** **right** **part** **shows** **the** **generation** **of** **critiques,** **corresponding**
**bounding** **boxes,** **and** **design** **quality** **ratings** **for** **the** **entire** **UI** **screen.** **These** **are** **realistic** **outputs** **from** **our** **best** **performing**
**few-shot** **setup** **for** **each** **task,** **which** **sometimes** **contain** **hallucinations**
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > **Generating**
**Feedback and**
**Ratings for**
**Entire Screen**
  > **Generating**
**Feedback for**
**a Region**
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > **Few** **Shot** **Setup**
**Avg.** **Comment**
**Total** **Number** **of**
**Quality** **Score**
**Comments**
8-shot,
0.44
11
Visual Similarity
8-shot,
0.42
10
Semantic Similarity
4-shot,
0.36
20
Visual Similarity
4-shot,
0.34
21
Semantic Similarity
8-shot, Random
0.31
9
**Table** **3:** **Results** **of** **the** **few-shot** **experiments** **for** **the** **top** **5** **per-**
**forming** **set-ups** **for** **the** **task** **of** **generating** **design** **comments**
**for** **a** **region** **of** **interest** **in** **the** **screenshot.** **The** **table** **shows** **the**
**average** **quality** **score** **per** **comment** **(from** **all** **3** **annotators),**
**as** **well** **as** **the** **total** **number** **of** **comments** **generated** **for** **the** **6**
**UIs** **for** **each** **setup.**

### uicrit_dataset_findings.dataset_overview
**Confidence:** high

The most relevant information directly states the core dataset facts: the UICrit dataset comprises a large collection of UI critiques with thousands of entries, specifically noting 983 screens and 3,059 critiques, provided by seven annotators. This directly supports the finegrained field value describing the dataset composition and the breadth of qualitative feedback. The accompanying note that seven designers contributed critiques and that data collection involved UI screenshots, critique bounding boxes, and design quality scores reinforces the context of how these valuations were gathered, aligning with the field value’s mention of numerical ratings for aesthetics, usability, and overall design quality. Additional excerpts describe the schematic data provided for each UI (examples of highly-rated, average-rated, and low-rated UIs) and the visualization of rating distributions, which further corroborate the existence of quantitative ratings and the multi-faceted evaluation of design quality. Also relevant are excerpts addressing inter-rater reliability and agreement (e.g., Fleiss Kappa scores) and the practical implications for dataset quality, which help contextualize the trustworthiness and interpretability of the reported metrics. Taken together, these excerpts cohesively support the specific claim about the UICrit dataset’s size, the number of critiques and screens, the annotator count, and the existence of numerical ratings across design aspects.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### key_strategies_for_subjective_reasoning.4
**Confidence:** medium

The target field value advocates using ensemble disagreement as a signal of epistemic uncertainty in subjective design decisions, prompting the AI to present multiple valid options or acknowledge that experts may disagree rather than asserting a single view. Content in the excerpts explicitly argues for shifting from accuracy-centric evaluation to uncertainty-aware approaches, highlighting that uncertainty estimation, calibration, and multi-sample or self-consistency analyses are important tools for handling subjective judgments. Several excerpts describe how uncertainty can be diagnosed or quantified in LLMs (e.g., through multiple generations, self-consistency checks, and confidence calibration), which directly supports the idea of using ensemble-derived disagreement as a usable signal. Other excerpts discuss inter-rater reliability and the presence of disagreement among human evaluators in design critique, illustrating that disagreement is a real and measurable phenomenon in subjective domains and reinforcing the need for multi-path reasoning rather than a single deterministic answer. Taken together, these sources provide a coherent basis for adopting ensemble-based epistemic uncertainty signals as a strategy for subjective design reasoning, including presenting multiple options and signaling potential disagreement to users.

- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### uncertainty_quantification_techniques.3
**Confidence:** medium

The field value specifies a statistical calibration technique: adjust the model’s confidence outputs by fitting calibration curves against historical data on human inter-rater reliability, so that a given internal confidence level corresponds to an actual human-validated acceptance rate. Excerpts that explicitly discuss confidence calibration and uncertainty quantification in LLM reasoning provide direct methodological context for this approach. One excerpt surveys uncertainty quantification and confidence calibration methods in large language models, outlining the use of multiple predictions and consistency analyses to gauge uncertainty, which directly informs how a calibration curve could be constructed. Another excerpt highlights uncertainty estimation as a diagnostic tool for evaluating and guiding the quality of reasoning in LLMs, which supports the notion of aligning model confidence with observed reliability rather than presenting generic certainty. Additional excerpts report on inter-rater reliability data in design critique contexts (e.g., UICrit studies), showing concrete human agreement levels and variability across critiques, which are essential inputs for calibrating model confidence to human performance. This empirical IRR evidence (e.g., fair to moderate agreement levels) provides the historical data required to fit and validate calibration curves. Other excerpts touch on detecting hallucinations and improving reliability via entropy-based or consistency-based approaches, which, while related to reliability, serve as supporting techniques rather than the core calibration curve methodology described. Taken together, these sources collectively support the feasibility and rationale for calibrating AI-provided confidence against human agreement metrics in subjective design tasks, and outline the kinds of methodological steps (uncertainty estimation, IRR-informed calibration, and validation) that would be involved in implementing the described approach.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).

### modeling_subjective_score_distributions.benefit
**Confidence:** high

The most relevant excerpt explicitly references visualizing rating distributions and a quantified agreement level among raters, which aligns with conveying both central tendency and dispersion in subjective assessments. It notes a fair agreement level and shows that ratings vary across conditions, implying dispersion that should be communicated to users. Another directly relevant excerpt presents histograms of numerical ratings for aesthetics, usability, and overall design quality, which provides concrete formats (distributions) to convey central tendency and dispersion. A third excerpt discusses inter-rater reliability with concrete low agreement figures, highlighting that disagreement exists even among experts, which supports the need to signal subjectivity and uncertainty rather than presenting a single-score verdict. A fourth excerpt concerns uncertainty calibration and reliability in creative evaluation, arguing that understanding and improving consistency among raters is beneficial for evaluation quality, which reinforces the idea of communicating subjective ambiguity. A fifth excerpt describes heuristic evaluation studies with human experts, reinforcing how subjective judgments vary and why reporting multiple viewpoints or options can be valuable, consistent with presenting alternatives with tradeoffs rather than a single answer.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.
  > by P Duan · 2024 · Cited by 127 — The Heuristic Evaluation Study with Human Experts consists of 12 design experts, who each looked for guideline violations in 6 UIs, and finishes with an
- [Evaluating Creative Output With Generative Artificial ...](https://onlinelibrary.wiley.com/doi/10.1111/caim.70007)
  > Aug 11, 2025 — Creativity research supports this explanation, showing that inter-rater reliability improves when evaluators share a consistent understanding of evaluation

### distinguishing_objective_failures_vs_subjective_preferences.formalization_approach
**Confidence:** medium

The central idea—distinguishing objective design violations from subjective preferences and guiding critiques through separate channels—is most strongly supported by statements acknowledging subjectivity in design critique and the presence of disagreement among evaluators. The discussions show that design evaluation is inherently subjective, with fair to moderate inter-rater agreement and notable disagreement on issues present in UI critiques. This aligns with needing a formalized separation between objective criteria (e.g., measurable accessibility or typographic readability issues) and subjective preferences (e.g., typography style choices, color warmth), suggesting a two-channel approach could improve reliability and clarity. Additional excerpts describe collecting large-scale critique data, annotator expertise, and methodology for evaluating critiques, which provide the practical backdrop for implementing a formal decision tree and channel routing in a real system. Citations about typography and accessibility concerns illustrate concrete objective dimensions that could be routed through the objective channel, while the presence of multiple critique conditions and varying agreement levels supports the idea of surfacing multiple high-quality alternatives as part of addressing subjective preferences via an ensemble-like or Pareto-frontier-informed approach. Taken together, these excerpts substantiate the need for a formalized distinction between objective violations and subjective recommendations and offer methodological scaffolding to implement a two-channel critique system, even if they do not spell out the exact decision-tree structure or Pareto-frontier mechanism in full detail.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### uicrit_dataset_findings.aesthetics_usability_correlation
**Confidence:** low

The target field value claims a high positive correlation between aesthetics and usability measured on UI designs, with a specific coefficient. The most directly related excerpt discusses typography, readability, and design quality as measurable aspects of aesthetics and usability in practice (recognizing that font size and typographic choices can affect readability and perceived usability). This makes it the strongest anchor among the excerpts for the general link between aesthetics and usability, even though it does not provide the exact correlation. Another excerpt addresses inter-rater reliability and the subjective nature of design critique, which is relevant to understanding that aesthetic judgments, and thus their relationship to usability, can vary across raters; this supports why a quantified correlation claim would be non-trivial and worthy of analysis, lending contextual support to the need for robust measurement. The other excerpts describe dataset construction, annotation processes, and examples of outputs, which establish methodological context for evaluating aesthetics and usability but do not contribute directly to the specific numeric correlation claim. Taken together, these excerpts provide partial, contextual support for the general claim (that aesthetics and usability are related and assessed in design critique) but do not supply the exact correlation value or a direct causal/quantitative analysis. 

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > **Annotator**
**Design** **Expertise**
**Yrs.** **of** **Exp.**
A1
UI/UX, Web
1
A2
UI/UX, Web
1
A3
UI/UX
1.5
A4
UI/UX, Graphic
1.8
A5
UI/UX, Graphic
2
A6
UI/UX, Visual, UX Research
1
A7
UI/UX, Graphic
16
**Table** **1:** **The** **areas** **of** **design** **expertise** **and** **number** **of** **years**
**of** **professional** **design** **experience** **for** **each** **of** **the** **7** **dataset**
**annotators.**
  > *3** **DATA** **COLLECTION**
The goal of this data collection was to obtain a large dataset consist-
ing of UI screenshots with corresponding design feedback, bound-
ing boxes of screen regions being critiqued, and design quality
ratings. We recruited seven annotators with prior professional de-
sign experience from a contracting company. Table 1 details the
areas of design expertise and number of years of professional design
experience for each annotator. This section describes the annotation
process
  > **3.1** **Method**
CLAY
Dataset
1000 UI
Screens
(Randomly
Selected)
7 Raters
Annotation
Interface
Established
Design
Guidelines
LLM
Automatic
Critique
_Manual critique,_
_Validation of automatic critique,_
_Design quality ratings_
UICrit
Dataset
_983 screens_
_3,059 critiques_
**Figure** **1:** **An** **illustration** **of** **the** **data** **collection** **process** **to**
**obtain** **design** **comments,** **bounding** **boxes** **of** **critiqued** **screen**
**regions,** **and** **design** **quality** **scores** **for** **1000** **UI** **screens.**
  > Figure 1 illustrates the annotation process. We implemented an
interface on top of an existing internal crowdsourcing infrastruc-
ture, which assigns annotation tasks to workers. Before starting the
data collection, we held an orientation session with the participants
where we went through instructions and expectations. To ensure
workers provide high quality design comments that are grounded
in existing best practices, we provided three well-established de-
sign guidelines for them to reference during the annotation: the
Nielsen Norman 10 Usability Heuristics [ 29 ], CrowdCrit Visual
Design Critiques [ 26 ], and the Apple Human Interface Guidelines
  > **Figure** **3:** **Examples** **of** **the** **data** **provided** **for** **each** **UI** **in** **the** **dataset.** **This** **fgure** **shows** **worker** **annotations** **for** **a** **highly-rated** **UI,**
**an** **average-rated** **UI,** **and** **a** **low-rated** **UI.**
  > **Figure** **4:** **Histograms** **showing** **the** **counts** **for** **each** **numerical**
**rating** **for** **aesthetics,** **usability,** **and** **overall** **design** **quality.**
  > **Generating**
**Feedback and**
**Ratings for**
**Entire Screen**
  > **Generating**
**Feedback for**
**a Region**
  > **Figure** **8:** **Illustration** **of** **the** **input** **and** **output** **for** **each** **modeling** **task.** **The** **left** **part** **of** **the** **fgure** **illustrates** **the** **generation** **of**
**comments** **for** **a** **specifc** **region** **in** **the** **screenshot** **(marked),** **and** **the** **right** **part** **shows** **the** **generation** **of** **critiques,** **corresponding**
**bounding** **boxes,** **and** **design** **quality** **ratings** **for** **the** **entire** **UI** **screen.** **These** **are** **realistic** **outputs** **from** **our** **best** **performing**
**few-shot** **setup** **for** **each** **task,** **which** **sometimes** **contain** **hallucinations**
  > **Few** **Shot** **Setup**
**Avg.** **Comment**
**Total** **Number** **of**
**Quality** **Score**
**Comments**
8-shot,
0.44
11
Visual Similarity
8-shot,
0.42
10
Semantic Similarity
4-shot,
0.36
20
Visual Similarity
4-shot,
0.34
21
Semantic Similarity
8-shot, Random
0.31
9
**Table** **3:** **Results** **of** **the** **few-shot** **experiments** **for** **the** **top** **5** **per-**
**forming** **set-ups** **for** **the** **task** **of** **generating** **design** **comments**
**for** **a** **region** **of** **interest** **in** **the** **screenshot.** **The** **table** **shows** **the**
**average** **quality** **score** **per** **comment** **(from** **all** **3** **annotators),**
**as** **well** **as** **the** **total** **number** **of** **comments** **generated** **for** **the** **6**
**UIs** **for** **each** **setup.**
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..

### uncertainty_quantification_techniques.2
**Confidence:** high

The most relevant content directly tackles uncertainty estimation and calibration in large language models and design evaluation, aligning with the idea of moving from a single score to a distribution of scores. For example, one excerpt discusses entropy-based uncertainty estimators for LLMs to detect hallucinations, which provides a concrete technique that relates to measuring and communicating uncertainty. Another excerpt presents semantic entropy probes as a cheap, reliable method for uncertainty quantification in LLMs, which again supports the notion of quantifying a spread or distribution rather than outputting a single value. A further excerpt surveys uncertainty quantification and confidence calibration, highlighting multi-prediction or multi-round generation methods to estimate uncertainty via consistency across predictions, directly supporting the idea of distributional predictions for subjective judgments. Additional excerpts discuss uncertainty quantification in general and the role of calibration in subjective tasks, which underpins the rationale for expressing uncertainty rather than presenting a definitive single answer. There is also content showing how inter-rater reliability and disagreement in design critique are analyzed, which informs how to communicate and model epistemic uncertainty when human judgments diverge. Finally, ancillary discussions on SelfCheckGPT and other hallucination-detection strategies offer context for detecting and managing false certainty, which complements the idea of presenting multiple plausible options with associated uncertainty rather than a single verdict.

- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### key_strategies_for_subjective_reasoning.5
**Confidence:** high

The fine-grained field value centers on avoiding false certainty through calibrated language and interaction, including structured uncertainty, presenting multiple valid options, and maintaining human-in-the-loop checks for high-stakes subjective decisions. Excerpts that explicitly discuss calibration and uncertainty quantification provide direct support for these requirements, including methods that quantify and communicate uncertainty, use multiple predictions or evaluation passes to assess consistency, and guidelines for when to escalate to human oversight. The cited material on confidence calibration in large-language models and techniques for detecting hallucinations informs how to phrase certainty and when to withhold definitive claims. Phrases that describe presenting options with trade-offs rather than single recommendations align with the requested decision-support approach. Additional excerpts on inter-rater reliability and disagreement in design critique illustrate the practical reality of subjective judgments, underscoring the need for calibrated communication rather than asserting a single ‘correct’ design choice. Collectively, these sources support a framework where the AI expresses calibrated certainty, provides rationale and evidence, presents multiple valid alternatives with tradeoffs, and employs human-in-the-loop checkpoints for high-stakes subjective decisions. Specific connections include: using rounds of generation to gauge uncertainty and consistency across possibilities; employing calibration techniques to map probability to language (e.g., Likely 60-80%); exposing known cognitive biases to users; and using epistemic uncertainty estimation to signal when expert disagreement is expected. The inter-rater reliability discussions contextualize why the system should avoid overconfident single judgments in subjective design critique and instead emphasize transparent uncertainty and rationale. The most directly relevant elements are about calibrated uncertainty, multi-path reasoning, and mechanisms to avoid false certainty, followed by contextual evidence from subjective design evaluation reliability.


- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### inter_rater_reliability_in_design.overall_finding
**Confidence:** high

The core claim is that there is nontrivial disagreement even among trained expert designers when evaluating user interfaces, with agreement varying by the type of design issue. This is directly supported by explicit statements that inter-rater reliability is fair for rating the validity of critiques and moderate for ranking different design options. The excerpts also note that design evaluation is inherently subjective, contributing to low agreement on subjective aspects like helpfulness or accuracy of suggestions. Together, these excerpts establish that expert designers do not fully converge on judgments, and the strength of agreement depends on the evaluation task (validity ratings, rankings, subjective qualities). The most direct evidence cites quantified agreement levels (e.g., kappa-like values around 0.3 for fair agreement, and around 0.55 for ranking with moderate agreement), while additional passages emphasize subjectivity as a fundamental aspect of design critique and heuristic evaluations.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### distinguishing_objective_failures_vs_subjective_preferences.objective_failure_criteria
**Confidence:** medium

The selected excerpts collectively illuminate how design critique and evaluation grapple with objectivity vs subjectivity. One excerpt explicitly notes that design evaluation is inherently subjective and leads to disagreement, supported by a Fleiss Kappa inter-rater reliability score of 0.29, implying only fair agreement. This demonstrates that even when attempting to formalize criteria, human judgments diverge, highlighting the need for clear objective failure criteria that can be consistently detected and verified. Another excerpt quantifies subjectivity further by reporting low agreement for accuracy and helpfulness ratings (Fleiss’ Kappa around 0.11–0.10), underscoring that even seemingly measurable subjective attributes can lack reliable consensus among expert raters. A third excerpt provides a concrete design issue example — font size readability — which is framed as a standard-type constraint (typography readability) and implies a potential objective criterion (e.g., sufficient font size) that could be evaluated with thresholds or metrics, contrasting with purely subjective taste (e.g., color warmth). Taken together, these excerpts support the notion that objective failure criteria should be defined and backed by quantitative evidence (as suggested by the reliability metrics and a concrete typography example), while acknowledging the persistent role of subjectivity in design critique and the need for multi-path reasoning and uncertainty when multiple valid approaches exist. The most relevant content thus centers on the existence of objective versus subjective criteria, how reliability for such judgments is measured (or appears weak), and how concrete examples (like typography size) can anchor objective evaluation in measurable terms.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > The expected
standard is that
the text should be
easy to read and
respect the rules
of typography. In
the current
design, the text is
difficult to read
because it is too
small. To fix this,
the font size
should be
increased.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### uncertainty_quantification_techniques.0.methodology_type
**Confidence:** high

The requested fine-grained field value specifies methodology types for uncertainty quantification in subjective tasks, particularly entropy-based approaches and sampling-based techniques. The most directly relevant excerpts explicitly discuss entropy-based uncertainty quantification and sampling-based methods in LLMs and related evaluation settings. For example, one excerpt introduces semantic entropy probes as a cheap and reliable method for uncertainty quantification in Large Language Models, which directly supports an entropy-based methodology. Another excerpt presents entropy-based uncertainty estimators for detecting a subset of hallucinations, aligning with entropy-based or sampling-based inference for uncertainty in model outputs. A broader survey or compilation of uncertainty quantification in large language models further reinforces the role of assessing and calibrating uncertainty through multiple predictions or probabilistic reasoning. Additional excerpts discuss surrounding practices such as confidence calibration, self-consistency with multiple generations, and epistemic uncertainty estimation in evaluation, which all pertain to how to reason under uncertainty and present multiple plausible outcomes rather than a single deterministic answer. Excerpts touching design critique datasets and inter-rater reliability provide context about subjectivity in design evaluation, illustrating why uncertainty quantification is important in subjective domains, though they are somewhat less central to the explicit entropy- or sampling-based methodology focus. Taken together, these excerpts collectively map onto the requested fine-grained field value by detailing entropy-based and sampling-based approaches, calibration, and multi-path reasoning as strategies to handle subjective design decisions and epistemic uncertainty in evaluation results.

- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..

### inter_rater_reliability_in_design.low_agreement_dimensions
**Confidence:** high

The field value describes that agreement among experts declines for subjective or stylistic design aspects, where multiple valid solutions can exist, and it enumerates several nuanced dimensions (typography, color warmth, visual hierarchy, and emotional/brand tone). The excerpts provide concrete evidence of how subjective design critique is and how agreement among raters tends to be only fair or low. For instance, one passage notes that design evaluation is inherently subjective and that inter-rater reliability was fair (Fleiss’ Kappa around 0.29), indicating limited consensus among designers. Another excerpt reports comparable or similar findings (Fleiss’ Kappa around 0.30), reinforcing that expert disagreement is common in design critique. Additional details point to objective vs. subjective judgments in related studies (e.g., accuracy and helpfulness ratings showing only slight to fair agreement), which aligns with the idea that some design guidance can be contested or interpreted differently by experts. Taken together, these pieces support the claim that expert agreement is typically lower for subjective and stylistic aspects, and that specific nuanced areas like typography choices, warmth of color palettes, and the emotional or brand register are prime candidates for disagreement, while more objective concerns (like accessibility or layout violations) may show higher agreement in some cases. The field value’s assertion about perceived usefulness and accuracy of design suggestions also fits with reports that subjective judgments vary and consensus is not guaranteed across evaluators.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### inter_rater_reliability_in_design.high_agreement_dimensions
**Confidence:** medium

The field value asserts that expert agreement is higher for objective, verifiable design issues (e.g., accessibility, legibility, layout integrity) and those map to established rules. The excerpts provide direct measurements of inter-rater reliability in design critique studies, showing Fleiss’ Kappa values around 0.29–0.31, which are characterized as fair agreement rather than high consensus. This suggests that even for design critiques that aim to be rule-based or objective (e.g., accessibility concerns, contrast, layout issues), the observed agreement among experts is only fair, not high. One excerpt explicitly notes that design evaluation is inherently subjective, implying limited high-consensus on many judgments. Another excerpt presents similar reliability scores and confirms that reliability is moderate rather than strong. Together, these pieces support the interpretation that high agreement on objective, rule-bound dimensions is not strongly evidenced in the cited studies, and rather, agreement tends to be fair. The remaining excerpts provide additional context about subjectivity and annotation conditions, reinforcing that expert disagreement is common and that reliability is not consistently high across design critique tasks.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### key_strategies_for_subjective_reasoning.3.application
**Confidence:** medium

The target field value concerns structuring and classifying design feedback. The most directly relevant material defines what constitutes a valid critique (it must be accurate and helpful) and describes a rating framework used by human annotators to judge the quality of design feedback. This establishes concrete criteria for how feedback should be organized and evaluated, which directly supports a structured approach to feedback curation. Additional excerpts discuss the observed inter-rater reliability in critique ratings, highlighting that agreement among experts is often only fair and that critique distributions and preferences vary across conditions. This underscores the importance of explicitly modeling disagreement and providing structured, multi-perspective feedback rather than a single verdict. Together, these excerpts support a system that (a) labels critiques by their usefulness and factual accuracy, (b) documents the reliability of the critiques via inter-rater metrics, and (c) presents multiple critique perspectives or tradeoffs to address subjective design decisions, rather than forcing a single normative recommendation.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### key_strategies_for_subjective_reasoning.3.description
**Confidence:** medium

The target field value describes a formal design methodology that (a) clearly separates objective errors (measurable standards) from subjective preferences (hypotheses or alternative approaches), (b) uses a two-channel schema to route critiques based on reference to measurable standards or presence of multiple valid alternatives, and (c) implies presenting a decision tree guiding design critiques. The most directly relevant content is evidence-oriented and risk-aware in its approach to judgment: it advocates confidence-driven, risk-aware evaluation of subjective judgments and emphasizes moving away from single judgments toward calibrated uncertainty and multi-path reasoning. Phrases that discuss detecting when LLM outputs exhibit uncertainty or overconfidence, and the need to calibrate confidence in subjective domains, directly support the notion of distinguishing between objective criteria and subjective opinions and of structuring reasoning with uncertainty rather than asserting certainty. Additional excerpts discuss the reality of inter-rater disagreement and the need for reliable evaluation in design critique, which underpins the two-channel idea: some aspects are objectively verifiable (e.g., accessibility, contrast) while others are inherently subjective (e.g., typography choices, color palettes, emotional tone). Together, these excerpts provide evidence that a system could implement a two-channel approach by separating verifiable design violations from subjective preferences and by presenting multiple well-reasoned alternatives when consensus is lacking. The excerpts also illustrate methods to quantify and communicate uncertainty (e.g., multi-round generation to assess consistency, new strategies to detect hallucinations and false certainty), which supports routing critiques and decision-making via a structured, uncertainty-aware framework rather than definitive, single-correct judgments.

- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### uncertainty_quantification_techniques.0.technique_name
**Confidence:** high

The target field value refers to a specific semantic approach for quantifying uncertainty in AI outputs used for subjective or design decisions. The most directly relevant excerpt introduces semantic entropy probes as a cheap and reliable method for uncertainty quantification in LLMs, which directly aligns with Semantic Entropy as a technique. The next closely related excerpt discusses entropy-based uncertainty estimators for detecting hallucinations in LLMs, which complements the idea of quantifying and communicating uncertainty in subjective tasks. A broader, yet pertinent, excerpt surveys uncertainty quantification methods for large language models, including approaches that estimate and analyze uncertainty across multiple passes or predictions, which supports the notion of semantic or entropy-based uncertainty handling in creative/design contexts. Additional relevance comes from discussions of calibration and confidence in the presence of uncertainty, including methods that aim to avoid false certainty and to maintain appropriate uncertainty in subjective domains, which underpins how semantic entropy/density techniques could be integrated into practice. Finally, a SelfCheckGPT-style sampling approach is relevant as an empirical method to detect when models are uncertain or indefinitely confident, reinforcing the broader strategy of using multiple samples to assess design decisions under uncertainty. Taken together, these excerpts collectively support the idea that semantic entropy-based methods are a viable, practical family of techniques for expressing and managing uncertainty in subjective design judgments and evaluations.

- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### key_strategies_for_subjective_reasoning.1.application
**Confidence:** high

The field value centers on understanding and contextualizing expert disagreement. The most directly relevant excerpts report explicit disagreement and reliability measures in design critique data: they note that critiques are inherently subjective and that inter-rater reliability scores (Fleiss’ Kappa around 0.29–0.31) indicate fair agreement, highlighting both variability among experts and the presence of disagreement as a measurable phenomenon. This directly supports the idea of understanding disagreement among experts and sets a quantitative context for interpreting when experts agree or diverge. Additional excerpts describe how this disagreement arises in design evaluation, including subjective aspects of critique and the observation that human critiques varied in validity and specificity, reinforcing the need to contextualize expert disagreement rather than force a single consensus. Collectively, these sources provide both the phenomenon (disagreement among experts in design critique) and the metrics and context necessary to reason about it, aligning with the goal of contextualizing expert disagreement in subjective design evaluation and decision-making processes.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### key_strategies_for_subjective_reasoning.3.strategy_name
**Confidence:** medium

The requested field value aims to formalize how to separate objective design failures from subjective preferences. Excerpts from the UI Crit studies explicitly acknowledge that design evaluation is inherently subjective and that inter-rater reliability is only fair, indicating substantial disagreement among designers even on what constitutes a valid critique. This supports the need for a formal distinction by providing empirical evidence of subjective variance and disagreement, which any formalization would need to account for. Other excerpts reinforce the broader theme by detailing how uncertainty and multiple perspectives are handled in design evaluation, demonstrating practical approaches to reason about subjective judgments and disagreements rather than presenting single, definitive judgments. Taken together, these sources underpin a structured approach to distinguish objective issues (e.g., hierarchy problems, accessibility) from subjective design preferences (e.g., typography, color choices) and to formalize methods for managing and communicating those distinctions.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### uncertainty_quantification_techniques.1.methodology_type
**Confidence:** high

The field value indicates a sampling-based methodology for uncertainty quantification. The most directly supportive excerpt describes a sampling-based approach called SelfCheckGPT that detects whether LLM responses are hallucinated or factual, which directly aligns with a sampling-based strategy for evaluating and calibrating uncertainty in model outputs. Additional references discuss uncertainty estimation as a diagnostic tool for reasoning in LLMs and the use of multiple rounds or generations to assess uncertainty and consistency, which are compatible with or complementary to sampling-based methodology. Other excerpts frame entropy-based uncertainty estimators and multi-round generation as techniques for uncertainty quantification and calibration, further underscoring that a sampling-oriented approach is a recognized, viable pathway within this research space. Collectively, these sources support the notion that sampling-based methods are central to producing and evaluating uncertainty in subjective or design-related tasks, particularly in contexts where multiple alternative reasoning paths or generations are explored to form robust, uncertain-but-informative outputs.

- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### key_strategies_for_subjective_reasoning.0.strategy_name
**Confidence:** high

The target fine-grained field value is a specific strategy name that captures how AI systems calibrate confidence in subjective or aesthetic judgments. The most directly relevant material explicitly discusses uncertainty quantification, calibration, and confidence-driven approaches to evaluation in subjective or creative contexts. One excerpt describes multiple rounds generation methods to estimate and analyze uncertainty in predictions, which underpins calibrated confidence when judgments are subjective. Another excerpt advocates shifting from purely accuracy-centric evaluation to confidence-driven, risk-aware judging, which aligns with the idea of explicit confidence calibration in subjective domains. A third excerpt frames uncertainty estimation as a diagnostic tool for reasoning quality in subjective contexts, reinforcing the utility of calibrated confidence. Together, these pieces directly support the notion and utility of Confidence Calibration for Subjective/Aesthetic Judgment as a deliberate strategy. Additional excerpts focus on inter-rater reliability and human critique quality, illustrating the variability and disagreement that calibration must account for in design critique. They provide necessary context for why a robust calibration strategy is needed in subjective domains but are somewhat less directly tied to the exact strategy name. Collectively, the excerpts map a landscape where calibrated confidence and multi-path reasoning mitigate false certainty and better express epistemic humility in subjective design decisions.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### inter_rater_reliability_in_design.quantitative_finding
**Confidence:** high

The cited sources provide explicit numeric estimates of inter-rater reliability that directly support the requested quantitative finding. For example, one source reports a Fleiss' Kappa inter-rater agreement score of 0.31, indicating fair agreement for critique evaluations, which directly aligns with the notion of modest but non-trivial expert concordance in design critique. Another excerpt states a Fleiss' Kappa of 0.30, also described as fair agreement, reinforcing the general pattern of only moderate concordance among expert judgments in design critiques. A closely related excerpt repeats a nearly identical score (0.29) and likewise interprets it as fair agreement, reinforcing the consistency of low-to-moderate agreement levels across design evaluation tasks. In contrast, a separate study focusing on heuristic evaluation reports much lower agreement on subjective qualities, with a Fleiss' Kappa of 0.112 for accuracy and 0.100 for helpfulness, indicating only slight agreement. These pieces together illustrate both the typical range for objective critique agreement (roughly 0.29–0.31, fair) and the much lower agreement observed for subjective quality judgments, which is important for interpreting overall reliability in design evaluation. The combination of these scores—moderate agreement in some design critique contexts and slight agreement in subjective quality judgments—maps to a nuanced picture where reliability varies by task type and evaluation dimension.

- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Generating Automatic Feedback on UI Mockups with Large ...](https://dl.acm.org/doi/full/10.1145/3613904.3642782)
  > he subjective nature of heuristic evaluation was already highlighted by Nielsen  [40 ]. To characterize subjectivity in our study, we computed inter-rater reliability using Fleiss’ Kappa  [13 ]. Accuracy ratings had an agreement score of 0.112 and helpfulness ratings had a score of 0.100, which suggests only slight agreement.

### key_strategies_for_subjective_reasoning.2.strategy_name
**Confidence:** low

The core field value centers on a strategy to present multiple design alternatives with their trade-offs, a practice that supports subjective decision-making in design by offering options rather than a single prescription. Among the excerpts, the most closely aligned content relates to uncertainty quantification, calibration across multiple predictions, and multi-round generation approaches that reveal different possible outcomes or interpretations. These sources discuss how to manage and express uncertainty, which underpins presenting alternative approaches with transparent trade-offs rather than asserting a single best answer. They also touch on detecting disagreement and using ensemble or multi-pass methods to surface diverse perspectives, which can motivate or justify presenting multiple viable design paths with corresponding trade-offs. While none of the excerpts explicitly describe a formal method for listing and weighing design alternatives, they collectively provide methodological primitives (uncertainty expression, multi-sample comparisons, and disagreement signaling) that support a strategy of offering multiple design paths with trade-offs and transparent reasoning. The cited works on confidence calibration and risk-aware decision making further reinforce the concept of laying out alternatives with explicit uncertainty rather than overconfident single recommendations. Overall, these excerpts lay the groundwork and rationale for multi-alternative, trade-off–centered reasoning in subjective design contexts, even though a direct, explicit description of the strategy name is not found in the provided texts. 

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### uncertainty_quantification_techniques.0.description
**Confidence:** high

The target description characterizes an uncertainty estimation technique that relies on diversity across multiple generated responses or rationales to reveal epistemic uncertainty tied to subjective taste. The most directly relevant excerpt states that multiple rounds of generation are used to estimate uncertainty by producing several predictions from the LLMs and then evaluating their consistency or divergence, which directly matches the described technique of measuring diversity across outputs. An additional excerpt discusses entropy-based uncertainty estimators for detecting hallucinations, which aligns with the broader idea of quantifying uncertainty through the variability of outputs and their meanings. A third excerpt explicitly mentions semantic entropy probes as a cheap and reliable method for uncertainty quantification, reinforcing the idea that dispersion or variety among outputs can signal uncertainty. A fourth excerpt covers a confidence-calibration approach that uses multiple predictions to analyze uncertainty, further supporting the core concept of leveraging multiple samples to assess subjective uncertainty. Collectively, these excerpts support the idea of using multi-sample generation and dispersion measures as a mechanism to quantify epistemic uncertainty in subjective judgments and design-related content.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how

### key_strategies_for_subjective_reasoning.0.description
**Confidence:** high

The field value advocates for modeling a full distribution of scores rather than a single score, with accompanying variance, entropy, and calibrated verbal uncertainty. It also emphasizes estimating uncertainty at a semantic level by evaluating diversity across multiple generated options, calibrating model confidence against historical human-to-human agreement data (specifically UICrit), and employing a confidence gate to provide exploratory options when uncertainty is high. Excerpts describing inter-rater reliability in design critique (UICrit) directly support the use of historical human agreement data to calibrate AI confidence and to justify offering multiple, diverse design judgments rather than a single verdict. The reported Fleiss’s Kappa values illustrate the inherent subjectivity and moderate agreement among human evaluators, which is precisely the kind of empirical baseline the field value calls to leverage for calibration. Additional excerpts focus on uncertainty quantification methods, including multi-round generation, uncertainty estimation as a diagnostic tool for reasoning, and confidence-aware self-consistency approaches. These sources collectively back the proposed strategy of presenting multiple candidate judgments with quantified uncertainty (variance/entropy) and using structured uncertainty measures to gate when to present exploratory options rather than definitive judgments. The combination of empirical human-reliability data (UICrit) with methodological work on uncertainty quantification provides a coherent foundation for implementing a distribution-based, calibrated, and multi-path reasoning approach in subjective design evaluation.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-

### uncertainty_quantification_techniques.1.technique_name
**Confidence:** high

The requested field value refers to methods that enforce or leverage self-consistency and self-checking in AI reasoning, particularly in subjective or design-oriented tasks. The most directly relevant excerpt introduces a sampling-based approach designed to detect when model responses are hallucinated or factual, which aligns with a self-check mechanism that validates outputs. Another highly relevant excerpt discusses confidence-aware self-consistency as a diagnostic for reasoning quality and guidance in LLMs, which directly maps to adopting self-check routines to improve reliability. A separate excerpt surveys uncertainty quantification and confidence calibration in large language models, including multi-round generation and consistency checks across predictions, which provides concrete techniques for maintaining appropriate uncertainty and validating reasoning paths. Additional excerpts cover methods to detect hallucinations through entropy-based estimates and cheap uncertainty probes, both of which support the goal of identifying and mitigating overconfident or incorrect conclusions. Extensions into design critique reliability and inter-rater agreement, while not core self-consistency techniques, illustrate practical implications of subjective evaluation and when disagreement arises, enriching the context for applying self-consistency in subjective design domains. Collectively, these excerpts corroborate strategies that combine multi-path reasoning, uncertainty estimation, and self-check mechanisms to avoid false certainty while offering multiple valid design approaches or interpretations.

- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### key_strategies_for_subjective_reasoning.1.strategy_name
**Confidence:** high

The fine-grained field value proposes leveraging inter-rater reliability data to frame disagreement in subjective design decisions. Excerpts that report quantitative inter-rater reliability (Fleiss' Kappa around 0.29–0.31) demonstrate that expert assessments in design critique are only moderately aligned, which directly supports the idea of using reliability metrics as a basis to present disagreement as a structured signal rather than a single verdict. The findings that agreement is fair rather than strong illustrate the need to acknowledge subjectivity, present multiple viewpoints, and emphasize areas where agreement is higher (and where it is lower). The excerpts also show that even with some level of agreement, there is substantial variation in critiques and rankings, underscoring the value of framing disagreement explicitly in design evaluation outputs. Taken together, these pieces of evidence support a strategy where an AI communicates uncertainty and multiple valid perspectives by referencing observed reliability levels, rather than presenting a singular authoritative recommendation.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### uncertainty_quantification_techniques.1.primary_use_case
**Confidence:** medium

The most directly relevant material discusses methods for detecting whether LLM outputs are hallucinations or unfounded (e.g., sampling-based checks, entropy-based uncertainty estimators, and semantic entropy probes). These sources collectively illustrate how to identify contradictions or unreliable lines of reasoning within outputs, which aligns with the field’s goal of detecting internal inconsistencies and epistemic uncertainty. Additional excerpts cover confidence calibration and multi-round reasoning strategies, which support presenting or managing uncertainty in subjective judgments, including when to escalate or present alternative paths rather than committing to a single “correct” answer. There is also evidence on inter-rater disagreement in design critique, highlighting that experts often disagree on subjective design issues, which motivates explicit signaling of disagreement zones (e.g., “experts may disagree”) and exploratory modes. Collectively, these excerpts support a system design that (a) screens for internal contradictions or inconsistency as a hallucination signal, (b) recognizes and communicates where expert disagreement is likely, and (c) triggers appropriate actions such as presenting tradeoffs or escalating exploration when uncertainty is high. The strongest support comes from explicit discussions of hallucination detection techniques and uncertainty estimators, followed by work on confidence calibration and multi-round reasoning, then on inter-rater disagreement in design critique as a proxy for areas with high epistemic uncertainty.


- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### uncertainty_quantification_techniques.0.primary_use_case
**Confidence:** high

The fine-grained field value describes a capability for detecting epistemic uncertainty and subjective ambiguity, and for triggering alternative, multi-path responses (presenting options) rather than asserting a single fact. The most directly supportive content describes concrete uncertainty techniques: semantic entropy probes as a cheap uncertainty quantification method for LLMs, and entropy-based uncertainty estimators to detect hallucinations, which align with identifying epistemic uncertainty and avoiding false certainty. SelfCheckGPT proposes a sampling-based approach to detect hallucinations, which directly supports detecting when responses are not factually grounded. Broad discussions of uncertainty estimation across multiple predictions and rounds, and using inconsistency or self-consistency as a diagnostic tool, further support how an AI can express confidence or uncertainty in subjective judgments and guide the user toward multiple options or trade-offs. Analyses of inter-rater disagreement and design critique reliability provide relevant context for subjectivity in evaluation (i.e., how much agreement exists among experts), which informs where uncertainty should be expected and how to present alternatives when disagreement is high. Finally, formalizing the distinction between wrong answers and personal preferences, and leveraging ensemble disagreement as a signal to identify when a decision lies in a zone of reasonable expert disagreement, directly ties to presenting multiple viable approaches and signaling uncertainty rather than committing to a single design decision. Taken together, these excerpts support the idea that an AI system should quantify uncertainty, detect hallucinations, gauge subjective agreement, and present multiple design options with tradeoffs when appropriate, while avoiding overconfident assertions in subjective domains.

- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.

### key_strategies_for_subjective_reasoning.4.strategy_name
**Confidence:** medium

The field value describes using ensemble disagreement as an epistemic uncertainty signal in subjective design decisions. Excerpts that discuss generating multiple predictions or rounds to estimate uncertainty directly support this idea, showing that diversity of outputs (from multiple samples or generations) can be analyzed for consistency and uncertainty in subjective tasks. For example, methods that generate several predictions and assess their consistency provide a concrete mechanism for capturing epistemic uncertainty when judgments are subjective. Publications advocating a shift to confidence-driven, risk-aware evaluation emphasize expressing certainty and uncertainty in subjective judgments, aligning with the goal of signaling epistemic stance rather than delivering a single definite answer. Research on uncertainty quantification and confidence calibration documents that uncertainty can be detected or quantified through multiple samples or rounds, which directly ties to using ensemble disagreement as a signal. Papers on confidence-aware and self-consistency approaches illustrate practical diagnostic tools that guide when and how to present reasoning under uncertainty, suggesting that disagreement among samples can inform the user about the reliability of a design decision. Inter-rater reliability studies in design critique acknowledge that expert agreement is not perfect and that disagreement can be informative about design dimensions, reinforcing the value of signaling uncertainty rather than forcing a single verdict. Collectively, these sources provide a coherent foundation for treating ensemble disagreement as a meaningful epistemic signal in subjective design evaluation and for presenting multi-path reasoning with calibrated uncertainty. The discussion of reducing false certainty and maintaining appropriate uncertainty further supports the practical use of ensemble disagreements to communicate nuance in subjective design judgments.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### key_strategies_for_subjective_reasoning.4.application
**Confidence:** high

The finegrained field value concerns epistemic uncertainty estimation in subjective design reasoning. The most directly relevant material discusses uncertainty quantification and confidence calibration in AI systems, including approaches that estimate and utilize uncertainty to guide reasoning and detect non-factual or Hallucinated content. For example, sources describe using multiple predictions, analyzing their consistency to gauge uncertainty, and the broader push toward confidence-driven, risk-aware decision making in LLMs. Related material also covers calibration of confidence in creative evaluation and subjective judgments, which aligns with presenting uncertainty in subjective design decisions. Additional excerpts address how to detect false certainty and maintain appropriate uncertainty without appearing indecisive, which directly informs epistemic uncertainty in subjective contexts. Finally, empirical design-evaluation studies and inter-rater reliability data illustrate that disagreement is inherent in subjective design critique, suggesting practical implications for signaling uncertainty and presenting multiple viable options rather than a single verdict.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### key_strategies_for_subjective_reasoning.2.application
**Confidence:** high

To support decision support and multi-path reasoning in subjective design contexts, it is essential to ground the AI's outputs in calibrated uncertainty and multiple-option reasoning. One excerpt argues for generating multiple predictions from LLMs and analyzing their consistency to estimate uncertainty, which directly enables presenting designers with several viable paths rather than a single conclusion. Another excerpt frames uncertainty estimation as a core diagnostic tool for guiding the quality of reasoning, which underpins any robust multi-path rationale by signaling where confidence is warranted. A third excerpt advocates shifting from a sole-accuracy focus to confidence-driven, risk-aware evaluation, emphasizing the need for systems that acknowledge and communicate uncertainty when proposing design approaches. A fourth excerpt discusses techniques for avoiding false certainty and maintaining appropriate uncertainty in subjective domains, which is crucial for credible tradeoff analyses rather than dogmatic recommendations. A fifth excerpt, while focused on detecting hallucinations via SelfCheckGPT, nonetheless contributes to the broader goal of reliable, uncertainty-aware evaluation by highlighting the importance of validating outputs before presenting them as options. Together, these excerpts collectively support a framework where an AI can reason through subjective design decisions, surface multiple reasonable alternatives, quantify and communicate uncertainty, and provide tradeoff analyses rather than single-point recommendations.

- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.

### key_strategies_for_subjective_reasoning.4.description
**Confidence:** high

The core idea is that uncertainty should be acknowledged and managed through multiple assessment passes and by signaling when there is disagreement among sources or experts. A passage describing uncertainty estimation as an essential diagnostic tool for guiding the quality of reasoning in LLMs directly supports the notion that ensemble or multi-pass reasoning helps identify when a topic is ambiguous and when multiple valid approaches exist. A related excerpt discusses multiple rounds of generation to estimate uncertainty by examining the consistency across predictions, which aligns with using an ensemble or multi-pass strategy to gauge consensus. Another source advocates shifting toward confidence-driven, risk-aware evaluation, which underpins presenting uncertainty rather than asserting a single claim. Empirical design-critique work provides concrete evidence that expert disagreement exists in subjective domains (e.g., inter-rater reliability metrics around 0.3, indicating fair agreement), reinforcing the value of acknowledging disagreement and offering multiple perspectives rather than a lone verdict. Collectively these excerpts substantiate the approach of using ensemble/disparate evaluations to detect epistemic uncertainty and to present design alternatives or statements like “experts may disagree” when consensus is not strong. They also illustrate concrete mechanisms (multiple rounds, calibration of confidence, recognition of fair to moderate agreement) that can be adopted to avoid false certainty and to surface tradeoffs or multiple viable options.

- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### key_strategies_for_subjective_reasoning.0.application
**Confidence:** high

The field value concerns how to calibrate confidence and express uncertainty when judgments are subjective or disputed in design. Directly relevant content includes methods that quantify uncertainty by producing multiple predictions and checking consistency, which supports expressing probabilistic or multi-path reasoning rather than single definitive answers. A shift toward confidence-driven evaluation argues for explicitly acknowledging uncertainty and risk in judgments, which aligns with designing AI systems that present calibrated confidence rather than overconfident claims. Uncertainty estimation as a diagnostic tool shows that measuring and reporting uncertainty can guide the quality of reasoning in subjective domains. Finally, inter-rater reliability studies in design critique demonstrate that expert agreement on subjective aspects (e.g., typography choices, color palettes) is often partial or fair rather than perfect, underscoring the need to present multiple viable approaches and to distinguish objective failures from subjective preferences. Collectively, these excerpts provide strategies for (i) generating and comparing multiple candidate judgments, (ii) expressing calibrated confidence or uncertainty, (iii) guiding when to rely on expert consensus, and (iv) presenting multi-path reasoning and tradeoffs rather than a single verdict.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### uncertainty_quantification_techniques.1.description
**Confidence:** medium

The finegrained field value describes a sampling-based approach to generate multiple critiques or responses and then assess consensus or consistency among them, with low consensus signaling high uncertainty or disagreement. Excerpts that explicitly discuss inter-rater reliability or disagreement in design critiques provide direct evidence about when designers disagree and how consensus can be measured. Those passages show quantifying agreement (e.g., Fleiss Kappa values) and instances where disagreement is common, which supports the idea of using a consensus or clustering signal to gauge epistemic uncertainty. Excerpts that discuss uncertainty estimation in LLM reasoning and calibration (e.g., uncertainty estimation as a diagnostic tool, multi-round generation to estimate uncertainty, and methods like semantic entropy probes) directly map to the described approach of maintaining or expressing uncertainty in subjective domains and using multiple samples or checks to assess confidence. Together, the cited content supports the notion of presenting multiple validated alternatives or critiques with an explicit uncertainty signal rather than a single definitive recommendation, and they provide concrete methods for measuring and signaling that uncertainty (consensus, semantic clustering, multi-round generation). The strongest, most direct support comes from discussions of inter-rater reliability and disagreement in design critiques, which establish that expert judgment can diverge and that measuring this disagreement is meaningful. The related uncertainty and calibration discussions provide practical techniques to implement and communicate the degree of confidence or skepticism in subjective design evaluations and multiple-sample reasoning. 

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### uncertainty_quantification_techniques.3.technique_name
**Confidence:** high

The finegrained field value seeks approaches to calibrate and express uncertainty when human judgments vary in subjective domains. Directly relevant is evidence that explores uncertainty quantification and confidence calibration in large language models, including strategies to assess and communicate uncertainty rather than presenting single definitive answers. For instance, an excerpt titled Uncertainty Quantification and Confidence Calibration discusses methods where multiple predictions or rounds of generation are used to gauge consistency, which directly informs how to calibrate responses in subjective design decisions. Another excerpt notes that uncertainty of the model can be used to detect non-factual responses, underscoring how calibrated uncertainty can help distinguish genuine subjectivity from erroneous claims. Additional excerpts discuss self-consistency and confidence-aware approaches to guiding reasoning under uncertainty, which align with presenting multiple valid options or tradeoffs rather than a single verdict in design critique or creative evaluation. Several excerpts focus on inter-rater reliability and the nature of human disagreement in design critiques, which provides the empirical context for calibrating AI behavior to human variability and for deciding when to present multiple design alternatives rather than a forced consensus. Finally, methods for estimating epistemic uncertainty (e.g., entropy-based estimators) and detecting hallucinations support robust calibration practices that prevent false certainty when subjectivity or disagreement is high. Collectively, these excerpts support a framework where an AI system expresses calibrated uncertainty, uses multi-path reasoning, and presents alternatives with transparent tradeoffs in subjective design decisions, rather than asserting definitive correctness where human judgment is inherently variable.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### uncertainty_quantification_techniques.3.description
**Confidence:** high

The finegrained field value describes a calibration strategy where model confidence is tuned to align with historical human inter-rater reliability (IRR) and acceptance rates on subjective or design-critique tasks. The most directly supporting material discusses uncertainty quantification and confidence calibration in large-language models, highlighting methods that estimate and utilize model uncertainty by examining consistency across multiple predictions and calibrating outputs. This establishes the practical basis for adjusting outputs to reflect true uncertainty rather than presenting overconfident judgments in subjective domains. Additional material explicitly frames uncertainty estimation as a diagnostic and decision-support tool for guiding reasoning in LLMs, underscoring its relevance to calibrating subjective judgments. Research on detecting hallucinations through uncertainty measures reinforces that uncertainty signals can help distinguish reliable versus unreliable assessments, which is consistent with calibrating outputs to match human judgment. Studies focusing on inter-rater reliability in design critique, including explicit reports of Fleiss’ Kappa and observed agreement levels in design critique datasets, provide concrete empirical grounds for mapping model confidence to human agreement. The UICrit findings showing fair to moderate inter-rater agreement and the analysis of how critique quality correlates with agreement levels offer a direct empirical basis for calibrating model confidence to the degree of human consensus on design issues like accessibility, layout, typography, and color choices. Together, these sources support a workflow where an AI system expresses calibrated confidence by (a) estimating its own uncertainty, (b) grounding its confidence scaling against historical IRR data from human raters, and (c) presenting multiple viable critiques or options with corresponding calibrated certainty rather than a single definitive recommendation. The cited works on self-consistency with uncertainty and entropy-based or cheap hallucination detection further reinforce the toolbox for maintaining appropriate uncertainty levels without misleading users into overconfidence or indecision. The overall picture is that calibrated subjective judgment in design can be achieved by tying model confidence to historical human agreement metrics, using uncertainty-aware reasoning, and providing multi-path rationale with explicit uncertainty cues.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).

### uncertainty_quantification_techniques.3.methodology_type
**Confidence:** medium

The most directly relevant information comes from discussions explicitly titled around uncertainty quantification and confidence calibration. The first excerpt describes how multiple rounds of generation can be used to estimate uncertainty, analyze consistency, and calibrate confidence in predictions, which aligns with statistical calibration goals for subjective tasks. The next set of excerpts discuss entropy-based uncertainty estimators to detect hallucinations and to quantify uncertainty in reasoning, which provides concrete statistical tools for calibration and monitoring epistemic uncertainty in subjective or creative judgments. Additional excerpts discuss uncertainty estimation as a diagnostic tool to guide the quality of reasoning, reinforcing the role of calibrated uncertainty in design-related decision-making. Further items describe methods (SelfCheckGPT, entropy probes) that operationalize calibration by assessing when responses may be uncertain or fall into plausible disagreement zones, which is essential for presenting multiple valid design approaches with quantified confidence. Taken together, these excerpts support the notion of statistical calibration as a core methodology for handling subjective judgments in AI design contexts, including methods to detect, measure, and express uncertainty rather than overclaim certainty, and to enable multi-path reasoning or candidate alternatives with quantified tradeoffs.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### uncertainty_quantification_techniques.2.description
**Confidence:** high

The fine-grained field value describes using the spread, variance, or entropy of a predicted distribution over scores as a direct measure of uncertainty for subjective quality assessments. The most relevant excerpts explicitly propose or analyze entropy-based or distribution-based uncertainty signals: one excerpt develops entropy-based uncertainty estimators for LLM outputs to detect hallucinations, which directly aligns with using entropy as a measure of uncertainty rather than a single score; another excerpt introduces semantic entropy probes as a cheap, reliable method for uncertainty quantification in LLMs; a third discusses multiple rounds of generation to estimate uncertainty by analyzing consistency across predictions, effectively characterizing the distribution of potential scores. These directly map to the concept of predicting a full distribution rather than a single scalar and using the distribution’s properties (spread, entropy) as an uncertainty signal. Additional excerpts discuss uncertainty quantification more generally in large language models (e.g., how to estimate and calibrate uncertainty across predictions) and strategies like self-consistency or multi-prediction frameworks that reinforce that uncertainty should be surfaced rather than masked. Contextual relevance from inter-rater reliability in design critique helps frame the broader implications for subjective design judgments, acknowledging that disagreement among experts is a form of epistemic uncertainty that could motivate presenting multiple plausible options with quantified uncertainty. Taken together, these excerpts form a coherent support stack for adopting a distribution-based uncertainty signal (spread/variance/entropy) as the primary measure, with multi-sample or multi-round approaches as practical methods to estimate that distribution, and reliability considerations to interpret and present the results responsibly.

- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### key_strategies_for_subjective_reasoning.5.strategy_name
**Confidence:** medium

The target field value calls for strategies to avoid presenting undue certainty in subjective design decisions by calibrating language and interaction. Excerpts that discuss uncertainty quantification and confidence calibration describe methods for measuring and expressing uncertainty (for example, generating multiple predictions to assess consistency, and explicitly examining the uncertainty of the model to detect non-factual responses). These sources support the idea that AI systems should communicate varying degrees of certainty and use calibrated language when the answer is genuinely subjective. Other excerpts emphasize presenting decision options or tradeoffs rather than a single definitive answer, which aligns with the objective of offering multiple valid approaches with transparent reasoning rather than asserting one ‘correct’ path. Additional context is provided by discussions of inter-rater reliability in design critique, which demonstrates that expert agreement is often imperfect in subjective domains; acknowledging this agreement variability reinforces the need for calibrated language and explicit uncertainty in AI-provided assessments. Collectively, these excerpts support a strategy that endows AI systems with calibrated certainty levels, multi-path reasoning, and explicit tradeoffs, thereby avoiding false certainty in subjective design judgments. The most directly supportive points are the emphasis on uncertainty estimation as a diagnostic tool and the idea that responses should express uncertainty and guide through multiple reasoning paths rather than asserting certainty where it is unwarranted; the inter-rater reliability findings further justify presenting disagreement as a signal for cautious, nuanced explanations rather than dogmatic conclusions.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### key_strategies_for_subjective_reasoning.5.application
**Confidence:** high

Calibrated communication and trustworthy interaction require mechanisms for estimating and expressing uncertainty, avoiding false certainty, and providing reasoning that is transparent and tradeoff-aware. Excerpts that discuss confidence-driven evaluation, uncertainty estimation, and confidence-aware self-consistency directly support building systems that communicate their certainty appropriately and guide users through subjective reasoning. For instance, discussions of well-calibrated uncertainty estimation and the use of uncertainty as a diagnostic tool align with presenting nuanced recommendations rather than single-point answers. Additional material on detecting hallucinations and maintaining appropriate uncertainty in subjective domains reinforces the need for transparent disclaimers and cautious language. Inter-rater reliability in design critique highlights that expert disagreement is common in subjective judgments and that presenting multiple viewpoints or tradeoffs can improve trustworthiness rather than forcing a single verdict. Together, these sources advocate for strategies where an AI reasons through subjective design decisions with calibrated confidence, presents multiple plausible approaches when applicable, and communicates epistemic uncertainty responsibly, all of which contribute to calibrated communication and trustworthy interaction in design contexts.

- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### uncertainty_quantification_techniques.2.methodology_type
**Confidence:** medium

The most relevant material directly engages with distributional approaches to uncertainty: one excerpt explicitly describes estimating uncertainty by generating multiple predictions from LLMs and analyzing their consistency, which is a core hallmark of distributional prediction. This aligns with presenting a distribution or ensemble of possible outcomes rather than a single verdict. Other closely related items discuss entropy-based uncertainty estimators or probes that quantify uncertainty but do not explicitly frame them as distributional predictions; they still underpin the idea of quantifying and calibrating uncertainty in subjective or creative judgments. Additional sources describe broader uncertainty quantification methods, including multiple rounds of generation and calibration of confidence, which supports the general approach of distributional reasoning in subjective domains. A set of excerpts focused on inter-rater reliability and critique agreement provide context about human evaluation variability, which, while not distributional prediction itself, informs how to interpret uncertainty and disagreement in design critique; they are tangentially relevant for understanding when multiple perspectives matter. Overall, the strongest support comes from passages that explicitly discuss multiple predictions or rounds of generation and analyzing their results as a basis for uncertainty, followed by items that discuss entropy-based or calibration-focused uncertainty measures, and finally human-annotator reliability context as supplementary background.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### key_strategies_for_subjective_reasoning.1.description
**Confidence:** medium

The most relevant content directly reports on inter-rater reliability in design critiques, including a numeric value for agreement on overall critique quality and an explicit, higher agreement value for ranking-related judgments. This directly supports the finegrained claim that empirical data exist showing varying degrees of human agreement, with some aspects (like rankings) showing stronger agreement than others (like validity of critiques). The next most relevant content reinforces this with additional numeric reliability data, including a corroborating fair agreement around 0.29–0.31 for critique validity. Together, these excerpts substantiate the core assertion that expert agreement exists but is uneven across design dimensions, aligning with the idea that objective criteria (e.g., accessibility-related aspects) may yield higher agreement than subjective choices (e.g., typography or color decisions) though the excerpts themselves primarily provide the reliability metrics rather than a full taxonomy of design categories. The remaining excerpts further reinforce the notion of fair to moderate agreement in this domain, adding supporting numeric values and textual context about subjectivity in design critiques. Taken as a whole, they map a clear pattern: agreement is present but limited, with measurable differences across tasks tied to objectivity vs subjectivity. This directly informs how AI feedback should be calibrated and labeled (as objective vs subjective) and how to report expected human agreement for a given category to users and designers.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### uncertainty_quantification_techniques.3.primary_use_case
**Confidence:** medium

The target field value asks how to align a model’s expressed confidence with actual human agreement or disagreement across tasks such as design critique. Direct evidence shows that human judgments on design critiques can have only fair to moderate agreement, as quantified by inter-rater reliability metrics. For instance, one study reports a Fleiss’ Kappa inter-rater reliability score around 0.29–0.30, indicating fair agreement and thus substantial room for subjective variance across evaluators. This directly motivates calibrating AI confidence to reflect the expected level of consensus and acknowledges zones of legitimate disagreement across design issues. Supporting this, the same work discusses how critiques vary in quality and agreement depending on the condition, suggesting that AI explanations and tradeoffs should adapt to the expected reliability of human judgments in different critique categories. In addition to reliability, formal uncertainty estimation methods are described in other sources, where uncertainty in reasoning and predictions is monitored through multiple rounds of generation, self-consistency checks, and entropy-based or other statistical estimators. These lines of work provide concrete mechanisms for expressing uncertainty in a principled way, which a system could map to the observed level of human agreement or disagreement for a given task. Collectively, these excerpts support the need for a calibrated approach to expressing confidence: high confidence where human agreement is consistently high, and moderated or conditional confidence where disagreement is common or where evaluation is inherently subjective. They also hint at practical approaches—using multiple evaluations, diagnostic uncertainty measures, and explicit tradeoffs—to present alternatives and avoid false certainty in subjective design critique. The intersection of these findings underpins strategies for AI systems to reason through subjective design decisions with appropriate uncertainty and to present multi-path reasoning aligned with human evaluative variability.

- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best

### key_strategies_for_subjective_reasoning.5.description
**Confidence:** high

The requested fine-grained field value describes a design for subjective reasoning under uncertainty: using calibrated language that maps probability ranges to phrases, an assertiveness mode that adapts to high vs. low certainty, always providing rationales, evidence, and examples, exposing cognitive biases, and defaulting to human-in-the-loop checks for high-stakes decisions. The most relevant excerpts discuss broad strategies for uncertainty management in large language models, including: (a) methods that quantify and calibrate uncertainty by generating multiple predictions and analyzing their consistency, as a way to express and manage confidence; (b) survey-oriented work that identifies that LLMs can hallucinate and that detecting or signaling uncertainty is critical; (c) confidence-aware self-consistency approaches that use uncertainty estimation to guide reasoning quality; and (d) explicit techniques to avoid false certainty and maintain appropriate uncertainty in subjective domains. These points map directly to the idea of calibrated language templates and explicit uncertainty signaling. Additional highly relevant material covers inter-rater reliability and disagreement in design critique, illustrating where expert agreement is strong or weak (e.g., agreements on accessibility issues vs. typography or color choices). This supports the notion that in subjective design tasks, AI should present multiple valid options and tradeoffs with transparent reasoning, rather than single definitive recommendations, and that human-in-the-loop mechanisms are important for high-stakes decisions. Overall, the set of excerpts provides concrete methods for uncertainty calibration, multi-path reasoning, and presenting options with rationale, along with empirical context on when experts disagree in design critique, which aligns with the requested field value.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Overconfidence in LLM-as-a-Judge: Diagnosis and ...](https://arxiv.org/html/2508.06225v2)
  > Aug 11, 2025 — In this work, we advocate a shift from accuracy-centric evaluation to confidence-driven, risk-aware LLM-as-a-Judge systems, emphasizing the necessity of well-
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
- [Enhancing Automated Design Evaluation with a UI Critique ...](https://dl.acm.org/doi/fullHtml/10.1145/3654777.3676381)
  > ct, we computed the Fleiss Kappa inter-rater reliability score  [11 ] for the critique ratings across participants and obtained a value of 0.29, which implies fair agreement.
  > he three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.30, which indicates fair agreement.
  > The three annotators had a Fleiss’ Kappa  [11 ] inter-rater agreement score of 0.31, indicating fair agreement

### uncertainty_quantification_techniques.2.technique_name
**Confidence:** medium

The target field value describes a technique that would generate or utilize a probability distribution over potential scores for a judgment or decision. The most directly relevant excerpts discuss entropy-based uncertainty estimators and semantic entropy probes, which are concrete methods for quantifying and interpreting distributional uncertainty in model outputs. They show how to quantify uncertainty in responses (e.g., through entropy measures) and assess the consistency or reliability of generated predictions across iterations or samples, which aligns with the concept of predicting score distributions to express likelihoods over different scores or judgments. Other excerpts describe multi-round generation and calibration approaches that generate or compare multiple predictions to estimate uncertainty, which also supports the notion of modeling and leveraging score distributions rather than a single point estimate. Additional sources address confidence calibration and detection of hallucinations through assessing uncertainty, further reinforcing the utility of distribution-aware reasoning in subjective domains. While some excerpts focus on human design critique and inter-rater reliability (subjective judgments from designers), they provide useful context about how disagreement and reliability are evaluated when producing judgments, which complements distribution-based uncertainty strategies in automated systems. Taken together, these excerpts support the concept of a technique that predicts or leverages score distributions to convey uncertainties in subjective design decisions, even if none explicitly names the exact technique title requested.

- [Detecting hallucinations in large language models using ...](https://www.nature.com/articles/s41586-024-07421-0)
  > by S Farquhar · 2024 · Cited by 1446 — Here we develop new methods grounded in statistics, proposing entropy-based uncertainty estimators for LLMs to detect a subset of hallucinations.
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [arXiv:2303.08896v3 [cs.CL] 11 Oct 2023](https://arxiv.org/pdf/2303.08896)
  > by P Manakul · 2023 · Cited by 1667 — In this paper, we propose SelfCheckGPT, a sampling-based approach that can detect whether responses generated by LLMs are hallucinated or factual. To the best
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant

### uncertainty_quantification_techniques.2.primary_use_case
**Confidence:** high

The core field value seeks a formal approach to quantify uncertainty in subjective design judgments and to communicate the level of disagreement or ambiguity. The most directly relevant material discusses uncertainty quantification and confidence calibration in LLMs, including how multiple rounds of generation can estimate uncertainty by examining the consistency of outcomes, which directly supports expressing not just a single verdict but the range of plausible judgments. Additionally, surveys on uncertainty quantification provide broad methods for assessing and reporting uncertainty in subjective domains. Further, techniques for confidence-aware self-consistency show how uncertainty estimation guides reasoning quality, aiding transparent communication of why a given path may be more or less uncertain. Empirical design-critique work on UICrit demonstrates that inter-rater agreement is only fair to moderate, illustrating that disagreement is a real signal in design evaluation and that reporting such disagreement (rather than forcing a single answer) is valuable. The most relevant design-analysis sources anchor this by showing explicit inter-rater reliability figures and discussions of disagreement in critique, which directly informs how to communicate the degree of consensus among experts. Supporting methods for detecting hallucinations and uncertainty using entropy-based or calibrated-probe techniques provide concrete tools for measuring and expressing uncertainty in subjective outputs. Collectively, these excerpts outline a practical approach: quantify uncertainty, calibrate the system’s expressed confidence, reveal when disagreement exists, and present alternative design options with transparent tradeoffs rather than asserting a singular objective result.

- [Uncertainty Quantification and Confidence Calibration in ...](https://xiao0o0o.github.io/2025KDD_tutorial/survey.pdf)
  > by X Liu · 2025 · Cited by 112 — Multiple rounds generation methods estimate uncertainty by generating multiple predictions from the LLMs and analyzing their consistency, similarity, or vari-.
- [A Survey on Uncertainty Quantification of Large Language ...](https://dl.acm.org/doi/full/10.1145/3744238)
  > by O Shorinwa · 2025 · Cited by 179 — Previous work has shown that hallucinations and other non-factual responses generated by LLMs can be detected by examining the uncertainty of the LLM in its
- [Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/html/2406.15927v1)
  > Jun 22, 2024 — We propose semantic entropy probes (SEPs), a cheap and reliable method for uncertainty quantification in Large Language Models (LLMs).
- [Confidence-Aware Self-Consistency for Efficient LLM ...](https://arxiv.org/html/2603.08999v2)
  > Mar 17, 2026 — Uncertainty estimation has become an essential diagnostic tool for assessing and guiding the quality of reasoning in LLMs. Recent studies have examined how
- [UICrit: A Large-Scale Dataset of Design Critiques and Its Findings (Duan et al., UIST 2024)](http://people.eecs.berkeley.edu/~bjoern/papers/duan-uicrit-uist2024.pdf)
  > s expected, the critiques from humans had the highest average
quality score. However, the quality score is less than 1, which is
likely due to the fact that design evaluation is inherently subjective,
leading to disagreement regarding design issues present in the UI.
In fact, we computed the Fleiss Kappa inter-rater reliability score
[ 11 ] for the critique ratings across participants and obtained a value
of 0.29, which implies fair agreement. We also visualize the rating
distributions for each condition in Figure 10, which shows that
the Zero Shot condition had the highest fraction of invalid ratings
and a very low fraction of valid ratings. Our setup had a fairly
uniform distribution, with a slightly smaller proportion of valid
ratings, and the majority of human critiques had valid ratings. This
plot and table 7 also shows that zero-shot has considerably more
comments than the other two conditions, which could be caused
by Gemini’s hallucinations, as indicated by the high number of
invalid ratings. This implies that our few-shot training method
likely reduced hallucinations, compared to the zero-shot setup.
We also computed the average ranking number for the set of
comments generated by each condition, across all UIs and partic-
ipants. The ranking number for the best comment set would be
1, the second-best set would be 2, and the worst set would be 3.
Therefore, lower ranking numbers indicate a better set of comments
(i.e., a higher ranking in the group). Table 7 shows the average rank
number for all three conditions. Our setup had a higher average
ranking than the zero-shot condition, and the set of human com-
ments was generally ranked the highest. The ranking data had an
agreement score of 0.55, which indicates moderate agreement. The
participants preferred the set of critiques generated by our setup
over the zero-shot set of critiques 67 percent of the time. Their
reasons for preferring our setup’s comment set (besides higher ac-
curacy), include greater comment specifcity to the design (P1, P3),
more actionable feedback (P1), and the fact that zero shot comment
set made too many assumptions (P3, P5). The times when the zero
shot comment set ranked higher than our setup’s was justifed by
reasons like the feedback was easier to understand (P3, P4) and the
set of comments was more thorough (P4). However, the participant
  > points, and in invalid critique was assigned 0 points. A critique is
considered valid if it is both accurate and helpful, following the
rating criteria described in [ 9 ]. We recruited three annotators to
manually score these design comments. Two of the annotators were
authors who have prior design experience, and the third annotator
was P1 from Table 6
Table 3 shows the scores for the top 5 performing few-shot
confgurations, applied to 6 distinct UI screens. The scores are nor-
malized by the total number of comments (shown in a separate
column) and averaged across all three annotators, allowing for com-
parison across diferent few-shot methods. The three annotators
had a Fleiss’ Kappa [ 11 ] inter-rater agreement score of 0.30, which
indicates fair agreement. Visual sampling with 8 shots had the
best performance, and semantic and visual sampling outperformed
 ..
