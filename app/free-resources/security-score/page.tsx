import type { Metadata } from "next";

import { SecurityScore } from "@/components/security-score";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Security Score",
  description:
    "Take a 2-minute security assessment and get a personalized score from 0-100 with specific recommendations to improve your security posture.",
};

export default function SecurityScorePage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="How secure are you? Get your score in 2 minutes."
          body="Answer 10 quick questions about your digital habits and get a personalized security score with specific recommendations. 100% client-side — your answers never leave your browser."
        />
        <div className="mt-12">
          <SecurityScore />
        </div>
      </div>
    </section>
  );
}
