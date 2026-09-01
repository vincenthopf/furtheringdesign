import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Database,
  Download,
  FileCheck2,
  FileText,
  HeartPulse,
  HelpCircle,
  LockKeyhole,
  Menu,
  Minus,
  NotebookPen,
  Pill,
  Plus,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  Trash2,
  UserRoundCheck,
  Watch,
  X
} from "lucide-react";
import "./candidate.css";

type CandidateProps = {
  onOpenDashboard: () => void;
  onOpenMarketing: () => void;
};

type SourceKey = "watch" | "checkins" | "medications";
type DashboardSection = "brief" | "trends" | "appointments" | "tasks" | "sources" | "privacy";

const weeklyBrief = {
  observation: "Resting heart rate ran 5 bpm above your 30-day range on 3 mornings after shorter sleep.",
  dateRange: "May 13–19, 2025",
  confidence: "Moderate",
  nextStep: "Keep this context for your June 2 visit. No immediate action is suggested by this record.",
  sources: ["Northstar Watch", "Daily check-ins"]
};

const evidenceRows = [
  {
    id: "OBS-041",
    date: "May 15",
    observation: "Resting heart rate 68 bpm",
    source: "Northstar Watch",
    quality: "Complete night"
  },
  {
    id: "OBS-044",
    date: "May 17",
    observation: "Resting heart rate 69 bpm",
    source: "Northstar Watch",
    quality: "Complete night"
  },
  {
    id: "NOTE-018",
    date: "May 14–18",
    observation: "Sleep noted below usual on 4 nights",
    source: "Daily check-ins",
    quality: "4 of 5 entries"
  },
  {
    id: "GAP-006",
    date: "May 16",
    observation: "No daytime activity record",
    source: "Northstar Watch",
    quality: "Data gap"
  }
];

const trendData = [
  { day: "Tue", sleep: 7.1, heart: 63 },
  { day: "Wed", sleep: 6.8, heart: 64 },
  { day: "Thu", sleep: 5.9, heart: 68 },
  { day: "Fri", sleep: 6.2, heart: 66 },
  { day: "Sat", sleep: 5.7, heart: 69 },
  { day: "Sun", sleep: 7.3, heart: 64 },
  { day: "Mon", sleep: 6.4, heart: 66 }
];

const faqs = [
  {
    question: "Does Care Ledger diagnose health conditions?",
    answer: "No. Care Ledger organizes wellness records, describes non-diagnostic patterns, and helps you prepare questions. A licensed clinician must interpret symptoms, diagnose conditions, and direct treatment."
  },
  {
    question: "What happens when data is missing?",
    answer: "Missing periods stay visible in the ledger. If the available record cannot support a useful observation, the brief says so instead of filling the gap or raising certainty."
  },
  {
    question: "Can I control connected sources?",
    answer: "Yes. You can pause or disconnect each source, review its last sync, export your record, delete stored data, and manage care-partner access from the data controls."
  },
  {
    question: "Is this an emergency monitoring service?",
    answer: "No. Care Ledger does not monitor emergencies or contact emergency services. If you think you may have a medical emergency, call local emergency services now."
  },
  {
    question: "Can I bring the summary to an appointment?",
    answer: "Yes. The appointment summary includes the date range, observations, sources, data gaps, current care tasks, and questions you select. It also carries the non-diagnostic AI boundary."
  }
];

function CareLedgerMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`cl-mark${compact ? " cl-mark--compact" : ""}`} aria-label="Care Ledger">
      <span className="cl-mark__device" aria-hidden="true">
        <span>CL</span>
        <i />
        <i />
        <i />
      </span>
      {!compact && (
        <span className="cl-mark__name">
          <strong>CARE</strong>
          <span>LEDGER</span>
        </span>
      )}
    </span>
  );
}

function DemoStamp() {
  return <span className="cl-demo-stamp">Fictional demo data</span>;
}

function ConfidenceKey() {
  return (
    <span className="cl-confidence">
      <span className="cl-confidence__bars" aria-hidden="true">
        <i />
        <i />
        <i className="is-muted" />
      </span>
      Moderate confidence
    </span>
  );
}

export function CareLedgerMarketing({ onOpenDashboard }: CandidateProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewRange, setPreviewRange] = useState<"7 days" | "30 days">("7 days");
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="cl-root cl-marketing">
      <header className="cl-site-header">
        <a className="cl-brand-link" href="#top" aria-label="Care Ledger home" onClick={closeMenu}>
          <CareLedgerMark />
        </a>
        <nav className="cl-desktop-nav" aria-label="Main navigation">
          <a href="#mechanism">How it works</a>
          <a href="#safety">Safety</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="cl-header-actions">
          <button className="cl-text-button" type="button" onClick={onOpenDashboard}>Sign in</button>
          <button className="cl-primary-button cl-primary-button--small" type="button" onClick={onOpenDashboard}>
            Open demo ledger
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
        <button
          className="cl-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        {menuOpen && (
          <nav className="cl-mobile-menu" aria-label="Mobile navigation">
            <a href="#mechanism" onClick={closeMenu}>How it works</a>
            <a href="#safety" onClick={closeMenu}>Safety and privacy</a>
            <a href="#pricing" onClick={closeMenu}>Pricing</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <button type="button" onClick={onOpenDashboard}>Open demo ledger</button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="cl-hero" aria-labelledby="cl-hero-title">
          <div className="cl-hero__copy">
            <div className="cl-kicker"><span>Personal health record desk</span><span>Non-diagnostic</span></div>
            <h1 id="cl-hero-title">Know what changed. Keep the evidence in order.</h1>
            <p className="cl-hero__lede">Care Ledger turns wearable readings, daily notes, medications, and appointments into a dated record you can inspect and bring to a clinician.</p>
            <div className="cl-hero__actions">
              <button className="cl-primary-button" type="button" onClick={onOpenDashboard}>
                Review the demo record
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a className="cl-secondary-link" href="#mechanism">See the method <ChevronDown size={16} aria-hidden="true" /></a>
            </div>
            <dl className="cl-hero__facts">
              <div><dt>Purpose</dt><dd>Pattern review and visit preparation</dd></div>
              <div><dt>Evidence</dt><dd>Source, date range, confidence, gaps</dd></div>
              <div><dt>Control</dt><dd>Connect, pause, export, delete</dd></div>
            </dl>
          </div>

          <div className="cl-hero__record" aria-label="Care Ledger product preview">
            <div className="cl-record-header">
              <div><span>WEEKLY BRIEF</span><strong>Record 20 / 2025</strong></div>
              <DemoStamp />
            </div>
            <div className="cl-record-tabs" aria-label="Preview date range">
              {(["7 days", "30 days"] as const).map((range) => (
                <button
                  type="button"
                  className={previewRange === range ? "is-active" : ""}
                  aria-pressed={previewRange === range}
                  onClick={() => setPreviewRange(range)}
                  key={range}
                >
                  {range}
                </button>
              ))}
            </div>
            <article className="cl-preview-brief">
              <div className="cl-entry-index">01</div>
              <div className="cl-preview-brief__body">
                <div className="cl-entry-meta"><span>OBSERVATION</span><span>{previewRange === "7 days" ? weeklyBrief.dateRange : "Apr 20–May 19, 2025"}</span></div>
                <h2>{previewRange === "7 days" ? weeklyBrief.observation : "Resting heart rate remained close to your 30-day range, with three higher mornings in the latest week."}</h2>
                <ConfidenceKey />
                <div className="cl-source-line">
                  <Watch size={15} aria-hidden="true" />
                  <span>Northstar Watch</span>
                  <span className="cl-source-separator">+</span>
                  <NotebookPen size={15} aria-hidden="true" />
                  <span>Daily check-ins</span>
                </div>
              </div>
            </article>
            <div className="cl-preview-evidence">
              <div className="cl-preview-evidence__heading"><span>SUPPORTING RECORD</span><span>4 entries</span></div>
              {evidenceRows.slice(0, 3).map((row) => (
                <div className="cl-mini-row" key={row.id}>
                  <time>{row.date}</time>
                  <span>{row.observation}</span>
                  <small>{row.source}</small>
                </div>
              ))}
            </div>
            <div className="cl-record-action">
              <span><ClipboardCheck size={17} aria-hidden="true" /> Suggested next step</span>
              <p>{weeklyBrief.nextStep}</p>
            </div>
          </div>
        </section>

        <section className="cl-index-strip" aria-label="Product capabilities">
          <div><span>01</span><strong>Collect</strong><small>Bring scattered records together</small></div>
          <div><span>02</span><strong>Compare</strong><small>Review changes against your range</small></div>
          <div><span>03</span><strong>Inspect</strong><small>Open every source and data gap</small></div>
          <div><span>04</span><strong>Prepare</strong><small>Build a clinician-ready summary</small></div>
        </section>

        <section className="cl-method cl-section" id="mechanism" aria-labelledby="cl-method-title">
          <div className="cl-section-heading">
            <span className="cl-section-number">01 / METHOD</span>
            <div>
              <h2 id="cl-method-title">A health brief with an audit trail.</h2>
              <p>Care Ledger separates what was recorded from what the system observed, so you can check the basis before choosing a next step.</p>
            </div>
          </div>
          <div className="cl-method-grid">
            <ol className="cl-process-list">
              <li>
                <span className="cl-process-list__number">01</span>
                <div><h3>Records arrive with provenance</h3><p>Device readings, daily notes, medication entries, and appointments keep their source and timestamp.</p></div>
                <Database size={21} aria-hidden="true" />
              </li>
              <li>
                <span className="cl-process-list__number">02</span>
                <div><h3>Comparable periods are checked</h3><p>The system checks recent records against your own available history, not a universal wellness score.</p></div>
                <Activity size={21} aria-hidden="true" />
              </li>
              <li>
                <span className="cl-process-list__number">03</span>
                <div><h3>Limits stay attached</h3><p>Every observation names its date range, confidence, sources, and missing periods.</p></div>
                <FileCheck2 size={21} aria-hidden="true" />
              </li>
              <li>
                <span className="cl-process-list__number">04</span>
                <div><h3>You decide what leaves the ledger</h3><p>Select useful observations and questions for an appointment summary. Nothing is sent automatically.</p></div>
                <UserRoundCheck size={21} aria-hidden="true" />
              </li>
            </ol>
            <div className="cl-coverage-table-wrap">
              <div className="cl-table-title"><span>RECORD COVERAGE</span><DemoStamp /></div>
              <table className="cl-coverage-table">
                <thead><tr><th>Record</th><th>Latest</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td><Watch size={16} /> Wearable</td><td>12 min ago</td><td><span className="cl-status-text is-current">Current</span></td></tr>
                  <tr><td><NotebookPen size={16} /> Daily notes</td><td>Yesterday</td><td><span className="cl-status-text is-current">Current</span></td></tr>
                  <tr><td><Pill size={16} /> Medications</td><td>May 12</td><td><span className="cl-status-text">User entered</span></td></tr>
                  <tr><td><CalendarDays size={16} /> Appointments</td><td>Jun 2</td><td><span className="cl-status-text">Upcoming</span></td></tr>
                </tbody>
              </table>
              <div className="cl-gap-note"><AlertTriangle size={17} /><span><strong>Visible gap:</strong> daytime activity was unavailable on May 16 and excluded from the brief.</span></div>
            </div>
          </div>
        </section>

        <section className="cl-boundaries cl-section" id="safety" aria-labelledby="cl-boundaries-title">
          <div className="cl-section-heading cl-section-heading--light">
            <span className="cl-section-number">02 / BOUNDARIES</span>
            <div>
              <h2 id="cl-boundaries-title">Safety and privacy are working controls.</h2>
              <p>The product boundary stays next to the record, not buried in legal copy.</p>
            </div>
          </div>
          <div className="cl-boundary-grid">
            <article>
              <Stethoscope size={22} aria-hidden="true" />
              <span>INTERPRETATION</span>
              <h3>Organizes records. Does not diagnose.</h3>
              <p>Observations use measured language and lead to a clinician conversation when professional interpretation is appropriate.</p>
            </article>
            <article>
              <AlertTriangle size={22} aria-hidden="true" />
              <span>EMERGENCIES</span>
              <h3>Not an emergency monitor.</h3>
              <p>If you think you may have a medical emergency, call local emergency services. Do not wait for this product.</p>
            </article>
            <article>
              <LockKeyhole size={22} aria-hidden="true" />
              <span>DATA USE</span>
              <h3>Source-level permission.</h3>
              <p>Pause a source, disconnect it, export your record, delete stored data, and review who can access a shared summary.</p>
            </article>
          </div>
          <div className="cl-privacy-register">
            <div><span>01</span><strong>Your connected data is used to produce your ledger.</strong><small>Controls remain available by source.</small></div>
            <div><span>02</span><strong>Care-partner access requires explicit permission.</strong><small>Access can be reviewed and removed.</small></div>
            <div><span>03</span><strong>No claim of emergency or clinician oversight.</strong><small>The interface states when outside help is needed.</small></div>
          </div>
        </section>

        <section className="cl-workflow cl-section" aria-labelledby="cl-workflow-title">
          <div className="cl-section-heading">
            <span className="cl-section-number">03 / APPOINTMENT FLOW</span>
            <div>
              <h2 id="cl-workflow-title">Turn the record into a focused visit.</h2>
              <p>Choose what matters, keep the evidence attached, and leave diagnosis and treatment decisions with your clinician.</p>
            </div>
          </div>
          <div className="cl-workflow-sheet">
            <div className="cl-workflow-sheet__header">
              <div><span>VISIT PREPARATION</span><strong>Primary care · June 2, 2025</strong></div>
              <span>3 of 4 ready</span>
            </div>
            <div className="cl-check-row is-checked"><Check size={17} /><span>Recent observation and source record</span><small>Included</small></div>
            <div className="cl-check-row is-checked"><Check size={17} /><span>Medication list reviewed</span><small>May 19</small></div>
            <div className="cl-check-row is-checked"><Check size={17} /><span>Two questions selected</span><small>Included</small></div>
            <div className="cl-check-row"><Minus size={17} /><span>Add clinician notes after the visit</span><small>Not started</small></div>
            <div className="cl-workflow-sheet__footer">
              <p><ShieldCheck size={17} /> Summary includes sources, limits, and a non-diagnostic label.</p>
              <button type="button" onClick={onOpenDashboard}>Open summary builder <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>

        <section className="cl-pricing cl-section" id="pricing" aria-labelledby="cl-pricing-title">
          <div className="cl-section-heading">
            <span className="cl-section-number">04 / PLANS</span>
            <div>
              <h2 id="cl-pricing-title">Start with one complete record.</h2>
              <p>Illustrative prototype pricing. Production pricing and supported connections require validation.</p>
            </div>
          </div>
          <div className="cl-billing-control" aria-label="Billing period">
            <span>Billing</span>
            <div>
              <button type="button" className={billing === "monthly" ? "is-active" : ""} aria-pressed={billing === "monthly"} onClick={() => setBilling("monthly")}>Monthly</button>
              <button type="button" className={billing === "annual" ? "is-active" : ""} aria-pressed={billing === "annual"} onClick={() => setBilling("annual")}>Annual</button>
            </div>
          </div>
          <div className="cl-plan-table">
            <div className="cl-plan-table__intro">
              <DemoStamp />
              <h3>Care Ledger Individual</h3>
              <p>For one adult organizing personal wellness records and preparing for appointments.</p>
            </div>
            <div className="cl-plan-table__price">
              <span>USD</span>
              <strong>${billing === "annual" ? "9" : "12"}</strong>
              <small>per month{billing === "annual" ? ", billed yearly" : ""}</small>
              <button className="cl-primary-button" type="button" onClick={onOpenDashboard}>Start with demo data <ArrowRight size={17} /></button>
            </div>
            <div className="cl-plan-table__features">
              <div><Check size={16} /><span>Weekly evidence-backed brief</span></div>
              <div><Check size={16} /><span>Wearable and daily note record</span></div>
              <div><Check size={16} /><span>Medication and care-task register</span></div>
              <div><Check size={16} /><span>Appointment summary export</span></div>
              <div><Check size={16} /><span>Source, sharing, export, and deletion controls</span></div>
              <div><Check size={16} /><span>One care-partner summary permission</span></div>
            </div>
          </div>
        </section>

        <section className="cl-faq cl-section" id="faq" aria-labelledby="cl-faq-title">
          <div className="cl-section-heading">
            <span className="cl-section-number">05 / QUESTIONS</span>
            <div><h2 id="cl-faq-title">Before you connect a record.</h2></div>
          </div>
          <div className="cl-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article className={isOpen ? "is-open" : ""} key={faq.question}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{faq.question}</strong>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                  {isOpen && <p>{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </section>

        <section className="cl-final-cta" aria-labelledby="cl-final-title">
          <div>
            <span>REVIEW RECORD 20 / 2025</span>
            <h2 id="cl-final-title">Open the ledger. Inspect the evidence first.</h2>
          </div>
          <button className="cl-light-button" type="button" onClick={onOpenDashboard}>Enter demo dashboard <ArrowRight size={18} /></button>
        </section>
      </main>

      <footer className="cl-footer">
        <div className="cl-footer__brand">
          <CareLedgerMark />
          <p>A non-diagnostic personal health record desk for understanding recent changes and preparing better clinician conversations.</p>
          <DemoStamp />
        </div>
        <div className="cl-footer__column"><strong>Product</strong><a href="#mechanism">Method</a><button type="button" onClick={onOpenDashboard}>Demo ledger</button><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div>
        <div className="cl-footer__column"><strong>Boundaries</strong><a href="#safety">Safety</a><a href="#safety">Privacy controls</a><a href="#safety">Data sources</a><a href="#safety">Emergency scope</a></div>
        <div className="cl-footer__column"><strong>Company</strong><a href="#top">About</a><a href="#top">Accessibility</a><a href="#top">Terms</a><a href="#top">Privacy notice</a></div>
        <div className="cl-footer__base">
          <span>© 2025 Care Ledger prototype</span>
          <span>Fictional product and data · Not medical advice · Not for emergencies</span>
        </div>
      </footer>
    </div>
  );
}

export function CareLedgerDashboard({ onOpenMarketing }: CandidateProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<DashboardSection>("brief");
  const [evidenceOpen, setEvidenceOpen] = useState(true);
  const [recordFilter, setRecordFilter] = useState<"all" | "wearable" | "notes">("all");
  const [openRecord, setOpenRecord] = useState<string | null>("OBS-041");
  const [briefSaved, setBriefSaved] = useState(false);
  const [trendRange, setTrendRange] = useState<"7D" | "30D">("7D");
  const [appointmentChecks, setAppointmentChecks] = useState([true, true, false, false]);
  const [summaryStatus, setSummaryStatus] = useState<"idle" | "ready">("idle");
  const [tasks, setTasks] = useState([false, true, false]);
  const [sources, setSources] = useState<Record<SourceKey, boolean>>({ watch: true, checkins: true, medications: true });
  const [exportReady, setExportReady] = useState(false);
  const [carePartner, setCarePartner] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const filteredEvidence = evidenceRows.filter((row) => {
    if (recordFilter === "all") return true;
    if (recordFilter === "wearable") return row.source === "Northstar Watch";
    return row.source === "Daily check-ins";
  });

  const sourceStatus = (key: SourceKey) => sources[key] ? "Connected" : "Paused";

  const goToSection = (section: DashboardSection) => {
    setActiveSection(section);
    setMobileNavOpen(false);
    document.getElementById(`cl-${section}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleCheck = (index: number) => {
    setAppointmentChecks((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
    setSummaryStatus("idle");
  };

  const toggleTask = (index: number) => {
    setTasks((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  };

  const dashboardNav: Array<{ id: DashboardSection; label: string; icon: typeof FileText }> = [
    { id: "brief", label: "Weekly brief", icon: FileText },
    { id: "trends", label: "Health trends", icon: Activity },
    { id: "appointments", label: "Appointments", icon: CalendarDays },
    { id: "tasks", label: "Care tasks", icon: ClipboardCheck },
    { id: "sources", label: "Sources", icon: Database },
    { id: "privacy", label: "Data controls", icon: LockKeyhole }
  ];

  return (
    <div className="cl-root cl-dashboard">
      <header className="cl-dashboard-topbar">
        <button className="cl-dashboard-brand" type="button" onClick={onOpenMarketing} aria-label="Return to Care Ledger marketing site">
          <CareLedgerMark />
        </button>
        <div className="cl-dashboard-topbar__record"><span>PERSONAL RECORD</span><strong>Alex Morgan · Demo</strong></div>
        <div className="cl-dashboard-topbar__actions">
          <DemoStamp />
          <button className="cl-icon-button" type="button" aria-label="Open help"><HelpCircle size={19} /></button>
          <button className="cl-user-button" type="button" aria-label="Open account menu">AM</button>
        </div>
        <button
          className="cl-dashboard-menu"
          type="button"
          aria-label={mobileNavOpen ? "Close dashboard navigation" : "Open dashboard navigation"}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((value) => !value)}
        >
          {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {mobileNavOpen && (
        <nav className="cl-dashboard-mobile-menu" aria-label="Dashboard navigation">
          {dashboardNav.map(({ id, label, icon: Icon }) => (
            <button className={activeSection === id ? "is-active" : ""} type="button" onClick={() => goToSection(id)} key={id}>
              <Icon size={18} /><span>{label}</span><ChevronRight size={16} />
            </button>
          ))}
          <button type="button" onClick={onOpenMarketing}><ArrowRight className="cl-flip-icon" size={18} /><span>Product site</span></button>
        </nav>
      )}

      <aside className="cl-dashboard-sidebar">
        <div className="cl-sidebar-index"><span>INDEX</span><small>Updated May 19 · 08:42</small></div>
        <nav aria-label="Dashboard sections">
          {dashboardNav.map(({ id, label, icon: Icon }, index) => (
            <button className={activeSection === id ? "is-active" : ""} type="button" onClick={() => goToSection(id)} key={id}>
              <span>{String(index + 1).padStart(2, "0")}</span><Icon size={17} /><strong>{label}</strong>
            </button>
          ))}
        </nav>
        <div className="cl-sidebar-boundary">
          <AlertTriangle size={18} />
          <strong>Not for emergencies</strong>
          <p>Call local emergency services if you think you may have a medical emergency.</p>
        </div>
        <button className="cl-sidebar-return" type="button" onClick={onOpenMarketing}><ArrowRight className="cl-flip-icon" size={16} /> Product site</button>
      </aside>

      <main className="cl-dashboard-main">
        <div className="cl-dashboard-titlebar">
          <div>
            <span>MONDAY · MAY 19, 2025</span>
            <h1>Your care ledger</h1>
            <p>One recent observation is ready for review. Inspect the record before saving a next step.</p>
          </div>
          <div className="cl-record-id"><span>LEDGER ID</span><strong>DEMO-0520-AM</strong></div>
        </div>

        <div className="cl-demo-notice">
          <FileText size={17} aria-hidden="true" />
          <p><strong>Demonstration record.</strong> All names, readings, notes, and appointments on this page are fictional.</p>
        </div>

        <section className="cl-dashboard-section cl-brief-section" id="cl-brief" aria-labelledby="cl-brief-title">
          <div className="cl-dashboard-section__heading">
            <div><span>01 / WEEKLY BRIEF</span><h2 id="cl-brief-title">Review the observation</h2></div>
            <time>May 13–19, 2025</time>
          </div>
          <div className="cl-brief-layout">
            <article className="cl-ledger-brief">
              <div className="cl-ledger-brief__header">
                <span>BRIEF 20-01</span>
                <ConfidenceKey />
              </div>
              <div className="cl-ledger-observation">
                <span className="cl-ledger-observation__index">O</span>
                <div><span>OBSERVATION</span><h3>{weeklyBrief.observation}</h3><p>This is a non-diagnostic comparison against your available 30-day record.</p></div>
              </div>
              <dl className="cl-brief-register">
                <div><dt>Date range</dt><dd>{weeklyBrief.dateRange}</dd></div>
                <div><dt>Sources</dt><dd>{weeklyBrief.sources.join(" + ")}</dd></div>
                <div><dt>Confidence</dt><dd>Moderate · two source types agree, one activity gap</dd></div>
                <div><dt>Excluded</dt><dd>Daytime activity on May 16</dd></div>
              </dl>
              <div className="cl-next-step">
                <span>NEXT STEP</span>
                <p>{weeklyBrief.nextStep}</p>
                <button className={briefSaved ? "is-saved" : ""} type="button" onClick={() => setBriefSaved((value) => !value)}>
                  {briefSaved ? <Check size={17} /> : <Plus size={17} />}
                  {briefSaved ? "Saved to visit summary" : "Save to visit summary"}
                </button>
              </div>
              <button className="cl-disclosure-button" type="button" aria-expanded={evidenceOpen} onClick={() => setEvidenceOpen((value) => !value)}>
                <span><FileCheck2 size={17} /> Inspect supporting record</span>
                <span>4 entries {evidenceOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}</span>
              </button>
              {evidenceOpen && (
                <div className="cl-evidence-block">
                  <div className="cl-evidence-tools">
                    <span>SHOW</span>
                    <div>
                      {(["all", "wearable", "notes"] as const).map((filter) => (
                        <button className={recordFilter === filter ? "is-active" : ""} type="button" aria-pressed={recordFilter === filter} onClick={() => setRecordFilter(filter)} key={filter}>
                          {filter === "all" ? "All records" : filter === "wearable" ? "Wearable" : "Notes"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="cl-evidence-table" role="table" aria-label="Supporting evidence">
                    <div className="cl-evidence-table__head" role="row">
                      <span role="columnheader">Date</span><span role="columnheader">Recorded item</span><span role="columnheader">Source</span><span role="columnheader">Quality</span><span />
                    </div>
                    {filteredEvidence.map((row) => {
                      const isOpen = openRecord === row.id;
                      return (
                        <div className={`cl-evidence-row${isOpen ? " is-open" : ""}`} role="rowgroup" key={row.id}>
                          <button type="button" aria-expanded={isOpen} onClick={() => setOpenRecord(isOpen ? null : row.id)}>
                            <time>{row.date}</time><span>{row.observation}</span><span>{row.source}</span><span>{row.quality}</span>{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                          {isOpen && (
                            <div className="cl-evidence-detail">
                              <div><span>Record ID</span><strong>{row.id}</strong></div>
                              <div><span>Received</span><strong>{row.date}, 08:14 local</strong></div>
                              <div><span>Use in brief</span><strong>{row.id.startsWith("GAP") ? "Excluded and named as a gap" : "Included in comparison"}</strong></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>

            <aside className="cl-brief-aside" aria-label="Brief safety boundary">
              <div className="cl-aside-title"><ShieldCheck size={18} /><span>INTERPRETATION BOUNDARY</span></div>
              <p>This brief does not diagnose a condition or recommend treatment.</p>
              <dl>
                <div><dt>Appropriate</dt><dd>Review context and prepare a question.</dd></div>
                <div><dt>Not appropriate</dt><dd>Change medication or delay needed care.</dd></div>
              </dl>
              <div className="cl-emergency-box"><AlertTriangle size={18} /><p><strong>Possible emergency?</strong> Call local emergency services now. Care Ledger does not monitor emergencies.</p></div>
            </aside>
          </div>
        </section>

        <section className="cl-dashboard-section" id="cl-trends" aria-labelledby="cl-trends-title">
          <div className="cl-dashboard-section__heading">
            <div><span>02 / HEALTH TRENDS</span><h2 id="cl-trends-title">Available record</h2></div>
            <div className="cl-range-control" aria-label="Trend date range">
              {(["7D", "30D"] as const).map((range) => <button className={trendRange === range ? "is-active" : ""} type="button" aria-pressed={trendRange === range} onClick={() => setTrendRange(range)} key={range}>{range}</button>)}
            </div>
          </div>
          <div className="cl-trends-layout">
            <div className="cl-trend-sheet">
              <div className="cl-trend-summary">
                <div><span>RESTING HEART RATE</span><strong>{trendRange === "7D" ? "66" : "64"} <small>bpm average</small></strong><p>{trendRange === "7D" ? "+2 bpm vs prior 7 days" : "Within available 30-day range"}</p></div>
                <div><span>SLEEP DURATION</span><strong>{trendRange === "7D" ? "6h 29m" : "6h 47m"} <small>average</small></strong><p>{trendRange === "7D" ? "18m below prior 7 days" : "13 of 30 nights below 6h 30m"}</p></div>
              </div>
              <div className="cl-chart-key"><span><i className="cl-key-sleep" /> Sleep duration</span><span><i className="cl-key-heart" /> Resting heart rate</span></div>
              <div className="cl-trend-chart" aria-label="Seven day sleep and resting heart rate chart">
                {trendData.map((point) => (
                  <div className="cl-trend-day" key={point.day}>
                    <div className="cl-trend-day__plot">
                      <span className="cl-heart-marker" style={{ bottom: `${(point.heart - 55) * 6 + 18}px` }} aria-label={`${point.heart} beats per minute`}>{point.heart}</span>
                      <span className="cl-sleep-bar" style={{ height: `${point.sleep * 14}px` }} aria-label={`${point.sleep} hours sleep`} />
                    </div>
                    <strong>{point.day}</strong>
                    <small>{point.sleep}h</small>
                  </div>
                ))}
              </div>
              <div className="cl-trend-footnote"><AlertTriangle size={16} /><span>Daytime activity is incomplete for May 16. It is not used in the weekly observation.</span></div>
            </div>
            <div className="cl-period-table">
              <div className="cl-table-title"><span>PERIOD COMPARISON</span><span>{trendRange === "7D" ? "May 13–19" : "Apr 20–May 19"}</span></div>
              <dl>
                <div><dt>Recorded nights</dt><dd>{trendRange === "7D" ? "7 / 7" : "28 / 30"}</dd></div>
                <div><dt>Complete heart-rate nights</dt><dd>{trendRange === "7D" ? "6 / 7" : "26 / 30"}</dd></div>
                <div><dt>Daily check-ins</dt><dd>{trendRange === "7D" ? "5 / 7" : "19 / 30"}</dd></div>
                <div><dt>Comparison basis</dt><dd>Your available prior record</dd></div>
              </dl>
              <button type="button" onClick={() => goToSection("sources")}>Review source gaps <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>

        <section className="cl-dashboard-section" id="cl-appointments" aria-labelledby="cl-appointments-title">
          <div className="cl-dashboard-section__heading">
            <div><span>03 / APPOINTMENTS</span><h2 id="cl-appointments-title">Prepare the next visit</h2></div>
            <span className="cl-section-status">14 days away</span>
          </div>
          <div className="cl-appointment-layout">
            <article className="cl-appointment-record">
              <div className="cl-appointment-date"><span>JUN</span><strong>02</strong><small>10:30 AM</small></div>
              <div className="cl-appointment-info"><span>PRIMARY CARE</span><h3>Routine follow-up</h3><p>Dr. Lena Ortiz · River Street Clinic</p><p>In person · 30 minutes</p></div>
              <button type="button" aria-label="Open appointment details"><ChevronRight size={20} /></button>
            </article>
            <div className="cl-summary-builder">
              <div className="cl-table-title"><span>CLINICIAN SUMMARY CHECKLIST</span><span>{appointmentChecks.filter(Boolean).length} / 4 selected</span></div>
              {[
                "Weekly observation with evidence",
                "Current medications and care tasks",
                "Question: Could sleep context affect this pattern?",
                "Question: What changes should prompt earlier contact?"
              ].map((item, index) => (
                <label className="cl-checkbox-row" key={item}>
                  <input type="checkbox" checked={appointmentChecks[index]} onChange={() => toggleCheck(index)} />
                  <span className="cl-custom-check" aria-hidden="true">{appointmentChecks[index] && <Check size={14} />}</span>
                  <span>{item}</span>
                </label>
              ))}
              <div className="cl-summary-actions">
                <p><ShieldCheck size={16} /> Includes dates, sources, confidence, gaps, and AI limits.</p>
                <button type="button" onClick={() => setSummaryStatus("ready")}><FileText size={16} /> {summaryStatus === "ready" ? "Summary ready" : "Prepare summary"}</button>
              </div>
              {summaryStatus === "ready" && (
                <div className="cl-ready-note" role="status"><Check size={17} /><span>Demo summary prepared. Review it before sharing with a clinician.</span><button type="button"><Download size={15} /> Export PDF</button></div>
              )}
            </div>
          </div>
        </section>

        <section className="cl-dashboard-section" id="cl-tasks" aria-labelledby="cl-tasks-title">
          <div className="cl-dashboard-section__heading">
            <div><span>04 / MEDICATIONS + CARE TASKS</span><h2 id="cl-tasks-title">Today’s register</h2></div>
            <time>May 19</time>
          </div>
          <div className="cl-task-table" role="table" aria-label="Medication and care tasks">
            <div className="cl-task-table__head" role="row"><span>Done</span><span>Time</span><span>Record</span><span>Schedule</span><span>Source</span></div>
            {[
              { time: "8:00 AM", title: "Vitamin D · 1 tablet", schedule: "Daily", source: "Self-entered medication" },
              { time: "12:30 PM", title: "10-minute walk", schedule: "Weekdays", source: "Care task" },
              { time: "8:30 PM", title: "Daily check-in", schedule: "Daily", source: "Care Ledger" }
            ].map((task, index) => (
              <button className={tasks[index] ? "is-complete" : ""} type="button" role="row" aria-pressed={tasks[index]} onClick={() => toggleTask(index)} key={task.title}>
                <span role="cell" className="cl-task-check">{tasks[index] && <Check size={14} />}</span>
                <time role="cell">{task.time}</time><strong role="cell">{task.title}</strong><span role="cell">{task.schedule}</span><span role="cell">{task.source}</span>
              </button>
            ))}
          </div>
          <p className="cl-register-note"><Pill size={16} /> Medication entries are organizational records, not dosing instructions. Follow your clinician’s directions and medication label.</p>
        </section>

        <section className="cl-dashboard-section" id="cl-sources" aria-labelledby="cl-sources-title">
          <div className="cl-dashboard-section__heading">
            <div><span>05 / SOURCES + FRESHNESS</span><h2 id="cl-sources-title">Connected record</h2></div>
            <button className="cl-heading-action" type="button"><Plus size={16} /> Add source</button>
          </div>
          <div className="cl-source-register">
            <div className="cl-source-register__head"><span>Source</span><span>Latest record</span><span>Coverage</span><span>Status</span><span>Control</span></div>
            <div className="cl-source-register__row">
              <div><Watch size={18} /><span><strong>Northstar Watch</strong><small>Sleep, resting heart rate, activity</small></span></div><span>12 min ago</span><span>6 complete nights / 7</span><strong>{sourceStatus("watch")}</strong><button type="button" onClick={() => setSources((value) => ({ ...value, watch: !value.watch }))}>{sources.watch ? "Pause" : "Resume"}</button>
            </div>
            <div className="cl-source-register__row">
              <div><NotebookPen size={18} /><span><strong>Daily check-ins</strong><small>Sleep context, energy, personal notes</small></span></div><span>Yesterday, 8:41 PM</span><span>5 entries / 7 days</span><strong>{sourceStatus("checkins")}</strong><button type="button" onClick={() => setSources((value) => ({ ...value, checkins: !value.checkins }))}>{sources.checkins ? "Pause" : "Resume"}</button>
            </div>
            <div className="cl-source-register__row">
              <div><Pill size={18} /><span><strong>Medication register</strong><small>User-entered names and schedules</small></span></div><span>May 12</span><span>1 active entry</span><strong>{sourceStatus("medications")}</strong><button type="button" onClick={() => setSources((value) => ({ ...value, medications: !value.medications }))}>{sources.medications ? "Pause" : "Resume"}</button>
            </div>
          </div>
          <div className="cl-data-gap-register">
            <div><AlertTriangle size={18} /><span><strong>1 gap affects this week</strong><small>Northstar Watch had no daytime activity record on May 16.</small></span></div>
            <div><Clock3 size={18} /><span><strong>2 check-ins were not entered</strong><small>No daily context is available for May 13 and May 16.</small></span></div>
            <button type="button"><RefreshCw size={16} /> Check for new records</button>
          </div>
        </section>

        <section className="cl-dashboard-section" id="cl-privacy" aria-labelledby="cl-privacy-title">
          <div className="cl-dashboard-section__heading">
            <div><span>06 / PRIVACY + DATA</span><h2 id="cl-privacy-title">Your controls</h2></div>
            <span className="cl-section-status">Last reviewed May 19</span>
          </div>
          <div className="cl-control-grid">
            <article>
              <Download size={20} /><span>EXPORT</span><h3>Download your ledger</h3><p>Prepare a copy of records, source history, summaries, and permissions.</p>
              <button type="button" onClick={() => setExportReady(true)}>{exportReady ? <Check size={16} /> : <Download size={16} />}{exportReady ? "Export prepared" : "Prepare data export"}</button>
            </article>
            <article>
              <UserRoundCheck size={20} /><span>CARE PARTNER</span><h3>Jamie Lee</h3><p>{carePartner ? "Can view exported appointment summaries only." : "Access is currently paused."}</p>
              <button type="button" onClick={() => setCarePartner((value) => !value)}>{carePartner ? "Pause access" : "Restore access"}</button>
            </article>
            <article>
              <SlidersHorizontal size={20} /><span>AI PROCESSING</span><h3>Weekly brief permission</h3><p>Connected records may be used to generate your private weekly brief.</p>
              <button type="button">Review permission</button>
            </article>
            <article className="cl-danger-control">
              <Trash2 size={20} /><span>DELETE</span><h3>Delete stored data</h3><p>Removal is permanent after confirmation. Connected sources are not deleted at their provider.</p>
              <button type="button" onClick={() => setDeleteConfirm((value) => !value)}>{deleteConfirm ? "Cancel confirmation" : "Review deletion"}</button>
            </article>
          </div>
          {exportReady && <div className="cl-control-notice" role="status"><FileCheck2 size={17} /><span>Your fictional demo export is ready.</span><button type="button"><Download size={16} /> Download archive</button></div>}
          {deleteConfirm && (
            <div className="cl-delete-confirm" role="alert">
              <AlertTriangle size={19} /><div><strong>Deletion is permanent.</strong><p>This demo will not delete anything. A production flow would require identity confirmation and a final record of the request.</p></div><button type="button" onClick={() => setDeleteConfirm(false)}>Keep demo data</button>
            </div>
          )}
        </section>

        <section className="cl-dashboard-boundary" aria-labelledby="cl-dashboard-boundary-title">
          <AlertTriangle size={24} aria-hidden="true" />
          <div><span>ALWAYS AVAILABLE</span><h2 id="cl-dashboard-boundary-title">Care Ledger is not medical advice or emergency monitoring.</h2><p>Do not use this record to diagnose a condition, change treatment, or delay care. For urgent concerns, contact a licensed clinician. If you think you may have a medical emergency, call local emergency services now.</p></div>
        </section>
      </main>

      <nav className="cl-mobile-tabs" aria-label="Primary mobile navigation">
        {dashboardNav.slice(0, 4).map(({ id, label, icon: Icon }) => (
          <button className={activeSection === id ? "is-active" : ""} type="button" onClick={() => goToSection(id)} key={id}><Icon size={19} /><span>{label.replace("Weekly ", "")}</span></button>
        ))}
        <button type="button" onClick={() => setMobileNavOpen(true)}><Menu size={19} /><span>More</span></button>
      </nav>
    </div>
  );
}
