import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluateRun } from "../../runtime/lib/tournament.mjs";
import { renderEvaluationMarkdown } from "../../runtime/lib/report.mjs";
import { createRevisionPlan } from "../../runtime/lib/revision.mjs";

const directory = fileURLToPath(new URL(".", import.meta.url));
const names = ["evidence-thread", "care-ledger", "daily-compass"];

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function createRun() {
  const intent = await readJson(resolve(directory, "intent.json"));
  const candidates = await Promise.all(names.map(async (name) => ({
    manifest: await readJson(resolve(directory, `candidate-${name}.json`)),
    evidence: await readJson(resolve(directory, "evidence", `${name}.json`))
  })));
  const pairwise = await readJson(resolve(directory, "pairwise.json"));
  return {
    schemaVersion: "1.0.0",
    id: "run-arcwell-health-001",
    intent,
    policy: {
      selectionWeights: {
        evidence: 0.74,
        pairwise: 0.22,
        diversity: 0.04
      },
      diversityFloor: 0.42,
      uncertaintyPenalty: 0.2,
      reviewMargin: 0.025,
      maxUncertainty: 0.34,
      hardGateSeverities: ["blocker", "major"]
    },
    candidates,
    pairwise
  };
}

async function emitReport(run) {
  const report = evaluateRun(run);
  const outputDirectory = resolve(directory, "design-memory");
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(resolve(directory, "run.json"), `${JSON.stringify(run, null, 2)}\n`);
  await writeFile(resolve(outputDirectory, "evaluation.json"), `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(resolve(outputDirectory, "evaluation.md"), renderEvaluationMarkdown(report));
  return report;
}

const [command = "evaluate", candidateId] = process.argv.slice(2);
const run = await createRun();

if (command === "write-run") {
  const destination = resolve(candidateId ?? resolve(directory, "run.json"));
  await writeFile(destination, `${JSON.stringify(run, null, 2)}\n`);
  process.stdout.write(`${destination}\n`);
} else if (command === "plan") {
  const report = await emitReport(run);
  const plan = createRevisionPlan(run, { report, candidateId: candidateId ?? report.recommendedCandidateId });
  const destination = resolve(directory, "design-memory", "revision-plan.json");
  await writeFile(destination, `${JSON.stringify(plan, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
  process.exitCode = plan.status === "invalid" || plan.status === "blocked" ? 1 : 0;
} else if (command === "evaluate") {
  const report = await emitReport(run);
  process.stdout.write(renderEvaluationMarkdown(report));
  process.exitCode = report.status === "invalid" || report.status === "blocked" ? 1 : 0;
} else {
  throw new Error(`Unknown command: ${command}`);
}
