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

const referencePolicies = new Set(["abstract-principles-only", "licensed-assets", "original-only"]);

export function normalizeIntent(input) {
  const intent = isRecord(input) ? deepClone(input) : {};
  intent.schemaVersion ??= "1.0.0";
  intent.outcome ??= {};
  intent.outcome.antiGoals ??= [];
  intent.audiences ??= [];
  intent.tasks ??= {};
  intent.tasks.secondary ??= [];
  intent.brand ??= {};
  intent.brand.values ??= [];
  intent.brand.voice ??= [];
  intent.brand.distinctiveAssets ??= [];
  intent.experience ??= {};
  intent.experience.emotionalRegister ??= [];
  intent.success ??= {};
  intent.success.criteria ??= [];
  intent.success.qualityProfile ??= {};
  intent.success.qualityProfile.weights ??= {};
  intent.success.qualityProfile.floors ??= {};
  intent.success.qualityProfile.uncertaintyPenalty ??= 0.18;
  intent.constraints ??= {};
  intent.constraints.hard ??= [];
  intent.constraints.soft ??= [];
  intent.freedoms ??= {};
  intent.freedoms.fixed ??= [];
  intent.freedoms.open ??= [];
  intent.freedoms.forbidden ??= [];
  intent.states ??= [];
  intent.content ??= {};
  intent.risks ??= [];
  intent.assumptions ??= [];
  intent.openQuestions ??= [];
  return intent;
}

export function detectIntentConflicts(input) {
  const intent = normalizeIntent(input);
  const conflicts = [];
  const groups = [
    ["fixed", "open"],
    ["fixed", "forbidden"],
    ["open", "forbidden"]
  ];
  for (const [leftName, rightName] of groups) {
    const leftValues = Array.isArray(intent.freedoms[leftName]) ? intent.freedoms[leftName] : [];
    const rightValues = Array.isArray(intent.freedoms[rightName]) ? intent.freedoms[rightName] : [];
    const left = new Map(leftValues.map((value) => [normalizedText(value), value]));
    for (const value of rightValues) {
      const key = normalizedText(value);
      if (key && left.has(key)) conflicts.push(`freedoms.${leftName} conflicts with freedoms.${rightName}: ${value}`);
    }
  }
  const brandValues = Array.isArray(intent.brand.values) ? intent.brand.values : [];
  for (const brandValue of brandValues) {
    if (!isRecord(brandValue)) continue;
    const expression = normalizedText(brandValue.expression);
    const avoid = normalizedText(brandValue.avoid);
    if (expression && expression === avoid) conflicts.push(`brand value ${brandValue.name ?? "unknown"} has identical expression and avoid guidance`);
  }
  return conflicts;
}

export function validateIntent(input) {
  const intent = normalizeIntent(input);
  const errors = [];
  const warnings = [];

  if (!isRecord(input)) errors.push("intent must be an object");
  requiredString(intent.schemaVersion, "schemaVersion", errors);
  requiredString(intent.id, "id", errors);
  requiredString(intent.title, "title", errors);

  if (!isRecord(intent.scope)) {
    errors.push("scope must be an object");
  } else {
    requiredString(intent.scope.level, "scope.level", errors);
    requiredString(intent.scope.surface, "scope.surface", errors);
  }

  requiredString(intent.outcome.problem, "outcome.problem", errors);
  requiredString(intent.outcome.desiredChange, "outcome.desiredChange", errors);
  requiredArray(intent.outcome.antiGoals, "outcome.antiGoals", errors);

  requiredArray(intent.audiences, "audiences", errors);
  const audiences = Array.isArray(intent.audiences) ? intent.audiences : [];
  const audienceIds = [];
  audiences.forEach((audience, index) => {
    if (!isRecord(audience)) {
      errors.push(`audiences[${index}] must be an object`);
      return;
    }
    requiredString(audience.id, `audiences[${index}].id`, errors);
    requiredString(audience.label, `audiences[${index}].label`, errors);
    requiredString(audience.context, `audiences[${index}].context`, errors);
    requiredArray(audience.needs, `audiences[${index}].needs`, errors);
    audienceIds.push(audience.id);
  });
  for (const duplicate of duplicateValues(audienceIds)) errors.push(`audience id must be unique: ${duplicate}`);

  if (!isRecord(intent.tasks.primary)) {
    errors.push("tasks.primary must be an object");
  } else {
    requiredString(intent.tasks.primary.actorId, "tasks.primary.actorId", errors);
    requiredString(intent.tasks.primary.action, "tasks.primary.action", errors);
    requiredString(intent.tasks.primary.object, "tasks.primary.object", errors);
    requiredString(intent.tasks.primary.completionSignal, "tasks.primary.completionSignal", errors);
    if (intent.tasks.primary.actorId && !audienceIds.includes(intent.tasks.primary.actorId)) {
      errors.push(`tasks.primary.actorId references unknown audience: ${intent.tasks.primary.actorId}`);
    }
  }

  requiredArray(intent.brand.values, "brand.values", errors);
  const brandValues = Array.isArray(intent.brand.values) ? intent.brand.values : [];
  brandValues.forEach((value, index) => {
    if (!isRecord(value)) {
      errors.push(`brand.values[${index}] must be an object`);
      return;
    }
    requiredString(value.name, `brand.values[${index}].name`, errors);
    requiredString(value.expression, `brand.values[${index}].expression`, errors);
    requiredString(value.avoid, `brand.values[${index}].avoid`, errors);
  });
  requiredArray(intent.brand.voice, "brand.voice", errors);
  if (!referencePolicies.has(intent.brand.referencePolicy)) {
    errors.push(`brand.referencePolicy must be one of ${[...referencePolicies].join(", ")}`);
  }

  requiredArray(intent.experience.emotionalRegister, "experience.emotionalRegister", errors);
  requiredString(intent.experience.density, "experience.density", errors);
  requiredString(intent.experience.familiarity, "experience.familiarity", errors);
  requiredString(intent.experience.motion, "experience.motion", errors);
  requiredString(intent.experience.hierarchy, "experience.hierarchy", errors);

  requiredArray(intent.success.criteria, "success.criteria", errors);
  const criteria = Array.isArray(intent.success.criteria) ? intent.success.criteria : [];
  criteria.forEach((criterion, index) => {
    if (!isRecord(criterion)) {
      errors.push(`success.criteria[${index}] must be an object`);
      return;
    }
    requiredString(criterion.id, `success.criteria[${index}].id`, errors);
    requiredString(criterion.signal, `success.criteria[${index}].signal`, errors);
    requiredString(criterion.direction, `success.criteria[${index}].direction`, errors);
    requiredString(criterion.target, `success.criteria[${index}].target`, errors);
    numberInRange(criterion.weight, `success.criteria[${index}].weight`, errors);
  });

  const weights = intent.success.qualityProfile.weights;
  if (!isRecord(weights) || !Object.keys(weights).length) {
    errors.push("success.qualityProfile.weights must define at least one dimension");
  } else {
    let total = 0;
    for (const [dimension, value] of Object.entries(weights)) {
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
      if (!(dimension in weights)) warnings.push(`floor has no matching quality weight: ${dimension}`);
    }
  }
  numberInRange(intent.success.qualityProfile.uncertaintyPenalty, "success.qualityProfile.uncertaintyPenalty", errors);

  requiredArray(intent.constraints.hard, "constraints.hard", errors);
  const hardConstraints = Array.isArray(intent.constraints.hard) ? intent.constraints.hard : [];
  hardConstraints.forEach((constraint, index) => {
    if (!isRecord(constraint)) {
      errors.push(`constraints.hard[${index}] must be an object`);
      return;
    }
    requiredString(constraint.id, `constraints.hard[${index}].id`, errors);
    requiredString(constraint.category, `constraints.hard[${index}].category`, errors);
    requiredString(constraint.statement, `constraints.hard[${index}].statement`, errors);
    requiredString(constraint.verification, `constraints.hard[${index}].verification`, errors);
  });

  for (const key of ["fixed", "open", "forbidden"]) requiredArray(intent.freedoms[key], `freedoms.${key}`, errors);

  requiredArray(intent.states, "states", errors, 2);
  const states = Array.isArray(intent.states) ? intent.states : [];
  const stateIds = [];
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
    requiredString(state.colorScheme, `states[${index}].colorScheme`, errors);
    if (typeof state.reducedMotion !== "boolean") errors.push(`states[${index}].reducedMotion must be boolean`);
    requiredString(state.locale, `states[${index}].locale`, errors);
    stateIds.push(state.id);
  });
  for (const duplicate of duplicateValues(stateIds)) errors.push(`state id must be unique: ${duplicate}`);
  if (!states.some((state) => state?.viewport?.width <= 480)) warnings.push("states should include a mobile viewport at or below 480px");
  if (!states.some((state) => state?.viewport?.width >= 1024)) warnings.push("states should include a desktop viewport at or above 1024px");
  if (!states.some((state) => state?.reducedMotion === true)) warnings.push("states should include reduced motion");
  if (!states.some((state) => state?.colorScheme === "dark")) warnings.push("states should include dark color scheme when the product supports it");

  requiredString(intent.content.sourceOfTruth, "content.sourceOfTruth", errors);
  requiredString(intent.content.missingPolicy, "content.missingPolicy", errors);
  if (typeof intent.content.claimsRequireEvidence !== "boolean") errors.push("content.claimsRequireEvidence must be boolean");

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
