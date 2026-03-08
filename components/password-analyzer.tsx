"use client";

import { useState, useMemo } from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Common password / pattern data                                     */
/* ------------------------------------------------------------------ */

const COMMON_PASSWORDS = [
  "password", "123456", "12345678", "qwerty", "abc123", "monkey", "master",
  "dragon", "111111", "baseball", "iloveyou", "trustno1", "sunshine",
  "princess", "football", "shadow", "superman", "michael", "letmein",
  "654321", "charlie", "access", "hello", "admin", "welcome", "login",
  "passw0rd", "starwars", "solo", "whatever", "qazwsx", "ninja",
  "mustang", "passwd", "121212", "password1", "password123", "1q2w3e4r",
  "1234567890", "000000", "azerty", "654321", "lovely", "7777777",
  "888888", "123123", "zaq1zaq1", "computer", "cookie", "555555",
];

const COMMON_WORDS = [
  "password", "love", "hello", "dragon", "master", "monkey", "shadow",
  "sunshine", "princess", "football", "baseball", "soccer", "hockey",
  "batman", "superman", "trustno", "welcome", "letmein", "access",
  "admin", "login", "flower", "summer", "winter", "spring", "autumn",
  "orange", "banana", "purple", "secret", "freedom", "whatever",
  "ninja", "mustang", "cookie", "cheese", "chicken", "pepper",
  "ginger", "hunter", "killer", "angel", "charlie", "george",
  "robert", "thomas", "jordan", "andrew", "daniel", "michael",
  "jessica", "ashley", "jennifer", "amanda", "nicole", "stephanie",
];

const KEYBOARD_WALKS = [
  "qwerty", "qwertz", "qwert", "asdfgh", "asdf", "zxcvbn", "zxcvb",
  "1qaz2wsx", "qazwsx", "1q2w3e", "1q2w3e4r", "qweasd", "asdqwe",
  "zaqwsx", "1234qwer", "qweasdzxc", "poiuyt", "lkjhgf", "mnbvcx",
];

const LEET_MAP: Record<string, string> = {
  "@": "a", "4": "a", "8": "b", "(": "c", "3": "e", "6": "g",
  "#": "h", "!": "i", "1": "i", "|": "l", "0": "o", "$": "s",
  "5": "s", "7": "t", "+": "t", "%": "x", "2": "z",
};

/* ------------------------------------------------------------------ */
/*  Analysis types                                                     */
/* ------------------------------------------------------------------ */

type StrengthLevel = "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong";

type Finding = {
  label: string;
  type: "penalty" | "positive";
};

type Analysis = {
  score: number;
  level: StrengthLevel;
  entropy: number;
  crackTime: string;
  findings: Finding[];
  tips: string[];
};

/* ------------------------------------------------------------------ */
/*  Detection helpers                                                  */
/* ------------------------------------------------------------------ */

function unleet(input: string): string {
  return input
    .split("")
    .map((ch) => LEET_MAP[ch] ?? ch)
    .join("");
}

function hasSequentialChars(password: string, length: number): boolean {
  const lower = password.toLowerCase();
  for (let i = 0; i <= lower.length - length; i++) {
    let sequential = true;
    for (let j = 1; j < length; j++) {
      if (lower.charCodeAt(i + j) !== lower.charCodeAt(i + j - 1) + 1) {
        sequential = false;
        break;
      }
    }
    if (sequential) return true;
  }
  return false;
}

function hasRepeatedChars(password: string, length: number): boolean {
  for (let i = 0; i <= password.length - length; i++) {
    const ch = password[i];
    let repeated = true;
    for (let j = 1; j < length; j++) {
      if (password[i + j] !== ch) {
        repeated = false;
        break;
      }
    }
    if (repeated) return true;
  }
  return false;
}

function containsDatePattern(password: string): boolean {
  // Year patterns: 19xx, 20xx
  if (/(?:19|20)\d{2}/.test(password)) return true;
  // MM/DD or DD/MM patterns
  if (/\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4}/.test(password)) return true;
  // MMDD or DDMM patterns (4 digits that look like dates)
  if (/(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])/.test(password)) return true;
  return false;
}

function containsKeyboardWalk(password: string): boolean {
  const lower = password.toLowerCase();
  return KEYBOARD_WALKS.some((walk) => lower.includes(walk));
}

function containsCommonWord(password: string): boolean {
  const lower = password.toLowerCase();
  const deleeted = unleet(lower);
  return COMMON_WORDS.some(
    (word) =>
      word.length >= 4 && (lower.includes(word) || deleeted.includes(word)),
  );
}

function isCommonPassword(password: string): boolean {
  const lower = password.toLowerCase();
  const deleeted = unleet(lower);
  return COMMON_PASSWORDS.some(
    (common) => lower === common || deleeted === common,
  );
}

/* ------------------------------------------------------------------ */
/*  Entropy + crack time                                               */
/* ------------------------------------------------------------------ */

function calculateEntropy(password: string): number {
  if (password.length === 0) return 0;

  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 33;

  if (charsetSize === 0) charsetSize = 26;
  return Math.log2(Math.pow(charsetSize, password.length));
}

function formatCrackTime(entropy: number): string {
  if (entropy === 0) return "-";

  // 10 billion guesses per second (modern offline attack with GPU cluster)
  const guessesPerSecond = 10_000_000_000;
  const totalGuesses = Math.pow(2, entropy);
  const seconds = totalGuesses / guessesPerSecond;

  if (seconds < 0.001) return "Instant";
  if (seconds < 1) return "Less than a second";
  if (seconds < 60) return `${Math.round(seconds)} second${Math.round(seconds) !== 1 ? "s" : ""}`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} minute${Math.round(minutes) !== 1 ? "s" : ""}`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} hour${Math.round(hours) !== 1 ? "s" : ""}`;
  const days = hours / 24;
  if (days < 365) return `${Math.round(days)} day${Math.round(days) !== 1 ? "s" : ""}`;
  const years = days / 365;
  if (years < 1000) return `${Math.round(years)} year${Math.round(years) !== 1 ? "s" : ""}`;
  if (years < 1_000_000) return `${Math.round(years / 1000)}k years`;
  if (years < 1_000_000_000) return `${Math.round(years / 1_000_000)} million years`;
  if (years < 1_000_000_000_000) return `${Math.round(years / 1_000_000_000)} billion years`;
  return `${Math.round(years / 1_000_000_000_000)} trillion+ years`;
}

/* ------------------------------------------------------------------ */
/*  Main analysis                                                      */
/* ------------------------------------------------------------------ */

function analyzePassword(password: string): Analysis {
  if (password.length === 0) {
    return {
      score: 0,
      level: "Very Weak",
      entropy: 0,
      crackTime: "-",
      findings: [],
      tips: ["Type a password above to see the analysis."],
    };
  }

  const findings: Finding[] = [];
  const tips: string[] = [];

  /* --- Length scoring --- */
  let lengthScore: number;
  if (password.length < 8) {
    lengthScore = 0;
    findings.push({ label: `Too short (${password.length} characters)`, type: "penalty" });
    tips.push("Use at least 12 characters. Longer passwords are exponentially harder to crack.");
  } else if (password.length < 12) {
    lengthScore = 1;
    findings.push({ label: `Short (${password.length} characters)`, type: "penalty" });
    tips.push("Aim for 14+ characters. Each extra character dramatically increases crack time.");
  } else if (password.length < 16) {
    lengthScore = 2;
    findings.push({ label: `Decent length (${password.length} characters)`, type: "positive" });
  } else if (password.length < 20) {
    lengthScore = 3;
    findings.push({ label: `Good length (${password.length} characters)`, type: "positive" });
  } else {
    lengthScore = 4;
    findings.push({ label: `Excellent length (${password.length} characters)`, type: "positive" });
  }

  /* --- Character variety scoring --- */
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  let varietyScore = 0;
  if (hasLower && hasUpper) {
    varietyScore += 1;
    findings.push({ label: "Mixed case letters", type: "positive" });
  } else if (hasLower || hasUpper) {
    findings.push({ label: "Single case only", type: "penalty" });
    tips.push("Mix uppercase and lowercase letters.");
  }
  if (hasDigits) {
    varietyScore += 1;
    findings.push({ label: "Contains numbers", type: "positive" });
  } else {
    tips.push("Add numbers to increase character set size.");
  }
  if (hasSymbols) {
    varietyScore += 1;
    findings.push({ label: "Contains special characters", type: "positive" });
  } else {
    findings.push({ label: "No special characters", type: "penalty" });
    tips.push("Add symbols like !@#$%^&* to expand the character set.");
  }

  /* --- Pattern penalties --- */
  let patternPenalty = 0;

  if (isCommonPassword(password)) {
    patternPenalty += 2;
    findings.push({ label: "Matches a commonly used password", type: "penalty" });
    tips.push("Avoid passwords from common breach lists. Attackers try these first.");
  }

  if (containsCommonWord(password)) {
    patternPenalty += 2;
    findings.push({ label: "Contains a common dictionary word", type: "penalty" });
    tips.push("Avoid recognizable words, or combine multiple unrelated words into a passphrase.");
  }

  if (hasSequentialChars(password, 4)) {
    patternPenalty += 1;
    findings.push({ label: "Contains sequential characters (e.g. abcd, 1234)", type: "penalty" });
    tips.push("Avoid sequential letters or numbers. They are among the first patterns attackers try.");
  }

  if (containsKeyboardWalk(password)) {
    patternPenalty += 1;
    findings.push({ label: "Contains a keyboard walk pattern (e.g. qwerty)", type: "penalty" });
    tips.push("Keyboard walks like 'qwerty' or 'asdf' are well-known and easy to guess.");
  }

  if (containsDatePattern(password)) {
    patternPenalty += 1;
    findings.push({ label: "Contains a date pattern", type: "penalty" });
    tips.push("Dates (birthdays, years) are easy to guess from public information.");
  }

  if (hasRepeatedChars(password, 3)) {
    patternPenalty += 1;
    findings.push({ label: "Contains repeated characters (e.g. aaa, 111)", type: "penalty" });
    tips.push("Avoid repeating the same character. It adds length without adding real entropy.");
  }

  /* --- Final score --- */
  const rawScore = lengthScore + varietyScore - patternPenalty;
  const score = Math.max(0, Math.min(7, rawScore));

  let level: StrengthLevel;
  if (score <= 1) level = "Very Weak";
  else if (score <= 2) level = "Weak";
  else if (score <= 3) level = "Fair";
  else if (score <= 5) level = "Strong";
  else level = "Very Strong";

  const entropy = calculateEntropy(password);
  const crackTime = formatCrackTime(entropy);

  /* --- Passphrase tip --- */
  if (tips.length > 0 && password.length < 16) {
    tips.push(
      "Consider a passphrase: four or more unrelated words like \"correct horse battery staple\" are long and easy to remember.",
    );
  }

  if (tips.length === 0) {
    tips.push("This password looks strong. Use a password manager so you never reuse it.");
  }

  return { score, level, entropy, crackTime, findings, tips };
}

/* ------------------------------------------------------------------ */
/*  Strength bar colors                                                */
/* ------------------------------------------------------------------ */

function strengthColor(level: StrengthLevel): string {
  switch (level) {
    case "Very Weak":
      return "bg-red-500";
    case "Weak":
      return "bg-orange-500";
    case "Fair":
      return "bg-yellow-500";
    case "Strong":
      return "bg-emerald-500";
    case "Very Strong":
      return "bg-green-500";
  }
}

function strengthTextColor(level: StrengthLevel): string {
  switch (level) {
    case "Very Weak":
      return "text-red-400";
    case "Weak":
      return "text-orange-400";
    case "Fair":
      return "text-yellow-400";
    case "Strong":
      return "text-emerald-400";
    case "Very Strong":
      return "text-green-400";
  }
}

function strengthPercent(score: number): number {
  return Math.round((score / 7) * 100);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const analysis = useMemo(() => analyzePassword(password), [password]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      {/* ---- Left panel: input + findings ---- */}
      <section className="panel rounded-[2rem] border border-line p-6 sm:p-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-brand">
          Analyzer
        </p>
        <h3 className="mt-3 font-display text-2xl text-ink">
          Password Strength Analyzer
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Type or paste a password below. Every check runs locally in your
          browser — nothing is sent over the network.
        </p>

        {/* Password input */}
        <div className="relative mt-8">
          <input
            type={visible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password to analyze..."
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-[1.4rem] border border-line bg-white/75 px-5 py-4 pr-14 font-mono text-sm text-ink placeholder:text-muted/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition hover:text-ink"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {/* Privacy notice */}
        <div className="mt-4 flex items-start gap-2 rounded-[1rem] border border-brand/20 bg-signal/30 px-4 py-3">
          <LockIcon className="mt-0.5 shrink-0 text-brand" />
          <p className="text-xs leading-5 text-ink/70">
            Your password never leaves your browser. All analysis runs
            client-side with pure JavaScript — no external APIs, no network
            requests, no logging.
          </p>
        </div>

        {/* Findings */}
        {password.length > 0 && (
          <div className="mt-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Findings
            </p>
            <div className="mt-3 space-y-2">
              {analysis.findings.map((finding, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-2.5 rounded-[1.2rem] border px-4 py-3 text-sm leading-6",
                    finding.type === "penalty"
                      ? "border-red-200 bg-red-50 text-red-800"
                      : "border-emerald-200 bg-emerald-50 text-emerald-800",
                  )}
                >
                  <span className="mt-0.5 shrink-0 text-xs">
                    {finding.type === "penalty" ? "\u2715" : "\u2713"}
                  </span>
                  {finding.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ---- Right panel: results ---- */}
      <section className="dark-panel rounded-[2rem] border border-black/10 p-6 sm:p-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-signal">
          Result
        </p>

        {/* Strength label + bar */}
        <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-sand/54">
            Strength
          </p>
          <p
            className={cn(
              "mt-3 font-display text-4xl",
              password.length > 0
                ? strengthTextColor(analysis.level)
                : "text-sand/30",
            )}
          >
            {password.length > 0 ? analysis.level : "Waiting..."}
          </p>

          {/* Visual bar */}
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                password.length > 0 ? strengthColor(analysis.level) : "bg-white/5",
              )}
              style={{ width: `${password.length > 0 ? strengthPercent(analysis.score) : 0}%` }}
            />
          </div>
        </div>

        {/* Metrics row */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-sand/54">
              Entropy
            </p>
            <p className="mt-2 font-mono text-lg text-sand">
              {password.length > 0
                ? `${Math.round(analysis.entropy)} bits`
                : "-"}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-sand/54">
              Est. crack time
            </p>
            <p className="mt-2 font-mono text-lg text-sand">
              {analysis.crackTime}
            </p>
            <p className="mt-1 text-[10px] leading-4 text-sand/40">
              Offline attack, 10B guesses/s
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-sand/54">
            Tips to improve
          </p>
          {analysis.tips.map((tip, i) => (
            <div
              key={i}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-sand/76"
            >
              {tip}
            </div>
          ))}
        </div>

        {/* Reminder */}
        <div className="mt-6 rounded-[1.6rem] border border-signal/30 bg-signal/10 p-5 text-sm leading-7 text-sand">
          Use a password manager to generate and store unique passwords for
          every account. No human can reliably remember dozens of strong,
          unique passwords.
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons (small, no external dep)                          */
/* ------------------------------------------------------------------ */

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
