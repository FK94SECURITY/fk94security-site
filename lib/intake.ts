import { toolAssets } from "@/content/resources";

export type IntakePayload = {
  name: string;
  email: string;
  countryTimezone: string;
  helpType: string;
  urgency: "low" | "medium" | "high";
  usedResources: string;
  details: string;
};

export type IntakeResult = {
  fit: "low" | "medium" | "high";
  urgency: "low" | "medium" | "high";
  suggestedService: string;
  responseWindow: string;
  recommendedResourceSlugs: string[];
  summary: string;
};

const resourceByHelpType: Record<string, string[]> = {
  "general-privacy-cleanup": ["opsec-checklist", "exposure-self-check"],
  "account-security": ["account-hardening-planner", "opsec-checklist"],
  "crypto-related-privacy": ["exposure-self-check", "account-hardening-planner"],
  "incident-suspicious-activity": ["incident-triage", "opsec-checklist"],
  "public-exposure-concerns": ["exposure-self-check", "opsec-checklist"],
  other: ["opsec-checklist", "account-hardening-planner"],
};

const serviceByHelpType: Record<string, string> = {
  "general-privacy-cleanup": "Privacy Review",
  "account-security": "Hardening",
  "crypto-related-privacy": "OPSEC Advisory",
  "incident-suspicious-activity": "Incident Response",
  "public-exposure-concerns": "OPSEC Advisory",
  other: "Privacy Review",
};

export function getRecommendedResourceSlugs(helpType: string) {
  return resourceByHelpType[helpType] ?? ["opsec-checklist"];
}

export function getSuggestedService(helpType: string) {
  return serviceByHelpType[helpType] ?? "Privacy Review";
}

export function scoreIntake(payload: IntakePayload): IntakeResult {
  let points = 0;

  if (payload.urgency === "high") {
    points += 4;
  } else if (payload.urgency === "medium") {
    points += 2;
  }

  if (payload.helpType === "incident-suspicious-activity" || payload.helpType === "public-exposure-concerns") {
    points += 3;
  }

  if (payload.usedResources === "yes") {
    points += 1;
  }

  if (payload.details.trim().length > 180) {
    points += 1;
  }

  const fit = points >= 6 ? "high" : points >= 3 ? "medium" : "low";
  const suggestedService = getSuggestedService(payload.helpType);
  const recommendedResourceSlugs = getRecommendedResourceSlugs(payload.helpType);

  const responseWindow =
    payload.urgency === "high"
      ? "We will review your request within 24 hours."
      : payload.urgency === "medium"
        ? "We will get back to you within 2 days."
        : "We will respond within 3 days.";

  const summary =
    fit === "high"
      ? "Your situation needs personal attention. We will reach out soon."
      : fit === "medium"
        ? "Looks like a good fit for a 1:1 session. Check the recommended resources while you wait."
        : "Start with the free resources below. If you still need help after that, we are here.";

  return {
    fit,
    urgency: payload.urgency,
    suggestedService,
    responseWindow,
    recommendedResourceSlugs: recommendedResourceSlugs.filter((slug) =>
      toolAssets.some((resource) => resource.slug === slug),
    ),
    summary,
  };
}
