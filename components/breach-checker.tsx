"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Breach = {
  name: string;
  date: string;
  exposedData: string[];
  description: string;
  recordCount: number;
};

type BreachResult = {
  email: string;
  breachCount: number;
  breaches: Breach[];
  isDemo: boolean;
};

/* ------------------------------------------------------------------ */
/*  Mock data (used when API is unavailable)                           */
/* ------------------------------------------------------------------ */

const MOCK_BREACHES: Breach[] = [
  {
    name: "LinkedIn",
    date: "2012-05-05",
    exposedData: ["Email addresses", "Passwords"],
    description:
      "In May 2012, LinkedIn suffered a massive breach exposing 164 million email addresses and passwords stored as SHA1 hashes without salt.",
    recordCount: 164_611_595,
  },
  {
    name: "Adobe",
    date: "2013-10-04",
    exposedData: ["Email addresses", "Passwords", "Password hints", "Usernames"],
    description:
      "In October 2013, 153 million Adobe accounts were breached. The passwords were encrypted rather than hashed, and the password hints were stored in plain text.",
    recordCount: 152_445_165,
  },
  {
    name: "Canva",
    date: "2019-05-24",
    exposedData: ["Email addresses", "Names", "Passwords", "Usernames"],
    description:
      "In May 2019, the graphic design tool Canva suffered a data breach affecting 137 million users. Exposed data included email addresses, usernames, names, and bcrypt-hashed passwords.",
    recordCount: 137_272_116,
  },
  {
    name: "Facebook",
    date: "2019-09-28",
    exposedData: ["Phone numbers", "Email addresses", "Names", "Dates of birth", "Locations"],
    description:
      "In September 2019, over 533 million Facebook users had their personal data scraped and leaked, including phone numbers, full names, locations, and email addresses.",
    recordCount: 509_458_528,
  },
  {
    name: "Dropbox",
    date: "2012-07-01",
    exposedData: ["Email addresses", "Passwords"],
    description:
      "In mid-2012, Dropbox suffered a data breach which exposed 68 million unique email addresses and bcrypt hashes of passwords.",
    recordCount: 68_648_009,
  },
];

function getMockResult(email: string): BreachResult {
  // Deterministically pick 2-5 breaches based on email string
  const hash = email.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const count = 2 + (hash % 4); // 2 to 5
  const breaches = MOCK_BREACHES.slice(0, count);
  return { email, breachCount: count, breaches, isDemo: true };
}

/* ------------------------------------------------------------------ */
/*  Severity helpers                                                   */
/* ------------------------------------------------------------------ */

type Severity = "critical" | "warning" | "safe";

function getSeverity(breachCount: number): Severity {
  if (breachCount === 0) return "safe";
  if (breachCount <= 2) return "warning";
  return "critical";
}

function severityLabel(severity: Severity): string {
  switch (severity) {
    case "critical":
      return "High Risk";
    case "warning":
      return "Moderate Risk";
    case "safe":
      return "No Breaches Found";
  }
}

function severityColor(severity: Severity): string {
  switch (severity) {
    case "critical":
      return "text-red-400";
    case "warning":
      return "text-yellow-400";
    case "safe":
      return "text-emerald-400";
  }
}

function severityBorder(severity: Severity): string {
  switch (severity) {
    case "critical":
      return "border-red-500/30";
    case "warning":
      return "border-yellow-500/30";
    case "safe":
      return "border-emerald-500/30";
  }
}

function severityBg(severity: Severity): string {
  switch (severity) {
    case "critical":
      return "bg-red-500/10";
    case "warning":
      return "bg-yellow-500/10";
    case "safe":
      return "bg-emerald-500/10";
  }
}

/* ------------------------------------------------------------------ */
/*  Email validation                                                   */
/* ------------------------------------------------------------------ */

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ------------------------------------------------------------------ */
/*  Format helpers                                                     */
/* ------------------------------------------------------------------ */

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

/* ------------------------------------------------------------------ */
/*  Tips                                                               */
/* ------------------------------------------------------------------ */

const BREACH_TIPS = [
  "Change your password immediately on any breached service, and any other account where you reused that password.",
  "Enable two-factor authentication (2FA) on every account that supports it, preferring authenticator apps over SMS.",
  "Use a password manager to generate and store unique, strong passwords for each account.",
  "Check your email for suspicious activity, unauthorized logins, or password reset requests you did not initiate.",
  "Consider using email aliases or a dedicated email for high-value accounts (banking, primary email, etc.).",
  "Monitor your credit reports for unauthorized accounts if personal data like SSN or financial info was exposed.",
  "Be extra cautious of phishing emails that reference the breached service - attackers often use breach data for targeted phishing.",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function BreachChecker() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<BreachResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);

  const handleCheck = useCallback(async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setChecked(false);

    try {
      const res = await fetch("/api/breach-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("API error");

      const data = (await res.json()) as BreachResult;
      setResult({ ...data, isDemo: false });
    } catch {
      // API unavailable - fall back to demo mode
      setResult(getMockResult(email));
    } finally {
      setLoading(false);
      setChecked(true);
    }
  }, [email]);

  const severity = result ? getSeverity(result.breachCount) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* ---- Left panel: input + tips ---- */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Breach Checker
        </p>
        <h3 className="mt-3 text-2xl font-bold text-ink">
          Have You Been Breached?
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Enter your email address to check if it has appeared in any known data
          breaches. We query publicly available breach databases to find
          exposures linked to your email.
        </p>

        {/* Email input */}
        <div className="mt-8">
          <label htmlFor="breach-email" className="sr-only">
            Email address
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="breach-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCheck();
                }}
                placeholder="your@email.com"
                autoComplete="email"
                spellCheck={false}
                className="w-full rounded-xl border border-line bg-background py-4 pl-11 pr-4 text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <button
              type="button"
              onClick={handleCheck}
              disabled={loading || !email.trim()}
              className={cn(
                "shrink-0 rounded-xl px-6 py-4 text-sm font-semibold transition",
                loading || !email.trim()
                  ? "cursor-not-allowed border border-line bg-card text-muted"
                  : "bg-accent text-background hover:bg-accent-strong",
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon />
                  Checking...
                </span>
              ) : (
                "Check"
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>

        {/* Privacy notice */}
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3">
          <ShieldIcon className="mt-0.5 shrink-0 text-accent" />
          <p className="text-xs leading-5 text-muted">
            We do not store or log the email addresses you check. Your email is
            sent to the breach-check API and discarded immediately after
            returning results.
          </p>
        </div>

        {/* Tips section (always visible) */}
        <div className="mt-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            What to do if you are in a breach
          </p>
          {BREACH_TIPS.slice(0, checked && result && result.breachCount > 0 ? 7 : 4).map(
            (tip, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-muted"
              >
                <span className="mt-0.5 shrink-0 text-accent">{i + 1}.</span>
                {tip}
              </div>
            ),
          )}
        </div>
      </section>

      {/* ---- Right panel: results ---- */}
      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Results
        </p>

        {!checked && !loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <SearchIcon className="mb-4 text-muted/30" />
            <p className="text-lg font-medium text-muted/50">
              Enter an email and press Check
            </p>
            <p className="mt-2 text-sm text-muted/30">
              Results will appear here
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <SpinnerIconLarge />
            <p className="mt-4 text-sm text-muted">
              Scanning breach databases...
            </p>
          </div>
        )}

        {checked && result && (
          <div className="mt-5 space-y-4">
            {/* Demo mode badge */}
            {result.isDemo && (
              <div className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-2">
                <span className="text-xs text-yellow-400">
                  Demo mode — showing sample data. Connect the HIBP API for real results.
                </span>
              </div>
            )}

            {/* Summary card */}
            <div
              className={cn(
                "rounded-xl border p-5",
                severity ? severityBorder(severity) : "border-line",
                severity ? severityBg(severity) : "bg-card",
              )}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Status
              </p>
              <p
                className={cn(
                  "mt-3 text-3xl font-bold",
                  severity ? severityColor(severity) : "text-muted",
                )}
              >
                {severity ? severityLabel(severity) : "Unknown"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {result.breachCount === 0
                  ? "This email was not found in any known breach databases."
                  : `This email appeared in ${result.breachCount} known breach${result.breachCount !== 1 ? "es" : ""}.`}
              </p>
            </div>

            {/* Metrics row */}
            {result.breachCount > 0 && (
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line bg-card p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Breaches
                  </p>
                  <p className="mt-2 font-mono text-2xl text-ink">
                    {result.breachCount}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-card p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Records exposed
                  </p>
                  <p className="mt-2 font-mono text-2xl text-ink">
                    {formatNumber(
                      result.breaches.reduce((sum, b) => sum + b.recordCount, 0),
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Individual breaches */}
            {result.breaches.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Breach details
                </p>
                {result.breaches.map((breach, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-line bg-card p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-ink">
                          {breach.name}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {formatDate(breach.date)} &middot;{" "}
                          {formatNumber(breach.recordCount)} records
                        </p>
                      </div>
                      <BreachIcon />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {breach.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {breach.exposedData.map((d, j) => (
                        <span
                          key={j}
                          className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-400"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Safe result */}
            {result.breachCount === 0 && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm leading-7 text-emerald-400">
                Great news! Your email was not found in any known data breaches.
                Stay safe by using unique passwords and enabling two-factor
                authentication on all your accounts.
              </div>
            )}

            {/* CTA */}
            {result.breachCount > 2 && (
              <div className="rounded-xl border border-accent/30 bg-accent/10 p-5 text-sm leading-7 text-ink">
                <p className="font-semibold text-accent">
                  Need help securing your accounts?
                </p>
                <p className="mt-2 text-muted">
                  With {result.breachCount} breaches, your accounts may be at
                  serious risk. Consider a professional security audit to
                  identify exposed credentials and lock down your digital
                  presence.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BreachIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-red-400"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function SpinnerIconLarge() {
  return (
    <svg
      className="h-10 w-10 animate-spin text-accent"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
