import { NextResponse } from "next/server";
import dns from "node:dns";

const resolver = new dns.promises.Resolver();
resolver.setServers(["8.8.8.8", "1.1.1.1"]);

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

type DnsCheckResponse = {
  domain: string;
  spf: SpfResult;
  dmarc: DmarcResult;
  dkim: DkimResult;
  mx: MxResult;
  grade: string;
  score: number;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function extractDomain(input: string): string {
  let domain = input.trim().toLowerCase();
  // If it's an email, take the domain part
  if (domain.includes("@")) {
    domain = domain.split("@").pop() || "";
  }
  // Strip protocol
  domain = domain.replace(/^https?:\/\//, "");
  // Strip path
  domain = domain.split("/")[0];
  // Strip port
  domain = domain.split(":")[0];
  return domain;
}

function detectMailProvider(records: Array<{ exchange: string }>): string | null {
  const exchanges = records.map((r) => r.exchange.toLowerCase());
  for (const ex of exchanges) {
    if (ex.includes("google") || ex.includes("gmail")) return "Google Workspace";
    if (ex.includes("outlook") || ex.includes("microsoft")) return "Microsoft 365";
    if (ex.includes("protonmail") || ex.includes("proton")) return "ProtonMail";
    if (ex.includes("zoho")) return "Zoho Mail";
    if (ex.includes("mimecast")) return "Mimecast";
    if (ex.includes("barracuda")) return "Barracuda";
    if (ex.includes("pphosted") || ex.includes("proofpoint")) return "Proofpoint";
    if (ex.includes("securemx") || ex.includes("forcepoint")) return "Forcepoint";
    if (ex.includes("yahoodns") || ex.includes("yahoo")) return "Yahoo Mail";
    if (ex.includes("icloud") || ex.includes("apple")) return "Apple iCloud";
    if (ex.includes("fastmail")) return "Fastmail";
    if (ex.includes("godaddy") || ex.includes("secureserver")) return "GoDaddy";
    if (ex.includes("ovh")) return "OVH";
  }
  return null;
}

function analyzeSpf(txtRecords: string[][]): SpfResult {
  const flat = txtRecords.map((chunks) => chunks.join(""));
  const spfRecord = flat.find((r) => r.startsWith("v=spf1"));

  if (!spfRecord) {
    return {
      found: false,
      record: null,
      valid: false,
      tooPermissive: false,
      details: "No SPF record found. Anyone can send email pretending to be from this domain.",
    };
  }

  const tooPermissive = spfRecord.includes("+all");
  const hasAll = /[~\-?+]all/.test(spfRecord);
  const valid = spfRecord.startsWith("v=spf1") && hasAll;

  let details: string;
  if (tooPermissive) {
    details = "SPF record uses +all which allows ANY server to send email as this domain. This is extremely dangerous.";
  } else if (spfRecord.includes("~all")) {
    details = "SPF record uses ~all (softfail). Unauthorized emails may still be delivered. Consider using -all for strict enforcement.";
  } else if (spfRecord.includes("-all")) {
    details = "SPF record uses -all (hardfail). Only authorized servers can send email for this domain. This is the recommended configuration.";
  } else if (spfRecord.includes("?all")) {
    details = "SPF record uses ?all (neutral). This provides no protection. Consider using -all or ~all.";
  } else {
    details = "SPF record found but may not have a valid 'all' mechanism.";
  }

  return { found: true, record: spfRecord, valid, tooPermissive, details };
}

function analyzeDmarc(txtRecords: string[][]): DmarcResult {
  const flat = txtRecords.map((chunks) => chunks.join(""));
  const dmarcRecord = flat.find((r) => r.startsWith("v=DMARC1"));

  if (!dmarcRecord) {
    return {
      found: false,
      record: null,
      policy: null,
      details: "No DMARC record found. There is no policy telling receiving servers what to do with unauthenticated email.",
    };
  }

  const policyMatch = dmarcRecord.match(/;\s*p\s*=\s*(\w+)/);
  const policy = policyMatch ? policyMatch[1].toLowerCase() : null;

  let details: string;
  switch (policy) {
    case "reject":
      details = "DMARC policy is set to 'reject'. Unauthenticated emails will be rejected. This is the strongest configuration.";
      break;
    case "quarantine":
      details = "DMARC policy is set to 'quarantine'. Unauthenticated emails will be sent to spam. Consider upgrading to 'reject' for full protection.";
      break;
    case "none":
      details = "DMARC policy is set to 'none' (monitor only). Unauthenticated emails are still delivered normally. This provides visibility but no protection.";
      break;
    default:
      details = "DMARC record found but the policy could not be determined.";
  }

  return { found: true, record: dmarcRecord, policy, details };
}

async function checkDkim(domain: string): Promise<DkimResult> {
  const commonSelectors = [
    "google",
    "default",
    "selector1",
    "selector2",
    "k1",
    "mail",
    "dkim",
    "s1",
    "s2",
    "mandrill",
    "smtp",
    "cm",
    "protonmail",
    "protonmail2",
    "protonmail3",
  ];

  for (const selector of commonSelectors) {
    try {
      const records = await resolver.resolveTxt(`${selector}._domainkey.${domain}`);
      const flat = records.map((chunks) => chunks.join(""));
      const dkimRecord = flat.find((r) => r.includes("v=DKIM1") || r.includes("k=rsa") || r.includes("p="));

      if (dkimRecord) {
        return {
          found: true,
          selector,
          record: dkimRecord.length > 120 ? dkimRecord.substring(0, 120) + "..." : dkimRecord,
          details: `DKIM record found with selector '${selector}'. Email integrity can be verified.`,
        };
      }
    } catch {
      // Selector doesn't exist, try next
    }
  }

  return {
    found: false,
    selector: null,
    record: null,
    details: "No DKIM record detected for common selectors. DKIM may still be configured with a custom selector not checked here.",
  };
}

function calculateGrade(spf: SpfResult, dmarc: DmarcResult, dkim: DkimResult, mx: MxResult): { grade: string; score: number } {
  let score = 0;

  // SPF scoring (0-30)
  if (spf.found) {
    score += 10;
    if (spf.valid && !spf.tooPermissive) score += 10;
    if (spf.record?.includes("-all")) score += 10;
    else if (spf.record?.includes("~all")) score += 5;
  }

  // DMARC scoring (0-35)
  if (dmarc.found) {
    score += 10;
    if (dmarc.policy === "reject") score += 25;
    else if (dmarc.policy === "quarantine") score += 15;
    else if (dmarc.policy === "none") score += 5;
  }

  // DKIM scoring (0-25)
  if (dkim.found) {
    score += 25;
  }

  // MX scoring (0-10)
  if (mx.found) {
    score += 5;
    if (mx.provider) score += 5; // Known provider likely has good defaults
  }

  let grade: string;
  if (score >= 90) grade = "A";
  else if (score >= 75) grade = "B";
  else if (score >= 55) grade = "C";
  else if (score >= 35) grade = "D";
  else grade = "F";

  return { grade, score };
}

/* ------------------------------------------------------------------ */
/*  Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.domain !== "string" || !body.domain.trim()) {
    return NextResponse.json({ error: "A domain or email address is required." }, { status: 400 });
  }

  const domain = extractDomain(body.domain);

  if (!domain || domain.length < 3 || !domain.includes(".")) {
    return NextResponse.json({ error: "Invalid domain." }, { status: 400 });
  }

  try {
    // Run lookups in parallel
    const [mxRecordsRaw, txtRecordsRaw, dmarcTxtRaw, dkimResult] = await Promise.allSettled([
      resolver.resolveMx(domain),
      resolver.resolveTxt(domain),
      resolver.resolveTxt(`_dmarc.${domain}`),
      checkDkim(domain),
    ]);

    // MX
    const mxRecords = mxRecordsRaw.status === "fulfilled" ? mxRecordsRaw.value : [];
    const mx: MxResult = {
      found: mxRecords.length > 0,
      records: mxRecords
        .sort((a, b) => a.priority - b.priority)
        .map((r) => ({ exchange: r.exchange, priority: r.priority })),
      provider: mxRecords.length > 0 ? detectMailProvider(mxRecords) : null,
    };

    // SPF (from domain TXT records)
    const txtRecords = txtRecordsRaw.status === "fulfilled" ? txtRecordsRaw.value : [];
    const spf = analyzeSpf(txtRecords);

    // DMARC (from _dmarc subdomain TXT records)
    const dmarcTxt = dmarcTxtRaw.status === "fulfilled" ? dmarcTxtRaw.value : [];
    const dmarc = analyzeDmarc(dmarcTxt);

    // DKIM
    const dkim = dkimResult.status === "fulfilled"
      ? dkimResult.value
      : { found: false, selector: null, record: null, details: "DKIM check failed." };

    const { grade, score } = calculateGrade(spf, dmarc, dkim, mx);

    const response: DnsCheckResponse = {
      domain,
      spf,
      dmarc,
      dkim,
      mx,
      grade,
      score,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("DNS check error:", error);
    return NextResponse.json(
      { error: "Failed to perform DNS lookup. The domain may not exist or DNS is unreachable." },
      { status: 500 },
    );
  }
}
