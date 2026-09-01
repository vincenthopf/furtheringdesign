import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { evaluateDiversity, validateCandidate } from "../runtime/lib/candidate.mjs";
import { validateIntent } from "../runtime/lib/intent.mjs";

const directory = new URL("../examples/ai-health/", import.meta.url);
const names = ["evidence-thread", "care-ledger", "daily-compass"];
const readJson = async (name) => JSON.parse(await readFile(new URL(name, directory), "utf8"));

test("AI health intent validates without warnings", async () => {
  const result = validateIntent(await readJson("intent.json"));
  assert.equal(result.valid, true, result.errors.join("\n"));
  assert.deepEqual(result.warnings, []);
  assert.deepEqual(result.conflicts, []);
});

test("AI health candidates validate and do not collapse", async () => {
  const intent = await readJson("intent.json");
  const candidates = await Promise.all(names.map((name) => readJson(`candidate-${name}.json`)));
  for (const candidate of candidates) {
    const result = validateCandidate(candidate, intent);
    assert.equal(result.valid, true, result.errors.join("\n"));
  }
  const diversity = evaluateDiversity(candidates, 0.42);
  assert.equal(diversity.collapsedPairs.length, 0);
  assert.ok(diversity.pairs.every((pair) => pair.distance > 0.8));
});

test("AI health route maps cover every state and both surfaces", async () => {
  const intent = await readJson("intent.json");
  const stateIds = intent.states.map((state) => state.id).sort();
  for (const name of names) {
    const routeMap = await readJson(`route-map-${name}.json`);
    assert.deepEqual(Object.keys(routeMap).sort(), stateIds);
    assert.ok(routeMap["marketing-desktop-light"].startsWith("/?candidate="));
    assert.ok(routeMap["marketing-mobile-light"].startsWith("/?candidate="));
    assert.ok(routeMap["dashboard-desktop-light"].startsWith("/app?candidate="));
    assert.ok(routeMap["dashboard-mobile-light"].startsWith("/app?candidate="));
    assert.ok(routeMap["dashboard-desktop-dark-reduced"].startsWith("/app?candidate="));
  }
});
