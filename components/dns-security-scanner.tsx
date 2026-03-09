"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SpfResult = {
  found: boolean;
  record: string | null;
  valid: boolean;
  tooPermissive: boolean;
  details: string;
};

type DmarcResult = {
  found: boolean;
  record: string | null;
  policy: string | null;
  details: string;
};

type DkimResult = {
  found: boolean;
  selector: string | null;
  record: string | null;
  details: string;
};

type MxResult = {
  found: boolean;
  records: Array<{ exchange: string; priority: number }>;
  provider: string | null;
};

type ScanResult = {
  domain: string;
  spf: SpfResult;
  dmarc: DmarcResult;
  dkim: DkimResult;
  mx: MxResult;
  grade: string;
  score: number;
};

type ExpandedSections = {
  spf: boolean;
  dmarc: boolean;
  dkim: boolean;
  mx: boolean;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function gradeColor(grade: string): string {
  switch (grade) {
    case "A": return "text-emerald-400";
    case "B": return "text-emerald-400";
    case "C": return "text-yellow-400";
    case "D": return "text-orange-400";
    default: return "text-red-400";
  }
}

function gradeBorderColor(grade: string): string {
  switch (grade) {
    case "A": return "border-emerald-500/30";
    case "B": return "border-emerald-500/30";
    case "C": return "border-yellow-500/30";
    case "D": return "border-orange-500/30";
    default: return "border-red-500/30";
  }
}

function gradeBgColor(grade: string): string {
  switch (grade) {
    case "A": return "bg-emerald-500/10";
    case "B": return "bg-emerald-500/10";
    case "C": return "bg-yellow-500/10";
    case "D": return "bg-orange-500/10";
    default: return "bg-red-500/10";
  }
}

function gradeDescription(grade: string): string {
  switch (grade) {
    case "A": return "Excellent email security configuration. All major protections are in place.";
    case "B": return "Good security. Most protections are configured but there is room for improvement.";
    case "C": return "Moderate security. Some protections are missing or not fully enforced.";
    case "D": return "Poor security. Critical email protections are missing or misconfigured.";
    default: return "Critical risk. Email security is essentially absent. Immediate action needed.";
  }
}

type StatusType = "pass" | "warning" | "fail";

function statusIcon(status: StatusType): string {
  switch (status) {
    case "pass": return "checkmark";
    case "warning": return "warning";
    case "fail": return "cross";
  }
}

function statusLabel(status: StatusType): string {
  switch (status) {
    case "pass": return "Pass";
    case "warning": return "Warning";
    case "fail": return "Missing";
  }
}

function statusColor(status: StatusType): string {
  switch (status) {
    case "pass": return "text-emerald-400";
    case "warning": return "text-yellow-400";
    case "fail": return "text-red-400";
  }
}

function statusBorder(status: StatusType): string {
  switch (status) {
    case "pass": return "border-emerald-500/20";
    case "warning": return "border-yellow-500/20";
    case "fail": return "border-red-500/20";
  }
}

function getSpfStatus(spf: SpfResult): StatusType {
  if (!spf.found) return "fail";
  if (spf.tooPermissive) return "fail";
  if (spf.record?.includes("-all")) return "pass";
  return "warning";
}

function getDmarcStatus(dmarc: DmarcResult): StatusType {
  if (!dmarc.found) return "fail";
  if (dmarc.policy === "reject") return "pass";
  if (dmarc.policy === "quarantine") return "warning";
  return "warning";
}

function getDkimStatus(dkim: DkimResult): StatusType {
  return dkim.found ? "pass" : "warning";
}

/* ------------------------------------------------------------------ */
/*  Provider help links                                                */
/* ------------------------------------------------------------------ */

function getProviderHelp(provider: string | null): { label: string; url: string } | null {
  switch (provider) {
    case "Google Workspace":
      return {
        label: "Google Workspace Email Authentication Guide",
        url: "https://support.google.com/a/answer/33786",
      };
    case "Microsoft 365":
      return {
        label: "Microsoft 365 Email Authentication Guide",
        url: "https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/email-authentication-about",
      };
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Recommendations                                                    */
/* ------------------------------------------------------------------ */

function getRecommendations(result: ScanResult): string[] {
  const recs: string[] = [];

  if (!result.spf.found) {
    recs.push("Add an SPF record to your DNS to specify which servers are authorized to send email for your domain.");
  } else if (result.spf.tooPermissive) {
    recs.push("Your SPF record uses +all which is extremely dangerous. Change it to -all or ~all immediately.");
  } else if (result.spf.record?.includes("~all")) {
    recs.push("Consider tightening your SPF record from ~all (softfail) to -all (hardfail) for stricter enforcement.");
  }

  if (!result.dmarc.found) {
    recs.push("Add a DMARC record (TXT record at _dmarc.yourdomain.com) to tell receivers how to handle unauthenticated email.");
  } else if (result.dmarc.policy === "none") {
    recs.push("Upgrade your DMARC policy from 'none' to 'quarantine' or 'reject' to actively protect against spoofing.");
  } else if (result.dmarc.policy === "quarantine") {
    recs.push("Consider upgrading your DMARC policy from 'quarantine' to 'reject' for maximum email spoofing protection.");
  }

  if (!result.dkim.found) {
    recs.push("Configure DKIM signing for your email. Contact your email provider for the correct DKIM setup instructions.");
  }

  if (!result.mx.found) {
    recs.push("No MX records found. If this domain should receive email, add MX records pointing to your mail server.");
  }

  if (recs.length === 0) {
    recs.push("Your email security configuration looks solid. Continue monitoring for any changes and keep records up to date.");
  }

  return recs;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DnsSecurityScanner() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scanned, setScanned] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [expanded, setExpanded] = useState<ExpandedSections>({
    spf: false,
    dmarc: false,
    dkim: false,
    mx: false,
  });

  const toggleSection = (key: keyof ExpandedSections) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleScan = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please enter a domain or email address.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setScanned(false);
    setScanProgress(0);

    // Animated progress
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);

    try {
      const res = await fetch("/api/dns-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Scan failed." }));
        throw new Error(data.error || "Scan failed.");
      }

      const data = (await res.json()) as ScanResult;
      setScanProgress(100);
      // Small delay to show 100% before showing results
      await new Promise((resolve) => setTimeout(resolve, 400));
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed. Please try again.");
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
      setScanned(true);
    }
  }, [input]);

  const providerHelp = result?.mx.provider ? getProviderHelp(result.mx.provider) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* ---- Left panel: input + info ---- */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          DNS Security Scanner
        </p>
        <h3 className="mt-3 text-2xl font-bold text-ink">
          Email Domain Security Check
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Enter your email address or domain name to check if SPF, DKIM, and DMARC
          are properly configured. These DNS records protect your domain from email
          spoofing and phishing attacks.
        </p>

        {/* Domain input */}
        <div className="mt-8">
          <label htmlFor="dns-input" className="sr-only">
            Domain or email address
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <GlobeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="dns-input"
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleScan();
                }}
                placeholder="example.com or you@example.com"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-xl border border-line bg-background py-4 pl-11 pr-4 text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <button
              type="button"
              onClick={handleScan}
              disabled={loading || !input.trim()}
              className={cn(
                "shrink-0 rounded-xl px-6 py-4 text-sm font-semibold transition",
                loading || !input.trim()
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
                "Scan"
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        {/* Scanning progress */}
        {loading && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Scanning DNS records...</span>
              <span>{Math.round(scanProgress)}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <div className="mt-3 space-y-1">
              {[
                { threshold: 0, label: "Looking up MX records..." },
                { threshold: 20, label: "Checking SPF configuration..." },
                { threshold: 45, label: "Querying DMARC policy..." },
                { threshold: 65, label: "Scanning DKIM selectors..." },
                { threshold: 85, label: "Calculating security grade..." },
              ].map(
                (step) =>
                  scanProgress >= step.threshold && (
                    <p
                      key={step.label}
                      className="flex items-center gap-2 text-xs text-muted"
                    >
                      {scanProgress >= step.threshold + 18 ? (
                        <CheckmarkSmall className="text-accent" />
                      ) : (
                        <SpinnerSmall />
                      )}
                      {step.label}
                    </p>
                  ),
              )}
            </div>
          </div>
        )}

        {/* What we check */}
        {!loading && (
          <div className="mt-8 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              What we check
            </p>
            {[
              {
                title: "SPF (Sender Policy Framework)",
                desc: "Specifies which servers are authorized to send email for your domain.",
              },
              {
                title: "DMARC (Domain-based Message Authentication)",
                desc: "Tells receivers what to do with emails that fail SPF/DKIM checks.",
              },
              {
                title: "DKIM (DomainKeys Identified Mail)",
                desc: "Adds a digital signature to emails to verify they were not altered in transit.",
              },
              {
                title: "MX Records",
                desc: "Identifies your mail servers and provider for provider-specific guidance.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-line bg-surface px-4 py-3"
              >
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---- Right panel: results ---- */}
      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Results
        </p>

        {!scanned && !loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <ScanIcon className="mb-4 text-muted/30" />
            <p className="text-lg font-medium text-muted/50">
              Enter a domain and press Scan
            </p>
            <p className="mt-2 text-sm text-muted/30">
              DNS security results will appear here
            </p>
          </div>
        )}

        {scanned && result && (
          <div className="mt-5 space-y-4">
            {/* Grade card */}
            <div
              className={cn(
                "rounded-xl border p-5 text-center",
                gradeBorderColor(result.grade),
                gradeBgColor(result.grade),
              )}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Security Grade
              </p>
              <p className={cn("mt-2 text-6xl font-black", gradeColor(result.grade))}>
                {result.grade}
              </p>
              <p className="mt-1 text-sm text-muted">
                {result.domain} &middot; Score: {result.score}/100
              </p>
              <p className="mt-2 text-xs text-muted">
                {gradeDescription(result.grade)}
              </p>
            </div>

            {/* SPF */}
            <CheckCard
              title="SPF Record"
              status={getSpfStatus(result.spf)}
              statusText={
                result.spf.found
                  ? result.spf.tooPermissive
                    ? "Dangerous"
                    : result.spf.record?.includes("-all")
                      ? "Strict"
                      : "Partial"
                  : "Missing"
              }
              expanded={expanded.spf}
              onToggle={() => toggleSection("spf")}
              details={result.spf.details}
              record={result.spf.record}
            />

            {/* DMARC */}
            <CheckCard
              title="DMARC Policy"
              status={getDmarcStatus(result.dmarc)}
              statusText={
                result.dmarc.found
                  ? result.dmarc.policy === "reject"
                    ? "Enforce"
                    : result.dmarc.policy === "quarantine"
                      ? "Quarantine"
                      : "Monitor Only"
                  : "Missing"
              }
              expanded={expanded.dmarc}
              onToggle={() => toggleSection("dmarc")}
              details={result.dmarc.details}
              record={result.dmarc.record}
            />

            {/* DKIM */}
            <CheckCard
              title="DKIM Signing"
              status={getDkimStatus(result.dkim)}
              statusText={result.dkim.found ? `Found (${result.dkim.selector})` : "Not Detected"}
              expanded={expanded.dkim}
              onToggle={() => toggleSection("dkim")}
              details={result.dkim.details}
              record={result.dkim.record}
            />

            {/* MX Records */}
            <div className="rounded-xl border border-line bg-card p-4">
              <button
                type="button"
                onClick={() => toggleSection("mx")}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <MailServerIcon />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-ink">Mail Provider</p>
                    <p className="text-xs text-muted">
                      {result.mx.found
                        ? result.mx.provider || "Custom / Unknown"
                        : "No MX records found"}
                    </p>
                  </div>
                </div>
                <ChevronIcon open={expanded.mx} />
              </button>
              {expanded.mx && result.mx.records.length > 0 && (
                <div className="mt-3 space-y-1 border-t border-line pt-3">
                  {result.mx.records.map((mx, i) => (
                    <p key={i} className="font-mono text-xs text-muted">
                      <span className="text-accent">{mx.priority}</span>{" "}
                      {mx.exchange}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Provider-specific help */}
            {providerHelp && (
              <a
                href={providerHelp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent hover:bg-accent/20 transition"
              >
                <ExternalLinkIcon />
                {providerHelp.label}
              </a>
            )}

            {/* Recommendations */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Recommendations
              </p>
              {getRecommendations(result).map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-muted"
                >
                  <span className="mt-0.5 shrink-0 text-accent">{i + 1}.</span>
                  {rec}
                </div>
              ))}
            </div>

            {/* CTA */}
            {result.score < 75 && (
              <div className="rounded-xl border border-accent/30 bg-accent/10 p-5 text-sm leading-7 text-ink">
                <p className="font-semibold text-accent">
                  Need help securing your email domain?
                </p>
                <p className="mt-2 text-muted">
                  Misconfigured email authentication makes your domain vulnerable
                  to spoofing and phishing. Book a session and we will help you set
                  up SPF, DKIM, and DMARC correctly.
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
/*  CheckCard sub-component                                            */
/* ------------------------------------------------------------------ */

function CheckCard({
  title,
  status,
  statusText,
  expanded,
  onToggle,
  details,
  record,
}: {
  title: string;
  status: StatusType;
  statusText: string;
  expanded: boolean;
  onToggle: () => void;
  details: string;
  record: string | null;
}) {
  const iconType = statusIcon(status);

  return (
    <div className={cn("rounded-xl border bg-card p-4", statusBorder(status))}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-3">
          {iconType === "checkmark" && <CheckCircleIcon className="text-emerald-400" />}
          {iconType === "warning" && <WarningCircleIcon className="text-yellow-400" />}
          {iconType === "cross" && <CrossCircleIcon className="text-red-400" />}
          <div className="text-left">
            <p className="text-sm font-semibold text-ink">{title}</p>
            <p className={cn("text-xs", statusColor(status))}>
              {statusLabel(status)} &middot; {statusText}
            </p>
          </div>
        </div>
        <ChevronIcon open={expanded} />
      </button>
      {expanded && (
        <div className="mt-3 space-y-2 border-t border-line pt-3">
          <p className="text-xs leading-5 text-muted">{details}</p>
          {record && (
            <div className="overflow-x-auto rounded-lg bg-background px-3 py-2">
              <p className="whitespace-pre-wrap break-all font-mono text-xs text-muted/80">
                {record}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ScanIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function WarningCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function CrossCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function MailServerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-accent">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0 text-muted transition-transform", open && "rotate-90")}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckmarkSmall({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SpinnerSmall() {
  return (
    <svg className="h-3 w-3 animate-spin text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
