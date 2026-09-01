import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CareLedgerDashboard, CareLedgerMarketing } from "./candidates/care-ledger/Candidate";
import { DailyCompassDashboard, DailyCompassMarketing } from "./candidates/daily-compass/Candidate";
import { EvidenceThreadDashboard, EvidenceThreadMarketing } from "./candidates/evidence-thread/Candidate";
import "./styles.css";

type CandidateId = "evidence-thread" | "care-ledger" | "daily-compass";
type Surface = "marketing" | "dashboard";

const candidates: Record<CandidateId, { label: string; shortLabel: string }> = {
  "evidence-thread": { label: "Evidence Thread", shortLabel: "Thread" },
  "care-ledger": { label: "Care Ledger", shortLabel: "Ledger" },
  "daily-compass": { label: "Daily Compass", shortLabel: "Compass" }
};

function readLocation() {
  const params = new URLSearchParams(window.location.search);
  const candidate = params.get("candidate") as CandidateId | null;
  return {
    candidate: candidate && candidate in candidates ? candidate : "evidence-thread",
    surface: window.location.pathname.startsWith("/app") ? "dashboard" : "marketing"
  } as { candidate: CandidateId; surface: Surface };
}

function App() {
  const initial = useMemo(readLocation, []);
  const [candidate, setCandidate] = useState<CandidateId>(initial.candidate);
  const [surface, setSurface] = useState<Surface>(initial.surface);

  useEffect(() => {
    const handlePopState = () => {
      const next = readLocation();
      setCandidate(next.candidate);
      setSurface(next.surface);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextSurface: Surface, nextCandidate = candidate) => {
    const path = nextSurface === "dashboard" ? "/app" : "/";
    window.history.pushState({}, "", `${path}?candidate=${nextCandidate}`);
    setCandidate(nextCandidate);
    setSurface(nextSurface);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseCandidate = (nextCandidate: CandidateId) => {
    window.history.pushState({}, "", `${surface === "dashboard" ? "/app" : "/"}?candidate=${nextCandidate}`);
    setCandidate(nextCandidate);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const commonProps = {
    onOpenDashboard: () => navigate("dashboard"),
    onOpenMarketing: () => navigate("marketing")
  };

  let experience;
  if (candidate === "care-ledger") {
    experience = surface === "dashboard" ? <CareLedgerDashboard {...commonProps} /> : <CareLedgerMarketing {...commonProps} />;
  } else if (candidate === "daily-compass") {
    experience = surface === "dashboard" ? <DailyCompassDashboard {...commonProps} /> : <DailyCompassMarketing {...commonProps} />;
  } else {
    experience = surface === "dashboard" ? <EvidenceThreadDashboard {...commonProps} /> : <EvidenceThreadMarketing {...commonProps} />;
  }

  return (
    <>
      <aside className="candidate-switcher" aria-label="Design candidate preview">
        <span className="candidate-switcher__label">Protocol candidate</span>
        <div className="candidate-switcher__options">
          {(Object.keys(candidates) as CandidateId[]).map((id) => (
            <button
              className={id === candidate ? "is-active" : ""}
              type="button"
              onClick={() => chooseCandidate(id)}
              aria-pressed={id === candidate}
              key={id}
            >
              <span className="candidate-switcher__full">{candidates[id].label}</span>
              <span className="candidate-switcher__short">{candidates[id].shortLabel}</span>
            </button>
          ))}
        </div>
      </aside>
      {experience}
    </>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing root element");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
