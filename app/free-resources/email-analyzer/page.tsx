import type { Metadata } from "next";

import { EmailHeaderAnalyzer } from "@/components/email-header-analyzer";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Email Header Analyzer",
  description:
    "Paste email headers from a suspicious message to detect spoofing, trace the sender, and verify authentication. 100% client-side.",
};

export default function EmailAnalyzerPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Analyze suspicious email headers."
          body="Paste the raw headers from any email and we will trace its path, check SPF/DKIM/DMARC authentication, detect sender mismatches, and flag red flags. Everything runs in your browser — nothing is sent to our servers."
        />
        <div className="mt-12">
          <EmailHeaderAnalyzer />
        </div>
      </div>
    </section>
  );
}
