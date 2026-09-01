#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { validateCandidate } from "./lib/candidate.mjs";
import { validateIntent } from "./lib/intent.mjs";
import { createDesignPacket } from "./lib/packet.mjs";
import { renderEvaluationMarkdown } from "./lib/report.mjs";
import { createRevisionPlan } from "./lib/revision.mjs";
import { evaluateRun } from "./lib/tournament.mjs";

const help = `Furthering Design Protocol

Usage:
  furthering-design validate-intent <intent.json> [--out result.json]
  furthering-design validate-candidate <candidate.json> [--intent intent.json] [--out result.json]
  furthering-design evaluate <run.json> [--format json|markdown] [--out report]
  furthering-design plan-revision <run.json> [--candidate id] [--out plan.json]
  furthering-design packet <intent.json> --out <directory>
`;

async function readJson(path) {
  const content = await readFile(resolve(path), "utf8");
  return JSON.parse(content);
}

function optionValue(args, name, fallback = null) {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
}

async function emit(content, outputPath) {
  if (!outputPath) {
    process.stdout.write(content);
    return;
  }
  const destination = resolve(outputPath);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content, "utf8");
}

async function main() {
  const argumentsList = process.argv.slice(2);
  if (!argumentsList.length || argumentsList[0] === "help" || argumentsList[0] === "--help" || argumentsList[0] === "-h") {
    process.stdout.write(help);
    return;
  }
  const [command, inputPath, ...args] = argumentsList;
  if (!inputPath) throw new Error(help.trim());

  if (command === "validate-intent") {
    const result = validateIntent(await readJson(inputPath));
    await emit(`${JSON.stringify(result, null, 2)}\n`, optionValue(args, "--out"));
    process.exitCode = result.valid ? 0 : 1;
    return;
  }

  if (command === "validate-candidate") {
    const intentPath = optionValue(args, "--intent");
    const intent = intentPath ? await readJson(intentPath) : null;
    const result = validateCandidate(await readJson(inputPath), intent);
    await emit(`${JSON.stringify(result, null, 2)}\n`, optionValue(args, "--out"));
    process.exitCode = result.valid ? 0 : 1;
    return;
  }

  if (command === "evaluate") {
    const report = evaluateRun(await readJson(inputPath));
    const format = optionValue(args, "--format", "json");
    if (!new Set(["json", "markdown"]).has(format)) throw new Error("--format must be json or markdown");
    const content = format === "markdown" ? renderEvaluationMarkdown(report) : `${JSON.stringify(report, null, 2)}\n`;
    await emit(content, optionValue(args, "--out"));
    process.exitCode = report.status === "invalid" || report.status === "blocked" ? 1 : 0;
    return;
  }

  if (command === "plan-revision") {
    const run = await readJson(inputPath);
    const report = evaluateRun(run);
    const plan = createRevisionPlan(run, { report, candidateId: optionValue(args, "--candidate") });
    await emit(`${JSON.stringify(plan, null, 2)}\n`, optionValue(args, "--out"));
    process.exitCode = plan.status === "invalid" || plan.status === "blocked" ? 1 : 0;
    return;
  }

  if (command === "packet") {
    const outputDirectory = optionValue(args, "--out") ?? args[0];
    if (!outputDirectory) throw new Error("packet requires --out <directory>");
    const validation = validateIntent(await readJson(inputPath));
    if (!validation.valid) {
      await emit(`${JSON.stringify(validation, null, 2)}\n`, null);
      process.exitCode = 1;
      return;
    }
    const packet = createDesignPacket(validation.value);
    await mkdir(resolve(outputDirectory), { recursive: true });
    for (const [name, content] of Object.entries(packet)) await writeFile(resolve(outputDirectory, name), content, "utf8");
    process.stdout.write(`${Object.keys(packet).length} packet files written to ${resolve(outputDirectory)}\n`);
    return;
  }

  throw new Error(`Unknown command: ${command}\n\n${help}`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
