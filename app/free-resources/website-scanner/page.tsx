import type { Metadata } from "next";

import { WebsiteScanner } from "@/components/website-scanner";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Website Security Scanner",
  description:
    "Scan any website for security headers, HTTPS configuration, and common vulnerabilities. Free, powered by Mozilla Observatory.",
};

export default function WebsiteScannerPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="How secure is that website?"
          body="Enter any URL and we scan it for security headers, HTTPS configuration, content security policies, and more. Get a letter grade (A+ to F) with specific recommendations to improve. Powered by Mozilla Observatory."
        />
        <div className="mt-12">
          <WebsiteScanner />
        </div>
      </div>
    </section>
  );
}
