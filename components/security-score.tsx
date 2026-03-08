"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AnswerOption = {
  label: string;
  points: number;
};

type Question = {
  id: string;
  category: string;
  question: string;
  description: string;
  options: AnswerOption[];
};

type CategoryScore = {
  category: string;
  earned: number;
  max: number;
  percent: number;
};

type Recommendation = {
  category: string;
  text: string;
  priority: "high" | "medium" | "low";
};

/* ------------------------------------------------------------------ */
/*  Questions                                                          */
/* ------------------------------------------------------------------ */

const QUESTIONS: Question[] = [
  {
    id: "pw_reuse",
    category: "Passwords",
    question: "Do you reuse the same password across multiple accounts?",
    description:
      "Password reuse is one of the top causes of account compromise. If one service is breached, attackers try that password everywhere.",
    options: [
      { label: "Yes, I use the same password for most accounts", points: 0 },
      { label: "I have a few passwords I rotate between", points: 3 },
      { label: "Each important account has a unique password", points: 7 },
      { label: "Every account has a unique, generated password", points: 10 },
    ],
  },
  {
    id: "pw_manager",
    category: "Passwords",
    question: "Do you use a password manager?",
    description:
      "Password managers generate and store strong, unique passwords so you only need to remember one master password.",
    options: [
      { label: "No, I memorize or write down passwords", points: 0 },
      { label: "I use my browser's built-in save feature", points: 4 },
      { label: "Yes, I use a dedicated password manager", points: 10 },
    ],
  },
  {
    id: "mfa",
    category: "Authentication",
    question: "What type of two-factor authentication (2FA) do you use?",
    description:
      "2FA adds a second layer of security beyond your password. Hardware keys are the strongest; SMS codes can be intercepted.",
    options: [
      { label: "I do not use 2FA on any accounts", points: 0 },
      { label: "SMS text message codes", points: 4 },
      { label: "Authenticator app (Google Authenticator, Authy, etc.)", points: 8 },
      { label: "Hardware security key (YubiKey, etc.)", points: 10 },
    ],
  },
  {
    id: "email_recovery",
    category: "Email Security",
    question: "Is your primary email's recovery options up to date?",
    description:
      "Your email is the master key to all your accounts. If someone takes over your email, they can reset passwords everywhere.",
    options: [
      { label: "I am not sure / have not checked", points: 0 },
      { label: "I set it up once but have not verified recently", points: 4 },
      { label: "Yes, recovery email and phone are current and secured", points: 10 },
    ],
  },
  {
    id: "device_lock",
    category: "Device Security",
    question: "Do your devices have lock screens and encryption enabled?",
    description:
      "An unlocked device is an open door. Full-disk encryption protects data even if the device is stolen.",
    options: [
      { label: "No lock screen or encryption", points: 0 },
      { label: "Lock screen only, no encryption", points: 3 },
      { label: "Lock screen with PIN/pattern", points: 5 },
      { label: "Biometric lock + full-disk encryption enabled", points: 10 },
    ],
  },
  {
    id: "updates",
    category: "Device Security",
    question: "How quickly do you install software and OS updates?",
    description:
      "Security updates patch known vulnerabilities. Delaying them leaves your devices exposed to attacks that are already well-understood.",
    options: [
      { label: "I ignore or delay updates indefinitely", points: 0 },
      { label: "I update eventually, maybe once a month", points: 4 },
      { label: "I install updates within a few days", points: 7 },
      { label: "Automatic updates are enabled everywhere", points: 10 },
    ],
  },
  {
    id: "public_wifi",
    category: "Network",
    question: "How do you handle public Wi-Fi networks?",
    description:
      "Public Wi-Fi can be monitored or spoofed. VPNs encrypt your traffic so eavesdroppers cannot read it.",
    options: [
      { label: "I connect freely and do everything including banking", points: 0 },
      { label: "I connect but avoid sensitive tasks", points: 4 },
      { label: "I use a VPN when on public Wi-Fi", points: 8 },
      { label: "I avoid public Wi-Fi or always use a VPN", points: 10 },
    ],
  },
  {
    id: "social_privacy",
    category: "Privacy",
    question: "Are your social media profiles set to private?",
    description:
      "Public profiles expose personal information that attackers use for social engineering, phishing, and password guessing.",
    options: [
      { label: "All my profiles are public", points: 0 },
      { label: "Some are public, some are private", points: 4 },
      { label: "All set to private / friends-only", points: 8 },
      { label: "Private profiles with minimal personal info shared", points: 10 },
    ],
  },
  {
    id: "backups",
    category: "Backups",
    question: "Do you regularly back up your important data?",
    description:
      "Backups protect against ransomware, hardware failure, and accidental deletion. The 3-2-1 rule: 3 copies, 2 media types, 1 offsite.",
    options: [
      { label: "I do not back up my data", points: 0 },
      { label: "I back up occasionally to one location", points: 3 },
      { label: "Regular backups to an external drive or cloud", points: 7 },
      { label: "Automated 3-2-1 backup strategy", points: 10 },
    ],
  },
  {
    id: "phishing",
    category: "Awareness",
    question: "How do you handle suspicious emails or messages?",
    description:
      "Phishing is the number one attack vector. Even sophisticated users can be tricked by well-crafted phishing emails.",
    options: [
      { label: "I click links without thinking much about it", points: 0 },
      { label: "I check if it looks suspicious before clicking", points: 3 },
      { label: "I verify the sender and hover over links before clicking", points: 7 },
      { label: "I never click email links; I navigate directly to the site", points: 10 },
    ],
  },
  {
    id: "browser_security",
    category: "Browser",
    question: "How is your browser security configured?",
    description:
      "Browsers are a primary attack surface. Extensions can be malicious, and saving passwords in the browser is less secure than a dedicated manager.",
    options: [
      { label: "Default settings, many extensions, passwords saved in browser", points: 0 },
      { label: "Some security extensions, passwords still in browser", points: 3 },
      { label: "Ad blocker + limited extensions, no saved passwords", points: 7 },
      { label: "Hardened browser with content blocker, no saved passwords, regular extension audit", points: 10 },
    ],
  },
  {
    id: "account_recovery",
    category: "Awareness",
    question: "If you lost access to your phone and email today, could you recover your accounts?",
    description:
      "Account recovery preparedness is often overlooked. Backup codes, recovery keys, and trusted contacts can save you in an emergency.",
    options: [
      { label: "I would probably lose access to most things", points: 0 },
      { label: "I could recover some accounts but not all", points: 3 },
      { label: "I have backup codes stored for important accounts", points: 7 },
      { label: "I have printed backup codes, recovery keys, and a documented recovery plan", points: 10 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
  0,
);

/* ------------------------------------------------------------------ */
/*  Recommendations engine                                             */
/* ------------------------------------------------------------------ */

function getRecommendations(answers: Record<string, number>): Recommendation[] {
  const recs: Recommendation[] = [];

  const pw_reuse = answers["pw_reuse"] ?? 0;
  const pw_manager = answers["pw_manager"] ?? 0;
  const mfa = answers["mfa"] ?? 0;
  const email_recovery = answers["email_recovery"] ?? 0;
  const device_lock = answers["device_lock"] ?? 0;
  const updates = answers["updates"] ?? 0;
  const public_wifi = answers["public_wifi"] ?? 0;
  const social_privacy = answers["social_privacy"] ?? 0;
  const backups = answers["backups"] ?? 0;
  const phishing = answers["phishing"] ?? 0;
  const browser_security = answers["browser_security"] ?? 0;
  const account_recovery = answers["account_recovery"] ?? 0;

  if (pw_reuse < 7) {
    recs.push({
      category: "Passwords",
      text: "Stop reusing passwords immediately. Use a password manager to generate unique passwords for every account.",
      priority: pw_reuse === 0 ? "high" : "medium",
    });
  }

  if (pw_manager < 10) {
    recs.push({
      category: "Passwords",
      text: "Adopt a dedicated password manager like Bitwarden, 1Password, or KeePass. Browser-saved passwords are less secure.",
      priority: pw_manager === 0 ? "high" : "medium",
    });
  }

  if (mfa < 8) {
    recs.push({
      category: "Authentication",
      text: "Enable authenticator-app-based 2FA on all critical accounts (email, banking, social media). SMS 2FA is better than nothing but can be bypassed via SIM swapping.",
      priority: mfa === 0 ? "high" : "medium",
    });
  }

  if (email_recovery < 10) {
    recs.push({
      category: "Email Security",
      text: "Review and update your email recovery options now. Ensure your recovery phone number and backup email are current and that you have backup codes saved offline.",
      priority: email_recovery === 0 ? "high" : "medium",
    });
  }

  if (device_lock < 10) {
    recs.push({
      category: "Device Security",
      text: "Enable full-disk encryption (FileVault on Mac, BitLocker on Windows, built-in on iOS/Android) and set a strong biometric or PIN lock on all devices.",
      priority: device_lock <= 3 ? "high" : "low",
    });
  }

  if (updates < 7) {
    recs.push({
      category: "Device Security",
      text: "Enable automatic updates for your operating system and applications. Unpatched software is one of the easiest ways attackers gain access.",
      priority: updates === 0 ? "high" : "medium",
    });
  }

  if (public_wifi < 8) {
    recs.push({
      category: "Network",
      text: "Use a reputable VPN service when connecting to public Wi-Fi. Avoid accessing sensitive accounts on untrusted networks.",
      priority: public_wifi === 0 ? "high" : "low",
    });
  }

  if (social_privacy < 8) {
    recs.push({
      category: "Privacy",
      text: "Set your social media accounts to private and audit the personal information visible on your profiles. Attackers use this data for targeted phishing.",
      priority: "medium",
    });
  }

  if (backups < 7) {
    recs.push({
      category: "Backups",
      text: "Implement a regular backup strategy. At minimum, use cloud backup for critical files. Ideally follow the 3-2-1 rule: 3 copies, 2 different media, 1 offsite.",
      priority: backups === 0 ? "high" : "medium",
    });
  }

  if (phishing < 7) {
    recs.push({
      category: "Awareness",
      text: "Never click links in emails. Navigate directly to websites by typing the URL. Verify sender addresses carefully - phishing emails often use lookalike domains.",
      priority: phishing <= 3 ? "high" : "medium",
    });
  }

  if (browser_security < 7) {
    recs.push({
      category: "Browser",
      text: "Install a content blocker (uBlock Origin), remove unnecessary extensions, and stop saving passwords in the browser. Regularly audit your installed extensions.",
      priority: browser_security === 0 ? "high" : "low",
    });
  }

  if (account_recovery < 7) {
    recs.push({
      category: "Awareness",
      text: "Generate and securely store backup codes for all important accounts. Print them and store in a safe or use an encrypted backup. Document your recovery process.",
      priority: account_recovery <= 3 ? "high" : "medium",
    });
  }

  return recs.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });
}

/* ------------------------------------------------------------------ */
/*  Score label + color helpers                                        */
/* ------------------------------------------------------------------ */

type ScoreGrade = "Critical" | "Poor" | "Fair" | "Good" | "Excellent";

function getGrade(percent: number): ScoreGrade {
  if (percent < 30) return "Critical";
  if (percent < 50) return "Poor";
  if (percent < 70) return "Fair";
  if (percent < 85) return "Good";
  return "Excellent";
}

function gradeColor(grade: ScoreGrade): string {
  switch (grade) {
    case "Critical":
      return "text-red-400";
    case "Poor":
      return "text-orange-400";
    case "Fair":
      return "text-yellow-400";
    case "Good":
      return "text-emerald-400";
    case "Excellent":
      return "text-green-400";
  }
}

function gradeBarColor(grade: ScoreGrade): string {
  switch (grade) {
    case "Critical":
      return "bg-red-500";
    case "Poor":
      return "bg-orange-500";
    case "Fair":
      return "bg-yellow-500";
    case "Good":
      return "bg-emerald-500";
    case "Excellent":
      return "bg-green-500";
  }
}

function categoryBarColor(percent: number): string {
  if (percent < 40) return "bg-red-500";
  if (percent < 60) return "bg-yellow-500";
  if (percent < 80) return "bg-emerald-500";
  return "bg-green-500";
}

function priorityColor(priority: "high" | "medium" | "low"): string {
  switch (priority) {
    case "high":
      return "border-red-500/20 bg-red-500/10 text-red-400";
    case "medium":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
    case "low":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  }
}

function priorityLabel(priority: "high" | "medium" | "low"): string {
  switch (priority) {
    case "high":
      return "High Priority";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
  }
}

/* ------------------------------------------------------------------ */
/*  Category score calculation                                         */
/* ------------------------------------------------------------------ */

function calculateCategoryScores(
  answers: Record<string, number>,
): CategoryScore[] {
  const categories: Record<string, { earned: number; max: number }> = {};

  for (const q of QUESTIONS) {
    if (!categories[q.category]) {
      categories[q.category] = { earned: 0, max: 0 };
    }
    const maxPoints = Math.max(...q.options.map((o) => o.points));
    categories[q.category].max += maxPoints;
    categories[q.category].earned += answers[q.id] ?? 0;
  }

  return Object.entries(categories).map(([category, { earned, max }]) => ({
    category,
    earned,
    max,
    percent: max > 0 ? Math.round((earned / max) * 100) : 0,
  }));
}

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, duration: number = 1500): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCurrent(0);
      return;
    }

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return current;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SecurityScore() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalQuestions = QUESTIONS.length;
  const progress = Math.round((currentQuestion / totalQuestions) * 100);

  const rawScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const scorePercent = Math.round((rawScore / MAX_SCORE) * 100);
  const animatedScore = useCountUp(completed ? scorePercent : 0);
  const grade = getGrade(scorePercent);
  const categoryScores = calculateCategoryScores(answers);
  const recommendations = getRecommendations(answers);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      setSelectedOption(optionIndex);

      // Brief delay for visual feedback before advancing
      setTimeout(() => {
        const q = QUESTIONS[currentQuestion];
        const points = q.options[optionIndex].points;

        setAnswers((prev) => ({ ...prev, [q.id]: points }));
        setSelectedOption(null);

        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setCompleted(true);
        }
      }, 300);
    },
    [currentQuestion, totalQuestions],
  );

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setCompleted(false);
    setSelectedOption(null);
  }, []);

  const shareableText = `I scored ${scorePercent}/100 on the FK94 Security Assessment! My grade: ${grade}. Check your own score at fk94security.com/tools`;

  /* ---- Quiz phase ---- */
  if (!completed) {
    const q = QUESTIONS[currentQuestion];

    return (
      <div className="mx-auto max-w-2xl">
        <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
          {/* Header */}
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Security Assessment
          </p>
          <h3 className="mt-3 text-2xl font-bold text-ink">
            How Secure Are You?
          </h3>
          <p className="mt-2 text-sm text-muted">
            Answer {totalQuestions} questions to get your personalized security
            score and recommendations.
          </p>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Category badge */}
          <div className="mt-6">
            <span className="inline-block rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {q.category}
            </span>
          </div>

          {/* Question */}
          <p className="mt-4 text-lg font-semibold text-ink">{q.question}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{q.description}</p>

          {/* Options */}
          <div className="mt-6 space-y-3">
            {q.options.map((option, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAnswer(i)}
                disabled={selectedOption !== null}
                className={cn(
                  "w-full rounded-xl border px-5 py-4 text-left text-sm leading-6 transition",
                  selectedOption === i
                    ? "border-accent bg-accent/20 text-ink"
                    : "border-line bg-surface text-muted hover:border-accent/30 hover:bg-card hover:text-ink",
                  selectedOption !== null && selectedOption !== i && "opacity-50",
                )}
              >
                <span className="mr-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-xs font-medium text-muted">
                  {String.fromCharCode(65 + i)}
                </span>
                {option.label}
              </button>
            ))}
          </div>

          {/* Navigation hint */}
          {currentQuestion > 0 && (
            <button
              type="button"
              onClick={() => {
                setCurrentQuestion((prev) => prev - 1);
                setSelectedOption(null);
              }}
              className="mt-4 text-xs text-muted hover:text-accent transition"
            >
              &larr; Back to previous question
            </button>
          )}
        </section>
      </div>
    );
  }

  /* ---- Results phase ---- */
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* ---- Left panel: score + breakdown ---- */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Your Score
        </p>

        {/* Animated score */}
        <div className="mt-6 flex flex-col items-center py-8">
          <div className="relative flex h-40 w-40 items-center justify-center">
            {/* Ring background */}
            <svg className="absolute inset-0" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-line"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={
                  2 * Math.PI * 70 * (1 - animatedScore / 100)
                }
                className={cn(
                  "transition-all duration-300",
                  gradeColor(grade),
                )}
                transform="rotate(-90 80 80)"
              />
            </svg>
            <div className="text-center">
              <p
                className={cn(
                  "text-5xl font-bold tabular-nums",
                  gradeColor(grade),
                )}
              >
                {animatedScore}
              </p>
              <p className="text-xs text-muted">/100</p>
            </div>
          </div>

          <p
            className={cn("mt-4 text-xl font-bold", gradeColor(grade))}
          >
            {grade}
          </p>

          {/* Score bar */}
          <div className="mt-4 w-full max-w-xs">
            <div className="h-3 w-full overflow-hidden rounded-full bg-line">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  gradeBarColor(grade),
                )}
                style={{ width: `${animatedScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="mt-4 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Score by Category
          </p>
          {categoryScores.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink">{cat.category}</span>
                <span className="font-mono text-muted">
                  {cat.earned}/{cat.max}
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-line">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    categoryBarColor(cat.percent),
                  )}
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Share + restart */}
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(shareableText);
              }
            }}
            className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-muted transition hover:border-accent/30 hover:text-ink"
          >
            Copy Score to Share
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-muted transition hover:border-accent/30 hover:text-ink"
          >
            Retake
          </button>
        </div>
      </section>

      {/* ---- Right panel: recommendations ---- */}
      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Recommendations
        </p>
        <p className="mt-3 text-sm leading-7 text-muted">
          Based on your answers, here are personalized steps to improve your
          security posture. High-priority items should be addressed first.
        </p>

        {recommendations.length === 0 ? (
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm leading-7 text-emerald-400">
            Outstanding! You scored in the top tier. Keep maintaining your
            security practices and stay vigilant about new threats.
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="rounded-xl border border-line bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-muted">
                    {rec.category}
                  </p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      priorityColor(rec.priority),
                    )}
                  >
                    {priorityLabel(rec.priority)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink">{rec.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA for low scores */}
        {scorePercent < 70 && (
          <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-5">
            <p className="font-semibold text-accent">
              Your score suggests significant exposure
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              A score of {scorePercent}/100 means there are critical gaps in
              your security. Consider a professional security audit to identify
              and close vulnerabilities before they are exploited.
            </p>
            <p className="mt-3 text-sm font-medium text-accent">
              Get a 1-on-1 security consultation &rarr;
            </p>
          </div>
        )}

        {/* Privacy note */}
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3">
          <ShieldIcon className="mt-0.5 shrink-0 text-accent" />
          <p className="text-xs leading-5 text-muted">
            This assessment runs entirely in your browser. No answers or scores
            are collected or transmitted.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function ShieldIcon({ className }: { className?: string }) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
