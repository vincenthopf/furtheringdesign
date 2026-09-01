import {
  deepClone,
  duplicateValues,
  isRecord,
  normalizedText,
  numberInRange,
  requiredArray,
  requiredString,
  round
} from "./util.mjs";

const scopeLevels = new Set(["product", "flow", "page", "section", "component", "instance"]);
const referencePolicies = new Set(["abstract-principles-only", "licensed-assets", "original-only"]);
const successDirections = new Set(["increase", "decrease", "hold", "binary"]);
const colorSchemes = new Set(["light", "dark", "no-preference"]);
const missingPolicies = new Set(["mark-todo", "fail", "use-approved-placeholder"]);
const riskSeverities = new Set(["critical", "high", "medium", "low"]);

function validateStringArray(value, path, errors, minimum = 0) {
  requiredArray(value, path, errors, minimum);
  if (!Array.isArray(value)) return;
  value.forEach((item, index) => requiredString(item, `${path}[${index}]`, errors));
}

function validateTask(task, path, errors, audienceIds) {
  if (!isRecord(task)) {
    errors.push(`${path} must be an object`);
    return;
  }
  requiredString(task.actorId, `${path}.actorId`, errors);
  requiredString(task.action, `${path}.action`, errors);
  requiredString(task.object, `${path}.object`, errors);
  requiredString(task.completionSignal, `${path}.completionSignal`, errors);
  if (task.actorId && !audienceIds.has(task.actorId)) errors.push(`${path}.actorId references unknown audience: ${task.actorId}`);
}

function validateConstraint(constraint, path, errors) {
  if (!isRecord(constraint)) {
    errors.push(`${path} must be an object`);
    return;
  }
  requiredString(constraint.id, `${path}.id`, errors);
  requiredString(constraint.category, `${path}.category`, errors);
  requiredString(constraint.statement, `${path}.statement`, errors);
  requiredString(constraint.verification, `${path}.verification`, errors);
}

export function normalizeIntent(input) {
  const intent = isRecord(input) ? deepClone(input) : {};
  intent.schemaVersion ??= "1.0.0";
  intent.outcome = isRecord(intent.outcome) ? intent.outcome : {};
  intent.outcome.antiGoals ??= [];
  intent.audiences ??= [];
  intent.tasks = isRecord(intent.tasks) ? intent.tasks : {};
  intent.tasks.secondary ??= [];
  intent.brand = isRecord(intent.brand) ? intent.brand : {};
  intent.brand.values ??= [];
  intent.brand.voice ??= [];
  intent.brand.distinctiveAssets ??= [];
  intent.experience = isRecord(intent.experience) ? intent.experience : {};
  intent.experience.emotionalRegister ??= [];
  intent.success = isRecord(intent.success) ? intent.success : {};
  intent.success.criteria ??= [];
  intent.success.qualityProfile = isRecord(intent.success.qualityProfile) ? intent.success.qualityProfile : {};
  intent.success.qualityProfile.weights ??= {};
  intent.success.qualityProfile.floors ??= {};
  intent.success.qualityProfile.uncertaintyPenalty ??= 0.18;
  intent.constraints = isRecord(intent.constraints) ? intent.constraints : {};
  intent.constraints.hard ??= [];
  intent.constraints.soft ??= [];
  intent.freedoms = isRecord(intent.freedoms) ? intent.freedoms : {};
  intent.freedoms.fixed ??= [];
  intent.freedoms.open ??= [];
  intent.freedoms.forbidden ??= [];
  intent.states ??= [];
  intent.content = isRecord(intent.content) ? intent.content : {};
  intent.risks ??= [];
  intent.assumptions ??= [];
  intent.openQuestions ??= [];
  return intent;
}

export function detectIntentConflicts(input) {
  const intent = normalizeIntent(input);
  const conflicts = [];
  for (const [leftName, rightName] of [["fixed", "open"], ["fixed", "forbidden"], ["open", "forbidden"]]) {
    const leftValues = Array.isArray(intent.freedoms[leftName]) ? intent.freedoms[leftName] : [];
    const rightValues = Array.isArray(intent.freedoms[rightName]) ? intent.freedoms[rightName] : [];
    const left = new Map(leftValues.map((value) => [normalizedText(value), value]));
    for (const value of rightValues) {
      const key = normalizedText(value);
      if (key && left.has(key)) conflicts.push(`freedoms.${leftName} conflicts with freedoms.${rightName}: ${value}`);
    }
  }
  for (const brandValue of Array.isArray(intent.brand.values) ? intent.brand.values : []) {
    if (!isRecord(brandValue)) continue;
    const expression = normalizedText(brandValue.expression);
    const avoid = normalizedText(brandValue.avoid);
    if (expression && expression === avoid) conflicts.push(`brand value ${brandValue.name ?? "unknown"} has identical expression and avoid guidance`);
  }
  return conflicts;
}

export function validateIntent(input) {
  const source = isRecord(input) ? input : {};
  const intent = normalizeIntent(input);
  const errors = [];
  const warnings = [];

  if (!isRecord(input)) errors.push("intent must be an object");
  for (const field of ["outcome", "tasks", "brand", "experience", "success", "constraints", "freedoms", "content"]) {
    if (!isRecord(source[field])) errors.push(`${field} must be an object`);
  }
  if (isRecord(source.success) && !isRecord(source.success.qualityProfile)) errors.push("success.qualityProfile must be an object");
  if (intent.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  requiredString(intent.id, "id", errors);
  requiredString(intent.title, "title", errors);

  if (!isRecord(intent.scope)) {
    errors.push("scope must be an object");
  } else {
    if (!scopeLevels.has(intent.scope.level)) errors.push(`scope.level must be one of ${[...scopeLevels].join(", ")}`);
    requiredString(intent.scope.surface, "scope.surface", errors);
    if (intent.scope.parentIntentId !== undefined && intent.scope.parentIntentId !== null) requiredString(intent.scope.parentIntentId, "scope.parentIntentId", errors);
  }

  requiredString(intent.outcome.problem, "outcome.problem", errors);
  requiredString(intent.outcome.desiredChange, "outcome.desiredChange", errors);
  validateStringArray(intent.outcome.antiGoals, "outcome.antiGoals", errors, 1);

  requiredArray(intent.audiences, "audiences", errors, 1);
  const audienceIds = [];
  (Array.isArray(intent.audiences) ? intent.audiences : []).forEach((audience, index) => {
    if (!isRecord(audience)) {
      errors.push(`audiences[${index}] must be an object`);
      return;
    }
    requiredString(audience.id, `audiences[${index}].id`, errors);
    requiredString(audience.label, `audiences[${index}].label`, errors);
    requiredString(audience.context, `audiences[${index}].context`, errors);
    validateStringArray(audience.needs, `audiences[${index}].needs`, errors, 1);
    validateStringArray(audience.anxieties, `audiences[${index}].anxieties`, errors, 0);
    validateStringArray(audience.capabilities, `audiences[${index}].capabilities`, errors, 0);
    if (audience.id) audienceIds.push(audience.id);
  });
  for (const duplicate of duplicateValues(audienceIds)) errors.push(`audience id must be unique: ${duplicate}`);
  const audienceIdSet = new Set(audienceIds);

  validateTask(intent.tasks.primary, "tasks.primary", errors, audienceIdSet);
  requiredArray(intent.tasks.secondary, "tasks.secondary", errors, 0);
  (Array.isArray(intent.tasks.secondary) ? intent.tasks.secondary : []).forEach((task, index) => validateTask(task, `tasks.secondary[${index}]`, errors, audienceIdSet));

  requiredArray(intent.brand.values, "brand.values", errors, 1);
  const brandValueNames = [];
  (Array.isArray(intent.brand.values) ? intent.brand.values : []).forEach((value, index) => {
    if (!isRecord(value)) {
      errors.push(`brand.values[${index}] must be an object`);
      return;
    }
    requiredString(value.name, `brand.values[${index}].name`, errors);
    requiredString(value.expression, `brand.values[${index}].expression`, errors);
    requiredString(value.avoid, `brand.values[${index}].avoid`, errors);
    if (value.name) brandValueNames.push(value.name);
  });
  for (const duplicate of duplicateValues(brandValueNames)) errors.push(`brand value name must be unique: ${duplicate}`);
  validateStringArray(intent.brand.voice, "brand.voice", errors, 1);
  validateStringArray(intent.brand.distinctiveAssets, "brand.distinctiveAssets", errors, 0);
  if (!referencePolicies.has(intent.brand.referencePolicy)) errors.push(`brand.referencePolicy must be one of ${[...referencePolicies].join(", ")}`);

  validateStringArray(intent.experience.emotionalRegister, "experience.emotionalRegister", errors, 1);
  requiredString(intent.experience.density, "experience.density", errors);
  requiredString(intent.experience.familiarity, "experience.familiarity", errors);
  requiredString(intent.experience.motion, "experience.motion", errors);
  requiredString(intent.experience.hierarchy, "experience.hierarchy", errors);

  requiredArray(intent.success.criteria, "success.criteria", errors, 1);
  const criterionIds = [];
  (Array.isArray(intent.success.criteria) ? intent.success.criteria : []).forEach((criterion, index) => {
    if (!isRecord(criterion)) {
      errors.push(`success.criteria[${index}] must be an object`);
      return;
    }
    requiredString(criterion.id, `success.criteria[${index}].id`, errors);
    requiredString(criterion.signal, `success.criteria[${index}].signal`, errors);
    if (!successDirections.has(criterion.direction)) errors.push(`success.criteria[${index}].direction must be one of ${[...successDirections].join(", ")}`);
    requiredString(criterion.target, `success.criteria[${index}].target`, errors);
    numberInRange(criterion.weight, `success.criteria[${index}].weight`, errors);
    if (criterion.id) criterionIds.push(criterion.id);
  });
  for (const duplicate of duplicateValues(criterionIds)) errors.push(`success criterion id must be unique: ${duplicate}`);

  const weights = intent.success.qualityProfile.weights;
  if (!isRecord(weights) || !Object.keys(weights).length) {
    errors.push("success.qualityProfile.weights must define at least one dimension");
  } else {
    let total = 0;
    for (const [dimension, value] of Object.entries(weights)) {
      requiredString(dimension, "success.qualityProfile.weights key", errors);
      numberInRange(value, `success.qualityProfile.weights.${dimension}`, errors);
      if (typeof value === "number") total += value;
    }
    if (Math.abs(total - 1) > 0.01) errors.push(`success.qualityProfile.weights must sum to 1, received ${round(total, 4)}`);
  }
  if (!isRecord(intent.success.qualityProfile.floors)) {
    errors.push("success.qualityProfile.floors must be an object");
  } else {
    for (const [dimension, value] of Object.entries(intent.success.qualityProfile.floors)) {
      numberInRange(value, `success.qualityProfile.floors.${dimension}`, errors);
      if (!isRecord(weights) || !(dimension in weights)) warnings.push(`floor has no matching quality weight: ${dimension}`);
    }
  }
  numberInRange(intent.success.qualityProfile.uncertaintyPenalty, "success.qualityProfile.uncertaintyPenalty", errors);

  requiredArray(intent.constraints.hard, "constraints.hard", errors, 1);
  requiredArray(intent.constraints.soft, "constraints.soft", errors, 0);
  const constraintIds = [];
  (Array.isArray(intent.constraints.hard) ? intent.constraints.hard : []).forEach((constraint, index) => {
    validateConstraint(constraint, `constraints.hard[${index}]`, errors);
    if (constraint?.id) constraintIds.push(constraint.id);
  });
  (Array.isArray(intent.constraints.soft) ? intent.constraints.soft : []).forEach((constraint, index) => {
    validateConstraint(constraint, `constraints.soft[${index}]`, errors);
    if (constraint?.id) constraintIds.push(constraint.id);
  });
  for (const duplicate of duplicateValues(constraintIds)) errors.push(`constraint id must be unique: ${duplicate}`);

  for (const key of ["fixed", "open", "forbidden"]) validateStringArray(intent.freedoms[key], `freedoms.${key}`, errors, 1);

  requiredArray(intent.states, "states", errors, 2);
  const stateIds = [];
  const states = Array.isArray(intent.states) ? intent.states : [];
  states.forEach((state, index) => {
    if (!isRecord(state)) {
      errors.push(`states[${index}] must be an object`);
      return;
    }
    requiredString(state.id, `states[${index}].id`, errors);
    if (!isRecord(state.viewport)) {
      errors.push(`states[${index}].viewport must be an object`);
    } else {
      if (!Number.isInteger(state.viewport.width) || state.viewport.width <= 0) errors.push(`states[${index}].viewport.width must be a positive integer`);
      if (!Number.isInteger(state.viewport.height) || state.viewport.height <= 0) errors.push(`states[${index}].viewport.height must be a positive integer`);
    }
    if (!colorSchemes.has(state.colorScheme)) errors.push(`states[${index}].colorScheme must be one of ${[...colorSchemes].join(", ")}`);
    if (typeof state.reducedMotion !== "boolean") errors.push(`states[${index}].reducedMotion must be boolean`);
    requiredString(state.locale, `states[${index}].locale`, errors);
    if (state.id) stateIds.push(state.id);
  });
  for (const duplicate of duplicateValues(stateIds)) errors.push(`state id must be unique: ${duplicate}`);
  if (!states.some((state) => state?.viewport?.width <= 480)) warnings.push("states should include a mobile viewport at or below 480px");
  if (!states.some((state) => state?.viewport?.width >= 1024)) warnings.push("states should include a desktop viewport at or above 1024px");
  if (!states.some((state) => state?.reducedMotion === true)) warnings.push("states should include reduced motion");
  if (!states.some((state) => state?.colorScheme === "dark")) warnings.push("states should include dark color scheme when the product supports it");

  requiredString(intent.content.sourceOfTruth, "content.sourceOfTruth", errors);
  if (!missingPolicies.has(intent.content.missingPolicy)) errors.push(`content.missingPolicy must be one of ${[...missingPolicies].join(", ")}`);
  if (typeof intent.content.claimsRequireEvidence !== "boolean") errors.push("content.claimsRequireEvidence must be boolean");

  requiredArray(intent.risks, "risks", errors, 0);
  const riskIds = [];
  (Array.isArray(intent.risks) ? intent.risks : []).forEach((risk, index) => {
    if (!isRecord(risk)) {
      errors.push(`risks[${index}] must be an object`);
      return;
    }
    requiredString(risk.id, `risks[${index}].id`, errors);
    if (!riskSeverities.has(risk.severity)) errors.push(`risks[${index}].severity must be one of ${[...riskSeverities].join(", ")}`);
    requiredString(risk.statement, `risks[${index}].statement`, errors);
    requiredString(risk.control, `risks[${index}].control`, errors);
    if (risk.id) riskIds.push(risk.id);
  });
  for (const duplicate of duplicateValues(riskIds)) errors.push(`risk id must be unique: ${duplicate}`);
  validateStringArray(intent.assumptions, "assumptions", errors, 0);
  validateStringArray(intent.openQuestions, "openQuestions", errors, 0);

  const conflicts = detectIntentConflicts(intent);
  errors.push(...conflicts);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    conflicts,
    value: intent
  };
}
