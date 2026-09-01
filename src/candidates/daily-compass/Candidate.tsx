import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clipboard,
  Clock3,
  Download,
  FileText,
  HeartPulse,
  HelpCircle,
  Home,
  Link2,
  LockKeyhole,
  Menu,
  MessageSquareText,
  Navigation,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  Trash2,
  Unplug,
  UserRound,
  Watch,
  X
} from "lucide-react";
import "./candidate.css";

type CandidateProps = {
  onOpenDashboard: () => void;
  onOpenMarketing: () => void;
};

type SourceId = "wearable" | "notes" | "calendar";

type CompassMarkProps = {
  compact?: boolean;
};

const weeklyBrief = {
  observation: "Your sleep timing was steadier on days when your evening walk ended before 8 pm.",
  source: "Garmin sleep and three check-in notes",
  range: "May 6–12, 2025",
  confidence: "Moderate",
  nextStep: "Try one earlier walk this week and notice whether winding down feels easier.",
  limit: "This is a pattern in limited demo data, not a diagnosis or treatment recommendation."
};

const faqs = [
  {
    question: "Does Arcwell diagnose health conditions?",
    answer:
      "No. Arcwell organizes your connected wellness data, describes non-diagnostic patterns, and helps you prepare questions. Diagnosis and treatment decisions belong with a licensed clinician."
  },
  {
    question: "What happens when data is missing?",
    answer:
      "The brief shows the missing dates, lowers or withholds confidence, and avoids a next step when the available data cannot support one. You can inspect freshness at any time."
  },
  {
    question: "Can Arcwell monitor an emergency?",
    answer:
      "No. Arcwell is not an emergency service and does not continuously monitor for urgent events. If you may be experiencing an emergency, call local emergency services now."
  },
  {
    question: "Can I remove my information?",
    answer:
      "Yes. Product controls let you disconnect a source, pause AI use, export your information, delete stored information, and review care-partner access."
  },
  {
    question: "Can I share a brief with my clinician?",
    answer:
      "Yes. You can create a concise summary with observations, source names, date ranges, questions, medications, and clear AI limitations before an appointment."
  }
];

function CompassMark({ compact = false }: CompassMarkProps) {
  return (
    <span className={`dc-logo-mark${compact ? " dc-logo-mark--compact" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img">
        <circle cx="24" cy="24" r="20" />
        <path d="M10 28c7-6 13-7 19-3 4 3 7 3 10 0" />
        <path d="m28 10-5 14 14-5" />
        <circle cx="23" cy="24" r="2.5" />
      </svg>
    </span>
  );
}

function Logo() {
  return (
    <span className="dc-logo">
      <CompassMark />
      <span>
        <strong>arcwell</strong>
        <small>daily compass</small>
      </span>
    </span>
  );
}

function DemoLabel() {
  return <span className="dc-demo-label">Fictional demo data</span>;
}

function HorizonArtwork() {
  return (
    <svg className="dc-horizon" viewBox="0 0 900 260" aria-hidden="true" preserveAspectRatio="none">
      <path className="dc-horizon__back" d="M0 171c116-53 224-60 326-20 91 35 159 28 237-13 117-62 224-57 337-10" />
      <path className="dc-horizon__front" d="M0 205c126-27 230-21 329 18 94 37 182 36 275-4 103-45 202-51 296-25" />
      <path className="dc-horizon__direction" d="M447 190V73m0 0-18 23m18-23 18 23" />
      <circle cx="447" cy="190" r="6" />
    </svg>
  );
}

function EvidenceFacts({ compact = false }: { compact?: boolean }) {
  return (
    <dl className={`dc-evidence-facts${compact ? " dc-evidence-facts--compact" : ""}`}>
      <div>
        <dt>Sources</dt>
        <dd>{weeklyBrief.source}</dd>
      </div>
      <div>
        <dt>Date range</dt>
        <dd>{weeklyBrief.range}</dd>
      </div>
      <div>
        <dt>Confidence</dt>
        <dd><span className="dc-confidence"><span />{weeklyBrief.confidence}</span></dd>
      </div>
      <div>
        <dt>Boundary</dt>
        <dd>{weeklyBrief.limit}</dd>
      </div>
    </dl>
  );
}

export function DailyCompassMarketing({ onOpenDashboard }: CandidateProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="dc-site dc-marketing">
      <header className="dc-marketing-header">
        <a className="dc-logo-link" href="#top" aria-label="Arcwell Daily Compass home">
          <Logo />
        </a>
        <nav className="dc-desktop-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#safety">Safety</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="dc-header-actions">
          <button className="dc-text-button dc-hide-mobile" type="button" onClick={onOpenDashboard}>Sign in</button>
          <button className="dc-button dc-button--dark dc-hide-mobile" type="button" onClick={onOpenDashboard}>
            View the demo <ArrowRight size={17} aria-hidden="true" />
          </button>
          <button
            className="dc-icon-button dc-mobile-menu-button"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            aria-controls="dc-mobile-nav"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="dc-mobile-menu" id="dc-mobile-nav" aria-label="Mobile navigation">
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <a href="#safety" onClick={() => setMobileMenuOpen(false)}>Safety</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <button className="dc-button dc-button--dark" type="button" onClick={onOpenDashboard}>View the demo</button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="dc-hero" aria-labelledby="dc-hero-title">
          <div className="dc-zone dc-zone--ochre" aria-hidden="true" />
          <div className="dc-zone dc-zone--lilac" aria-hidden="true" />
          <div className="dc-hero-copy">
            <div className="dc-eyebrow"><Navigation size={16} aria-hidden="true" /> A calmer way to read the week</div>
            <h1 id="dc-hero-title">One clear direction from all your health data.</h1>
            <p>
              Arcwell turns wearable signals, notes, medications, and appointments into one source-grounded weekly orientation and one optional next step.
            </p>
            <div className="dc-hero-actions">
              <button className="dc-button dc-button--dark dc-button--large" type="button" onClick={onOpenDashboard}>
                Explore the interactive demo <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a className="dc-button dc-button--quiet dc-button--large" href="#how-it-works">See how evidence works</a>
            </div>
            <p className="dc-boundary-line"><ShieldCheck size={17} aria-hidden="true" /> Non-diagnostic. Not for emergencies. Your sources and uncertainty stay visible.</p>
          </div>

          <div className="dc-hero-compass" aria-label="Preview of a fictional Arcwell weekly brief">
            <HorizonArtwork />
            <div className="dc-compass-orbit dc-compass-orbit--outer" aria-hidden="true" />
            <div className="dc-compass-orbit dc-compass-orbit--inner" aria-hidden="true" />
            <article className="dc-preview-brief">
              <div className="dc-preview-heading">
                <DemoLabel />
                <span>Week of May 12</span>
              </div>
              <div className="dc-direction-icon"><Navigation aria-hidden="true" /></div>
              <p className="dc-kicker">Your weekly orientation</p>
              <h2>A steadier evening rhythm may be taking shape.</h2>
              <p>{weeklyBrief.observation}</p>
              <button className="dc-inline-action" type="button" onClick={onOpenDashboard}>
                Inspect the evidence <ArrowRight size={16} aria-hidden="true" />
              </button>
              <div className="dc-preview-source">
                <span><Watch size={15} aria-hidden="true" /> {weeklyBrief.source}</span>
                <span>{weeklyBrief.confidence} confidence</span>
              </div>
            </article>
          </div>
        </section>

        <section className="dc-proof-strip" aria-label="Product principles">
          <p>Designed for calm, informed follow-through</p>
          <ul>
            <li><Check size={16} aria-hidden="true" /> Every insight names its source</li>
            <li><Check size={16} aria-hidden="true" /> Missing data stays visible</li>
            <li><Check size={16} aria-hidden="true" /> You choose the next step</li>
          </ul>
        </section>

        <section className="dc-mechanism" id="how-it-works" aria-labelledby="dc-mechanism-title">
          <div className="dc-section-heading dc-section-heading--center">
            <span className="dc-section-number">How it works</span>
            <h2 id="dc-mechanism-title">Orient first. Inspect before acting.</h2>
            <p>Arcwell keeps the weekly view focused without separating a suggestion from the evidence and limits behind it.</p>
          </div>
          <div className="dc-mechanism-path">
            <article className="dc-mechanism-step dc-mechanism-step--one">
              <span className="dc-step-index">01</span>
              <div className="dc-step-icon"><Link2 aria-hidden="true" /></div>
              <h3>Bring signals together</h3>
              <p>Connect a wearable, add short notes, and keep appointments and care tasks in one timeline.</p>
              <span className="dc-step-detail">You control each connection</span>
            </article>
            <svg className="dc-path-line" viewBox="0 0 180 70" aria-hidden="true"><path d="M4 50c62 0 92-41 172-41" /><path d="m164 3 12 6-8 11" /></svg>
            <article className="dc-mechanism-step dc-mechanism-step--two">
              <span className="dc-step-index">02</span>
              <div className="dc-step-icon"><Navigation aria-hidden="true" /></div>
              <h3>Read one orientation</h3>
              <p>See the most useful recent pattern, its confidence, date range, and any data gaps.</p>
              <span className="dc-step-detail">No opaque health score</span>
            </article>
            <svg className="dc-path-line dc-path-line--down" viewBox="0 0 180 70" aria-hidden="true"><path d="M4 9c62 0 92 41 172 41" /><path d="m165 38 11 12-12 6" /></svg>
            <article className="dc-mechanism-step dc-mechanism-step--three">
              <span className="dc-step-index">03</span>
              <div className="dc-step-icon"><MessageSquareText aria-hidden="true" /></div>
              <h3>Choose what follows</h3>
              <p>Save a small wellness step, dismiss it, or prepare a source-linked question for your clinician.</p>
              <span className="dc-step-detail">Suggestions remain optional</span>
            </article>
          </div>
        </section>

        <section className="dc-evidence-demo" aria-labelledby="dc-evidence-demo-title">
          <div className="dc-evidence-demo__copy">
            <span className="dc-section-number">The same data, fully inspectable</span>
            <h2 id="dc-evidence-demo-title">A conclusion should never outrun its sources.</h2>
            <p>
              Every Arcwell orientation keeps the observation separate from interpretation. Confidence reflects source coverage and consistency, not your health or performance.
            </p>
            <button className="dc-button dc-button--ink" type="button" onClick={onOpenDashboard}>
              Open the evidence view <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
          <article className="dc-evidence-sheet">
            <div className="dc-sheet-topline">
              <span>Weekly brief · Demo</span>
              <span className="dc-confidence"><span />{weeklyBrief.confidence} confidence</span>
            </div>
            <h3>{weeklyBrief.observation}</h3>
            <div className="dc-observation-line">
              <span className="dc-observation-marker" aria-hidden="true" />
              <div>
                <strong>Observed</strong>
                <p>Earlier walk finish on 3 of 4 nights with sleep-midpoint variation under 34 minutes.</p>
              </div>
            </div>
            <EvidenceFacts compact />
          </article>
        </section>

        <section className="dc-safety" id="safety" aria-labelledby="dc-safety-title">
          <div className="dc-safety-art" aria-hidden="true">
            <div className="dc-safety-ring"><ShieldCheck /></div>
            <svg viewBox="0 0 420 170"><path d="M3 127c77-57 135-63 208-14 70 47 131 42 206-32" /><circle cx="210" cy="113" r="5" /></svg>
          </div>
          <div className="dc-safety-copy">
            <span className="dc-section-number">A visible boundary, not fine print</span>
            <h2 id="dc-safety-title">Useful between appointments. Never a substitute for care.</h2>
            <div className="dc-boundary-list">
              <div>
                <HeartPulse aria-hidden="true" />
                <p><strong>Wellness context, not diagnosis</strong>Arcwell describes patterns and helps prepare questions. It does not diagnose, treat, or recommend medication changes.</p>
              </div>
              <div>
                <CircleAlert aria-hidden="true" />
                <p><strong>No emergency monitoring</strong>If symptoms could be urgent or life-threatening, call local emergency services. Do not wait for Arcwell.</p>
              </div>
              <div>
                <Stethoscope aria-hidden="true" />
                <p><strong>Clinicians make clinical decisions</strong>Use the source-linked summary to support a conversation with a qualified professional.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="dc-privacy" aria-labelledby="dc-privacy-title">
          <div className="dc-section-heading">
            <span className="dc-section-number">Privacy you can operate</span>
            <h2 id="dc-privacy-title">Your information stays under your direction.</h2>
          </div>
          <div className="dc-control-ledger">
            <article>
              <LockKeyhole aria-hidden="true" />
              <h3>Choose AI access</h3>
              <p>Pause a source from future AI briefs without removing its history.</p>
            </article>
            <article>
              <Download aria-hidden="true" />
              <h3>Export your data</h3>
              <p>Download connected records, notes, and generated summaries.</p>
            </article>
            <article>
              <UserRound aria-hidden="true" />
              <h3>Limit shared access</h3>
              <p>Review exactly what a care partner can see and revoke access.</p>
            </article>
            <article>
              <Trash2 aria-hidden="true" />
              <h3>Delete stored data</h3>
              <p>Start deletion from settings with a clear review step.</p>
            </article>
          </div>
          <p className="dc-privacy-note">This prototype demonstrates controls with fictional information. It does not claim a security or regulatory certification.</p>
        </section>

        <section className="dc-pricing" id="pricing" aria-labelledby="dc-pricing-title">
          <div className="dc-pricing-intro">
            <span className="dc-section-number">Simple illustrative pricing</span>
            <h2 id="dc-pricing-title">One plan for a more prepared week.</h2>
            <p>Start with a 30-day product trial. No annual commitment in this fictional pricing example.</p>
          </div>
          <article className="dc-price-plan">
            <div>
              <span className="dc-plan-name">Arcwell Personal</span>
              <p className="dc-price"><strong>$12</strong> / month</p>
              <p>Illustrative prototype price</p>
            </div>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Weekly source-grounded brief</li>
              <li><CheckCircle2 aria-hidden="true" /> Wearable and note connections</li>
              <li><CheckCircle2 aria-hidden="true" /> Clinician conversation summaries</li>
              <li><CheckCircle2 aria-hidden="true" /> Data export and source controls</li>
            </ul>
            <button className="dc-button dc-button--dark dc-button--large" type="button" onClick={onOpenDashboard}>
              Explore the demo <ArrowRight size={18} aria-hidden="true" />
            </button>
          </article>
        </section>

        <section className="dc-faq" id="faq" aria-labelledby="dc-faq-title">
          <div className="dc-faq-intro">
            <span className="dc-section-number">Questions, answered plainly</span>
            <h2 id="dc-faq-title">Before you connect anything.</h2>
            <p>Arcwell should earn understanding before asking for health data.</p>
          </div>
          <div className="dc-faq-list">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <article className="dc-faq-item" key={item.question}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`dc-faq-answer-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      {item.question}
                      <ChevronDown className={isOpen ? "is-open" : ""} aria-hidden="true" />
                    </button>
                  </h3>
                  {isOpen && <p id={`dc-faq-answer-${index}`}>{item.answer}</p>}
                </article>
              );
            })}
          </div>
        </section>

        <section className="dc-final-cta" aria-labelledby="dc-final-title">
          <HorizonArtwork />
          <CompassMark />
          <span className="dc-section-number">Take a look around</span>
          <h2 id="dc-final-title">Your week can be clear without becoming a score.</h2>
          <p>Explore a fully fictional dashboard and inspect exactly how an Arcwell brief is supported.</p>
          <button className="dc-button dc-button--dark dc-button--large" type="button" onClick={onOpenDashboard}>
            Open Daily Compass <ArrowRight size={18} aria-hidden="true" />
          </button>
        </section>
      </main>

      <footer className="dc-footer">
        <div className="dc-footer-main">
          <div className="dc-footer-brand">
            <Logo />
            <p>Source-grounded wellness context and clinician preparation for the space between appointments.</p>
            <p className="dc-footer-demo">Prototype experience · All health data shown is fictional</p>
          </div>
          <div>
            <h2>Product</h2>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
            <button type="button" onClick={onOpenDashboard}>Interactive demo</button>
          </div>
          <div>
            <h2>Trust</h2>
            <a href="#safety">Safety boundary</a>
            <a href="#safety">Privacy controls</a>
            <a href="#faq">Data questions</a>
          </div>
          <div>
            <h2>Company</h2>
            <a href="#top">About</a>
            <a href="#top">Accessibility</a>
            <a href="#top">Contact</a>
          </div>
        </div>
        <div className="dc-footer-bottom">
          <p>© 2025 Arcwell prototype. Not a medical device or emergency service.</p>
          <div><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Accessibility</a></div>
        </div>
      </footer>
    </div>
  );
}

function AppLogo() {
  return (
    <button className="dc-app-logo" type="button" aria-label="Return to Arcwell marketing site">
      <CompassMark compact />
      <span><strong>arcwell</strong><small>daily compass</small></span>
    </button>
  );
}

export function DailyCompassDashboard({ onOpenMarketing }: CandidateProps) {
  const [checkInAnswer, setCheckInAnswer] = useState<string | null>(null);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [nextStepState, setNextStepState] = useState<"idle" | "saved" | "dismissed">("idle");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryCopied, setSummaryCopied] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sourceConnected, setSourceConnected] = useState<Record<SourceId, boolean>>({
    wearable: true,
    notes: true,
    calendar: true
  });
  const [aiSourceUse, setAiSourceUse] = useState<Record<SourceId, boolean>>({
    wearable: true,
    notes: true,
    calendar: false
  });
  const [controlNotice, setControlNotice] = useState<string | null>(null);

  const clinicianSummary = `ARCWELL DEMO CLINICIAN SUMMARY\nDate range: ${weeklyBrief.range}\nObservation: ${weeklyBrief.observation}\nSources: ${weeklyBrief.source}\nConfidence: ${weeklyBrief.confidence}\nQuestion: Could evening activity timing be relevant to my sleep consistency?\nMedication list: Lisinopril 10 mg, self-entered demo data\nLimit: AI-generated wellness context, not a diagnosis or treatment recommendation.`;

  const copySummary = () => {
    if (navigator.clipboard) void navigator.clipboard.writeText(clinicianSummary);
    setSummaryCopied(true);
  };

  const toggleConnection = (source: SourceId) => {
    const nextConnected = !sourceConnected[source];
    setSourceConnected((current) => ({ ...current, [source]: nextConnected }));
    if (!nextConnected) setAiSourceUse((current) => ({ ...current, [source]: false }));
    setControlNotice(nextConnected ? "Demo source reconnected." : "Demo source disconnected. Future briefs will show the new data gap.");
  };

  const toggleAiUse = (source: SourceId) => {
    setAiSourceUse((current) => ({ ...current, [source]: !current[source] }));
    setControlNotice(aiSourceUse[source] ? "AI use paused for this demo source." : "AI use enabled for this demo source.");
  };

  return (
    <div className="dc-site dc-dashboard">
      <a className="dc-skip-link" href="#dc-dashboard-main">Skip to dashboard content</a>
      <aside className="dc-sidebar" aria-label="Dashboard navigation">
        <div onClick={onOpenMarketing}><AppLogo /></div>
        <nav>
          <a className="is-active" href="#today"><Home aria-hidden="true" /><span>Today</span></a>
          <a href="#trends"><Activity aria-hidden="true" /><span>Trends</span></a>
          <a href="#care"><CalendarDays aria-hidden="true" /><span>Care plan</span></a>
          <a href="#summary"><FileText aria-hidden="true" /><span>Summaries</span></a>
          <a href="#sources"><Link2 aria-hidden="true" /><span>Sources</span></a>
        </nav>
        <div className="dc-sidebar-bottom">
          <button type="button" onClick={() => document.getElementById("sources")?.scrollIntoView({ behavior: "smooth" })}>
            <SlidersHorizontal aria-hidden="true" /><span>Data controls</span>
          </button>
          <button type="button"><HelpCircle aria-hidden="true" /><span>Help & safety</span></button>
          <button className="dc-profile-button" type="button"><span>JD</span><span><strong>Jamie</strong><small>Demo account</small></span></button>
        </div>
      </aside>

      <header className="dc-mobile-app-header">
        <div onClick={onOpenMarketing}><AppLogo /></div>
        <div>
          <button className="dc-icon-button" type="button" aria-label="Notifications"><Bell aria-hidden="true" /></button>
          <button
            className="dc-icon-button"
            type="button"
            aria-label={mobileNavOpen ? "Close dashboard navigation" : "Open dashboard navigation"}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((current) => !current)}
          >
            {mobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {mobileNavOpen && (
          <nav aria-label="Mobile dashboard navigation">
            <a href="#today" onClick={() => setMobileNavOpen(false)}>Today</a>
            <a href="#trends" onClick={() => setMobileNavOpen(false)}>Trends</a>
            <a href="#care" onClick={() => setMobileNavOpen(false)}>Care plan</a>
            <a href="#summary" onClick={() => setMobileNavOpen(false)}>Summaries</a>
            <a href="#sources" onClick={() => setMobileNavOpen(false)}>Data controls</a>
            <button type="button" onClick={onOpenMarketing}>View marketing site</button>
          </nav>
        )}
      </header>

      <main className="dc-dashboard-main" id="dc-dashboard-main">
        <header className="dc-dashboard-topbar">
          <div>
            <DemoLabel />
            <span>Monday, May 12</span>
          </div>
          <div className="dc-topbar-actions">
            <button className="dc-icon-button" type="button" aria-label="View notifications"><Bell aria-hidden="true" /></button>
            <button className="dc-help-button" type="button"><HelpCircle aria-hidden="true" /> Help & safety</button>
          </div>
        </header>

        <section className="dc-today" id="today" aria-labelledby="dc-today-title">
          <div className="dc-today-heading">
            <p className="dc-kicker">Good morning, Jamie</p>
            <h1 id="dc-today-title">Here is your direction for the week.</h1>
            <p>One non-diagnostic pattern from your recent demo data, with evidence available before any action.</p>
          </div>

          <div className="dc-dashboard-compass">
            <div className="dc-dashboard-zone dc-dashboard-zone--ochre" aria-hidden="true" />
            <div className="dc-dashboard-zone dc-dashboard-zone--blue" aria-hidden="true" />
            <HorizonArtwork />
            <div className="dc-dashboard-brief">
              <div className="dc-brief-meta">
                <span><Navigation size={15} aria-hidden="true" /> Weekly AI brief</span>
                <span>{weeklyBrief.range}</span>
              </div>
              <h2>A steadier evening rhythm may be taking shape.</h2>
              <p className="dc-brief-observation">{weeklyBrief.observation}</p>
              <div className="dc-brief-evidence-summary">
                <span><Watch size={16} aria-hidden="true" /> {weeklyBrief.source}</span>
                <span className="dc-confidence"><span />{weeklyBrief.confidence} confidence</span>
              </div>
              <button className="dc-evidence-button" type="button" onClick={() => setEvidenceOpen(true)}>
                Inspect observation and evidence <ChevronRight size={18} aria-hidden="true" />
              </button>
              <p className="dc-insight-boundary"><ShieldCheck size={16} aria-hidden="true" /> {weeklyBrief.limit}</p>
            </div>

            <aside className="dc-next-step" aria-labelledby="dc-next-step-title">
              <span className="dc-kicker">One optional next step</span>
              <h3 id="dc-next-step-title">Try one earlier walk.</h3>
              <p>{weeklyBrief.nextStep}</p>
              {nextStepState === "idle" ? (
                <div className="dc-next-step-actions">
                  <button className="dc-button dc-button--dark" type="button" onClick={() => setNextStepState("saved")}>
                    <Check size={17} aria-hidden="true" /> Save for this week
                  </button>
                  <button className="dc-text-button" type="button" onClick={() => setNextStepState("dismissed")}>Not for me</button>
                </div>
              ) : (
                <div className="dc-action-status" role="status">
                  {nextStepState === "saved" ? <CheckCircle2 aria-hidden="true" /> : <X aria-hidden="true" />}
                  <p>
                    <strong>{nextStepState === "saved" ? "Saved to care tasks" : "Suggestion dismissed"}</strong>
                    {nextStepState === "saved" ? "You can change or remove it below." : "It will not be treated as incomplete work."}
                  </p>
                  <button type="button" onClick={() => setNextStepState("idle")}>Undo</button>
                </div>
              )}
            </aside>
          </div>
        </section>

        <section className="dc-check-in" aria-labelledby="dc-check-in-title">
          <div className="dc-check-in-number">01</div>
          <div className="dc-check-in-copy">
            <span className="dc-kicker">Optional one-question check-in</span>
            <h2 id="dc-check-in-title">How restorative did your sleep feel last night?</h2>
            <p>This note can add context to a future brief. It is not used to judge progress.</p>
          </div>
          {checkInAnswer ? (
            <div className="dc-check-in-complete" role="status">
              <CheckCircle2 aria-hidden="true" />
              <div><strong>Recorded as “{checkInAnswer}”</strong><p>Added to your private notes for May 12.</p></div>
              <button type="button" onClick={() => setCheckInAnswer(null)}>Change</button>
            </div>
          ) : (
            <div className="dc-check-in-options" aria-label="Sleep quality choices">
              {["Restorative", "Somewhat", "Not really", "Skip today"].map((choice) => (
                <button type="button" key={choice} onClick={() => setCheckInAnswer(choice)}>{choice}</button>
              ))}
            </div>
          )}
        </section>

        <section className="dc-dashboard-section dc-trends-section" id="trends" aria-labelledby="dc-trends-title">
          <div className="dc-dashboard-section-heading">
            <div>
              <span className="dc-kicker">Recent health context</span>
              <h2 id="dc-trends-title">Trends worth keeping in view</h2>
            </div>
            <button className="dc-text-button" type="button">View 30 days <ChevronRight size={16} aria-hidden="true" /></button>
          </div>
          <div className="dc-trends-layout">
            <article className="dc-trend-main">
              <div className="dc-trend-title">
                <div><span className="dc-trend-icon dc-trend-icon--blue"><Clock3 aria-hidden="true" /></span><span><strong>Sleep timing</strong><small>Bedtime midpoint</small></span></div>
                <span>7-day view</span>
              </div>
              <div className="dc-chart" role="img" aria-label="Demo sleep midpoint ranged from 2:42 AM to 3:18 AM over seven days, with less variation on the last four days">
                <div className="dc-chart-y"><span>3:30</span><span>3:00</span><span>2:30</span></div>
                <div className="dc-chart-plot">
                  <span className="dc-grid-line dc-grid-line--one" />
                  <span className="dc-grid-line dc-grid-line--two" />
                  <svg viewBox="0 0 620 160" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M4 40 106 79 208 50 310 103 412 96 514 105 616 101" />
                    <circle cx="4" cy="40" r="5" /><circle cx="106" cy="79" r="5" /><circle cx="208" cy="50" r="5" /><circle cx="310" cy="103" r="5" /><circle cx="412" cy="96" r="5" /><circle cx="514" cy="105" r="5" /><circle cx="616" cy="101" r="5" />
                  </svg>
                  <div className="dc-chart-days"><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span><span>M</span></div>
                </div>
              </div>
              <p className="dc-chart-caption"><span /> Four recent nights were within a 22-minute range. Garmin data last synced today at 7:42 am.</p>
            </article>
            <div className="dc-trend-side">
              <article>
                <span className="dc-trend-icon dc-trend-icon--ochre"><Activity aria-hidden="true" /></span>
                <div><span>Evening walks</span><strong>4 this week</strong><p>3 ended before 8 pm</p></div>
              </article>
              <article>
                <span className="dc-trend-icon dc-trend-icon--lilac"><HeartPulse aria-hidden="true" /></span>
                <div><span>Resting heart rate</span><strong>63–67 bpm</strong><p>Usual 30-day range</p></div>
              </article>
              <p><CircleAlert size={16} aria-hidden="true" /> No heart-rate conclusion was generated because May 8 has an 11-hour data gap.</p>
            </div>
          </div>
        </section>

        <section className="dc-dashboard-section dc-care-section" id="care" aria-labelledby="dc-care-title">
          <div className="dc-dashboard-section-heading">
            <div>
              <span className="dc-kicker">Care ahead</span>
              <h2 id="dc-care-title">Prepare without starting from scratch</h2>
            </div>
          </div>
          <div className="dc-care-layout">
            <article className="dc-appointment">
              <div className="dc-calendar-date"><span>MAY</span><strong>21</strong></div>
              <div className="dc-appointment-details">
                <span>In 9 days · 10:30 am</span>
                <h3>Primary care follow-up</h3>
                <p>Demo appointment · Dr. Elena Morgan · Northwood Clinic</p>
                <div className="dc-appointment-actions">
                  <button className="dc-button dc-button--ink" type="button" onClick={() => setSummaryOpen(true)}>
                    <FileText size={17} aria-hidden="true" /> Prepare clinician summary
                  </button>
                  <button className="dc-text-button" type="button">View appointment</button>
                </div>
              </div>
            </article>
            <div className="dc-care-tasks" aria-label="Medication and care tasks">
              <div className="dc-care-tasks-heading"><h3>Medication & care tasks</h3><button type="button">Manage</button></div>
              <label className="dc-task-row">
                <input type="checkbox" defaultChecked />
                <span><strong>Lisinopril 10 mg</strong><small>Self-entered demo medication · 8:00 am</small></span>
                <span className="dc-task-status">Logged</span>
              </label>
              <label className="dc-task-row">
                <input type="checkbox" defaultChecked={nextStepState === "saved"} />
                <span><strong>Notice evening walk timing</strong><small>Optional wellness task · This week</small></span>
                <span className="dc-task-status">Optional</span>
              </label>
              <p className="dc-medication-boundary"><CircleAlert size={15} aria-hidden="true" /> Arcwell does not recommend starting, stopping, or changing medication. Contact your clinician or pharmacist.</p>
            </div>
          </div>
        </section>

        <section className="dc-dashboard-section dc-sources-section" id="sources" aria-labelledby="dc-sources-title">
          <div className="dc-dashboard-section-heading">
            <div>
              <span className="dc-kicker">Source freshness and control</span>
              <h2 id="dc-sources-title">Know what the brief could and could not see</h2>
            </div>
            <span className="dc-source-health"><span /> 2 current · 1 limited</span>
          </div>
          <div className="dc-source-table" role="table" aria-label="Connected demo data sources">
            <div className="dc-source-row dc-source-row--header" role="row">
              <span role="columnheader">Source</span><span role="columnheader">Freshness</span><span role="columnheader">AI brief use</span><span role="columnheader">Connection</span>
            </div>
            <div className="dc-source-row" role="row">
              <div role="cell"><span className="dc-source-icon"><Watch aria-hidden="true" /></span><span><strong>Garmin wearable</strong><small>Sleep, activity, heart rate</small></span></div>
              <div role="cell"><strong className="dc-current"><span /> Current</strong><small>Synced today, 7:42 am</small></div>
              <div role="cell"><button className={`dc-switch${aiSourceUse.wearable ? " is-on" : ""}`} type="button" role="switch" aria-label="Use Garmin wearable in AI briefs" aria-checked={aiSourceUse.wearable} onClick={() => toggleAiUse("wearable")} disabled={!sourceConnected.wearable}><span /></button><small>{aiSourceUse.wearable ? "Included" : "Paused"}</small></div>
              <div role="cell"><button className="dc-row-action" type="button" onClick={() => toggleConnection("wearable")}><Unplug size={15} aria-hidden="true" />{sourceConnected.wearable ? "Disconnect" : "Reconnect"}</button></div>
            </div>
            <div className="dc-source-row" role="row">
              <div role="cell"><span className="dc-source-icon dc-source-icon--lilac"><Clipboard aria-hidden="true" /></span><span><strong>Check-in notes</strong><small>Symptoms and context</small></span></div>
              <div role="cell"><strong className="dc-current"><span /> Current</strong><small>Updated today</small></div>
              <div role="cell"><button className={`dc-switch${aiSourceUse.notes ? " is-on" : ""}`} type="button" role="switch" aria-label="Use check-in notes in AI briefs" aria-checked={aiSourceUse.notes} onClick={() => toggleAiUse("notes")} disabled={!sourceConnected.notes}><span /></button><small>{aiSourceUse.notes ? "Included" : "Paused"}</small></div>
              <div role="cell"><button className="dc-row-action" type="button" onClick={() => toggleConnection("notes")}><Unplug size={15} aria-hidden="true" />{sourceConnected.notes ? "Disconnect" : "Reconnect"}</button></div>
            </div>
            <div className="dc-source-row" role="row">
              <div role="cell"><span className="dc-source-icon dc-source-icon--ochre"><CalendarDays aria-hidden="true" /></span><span><strong>Calendar</strong><small>Appointments only</small></span></div>
              <div role="cell"><strong className="dc-limited"><CircleAlert /> Limited</strong><small>Permission ends Jun 1</small></div>
              <div role="cell"><button className={`dc-switch${aiSourceUse.calendar ? " is-on" : ""}`} type="button" role="switch" aria-label="Use calendar in AI briefs" aria-checked={aiSourceUse.calendar} onClick={() => toggleAiUse("calendar")} disabled={!sourceConnected.calendar}><span /></button><small>{aiSourceUse.calendar ? "Included" : "Not included"}</small></div>
              <div role="cell"><button className="dc-row-action" type="button" onClick={() => toggleConnection("calendar")}><Unplug size={15} aria-hidden="true" />{sourceConnected.calendar ? "Disconnect" : "Reconnect"}</button></div>
            </div>
          </div>
          <div className="dc-data-gap">
            <CircleAlert aria-hidden="true" />
            <div><strong>Known gap: heart-rate data missing May 8, 9 pm–May 9, 8 am</strong><p>Arcwell excluded that interval from heart-rate interpretation and lowered source coverage for this week.</p></div>
          </div>
          {controlNotice && <p className="dc-control-notice" role="status"><CheckCircle2 aria-hidden="true" /> {controlNotice}</p>}
        </section>

        <section className="dc-dashboard-section dc-data-controls" aria-labelledby="dc-data-controls-title">
          <div>
            <span className="dc-kicker">Privacy and data controls</span>
            <h2 id="dc-data-controls-title">Your settings remain directly reachable</h2>
            <p>Review permissions before export or deletion. Care-partner access is currently off for this fictional account.</p>
          </div>
          <div className="dc-data-control-actions">
            <button type="button" onClick={() => setControlNotice("Demo export prepared. No real health data was processed.")}><Download aria-hidden="true" /><span><strong>Export my data</strong><small>Sources, notes, and summaries</small></span><ChevronRight aria-hidden="true" /></button>
            <button type="button" onClick={() => setControlNotice("Care-partner access is off. No one else can view this demo account.")}><UserRound aria-hidden="true" /><span><strong>Care-partner access</strong><small>Off · Review sharing</small></span><ChevronRight aria-hidden="true" /></button>
            <button type="button" onClick={() => setControlNotice("Deletion review opened for the demo. Nothing was deleted.")}><Trash2 aria-hidden="true" /><span><strong>Review data deletion</strong><small>See scope before confirming</small></span><ChevronRight aria-hidden="true" /></button>
          </div>
        </section>

        <aside className="dc-emergency-boundary" aria-label="Emergency and diagnostic boundary">
          <CircleAlert aria-hidden="true" />
          <div>
            <strong>Arcwell is not an emergency service and does not diagnose.</strong>
            <p>If you think you may have a medical emergency, call local emergency services now. For symptoms or medication questions, contact a qualified clinician.</p>
          </div>
          <button type="button">Read safety guidance <ArrowRight size={16} aria-hidden="true" /></button>
        </aside>

        <footer className="dc-dashboard-footer">
          <p>Arcwell Daily Compass · Fictional prototype data · Last interface update May 12, 2025</p>
          <button type="button" onClick={onOpenMarketing}>Return to marketing site</button>
        </footer>
      </main>

      <nav className="dc-mobile-bottom-nav" aria-label="Primary mobile navigation">
        <a className="is-active" href="#today"><Home aria-hidden="true" /><span>Today</span></a>
        <a href="#trends"><Activity aria-hidden="true" /><span>Trends</span></a>
        <a href="#care"><CalendarDays aria-hidden="true" /><span>Care</span></a>
        <a href="#sources"><SlidersHorizontal aria-hidden="true" /><span>Data</span></a>
      </nav>

      {evidenceOpen && (
        <div className="dc-drawer-layer" role="presentation">
          <button className="dc-drawer-scrim" type="button" aria-label="Close evidence drawer" onClick={() => setEvidenceOpen(false)} />
          <aside className="dc-evidence-drawer" role="dialog" aria-modal="true" aria-labelledby="dc-drawer-title">
            <header>
              <div><span className="dc-kicker">Weekly brief evidence</span><h2 id="dc-drawer-title">What Arcwell observed</h2></div>
              <button className="dc-icon-button" type="button" aria-label="Close evidence drawer" onClick={() => setEvidenceOpen(false)}><X aria-hidden="true" /></button>
            </header>
            <div className="dc-drawer-scroll">
              <section>
                <span className="dc-evidence-section-label">Observation</span>
                <p className="dc-drawer-observation">{weeklyBrief.observation}</p>
                <p className="dc-drawer-boundary"><ShieldCheck size={16} aria-hidden="true" /> AI-generated wellness context. Not a diagnosis, prediction, or treatment recommendation.</p>
              </section>
              <section>
                <span className="dc-evidence-section-label">Supporting records</span>
                <div className="dc-record-list">
                  <article><span>May 7</span><div><strong>Walk ended 7:34 pm</strong><p>Sleep midpoint 2:56 am · Garmin</p></div><Check size={16} aria-label="Included" /></article>
                  <article><span>May 9</span><div><strong>Walk ended 7:51 pm</strong><p>Sleep midpoint 3:02 am · Garmin</p></div><Check size={16} aria-label="Included" /></article>
                  <article><span>May 11</span><div><strong>Walk ended 7:42 pm</strong><p>“Wound down easily” · Check-in note</p></div><Check size={16} aria-label="Included" /></article>
                  <article className="is-excluded"><span>May 8</span><div><strong>Heart-rate interval excluded</strong><p>11-hour device data gap</p></div><X size={16} aria-label="Excluded" /></article>
                </div>
              </section>
              <section>
                <span className="dc-evidence-section-label">Evidence details</span>
                <EvidenceFacts />
              </section>
              <section className="dc-confidence-explainer">
                <span className="dc-evidence-section-label">Why confidence is moderate</span>
                <div className="dc-confidence-scale" aria-label="Moderate confidence, two of three levels"><span className="is-filled" /><span className="is-filled" /><span /></div>
                <p>Three consistent examples support the observation, but one week is a short period and May 8 contains a device gap. More data could change or remove this pattern.</p>
              </section>
              <section className="dc-escalation-note">
                <Stethoscope aria-hidden="true" />
                <div><strong>When to ask a clinician</strong><p>Discuss persistent sleep difficulty, concerning symptoms, or questions about medication. Seek urgent care based on symptoms, not this brief.</p></div>
              </section>
            </div>
            <footer><button className="dc-button dc-button--dark" type="button" onClick={() => setEvidenceOpen(false)}>Done reviewing</button></footer>
          </aside>
        </div>
      )}

      {summaryOpen && (
        <div className="dc-modal-layer" role="presentation">
          <button className="dc-modal-scrim" type="button" aria-label="Close clinician summary" onClick={() => setSummaryOpen(false)} />
          <section className="dc-summary-modal" role="dialog" aria-modal="true" aria-labelledby="dc-summary-title" id="summary">
            <header>
              <div><span className="dc-kicker">Clinician conversation brief · Demo</span><h2 id="dc-summary-title">Ready to review before sharing</h2></div>
              <button className="dc-icon-button" type="button" aria-label="Close clinician summary" onClick={() => setSummaryOpen(false)}><X aria-hidden="true" /></button>
            </header>
            <div className="dc-summary-content">
              <p className="dc-summary-notice"><ShieldCheck aria-hidden="true" /> You decide what to share. This summary contains AI-generated, non-diagnostic context and fictional data.</p>
              <div className="dc-summary-paper">
                <div><span>Prepared for</span><strong>Primary care follow-up · May 21</strong></div>
                <div><span>Recent observation</span><p>{weeklyBrief.observation}</p><small>{weeklyBrief.source} · {weeklyBrief.range} · {weeklyBrief.confidence} confidence</small></div>
                <div><span>Question to discuss</span><p>Could evening activity timing be relevant to my sleep consistency?</p></div>
                <div><span>Medication list</span><p>Lisinopril 10 mg · Self-entered demo information</p></div>
                <div><span>Data limitation</span><p>Heart-rate data is missing from May 8 at 9 pm to May 9 at 8 am.</p></div>
              </div>
              <p className="dc-summary-boundary">Arcwell does not diagnose or recommend treatment or medication changes. A clinician should interpret this information with your symptoms and full medical history.</p>
            </div>
            <footer>
              <button className="dc-button dc-button--dark" type="button" onClick={copySummary}>{summaryCopied ? <Check size={17} aria-hidden="true" /> : <Clipboard size={17} aria-hidden="true" />}{summaryCopied ? "Copied" : "Copy summary"}</button>
              <button className="dc-button dc-button--quiet" type="button" onClick={() => setControlNotice("Demo PDF prepared. No real health information was exported.")}><Download size={17} aria-hidden="true" /> Export PDF</button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
