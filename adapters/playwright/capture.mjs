#!/usr/bin/env node
import AxeBuilder from "@axe-core/playwright";
import { chromium, firefox, webkit } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const browserTypes = { chromium, firefox, webkit };
const args = process.argv.slice(2);
const value = (name) => args[args.indexOf(name) + 1];
const required = (name) => {
  const result = value(name);
  if (!result) throw new Error(`Missing ${name}`);
  return result;
};

function nodeRef(element) {
  if (!element) return "document";
  if (element.id) return `#${element.id}`;
  const testId = element.getAttribute?.("data-testid");
  if (testId) return `[data-testid="${testId}"]`;
  const role = element.getAttribute?.("role") || element.tagName?.toLowerCase() || "node";
  const label = (element.getAttribute?.("aria-label") || element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 64);
  return `${role}:${label || "unnamed"}`;
}

async function structure(page) {
  return page.evaluate((source) => {
    const ref = new Function(`return (${source})`)();
    const visible = (element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && box.width > 0 && box.height > 0;
    };
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(visible).map((element) => ({
      ref: ref(element),
      level: Number(element.tagName.slice(1)),
      text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120)
    }));
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    const targets = [...document.querySelectorAll("a[href],button,input,select,textarea,[role='button'],[tabindex]")]
      .filter(visible)
      .map((element) => {
        const box = element.getBoundingClientRect();
        return { ref: ref(element), width: Math.round(box.width), height: Math.round(box.height) };
      });
    return {
      headings,
      landmarks: [...document.querySelectorAll("header,nav,main,aside,footer,[role]")].filter(visible).map(ref),
      duplicateIds,
      smallTargets: targets.filter((target) => target.width < 24 || target.height < 24),
      horizontalOverflowPx: Math.max(0, Math.round(document.documentElement.scrollWidth - document.documentElement.clientWidth))
    };
  }, nodeRef.toString());
}

async function focusTrace(page, limit = 30) {
  const result = [];
  const seen = new Set();
  for (let index = 0; index < limit; index += 1) {
    await page.keyboard.press("Tab");
    const current = await page.evaluate((source) => {
      const ref = new Function(`return (${source})`)();
      const element = document.activeElement;
      if (!element || element === document.body) return null;
      const box = element.getBoundingClientRect();
      return { ref: ref(element), visible: box.width > 0 && box.height > 0 };
    }, nodeRef.toString());
    if (!current || seen.has(current.ref)) break;
    result.push(current);
    seen.add(current.ref);
  }
  return result;
}

function signal(candidateId, stateRef, browser, id, signalClass, dimension, status, normalized, confidence, severity, node, evidence, rationale, recommendation) {
  return {
    id: `${candidateId}-${stateRef}-${browser}-${id}`,
    class: signalClass,
    dimension,
    source: `playwright-${browser}`,
    status,
    normalized,
    confidence,
    severity,
    stateRef,
    nodeRef: node,
    evidence,
    rationale,
    recommendation
  };
}

function signals(candidateId, state, browser, axe, outline, focus) {
  const serious = axe.violations.filter((violation) => ["critical", "serious"].includes(violation.impact));
  const invisibleFocus = focus.filter((entry) => !entry.visible);
  return [
    signal(candidateId, state.id, browser, "axe", "A", "accessibility", serious.length ? "fail" : "pass", serious.length ? 0.35 : 1, 0.98, serious.length ? "blocker" : "note", "document", serious.length ? serious.map((violation) => `${violation.id}: ${violation.help}`).join("; ") : "No critical or serious axe violations.", "Automated access failures break the hard contract.", serious.length ? "Resolve every reported node and rerun." : "Complete manual assistive-technology review."),
    signal(candidateId, state.id, browser, "focus", "A", "accessibility", !focus.length || invisibleFocus.length ? "fail" : "pass", !focus.length || invisibleFocus.length ? 0.4 : 0.95, 0.9, !focus.length || invisibleFocus.length ? "major" : "note", invisibleFocus[0]?.ref || focus[0]?.ref || "document", `${focus.length} focus stops; ${invisibleFocus.length} invisible.`, "The task needs a visible keyboard path.", !focus.length || invisibleFocus.length ? "Repair focusability, order, and visibility." : "Run task-specific keyboard review."),
    signal(candidateId, state.id, browser, "overflow", "B", "responsiveResilience", outline.horizontalOverflowPx ? "fail" : "pass", outline.horizontalOverflowPx ? 0.4 : 1, 0.98, outline.horizontalOverflowPx ? "major" : "note", "document", `${outline.horizontalOverflowPx}px horizontal overflow.`, "The state must fit its declared viewport.", outline.horizontalOverflowPx ? "Find the overflowing semantic region and re-compose it." : "Retain as a regression check."),
    signal(candidateId, state.id, browser, "structure", "B", "hierarchy", outline.headings.length && outline.landmarks.length ? "pass" : "unknown", outline.headings.length && outline.landmarks.length ? 0.9 : 0.5, 0.78, "minor", "document", `${outline.headings.length} headings, ${outline.landmarks.length} landmarks, ${outline.duplicateIds.length} duplicate ids.`, "Semantic structure should support the visible hierarchy.", "Review heading order, landmarks, duplicate ids, and visual salience together."),
    signal(candidateId, state.id, browser, "targets", "B", "accessibility", outline.smallTargets.length ? "unknown" : "pass", outline.smallTargets.length ? 0.7 : 1, 0.65, "minor", outline.smallTargets[0]?.ref || "document", `${outline.smallTargets.length} targets are below 24px in at least one dimension.`, "Target-size exceptions require contextual review.", "Review spacing and equivalent controls manually.")
  ];
}

async function main() {
  const url = required("--url");
  const intent = JSON.parse(await readFile(resolve(required("--intent")), "utf8"));
  const candidateId = required("--candidate");
  const output = resolve(required("--out"));
  const captures = [];
  const evidenceSignals = [];
  await mkdir(output, { recursive: true });

  for (const [browserName, browserType] of Object.entries(browserTypes)) {
    const browser = await browserType.launch({ headless: true });
    try {
      for (const state of intent.states) {
        const context = await browser.newContext({
          viewport: state.viewport,
          colorScheme: state.colorScheme === "no-preference" ? undefined : state.colorScheme,
          reducedMotion: state.reducedMotion ? "reduce" : "no-preference",
          locale: state.locale
        });
        const page = await context.newPage();
        await page.goto(url, { waitUntil: "networkidle" });
        const directory = resolve(output, browserName, state.id);
        await mkdir(directory, { recursive: true });
        const screenshot = resolve(directory, "page.png");
        await page.screenshot({ path: screenshot, fullPage: true, animations: state.reducedMotion ? "disabled" : "allow" });
        const outline = await structure(page);
        const focus = await focusTrace(page);
        const axe = await new AxeBuilder({ page }).analyze();
        const nodeMap = resolve(directory, "evidence.json");
        await writeFile(nodeMap, `${JSON.stringify({ outline, focus, axe }, null, 2)}\n`);
        captures.push({ browser: browserName, stateRef: state.id, url, viewport: state.viewport, screenshot, nodeMap });
        evidenceSignals.push(...signals(candidateId, state, browserName, axe, outline, focus));
        await context.close();
      }
    } finally {
      await browser.close();
    }
  }

  const evidence = { schemaVersion: "1.0.0", candidateId, captures, signals: evidenceSignals };
  await writeFile(resolve(output, "evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);
  process.stdout.write(`${captures.length} captures and ${evidenceSignals.length} signals written to ${output}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
