import type { Metadata } from "next";

import { PasswordAnalyzer } from "@/components/password-analyzer";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Password Strength Analyzer",
  description:
    "A free, client-side password analyzer that checks strength, detects common patterns, and teaches you why your password is weak. Nothing leaves your browser.",
};

export default function PasswordAnalyzerPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="See exactly why a password is weak — and how to fix it."
          body="This analyzer checks length, character variety, common patterns, keyboard walks, dictionary words, and more. It calculates real entropy and estimates crack time. Your password never leaves your browser."
        />
        <div className="mt-12">
          <PasswordAnalyzer />
        </div>
      </div>
    </section>
  );
}
