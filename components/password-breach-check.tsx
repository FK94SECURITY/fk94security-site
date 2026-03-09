"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CheckResult = {
  found: boolean;
  count: number;
  hashPrefix: string;
  fullHash: string;
};

type StrengthResult = {
  score: number; // 0-4
  label: string;
  issues: string[];
};

/* ------------------------------------------------------------------ */
/*  SHA-1 hashing via Web Crypto API (client-side only)                */
/* ------------------------------------------------------------------ */

async function sha1Hash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  HIBP Passwords API (k-anonymity, free, no API key)                 */
/* ------------------------------------------------------------------ */

async function checkPasswordBreach(password: string): Promise<CheckResult> {
  const hash = await sha1Hash(password);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
    headers: { "Add-Padding": "true" },
  });

  if (!response.ok) {
    throw new Error(`HIBP API returned ${response.status}`);
  }

  const text = await response.text();
  const lines = text.split("\n");

  for (const line of lines) {
    const [hashSuffix, countStr] = line.split(":");
    if (hashSuffix.trim() === suffix) {
      const count = parseInt(countStr.trim(), 10);
      if (count > 0) {
        return { found: true, count, hashPrefix: prefix, fullHash: hash };
      }
    }
  }

  return { found: false, count: 0, hashPrefix: prefix, fullHash: hash };
}

/* ------------------------------------------------------------------ */
/*  Password strength checker                                          */
/* ------------------------------------------------------------------ */

function checkStrength(password: string): StrengthResult {
  const issues: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else issues.push("Use at least 8 characters");

  if (password.length >= 12) score++;
  else if (password.length >= 8) issues.push("Consider using 12+ characters for better security");

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  else issues.push("Mix uppercase and lowercase letters");

  if (/\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) score++;
  else {
    if (!/\d/.test(password)) issues.push("Add numbers");
    if (!/[^a-zA-Z0-9]/.test(password)) issues.push("Add special characters (!@#$%...)");
  }

  const commonPatterns = [
    /^(password|123456|qwerty|letmein|admin|welcome|monkey|dragon|master|login)/i,
    /^(.)\1{3,}$/,
    /^(abc|xyz|123|qwe)/i,
  ];

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      score = Math.max(0, score - 1);
      issues.push("Avoid common patterns and dictionary words");
      break;
    }
  }

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  return { score, label: labels[score], issues };
}

function strengthColor(score: number): string {
  const colors = ["text-red-400", "text-red-400", "text-yellow-400", "text-emerald-400", "text-emerald-400"];
  return colors[score];
}

function strengthBarColor(score: number): string {
  const colors = ["bg-red-500", "bg-red-500", "bg-yellow-500", "bg-emerald-500", "bg-emerald-500"];
  return colors[score];
}

/* ------------------------------------------------------------------ */
/*  Recommendations                                                    */
/* ------------------------------------------------------------------ */

const BREACH_RECOMMENDATIONS = [
  "Stop using this password immediately on all accounts.",
  "Use a password manager (Bitwarden, 1Password) to generate unique passwords.",
  "Enable two-factor authentication on every account that supports it.",
  "Never reuse passwords across different services.",
  "Check if accounts using this password have been compromised.",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PasswordBreachCheck() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [strength, setStrength] = useState<StrengthResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const [showFlow, setShowFlow] = useState(false);

  const handleCheck = useCallback(async () => {
    if (!password.trim()) {
      setError("Please enter a password to check.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setChecked(false);

    try {
      const strengthResult = checkStrength(password);
      setStrength(strengthResult);

      const breachResult = await checkPasswordBreach(password);
      setResult(breachResult);
    } catch {
      setError("Could not reach the breach database. Please try again.");
    } finally {
      setLoading(false);
      setChecked(true);
    }
  }, [password]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* ---- Left panel: input + privacy info ---- */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Password Checker
        </p>
        <h3 className="mt-3 text-2xl font-bold text-ink">
          Has Your Password Been Leaked?
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Check if your password has appeared in any known data breach. We use the
          HaveIBeenPwned Passwords API with k-anonymity &mdash; your password never
          leaves your browser.
        </p>

        {/* Password input */}
        <div className="mt-8">
          <label htmlFor="pw-check-input" className="sr-only">
            Password
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="pw-check-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCheck();
                }}
                placeholder="Enter a password to check"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-xl border border-line bg-background py-4 pl-11 pr-12 text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <button
              type="button"
              onClick={handleCheck}
              disabled={loading || !password.trim()}
              className={cn(
                "shrink-0 rounded-xl px-6 py-4 text-sm font-semibold transition",
                loading || !password.trim()
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
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        {/* Privacy notice */}
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3">
          <ShieldIcon className="mt-0.5 shrink-0 text-accent" />
          <p className="text-xs leading-5 text-muted">
            Your password never leaves your browser. We SHA-1 hash it locally and
            only send the first 5 characters of the hash to the API. This
            &quot;k-anonymity&quot; model makes it impossible for anyone &mdash;
            including the API &mdash; to determine your actual password.
          </p>
        </div>

        {/* Technical flow toggle */}
        <button
          type="button"
          onClick={() => setShowFlow(!showFlow)}
          className="mt-4 flex items-center gap-2 text-xs font-medium text-accent hover:text-accent-strong transition"
        >
          <ChevronIcon open={showFlow} />
          How it works (technical details)
        </button>

        {showFlow && (
          <div className="mt-3 space-y-2">
            {[
              { step: "1", label: "Hash", desc: "Your password is SHA-1 hashed entirely in your browser." },
              { step: "2", label: "Split", desc: "The hash is split: first 5 characters (prefix) and the rest (suffix)." },
              { step: "3", label: "API Call", desc: "Only the 5-character prefix is sent to api.pwnedpasswords.com." },
              { step: "4", label: "Response", desc: "The API returns ~500 hash suffixes that share that prefix." },
              { step: "5", label: "Match", desc: "We check if your full hash suffix appears in the response, locally." },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.label}</p>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
            {result && (
              <div className="rounded-xl border border-line bg-surface px-4 py-3 font-mono text-xs text-muted">
                <p>
                  Hash: <span className="text-accent">{result.hashPrefix}</span>
                  <span className="text-muted/50">{result.fullHash.substring(5)}</span>
                </p>
                <p className="mt-1">
                  Sent to API: <span className="text-accent">{result.hashPrefix}</span>
                  <span className="text-muted/50"> (only these 5 chars)</span>
                </p>
              </div>
            )}
          </div>
        )}
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
              Enter a password and press Check
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
              Hashing and checking breach database...
            </p>
          </div>
        )}

        {checked && result && (
          <div className="mt-5 space-y-4">
            {/* Breach result card */}
            <div
              className={cn(
                "rounded-xl border p-5",
                result.found
                  ? "border-red-500/30 bg-red-500/10"
                  : "border-emerald-500/30 bg-emerald-500/10",
              )}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Breach Status
              </p>
              <p
                className={cn(
                  "mt-3 text-3xl font-bold",
                  result.found ? "text-red-400" : "text-emerald-400",
                )}
              >
                {result.found ? "Password Compromised" : "Not Found in Breaches"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {result.found
                  ? `This password has appeared in ${result.count.toLocaleString()} data breach${result.count !== 1 ? "es" : ""}. It should never be used.`
                  : "This password was not found in any known breach database."}
              </p>
            </div>

            {/* Breach count metric */}
            {result.found && (
              <div className="rounded-xl border border-line bg-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Times Seen in Breaches
                </p>
                <p className="mt-2 font-mono text-2xl text-red-400">
                  {result.count.toLocaleString()}
                </p>
              </div>
            )}

            {/* Password strength */}
            {strength && (
              <div className="rounded-xl border border-line bg-card p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Password Strength
                </p>
                <p className={cn("mt-2 text-lg font-bold", strengthColor(strength.score))}>
                  {strength.label}
                </p>
                {/* Strength bar */}
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full",
                        i < strength.score
                          ? strengthBarColor(strength.score)
                          : "bg-line",
                      )}
                    />
                  ))}
                </div>
                {strength.issues.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {strength.issues.map((issue, i) => (
                      <p key={i} className="flex items-center gap-2 text-xs text-muted">
                        <span className="text-yellow-400">!</span>
                        {issue}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Recommendations (if breached) */}
            {result.found && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Recommendations
                </p>
                {BREACH_RECOMMENDATIONS.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-muted"
                  >
                    <span className="mt-0.5 shrink-0 text-red-400">{i + 1}.</span>
                    {rec}
                  </div>
                ))}
              </div>
            )}

            {/* Clean but weak warning */}
            {!result.found && strength && strength.score < 3 && (
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-5 text-sm leading-7 text-yellow-400">
                While this password was not found in breach databases, it scored as
                &quot;{strength.label}&quot;. A stronger password significantly reduces
                your risk. Consider using a password manager to generate a long,
                random password.
              </div>
            )}

            {/* Clean and strong */}
            {!result.found && strength && strength.score >= 3 && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm leading-7 text-emerald-400">
                This password is both strong and not found in any known breaches.
                Remember to never reuse passwords across accounts and always enable
                two-factor authentication for an extra layer of security.
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

function LockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform", open && "rotate-90")}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function SpinnerIconLarge() {
  return (
    <svg className="h-10 w-10 animate-spin text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
