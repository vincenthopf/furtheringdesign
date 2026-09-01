export function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function clamp(value, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, Number(value)));
}

export function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
}

export function mean(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + Number(value), 0) / values.length;
}

export function standardDeviation(values) {
  if (values.length < 2) return 0;
  const average = mean(values);
  return Math.sqrt(mean(values.map((value) => (Number(value) - average) ** 2)));
}

export function deepClone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

export function normalizedText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ");
}

export function tokenSet(value) {
  return new Set(normalizedText(value).split(" ").filter((token) => token.length > 1));
}

export function jaccardDistance(left, right) {
  const leftTokens = tokenSet(left);
  const rightTokens = tokenSet(right);
  const union = new Set([...leftTokens, ...rightTokens]);
  if (!union.size) return 0;
  let intersection = 0;
  for (const token of leftTokens) {
    if (rightTokens.has(token)) intersection += 1;
  }
  return 1 - intersection / union.size;
}

export function uniqueStrings(values) {
  return [...new Set((Array.isArray(values) ? values : []).map((value) => String(value)))];
}

export function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

export function requiredString(value, path, errors) {
  if (typeof value !== "string" || !value.trim()) errors.push(`${path} must be a non-empty string`);
}

export function requiredArray(value, path, errors, minimum = 1) {
  if (!Array.isArray(value) || value.length < minimum) errors.push(`${path} must contain at least ${minimum} item${minimum === 1 ? "" : "s"}`);
}

export function numberInRange(value, path, errors, minimum = 0, maximum = 1) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < minimum || value > maximum) {
    errors.push(`${path} must be a number between ${minimum} and ${maximum}`);
  }
}
