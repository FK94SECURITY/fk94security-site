import { toolAssets } from "@/content/resources";

export type IntakePayload = {
  name: string;
  email: string;
  countryTimezone: string;
  helpType: string;
  urgency: "low" | "medium" | "high";
  usedResources: string;
  budgetRange: string;
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
  "general-privacy-cleanup": "Personal Privacy Review",
  "account-security": "Hardening Sprint",
  "crypto-related-privacy": "Private OPSEC Advisory",
  "incident-suspicious-activity": "Incident Help",
  "public-exposure-concerns": "Private OPSEC Advisory",
  other: "Personal Privacy Review",
};

export function getRecommendedResourceSlugs(helpType: string) {
  return resourceByHelpType[helpType] ?? ["opsec-checklist"];
}

export function getSuggestedService(helpType: string) {
  return serviceByHelpType[helpType] ?? "Personal Privacy Review";
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

  if (payload.budgetRange === "500-1200" || payload.budgetRange === "1200-plus") {
    points += 2;
  } else if (payload.budgetRange === "200-500") {
    points += 1;
  }

  if (payload.details.trim().length > 180) {
    points += 1;
  }

  const fit = points >= 7 ? "high" : points >= 4 ? "medium" : "low";
  const suggestedService = getSuggestedService(payload.helpType);
  const recommendedResourceSlugs = getRecommendedResourceSlugs(payload.helpType);

  const responseWindow =
    payload.urgency === "high"
      ? "We aim to review urgent requests within 1 business day."
      : payload.urgency === "medium"
        ? "We aim to respond within 2 business days."
        : "We aim to respond within 3 business days.";

  const summary =
    fit === "high"
      ? "Strong consulting fit. A private review or scoped response is likely the right next step."
      : fit === "medium"
        ? "Good fit. Start with a focused review and use the recommended resources while you wait."
        : "Likely a basics-first case. Start with the free resources and we can scope personal help if needed.";

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
