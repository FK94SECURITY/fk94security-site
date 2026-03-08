import type { Metadata } from "next";

import { ThreatModel } from "@/components/threat-model";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Threat Model Generator",
  description:
    "Answer a few questions about your profile and get a personalized threat model with prioritized action steps. Free and private.",
};

export default function ThreatModelPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Generate your personalized threat model."
          body="Not everyone faces the same risks. Answer 7 questions about your profile, habits, and concerns to get a tailored threat assessment with prioritized steps to protect yourself."
        />
        <div className="mt-12">
          <ThreatModel />
        </div>
      </div>
    </section>
  );
}
