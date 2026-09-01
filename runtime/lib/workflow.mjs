import { clamp, duplicateValues, isRecord, mean, requiredArray, requiredString, round } from "./util.mjs";

const signalClasses = new Set(["A", "B"]);
const severities = new Set(["blocker", "major", "minor", "note"]);
const browsers = new Set(["chromium", "firefox", "webkit", "other"]);
const locatorKinds = new Set(["role", "label", "testId", "text", "css"]);
const actions = new Set(["click", "fill", "select", "check", "uncheck", "press", "waitFor"]);
const assertionKinds = new Set(["visible", "hidden", "text", "url", "count", "checked", "value"]);
const runStatuses = new Set(["pass", "fail", "unknown"]);
const stepStatuses = new Set(["pass", "fail", "skipped"]);
const sha256Pattern = /^[a-f0-9]{64}$/i;

function validateLocator(locator, path, errors, required = true) {
  if (locator === undefined && !required) return;
  if (!isRecord(locator)) {
    errors.push(`${path} must be an object`);
    return;
  }
  if (!locatorKinds.has(locator.by)) errors.push(`${path}.by must be one of ${[...locatorKinds].join(", ")}`);
  requiredString(locator.value, `${path}.value`, errors);
  if (locator.name !== undefined) requiredString(locator.name, `${path}.name`, errors);
  if (locator.exact !== undefined && typeof locator.exact !== "boolean") errors.push(`${path}.exact must be boolean`);
}

function validateWorkflowStep(step, path, errors) {
  if (!isRecord(step)) {
    errors.push(`${path} must be an object`);
    return;
  }
  requiredString(step.id, `${path}.id`, errors);
  if (!actions.has(step.action)) errors.push(`${path}.action must be one of ${[...actions].join(", ")}`);
  validateLocator(step.locator, `${path}.locator`, errors);
  if (["fill", "select", "press"].includes(step.action) && typeof step.value !== "string") errors.push(`${path}.value must be a string for ${step.action}`);
  if (step.timeoutMs !== undefined && (!Number.isInteger(step.timeoutMs) || step.timeoutMs < 1 || step.timeoutMs > 60000)) errors.push(`${path}.timeoutMs must be an integer between 1 and 60000`);
}

function validateWorkflowAssertion(assertion, path, errors) {
  if (!isRecord(assertion)) {
    errors.push(`${path} must be an object`);
    return;
  }
  requiredString(assertion.id, `${path}.id`, errors);
  if (!assertionKinds.has(assertion.kind)) errors.push(`${path}.kind must be one of ${[...assertionKinds].join(", ")}`);
  validateLocator(assertion.locator, `${path}.locator`, errors, assertion.kind !== "url");
  if (["text", "url", "value"].includes(assertion.kind) && typeof assertion.expected !== "string") errors.push(`${path}.expected must be a string for ${assertion.kind}`);
  if (assertion.kind === "count" && (!Number.isInteger(assertion.expected) || assertion.expected < 0)) errors.push(`${path}.expected must be a non-negative integer for count`);
  if (assertion.kind === "checked" && typeof assertion.expected !== "boolean") errors.push(`${path}.expected must be boolean for checked`);
  if (assertion.timeoutMs !== undefined && (!Number.isInteger(assertion.timeoutMs) || assertion.timeoutMs < 1 || assertion.timeoutMs > 60000)) errors.push(`${path}.timeoutMs must be an integer between 1 and 60000`);
}

export function validateWorkflows(workflows, audiences = [], states = [], knownObligations = new Set()) {
  const errors = [];
  const warnings = [];
  if (workflows === undefined) return { valid: true, errors, warnings };
  if (!Array.isArray(workflows)) return { valid: false, errors: ["workflows must be an array"], warnings };
  const audienceIds = new Set(audiences.map((audience) => audience?.id).filter(Boolean));
  const stateIds = new Set(states.map((state) => state?.id).filter(Boolean));
  const workflowIds = [];
  workflows.forEach((workflow, index) => {
    const path = `workflows[${index}]`;
    if (!isRecord(workflow)) {
      errors.push(`${path} must be an object`);
      return;
    }
    for (const field of ["id", "title", "actorId", "dimension", "startStateRef"]) requiredString(workflow[field], `${path}.${field}`, errors);
    if (workflow.actorId && audienceIds.size && !audienceIds.has(workflow.actorId)) errors.push(`${path}.actorId references unknown audience: ${workflow.actorId}`);
    if (workflow.startStateRef && stateIds.size && !stateIds.has(workflow.startStateRef)) errors.push(`${path}.startStateRef references unknown state: ${workflow.startStateRef}`);
    if (!signalClasses.has(workflow.class)) errors.push(`${path}.class must be A or B`);
    if (!severities.has(workflow.severity)) errors.push(`${path}.severity must be one of ${[...severities].join(", ")}`);
    requiredArray(workflow.steps, `${path}.steps`, errors, 1);
    requiredArray(workflow.assertions, `${path}.assertions`, errors, 1);
    const stepIds = [];
    for (const [stepIndex, step] of (Array.isArray(workflow.steps) ? workflow.steps : []).entries()) {
      validateWorkflowStep(step, `${path}.steps[${stepIndex}]`, errors);
      if (step?.id) stepIds.push(step.id);
    }
    for (const duplicate of duplicateValues(stepIds)) errors.push(`${path}.steps id must be unique: ${duplicate}`);
    const assertionIds = [];
    for (const [assertionIndex, assertion] of (Array.isArray(workflow.assertions) ? workflow.assertions : []).entries()) {
      validateWorkflowAssertion(assertion, `${path}.assertions[${assertionIndex}]`, errors);
      if (assertion?.id) assertionIds.push(assertion.id);
    }
    for (const duplicate of duplicateValues(assertionIds)) errors.push(`${path}.assertions id must be unique: ${duplicate}`);
    if (workflow.browsers !== undefined) {
      requiredArray(workflow.browsers, `${path}.browsers`, errors, 1);
      for (const browser of Array.isArray(workflow.browsers) ? workflow.browsers : []) {
        if (!browsers.has(browser)) errors.push(`${path}.browsers contains unknown browser: ${browser}`);
      }
      for (const duplicate of duplicateValues(Array.isArray(workflow.browsers) ? workflow.browsers : [])) errors.push(`${path}.browsers contains duplicate browser: ${duplicate}`);
    }
    if (workflow.obligationRefs !== undefined) {
      requiredArray(workflow.obligationRefs, `${path}.obligationRefs`, errors, 1);
      for (const ref of Array.isArray(workflow.obligationRefs) ? workflow.obligationRefs : []) {
        requiredString(ref, `${path}.obligationRefs`, errors);
        if (!knownObligations.has(ref)) errors.push(`${path}.obligationRefs references unknown obligation: ${ref}`);
      }
    }
    if (workflow.id) workflowIds.push(workflow.id);
  });
  for (const duplicate of duplicateValues(workflowIds)) errors.push(`workflow id must be unique: ${duplicate}`);
  if (!workflows.length) warnings.push("workflows are empty; functional task completion cannot be verified");
  return { valid: errors.length === 0, errors, warnings };
}

function validateResultItem(item, path, errors) {
  if (!isRecord(item)) {
    errors.push(`${path} must be an object`);
    return;
  }
  requiredString(item.id, `${path}.id`, errors);
  if (!stepStatuses.has(item.status)) errors.push(`${path}.status must be pass, fail, or skipped`);
  requiredString(item.nodeRef, `${path}.nodeRef`, errors);
  requiredString(item.evidence, `${path}.evidence`, errors);
  if (!Number.isFinite(item.durationMs) || item.durationMs < 0) errors.push(`${path}.durationMs must be a non-negative number`);
}

function validateResultSet(results, expected, path, errors) {
  const resultIds = [];
  for (const [index, item] of (Array.isArray(results) ? results : []).entries()) {
    validateResultItem(item, `${path}[${index}]`, errors);
    if (item?.id) resultIds.push(item.id);
  }
  for (const duplicate of duplicateValues(resultIds)) errors.push(`${path} id must be unique: ${duplicate}`);
  const expectedIds = new Set((Array.isArray(expected) ? expected : []).map((item) => item.id));
  const unknown = resultIds.filter((id) => !expectedIds.has(id));
  const missing = [...expectedIds].filter((id) => !resultIds.includes(id));
  if (unknown.length) errors.push(`${path} contains unknown result ids: ${unknown.join(", ")}`);
  if (missing.length) errors.push(`${path} is missing result ids: ${missing.join(", ")}`);
}

function derivedRunStatus(workflow, run) {
  if (!workflow) return "unknown";
  const expectedIds = new Set([
    ...workflow.steps.map((step) => `step:${step.id}`),
    ...workflow.assertions.map((assertion) => `assertion:${assertion.id}`)
  ]);
  const actual = new Map([
    ...(Array.isArray(run?.steps) ? run.steps : []).map((item) => [`step:${item.id}`, item.status]),
    ...(Array.isArray(run?.assertions) ? run.assertions : []).map((item) => [`assertion:${item.id}`, item.status])
  ]);
  const statuses = [...expectedIds].map((id) => actual.get(id) ?? "missing");
  if (statuses.includes("fail")) return "fail";
  if (statuses.length && statuses.every((status) => status === "pass")) return "pass";
  return "unknown";
}

export function validateWorkflowRuns(runs, workflows = [], candidate = null, artifactRef = null) {
  const errors = [];
  const warnings = [];
  if (runs === undefined) return { valid: true, errors, warnings };
  if (!Array.isArray(runs)) return { valid: false, errors: ["workflowRuns must be an array"], warnings };
  const workflowMap = new Map(workflows.map((workflow) => [workflow?.id, workflow]).filter(([id]) => id));
  const workflowIds = new Set(workflowMap.keys());
  const supported = Array.isArray(candidate?.supportedWorkflows) ? new Set(candidate.supportedWorkflows) : workflowIds;
  const keys = [];
  runs.forEach((run, index) => {
    const path = `workflowRuns[${index}]`;
    if (!isRecord(run)) {
      errors.push(`${path} must be an object`);
      return;
    }
    for (const field of ["id", "workflowRef", "browser", "stateRef", "artifactRef"]) requiredString(run[field], `${path}.${field}`, errors);
    const workflow = workflowMap.get(run.workflowRef);
    if (run.workflowRef && !workflowIds.has(run.workflowRef)) errors.push(`${path}.workflowRef references unknown workflow: ${run.workflowRef}`);
    if (run.workflowRef && !supported.has(run.workflowRef)) errors.push(`${path}.workflowRef is not supported by candidate: ${run.workflowRef}`);
    if (!browsers.has(run.browser)) errors.push(`${path}.browser must be one of ${[...browsers].join(", ")}`);
    if (workflow?.browsers?.length && run.browser && !workflow.browsers.includes(run.browser)) errors.push(`${path}.browser is not declared by workflow ${workflow.id}`);
    if (workflow?.startStateRef && run.stateRef !== workflow.startStateRef) errors.push(`${path}.stateRef must match workflow startStateRef ${workflow.startStateRef}`);
    if (artifactRef && run.artifactRef && run.artifactRef !== artifactRef) errors.push(`${path}.artifactRef must match evidence artifact ref ${artifactRef}`);
    if (!runStatuses.has(run.status)) errors.push(`${path}.status must be pass, fail, or unknown`);
    if (!Number.isFinite(run.durationMs) || run.durationMs < 0) errors.push(`${path}.durationMs must be a non-negative number`);
    if (run.error !== undefined) requiredString(run.error, `${path}.error`, errors);
    if (run.screenshotSha256 !== undefined && !sha256Pattern.test(run.screenshotSha256)) errors.push(`${path}.screenshotSha256 must be a SHA-256 digest`);
    requiredArray(run.steps, `${path}.steps`, errors, 0);
    requiredArray(run.assertions, `${path}.assertions`, errors, 0);
    if (workflow) {
      validateResultSet(run.steps, workflow.steps, `${path}.steps`, errors);
      validateResultSet(run.assertions, workflow.assertions, `${path}.assertions`, errors);
      const derived = derivedRunStatus(workflow, run);
      if (run.status !== derived) errors.push(`${path}.status ${run.status} conflicts with result status ${derived}`);
    } else {
      for (const [resultIndex, result] of (Array.isArray(run.steps) ? run.steps : []).entries()) validateResultItem(result, `${path}.steps[${resultIndex}]`, errors);
      for (const [resultIndex, result] of (Array.isArray(run.assertions) ? run.assertions : []).entries()) validateResultItem(result, `${path}.assertions[${resultIndex}]`, errors);
    }
    if (run.workflowRef && run.browser) keys.push(`${run.workflowRef}:${run.browser}`);
  });
  for (const duplicate of duplicateValues(keys)) errors.push(`duplicate workflow/browser run: ${duplicate}`);
  if (!runs.length) warnings.push("workflow runs are empty");
  return { valid: errors.length === 0, errors, warnings };
}

function expectedBrowsers(workflow, policy, evidence) {
  const explicit = Array.isArray(workflow.browsers) && workflow.browsers.length ? workflow.browsers : null;
  if (explicit) return explicit;
  if (Array.isArray(policy.requiredBrowsers) && policy.requiredBrowsers.length) return policy.requiredBrowsers;
  const captured = [...new Set((Array.isArray(evidence?.captures) ? evidence.captures : []).map((capture) => capture.browser).filter(Boolean))];
  return captured.length ? captured : ["chromium"];
}

export function evaluateWorkflowAudit(intent, candidate, evidence, policy = {}) {
  const allWorkflows = Array.isArray(intent?.workflows) ? intent.workflows : [];
  const supportedIds = new Set(Array.isArray(candidate?.supportedWorkflows) ? candidate.supportedWorkflows : allWorkflows.map((workflow) => workflow.id));
  const workflows = allWorkflows.filter((workflow) => supportedIds.has(workflow.id));
  const runs = Array.isArray(evidence?.workflowRuns) ? evidence.workflowRuns : [];
  const settings = {
    enabled: policy.enabled ?? allWorkflows.length > 0,
    required: policy.required ?? allWorkflows.length > 0,
    minimumCoverage: policy.minimumCoverage ?? 1,
    completionFloor: policy.completionFloor ?? 1,
    requiredBrowsers: Array.isArray(policy.requiredBrowsers) ? policy.requiredBrowsers : []
  };
  const results = workflows.map((workflow) => {
    const browsersForWorkflow = expectedBrowsers(workflow, settings, evidence);
    const browserRuns = browsersForWorkflow.map((browser) => {
      const run = runs.find((entry) => entry.workflowRef === workflow.id && entry.browser === browser);
      const status = run ? derivedRunStatus(workflow, run) : "unknown";
      return {
        browser,
        status,
        runId: run?.id ?? null,
        durationMs: run?.durationMs ?? null,
        failedSteps: [...(run?.steps ?? []), ...(run?.assertions ?? [])].filter((item) => item.status === "fail").map((item) => item.id)
      };
    });
    const known = browserRuns.filter((run) => run.status !== "unknown");
    const score = browserRuns.length ? mean(browserRuns.map((run) => run.status === "pass" ? 1 : 0)) : 0;
    const coverage = browserRuns.length ? known.length / browserRuns.length : 0;
    const hardFailure = workflow.class === "A" && ["blocker", "major"].includes(workflow.severity) && browserRuns.some((run) => run.status !== "pass");
    return {
      id: workflow.id,
      title: workflow.title,
      class: workflow.class,
      severity: workflow.severity,
      dimension: workflow.dimension,
      score: round(score, 4),
      coverage: round(coverage, 4),
      hardFailure,
      runs: browserRuns
    };
  });
  const score = workflows.length ? mean(results.map((result) => result.score)) : 0;
  const coverage = workflows.length ? mean(results.map((result) => result.coverage)) : 0;
  const hardFailures = results.filter((result) => result.hardFailure);
  const failures = [];
  if (settings.enabled) {
    if (settings.required && !workflows.length) failures.push("required workflows are missing");
    if (workflows.length && coverage < settings.minimumCoverage) failures.push(`workflow coverage ${round(coverage, 4)} is below ${settings.minimumCoverage}`);
    if (workflows.length && score < settings.completionFloor) failures.push(`workflow completion ${round(score, 4)} is below ${settings.completionFloor}`);
    if (hardFailures.length) failures.push(`${hardFailures.length} hard workflow${hardFailures.length === 1 ? "" : "s"} failed or remain unknown`);
  }
  return {
    enabled: settings.enabled,
    eligible: !settings.enabled || failures.length === 0,
    settings,
    score: round(clamp(score), 4),
    coverage: round(clamp(coverage), 4),
    hardFailures,
    failures,
    results
  };
}
