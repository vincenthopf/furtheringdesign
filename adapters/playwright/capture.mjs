#!/usr/bin/env node
import AxeBuilder from "@axe-core/playwright";
import { chromium, firefox, webkit } from "playwright";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const browserTypes = { chromium, firefox, webkit };
const args = process.argv.slice(2);
const value = (name) => {
  const index = args.indexOf(name);
  return index >= 0 && index + 1 < args.length ? args[index + 1] : undefined;
};
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

async function sha256(path) {
  const content = await readFile(path);
  return createHash("sha256").update(content).digest("hex");
}

async function structure(page) {
  return page.evaluate((source) => {
    const ref = new Function(`return (${source})`)();
    const visible = (element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0 && box.width > 0 && box.height > 0;
    };
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(visible).map((element) => ({
      ref: ref(element),
      level: Number(element.tagName.slice(1)),
      fontSize: Number.parseFloat(getComputedStyle(element).fontSize) || 0,
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
    const clippedText = [...document.querySelectorAll("body *")]
      .filter((element) => visible(element) && element.childElementCount === 0 && (element.textContent || "").trim())
      .filter((element) => {
        const style = getComputedStyle(element);
        const clips = ["hidden", "clip"].includes(style.overflow) || ["hidden", "clip"].includes(style.overflowX) || ["hidden", "clip"].includes(style.overflowY);
        return clips && (element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1);
      })
      .slice(0, 20)
      .map((element) => ({ ref: ref(element), text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100) }));
    const interactive = [...document.querySelectorAll("a[href],button,input,select,textarea,[role='button'],[role='link'],[tabindex]")].filter(visible);
    const interactiveOverlaps = [];
    for (let leftIndex = 0; leftIndex < interactive.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < interactive.length; rightIndex += 1) {
        const left = interactive[leftIndex];
        const right = interactive[rightIndex];
        if (left.contains(right) || right.contains(left)) continue;
        if (left.closest("[data-fd-overlap='allow']") || right.closest("[data-fd-overlap='allow']")) continue;
        const leftBox = left.getBoundingClientRect();
        const rightBox = right.getBoundingClientRect();
        const width = Math.max(0, Math.min(leftBox.right, rightBox.right) - Math.max(leftBox.left, rightBox.left));
        const height = Math.max(0, Math.min(leftBox.bottom, rightBox.bottom) - Math.max(leftBox.top, rightBox.top));
        const overlap = width * height;
        const minimumArea = Math.min(leftBox.width * leftBox.height, rightBox.width * rightBox.height);
        if (minimumArea > 0 && overlap / minimumArea > 0.1) interactiveOverlaps.push({ left: ref(left), right: ref(right), ratio: Math.round((overlap / minimumArea) * 100) / 100 });
        if (interactiveOverlaps.length >= 20) break;
      }
      if (interactiveOverlaps.length >= 20) break;
    }
    const longLines = [...document.querySelectorAll("p,li,blockquote,dd")]
      .filter((element) => visible(element) && (element.textContent || "").trim().length > 100)
      .map((element) => {
        const box = element.getBoundingClientRect();
        const fontSize = Number.parseFloat(getComputedStyle(element).fontSize) || 16;
        return { ref: ref(element), measure: Math.round((box.width / fontSize) * 2), textLength: (element.textContent || "").trim().length };
      })
      .filter((entry) => entry.measure > 90)
      .slice(0, 20);
    return {
      headings,
      landmarks: [...document.querySelectorAll("header,nav,main,aside,footer,[role]")].filter(visible).map(ref),
      duplicateIds,
      smallTargets: targets.filter((target) => target.width < 24 || target.height < 24),
      clippedText,
      interactiveOverlaps,
      longLines,
      horizontalOverflowPx: Math.max(0, Math.round(document.documentElement.scrollWidth - document.documentElement.clientWidth))
    };
  }, nodeRef.toString());
}

async function renderProfile(page, browser, stateRef, artifactRef) {
  return page.evaluate(({ browserName, stateId, artifact, refSource }) => {
    const ref = new Function(`return (${refSource})`)();
    const viewportWidth = Math.max(1, document.documentElement.clientWidth);
    const viewportHeight = Math.max(1, document.documentElement.clientHeight);
    const viewportArea = viewportWidth * viewportHeight;
    const normalize = (values, share = 1) => {
      const total = values.reduce((sum, item) => sum + item, 0);
      return values.map((item) => total ? (item / total) * share : 0);
    };
    const clamp = (number) => Math.min(1, Math.max(0, number));
    const visible = (element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0 && box.width > 0 && box.height > 0 && box.bottom > 0 && box.right > 0 && box.top < viewportHeight && box.left < viewportWidth;
    };
    const rgb = (value) => {
      const match = String(value).match(/rgba?\((\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)(?:[, /]+(\d+(?:\.\d+)?))?\)/i);
      if (!match) return null;
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      if (alpha <= 0.02) return null;
      return [Number(match[1]) / 255, Number(match[2]) / 255, Number(match[3]) / 255, alpha];
    };
    const hsl = ([red, green, blue]) => {
      const maximum = Math.max(red, green, blue);
      const minimum = Math.min(red, green, blue);
      const lightness = (maximum + minimum) / 2;
      const delta = maximum - minimum;
      if (!delta) return [0, 0, lightness];
      const saturation = delta / (1 - Math.abs(2 * lightness - 1));
      let hue = 0;
      if (maximum === red) hue = 60 * (((green - blue) / delta) % 6);
      else if (maximum === green) hue = 60 * ((blue - red) / delta + 2);
      else hue = 60 * ((red - green) / delta + 4);
      if (hue < 0) hue += 360;
      return [hue, saturation, lightness];
    };
    const colorBucket = (value) => {
      const parsed = rgb(value);
      if (!parsed) return null;
      const [hue, saturation, lightness] = hsl(parsed);
      if (saturation < 0.08) return Math.min(3, Math.floor(lightness * 4));
      return 4 + Math.min(23, Math.floor(hue / 30) * 2 + Math.min(1, Math.floor(lightness * 2)));
    };
    const elements = [...document.querySelectorAll("body *")].filter(visible).slice(0, 800);
    const occupancy = Array(16).fill(0);
    const centroids = Array(16).fill(0);
    const roles = Array(8).fill(0);
    const palette = Array(28).fill(0);
    const sizeBins = Array(8).fill(0);
    const weightBins = Array(4).fill(0);
    const lineHeightBins = Array(4).fill(0);
    const fontFamilies = new Set();
    const colors = new Set();
    let textCharacters = 0;
    let interactiveCount = 0;
    let imageCount = 0;
    let headingCount = 0;
    let shadowCount = 0;
    let roundedCount = 0;
    let radiusTotal = 0;
    let largeRegionCount = 0;
    let smallRegionCount = 0;
    const roleIndex = (element) => {
      if (element.matches("header,nav,[role='banner'],[role='navigation']")) return 0;
      if (element.matches("main,[role='main']")) return 1;
      if (element.matches("section,article,[role='region'],[role='article']")) return 2;
      if (element.matches("h1,h2,h3,h4,h5,h6")) return 3;
      if (element.matches("a[href],button,input,select,textarea,[role='button'],[role='link']")) return 4;
      if (element.matches("img,picture,video,canvas,svg")) return 5;
      if (element.matches("aside,[role='complementary']")) return 6;
      if (element.matches("footer,[role='contentinfo']")) return 7;
      return null;
    };
    for (const element of elements) {
      const box = element.getBoundingClientRect();
      const left = Math.max(0, box.left);
      const top = Math.max(0, box.top);
      const right = Math.min(viewportWidth, box.right);
      const bottom = Math.min(viewportHeight, box.bottom);
      const width = Math.max(0, right - left);
      const height = Math.max(0, bottom - top);
      const area = width * height;
      if (!area) continue;
      const xStart = Math.max(0, Math.floor((left / viewportWidth) * 4));
      const xEnd = Math.min(3, Math.floor(((Math.max(left, right - 0.01)) / viewportWidth) * 4));
      const yStart = Math.max(0, Math.floor((top / viewportHeight) * 4));
      const yEnd = Math.min(3, Math.floor(((Math.max(top, bottom - 0.01)) / viewportHeight) * 4));
      for (let y = yStart; y <= yEnd; y += 1) {
        for (let x = xStart; x <= xEnd; x += 1) {
          const cellLeft = (x / 4) * viewportWidth;
          const cellRight = ((x + 1) / 4) * viewportWidth;
          const cellTop = (y / 4) * viewportHeight;
          const cellBottom = ((y + 1) / 4) * viewportHeight;
          const intersection = Math.max(0, Math.min(right, cellRight) - Math.max(left, cellLeft)) * Math.max(0, Math.min(bottom, cellBottom) - Math.max(top, cellTop));
          occupancy[y * 4 + x] += intersection;
        }
      }
      const centerX = Math.min(3, Math.max(0, Math.floor((((left + right) / 2) / viewportWidth) * 4)));
      const centerY = Math.min(3, Math.max(0, Math.floor((((top + bottom) / 2) / viewportHeight) * 4)));
      centroids[centerY * 4 + centerX] += 1;
      const indexedRole = roleIndex(element);
      if (indexedRole !== null) roles[indexedRole] += 1;
      const style = getComputedStyle(element);
      const backgroundBucket = colorBucket(style.backgroundColor);
      const textBucket = colorBucket(style.color);
      const borderBucket = colorBucket(style.borderTopColor);
      if (backgroundBucket !== null) {
        palette[backgroundBucket] += Math.min(area / viewportArea, 1);
        colors.add(`${backgroundBucket}`);
      }
      const text = (element.childElementCount === 0 ? element.textContent || "" : "").trim();
      const characters = text.length;
      if (characters && textBucket !== null) {
        palette[textBucket] += Math.min((characters * (Number.parseFloat(style.fontSize) || 16)) / 10000, 0.4);
        colors.add(`${textBucket}`);
      }
      if (borderBucket !== null && Number.parseFloat(style.borderTopWidth) > 0) palette[borderBucket] += Math.min((width + height) / (viewportWidth + viewportHeight), 0.2);
      if (characters) {
        const fontSize = Number.parseFloat(style.fontSize) || 16;
        const sizeThresholds = [12, 14, 16, 20, 28, 40, 64];
        const sizeIndex = sizeThresholds.findIndex((threshold) => fontSize < threshold);
        sizeBins[sizeIndex === -1 ? 7 : sizeIndex] += characters;
        const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
        weightBins[fontWeight < 400 ? 0 : fontWeight < 600 ? 1 : fontWeight < 750 ? 2 : 3] += characters;
        const lineHeight = Number.parseFloat(style.lineHeight) || fontSize * 1.2;
        const ratio = lineHeight / fontSize;
        lineHeightBins[ratio < 1.15 ? 0 : ratio < 1.35 ? 1 : ratio < 1.6 ? 2 : 3] += characters;
        fontFamilies.add(style.fontFamily.split(",")[0].trim().replace(/["']/g, ""));
        textCharacters += characters;
      }
      if (element.matches("a[href],button,input,select,textarea,[role='button'],[role='link'],[tabindex]")) interactiveCount += 1;
      if (element.matches("img,picture,video,canvas,svg")) imageCount += 1;
      if (element.matches("h1,h2,h3,h4,h5,h6")) headingCount += 1;
      if (style.boxShadow && style.boxShadow !== "none") shadowCount += 1;
      const radius = Number.parseFloat(style.borderTopLeftRadius) || 0;
      if (radius > 0) {
        roundedCount += 1;
        radiusTotal += radius;
      }
      if (area / viewportArea > 0.2) largeRegionCount += 1;
      if (area / viewportArea < 0.002) smallRegionCount += 1;
    }
    const layout = [
      ...normalize(occupancy, 0.5),
      ...normalize(centroids, 0.3),
      ...normalize(roles, 0.2)
    ].map(clamp);
    const typography = [
      ...normalize(sizeBins, 0.5),
      ...normalize(weightBins, 0.25),
      ...normalize(lineHeightBins, 0.25)
    ].map(clamp);
    const density = [
      clamp(elements.length / 500),
      clamp(interactiveCount / 80),
      clamp(textCharacters / 8000),
      clamp(imageCount / 40),
      clamp(largeRegionCount / 20),
      clamp(smallRegionCount / 200),
      clamp(shadowCount / 80),
      clamp(roundedCount ? radiusTotal / roundedCount / 40 : 0)
    ];
    return {
      browser: browserName,
      stateRef: stateId,
      artifactRef: artifact,
      vectors: {
        layout,
        palette: normalize(palette).map(clamp),
        typography,
        density
      },
      metrics: {
        elementCount: elements.length,
        interactiveCount,
        textCharacters,
        imageCount,
        headingCount,
        fontFamilyCount: fontFamilies.size,
        colorBucketCount: colors.size,
        shadowCount,
        roundedCount,
        averageRadius: roundedCount ? Math.round((radiusTotal / roundedCount) * 100) / 100 : 0,
        sampledNodes: elements.slice(0, 80).map((element) => ref(element))
      }
    };
  }, { browserName: browser, stateId: stateRef, artifact: artifactRef, refSource: nodeRef.toString() });
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

function signal(candidateId, stateRef, browser, id, signalClass, dimension, status, normalized, confidence, severity, node, evidence, rationale, recommendation, options = {}) {
  const result = {
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
  if (Array.isArray(options.obligationRefs) && options.obligationRefs.length) {
    result.obligationRefs = options.obligationRefs;
    result.implementation = options.implementation;
  }
  return result;
}

function signals(candidateId, state, browser, axe, outline, focus) {
  const serious = axe.violations.filter((violation) => ["critical", "serious"].includes(violation.impact));
  const invisibleFocus = focus.filter((entry) => !entry.visible);
  const structurePasses = outline.headings.length && outline.landmarks.length && !outline.duplicateIds.length;
  const clipScore = Math.max(0, 1 - outline.clippedText.length / 5);
  const overlapScore = Math.max(0, 1 - outline.interactiveOverlaps.length / 3);
  const measureScore = Math.max(0, 1 - outline.longLines.length / 5);
  return [
    signal(candidateId, state.id, browser, "axe", "A", "accessibility", serious.length ? "fail" : "pass", serious.length ? 0.35 : 1, 0.98, serious.length ? "blocker" : "note", "document", serious.length ? serious.map((violation) => `${violation.id}: ${violation.help}`).join("; ") : "No critical or serious axe violations.", "Automated access failures break the hard contract.", serious.length ? "Resolve every reported node and rerun." : "Complete manual assistive-technology review."),
    signal(candidateId, state.id, browser, "focus", "A", "accessibility", !focus.length || invisibleFocus.length ? "fail" : "pass", !focus.length || invisibleFocus.length ? 0.4 : 0.95, 0.9, !focus.length || invisibleFocus.length ? "major" : "note", invisibleFocus[0]?.ref || focus[0]?.ref || "document", `${focus.length} focus stops; ${invisibleFocus.length} invisible.`, "The task needs a visible keyboard path.", !focus.length || invisibleFocus.length ? "Repair focusability, order, and visibility." : "Run task-specific keyboard review."),
    signal(candidateId, state.id, browser, "overflow", "B", "responsiveResilience", outline.horizontalOverflowPx ? "fail" : "pass", outline.horizontalOverflowPx ? 0.4 : 1, 0.98, outline.horizontalOverflowPx ? "major" : "note", "document", `${outline.horizontalOverflowPx}px horizontal overflow.`, "The state must fit its declared viewport.", outline.horizontalOverflowPx ? "Find the overflowing semantic region and re-compose it." : "Retain as a regression check."),
    signal(candidateId, state.id, browser, "clipping", "B", "responsiveResilience", outline.clippedText.length ? "fail" : "pass", clipScore, 0.94, outline.clippedText.length ? "major" : "note", outline.clippedText[0]?.ref || "document", `${outline.clippedText.length} clipped text nodes.`, "Invisible truncation removes content and often signals broken responsive composition.", outline.clippedText.length ? "Repair the listed containers and retest the exact state." : "Retain as a regression check."),
    signal(candidateId, state.id, browser, "overlap", "B", "taskClarity", outline.interactiveOverlaps.length ? "fail" : "pass", overlapScore, 0.92, outline.interactiveOverlaps.length ? "major" : "note", outline.interactiveOverlaps[0]?.left || "document", `${outline.interactiveOverlaps.length} overlapping interactive-control pairs.`, "Controls that occupy the same hit region create ambiguous or blocked actions.", outline.interactiveOverlaps.length ? "Separate the listed hit regions or explicitly mark an intentional overlap." : "Retain as a regression check."),
    signal(candidateId, state.id, browser, "structure", "B", "hierarchy", structurePasses ? "pass" : "unknown", structurePasses ? 0.9 : 0.5, 0.78, outline.duplicateIds.length ? "minor" : "note", "document", `${outline.headings.length} headings, ${outline.landmarks.length} landmarks, ${outline.duplicateIds.length} duplicate ids.`, "Semantic structure should support the visible hierarchy.", "Review heading order, landmarks, duplicate ids, and visual salience together."),
    signal(candidateId, state.id, browser, "measure", "B", "hierarchy", outline.longLines.length ? "unknown" : "pass", measureScore, 0.68, "minor", outline.longLines[0]?.ref || "document", `${outline.longLines.length} long-form blocks exceed an estimated 90-character measure.`, "Long measure can reduce reading fluency but depends on typography and audience.", outline.longLines.length ? "Review the listed reading blocks in context." : "Retain as a regression check."),
    signal(candidateId, state.id, browser, "targets", "B", "accessibility", outline.smallTargets.length ? "unknown" : "pass", outline.smallTargets.length ? 0.7 : 1, 0.65, "minor", outline.smallTargets[0]?.ref || "document", `${outline.smallTargets.length} targets are below 24px in at least one dimension.`, "Target-size exceptions require contextual review.", "Review spacing and equivalent controls manually.")
  ];
}

function metricSnapshot(outline, profile, focus, axe) {
  return {
    outline: {
      horizontalOverflowPx: outline.horizontalOverflowPx,
      clippedTextCount: outline.clippedText.length,
      interactiveOverlapCount: outline.interactiveOverlaps.length,
      longLineCount: outline.longLines.length,
      headingCount: outline.headings.length,
      landmarkCount: outline.landmarks.length,
      duplicateIdCount: outline.duplicateIds.length,
      smallTargetCount: outline.smallTargets.length
    },
    focus: {
      count: focus.length,
      invisibleCount: focus.filter((entry) => !entry.visible).length
    },
    axe: {
      violationCount: axe.violations.length,
      criticalSeriousCount: axe.violations.filter((violation) => ["critical", "serious"].includes(violation.impact)).length
    },
    profile: profile.metrics
  };
}

function metricAt(snapshot, path) {
  return String(path).split(".").reduce((value, key) => value === undefined || value === null ? undefined : value[key], snapshot);
}

function compareMetric(observed, automation) {
  if (observed === undefined) return { status: "unknown", normalized: 0.5, implementation: "unknown" };
  const expected = automation.expected;
  const tolerance = automation.tolerance ?? 0;
  let pass = false;
  if (automation.operator === "eq") pass = typeof observed === "number" && typeof expected === "number" ? Math.abs(observed - expected) <= tolerance : observed === expected;
  else if (automation.operator === "neq") pass = observed !== expected;
  else if (automation.operator === "lt") pass = Number(observed) < Number(expected) + tolerance;
  else if (automation.operator === "lte") pass = Number(observed) <= Number(expected) + tolerance;
  else if (automation.operator === "gt") pass = Number(observed) > Number(expected) - tolerance;
  else if (automation.operator === "gte") pass = Number(observed) >= Number(expected) - tolerance;
  else pass = Array.isArray(observed) ? observed.includes(expected) : String(observed).includes(String(expected));
  return { status: pass ? "pass" : "fail", normalized: pass ? 1 : 0, implementation: pass ? "full" : "none" };
}

function automatedObligationSignals(candidateId, state, browser, intent, manifest, outline, profile, focus, axe) {
  const snapshot = metricSnapshot(outline, profile, focus, axe);
  const sets = [
    ["intent", Array.isArray(intent.principles) ? intent.principles : []],
    ["candidate", Array.isArray(manifest?.commitments) ? manifest.commitments : []]
  ];
  const result = [];
  for (const [kind, obligations] of sets) {
    for (const obligation of obligations) {
      if (!obligation?.automation || obligation.automation.source !== "playwright") continue;
      if (!Array.isArray(obligation.stateRefs) || !obligation.stateRefs.includes(state.id)) continue;
      const observed = metricAt(snapshot, obligation.automation.metric);
      const comparison = compareMetric(observed, obligation.automation);
      const obligationRef = `${kind}:${obligation.id}`;
      result.push(signal(
        candidateId,
        state.id,
        browser,
        `obligation-${kind}-${obligation.id}`,
        obligation.class,
        obligation.dimension,
        comparison.status,
        comparison.normalized,
        comparison.status === "unknown" ? 0.5 : 0.99,
        comparison.status === "pass" ? "note" : obligation.severity,
        "document",
        `${obligation.automation.metric} ${obligation.automation.operator} ${JSON.stringify(obligation.automation.expected)}; observed ${JSON.stringify(observed)}.`,
        obligation.statement,
        comparison.status === "pass" ? "Retain the executable obligation check." : `Satisfy ${obligationRef} and rerun the exact browser state.`,
        { obligationRefs: [obligationRef], implementation: comparison.implementation }
      ));
    }
  }
  return result;
}

function locatorFor(page, locator) {
  if (locator.by === "role") return page.getByRole(locator.value, { name: locator.name, exact: locator.exact });
  if (locator.by === "label") return page.getByLabel(locator.value, { exact: locator.exact });
  if (locator.by === "testId") return page.getByTestId(locator.value);
  if (locator.by === "text") return page.getByText(locator.value, { exact: locator.exact });
  return page.locator(locator.value);
}

async function locatorNodeRef(locator) {
  const target = locator.first();
  const handle = await target.elementHandle().catch(() => null);
  if (!handle) return "workflow:unresolved";
  return handle.evaluate((element, source) => {
    const ref = new Function(`return (${source})`)();
    return ref(element);
  }, nodeRef.toString()).catch(() => "workflow:unresolved");
}

async function executeStep(page, step) {
  const started = Date.now();
  const locator = locatorFor(page, step.locator).first();
  const timeout = step.timeoutMs ?? 5000;
  const node = await locatorNodeRef(locator);
  try {
    if (step.action === "click") await locator.click({ timeout });
    else if (step.action === "fill") await locator.fill(step.value, { timeout });
    else if (step.action === "select") await locator.selectOption(step.value, { timeout });
    else if (step.action === "check") await locator.check({ timeout });
    else if (step.action === "uncheck") await locator.uncheck({ timeout });
    else if (step.action === "press") await locator.press(step.value, { timeout });
    else await locator.waitFor({ state: "visible", timeout });
    return { id: step.id, status: "pass", nodeRef: node, evidence: `${step.action} completed.`, durationMs: Date.now() - started };
  } catch (error) {
    return { id: step.id, status: "fail", nodeRef: node, evidence: String(error.message || error).replace(/\s+/g, " ").slice(0, 500), durationMs: Date.now() - started };
  }
}

async function evaluateAssertion(page, assertion) {
  const started = Date.now();
  const timeout = assertion.timeoutMs ?? 5000;
  const locator = assertion.locator ? locatorFor(page, assertion.locator).first() : null;
  const node = locator ? await locatorNodeRef(locator) : "document";
  try {
    let passed = false;
    let observed = "";
    if (assertion.kind === "url") {
      observed = page.url();
      passed = observed.includes(assertion.expected);
    } else if (assertion.kind === "visible") {
      await locator.waitFor({ state: "visible", timeout });
      passed = true;
      observed = "visible";
    } else if (assertion.kind === "hidden") {
      const count = await locator.count();
      passed = count === 0 || await locator.isHidden({ timeout });
      observed = passed ? "hidden" : "visible";
    } else if (assertion.kind === "text") {
      await locator.waitFor({ state: "visible", timeout });
      observed = (await locator.textContent()) || "";
      passed = observed.includes(assertion.expected);
    } else if (assertion.kind === "count") {
      observed = String(await locatorFor(page, assertion.locator).count());
      passed = Number(observed) === assertion.expected;
    } else if (assertion.kind === "checked") {
      observed = String(await locator.isChecked({ timeout }));
      passed = observed === String(assertion.expected);
    } else {
      observed = await locator.inputValue({ timeout });
      passed = observed === assertion.expected;
    }
    return {
      id: assertion.id,
      status: passed ? "pass" : "fail",
      nodeRef: node,
      evidence: passed ? `${assertion.kind} assertion passed: ${String(observed).replace(/\s+/g, " ").slice(0, 300)}` : `${assertion.kind} assertion expected ${JSON.stringify(assertion.expected)} and observed ${JSON.stringify(String(observed).replace(/\s+/g, " ").slice(0, 300))}`,
      durationMs: Date.now() - started
    };
  } catch (error) {
    return { id: assertion.id, status: "fail", nodeRef: node, evidence: String(error.message || error).replace(/\s+/g, " ").slice(0, 500), durationMs: Date.now() - started };
  }
}

async function executeWorkflow(browser, browserName, workflow, intent, url, output, artifactRef) {
  const state = intent.states.find((item) => item.id === workflow.startStateRef);
  const started = Date.now();
  if (!state) {
    return {
      id: `${workflow.id}-${browserName}`,
      workflowRef: workflow.id,
      browser: browserName,
      stateRef: workflow.startStateRef,
      artifactRef,
      status: "unknown",
      durationMs: 0,
      steps: [],
      assertions: []
    };
  }
  const context = await browser.newContext({
    viewport: state.viewport,
    colorScheme: state.colorScheme === "no-preference" ? undefined : state.colorScheme,
    reducedMotion: state.reducedMotion ? "reduce" : "no-preference",
    locale: state.locale
  });
  try {
    const page = await context.newPage();
    const stateUrl = new URL(state.path || "", url).toString();
    await page.goto(stateUrl, { waitUntil: "networkidle" });
    const steps = [];
    let failed = false;
    for (const step of workflow.steps) {
      if (failed) {
        steps.push({ id: step.id, status: "skipped", nodeRef: "workflow:skipped", evidence: "Skipped after an earlier workflow step failed.", durationMs: 0 });
        continue;
      }
      const result = await executeStep(page, step);
      steps.push(result);
      failed = result.status === "fail";
    }
    const assertions = [];
    for (const assertion of workflow.assertions) assertions.push(await evaluateAssertion(page, assertion));
    const status = [...steps, ...assertions].every((item) => item.status === "pass") ? "pass" : "fail";
    const directory = resolve(output, "workflows", browserName, workflow.id);
    await mkdir(directory, { recursive: true });
    const screenshot = resolve(directory, "final.png");
    await page.screenshot({ path: screenshot, fullPage: true, animations: state.reducedMotion ? "disabled" : "allow" });
    return {
      id: `${workflow.id}-${browserName}`,
      workflowRef: workflow.id,
      browser: browserName,
      stateRef: workflow.startStateRef,
      artifactRef,
      status,
      durationMs: Date.now() - started,
      screenshot,
      screenshotSha256: await sha256(screenshot),
      steps,
      assertions
    };
  } catch (error) {
    const message = String(error.message || error).replace(/\s+/g, " ").slice(0, 500);
    return {
      id: `${workflow.id}-${browserName}`,
      workflowRef: workflow.id,
      browser: browserName,
      stateRef: workflow.startStateRef,
      artifactRef,
      status: "fail",
      durationMs: Date.now() - started,
      error: message,
      steps: workflow.steps.map((step, index) => ({
        id: step.id,
        status: index === 0 ? "fail" : "skipped",
        nodeRef: index === 0 ? "document" : "workflow:skipped",
        evidence: index === 0 ? message : "Skipped after the workflow runtime failed.",
        durationMs: index === 0 ? Date.now() - started : 0
      })),
      assertions: workflow.assertions.map((assertion) => ({
        id: assertion.id,
        status: "skipped",
        nodeRef: "workflow:skipped",
        evidence: "Skipped after the workflow runtime failed.",
        durationMs: 0
      }))
    };
  } finally {
    await context.close();
  }
}

function workflowSignal(candidateId, workflow, run) {
  const passed = run.status === "pass";
  const failedItems = [...run.steps, ...run.assertions].filter((item) => item.status === "fail");
  return signal(
    candidateId,
    run.stateRef,
    run.browser,
    `workflow-${workflow.id}`,
    workflow.class,
    workflow.dimension,
    passed ? "pass" : run.status,
    passed ? 1 : run.status === "unknown" ? 0.5 : 0,
    0.99,
    passed ? "note" : workflow.severity,
    failedItems[0]?.nodeRef || `workflow:${workflow.id}`,
    passed ? `${workflow.title} completed in ${run.durationMs}ms.` : `${workflow.title} failed: ${failedItems.map((item) => `${item.id}: ${item.evidence}`).join("; ") || "no executable result"}`,
    "The primary user journey must work in the rendered artifact, not only appear plausible in screenshots or rationale.",
    passed ? "Retain as a browser-executed regression test." : "Repair the failed semantic step or completion assertion and rerun the exact workflow.",
    Array.isArray(workflow.obligationRefs) && workflow.obligationRefs.length ? { obligationRefs: workflow.obligationRefs, implementation: passed ? "full" : run.status === "unknown" ? "unknown" : "none" } : {}
  );
}

async function main() {
  const url = required("--url");
  const intent = JSON.parse(await readFile(resolve(required("--intent")), "utf8"));
  const manifestPath = value("--manifest");
  const manifest = manifestPath ? JSON.parse(await readFile(resolve(manifestPath), "utf8")) : null;
  const candidateId = manifest?.id || required("--candidate");
  const artifactRef = value("--artifact-ref") || manifest?.artifactRef || candidateId;
  const output = resolve(required("--out"));
  const captures = [];
  const evidenceSignals = [];
  const renderProfiles = [];
  const workflowRuns = [];
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
        const stateUrl = new URL(state.path || "", url).toString();
        await page.goto(stateUrl, { waitUntil: "networkidle" });
        const directory = resolve(output, browserName, state.id);
        await mkdir(directory, { recursive: true });
        const screenshot = resolve(directory, "page.png");
        await page.screenshot({ path: screenshot, fullPage: true, animations: state.reducedMotion ? "disabled" : "allow" });
        const outline = await structure(page);
        const profile = await renderProfile(page, browserName, state.id, artifactRef);
        const focus = await focusTrace(page);
        const axe = await new AxeBuilder({ page }).analyze();
        const nodeMap = resolve(directory, "evidence.json");
        await writeFile(nodeMap, `${JSON.stringify({ outline, profile, focus, axe }, null, 2)}\n`);
        captures.push({
          browser: browserName,
          stateRef: state.id,
          url: stateUrl,
          viewport: state.viewport,
          screenshot,
          nodeMap,
          screenshotSha256: await sha256(screenshot),
          nodeMapSha256: await sha256(nodeMap)
        });
        renderProfiles.push(profile);
        evidenceSignals.push(...signals(candidateId, state, browserName, axe, outline, focus));
        evidenceSignals.push(...automatedObligationSignals(candidateId, state, browserName, intent, manifest, outline, profile, focus, axe));
        await context.close();
      }
      for (const workflow of Array.isArray(intent.workflows) ? intent.workflows : []) {
        if (Array.isArray(workflow.browsers) && !workflow.browsers.includes(browserName)) continue;
        const run = await executeWorkflow(browser, browserName, workflow, intent, url, output, artifactRef);
        workflowRuns.push(run);
        evidenceSignals.push(workflowSignal(candidateId, workflow, run));
      }
    } finally {
      await browser.close();
    }
  }

  const evidence = {
    schemaVersion: "1.0.0",
    candidateId,
    artifact: { ref: artifactRef, capturedAt: new Date().toISOString(), tool: "furthering-design-playwright@1.1.0" },
    captures,
    renderProfiles,
    workflowRuns,
    signals: evidenceSignals
  };
  await writeFile(resolve(output, "evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);
  process.stdout.write(`${captures.length} captures, ${renderProfiles.length} render profiles, ${workflowRuns.length} workflow runs, and ${evidenceSignals.length} signals written to ${output}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
