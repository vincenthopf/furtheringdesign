import {
  duplicateValues,
  isRecord,
  jaccardDistance,
  mean,
  requiredArray,
  requiredString,
  round
} from "./util.mjs";
import { validateCandidateCommitments } from "./fidelity.mjs";

const requiredAxes = ["composition", "typography", "spatialRhythm", "surface", "imagery", "interaction", "voice"];

function validateStringArray(value, path, errors, minimum = 0) {
  requiredArray(value, path, errors, minimum);
  if (!Array.isArray(value)) return;
  value.forEach((item, index) => requiredString(item, `${path}[${index}]`, errors));
}

export function validateCandidate(candidate, intent) {
  const errors = [];
  const warnings = [];
  if (!isRecord(candidate)) return { valid: false, errors: ["candidate must be an object"], warnings };

  if (candidate.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  requiredString(candidate.id, "id", errors);
  requiredString(candidate.intentId, "intentId", errors);
  requiredString(candidate.title, "title", errors);
  if (candidate.artifactRef !== undefined) requiredString(candidate.artifactRef, "artifactRef", errors);
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
    validateStringArray(candidate.direction.deliberateTradeoffs, "direction.deliberateTradeoffs", errors, 1);
    validateStringArray(candidate.direction.rejectedPatterns, "direction.rejectedPatterns", errors, 1);
  }

  if (!isRecord(candidate.tokens) || !Object.keys(candidate.tokens).length) errors.push("tokens must be a non-empty object");
  if (!isRecord(candidate.structure)) {
    errors.push("structure must be an object");
  } else {
    requiredString(candidate.structure.pattern, "structure.pattern", errors);
    validateStringArray(candidate.structure.sections, "structure.sections", errors, 1);
    const sections = Array.isArray(candidate.structure.sections) ? candidate.structure.sections : [];
    for (const duplicate of duplicateValues(sections)) errors.push(`structure.sections contains duplicate section: ${duplicate}`);
  }

  requiredArray(candidate.decisions, "decisions", errors, 1);
  (Array.isArray(candidate.decisions) ? candidate.decisions : []).forEach((decision, index) => {
    if (!isRecord(decision)) {
      errors.push(`decisions[${index}] must be an object`);
      return;
    }
    requiredString(decision.question, `decisions[${index}].question`, errors);
    requiredString(decision.option, `decisions[${index}].option`, errors);
    requiredString(decision.rationale, `decisions[${index}].rationale`, errors);
    validateStringArray(decision.tradeoffs, `decisions[${index}].tradeoffs`, errors, 1);
  });

  if (!isRecord(candidate.changeContract)) {
    errors.push("changeContract must be an object");
  } else {
    requiredString(candidate.changeContract.baselineRef, "changeContract.baselineRef", errors);
    validateStringArray(candidate.changeContract.allowedPaths, "changeContract.allowedPaths", errors, 1);
    validateStringArray(candidate.changeContract.protectedPaths, "changeContract.protectedPaths", errors, 1);
    if (candidate.changeContract.patchMode !== "diff-only") errors.push("changeContract.patchMode must be diff-only");
    const allowedPaths = Array.isArray(candidate.changeContract.allowedPaths) ? candidate.changeContract.allowedPaths : [];
    const protectedPaths = Array.isArray(candidate.changeContract.protectedPaths) ? candidate.changeContract.protectedPaths : [];
    const overlaps = allowedPaths.filter((path) => protectedPaths.includes(path));
    if (overlaps.length) errors.push(`allowedPaths and protectedPaths overlap: ${overlaps.join(", ")}`);
  }

  validateStringArray(candidate.supportedStates, "supportedStates", errors, 2);
  const supportedStates = Array.isArray(candidate.supportedStates) ? candidate.supportedStates : [];
  for (const duplicate of duplicateValues(supportedStates)) errors.push(`supportedStates contains duplicate state: ${duplicate}`);
  if (Array.isArray(intent?.states)) {
    const intentStates = new Set(intent.states.map((state) => state.id));
    const missing = [...intentStates].filter((stateId) => !supportedStates.includes(stateId));
    const unknown = supportedStates.filter((stateId) => !intentStates.has(stateId));
    if (missing.length) errors.push(`supportedStates is missing intent states: ${missing.join(", ")}`);
    if (unknown.length) errors.push(`supportedStates contains unknown intent states: ${unknown.join(", ")}`);
  }

  if (candidate.supportedWorkflows !== undefined) {
    validateStringArray(candidate.supportedWorkflows, "supportedWorkflows", errors, 1);
    const supportedWorkflows = Array.isArray(candidate.supportedWorkflows) ? candidate.supportedWorkflows : [];
    for (const duplicate of duplicateValues(supportedWorkflows)) errors.push(`supportedWorkflows contains duplicate workflow: ${duplicate}`);
    const intentWorkflows = new Set((Array.isArray(intent?.workflows) ? intent.workflows : []).map((workflow) => workflow.id));
    const unknown = supportedWorkflows.filter((workflowId) => !intentWorkflows.has(workflowId));
    const missing = [...intentWorkflows].filter((workflowId) => !supportedWorkflows.includes(workflowId));
    if (unknown.length) errors.push(`supportedWorkflows contains unknown workflow: ${unknown.join(", ")}`);
    if (missing.length) errors.push(`supportedWorkflows is missing intent workflows: ${missing.join(", ")}`);
  }

  const commitmentResult = validateCandidateCommitments(candidate.commitments, supportedStates);
  errors.push(...commitmentResult.errors.map((error) => `candidate.${error}`));
  if (!Array.isArray(candidate.commitments) || !candidate.commitments.length) warnings.push("candidate commitments are missing; implementation fidelity cannot be verified");

  if (candidate.direction?.thesis && candidate.direction.thesis.length < 60) warnings.push("direction.thesis is short; verify that it states a defensible user and structural hypothesis");

  return { valid: errors.length === 0, errors, warnings };
}

export function candidateDistance(left, right) {
  const leftAxes = left?.direction?.axes ?? {};
  const rightAxes = right?.direction?.axes ?? {};
  const axisDistances = requiredAxes.map((axis) => jaccardDistance(leftAxes[axis], rightAxes[axis]));
  const structureDistance = jaccardDistance(
    `${left?.structure?.pattern ?? ""} ${(Array.isArray(left?.structure?.sections) ? left.structure.sections : []).join(" ")}`,
    `${right?.structure?.pattern ?? ""} ${(Array.isArray(right?.structure?.sections) ? right.structure.sections : []).join(" ")}`
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
      perCandidate.get(left.id)?.push(distance);
      perCandidate.get(right.id)?.push(distance);
    }
  }
  const scores = Object.fromEntries([...perCandidate.entries()].map(([candidateId, values]) => [candidateId, round(mean(values), 4)]));
  const collapsedPairs = pairs.filter((pair) => pair.collapsed);
  const parents = new Map(candidates.map((candidate) => [candidate.id, candidate.id]));
  const find = (id) => {
    const parent = parents.get(id);
    if (parent === id) return id;
    const root = find(parent);
    parents.set(id, root);
    return root;
  };
  for (const pair of collapsedPairs) {
    const leftRoot = find(pair.left);
    const rightRoot = find(pair.right);
    if (leftRoot !== rightRoot) parents.set(rightRoot, leftRoot);
  }
  const distinctCandidateCount = new Set([...parents.keys()].map(find)).size;
  return { mode: "manifest", floor, distinctCandidateCount, pairs, scores, collapsedPairs };
}
