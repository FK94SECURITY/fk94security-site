"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CheckStatus = "pass" | "warning" | "fail" | "neutral";

type HeaderCheck = {
  label: string;
  status: CheckStatus;
  value: string;
  explanation: string;
};

type Hop = {
  from: string;
  by: string;
  ip: string | null;
  timestamp: string | null;
};

type AnalysisResult = {
  trustScore: number;
  checks: HeaderCheck[];
  redFlags: string[];
  hops: Hop[];
  rawFrom: string | null;
  rawReturnPath: string | null;
  rawReplyTo: string | null;
  rawSubject: string | null;
};

/* ------------------------------------------------------------------ */
/*  Header parsing helpers                                             */
/* ------------------------------------------------------------------ */

function extractHeader(headers: string, name: string): string | null {
  // Headers can span multiple lines (continuation lines start with whitespace)
  const regex = new RegExp(
    `^${name}:\\s*(.+?)(?=\\n[^\\s\\t]|\\n$|$)`,
    "ims",
  );
  const match = headers.match(regex);
  if (!match) return null;
  // Collapse continuation lines
  return match[1].replace(/\r?\n[ \t]+/g, " ").trim();
}

function extractAllHeaders(headers: string, name: string): string[] {
  const results: string[] = [];
  const regex = new RegExp(
    `^${name}:\\s*(.+?)(?=\\n[^\\s\\t]|\\n$|$)`,
    "gims",
  );
  let match: RegExpExecArray | null;
  while ((match = regex.exec(headers)) !== null) {
    results.push(match[1].replace(/\r?\n[ \t]+/g, " ").trim());
  }
  return results;
}

function extractEmailAddress(headerValue: string): string {
  const angleMatch = headerValue.match(/<([^>]+)>/);
  if (angleMatch) return angleMatch[1].toLowerCase();
  const plainMatch = headerValue.match(/[\w.+-]+@[\w.-]+/);
  if (plainMatch) return plainMatch[0].toLowerCase();
  return headerValue.toLowerCase().trim();
}

function extractIpFromReceived(received: string): string | null {
  // Look for IPv4 in brackets or parentheses
  const ipv4 = received.match(/\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]/);
  if (ipv4) return ipv4[1];
  const ipv4Paren = received.match(/\(.*?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
  if (ipv4Paren) return ipv4Paren[1];
  return null;
}

function extractTimestampFromReceived(received: string): string | null {
  // RFC 2822 date pattern at end of Received header
  const dateMatch = received.match(
    /;\s*(.+?(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun).+?\d{4}.+?(?:\+|-)\d{4})/i,
  );
  if (dateMatch) return dateMatch[1].trim();
  // Simpler fallback: everything after last semicolon
  const semiMatch = received.match(/;\s*(.+)$/);
  if (semiMatch) return semiMatch[1].trim();
  return null;
}

function parseReceivedHops(receivedHeaders: string[]): Hop[] {
  return receivedHeaders.map((received) => {
    const fromMatch = received.match(/from\s+(\S+)/i);
    const byMatch = received.match(/by\s+(\S+)/i);
    return {
      from: fromMatch ? fromMatch[1] : "unknown",
      by: byMatch ? byMatch[1] : "unknown",
      ip: extractIpFromReceived(received),
      timestamp: extractTimestampFromReceived(received),
    };
  });
}

function extractAuthResult(headers: string, protocol: string): string | null {
  const authResults = extractHeader(headers, "Authentication-Results");
  if (!authResults) return null;

  const regex = new RegExp(`${protocol}=([a-z]+)`, "i");
  const match = authResults.match(regex);
  return match ? match[1].toLowerCase() : null;
}

/* ------------------------------------------------------------------ */
/*  Analysis logic                                                     */
/* ------------------------------------------------------------------ */

function analyzeHeaders(rawHeaders: string): AnalysisResult {
  const checks: HeaderCheck[] = [];
  const redFlags: string[] = [];

  // Normalize line endings
  const headers = rawHeaders.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Extract key headers
  const from = extractHeader(headers, "From");
  const returnPath = extractHeader(headers, "Return-Path");
  const replyTo = extractHeader(headers, "Reply-To");
  const subject = extractHeader(headers, "Subject");
  const date = extractHeader(headers, "Date");
  const xMailer = extractHeader(headers, "X-Mailer") || extractHeader(headers, "User-Agent");
  const receivedHeaders = extractAllHeaders(headers, "Received");
  const authResults = extractHeader(headers, "Authentication-Results");

  // SPF
  const spfResult = extractAuthResult(headers, "spf");
  const spfHeader = extractHeader(headers, "Received-SPF");
  const effectiveSpf = spfResult || (spfHeader ? spfHeader.split(" ")[0].toLowerCase() : null);

  if (effectiveSpf) {
    const spfStatus: CheckStatus =
      effectiveSpf === "pass" ? "pass" :
      effectiveSpf === "softfail" ? "warning" :
      effectiveSpf === "neutral" ? "neutral" : "fail";

    checks.push({
      label: "SPF Verification",
      status: spfStatus,
      value: effectiveSpf.toUpperCase(),
      explanation:
        spfStatus === "pass"
          ? "The sending server is authorized to send email for this domain."
          : spfStatus === "warning"
            ? "SPF softfail: the server is not fully authorized. The email may be suspicious."
            : spfStatus === "fail"
              ? "SPF failed: the email was NOT sent from an authorized server. This is a strong indicator of spoofing."
              : "SPF is neutral: the domain owner has not made a definitive statement about this server.",
    });

    if (spfStatus === "fail") redFlags.push("SPF failed - email was not sent from an authorized server");
  } else {
    checks.push({
      label: "SPF Verification",
      status: "neutral",
      value: "Not present",
      explanation: "No SPF result found in the headers. SPF verification may not have been performed.",
    });
  }

  // DKIM
  const dkimResult = extractAuthResult(headers, "dkim");
  if (dkimResult) {
    const dkimStatus: CheckStatus = dkimResult === "pass" ? "pass" : "fail";
    checks.push({
      label: "DKIM Signature",
      status: dkimStatus,
      value: dkimResult.toUpperCase(),
      explanation:
        dkimStatus === "pass"
          ? "The email's DKIM signature is valid. The email content has not been altered in transit."
          : "DKIM verification failed. The email may have been altered or the signature is invalid.",
    });
    if (dkimStatus === "fail") redFlags.push("DKIM failed - email integrity could not be verified");
  } else {
    checks.push({
      label: "DKIM Signature",
      status: "neutral",
      value: "Not present",
      explanation: "No DKIM result found. The email may not have been DKIM-signed.",
    });
  }

  // DMARC
  const dmarcResult = extractAuthResult(headers, "dmarc");
  if (dmarcResult) {
    const dmarcStatus: CheckStatus = dmarcResult === "pass" ? "pass" : "fail";
    checks.push({
      label: "DMARC Policy",
      status: dmarcStatus,
      value: dmarcResult.toUpperCase(),
      explanation:
        dmarcStatus === "pass"
          ? "The email passes DMARC alignment. The sender is verified by domain policy."
          : "DMARC failed. The email does not align with the sender domain's authentication policy.",
    });
    if (dmarcStatus === "fail") redFlags.push("DMARC failed - email does not comply with domain authentication policy");
  } else {
    checks.push({
      label: "DMARC Policy",
      status: "neutral",
      value: "Not present",
      explanation: "No DMARC result found in the headers.",
    });
  }

  // From vs Return-Path
  if (from && returnPath) {
    const fromEmail = extractEmailAddress(from);
    const returnPathEmail = extractEmailAddress(returnPath);
    const fromDomain = fromEmail.split("@")[1];
    const returnPathDomain = returnPathEmail.split("@")[1];

    if (fromEmail === returnPathEmail) {
      checks.push({
        label: "Sender Match (From = Return-Path)",
        status: "pass",
        value: `Both: ${fromEmail}`,
        explanation: "The From address and Return-Path match. This is the expected configuration.",
      });
    } else if (fromDomain === returnPathDomain) {
      checks.push({
        label: "Sender Match (From vs Return-Path)",
        status: "warning",
        value: `From: ${fromEmail} | Return-Path: ${returnPathEmail}`,
        explanation: "The addresses differ but share the same domain. This can occur with mailing lists or forwarding.",
      });
    } else {
      checks.push({
        label: "Sender Mismatch (From vs Return-Path)",
        status: "fail",
        value: `From: ${fromEmail} | Return-Path: ${returnPathEmail}`,
        explanation: "The From address and Return-Path have different domains. This is a common indicator of email spoofing.",
      });
      redFlags.push(`Sender mismatch: From domain (${fromDomain}) differs from Return-Path domain (${returnPathDomain})`);
    }
  }

  // Reply-To check
  if (from && replyTo) {
    const fromEmail = extractEmailAddress(from);
    const replyToEmail = extractEmailAddress(replyTo);
    if (fromEmail !== replyToEmail) {
      const fromDomain = fromEmail.split("@")[1];
      const replyToDomain = replyToEmail.split("@")[1];
      const status: CheckStatus = fromDomain === replyToDomain ? "warning" : "fail";
      checks.push({
        label: "Reply-To Redirect",
        status,
        value: `Reply-To: ${replyToEmail}`,
        explanation:
          status === "fail"
            ? `Replies will go to ${replyToEmail}, which is a different domain than the sender. This is a common phishing technique.`
            : `Reply-To (${replyToEmail}) differs from From (${fromEmail}) but shares the same domain.`,
      });
      if (status === "fail") {
        redFlags.push(`Reply-To goes to a different domain: ${replyToDomain}`);
      }
    }
  }

  // Date check
  if (date) {
    try {
      const emailDate = new Date(date);
      const now = new Date();
      if (emailDate.getTime() > now.getTime() + 86400000) {
        checks.push({
          label: "Future-Dated Email",
          status: "warning",
          value: date,
          explanation: "This email is dated in the future, which may indicate header manipulation.",
        });
        redFlags.push("Email is dated in the future");
      } else {
        checks.push({
          label: "Date Header",
          status: "pass",
          value: date,
          explanation: "The email date is valid and not future-dated.",
        });
      }
    } catch {
      checks.push({
        label: "Date Header",
        status: "neutral",
        value: date,
        explanation: "Could not parse the date header.",
      });
    }
  }

  // X-Mailer
  if (xMailer) {
    checks.push({
      label: "Email Client (X-Mailer)",
      status: "neutral",
      value: xMailer,
      explanation: "This identifies the software used to compose the email. Unusual or suspicious mailers can be a red flag.",
    });
  }

  // Authentication-Results summary
  if (authResults) {
    checks.push({
      label: "Authentication-Results Header",
      status: "neutral",
      value: authResults.length > 100 ? authResults.substring(0, 100) + "..." : authResults,
      explanation: "This header contains the full authentication results as evaluated by the receiving mail server.",
    });
  }

  // Received chain / hops
  const hops = parseReceivedHops(receivedHeaders);

  // Calculate trust score
  let trustScore = 50; // Start at neutral
  for (const check of checks) {
    if (check.status === "pass") trustScore += 10;
    else if (check.status === "warning") trustScore -= 5;
    else if (check.status === "fail") trustScore -= 15;
  }
  // Clamp
  trustScore = Math.max(0, Math.min(100, trustScore));

  return {
    trustScore,
    checks,
    redFlags,
    hops,
    rawFrom: from,
    rawReturnPath: returnPath,
    rawReplyTo: replyTo,
    rawSubject: subject,
  };
}

/* ------------------------------------------------------------------ */
/*  Trust score helpers                                                */
/* ------------------------------------------------------------------ */

function trustColor(score: number): string {
  if (score >= 75) return "text-emerald-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function trustBorder(score: number): string {
  if (score >= 75) return "border-emerald-500/30";
  if (score >= 50) return "border-yellow-500/30";
  return "border-red-500/30";
}

function trustBg(score: number): string {
  if (score >= 75) return "bg-emerald-500/10";
  if (score >= 50) return "bg-yellow-500/10";
  return "bg-red-500/10";
}

function trustLabel(score: number): string {
  if (score >= 80) return "Likely Legitimate";
  if (score >= 60) return "Uncertain";
  if (score >= 40) return "Suspicious";
  return "Likely Phishing / Spoofed";
}

function statusCardColor(status: CheckStatus): string {
  switch (status) {
    case "pass": return "border-emerald-500/20";
    case "warning": return "border-yellow-500/20";
    case "fail": return "border-red-500/20";
    case "neutral": return "border-line";
  }
}

function statusDotColor(status: CheckStatus): string {
  switch (status) {
    case "pass": return "bg-emerald-400";
    case "warning": return "bg-yellow-400";
    case "fail": return "bg-red-400";
    case "neutral": return "bg-muted";
  }
}

function statusTextColor(status: CheckStatus): string {
  switch (status) {
    case "pass": return "text-emerald-400";
    case "warning": return "text-yellow-400";
    case "fail": return "text-red-400";
    case "neutral": return "text-muted";
  }
}

/* ------------------------------------------------------------------ */
/*  Sample phishing headers                                            */
/* ------------------------------------------------------------------ */

const SAMPLE_HEADERS = `Return-Path: <bounce-3829@malicious-domain.xyz>
Received: from mail-gateway.example.com (mail-gateway.example.com [198.51.100.22])
\tby mx.recipient.com (Postfix) with ESMTPS id A1B2C3D4E5
\tfor <victim@recipient.com>; Mon, 15 Jan 2024 10:32:18 -0500
Received: from spoofed-server.malicious-domain.xyz (unknown [203.0.113.45])
\tby mail-gateway.example.com with ESMTP id F6G7H8I9J0
\tfor <victim@recipient.com>; Mon, 15 Jan 2024 10:32:15 -0500
Authentication-Results: mx.recipient.com;
\tspf=fail (sender IP is 203.0.113.45) smtp.mailfrom=malicious-domain.xyz;
\tdkim=fail header.d=paypal.com;
\tdmarc=fail header.from=paypal.com
From: PayPal Security <security@paypal.com>
Reply-To: urgent-verify@malicious-domain.xyz
To: victim@recipient.com
Subject: [URGENT] Your account has been limited - Action Required
Date: Mon, 15 Jan 2024 10:32:10 -0500
X-Mailer: PHPMailer 5.2.0
Received-SPF: fail (mx.recipient.com: domain of malicious-domain.xyz does not designate 203.0.113.45 as permitted sender)`;

/* ------------------------------------------------------------------ */
/*  How to find headers guide                                          */
/* ------------------------------------------------------------------ */

const HEADER_GUIDES = [
  {
    client: "Gmail",
    steps: 'Open the email, click the three dots menu (top-right), select "Show original".',
  },
  {
    client: "Outlook (Web)",
    steps: 'Open the email, click the three dots menu, select "View" then "View message source".',
  },
  {
    client: "Apple Mail",
    steps: 'Open the email, go to View menu, select "Message" then "All Headers".',
  },
  {
    client: "Thunderbird",
    steps: 'Open the email, go to View menu, select "Message Source" (Ctrl+U).',
  },
];

/* ------------------------------------------------------------------ */
/*  What to do based on findings                                       */
/* ------------------------------------------------------------------ */

function getActionItems(result: AnalysisResult): string[] {
  const items: string[] = [];

  if (result.trustScore < 40) {
    items.push("Do NOT click any links or download any attachments in this email.");
    items.push("Do NOT reply to this email or provide any personal information.");
    items.push("Report this email as phishing in your email client.");
    items.push("If you already clicked a link, change your passwords immediately and enable 2FA.");
  } else if (result.trustScore < 60) {
    items.push("Exercise caution with this email. Verify the sender through a separate channel before taking action.");
    items.push("Do not click links directly. Instead, navigate to the website manually.");
    items.push("Check the sender's email address carefully for subtle misspellings.");
  } else {
    items.push("This email appears legitimate based on the headers, but always stay vigilant.");
    items.push("Even legitimate-looking emails can be compromised. Verify unexpected requests.");
  }

  return items;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function EmailHeaderAnalyzer() {
  const [rawHeaders, setRawHeaders] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!rawHeaders.trim()) return;
    const analysisResult = analyzeHeaders(rawHeaders);
    setResult(analysisResult);
    setAnalyzed(true);
  }, [rawHeaders]);

  const handleLoadSample = useCallback(() => {
    setRawHeaders(SAMPLE_HEADERS);
    setResult(null);
    setAnalyzed(false);
  }, []);

  const handleClear = useCallback(() => {
    setRawHeaders("");
    setResult(null);
    setAnalyzed(false);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* ---- Left panel: input ---- */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Email Header Analyzer
        </p>
        <h3 className="mt-3 text-2xl font-bold text-ink">
          Detect Phishing &amp; Spoofing
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Paste the raw email headers from a suspicious email. We will analyze
          the authentication results, sender information, and email path to
          detect signs of phishing or spoofing. Everything runs in your browser.
        </p>

        {/* Textarea */}
        <div className="mt-6">
          <label htmlFor="header-input" className="sr-only">
            Email headers
          </label>
          <textarea
            id="header-input"
            value={rawHeaders}
            onChange={(e) => {
              setRawHeaders(e.target.value);
              if (analyzed) {
                setAnalyzed(false);
                setResult(null);
              }
            }}
            placeholder="Paste raw email headers here..."
            spellCheck={false}
            rows={12}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 font-mono text-xs leading-5 text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 resize-y"
          />
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!rawHeaders.trim()}
            className={cn(
              "rounded-xl px-6 py-3 text-sm font-semibold transition",
              !rawHeaders.trim()
                ? "cursor-not-allowed border border-line bg-card text-muted"
                : "bg-accent text-background hover:bg-accent-strong",
            )}
          >
            Analyze Headers
          </button>
          <button
            type="button"
            onClick={handleLoadSample}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-muted hover:text-ink hover:border-accent/30 transition"
          >
            Load Sample Phishing Email
          </button>
          {rawHeaders && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-muted hover:text-ink hover:border-red-500/30 transition"
            >
              Clear
            </button>
          )}
        </div>

        {/* Privacy notice */}
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3">
          <ShieldIcon className="mt-0.5 shrink-0 text-accent" />
          <p className="text-xs leading-5 text-muted">
            All analysis happens locally in your browser. No email data is sent
            to any server.
          </p>
        </div>

        {/* How to find headers */}
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="mt-4 flex items-center gap-2 text-xs font-medium text-accent hover:text-accent-strong transition"
        >
          <ChevronIcon open={showGuide} />
          How to find email headers
        </button>

        {showGuide && (
          <div className="mt-3 space-y-2">
            {HEADER_GUIDES.map((guide) => (
              <div
                key={guide.client}
                className="rounded-xl border border-line bg-surface px-4 py-3"
              >
                <p className="text-sm font-semibold text-ink">{guide.client}</p>
                <p className="mt-1 text-xs text-muted">{guide.steps}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---- Right panel: results ---- */}
      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Analysis Results
        </p>

        {!analyzed && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <HeaderIcon className="mb-4 text-muted/30" />
            <p className="text-lg font-medium text-muted/50">
              Paste headers and press Analyze
            </p>
            <p className="mt-2 text-sm text-muted/30">
              Analysis results will appear here
            </p>
          </div>
        )}

        {analyzed && result && (
          <div className="mt-5 space-y-4">
            {/* Trust score */}
            <div
              className={cn(
                "rounded-xl border p-5 text-center",
                trustBorder(result.trustScore),
                trustBg(result.trustScore),
              )}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Trust Score
              </p>
              <p className={cn("mt-2 text-5xl font-black", trustColor(result.trustScore))}>
                {result.trustScore}
                <span className="text-lg font-normal text-muted">/100</span>
              </p>
              <p className={cn("mt-1 text-sm font-semibold", trustColor(result.trustScore))}>
                {trustLabel(result.trustScore)}
              </p>
              {result.rawSubject && (
                <p className="mt-2 text-xs text-muted">
                  Subject: {result.rawSubject}
                </p>
              )}
            </div>

            {/* Red flags */}
            {result.redFlags.length > 0 && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                  Red Flags Detected
                </p>
                <div className="mt-2 space-y-1.5">
                  {result.redFlags.map((flag, i) => (
                    <p key={i} className="flex items-start gap-2 text-sm text-red-400">
                      <span className="mt-0.5 shrink-0">&#x2716;</span>
                      {flag}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Individual checks */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Header Checks
              </p>
              {result.checks.map((check, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-xl border bg-card p-4",
                    statusCardColor(check.status),
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                        statusDotColor(check.status),
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ink">
                          {check.label}
                        </p>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                            statusTextColor(check.status),
                          )}
                        >
                          {check.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-1 break-all font-mono text-xs text-muted/80">
                        {check.value}
                      </p>
                      <p className="mt-1.5 text-xs leading-5 text-muted">
                        {check.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Email path / hops */}
            {result.hops.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Email Path ({result.hops.length} hop{result.hops.length !== 1 ? "s" : ""})
                </p>
                <div className="space-y-0">
                  {result.hops.map((hop, i) => (
                    <div key={i} className="flex gap-3">
                      {/* Timeline connector */}
                      <div className="flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                        {i < result.hops.length - 1 && (
                          <div className="w-px flex-1 bg-accent/30" />
                        )}
                      </div>
                      <div className="mb-3 min-w-0 flex-1 rounded-xl border border-line bg-card p-3">
                        <p className="text-xs text-muted">
                          <span className="font-semibold text-ink">From:</span>{" "}
                          {hop.from}
                        </p>
                        <p className="text-xs text-muted">
                          <span className="font-semibold text-ink">By:</span>{" "}
                          {hop.by}
                        </p>
                        {hop.ip && (
                          <p className="text-xs text-muted">
                            <span className="font-semibold text-ink">IP:</span>{" "}
                            <span className="font-mono">{hop.ip}</span>
                          </p>
                        )}
                        {hop.timestamp && (
                          <p className="mt-1 text-xs text-muted/60">
                            {hop.timestamp}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What to do */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                What to do
              </p>
              {getActionItems(result).map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-muted"
                >
                  <span className="mt-0.5 shrink-0 text-accent">{i + 1}.</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function HeaderIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
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
