#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { validateCandidate } from "./lib/candidate.mjs";
import { validateIntent } from "./lib/intent.mjs";
import { createDesignPacket } from "./lib/packet.mjs";
import { renderEvaluationMarkdown } from "./lib/report.mjs";
import { evaluateRun } from "./lib/tournament.mjs";

async function readJson(path) {
  const content = await readFile(resolve(path), "utf8");
  return JSON.parse(content);
}

function optionValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
}

async function emit(content, outputPath) {
  if (outputPath) {
    await writeFile(resolve(outputPath), content, "utf8");
  } else {
    process.stdout.write(content);
  }
}

async function main() {
  const [command, inputPath, ...args] = process.argv.slice(2);
  if (!command || !inputPath) {
    throw new Error("Usage: furthering-design <validate-intent|validate-candidate|evaluate|packet> <input.json> [options]");
  }

  if (command === "validate-intent") {
    const result = validateIntent(await readJson(inputPath));
    await emit(`${JSON.stringify(result, null, 2)}\n`, optionValue(args, "--out", null));
    process.exitCode = result.valid ? 0 : 1;
    return;
  }

  if (command === "validate-candidate") {
    const result = validateCandidate(await readJson(inputPath));
    await emit(`${JSON.stringify(result, null, 2)}\n`, optionValue(args, "--out", null));
    process.exitCode = result.valid ? 0 : 1;
    return;
  }

  if (command === "evaluate") {
    const report = evaluateRun(await readJson(inputPath));
    const format = optionValue(args, "--format", "json");
    const content = format === "markdown" ? renderEvaluationMarkdown(report) : `${JSON.stringify(report, null, 2)}\n`;
    await emit(content, optionValue(args, "--out", null));
    process.exitCode = report.status === "invalid" || report.status === "blocked" ? 1 : 0;
    return;
  }

  if (command === "packet") {
    const outputDirectory = optionValue(args, "--out", null) ?? args[0];
    if (!outputDirectory) throw new Error("packet requires --out <directory>");
    const packet = createDesignPacket(await readJson(inputPath));
    await mkdir(resolve(outputDirectory), { recursive: true });
    for (const [name, content] of Object.entries(packet)) {
      await writeFile(resolve(outputDirectory, name), content, "utf8");
    }
    process.stdout.write(`${Object.keys(packet).length} packet files written to ${resolve(outputDirectory)}\n`);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
