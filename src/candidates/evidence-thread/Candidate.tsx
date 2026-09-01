import { useEffect, useId, useState } from "react";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  Copy,
  Database,
  Download,
  FileText,
  HeartPulse,
  HelpCircle,
  Home,
  Info,
  Link2,
  LockKeyhole,
  Menu,
  MessageSquareText,
  Moon,
  NotebookPen,
  Pill,
  RefreshCw,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  Trash2,
  UserRound,
  UsersRound,
  Watch,
  X
} from "lucide-react";
import "./candidate.css";

type CandidateProps = {
  onOpenDashboard: () => void;
  onOpenMarketing: () => void;
};

type ObservationId = "sleep" | "headache" | "activity";
type RangeId = "7d" | "30d" | "90d";

type Observation = {
  id: ObservationId;
  date: string;
  eyebrow: string;
  title: string;
  summary: string;
  interpretation: string;
  source: string;
  sourceDetail: string;
  range: string;
  confidence: string;
  confidenceDetail: string;
  gap: string;
  nextStep: string;
};

const observations: Observation[] = [
  {
    id: "sleep",
    date: "May 13",
    eyebrow: "Sleep pattern",
    title: "Your sleep timing became more consistent",
    summary: "Bedtime varied by 38 minutes this week, compared with 1 hour 24 minutes in the prior two weeks.",
    interpretation: "A steadier sleep schedule appeared alongside fewer morning headache notes. This is an association in your recent data, not a diagnosis or proof of cause.",
    source: "Oura + daily notes",
    sourceDetail: "7 complete nights from Oura and 6 of 7 morning check-ins.",
    range: "Apr 22–May 12, 2026",
    confidence: "Moderate confidence",
    confidenceDetail: "The pattern is present across two sources, but only covers three weeks.",
    gap: "No morning check-in on May 8. Travel and schedule changes were not recorded.",
    nextStep: "Keep the current sleep window for another week and note morning symptoms before your June 2 appointment."
  },
  {
    id: "headache",
    date: "May 10",
    eyebrow: "Symptom notes",
    title: "Morning headache notes were less frequent",
    summary: "You recorded 1 morning headache in the last 7 days, compared with 4 across the prior 14 days.",
    interpretation: "The frequency of recorded morning headaches decreased. Notes do not measure severity consistently, so this observation should not be used to judge whether a condition improved.",
    source: "Daily check-ins",
    sourceDetail: "20 check-ins across 21 days, with plain-language symptom notes.",
    range: "Apr 22–May 12, 2026",
    confidence: "Moderate confidence",
    confidenceDetail: "Check-in coverage is high, but symptom severity was only recorded on 5 days.",
    gap: "One missing check-in and inconsistent severity descriptions.",
    nextStep: "Add a 1–5 severity note if a headache returns, and seek clinical care if symptoms are new, severe, or concerning."
  },
  {
    id: "activity",
    date: "May 7",
    eyebrow: "Activity context",
    title: "Evening walks returned to your usual range",
    summary: "You took 4 evening walks this week after recording 1 during the previous week.",
    interpretation: "Your walking routine moved closer to your four-week pattern. The data does not show whether activity affected sleep or symptoms.",
    source: "Apple Health",
    sourceDetail: "Walking activity imported from 6 of 7 days; May 9 arrived 18 hours late.",
    range: "Apr 15–May 12, 2026",
    confidence: "High confidence in activity count",
    confidenceDetail: "Device coverage is strong for the selected range. Context and intent remain unknown.",
    gap: "Indoor activity and activities without your phone may be absent.",
    nextStep: "No change is needed. Continue only if walking feels appropriate for you."
  }
];

const faqItems = [
  {
    question: "Does Arcwell diagnose health conditions?",
    answer: "No. Arcwell organizes wellness data, describes non-diagnostic patterns, and helps you prepare questions for a licensed clinician. It does not diagnose, treat, prevent, or monitor emergencies."
  },
  {
    question: "What happens when data is missing?",
    answer: "Arcwell names the missing period, lowers confidence when appropriate, and can withhold an interpretation when the available evidence is too limited. You can inspect freshness and gaps before acting."
  },
  {
    question: "Can I control what the AI can use?",
    answer: "Yes. Connected sources, note categories, care-partner access, export, and deletion controls remain visible in the product. A production service would also require complete privacy and security review."
  },
  {
    question: "Can I share a brief with my clinician?",
    answer: "You can prepare a concise summary with your selected observations, sources, date ranges, open questions, and Arcwell’s limitations. You review it before copying or exporting it."
  },
  {
    question: "Is this an emergency monitoring service?",
    answer: "No. Arcwell does not watch for emergencies or contact emergency services. If you think you may be experiencing an emergency, call 911 or your local emergency number now."
  }
];

const summaryText = `ARCWELL APPOINTMENT BRIEF — DEMO DATA
Prepared for June 2, 2026

Recent observation
Sleep timing became more consistent from Apr 22–May 12. Bedtime variation was 38 minutes this week, compared with 1 hour 24 minutes in the prior two weeks.

Related note
One morning headache was recorded in the last 7 days, compared with four across the prior 14 days. Symptom severity was not recorded consistently.

Sources
Oura: 7 complete nights in the latest week
Daily check-ins: 20 of 21 days
Apple Health: 6 of 7 recent days

Questions to discuss
1. Is the change in morning headache frequency clinically meaningful?
2. What symptom details should I track before the next visit?
3. Could any current medication timing be relevant?

Boundary
This AI-generated wellness summary is not a diagnosis, treatment recommendation, or emergency assessment. Review it for accuracy before sharing.`;

function ArcwellMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`et-logo ${compact ? "et-logo--compact" : ""}`} aria-label="Arcwell">
      <span className="et-logo__mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="et-logo__word">Arcwell</span>
    </span>
  );
}

function DemoLabel() {
  return <span className="et-demo-label">Fictional demo data</span>;
}

function SourceLabel({ children }: { children: string }) {
  return (
    <span className="et-source-label">
      <Link2 size={12} aria-hidden="true" />
      {children}
    </span>
  );
}

function ThreadSignal({ compact = false }: { compact?: boolean }) {
  return (
    <svg className={`et-thread-signal ${compact ? "et-thread-signal--compact" : ""}`} viewBox="0 0 620 190" role="img" aria-label="A line connecting sleep, symptom, activity, and care observations over time">
      <path className="et-signal-grid" d="M20 34H600M20 95H600M20 156H600" />
      <path className="et-signal-line et-signal-line--back" d="M20 130 C66 130 76 82 122 84 S185 126 224 112 S276 51 320 67 S383 119 426 94 S480 56 514 72 S558 124 600 90" />
      <path className="et-signal-line" d="M20 119 C62 112 84 67 126 77 S179 119 226 102 S278 42 323 58 S383 111 428 84 S483 46 516 62 S560 112 600 79" />
      <g className="et-signal-dot et-signal-dot--forest">
        <circle cx="126" cy="77" r="7" />
        <text x="126" y="52">sleep</text>
      </g>
      <g className="et-signal-dot et-signal-dot--coral">
        <circle cx="323" cy="58" r="7" />
        <text x="323" y="31">note</text>
      </g>
      <g className="et-signal-dot et-signal-dot--forest">
        <circle cx="516" cy="62" r="7" />
        <text x="516" y="36">care</text>
      </g>
      <text className="et-signal-date" x="20" y="181">APR 22</text>
      <text className="et-signal-date" x="546" y="181">MAY 12</text>
    </svg>
  );
}

function ObservationIcon({ id, size = 18 }: { id: ObservationId; size?: number }) {
  if (id === "sleep") return <Moon size={size} aria-hidden="true" />;
  if (id === "headache") return <NotebookPen size={size} aria-hidden="true" />;
  return <Activity size={size} aria-hidden="true" />;
}

export function EvidenceThreadMarketing({ onOpenDashboard, onOpenMarketing }: CandidateProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="et-root et-marketing">
      <header className="et-marketing-header">
        <div className="et-container et-marketing-header__inner">
          <button className="et-logo-button" type="button" onClick={onOpenMarketing} aria-label="Arcwell home">
            <ArcwellMark />
          </button>
          <button className="et-mobile-menu" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="et-marketing-nav">
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="et-sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span>
          </button>
          <nav id="et-marketing-nav" className={`et-marketing-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <a href="#how-it-works" onClick={closeMenu}>How it works</a>
            <a href="#safety" onClick={closeMenu}>Safety & privacy</a>
            <a href="#pricing" onClick={closeMenu}>Pricing</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <button className="et-nav-signin" type="button" onClick={onOpenDashboard}>View demo</button>
            <button className="et-button et-button--small" type="button" onClick={onOpenDashboard}>Open dashboard</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="et-hero">
          <div className="et-container et-hero__grid">
            <div className="et-hero__copy">
              <div className="et-kicker"><span /> Health context, with its evidence attached</div>
              <h1>Your health data has a history. See the thread.</h1>
              <p className="et-hero__lead">Arcwell connects wearable data, symptom notes, medication context, and appointments into one inspectable weekly brief. Every observation shows what supports it, what is missing, and what to do next.</p>
              <div className="et-hero__actions">
                <button className="et-button et-button--primary" type="button" onClick={onOpenDashboard}>
                  Explore the demo <ArrowRight size={17} aria-hidden="true" />
                </button>
                <a className="et-text-link" href="#how-it-works">Follow an evidence thread <ChevronDown size={16} aria-hidden="true" /></a>
              </div>
              <p className="et-boundary-line"><ShieldCheck size={17} aria-hidden="true" /> Non-diagnostic wellness context. Not emergency monitoring or medical advice.</p>
            </div>

            <div className="et-hero-preview" aria-label="Arcwell weekly brief preview">
              <div className="et-preview-heading">
                <div>
                  <DemoLabel />
                  <p>Weekly brief · May 6–12</p>
                </div>
                <span className="et-preview-avatar">MR</span>
              </div>
              <h2>A steadier sleep schedule appeared alongside fewer morning headache notes.</h2>
              <p className="et-preview-caution"><Info size={15} aria-hidden="true" /> This describes an association in recent data. It does not identify a cause or condition.</p>
              <ThreadSignal compact />
              <div className="et-preview-ledger">
                <div><span>Observation</span><strong>38 min bedtime variation</strong></div>
                <div><span>Evidence</span><strong>Oura + 6 check-ins</strong></div>
                <div><span>Confidence</span><strong>Moderate · 3 weeks</strong></div>
              </div>
              <button className="et-evidence-button" type="button" onClick={onOpenDashboard}>
                Inspect the evidence <ChevronRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="et-hero-rule" aria-hidden="true"><span>wearable</span><span>notes</span><span>medications</span><span>appointments</span></div>
        </section>

        <section className="et-section et-mechanism" id="how-it-works">
          <div className="et-container">
            <div className="et-section-heading et-section-heading--split">
              <div>
                <span className="et-section-number">01 / The mechanism</span>
                <h2>From scattered signals to one grounded account.</h2>
              </div>
              <p>Arcwell does not collapse your health into a score. It keeps each observation connected to its date range, original source, uncertainty, and an appropriate next step.</p>
            </div>

            <ol className="et-mechanism-thread">
              <li>
                <div className="et-thread-index">1</div>
                <div className="et-mechanism-copy">
                  <span className="et-overline">Observe</span>
                  <h3>Bring the timeline together</h3>
                  <p>Connect a wearable and add short notes about symptoms, medication timing, or context. You decide which sources the product may use.</p>
                </div>
                <div className="et-mechanism-example">
                  <span>May 6 · 7:12 am</span>
                  <Moon size={20} aria-hidden="true" />
                  <strong>Sleep ended</strong>
                  <small>7h 41m · Oura</small>
                </div>
              </li>
              <li>
                <div className="et-thread-index">2</div>
                <div className="et-mechanism-copy">
                  <span className="et-overline">Connect</span>
                  <h3>Read the interpretation with its limits</h3>
                  <p>Arcwell describes a recent pattern only when the sources support one. Missing days and conflicting signals remain visible.</p>
                </div>
                <div className="et-mechanism-example et-mechanism-example--coral">
                  <span>Apr 22–May 12</span>
                  <Activity size={20} aria-hidden="true" />
                  <strong>Timing grew steadier</strong>
                  <small>Moderate confidence · 1 gap</small>
                </div>
              </li>
              <li>
                <div className="et-thread-index">3</div>
                <div className="et-mechanism-copy">
                  <span className="et-overline">Prepare</span>
                  <h3>Choose one useful next step</h3>
                  <p>Save a tracking step, dismiss what is not useful, or prepare a concise question and evidence summary for your clinician.</p>
                </div>
                <div className="et-mechanism-example">
                  <span>Next appointment · Jun 2</span>
                  <MessageSquareText size={20} aria-hidden="true" />
                  <strong>3 questions prepared</strong>
                  <small>Reviewed by you before sharing</small>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="et-section et-proof-section">
          <div className="et-container et-proof-grid">
            <div className="et-proof-copy">
              <span className="et-section-number">02 / Evidence stays attached</span>
              <h2>“Why am I seeing this?” has a specific answer.</h2>
              <p>Open any observation to inspect the underlying source coverage, time window, confidence, and data gaps. The language distinguishes what Arcwell observed from what it inferred.</p>
              <ul className="et-check-list">
                <li><Check size={17} aria-hidden="true" /> Original source and freshness</li>
                <li><Check size={17} aria-hidden="true" /> Exact comparison period</li>
                <li><Check size={17} aria-hidden="true" /> Plain-language confidence limit</li>
                <li><Check size={17} aria-hidden="true" /> Missing or delayed data</li>
              </ul>
              <button className="et-text-button" type="button" onClick={onOpenDashboard}>Open this evidence in the demo <ArrowRight size={16} aria-hidden="true" /></button>
            </div>
            <div className="et-evidence-sheet">
              <div className="et-evidence-sheet__header">
                <div>
                  <span className="et-overline">Selected observation</span>
                  <h3>Sleep timing became more consistent</h3>
                </div>
                <span className="et-confidence-mark">Moderate confidence</span>
              </div>
              <dl className="et-evidence-definition">
                <div><dt>Observed</dt><dd>Bedtime varied by 38 minutes this week, down from 1h 24m.</dd></div>
                <div><dt>Sources</dt><dd><SourceLabel>Oura</SourceLabel> <SourceLabel>Daily notes</SourceLabel></dd></div>
                <div><dt>Date range</dt><dd>Apr 22–May 12, 2026</dd></div>
                <div><dt>What is missing</dt><dd>No morning check-in on May 8. Travel context was not recorded.</dd></div>
                <div><dt>Safe next step</dt><dd>Keep the same sleep window for another week and discuss persistent symptoms with a clinician.</dd></div>
              </dl>
              <p className="et-sheet-boundary"><CircleAlert size={16} aria-hidden="true" /> Association only. Arcwell has not determined a cause.</p>
            </div>
          </div>
        </section>

        <section className="et-section et-safety" id="safety">
          <div className="et-container">
            <div className="et-section-heading et-section-heading--split">
              <div>
                <span className="et-section-number">03 / Safety & privacy</span>
                <h2>The boundary is part of the product.</h2>
              </div>
              <p>Health context can be useful only when its limits and controls are easy to find. Arcwell places them beside the insight, not behind legal copy.</p>
            </div>
            <div className="et-boundary-grid">
              <article>
                <ShieldCheck size={24} aria-hidden="true" />
                <span className="et-overline">Clear scope</span>
                <h3>Wellness context, not a clinical decision</h3>
                <p>Arcwell does not diagnose, treat, prescribe, or determine whether symptoms are safe. It helps you inspect your own data and prepare for a conversation.</p>
              </article>
              <article>
                <LockKeyhole size={24} aria-hidden="true" />
                <span className="et-overline">User control</span>
                <h3>See, disconnect, export, or delete</h3>
                <p>Review what each source contributes. Turn off AI use by source, remove care-partner access, export your data, or begin deletion from one control area.</p>
              </article>
              <article>
                <CircleAlert size={24} aria-hidden="true" />
                <span className="et-overline">Emergency boundary</span>
                <h3>Never wait for an Arcwell response</h3>
                <p>Arcwell is not emergency monitoring. If you think you may be experiencing an emergency, call 911 or your local emergency number immediately.</p>
              </article>
            </div>
            <div className="et-privacy-ledger">
              <div><span>Data sale</span><strong>Not part of the product model</strong></div>
              <div><span>AI permissions</span><strong>Controlled source by source</strong></div>
              <div><span>Care partner</span><strong>Explicit, revocable access</strong></div>
              <div><span>Prototype status</span><strong>Requires production review</strong></div>
            </div>
          </div>
        </section>

        <section className="et-section et-pricing" id="pricing">
          <div className="et-container">
            <div className="et-section-heading">
              <span className="et-section-number">04 / Illustrative pricing</span>
              <h2>Start with the thread you already have.</h2>
              <p>Pricing shown for this prototype is fictional and requires commercial validation.</p>
            </div>
            <div className="et-pricing-grid">
              <article className="et-price-option">
                <div className="et-price-option__heading">
                  <div><span className="et-overline">Personal</span><h3>Arcwell Thread</h3></div>
                  <p><strong>$12</strong> / month</p>
                </div>
                <p>For one adult connecting everyday wellness sources and preparing for appointments.</p>
                <ul>
                  <li><Check size={16} aria-hidden="true" /> Up to 3 connected sources</li>
                  <li><Check size={16} aria-hidden="true" /> Weekly evidence brief</li>
                  <li><Check size={16} aria-hidden="true" /> Clinician conversation summary</li>
                  <li><Check size={16} aria-hidden="true" /> Export and deletion controls</li>
                </ul>
                <button className="et-button et-button--outline" type="button" onClick={onOpenDashboard}>Try the fictional demo</button>
              </article>
              <article className="et-price-option et-price-option--accent">
                <div className="et-price-option__heading">
                  <div><span className="et-overline">Shared with permission</span><h3>Arcwell Together</h3></div>
                  <p><strong>$19</strong> / month</p>
                </div>
                <p>For an adult who wants one trusted care partner to help organize care preparation.</p>
                <ul>
                  <li><Check size={16} aria-hidden="true" /> Everything in Thread</li>
                  <li><Check size={16} aria-hidden="true" /> One permissioned care partner</li>
                  <li><Check size={16} aria-hidden="true" /> Shared care tasks</li>
                  <li><Check size={16} aria-hidden="true" /> Access history and revocation</li>
                </ul>
                <button className="et-button et-button--primary" type="button" onClick={onOpenDashboard}>Explore shared controls</button>
              </article>
            </div>
          </div>
        </section>

        <section className="et-section et-faq" id="faq">
          <div className="et-container et-faq-grid">
            <div className="et-faq-intro">
              <span className="et-section-number">05 / Questions</span>
              <h2>What Arcwell does, and what it does not.</h2>
              <p>Clear answers are part of safe product behavior. Contact support for product questions. Contact a licensed clinician for medical questions.</p>
            </div>
            <div className="et-faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <article className="et-faq-item" key={item.question}>
                    <h3>
                      <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`et-faq-answer-${index}`}>
                        {item.question}
                        <ChevronDown size={19} aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="et-faq-answer" id={`et-faq-answer-${index}`} hidden={!isOpen}>
                      <p>{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="et-conversion">
          <div className="et-container et-conversion__inner">
            <div>
              <span className="et-overline">A calmer way to prepare</span>
              <h2>See the evidence before you choose the next step.</h2>
            </div>
            <div>
              <p>Explore a fictional weekly brief and inspect exactly how each observation was formed.</p>
              <button className="et-button et-button--light" type="button" onClick={onOpenDashboard}>Open the dashboard demo <ArrowRight size={17} aria-hidden="true" /></button>
            </div>
          </div>
        </section>
      </main>

      <footer className="et-footer">
        <div className="et-container">
          <div className="et-footer__lead">
            <div>
              <ArcwellMark />
              <p>Grounded health context for the time between appointments.</p>
            </div>
            <div className="et-footer__boundary">
              <CircleAlert size={19} aria-hidden="true" />
              <p><strong>Arcwell is not emergency monitoring.</strong> For an emergency, call 911 or your local emergency number.</p>
            </div>
          </div>
          <div className="et-footer__links">
            <div><h3>Product</h3><a href="#how-it-works">How it works</a><button type="button" onClick={onOpenDashboard}>Dashboard demo</button><a href="#pricing">Pricing</a></div>
            <div><h3>Principles</h3><a href="#safety">Safety boundary</a><a href="#safety">Privacy controls</a><a href="#how-it-works">Evidence model</a></div>
            <div><h3>Resources</h3><a href="#faq">FAQ</a><a href="#faq">Support</a><a href="#faq">Accessibility</a></div>
            <div><h3>Prototype</h3><a href="#pricing">Fictional pricing</a><a href="#safety">Data policy</a><a href="#faq">Limitations</a></div>
          </div>
          <div className="et-footer__bottom">
            <p>© 2026 Arcwell prototype. All people and health data shown are fictional.</p>
            <div><a href="#safety">Privacy</a><a href="#safety">Terms</a><a href="#safety">Data controls</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function EvidenceThreadDashboard({ onOpenDashboard, onOpenMarketing }: CandidateProps) {
  const [activeObservation, setActiveObservation] = useState<ObservationId>("sleep");
  const [range, setRange] = useState<RangeId>("30d");
  const [savedNextStep, setSavedNextStep] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sourceControls, setSourceControls] = useState({ oura: true, apple: true, notes: true });
  const [carePartner, setCarePartner] = useState(true);
  const [taskDone, setTaskDone] = useState({ refill: false, notes: true });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const dialogTitleId = useId();
  const selectedObservation = observations.find((item) => item.id === activeObservation) ?? observations[0];

  useEffect(() => {
    if (!summaryOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSummaryOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [summaryOpen]);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = summaryText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
  };

  const downloadSummary = () => {
    const blob = new Blob([summaryText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "arcwell-demo-appointment-brief.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const downloadData = () => {
    const demoData = JSON.stringify({ label: "Fictional Arcwell demo data", observations, sourceControls, carePartner }, null, 2);
    const blob = new Blob([demoData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "arcwell-demo-export.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const rangeData: Record<RangeId, { label: string; sleep: string; symptom: string; points: string; ticks: string[] }> = {
    "7d": { label: "May 6–12", sleep: "7h 34m", symptom: "1 of 7 days", points: "0,57 54,42 108,49 162,30 216,37 270,24 324,29 378,20 432,28 486,17 540,22", ticks: ["May 6", "May 9", "May 12"] },
    "30d": { label: "Apr 13–May 12", sleep: "7h 18m", symptom: "5 of 29 notes", points: "0,42 45,55 90,47 135,64 180,51 225,58 270,35 315,46 360,31 405,37 450,22 495,28 540,19", ticks: ["Apr 13", "Apr 27", "May 12"] },
    "90d": { label: "Feb 12–May 12", sleep: "7h 11m", symptom: "14 of 81 notes", points: "0,51 45,43 90,58 135,39 180,61 225,49 270,57 315,40 360,53 405,34 450,42 495,29 540,24", ticks: ["Feb 12", "Mar 28", "May 12"] }
  };

  return (
    <div className="et-root et-dashboard">
      <header className="et-app-mobile-header">
        <button className="et-logo-button" type="button" onClick={onOpenDashboard} aria-label="Arcwell dashboard home"><ArcwellMark compact /></button>
        <div className="et-app-mobile-header__actions">
          <DemoLabel />
          <button className="et-icon-button" type="button" onClick={() => setMobileNavOpen((value) => !value)} aria-expanded={mobileNavOpen} aria-controls="et-app-mobile-nav">
            {mobileNavOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            <span className="et-sr-only">{mobileNavOpen ? "Close dashboard navigation" : "Open dashboard navigation"}</span>
          </button>
        </div>
      </header>

      <div className="et-app-shell">
        <aside className="et-sidebar">
          <button className="et-logo-button" type="button" onClick={onOpenDashboard} aria-label="Arcwell dashboard home"><ArcwellMark /></button>
          <nav className="et-sidebar-nav" aria-label="Dashboard navigation">
            <a className="is-active" href="#weekly-brief"><Home size={18} aria-hidden="true" /> Today</a>
            <a href="#health-thread"><Activity size={18} aria-hidden="true" /> Health thread</a>
            <a href="#appointments"><CalendarDays size={18} aria-hidden="true" /> Appointments</a>
            <a href="#care-tasks"><Check size={18} aria-hidden="true" /> Care tasks <span>2</span></a>
            <a href="#sources"><Database size={18} aria-hidden="true" /> Sources</a>
          </nav>
          <div className="et-sidebar__lower">
            <nav className="et-sidebar-nav" aria-label="Account navigation">
              <a href="#privacy"><LockKeyhole size={18} aria-hidden="true" /> Privacy & data</a>
              <a href="#support-boundary"><HelpCircle size={18} aria-hidden="true" /> Help & safety</a>
              <button type="button" onClick={onOpenMarketing}><ArrowRight size={18} aria-hidden="true" /> View public site</button>
            </nav>
            <div className="et-profile">
              <span>MR</span>
              <div><strong>Maya R.</strong><small>Demo profile</small></div>
              <Settings2 size={17} aria-hidden="true" />
            </div>
          </div>
        </aside>

        <nav id="et-app-mobile-nav" className={`et-app-mobile-nav ${mobileNavOpen ? "is-open" : ""}`} aria-label="Mobile dashboard navigation">
          <a href="#weekly-brief" onClick={() => setMobileNavOpen(false)}><Home size={17} aria-hidden="true" /> Today</a>
          <a href="#health-thread" onClick={() => setMobileNavOpen(false)}><Activity size={17} aria-hidden="true" /> Thread</a>
          <a href="#appointments" onClick={() => setMobileNavOpen(false)}><CalendarDays size={17} aria-hidden="true" /> Care</a>
          <a href="#privacy" onClick={() => setMobileNavOpen(false)}><LockKeyhole size={17} aria-hidden="true" /> Privacy</a>
          <button type="button" onClick={onOpenMarketing}><ArrowRight size={17} aria-hidden="true" /> Public site</button>
        </nav>

        <main className="et-app-main">
          <header className="et-dashboard-heading">
            <div>
              <div className="et-dashboard-heading__meta"><DemoLabel /><span>Last refreshed May 13 at 7:42 am</span></div>
              <h1>Good morning, Maya.</h1>
              <p>Here is the clearest thread in your recent data.</p>
            </div>
            <div className="et-dashboard-heading__actions">
              <button className="et-icon-button" type="button" aria-label="Refresh demo data"><RefreshCw size={18} aria-hidden="true" /></button>
              <button className="et-button et-button--dark" type="button" onClick={() => setSummaryOpen(true)}><FileText size={17} aria-hidden="true" /> Prepare appointment</button>
            </div>
          </header>

          <section className="et-weekly-brief" id="weekly-brief" aria-labelledby="weekly-brief-title">
            <div className="et-weekly-brief__label">
              <span>Weekly AI brief</span>
              <span>May 6–12</span>
            </div>
            <div className="et-weekly-brief__content">
              <div className="et-weekly-brief__main">
                <div className="et-brief-icon"><HeartPulse size={25} aria-hidden="true" /></div>
                <div>
                  <h2 id="weekly-brief-title">Your sleep timing became steadier while morning headache notes became less frequent.</h2>
                  <p>Bedtime varied by 38 minutes this week, compared with 1 hour 24 minutes in the prior two weeks. You recorded one morning headache this week.</p>
                  <p className="et-brief-limit"><Info size={15} aria-hidden="true" /> These changes occurred together in your recent data. Arcwell cannot determine whether one caused the other.</p>
                </div>
              </div>
              <div className="et-brief-actions">
                <button className="et-button et-button--primary" type="button" onClick={() => {
                  setActiveObservation("sleep");
                  document.getElementById("health-thread")?.scrollIntoView({ behavior: "smooth" });
                }}>Inspect evidence <ArrowRight size={16} aria-hidden="true" /></button>
                <button className={`et-save-step ${savedNextStep ? "is-saved" : ""}`} type="button" onClick={() => setSavedNextStep((value) => !value)} aria-pressed={savedNextStep}>
                  {savedNextStep ? <Check size={17} aria-hidden="true" /> : <NotebookPen size={17} aria-hidden="true" />}
                  {savedNextStep ? "Next step saved" : "Save next step"}
                </button>
              </div>
            </div>
            <div className="et-brief-source-row">
              <span>Built from</span>
              <SourceLabel>Oura · 7 nights</SourceLabel>
              <SourceLabel>Daily notes · 6 of 7</SourceLabel>
              <span className="et-confidence-mark">Moderate confidence</span>
            </div>
          </section>

          {savedNextStep && (
            <div className="et-saved-notice" role="status">
              <Check size={18} aria-hidden="true" />
              <div><strong>Next step saved</strong><span>Keep the current sleep window for one more week and add a morning note.</span></div>
              <button type="button" onClick={() => setSavedNextStep(false)}>Undo</button>
            </div>
          )}

          <div className="et-dashboard-columns">
            <div className="et-primary-column">
              <section className="et-thread-section" id="health-thread" aria-labelledby="thread-title">
                <div className="et-module-heading">
                  <div><span className="et-overline">Longitudinal health thread</span><h2 id="thread-title">What changed, with evidence attached</h2></div>
                  <span className="et-module-heading__date">Apr 15–May 13</span>
                </div>
                <div className="et-thread-workspace">
                  <div className="et-observation-list" role="group" aria-label="Recent observations">
                    {observations.map((observation) => {
                      const selected = activeObservation === observation.id;
                      return (
                        <button className={`et-observation ${selected ? "is-selected" : ""}`} type="button" onClick={() => setActiveObservation(observation.id)} aria-pressed={selected} key={observation.id}>
                          <span className="et-observation__date">{observation.date}</span>
                          <span className="et-observation__node"><ObservationIcon id={observation.id} size={16} /></span>
                          <span className="et-observation__copy"><small>{observation.eyebrow}</small><strong>{observation.title}</strong><span>{observation.summary}</span></span>
                          <ChevronRight className="et-observation__chevron" size={18} aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>

                  <article className="et-inspection-panel" aria-live="polite">
                    <div className="et-inspection-panel__heading">
                      <span className="et-inspection-icon"><ObservationIcon id={selectedObservation.id} size={20} /></span>
                      <div><span className="et-overline">Evidence inspection</span><h3>{selectedObservation.title}</h3></div>
                    </div>
                    <div className="et-inspection-observed">
                      <span>What Arcwell observed</span>
                      <p>{selectedObservation.summary}</p>
                    </div>
                    <div className="et-inspection-interpretation">
                      <span>What Arcwell inferred</span>
                      <p>{selectedObservation.interpretation}</p>
                    </div>
                    <dl className="et-evidence-grid">
                      <div><dt><Database size={14} aria-hidden="true" /> Source</dt><dd>{selectedObservation.source}<small>{selectedObservation.sourceDetail}</small></dd></div>
                      <div><dt><CalendarDays size={14} aria-hidden="true" /> Date range</dt><dd>{selectedObservation.range}</dd></div>
                      <div><dt><SlidersHorizontal size={14} aria-hidden="true" /> Confidence</dt><dd>{selectedObservation.confidence}<small>{selectedObservation.confidenceDetail}</small></dd></div>
                      <div><dt><CircleAlert size={14} aria-hidden="true" /> Data gap</dt><dd>{selectedObservation.gap}</dd></div>
                    </dl>
                    <div className="et-inspection-next">
                      <div><span>Appropriate next step</span><p>{selectedObservation.nextStep}</p></div>
                      <button type="button" onClick={() => setSavedNextStep(true)}>{savedNextStep ? <Check size={17} aria-hidden="true" /> : <NotebookPen size={17} aria-hidden="true" />}{savedNextStep ? "Saved" : "Save"}</button>
                    </div>
                  </article>
                </div>
              </section>

              <section className="et-trends-section" aria-labelledby="trends-title">
                <div className="et-module-heading et-module-heading--range">
                  <div><span className="et-overline">Health trends</span><h2 id="trends-title">Sleep and symptom notes over time</h2></div>
                  <div className="et-range-control" aria-label="Trend time range">
                    {(["7d", "30d", "90d"] as RangeId[]).map((item) => (
                      <button type="button" className={range === item ? "is-active" : ""} onClick={() => setRange(item)} aria-pressed={range === item} key={item}>{item}</button>
                    ))}
                  </div>
                </div>
                <div className="et-trend-summary">
                  <div><span>Average sleep duration</span><strong>{rangeData[range].sleep}</strong><small>{rangeData[range].label}</small></div>
                  <div><span>Morning headache notes</span><strong>{rangeData[range].symptom}</strong><small>Self-entered, not a clinical measure</small></div>
                </div>
                <div className="et-chart-wrap">
                  <div className="et-chart-labels" aria-hidden="true"><span>8h</span><span>7h</span><span>6h</span></div>
                  <svg className="et-trend-chart" viewBox="0 0 540 94" role="img" aria-label={`Sleep duration trend for ${rangeData[range].label}`}>
                    <path className="et-chart-grid" d="M0 18H540M0 47H540M0 76H540" />
                    <polyline className="et-chart-line" points={rangeData[range].points} />
                    <line className="et-chart-note" x1="450" x2="450" y1="10" y2="82" />
                    <circle className="et-chart-point" cx="450" cy={range === "7d" ? "22" : range === "30d" ? "22" : "42"} r="5" />
                  </svg>
                  <div className="et-chart-ticks">{rangeData[range].ticks.map((tick) => <span key={tick}>{tick}</span>)}</div>
                </div>
                <p className="et-chart-key"><span className="et-chart-key__line" /> Sleep duration <span className="et-chart-key__note" /> Symptom note recorded</p>
              </section>
            </div>

            <aside className="et-care-column" aria-label="Care preparation and source status">
              <section className="et-appointment-panel" id="appointments" aria-labelledby="appointment-title">
                <div className="et-care-panel-heading"><span><CalendarDays size={18} aria-hidden="true" /> Next appointment</span><small>In 20 days</small></div>
                <p className="et-appointment-date">JUN <strong>02</strong></p>
                <h2 id="appointment-title">Primary care check-in</h2>
                <p>Tuesday at 10:30 am · Dr. Lena Ortiz</p>
                <div className="et-appointment-progress"><span><Check size={14} aria-hidden="true" /> 3 observations selected</span><span>2 questions drafted</span></div>
                <button className="et-button et-button--dark et-button--full" type="button" onClick={() => setSummaryOpen(true)}><FileText size={17} aria-hidden="true" /> Review clinician summary</button>
              </section>

              <section className="et-care-tasks" id="care-tasks" aria-labelledby="tasks-title">
                <div className="et-care-panel-heading"><h2 id="tasks-title">Care tasks</h2><span>2 this week</span></div>
                <label className="et-task-row">
                  <input type="checkbox" checked={taskDone.refill} onChange={(event) => setTaskDone((current) => ({ ...current, refill: event.target.checked }))} />
                  <span><strong>Request vitamin D refill</strong><small>Before Friday · self-entered</small></span>
                  <Pill size={17} aria-hidden="true" />
                </label>
                <label className="et-task-row">
                  <input type="checkbox" checked={taskDone.notes} onChange={(event) => setTaskDone((current) => ({ ...current, notes: event.target.checked }))} />
                  <span><strong>Add headache severity to notes</strong><small>Completed May 12</small></span>
                  <NotebookPen size={17} aria-hidden="true" />
                </label>
              </section>

              <section className="et-sources-panel" id="sources" aria-labelledby="sources-title">
                <div className="et-care-panel-heading"><h2 id="sources-title">Source freshness</h2><button type="button" onClick={() => document.getElementById("privacy")?.scrollIntoView({ behavior: "smooth" })}>Manage</button></div>
                <div className="et-source-status">
                  <span className="et-source-status__icon"><Moon size={16} aria-hidden="true" /></span>
                  <div><strong>Oura</strong><small>Synced 18 min ago · complete</small></div>
                  <span className="et-status-text et-status-text--good">Current</span>
                </div>
                <div className="et-source-status">
                  <span className="et-source-status__icon"><Watch size={16} aria-hidden="true" /></span>
                  <div><strong>Apple Health</strong><small>Synced yesterday · May 9 delayed</small></div>
                  <span className="et-status-text et-status-text--gap">1 gap</span>
                </div>
                <div className="et-source-status">
                  <span className="et-source-status__icon"><NotebookPen size={16} aria-hidden="true" /></span>
                  <div><strong>Daily notes</strong><small>Updated this morning · 6 of 7 days</small></div>
                  <span className="et-status-text et-status-text--gap">1 gap</span>
                </div>
                <p className="et-data-gap-note"><CircleAlert size={15} aria-hidden="true" /> Delayed Apple Health data was excluded from the current brief until it arrived.</p>
              </section>

              <section className="et-mini-boundary" id="support-boundary">
                <ShieldCheck size={19} aria-hidden="true" />
                <div><strong>Arcwell is non-diagnostic</strong><p>For medical questions, contact a licensed clinician. For an emergency, call 911 or your local emergency number.</p></div>
              </section>
            </aside>
          </div>

          <section className="et-privacy-section" id="privacy" aria-labelledby="privacy-title">
            <div className="et-privacy-heading">
              <div><span className="et-overline">Privacy & data controls</span><h2 id="privacy-title">You choose what joins your thread.</h2></div>
              <p>Turning off a source removes it from future AI briefs. Existing demo observations remain visible until data is deleted.</p>
            </div>
            <div className="et-control-table">
              <div className="et-control-row et-control-row--header"><span>Source or access</span><span>Last activity</span><span>Used by AI brief</span></div>
              <div className="et-control-row">
                <span><Moon size={17} aria-hidden="true" /><span><strong>Oura</strong><small>Sleep and recovery data</small></span></span>
                <span>18 minutes ago</span>
                <button className={`et-switch ${sourceControls.oura ? "is-on" : ""}`} type="button" role="switch" aria-checked={sourceControls.oura} onClick={() => setSourceControls((current) => ({ ...current, oura: !current.oura }))}><span />{sourceControls.oura ? "On" : "Off"}</button>
              </div>
              <div className="et-control-row">
                <span><Watch size={17} aria-hidden="true" /><span><strong>Apple Health</strong><small>Activity and walking data</small></span></span>
                <span>Yesterday</span>
                <button className={`et-switch ${sourceControls.apple ? "is-on" : ""}`} type="button" role="switch" aria-checked={sourceControls.apple} onClick={() => setSourceControls((current) => ({ ...current, apple: !current.apple }))}><span />{sourceControls.apple ? "On" : "Off"}</button>
              </div>
              <div className="et-control-row">
                <span><NotebookPen size={17} aria-hidden="true" /><span><strong>Daily notes</strong><small>Symptoms and context</small></span></span>
                <span>This morning</span>
                <button className={`et-switch ${sourceControls.notes ? "is-on" : ""}`} type="button" role="switch" aria-checked={sourceControls.notes} onClick={() => setSourceControls((current) => ({ ...current, notes: !current.notes }))}><span />{sourceControls.notes ? "On" : "Off"}</button>
              </div>
              <div className="et-control-row">
                <span><UsersRound size={17} aria-hidden="true" /><span><strong>Care partner · Jordan R.</strong><small>Can view appointment brief and tasks only</small></span></span>
                <span>Viewed May 8</span>
                <button className={`et-switch ${carePartner ? "is-on" : ""}`} type="button" role="switch" aria-checked={carePartner} onClick={() => setCarePartner((current) => !current)}><span />{carePartner ? "Allowed" : "Revoked"}</button>
              </div>
            </div>
            <div className="et-data-actions">
              <button type="button" onClick={downloadData}><Download size={17} aria-hidden="true" /><span><strong>Export demo data</strong><small>Download sources, notes, and observations as JSON</small></span></button>
              <button type="button" onClick={() => setDeleteOpen((value) => !value)} aria-expanded={deleteOpen} aria-controls="et-delete-panel"><Trash2 size={17} aria-hidden="true" /><span><strong>Delete data</strong><small>Review what deletion would remove</small></span></button>
            </div>
            {deleteOpen && (
              <div className="et-delete-panel" id="et-delete-panel">
                <CircleAlert size={18} aria-hidden="true" />
                <div><strong>No data has been deleted.</strong><p>In a production service, this step would list retained records, explain timing, and require confirmation. This fictional demo does not send a deletion request.</p></div>
                <button type="button" onClick={() => setDeleteOpen(false)}>Close</button>
              </div>
            )}
          </section>

          <footer className="et-dashboard-footer">
            <p><strong>Demo and safety boundary:</strong> All people and health data shown are fictional. Arcwell does not provide a diagnosis, treatment, or emergency monitoring.</p>
            <p>If you think you may be experiencing an emergency, call <strong>911</strong> or your local emergency number now.</p>
          </footer>
        </main>
      </div>

      {summaryOpen && (
        <div className="et-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setSummaryOpen(false);
        }}>
          <section className="et-summary-modal" role="dialog" aria-modal="true" aria-labelledby={dialogTitleId}>
            <header className="et-summary-modal__header">
              <div><span className="et-overline">Clinician conversation brief</span><h2 id={dialogTitleId}>Prepare for June 2</h2><p>Review every detail before sharing. This is not a medical record or clinical recommendation.</p></div>
              <button className="et-icon-button" type="button" onClick={() => setSummaryOpen(false)} aria-label="Close clinician summary"><X size={20} aria-hidden="true" /></button>
            </header>
            <div className="et-summary-modal__body">
              <div className="et-summary-progress" aria-label="Summary preparation steps"><span className="is-complete"><Check size={14} aria-hidden="true" /> Select</span><span className="is-active">2 Review</span><span>3 Share</span></div>
              <div className="et-summary-sheet">
                <div className="et-summary-sheet__heading"><div><DemoLabel /><h3>Appointment brief</h3></div><span>Prepared May 13, 2026</span></div>
                <section><span className="et-summary-section-label">Recent observation</span><h4>Sleep timing became more consistent</h4><p>Bedtime varied by 38 minutes this week, compared with 1 hour 24 minutes in the prior two weeks.</p></section>
                <section><span className="et-summary-section-label">Related symptom note</span><p>One morning headache was recorded in the last 7 days, compared with four across the prior 14 days. Symptom severity was not recorded consistently.</p></section>
                <section className="et-summary-source-section"><span className="et-summary-section-label">Evidence included</span><div><SourceLabel>Oura · 7 nights</SourceLabel><SourceLabel>Notes · 20 of 21 days</SourceLabel><SourceLabel>Apple Health · 6 of 7 days</SourceLabel></div></section>
                <section><span className="et-summary-section-label">Questions to discuss</span><ol><li>Is the change in morning headache frequency clinically meaningful?</li><li>What symptom details should I track before the next visit?</li><li>Could any current medication timing be relevant?</li></ol></section>
                <p className="et-summary-boundary"><CircleAlert size={16} aria-hidden="true" /> AI-generated wellness summary. Not a diagnosis, treatment recommendation, or emergency assessment.</p>
              </div>
            </div>
            <footer className="et-summary-modal__footer">
              <p><LockKeyhole size={15} aria-hidden="true" /> Nothing is shared until you choose an action.</p>
              <div>
                <button className="et-button et-button--outline" type="button" onClick={copySummary}>{copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{copied ? "Copied" : "Copy text"}</button>
                <button className="et-button et-button--primary" type="button" onClick={downloadSummary}><Download size={16} aria-hidden="true" /> Export .txt</button>
              </div>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
