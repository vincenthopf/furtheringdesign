#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const capturePath = fileURLToPath(new URL("./capture.mjs", import.meta.url));

function value(name, source = args) {
  const index = source.indexOf(name);
  return index >= 0 && index + 1 < source.length ? source[index + 1] : undefined;
}

function withoutOption(source, name) {
  const index = source.indexOf(name);
  if (index < 0) return [...source];
  return source.filter((_, itemIndex) => itemIndex !== index && itemIndex !== index + 1);
}

function execute(forwarded) {
  return new Promise((resolveExit, reject) => {
    const child = spawn(process.execPath, [capturePath, ...forwarded], { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (signal) reject(new Error(`Capture terminated by ${signal}`));
      else resolveExit(code ?? 1);
    });
  });
}

async function main() {
  const routeMapPath = value("--route-map");
  if (!routeMapPath) {
    process.exitCode = await execute(args);
    return;
  }
  const intentPath = value("--intent");
  if (!intentPath) throw new Error("--route-map requires --intent");
  const [intent, routeMap] = await Promise.all([
    readFile(resolve(intentPath), "utf8").then(JSON.parse),
    readFile(resolve(routeMapPath), "utf8").then(JSON.parse)
  ]);
  const states = Array.isArray(intent.states) ? intent.states : [];
  const unknown = Object.keys(routeMap).filter((stateRef) => !states.some((state) => state.id === stateRef));
  if (unknown.length) throw new Error(`Route map references unknown states: ${unknown.join(", ")}`);
  const mappedIntent = {
    ...intent,
    states: states.map((state) => routeMap[state.id] ? { ...state, path: routeMap[state.id] } : state)
  };
  const directory = await mkdtemp(join(tmpdir(), "furthering-design-route-map-"));
  try {
    const temporaryIntent = join(directory, "intent.json");
    await writeFile(temporaryIntent, `${JSON.stringify(mappedIntent, null, 2)}\n`);
    const forwarded = withoutOption(args, "--route-map");
    forwarded[forwarded.indexOf("--intent") + 1] = temporaryIntent;
    process.exitCode = await execute(forwarded);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
