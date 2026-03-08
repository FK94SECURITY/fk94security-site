export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/free-resources", label: "Free Resources" },
  { href: "/services", label: "Services" },
  { href: "/guides", label: "Guides" },
  { href: "/book-review", label: "Book a Review" },
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
  audience: string;
  cta: string;
  href: string;
  scopeLabel: string;
  pricingNote: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "personal-privacy-review",
    name: "Personal Privacy Review",
    summary:
      "A clear, practical session for people who want to understand where their setup is weak and what to fix first.",
    audience: "For normal users who want a focused review without jargon.",
    cta: "Book this review",
    href: "/book-review?focus=general-privacy-cleanup",
    scopeLabel: "Focused session, tailored to your setup",
    pricingNote: "Starting from a single private review",
    points: [
      "Review of critical accounts and recovery paths",
      "MFA and account structure review",
      "Basic exposure and hygiene review",
      "Quick wins and priorities",
    ],
  },
  {
    slug: "hardening-sprint",
    name: "Hardening Sprint",
    summary:
      "Hands-on help to actually implement the changes, clean up old settings, and build a safer baseline.",
    audience: "For people who do not want to figure everything out alone.",
    cta: "Start a sprint",
    href: "/book-review?focus=account-security",
    scopeLabel: "Scoped around implementation work",
    pricingNote: "Tailored to implementation scope",
    points: [
      "Account structure and cleanup",
      "Recovery and MFA setup",
      "Browser and device basics",
      "Identity separation where needed",
    ],
  },
  {
    slug: "incident-help",
    name: "Incident Help",
    summary:
      "Support for phishing scares, suspicious activity, access loss, or recent exposure that needs calm triage.",
    audience: "For people dealing with a current or recent problem.",
    cta: "Request urgent help",
    href: "/incident-help",
    scopeLabel: "Response depends on urgency and scope",
    pricingNote: "Urgent scopes reviewed first",
    points: [
      "Immediate next steps and triage",
      "Damage containment priorities",
      "Account recovery and cleanup guidance",
      "Clear escalation path if needed",
    ],
  },
  {
    slug: "private-opsec-advisory",
    name: "Private OPSEC Advisory",
    summary:
      "Deeper support for more exposed people, more sensitive situations, or cases that do not fit a basic review.",
    audience: "For higher-exposure, more complex, or more private cases.",
    cta: "Apply privately",
    href: "/book-review?focus=public-exposure-concerns",
    scopeLabel: "Private scope review before engagement",
    pricingNote: "Private scope review before pricing",
    points: [
      "More sensitive setup review",
      "Exposure and identity mapping",
      "Safer communications and operating habits",
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

export const budgetOptions = [
  { value: "not-sure", label: "Not sure yet" },
  { value: "under-200", label: "Under $200" },
  { value: "200-500", label: "$200 - $500" },
  { value: "500-1200", label: "$500 - $1,200" },
  { value: "1200-plus", label: "$1,200+" },
];

export const footerGroups = [
  {
    title: "Explore",
    links: [
      { href: "/free-resources", label: "Free Resources" },
      { href: "/guides", label: "Guides" },
      { href: "/open-resources", label: "Open Resources" },
      { href: "/incident-help", label: "Incident Help" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Personal Privacy Review" },
      { href: "/services#hardening-sprint", label: "Hardening Sprint" },
      { href: "/services#incident-help", label: "Incident Help" },
      { href: "/services#private-opsec-advisory", label: "Private Advisory" },
    ],
  },
  {
    title: "FK94",
    links: [
      { href: "/about", label: "About / Method" },
      { href: "/book-review", label: "Book a Review" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];
