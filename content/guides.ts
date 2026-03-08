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
  {
    slug: "social-media-privacy-settings",
    title: "Social Media Privacy Settings That Actually Matter",
    description: "A platform-by-platform guide to the privacy settings worth changing on Instagram, Twitter/X, Facebook, LinkedIn, and TikTok.",
    category: "Social Media",
    readTime: "10 min read",
    level: "beginner" as const,
    tags: ["privacy", "social-media", "beginner"],
    intro:
      "Social media platforms are designed to share as much as possible by default. Most people never touch their privacy settings, which means their location, contacts, search history, and activity are more public than they realize.",
    sections: [
      {
        heading: "Instagram",
        paragraphs: [
          "Instagram shares a lot by default: your activity status, read receipts, story views, and tagged photos. Most of these can be limited without affecting how you use the app.",
        ],
        bullets: [
          "Switch to a private account if you do not need public reach (Settings > Privacy > Private Account)",
          "Turn off Activity Status so people cannot see when you are online",
          "Disable sharing to other apps (Facebook, Twitter) unless intentional",
          "Review tagged photos before they appear on your profile (Settings > Privacy > Tags > Manually Approve Tags)",
          "Limit who can message you (Settings > Privacy > Messages)",
        ],
      },
      {
        heading: "Twitter / X",
        paragraphs: [
          "Twitter exposes your likes, follows, and location by default. It also shares data with advertisers unless you explicitly opt out.",
        ],
        bullets: [
          "Disable location on tweets (Settings > Privacy and Safety > Location Information)",
          "Turn off Discoverability by email and phone number",
          "Review and clean up Connected Apps (Settings > Security > Apps and Sessions)",
          "Disable personalized ads (Settings > Privacy and Safety > Ads Preferences)",
          "Protect your tweets if you want a private account",
        ],
      },
      {
        heading: "Facebook",
        paragraphs: [
          "Facebook has the most granular privacy settings of any platform, but the defaults are all set to maximum exposure. Worth spending 15 minutes here.",
        ],
        bullets: [
          "Change default post audience to Friends Only (Settings > Privacy > Who can see your future posts)",
          "Limit who can look you up by email or phone number (Settings > Privacy)",
          "Review what info is public on your profile (About section, friends list, photos)",
          "Turn off face recognition (Settings > Face Recognition)",
          "Review app permissions and remove old apps (Settings > Apps and Websites)",
        ],
      },
      {
        heading: "LinkedIn",
        paragraphs: [
          "LinkedIn is often overlooked because it feels professional, but it exposes your job history, connections, and activity to anyone by default.",
        ],
        bullets: [
          "Control your public profile visibility (Settings > Visibility > Edit your public profile)",
          "Disable activity broadcasts for connection changes and profile edits",
          "Turn off profile viewing notifications if you want to browse privately",
          "Review who can see your connections (Settings > Visibility > Who can see your connections)",
          "Disable data sharing with third-party apps",
        ],
      },
      {
        heading: "TikTok",
        paragraphs: [
          "TikTok collects a lot of data and most of it is shared with advertisers. The privacy settings are limited, but worth configuring.",
        ],
        bullets: [
          "Set account to private if you do not create public content",
          "Disable personalized ads (Settings > Privacy > Personalization and Data)",
          "Turn off Allow Others to Find Me (Settings > Privacy)",
          "Disable downloads of your videos",
          "Review and revoke third-party app access regularly",
        ],
      },
    ],
    takeaway: "Most social media privacy improvements take 5 minutes per platform and make a real difference in how much of your life is publicly visible.",
  },
  {
    slug: "browser-security-basics",
    title: "Browser Security Basics",
    description: "How to set up your browser for better privacy and security without breaking the web.",
    category: "Devices",
    readTime: "8 min read",
    level: "beginner" as const,
    tags: ["devices", "privacy", "beginner"],
    intro:
      "Your browser is your window to the internet and also the biggest source of tracking, fingerprinting, and data leakage. A few changes to your browser setup can significantly reduce your exposure.",
    sections: [
      {
        heading: "Choose a better default browser",
        paragraphs: [
          "Not all browsers are equal when it comes to privacy. Chrome is the most popular but also the most aggressive in tracking. Firefox and Brave offer better privacy defaults out of the box.",
          "If you are not ready to switch, at least configure your current browser properly.",
        ],
        bullets: [
          "Firefox: Best balance of privacy and compatibility. Enable Enhanced Tracking Protection (Strict mode)",
          "Brave: Built-in ad blocking and tracker blocking. Good for most people",
          "Safari: Decent privacy on Apple devices. Enable Hide IP from Trackers",
          "Chrome: If you must use it, install uBlock Origin and configure privacy settings",
        ],
      },
      {
        heading: "Essential browser settings",
        paragraphs: [
          "These settings apply to most browsers and significantly reduce tracking and data exposure.",
        ],
        bullets: [
          "Block third-party cookies (most browsers have this option)",
          "Disable autofill for payment methods and addresses",
          "Clear cookies and site data on browser close (or use containers)",
          "Disable search suggestions that send every keystroke to the search engine",
          "Use a privacy-respecting search engine (DuckDuckGo, Startpage, Brave Search)",
          "Enable HTTPS-Only mode",
        ],
      },
      {
        heading: "Extensions worth installing",
        paragraphs: [
          "Less is more with extensions. Every extension has access to your browsing data. Only install what you need from trusted sources.",
        ],
        bullets: [
          "uBlock Origin: The best ad and tracker blocker. Free and open source",
          "Bitwarden: Password manager extension for autofilling credentials securely",
          "ClearURLs: Removes tracking parameters from URLs",
          "Skip Redirect: Bypasses unnecessary redirect tracking pages",
          "Do not install random extensions that promise extra features. Most are data harvesters",
        ],
      },
      {
        heading: "Habits that matter",
        paragraphs: [
          "Good browser hygiene is about habits, not just settings. Small changes in how you browse make a big difference.",
        ],
        bullets: [
          "Use private/incognito mode for one-off searches and logins",
          "Do not save passwords in the browser. Use a dedicated password manager",
          "Log out of accounts when you are done, especially on shared devices",
          "Review your extensions periodically and remove anything you do not use",
          "Be suspicious of browser notifications. Most are spam",
        ],
      },
    ],
    takeaway: "A well-configured browser with one or two good extensions does more for your privacy than any VPN subscription.",
  },
  {
    slug: "password-manager-guide",
    title: "Why You Need a Password Manager and How to Set One Up",
    description: "A step-by-step guide to choosing and setting up a password manager for the first time.",
    category: "Accounts",
    readTime: "7 min read",
    level: "beginner" as const,
    tags: ["accounts", "beginner", "passwords"],
    intro:
      "Using the same password everywhere is the single biggest security mistake most people make. A password manager fixes this by generating and storing unique passwords for every account.",
    sections: [
      {
        heading: "Why password reuse is dangerous",
        paragraphs: [
          "When one service gets breached, attackers try those credentials on every other service. This is called credential stuffing, and it works because most people reuse passwords.",
          "A password manager eliminates this risk by generating a unique, strong password for every account. You only need to remember one master password.",
        ],
      },
      {
        heading: "Which password manager to choose",
        paragraphs: [
          "There are several good options. The best one is the one you will actually use consistently.",
        ],
        bullets: [
          "Bitwarden: Free, open source, works on all platforms. Best choice for most people",
          "1Password: Polished, great family sharing. Paid but worth it if you prefer it",
          "KeePassXC: Offline, open source, for people who want full control. More technical",
          "Apple Passwords: Built into iOS/Mac. Good if you are fully in the Apple ecosystem",
          "Avoid LastPass. Their security track record is poor",
        ],
      },
      {
        heading: "Setting up for the first time",
        paragraphs: [
          "Getting started is easier than most people think. You do not need to migrate everything at once.",
        ],
        bullets: [
          "Install the app and browser extension on all your devices",
          "Create a strong master password (long passphrase, at least 4 random words)",
          "Write down your master password and recovery key, store them physically (not digitally)",
          "Start by saving passwords as you log in to sites naturally. No need to change everything on day one",
          "Over the next week, change passwords for your most important accounts (email, banking, cloud)",
          "Enable 2FA on your password manager account itself",
        ],
      },
      {
        heading: "Common mistakes to avoid",
        paragraphs: [
          "A password manager is only as good as how you use it. Avoid these common pitfalls.",
        ],
        bullets: [
          "Do not use a weak master password. This is the one password that needs to be strong and memorable",
          "Do not store your master password digitally (no notes app, no Google Doc)",
          "Do not share passwords by copying and pasting in chat. Use the password manager's sharing feature",
          "Do not ignore the recovery key. If you lose your master password without it, your vault is gone",
          "Do not keep using the browser's built-in password save. Use the password manager extension instead",
        ],
      },
    ],
    takeaway: "A password manager is the single highest-impact security improvement most people can make. Start with Bitwarden, it is free and takes 10 minutes to set up.",
  },
  {
    slug: "two-factor-authentication-guide",
    title: "Two-Factor Authentication: What to Use and What to Avoid",
    description: "A clear guide to 2FA methods, from SMS codes to hardware keys, and which ones actually protect you.",
    category: "Accounts",
    readTime: "8 min read",
    level: "beginner" as const,
    tags: ["accounts", "beginner", "2fa"],
    intro:
      "Two-factor authentication adds a second layer of security to your accounts. But not all 2FA methods are equal. Some are barely better than nothing, while others make your accounts nearly impossible to break into.",
    sections: [
      {
        heading: "The 2FA methods ranked",
        paragraphs: [
          "From weakest to strongest, here are the main 2FA methods and what they protect against.",
        ],
        bullets: [
          "SMS codes: Better than nothing, but vulnerable to SIM swapping and interception. Use only as a last resort",
          "Email codes: Slightly better than SMS, but if your email is compromised, so is your 2FA",
          "Authenticator apps (TOTP): Google Authenticator, Authy, or Bitwarden built-in. Good protection for most people",
          "Push notifications: Like the Google Prompt or Microsoft Authenticator push. Convenient and reasonably secure",
          "Hardware security keys: YubiKey, Google Titan. The strongest option. Phishing-resistant by design",
          "Passkeys: The newest option. Combines the convenience of biometrics with the security of hardware keys",
        ],
      },
      {
        heading: "Which accounts to protect first",
        paragraphs: [
          "Not all accounts need the same level of protection. Focus your strongest 2FA on the accounts that control everything else.",
        ],
        bullets: [
          "Email (Gmail, Outlook): This is the master key. If someone controls your email, they can reset every other password. Use the strongest 2FA you can here",
          "Cloud storage (Google Drive, iCloud): Contains personal documents, photos, and sometimes credentials",
          "Banking and financial: Banks usually support SMS or app-based 2FA. Use the app if available",
          "Password manager: Enable 2FA on your vault. This protects all your other passwords",
          "Social media: Less critical but still worth enabling, especially if you have a public presence",
          "Crypto exchanges: Must-have. Use authenticator app or hardware key, never SMS",
        ],
      },
      {
        heading: "Setting up an authenticator app",
        paragraphs: [
          "If you are starting from zero, an authenticator app is the best balance of security and convenience for most people.",
        ],
        bullets: [
          "Download an authenticator app (Bitwarden authenticator, Google Authenticator, or Authy)",
          "Go to your account's security settings and enable two-factor authentication",
          "Scan the QR code with the authenticator app",
          "Save the backup codes. Print them or write them down. Store them physically, not in your email",
          "Test the setup by logging out and back in",
          "Repeat for each important account",
        ],
      },
      {
        heading: "Backup codes are critical",
        paragraphs: [
          "The most common 2FA disaster is getting locked out of your own accounts because you lost your phone and did not save backup codes.",
          "Every service that offers 2FA also offers backup codes. These are one-time-use codes that let you in if you lose your device. Save them. Print them. Put them somewhere safe.",
        ],
        bullets: [
          "Save backup codes when you first enable 2FA",
          "Store them physically (printed, in a safe place) not in your email",
          "If you get a new phone, transfer your authenticator app before wiping the old one",
          "Authy and Bitwarden sync across devices, which reduces the risk of lockout",
          "Consider a hardware key as a backup 2FA method for your most important accounts",
        ],
      },
    ],
    takeaway: "The best 2FA is the one you will actually use. Start with an authenticator app on your email and password manager, then expand to other accounts.",
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
