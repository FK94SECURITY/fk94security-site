export type ResourceAsset = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  time: string;
  href: string;
  cta: string;
  tags: string[];
};

export const toolAssets: ResourceAsset[] = [
  {
    slug: "opsec-checklist",
    title: "OPSEC Checklist",
    description: "An interactive checklist to improve safer account, device, and exposure habits one step at a time.",
    audience: "For anyone starting from the basics.",
    time: "15-25 min",
    href: "/free-resources/opsec-checklist",
    cta: "Open checklist",
    tags: ["beginner", "accounts", "devices"],
  },
  {
    slug: "account-hardening-planner",
    title: "Account Hardening Planner",
    description: "A guided planner that turns your setup into a personalized hardening path.",
    audience: "For users who want practical next steps, not abstract advice.",
    time: "10-15 min",
    href: "/free-resources/account-hardening-planner",
    cta: "Plan your setup",
    tags: ["beginner", "accounts", "devices"],
  },
  {
    slug: "incident-triage",
    title: "Incident Triage",
    description: "A calm first-pass tool for suspicious logins, phishing scares, lost access, or device problems.",
    audience: "For users facing something urgent or confusing.",
    time: "5-10 min",
    href: "/free-resources/incident-triage",
    cta: "Start triage",
    tags: ["urgent", "accounts", "incident"],
  },
  {
    slug: "exposure-self-check",
    title: "Exposure Self-Check",
    description: "A guided self-assessment to spot account dependencies, identity overlap, and avoidable exposure.",
    audience: "For people who want a clearer sense of risk before booking help.",
    time: "8-12 min",
    href: "/free-resources/exposure-self-check",
    cta: "Run self-check",
    tags: ["beginner", "urgent", "accounts", "crypto"],
  },
];

export const guideHighlights: ResourceAsset[] = [
  {
    slug: "digital-privacy-everyday-people",
    title: "Digital Privacy for Everyday People",
    description: "A grounded introduction to better digital habits without becoming paranoid.",
    audience: "For normal users who want a practical starting point.",
    time: "8 min read",
    href: "/guides/digital-privacy-everyday-people",
    cta: "Read guide",
    tags: ["beginner", "privacy"],
  },
  {
    slug: "gmail-hardening-checklist",
    title: "A Practical Gmail Hardening Checklist",
    description: "The key Gmail settings and habits that matter most for normal users.",
    audience: "For Gmail users who want safer defaults.",
    time: "7 min read",
    href: "/guides/gmail-hardening-checklist",
    cta: "Read guide",
    tags: ["accounts", "beginner"],
  },
  {
    slug: "recovery-and-mfa-guide",
    title: "Recovery & MFA Setup Guide",
    description: "How to harden account recovery without locking yourself out later.",
    audience: "For anyone cleaning up account recovery and MFA.",
    time: "9 min read",
    href: "/guides/recovery-and-mfa-guide",
    cta: "Read guide",
    tags: ["accounts", "intermediate"],
  },
  {
    slug: "crypto-opsec-basics",
    title: "Crypto OPSEC Basics",
    description: "Simple habits for users who hold crypto and want fewer avoidable mistakes.",
    audience: "For crypto users who want a safer baseline.",
    time: "7 min read",
    href: "/guides/crypto-opsec-basics",
    cta: "Read guide",
    tags: ["crypto", "beginner"],
  },
];

export const templateAssets: ResourceAsset[] = [
  {
    slug: "account-inventory-template",
    title: "Account Inventory Template",
    description: "A starter structure for mapping your important accounts, recovery options, and owners.",
    audience: "For anyone trying to understand what they already have.",
    time: "10 min setup",
    href: "/open-resources#account-inventory-template",
    cta: "Open template",
    tags: ["beginner", "accounts", "template"],
  },
  {
    slug: "remediation-plan-template",
    title: "30-Day Remediation Plan",
    description: "A lightweight template for spacing out account cleanup over a month.",
    audience: "For people who want to improve without doing everything in one day.",
    time: "5 min setup",
    href: "/open-resources#remediation-plan-template",
    cta: "View plan",
    tags: ["beginner", "template"],
  },
  {
    slug: "incident-response-checklist",
    title: "Incident Response Checklist",
    description: "A simple checklist to keep your first response calm and structured.",
    audience: "For users who want something ready before a scare happens.",
    time: "5 min setup",
    href: "/open-resources#incident-response-checklist",
    cta: "View checklist",
    tags: ["urgent", "template", "incident"],
  },
  {
    slug: "digital-footprint-map",
    title: "Digital Footprint Map",
    description: "A basic map for seeing where your identities, handles, and accounts overlap.",
    audience: "For people who want to reduce unnecessary exposure.",
    time: "10 min setup",
    href: "/open-resources#digital-footprint-map",
    cta: "Open map",
    tags: ["privacy", "template"],
  },
];

export type OpenRepo = {
  slug: string;
  name: string;
  audience: string;
  description: string;
  cta: string;
  href: string;
  license: string;
};

export const openRepos: OpenRepo[] = [
  {
    slug: "opsec-checklists",
    name: "opsec-checklists",
    audience: "Beginner to intermediate users",
    description: "Markdown checklists and simple walkthroughs for safer online habits.",
    cta: "View repo",
    href: "https://github.com/fk94security/opsec-checklists",
    license: "MIT",
  },
  {
    slug: "account-hardening-guides",
    name: "account-hardening-guides",
    audience: "People cleaning up email, recovery, and MFA",
    description: "Practical hardening guides for common account setups and recovery paths.",
    cta: "View repo",
    href: "https://github.com/fk94security/account-hardening-guides",
    license: "CC BY 4.0",
  },
  {
    slug: "security-templates",
    name: "security-templates",
    audience: "People who need structure, not theory",
    description: "Reusable templates for account inventories, remediation plans, and incident checklists.",
    cta: "View repo",
    href: "https://github.com/fk94security/security-templates",
    license: "MIT",
  },
  {
    slug: "privacy-starter-pack",
    name: "privacy-starter-pack",
    audience: "People getting started with digital privacy",
    description: "A curated starter pack with beginner-friendly privacy resources and setup notes.",
    cta: "View repo",
    href: "https://github.com/fk94security/privacy-starter-pack",
    license: "CC BY 4.0",
  },
  {
    slug: "fk94-guides",
    name: "fk94-guides",
    audience: "Readers who want all guides in one place",
    description: "An index of FK94 writing, updates, and open resources with cross-links to the site.",
    cta: "View repo",
    href: "https://github.com/fk94security/fk94-guides",
    license: "MIT",
  },
];
