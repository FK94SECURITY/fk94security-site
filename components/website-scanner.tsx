"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type TestDetail = {
  name: string;
  label: string;
  pass: boolean | null;
  result: string;
  description: string;
  whyItMatters: string;
  howToFix: string;
};

type ScanResult = {
  domain: string;
  grade: string;
  score: number;
  testsPassed: number;
  testsFailed: number;
  testsTotal: number;
  tests: TestDetail[];
  scanError: boolean;
  errorMessage?: string;
};

/* ------------------------------------------------------------------ */
/*  Grade styling                                                      */
/* ------------------------------------------------------------------ */

type GradeColor = {
  text: string;
  border: string;
  bg: string;
  ring: string;
};

function getGradeColor(grade: string): GradeColor {
  if (grade.startsWith("A")) {
    return {
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      ring: "ring-emerald-500/20",
    };
  }
  if (grade.startsWith("B")) {
    return {
      text: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      ring: "ring-blue-500/20",
    };
  }
  if (grade.startsWith("C")) {
    return {
      text: "text-yellow-400",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      ring: "ring-yellow-500/20",
    };
  }
  if (grade.startsWith("D")) {
    return {
      text: "text-orange-400",
      border: "border-orange-500/30",
      bg: "bg-orange-500/10",
      ring: "ring-orange-500/20",
    };
  }
  if (grade.startsWith("F")) {
    return {
      text: "text-red-400",
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      ring: "ring-red-500/20",
    };
  }
  return {
    text: "text-muted",
    border: "border-line",
    bg: "bg-card",
    ring: "ring-line",
  };
}

function getGradeDescription(grade: string): string {
  if (grade === "A+")
    return "Excellent. This site implements all recommended security headers and best practices.";
  if (grade === "A")
    return "Very good. This site has strong security headers with minor improvements possible.";
  if (grade === "A-")
    return "Good. Most security headers are in place with a few optimizations recommended.";
  if (grade.startsWith("B"))
    return "Decent. Several security headers are present but some important ones are missing.";
  if (grade.startsWith("C"))
    return "Fair. Multiple security headers are missing, leaving the site moderately exposed.";
  if (grade.startsWith("D"))
    return "Poor. Most security headers are missing, creating significant vulnerabilities.";
  if (grade.startsWith("F"))
    return "Critical. Very few or no security headers are configured. This site needs immediate attention.";
  return "Unable to determine grade.";
}

/* ------------------------------------------------------------------ */
/*  Static comparison data                                             */
/* ------------------------------------------------------------------ */

const COMPARISON_SITES = [
  { domain: "google.com", grade: "A+", score: 100 },
  { domain: "github.com", grade: "A+", score: 120 },
  { domain: "facebook.com", grade: "A", score: 95 },
  { domain: "amazon.com", grade: "B-", score: 55 },
  { domain: "wikipedia.org", grade: "B+", score: 70 },
  { domain: "reddit.com", grade: "A-", score: 85 },
];

/* ------------------------------------------------------------------ */
/*  URL validation                                                     */
/* ------------------------------------------------------------------ */

function extractDomain(input: string): string {
  let cleaned = input.trim().toLowerCase();
  cleaned = cleaned.replace(/^https?:\/\//, "");
  cleaned = cleaned.split("/")[0];
  cleaned = cleaned.split("?")[0];
  cleaned = cleaned.split("#")[0];
  cleaned = cleaned.split(":")[0];
  return cleaned;
}

function isValidDomain(domain: string): boolean {
  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(
    domain,
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function WebsiteScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set());

  const toggleTest = useCallback((name: string) => {
    setExpandedTests((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const handleScan = useCallback(async () => {
    const domain = extractDomain(url);

    if (!domain) {
      setError("Please enter a website URL or domain.");
      return;
    }

    if (!isValidDomain(domain)) {
      setError(
        "Invalid domain format. Enter a domain like example.com.",
      );
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setChecked(false);
    setExpandedTests(new Set());

    try {
      const res = await fetch("/api/site-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: domain }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "An error occurred. Please try again.");
        setLoading(false);
        return;
      }

      const data = (await res.json()) as ScanResult;
      setResult(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
      setChecked(true);
    }
  }, [url]);

  const gradeColor = result ? getGradeColor(result.grade) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* ---- Left panel: input + comparison ---- */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Website Scanner
        </p>
        <h3 className="mt-3 text-2xl font-bold text-ink">
          Scan Your Website&apos;s Security Headers
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Enter any website to analyze its HTTP security headers using the
          Mozilla Observatory. We check for content security policies, HSTS,
          clickjacking protection, and more.
        </p>

        {/* URL input */}
        <div className="mt-8">
          <label htmlFor="scan-url" className="sr-only">
            Website URL
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="scan-url"
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleScan();
                }}
                placeholder="example.com"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-xl border border-line bg-background py-4 pl-11 pr-4 text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <button
              type="button"
              onClick={handleScan}
              disabled={loading || !url.trim()}
              className={cn(
                "shrink-0 rounded-xl px-6 py-4 text-sm font-semibold transition",
                loading || !url.trim()
                  ? "cursor-not-allowed border border-line bg-card text-muted"
                  : "bg-accent text-background hover:bg-accent-strong",
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon />
                  Scanning...
                </span>
              ) : (
                "Scan Website"
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="mt-6 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <SpinnerIcon />
              <div>
                <p className="text-sm font-medium text-ink">
                  Scanning in progress...
                </p>
                <p className="text-xs text-muted">
                  Mozilla Observatory is analyzing the site. This may take up to
                  30 seconds.
                </p>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <div className="h-full w-full animate-pulse rounded-full bg-accent/50" />
            </div>
          </div>
        )}

        {/* Compare with popular sites */}
        <div className="mt-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            How popular sites compare
          </p>
          <div className="grid gap-2">
            {COMPARISON_SITES.map((site) => {
              const c = getGradeColor(site.grade);
              return (
                <div
                  key={site.domain}
                  className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3"
                >
                  <span className="text-sm text-muted">{site.domain}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted">
                      {site.score}/100
                    </span>
                    <span
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-xs font-bold",
                        c.bg,
                        c.text,
                      )}
                    >
                      {site.grade}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Right panel: results ---- */}
      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Scan Results
        </p>

        {/* Empty state */}
        {!checked && !loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <ScanIcon className="mb-4 text-muted/30" />
            <p className="text-lg font-medium text-muted/50">
              Enter a domain and press Scan
            </p>
            <p className="mt-2 text-sm text-muted/30">
              Security analysis will appear here
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <SpinnerIconLarge />
            <p className="mt-4 text-sm text-muted">
              Analyzing security headers...
            </p>
          </div>
        )}

        {/* Results */}
        {checked && result && (
          <div className="mt-5 space-y-4">
            {/* Error state */}
            {result.scanError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5">
                <p className="text-sm font-semibold text-red-400">
                  Scan Error
                </p>
                <p className="mt-2 text-sm text-muted">
                  {result.errorMessage ||
                    "An unknown error occurred during the scan."}
                </p>
              </div>
            )}

            {/* Grade card */}
            {!result.scanError && (
              <>
                <div
                  className={cn(
                    "rounded-xl border p-6 text-center",
                    gradeColor?.border ?? "border-line",
                    gradeColor?.bg ?? "bg-card",
                  )}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">
                    Security Grade
                  </p>
                  <p
                    className={cn(
                      "mt-3 text-6xl font-black tracking-tight",
                      gradeColor?.text ?? "text-muted",
                    )}
                  >
                    {result.grade}
                  </p>
                  <p className="mt-2 font-mono text-sm text-muted">
                    Score: {result.score}/100
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {getGradeDescription(result.grade)}
                  </p>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-line bg-card p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Passed
                    </p>
                    <p className="mt-2 font-mono text-2xl text-emerald-400">
                      {result.testsPassed}
                    </p>
                  </div>
                  <div className="rounded-xl border border-line bg-card p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Failed
                    </p>
                    <p className="mt-2 font-mono text-2xl text-red-400">
                      {result.testsFailed}
                    </p>
                  </div>
                  <div className="rounded-xl border border-line bg-card p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Total
                    </p>
                    <p className="mt-2 font-mono text-2xl text-ink">
                      {result.testsTotal}
                    </p>
                  </div>
                </div>

                {/* Individual test results */}
                {result.tests.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Individual tests
                    </p>
                    {result.tests.map((test) => {
                      const isExpanded = expandedTests.has(test.name);
                      const statusIcon =
                        test.pass === true ? (
                          <CheckIcon className="shrink-0 text-emerald-400" />
                        ) : test.pass === false ? (
                          <XIcon className="shrink-0 text-red-400" />
                        ) : (
                          <MinusIcon className="shrink-0 text-yellow-400" />
                        );

                      return (
                        <div
                          key={test.name}
                          className="rounded-xl border border-line bg-card"
                        >
                          <button
                            type="button"
                            onClick={() => toggleTest(test.name)}
                            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-card-hover"
                          >
                            {statusIcon}
                            <span className="flex-1 text-sm font-medium text-ink">
                              {test.label}
                            </span>
                            <ChevronIcon
                              className={cn(
                                "shrink-0 text-muted transition-transform",
                                isExpanded && "rotate-180",
                              )}
                            />
                          </button>
                          {isExpanded && (
                            <div className="border-t border-line px-4 py-4 space-y-3">
                              {test.result && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                                    Result
                                  </p>
                                  <p className="mt-1 font-mono text-xs text-ink">
                                    {test.result}
                                  </p>
                                </div>
                              )}
                              {test.description && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                                    What it means
                                  </p>
                                  <p className="mt-1 text-sm leading-6 text-muted">
                                    {test.description}
                                  </p>
                                </div>
                              )}
                              {test.whyItMatters && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                                    Why it matters
                                  </p>
                                  <p className="mt-1 text-sm leading-6 text-muted">
                                    {test.whyItMatters}
                                  </p>
                                </div>
                              )}
                              {test.howToFix && test.pass === false && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                                    How to fix
                                  </p>
                                  <p className="mt-1 text-sm leading-6 text-muted">
                                    {test.howToFix}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* CTA */}
                {result.testsFailed > 2 && (
                  <div className="rounded-xl border border-accent/30 bg-accent/10 p-5 text-sm leading-7 text-ink">
                    <p className="font-semibold text-accent">
                      Need help securing your website?
                    </p>
                    <p className="mt-2 text-muted">
                      Your site failed {result.testsFailed} security checks.
                      Our team can help you implement the missing headers and
                      harden your web application against common attacks.
                    </p>
                    <a
                      href="/get-help"
                      className="mt-4 inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-accent-strong"
                    >
                      Book a consultation
                    </a>
                  </div>
                )}
              </>
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

function LinkIcon({ className }: { className?: string }) {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ScanIcon({ className }: { className?: string }) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
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
      <polyline points="6 9 12 15 18 9" />
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
