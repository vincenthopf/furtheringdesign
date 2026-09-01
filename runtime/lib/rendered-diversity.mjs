import { clamp, mean, round } from "./util.mjs";

const vectorKeys = ["layout", "palette", "typography", "density"];
const defaultWeights = { layout: 0.45, palette: 0.2, typography: 0.2, density: 0.15 };
const browsers = new Set(["chromium", "firefox", "webkit", "other"]);

function normalizedWeights(input = {}) {
  const weights = Object.fromEntries(vectorKeys.map((key) => [key, Number.isFinite(input[key]) ? Math.max(0, input[key]) : defaultWeights[key]]));
  const total = Object.values(weights).reduce((sum, value) => sum + value, 0);
  if (!total) return defaultWeights;
  return Object.fromEntries(Object.entries(weights).map(([key, value]) => [key, value / total]));
}

function histogramDistance(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || !left.length || left.length !== right.length) return null;
  return clamp(left.reduce((sum, value, index) => sum + Math.abs(Number(value) - Number(right[index])), 0) / 2);
}

function vectorDistance(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || !left.length || left.length !== right.length) return null;
  return clamp(mean(left.map((value, index) => Math.abs(Number(value) - Number(right[index])))));
}

function profileKey(profile) {
  return `${profile.browser}:${profile.stateRef}`;
}

export function validateRenderProfiles(profiles, stateIds = new Set(), artifactRef = null) {
  const errors = [];
  if (profiles === undefined) return { valid: true, errors };
  if (!Array.isArray(profiles)) return { valid: false, errors: ["renderProfiles must be an array"] };
  const keys = new Set();
  profiles.forEach((profile, index) => {
    const path = `renderProfiles[${index}]`;
    if (!profile || typeof profile !== "object" || Array.isArray(profile)) {
      errors.push(`${path} must be an object`);
      return;
    }
    for (const field of ["browser", "stateRef", "artifactRef"]) {
      if (typeof profile[field] !== "string" || !profile[field].trim()) errors.push(`${path}.${field} must be a non-empty string`);
    }
    if (profile.browser && !browsers.has(profile.browser)) errors.push(`${path}.browser must be one of ${[...browsers].join(", ")}`);
    if (stateIds.size && profile.stateRef && !stateIds.has(profile.stateRef)) errors.push(`${path}.stateRef references unknown state: ${profile.stateRef}`);
    if (artifactRef && profile.artifactRef && profile.artifactRef !== artifactRef) errors.push(`${path}.artifactRef must match evidence artifact ref ${artifactRef}`);
    if (!profile.vectors || typeof profile.vectors !== "object" || Array.isArray(profile.vectors)) {
      errors.push(`${path}.vectors must be an object`);
    } else {
      for (const key of vectorKeys) {
        const vector = profile.vectors[key];
        if (!Array.isArray(vector) || !vector.length) {
          errors.push(`${path}.vectors.${key} must contain at least one number`);
          continue;
        }
        vector.forEach((value, vectorIndex) => {
          if (!Number.isFinite(value) || value < 0 || value > 1) errors.push(`${path}.vectors.${key}[${vectorIndex}] must be between 0 and 1`);
        });
      }
    }
    const key = profile.browser && profile.stateRef ? profileKey(profile) : null;
    if (key) {
      if (keys.has(key)) errors.push(`duplicate render profile: ${key}`);
      keys.add(key);
    }
  });
  return { valid: errors.length === 0, errors };
}

export function renderProfileDistance(left, right, inputWeights = {}) {
  const weights = normalizedWeights(inputWeights);
  const dimensions = {};
  for (const key of vectorKeys) {
    const distance = key === "density"
      ? vectorDistance(left?.vectors?.[key], right?.vectors?.[key])
      : histogramDistance(left?.vectors?.[key], right?.vectors?.[key]);
    if (distance !== null) dimensions[key] = distance;
  }
  const available = Object.keys(dimensions);
  if (!available.length) return { distance: null, coverage: 0, dimensions: {} };
  const availableWeight = available.reduce((sum, key) => sum + weights[key], 0);
  const distance = available.reduce((sum, key) => sum + dimensions[key] * weights[key], 0) / availableWeight;
  return {
    distance: round(distance, 4),
    coverage: round(availableWeight, 4),
    dimensions: Object.fromEntries(Object.entries(dimensions).map(([key, value]) => [key, round(value, 4)]))
  };
}

function candidateProfiles(record) {
  return new Map((Array.isArray(record?.evidence?.renderProfiles) ? record.evidence.renderProfiles : []).map((profile) => [profileKey(profile), profile]));
}

function expectedProfileKeys(record, requiredBrowsers = []) {
  const supportedStates = Array.isArray(record?.manifest?.supportedStates) ? record.manifest.supportedStates : [];
  if (requiredBrowsers.length && supportedStates.length) {
    return new Set(requiredBrowsers.flatMap((browser) => supportedStates.map((stateRef) => `${browser}:${stateRef}`)));
  }
  const captures = Array.isArray(record?.evidence?.captures) ? record.evidence.captures : [];
  if (captures.length) return new Set(captures.map((capture) => `${capture.browser}:${capture.stateRef}`));
  return new Set(candidateProfiles(record).keys());
}

export function candidateRenderedDistance(leftRecord, rightRecord, options = {}) {
  const left = candidateProfiles(leftRecord);
  const right = candidateProfiles(rightRecord);
  const expected = new Set([
    ...expectedProfileKeys(leftRecord, options.requiredBrowsers),
    ...expectedProfileKeys(rightRecord, options.requiredBrowsers)
  ]);
  const shared = [...left.keys()].filter((key) => right.has(key) && expected.has(key));
  const comparisons = shared
    .map((key) => ({ key, ...renderProfileDistance(left.get(key), right.get(key), options.weights) }))
    .filter((comparison) => comparison.distance !== null);
  if (!comparisons.length) return { distance: null, coverage: 0, sharedProfiles: 0, expectedProfiles: expected.size, comparisons: [] };
  const coverage = expected.size ? comparisons.reduce((sum, comparison) => sum + comparison.coverage, 0) / expected.size : 0;
  const distanceWeight = comparisons.reduce((sum, comparison) => sum + comparison.coverage, 0);
  const distance = distanceWeight
    ? comparisons.reduce((sum, comparison) => sum + comparison.distance * comparison.coverage, 0) / distanceWeight
    : null;
  return {
    distance: distance === null ? null : round(distance, 4),
    coverage: round(coverage, 4),
    sharedProfiles: comparisons.length,
    expectedProfiles: expected.size,
    comparisons
  };
}

function distinctCandidateCount(records, collapsedPairs) {
  const parents = new Map(records.map((record) => [record.manifest.id, record.manifest.id]));
  const find = (id) => {
    const parent = parents.get(id);
    if (parent === id) return id;
    const root = find(parent);
    parents.set(id, root);
    return root;
  };
  const union = (left, right) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) parents.set(rightRoot, leftRoot);
  };
  for (const pair of collapsedPairs) union(pair.left, pair.right);
  return new Set([...parents.keys()].map(find)).size;
}

export function evaluateRenderedDiversity(records, floor = 0.18, options = {}) {
  const pairs = [];
  const perCandidate = new Map(records.map((record) => [record.manifest.id, []]));
  for (let leftIndex = 0; leftIndex < records.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < records.length; rightIndex += 1) {
      const left = records[leftIndex];
      const right = records[rightIndex];
      const result = candidateRenderedDistance(left, right, options);
      const pair = {
        left: left.manifest.id,
        right: right.manifest.id,
        distance: result.distance,
        coverage: result.coverage,
        sharedProfiles: result.sharedProfiles,
        expectedProfiles: result.expectedProfiles,
        collapsed: result.distance !== null && result.distance < floor,
        insufficientCoverage: result.coverage < (options.minimumCoverage ?? 1),
        comparisons: result.comparisons
      };
      pairs.push(pair);
      if (result.distance !== null) {
        perCandidate.get(left.manifest.id)?.push(result.distance);
        perCandidate.get(right.manifest.id)?.push(result.distance);
      }
    }
  }
  const scores = Object.fromEntries([...perCandidate.entries()].map(([candidateId, values]) => [candidateId, values.length ? round(mean(values), 4) : 0]));
  const availablePairs = pairs.filter((pair) => pair.distance !== null);
  const collapsedPairs = pairs.filter((pair) => pair.collapsed);
  return {
    mode: "rendered",
    floor,
    available: availablePairs.length === pairs.length && pairs.length > 0,
    pairCoverage: pairs.length ? round(availablePairs.length / pairs.length, 4) : 0,
    distinctCandidateCount: distinctCandidateCount(records, collapsedPairs),
    pairs,
    scores,
    collapsedPairs,
    insufficientCoveragePairs: pairs.filter((pair) => pair.insufficientCoverage || pair.distance === null)
  };
}
