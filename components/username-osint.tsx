"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type PlatformResult = {
  platform: string;
  url: string;
  exists: boolean;
  status: number | null;
  error: boolean;
};

type SearchResponse = {
  username: string;
  total: number;
  found: number;
  errors: number;
  results: PlatformResult[];
};

type ExposureLevel = "low" | "moderate" | "high";

/* ------------------------------------------------------------------ */
/*  Exposure assessment                                                */
/* ------------------------------------------------------------------ */

function getExposureLevel(found: number): ExposureLevel {
  if (found <= 5) return "low";
  if (found <= 15) return "moderate";
  return "high";
}

function exposureLabel(level: ExposureLevel): string {
  switch (level) {
    case "low":
      return "Low Exposure";
    case "moderate":
      return "Moderate Exposure";
    case "high":
      return "High Exposure";
  }
}

function exposureDescription(level: ExposureLevel): string {
  switch (level) {
    case "low":
      return "This username has a small digital footprint. Fewer accounts means less attack surface.";
    case "moderate":
      return "This username is linked to several platforms. Consider removing unused accounts to reduce risk.";
    case "high":
      return "This username has a large presence across many platforms. Many accounts linked to a single identity increase the risk of credential stuffing and social engineering attacks.";
  }
}

function exposureColor(level: ExposureLevel): string {
  switch (level) {
    case "low":
      return "text-emerald-400";
    case "moderate":
      return "text-yellow-400";
    case "high":
      return "text-red-400";
  }
}

function exposureBorder(level: ExposureLevel): string {
  switch (level) {
    case "low":
      return "border-emerald-500/30";
    case "moderate":
      return "border-yellow-500/30";
    case "high":
      return "border-red-500/30";
  }
}

function exposureBg(level: ExposureLevel): string {
  switch (level) {
    case "low":
      return "bg-emerald-500/10";
    case "moderate":
      return "bg-yellow-500/10";
    case "high":
      return "bg-red-500/10";
  }
}

/* ------------------------------------------------------------------ */
/*  Hygiene tips                                                       */
/* ------------------------------------------------------------------ */

const USERNAME_TIPS = [
  "Use different usernames for sensitive accounts (banking, email) and public ones (social media, forums).",
  "Delete or deactivate accounts you no longer use. Dormant accounts are prime targets for takeover.",
  "Never reuse passwords across platforms, especially those sharing the same username.",
  "Enable two-factor authentication on every platform that offers it.",
  "Be cautious of what personal information your profiles reveal. Birthdays, locations, and workplaces help attackers.",
  "Search for your username regularly to discover accounts you may have forgotten about.",
  "Consider using email aliases (e.g., SimpleLogin, Firefox Relay) so each account has a unique email.",
];

/* ------------------------------------------------------------------ */
/*  Username validation                                                */
/* ------------------------------------------------------------------ */

function isValidUsername(username: string): boolean {
  return /^[\w.\-]{1,64}$/i.test(username.trim());
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function UsernameOsint() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const abortRef = useRef<AbortController | null>(null);

  const handleSearch = useCallback(async () => {
    const trimmed = username.trim();

    if (!trimmed) {
      setError("Please enter a username.");
      return;
    }

    if (!isValidUsername(trimmed)) {
      setError(
        "Invalid username. Use only letters, numbers, dots, hyphens, and underscores (max 64 chars).",
      );
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setChecked(false);
    setProgress({ current: 0, total: 30 });

    // Simulate progress updates while API works
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev.current >= prev.total - 1) {
          clearInterval(progressInterval);
          return prev;
        }
        return { ...prev, current: prev.current + 1 };
      });
    }, 500);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/username-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmed }),
        signal: abortRef.current.signal,
      });

      clearInterval(progressInterval);

      if (res.status === 429) {
        setError("Too many requests. Please wait 10 seconds and try again.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "An error occurred. Please try again.");
        setLoading(false);
        return;
      }

      const data = (await res.json()) as SearchResponse;
      setProgress({ current: data.total, total: data.total });
      setResult(data);
    } catch (err) {
      clearInterval(progressInterval);
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
      setChecked(true);
    }
  }, [username]);

  const exposure = result ? getExposureLevel(result.found) : null;

  const foundResults = result?.results.filter((r) => r.exists) ?? [];
  const notFoundResults = result?.results.filter((r) => !r.exists && !r.error) ?? [];
  const errorResults = result?.results.filter((r) => r.error) ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* ---- Left panel: input + tips ---- */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Username OSINT
        </p>
        <h3 className="mt-3 text-2xl font-bold text-ink">
          Search Your Username Across the Web
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Enter a username to discover which platforms it is registered on.
          This helps you understand your digital footprint and identify
          forgotten accounts that could be a security risk.
        </p>

        {/* Username input */}
        <div className="mt-8">
          <label htmlFor="osint-username" className="sr-only">
            Username
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="osint-username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="johndoe"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-xl border border-line bg-background py-4 pl-11 pr-4 text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              disabled={loading || !username.trim()}
              className={cn(
                "shrink-0 rounded-xl px-6 py-4 text-sm font-semibold transition",
                loading || !username.trim()
                  ? "cursor-not-allowed border border-line bg-card text-muted"
                  : "bg-accent text-background hover:bg-accent-strong",
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon />
                  Searching...
                </span>
              ) : (
                "Search"
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        {/* Loading progress */}
        {loading && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>
                Checking {progress.current}/{progress.total} platforms...
              </span>
              <span>
                {progress.total > 0
                  ? Math.round((progress.current / progress.total) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{
                  width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Privacy notice */}
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3">
          <ShieldIcon className="mt-0.5 shrink-0 text-accent" />
          <p className="text-xs leading-5 text-muted">
            We only check if a username profile page returns a public HTTP 200
            response. No login credentials are tested, no accounts are
            accessed, and no data is stored.
          </p>
        </div>

        {/* Tips section */}
        <div className="mt-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Username hygiene tips
          </p>
          {USERNAME_TIPS.slice(
            0,
            checked && result && result.found > 5 ? 7 : 4,
          ).map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-muted"
            >
              <span className="mt-0.5 shrink-0 text-accent">{i + 1}.</span>
              {tip}
            </div>
          ))}
        </div>
      </section>

      {/* ---- Right panel: results ---- */}
      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Results
        </p>

        {/* Empty state */}
        {!checked && !loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <GlobeIcon className="mb-4 text-muted/30" />
            <p className="text-lg font-medium text-muted/50">
              Enter a username and press Search
            </p>
            <p className="mt-2 text-sm text-muted/30">
              Results will appear here
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <SpinnerIconLarge />
            <p className="mt-4 text-sm text-muted">
              Scanning {progress.total} platforms...
            </p>
          </div>
        )}

        {/* Results */}
        {checked && result && (
          <div className="mt-5 space-y-4">
            {/* Summary card */}
            <div
              className={cn(
                "rounded-xl border p-5",
                exposure ? exposureBorder(exposure) : "border-line",
                exposure ? exposureBg(exposure) : "bg-card",
              )}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Exposure Level
              </p>
              <p
                className={cn(
                  "mt-3 text-3xl font-bold",
                  exposure ? exposureColor(exposure) : "text-muted",
                )}
              >
                {exposure ? exposureLabel(exposure) : "Unknown"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {exposure ? exposureDescription(exposure) : ""}
              </p>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-line bg-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Found
                </p>
                <p className="mt-2 font-mono text-2xl text-emerald-400">
                  {result.found}
                </p>
              </div>
              <div className="rounded-xl border border-line bg-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Not Found
                </p>
                <p className="mt-2 font-mono text-2xl text-ink">
                  {result.total - result.found - result.errors}
                </p>
              </div>
              <div className="rounded-xl border border-line bg-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Errors
                </p>
                <p className="mt-2 font-mono text-2xl text-yellow-400">
                  {result.errors}
                </p>
              </div>
            </div>

            {/* Found platforms */}
            {foundResults.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  Found on {foundResults.length} platform
                  {foundResults.length !== 1 ? "s" : ""}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {foundResults.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm transition hover:border-emerald-500/40 hover:bg-emerald-500/15"
                    >
                      <CheckCircleIcon className="shrink-0 text-emerald-400" />
                      <span className="flex-1 font-medium text-ink">
                        {r.platform}
                      </span>
                      <ExternalLinkIcon className="shrink-0 text-muted/50" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Not found platforms */}
            {notFoundResults.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Not found ({notFoundResults.length})
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {notFoundResults.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 text-sm"
                    >
                      <XCircleIcon className="shrink-0 text-muted/40" />
                      <span className="text-muted">{r.platform}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error platforms */}
            {errorResults.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
                  Could not check ({errorResults.length})
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {errorResults.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm"
                    >
                      <AlertIcon className="shrink-0 text-yellow-400" />
                      <span className="text-muted">{r.platform}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {result.found > 5 && (
              <div className="rounded-xl border border-accent/30 bg-accent/10 p-5 text-sm leading-7 text-ink">
                <p className="font-semibold text-accent">
                  Need help reducing your digital footprint?
                </p>
                <p className="mt-2 text-muted">
                  With accounts found on {result.found} platforms, you have a
                  significant online presence. Our team can help you audit,
                  remove, and lock down unused accounts to reduce your attack
                  surface.
                </p>
                <a
                  href="/get-help"
                  className="mt-4 inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-accent-strong"
                >
                  Book a session
                </a>
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

function UserIcon({ className }: { className?: string }) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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

function GlobeIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function XCircleIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
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
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
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
