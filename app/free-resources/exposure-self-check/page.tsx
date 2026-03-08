import type { Metadata } from "next";

import { ExposureSelfCheck } from "@/components/exposure-self-check";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Exposure Self-Check",
  description: "Self-assessment for account dependencies, identity overlap, and avoidable digital exposure.",
};

export default function ExposureSelfCheckPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="A self-check for recovery overlap, weak defaults, and public exposure."
          body="This is not a scan. It is a guided self-assessment to help you notice dependencies and habits that deserve cleanup."
        />
        <div className="mt-12">
          <ExposureSelfCheck />
        </div>
      </div>
    </section>
  );
}
