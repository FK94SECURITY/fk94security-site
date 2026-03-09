import type { Metadata } from "next";

import { DnsSecurityScanner } from "@/components/dns-security-scanner";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Email Domain Security Scanner",
  description:
    "Scan any email domain for SPF, DMARC, DKIM, and MX records. See if your email provider is properly configured against spoofing.",
};

export default function DnsScannerPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Is your email domain secure against spoofing?"
          body="Enter your email address or domain and we automatically scan SPF, DMARC, DKIM, and MX records. Find out if your email provider is properly configured to prevent impersonation attacks."
        />
        <div className="mt-12">
          <DnsSecurityScanner />
        </div>
      </div>
    </section>
  );
}
