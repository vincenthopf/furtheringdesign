import { writeFileSync } from "node:fs";
import { createRevisionPlan, evaluateRun, renderEvaluationMarkdown, validateRun } from "../../runtime/index.mjs";
import { run } from "./fixture.mjs";

const command = process.argv[2] ?? "evaluate";
if (command === "validate") {
  process.stdout.write(`${JSON.stringify(validateRun(run), null, 2)}\n`);
} else if (command === "evaluate") {
  process.stdout.write(renderEvaluationMarkdown(evaluateRun(run)));
} else if (command === "plan") {
  const candidateId = process.argv[3] ?? "rationale-only";
  process.stdout.write(`${JSON.stringify(createRevisionPlan(run, { candidateId }), null, 2)}\n`);
} else if (command === "write-run") {
  const path = process.argv[3] ?? "run.generated.json";
  writeFileSync(path, `${JSON.stringify(run, null, 2)}\n`);
  process.stdout.write(`${path}\n`);
} else {
  throw new Error(`Unknown example command: ${command}`);
}
