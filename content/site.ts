export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/free-resources", label: "Resources" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export const homeProblems = [
  "Accounts that were set up once and never reviewed again.",
  "Recovery options tied to the same email or phone number everywhere.",
  "Too much public exposure across social platforms and old accounts.",
  "Phishing, suspicious logins, and avoidable account confusion.",
  "Crypto habits without basic separation and cleanup.",
  "Shared devices, browser sprawl, and weak backup routines.",
];

export const homeHelpSteps = [
  {
    title: "Learn",
    body: "Start with free tools, guides, and templates that explain the basics without fear tactics.",
  },
  {
    title: "Fix basics",
    body: "Work through checklists, hardening plans, and triage tools to reduce obvious weak spots.",
  },
  {
    title: "Get personal help",
    body: "When your situation is more sensitive, messy, or urgent, move into a private 1:1 review.",
  },
];

export const trustPrinciples = [
  "Practical, not fear-based.",
  "Privacy-conscious by design.",
  "Advice-first and implementation-aware.",
  "No unnecessary complexity, no dashboard theater.",
];

export type Service = {
  slug: string;
  name: string;
  summary: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "privacy-review",
    name: "Privacy Review",
    summary:
      "Understand where your setup is weak and what to fix first. Accounts, recovery, exposure, quick wins.",
    points: [
      "Review of critical accounts and recovery paths",
      "MFA and account structure review",
      "Exposure and hygiene check",
      "Prioritized action plan",
    ],
  },
  {
    slug: "hardening",
    name: "Hardening",
    summary:
      "Hands-on help to actually implement changes, clean up old settings, and build a safer baseline.",
    points: [
      "Account structure and cleanup",
      "Recovery and MFA setup",
      "Browser and device hardening",
      "Identity separation where needed",
    ],
  },
  {
    slug: "incident-response",
    name: "Incident Response",
    summary:
      "Phishing scares, suspicious activity, access loss, or recent exposure that needs calm, structured triage.",
    points: [
      "Immediate triage and next steps",
      "Damage containment",
      "Account recovery guidance",
      "Escalation path if needed",
    ],
  },
  {
    slug: "opsec-advisory",
    name: "OPSEC Advisory",
    summary:
      "For more exposed people, sensitive situations, or cases that need deeper, private support.",
    points: [
      "Sensitive setup review",
      "Exposure and identity mapping",
      "Safer communication habits",
      "Tailored advice for unusual situations",
    ],
  },
];

export const aboutPillars = [
  {
    title: "Why FK94 exists",
    body: "Most people do not need paranoia. They need a calmer, clearer way to improve the things that actually matter.",
  },
  {
    title: "How we work",
    body: "We start with practical guidance, focus on basics first, and only go deeper when the situation really requires it.",
  },
  {
    title: "Privacy by design",
    body: "The goal is to reduce exposure and unnecessary data collection, not create more tracking, more dashboards, or more noise.",
  },
];

export const casesWeTake = [
  "General privacy cleanup and account organization",
  "Recovery, MFA, and account hardening issues",
  "Suspicious activity and phishing aftermath",
  "Crypto basics and safer operational habits",
  "Public exposure concerns that need a private review",
];

export const casesWeDontTake = [
  "Corporate enterprise security programs",
  "Offensive security work or active intrusion operations",
  "24/7 managed monitoring retainers disguised as consulting",
  "Requests that require unsafe, unethical, or illegal actions",
];

export const intakeOptions = [
  { value: "general-privacy-cleanup", label: "General privacy cleanup" },
  { value: "account-security", label: "Account security" },
  { value: "crypto-related-privacy", label: "Crypto-related privacy" },
  { value: "incident-suspicious-activity", label: "Incident / suspicious activity" },
  { value: "public-exposure-concerns", label: "Public exposure concerns" },
  { value: "other", label: "Other" },
];

export const urgencyOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const footerGroups = [
  {
    title: "Learn",
    links: [
      { href: "/free-resources", label: "Free Resources" },
      { href: "/guides", label: "Guides" },
      { href: "/open-resources", label: "Open Source" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/get-help", label: "Get Help" },
      { href: "/incident-help", label: "Incident Help" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];
