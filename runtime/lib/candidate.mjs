import {
  duplicateValues,
  isRecord,
  jaccardDistance,
  mean,
  requiredArray,
  requiredString,
  round
} from "./util.mjs";

const requiredAxes = ["composition", "typography", "spatialRhythm", "surface", "imagery", "interaction", "voice"];

export function validateCandidate(candidate, intent) {
  const errors = [];
  const warnings = [];
  if (!isRecord(candidate)) return { valid: false, errors: ["candidate must be an object"], warnings };

  requiredString(candidate.schemaVersion, "schemaVersion", errors);
  requiredString(candidate.id, "id", errors);
  requiredString(candidate.intentId, "intentId", errors);
  requiredString(candidate.title, "title", errors);
  if (intent?.id && candidate.intentId !== intent.id) errors.push(`intentId must match intent.id ${intent.id}`);

  if (!isRecord(candidate.direction)) {
    errors.push("direction must be an object");
  } else {
    requiredString(candidate.direction.thesis, "direction.thesis", errors);
    if (!isRecord(candidate.direction.axes)) {
      errors.push("direction.axes must be an object");
    } else {
      for (const axis of requiredAxes) requiredString(candidate.direction.axes[axis], `direction.axes.${axis}`, errors);
    }
    requiredArray(candidate.direction.deliberateTradeoffs, "direction.deliberateTradeoffs", errors);
    requiredArray(candidate.direction.rejectedPatterns, "direction.rejectedPatterns", errors);
  }

  if (!isRecord(candidate.tokens)) errors.push("tokens must be an object");
  if (!isRecord(candidate.structure)) {
    errors.push("structure must be an object");
  } else {
    requiredString(candidate.structure.pattern, "structure.pattern", errors);
    requiredArray(candidate.structure.sections, "structure.sections", errors);
  }

  requiredArray(candidate.decisions, "decisions", errors);
  candidate.decisions?.forEach((decision, index) => {
    if (!isRecord(decision)) {
      errors.push(`decisions[${index}] must be an object`);
      return;
    }
    requiredString(decision.question, `decisions[${index}].question`, errors);
    requiredString(decision.option, `decisions[${index}].option`, errors);
    requiredString(decision.rationale, `decisions[${index}].rationale`, errors);
    requiredArray(decision.tradeoffs, `decisions[${index}].tradeoffs`, errors);
  });

  if (!isRecord(candidate.changeContract)) {
    errors.push("changeContract must be an object");
  } else {
    requiredString(candidate.changeContract.baselineRef, "changeContract.baselineRef", errors);
    requiredArray(candidate.changeContract.allowedPaths, "changeContract.allowedPaths", errors);
    requiredArray(candidate.changeContract.protectedPaths, "changeContract.protectedPaths", errors);
    if (candidate.changeContract.patchMode !== "diff-only") errors.push("changeContract.patchMode must be diff-only");
    const overlaps = candidate.changeContract.allowedPaths.filter((path) => candidate.changeContract.protectedPaths.includes(path));
    if (overlaps.length) errors.push(`allowedPaths and protectedPaths overlap: ${overlaps.join(", ")}`);
  }

  requiredArray(candidate.supportedStates, "supportedStates", errors, 2);
  const duplicateStates = duplicateValues(candidate.supportedStates ?? []);
  for (const duplicate of duplicateStates) errors.push(`supportedStates contains duplicate state: ${duplicate}`);
  if (intent?.states) {
    const missing = intent.states.map((state) => state.id).filter((stateId) => !candidate.supportedStates?.includes(stateId));
    if (missing.length) errors.push(`supportedStates is missing intent states: ${missing.join(", ")}`);
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function candidateDistance(left, right) {
  const leftAxes = left?.direction?.axes ?? {};
  const rightAxes = right?.direction?.axes ?? {};
  const axisDistances = requiredAxes.map((axis) => jaccardDistance(leftAxes[axis], rightAxes[axis]));
  const structureDistance = jaccardDistance(
    `${left?.structure?.pattern ?? ""} ${(left?.structure?.sections ?? []).join(" ")}`,
    `${right?.structure?.pattern ?? ""} ${(right?.structure?.sections ?? []).join(" ")}`
  );
  const thesisDistance = jaccardDistance(left?.direction?.thesis, right?.direction?.thesis);
  return round(mean([...axisDistances, structureDistance, thesisDistance]), 4);
}

export function evaluateDiversity(candidates, floor = 0.42) {
  const pairs = [];
  const perCandidate = new Map(candidates.map((candidate) => [candidate.id, []]));
  for (let leftIndex = 0; leftIndex < candidates.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < candidates.length; rightIndex += 1) {
      const left = candidates[leftIndex];
      const right = candidates[rightIndex];
      const distance = candidateDistance(left, right);
      const result = { left: left.id, right: right.id, distance, collapsed: distance < floor };
      pairs.push(result);
      perCandidate.get(left.id).push(distance);
      perCandidate.get(right.id).push(distance);
    }
  }
  const scores = Object.fromEntries(
    [...perCandidate.entries()].map(([candidateId, values]) => [candidateId, round(mean(values), 4)])
  );
  return {
    floor,
    pairs,
    scores,
    collapsedPairs: pairs.filter((pair) => pair.collapsed)
  };
}
