export type ChecklistItem = {
  id: string;
  title: string;
  detail: string;
};

export type ChecklistGroup = {
  title: string;
  description: string;
  items: ChecklistItem[];
};

export const checklistGroups: ChecklistGroup[] = [
  {
    title: "Critical accounts",
    description:
      "Start with the accounts that control recovery, identity, money, or a large part of your digital life.",
    items: [
      {
        id: "critical-email",
        title: "Review your primary email first",
        detail: "Treat your main inbox like the recovery hub behind the rest of your accounts.",
      },
      {
        id: "critical-mfa",
        title: "Enable strong MFA on your most important accounts",
        detail: "Prioritize email, password manager, banking, cloud storage, and exchanges before everything else.",
      },
      {
        id: "critical-sessions",
        title: "Check active sessions and old devices",
        detail: "Remove devices or sessions that no longer make sense, especially after travel or phone changes.",
      },
      {
        id: "critical-forwarding",
        title: "Inspect forwarding and delegated access",
        detail: "Look for old rules, delegates, or app access that could keep exposure alive without you noticing.",
      },
    ],
  },
  {
    title: "Recovery and resilience",
    description:
      "Most people focus on passwords and ignore recovery. Recovery paths often decide whether an account stays safe.",
    items: [
      {
        id: "recovery-phone",
        title: "Review which phone number is used for recovery",
        detail: "Avoid leaving the same number attached everywhere if it is old, public, or loosely controlled.",
      },
      {
        id: "recovery-email",
        title: "Clean up recovery emails",
        detail: "Make sure recovery emails still exist, are controlled by you, and are not stale leftovers.",
      },
      {
        id: "recovery-codes",
        title: "Store backup codes deliberately",
        detail: "Keep them in a safe, retrievable place instead of screenshots, random notes, or forgotten folders.",
      },
      {
        id: "recovery-notes",
        title: "Document what you changed",
        detail: "A few notes about your setup will matter later when you are stressed, traveling, or recovering access.",
      },
    ],
  },
  {
    title: "Devices and browser habits",
    description:
      "Your setup is only as clean as the devices, browser profiles, and update habits supporting it.",
    items: [
      {
        id: "device-updates",
        title: "Update your primary devices",
        detail: "Catch up on OS, browser, password manager, and authenticator updates before adding new complexity.",
      },
      {
        id: "device-lock",
        title: "Use strong screen lock and encrypted storage",
        detail: "A clean account setup still breaks down if your main device is easy to unlock or easy to lose.",
      },
      {
        id: "browser-separation",
        title: "Separate admin and everyday browsing",
        detail: "Use distinct browser profiles for critical account changes, normal browsing, and public-facing work.",
      },
      {
        id: "device-sharing",
        title: "Stop shared or legacy device access",
        detail: "Shared laptops, old phones, and forgotten browsers quietly keep sensitive sessions alive.",
      },
    ],
  },
  {
    title: "Exposure and identity hygiene",
    description:
      "Better privacy usually means less unnecessary overlap between your public identity and your critical accounts.",
    items: [
      {
        id: "exposure-old-accounts",
        title: "Audit old public profiles and forgotten accounts",
        detail: "Remove or clean up dormant accounts that still reveal personal details, handles, or recovery patterns.",
      },
      {
        id: "exposure-handles",
        title: "Reduce handle and identity reuse",
        detail: "Avoid broadcasting the same public username, phone, or inbox across every platform by default.",
      },
      {
        id: "exposure-crypto",
        title: "Separate public identity from crypto activity",
        detail: "If you hold crypto, reduce unnecessary overlap between public accounts, wallets, and event routines.",
      },
      {
        id: "exposure-routine",
        title: "Review what your habits leak over time",
        detail: "Location patterns, bios, public calendars, and support interactions can expose more than passwords ever will.",
      },
    ],
  },
];
