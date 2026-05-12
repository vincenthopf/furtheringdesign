---
query: "How do evaluation and detection systems distinguish between intentional deviation and unintentional error in contexts where rules are deliberately broken for effect? Include research from: (1) music/art computational analysis — detecting intentional rule-breaking vs mistakes in composition, (2) code analysis — distinguishing intentional unconventional patterns from bugs (e.g., suppressed lint warnings, deliberate assertions), (3) natural language processing — detecting intentional stylistic choices vs grammatical errors, (4) design systems and style guides — how Figma, Material Design, and other systems handle 'detachment' or 'overrides' of component tokens as signals of intentional deviation. Also cover: how context and consistency can disambiguate intent — if an element breaks ONE rule it might be a mistake, but if it consistently breaks the same rule across a section, it's likely deliberate. What heuristics, metadata signals, or pattern-based approaches can a detection system use to estimate intent without explicit annotation? Output: practical disambiguation techniques, metadata signals, and confidence modifiers for intent estimation."
processor: pro
run_id: trun_6b0c617b26214cd79821b535849eca7a
created_at: 2026-05-05T03:46:54.324242Z
retrieved_at: 2026-05-05T03:59:05Z
---

# Research: How do evaluation and detection systems distinguish between intentional deviation and unintentional error in contexts where rules are deliberately broken for effect? Include research from: (1) music/art computational analysis — detecting intentional rule-breaking vs mistakes in composition, (2) code analysis — distinguishing intentional unconventional patterns from bugs (e.g., suppressed lint warnings, deliberate assertions), (3) natural language processing — detecting intentional stylistic choices vs grammatical errors, (4) design systems and style guides — how Figma, Material Design, and other systems handle 'detachment' or 'overrides' of component tokens as signals of intentional deviation. Also cover: how context and consistency can disambiguate intent — if an element breaks ONE rule it might be a mistake, but if it consistently breaks the same rule across a section, it's likely deliberate. What heuristics, metadata signals, or pattern-based approaches can a detection system use to estimate intent without explicit annotation? Output: practical disambiguation techniques, metadata signals, and confidence modifiers for intent estimation.

## Findings

### Executive Summary

Detection systems across diverse domains like music, software development, natural language, and design distinguish intentional, rule-breaking deviations from unintentional errors by analyzing context, consistency, and explicit signals. An intentional deviation is not random but is coherent with a larger objective, style, or alternative rule set. It typically appears consistently wherever that context is applicable. Furthermore, intentionality is often accompanied by metadata or structural signals that communicate the creator's purpose, such as `//NOLINT` comments in code, component property overrides in design systems, or consistent use of dialectal features in text. In contrast, unintentional errors are often isolated, one-off violations that lack a clear rationale or pattern. Effective detection systems, therefore, must (a) model the surrounding context and established norms, (b) identify consistent patterns of the same deviation, (c) detect supporting signals like metadata, annotations, or governance mechanics, and (d) assign lower weight to isolated violations that lack any supporting evidence or rationale.

### Key Disambiguation Principles

The core, cross-domain principles used to infer intent and distinguish it from error revolve around analyzing context, consistency, and the presence of explicit or implicit signals. These can be broken down into several key heuristics:

1.  **Consistency and Scope**: This is a fundamental principle where the repetition of a deviation is a strong indicator of intent. A single, isolated rule break is likely an error, but a deviation that recurs consistently across a defined scope (e.g., a musical phrase, a code module, a document, a design theme) suggests a deliberate choice. Confidence in intent increases with the number of occurrences within that scope.

2.  **Contextual Fit**: A deviation is more likely intentional if it aligns with a known higher-level structure or goal. Examples include a note that fits the local harmony in music, a code pattern that satisfies API pre/post conditions, a non-standard word that fits a recognized linguistic dialect, or a design change that preserves the semantic tier of a design token (e.g., changing a 'primary container color' token, not just a random hex value).

3.  **Presence of Rationale or Metadata**: Intent is often explicitly signaled. In code, this includes linter suppression pragmas (`// NOLINT`, `pylint: disable`) with justifications, assertions, or Self-Admitted Technical Debt tags (`TODO`, `HACK`). In design, it's seen in the use of component property overrides and design tokens. The presence of commit messages, issue tracker links, or documentation explaining an exception provides very high confidence.

4.  **Regularity in the Local Neighborhood**: Beyond broad consistency, patterned regularity in the immediate vicinity of the deviation suggests intent. This could be a repeated syncopation pattern in music, a recurring unconventional idiom in a specific code file, consistent use of a dialect's morphosyntax in a paragraph, or the same override being applied to multiple sibling component instances in a design.

5.  **Co-variation with Companion Signals**: Intentional changes often occur in coherent bundles. A deviation is more likely deliberate if it co-occurs with other changes that collectively achieve a plausible goal. For example, a brand theme update that changes color, typography, and spacing tokens together, or a code optimization that adds an unsafe cast but also a guarding assertion and a benchmark annotation.

6.  **Provenance and Governance**: The origin of the deviation matters. If it was introduced in a dedicated, reviewed, and approved change (e.g., a pull request titled "Intentional exception for performance reason X"), or by a known domain expert or owner, it is more likely intentional than an unreviewed change from an unfamiliar contributor.

7.  **Reversibility Test (Counterfactual)**: A practical test is to consider the impact of 'fixing' the deviation. If automatically correcting the element to its rule-conforming state degrades the overall objective—for instance, it breaks a unit test, reduces model accuracy for a specific dialect, or creates poor visual contrast in a design—the original deviation was likely intentional.

### Pattern And Consistency Analysis

Systems use pattern and consistency analysis to disambiguate intent based on the core heuristic that a single, isolated rule break is likely an unintentional error, whereas a consistent, repeated pattern of deviation suggests a deliberate choice. This principle is applied by analyzing the frequency, scope, and regularity of a given deviation.

An isolated deviation, occurring once without supporting context or metadata, is flagged with high probability as an error. For example, a single out-of-key note in a musical performance, a rare API usage pattern in a large codebase, a one-off grammatical anomaly in a formal document, or a single detached component in an otherwise consistent design system are all likely mistakes.

Conversely, when the same deviation recurs, it forms a pattern that strengthens the hypothesis of intent. The system's confidence grows with the number of consistent occurrences within a coherent scope. This is applied across domains:

*   **Music Analysis**: While a single wrong note is an error, a recurring melodic or rhythmic figure that deviates from the score is likely an intentional ornament or expressive motif. Research shows that models that don't account for this repetition can generate false positives, misidentifying repeated motifs or grand pauses as errors. Consistency across multiple takes of a performance is an even stronger signal.

*   **Code Analysis**: Techniques like frequent itemset mining (e.g., PR-Miner) are used to establish common programming rules from a codebase. A violation of a globally frequent pattern is a strong signal for a bug. However, if the same 'deviant' pattern recurs consistently within a specific module or is used by a particular developer, it may represent an intentional local idiom or a necessary workaround. The system looks for these 'local micro-norms' as evidence of intent.

*   **Natural Language Processing**: A single non-standard word might be a typo. However, the consistent use of multiple independent markers of a specific dialect (e.g., AAVE morphosyntax, lexicon, and phonology-to-orthography patterns) across a document strongly indicates a deliberate stylistic choice, not a series of grammatical errors.

*   **Design Systems**: A single component instance detached from its main component with hardcoded color values is likely a mistake or a one-off hack. However, if analytics show that dozens of instances on a specific team's pages are detached and given the same specific override, it points to a deliberate, albeit unsanctioned, local branding decision. Clustering these deviations can separate systematic exceptions from random noise.

Advanced approaches formalize this by using hierarchical context models (e.g., repository -> module -> file; design system -> page -> component), where the probability of intent increases when deviations are consistent within a specific level of the hierarchy.

### Music And Art Computational Analysis

| Concept | Description | Computational Approach | Key Research |
| --- | --- | --- | --- |
| Conspicuous Errors vs. Expressive Devices | A deviation from the score, such as an unexpected note, is judged as either an error or an intentional expressive choice based on its coherence with the surrounding harmonic and rhythmic context. A note that clashes with the local harmony is likely an error, while one that fits a pattern or resolves correctly is likely intentional. | A two-stage process is used: first, score-independent conspicuous-error detectors flag locally salient anomalies. Then, these anomalies are re-scored using models that analyze the surrounding harmonic and rhythmic context windows and style priors to differentiate between true errors and structural musical elements like repeated motifs or ornaments. | Morsi et al. (ISMIR 2023) conducted research on 'conspicuous errors,' showing that listeners rely on the surrounding context to detect mistakes, and that computational models must model the underlying composition to avoid high rates of false positives on intentional musical features. |
| Expressive Performance Features | Intentional expression is conveyed not just through correct notes and rhythms but through nuanced modulations of tempo, microtiming (e.g., swing), dynamics (volume), and pedaling. These features, when varied in a smooth, patterned way, represent deliberate artistic choices, whereas abrupt, isolated changes often signal mistakes. | Models aggregate and analyze multiple features beyond pitch, including microtiming, dynamics, articulation, and pedaling. Heuristics are applied to penalize isolated deviations with abrupt characteristics (e.g., sudden silences) and boost the likelihood of intent for deviations that recur with consistent timing or dynamic patterns. | Research in computational models of expressive piano performance, such as that presented at ISMIR 2022 and in Transactions of ISMIR, focuses on analyzing attributes like tempo, timing, dynamics, and pedaling as primary carriers of expressive intent. |
| Fine-Grained Error Detection | This involves detecting specific mistakes like missed, added, or wrong notes within a performance. Distinguishing a missed note from an intentional pause or rest in a complex piece is a significant challenge, especially in dense textures. | Alignment-free paired audio transformers compare a performance to a reference recording without relying on fragile alignment algorithms. These models are often trained on large-scale synthetic datasets where errors are deliberately introduced. This allows for more robust detection of fine-grained mistakes. | The Polytune model, an alignment-free transformer, was developed for this purpose. While effective, its limitations, such as under-performance on missed notes in homophonic music, highlight the ongoing challenge of representing complex musical textures for error detection. |
| Consistency Across Takes and Sections | An intentional artistic choice, such as a specific ornament or rhythmic interpretation, is likely to be repeated consistently when a musician performs the same section multiple times. In contrast, a mistake is typically a one-off event that does not reappear in the same way across different takes. | The system analyzes multi-take or multi-section performance data, looking for recurring patterns of deviation. A deviation that reappears consistently across different takes or sections receives a higher confidence score for being intentional, while an isolated, non-recurring deviation is flagged as a likely error. | This is a core heuristic mentioned in the cross-domain analysis, applying a pattern-based approach to disambiguate intent based on repetition and consistency within the performance data. |

### Code Analysis And Software Engineering

| Signal Type | Mechanism | Intent Implication | Justification Requirement |
| --- | --- | --- | --- |
| Suppressed Warning | // NOLINT, // NOLINTNEXTLINE, pylint: disable=..., @SuppressWarnings | This explicitly signals that the developer acknowledges a static analysis warning but has deemed it a false positive, an acceptable trade-off, or a necessary deviation due to framework limitations. Empirical studies confirm these are often used for legitimate reasons, making suppression a strong indicator of intent. | True |
| Self-Admitted Technical Debt (SATD) | Code comments containing tags like 'TODO', 'HACK', 'FIXME', or 'WORKAROUND'. | These tags indicate a deliberate choice to introduce suboptimal code, often as a temporary solution or to meet a deadline. It is an explicit admission that the code is not ideal but is intentional, with the tag serving as a marker for future improvement. | True |
| Assertion / Design by Contract | Use of `assert()` statements or formal pre/post-condition specifications (e.g., Java Modeling Language - JML). | The presence of an assertion or contract guarding an unusual or potentially unsafe piece of code demonstrates that the developer has considered the edge cases and is deliberately enforcing specific conditions for the code to run. This acts as a 'local safety harness' for an intentional, unconventional pattern. | False |

### Natural Language Processing Applications

| Challenge | Example | Detection Approach | Relevant Datasets |
| --- | --- | --- | --- |
| Distinguishing Dialect from Grammatical Error | Grammatical Error Correction (GEC) tools frequently misclassify systematic features of African American English (AAE), such as zero copula or habitual 'be', as grammatical errors because they deviate from so-called 'Standard English'. | A 'dual-path analysis' is used, which involves running both a standard GEC tool and a dialect identification classifier. If the text is identified as AAE with high confidence, the system down-weights or ignores GEC flags that correspond to known morphosyntactic features of AAE. The consistency of multiple dialectal markers is used to increase confidence. | The TwitterAAE dataset from Blodgett et al. is used to identify text containing AAVE (African American Vernacular English) lexical items with high confidence, enabling the training and evaluation of dialect-aware models. |
| Identifying Intentional Shifts in Formality or Register | A user might intentionally use colloquial language, slang, or creative prose in a context like a social media post or a text message. A standard grammar checker might incorrectly flag these stylistic choices as errors. | Formality detection models based on statistical, neural, or Transformer architectures are used to classify the text's register. Contextual cues, such as the document's source or genre, are used as priors. A counterfactual test can be applied: if rewriting the text to standard grammar reduces the coherence score from a formality or style classifier, the original is treated as intentional. | The text references a systematic study of formality detection methods presented at RANLP 2023, which relies on corpora annotated for formality, such as the Grammarly's Yahoo Answers Formality Corpus (GYAFC), to train and evaluate models. |
| Handling Poetic License and Creative Language | Poetry and creative writing often deliberately break standard grammatical rules for artistic effect, such as through unconventional syntax, word choice, or sentence structure. These are not errors but are central to the work's style and meaning. | This involves using genre and style classifiers to identify the text as creative prose or poetry. When a creative genre is detected, the system can switch to a more descriptive (rather than prescriptive) mode of analysis, flagging deviations but not marking them as errors, or using models trained specifically on literary corpora. | While not a specific dataset, general NLP surveys and research on style classification cover the linguistic challenges and computational approaches for tasks involving creative language, as noted in the cited CL journal article. |
| Documenting Non-Standard Language Varieties | Linguists can use GEC tools in a novel way to study and document the grammatical structures of non-standard English varieties. Instead of 'correcting' the text, the 'errors' flagged by the tool are collected and analyzed as data points that reveal the systematic rules of that variety. | This approach inverts the typical use of GEC tools. The system is run on a corpus of a non-standard variety, and the output (the detected 'errors' and proposed 'corrections') is used as a dataset for linguistic analysis to understand the variety's grammar. | This is a methodological approach rather than one tied to a specific dataset. Research published in journals like Lingvisticæ Investigationes describes this novel use of GEC tools for documenting language variation. |

### Design Systems And Style Guides

| System Or Tool | Mechanism | Signal Of Intent | Analytics And Governance |
| --- | --- | --- | --- |
| Figma | Detach Instance | Detaching an instance breaks its link to the main component, signaling a need for a fundamental change not supported by standard overrides. This is considered a risky deviation and a strong signal of an exceptional case. Its intent is considered lower unless it is part of a consistent pattern or is explicitly justified. | Figma logs every 'detach' event. Library analytics and specialized plugins can be used to find, enumerate, and cluster detached instances. This allows design system managers to identify patterns of detachment, which might indicate a need for a new component variant or a flaw in the existing design, versus isolated mistakes. |
| Figma | Component Property and Variable Overrides | Making changes via component properties or by applying different variables (tokens) are considered 'sanctioned deviations'. The system is designed to support this level of customization, so using these features is a clear signal of intentional design choice within the established rules of the design system. | Library analytics in Figma track the usage of components, styles, and variables. By analyzing which properties are frequently overridden, teams can gain insights into how components are being used and identify needs for new variants or adjustments to the base components. |
| Material Design | Design Token Customization | Material Design advocates for using design tokens (named for their semantic purpose, e.g., 'primary-color') instead of hardcoded values. Overriding a default by applying a different token is the intended, structured way to customize a theme. This signals a deliberate, systematic design choice that aligns with the system's philosophy. | Governance involves auditing designs to ensure tokens are used instead of hardcoded values. A coherent update to a bundle of related tokens (e.g., color, typography, spacing) for a specific theme is a high-confidence signal of intentionality. In contrast, a lone, hardcoded hex value amidst a token-based design is suspect and flagged for review. |

### Practical Disambiguation Techniques

| Technique Name | Underlying Principle | Application Domain | Example Tool Or Research |
| --- | --- | --- | --- |
| Context-Aware Anomaly Scoring | Locally salient anomalies (potential errors) are re-evaluated based on their fit with the surrounding harmonic and rhythmic context and style priors, mimicking how human listeners perceive mistakes. | Music Performance Analysis | Morsi et al., ISMIR 2023 |
| Frequent Itemset Mining for Anomaly Detection | Implicit programming rules are mined from a large codebase by identifying frequent co-usage and ordering of operations. Violations of these frequent patterns are flagged as likely bugs. | Code Analysis | PR-Miner |
| Alignment-Free Paired Audio Analysis | A performance is compared to a reference using paired audio transformers to detect errors without relying on fragile alignment algorithms. This is often combined with synthetic error generation for training. | Music Performance Analysis | Polytune |
| Dual-Path GEC and Style/Dialect Identification | Text is analyzed simultaneously by a standard Grammatical Error Correction (GEC) system and a dialect/register/style identifier. GEC flags are down-weighted if a consistent, non-standard style (like AAE or colloquialisms) is confidently detected. | Natural Language Processing | Dialect-aware GEC studies |
| Library Analytics and Governance | Platform analytics are used to enumerate, track, and cluster component overrides and detachments. This helps distinguish systematic, intentional patterns of deviation (e.g., for a local brand exception) from isolated, likely accidental ones. | Design Systems | Figma Library Analytics |
| Counterfactual Rewriting Test | The intent of a deviation is tested by 'correcting' it to the rule-conforming form. If this correction materially degrades a measurable objective (e.g., breaks a test, increases model loss, worsens design contrast), the original deviation is considered intentional. | Cross-domain (Code, NLP, Design) | General heuristic proposed in the analysis |

### Explicit Metadata Signals

| Signal | Example | Domain | Interpretation |
| --- | --- | --- | --- |
| Linter Suppression Comment | // NOLINT, pylint: disable=..., @SuppressWarnings | Source Code | An explicit directive to a static analysis tool to ignore a violation on a specific line or in a specific scope. It indicates the developer has acknowledged the issue and deemed it acceptable, a false positive, or necessary. |
| Self-Admitted Technical Debt (SATD) Tag | TODO, FIXME, HACK, WORKAROUND | Source Code / Version Control | A developer's acknowledgment of a sub-optimal but deliberate implementation choice, often intended as a temporary solution. It signals that the deviation is known and intentional. |
| Formal Contract or Assertion | JML specifications (e.g., requires, ensures), assert() statements | Source Code | A formal specification of behavior. Code that, while unconventional, satisfies these explicit contracts or assertions is considered to be behaving intentionally and correctly according to its defined specification. |
| Component Property Override | Editing an instance's properties via the designated panel in Figma. | Design Systems | A 'sanctioned' deviation where the system provides a structured mechanism for customization. This is interpreted as an intended modification within the bounds of the component's design. |
| Design Token/Variable Usage | Applying a semantic token like 'color-primary-text' instead of a hardcoded hex value. | Design Systems | An intentional deviation that adheres to the system's structured framework. It links the change to a thematic purpose rather than being an arbitrary, one-off value, signaling a systematic choice. |
| Component Instance Detachment | Using the 'Detach instance' command in Figma, which is logged in analytics. | Design Systems | A deliberate action to break the link between an instance and its main component to make unsupported changes. It is a strong signal of a significant, intentional deviation from the standard component. |
| Justification Text | A comment next to a suppression, like '// NOLINT: False positive due to legacy API'. | Source Code | Provides a specific human-readable reason for a deviation, greatly increasing the confidence that the choice was deliberate and well-understood, rather than a developer simply silencing a warning. |
| Commit Message Rationale | Commit message containing 'workaround for bug #123' or 'intentional exception for performance'. | Version Control | Explicitly links a code change that may appear as a deviation to a higher-level purpose, serving as documented proof of intent. |

### Implicit Pattern Based Signals

| Signal Type | Description | Heuristic | Measurement Method |
| --- | --- | --- | --- |
| Consistency and Repetition | A deviation that recurs consistently within a defined scope (e.g., a file, musical phrase, author's document, design page) is more likely to be a deliberate choice or an emergent local convention than an isolated error. | A single, isolated deviation is likely an error; a repeated deviation is likely a choice. | Frequency analysis of the specific deviation within a coherent scope. Intentionality is boosted if the deviation occurs multiple times (e.g., k≥3) with low variance. |
| Contextual Fit | A deviation may violate a local or surface-level rule but align perfectly with a higher-level structural or semantic context. This alignment suggests the deviation serves a purpose within that larger context. | A deviation that aligns with a known larger structure (e.g., musical harmony, API protocol, dialect grammar, brand theme) is likely intentional. | Validation against a model of the higher-level context. This can include harmonic analysis in music, checking pre/post-conditions in code, or recognizing a known dialectal grammar in NLP. |
| Deviation from a Learned Baseline | By mining a large corpus of data, a system can learn norms of common practice (e.g., frequent API usage patterns). A deviation is an action that violates these learned norms. Such deviations are likely bugs unless supported by other signals of intent. | Violations of frequent, established co-usage patterns are likely bugs. | Statistical anomaly detection against a model learned through frequent-itemset or sequence mining. The rarity of the pattern across the entire codebase is a key metric. |
| Co-variation of Companion Signals | Intentional changes often manifest as a coherent bundle of related modifications that work together to achieve a single, plausible goal. An isolated, orphaned change is more suspect. | A deviation that co-occurs with other changes forming a logical group is more likely intentional. | Clustering of changes within a single commit, user session, or design update. For example, detecting that updates to color, typography, and spacing tokens occurred together in a design file. |
| Expressive Feature Bundling | In music performance, intentional expressive choices (e.g., rubato, swing) involve coordinated, patterned changes across multiple features like microtiming, dynamics, and articulation, whereas mistakes are often abrupt and one-dimensional. | Smooth, patterned changes in timing and dynamics suggest expression; abrupt, isolated anomalies suggest error. | Analysis of aggregated performance features (e.g., velocity, timing offsets, pedaling) in the temporal neighborhood of a pitch or rhythm deviation to check for coordinated patterns. |

### Intent Confidence Modifiers

**Modifier Type:** Presence of Justification

**Effect On Confidence:** Increases

**Example:** A code suppression pragma that includes a justification and a ticket link (e.g., `// NOLINT(rule-id): Justified exception for legacy API, see TICKET-123`) provides a very strong positive signal for intent, significantly increasing confidence over a bare suppression without rationale.


### Foundational Research And Concepts

**Concept Or Paper Title:** Bugs as Deviant Behavior / Anomaly Detection

**Authors Or Origin:** Engler et al. (Bugs as Deviant Behavior), Z. Li & Zhou (PR-Miner)

**Core Idea:** Bugs can be found by identifying behavior that deviates from statistically common patterns. The system mines frequent co-usage or ordering rules from a large codebase and then flags violations of these implicit rules as potential errors.

**Domain:** Code Analysis


### Challenges And Limitations

**Challenge:** Systemic and Normative Bias

**Description:** Detection systems, particularly in NLP, often exhibit a normative bias by being trained primarily on 'standard' forms of language or expression. This leads them to incorrectly flag valid, intentional deviations that are part of a consistent but non-standard style, dialect, or register.

**Example:** Grammatical Error Correction (GEC) tools frequently misclassify features of African American English (AAE) as grammatical errors because the underlying models are not trained on or aware of AAE's distinct grammatical rules.

**Mitigation Strategy:** Employ a 'dual-path analysis' that first runs a dialect/register/style identification model. If a specific non-standard variety is detected with high confidence, the system should down-weight or ignore grammatical flags that correspond to known features of that variety. Providing users a 'treat as style' option is also recommended.



## Research Basis

### code_analysis_and_software_engineering
**Confidence:** high

Direct support comes from studies that analyze suppressions of static analysis warnings, showing developers intentionally suppress or gate away warnings, typically for legitimate reasons or due to framework constraints. Such work explicitly investigates the reasons behind suppression, aligning with the field’s claim that suppression signals intent and can be a justified deviation. Empirical work on suppression (documenting prevalence and motivations) strengthens the interpretation that suppression is a meaningful, signal-bearing practice rather than noise. Further, research on Self-Admitted Technical Debt highlights the use of explicit tags like TODO, HACK, FIXME, or WORKAROUND in comments, which is a deliberate admission of suboptimal code for a known purpose or deadline, again supporting the field’s SATD signal. Additional discussion of an assertion-based safety mechanism (assertions, design by contract, and formal specifications) provides concrete examples where guarding conditions indicates intentional design choices around edge cases or invariants, fitting the “intentional deviation” pattern. The cited material also covers broader tooling and practices around overrides, detaching, or nonstandard use in design and coding environments, illustrating how practitioners signal and manage intentional deviations or exceptions. Taken together, these sources substantiate the proposed signals (Suppressed Warning, SATD, Assertion) as intent indicators with practical mechanisms and justification concepts, and they illustrate the different contexts (static analysis, runtime checks, and design-by-contract) where intent must be inferred from metadata or comments. The alignment with the described mechanisms helps establish a practical taxonomy for intent estimation, including when justification is required or not, and how such signals are documented or detected by tooling. 

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability
- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### challenges_and_limitations
**Confidence:** medium

The finegrained field value describes a systemic bias in detection systems toward normative, standard forms, and the need to down-weight or ignore flags when a non-standard variety (dialect/style) is detected with high confidence. The most directly relevant evidence comes from NLP-focused discussions of dialectal variation and bias toward African American English, which show that models can misclassify legitimate non-standard usage as errors. These excerpts illustrate the core problem: standard-form bias in detection, and the potential benefit of dialect-aware recognition as a first step before applying error flags. Additional excerpts discuss intentional deviations in programming contexts (e.g., TODO comments, suppression of static analysis warnings, and NOLINT directives) which demonstrate concrete signals that a deviation might be intentional rather than erroneous. These coding signals align with the proposed dual-path approach: a dialect/style identification step first, then escalation of flags only for non-dialect deviations or when inconsistency across a section suggests error rather than style. Design-system discussions about overrides and detached instances provide a parallel for intentional deviation signals in design tokens and components, where a deliberate override or detachment indicates a signal of intent rather than a bug. Taken together, these sources support a practical disambiguation workflow: first run a dialect/style/register identification model to classify non-standard usage; if detected with high confidence as a known non-standard variety, down-weight grammatical flags tied to that feature; offer a user-facing option to treat as style; if not confidently identified as style, apply conventional error signals; consider consistency heuristics (a deviation that recurs in the same rule across a section is more likely deliberate) and contextual metadata (surrounding context, intent signals like overrides or suppressions); and incorporate pattern-based cues such as repeated intentional deviations (e.g., consistent missing grammar, repeated token overrides, or repeated NOLINT-like suppressions) to adjust confidence modifiers.

- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's

### natural_language_processing_applications
**Confidence:** high

The core field value describes several NLP-specific challenges for disambiguating intentional stylistic choices, dialect features, and non-standard language from grammatical errors, as well as approaches for modeling formality and bias in language. Excerpts that study African American English (AAVE/AAE) in NLP contexts provide concrete cases where dialectal features are systematically distinguished from errors, illustrating how high-confidence dialect identification can down-weight or reinterpret standard error signals. This aligns with the described dual-path approach where dialect identification informs how a grammar or GEC system should treat certain features that deviate from Standard English. Additional excerpts discuss formality detection as a separate classification task, using priors from document source or genre, and counterfactual checks to infer intent behind stylistic choices, which directly maps to estimating intent (as deliberate stylistic choice versus mistake) when no explicit annotation is present. Some excerpts emphasize the problem of bias in NLP models when dialectal features are misinterpreted as errors, underscoring the need for context-aware and dialect-aware evaluation to avoid false positives. Collectively, these sources provide concrete methods, datasets, and evaluation paradigms for identifying intentional linguistic variation versus error, including: using dialect-aware classifiers to identify AAE and down-weight GEC flags that correspond to known morphosyntactic features, leveraging formality/classification models with priors and counterfactual checks to assess whether a given text’s formality aligns with its context, and datasets that enable training and evaluation of dialect-aware and bias-aware NLP systems. The excerpts about AAE and NLP bias specifically illustrate how context and consistency signals (e.g., recurring dialectal markers) can improve intent estimation, while the formality detection references provide architectures and evaluation strategies for distinguishing deliberate stylistic choices from prescriptive errors. Finally, methodological discussions about documenting non-standard varieties with GEC tools turned toward linguistic analysis demonstrate how outputs from analysis tools can be repurposed to study language variation rather than simply correcting it, which is highly relevant to designing robust intent estimation in NLP workflows.

- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.

### practical_disambiguation_techniques
**Confidence:** high

The most directly relevant content includes studies showing that perception of errors in music can depend on surrounding context and can be detected via dedicated models or end-to-end approaches that do not rely on strict alignment. This supports the context-aware anomaly scoring idea for music performance analysis and alignment-free analysis. For example, work describing that listeners detect conspicuous errors in piano performances with context, and methods that detect musician errors without relying on score alignment, aligns with the proposed context-aware anomaly scoring and alignment-free paired audio analysis. Additional lines discuss expressive performance datasets and note-level features used to reveal expressive characteristics, which reinforce the idea that rhythmic and harmonic context informs plausibility of deviations in music. In code analysis, references to suppressions of static analysis warnings discuss why practitioners hide warnings and how they reason about when a warning should be ignored, which maps to metadata signaling and intent estimation around deviations in code, including the idea of using suppressions as signals rather than bugs. In natural language processing, references to grammatical error detection and dialect-aware processing illustrate how intent can be disambiguated by considering non-standard styles or dialects alongside standard grammar checks. In design systems, content about detaching or overriding tokens, library analytics for governance, and exploring component properties and overrides directly map to the proposed design-system analytics technique that tracks overrides/detached instances to distinguish intentional deviations from accidental ones. Overall, the collection of excerpts supports the five techniques by providing concrete implementations, datasets, and concepts that align with context-aware scoring, mining of implicit patterns, alignment-free comparisons, dialect-aware NLP adjustments, and governance analytics for design systems. The strongest support comes from explicit discussions of context-sensitive error detection in music, alignment-free audio analysis, suppression signals in code, dialect-aware NLP, and analytics around component overrides/detached instances in design tools.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [EXPRESSIVE Definition & Meaning](https://www.merriam-webster.com/dictionary/expressive)
  > 6 days ago — 1. of or relating to expression; the expressive function of language. 2. serving to express, utter, or represent; foul and novel terms expressive of rage.
- [(PDF) Self-Admitted Technical Debt and comments' polarity](https://www.researchgate.net/publication/362268914_Self-Admitted_Technical_Debt_and_comments'_polarity_an_empirical_study)
  > In this paper, we study the relationship between different types of SATD comments in source code and their polarity, to understand in which circumstances (and
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".

### music_and_art_computational_analysis
**Confidence:** high

The field value describes a two-stage computational approach to separate errors from expressive devices: first flag locally salient anomalies that may be conspicuous errors, and then re-score these anomalies by analyzing the surrounding harmonic and rhythmic context as well as style priors to judge whether they are true errors or intentional musical elements. Excerpts discussing conspicuous errors and context explicitly support this staged strategy, including work that demonstrates listeners rely on surrounding context to detect mistakes and that computational models must consider the composition to avoid false positives on intentional features. This aligns with the two-stage detector and re-scoring notion. Further, the field value emphasizes expressive performance features—tempo, microtiming, dynamics, and pedaling—as carriers of intentional expression, with guidance that models should aggregate multiple features and apply heuristics to discount isolated abrupt deviations while boosting the likelihood of intentionality for patterns that recur or follow a coherent expressive scheme. Excerpts detailing expressive piano performance research and datasets reinforce this signal set, showing that intentional expression is conveyed through smooth, patterned variations rather than isolated anomalies. The idea of consistency across takes or sections as a cue for intention—recurrent deviations likely signal deliberate choices—is reflected in the cited cross-take consistency heuristic. Finally, practical demonstrations of alignment-free note-level detection (and its limitations) illustrate concrete methods for detecting fine-grained deviations, which can be complemented by the proposed context-aware re-scoring step. Taken together, these sources justify a practical disambiguation pipeline: deploy a score-independent conspicuous-error detector, then re-score within local harmonic/rhythmic windows using style priors; monitor for recurring deviations across takes as stronger evidence of intention; and incorporate rich expressive-feature signals to differentiate expressive devices from mistakes. The strongest support comes from studies that directly address context-sensitive error conspicuity, from work on expressiveness in performance, and from two-stage detection paradigms; supporting methods and datasets provide concrete signals to implement in real systems.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### foundational_research_and_concepts
**Confidence:** high

The core field value centers on treating bugs as deviations from normally observed behavior and using mined patterns to detect such anomalies. Excerpts explicitly titled as Bugs as Deviant Behavior establish the foundational claim that bugs can be inferred by identifying behavior that diverges from common patterns in software systems, framing errors as deviant events within a statistical or rule-based landscape. Related excerpts extend this idea by describing how the general approach examines how frequent call sequences, rules, or expected patterns can be violated, enabling automatic inference of errors in large codebases. This aligns with anomaly-detection-style techniques where deviations from learned norms (frequent co-usage, ordering, or constraints) signal potential bugs. Additional excerpts discuss PR-Miner and related work on automatically extracting implicit programming rules, which provide concrete methodology for discovering latent patterns and violations that indicate defects. The inclusion of material on suppressions and fault-linding in static analysis offers context on how developers manage and interpret deviations (e.g., suppressions or intentional overrides) and how signals from such metadata can influence intent understanding, though these are more tangential to the exact deviant-behavior core. Taken together, these excerpts support a view of intent detection in code as an exercise in pattern mining, anomaly scoring, and violation of implicit norms, with practical techniques such as rule mining (PR-Miner) and anomaly-based detection forming the backbone of disambiguation between deliberate deviations and benign anomalies. The most directly relevant content provides the theoretical framing (bugs as deviant behavior) and concrete methodologies (mining frequent patterns and detecting violations) that compose practical disambiguation techniques for intent estimation in code analysis.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [PR-Miner: automatically extracting implicit programming ...](https://dl.acm.org/doi/10.1145/1095430.1081755)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [PR-Miner: automatically extracting implicit programming rules ...](https://www.semanticscholar.org/paper/PR-Miner%3A-automatically-extracting-implicit-rules-Li-Zhou/5eab6c72ba39e0fea5c3aac0c2f5f9cc0a03eb0c)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [s-nlp/xlmr_formality_classifier](https://huggingface.co/s-nlp/xlmr_formality_classifier)
  > This is the model presented in the paper "Detecting Text Formality: A Study of Text Classification Approaches". XLM-Roberta-based classifier trained on
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".

### pattern_and_consistency_analysis
**Confidence:** medium

The strongest support comes from discussions that explicitly mention intentional deviations or annotations signaling intent and how repeated or consistent patterns can indicate deliberate design choices. For example, a source notes that a sequence like a TODO or FIXME can mark intentional technical debt decisions, which aligns with the idea that repeated or consistent deviations carry different meaning than a single anomaly. Similarly, discussions about detaching or overriding components in design tooling (Figma) show concrete mechanisms by which teams intentionally deviate from defaults, especially when analytics reveal recurring detaches or overrides within a team or page, implying a deliberate branding or design strategy rather than mere error. In code analysis, suppression of static analysis warnings and the broader literature on bugs as deviant behavior provide parallels where isolated warnings or one-off deviations might be treated as incidental, whereas recurring patterns or local idioms can reflect intentional practices. In design-system contexts, the ability to detach instances or override component properties is described as an actionable, potentially intentional deviation, especially when such patterns occur across many instances or pages. Taken together, these excerpts articulate a core heuristic: a single, isolated deviation is more likely an error; a consistent, repeated deviation across a coherent scope is more likely intentional. The excerpts also reference concrete methods that systems use to detect intent, such as analyzing frequency of deviations (e.g., PR-Miner style patterns in code), hierarchical context (repository/module/file vs design system/page/component), and metadata signals like analytics showing recurring overrides. This directly maps to the fine-grained field value that emphasizes pattern and consistency analysis as a core disambiguation strategy across music, code, NLP, and design domains.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
- [A Study of Static Analysis Alert Suppressions](https://arxiv.org/pdf/2311.07482)
  > by G Liargkovas · 2023 · Cited by 4 — This paper extends existing work by extracting insights about unactionable static analysis alerts through various warning suppression features,.
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,
- [Building a Material Theme on Android: Color](https://m3.material.io/blog/android-material-theme-color)
  > Sep 1, 2020 — A Material theme includes color, typography and shape parameters which you can adjust to get near-infinite variations of the components.
- [componentPropertyDefinitions | Developer Docs](https://developers.figma.com/docs/plugins/api/properties/ComponentPropertiesMixin-componentpropertydefinitions/)
  > All component properties and their default values that exist on this component set. 'VARIANT' properties will also have a list of all variant options.
- [Advanced color customizations](https://m3.material.io/styles/color/advanced/define-new-colors)
  > Formerly known as custom colors. You can define additional colors in your scheme that stay static even when other colors dynamically change.
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and

### intent_confidence_modifiers
**Confidence:** medium

The finegrained field value concerns how a detection/analysis system can interpret signals that indicate intentional deviation, specifically when a justification is provided for a suppression or override. Excerpts that discuss suppressed static analysis warnings and the reasons behind suppression directly relate to signals that intent may be present and justified. For example, discussions of suppressions in code written in multiple languages highlight user-side motives for silencing warnings and tracking suppressions, which align with intent signaling through justification or context. References to NOLINT-style mechanisms show explicit mechanisms developers use to bypass checks, which can be enhanced when a justification or ticket link is included, thereby strengthening confidence in intentional deviation as deliberate rather than erroneous. In addition, documentation and studies that analyze why developers suppress warnings provide empirical backing for the idea that justification signals (when present) act as a strong positive modifier for intent estimation. The content about pragma controls and disablers in linting tools demonstrates practical metadata signals or patterns that systems can leverage to estimate intent, especially when such actions are accompanied by rationales or traceable metadata (e.g., ticket references). Together, these excerpts support a narrative that explicit justification signals (such as a ticket-linked justification in a suppression directive) can meaningfully boost confidence in the detection of deliberate deviation, whereas suppressions without justification tend to be weaker indicators. The latter parts, discussing how and why tools log detachments or suppressions and how developers use TODOs to mark intentional deviations, provide additional context for heuristics and metadata signals that can be used to modulate confidence in intent estimation even when formal justification is absent.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.

### explicit_metadata_signals
**Confidence:** high

The strongest evidence for explicit linter suppression signals comes from discussions of suppressed static analysis warnings and the reasons developers suppress them, which directly supports the notion of an explicit directive to ignore a violation and the accompanying rationale being a deliberate choice. Similarly, entries describing Self-Admitted Technical Debt (SATD) tags show developers labeling sub-optimal or deliberate deviations with TODO-like markers, signaling intentionality and planned follow-up. References that study or describe suppression rationale and the presence of justification text further strengthen the case that explicit metadata accompanies deviations, not just silent noise. In the design-system space, discussions of component overrides, component properties, and specific detach actions illustrate sanctioned, contextualized deviations within a controlled framework, which aligns with the concept of intentional design/system signaling rather than random aberration. The detachment topic, including analytics logs of detach actions, provides strong evidence that such deviations are tracked and intentional. Finally, references to commit messages and TODO-style signals in code, lint-override practices, and inline suppression directives (NOLINT) offer concrete, human-readable justifications and documented intents that systems can rely on to disambiguate intent. Collectively, these excerpts map onto the proposed signals such as explicit suppression directives, SATD tagging, formal contracts or assertions, allowed overrides or component property changes, design-token-guided deviations, and documented justification, including commit messages, all of which help a detection system estimate intent without explicit annotation. The ordering places the most direct and explicit signals (suppression notes and SATD with justification) at the top, followed by design-system override/detach signals, and finally meta-signals like commit messages and inline documentation of intent. This structure reflects a coherent signal ladder from explicit, itemized intents to broader system-level de facto signals of deliberate deviation.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### key_disambiguation_principles
**Confidence:** high

The fine-grained field value describes a structured set of principal signals and heuristics used to infer intent behind deviations: consistency across a scope, contextual fit with higher-level goals, explicit rationale or metadata, regularity in the local neighborhood, co-variation with other signals, provenance/governance, and reversibility tests. Direct, domain-specific evidence that maps to these signals strengthens the inference. Excerpts that discuss design system behavior and design-token language show how intentional deviation is expressed in practice: design tokens and overrides let designers signal deliberate changes rather than casual edits, and detaching or overriding components can signal intentional divergence from a shared baseline. For example, the discussion of component overrides in a design system explains that overrides can be applied to many properties and preserved, signaling intentional differentiation rather than an error. This aligns with the notion that intentional deviation in design is expressed through token-level changes and overrides that maintain semantic coherence rather than random noncompliance. Similarly, the material on detaching instances and related workflows demonstrates how breaking the linkage to a main component is a deliberate design choice rather than a mistake, especially when accompanied by governance artifacts. When researchers discuss suppressions and TODOs in software analysis, they reveal explicit rationales or governance signals that accompany deviations from strict rules, providing high-confidence cues about intent when documented. The broader discussions of suppression in static analysis show why metadata (justifications, suppressions) and contextual notes increase confidence in intent judgments. Likewise, a discussion of design tokens and the recommendation to use tokens rather than hardcoded values underlines how a principled approach to signaling intent relies on a codified mechanism (tokens) for controlled deviation. Taken together, these excerpts illustrate the core signals and practices that support the disambiguation of intent: explicit overrides and detachment in design tools; token-based signaling in design systems; and documented rationales in code-quality practices. While other excerpts touch on related topics (e.g., NLP error detection, music error detection), they contribute supportive context rather than the concrete, actionable signals highlighted by the field value. The strongest alignment comes from excerpts detailing explicit mechanisms of intentional deviation (overrides, detachment, tokens) and explicit rationales (TODOs, suppressions) and how governance and provenance impact the interpretation of deviations as intentional.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### design_systems_and_style_guides
**Confidence:** high

The most directly relevant information concerns how detaching an instance from its main component signals a deliberate deviation from the default component behavior, which aligns with the field value’s claim that detaching is a strong signal of intent and is only justified when part of a consistent pattern or justified. The description of detaching an instance as a utility to perform changes not supported by standard overrides aligns with the notion that detachment is a special-case signal rather than a routine override. The accompanying notes about Figma logs and analytics (detach events, library analytics) provide governance signals to detect patterns of detachment across a project, which supports the field value’s emphasis on analytics and pattern-based intent estimation. The discussion of overrides as a sanctioned deviation demonstrates that making changes via component properties or tokens is a deliberate design choice within the system’s rules, and analytics about which properties are overridden help identify opportunities for new variants or adjustments, supporting the claim that governance can discern intent from usage patterns. The mentions of component properties and their preservation indicate that intentional customization is traceable and intentional, not accidental. The Material Design references emphasize using design tokens as the sanctioned mechanism for customization, signaling deliberate, system-aligned intent rather than ad-hoc hardcoding, with governance implications such as token usage audits. Collectively, these excerpts form a coherent map of explicit signals (detach events, overrides, token-based customization) and governance signals (analytics, library usage, token governance) that a detection system can use to estimate intent about deviations from standard design rules. Direct quotes from these excerpts illustrate the core points: detaching an instance is a tool for fundamental changes beyond standard overrides; detach events are logged for governance; overrides are sanctioned deviations; token overrides are the intended customization method; governance analytics track token usage and overrides to infer intent.

- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .
- [componentPropertyDefinitions | Developer Docs](https://developers.figma.com/docs/plugins/api/properties/ComponentPropertiesMixin-componentpropertydefinitions/)
  > All component properties and their default values that exist on this component set. 'VARIANT' properties will also have a list of all variant options.
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Typography – Material Design 3](https://m3.material.io/styles/typography/type-scale-tokens)
  > Learn about Material Design typography. This guide covers everything from font styles and hierarchy to line height to create user-friendly text.
- [Advanced color customizations](https://m3.material.io/styles/color/advanced/define-new-colors)
  > Formerly known as custom colors. You can define additional colors in your scheme that stay static even when other colors dynamically change.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### implicit_pattern_based_signals
**Confidence:** high

The finegrained field value centers on a set of pattern-based signals to estimate intent behind a deviation: whether a deviation is deliberate or an error, based on consistency, contextual fit, learned baselines, co-variation of signals, and expressive bundling across related features. Several excerpts explicitly discuss how context and patterning differentiate intentional choices from mistakes, particularly in music, where coordinated changes across timing, dynamics, and articulation indicate intentional expression rather than random error. For example, studies on how listeners detect conspicuous vs. contextually integrated performance deviations emphasize that deliberate expressive choices involve smooth, patterned changes across multiple features, whereas abrupt, isolated anomalies are more likely errors. This directly supports the idea of Expressive Feature Bundling and Consistency/Co-variation as robust cues for intent in music. Related work on automatic detection of music performance errors using end-to-end models further illustrates how alignment and latent representations can reveal intentional deviations when they are part of a coherent expressive plan, not random mistakes. These sources provide concrete mechanisms to quantify consistency, provenance, and coherence of a deviation within a larger musical context, which maps to the proposed signals for consistency and repetition, contextual fit, and co-variation of companion signals. In code analysis, papers on suppressions of static analysis warnings illustrate how deliberate, context-dependent modifications (suppression decisions) can constitute intentional signals rather than errors, especially when analyzed alongside other changes or governance signals. This aligns with the Co-variation signal, where a bundle of related modifications (e.g., suppression decisions, lint handling, or intentional assertions) together indicate intent rather than a random bug. In NLP, research on dialects, grammatical error detection, and bias toward nonstandard varieties demonstrates how deviations can be contextually grounded in higher-level linguistic patterns (dialect, register, stylistic choice), which supports Contextual Fit as a key heuristic. In design systems, the literature on design tokens, component overrides, and detachment in Figma documents shows concrete practices where intentional deviations are signaled by token overrides, theme changes, or detached instances, which can be used as metadata signals implying deliberate design experimentation or context-specific customization. Finally, the broader corpus around code analysis, formal specification, and expert systems provides a wealth of signals for baseline norms and anomalies, which underpin the Deviation from a Learned Baseline and Expressive Feature Bundling heuristics. Taken together, the strongest support comes from direct musically grounded analyses of intentional expression vs error, with secondary but meaningful support from design-system overrides and code-level suppression signals, and supplementary context from NLP dialect and formality literature. 

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > 3

notation was done with Cubase 2 , and they were asked to
add an annotation at MIDI note 0 covering the span of the
time window which they judge as pertaining to an error.
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Automatic Classification and Repair of Static Analysis ...](https://arxiv.org/html/2509.11787v1)
  > Sep 15, 2025 — Static analysis tools are widely used to detect bugs, vulnerabilities, and code smells. Traditionally, developers must resolve these warnings
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .
- [Change components theming guide to encourage css ...](https://github.com/angular/components/issues/28612)
  > Feb 19, 2024 — I propose aligning the "@angular/material Theming your components" guide with the Material 3 philosophy by emphasizing the use of CSS custom properties over
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [What can NLP do for linguistics? Towards using ...](https://www.degruyterbrill.com/document/doi/10.1515/lingvan-2024-0001/html?srsltid=AfmBOorJMcqdQw9alDp6wfoWIcLANVvE6ZXvcC606tP_8XBQb8pzsw8f)
  > by L Nguyen · 2024 · Cited by 4 — This paper proposes a novel use of grammatical error detection/correction (GED/GEC) tools to document non-standard English varieties.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [15 Neural Network-based Detection of Self-Admitted ...](https://soarsmu.github.io/papers/2019/Ren2019SATD.pdf)
  > by X REN · 2019 · Cited by 188 — Observing the SATD patterns in these six projects suggests that they share many prominent SATD patterns, such as “todo,” “hack,” and “fixme.” As such, the
- [A Case Study of African-American English](https://aclanthology.org/2022.hcinlp-1.8.pdf)
  > by J Dacon · 2022 · Cited by 13 — Currently, natural language processing (NLP) models proliferate language discrimination leading to potentially harmful societal impacts.
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [What Makes a Good TODO Comment?](https://arxiv.org/pdf/2503.15277)
  > by H Wang · 2025 · Cited by 17 — Code comments with. TODO, FIXME or XXX tags are often used to represent instances of Technical debt (TD). Building on the concept of TD, Self-
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be

### executive_summary
**Confidence:** medium

The most relevant support comes from excerpts that explicitly discuss signals of intentional deviation encoded in artifacts or workflows. A TODO usage example demonstrates that TODOs can mark intentional detours or work in progress, signaling deliberate deviation from a baseline plan. In design tooling, detachments and overrides are described as intentional signals that detach an instance from a main component or that overrides communicate a designer’s deliberate variation from a canonical token or property. Figma’s component overrides and the ability to edit or detach illustrate how systems encode intent through metadata or structural changes, enabling downstream detectors to weight such deviations as intentional rather than errors. Static-analysis suppression studies provide evidence that users intentionally suppress warnings for strategic reasons, with explanations captured in the metadata or governance around those suppressions, reinforcing the idea that metadata signals and governance context are critical for intent estimation. The NLP and ML-oriented excerpts discuss error conspicuity and contextual dependence: some errors stand out only when viewed within context and expectations, while others are nuanced, which informs how a detector should weigh surrounding norms and consistency rather than judging isolated violations alone. In music research, evidence that alignment and context affect error signaling supports a broader heuristic: consistency of the deviation within a coherent context (e.g., a section that consistently breaks a rule) supports intentionality, whereas isolated violations are more likely to be mistakes. Together, these sources support a multi-signal approach to intent estimation: (a) model surrounding context and established norms, (b) identify patterns of consistent deviations across related segments, (c) detect metadata or governance cues such as overrides and suppression annotations, and (d) assign lower confidence to isolated, non-contextual violations. The most informative pieces are those that show explicit signals (TODOs, NOLINT-style pragmas, detaching/overriding behavior) because they demonstrate concrete encoding of intent, which is essential for automatic disambiguation across domains.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [A Study of Static Analysis Alert Suppressions](https://arxiv.org/pdf/2311.07482)
  > by G Liargkovas · 2023 · Cited by 4 — This paper extends existing work by extracting insights about unactionable static analysis alerts through various warning suppression features,.
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Typography – Material Design 3](https://m3.material.io/styles/typography/type-scale-tokens)
  > Learn about Material Design typography. This guide covers everything from font styles and hierarchy to line height to create user-friendly text.
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [Detecting Music Performance Errors with Transformers](https://arxiv.org/html/2501.02030v1)
  > The model inputs the score and the music student’s recorded audio, and labels the notes detected from the recording as “Missed”, “Extra”, or “Correct”.
  > This eliminates the need for complex pre-processing and post-processing steps, such as alignment and comparison,
  > 
Our method addresses the main limitations of previous methods, as shown in Tab. [1]
  > These time-warping algorithms suffer from alignment inaccuracies when notes that should be simultaneous fall out of sync.
  > To overcome these limitations, we introduce a learnable end-to-end model Polytune .
  > Jan 3, 2025 — In this paper, we introduce a transformer based-model (Vaswani et al. 2017) called Polytune to detect musician errors without relying on automatic alignment.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://www.youtube.com/watch?v=9lYkcP1qFM8)
  > Exploring the Role of Grammar and Word Choice in Bias Toward African American English (AAE) in Hate speech Classification Camille Harris,
- [Amazon's AI assistant struggles with diverse dialects, study finds](https://news.cornell.edu/stories/2025/07/amazons-ai-assistant-struggles-diverse-dialects-study-finds)
  > Jul 14, 2025 — A new Cornell study revealed that Amazon's AI shopping assistant, Rufus, gives vague or incorrect responses to users writing in some English dialects.
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .
- [Advanced color customizations](https://m3.material.io/styles/color/advanced/define-new-colors)
  > Formerly known as custom colors. You can define additional colors in your scheme that stay static even when other colors dynamically change.
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [15 Neural Network-based Detection of Self-Admitted ...](https://soarsmu.github.io/papers/2019/Ren2019SATD.pdf)
  > by X REN · 2019 · Cited by 188 — Observing the SATD patterns in these six projects suggests that they share many prominent SATD patterns, such as “todo,” “hack,” and “fixme.” As such, the
- [A Case Study of African-American English](https://aclanthology.org/2022.hcinlp-1.8.pdf)
  > by J Dacon · 2022 · Cited by 13 — Currently, natural language processing (NLP) models proliferate language discrimination leading to potentially harmful societal impacts.
- [arXiv:2206.08978v1 [cs.CL] 3 Jun 2022](https://arxiv.org/pdf/2206.08978)
  > by J Dacon · 2022 · Cited by 13 — Rachel Dorn. 2019. Dialect-specific models for auto- · matic speech recognition of African American Ver- · nacular English. In Proceedings of
- [Automatic Note-Level Score-to-Performance Alignments in the ...](https://transactions.ismir.net/articles/10.5334/tismir.149)
  > by SD Peter · 2023 · Cited by 39 — In this paper, we evaluate state-of-the-art automatic note alignment models applied to dataset generation. We increase the accuracy and reliability of the
- [(PDF) Self-Admitted Technical Debt and comments' polarity](https://www.researchgate.net/publication/362268914_Self-Admitted_Technical_Debt_and_comments'_polarity_an_empirical_study)
  > In this paper, we study the relationship between different types of SATD comments in source code and their polarity, to understand in which circumstances (and
- [Howard And Google Release New Dataset To Help AI ...](https://peopleofcolorintech.com/articles/howard-and-google-release-new-dataset-to-help-ai-understand-african-american-english/)
  > Jul 15, 2025 — Howard University and Google Research have released a dataset comprising over 600 hours of AAE dialects from 32 states to enhance AI's
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [Java Modeling Language (JML) and ESC/Java](https://people.eecs.berkeley.edu/~necula/autded/lecture14-jml.pdf)
  > by M Zennaro — Definition. – A method's precondition says what must be true to call it. – A method's normal postcondition says what is true.
- [Clang-Tidy — Extra Clang Tools 23.0.0git documentation](https://clang.llvm.org/extra/clang-tidy/)
  > clang-tidy is a clang-based C++ “linter” tool. Its purpose is to provide an extensible framework for diagnosing and fixing typical programming errors.
- [Add documentation regarding eslint-ignore comments # ...](https://github.com/eslint/eslint/issues/16426)
  > Oct 13, 2022 — I wanted to know how to add a justification to an eslint directive, the only reference to directives (which I didn't know that's what they are
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability
- [Assertion-level Proof Representation with Under- ...](https://www.researchgate.net/profile/Christoph-Benzmueller/publication/222432447_Assertion-level_Proof_Representation_with_Under-Specification/links/09e415098fd52f39ad000000/Assertion-level-Proof-Representation-with-Under-Specification.pdf)
  > by S Autexier · 2004 · Cited by 37 — We propose a proof representation format for human-oriented proofs at the assertion level with under- specification. This work aims at providing a possible
- [The norm of assertion: Empirical data](https://pubmed.ncbi.nlm.nih.gov/29684696/)
  > by M Kneer · 2018 · Cited by 63 — The studies here presented provide empirical evidence in favour of the view that a speaker is warranted to assert that p only if her belief that p is justified.
- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [Got tired of finding random detached or overridden ...](https://www.reddit.com/r/FigmaDesign/comments/1oumzcu/got_tired_of_finding_random_detached_or/)
  > It follows Figmas structure, if you "detach", figma adds info that it has been and thats what it finds. Hope this helps!
- [Tutorial on JML, the Java modeling language](https://www.researchgate.net/publication/220883206_Tutorial_on_JML_the_Java_modeling_language)
  > Nov 5, 2007 — JML, the Java Modeling Language, is the lingua franca of researchers working on specification and verification techniques and tools for Java.
- [Perceptions of assertion: An empirical analysis](https://www.sciencedirect.com/science/article/pii/S0005789479800283)
  > by RL Woolfolk · 1979 · Cited by 107 — Assertion was viewed as more polite, less neurotic, less hostile, and more satisfying to the recipient than aggression.
- [ComponentQA - Design System Audit, Detached Instances ...](https://www.figma.com/community/plugin/1564328602359376130/componentqa-design-system-audit-detached-instances-component-health-monitoring)
  > ComponentQA is the only Figma plugin that continuously monitors your design files 24/7 — catching broken components, token violations, style drift, and detached
- [PR-Miner: Automatically Extracting Implicit Programming ...](https://www.cs.purdue.edu/homes/xyzhang/fall07/Papers/PRMiner.pdf)
  > by Z Li · 2005 · Cited by 687 — This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [[2204.08975] Detecting Text Formality: A Study of ...](https://arxiv.org/abs/2204.08975)
  > by D Dementieva · 2022 · Cited by 21 — This work proposes the first to our knowledge systematic study of formality detection methods based on statistical, neural-based, and Transformer-based machine
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [clang-tidy: what might cause NOLINT comments to not be ...](https://stackoverflow.com/questions/62579934/clang-tidy-what-might-cause-nolint-comments-to-not-be-respected)
  > In the end I was confused between clang-tidy and clang-analyzer. NOLINT addresses clang-tidy issues, but I had to suppress clang-analyzer.
- [Commit-hook: mark "bugs-everywhere" issue mentioned in ...](https://stackoverflow.com/questions/25142797/commit-hook-mark-bugs-everywhere-issue-mentioned-in-the-message-as-done)
  > What I'd like to achieve: If a programmer commits changes and references the bug in the message he just fixed / feature he implemented (e.g. the
- [Program Analysis – Lecture 15 Specification Mining](https://software-lab.org/teaching/winter2019/pa/lecture_specification_mining.pdf)
  > PR-Miner: Automatically Extracting Implicit Programming. Rules and Detecting Violations in Large Software Code, Li &. Zhou, FSE 2005. Page 7. 4. Formal
- [PR-Miner: automatically extracting implicit programming ...](https://dl.acm.org/doi/10.1145/1095430.1081755)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [PR-Miner: automatically extracting implicit programming rules ...](https://www.semanticscholar.org/paper/PR-Miner%3A-automatically-extracting-implicit-rules-Li-Zhou/5eab6c72ba39e0fea5c3aac0c2f5f9cc0a03eb0c)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [s-nlp/xlmr_formality_classifier](https://huggingface.co/s-nlp/xlmr_formality_classifier)
  > This is the model presented in the paper "Detecting Text Formality: A Study of Text Classification Approaches". XLM-Roberta-based classifier trained on
- [Inline way to disable clang-tidy checks](https://stackoverflow.com/questions/37950439/inline-way-to-disable-clang-tidy-checks)
  > Just add a comment containing the string NOLINT anywhere on the line you want clang-tidy to ignore. For example:
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Guide to variables in Figma](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
  > Variables in Figma design store reusable values that can be applied to all kinds of design properties and prototyping actions.
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be

### music_and_art_computational_analysis.1
**Confidence:** high

The finegrained field describes Expressive Performance Features as deliberate artistic choices evidenced by nuanced tempo, microtiming, dynamics, and pedaling, with deliberate deviations showing consistent patterned behavior rather than isolated mistakes. Excerpt describing that listeners detect obvious mistakes depending on contextual appropriateness and familiarity provides direct support for distinguishing salient errors from intentional expression. The discussion that a conspicuous error is detectable by most formally trained listeners reinforces the notion that some deviations are clearly unintended, while others could be intentional expression when contextualized. The explicit statement that some mistakes stand out or may go unnoticed depending on context aligns with the idea that intent can be inferred from patterns rather than single incidents. A method that uses a tempo/tempo-relationship, timing and dynamic patterns to distinguish errors from intended expression—where a center of a segment is classified as an error or not using a model architecture like a temporal backbone and classifier—gives concrete computational support for detecting intentional deviations through recurring, patterned signals. Additional excerpts extend this to expressive performance research that analyzes tempo, timing, dynamics, and pedaling as primary carriers of expressive intent and discuss data collection and model-driven evaluation, which further corroborates the target field value by showing how intentional expression is conveyed and recognized, and how models can be trained to favor patterns consistent with intent rather than isolated anomalies. Collectively, these excerpts establish a foundation for separating deliberate expressive deviations (characterized by recurring patterns and coherent timing/dynamics/pedaling) from unintended mistakes, and illustrate how a computational approach aggregates multiple features to infer intent, providing concrete heuristics and model architecture guidance relevant to the field value.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### code_analysis_and_software_engineering.0
**Confidence:** high

The field value identifies a 'Suppressed Warning' signal and enumerates concrete suppression mechanisms like NOLINT, NOLINTNEXTLINE, pylint disable, and @SuppressWarnings. The excerpts establish that suppressions are used in multiple languages to acknowledge a static-analysis warning while deeming it a false positive or a necessary deviation due to tooling or framework constraints, which directly maps to the stated intent_implication. For example, references to suppressions in three popular languages and discussions of why users suppress warnings provide empirical grounding that such actions convey intentional deviation acknowledged by the developer. The notes on NOLINT and related directives show explicit, reusable signals that indicate deliberate bypassing of a warning rather than an accidental overlook. Additional content on suppressions being studied empirically reinforces that these practices are common legitimate strategies, aligning with the described intent implication that suppression signals an intentional decision rather than an error. Collectively, these points demonstrate how a detection system could treat suppression directives as strong indicators of intentional deviation, and how metadata like the presence of suppression comments and language-specific tooling signals can modulate confidence about intent.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### music_and_art_computational_analysis.3
**Confidence:** medium

The field value asserts that repetition across takes or sections signals intentional deviation, while a one-off error is likely unintentional. Excerpt describing a method that outputs the probability of a center segment being a conspicuous error directly informs how a system can flag deviations as potentially unintentional, which is relevant as a baseline for detecting mistakes vs intentional choices. Excerpts that discuss how the salience of mistakes depends on contextual appropriateness and a listener’s familiarity capture the idea that perception of intentionality is context-sensitive, aligning with the notion that consistent patterns across takes increase the likelihood of intent. Additional excerpts describe how performance errors are detected and modeled, which provides practical mechanisms for evaluating deviations and their potential intentionality, especially when leveraging pattern-based detection and model-driven scoring. The companion data mention offers practical resources for where such consistency-related observations might be illustrated or validated, reinforcing the applicability of pattern repetition as a signal. Collectively, these excerpts support the idea that consistency and recurrence of deviations across performances can be used as a heuristic to estimate intent, while isolated deviations lack that corroborating pattern.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag

### code_analysis_and_software_engineering.1
**Confidence:** medium

The most relevant material directly discusses explicit signals that indicate intentional debt or deviation in code: suppressions of static analysis warnings reveal a deliberate choice to bypass certain checks, which aligns with SATD where a suboptimal or incomplete state is knowingly accepted. The discussion of suppressions across multiple languages and tooling indicates a recognized pattern of signaling intent to defer or rethink issues rather than fix them immediately. The existence of explicit markers that silence lints (NOLINT, NOLINTNEXTLINE) represents a concrete mechanism for practitioners to communicate intentional design choices or technical debt, which is a core aspect of the requested field value. The TODO-oriented piece highlights the common practice of tagging code with notes to revisit later, serving as a forward-looking signal of planned improvement and deliberate deviation from pristine code quality. Together, these excerpts map directly to the characteristic SATD mechanism (tags and warnings as intentional markers) and its justification (to meet deadlines or manage complexity) and show how tools and conventions encode intent in code. Some excerpts address broader norms around assertions and design decisions, which provide context for how intent is communicated in other domains (code, design systems) but are less central to the SATD mechanism. Still, they illustrate analogous signaling practices that detection systems could leverage (e.g., explicit admission notes in comments across domains). The sustained pattern across multiple sources—explicit suppression, explicit markers like TODO/HACK, and tooling allowances (NOLINT) for intentional deviations—provides converging evidence that these are reliable indicators of intentional DEV debt signals and justify their prioritization in intent estimation heuristics.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability

### challenges_and_limitations.challenge
**Confidence:** high

The most directly relevant passages describe how classifiers can misinterpret dialectal speech as negative or toxic, which is a form of systemic bias arising from training data and labeling conventions. For example, the discussion that a mismatch can cause models to misclassify dialectal expressions and label neutral or positive AAE as negative or toxic directly supports the notion of systemic bias affecting outcomes. Relatedly, analyses of how grammar and word choice influence bias toward African American English in hate speech classification provide concrete evidence that normative judgments in models reflect biased assumptions about language varieties. Additional context about AAVE-focused datasets underscores data-driven roots of bias, illustrating how sample composition and labeling conventions can encode normative biases into models. Beyond NLP, mentions of design systems and component overrides touch on normative signals in interfaces, where intentional deviations can encode design norms or break expectations, which relates to how systemic standards are enforced or flexed. Taken together, these excerpts illustrate the core challenges of systemic and normative bias across detection, evaluation, and design contexts, including the need for metadata signals and heuristics to distinguish biased outcomes from valid deviations. The breadth of examples—from dialect-based bias in classification to design overrides signaling intentional deviation—helps triangulate how bias emerges and can be mitigated through targeted techniques and contextual cues.

- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's

### music_and_art_computational_analysis.2
**Confidence:** high

The fine-grained field value centers on detecting specific mistakes in performances and distinguishing deliberate deviations from errors, with a focus on alignment-free transformer approaches (e.g., Polytune) and the challenge of missed notes in dense textures. Excerpt describing a piano-roll based method using a TCN and a 1D convolution classifier directly supports the idea of a computational pipeline for identifying conspicuous segments that may be errors, aligning with the notion of fine-grained error detection. Excerpts detailing Polytune—an end-to-end transformer for music error detection—support the use of alignment-free, reference-agnostic comparisons for robust error detection in performances, which is foundational to the proposed approach. Additional excerpts discuss error salience and contextual factors that influence whether a mistake is noticed, which helps explain why a system must use heuristics and metadata signals beyond raw detections to estimate intent behind deviations. Other excerpts address the broader challenge of distinguishing intentional deviations from mistakes through performance perception and the role of expressive versus rule-consistent behavior, which informs the context signals a detector could leverage. Finally, references to expressive datasets and note-level analysis underscore the data-driven basis for fine-grained detection, reinforcing the practical feasibility and limitations of current approaches.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### natural_language_processing_applications.0
**Confidence:** high

The most directly relevant material discusses distinguishing dialect differences from grammatical errors in language models and NLP tasks. It questions whether features associated with dialects like African American English can be misinterpreted as errors, and it explicitly considers features such as dialect identification to adjust downstream GEC (Grammatical Error Correction) behavior. One cited work explores whether tools can accurately interpret dialectal features and differentiate them from grammar, which directly informs a dual-path approach that treats standard grammar checks differently when dialect indicators are present. Another piece investigates the role of grammar and word choice in bias related to dialects in hate-speech classification, illustrating how misclassifications arise when dialectal features are conflated with error signals. Additional sources discuss identifying AAE lexical items and the impact on models, highlighting how dialect-aware analysis can prevent over-penalizing non-standard forms. A survey of grammatical error correction methods provides context for how systems traditionally treat non-canonical forms, which is useful for designing downstream disambiguation pipelines in the presence of intentional variation. Studies on formality detection further demonstrate how varying linguistic styles are categorized, offering complementary signals for intent and stylometric analysis that can aid in distinguishing intentional deviation from mistakes. Together, these excerpts support a multi-path or ensemble approach: a dialect-identifier or classifier to flag potential intentional variation, a standard GEC tool to assess possible errors, and a consistency heuristic across extended text to gauge whether deviations are intentional or erroneous. They also suggest leveraging annotated corpora and datasets like TwitterAAE to train and evaluate dialect-aware models, aligning with the need for metadata signals and pattern-based heuristics to estimate intent without explicit annotations.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP

### code_analysis_and_software_engineering.2
**Confidence:** high

The core field value describes the presence of an assertion or contract (e.g., pre/post-conditions) as a deliberate guard for edge cases, acting as a local safety harness for an unconventional pattern. The most directly relevant material discusses the role and norms of software assertions: one excerpt explicitly investigates the relationship between assertions and code quality, providing empirical grounding that using assertions can reflect deliberate intent to safeguard correctness rather than mere documentation or incidental checks. That establishes a link between assertion usage and perceived intent behind code structure. Another excerpt surveys the normative status of assertions, contributing a theoretical grounding on when and how assertions are considered appropriate in practice, which supports interpreting assertions as intentional design choices rather than accidental mistakes. A third excerpt describes tooling (clang-tidy) that supports suppressing checks via NOLINT or its equivalents; this demonstrates how developers signal deliberate deviation from guidelines when an assertion or check is intentionally bypassed, which is a concrete mechanism to convey intent about deviation. A closely related piece discusses the broader practice of using TODOs in code as signals of intended future work or deliberate focus shifts, reinforcing the idea that explicit markers accompany intentional deviation. Additional excerpts concerning suppression of static analysis warnings illustrate that developers sometimes choose to suppress checks for strategic reasons, providing context for how intent can be inferred from suppressions as well as from explicit guards. Collectively, these excerpts map the landscape where automatic checks and explicit contracts coexist, and where signals (assertions, NOLINT, TODOs, suppressions) serve to communicate deliberate design decisions rather than unintentional errors. Taken together, they support the claim that an assertion or contract guarding unusual or potentially unsafe code demonstrates deliberate intent to enforce specific conditions, thus functioning as a local safety harness for an unconventional pattern. The surrounding tooling discussions (NOLINT and suppression mechanisms) give concrete methods for encoding that intent in the presence of external checks, which aligns with practical disambiguation techniques and metadata signals for intent estimation.

- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### foundational_research_and_concepts.concept_or_paper_title
**Confidence:** high

The user is researching how evaluation and detection systems distinguish intentional deviation from unintentional error, with a focus on bugs or deviant behavior as a form of anomaly detection in code, and related domains (music/art, NLP, design systems). The most directly relevant information comes from foundational work that treats bugs as deviant behavior and proposes general approaches to infer errors in systems code. Specifically, excerpts that explicitly discuss bugs as deviant behavior and methods to detect deviations from normal execution patterns provide core concepts for disambiguating intent from error. These sources articulate that bugs can be seen as deviations from typical, frequent sequences or rules, and that inferring intent involves analyzing deviation patterns, context, and frequency over time. Supporting excerpts extend this idea to related methodologies: data-mining approaches that extract implicit programming rules to identify unusual patterns, which aligns with anomaly-detection heuristics for intent estimation; discussions of TODOs and deliberate deviations in practice as signals of intentional choice; and broader discussions of detecting deviation in natural language and design systems as analogous problems. Collectively, these excerpts demonstrate a common theme: intentional deviations often form consistent, rule-based patterns across a section or component, whereas mistakes tend to be isolated or inconsistent. The most relevant content directly asserts or exemplifies the central notion of treating bugs as deviant behavior and inferring intent from deviation patterns, while supporting content expands the methodology to related domains and practical signals that can be incorporated into detection systems. The key ideas to extract for practical disambiguation include: (a) modeling deviations as deviant from frequent or expected patterns, (b) using rule-extraction or frequent-itemset mining to identify implicit norms, (c) recognizing that consistent rule-breaking across a region suggests intent, and (d) leveraging metadata cues (like deliberate suppression or stylistic overrides) as signals of intentional deviation across the target field. Overall, the evidence supports the thesis that anomaly-detection-inspired heuristics can be applied to estimate intent without explicit annotation, and provides concrete techniques and signals that can be translated into practical reliability and risk assessment workflows.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [PR-Miner: automatically extracting implicit programming ...](https://dl.acm.org/doi/10.1145/1095430.1081755)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [PR-Miner: automatically extracting implicit programming rules ...](https://www.semanticscholar.org/paper/PR-Miner%3A-automatically-extracting-implicit-rules-Li-Zhou/5eab6c72ba39e0fea5c3aac0c2f5f9cc0a03eb0c)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [s-nlp/xlmr_formality_classifier](https://huggingface.co/s-nlp/xlmr_formality_classifier)
  > This is the model presented in the paper "Detecting Text Formality: A Study of Text Classification Approaches". XLM-Roberta-based classifier trained on

### music_and_art_computational_analysis.0
**Confidence:** high

The targeted field value describes a principled distinction between an error and an intentional expressive device by evaluating coherence with surrounding harmonic and rhythmic context. Excerpts directly establish that listeners notice or fail to notice mistakes based on their contextual appropriateness and the performer's familiarity, which supports the notion that context is essential for disambiguation. The definition of a conspicuous error as a performance anomaly detectable by trained listeners, independent of the score, further grounds the idea that detection should account for expected musical structure. The proposed computational approach—first flagging locally salient anomalies with a score-independent detector and then re-scoring these anomalies using surrounding context windows and style priors to separate true errors from structural elements like motifs or ornaments—embeds a two-stage methodology that matches the field value’s description of combining anomaly signaling with contextual re-evaluation. Additional excerpts discuss transformer-based error detection and end-to-end alignment with scores, which illustrate practical instantiations of the detection-prioritization process, reinforcing the idea that machine learning models must use context and pattern priors to avoid mistaking deliberate expressive deviations for errors. Related content on expressive performance datasets and note-level feature analysis provides practical grounding for the kinds of signals (tempo, dynamics, microtiming) that inform whether a deviation is likely intentional or erroneous, thereby supporting the confidence in a heuristic framework that uses both local salience and broader musical structure to estimate intent. Overall, these excerpts collectively support a two-stage detection framework anchored in contextual coherence and pattern-based re-evaluation to distinguish conspicuous errors from intentional expressive choices, with a rationale that a deviation breaking local harmony or rhythmic expectation is more likely an error unless it aligns with a broader pattern or motif.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### practical_disambiguation_techniques.4
**Confidence:** high

The most directly relevant content discusses Figma analytics and the detachments of component instances, which aligns with the field value’s focus on platform analytics used to enumerate, track, and cluster overrides and detachments to distinguish deliberate deviations from mistakes. Specifically, a report about Figma analytics detaching accuracy highlights how analytics capture detach events when users use the Detach instance setting to break the link between an instance and its main component, which directly supports the idea of monitoring deliberate deviations at scale. Library analytics content is also highly relevant as it describes tracking and comparing usage of published libraries, components, styles, and variables, which is central to governance and governance-based disambiguation of intentional changes across a system. An article on component overrides explains that overrides can be used to modify many properties of a component, providing the governance signals necessary to identify intentional deviation patterns. Discussions about detaching instances and reattaching them further illustrate governance-oriented tooling to monitor state changes in component usage. Additional material about editing instances with component properties and fixing detached instances reinforces the practical workflows and metadata signals that help separate deliberate overrides from inadvertent changes. Together, these sources illuminate practical disambiguation techniques, necessary metadata signals, and governance-oriented patterns for detecting intentional deviations within design systems. 

- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### practical_disambiguation_techniques.1
**Confidence:** high

To connect the finegrained field value to the excerpts, I focus on pieces that discuss how developers reveal or suppress signals that could indicate intentional deviation, which is central to disambiguating intent in code. The excerpt about suppressed static analysis warnings directly investigates why users silence warnings and what that implies about deliberate deviation versus noise or bugs; this provides concrete methods for recognizing intentional patterns when conventional signals are muted. The companion excerpt elaborates on the motivations behind warning suppressions, offering context for how such metadata signals can serve as heuristics in intent estimation rather than mere error annotation. The TODO-focused excerpt explicitly discusses intentional deviation signals embedded in project practices (TODO items signaling future work or deliberate divergence) and how tools may surface or leverage these cues as part of detect-and-interpret workflows. The self-admitted technical debt work adds another angle: the polarity and categorization of comments can reveal developers’ intent to defer or acknowledge deviations, adding a layer of metadata that can inform intent estimation. Altogether, these excerpts support a practical approach where the detection system uses (a) explicit suppression signals, (b) deliberate override-like practices (TODOs, debt labels), and (c) polarity or sentiment in comments to infer intent, mapping closely to the idea of mining implicit rules and detecting violations as likely bugs rather than mere mistakes. The approach aligns with the underlying principle of frequent pattern mining for anomaly detection by identifying common intentional patterns and distinguishing them from random errors through corroborating metadata signals and explicit developer annotations.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [(PDF) Self-Admitted Technical Debt and comments' polarity](https://www.researchgate.net/publication/362268914_Self-Admitted_Technical_Debt_and_comments'_polarity_an_empirical_study)
  > In this paper, we study the relationship between different types of SATD comments in source code and their polarity, to understand in which circumstances (and

### practical_disambiguation_techniques.0
**Confidence:** high

The most relevant evidence highlights that listeners can detect obvious mistakes in piano performances when considering the surrounding musical context, which supports the idea of context-aware anomaly scoring. It also notes that the salience of mistakes depends on contextual appropriateness and a listener’s familiarity, further underscoring that anomaly assessment should be grounded in surrounding musical priors. Additionally, a clear definition of conspicuous errors is that they are detectable by trained listeners, reinforcing the need for salience-based scoring that factors in context and expertise. A related methodological reference describes a fast alignment approach for performance errors in polyphonic music, which aligns with the notion of re-evaluating potential anomalies against the surrounding musical context. Complementary sources discuss expressive performance analysis through features like tempo, timing, dynamics, and microtiming, and note-level analysis of pitch and velocity to reveal expressive characteristics; these inform which contextual signals (rhythmic, harmonic, timbral cues) should feed an anomaly-scoring model. Taken together, these excerpts substantiate a framework where context, prior expectations, and surrounding musical priors dynamically modulate the perceived salience of potential deviations, guiding a context-aware anomaly scoring technique for music performance analysis.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.

### natural_language_processing_applications.2
**Confidence:** high

The fine-grained field focuses on handling poetic license and creative language in NLP by distinguishing intentional stylistic deviations from errors, and proposes a detection approach that uses genre/style classification to treat creative texts differently rather than as prescriptive errors. The most relevant excerpts discuss the core challenge of separating dialectal or stylistic variation from grammatical error, and they propose concrete strategies that map well onto the requested approach. In particular, there is explicit discussion of identifying features that indicate dialect differences and distinguishing those features from errors: one excerpt notes the goal of identifying dialect features and distinguishing them from grammatical errors, which is exactly the crux of disambiguating intentional deviation from mistakes. Building on that, another excerpt highlights how bias and classification systems can misinterpret dialectical usage, underscoring the need for models that understand stylistic variation rather than treating it as error. A related source surveys grammatical error correction and emphasizes linguistic challenges in distinguishing genuine errors from acceptable stylistic choices, reinforcing the need for a non-prescriptive mode of analysis in creative text. Additional excerpts discuss formality and genre/classification tasks, which provide practical methods for detecting and adapting to variation in style signals rather than enforcing uniform grammar, aligning with the proposed approach to flag deviations as intentional or stylistic rather than as errors. Earlier works on AAVE/dialectal variation illustrate concrete datasets and analyses that inform how to handle non-standard language without mislabeling it as incorrect. Finally, broader discussions of formality detection contribute to understanding context-dependent signals and metadata cues that help estimate intent across different domains. Taken together, these excerpts support a framework in which intent-disambiguation relies on genre/style classification, dialect-aware features, and context-sensitive evaluation, rather than prescriptive grammar alone, and they underscore the importance of not marking deliberate deviations as errors when the context signals stylistic or communicative purposes.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.

### challenges_and_limitations.description
**Confidence:** medium

The central claim concerns how systems can tell intentional deviation from error when deviations are deliberate but stylistically valid. Excerpts describing NLP bias and dialect misclassification show that models trained on standard forms can falsely flag intentional stylistic choices as errors, highlighting the need for context-aware interpretation and metadata signals. The discussion of grammar and word choice in bias studies illustrates that deviations from standard forms can carry meaning and intent, and that detection should leverage contextual cues rather than blanket suppression of nonstandard forms. The references to TODO usage and lint/pragma controls provide concrete signals that practitioners use to denote intentional deviation or override, which can be repurposed as explicit metadata signals for intent estimation (e.g., TODOs signaling planned or deliberate behavior, or lint disables indicating sanctioned deviations). The notes on debugging and code analysis emphasize that consistency across a section or corpus strengthens the case for intent (a single anomaly might be a mistake; a repeated pattern across a region suggests deliberate design). The Figma-related discussions on component overrides and detachment illustrate how design systems encode intentional deviations from a baseline component through controlled override mechanisms, which can be analogized to NLP and code practices as signals of intent rather than errors. Taken together, effective disambiguation techniques include: context-aware evaluation that weighs surrounding linguistic or structural context; detection of consistency patterns across sections to infer deliberate deviation; explicit metadata signals (e.g., override flags, pragma disable/enable, TODO annotations) to indicate intent; and domain-specific heuristics that treat certain deviations as permissible within a defined rule set. Confidence modifiers should escalate when multiple corroborating signals (e.g., consistent across tokens, presence of explicit override markers, and alignment with design/system tokens) support intentional deviation, and should decrease when deviations lack corroborating context or explicit intent markers.

- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et

### natural_language_processing_applications.1
**Confidence:** medium

Formality detection studies provide concrete methodology for estimating formality levels in text, including using annotated formality corpora to train and evaluate models. This aligns directly with the finegrained field value’s focus on identifying intentional shifts in formality or register and how context (genre or source) informs priors. Excerpt describing using formality classifiers and priors from genre/context shows how a detection system might estimate intent when formality deviates intentionally. The second strong point comes from work discussing language models and dialect differences, which addresses distinguishing intentional stylistic choices from grammatical errors, a core requirement for disambiguating intent in NLP. This supports the idea that contextual cues and features beyond grammar can signal intent, such as dialect features or register cues. Excerpts on grammar-focused tasks and error correction provide necessary background on when deviations are treated as errors versus stylistic choices, reinforcing the need for confidence modifiers when a system encounters non-standard forms. Additional sources about bias toward dialects and the impact of non-standard language on classification illustrate potential metadata signals and evaluation considerations when intent is ambiguous. Together, these excerpts offer a coherent basis for implementing practical disambiguation techniques (formality classifiers, dialect-aware features, context priors, and error-versus-style heuristics) and for proposing metadata signals (genre/source, formality annotations, dialect indicators) to improve intent estimation. They also support the idea of varying confidence based on context and consistency across sections, as deviations that persist across sections are more likely intentional rather than mistakes.

- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et

### foundational_research_and_concepts.core_idea
**Confidence:** high

The central claim is that bugs can be found by spotting deviations from statistically common patterns and by mining implicit rules from large codebases. This is directly supported by methods that use frequent itemset mining to extract implicit programming rules and then flag violations of those rules as potential errors. The cited work on PR-Miner formalizes this approach, describing a general method that uses frequent itemset mining to efficiently uncover implicit rules governing code, which provides a concrete mechanism for identifying deviations as bugs. Related literature on bugs as deviant behavior expands this idea by treating bugs as deviations from frequent calling patterns and sequences, arguing that unusual or infrequent patterns can indicate errors, thereby reinforcing the view that deviations from learned normal patterns are computably useful signals for bug detection. Additional related discussions emphasize extracting such rules from codebases (e.g., function call pairings and deviant sequences) to support automated detection of anomalies. While some excerpts touch on broader notions of intentional deviation signaling (such as TODO markers or stylistic deviations in other domains), the strongest connections to the field value come from works that operationalize deviation-from-patterns as the core bug-detection signal and from those that formalize the mining of implicit rules to define what constitutes a deviation worth flagging. Collectively, these excerpts underscore a practical disambiguation technique: learn normative patterns from large corpora and flag departures from those learned patterns as potential errors, with confidence modifiers emerging from the degree of deviation and consistency across related code regions.


- [PR-Miner: automatically extracting implicit programming ...](https://dl.acm.org/doi/10.1145/1095430.1081755)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [PR-Miner: automatically extracting implicit programming rules ...](https://www.semanticscholar.org/paper/PR-Miner%3A-automatically-extracting-implicit-rules-Li-Zhou/5eab6c72ba39e0fea5c3aac0c2f5f9cc0a03eb0c)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [s-nlp/xlmr_formality_classifier](https://huggingface.co/s-nlp/xlmr_formality_classifier)
  > This is the model presented in the paper "Detecting Text Formality: A Study of Text Classification Approaches". XLM-Roberta-based classifier trained on

### foundational_research_and_concepts.authors_or_origin
**Confidence:** medium

The requested finegrained field value identifies two foundational sources: Engler et al.'s Bugs as Deviant Behavior (a general approach to inferring errors in systems code) and Li & Zhou's PR-Miner (a method for automatically extracting implicit programming rules). The most directly relevant excerpts explicitly discuss or title these works, establishing their role as core precedents in detecting deviations, inferring errors, and mining implicit rules. Several excerpts reference Engler et al. in the context of analyzing bugs as deviant behavior and inferring errors from system code, which supports the notion that deviations from expected patterns can be recognized and categorized. Other excerpts cite Li & Zhou's PR-Miner, which describes a data-mining approach to uncover implicit rules that govern programming patterns, aligning with techniques to distinguish deliberate patterns from bugs. Additional excerpts reiterate these authors or provide related foundational material, reinforcing the origin and influence of these works. Collectively, they establish the provenance of the cited authors/origin and provide methodological anchors (deviant-behavior framing and implicit-rule mining) that underpin detection of intentional deviation versus errors. While one excerpt discusses a TODO practice as an example of intentional deviation, the core supports for the exact authors/origin remain grounded in Engler et al. and Li & Zhou, with PR-Miner as the linked methodological origin.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [PR-Miner: automatically extracting implicit programming ...](https://dl.acm.org/doi/10.1145/1095430.1081755)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [PR-Miner: automatically extracting implicit programming rules ...](https://www.semanticscholar.org/paper/PR-Miner%3A-automatically-extracting-implicit-rules-Li-Zhou/5eab6c72ba39e0fea5c3aac0c2f5f9cc0a03eb0c)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".

### practical_disambiguation_techniques.5
**Confidence:** medium

The requested fine-grained field value describes a cross-domain heuristic called a Counterfactual Rewriting Test, where a deviation from a rule is evaluated by conceptually correcting it to a rule-conforming form and observing whether this correction degrades a measurable objective. If correction worsens performance or fidelity, the original deviation is inferred as intentional; if correction improves it, the deviation is likely unintentional. The excerpts that most directly support this idea discuss the detection and interpretation of intentional versus unintentional deviations across domains, providing concrete signals and contexts to apply such counterfactual reasoning. For example, one excerpt explicitly notes that intentional deviations can be signaled by the act of overriding or detaching components in design systems, which aligns with the notion of deliberate divergence that users or designers might justify as intentional when the correction would harm design consistency or objectives. This aligns with the broad principle of testing the deviation by applying a corrective, rule-conforming version and evaluating the impact on a target objective such as usability, consistency, or fidelity. Another excerpt discusses how in modern design tooling, overrides and detaches can indicate intentional modification of a component or token, providing a metadata-rich signal for intent that can be weighed when inferring whether a deviation is deliberate. In code practices, discussions of suppressed warnings and intentional technical debt highlight contexts where deviations are purposefully introduced or hidden, implying that intent can be inferred by evaluating the consequences of removing or surfacing those deviations. In music and NLP contexts, the literature frames deviation as errors versus intentional stylistic choices, suggesting a framing where a counterfactual correction would impact perceptual salience, grammaticality, or expressiveness, thereby offering measurable hedges to judge intent. Taken together, the collection supports a cross-domain methodology: (a) apply a rule-conforming counterfactual to the deviation, (b) evaluate against domain-relevant objectives (e.g., test performance, design contrast, perceptual salience, grammar quality), (c) use contextual and consistency signals (e.g., repeated rule-breaking across a section, persistent overrides) to infer higher likelihood of intentionality. The document about how detaching or overriding components in design systems could be a deliberate signal of deviation directly furnishes a practical mechanism for capturing signals of intent, while the literature on errors and expressiveness in music and language provides the rationale for which objectives to monitor when applying the counterfactual test. The combination offers a concrete, cross-domain technique: use a counterfactual correction to a deviation, observe the resulting impact on a validated objective, and weigh the evidence from context consistency, overrides/tokens, and perceptual or functional outcomes to estimate intent with a quantified confidence modifier.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [(PDF) Self-Admitted Technical Debt and comments' polarity](https://www.researchgate.net/publication/362268914_Self-Admitted_Technical_Debt_and_comments'_polarity_an_empirical_study)
  > In this paper, we study the relationship between different types of SATD comments in source code and their polarity, to understand in which circumstances (and
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [EXPRESSIVE Definition & Meaning](https://www.merriam-webster.com/dictionary/expressive)
  > 6 days ago — 1. of or relating to expression; the expressive function of language. 2. serving to express, utter, or represent; foul and novel terms expressive of rage.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### challenges_and_limitations.example
**Confidence:** medium

The field value asserts that NLP systems may misclassify features of African American English as grammatical errors due to insufficient training on AAE grammar. An excerpt noting that this mismatch causes models to misclassify dialectal expressions—labeling neutral or positive AAE as negative or toxic—directly supports the claim that grammar-aware detection systems struggle with AAE, which is a core concern of GEC-style evaluation under dialectal variation. Another excerpt discusses bias in hate speech classification linked to AAE grammar and the risk of incorrect judgments when dialectal features are misinterpreted. A third excerpt connects AAE grammar and bias in NLP classifiers, reinforcing that the presence of dialectal grammar can influence detection accuracy and error labeling. A fourth excerpt explicitly situates the challenge within the context of AAE grammar and bias in hate speech classifiers, further supporting the general claim that detection systems may misinterpret AAE features as errors. Collectively, these excerpts provide evidence that (a) dialectal features can be misread as grammatical mistakes, (b) classifiers can be biased against AAE due to data limitations, and (c) such misclassifications affect evaluation and detection performance, aligning with the described GEC-related challenge of distinguishing deliberate deviation (stylistic choices) from actual errors.

- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.

### challenges_and_limitations.mitigation_strategy
**Confidence:** high

The requested finegrained field value describes a dual-path strategy for intent estimation: first identify dialect/style with high confidence, then down-weight grammatical flags that are characteristic of the identified variety, and expose a user option to treat deviations as style rather than error. Excerpts discussing how dialectal varieties (such as African-American English) interact with bias in NLP models illuminate how contextual cues (language variety) can be used to avoid misclassifying intentional stylistic choices as errors. They also illustrate that lack of awareness of variety can produce systematic errors, underscoring why a dual-path analysis—recognizing style while evaluating intent—helps disambiguate intent. Additional NLP-focused excerpts emphasize that recognizing when a variation is due to style rather than error can improve classification outcomes and reduce false positives, aligning with the proposed down-weighting of stylistic grammatical flags when a known variety is detected. In the code domain, documentation and discussions about enabling/disabling warnings (pragma controls) demonstrate concrete mechanisms for distinguishing deliberate deviations from bugs, including per-line controls and global enable/disable patterns—these provide actionable heuristics for the dual-path approach to modulate scrutiny based on detected intent. In the design systems space, references to detaching components and using overrides illustrate formalized signals of deliberate deviation (overrides are a designed feature rather than a bug), and tokens/designer tooling show how systems can encode the intention of deviation structurally. Together, these excerpts support a practical framework where (a) detect stylistic/varietal context, (b) selectively attenuate false-positive flags tied to that context, (c) offer user-facing options to treat such deviations as style, and (d) leverage metadata and structural signals (e.g., overrides, tokens, detachments) to communicate intent. The emphasis on consistency—across a section or scope—also aligns with the heuristic that consistent rule-breaking points toward deliberate intent, while a single deviation may be construed as an error.

- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's

### practical_disambiguation_techniques.3
**Confidence:** high

The core idea is to run a standard Grammatical Error Correction (GEC) system in parallel with a dialect or style classifier to avoid mislabeling dialectal or stylistic variations as errors. A survey of Grammatical Error Correction highlights fundamental linguistic challenges in GEC that will be mitigated when the system explicitly accounts for non-standard but legitimate style. This supports the notion that a separate modality should assess style or dialect before applying or weighting GEC corrections, enabling downstream decisions to down-weight or reinterpret GEC flags when a non-standard register is confidently detected.

Further, studies exploring grammar and word choice in bias toward African American English (AAE) in hate speech classification show that dialectal features can influence error perception and classifier decisions. This directly informs the need for a dialect-aware subcomponent that distinguishes between stylistic variation and genuine errors, preventing misclassification and reducing bias. The emphasis on how specific dialect features interact with downstream NLP tasks aligns with the proposed dual-path approach, where dialect detection modulates the impact of GEC signals.

Additionally, analyses of the mismatch between dialectal expressions and standard models (“This mismatch can cause models to misclassify dialectal expressions”) reinforce the necessity of contextualizing error signals within dialect-aware processing. If the system detects a consistent non-standard style across text segments, it can infer intentional stylistic choices rather than errors, guiding the down-weighting of GEC corrections and preserving intended meaning.

Together, these excerpts argue for a practical architecture where (a) a GEC module flags potential errors, (b) a dialect/style identifier evaluates register and variation, and (c) a decision layer uses the dialect signal to modulate GEC flags, enhancing intent estimation in NLP tasks. This forms a defensible basis for the described dual-path GEC with style/dialect-aware weighting and confidence modulation when intent is inferred rather than annotated.

- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,

### explicit_metadata_signals.0
**Confidence:** high

The field value describes explicit directives to static analysis tools to ignore violations (e.g., inline suppression comments such as // NOLINT or pylint: disable...). The most directly relevant content are excerpts that explicitly discuss such directives and their interpretation: NOLINT and related suppression comments are designed to signal intentional bypassing of a rule for a specific line or scope, which directly aligns with the concept of an explicit metadata signal indicating intentional deviation. Additional supporting material includes studies and guidance on suppressed static analysis warnings, which provide context for why developers use these signals (reasons for suppression, scope of suppression). Guidance on how to disable or control lint warnings (e.g., how to disable pylint warnings) further supports the interpretation that such directives are recognized metadata signals that affect how tools treat code violations rather than indicating real defects. Collectively, these excerpts map onto the described field value by illustrating concrete forms of explicit intent signaling, their typical scope, and the developer rationale behind them. The presence of the suppression directives across multiple tools (NOLINT, pylint: disable) reinforces the interpretation that such metadata signals function as intentional deviation markers rather than incidental observations, which is central to the requested disambiguation techniques and confidence modifiers.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on

### natural_language_processing_applications.3
**Confidence:** high

To document non-standard language varieties using a GEC-like workflow, the most relevant information is how tools can distinguish dialectal features from perceived errors, so the analysis can treat the flagged items as data about the variety rather than mistakes to be corrected. One excerpt explicitly notes the goal of identifying dialect features and distinguishing them from grammatical errors, which directly supports the idea of inverting the typical use of GEC tools for linguistic analysis rather than correction. Another excerpt surveys grammatical error correction and discusses linguistic challenges in GEC, which informs the methodological context for repurposing GEC outputs as data points about non-standard grammar. A third excerpt discusses detecting text formality and the performance of text categorization approaches, which relates to metadata signals and heuristics for classifying stylistic choices that may indicate intentional variation rather than error. A fourth excerpt reinforces the idea of formality detection as a proxy for stylistic analysis, contributing additional methodological signals. Additional excerpts discussing AAE/AAL features in bias and misclassification provide contextual background about how dialect features interact with perception and classification, highlighting the importance of robust intent inference and context-sensitive interpretation. Finally, the broader NLP bias and token interpretation discussions offer further context on how models may misread non-standard varieties, reinforcing the need for disambiguation heuristics and confidence modifiers when inferring intent from language variation.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,

### intent_confidence_modifiers.example
**Confidence:** high

Explicit suppression pragmas that include a justification or ticket reference strongly indicate intentional deviation (a deliberate choice rather than an error). The description of pragma controls shows that disabling or enabling warnings can be applied at a code level, which aligns with the idea of intentional exceptions when warranted. When a practice mentions blocking or enabling violations via pragma controls, it reinforces that such actions are deliberate and context-driven rather than accidental. Additional excerpts discuss suppressions of static analysis warnings and the reasons behind suppressions, which supports the notion that having documented rationale (e.g., a ticket link or justification) elevates confidence that the action is intentional. A StackOverflow-style discussion on disabling a specific Pylint warning demonstrates how developers communicate intent through chosen suppression methods. Finally, related design-system contexts (e.g., detach signals in design tools) show that intentional deviations are often tracked or signaled in metadata or tooling, providing a broader pattern for intent signaling beyond code. Taken together, these excerpts support that a suppression pragma with justification and a linked ticket constitutes a strong positive signal for intent, with subsequent references to general suppression practices and metadata providing corroborating context.

- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.

### foundational_research_and_concepts.domain
**Confidence:** medium

The core requirement is to distinguish intentional deviations from unintentional errors within coding contexts. The excerpts describe a lineage of research that treats “bugs as deviant behavior” and uses static analysis to infer rules and deviant sequences in code, which directly supports building intent-aware detection heuristics. Specifically, discussions of Bugs as Deviant Behavior present a general approach to inferring errors by treating anomalous or deviant sequences as potential bugs, and they describe static analysis techniques that extract rules from the system rather than relying solely on programmer annotations. This aligns with the goal of modeling intent signals in code by identifying when deviations from expected patterns are intentional vs accidental. Additional excerpts explain PR-Miner, a data-mining approach that extracts implicit programming rules by mining frequent patterns, which can underpin heuristics for distinguishing deliberate deviations (e.g., suppressed warnings or unconventional patterns) from errors by contrasting observed patterns against learned normal rule sets. The description of extracting function call pairs and treating deviance from frequent sequences as indicative of bugs further informs how to operationalize signals for intent estimation in static code analysis. Together, these sources provide a foundation for practical disambiguation techniques: (a) modeling deviance from learned normal rule sequences as potential intentional deviation signals, (b) using static analysis to extract and monitor rule conformance, (c) leveraging mining-based approaches to identify implicit, context-dependent rules that, when violated consistently, signal deliberate design choices. The inclusion of TODO-style signals in code comments adds a metadata dimension, suggesting how intent might be signaled explicitly or semi-explicitly in source artifacts. While some items focus on general bug inference or historical research, the core themes map well to the requested need for heuristics, metadata signals, and confidence modifiers for estimating intent in code. The domain-specific evidence supports a structured approach to disambiguation: detect deviance from learned rules, assess consistency of deviations across a section, and combine static-analysis-derived rules with mined implicit patterns and metadata signals to quantify confidence about intent. The sources collectively imply a workflow where deviations are evaluated against a learned rule space, consistency across sections is checked, and explicit intent signals (like deliberate overrides or suppressed warnings) are treated as higher-confidence indicators when present. This reasoning supports producing practical disambiguation techniques and confidence modifiers grounded in established code-analysis research.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [PR-Miner: automatically extracting implicit programming ...](https://dl.acm.org/doi/10.1145/1095430.1081755)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [PR-Miner: automatically extracting implicit programming rules ...](https://www.semanticscholar.org/paper/PR-Miner%3A-automatically-extracting-implicit-rules-Li-Zhou/5eab6c72ba39e0fea5c3aac0c2f5f9cc0a03eb0c)
  > This paper proposes a general method called PR-Miner that uses a data mining technique called frequent itemset mining to efficiently extract implicit
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [s-nlp/xlmr_formality_classifier](https://huggingface.co/s-nlp/xlmr_formality_classifier)
  > This is the model presented in the paper "Detecting Text Formality: A Study of Text Classification Approaches". XLM-Roberta-based classifier trained on

### intent_confidence_modifiers.modifier_type
**Confidence:** high

To support the fine-grained field value Presence of Justification, the most relevant excerpts are those that discuss explicit reasons, controls, or documented motivations for deviating from a rule. The passages describing suppressed static analysis warnings examine why users suppress warnings in multiple languages and contexts, directly addressing the act of justifying a deviation from automated checks. This aligns with a justification signal accompanying an intentional deviation. Additional high relevance comes from discussions of pragma controls in static analysis (disabling/enabling violations) and the use of symbolic names for disabling warnings, which reflect formal mechanisms to justify and encode intentional deviations within tooling. While not all examples spell out the justification in natural language, they demonstrate structured, documented rationale or controls that enable deliberate departures from standard rules, which is central to the Presence of Justification field. Other excerpts discuss design-time detachment signals (e.g., breaking the link between a component instance and its main component) as a deliberate signal of deviation, which, while not strictly textual justification, serves as a clear signal of intentional deviation that can be interpreted as justification in context. These pieces collectively provide evidence that intentional deviation is accompanied by explicit controls, documented rationale, or deliberate override mechanisms, supporting the field value. In summary, the strongest support comes from explicit suppression and control mechanisms for warnings; weaker but related support comes from design-token detachment discussions that signal deliberate deviation.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.

### practical_disambiguation_techniques.2
**Confidence:** medium

The core field value describes an Alignment-Free Paired Audio Analysis approach for detecting deviations in music by comparing performances to a reference without relying on alignment algorithms, often using paired audio transformers and synthetic errors for training. The most relevant excerpt explicitly mentions a fast and accurate alignment method for polyphonic symbolic music signals, which directly relates to how a reference-based comparison can be achieved efficiently, and it notes the broader goal of aligning performance analysis with reference data. Additionally, quotes discuss that listeners can detect obvious mistakes in piano performances by considering contextual appropriateness and listener familiarity, highlighting how detection relies on surrounding context and perceptual salience rather than strict score alignment. Further, the notion that some mistakes stand out to listeners while others may go unnoticed emphasizes the need for heuristics about salience and consistency in deviations, which aligns with the idea of using robust, non-alignment-based signals to estimate intent. A related excerpt notes that conspicuous errors are detectable by the majority of listeners with formal training, reinforcing the validity of context-aware detection strategies. Finally, while not describing alignment-free analysis per se, notes on note-level and expressive analysis provide granular feature avenues (pitch, velocity, microtiming) that can be leveraged in paired analysis to characterize deviations without alignment dependencies. Taken together, these excerpts support a practical disambiguation toolkit that relies on (a) alignment-free or robust comparison signals, (b) perceptual salience and contextual cues to flag likely errors, and (c) granular musical features to characterize deviations for intent estimation.”

- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### explicit_metadata_signals.4
**Confidence:** medium

The most directly relevant material describes structured mechanisms for intentional deviation within a design system. One excerpt explains that you can override a wide range of instance properties in a component and that Figma records and preserves these changes, which aligns with the idea of using overrides as deliberate signals within a token-aware design system. Another excerpt highlights that component overrides exist as a feature, emphasizing that deviations can be purposeful and aligned with a broader design logic rather than being random or erroneous. A subsequent excerpt discusses detaching an instance from its component, which represents a more explicit, explicit deviation from the canonical design token/variant linkage, useful as a signal when the intent is to break the linkage for a deliberate reason. Additional context comes from a note about analytics around detaching, which underscores that such actions are tracked, supporting the idea that deliberate deviations are observable and measurable within the toolchain. While not all excerpts focus on design tokens per se, these pieces together illustrate a pattern: formal override/detach mechanisms in design systems serve as explicit, deliberate signals of intent rather than inadvertent errors. This supports the field value describing applying a semantic design token usage (like color-primary-text) as a deliberate, systematic choice within a design system, rather than a one-off arbitrary value.

- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### intent_confidence_modifiers.effect_on_confidence
**Confidence:** medium

The determination of intent often relies on observable signals that can be amplified or dampened by metadata or user actions. A clear behavioral signal in design systems shows that when a user selects the Detach instance setting, the system logs a detach event to break the connection between an instance and its main component. This constitutes a deliberate alteration of the usual linkage, providing a strong cue toward intentional deviation and a corresponding increase in diagnostic confidence when such a detach signal is present and consistent. In code-quality practices, publications and documentation on suppressions of static analysis warnings reveal that people intentionally suppress warnings to hide or manage deviations from normative behavior. The presence of such suppressions serves as metadata signaling that an observed issue may be intentional rather than an accidental error, which informs how confidence should be modulated. The same theme appears across different tooling contexts where pragma controls or suppression mechanisms enable or disable checks on specific lines or rules, indicating deliberate choices to deviate from standard enforcement. When these suppression or control signals are present and align with a consistent rule-breaking pattern (e.g., repeated suppression or consistent use of a detached design token override), they strengthen the inference of intentional deviation and, consequently, can increase confidence in that interpretation. Conversely, lack of such signals or inconsistent patterns typically weakens confidence, suggesting possible mistakes. Taken together, the excerpts illustrate concrete mechanisms (detach signals, suppression of warnings, and pragma-based controls) that can be used as metadata signals to modulate intent confidence, and they suggest heuristics such as consistency across a section, explicit overrides, and centralized control points as practical features for disambiguation in detection systems.

- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.

### music_and_art_computational_analysis.1.description
**Confidence:** high

The finegrained field value asserts that intentional expression in music arises from nuanced, patterned modulations of tempo, microtiming, dynamics, and pedaling, and that smooth, deliberate variations indicate intentional artistry while abrupt, isolated changes suggest mistakes. Excerpts that directly discuss expressive piano performance and note-level expressive features provide the strongest support for this view, showing that tempo, dynamics, and microtiming contribute to perceived intentionality when varied cohesively. Additional excerpts emphasize the role of context and salience in distinguishing mistakes from deliberate choices—listeners notice some errors only in context, and the perception of mistakes depends on familiarity and contextual cues—aligning with the idea that intent can be inferred from patterning and consistency within a section. Methodological pieces describing detection of errors (e.g., probability of a conspicuous error, piano-roll based detection) illustrate how abrupt deviations can be flagged as potential mistakes, which further supports the distinction between non-erroneous intentional variance and genuine error. Collectively, datasets and analyses focused on expressive timing, tempo, and pedaling (and their granular note-level representations) underpin the claim that deliberate artistry manifests as smooth, patterned modulations, whereas isolated or abrupt deviations are indicative of mistakes. These excerpts together map a coherent framework for disambiguating intent through sustained patterning, contextual salience, and note-level expressive signals, and they illustrate practical approaches for detecting intent without explicit annotations via pattern-based cues and metadata signals like consistency and context.

- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece

### design_systems_and_style_guides.2
**Confidence:** high

The most directly relevant material discusses the core mechanism the field value highlights: using design tokens as the semantically meaningful, structured way to customize design systems, as opposed to hardcoded values. The Material Design token guide explicitly describes tokens that represent style values and how to name and use them to avoid hardcoding. This directly supports the stated mechanism where design tokens are the intended path for customization. Following that, guidance on customizing Material Design 3 shows how existing brand parameters can be integrated with tokens for consistent application, which aligns with the governance and consistency aspects of token usage described in the field value. The discussion of color and typography tokenization further reinforces the token-based customization paradigm across multiple design facets, strengthening the claim that tokens are the preferred, systematic approach. Excerpts addressing component overrides within Figma and the general concept of overrides illustrate practical mechanisms by which deliberate, token-driven customization can be signaled within a design system, which is consistent with the stated signal of intent that applying a different token constitutes a deliberate, systemic decision rather than a random deviation. The Material Design 3 in Compose excerpt provides architectural guidance on implementing tokens within a UI framework, further supporting the idea that tokens are the structured mechanism for consistent styling. Typography tokens showcase the breadth of token usage across style dimensions, reinforcing the general principle. Governance-related analytics on token usage, including audits across related token sets for a coherent theme, substantiate the claim that token governance constitutes a high-confidence signal of intentionality. Overall, the strongest evidence centers on tokens as the canonical customization mechanism, followed by token-based overrides in practice and governance practices, with supplemental context from framework-specific implementation guidance and typography/color token discussions. 

- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Advanced color customizations](https://m3.material.io/styles/color/advanced/define-new-colors)
  > Formerly known as custom colors. You can define additional colors in your scheme that stay static even when other colors dynamically change.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,
- [Typography – Material Design 3](https://m3.material.io/styles/typography/type-scale-tokens)
  > Learn about Material Design typography. This guide covers everything from font styles and hierarchy to line height to create user-friendly text.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### explicit_metadata_signals.5
**Confidence:** high

The field value identifies a deliberate action that disconnects an instance from its main component as a strong signal of intentional deviation. Directly describing this, one excerpt states that you can detach any instance from its main component, which is the core operation constituting the signal. Another excerpt notes that detach events are logged in analytics when a Detach instance action is used, linking the action to measurable behavior. Additional context comes from an excerpt about overrides in Figma, which shows how users modify properties while the underlying component relationship can still be leveraged or broken, illustrating how intentional deviations manifest in practice. A separate excerpt explains that edits to an instance are preserved, highlighting how such detachment or overrides create lasting, deliberate divergence from the original component configuration. Finally, guidance on detaching and reattaching—including a plugin to fix detached instances—embeds the notion of detachment as a managed, intentional state change with lifecycle implications. Together, these excerpts support the interpretation that detachment is a deliberate deviation signal, while overrides and the ability to detach/reattach provide operational patterns and metadata signals for intent estimation.

- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### explicit_metadata_signals.1
**Confidence:** medium

The core token for intentional, acknowledged deviation is the explicit labeling of work as a conscious choice rather than an error. One excerpt notes that using a TODO is a signal of intentional deviation and can be automatically aggregated for review, illustrating how an explicit tag beginning a note can indicate deliberate intent rather than a mistake. Related passages discuss mechanisms to suppress or disable warnings or checks while recognizing these actions as deliberate choices, not incidental errors. For example, guidance and discussions around suppressions of static analysis warnings show that developers sometimes intentionally suppress warnings, and there are documented controls (pragmas) to disable or enable checks, which provides a metadata-based signal that the deviation is intentional and managed. Additional material covers the ability to disable lint checks via special annotations, which likewise serves as a formal signal that a chosen deviation is deliberate and recognized by the developer. Together, these excerpts illustrate concrete practices for marking intentional deviations: explicit TODO-like tags as visible signals, and deliberate suppression/override of tools’ standard checks with documented controls. Such signals can be used as metadata to estimate intent, especially when accompanied by context (e.g., consistent use of a pattern across a section) and by patterns like repeated or project-wide use of a particular tag or suppression across related files. In short, explicit tags indicating intent, combined with structured controls for tool overrides, provide practical heuristics and metadata signals for intent estimation. The presence of a single such tag may suggest a possible mistake, but repeated or consistent use of the same indicator across a section strengthens the case for deliberate intent. This reasoning aligns with the need to derive heuristics, metadata signals, and confidence modifiers for intent estimation that do not rely on explicit annotation from humans at review time.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.

### implicit_pattern_based_signals.1
**Confidence:** medium

The finegrained field value describes a contextual-fit heuristic: a deviation is more likely intentional if it aligns with a higher-level structure or context, rather than merely breaking a local rule. Several excerpts directly discuss context-sensitive detection of deviations in music, where the salience or detectability of a mistake depends on surrounding musical context or larger musical structures. For example, the claim that listeners detect obvious mistakes depending on contextual appropriateness and the performer’s familiarity supports the idea that deviations can be intentional when they fit a broader musical context. Related work reading a piano roll to identify segments that appear as conspicuous errors, and the notion of a performance error being detectable by a majority of listeners given context, further illustrate how higher-level structure (harmony, score context) affects interpretation of deviations. Additionally, research on suppressions in static analysis and on intentional overrides or TODO-type signals in code/design contexts provide parallel evidence: suppressions often reflect intentional signaling to tolerate or acknowledge a deviation, while explicit overrides or detached instances in design tokens illustrate deliberate actionable deviations from a standard rule to achieve a higher-level design goal. In NLP, discussions about detecting grammatical choices or dialect features versus errors echo the same principle: context and broader linguistic patterns help distinguish intentional stylistic choices from mistakes. Collectively, these excerpts map to the idea that a deviation gains intentional interpretation when there is alignment with a known larger structure (musical harmony, API or design protocol, dialect grammar, design system tokens) and when contextual consistency across a section supports that alignment. The heuristic is evaluated by validating whether a deviation conforms to a higher-level model or context, rather than merely checking local rule violations. The presence of signals such as intentional overrides, suppressed warnings, and detached/overridden elements in design and code provides metadata cues that such deviations are purposeful and contextually justified, reinforcing the contextual-fit interpretation. The cited material on translations from local rule-breaking to global contextual fit across domains (music, code, NLP, design systems) thus offers converging evidence for a robust disambiguation approach that weighs higher-level structure against local violations.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .
- [What can NLP do for linguistics? Towards using ...](https://www.degruyterbrill.com/document/doi/10.1515/lingvan-2024-0001/html?srsltid=AfmBOorJMcqdQw9alDp6wfoWIcLANVvE6ZXvcC606tP_8XBQb8pzsw8f)
  > by L Nguyen · 2024 · Cited by 4 — This paper proposes a novel use of grammatical error detection/correction (GED/GEC) tools to document non-standard English varieties.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be

### music_and_art_computational_analysis.1.computational_approach
**Confidence:** high

The finegrained field value describes a system that combines multiple musical features beyond pitch to assess intent behind deviations, using heuristics that penalize abrupt, isolated changes and reward patterns that show consistent timing or dynamics. Excerpts describing expressive note-level analysis and microtiming align directly with this: note-level attributes such as velocity and microtiming provide the granular data needed to assess deviation patterns, and datasets focusing on expressive performance supply empirical contexts for such feature aggregation. Additionally, the literature noting that listeners detect some mistakes based on contextual appropriateness and familiarity supports the idea that intent inference can rely on perceptual context and consistency across a passage. The explicit mention of tempo, timing, dynamics, and pedaling as expressive attributes complements the idea of aggregating multiple features to estimate intent, while references to neural or architectural models (e.g., a temporal convolution backbone) show concrete computational methods to produce probabilities of errors versus intentional deviations. Taken together, these excerpts substantiate a framework where multi-feature aggregation, context-aware interpretation, and pattern-based heuristics are used to disambiguate intent in music performance.

- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.

### design_systems_and_style_guides.1
**Confidence:** high

The most relevant material explicitly discusses how overrides and component properties function within Figma as a sanctioned mechanism for intentional deviation from base components. This directly supports the finegrained field value’s claim that making changes via component properties or token overrides is a deliberate design choice within the system's rules. The excerpt describing that in Figma you can override many properties in an instance, including color and typography, aligns with the mechanism of intentional deviation via sanctioned overrides. Additional excerpts explain that overrides to non-component properties are preserved and tracked, which further substantiates that such overrides are recognized and managed as intentional rather than errors. Governance-oriented excerpts about library analytics tracking the usage of components, styles, and variables provide a mechanism to infer intent from patterns of overrides (e.g., frequent overrides indicating needs for new variants or adjustments). A supporting excerpt about detaching an instance highlights a tool action that breaks the connection to a main component, which could be interpreted as a deliberate, sanctioned deviation in certain workflows, though it is less central to the explicit intent-signaling mechanism compared to overrides. Other excerpts discuss the component properties API and definitions, which underpin how systems model legitimate variations and their default values, reinforcing that intentional deviation is structured and detectable within the design system. Taken together, the strongest support comes from the explicit description of overrides as a feature that enables sanctioned deviations, the persistence of those overrides, and the governance signals from analytics and property metadata that can help distinguish deliberate changes from mistakes.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .
- [componentPropertyDefinitions | Developer Docs](https://developers.figma.com/docs/plugins/api/properties/ComponentPropertiesMixin-componentpropertydefinitions/)
  > All component properties and their default values that exist on this component set. 'VARIANT' properties will also have a list of all variant options.
- [Advanced color customizations](https://m3.material.io/styles/color/advanced/define-new-colors)
  > Formerly known as custom colors. You can define additional colors in your scheme that stay static even when other colors dynamically change.
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Typography – Material Design 3](https://m3.material.io/styles/typography/type-scale-tokens)
  > Learn about Material Design typography. This guide covers everything from font styles and hierarchy to line height to create user-friendly text.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### music_and_art_computational_analysis.1.concept
**Confidence:** high

The most relevant content directly ties expressive performance to measurable attributes. One excerpt states that expressive piano performance relies on tempo, timing, dynamics, and pedalling, which are core components of expressive performance features you would analyze and model. Another excerpt discusses note-level analysis focusing on pitch, velocity, and microtiming to reveal expressive characteristics, aligning closely with the concept of expressive performance features as granular, quantifiable signals in performance. These two excerpts provide clear, explicit links to the construct of expressive features used for analysis and modeling in music research. The remaining excerpts discuss how listeners perceive mistakes and the salience of errors in performance, or describe technical methods to detect conspicuous errors. While these topics intersect with performance analysis (e.g., evaluating whether an event is an error or intentional deviation), they do not define or enumerate expressive performance features themselves, and thus offer indirect or contextual support rather than direct definitions. Taken together, the strongest support comes from the explicit mentions of expressive attributes and granular expressive analysis; the other excerpts contribute methodological context about error detection and salience but are less central to the concept of expressive performance features.

- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.

### implicit_pattern_based_signals.3
**Confidence:** high

The central idea is that intent is better inferred when changes form a cohesive bundle rather than appearing in isolation. Excerpts that discuss design tokens and overrides show explicit mechanisms where multiple properties (such as color, typography, or spacing) can be changed together to signal a deliberate design choice, rather than an unintended error. Discussions about how component overrides and detachment can be used to manage intentional deviations also illustrate how a system can treat a cluster of related mutations as meaningful rather than accidental. References to design tokens in material design provide a formalized basis for grouping changes by tokens, reinforcing the notion that co-occurring changes across related properties constitute a plausible deliberate intent signal. Additional excerpts about preserving user-made overrides and how component properties can carry metadata or be manipulated within a system further support the concept that intentional deviations are often signaled through structured, co-ordinated changes rather than single, isolated edits. To triangulate intent, other domains offer parallel signaling: suppressions of static analysis warnings illuminate a metadata signal that a user consciously chose to downplay a warning; empirical studies of errors and their detectability show how context and salience affect judgments of intent; and classic work on bugs as deviant behavior demonstrates that deviation can be inferred by patterns of irregularities relative to standard sequences. When these sources are combined, a detection system can estimate intent by clustering related changes (across color, typography, token values, or code annotations), checking for consistent co-variation across a region (e.g., repeated changes to the same category of tokens within a page or session), and weighting such clusters higher than solitary edits. Additionally, explicit signals such as TODOs or annotations (or explicit overrides in design tools) provide a metadata layer that strengthens the likelihood of intentional deviation. Overall, the most compelling support comes from examples where multiple related changes occur together and are preserved as a unit, suggesting a deliberate design or coding intent rather than random error.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on

### implicit_pattern_based_signals.0
**Confidence:** high

The fine-grained field value posits that a deviation that repeats within a coherent scope is more likely intentional, and that a single deviation is more likely an error. Excerpts that explicitly discuss intentional overrides and detachment in design tools provide direct matches to the idea of intentional deviation as a deliberate local convention or signal (for example, when a designer overrides a component or detaches an instance to signal a purposeful variation). Discussions of TODOs and intentional deviations in coding practice likewise illustrate how repeated or systematic deviations can function as signals, aligning with the heuristic that recurrence strengthens the case for intent. Broad pattern-based and deviance-informed perspectives on identifying errors (e.g., bugs-as-deviant-behavior) offer a conceptual framework for recognizing non-random deviations as purposeful when they follow consistent patterns. Finally, while music error detection literature emphasizes salience and context in identifying errors, it provides ancillary support for evaluating when a deviation might be intentional versus erroneous, particularly when similar deviations appear across a passage or section. Taken together, the strongest support comes from design-overrides/detached-instances discussions, followed by explicit notes on intentional deviations (TODOs) and deviant-pattern analyses in software, with auxiliary context from error-detection literature in music and code. The excerpts collectively illustrate a workflow where frequency, scope, and consistency of a deviation inform intent estimation, and where metadata signals (overrides, detachments, repeated patterns) modulate confidence in intentionality.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### implicit_pattern_based_signals.2
**Confidence:** high

The requested field value describes deviations from a learned baseline as likely bugs unless there are supporting signals of intent, and it emphasizes using statistical anomaly detection against established patterns as a method to estimate intent. Excerpts that explicitly treat bugs as “deviant behavior” from frequent patterns provide the strongest support for interpreting deviations as potential bugs when intended signals are absent. The notion that deviations can be intentional is reinforced by literature on signaling intent in software practice, such as suppressing static analysis warnings, using TODO tags, or intentionally overriding component properties. Specific passages show:
- The idea that bugs can be inferred when a deviation diverges from frequent, learned co-usage patterns, i.e., a deviation from a learned baseline is likely a bug unless there is intent, which aligns directly with the core field value. 
- The concept that intentional deviations can be signaled or tolerated through practices like suppressing warnings, or marking TODOs, suggesting metadata signals that modulate whether a deviation should be treated as intentional rather than a bug. 
- Concrete examples of intentional deviation signals in design and code, such as component overrides in design tools and detaching components, which provide explicit signals that a deviation is purposeful rather than erroneous. 
- Additional discussions on general approaches to inferring errors from deviant behavior in systems code, which reinforce the need for pattern-based anomaly detection grounded in baseline norms.
Collectively, these excerpts support (a) using a learned baseline of common patterns as a reference, (b) treating deviations as potential bugs in the absence of signals of intent, and (c) incorporating metadata signals (warnings suppressions, TODOs, overrides) as practical indicators that a deviation may be intentional. The relationship between deviation and intent is thus established through both normative anomaly-detection framing and explicit signaling techniques in practice.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Automatic Classification and Repair of Static Analysis ...](https://arxiv.org/html/2509.11787v1)
  > Sep 15, 2025 — Static analysis tools are widely used to detect bugs, vulnerabilities, and code smells. Traditionally, developers must resolve these warnings
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.

### code_analysis_and_software_engineering.0.signal_type
**Confidence:** high

The core field value refers to suppressed warnings in static analysis. Excerpt content that directly analyzes suppressions of static analysis warnings provides the strongest support for interpreting 'Suppressed Warning' as an intentional action by developers to silence a warning, often for a known, acceptable deviation or trade-off, rather than an actual bug. The excerpts identify the prevalence and reasons behind suppressions and discuss tracking such suppressions, which is highly relevant to understanding intent signals in code review or automated analysis. Additionally, explicit mentions of mechanisms to suppress warnings in tooling (for example, NOLINT and NOLINTNEXTLINE) illustrate concrete methods by which developers encode intent to override analysis results in specific code regions. These details help distinguish deliberate suppression from incidental or erroneous warnings by illustrating patterns, contexts, and tooling used to signal intentional deviation. Together, they support a view that a ‘Suppressed Warning’ often encodes deliberate decision-making, and they also point to practical methods for disambiguation, such as correlating suppressions with known contexts and suppressed rule categories. Excerpts discussing empirical study of suppressions provide evidence about how widespread suppression is and why developers do it, which informs heuristics for intent estimation. The ordering reflects that the closest fit comes from direct discussion of suppression behavior and tooling, followed by broader studies on suppression prevalence and rationale, and finally concrete examples of suppression syntax in linters and analyzers, which together shape confidence about intent inference.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### explicit_metadata_signals.2
**Confidence:** high

The most direct support comes from sources about formal specifications and explicit contracts in code. An entry describing JML (Java Modeling Language) and OpenJML notes that these specifications express formal behavior, with constructs like requires and ensures, and explicit assert statements, which map to deliberate, contract-driven behavior in code. This directly aligns with the finegrained field value’s emphasis on formal contracts or assertions as intentional signals. Additional excerpts discuss mechanisms to suppress or bypass static analysis or lint checks (such as NOLINT, disable pragmas, or suppression lists). These signals are metadata-level indicators of intentional deviation from standard checks, which inform the system about deliberate choices that may diverge from defaults but are purposeful and context-driven. Other code-quality sources describe how suppressions are used and why they occur, reinforcing the interpretation that certain deviations are intentional in order to adhere to higher-level design or contract expectations. Together, these sources provide a cohesive view: explicit contracts (contracts/assertions) establish intentional correctness within a specification; suppression/override signals provide metadata cues about intentional deviations from automated checks, offering a heuristic for intent estimation in ambiguous cases. The combination of these excerpts supports the notion that formal contracts establish intentional behavior, while metadata signals help disambiguate intent when deviations occur. The most relevant evidence directly anchors the field value to formal specification language usage, and the following sources provide complementary context about intentional deviations as metadata indicators.

- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.

### explicit_metadata_signals.6
**Confidence:** high

- The most directly relevant material discusses how code-level warnings can be suppressed or disabled with explicit justifications or conventions. For example, guidance on using NOLINT and related disable/enable pragmas shows a common pattern where developers explicitly annotate why a deviation is acceptable, which aligns with the concept of a human-readable justification text accompanying a deviation. This supports the notion that an explicit justification text strengthens the claim that the deviation is deliberate and well-understood.
- Additional excerpts describe reasons developers suppress static analysis warnings and track suppressions, which provides evidence that explicit commentary or metadata around the suppression (not just the suppression itself) is a consistent practice to convey intent and context.
- There is also discussion around TODO markers and how they signal planned or intentional future work, which can be seen as an indirect form of justification signaling for deviations in code maintenance and evolution.
- Certain excerpts reveal broader patterns of deliberate overrides in tooling and design systems (such as component overrides and detaches in UI frameworks). While these are not strictly code-level suppressions, they illustrate how explicit signals accompany intentional deviations across domains, reinforcing the heuristic that explicit justification text or metadata bolsters intent estimation.
- Taken together, the references support the idea that a concrete human-readable justification (or metadata field) attached to a deviation markedly increases confidence that the deviation is intentional, rather than an accidental error or silent bug.


- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### explicit_metadata_signals.3
**Confidence:** high

The most relevant excerpts explicitly describe component overrides as a feature of the design system. One excerpt states that you can override a wide range of properties in an instance, and another notes that edits to an instance’s properties via a designated panel are supported and recorded, which directly aligns with the idea of a sanctioned deviation within the component design. This establishes the baseline: there is a formal mechanism for customization that is tracked and intended by the system. Additional excerpts discuss detachment signals in Figma, which while not overrides themselves, serve as signals of deliberate deviation from the component’s governed state; the documentation notes that detaching an instance breaks the connection to the main component, which can be used to explain when a deviation is intentional versus accidental. Together, these sources provide a cohesive view of intent signals: sanctioned overrides are a planned, supported form of deviation, while detachment or other non-standard actions act as explicit indicators of a different kind of intentional modification. There is also coverage of tooling that helps manage these deviations (e.g., a plugin to fix detached instances), illustrating practical workflows that align with maintaining controlled intentional changes within a system. Although some excerpts focus on related topics (like suppression of warnings or TODO markers) they contribute context about intentional deviations in other domains, reinforcing the general concept of distinguishing intentional design-related deviations from incidental ones. Overall, the strongest support comes from explicit statements about overrides being possible and recorded, with additional signals about detachment and tooling that codify when a deviation is intentional or needs remediation.

- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### design_systems_and_style_guides.0
**Confidence:** high

The most relevant excerpt explicitly discusses detach events and the fact that Figma logs a detach whenever the action is used to break the connection between an instance and its main component. This directly supports the idea that a detach is a strong signal of exceptional deviation and can be used as a governance signal. A closely related excerpt describes a plugin and a help article about detaching an instance from the main component, which validates that detaching is a supported, meaningful action with observable effects on the component-instance relationship and overrides. Additional excerpts highlight that detach events can be analyzed in analytics contexts (library analytics and detach-accuracy discussions), providing a mechanism to identify patterns of detachment and distinguish between deliberate design changes and isolated mistakes. Other excerpts on component overrides and editing with overrides show that while overrides exist to customize instances, there is an established workflow around maintaining or breaking linkage to components, which is relevant to understanding intent when deviations occur. Taken together, these excerpts supply practical disambiguation signals (detach events as exceptional changes, analytics for pattern detection, and governance implications) and indicate how intent estimation might be supported by observed behavior and metadata rather than explicit annotation.

- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,

### code_analysis_and_software_engineering.0.justification_requirement
**Confidence:** high

The most direct evidence is the documentation of explicit mechanisms to ignore or override checks: a guideline that specific comments like // NOLINT and // NOLINTNEXTLINE exist to ignore lint checks in the current and next lines, which is a formalized way to signal intentional deviation from rules. This shows a recognized, codified method for justifying deviations within code. Closely related is the description of suppressing static analysis warnings, including empirical studies that investigate why developers suppress warnings and the prevalence of such suppressions. This provides insight into the motivation and contextual signals that accompany deliberate deviation, including the social and practical reasons behind suppression, which are essential for modeling intent. Together, these sources demonstrate that there are concrete, metadata-like signals (suppressions, lint-suppressing comments) used to communicate intentional deviations, which can be leveraged as justification signals in detection systems. The remaining sources discuss the broader phenomenon of suppression in multiple languages and documentation about lint tooling, reinforcing that such practices are widespread and formalized across toolchains, thereby supporting the viability of justification mechanisms. Taken collectively, these excerpts support the field value that intentional deviation can be signaled and disambiguated via explicit suppression/override mechanisms and the analysis of suppression practices.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### explicit_metadata_signals.7
**Confidence:** medium

Explicit signals of intent in code and design are often communicated through documented rationales or intentional deviations rather than without justification. The most directly relevant evidence shows that projects provide explicit mechanisms to mark intentional deviations and to ignore certain checks with documented rationale. For example, there are guidelines and tooling records showing the use of NOLINT-like suppressions to bypass lint checks, including how such disables are controlled and documented, which aligns with the idea of a stated rationale behind a deviation. Related discussions on suppressions of static analysis warnings demonstrate that teams consider the reasons users suppress warnings and how those suppressions are tracked, which is another form of intent signaling accompanying a deviation. Other excerpts discuss how developers use commit messages or comments (akin to TODOs) to signal intent behind deviations, and how design tooling (like component overrides or detachments) records changes that intentionally diverge from a baseline, all of which can serve as metadata signals indicating deliberate intent. Taken together, these excerpts illustrate a spectrum of explicit or semi-explicit signals—ranging from inline rationale in commits or comments to tooling-based suppression and design overrides—that detection systems can leverage to estimate intent. The least directly relevant items extend the same theme into adjacent domains (detachment signals in design systems, or general metadata controls) but still support the overarching concept of signaling intent through metadata and pattern-based cues.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.

### code_analysis_and_software_engineering.0.mechanism
**Confidence:** high

The field value corresponds to explicit suppression mechanisms used to indicate deliberate deviation from standard checks in code analysis. The most relevant material directly documents the exact suppression syntax and tool support: the material describing that clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring lint checks in the current and next lines provides a concrete mechanism by which developers signal intentional deviation from strict checks. The next most relevant material also discusses suppression of static analysis warnings more broadly, offering context about why suppressions occur and how they are tracked, which supports the idea that suppression is a deliberate signaling choice rather than an incidental error. Additional excerpts describe empirical studies of suppressions, giving empirical grounding for how common these practices are and what motivates them, though they are more about prevalence and reasons than the exact mechanism. Collectively, these excerpts support the notion that explicit suppression directives (and related tooling comments) are the primary signals of intentional deviation in code analysis, with related metadata and empirical context informing how to interpret such signals in detecting intent. Based on this, the most credible interpretation of the field value is that it refers to explicit suppression tokens used to intentionally bypass or relax static analysis checks, rather than accidental or implicit errors.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### code_analysis_and_software_engineering.0.intent_implication
**Confidence:** high

The presence of explicit suppression mechanisms such as NOLINT and NOLINTNEXTLINE demonstrates a deliberate choice to bypass a static analysis check, signaling a designed deviation rather than an accidental one. Such mechanisms are widely documented as a way developers express intent to ignore warnings in specific contexts, which aligns with the idea that suppression can be legitimate when framed by constraints or design decisions. Empirical studies of suppressed static analysis warnings provide concrete evidence about why developers suppress warnings, including prevalence, rationales, and the trade-offs involved, reinforcing the claim that suppression can reflect legitimate intent rather than mere noise. Additional documentation on suppression practices within tooling (e.g., clang-tidy guidance) further illustrates how ecosystems encode intent signals directly into the code, serving as practical signals a detection system can rely on. Taken together, these sources support the view that suppression is often a deliberate, justified choice in software engineering, not merely an error or oversight, and can be used to estimate intent with appropriate context. The core idea is that explicit suppression constructs, supported by empirical rationale and tooling guidance, provide the strongest evidence of deliberate deviation; documentation of suppression practices and real-world studies bolster the interpretation that such actions are intentional and need to be treated as context-driven signals rather than outright errors.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### code_analysis_and_software_engineering.1.signal_type
**Confidence:** high

Self-admitted technical debt in code often appears as explicit suppressions of static analysis warnings or deliberate bypasses of checks, which are forms of signaling that a deviation from strict quality norms was consciously accepted. The excerpts discuss suppressions in multiple languages, and analyze why developers suppress warnings, which directly aligns with the idea of admitting debt or accepting a known flaw. They also cover mechanisms like NOLINT annotations to ignore specific lint checks in current or upcoming lines, which serves as a metadata-level signal that a deviation is intentional rather than accidental. The discussion of TODO markers as a tooling pattern for signaling ongoing work or intentional detours further supports SATD as a communicative practice embedded in the codebase. Additionally, the examination of how assertions and their relationship to code quality can reflect deliberate design choices (or known risks) ties into SATD insofar as explicit or semi-explicit acceptance of deviations or risks is being communicated. Collectively, these excerpts illustrate practical techniques and metadata signals—suppressions, specialized annotations, and intentional patterns—that enable a system to infer intent and distinguish intentional deviations from mere mistakes. They provide concrete behavioral patterns and rationale for why developers would encode debt-like signals in code, which maps well to the concept of SATD as a self-admitted technical debt trait. While none of the excerpts may use the exact acronym “SATD,” they collectively establish a robust grounding for recognizing SATD-like signals through suppression practices, deliberate annotations, and stated workarounds as intent indicators.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability

### music_and_art_computational_analysis.1.key_research
**Confidence:** high

The core idea in the field value is that expressive piano performance is analyzed through attributes such as tempo, timing, dynamics, and pedaling, which serve as primary signals of expressive intent. The most directly supporting excerpt states that computational models of expressive piano performance rely on tempo, timing, dynamics, and pedaling to capture expressive characteristics, which aligns precisely with the finegrained field value. Another highly relevant excerpt notes that a dataset and feature analysis focused on note-level expressive characteristics (including tempo and microtiming) can reveal expressive properties, reinforcing the central role of these attributes as carriers of intent. While the remaining excerpts focus on detecting conspicuous errors in performance and how salient mistakes arise from contextual factors, they provide useful contextual grounding on how listeners perceive deviations and how models separate intentional deviations from mistakes. This background supports a broader research frame for intent estimation by highlighting what counts as deviation versus expression and how context or consistency informs interpretation.

- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.

### implicit_pattern_based_signals.4
**Confidence:** high

Evidence consistently emphasizes that human listeners (and automated systems) differentiate deliberate expressive choices from mistakes by looking at broader context and multi-feature coordination. One source argues that expressive performance analysis relies on note-level granularity but interprets patterns across tempo, timing, dynamics and pedaling to reveal expressive intent, suggesting that coordinated changes across multiple features are indicative of deliberate expression rather than random errors. This aligns with the idea of Expressive Feature Bundling where smooth, patterned changes across features imply intent, whereas abrupt, isolated anomalies imply mistakes. Other sources describe that listeners detect conspicuous errors depending on contextual appropriateness and the performer's familiarity, indicating that contextual salience helps distinguish errors from intentional deviations. Additional work discusses a model that reads a performance into a temporal representation (e.g., piano roll or score-aligned latent space) to detect and reason about errors, which supports a pattern-based, aggregated feature approach rather than single-point fault detection. There is also explicit discussion of a fast, accurate alignment method and a classifier head that identifies whether a center-of-segment deviation is conspicuous, which reinforces the idea that localized anomalies are interpreted in light of surrounding structure. Collectively, these excerpts support a heuristic that coordinated, gradual changes in timing and dynamics across a region are signals of intentional expressive choices, while abrupt, one-off deviations are more likely errors; pattern-based measurement across a neighborhood (temporal, kinetic, pedaling) provides a practical method for intent estimation. Additional references describe expressive analysis focusing on tempo, timing, dynamics, and pedaling as attributes, reinforcing the multidimensional approach to intent inference rather than relying on single-feature anomalies. Finally, the notion that deliberate deviations can be signaled via broader contextual cues (e.g., surrounding context and performance knowledge) helps justify using metadata and pattern signals to modulate confidence in intent estimates.

- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > 3

notation was done with Cubase 2 , and they were asked to
add an annotation at MIDI note 0 covering the span of the
time window which they judge as pertaining to an error.
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based

### music_and_art_computational_analysis.3.description
**Confidence:** medium

To determine whether a repeated deviation is an intentional artistic choice rather than a mistake, one can rely on how salience and contextual appropriateness influence detection in human listeners, as discussed in music performance studies. If a deviation is consistently present in a piece across performances and aligns with contextual expectations or stylistic norms, listeners with musical training may still perceive it as deliberate due to its predictable recurrence and coherence with surrounding material. The literature notes that the salience of mistakes depends on contextual appropriateness and the listener’s familiarity with the performance, suggesting that consistency across takes could elevate a deviation from a mere error to an intentional feature if it recurs with a controlled rhythm, ornament, or interpretive gesture. In automated terms, a model that outputs the probability of a segment being a conspicuous error can be used alongside contextual cues to flag deviations that break expected patterns, but repeated occurrences in the same way could shift the interpretation toward intentionality rather than error. Moreover, the idea that conspicuous errors are detectable by most listeners with formal training offers a baseline for what counts as salient; if a repeated deviation remains conspicuous across takes, it may warrant consideration as an intentional interpretive decision. The combination of salience, contextual appropriateness, and repetition across takes can thus inform heuristics for intent estimation, with data-driven confirmation from listening studies and performance analyses guiding how to weight recurrence as an intent signal. Finally, while data and listening examples are used to study performance errors, those resources can be repurposed to study consistent deviations as potential intentional choices, by examining whether a pattern recurs in ways that align with stylistic or interpretive goals rather than random faults.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag

### music_and_art_computational_analysis.3.concept
**Confidence:** medium

In music performance, whether a deviation is intentional or an error can hinge on contextual appropriateness and how salient a given deviation is to listeners. If a deviation is consistently incongruent with surrounding material or stylistic expectations across multiple takes or sections, it is more plausible to interpret it as a deliberate design choice rather than a one-off mistake. Conversely, a deviation that appears only once or outside the surrounding context is more likely to be incidental. Evidence indicates that listeners’ judgments about errors depend on contextual cues and the degree of familiarity with the performance, suggesting that consistency across material is a key heuristic for inferring intent. Additionally, the notion that some mistakes are detectable by most listeners due to conspicuity implies that when a deviation remains inconspicuous across similar sections, it may be used strategically or be less likely to be a deliberate override. Together, these points support a framework where cross-take/section consistency of a deviation increases the likelihood of intentionality, while isolated, contextually inappropriate deviations lean toward unintentional error.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag

### code_analysis_and_software_engineering.1.mechanism
**Confidence:** high

The most directly relevant material shows that a simple, explicit tag in a comment, such as TODO, can signal intentional deviation from a rule or standard, and that tooling often recognizes these tags for aggregation or review. This supports the idea that code comments themselves function as metadata signals indicating intent to deviate, which is precisely what the finegrained field value describes. The related discussions about suppressions in static analysis warnings and the use of NOLINT/ NOLINTNEXTLINE illustrate how developers encode intent to bypass rules through comments, which aligns with the concept of intentional deviation markers beyond just TODOs. These sources collectively provide concrete mechanisms—comment-based signals, pattern-based annotations, and tooling interactions—that enable detection systems to estimate intent without explicit annotation, thereby supporting practical disambiguation techniques, metadata signals, and confidence modifiers. The broader studies on suppressions and assertions offer context for how consistent versus isolated signals across a code region can inform whether a deviation is deliberate or erroneous, which helps in building heuristics about intent consistency across sections. While the strongest evidence centers on explicit tags like TODO, the surrounding material broadens the heuristic space to include other intentional markers in comments and tool-assisted signals that codify intent.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions

### code_analysis_and_software_engineering.1.intent_implication
**Confidence:** high

Deliberate deviations in code are often signaled through explicit markers that override normal checks or indicate future work. Descriptions of NOLINT and NOLINTNEXTLINE show a clear mechanism to ignore specific lint checks in the current or next line, which directly supports intentional deviation signaling. The discussion of using TODO markers demonstrates a practice where explicit notes mark intentional changes or placeholders, signaling planned future work or deliberate detours. Studies on suppressions of static analysis warnings provide empirical backing for why developers suppress checks and how such suppressions relate to intent, which is highly relevant to understanding temporary concessions made under time pressure or deadlines. The broader literature on suppressions and the relationship between assertions and code quality adds contextual support by showing how developers manage and rationalize deviations or non-ideal constructs. Finally, discussions on assertions and normative aspects of statements contribute a perspective on how explicit decisions (even if not purely stylistic) interplay with perceived software quality and intent. Collectively, these excerpts map concrete signaling mechanisms (overrides, placeholders, suppressions) that enable a detection system to infer deliberate vs. accidental deviations, along with heuristics around consistency (e.g., repeated use of the same override in a section suggesting deliberate pattern) and metadata signals (e.g., presence of suppression comments, comments starting with TODO).

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability

### music_and_art_computational_analysis.3.computational_approach
**Confidence:** medium

The core idea in the finegrained field value is that repetition of a deviation across different takes or sections increases the likelihood that the deviation is intentional, while a one-off deviation is likely an error. The most directly relevant information notes that a system can assign a probability to a segment being a conspicuous error, and that detection hinges on musical context and the surrounding material. This supports the notion that deviations which fail to blend with surrounding context may be flagged as errors, while deviations that recur across takes could be treated as potential intentional choices, if contextual signals align. Additional excerpts highlight that the salience of mistakes depends on contextual appropriateness and the listener’s familiarity, suggesting that consistent deviations within a section might be interpreted as deliberate by leveraging context and learned patterns. Further, the idea that a conspicuous error is detectable by the majority of listeners with formal training reinforces that perceptual cues (not just mechanical signals) are used to judge deviation, which aligns with using multiple cues (context, recurrence, audience expectations) to infer intent. Collectively, these excerpts imply a workflow where a system uses contextual alignment, perceptual salience, and cross-take/repeat patterns to estimate intent, with recurrent deviations across takes signaling intentionality and isolated deviations signaling errors. The least directly supportive excerpt notes that data and samples are available on a companion page, indicating there is empirical data backing the observations, but it does not add new mechanistic detail about recurrence as a deliberate signal. Overall, the strongest support comes from statements about error conspicuity and context-based salience, which underpin the proposed heuristic of leveraging recurrence across takes as a proxy for intentional deviation, while isolated, context-incongruent deviations preserve the error interpretation.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag

### natural_language_processing_applications.0.example
**Confidence:** high

The finegrained field value concerns how grammatical error correction (GEC) tools handle systematic features of African American English (AAE), such as the zero copula or habitual 'be', and the risk that these features are misclassified as errors because they deviate from Standard English. This is directly addressed by discussions that emphasize dialectal variation, the need to distinguish dialect features from grammatical mistakes, and the broader NLP biases that arise when dialectal expressions are treated as errors. Specifically, one excerpt notes the goal of assessing whether tools can accurately interpret dialect features and distinguish them from grammatical errors, which directly supports the idea that GEC systems may misclassify AAE features. Another excerpt surveys grammatical error correction and outlines linguistic challenges in the field, highlighting that standard approaches may mislabel nonstandard yet systematic features as errors. Additional excerpts discuss the impact of African American English on NLP systems, including misclassification risks in language tasks and bias in downstream predictions, which strengthens the claim that GEC tools can misinterpret AAE patterns. Further sources explore how grammar and word choice influence bias in classification tasks involving AAE, reinforcing the notion that GEC and related systems must account for intentional or accepted dialectal variation rather than treating it as erroneous. Related discussions about dialect-aware language processing and formality detection provide context for parallels in detecting or validating nonstandard forms without labeling them as mistakes. Collectively, these excerpts support the notion that GEC tools frequently misclassify systematic AAE features as grammatical errors, and they offer context on why this happens and how to approach it from a methodological perspective. The strongest support comes from explicit aims to distinguish dialect features from errors and from surveys of GEC challenges; supporting context comes from NLP bias discussions and dialect-aware analyses that illustrate practical consequences of such misclassification. This alignment suggests practical disambiguation techniques would benefit from dialect-aware evaluation, targeted metadata signals about dialect or register, and explicit handling of nonstandard features as legitimate linguistic variants rather than errors.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.

### music_and_art_computational_analysis.2.description
**Confidence:** high

The specific field value concerns identifying when a performance contains a missed, added, or wrong note and distinguishing those cases from intentional pauses or rests in dense textures. Excerpts that explicitly address detecting performance errors, salient mistakes, and misalignment between performed data and the musical target are most directly relevant. The strongest matches describe methods to detect conspicuous errors in performance data, the salience of mistakes based on context, and the idea of misalignment between performance and score leading to error detection. Related excerpts expand on this by presenting model-based approaches (e.g., transformer-based error detection) and intuition about what listeners perceive as obvious mistakes, which supports understanding how a system could distinguish between intent and error. Supporting context from datasets and expressive performance analyses provides background on features and granularity (note-level, tempo, dynamics) that can influence error discrimination in dense textures. Taken together, these excerpts collectively illustrate practical techniques, signals, and heuristics for disambiguating missed versus intentional deviations in complex musical passages and for estimating when errors are likely versus when deviations are intentional stylistic choices.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### music_and_art_computational_analysis.3.key_research
**Confidence:** medium

The field value describes a core heuristic where intent is inferred through pattern-based analysis that considers repetition and consistency within performance data. The most directly relevant excerpt describes a system that reads a piano roll and outputs the probability that a segment is a conspicuous error, which embodies a pattern-based, data-driven approach to flag deviations from an established pattern. This aligns with the idea of detecting deviations based on learned patterns rather than isolated observations. Another excerpt emphasizes that listeners can detect obvious mistakes by listening to the surrounding context, highlighting the role of contextual patterns in judging whether a deviation is salient or potentially intentional. A related excerpt discusses how the salience of mistakes depends on contextual appropriateness and the listener’s familiarity, reinforcing the importance of contextual patterns in interpretation. While the remaining excerpts define the notion of conspicuous errors and reference performance data, they contribute to the broader understanding of pattern-based detection in performance analysis, which is the backbone of the proposed heuristic for disambiguating intent via repetition/consistency signals. Therefore, these excerpts collectively support the idea that pattern-based, context-aware detection can estimate intent, even if explicit repetition-based rules are not exhaustively described.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag

### music_and_art_computational_analysis.2.computational_approach
**Confidence:** high

The most relevant material directly addresses how transformer-based systems can detect music performance errors by aligning or comparing performance data to reference representations. One excerpt describes a transformer-based model that can implicitly align and compare performance audio with music scores through latent space representations, which aligns with the idea of comparing a performance to a reference without relying on traditional, fragile alignment algorithms. A closely related excerpt introduces an end-to-end trainable transformer model for music error detection, which embodies the notion of learned representations that capture alignment-free or robust comparison signals, suitable for identifying fine-grained mistakes. Another excerpt discusses a transformer-based approach for error detection, reinforcing the feasibility of using deep generative or discriminative representations to detect deviations from expected performances. Supporting background excerpts describe the context of performance errors being salient depending on context and listeners’ familiarity, and the notion that some mistakes are more conspicuous than others, which informs heuristics for distinguishing deliberate deviations from minor errors. Additional context on how performance errors are studied in piano contexts and the role of latent alignment further grounds the idea that robust detection can rely on representation learning rather than brittle alignment rules. Taken together, these excerpts provide evidence that alignment-free, transformer-based approaches can compare performances to references via learned latent representations, are trained with data that include deliberate deviations to improve robustness, and rely on context-sensitive heuristics to gauge error significance, all of which support the described fine-grained field value about robust, alignment-free detection of fine-grained mistakes using large-scale synthetic data.

- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.

### natural_language_processing_applications.0.relevant_datasets
**Confidence:** high

The most relevant supporting material directly describes datasets and methodology for recognizing AAVE in NLP contexts. One excerpt explicitly states that the TwitterAAE dataset is used to identify tweets with at least 99.9% confidence of containing AAVE lexical items, which aligns with the field value asserting that this dataset enables training and evaluation of dialect-aware models. Other excerpts discuss how models can misclassify dialectal expressions and the role of grammar, word choice, and formality in detecting linguistic variation, which provides supporting context for how a dataset like TwitterAAE informs model behavior and evaluation. Collectively, these excerpts show that specialized datasets are used to identify dialect features with high confidence and to study their impact on model performance, training, and evaluation, including considerations of bias and error vs. intentional variation in writing. The cited works also address how contextual cues and consistency across a corpus can help disambiguate dialect usage from other linguistic phenomena, which underpins practical disambiguation techniques and confidence modifiers for intent estimation in NLP settings.

- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP

### music_and_art_computational_analysis.0.concept
**Confidence:** medium

The most relevant content directly engages the core distinction: conspicuous errors are performance mistakes detectable by many listeners, while expressive devices are intentional, stylistic or expressive deviations. One excerpt states that listeners can detect obvious mistakes by considering surrounding context, which underpins the baseline ability to spot conspicuous errors. Another excerpt explicitly notes that a conspicuous error is detectable by the majority of listeners with formal music training, framing the error side of the distinction. Additional excerpts discuss the salience of mistakes depending on contextual appropriateness and listener familiarity, reinforcing how perception of errors can vary with context and expertise. The discussion of a method that outputs the probability that a segment is a conspicuous error further ties to explicit error signaling as a separate signal from expressiveness. On the expressive side, other excerpts describe attributes central to expressive piano performance (tempo, timing, dynamics, pedaling) and note that expressive characteristics are the domain of evaluation when analyzing performance beyond mere correctness, which aligns with intentional deviation as expressiveness. The excerpts collectively support a view that detection systems can rely on context-dependent salience for errors and on expressive feature signals for intentional deviation, and they imply practical heuristics like focusing on salience, contextual appropriateness, training data on expressive attributes, and modeling misalignment versus intentional expressed variance.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### practical_disambiguation_techniques.4.technique_name
**Confidence:** medium

The most directly relevant excerpt discusses library analytics as a feature to track and compare usage of published libraries, components, styles, and variables. This aligns with the theme of governance by providing a concrete mechanism to monitor how library assets are consumed and potentially governed. Excerpts about component overrides show how design systems allow intentional deviations from a base component, which is relevant for detecting intentional versus unintentional changes in a governance context, and can inform heuristics for intent estimation. Excerpts on detaching instances from components and on preserving overrides describe how changes are captured and managed, which can serve as metadata signals when disambiguating deliberate deviations from errors. Collectively, these excerpts offer practical signals (analytics coverage, override behavior, detach/reattach practices) that can be combined to build intent estimation and governance-aware disambiguation rules, even though not all excerpts explicitly frame governance. The strongest support comes from the explicit library analytics discussion, while the others provide essential context about how design-system tooling can surface signals used in intent/disambiguation heuristics.

- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### code_analysis_and_software_engineering.1.justification_requirement
**Confidence:** high

The field value asserts that justification is required for intentional deviations in evaluation and detection systems. Excerpts describing explicit mechanisms to mark or suppress deviations (such as NOLINT and NOLINTNEXTLINE for lint checks) show that teams often embed signals to distinguish intentional deviations from errors, which aligns with the need for justification metadata. Discussions on suppressions and the reasons behind them (why users suppress static analysis warnings) further support that deliberate deviations typically require justification or signaling to be understood by future readers or tools. Text referencing automatic aggregation of TODO comments signals that teams rely on explicit annotations to communicate intent, another form of justification signal. While some excerpts focus on the relationship between assertions and code quality, they still contribute to understanding how signals (assertions, overrides) relate to intent. Collectively, these excerpts illustrate practical disambiguation techniques and signals (NOLINT usage, suppression rationale, and explicit markers like TODO) that a system can leverage to estimate intent, which is the core of the finegrained field value. The presence of these mechanisms in practice suggests that justification requirements are indeed considered and implemented in real-world pipelines and tooling. 

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability

### music_and_art_computational_analysis.0.key_research
**Confidence:** high

The finegrained field value centers on the idea that conspicuous errors can be detected by listeners when considering surrounding context, and that computational models must account for the underlying composition to avoid falsely flagging intentional musical features. Evidence directly states that listeners detect obvious mistakes by listening to surrounding context, and that the salience of mistakes depends on contextual factors and the performer's familiarity. This aligns with the notion that detecting intentional deviation versus unintentional error depends on how the context and composition are modeled. Additional excerpts describe a method that outputs the probability of a segment containing a conspicuous error, illustrating a concrete approach to identifying such errors in a music analysis pipeline. Other excerpts discuss transformer-based approaches to music performance error detection and datasets for expressive piano performance, which support the broader theme of distinguishing errors from intentional deviations by leveraging modeling techniques and contextual data. Together, these sources provide a cohesive view of how perception, context, and computational modeling contribute to disambiguating intent in music performance and related computational tasks.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### code_analysis_and_software_engineering.2.signal_type
**Confidence:** high

The most directly relevant material discusses software assertions and their relation to code quality, which directly informs how to interpret an explicit assertion or contract-like statement in code. It emphasizes empirical links between assertions and code quality, which is foundational for understanding when an assertion acts as a Design by Contract signal or is merely indicative of a check that may fail under erroneous conditions. The content explains the role and normative status of assertions, which is central to distinguishing intentional contract usage from accidental mistakes. Closely related is the discussion of a dedicated study on assertions and how they interact with software reliability, reinforcing how explicit contractual statements can influence interpretation of behavior as adhering to a contract rather than a fault. The discussion about the norm and evaluability of assertions further supports understanding how teams perceive intentionality behind assertions, a core component of distinguishing design by contract from missteps. Following that, discussions on suppressed static analysis warnings and related signaling provide context for how developers indicate intentional deviations or constraints beyond standard contracts, such as quieting checks when a deliberate decision is made to relax a rule, which can be misinterpreted as a mistake. This helps build heuristics for intent estimation: explicit assertions or contracts, coupled with predictable overrides or suppression patterns, suggest deliberate design decisions; inconsistent or rare deviations might indicate mistakes unless consistently applied in a section, which supports the idea of context and consistency as disambiguation cues. Discussions on suppression provide practical signals (e.g., suppressed warnings, comments that suppress lint checks) that can communicate intentional departures from contract-like rules, which can be used as metadata signals in intent estimation. The presence of patterns like TODOs signaling workarounds or intentional deferred work also contributes to understanding how teams communicate intentional design choices when formal contracts are not enforced. Collectively, these excerpts support a heuristic that explicit Assertion/Contract statements paired with deliberate signaling (suppression of checks, TODOs) and consistent patterns across sections are strong indicators of intentional deviation versus accidental error. The more indirect references to general philosophical assertions provide background on normative expectations around assertion as a communicative act, which strengthens the interpretation framework for intent estimation in code. In sum, the excerpts collectively support the idea that establishing a Design by Contract signal relies on explicit assertion usage, complemented by transparent signaling (overrides, suppressions, TODOs) and contextual consistency as a robust heuristic for intent estimation.

- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### music_and_art_computational_analysis.2.concept
**Confidence:** high

To establish fine-grained error detection in music performance, several excerpts provide direct methods or observations about detecting errors: one excerpt outlines a system using a temporal convolutional network to produce the probability that a central segment represents a conspicuous error, illustrating a concrete model for pinpointing errors in piano rolls. Another excerpt presents a transformer-based approach to music error detection, with an end-to-end model designed to align performance audio with scores, addressing misalignment as a core error signal. A related excerpt further explains how such a transformer model can be trained to implicitly compare performance against scores, reinforcing the approach of modeling errors through latent representations. Additional excerpts discuss the salience of mistakes in piano performances, noting that some errors stand out to listeners depending on context and familiarity, which supports the idea that detection depends on contextual cues and listener expectations. There is also a discussion of intuitions around conspicuous errors being detectable by most listeners with formal training, reinforcing the concept that error detection relies on perceptual salience and contextual factors. Together, these excerpts collectively demonstrate practical disambiguation techniques for error detection in music: using model-based predictions (DCN/TCN, transformers) to identify likely errors, leveraging alignment between performance and score to reveal discrepancies, considering contextual salience and listener expectations to gauge error conspicuity, and acknowledging the role of performance context in determining whether an anomaly is an error or intentional deviation. Other excerpts extend the discussion to data-driven resources (datasets) and feature-rich representations (note-level analyses of tempo, timing, dynamics) that enable more nuanced error detection by capturing expressive or unintended deviations, thereby supporting a broader approach to fine-grained error detection beyond binary classifications. The focal point remains the identification and characterization of performance errors through model-driven signals, alignment metrics, perceptual salience, and context-sensitive heuristics, all of which are central to the requested capability to estimate and signal intent in error detection within music and related computational analyses.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.

### practical_disambiguation_techniques.1.application_domain
**Confidence:** high

The core question targets how code analysis differentiates between deliberate, rule-breaking patterns and accidental errors. Excerpt discussing suppressed static analysis warnings directly addresses why developers silence warnings and how that can mask intent, which is central to discerning deliberate deviations from mistakes in code. The companion excerpt detailing reasons behind suppressions further strengthens understanding of metadata and behavioral signals used in code analysis to infer intent. An excerpt on using TODOs shows a concrete mechanism by which developers encode intentional deviations or planned workarounds, illustrating a pattern-based cue that a deviation may be deliberate rather than an error. The study on self-admitted technical debt and polarity examines how developers frame and categorize notes about code quality, which provides qualitative signals about intent and the perceived intentionality behind certain code patterns. Collectively, these excerpts map onto practical disambiguation techniques in code analysis (e.g., recognizing suppression signals, TODO markers, and debt/polarity cues) and suggest heuristics for intent estimation without explicit annotation, such as consistency of a pattern (repeated suppressions or TODOs) and the presence of explicit signaling comments or tooling metadata. The emphasis across these sources is on identifying explicit or implicit signals that distinguish deliberate deviations from mistakes, and on understanding the social/technical contexts that justify such deviations within codebases.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [(PDF) Self-Admitted Technical Debt and comments' polarity](https://www.researchgate.net/publication/362268914_Self-Admitted_Technical_Debt_and_comments'_polarity_an_empirical_study)
  > In this paper, we study the relationship between different types of SATD comments in source code and their polarity, to understand in which circumstances (and

### practical_disambiguation_techniques.4.application_domain
**Confidence:** high

The requested fine-grained field value is Design Systems within the practical disambiguation techniques domain. The most directly relevant excerpts describe explicit mechanisms in design tooling that relate to intentional deviation signals within design systems. A key excerpt notes that in Figma you can override a nearly endless number of properties in an instance, including color, type alignment, and modifications to strokes, which directly reflects how teams intentionally diverge from a shared component to achieve specific design goals. This aligns with identifying deliberate deviations as part of a design-system workflow. Another excerpt explains that you can detach an instance from its main component, which is a deliberate action allowing changes not supported by standard overrides and thus signals intentional divergence from the canonical component. Related guidance on editing instances with component properties shows that overrides are preserved, indicating that intentional deviations can be tracked and persisted rather than erased, which is important for intent estimation within a design system context. Additional excerpts discuss detaching instances and the existence of a fix-detached-instances plugin, underscoring the reality that detachment and reattachment are managed workflows with their own signals of intent. While there are excerpts about library analytics and general library usage, these are less about the mechanism of intentional deviation itself and more about broader design-system governance, but still provide contextual backing for how design-system assets are observed and analyzed in practice. Taken together, these excerpts support the interpretation that design systems involve explicit, trackable methods for intentional deviations (overrides, detachments) and that their handling and observability (persistence of overrides, tooling to find/detach) are central to estimating intent in design-system contexts.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### practical_disambiguation_techniques.4.underlying_principle
**Confidence:** high

To support the stated principle that platform analytics can enumerate and cluster component overrides and detachments as signals of intentional deviation, the most relevant information shows that there are explicit features allowing widespread overrides and detachments within a component system. The discussion of component overrides highlights that a nearly endless number of properties can be changed on an instance, which is the mechanism by which intentional variation can be introduced and tracked. The detach-from-component capability demonstrates how an instance can be intentionally decoupled from its source, providing a clear signal for deliberate divergence rather than a simple mistake. Documentation on editing instances with component properties confirms that overrides are recorded and preserved, suggesting an audit trail and pattern evidence rather than a one-off error. The plugin focused on fixing detached instances illustrates tooling to surface systematic detachments, reinforcing the idea that detection systems can identify ongoing intentional patterns. Finally, general library analytics mention tracking usage of components and styles, which supports the notion that analytics ecosystems exist to surface patterns across a design system, though it is less specific to overrides/detachments than the other sources. Collectively, these excerpts connect the mechanisms (overrides and detachments), the analytics/tracking capabilities, and the tooling that can reveal systematic intentional behavior versus isolated mistakes. This justifies a practical approach: enumerate and cluster override/detachment events, look for consistent rule-breaking patterns, and use an audit trail and tooling to gauge intent, with confidence modifiers grounded in observed consistency and frequency across a section or library.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### natural_language_processing_applications.0.detection_approach
**Confidence:** high

The central practice described—running both a standard grammatical error correction tool and a dialect identification classifier to disambiguate intentional stylistic choices from errors—maps directly to the requested dual-path analysis. For example, a source notes the goal of identifying features of AAL (AAE) and distinguishing them from grammatical errors, which supports the approach of layering dialect detection with error correction. Another study on African-American Vernacular English (AAVE/AAE) in social media provides concrete examples of dialectal markers in real-world text, illustrating how dialect cues can influence NLP outcomes and the necessity of recognizing them. Additional work on NLP bias and AAE highlights how dialectal expressions can be misclassified or misinterpreted by models, underscoring the need for robust heuristics and metadata signals to avoid conflating language variety with toxicity or other attributes. The discussion of grammar and word choice in bias toward AAE further informs that deviations may be stylistic choices rather than errors, reinforcing the value of context-driven interpretation and consistency signals across a text segment. While grammatical error correction surveys provide foundational insight into linguistic challenges and error handling, broader NLP studies on formality and text classification offer methodological context for feature engineering, metadata signals, and estimation of confidence in intent inference. Together, these excerpts support a practical, multi-path disambiguation framework: (a) detect dialectal markers with a classifier, (b) apply or down-weight conventional error-correction signals when high-confidence dialect markers exist, and (c) leverage the consistency of markers across a passage to increase confidence in intent estimation. The combination of dialect-detection with error-correction driven by dialect awareness, plus evidence of bias and the importance of grammar vs. dialect, forms a coherent basis for implementing the described dual-path approach and confidence modifiers.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP

### music_and_art_computational_analysis.0.description
**Confidence:** high

The most relevant evidence shows that (a) listeners’ ability to judge deviations depends on contextual appropriateness and surrounding context, suggesting that intent is inferred from coherence with local harmony and rhythm; (b) the salience of mistakes varies with context, implying that deviations that fit a pattern or resolution may be intentional, while those that clash with local harmony are more likely errors; (c) a conspicuous error is defined as something detectable by listeners, highlighting the role of perceptual salience in intent inference; (d) probabilistic/detection approaches explicitly model the likelihood that a segment is an error, which can be leveraged to separate errors from intentional deviations; and (e) modeling work that aligns performance with a score to detect deviations supports the idea that alignment and symmetry with the intended structure informs intent estimation. Collectively, these excerpts support a practical approach where heuristics include: (i) assessing local harmonic/rhythmic coherence of a deviation; (ii) evaluating contextual appropriateness and pattern consistency over a segment; (iii) estimating perceptual salience to flag conspicuous edits; (iv) using probabilistic scoring for “conspicuous error” probabilities; (v) employing alignment-based models to compare performance against the score to reveal intentional deviations that still align with the piece’s structure. The field value is thus supported by evidence that coherence with context and pattern, along with detectable salience and score-aligned modeling, are key signals for distinguishing between error and intentional deviation. 

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.

### music_and_art_computational_analysis.2.key_research
**Confidence:** high

The finegrained field value centers on a concrete model, Polytune, described as an alignment-aware or alignment-agnostic (alignment-free) transformer for music error detection, and it notes a key limitation: missed notes in homophonic textures pose ongoing challenges for error representation. Excerpts that explicitly mention Polytune as an end-to-end transformer for music error detection directly support the existence and role of this model in the space of alignment-aware or alignment-free approaches to detecting performance errors. Related excerpts discuss how such models can implicitly align and compare performance audio to scores, or how misalignment can degrade error detection and feedback quality, which speaks to the broader challenge of alignment in these systems and helps explain why an alignment-free approach could be pursued and what its limitations might be. Other excerpts that describe salience of mistakes, context-dependency, and the idea that some errors are more noticeable than others provide context for why a detector must handle varying textures and contexts, contributing to the understanding of when errors might be mistaken for intentional deviations versus simple mistakes. Together, these sources build a narrative: Polytune represents a modern transformer-based approach to music error detection; alignment issues (whether explicit or implicit) affect performance, and homophonic textures present a specific limitation that ongoing research seeks to address. The most directly supportive content is the explicit reference to Polytune as an end-to-end transformer model for music error detection, followed by discussions of alignment and misalignment impacting error detection and feedback effectiveness, which together substantiate the finegrained field value. Additional sources on expressive performance datasets and salience-based error detection enrich the discussion by illustrating the broader landscape in which Polytune operates and the kinds of contextual signals (tempo, timing, dynamics, accuracy) that detectors may rely on or struggle with when inferring intent in deviations.

- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > A subset of the gathered
data and listening examples can be found on the compan-
ion pag
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### natural_language_processing_applications.0.challenge
**Confidence:** high

The fine-grained field value seeks methods for distinguishing dialectal usage from grammatical errors in natural language processing. Several excerpts directly address this distinction or closely related issues. One excerpt explicitly states the goal as assessing whether tools can accurately interpret and distinguish AAL (African American Language) features from grammatical errors, which maps directly to the core task of separating dialectal variance from mistakes. Additional sources discuss how dialectal expressions are misclassified or treated differently by NLP systems, highlighting practical challenges when dialect features intersect with error signals and model biases. These pieces collectively illustrate heuristics and metadata considerations such as the stability of dialect features across text segments, the impact of dialect on hate-speech or bias detection, and the risk of mislabeling dialectal forms as negative or erroneous. Related studies on grammar and word choice in bias towards African American English further provide context on how linguistic variation can influence classification outcomes, underscoring the need for system signals that distinguish intentional stylistic choices from mistakes. Broader works on grammatical error correction and formality detection contribute complementary techniques for identifying non-standard language and stylistic variation, which can be repurposed to separate intentional dialect usage from unintentional errors. Taken together, these excerpts support a set of disambiguation techniques such as: (a) explicit modeling of dialect features as distinct from error signals, (b) analysis of consistency of non-standard forms across a discourse segment to infer intent, (c) bias-aware evaluation that accounts for dialectal variation, and (d) metadata signals around formality, context, and token-level stability to calibrate confidence in dialect vs error labeling. The overarching implication is that reliably distinguishing dialect from error requires multi-faceted signals and contextual consistency checks rather than a single rule-based detector, with higher confidence when dialectal patterns persist across related segments and lower confidence when non-standard usages appear sporadic or isolated. The specific field value can be supported by these strategies, which emphasize detecting intentional stylistic choices as opposed to incidental mistakes, and by incorporating studies that demonstrate how linguistic variation interacts with model judgments in real tasks such as hate-speech detection and formality classification.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP

### code_analysis_and_software_engineering.2.intent_implication
**Confidence:** medium

The claim centers on the use of an assertion or contract to guard edge cases and enforce specific conditions as part of an intentional, unconventional pattern. The most directly relevant evidence notes empirical findings on the relationship between assertions and code quality in software systems, which supports the notion that assertions are used as deliberate guardrails rather than incidental checks. This aligns with the idea of a local safety mechanism accompanying unusual code choices. Additional supporting signals come from studies and discussions about suppressing static analysis warnings and marking TODOs, which reflect intentional deviations or caveats that developers want to acknowledge rather than automatically enforce; these practices demonstrate a broader pattern where teams communicate intent through explicit signals. The presence of guidelines or tooling that allows intentional overrides (for example, mechanisms to suppress lint checks) further corroborates that developers employ explicit signals to distinguish deliberate deviations from unintentional errors. Taken together, the excerpts support the overall concept that deliberate guarding via assertions or contracts is a recognized practice, and that explicit intent signals (warnings suppressions, TODOs) accompany such patterns to communicate developer intent and edge-case handling. The strongest alignment comes from the assertion–code quality relationship, which directly underpins the idea that an assertion can express a purposeful constraint around edge-case behavior; the suppression and signaling practices then provide contextual metadata cues that detection systems can use to infer intent rather than treat all deviations as errors.

- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability

### code_analysis_and_software_engineering.2.justification_requirement
**Confidence:** medium

The strongest support comes from excerpts that explicitly examine deliberate suppression or ignoring of warnings, which aligns with the idea that explicit justification may not be required for certain deviations. The study on suppressed static analysis warnings discusses reasons that lead users to suppress warnings, which directly informs how a detection system might treat such deviations as intentional without needing explicit justification. Related documentation on suppressions reinforces that warnings can be silenced to allow intentional deviations, again supporting a non-mandatory justification signal. The discussion of TODO markers as signals of intentional deviation provides another concrete mechanism by which a system can recognize non-justified deviations without explicit explanations. Documentation about NOLINT and NOLINTNEXTLINE in linting tools shows that projects deliberately ignore certain checks, which is a clear mechanism for non-justified deviation signals. Collectively, these excerpts illustrate practical patterns and metadata signals (warnings suppressions, TODOs, lint suppression) that a system can rely on to estimate intent with minimal or no explicit justification. Less direct are excerpts discussing assertions in software without tying them to justification signals, or general philosophical discussions of assertions, which provide context but do not strongly reinforce the lack of a justification requirement. The remaining items about design and gaps in research offer peripheral support but do not directly articulate mechanisms for or against justification requirements.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [Assertion - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/archives/win2021/entries/assertion/)
  > Nov 17, 2021 — Empirical research on the norm of assertion was initiated by Turri. His (2013) study aims to determine whether people's assertability

### code_analysis_and_software_engineering.2.mechanism
**Confidence:** medium

The most relevant material directly addresses how assertions relate to code quality, which supports the core field value of using explicit assertions or formal specifications to express intent and correctness constraints in code. This includes empirical evidence that there is a relationship between assertions and code quality, which underpins their role as explicit intent signals. Following that, several excerpts discuss suppressions of static analysis warnings as a behavior indicating intentional deviation, including why developers suppress warnings, how often they occur, and the contexts in which suppressions are used. These sources help inform heuristics around signals that accompany intent, such as suppression patterns and rationale. Additional relevance comes from discussions about using conventions like TODO comments, which can signal deliberate deviations or planned work, offering a broader perspective on how teams communicate intent in code. Collectively, these excerpts provide a factual basis for heuristics and metadata signals (assertion presence, suppression frequency, deliberate deviations like TODOs) that a detection system could use to estimate intent without explicit annotation. They do not, however, provide a direct blueprint for formal specification languages themselves beyond mentioning the concept (e.g., JML) in the context of the field value, so the strongest support comes from the empirical and practice-oriented discussions of assertions and suppression as intent signals.

- [Assessing the Relationship between Software Assertions ...](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2006-54.pdf)
  > by G Kudrjavets · Cited by 11 — Our study provides empirical evidence of the relationship between assertions and code quality using commercial software systems. Mining the bug database
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".

### practical_disambiguation_techniques.4.example_tool_or_research
**Confidence:** medium

The clearest support for the finegrained field value comes from the excerpt that explicitly mentions library analytics, describing how to use library analytics to track and compare usage of published libraries, components, styles, and variables. This directly aligns with the concept of Figma Library Analytics as a concrete analytical feature. Other excerpts discuss related analytics and mechanisms within Figma (such as how analytics may be used to understand detaches or how library-related signals might be affected by overrides and detaches). These provide contextual signals about analytics in the Figma ecosystem but do not specifically define or describe Library Analytics themselves. Together, they furnish a contextual backdrop showing how analytics exist within Figma and how library-related signals might be analyzed, reinforcing the interpretation of the direct library-analytics reference as the primary evidence, with surrounding excerpts offering supportive context.

- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.

### music_and_art_computational_analysis.0.computational_approach
**Confidence:** high

The field value describes a two-stage process in which an initial stage flags locally salient anomalies (conspicuous errors) and a subsequent stage re-scores these anomalies by analyzing surrounding musical context (harmonic/rhythmic) and style priors to distinguish true errors from structural elements like motifs or ornaments. Evidence in the excerpts aligns with this: one excerpt specifically presents a method that reads a piano representation and outputs the probability that a central segment is a conspicuous error using a backbone and classifier head, which corresponds to the initial detection stage. Other excerpts discuss how error salience is modulated by musical context, such as contextual appropriateness and listener familiarity, which supports the idea that higher-level re-scoring can use surrounding context to disambiguate intent. Additional excerpts describe transformer-based approaches to detecting performance errors and aligning performance to score, which conceptually aligns with a subsequent stage that uses broader context or learned priors to improve judgment beyond a local anomaly. Together, these pieces illustrate a workflow: first identify potential anomalies with a local signal detector, then apply context-aware re-assessment incorporating harmonic/rhythmic surroundings and stylistic priors to separate deliberate stylistic choices or motifs from genuine errors. This supports the notion of a practical disambiguation pipeline and the importance of context signals in intent estimation. 

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
  > This paper proposes _Polytune_ , an end-to-end trainable trans-
former model for music error detectio
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### practical_disambiguation_techniques.1.underlying_principle
**Confidence:** medium

The concept of implicit programming rules being mined from a codebase aligns with using meta-signals to infer intent. Suppressions in static analysis reveal a deliberate choice to hide or bypass certain warnings, which is a direct signal of intentional deviation from conventional rules and can help differentiate intentional patterns from mistakes when such suppressions are frequent or patterned across a code region. This mirrors the idea of identifying frequent co-usage and ordering of operations and treating violations of those patterns as potential bugs, because both rely on understanding baseline expectations and detecting deviations from them. Signals around suppressions show where developers consciously choose to diverge from rules, and their distribution across a codebase can calibrate intent likelihood. Deliberate TODOs signal an explicit plan to deviate or postpone addressing a rule, which again demonstrates intentional deviation patterns that can be used as metadata signals in intent estimation. Self-admitted technical debt and the polarity of comments reveal developers’ recognition of suboptimal or rule-breaking choices and their contextual justification, offering another form of pattern-based intent signal that can help distinguish careless errors from planned departures. Together, these excerpts illustrate concrete mechanisms for capturing intent-related metadata (suppression behavior, explicit TODOs, and debt/polarity signals) that can be integrated into a broader implicit-rule mining framework to flag violations with higher confidence when a consistent pattern emerges across a region, rather than isolated incidents.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [(PDF) Self-Admitted Technical Debt and comments' polarity](https://www.researchgate.net/publication/362268914_Self-Admitted_Technical_Debt_and_comments'_polarity_an_empirical_study)
  > In this paper, we study the relationship between different types of SATD comments in source code and their polarity, to understand in which circumstances (and

### practical_disambiguation_techniques.0.application_domain
**Confidence:** high

The field value centers on Music Performance Analysis, including how listeners perceive mistakes and how computational methods detect and analyze performance deviations. The most directly relevant excerpt argues that listeners can detect obvious mistakes by considering surrounding context and familiarity with the piece, which is a core aspect of understanding performance quality and error salience in music analysis. This supports the notion that performance analysis involves modeling how context and listener expectations shape the identification of errors or deviations in music. The discussion of how the salience of mistakes depends on contextual appropriateness and listener familiarity further grounds performance analysis in how perceptual cues distinguish errors from acceptable variance, a key problem in music performance evaluation. The same excerpt distinguishes conspicuous errors detectable by musically trained listeners regardless of score knowledge, highlighting a domain where performance analysis seeks to identify errors based on perceptual salience rather than strictly on notated content, which is central to performance-focused analysis. The accompanying source about fast and accurate alignment of polyphonic symbolic music signals provides a computational method that supports music performance analysis by enabling precise alignment and comparison between performed and notated music, a fundamental capability for detecting deviations, timing irregularities, and expressive choices in performance data. The notes on the GigaMIDI dataset emphasize granular, note-level expressive features such as pitch, velocity, and microtiming to reveal expressive characteristics, illustrating how performance analysis relies on quantitative feature extraction to model and interpret performance nuance. The dataset on automatic expressive piano performance modeling reinforces the same theme: analyzing tempo, timing, dynamics, and pedaling as attributes that characterize performance quality and deviations, which is essential for a robust music performance analysis framework. Taken together, these excerpts map a coherent suite of concepts and methods—perceptual salience of errors, contextual and familiarity-based disambiguation, computational alignment, and granular expressive features—that underpin Music Performance Analysis and the detection of intentional deviation as distinguishable from mistakes or expressive choices.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.

### practical_disambiguation_techniques.1.example_tool_or_research
**Confidence:** medium

The discussion of suppressed static analysis warnings provides direct empirical attention to why developers choose to suppress warnings and what that implies about intentional deviation versus mistakes. This includes understanding when suppression is used to override a tool’s judgment and under what contexts it signals deliberate signaling rather than error. The exploration of why users suppress warnings (tracking suppressions) directly informs heuristic signals and metadata that can help estimate intent in a detection system. The traditional “TODO” usage example illustrates how explicit notes or placeholders can mark intentional deviations, with automatic aggregation and review implying a metadata signal and governance process around such deviations. The study of Self-Admitted Technical Debt and the polarity of comments demonstrates how the nature and sentiment of commentary around code can reveal intentional design choices versus issues stemming from errors, providing another dimension (polarity and debt signaling) for inferring intent. Together, these excerpts offer concrete techniques (suppressions, TODOs, and debt/polarity signals) that can be integrated as metadata signals and heuristic rules in a detection system to disambiguate intent, even in the absence of explicit annotations. They also imply the importance of context and consistency, such as repeated suppression or repeated deviations, to strengthen intent estimation across a section of code or design.”,

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [(PDF) Self-Admitted Technical Debt and comments' polarity](https://www.researchgate.net/publication/362268914_Self-Admitted_Technical_Debt_and_comments'_polarity_an_empirical_study)
  > In this paper, we study the relationship between different types of SATD comments in source code and their polarity, to understand in which circumstances (and

### practical_disambiguation_techniques.0.technique_name
**Confidence:** medium

Context-aware anomaly scoring relies on understanding when deviations are salient or meaningful given surrounding information and audience expectations. Excerpts discussing that some mistakes in piano performances stand out or go unnoticed depending on contextual appropriateness and the listener’s familiarity directly support the idea that intent-disambiguation can be improved by context signals and audience metadata. Additional excerpts describe fast and accurate alignment in polyphonic music and note-level expressive features, which contribute signals about how deviations interact with timing, dynamics, and score context to shape interpretation of intent. Datasets focusing on expressive performance provide practical sources of pattern-based features (tempo, timing, dynamics, pedalling) that can feed anomaly scoring and intent estimation. Collectively, these excerpts justify the notion that context, consistency across a sequence, and metadata signals (like familiarity and contextual appropriateness) are critical for estimating whether a deviation is intentional or erroneous, and they outline concrete features and signals to consider in designing detection heuristics.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.

### practical_disambiguation_techniques.0.example_tool_or_research
**Confidence:** high

The target finegrained field value identifies a specific work, Morsi et al., ISMIR 2023, as a source informing how listeners detect and interpret deviations in piano performance. The most directly supportive excerpt states that there is an intuition that a listener can detect obvious mistakes by considering surrounding context, and that the salience of mistakes depends on contextual appropriateness and familiarity with the piece. This directly informs practical disambiguation techniques by suggesting context-aware salience signals as a heuristic for distinguishing mistakes from intentional deviations. Another excerpt elaborates that some mistakes stand out to listeners while others may go unnoticed, depending on contextual factors, reinforcing the idea that contextual cues modulate perceived intent. The third excerpt explicitly defines a conspicuous error as one detectable by a broadly trained audience, tying the concept of error salience to general listener experience, which supports the notion that detection systems could leverage salience thresholds and listener-model alignment to infer intent. Collectively, these passages connect the field value to pragmatic cues for intent estimation in music contexts, emphasizing context, salience, and familiarity as practical signals for disambiguation.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece

### natural_language_processing_applications.2.challenge
**Confidence:** medium

To support handling poetic license and creative language in NLP, it is essential to recognize that language variation can be either deliberate stylistic choice or a mistake, and system signals should help discriminate between the two. The discussion that highlights distinguishing features of dialectal usage from grammatical errors suggests that NLP tools must learn to interpret nonstandard forms not as errors but as potentially intentional variants, especially when such forms appear as part of broader linguistic patterns or authorial style. This aligns with the idea that misclassification can occur when models treat dialectal features as toxic or incorrect; awareness of dialectal variation and bias informs strategies for interpreting creative language rather than penalizing it. Broader analyses of grammar and word choice in bias tasks illuminate how surface form choices influence model outputs, underscoring the need for context-aware interpretation rather than rule-based rigidness. The literature on grammatical error correction summarizes linguistic challenges in distinguishing acceptable variation from mistakes, providing a framework for treating creative deviations as intentional when they cohere with stylistic goals. Studies on formality detection extend this by showing how formality, tone, and register can vary across genres, which is relevant when poetic language intentionally shifts formality or uses unconventional syntax. Collectively, these excerpts suggest practical disambiguation techniques such as: (a) evaluating consistency of deviations within a larger textual segment (section-wide or author-wide patterns), (b) incorporating dialect-aware or genre-aware language models that are trained to distinguish error-like forms from intentional variants, (c) using metadata signals like genre, author intent, and audience expectations to modulate interpretation, and (d) applying formality and grammar perception as probabilistic signals rather than binary judgments. The availability of these signals supports confidence-modulated decisions about intent estimation and can guide heuristic rules for when a deviation should be treated as stylistic license rather than error. The overarching goal is to estimate intent without explicit annotation by combining contextual coherence, cross-sentence consistency, and domain metadata. This reasoning supports the finegrained field value by outlining how a system can handle poetic or creative language as intentional deviation, rather than error, using evidence-based cues drawn from the excerpts.”,

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.

### natural_language_processing_applications.2.example
**Confidence:** medium

The target field describes poetry and creative writing as deliberately breaking standard grammatical rules for artistic effect, with such deviations being intentional and central to style and meaning. Excerpts that discuss grammar in the context of stylistic choices, dialectal variation, and the impact of nonstandard forms on interpretation directly support this. Specifically, the passage on dialect differences and the capacity of tools to distinguish grammatical features from errors aligns with the idea that intentional stylistic departures can mirror deliberate rule-breaking for effect, not mistakes. A survey of grammatical error correction is relevant because it addresses how systems handle nonstandard forms and the boundary between error and intentional deviation, which is precisely the space poetry often occupies. Papers exploring grammar, word choice, and bias related to dialect (including African American English) demonstrate that surface grammar changes can reflect stylistic intent rather than errors, a core concern when identifying intentional deviation in creative text. Research on text formality detection further informs how sentiment, style, and intentional deviations are signaled and interpreted, which can help distinguish deliberate plays on form from accidental mistakes. Additional works addressing AAVE lexical items and related misclassification issues illustrate practical challenges in interpreting nonstandard forms as either intentional style or erroneous usage, reinforcing the need for context-aware heuristics in intent estimation. Taken together, these excerpts provide a foundation for recognizing that poetry and creative writing may deliberately deviate from standard grammar, and that reliable disambiguation relies on context, consistency across segments, and metadata signals about formality, dialect, and stylistic intent.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et

### natural_language_processing_applications.1.challenge
**Confidence:** medium

To identify intentional shifts in formality or register, sources that focus on detecting formality levels in text are directly informative. The first two excerpts describe systematic studies of formality detection in text classification, which provide methods and features useful for distinguishing formal versus informal styles and for assessing when a style change may reflect intent rather than error. Excerpts discussing dialectal variation and the distinction between grammatical errors and intentional stylistic choices highlight challenges in disambiguating formality shifts from mistakes, offering concrete signals (e.g., dialect features, AAE usage) and the importance of context to infer intent. Additional sources on grammar, bias related to dialects, and error correction illuminate how models can misinterpret intentional stylistic choices as errors, underscoring the need for contextual cues and metadata to estimate intent. Collectively, these excerpts suggest practical disambiguation techniques such as feature engineering for formality cues, leveraging dialect/register signals, and incorporating metadata or consistency patterns across segments to infer whether a shift is deliberate or erroneous. The most relevant signal is a demonstrated focus on formality classification itself, followed by analyses that tease apart intentional style from errors, as these directly map to intent estimation in the described use case.

- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,

### practical_disambiguation_techniques.0.underlying_principle
**Confidence:** high

The most directly relevant evidence shows that the salience of mistakes depends on contextual appropriateness and a listener’s familiarity, which supports the idea that local anomalies should be re-evaluated against surrounding harmonic/rhythmic context and style priors. The rationale that listeners can detect obvious mistakes by listening to surrounding context further reinforces the principle of context-driven re-assessment. A definition of a conspicuous error as detectable by the majority, regardless of score knowledge, provides a boundary case that clarifies when local deviations are likely surface-only and when they may warrant deeper re-evaluation against context and priors. A related methodological note on fast alignment of music signals underscores practical techniques for aligning events to context, which can be extended to re-evaluate deviations within a piece by comparing expected versus actual alignment within context. Collectively, these excerpts support a framework where local anomalies are evaluated with context-sensitive priors to estimate intent, and provide actionable cues for implementing such disambiguation (contextual salience, familiarity-weighted expectations, and alignment-based corroboration).

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,

### natural_language_processing_applications.2.relevant_datasets
**Confidence:** medium

The most relevant excerpt is a survey of grammatical error correction that condenses the field and outlines linguistic challenges and popular approaches, which directly ties to the existence and role of datasets in NLP tasks, including style and grammar-related tasks. Following that, a study of detecting text formality provides a structured exploration of formality as a classification task in NLP, which often relies on datasets and evaluation benchmarks; this aligns with the broader theme of datasets and methodological approaches in style classification. Another excerpt on detecting formality complements this by discussing classification approaches that depend on dataset design and feature extraction for stylistic signals. Excerpts addressing grammar, word choice, and dialect in NLP emphasize how datasets can reflect or bias performance when handling creative language and non-standard forms, highlighting the need for diverse datasets and robust evaluation. Additional excerpts discuss bias related to dialects and hate speech, illustrating how dataset composition, labeling, and evaluation impact NLP styles and classifications. Overall, the collection supports the claim that general NLP surveys and style-classification research address linguistic challenges and computational approaches pertinent to datasets used for creative language tasks, even if they do not name specific datasets by title. This combination provides a coherent view of how intent and style are studied in NLP contexts through dataset-centric analyses, survey-driven overviews, and method-focused papers.

- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et

### natural_language_processing_applications.1.example
**Confidence:** high

The most relevant excerpt directly tackles the core problem: distinguishing intentional stylistic choices or dialectal features from grammatical errors in NLP systems and evaluating whether tools can correctly interpret such intentional variations. This provides concrete examples of features used to separate stylistic intent from mistakes. The next excerpt expands on grammar and word choice in bias-related classification, illustrating how intentional style and regional variation can bias models and be misinterpreted as errors, which is highly pertinent to disambiguating intent. A third excerpt delves into African-American Vernacular English (AAVE) presence in NLP datasets and classification, further informing how intentional stylistic signals might be confused for errors and how to handle them. Subsequent material on grammatical error correction surveys typical challenges and approaches to distinguishing errors from acceptable non-standard usage, which offers a broad technical backdrop for tooling that must decide when a deviation is a mistake versus a stylistic choice. Additional sources touch on bias and dialect representation in NLP, contributing context about how misinterpretations can arise when encountering non-mainstream language forms. The remaining excerpts discuss formality detection and related text classification methods, which, while relevant to understanding formality and style, are less focused on explicit intent disambiguation and are therefore considered weaker directly-supporting evidence for the specific field value. Overall, the rationale is to assemble a coherent set of approaches—dialect/intent signals, bias-aware handling, and grammar-correction constraints—that collectively inform heuristics and metadata signals for intent estimation in NLP contexts.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.

### natural_language_processing_applications.1.relevant_datasets
**Confidence:** medium

The most relevant content directly references formality detection methods and systematic studies in NLP, which aligns with the field value describing a study of formality detection approaches and the use of corpora annotated for formality. The second most relevant excerpt discusses formality detection methods more broadly and systematic approaches in text classification, which supports the same theme and may implicitly reference annotated corpora used for training and evaluation. Excerpts that examine dialect features and language variation discuss distinguished handling of stylistic choices versus grammatical differences; these lines help contextualize how formality signals can be treated separately from errors, thereby supporting the idea of distinguishing stylistic formality signals from corrections. References to grammar and error correction (grammaral error correction surveys) provide background on language quality tasks but are less directly tied to the formality-focused corpus and study design, though they remain contextual to the broader NLP evaluation landscape. Excerpts addressing NLP bias related to dialects (AAE, African American Vernacular English) and continued discussions of language variety offer supplementary context about how stylistic signals may be confounded with non-formality signals, highlighting the need for careful feature design in formality detection. The set concludes with broader discussions of dialect surveys, which, while tangential, illustrate the diversity of language variation considerations that can impact formality interpretation in datasets and models.

- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et

### practical_disambiguation_techniques.3.example_tool_or_research
**Confidence:** medium

The target field value refers to dialect-aware grammatical error correction (GEC) studies, i.e., understanding how systems distinguish between intentional language variation due to dialects and unintentional errors. The most directly relevant excerpt discusses Grammatical Error Correction and surveys the state of the art in the field, which is foundational for understanding how GEC approaches handle non-standard grammar patterns and deviations arising from dialects. Excerpts focused on how grammar and word choice interact with bias, particularly in African American English (AAE) and dialectal expressions in hate speech classification, provide important context for how dialect-aware GEC must contend with social and linguistic variation, ensuring corrections do not mislabel legitimate dialectal forms as errors. Additionally, discussions on NLP bias related to dialects further illuminate potential failure modes and the need for contextual signals when disambiguating intent or correctness in dialect-rich text. Collectively, these excerpts support the concept that dialect-aware GEC requires specialized judgments about what constitutes an error versus a deliberate or non-standard usage, and they inform practical heuristics for disambiguation, metadata signals, and confidence modifiers in intent estimation within GEC frameworks.

- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.

### natural_language_processing_applications.1.detection_approach
**Confidence:** high

The most directly relevant content describes formality detection approaches and text classification methods that quantify formality and register, which align with the need to distinguish intentional stylistic choices from mistakes. These sources discuss using machine learning approaches to detect formality, as well as the role of genre/source as priors, which supports the idea of context-informed priors as signals of intent. Additionally, the surveyed work on Grammatical Error Correction and discussions of dialectal variation (e.g., African American English) illustrate how models handle formality, style, and potential misclassification due to non-standard forms, which informs heuristics for distinguishing deliberate deviation from error. The presence of discussions on bias related to dialects further informs metadata signals that a detector can use (e.g., source, audience, and genre) to refine intent estimation. The collection also includes work specifically on grammar and word choice in bias contexts, which contributes to understanding which stylistic features may signal deliberate stylistic choices versus mistakes. Taken together, these excerpts support a framework where: (a) formality scores and register classifiers provide baseline signals, (b) priors from document type and provenance cue intentionality in context, (c) counterfactual tests (rewriting to standard grammar to see coherence/classifier shift) serve as a practical disambiguation technique, and (d) dialect/bias considerations shape metadata signals for more accurate intent estimation. The ordering reflects how directly each piece informs formality/classification mechanisms and contextual priors, from explicit formality detection methods to discussions of bias and grammar correction that illustrate practical pitfalls and signal design choices.

- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et

### natural_language_processing_applications.3.challenge
**Confidence:** high

To document non-standard language varieties in NLP, we look for excerpts that explicitly discuss dialectal usage and its implications for detection, bias, and evaluation. Excerpt describing African-American Vernacular English (AAVE) in NLP research directly addresses non-standard language varieties and provides concrete examples of dialect features being studied within computational analysis, which is central to documenting such varieties. Excerpts that discuss NLP bias related to African American English highlight how models can misclassify or misinterpret dialectal forms, underscoring the need to document and handle non-standard varieties properly. Excerpts on grammar and word choice in bias toward AAE extend this by showing how evaluation can be affected by non-standard forms, reinforcing the importance of systematic annotation and reporting. Excerpts on formality detection and grammatical error work in NLP offer relevant methodological context, showing how researchers categorize text along formality or correctness axes, which informs how non-standard varieties might be annotated and studied. Together, these sources provide a foundation for defining language varieties, their markers, how they are detected or misinterpreted by models, and what metadata or heuristics can improve robust documentation and handling in NLP systems. The most directly supportive content describes dialectal items and biases in NLP, while the others supply necessary methodological background on monitoring and annotating non-standard language usage.

- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular

### practical_disambiguation_techniques.3.underlying_principle
**Confidence:** medium

The target fine-grained field describes a disambiguation principle where grammatical error signaling competes with a detected non-standard style or dialect, specifically noting that GEC signals should be down-weighted when a consistent non-standard style (like AAE or colloquialisms) is confidently detected. The most directly relevant material is a survey of Grammatical Error Correction (GEC) which consolidates the state of the art in handling grammatical issues, providing foundational context for how GEC systems operate and what flags they may produce. Following that, chapters and papers addressing NLP bias and dialect variation—especially those focusing on African American English (AAE) and dialect-aware classification—illustrate practical challenges where grammar and style cues interact with detection/classification pipelines. These sources together illustrate that style or dialect can inform or override standard error signals when evaluated with appropriate confidence signals. Additional excerpts discuss grammar and word choice in bias contexts, reinforcing that linguistic features interact with classifier behavior and that stylistic variation can lead to systematic differences in evaluation, which is highly relevant to a strategy that down-weights or adjusts GEC flags in the presence of a consistent non-standard style. Taken collectively, these excerpts support the notion that a detection system should consider both standard error signals and stylistic/dialect cues, and use contextual consistency to modulate the influence of GEC flags. While none of the excerpts provide a turnkey algorithm, they offer concrete evidence and approaches for how to balance error signals with dialect-aware signals in practice, supporting a pragmatic disambiguation technique and metadata signaling approach described in the field value.

- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.

### explicit_metadata_signals.0.interpretation
**Confidence:** high

The explicit directive to ignore a violation on a specific line or scope is a clear metadata signal of intentional deviation. Text describing the use of NOLINT and NOLINTNEXTLINE demonstrates that developers actively mark certain code regions to suppress lint checks, which directly aligns with an explicit intent signal. Related guidance on disabling specific warnings (such as Pylint) and pragma controls illustrates standardized mechanisms by which developers communicate acceptance or bypassing of a potential issue, reinforcing the interpretation that an explicit disable is an intentional override rather than an error. Additional supporting context from empirical studies of suppressed static analysis warnings shows that suppression is a recurring practice people use to manage perceived issues, including the reasoning that the suppression is deliberate and context-dependent. Together, these excerpts provide concrete examples of explicit intent signals (direct suppression directives) and contextual analysis (why suppressions occur, how they are tracked) that can be used to derive heuristics for intent estimation, such as recognizing line-level or scope-level suppressions as high-confidence indicators of intentional deviation, with other evidence (like frequency and consistency of suppressions) feeding lower-confidence or supporting signals. The set of examples demonstrates both direct mechanisms for signaling intent and the surrounding practices that help distinguish intentional deviation from innocent mistakes, which is essential for practical disambiguation techniques and confidence modifiers.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### explicit_metadata_signals.0.example
**Confidence:** high

The field value represents explicit metadata signals used to indicate intentional deviation or suppression of warnings. The strongest support comes from statements showing direct mechanisms to bypass checks, such as NOLINT and NOLINTNEXTLINE, which are explicit markers used to indicate that a given piece of code should be exempt from linting rules, thus signaling intentional deviation. Additional excerpts discuss why users suppress static analysis warnings, providing context for metadata signals as deliberate choices rather than errors. Other entries describe how to disable specific warnings in Pylint, including the concept of block disables and per-rule suppression, which aligns with the idea of annotating code with metadata to signal intent. Taken together, these excerpts illustrate concrete methods for encoding intent through tooling metadata (e.g., lints, suppressions) and offer context for why and how such signals are employed. They also cover considerations around why suppressions occur, which helps distinguish intentional deviation from mere mistakes, contributing to heuristics and pattern-based approaches for intent estimation. The most direct evidence is the availability of explicit disable markers, while the supportive context around why suppressions happen and how tools implement them provides a broader methodology for metadata-driven intent signals.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on

### natural_language_processing_applications.2.detection_approach
**Confidence:** high

To support a detection framework that can identify whether text is creative prose or poetry and switch to a descriptive mode, the most relevant sources are those discussing how NLP systems handle dialectal variation and stylistic choices without treating them as errors. An excerpt that highlights distinguishing dialect features from grammatical errors demonstrates a mechanism for separating intentional stylistic deviation from mistakes, aligning with a mode that acknowledges creative style rather than penalizing it. Another excerpt discusses the mismatch between dialect features and model judgments, underscoring the importance of context and bias-aware classification when inferring genre or style. Subsequent sources address grammar and word choice influences on bias in hate speech classification, illustrating how formality, register, and stylistic cues affect classification decisions, which is crucial for designating a descriptive analysis mode rather than a prescriptive one. Additional references on grammatical error correction and formality detection provide technical methods for detecting deviation patterns and calibrating confidence in stylistic interpretation. Collectively, these excerpts support the idea that genre/style classification can guide mode switching and deviation handling by leveraging dialect-aware features, formality signals, and bias considerations, while maintaining the possibility to flag deviations as intentional rather than erroneous when context and consistency indicate deliberate choices. 

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et

### explicit_metadata_signals.0.signal
**Confidence:** high

The strongest support comes from excerpts that explicitly describe suppression mechanisms used to bypass lint checks. The references to NOLINT and NOLINTNEXTLINE show concrete, explicit suppression comments that directly align with the idea of a Linter Suppression Comment as a signal. Following that, references to pragma-based disable controls describe how code paths can be programmatically silenced, which reinforces the concept of a deliberate suppression signal in lint tooling. Practical guidance and questions about disabling a particular linter warning illustrate common usage patterns developers employ to suppress warnings, further supporting the interpretation of a suppression comment as an intentional signal. Broad empirical studies of suppressed static analysis warnings provide context for why suppression occurs, which helps in estimating intent in a broader sense, but they are indirect relative to the explicit suppression signal. The combination of explicit suppression syntax, tooling controls, and real-world questions about disabling warnings collectively support the notion of a Linter Suppression Comment as a concrete metadata signal indicating intentional bypass of a linter rule, rather than an incidental or erroneous message.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### practical_disambiguation_techniques.5.underlying_principle
**Confidence:** medium

The most relevant sources describe explicit signals that a deviation may be intentional rather than accidental. A source discussing the use of a TODO as a marker of intentional deviation directly supports the idea that intentional deviations can be signaled and reviewed, which aligns with the concept of using corrective or flagging mechanisms as indicators of intent. Similarly, sources describing how overrides and detachments in a design system context create a persistent signal that a deviation from the canonical component or rule is deliberate—these are practical metadata signals a detection system can observe and leverage when inferring intent. Additional sources examine why and how a user might suppress warnings in code, which can function as an intentional metadata signal indicating a deliberate deviation from default behavior, along with evidence showing how many properties can be overridden in a component instance, reinforcing the existence of intentional deviation channels in real-world workflows. The references on detaching an instance from a component illustrate a deliberate action that intentionally breaks the link to a main reference, providing another concrete, observable signal of intent. Together, these excerpts offer concrete heuristics and metadata signals (e.g., explicit overrides, detachments, suppression of warnings) that a system could monitor to estimate intent without explicit annotation. Complementary contexts about performance errors and the salience of mistakes in music provide important background: they suggest that not all deviations are equally detectable, and some contexts render mistakes as more or less conspicuous, which informs confidence modifiers and context-aware thresholds in an intent estimation system. Finally, more general discussions of error detection and alignment methods reinforce the idea that evaluating the impact on a measurable objective (e.g., a test or a design contrast) after attempting a correction is a valid disambiguation technique.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,

### explicit_metadata_signals.0.domain
**Confidence:** high

The most directly relevant discussions are those that study or describe how source-code analysis and tooling handle intent signaling, suppression, and deviations within code. For example, empirical studies on suppressed static analysis warnings illuminate why developers suppress certain warnings in source files, which is a concrete metadata signal within the source domain about intent and provenance of code patterns. Relatedly, guidance on disabling specific static analysis warnings demonstrates explicit mechanisms within source code to mark deviations or intentional choices, directly tying to the domain of source code where such signals live in comments or pragmas. Practical questions like how to disable a Pylint warning or how linting tools control message emission show concrete, codified patterns that reside in the source code and are used to convey developer intent or to suppress non-issues, reinforcing the notion that the domain is the source code itself and its analysis tooling. Excerpts describing clang-tidy’s NOLINT constructs similarly operate within the source code domain, providing explicit syntax to bypass certain checks, which is a direct mechanism of signaling intent within the code. Together, these items build a view of source-code domain signaling—from suppressions and deliberate deviations to contextualized warnings—supporting the notion that intent in source code can be inferred from such metadata and tooling patterns. The remaining excerpt about message-control in Pylint and references to broader static analysis suppression practices further align with how source code carries signals about authorial intent and design-time decisions, contributing to methods and heuristics for disambiguating intent in code contexts.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### practical_disambiguation_techniques.5.example_tool_or_research
**Confidence:** high

Direct signals that indicate intentional deviation are the most informative for general heuristics. Excerpts describing a detach action in Figma, the ability to override component properties, and the existence of explicit ‘detach’ or 'override' signals show concrete metadata cues that a system can monitor to infer intent. Similarly, discussions of suppressing static analysis warnings reveal user-driven metadata signals about deliberate choices to bypass standard checks. Observations about “TODO” annotations and their use to signal intentional workarounds provide lightweight, scalable indicators that a system can detect across contexts. Contextual examples from design systems (how overrides are used) and from code analysis (why warnings are suppressed) illustrate pattern-based cues that can be aggregated into heuristics, such as: recurring rule-breaking within a section suggests deliberate intent; a single, isolated deviation might be a mistake. The musically oriented excerpts offer a domain-specific reminder that context and salience modulate perception of errors, underscoring the need for context-aware weighting in heuristics. Excerpts on grammar and language bias highlight how syntax or token choices can be intentional stylistic decisions, further supporting a broad approach where metadata, context signals, and pattern consistency are fused to estimate intent. Taken together, the most relevant information points to a practical taxonomy of signals (explicit overrides/detachments, suppression of warnings, TODO markers, recurrent pattern deviations) and to contextual rules (single vs. repeated deviations) that can drive robust, configurable intent-estimation workflows with confidence modifiers.

- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [(PDF) Self-Admitted Technical Debt and comments' polarity](https://www.researchgate.net/publication/362268914_Self-Admitted_Technical_Debt_and_comments'_polarity_an_empirical_study)
  > In this paper, we study the relationship between different types of SATD comments in source code and their polarity, to understand in which circumstances (and
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these

### practical_disambiguation_techniques.2.underlying_principle
**Confidence:** medium

The most directly relevant excerpt discusses an alignment approach for polyphonic music signals, which touches on robust analysis of musical data without relying on fragile alignment—this aligns with the goal of detecting errors or deviations without brittle preprocessing, a core aspect of using robust representations (such as transformative methods) for discrepancy detection. The second most relevant excerpt highlights note-level analysis focused on expressive characteristics like pitch, velocity, and microtiming, which are informative signals for detecting deviations or anomalies in a performance and can complement training data generation for error detection systems. The remaining excerpts address how listeners perceive mistakes in piano performances and the contextual factors that influence whether a deviation is salient, which informs how context and consistency signals can disambiguate intent. Taken together, these excerpts support ideas about robust feature representations, signal cues for error/discrepancy detection, and contextual heuristics that would feed into practical disambiguation techniques, metadata signals, and confidence modifiers for intent estimation, even though they do not explicitly mention paired audio transformers or synthetic error generation.

- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece

### practical_disambiguation_techniques.3.application_domain
**Confidence:** high

The most relevant content directly discusses biases and dialectical variation within NLP systems, which is central to disambiguating intent in natural language processing. The excerpt on NLP bias and African American English explicitly analyzes how dialectal expressions can be misclassified, illustrating the core challenge of distinguishing intentional stylistic choices from errors in NLP models. The next set of excerpts discuss bias arising from grammar and word choice in hate-speech classification contexts; these pieces show how linguistic features can influence model decisions and the importance of carefully interpreting grammar signals as potential stylistic intent versus error. Another excerpt covers grammar and word choice in bias broadly, reinforcing that linguistic signals (like dialect or style) can affect NLP outcomes and require nuanced interpretation. The remaining excerpt on grammatical error correction surveys the state of the art for correcting linguistic errors, providing background on challenges in identifying correct language usage, which informs broader NLP signal interpretation but is less focused on intent rather than error correction itself.

- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular

### natural_language_processing_applications.3.example
**Confidence:** high

The most directly relevant content discusses grammatical error correction as a field and how it handles linguistic challenges, which supports using GEC tools not to erase non-standard forms but to analyze them as data revealing underlying rules. A passage highlighting that grammatical errors can be interpreted in context to assess deliberate vs. unintentional deviations supports the proposed technique of collecting flagged ‘errors’ as data points to infer systematic rules of a non-standard variety. Excerpts addressing dialect-focused NLP concerns illustrate how models can misinterpret or bias non-standard forms, which is precisely the risk the proposed approach seeks to mitigate by treating deviations as informative signals rather than simply errors. Additional context from formality and bias studies demonstrates practical NLP methodologies for classifying and interpreting non-standard forms, including AAVE, which aligns with analyzing intentional vs. unintentional deviations through contextual cues and metadata signals. Collectively, these excerpts provide a foundation for practical disambiguation techniques: reframe flagged items as observational data, use contextual consistency checks, consider formality and bias signals, and leverage dialect-specific datasets to inform interpretation. The core idea is to treat error flags as measurable signals about linguistic variety rather than as strictly corrective targets, enabling confidence-modulated inferences about intent based on pattern reliability and context.

- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.

### natural_language_processing_applications.3.relevant_datasets
**Confidence:** medium

The finegrained field value points to a methodological approach that uses grammatical error correction (GEC) tools to document language variation, rather than relying on a single dataset. Supporting evidence from the excerpts includes discussions on distinguishing grammatical errors from dialectal features and the broader role of AAVE/ dialectal variation in NLP tasks. Specifically, the piece describing how to identify AAL features and distinguish them from grammatical errors directly aligns with using tools that assess language form as a means to capture variation, which is a core aspect of the requested methodological approach. Additional excerpts discuss grammatical error correction surveys and formality detection, which are relevant to the methodological toolkit for distinguishing intentional variation or stylistic choices from standard forms, thereby supporting the idea of using correction or detection tools to document linguistic variation rather than focusing solely on correctness. Other excerpts examine bias related to African American English and its impact on classification, further illustrating how dialectal variation can influence interpretation in NLP systems, which is consistent with a methodological framework that documents variation via tooling. Collectively, these excerpts map to a strategy that leverages GEC-like and related linguistic analysis tools to catalogue language variation, rather than relying on a single predefined dataset, and they illustrate the types of signals (grammatical features, formality, dialectal items) that such tools would leverage to estimate variation in real-world data.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.

### natural_language_processing_applications.3.detection_approach
**Confidence:** high

The most relevant content directly confronts the tension between dialectal or non-standard language features and the interpretation of those features as potential errors. One excerpt discusses distinguishing dialectal lexical items from grammatical errors, which supports the idea of repurposing error signals for linguistic analysis rather than treating them as merely incorrect. Another excerpt highlights NLP bias when models misclassify dialectal expressions as negative, underscoring the value of using outputs (including flagged errors and suggested corrections) as data to study grammar in non-standard varieties rather than as ground truth of correctness. A third excerpt explicitly describes assembling an AAVE/AAE-related dataset, which parallels constructing a corpus around a non-standard variety for linguistic analysis. Additional excerpts on grammatical error correction and formality detection provide broader methodological context for evaluating and leveraging linguistic features, though they are somewhat less central to the inversion idea. Overall, the selected content supports the core approach of treating detected errors and corrections as analytical signals rather than final judgments, while also offering relevant cautions about bias and consistency across varieties. The less directly aligned excerpts contribute methodological insight (e.g., formality detection) and broader concerns about bias, which are useful for designing robust analysis pipelines but are secondary to the central inversion concept.

- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Investigating African-American Vernacular English in ...](https://aclanthology.org/2020.emnlp-main.473.pdf)
  > by S Groenwold · 2020 · Cited by 45 — Our dataset consists of tweets identified as having at least 99.9% confidence of using AAVE lexical items by the TwitterAAE dataset (Blodgett et
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [Detecting Text Formality: A Study of Text Classification ...](https://aclanthology.org/2023.ranlp-1.31.pdf)
  > by D Dementieva · 2023 · Cited by 20 — In this paper, we aim at closing the gap by proposing a comprehensive computational study of various text categorization approaches. Namely, we argue that NLP
- [(PDF) Detecting Text Formality: A Study of ...](https://www.researchgate.net/publication/360062977_Detecting_Text_Formality_A_Study_of_Text_Classification_Approaches)
  > Apr 19, 2022 — This work proposes the first systematic study of formality detection methods based on current (and more classic) machine learning methods.

### explicit_metadata_signals.4.example
**Confidence:** medium

In a design system context, intentional deviations from a base component are often expressed through overrides: you can override a nearly endless number of properties in an instance, including color and other properties. This demonstrates a concrete mechanism by which designers signal intentional variation from a default component. The capability to override properties while preserving the original component state embodies the core concept of intentional deviation versus unintentional error. Additionally, the existence of a detach feature—where an instance is intentionally separated from its main component—serves as another explicit signal that a designer is choosing a deliberate divergence from the component system, which is highly relevant to distinguishing intent from error. Logs or analytics around detaches further reinforce how systems track intentional breakage of the component-ownership rule. Supporting material about tools that locate or reattach detached instances illustrates practical workflows for managing and interpreting these intentional deviations within a design system. Collectively, these excerpts provide concrete mechanisms (overrides and detaches) and workflows that a detection system can leverage as metadata signals to estimate intent, such as: (a) whether a change is made at the instance level (override) versus at the component definition, (b) whether an element has been detached from its original component, and (c) whether there are tooling signals (like detach analytics) suggesting deliberate design choices. Taken together, the strongest signals of intentional deviation come from explicit per-property overrides within a component instance, while detach events and related tooling provide additional context to disambiguate intent when deviations exist across multiple properties or across a section of the design. The examples also imply that a consistent pattern of override behavior (e.g., repeatedly changing the same property) can strengthen the inference of intentional design choice, whereas a one-off change may be treated as a potential error or exception.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### practical_disambiguation_techniques.2.application_domain
**Confidence:** high

The most relevant material directly addresses detecting mistakes and salience in piano performances, emphasizing that obvious mistakes are detectable by listeners, while less salient mistakes depend on contextual appropriateness and the performer's familiarity with the piece. This supports practical techniques for distinguishing intentional deviations from errors by leveraging context and perceived salience. Further, discussions on conspicuous errors detectable by trained listeners reinforce heuristics based on audience expectation and piece familiarity. The material describing expressive features at the note level (pitch, velocity, microtiming) provides concrete metadata signals for identifying intentional expressiveness versus errors, which is crucial for disambiguation in performance analysis. Finally, discussions on alignment methods and the role of expressive characteristics in performance analysis add a technical layer, illustrating how precise temporal alignment and expressive cues can aid in detecting deviations from expected performance patterns. Taken together, these excerpts outline heuristics (contextual salience, consistency, and listener/performance cues) and metadata signals (contextual appropriateness, familiarity, microtiming, velocity) that a detection system can use to estimate intent in music performance contexts.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,

### explicit_metadata_signals.4.signal
**Confidence:** medium

The concept of Design Token/Variable Usage in design systems is closely connected to how designers intentionally deviate from a default token set to convey specific visual choices. In the provided material, there is direct discussion of component overrides in Figma, which are a common mechanism to apply intentional, token-based variations to an instance. Specifically, the explanation that you can override a wide range of properties in a component instance demonstrates that design teams use overrides to express intentional deviations from the base tokenized design. This aligns with the idea of signaling intentional token usage or variability within a system. The other excerpt explicitly notes that overrides preserve changes to non-component properties of an instance and that Figma records these changes, reinforcing that such overrides are deliberate and tracked within the design system for consistency and intent. While several excerpts discuss detaching components (which can indicate a break from token linkage or intended deviation), this is less directly about token usage and more about workflow and integrity of token connections; thus it provides context but weaker direct support for the specific field value. Together, the most relevant content supports that intentional token usage or overrides are a deliberate aspect of design systems, whereas detachment signals a different kind of intent breakdown or workflow issue.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,

### explicit_metadata_signals.4.domain
**Confidence:** high

Design systems often rely on controlled tokens and component inheritance to maintain consistency; explicit overrides and detaches represent deliberate deviations from the baseline system. Excerpts highlighting overrides show that designers can push beyond the default component properties, which aligns with intentional deviation signals within a design system context. Detachment of an instance from its main component demonstrates a formal mechanism to break ties with the original design token or component rule, signaling a deliberate divergence that a system would need to monitor as a potential intent indicator. The help articles illustrating how to detach or override, and the existence of a detach mechanism, provide concrete metadata signals that a detection system can use to flag intentional deviation versus mistakes. A plugin for finding detached instances reinforces the need for governance workflows around deviations. While some excerpts emphasize the mechanics of overrides and detachment, others touch on the governance or analytics around these actions, aiding the construction of heuristics for intent estimation (e.g., a high frequency of consistent overrides or detach actions across a design section might indicate deliberate deviation rather than random errors).

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### practical_disambiguation_techniques.3.technique_name
**Confidence:** medium

The field value corresponds to a dual-path approach that jointly handles grammar/style identification and error correction. Excerpts that discuss how grammar and word choice influence bias toward African American English (AAE) in hate speech classification illustrate how stylistic features can be misinterpreted and how dialectal choices may be mistaken for toxicity or error, highlighting the need for a separate pathway to identify intentional stylistic choices versus unintentional mistakes. Excerpts addressing NLP bias and AAE further demonstrate that mismatches between dialectal usage and standard expectations can drive misclassification, underscoring the importance of dialect-aware disambiguation. Other excerpts that survey grammatical error correction and broader grammar-bias relationships provide useful background on linguistic challenges and how models handle grammaticality and stylistic variation, supporting the feasibility and design of a dual-path system separating error correction from style/dialect identification. Collectively, these sources support a practical approach where one path analyzes grammatical correctness and standard conformity, while a second path analyzes stylistic signals and dialect features to determine whether deviations are intentional, with additional metadata signals and contextual consistency cues used to infer intent with higher confidence when consistent across a region or section.

- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular

### practical_disambiguation_techniques.2.technique_name
**Confidence:** medium

The target field, Alignment-Free Paired Audio Analysis, implies a need for techniques that detect deviations or intentional alterations in audio content without relying on exact alignment to a reference. The most directly relevant excerpt describes a fast and accurate alignment method for polyphonic symbolic music signals, which helps frame the landscape of alignment-based approaches and motivates consideration of when alignment-free methods might be advantageous (e.g., in noisy or uncertain alignment scenarios). The second most relevant excerpt discusses how listeners perceive obvious mistakes in piano performances based on surrounding context, highlighting that some deviations are salient while others are subtle; this informs the kind of contextual and pattern-based signals an alignment-free approach could exploit to estimate intent. The third and fourth excerpts elaborate on the salience of performance errors and how context and familiarity affect error detection, which contributes to understanding what signals could distinguish intent from error in music. The fifth excerpt focuses on expressive, note-level characteristics, reinforcing that fine-grained feature analysis can reveal expressive deviations, a domain where alignment-free comparisons could be beneficial. Together, these excerpts suggest that alignment-free paired analysis can leverage contextual salience, consistent deviation patterns across sections, and expressive feature signals to estimate intent without explicit annotations, while also acknowledging the role of alignment-aware methods as a grounding reference for what alignment-free approaches must compensate for or bypass.

- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe

### design_systems_and_style_guides.2.system_or_tool
**Confidence:** high

The most directly relevant materials describe Material Design itself and how it is implemented and customized within design systems. A source focused on Material Design in Jetpack Compose provides concrete guidance on applying the system (the theming, color schemes, typography, and shapes) which is central to understanding how a design system like Material Design is instantiated in tools and code, and how deviations may be interpreted within that framework. Documentation on Material Design 3 and its design tokens explicitly ties tokens to colors, typography, and measurements, underscoring how tokenization supports consistency and signals deliberate design decisions when overrides occur. Typography guidelines under Material Design 3 further illustrate how rule-based structure is maintained, enabling detection systems to differentiate stylistic choices from errors. Additional Material Design customization guidance shows how existing brand parameters can be integrated or started from scratch, which informs how intentional deviations can be systematized rather than ad-hoc. Contextual design-tool examples discussing component overrides and how overrides are recorded in Figma (overrides to color, alignment, strokes) offer practical signals for intent detection within a design workflow, showing how tools capture deliberate deviations from base tokens or components. References to integrating Material Design parameters with broader product design reinforce the concept that deviations may be intentional when aligned with tokens, themes, or brand guidance, and not merely errors. Finally, ancillary discussions of library analytics in design tooling provide metadata signals about usage and adoption patterns that can inform intent estimation across a broader design system. Taken together, these excerpts support a framework where intent detection uses (a) explicit design-token/Material Design3 references as the baseline, (b) explicit customization and token integration signals as evidence of deliberate deviation, (c) typography and color system consistency as checks against unintentional mistakes, (d) tool-level override behaviors and how changes are recorded as features signaling intentional changes, and (e) usage analytics as contextual metadata. All of these elements combine to form practical disambiguation techniques and metadata signals for intent estimation within a Material Design design system context.

- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Typography – Material Design 3](https://m3.material.io/styles/typography/type-scale-tokens)
  > Learn about Material Design typography. This guide covers everything from font styles and hierarchy to line height to create user-friendly text.
- [Advanced color customizations](https://m3.material.io/styles/color/advanced/define-new-colors)
  > Formerly known as custom colors. You can define additional colors in your scheme that stay static even when other colors dynamically change.
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### explicit_metadata_signals.4.interpretation
**Confidence:** medium

The field value describes an intentional deviation that aligns with a system's structured framework, signaling a deliberate, thematically connected choice rather than an arbitrary alteration. Information about design-system signals that explicitly capture intent—such as the ability to override component properties and intentionally detach an instance to diverge from the main component—directly supports this notion. For example, the concept that you can detach any instance from its main component to make changes not supported by overrides demonstrates an explicit, purposeful deviation within a defined framework, rather than a random error. Similarly, references noting that overrides can be applied to numerous properties and that such changes are recorded or preserved indicate a designed mechanism for intentional modification within the system, rather than an accidental or erroneous change. The discussion of analytics around detaches—where a detach event is logged as a signal of breaking the connection to the main component—further reinforces the idea that such deviations can be meaningful within the system’s governance and metadata signals. Collectively, these excerpts illustrate that intentional deviations can be implemented within structured controls (overrides and detach/reattach workflows) and that intent can be inferred from the presence and nature of these signals (overrides, detach events, and subsequent reattachment workflows). The plugin-based workflow to fix detached instances also provides a closure mechanism that indicates a recognized deviation was intentional enough to require remediation, highlighting a lifecycle where intent is signaled, acted upon, and reconciled within a system. In sum, the strongest support comes from explicit mentions of intentional detachment as a deliberate deviation scenario, complemented by notes on overrides as a controlled, trackable form of intentional modification, with reattachment workflows offering a completion signal for the deviation within the system’s framework.

- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### explicit_metadata_signals.1.interpretation
**Confidence:** high

The target field value corresponds to a developer explicitly acknowledging a sub-optimal but deliberate implementation choice as a temporary solution. A direct instance of this is described as a signal of intentional deviation, which aligns with excerpts that discuss intentional marks or overrides in tooling and workflows. The strongest support comes from language that explicitly notes intentional deviation and signaling it, such as references to deliberate deviations being signaled by a mechanism or comment. The excerpt describing how TODOs are used and the associated signaling of intentional deviation provides a concrete alignment to the idea of an acknowledged, temporary deliberate choice. Other excerpts discuss mechanisms that allow bypassing or suppressing checks (e.g., NOLINT, lint suppression, or disabling warnings) which are classic signals of intentional but constrained deviations, often used as pragmatic signals that a rule is being intentionally skipped rather than followed. Finally, references to disabling checks via pragma controls illustrate that there are formalized signals that a deviation is intentional, temporary, or context-dependent. Taken together, these excerpts collectively support the notion that developers may acknowledge intentional sub-optimal choices and use explicit signals (TODOs, NOLINT, disable pragmas) to reflect that intent, including temporary remedies and deliberate deviations from guidelines.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.

### explicit_metadata_signals.1.example
**Confidence:** high

The most directly relevant excerpt discusses the use of a TODO as an intentional deviation signal in code, which aligns with explicit metadata markers such as TODO, FIXME, HACK, or WORKAROUND. This demonstrates how developers signal deliberate deviation and how such markers can be interpreted as intent cues rather than mistakes. Other excerpts describe mechanisms to suppress or override lint or static analysis checks (NOLINT, NOLINTNEXTLINE, pylint disable controls, and similar disabling pragmas). These signals show deliberate bypassing or signaling of intent to diverge from rules, which complements the TODO-style markers as metadata indicating intent. Taken together, the presence of explicit markers (TODO) and explicit suppression/override controls provides a coherent pattern for distinguishing intentional deviation from errors: a single anomalous element might be a mistake, but consistent use of explicit markers or suppression across a section suggests a deliberate design choice. The cited examples illustrate practical disambiguation techniques (e.g., using explicit markers to denote intentional deviations, or using suppression comments to indicate accepted but non-standard behavior) and reflect common metadata signals that detection systems can leverage. The coverage of multiple domains (general code comments, lint tooling for C/C++/JavaScript, and Python’s pylint) demonstrates a transferable approach for intent estimation across contexts. Finally, the inclusion of discussions about how such signals are disabled or controlled by tooling reinforces the importance of context and consistency as disambiguation heuristics, which can influence confidence modifiers in intent estimation.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.

### design_systems_and_style_guides.2.analytics_and_governance
**Confidence:** high

The governance concept is grounded in using a centralized design token system rather than scattered hardcoded values. An excerpt notes that tokens represent key style values (colors, fonts, measurements) and should be used instead of hardcoded values, which directly supports governance by establishing tokens as the authoritative source of truth. The idea that intentional deviation can be conveyed through component overrides aligns with governance in practice: overrides allow intentional customization while preserving the ability to audit and review changes, thereby signaling deliberate modifications rather than accidental divergence. Additionally, the notion that a coherent update to a bundle of related tokens (such as a theme's color, typography, or spacing) constitutes a high-confidence signal of intentionality strengthens the disambiguation framework: it provides a concrete heuristic for identifying deliberate design shifts, in contrast to a solitary hardcoded hex value which would be suspicious and merit review. Collectively, these points map onto the fine-grained field value by outlining the governance baseline (token usage), the signals of intentional design updates (coherent token bundles), and the flagging heuristic for potential issues (isolated hardcoded values).

- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes

### explicit_metadata_signals.5.signal
**Confidence:** high

The field value refers to the action of detaching a component instance from its main component. The most directly relevant content states the action itself: one excerpt explains that you can detach an instance from its main component, which directly maps to the notion of component instance detachment. Another excerpt discusses a plugin designed to find and reattach detached instances, which provides context on detachment events and remediation, reinforcing the concept of detachment as a detectable signal. A further excerpt notes that Figma logs a detach event when the Detach instance setting is used, showing how detachment is captured as an event by the system, which is essential for intent-aware signaling. Additional content about editing instances with component properties and overrides relates to how changes are managed when detachment or deviations occur, offering supporting context on how deviations from the master component can be handled and tracked, though it’s somewhat less directly about detachment itself. Finally, content on component overrides highlights the broader ecosystem of instance modifications, which helps explain how detachment interacts with overrides as part of intentional deviation signals, even though it is not explicitly a detachment action. Collectively, these excerpts build a picture of detachment as a distinct, detectable event within the component system, with explicit references to detaching, detecting, and reattaching, supporting the field value as a concrete signal in the data stream.

- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes

### explicit_metadata_signals.1.signal
**Confidence:** medium

Self-Admitted Technical Debt (SATD) is a deliberate annotation that communicates a known debt or deviation from ideal implementation. The most direct support comes from discussions of explicit signals that indicate intentional deviation: using TODO markers signals planned or acknowledged work gaps and intentional deviation from a fully complete state. Mechanisms to bypass or suppress rules, such as NOLINT and NOLINTNEXTLINE, demonstrate concrete metadata controls that encode a designer’s intent to diverge from standard checks. Similar discussions about disabling or controlling lints and warnings via pragma controls provide explicit metadata signals that communicators use to indicate intentional departures from strict rule adherence. These excerpts collectively illustrate practical techniques for disambiguating intent through metadata signals that detection systems can analogize to SATD tagging. Excerpt about disabling pylint warnings and the broader message-control guidance offers additional confirmation that rule overrides can be intentional and signaled, reinforcing the applicability to SATD-like tagging. While the first excerpt foregrounds an intentional deviation in a general context (TODO for everything), the surrounding entries expand the pattern with concrete tooling signals. Taken together, the content supports a technique suite for recognizing SATD-like intent via explicit markers, suppression pragmas, and controlled bypasses as metadata signals to improve intent estimation.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.

### design_systems_and_style_guides.2.signal_of_intent
**Confidence:** high

The strongest support comes from statements that explicitly frame design tokens as the preferred mechanism for theming and customization. A passage that highlights tokens as the recommended approach and describes using named tokens to control style values aligns directly with the idea that deliberate design intent is conveyed by token-based customization rather than ad hoc hardcoding. Similarly, excerpts that discuss overrides in design tools (such as Figma) show that overriding defaults is an intentional, supported pathway to customize themes within a design system. When a default is overridden by choosing a different token, this is presented as a structured, deliberate choice rather than a mistake, which matches the field value’s assertion about signaling deliberate design intent. Additional excerpts from Material Design documentation and related customization guides further reinforce that these token-based strategies are integral to the system’s philosophy and implementation, suggesting that consistency in applying tokens across components signals deliberate intent rather than incidental variation. The heuristics implied include: using semantic, named tokens to control theming; treating overrides as sanctioned design-system mechanisms with preserved provenance; and looking for cross-component consistency of token usage as evidence of intentional deviation rather than error. Taken together, these excerpts collectively support the claim that token-based customization and explicit overrides are the sanctioned signals of deliberate design choices within Material Design and related design systems.

- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,
- [Typography – Material Design 3](https://m3.material.io/styles/typography/type-scale-tokens)
  > Learn about Material Design typography. This guide covers everything from font styles and hierarchy to line height to create user-friendly text.
- [Advanced color customizations](https://m3.material.io/styles/color/advanced/define-new-colors)
  > Formerly known as custom colors. You can define additional colors in your scheme that stay static even when other colors dynamically change.
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
  > The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### implicit_pattern_based_signals.1.signal_type
**Confidence:** high

Contextual fit as a heuristic for intent involves whether a deviation aligns with surrounding context or established patterns. In music, researchers show that listeners detect or fail to detect mistakes based on contextual appropriateness and familiarity with the piece, implying that a deviation is more plausible as intentional when it better fits the surrounding musical context. This supports using contextual fit as a core signal for intent in evaluation and detection systems. Design and token-based systems illustrate that intentional deviations can be signaled through overrides or detachments from a baseline component behavior, i.e., deliberate token overrides or detaching an instance from a component to implement a signal of intentional deviation. These examples demonstrate that when a system provides a mechanism to override or detach, it creates an explicit cue that the deviation is intentional rather than erroneous. Related notes on intentional deviation markers include TODO markers in code comments and warnings suppressions, which are practical signals that a deviation or non-conformance is deliberate. In natural language and grammar contexts, evidence shows that models and tooling distinguish stylistic choices or intentional stylistic deviations from mere errors, reinforcing the value of contextual cues and metadata to disambiguate intent. Additional literature on bugs and deviant behavior frames deviations as purposeful patterns when they diverge from common sequences, which provides methodological parallels for detecting intent through pattern-based signals and consistency across sections. Overall, the strongest support comes from sources that directly tie contextual fit or explicit deviation signals (overrides, detachments, TODOs) to intent interpretation, with secondary support from broader discussions of deviations in language and code where patterns, context, and consistency guide intent estimation. Therefore, the most relevant evidence centers on contextual appropriateness and explicit signaling mechanisms, followed by discussions of how consistency across a section or repeated deviation strengthens the case for intentionality, and finally general discussions of deviations as intentional patterns vs errors. 

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [What can NLP do for linguistics? Towards using ...](https://www.degruyterbrill.com/document/doi/10.1515/lingvan-2024-0001/html?srsltid=AfmBOorJMcqdQw9alDp6wfoWIcLANVvE6ZXvcC606tP_8XBQb8pzsw8f)
  > by L Nguyen · 2024 · Cited by 4 — This paper proposes a novel use of grammatical error detection/correction (GED/GEC) tools to document non-standard English varieties.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be

### implicit_pattern_based_signals.1.heuristic
**Confidence:** high

The most persuasive support comes from evidence that context and larger structure guide whether a deviation is intentional. The piano research shows that listeners’ perception of mistakes depends on context and familiarity, and a method that outputs the probability of a conspicuous error highlights how alignment with surrounding structure affects noticeability. This directly supports the idea that deviations aligned with a structural context (e.g., harmony or performance conventions) are more likely intentional. Design-system related excerpts demonstrate that overrides or detachments from a baseline component can signal deliberate deviation from a standard token or component behavior, illustrating how alignment with a broader design system can mark intentional departures. Excerpts about suppressed static analysis warnings reveal that developers sometimes suppress signals to convey an intentional choice or to bypass noisy warnings, which is another form of context-driven deviation signaling. The TODO culture in code comments likewise hints at deliberate, signal-based deviations in workflows. Grammar- and NLP-focused excerpts discuss detecting stylistic choices versus errors, indicating that intentional variation can be recognized when it coheres with a larger linguistic or stylistic system. Design tokens, component properties, and NLP-related works collectively provide concrete signals (tokens, properties, grammar patterns) that chain local deviations to global structure. In sum, the supporting evidence demonstrates practical heuristics: measure alignment with established patterns or tokens, monitor consistency of deviations within a section, and use metadata signals (token names, design system constraints, lint-suppression justifications, stylistic choices) to infer intent rather than classifying deviations as errors alone.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [What can NLP do for linguistics? Towards using ...](https://www.degruyterbrill.com/document/doi/10.1515/lingvan-2024-0001/html?srsltid=AfmBOorJMcqdQw9alDp6wfoWIcLANVvE6ZXvcC606tP_8XBQb8pzsw8f)
  > by L Nguyen · 2024 · Cited by 4 — This paper proposes a novel use of grammatical error detection/correction (GED/GEC) tools to document non-standard English varieties.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .

### explicit_metadata_signals.1.domain
**Confidence:** medium

In a source code and version-control domain, practitioners rely on explicit signals that indicate intentional deviation or override of rules. Excerpts describing lint suppression mechanisms (such as ignoring lint checks with directives) provide concrete metadata signals that developers use to convey deliberate deviations from standard checks. The guidance on disabling or controlling messages in Pylint also demonstrates how tooling can be manipulated to reflect intentional stylistic choices, which is highly relevant to distinguishing deliberate deviations from mere errors. Documents about using TODO markers for everything illustrate how developers may deliberately inject placeholders or signals that a deviation from routine workflow or quality checks is intended, which ties to the notion of signaling intent through metadata. Together, these sources show practical techniques for embedding intent signals in code through suppression directives, comments, or configuration controls, which aligns with the notion of a code/version-control domain that tracks and interprets such signals. The mention of how to disable a lint warning, and how cland tidy can ignore checks, further reinforces the use of domain-specific metadata signals to indicate intentional deviations. The remaining excerpt discusses general control of message suppression in Pylint, which, while relevant to intent signaling, may be slightly less specific than the direct suppression mechanisms described in the other sources. Overall, the collection supports the idea that in a source-code and version-control context, explicit suppression directives and configurable controls are central to documenting and interpreting intentional deviations versus unintentional errors.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".

### practical_disambiguation_techniques.5.application_domain
**Confidence:** medium

The finegrained field value seeks cross-domain strategies for disambiguating intentional deviation from unintentional error across code, NLP, and design. Excerpts that discuss design-system signals such as overrides and detached instances show concrete, domain-specific mechanisms where intentional deviation is signaled through deliberate changes to tokens, properties, or component connections. For example, overrides in a component system are described as a recognized mechanism to diverge from a component’s default behavior, which is directly relevant to identifying intentional variation in design. Similarly, the ability to detach an instance from a master component creates a clear signal that a deviation from the canonical linkage is intentional, which parallels how other domains might mark intentional deviation through explicit state changes rather than incidental errors. Studies on suppressed static analysis warnings illuminate why a user might intentionally suppress or annotate warnings, which provides an evidence-based pattern for recognizing deliberate deviations rather than benign ones. Together, these design-domain signals establish a pattern: explicit, auditable indicators (overrides, detachments, suppressions) function as metadata signals that intentfully deviates from standard rules, which can be adapted to other domains that rely on token-level or rule-level signals. On the coding side, findings about how suppressions relate to deliberate decisions help frame heuristics for distinguishing intentional unconventional patterns from bugs, reinforcing the idea that metadata and historical usage signals improve intent estimation. In the music domain, discussions about how some mistakes stand out or blend into context, and how salience depends on contextual appropriateness, offer cross-domain insight that intent assessment benefits from context and audience familiarity, not just surface rule-breaking. Extending to NLP, discussions of grammatical errors versus stylistic choices highlight the need to consider user intent and audience expectations when evaluating deviations. Finally, design-token and design-system literature demonstrates how token-level signaling (for example, changes in color, typography, or spacing) can codify intentional deviations so that downstream systems can correctly interpret them as deliberate rather than accidental. Overall, a practical disambiguation framework across domains would combine explicit signals (overrides, detachments, suppressions, token changes), contextual consistency (repeated same-rule violations across a region suggesting intent), and domain-aware metadata (audience, context, and usage history) to estimate intent with adjustable confidence. Based on the coverage in these excerpts, the strongest support centers on explicit deviation signals in design tools, reinforced by robust cross-domain analogies from code and music research, with NLP and design-token literature offering contextual mechanisms to refine interpretation. The resulting approach would include heuristics such as: detecting whether a deviation is accompanied by an explicit signal (override, detach, suppression), analyzing whether the same rule is repeatedly violated in a consistent region, and incorporating domain-specific metadata (token changes, component relationships, historical usage) to modulate confidence.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,

### explicit_metadata_signals.5.interpretation
**Confidence:** high

The most relevant excerpts directly describe breaking the connection between an instance and its main component as a mechanism to make changes that are not governed by the standard component, which aligns with interpreting such a detachment as a deliberate deviation rather than a mere error. Specifically, one excerpt states that detaching an instance is useful when you want to make changes that aren’t supported by overrides, which frames detachment as a purposeful action to enable non-standard modifications. Another excerpt notes that a detach event is logged whenever the Detach instance setting is used to break the connection between an instance and its main component, providing a concrete metadata signal (the detach action itself) that can be used to infer intent. A third excerpt discusses that overrides allow changes to propagate while still acknowledging that they exist as deliberate modifications, reinforcing the idea that non-default changes via overrides or detachments are intentional. Additional context about overrides being a feature that enables substantial customization underscores that deliberately breaking connections or relying on overrides can represent an intentional deviation pattern, rather than incidental mistakes. A related excerpt on a plugin to “Fix Detached Instances” indicates that detached instances are a known, noticeable state that requires attention, further supporting the interpretation that detachment is a salient indicator of deliberate deviation in a componentized design system. Finally, a broader description of component overrides and how they can modify various properties provides background for how intentional deviations are often signaled and detected, contextualizing detachment within a spectrum of explicit deviation signals rather than as isolated events.

- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### explicit_metadata_signals.5.example
**Confidence:** medium

The most relevant excerpt directly states that the system logs a detach action as soon as someone uses the Detach instance setting to sever the connection between the instance and its main component, which aligns with the idea that this action is captured in analytics and could serve as a signal for intentional deviation when observed in telemetry. A closely related excerpt describes detaching an instance from the component, which defines the concrete user action that would appear in analytics. Additional excerpts explain that overrides preserve changes and that components can be overridden, providing context that such changes can be intentional and tracked, thereby supporting interpretation of analytics signals as intentional versus unintentional. Another excerpt notes that there are mechanisms to detect detached instances via a plugin, reinforcing that detachment status is a tracked condition within the ecosystem. Together, these excerpts connect the act of detaching with telemetry and persistence, forming a basis for inferring intent from logged detach events and related overrides.

- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### implicit_pattern_based_signals.1.description
**Confidence:** high

The most directly relevant material discusses treating deviations as intentional when they align with a broader structural or semantic context rather than simply being errors. The deviance-focused work on bugs as deviant behavior presents a formal lens: deviations may be intentional or contextualized by surrounding patterns, and such signals can be inferred from the data itself without explicit annotation. This directly supports the idea that a local rule violation can be intentional if it serves a higher-level goal within the larger system. In design and architecture, discussions of component overrides and detaching instances illustrate concrete mechanisms where local changes are signals of intentional deviation that are sanctioned or contextually meaningful within a design system. The psychology of perception of mistakes in music shows that listeners’ ability to detect mistakes depends on contextual appropriateness and familiarity, and portions describe methods to evaluate whether a deviation is conspicuous or contextually integrated, which parallels the need to assess context-driven intent. In code analysis, suppressed static analysis warnings exemplify metadata signals that developers use to indicate intentional divergence from strict rules, which is a practical signal about intent. In NLP and grammar, research on intentional stylistic choices versus grammatical errors emphasizes distinguishing intentional deviation from mistakes, a core part of estimating intent from text. Together, these excerpts support a framework where intent estimation hinges on higher-level alignment, contextual consistency, and explicit or implicit signals (overrides, warnings, detachment, stylistic choices) that modify the meaning of a local deviation. They also illustrate heuristics such as repeated pattern of deviations, consistency across sections, and metadata indicators to infer intent. The overarching idea is to combine contextual coherence signals with explicit signals (overrides, suppressions, detachment actions, TODO markers) to disambiguate intent without explicit annotation.

- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [What can NLP do for linguistics? Towards using ...](https://www.degruyterbrill.com/document/doi/10.1515/lingvan-2024-0001/html?srsltid=AfmBOorJMcqdQw9alDp6wfoWIcLANVvE6ZXvcC606tP_8XBQb8pzsw8f)
  > by L Nguyen · 2024 · Cited by 4 — This paper proposes a novel use of grammatical error detection/correction (GED/GEC) tools to document non-standard English varieties.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .

### design_systems_and_style_guides.2.mechanism
**Confidence:** high

The most directly relevant information comes from excerpts that describe design tokens and customization workflows. A token-based approach defines colors, fonts, and measurements as named values to be used consistently across an app, rather than relying on hardcoded values. This supports intentional customization by enabling deliberate, centralized changes that reflect brand parameters and design system constraints. Material Design 3 customization guidance emphasizes a design system framework for tailoring brand parameters within a cohesive theme, which directly aligns with token-based customization as a mechanism for intentional deviation within set guidelines. Further, guidance on integrating existing brand parameters with a design system demonstrates how tokens anchor intentional customization across the product, ensuring consistency while allowing deliberate variation where appropriate. Additional color customization resources note that new, static color definitions can be added to a scheme, illustrating a controlled form of token customization that remains stable against dynamic changes, which is a tool for intentional design decisions. The Figma-related excerpts on component overrides and the ability to persist overrides in instances illustrate practical mechanisms to signal intentional deviation at the component level, showing how override patterns can be used as metadata signals for deliberate design choices. These excerpts collectively tie token customization, theme-based integration, and override semantics to the broader problem of distinguishing intentional deviation from incidental changes, and they provide concrete practices (centralized tokens, brand-aligned customization, static color definitions, and deliberate overrides) that can be used as heuristics in detection systems. In combination, they describe a suite of techniques, metadata signals, and pattern-based approaches that enable intent estimation without explicit annotation, along with practical means to modify confidence based on the consistency and scope of the deviations.

- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Advanced color customizations](https://m3.material.io/styles/color/advanced/define-new-colors)
  > Formerly known as custom colors. You can define additional colors in your scheme that stay static even when other colors dynamically change.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### design_systems_and_style_guides.1.mechanism
**Confidence:** high

The most relevant content directly discusses the concept of overrides as a deliberate mechanism to diverge from a canonical component. An excerpt describing that in Figma you can override many properties of an instance (including color and type alignment) directly supports the idea that overrides act as deliberate signals of intent to deviate from a base component. Another excerpt notes that you can still make overrides to non-component properties of a single instance and that changes to an instance are preserved by the system, which provides practical context for how these overrides are managed and interpreted. A separate excerpt about detaching an instance from its component shows a related mechanism where breaking the connection between an instance and the main component is used for intentional modification, which aligns with the theme of intentional deviation signals. Additional excerpts from developer documentation on ComponentProperties and ComponentPropertiesMixin-componentpropertydefinitions describe the underlying model and defaults for properties and their variants, offering structural grounding for how overrides relate to component design tokens and defaults, further supporting the understanding of the mechanism by which intentional deviations are signaled. Overall, these excerpts collectively illustrate how design systems use explicit property/variable overrides and detachments as deliberate deviations from a baseline, which is the core of the requested mechanism for intent estimation.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .
- [componentPropertyDefinitions | Developer Docs](https://developers.figma.com/docs/plugins/api/properties/ComponentPropertiesMixin-componentpropertydefinitions/)
  > All component properties and their default values that exist on this component set. 'VARIANT' properties will also have a list of all variant options.

### design_systems_and_style_guides.1.signal_of_intent
**Confidence:** high

The strongest support comes from descriptions of override mechanisms and component properties, which illustrate how designers intentionally modify properties, alignment, and related attributes within the design system to achieve specific visual outcomes. The fact that these overrides can be preserved and recorded indicates a deliberate, sanctioned deviation from a default component, rather than an error. Relatedly, design tokens provide a formal mechanism to define and reuse values (colors, typography, spacing), enabling intentional variation while remaining within a controlled design language. When a system documents tokens and their usage, it reinforces that changes governed by tokens are purposeful and auditable decisions rather than accidental mistakes. Detachment of an instance from its main component demonstrates another explicit channel for intentional deviation, where a designer or system can signal that an instance should diverge from the canonical component for specific needs, with tooling and analytics available to manage and reattach if needed. Additional excerpts describe tooling and metadata around overrides and detachments, underscoring that these actions are part of an intentional design workflow, not errors. Taken together, these excerpts support the notion that sanctioned deviations—via component properties, token-based variations, and controlled detachment—are deliberate signals of intent within established design system rules. The presence of mechanisms to track overrides, the use of tokens to manage consistent variation, and explicit detach/reattach workflows all serve as practical heuristics and metadata signals for intent estimation, alongside more general consistency checks across sections to distinguish between one-off mistakes and deliberate patterns of deviation across a section.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .
- [Advanced color customizations](https://m3.material.io/styles/color/advanced/define-new-colors)
  > Formerly known as custom colors. You can define additional colors in your scheme that stay static even when other colors dynamically change.
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Customizing Material – Material Design 3](https://m3.material.io/foundations/customization)
  > The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's
  > Your existing brand parameters can be integrated with Material Design for consistent application across your product · You can also start from scratch with
- [Typography – Material Design 3](https://m3.material.io/styles/typography/type-scale-tokens)
  > Learn about Material Design typography. This guide covers everything from font styles and hierarchy to line height to create user-friendly text.
- [componentPropertyDefinitions | Developer Docs](https://developers.figma.com/docs/plugins/api/properties/ComponentPropertiesMixin-componentpropertydefinitions/)
  > All component properties and their default values that exist on this component set. 'VARIANT' properties will also have a list of all variant options.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Material Design 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
  > This document explores how to implement Material Design 3 (M3) in Jetpack Compose applications, covering theming, color schemes, typography, shapes,

### implicit_pattern_based_signals.3.measurement_method
**Confidence:** medium

The finegrained field value seeks evidence of pattern-based signals that indicate intentional deviation, specifically clustering of related changes within a single update, session, or design file. Excerpts that discuss intentional deviations being signaled or inferred through aggregated actions are most relevant. For example, a TODO pattern is described as signaling an intentional deviation and tools can automatically aggregate and review code comments that start with TODO, which aligns with the idea of using pattern-based signals to infer intent. Similarly, discussions of pragma controls and the ability to disable or enable certain warnings or rules provide concrete mechanisms by which systems embed signals of intentional deviation versus unintentional errors, illustrating explicit metadata signals and control patterns that distinguish intent. The treatment of component design systems where overrides and token changes are made together (e.g., color, typography, spacing) demonstrates how clustering of related updates can signal a deliberate design decision rather than isolated mistakes. Related design-token and component-property discussions illustrate how intentional design updates are often implemented as cohesive packages (token updates, property changes) rather than ad hoc single changes, supporting the notion of clustering as evidence of intent. Finally, the excerpts on design tokens, design overrides, and detached instances offer concrete examples of how design systems encode, detect, and recover intentional deviations, reinforcing the value of pattern-based cues and metadata in intent estimation. Taken together, these excerpts collectively demonstrate practical disambiguation techniques and metadata signals (TODO Aggregation, pragma controls, grouped design updates) that can be used to estimate intent, along with examples of the kinds of pattern signals to monitor (grouped changes, suppression/override signals, and token-level clustering).

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### design_systems_and_style_guides.1.analytics_and_governance
**Confidence:** high

The most directly relevant excerpt notes that library analytics can be used to track usage of libraries, components, styles, and variables, which aligns with the idea of analytics observing how these elements are consumed and modified within a design system. The excerpts about overrides describe how changes to instances are recorded and preserved, which provides a mechanism for detecting when properties are frequently altered, thereby offering signals about which variants or base components might need adjustments. Together, these excerpts support the notion that analyzing override frequencies and library usage yields actionable insights for design decisions, such as identifying when to introduce new variants or adjust base components. Additional context from the detaching analytics excerpt demonstrates how different signals (such as detaching an instance) can be tracked as part of an analytics framework, illustrating broader methods for capturing signals about intentional deviation versus standard usage. Taken collectively, these excerpts support a workflow where library analytics monitor property overrides and component usage to infer intents behind deviations and to drive evolution of design systems, with the potential to combine this with metadata signals to estimate intent and confidence across components, styles, and variables.

- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.

### explicit_metadata_signals.5.domain
**Confidence:** high

The most relevant passages directly discuss how a design system context handles intentional deviations through overrides and component properties. Specifically, the description of component overrides in a design tool notes that you can override a broad set of properties such as color and type alignment, which is central to how a design system accommodates intentional variation while maintaining overall structure. This directly supports the notion that intentional deviation within a design system is managed through controlled overrides rather than ad hoc changes. Additionally, guidance that edits to instances with component properties are tracked and preserved aligns with design-system practices of maintaining intentional changes within a governed system, ensuring traceability and consistency across usage. The detachment-related passages expand on how breaking the link between an instance and its main component signals a deliberate divergence from the canonical design system, which can be a diagnostic cue in intent estimation: detaching can indicate a deliberate exception to system rules rather than a mere error. The plugin-focused item reinforces tooling support to locate and reattach detached instances, illustrating operational workflows within design systems for managing intentional deviations and restoring system integrity when appropriate. Finally, the analytics note about detaching accuracy underscores that such signals are observable and measurable within system usage data, which can inform intent estimation heuristics. Collectively, these excerpts demonstrate that design systems rely on explicit, trackable signals (overrides, detachment, and tooling outcomes) to represent intentional deviation and to distinguish it from unintentional errors, which is directly relevant to disambiguating intent in the given field value context.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.

### design_systems_and_style_guides.1.system_or_tool
**Confidence:** medium

The finegrained field value seeks the specific design tool referenced in the design systems and style guides context. The strongest support comes from excerpts that directly name Figma and describe its system behaviors: one discusses overriding instance properties and how changes are preserved within Figma, which highlights how Figma manages component customization versus integrity; another explains editing instances with component properties and how overrides are tracked, reinforcing Figma as the referenced tool. Detailing the ability to detach an instance from the main component in Figma directly answers how Figma handles deviation from a component, which is central to understanding how a design system signals intentional divergence. Further, a discussion of Figma analytics related to detaching or breaking connections provides additional signal about how Figma tracks and interprets deviations. Collectively, these excerpts directly map to Figma as the design system/tool in question, with explicit workflow or feature references that anchor the relevance of Figma to the field value. Excerpts mentioning detach analytics and detached instances continue to reinforce the tool-specific workflows within Figma, even as they extend into more analytical or plugin contexts. While some other excerpts touch on broader design system topics (like Material Design tokens), they do not directly identify the tool, and thus are less supportive of the exact field value for the asked path.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### implicit_pattern_based_signals.1.measurement_method
**Confidence:** medium

The target field value describes validating a deviation against a higher-level context model, which in practice means using context-aware signals to distinguish intentional deviations from errors. In music, researchers show that listeners detect conspicuous errors by considering contextual appropriateness and harmonic or musical context, and that the salience of mistakes depends on surrounding structure and listener familiarity. This directly supports the idea that higher-level context (harmonic analysis, overall structure) is essential for intent assessment in that domain. The concept of validating a segment by analyzing whether a deviation aligns with expected musical context (e.g., harmonic expectations) aligns with the need to use a higher-level model rather than surface-level anomaly alone. In code analysis, work on suppressed static analysis warnings and the motivations for suppressions informs how a system uses metadata and intent signals (e.g., why a developer might suppress warnings, indicating a deliberate choice rather than an error). The notion of TODO comments signaling intentional deviations illustrates explicit markers of intent in practice, which is a strong parallel to metadata signals used to judge intention. In NLP and linguistics, papers on grammatical error detection, dialect awareness, and detecting intentional stylistic choices demonstrate the importance of understanding higher-level linguistic context and variation (dialect, non-standard grammar) to infer intent rather than treating all deviations as errors. Design systems literature (Figma component overrides, detach functionality, and design tokens) shows how intentional deviations are signaled through overrides or token detachment, providing concrete UX-level patterns for signaling intentional deviation. Taken together, the collection of excerpts supports a multi-domain strategy for intent estimation: rely on higher-level contextual models (music theory, code pre/post-conditions, dialect-aware grammar), leverage explicit or implicit metadata signals (overrides, suppressions, TODOs, detachments), and apply pattern-based heuristics to assess consistency of deviations across a section or context. The most informative material directly ties deviations to higher-level context validation (music: harmonic/contextual cues; NLP: grammar/dialect context; code: pre/post-conditions and suppressions), while design and tooling examples offer concrete signals and heuristics for marking intentionality beyond the raw data.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [What can NLP do for linguistics? Towards using ...](https://www.degruyterbrill.com/document/doi/10.1515/lingvan-2024-0001/html?srsltid=AfmBOorJMcqdQw9alDp6wfoWIcLANVvE6ZXvcC606tP_8XBQb8pzsw8f)
  > by L Nguyen · 2024 · Cited by 4 — This paper proposes a novel use of grammatical error detection/correction (GED/GEC) tools to document non-standard English varieties.
- [Grammatical Error Correction: A Survey of the State of the Art](https://aclanthology.org/2023.cl-3.4.pdf)
  > by C Bryant · 2023 · Cited by 373 — In this survey paper, we condense the field into a single article and first outline some of the linguistic challenges of the task, introduce the most popular
- [Language Models and Dialect Differences](https://dl.acm.org/doi/10.1145/3706468.3706496)
  > Mar 3, 2025 — ... identify AAL features and distinguish them from grammatical errors. Our goal is to assess whether these tools can accurately interpret
- [Exploring the Role of Grammar and Word Choice in Bias ...](https://dl.acm.org/doi/10.1145/3531146.3533144)
  > Jun 20, 2022 — Our work uses Twitter datasets for AAE dialect and hate speech classifiers to explore the fine-grained relationship between specific characteristics of AAE.
- [[Re] Exploring the Role of Grammar and Word Choice in ...](https://neurips.cc/virtual/2023/poster/74147)
  > Exploring the role of grammar and word choice in bias toward African American English (AAE) in hate speech classification.
- [NLP Bias and African American English - Dallas](https://scholar.smu.edu/cgi/viewcontent.cgi?article=1311&context=datasciencereview)
  > by K Roy · 2025 — This mismatch can cause models to misclassify dialectal expressions— especially by labeling neutral or positive AAE as negative or toxic. These errors matter,
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [ComponentProperties | Developer Docs](https://developers.figma.com/docs/plugins/api/ComponentProperties/)
  > A map of component properties that exist on an instance node. Each property in the map must have a type matching ComponentPropertyType .
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's

### explicit_metadata_signals.2.signal
**Confidence:** high

The most relevant excerpt directly introduces formal specifications through a language designed for contracts and assertions in code (the Java Modeling Language) and mentions a tool that checks those specifications. This supports the notion that formal contracts or assertions are concrete metadata or signals used to encode intent about correct behavior, constraints, or expected outcomes within code. Other excerpts discuss mechanisms to suppress or ignore warnings and to bypass checks, which are pertinent to detecting deviations but do not provide evidence of formal contract signals; they instead illustrate how developers may hide or bypass signals rather than encode explicit intent. Therefore, the presence of formal specification tooling and language constructs in the identified excerpt strongly aligns with the concept of formal contracts or assertions as intent signals, while the remaining excerpts offer contextual contrasts but limited direct support for formal contract signals.

- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML

### implicit_pattern_based_signals.0.signal_type
**Confidence:** medium

The targeted field value concerns using consistency and repetition as a heuristic to infer intent behind deviations. Excerpt about a TODO convention explicitly signals intentional deviation and supports the idea that recognizable, repeated signaling cues (like todo notes) indicate deliberate action rather than error. The cluster of works on bugs as deviant behavior treats deviations from frequent patterns as potential intentional design or coding decisions, offering a framework where repeated anomalies within a sequence suggest deliberate choice rather than isolated mistakes. In the musical domain, discussions about how context and familiarity influence the salience of mistakes imply that consistent misalignment with expected patterns can be read as a strategic or intentional choice depending on contextual fit. Studies on suppressed static analysis warnings illustrate how metadata signals (warnings being silenced) can reflect a deliberate stance to tolerate or embrace nonconformity, which parallels the notion of intentional deviation signals in other domains. Collectively, these excerpts support a view where consistency of deviation across a region, or the deliberate use of explicit signaling (TODOs, overrides, detachment, or suppression), provides evidence for intent. They also hint at practical heuristics: look for repeated departures from a rule within a scope, assess whether departures align with broader design or coding goals, and weigh contextual fit or consistency across neighboring elements to gauge intent. The presence of explicit mechanisms to detach or override (as in design tokens or component systems) further strengthens the case that repetition and stable patterns of deviation constitute intentional signals rather than random errors.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### implicit_pattern_based_signals.3.description
**Confidence:** high

The most directly supportive material points to an explicit practice that signals intent: using a TODO marker is presented as an intentional deviation that tools can aggregate and review, i.e., a deliberate signal embedded in code comments that suggests purpose beyond mere error. This aligns with the idea that when a pattern of changes forms a coherent set aimed at a single objective, it reflects intent. Related studies on suppressed static analysis warnings illuminate why practitioners choose to hide certain signals: suppression decisions often respond to higher-level goals or contexts, indicating a user-driven intent behind what would otherwise be warnings. Similarly, treating bugs as deviant behavior provides a framework for recognizing that deviations from expected norms can be interpreted as either errors or deliberate strategies, depending on the broader context and patterns, reinforcing the notion that isolated departures are more suspicious than clustered, related alterations. In the domain of performance and perception (e.g., musical contexts), the salience of mistakes is context-dependent, which suggests that evaluation systems should weigh consistency and contextual fit when inferring intent. Taken together, the strongest support for the field value comes from the explicit signaling via TODOs that contamination or deviation is intentional, augmented by evidence that suppression signals can reflect strategic intent, and by deviance frameworks that distinguish between isolated anomalies and cohesive, goal-aligned modification bundles. Contextual signal strength increases when multiple related changes co-occur, as opposed to a single orphaned change, which supports the claim that coherent bundles indicate plausible goals while isolated changes are suspect.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe

### implicit_pattern_based_signals.2.description
**Confidence:** high

The finegrained field value asserts that deviations from learned norms can be treated as potential bugs unless there are signals of intent, and that a system can learn norms from data to distinguish intentional deviation from error. Excerpts describing “Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code” provide a foundational stance: deviations from typical usage or call sequences are clues to infer errors, implying a framework where learned norms define what counts as a bug. This directly supports the idea that deviations are first analyzed against norms rather than assumed as bugs, with intent inferred from additional signals. Excerpts focused on suppressed static analysis warnings illustrate concrete signals of intent: developers suppress warnings for reasons that may indicate an intentional pattern (overrides, silence of certain checks) rather than a defect, which aligns with the notion that intent can modulate whether a deviation is considered a bug. Discussions of intentional overrides and detachments in design systems (overriding component tokens or detaching an instance) demonstrate environments where deviations are deliberately introduced as signals of intentional design choice, reinforcing the mechanism by which context and consistency can disambiguate intent. Together, these excerpts establish a spectrum: from a formalization that deviations may indicate errors unless corroborated by intent signals, to concrete practices (suppressions, overrides, detach) that provide those signals, enabling a practical disambiguation strategy. The content also covers how pattern-based observations (e.g., recurring deviations vs single outliers) can inform intent judgments, consistent with the heuristic described in the target field value. The overarching narrative across these excerpts supports constructing heuristics, metadata signals, and pattern-based approaches to estimate intent without explicit annotation by anchoring deviation assessment to learned norms and corroborating signals of intentionality from the data and tooling context.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Automatic Classification and Repair of Static Analysis ...](https://arxiv.org/html/2509.11787v1)
  > Sep 15, 2025 — Static analysis tools are widely used to detect bugs, vulnerabilities, and code smells. Traditionally, developers must resolve these warnings
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on

### implicit_pattern_based_signals.3.signal_type
**Confidence:** medium

To infer intent when rules are broken or signals diverge, practitioners rely on explicit markers that co-occur with other signals. A notable example is the use of TODO comments, which explicitly signal intentional deviation and planning for future work, suggesting a deliberate design choice rather than an oversight. In code practices, disabling or enabling specific warnings through pragma controls illustrates a deliberate pattern where multiple signals (warnings, lints, and rubric rules) are jointly managed to convey intent. Documentation and studies on suppressing static analysis warnings provide empirical support that users apply multiple, aligned signals (suppression, context, and rationale) to indicate intent rather than error. Similarly, discussions of how to disable or control message-level feedback (such as lint messages) show concrete mechanisms for signaling intent across a suite of checks, reinforcing the idea that intent can be inferred from coordinated signals rather than a single anomaly. Other excerpts discuss signals in a design and implementation context, such as component overrides and detached instances, which demonstrate that intentional deviation can be signaled through deliberate remapping or reattachment behavior, rather than random divergence. Contextual factors—such as consistency of deviation across a section or repeated pattern across related components—support disambiguation: a single rule break may be a mistake, while a consistent rule deviation across a region is more likely intentional. Taken together, the techniques involve (a) explicit marker or metadata signaling intent (TODOs, feature flags, pragma controls), (b) historical and contextual patterns (repeated deviations, consistency across similar elements), and (c) suppression or override signals that function as companion signals alongside the observed deviation. These patterns inform practical disambiguation techniques and metadata signals for intent estimation, and they imply confidence modifiers should increase when multiple co-occurring signals align to indicate deliberate deviation, while a lone anomaly should decrease confidence.


- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  > Component properties are tied to different design properties. You can create component properties for any main component or variants of a component set, and
- [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens)
  > Tokens point to style values like colors, fonts, and measurements. Use design tokens instead of hardcoded values. Each token is named for how or where it's
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.

### implicit_pattern_based_signals.2.signal_type
**Confidence:** medium

The most directly relevant content frames deviations as informative cues for identifying errors or intentional actions. Excerpts describing 'Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code' treat bugs as deviations from frequent patterns or expected sequences, arguing that recognizing deviant behavior helps infer errors. This directly supports the idea that deviations from a learned baseline can signal a detectable intent or error and can be used to distinguish normal variation from intentional rule-breaking. Other excerpts extend this by showing that suppressions of warnings or deliberate overrides are used to encode intentional deviations, signaling an intention to break a rule or constraint rather than an error. Discussions about TODOs signaling intentional deviation and about disabling static-analysis warnings further illustrate how metadata signals and pattern-based signals (such as suppression or override signals) function as evidence of intent, which is central to disambiguating intentional deviation from unintentional error. In the design/system space, discussions of component overrides and the option to detach instances illustrate how practitioners explicitly signal intentional deviations from a standard baseline through configuration changes or design-system mechanics, aligning with the concept of deviation signals used to infer intent. Taken together, these excerpts support a framework where learned baselines and frequent patterns constitute a reference, and deviations from that reference—whether in code, warnings, comments, or design tokens—provide evidence for intent, with suppressions/overrides acting as explicit metadata signals that modulate confidence about intent. The combination of deviant-behavior analysis, suppression signals, and design-system overrides forms a coherent set of heuristics for estimating intent without explicit annotation, including the role of consistency (repeated, rule-specific deviations across a section increasing the likelihood of deliberate intent) and context as disambiguation levers.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.

### implicit_pattern_based_signals.3.heuristic
**Confidence:** high

The most relevant excerpt presents a foundational perspective: treating bugs or deviations as 'deviant behavior' and inferring intent from patterns that stand out against normal operation. This directly supports the idea that a deviation linked with other coordinated changes signals intentionality rather than random error. Additionally, studies on suppressed static analysis warnings show that users often suppress signals for a deliberate reason, aligning with the notion that deliberate deviations manufacture a different signal profile than accidental mistakes. The TODO example explicitly signals intentional deviation through a marker that prompts review, reinforcing the concept that explicit signals combined with surrounding changes can indicate intent. Discussions about disabling warnings in tooling (like pragma controls) provide concrete metadata signals that developers use to convey intentional deviation. Finally, context-sensitive error discussions (where the salience of mistakes depends on surrounding context) illustrate how grouping and coherence across a section affect intent estimation, supporting the heuristic that co-occurring deviations within a section are more likely intentional than isolated slips.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe

### implicit_pattern_based_signals.0.description
**Confidence:** medium

The idea that a deviation may be deliberate when it occurs as a recurring pattern within a defined scope is echoed by research framing deviations as signals to infer errors or deliberate behavior. The notion of treating deviations as deviant behavior in an information-rich way—specifically, that patterning and frequency can distinguish errors from deliberate choices—is captured in discussions of Bugs as Deviant Behavior, which reframes deviations from frequent, expected patterns as clues for error detection and understanding system behavior. Related work argues that error inference can be grounded in the notion of frequent or regular patterns (e.g., function call sequences) being deviated from, suggesting that recurring deviations may reflect emerging conventions or intentional design rather than random mistakes. This aligns with the claim that a deviation that recurs within a scope (such as a file or a set of calls) is more likely deliberate, because recurring patterns imply a conscious or emergent local rule rather than a one-off error. Additional evidence from the literature on suppressed warnings and intentional overrides in design and code contexts supports the interpretation that deliberate deviation is often signaled by metadata, context, and the repetition of the deviation across related elements (for example, consistent overrides, repeated TODO-style deviations, or deliberate detachment in design) rather than isolated incidents. Excerpts discussing component overrides in design tools illustrate intentional deviation signals: users override many properties, including color and typography, and such overrides can be preserved, indicating deliberate choices rather than random mistakes. Similarly, discussions of detaching a component from its main definition highlight a deliberate change outside the standard workflow, signaling intentional deviation. In programming and static analysis contexts, researchers analyze suppressions and deviant behaviors to understand intentional deviations from warnings and conventions, illustrating how metadata signals (such as suppressions) and recurring patterns inform intent estimation. The cross-domain theme is that context and consistency matter: if a deviation repeats across a defined scope, it is more plausible to interpret it as a deliberate choice or emergent local convention rather than a single error. Taken together, these sources support a practical heuristic: measure recurrence within a scope, assess the consistency of the deviation with local rules, and consider explicit signals (overrides, detachments, suppressions, TODO-like markers) and the surrounding context to estimate intent.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### implicit_pattern_based_signals.0.heuristic
**Confidence:** medium

The strongest support comes from works that explicitly frame bugs as deviant behavior, treating deviations from typical patterns as signals to infer errors or intent. These sources discuss that abnormal sequences or deviations can be indicative of non-benign causes, and over time, consistent patterns of deviation can be interpreted as deliberate behavior rather than random mistakes. This directly underpins the heuristic that a single deviation may be an error, while repeated deviations suggest a deliberate choice. Related literature further shows that treating deviations as signals (rather than noise) is a core approach in static analysis and bug-finding, which aligns with the idea that recurring deviations constitute intentional strategy. Several excerpts also discuss deliberate overrides, detachments, and TODO-style markers as deliberate deviations from the norm, which strengthens the interpretation that intentional deviations are signaled by repeated or systematic patterns, or explicit metadata and design-system mechanisms. Contextual salience of mistakes (e.g., in music performance) supports that perception of error vs intentionality depends on context and prior patterns, which complements the heuristic by indicating that even repeated deviations may be interpreted differently if context shifts. Finally, examples of metadata signals (such as suppressions of warnings and explicit override mechanisms in design tools) offer concrete ways to encode intent signals that can be combined with the repetition heuristic to estimate intent. Collectively, these excerpts coherently support a practical rule: isolated deviations are more likely errors, while recurring deviations across a region point toward deliberate choice, especially when reinforced by explicit signals or design-system conventions.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,

### explicit_metadata_signals.2.example
**Confidence:** medium

The finegrained field value centers on explicit formal specifications and assertion mechanisms as explicit metadata signals that convey intent (e.g., JML specifications such as requires and ensures, and assert statements). Excerpts that directly discuss JML and its use as a formal specification mechanism provide the strongest support for this signal type, since JML is specifically designed to annotate code with formal contracts (requires, ensures) and runtime checks via tools like OpenJML. Therefore, the most relevant passage is the JML tutorial entry, which explicitly mentions JML and OpenJML and their role in specifying behavior. 

Secondary relevance comes from excerpts that discuss mechanisms used to suppress or control analysis or lint diagnostics as intentional signaling. Papers and documentation about suppressed static analysis warnings and deliberate suppression practices illuminate metadata signals that developers use to indicate intentional deviations rather than accidental errors. These sources discuss the reasons behind suppressions, how and why users suppress warnings, and the patterns that emerge when developers choose to override or silence automatic checks, which map to the broader idea of indicating deliberate intent through metadata or configuration. 

Other relevant items address concrete tooling techniques to suppress or override checks (for example, disabling specific lint rules via NOLINT or pragma controls). Such signals are metadata-level indicators that a developer intends a particular deviation to be intentional, which parallels how explicit specifications or assertions act as deliberate design signals in code. 

Less direct, but still supportive, are discussions from Q&A and documentation about disabling lint warnings in Python (Pylint) and StackOverflow guidance on disabling warnings in practice. These illustrate common, ad-hoc metadata signaling practices used to convey intent when rules are broken or overridden, albeit in more informal contexts. 

Collectively, these excerpts support the field value by illustrating concrete mechanisms (formal specifications via JML, explicit assertion statements) and metadata signaling practices (suppressions, disables, and overrides) that help distinguish deliberate deviations from unintentional errors, and they show how such signals can be combined or weighed to estimate intent. 


- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### explicit_metadata_signals.6.interpretation
**Confidence:** medium

The most directly relevant evidence concerns explicit signals that a modification or deviation is intentional and documented. A reference noting that a TODO can signal an intentional deviation explicitly frames such markers as deliberate signals within a workflow. This aligns with the idea that a human-readable justification or metadata around a deviation strengthens the confidence that the choice is deliberate rather than merely silencing a warning. Design-system behavior around component overrides further illustrates how intentional deviation can be signaled through structured signals (overriding various properties) to convey purposeful divergence from a standard component. Detaching an instance from a component is another clear mechanism to indicate intentional deviation from a canonical reference, since the action explicitly breaks the direct linkage to the main component while often accompanied by a rationale for the exception. Related tooling and workflows around these signals reinforce the interpretation that explicit, human-readable or structured metadata around deviations improves intent estimation, whereas suppressions of warnings or disabling checks without justification tend to offer weaker or ambiguous cues about intent. In that sense, explicit metadata signals such as overrides, detachments, and TODO-driven notes provide concrete, discoverable justification for deviation, which significantly boosts confidence that the deviation is deliberate. Conversely, practices that describe silencing or suppressing warnings (without transparent rationale) can undermine certainty about intent and are less informative for intentionality. Taken together, the strongest support comes from sources that discuss explicit deviation signals (overrides, detachments, TODOs) as deliberate design choices, while silencing or masking warnings without justification provides weaker guidance on intent.


- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### explicit_metadata_signals.6.example
**Confidence:** medium

The finegrained field value describes a comment placed next to a suppression to indicate intentional deviation (for example, a suppression comment like // NOLINT: False positive due to legacy API). Excerpts that explicitly discuss suppression macros or pragmas (such as NOLINT and NOLINTNEXTLINE) demonstrate the exact mechanism for signaling intent to ignore a rule, which aligns directly with the requested form of explicit metadata signals adjacent to a suppression. Pragma-based controls describe how automatic checks can be silenced or toggled, which is essential context for understanding how intent is encoded in code. Discussions about disabling or enabling specific warnings in Pylint similarly illustrate the parallel practice of adding comments to indicate intentional deviation from a rule. Empirical studies of suppressed static analysis warnings provide evidence about why developers add such suppressions and how they relate to intent signaling in practice. The TODO-related item shows another pattern where an annotation signals deliberate deviation or planned work, which can be related to intent estimation heuristics. Design-system related excerpts (Figma overrides and detach signals) demonstrate how deliberate deviations or exceptions are signaled in design tokens and component usage, offering cross-domain analogies for how intent might be inferred from metadata or patterns. Taken together, these excerpts support a view that explicit suppression comments, adjacent notes, and controlled metadata signals are central to disambiguating intentional deviation from mistakes, and that heuristic cues (like scope, consistency, and frequency of suppressions) help infer intent in the absence of explicit annotation.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### explicit_metadata_signals.2.interpretation
**Confidence:** medium

The most relevant content shows concrete mechanisms where intentional deviation is signaled rather than treated as error: the ability to ignore or suppress lint checks and warnings via comments or pragmas signals that a deviation is deliberate, not a bug. This aligns with the idea that an unconventional implementation can still adhere to explicit contracts or assertions if there are clear, intentional override signals. The subsequent items describe empirical analyses of why and how such suppressions occur, which provides evidence about metadata and pattern signals surrounding intentional deviations (e.g., suppression counts, reasons). An excerpt referencing a formal specification language (JML) directly ties the concept to explicit contracts that the code can satisfy even if it deviates in implementation when such deviations remain within the bounds of the formal specification. Together, these excerpts support a framework where explicit metadata or signals (overrides, suppressions, or formal contracts) are used to disambiguate intent, with the rest of the content offering contextual backing and historical data on how these signals are applied in practice. Specifically: using NOLINT/NOLINTNEXTLINE as intentional overrides demonstrates a practical syntax-level signal for intentional deviation; documentation on disabling warnings (pragma controls) illustrates how metadata controls convey intent; empirical studies on suppressions provide insight into user motivations and patterns that can be leveraged as heuristics; and a mention of formal specifications (JML) connects the concept to a framework where behavior is defined by explicit contracts that must be satisfied, even if unconventional, thus aligning with the field value that intent is determined by explicit contracts and their satisfaction. The remaining excerpts add context by showing the prevalence and rationale behind such signals, reinforcing the idea that contextual consistency and explicit signaling are key to inferring intent.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### explicit_metadata_signals.2.domain
**Confidence:** high

The field value identifies the domain as related to Source Code within explicit metadata signals. The strongest support comes from excerpts that study or describe suppression and override mechanisms inside codebases, because they provide concrete signals that developers use to indicate intentional deviations from automated checks. For example, empirical studies of suppressed static analysis warnings describe why developers suppress warnings and how such suppressions are used across languages, directly informing how intent can be signaled in source code metadata. Practical descriptions of disable/enable pragmas and lint-suppression patterns show explicit, codified methods by which teams mark intentional deviations, which aligns with the concept of explicit metadata signals indicating deliberate intent in code. Documentation and discussions about specific tooling controls that allow ignoring or bypassing checks (such as the capability to disable lint checks via inline annotations) illustrate actionable patterns for encoding intent within code artifacts themselves. Similarly, guidance on how to disable warnings in a linting tool (like Pylint) provides concrete examples of metadata-level signals and their scope, which are essential for a system to estimate whether a deviation is intentional. Additional references that describe using NOLINT-style suppression markers in code demonstrate concrete syntax and semantics for signaling intent, reinforcing how metadata can capture deliberate deviations from a rule set. Taken together, these excerpts collectively illustrate the heuristics and concrete signals (suppression flags, pragma controls, and deliberate overrides) that a detection system can rely on to infer intent in source code contexts, as well as the conditions under which such signals may indicate deliberate deviation versus error. The most compelling signals are explicit suppression mechanisms and the rationale behind their use, while other excerpts provide broader context about how developers communicate intent within code through tooling and conventions.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### design_systems_and_style_guides.0.system_or_tool
**Confidence:** high

The most directly relevant excerpts explicitly describe Figma features and behaviors that relate to design systems and component manipulation. A highlight on component overrides shows that Figma allows overriding a wide range of properties to realize intentional deviations from components, which is central to understanding when a deviation is deliberate versus accidental. This aligns with the need to disambiguate user intent in design systems: intentional deviations may be signaled by consistent override patterns across a section, whereas solitary deviations may indicate errors. Additional excerpts describe the detach capability and its usage to break connections between instances and main components, which is a core mechanism by which deliberate changes can be exercised without altering the original component, and the existence of analytics and plugin tooling around detaching or locating detached instances provides metadata signals that a deviation may be intentional or corrective. References to detach mechanics and the ability to reattach or explore detached instances further illuminate how teams manage intentional versus unintentional deviations within a design system. The article on detaching an instance from the component reinforces the practical workflow where detaching serves as an explicit signal of deviation from the component contract, which is useful for intent estimation when a deviation appears. The library analytics help article, while broader, offers context about tracking usage of libraries, components, and styles, contributing to a pattern-based signal set for intent estimation by showing how often and where certain deviations occur across a repository. Collectively, these excerpts support the notion that Figma, as the system/tool, provides concrete mechanisms (overrides, detach, analytics) that can be leveraged to distinguish between intentional rule-breaking and unintentional errors, and that consistent patterns of deviation across a section can indicate deliberate design choices.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### design_systems_and_style_guides.0.signal_of_intent
**Confidence:** medium

Detaching an instance from its main component is described as breaking the connection to the main component, which directly aligns with the idea of signaling a need for a fundamental change not supported by standard overrides. This supports the notion that detachment is a deliberate deviation with intent, especially when not justified by overrides. The description of detaching being useful when changes are not supported by overrides reinforces that detachment communicates a specific, non-ordinary intent to diverge from the component’s canonical behavior. The general discussion of overrides in conjunction with detaching clarifies that while overrides are common, detachment represents a stronger, more intentional deviation when standard override capabilities are insufficient. Together, these excerpts establish that detaching serves as a detectable signal of intent indicating an exceptional or nonstandard modification, particularly when such detachment is used consistently or with explicit justification. An ancillary excerpt explaining that overrides can still be used for non-component properties, and that detaching is employed to enable changes not supported by the component system, further substantiates the interpretation that detachment is a meaningful intent signal rather than a mere artifact of editing. While there are mentions of overview analytics and tooling around detached instances, their primary value here is to illustrate that detaching events are observable and thus usable as signals within a detection framework.

- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### explicit_metadata_signals.3.example
**Confidence:** high

The field value refers to “Editing an instance's properties via the designated panel in Figma.” Excerpt: “In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes” directly supports the idea that a designated panel allows editing a variety of properties within an instance, which is precisely the kind of interaction described in the field value. Additionally, the statement that “you can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them” indicates that edits performed through the designated interface are captured as explicit changes to the instance, aligning with the concept of explicit UI-driven edits being tracked as overrides rather than being invisible or implicit alterations. This supports the notion that editing via the Figma panel constitutes deliberate, recorded modifications, which can be analyzed as intentional deviations or overrides in a broader evaluation framework. Taken together, these excerpts directly describe the mechanism by which UI-driven edits are performed and stored, providing evidence that such edits are intentional design-time actions recorded as overrides rather than errors.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,

### implicit_pattern_based_signals.0.measurement_method
**Confidence:** high

The strongest support comes from the body of work treating bugs as deviant behavior, which frames deviations from established patterns as a signal that warrants inference about errors or intentional deviation. These sources collectively advocate looking for deviations from frequent sequences or norms, i.e., patterns that stand out against a learned baseline, to infer where a non-random cause (such as deliberate intent) may be at play. This aligns with the fine-grained field value which proposes frequency-based analysis of a deviation within a coherent scope: if a rule is broken more than once and with low variance, intentionality is more plausible. The cited studies argue that deviations can be detected by comparing observed sequences to expected patterns, and that consistency across a scope strengthens the inference of intentional deviation rather than random error. This supports a measurement method that emphasizes repetition, coherence across the segment, and deviation from established priors as heuristics for intent estimation. Additionally, the empirical work on suppressions of static analysis warnings provides concrete signals about user-initiated deviations (i.e., choosing to hide or suppress certain signals) and investigates the motivations and metadata surrounding those acts, which is highly relevant for understanding metadata cues that accompany intentional deviations. This complements the frequency-based approach by adding a metadata perspective: suppression, overrides, or explicit annotations can function as signals that accompany or reinforce the inference drawn from pattern frequency. Further support comes from discussions about “TODO” usage and deliberate signaling in software artifacts, which illustrate explicit intent markers that help disambiguate intentional deviation from mere mistakes. In the musical domain, analyses of the salience of mistakes contingent on context and listener familiarity provide an analogous lens: context modulates whether deviations are perceived as intentional stylistic choice or error, which informs how a detection system should weigh context when estimating intent. The error-detection literature in systems code and performance analysis in music similarly underscores the importance of context, alignment to expectations, and the role of consistent deviation as evidence of intentionality. Taken together, these sources suggest a frequency- and pattern-based measurement methodology supplemented by context-aware heuristics and metadata signals (such as suppressions, overrides, and explicit markers) to estimate intentionality without explicit annotation. They imply an ordering of evidence where repetition and low variance of the deviation within a coherent segment raises the confidence of intentionality, while single, isolated deviations or highly variable deviations should be treated with caution or flagged as potential mistakes. This combination yields practical disambiguation techniques (pattern frequency checks, consistency across a scope, alignment with expected norms), metadata signals (suppression of warnings, overrides, TODO markers), and confidence modifiers that together enable intent estimation without explicit annotation.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
- [PERFORMANCE ERROR DETECTION AND POST- ...](https://eita-nakamura.github.io/articles/EN_etal_ErrorDetectionAndRealignment_ISMIR2017.pdf)
  > by E Nakamura · Cited by 105 — This paper presents a fast and accurate alignment method for polyphonic symbolic music signals. It is known that to accurately align piano performances,

### implicit_pattern_based_signals.2.measurement_method
**Confidence:** high

Detecting intentional deviation versus unintentional error in systems often relies on treating bugs as deviant behavior with respect to learned or frequent patterns. The notion that one can infer errors by analyzing deviations from habitual sequences or rules underpins pattern-based anomaly detection: extracting the checking information from the code itself and identifying deviations from frequent call sequences. This supports the idea that an anomaly can be statistically modeled as rarity relative to a baseline learned from historical data. Extending this, the literature on suppressed static analysis warnings reveals why some deviations are intentional: developers suppress warnings to signal a deliberate choice, which becomes a detectable pattern when cataloged across codebases—helpful for distinguishing intentional deviations from mere noise. Similarly, tools and practices around enabling or disabling warnings (pragmas, symbolic names) demonstrate explicit controls that convey intent, a critical signal in a detection system that aims to estimate whether a deviation is purposeful. The TODO convention is another direct signal of intentional in-progress work, which can be interpreted as a managed deviation rather than an error. In the design domain, overrides and detach actions in component systems (like Figma) demonstrate explicit, user-driven signals of intentional deviation from a base component, aligning with the notion that deviations can be valid design choices when properly signaled. Taken together, these excerpts describe concrete mechanisms—patterns in code usage, suppression and override signals, and detachment workflows—that can be incorporated into a pattern-based, probabilistic disambiguation framework. They collectively support the idea that a robust intent estimation system should (a) learn typical patterns and identify statistically rare deviations, (b) monitor explicit signals of authority or intent (suppressions, overrides, TODOs, detachments), and (c) weigh contextual consistency (a single deviation might be a mistake, while repeated deviations on the same rule suggest deliberate intent).

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [Bugs as Deviant Behavior: A General Approach](https://www.researchgate.net/publication/2871844_Bugs_as_Deviant_Behavior_A_General_Approach)
  > This paper demonstrates techniques that automatically extract such checking information from the source code itself, rather than the programmer, thereby
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Automatic Classification and Repair of Static Analysis ...](https://arxiv.org/html/2509.11787v1)
  > Sep 15, 2025 — Static analysis tools are widely used to detect bugs, vulnerabilities, and code smells. Traditionally, developers must resolve these warnings
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.

### design_systems_and_style_guides.0.analytics_and_governance
**Confidence:** high

The most relevant evidence directly states that a detach action creates a trace (a detach event) and that analytics can surface patterns of detachment across components or library usage, which supports the idea that event logging and analytics are key signals for interpreting intent in design systems. For example, one excerpt explicitly notes that a detach occurs when someone uses the Detach instance setting to break the connection between an instance and the main component, providing a concrete mechanism to log and study detach events. This establishes the foundational signal for distinguishing deliberate detachment from accidental changes. Another excerpt describes detaching an instance from its main component to make changes not supported by overrides, illustrating how detachment can be purposeful and guided by design intent, which informs governance practices and pattern-based reasoning. Additional excerpts discuss overrides and component properties, highlighting that overrides can be used to express deliberate variations, which must be interpreted in the broader context of a system’s rules and consistency signals. This aligns with the idea that consistent detachment patterns across a section, as opposed to isolated events, are more indicative of intentional deviation. Complementary evidence on library analytics and plugins that enumerate and visualize detached instances strengthens the case that centralized analytics and tooling are essential for identifying trends, clustering detach events, and informing decisions about new variants or potential design flaws. Overall, these excerpts collectively support a workflow where detach events are logged, analyzed, and contextualized with override behavior and library usage to infer intent, while acknowledging that the same tooling can surface both deliberate deviations and mistakes depending on patterning and context.

- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.

### implicit_pattern_based_signals.2.heuristic
**Confidence:** high

The most relevant evidence frames bugs as ‘deviant’ behavior, i.e., deviations from common or frequent patterns in a system’s behavior or usage. For example, descriptions of bugs as deviant behavior emphasize that inferring errors can be grounded in recognizing departures from established sequences or rules, which directly supports the notion that breaking a frequent co-usage pattern often signals a bug rather than a deliberate, correct deviation. Related work demonstrates automatic extraction of checking information from the program itself by observing such deviant patterns, reinforcing that irregular co-occurrence or sequence patterns are strong heuristics for fault detection. Debates and studies on suppressions of static analysis warnings reveal that deliberate overrides can be a cause of complexity or exceptional intent, which in turn is a useful contextual signal for intent estimation and disambiguation in detection systems. In UI design domains, the existence of overrides or detachment signals in component usage likewise indicates intentional deviation from a base component, which helps differentiate deliberate stylistic choices from unintentional errors when interpreting design tokens or system constraints. Together, these sources support a heuristic that frequent co-usage pattern violations are likely bugs, while contextual signals like suppressions and intentional overrides serve as metadata to modulate confidence in that inference. Partial signals from papers on suppressions show that users intentionally suppress warnings, which can muddy automatic bug inference unless considered as metadata about intent. The combination of deviant-pattern detection with explicit override/suppression signals provides a practical framework for disambiguating intent, particularly when a single violation might be a mistake but repeated violations across a section or consistent deviations from a rule across a context strengthen the case for deliberate intent.

- [Bugs as Deviant Behavior: A General Approach to Inferring ...](https://web.stanford.edu/~engler/deviant-sosp-01.pdf)
  > by D Engler · 2001 · Cited by 1155 — Bugs as Deviant Behavior: A General Approach to Inferring Errors in Systems Code. Dawson Engler, David Yu Chen, Seth Hallem, Andy Chou, and Benjamin Chelf.
- [a general approach to inferring errors in systems code](https://www.semanticscholar.org/paper/Bugs-as-deviant-behavior%3A-a-general-approach-to-in-Engler-Chen/dceb9bf214c9e6f1293e6376ebed8f912127dbfa)
  > Bugs as deviant behavior: a general approach to inferring errors in systems code · D. Engler, David Yu Chen, Andy Chou · Published in Symposium on Operating… 21
- [A General Approach to Inferring Errors in Systems Code](https://www.researchgate.net/publication/2573732_Bugs_as_Deviant_Behavior_A_General_Approach_to_Inferring_Errors_in_Systems_Code)
  > Li and Zhou (2005) extract function call pairs, and Engler et al. (2001) consider bugs as deviant behavior from frequent call sequences. Related research can be
- [Bugs as deviant behavior](https://www.researchgate.net/publication/271428672_Bugs_as_deviant_behavior)
  > Engler et al. (2001) are among the first to point out the need for extracting rules to be used in bug-finding tools. They employ a static analysis approach
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control - Pylint 4.0.5 documentation - Read the Docs](https://pylint.readthedocs.io/en/stable/user_guide/messages/message_control.html)
  > Feb 20, 2026 — This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on a single line. a
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Automatic Classification and Repair of Static Analysis ...](https://arxiv.org/html/2509.11787v1)
  > Sep 15, 2025 — Static analysis tools are widely used to detect bugs, vulnerabilities, and code smells. Traditionally, developers must resolve these warnings

### design_systems_and_style_guides.0.mechanism
**Confidence:** medium

The most directly relevant content describes how detaching an instance from its main component functions as a mechanism to break or diverge from the canonical design, which maps cleanly to the field value Detach Instance. It explicitly states that detaching is used when a user wants to break the connection between an instance and its main component, highlighting the intentional nature of detachment as a design action rather than a default or accidental change. Related passages discuss the capability to detach for making changes not supported by overrides, underscoring detach as a purposeful mechanism within design systems. Further, references to component overrides and how they interact with detachment illuminate how deliberate deviation is signaled and managed in practice, including what kinds of properties can be overridden and how that interacts with the base component. Supporting tooling and workflows for detachment, such as plugins that locate or fix detached instances, provide concrete operational signals that detachment is a recognized state with implications for design system governance. While a few excerpts emphasize the broader concept of overrides, they remain connected to detachment by explaining that overrides can necessitate or reflect detachment, or are affected by the detachment workflow. Overall, these excerpts collectively illustrate Detach Instance as an intentional design mechanism, distinct from accidental edits, and describe the practical implications and tooling around detachment within design systems.

- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [View and explore library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics)
  > Use library analytics to track and compare usage of your published libraries, components, styles, and variables.

### explicit_metadata_signals.6.domain
**Confidence:** high

To determine intent signals within the Source Code domain, I prioritize excerpts that discuss suppressions and controls around static analysis and linting, since these directly reflect deliberate versus incidental deviations in code. The most relevant excerpts report empirical studies on how developers suppress static analysis warnings, covering languages such as Python, Java, and JavaScript, which provides context on why a deviation might be intentional and how often such suppressions occur. Closely related are excerpts describing concrete mechanisms to suppress or bypass checks, such as using // NOLINT or enabling/disabling specific warnings, which are direct methods for signaling intentional rule-breaking or deviations. Additional relevance comes from guidance on disabling lint rules with symbolic names in pylint, illustrating a standardized approach to signaling intent. A remark on using TODO markers highlights how developers communicate intentional changes or areas needing follow-up, which can serve as metadata signals of intent. While some excerpts delve into design or detachment in design tools, they are tangential to the explicit code-analysis focus but still offer a broader picture of how intent signals can be conveyed in different domains. Overall, the strongest support comes from sources describing concrete suppression techniques and their empirical prevalence, followed by normative guidance for disabling checks, with TODO signaling adding auxiliary metadata context. This combination supports the hypothesis that there are established, metadata-rich techniques to estimate intent in Source Code, including heuristics around suppression history, explicit disable controls, and intention signaling markers like TODOs, which collectively enable practical disambiguation techniques and confidence modifiers for intent estimation.

- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".

### explicit_metadata_signals.3.domain
**Confidence:** medium

The most relevant material directly addresses how design systems and components can be altered in a controlled way. Specifically, the guidance on detaching an instance from a component shows a deliberate deviation from the component's default linkage, a core operation in design systems when you want to implement unique variations. The pages describing component overrides in Figma illustrate how designers intentionally modify various properties of an instance, including colors and typography, which aligns with signaling deliberate deviations within a design system. Related material about detaching or reconciling detached instances further grounds this in practical workflows used to encode intentional variation within design tokens and component trees. Additional items discuss signals and analytics around detaches, which are relevant as metadata signals that an action was performed with intent. Documents that describe suppressions or warnings in broader software contexts (such as suppressing static analysis or lint messages) are included for completeness as potential parallel heuristics but are less directly tied to design systems themselves; they nevertheless offer insight into how systems treat intentional signals versus inadvertent noise. Finally, discussions of TODO patterns and similar practices provide contextual analogies for indicating intentional deviation versus error, which can inform heuristic design for intent estimation in design-system environments.

- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next

### explicit_metadata_signals.6.signal
**Confidence:** medium

The target field value corresponds to a justification text or explicit intent signal stored as metadata. The most directly relevant information comes from examples that explicitly describe signals of intentional deviation: a symbolic marker like TODO signals intentional deviation and the practice of suppressing or disabling warnings as an explicit choice rather than a bug (the tools' disable/enable pragmas). This demonstrates concrete mechanisms by which systems annotate or infer intent. Other excerpts describe design-system signals such as overrides in a component to indicate intentional divergence from a base token, and detachments that separate an instance from its parent component, which are also interpretations of deliberate deviation signals in design and implementation contexts. Additional excerpts discuss suppressions of static analysis warnings more broadly and empirical studies of such suppressions, which provide evidence about why developers introduce metadata signals and how those signals affect interpretation. The combination of these excerpts supports the notion that justification text or explicit intent signals arise from explicit markers (TODO, NOLINT-like suppressions, overrides, detachments) and documentation about their use. The reasoning therefore is that a system can estimate intent by recognizing these markers, their scope, and their consistency across a context; a single deviation marker may be a mistake, whereas consistent use of the same marker across a section indicates deliberate intent. Extracted patterns include explicit skip/disable pragmas, intentional overrides of tokens, detachments, and the presence of TODOs as signals that the author intends a deliberate variation rather than a mistake.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.

### explicit_metadata_signals.3.interpretation
**Confidence:** high

The concept of a sanctioned deviation is best evidenced by excerpts describing explicit customization mechanisms within a component system. For instance, an excerpt about overrides in a component system notes that you can modify a set of properties within an instance and that such changes are tracked and preserved, which directly supports the idea of a structured mechanism for customization within the component’s design. Similarly, another excerpt highlights that you can detach an instance from the main component to make changes not supported by overrides, which demonstrates a deliberate, design-bounded pathway for deviation that remains within the system’s architecture. Together, these describe sanctioned channels for modification that preserve traceability within the design system. A related excerpt discusses the broader capability to override many instance properties, underscoring that customization can be an intended, supported operation rather than an error. The presence of a TODO-like practice is another strong signal of intentional deviation, where notes or markers indicate deliberate tasks or alterations within the system workflow, aligning with the idea that some deviations are purposeful and scoped within governance signals. Several excerpts address suppressions or indications that a warning or rule check is being intentionally bypassed, which can encode metadata about intentional deviation, such as deliberately suppressing static analysis warnings or using token-like signals (NOLINT) to communicate that a pattern is deliberate and not erroneous. While these are often framed as risk areas in other contexts, here they can function as explicit signals of intent when used within a controlled metadata framework. The remaining excerpts extend these ideas by discussing tooling or guidance around such signaling (e.g., how to disable checks or how to rejoin detached instances). Overall, the strongest support for the finegrained field value comes from explicit mechanisms for sanctioned customization and explicit signaling of intentional deviation (overrides, detachments, and suppression patterns), with supporting context from practices that document intent (e.g., TODOs and metadata about suppressions). This combination helps a detection system estimate intent by looking for deliberate, design-bound pathways for modification, rather than unstructured or ambiguous deviations.

- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.

### explicit_metadata_signals.7.example
**Confidence:** medium

Explicit intent signals often manifest as short-lived or documented deviations that are annotated or codified in the codebase or design system. The most directly relevant materials describe concrete mechanisms to mark intent or bypass normal rules: platform-specific suppressions of warnings (such as NOLINT or pragma-disable), and guidelines for disabling or controlling message controls, which directly signal that a deviation from typical rules is deliberate. The idea of using TODO markers as markers of intentional work or deviation is also highly relevant, as these markers often accompany non-normative changes intended for later review, signaling intent. In design tooling, the ability to override or detach components signals intentional deviation from a canonical component behavior, which parallels the notion of intentional deviations in code (e.g., a deliberate exception path or performance-oriented workaround). These excerpts collectively illustrate concrete metadata signals and pattern-based cues—like suppression pragmas, TODOs, component overrides, and detach events—that a detector can rely on to infer intentional deviation. The remaining excerpts provide context on why these signals exist (e.g., how suppressions are tracked, how detaches are logged) but are somewhat less direct in indicating explicit intent markers themselves. Together they support constructing heuristics such as: presence of suppression pragmas, explicit override or detach events, and workflow artifacts like TODOs or commit messages that reference workarounds or deliberate design choices, to estimate intent with configurable confidence.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.

### explicit_metadata_signals.3.signal
**Confidence:** high

The finegrained field value corresponds to intentional deviations created as overrides to a component’s properties. The most directly relevant content states that, in Figma, users can override a nearly endless number of properties in an instance and that Figma records and preserves these changes, indicating that such overrides are intentional, tracked deviations from the main component. This directly supports the idea that a component property override is a deliberate modification signal within the design system. Additionally, the source explicitly notes that you can override a wide range of properties (color, type alignment, strokes, etc.), illustrating the scope and intentionality of such overrides. Relatedly, a statement emphasizes that detaching an instance from the component is useful for changes that aren’t supported by overrides, which contextualizes how deviations beyond standard overrides are treated as deliberate breakages or divergences from the main component. Taken together, these excerpts connect the concept of an intentional component property override to explicit tooling and workflows in Figma that make overrides visible, preservable, and distinguishable from unintentional edits or unsupported changes.

- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.

### explicit_metadata_signals.7.signal
**Confidence:** medium

The fine-grained field value Commit Message Rationale corresponds to explicit evidence that metadata and signals accompanying a change convey intent, beyond the surface content of the change itself. Several excerpts discuss mechanisms by which systems encode intent signals or distinguish deliberate deviation from errors. For code, pragma controls such as NOLINT and NOLINTNEXTLINE show explicit instrumentation to suppress checks, which indicates deliberate choice rather than a bug. Empirical work on suppressed static analysis warnings explores why developers suppress warnings, shedding light on context, rationale, and signals that accompany intentional deviations. In addition to code, discussions of intentional deviation appear in the form of TODO markers, which explicitly signal planned or deliberate future work or deviations from normal flow, and the broader notion that TODOs can be aggregated and reviewed as intentional signals. Design and UI tooling examples demonstrate how overrides and detachments function as deliberate signals: component overrides allow intentional modification of properties, and detaching an instance from its component signals a break from the default rule set or token behavior. The related tooling and workflow discussions around overrides, detaches, and the preservation of changes illustrate a pattern where metadata signals accompany changes to indicate intentional intent, not random error. Taken together, these excerpts support a view that reliable intent estimation can rely on: (a) explicit suppression or override mechanisms with corresponding rationale or metadata, (b) explicit markers like TODOs that signal a planned deviation, and (c) design-system signals such as detachments or overrides that explicitly record intentional non-conformance to base rules. These sources collectively inform heuristic and metadata-based approaches to infer author intent without explicit annotation, including the use of suppression flags, TODO markers, override histories, and the presence of token/detach events as contextual evidence of deliberate deviation. Potential heuristics and metadata signals to estimate intent include: monitoring for suppression or disablement of warnings/tools, capturing the rationale or comments attached to overrides, tracking consistent rule-breaking across sections as a sign of deliberate design choice, and recording detachments or overrides in design systems as deliberate signals. Pattern-based approaches would look for repeated, rule-level violations with consistent context, the presence of dedicated intent markers (NOLINT, TODO, overrides), and the history of changes and their associated metadata (such as commit messages or rationale fields) to calibrate confidence in intent. Overall, a robust disambiguation framework would combine explicit intent markers, suppression/override metadata, and consistent pattern signals across spaces (code, design, and language) to produce practical disambiguation techniques and confidence modifiers for intent estimation.

- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.

### implicit_pattern_based_signals.4.description
**Confidence:** medium

The core claim is that intentional expressive choices in music involve coordinated, multi-feature changes, while mistakes tend to be abrupt and one-dimensional. Excerpts that discuss how listeners judge performance salience based on contextual appropriateness and familiarity support the idea that intent can be inferred from whether deviations fit a broader musical context or feel out of place. References noting that errors can be detected by most listeners when they are salient, and that the salience depends on contextual appropriateness and familiarity, directly align with the idea that intent is discernible through pattern and context across multiple features. Additional excerpts describe systems that model expressive performance through multiple features (tempo, dynamics, timing) and methods that align performances to scores, which underpins the view that intentional deviations are often patterned and cross-feature, rather than isolated. The inclusion of discussions about how a model reads a piano roll or uses a transformer to detect performance issues and align with scores reinforces that intent detection benefits from multi-feature, cross-reference analysis rather than single-feature signals. Conversely, notes describing isolated errors and their detection without broader contextual justification illustrate the contrast between one-dimensional mistakes and coordinated expressive choices. Collectively, these excerpts provide evidence that (a) intentional expressive deviations are multi-feature and pattern-based, (b) mistakes tend to be abrupt or isolated, and (c) perception and detection rely on context, consistency, and alignment to a broader musical framework.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > 3

notation was done with Cubase 2 , and they were asked to
add an annotation at MIDI note 0 covering the span of the
time window which they judge as pertaining to an error.
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based

### implicit_pattern_based_signals.4.measurement_method
**Confidence:** medium

The most directly relevant points describe how the salience of mistakes depends on contextual appropriateness and the listener’s familiarity, which aligns with using temporal neighborhood information to assess whether a deviation is likely deliberate or accidental. This supports the idea of aggregating features over time around a deviation to identify coordinated patterns rather than single-point anomalies. Additionally, evidence that models (including transformers and temporal convolutional networks) are used to detect performance errors by aligning performance with score and by capturing how surrounding data relates to a potential error reinforces the need to analyze aggregated neighborhood features rather than isolated measurements. The notion of computing the probability that a segment contains a conspicuous error, via a model with a sequence-processing backbone, directly maps to using aggregated, neighborhood information to infer intent. References that discuss expressive performance through pitch, velocity, timing, and microtiming further justify that those aggregated features are the core signals to monitor in the neighborhood of a deviation. While some excerpts focus on perceptual judgments or notation, they provide useful context for what constitutes intentional deviation versus error, and support the broader approach of pattern-based, context-aware assessment of intent rather than one-off checks.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > 3

notation was done with Cubase 2 , and they were asked to
add an annotation at MIDI note 0 covering the span of the
time window which they judge as pertaining to an error.
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.

### implicit_pattern_based_signals.4.signal_type
**Confidence:** medium

The most directly relevant material discusses expressive characteristics in music and systems that detect or model expressive performance rather than treating deviations only as errors. For example, a study on a dataset focusing on note-level expressive characteristics such as pitch, velocity, and microtiming highlights how expressive features are captured and analyzed at a granular level, which aligns with the idea of bundling expressive signals into features rather than treating deviations as mere faults. Related work on transforming performance alignment and error detection emphasizes modeling expressive performance within a latent space, which supports the concept that deviations can be signals of intentional expression when aligned with performance context. Additional papers discuss the perceptual salience of errors depending on contextual appropriateness and familiarity with the piece, illustrating how context and consistency influence interpretation of deviation as intentional expressiveness rather than mistakes. Works examining how abnormalities are detected via temporal and spectral features, music performance errors, and transformer-based approaches provide practical approaches to signal extraction, scoring, and interpretation that could feed a bundling strategy. Together, these excerpts support a framework where “Expressive Feature Bundling” could be realized by grouping tempo, dynamics, timing, and perceptual salience signals into coherent feature bundles, used by evaluators to distinguish intentional deviation (expressive choice) from unintentional error, particularly when consistent patterns emerge across a section. They also imply heuristics such as aligning performance to score, examining consistency across a segment, and leveraging context familiarity as signals of intent, and they discuss metadata and model-based confidence adjustments when intent is ambiguous.

- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.
- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > 3

notation was done with Cubase 2 , and they were asked to
add an annotation at MIDI note 0 covering the span of the
time window which they judge as pertaining to an error.
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.

### explicit_metadata_signals.7.interpretation
**Confidence:** high

The finegrained field seeks explicit evidence that a code change or deviation is linked to a higher-level intent, i.e., an explicit signal or documentation of purpose. Excerpts that describe explicit mechanisms for signaling intent or intentional deviation are directly relevant. For example, comments that suppress or ignore specific lint checks (such as // NOLINT and // NOLINTNEXTLINE) are explicit declarations that a deviation from normal checks is purposeful and is meant to convey intent to ignore certain rules in a controlled way. This directly supports the notion of making intent visible through explicit signaling. Similarly, documentation about disabling warnings in static analysis (the Pylint message-control guidance and questions about disabling warnings) provides concrete mechanisms by which authors communicate intent to relax or override standard checks, which aligns with the idea of a documented proof of intent behind a changeset. The reference to TODOs as intentional deviations explicitly signals a planned or deliberate direction within the codebase, reinforcing the link between a deviation and its purpose. Design-system oriented excerpts about component overrides in Figma and related discussions about detaching or overriding component properties map the same principle to design tokens or component deviations: they are deliberate, documented, and signal a higher-level intent to differ from the standard component behavior. The excerpts that discuss tracking suppressions and detachments (e.g., why suppressions occur, how they’re tracked, and how detaching is recorded) further support the need for metadata signals and provenance around intentional changes, which aligns with the requirement for explicit links between a deviation and its intent. Finally, other excerpts that describe how to disable tools or warnings in various ecosystems (linting, static analysis) reinforce the broader pattern of explicit signaling about intent across contexts. Altogether, these excerpts collectively provide the concrete mechanisms (NOLINT-style pragmas, TODO markers, overrides, detachments) and the meta-analysis around why such signals matter, supporting the interpretation that an explicit linkage of a code change to a higher-level purpose serves as documented proof of intent. 

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.

### implicit_pattern_based_signals.4.heuristic
**Confidence:** high

The finegrained field value separates two classes of timing and dynamic deviations: smooth, patterned changes indicating intentional expression, versus abrupt, isolated anomalies indicating error. Excerpt content shows that listeners perceive the salience of mistakes as dependent on contextual appropriateness and familiarity, which supports the idea that pattern and context together signal intent rather than simple deviation. The explicit characterization of a conspicuous error as something detectable by most trained listeners, independent of score familiarity, provides a concrete criterion for when a deviation is likely an error rather than expression. The discussion of training models that align performance with scores and detect errors using transformers, including end-to-end approaches that compare performance audio with scores in latent space, supports a practical detection pipeline: compute timing and dynamics features, assess their alignment with score/context, and produce a probability or cue about whether a deviation is an error or an intentional deviation. Additional insights note that misalignment between performance and score can degrade feedback quality, underscoring the importance of detecting intentional deviations rather than penalizing expressive timing changes. Specific methods like using a piano-roll representation and a classifier to estimate the probability that a segment is a conspicuous error provide concrete algorithmic steps for turning perceptual cues into automated signals. The cited datasets and analyses of expressive tempo, dynamics, and pedaling illustrate the concrete feature sets and evaluative criteria that underpin the intended heuristic: (a) context-sensitive evaluation of timing and dynamics, (b) pattern consistency and cross-segment regularity as indicative of intent, (c) model-based alignment to detect deviations from expected behavior, and (d) probabilistic signaling for confidence-modulated intent estimation. Together, these excerpts map directly to the field value by describing the conditions under which timing/dynamics deviations should be interpreted as expression vs error, and by outlining practical cues and methods to infer intent with associated confidence modifiers.

- [SOUNDS OUT OF PLÄCE? SCORE-INDEPENDENT ...](https://archives.ismir.net/ismir2023/paper/000041.pdf)
  > In piano performance, some mistakes stand out to listeners,
whereas others may go unnoticed. Former research con-
cluded that the salience of mistakes depended on factors
including their contextual appropriateness and a listener’s
degree of familiarity to what is being performe
  > e consider a conspicuous error to be
"a performance error that can be detected by the majority
of listeners with a formal music training, regardless of their
degree of knowledge about the underlying music score of
a performed piece
  >  method reads a piano roll and outputs the
probability of the center of a segment being a conspicuous
error. It is comprised of a TCN backbone and a 1d convo-
lution classifier head.
  > 3

notation was done with Cubase 2 , and they were asked to
add an annotation at MIDI note 0 covering the span of the
time window which they judge as pertaining to an error.
  > by A Morsi · Cited by 6 — Based on the intuition that a listener is capable of detecting obvious mistakes in piano performances by listening to the surrounding context,
- [Detecting Music Performance Errors with Transformers](https://ojs.aaai.org/index.php/AAAI/article/view/34539/36694)
  > s model can
be trained end-to-end to implicitly align and compare perfor-
mance audio with music scores through latent space repre-
sentations
  > by BSH Chou · 2025 · Cited by 4 — In our work, we identify two key insights for training our music error detection models. ... This time with feeling: learning expressive musical performance.
  > by BSH Chou · 2025 · Cited by 4 — The resulting misalignment of notes leads to inaccurate error detection and ineffective feedback for stu- dents. In this paper, we introduce a transformer based
- [The GigaMIDI Dataset with Features for Expressive Music ...](https://transactions.ismir.net/articles/10.5334/tismir.203)
  > by KJM Lee · 2025 · Cited by 16 — The note‑level analysis provides the most granular insights, focusing on pitch, velocity, and microtiming to reveal expressive characteristics. Together, these
- [ATEPP: A DATASET OF AUTOMATICALLY ...](https://archives.ismir.net/ismir2022/paper/000053.pdf)
  > by H Zhang · Cited by 56 — Computational models of expressive piano performance rely on attributes like tempo, timing, dynamics and ped- alling.

### explicit_metadata_signals.7.domain
**Confidence:** high

The finegrained field value corresponds to how systems signal intentional deviation within a version-control-like context. Direct mentions of explicit suppression controls indicate a conscious choice to override normal rules, which maps closely to version control metadata signaling intent (for example, suppressing a lint check or a pragma that disables a violation). The strongest support comes from statements that describe using explicit markers to ignore or disable checks incode, such as the ability to annotate code to bypass static analysis or lint rules. This pattern aligns with the notion of signaling intentional deviation through metadata or guardrails. Relatedly, explicit markers like TODO comments are described as signals of intentional deviation that tools can aggregate and review, reinforcing the idea that metadata can convey intent to future maintainers. In design and UI tooling, overrides of component properties and detaching instances from a canonical component describe deliberate divergence from a baseline component, which functions as a higher-level signal of intent akin to version-control-style annotations or divergent branches. Discussions about tracking suppressions in static analysis further illustrate how metadata about normal errors being suppressed can indicate intentionality, rather than genuine absence of issues. Collectively, these excerpts provide a coherent set of heuristics and signals: explicit suppression controls (NOLINT and related pragmas), standardized disable/override mechanisms (pragma controls, pylint message-control), explicit markers of intent (TODO), and design-system patterns that tolerate or record deviations (component overrides, detaching from the main component). These form a practical basis for estimating intent without explicit annotations, including: - prevalence of explicit intent markers (e.g., NOLINT, TODO) as metadata signals; - consistency of deviations across a scope to infer deliberate strategy; - coexistence of overrides with a central component or token management to indicate intentional divergence; - patterns of detachment or override in design systems as signals of deliberate deviation rather than error. The confidence in these interpretations is high when multiple, explicit intent markers appear and show consistent patterns across a section or module, moderate when markers exist but are sparse, and lower when evidence is ambiguous or contradictory across excerpts. In this specific set, the convergence of explicit suppression controls, intentional-deviation markers, and component-level overrides/detachments supports a high-confidence assessment that these excerpts collectively illustrate practical disambiguation techniques, metadata signals, and intent-modulating patterns for detection systems.

- [Clang Tidy - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [Clang Tidy](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/83.0.4099.5/docs/clang_tidy.md)
  > If a check is invalid on a particular piece of code, clang-tidy supports // NOLINT and // NOLINTNEXTLINE for ignoring all lint checks in the current and next
- [How do I disable a Pylint warning?](https://stackoverflow.com/questions/4341746/how-do-i-disable-a-pylint-warning)
  > Starting from Pylint v. 0.25.3, you can use the symbolic names for disabling warnings instead of having to remember all those code numbers.
- [Messages control — Pylint 2.10.2 documentation](https://pylint.pycqa.org/en/v2.10.2/user_guide/message-control.html)
  > Aug 21, 2021 — Block disables¶. This describes how the pragma controls operate at a code level. The pragma controls can disable / enable: All the violations on
- [Using TODO For Everything](https://news.ycombinator.com/item?id=31235289)
  > May 2, 2022 — It also signals an intentional deviation and ... Most tools support automatic aggregation and review of code comments starting with "TODO".
- [An Empirical Study of Suppressed Static Analysis Warnings](https://software-lab.org/publications/fse2025_suppressions.pdf)
  > by H HU · 2025 · Cited by 7 — We analyze this data to understand the reasons that lead users to suppress warnings reported by static analysis tools. 2.3 Tracking Suppressions
  > by H HU · 2025 · Cited by 7 — We study suppressions in code written in three popular languages, Python, Java, and JavaScript, and for warnings produced by four popular static
- [An Empirical Study of Suppressed Static Analysis Warnings](https://dl.acm.org/doi/10.1145/3715729)
  > Jun 19, 2025 — This paper presents the first in-depth empirical study of suppressions of static analysis warnings, addressing questions about the prevalence of suppressions.
- [Figma Feature Highlight: Component Overrides | Figma Blog](https://www.figma.com/blog/figma-feature-highlight-component-overrides/)
  > Sep 20, 2018 — In Figma, you can override a nearly endless number of properties in an instance, including: Color; Type alignment; Add, remove, modify strokes
- [Detach an instance from the component](https://help.figma.com/hc/en-us/articles/360038665754-Detach-an-instance-from-the-component)
  > You can detach any instance from its main component. This is useful if you want to make changes to the component that aren't supported by overrides.
- [Edit instances with component properties](https://help.figma.com/hc/en-us/articles/8883757553943-Edit-instances-with-component-properties)
  > Overrides. You can still make overrides to non-component properties of a single instance. Figma records the changes you make to an instance and preserves them,
- [Figma Analytics — Detaches accuracy](https://forum.figma.com/report-a-problem-6/figma-analytics-detaches-accuracy-41548)
  > Jun 6, 2025 — Figma logs a detach any time someone uses the Detach instance setting to break the connection between the instance and the main component.
- [Fix Detached Instances](https://www.figma.com/community/plugin/1370980398588734425/fix-detached-instances)
  > Fix Detached Instances plugin helps you find and reattach detached instances. It lists all detached instances in the file and allows you to easily locate them.
- [JML Tutorial](https://www.openjml.org/tutorial/)
  > Last Modified: These pages provide a quick introduction to JML (the Java Modeling Language) and OpenJML (a tool that checks specifications written in JML
