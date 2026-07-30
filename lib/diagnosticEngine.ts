import { diagnosticRules } from "@/app/data/diagnosticRules";

export function getNextRecommendation(
  faultCode: string,
  testResult: "ok" | "failed" | null
) {
  const rule = diagnosticRules[faultCode as keyof typeof diagnosticRules];

  if (!rule) {
    return "Ingen anbefaling tilgjengelig.";
  }

  if (testResult === "ok") {
    return rule.ok;
  }

  if (testResult === "failed") {
    return rule.failed;
  }

  return rule.start;
}