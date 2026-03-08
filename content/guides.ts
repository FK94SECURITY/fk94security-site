export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  level: "beginner" | "intermediate" | "urgent" | "crypto";
  tags: string[];
  intro: string;
  sections: GuideSection[];
  takeaway: string;
};

export const guides: Guide[] = [
  {
    slug: "digital-privacy-everyday-people",
    title: "Digital Privacy for Everyday People",
    description: "A practical starting point for people who want better online habits without turning privacy into a lifestyle project.",
    category: "Privacy Basics",
    readTime: "8 min read",
    level: "beginner",
    tags: ["privacy", "beginner", "accounts"],
    intro:
      "Most people do not need a dramatic reinvention of their digital life. They need a few better defaults, a little less exposure, and a calmer way to make decisions.",
    sections: [
      {
        heading: "Start with what matters most",
        paragraphs: [
          "Privacy work is easier when you start with the accounts, devices, and habits that matter most. Your primary email, recovery options, phone number, and browser habits usually matter more than exotic tools.",
          "The goal is not perfection. The goal is to reduce obvious weaknesses and stop unnecessary exposure from accumulating.",
        ],
        bullets: [
          "Protect your main email first",
          "Review recovery settings before changing everything else",
          "Separate convenience from exposure where possible",
        ],
      },
      {
        heading: "Reduce unnecessary exposure",
        paragraphs: [
          "Many privacy problems come from overlap: the same phone number, the same public handle, the same inbox, and the same identity showing up everywhere.",
          "You do not need total separation overnight. You do need to notice where your setup creates single points of failure.",
        ],
        bullets: [
          "Audit old public profiles and forgotten accounts",
          "Decide which email and phone number are truly primary",
          "Stop reusing the same public handle everywhere",
        ],
      },
      {
        heading: "Make privacy sustainable",
        paragraphs: [
          "A useful privacy setup is one you can actually maintain. Overcomplicated setups fail under stress, travel, or normal forgetfulness.",
          "Choose habits you can repeat: password manager use, MFA review, backup routines, and basic cleanup sessions every few months.",
        ],
      },
    ],
    takeaway: "Better privacy starts with clearer priorities, not more paranoia.",
  },
  {
    slug: "gmail-hardening-checklist",
    title: "A Practical Gmail Hardening Checklist",
    description: "The settings and habits that matter most if Gmail is your digital center of gravity.",
    category: "Accounts",
    readTime: "7 min read",
    level: "beginner",
    tags: ["gmail", "accounts", "beginner"],
    intro:
      "For many people, Gmail is the account behind everything else. If it falls, recovery across the rest of your digital life gets much harder.",
    sections: [
      {
        heading: "Treat Gmail as a critical account",
        paragraphs: [
          "Your inbox is not just email. It is recovery, identity proof, financial notifications, account resets, and long-term access.",
        ],
        bullets: [
          "Use strong MFA",
          "Review recovery email and phone",
          "Remove old or unused devices and sessions",
        ],
      },
      {
        heading: "Clean up access paths",
        paragraphs: [
          "Account hardening is not only about adding protection. It is also about removing stale recovery options, unknown app access, and old sessions that no longer make sense.",
        ],
        bullets: [
          "Review security activity and connected apps",
          "Check forwarding and filter rules",
          "Review delegated access and old devices",
        ],
      },
      {
        heading: "Build a safer routine",
        paragraphs: [
          "The strongest setup still needs maintenance. Add a reminder to review Gmail security every quarter, especially after travel, device changes, or account scares.",
        ],
      },
    ],
    takeaway: "If you only harden one account this week, make it your primary email.",
  },
  {
    slug: "recovery-and-mfa-guide",
    title: "Recovery & MFA Without Locking Yourself Out",
    description: "How to improve account recovery and MFA in a way that stays usable under stress.",
    category: "Recovery & MFA",
    readTime: "9 min read",
    level: "intermediate",
    tags: ["recovery", "mfa", "accounts"],
    intro:
      "Many users focus on passwords and ignore recovery. In practice, recovery settings often decide whether an account stays safe or becomes easy to take over.",
    sections: [
      {
        heading: "Recovery is part of the threat surface",
        paragraphs: [
          "If the same old phone number or secondary inbox unlocks everything, your setup is only as strong as that weakest recovery path.",
          "MFA matters, but recovery choices often matter just as much.",
        ],
      },
      {
        heading: "Make recovery deliberate",
        paragraphs: [
          "Choose recovery channels on purpose. Decide which email, phone, and backup codes are part of your real safety plan and which are just leftovers from the past.",
        ],
        bullets: [
          "Document backup codes in a safe place",
          "Use an updated recovery email you actually control",
          "Avoid leaving old numbers connected forever",
        ],
      },
      {
        heading: "Avoid self-lockout by design",
        paragraphs: [
          "The goal is not to create the most complex MFA stack possible. The goal is to stay recoverable without relying on bad defaults.",
        ],
        bullets: [
          "Test recovery before you need it",
          "Review device trust settings",
          "Write down what you changed and why",
        ],
      },
    ],
    takeaway: "A safe setup still has to be recoverable by you, not only hard for everyone else.",
  },
  {
    slug: "separate-personal-and-public-identities",
    title: "How to Separate Personal and Public Identities Online",
    description: "A practical guide to reducing overlap between your private life and your public digital footprint.",
    category: "Digital Footprint",
    readTime: "8 min read",
    level: "intermediate",
    tags: ["identity", "social-media", "privacy"],
    intro:
      "You do not need a secret second life to benefit from better identity separation. You just need fewer unnecessary overlaps.",
    sections: [
      {
        heading: "Find the overlap first",
        paragraphs: [
          "The same handle, same profile image, same inbox, and same phone number across public services make you easier to correlate.",
        ],
        bullets: [
          "List your public handles",
          "Map which inbox and phone each one uses",
          "Notice where personal and public accounts cross",
        ],
      },
      {
        heading: "Separate what has real risk",
        paragraphs: [
          "You do not need total separation for every account. Focus first on the ones that create exposure, reputation risk, or easy account recovery chains.",
        ],
      },
      {
        heading: "Reduce metadata and routine leakage",
        paragraphs: [
          "Public exposure is not only about usernames. It is also about recurring locations, travel timing, old bios, and cross-linked habits that make correlation easy.",
        ],
      },
    ],
    takeaway: "Identity separation is about reducing unnecessary overlap, not building a dramatic double life.",
  },
  {
    slug: "what-to-do-after-a-phishing-scare",
    title: "What to Do After a Phishing Scare",
    description: "A calm first-response guide for suspicious clicks, weird login prompts, and uncertain account activity.",
    category: "Incident Response",
    readTime: "6 min read",
    level: "urgent",
    tags: ["incident", "phishing", "urgent"],
    intro:
      "The first mistake after a scare is usually panic. The second is changing too many things in the wrong order. Start calm, then move through the basics in a cleaner sequence.",
    sections: [
      {
        heading: "Slow the situation down",
        paragraphs: [
          "Not every weird email means compromise, but every scare deserves a basic sequence: identify the affected account, confirm recent activity, and protect recovery paths first.",
        ],
      },
      {
        heading: "Protect the critical path",
        paragraphs: [
          "Start with the primary email and any account that controls recovery for others. Then review active sessions, change relevant credentials, and check MFA settings.",
        ],
        bullets: [
          "Review active sessions and recent login activity",
          "Change passwords for affected critical accounts",
          "Check whether forwarding or filter rules were modified",
        ],
      },
      {
        heading: "Document what you noticed",
        paragraphs: [
          "Write down what happened, when it happened, and what you changed. This makes it easier to spot what is real and what is just fear or noise.",
        ],
      },
    ],
    takeaway: "A structured first hour beats a panicked full-day cleanup every time.",
  },
  {
    slug: "crypto-opsec-basics",
    title: "Basic Crypto OPSEC for Normal Users",
    description: "Simple habits for people who use crypto and want fewer avoidable mistakes, not elite operator theater.",
    category: "Crypto Basics",
    readTime: "7 min read",
    level: "crypto",
    tags: ["crypto", "wallets", "privacy"],
    intro:
      "You do not need to live like a covert operator to improve crypto safety. You do need fewer avoidable overlaps between identity, devices, wallets, and routines.",
    sections: [
      {
        heading: "Separate what matters",
        paragraphs: [
          "The same device, same browser, same public identity, and same wallet flow for everything creates unnecessary attribution and targeting risk.",
        ],
        bullets: [
          "Separate public activity from important wallet activity",
          "Avoid linking identity convenience to real holdings",
          "Use calmer, cleaner habits around travel and events",
        ],
      },
      {
        heading: "Control recovery and account dependencies",
        paragraphs: [
          "Your crypto exposure is not only about wallets. It includes email, phone numbers, exchange accounts, cloud backups, and support interactions.",
        ],
      },
      {
        heading: "Make safe behavior boring",
        paragraphs: [
          "The safest crypto habits are often the least dramatic ones: slower movement, cleaner separation, better backups, and fewer public clues.",
        ],
      },
    ],
    takeaway: "Good crypto OPSEC is usually quieter, slower, and less convenient than bad crypto OPSEC.",
  },
];

export const guideCategories = [
  "Accounts",
  "Privacy Basics",
  "Recovery & MFA",
  "Social Media",
  "Devices",
  "Crypto Basics",
  "Incident Response",
  "Digital Footprint",
];

export const futureGuideIdeas = [
  "The 7 account security mistakes most people make",
  "Why recovery settings matter more than your password",
  "How much of your life is visible through your social media",
  "Why using the same phone number everywhere is risky",
  "How to clean up old accounts you forgot about",
  "What your browser setup says about your digital hygiene",
  "Digital footprint basics for remote workers",
  "iPhone privacy basics most people ignore",
  "How to build a safer online setup in one weekend",
];
