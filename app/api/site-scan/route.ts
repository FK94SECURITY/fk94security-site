import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ObservatoryAnalysis = {
  scan_id: number;
  state: string;
  grade: string;
  score: number;
  tests_failed: number;
  tests_passed: number;
  tests_quantity: number;
};

type ObservatoryTest = {
  name: string;
  pass: boolean;
  result: string;
  score_description: string;
  score_modifier: number;
};

type ObservatoryTests = Record<string, ObservatoryTest>;

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
/*  Test metadata (plain-language explanations)                        */
/* ------------------------------------------------------------------ */

const TEST_META: Record<
  string,
  { label: string; description: string; whyItMatters: string; howToFix: string }
> = {
  "content-security-policy": {
    label: "Content-Security-Policy",
    description:
      "Controls which resources the browser is allowed to load for a page, reducing XSS and data injection risks.",
    whyItMatters:
      "Without CSP, attackers can inject scripts that steal user data, hijack sessions, or deface your site.",
    howToFix:
      "Add a Content-Security-Policy header. Start with a report-only policy, then enforce it. Example: Content-Security-Policy: default-src 'self'; script-src 'self'",
  },
  "strict-transport-security": {
    label: "Strict-Transport-Security (HSTS)",
    description:
      "Tells browsers to only connect to your site over HTTPS, preventing protocol downgrade attacks.",
    whyItMatters:
      "Without HSTS, attackers on the same network can intercept the initial HTTP request and redirect users to a malicious site.",
    howToFix:
      "Add the header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
  },
  "x-content-type-options": {
    label: "X-Content-Type-Options",
    description:
      "Prevents browsers from MIME-sniffing a response away from the declared content type.",
    whyItMatters:
      "MIME confusion can let attackers trick the browser into executing malicious files as scripts.",
    howToFix: "Add the header: X-Content-Type-Options: nosniff",
  },
  "x-frame-options": {
    label: "X-Frame-Options",
    description:
      "Controls whether your site can be embedded in iframes, preventing clickjacking attacks.",
    whyItMatters:
      "Without this, attackers can overlay invisible frames on their pages to trick users into clicking on your site's buttons.",
    howToFix:
      "Add the header: X-Frame-Options: DENY (or SAMEORIGIN if you need to iframe your own content).",
  },
  "x-xss-protection": {
    label: "X-XSS-Protection",
    description:
      "A legacy header that enabled the browser's built-in XSS filter. Modern browsers rely on CSP instead.",
    whyItMatters:
      "While largely deprecated, some older browsers still respect it. Its absence is a minor signal of incomplete hardening.",
    howToFix:
      "Add the header: X-XSS-Protection: 0 (modern recommendation) or rely on a strong CSP instead.",
  },
  "referrer-policy": {
    label: "Referrer-Policy",
    description:
      "Controls how much referrer information is included with navigation requests.",
    whyItMatters:
      "Without it, full URLs (including query parameters with tokens or sensitive data) may leak to third-party sites.",
    howToFix:
      "Add the header: Referrer-Policy: strict-origin-when-cross-origin",
  },
  cookies: {
    label: "Cookies (Secure, HttpOnly, SameSite)",
    description:
      "Checks whether cookies are set with proper security flags to prevent theft and misuse.",
    whyItMatters:
      "Insecure cookies can be stolen via XSS or man-in-the-middle attacks, leading to session hijacking.",
    howToFix:
      "Set all cookies with Secure, HttpOnly, and SameSite=Lax (or Strict). Example: Set-Cookie: session=abc; Secure; HttpOnly; SameSite=Lax",
  },
  redirection: {
    label: "HTTP to HTTPS Redirect",
    description:
      "Checks if HTTP requests are properly redirected to HTTPS.",
    whyItMatters:
      "If HTTP traffic is not redirected, users may accidentally browse over an insecure connection.",
    howToFix:
      "Configure your server or CDN to 301 redirect all HTTP requests to their HTTPS equivalents.",
  },
  "subresource-integrity": {
    label: "Subresource Integrity (SRI)",
    description:
      "Ensures that resources loaded from CDNs have not been tampered with by verifying a cryptographic hash.",
    whyItMatters:
      "If a CDN is compromised, SRI prevents tampered scripts or styles from executing on your site.",
    howToFix:
      'Add integrity attributes to <script> and <link> tags: <script src="..." integrity="sha384-..." crossorigin="anonymous">',
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function extractDomain(input: string): string {
  let cleaned = input.trim().toLowerCase();
  // Remove protocol
  cleaned = cleaned.replace(/^https?:\/\//, "");
  // Remove path / query / hash
  cleaned = cleaned.split("/")[0];
  cleaned = cleaned.split("?")[0];
  cleaned = cleaned.split("#")[0];
  // Remove port
  cleaned = cleaned.split(":")[0];
  return cleaned;
}

function isValidDomain(domain: string): boolean {
  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(
    domain,
  );
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ------------------------------------------------------------------ */
/*  Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.url !== "string" || body.url.trim().length === 0) {
    return NextResponse.json(
      { error: "A URL or domain is required." },
      { status: 400 },
    );
  }

  const domain = extractDomain(body.url);

  if (!isValidDomain(domain)) {
    return NextResponse.json(
      { error: "Invalid domain format. Enter a domain like example.com." },
      { status: 400 },
    );
  }

  try {
    // Step 1: Initiate a scan on Mozilla Observatory
    const initiateResp = await fetch(
      `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${encodeURIComponent(domain)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "FK94Security-WebScanner/1.0",
        },
        body: "hidden=true&rescan=true",
      },
    );

    if (!initiateResp.ok) {
      return NextResponse.json({
        domain,
        grade: "?",
        score: 0,
        testsPassed: 0,
        testsFailed: 0,
        testsTotal: 0,
        tests: [],
        scanError: true,
        errorMessage: `Observatory returned status ${initiateResp.status}. The site may be unreachable or blocked.`,
      } satisfies ScanResult);
    }

    // Step 2: Poll until scan completes (max 30 seconds)
    let analysis: ObservatoryAnalysis | null = null;

    for (let attempt = 0; attempt < 15; attempt++) {
      await sleep(2000);

      const pollResp = await fetch(
        `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${encodeURIComponent(domain)}`,
        {
          method: "GET",
          headers: { "User-Agent": "FK94Security-WebScanner/1.0" },
        },
      );

      if (!pollResp.ok) continue;

      const data = (await pollResp.json()) as ObservatoryAnalysis;

      if (data.state === "FINISHED") {
        analysis = data;
        break;
      }

      if (data.state === "FAILED" || data.state === "ABORTED") {
        return NextResponse.json({
          domain,
          grade: "?",
          score: 0,
          testsPassed: 0,
          testsFailed: 0,
          testsTotal: 0,
          tests: [],
          scanError: true,
          errorMessage: "The scan failed. The target site may be unreachable.",
        } satisfies ScanResult);
      }
    }

    if (!analysis) {
      return NextResponse.json({
        domain,
        grade: "?",
        score: 0,
        testsPassed: 0,
        testsFailed: 0,
        testsTotal: 0,
        tests: [],
        scanError: true,
        errorMessage: "Scan timed out. Please try again in a few minutes.",
      } satisfies ScanResult);
    }

    // Step 3: Fetch individual test results
    const testsResp = await fetch(
      `https://http-observatory.security.mozilla.org/api/v1/getScanResults?scan=${analysis.scan_id}`,
      {
        headers: { "User-Agent": "FK94Security-WebScanner/1.0" },
      },
    );

    let testDetails: TestDetail[] = [];

    if (testsResp.ok) {
      const rawTests = (await testsResp.json()) as ObservatoryTests;

      testDetails = Object.entries(rawTests).map(([key, test]) => {
        const meta = TEST_META[key];
        return {
          name: key,
          label: meta?.label ?? key,
          pass: test.pass,
          result: test.result,
          description: meta?.description ?? "",
          whyItMatters: meta?.whyItMatters ?? "",
          howToFix: meta?.howToFix ?? "",
        };
      });

      // Sort: failed first, then passed
      testDetails.sort((a, b) => {
        if (a.pass === b.pass) return 0;
        if (a.pass === false) return -1;
        return 1;
      });
    }

    const result: ScanResult = {
      domain,
      grade: analysis.grade || "?",
      score: Math.max(0, analysis.score ?? 0),
      testsPassed: analysis.tests_passed,
      testsFailed: analysis.tests_failed,
      testsTotal: analysis.tests_quantity,
      tests: testDetails,
      scanError: false,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Site scan error:", error);
    return NextResponse.json({
      domain,
      grade: "?",
      score: 0,
      testsPassed: 0,
      testsFailed: 0,
      testsTotal: 0,
      tests: [],
      scanError: true,
      errorMessage: "An unexpected error occurred. Please try again.",
    } satisfies ScanResult);
  }
}
