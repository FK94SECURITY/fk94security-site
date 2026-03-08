import type { Metadata } from "next";

import { BreachChecker } from "@/components/breach-checker";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Breach Checker",
  description:
    "Check if your email has appeared in known data breaches. Free, fast, and private. Powered by HaveIBeenPwned.",
};

export default function BreachCheckerPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Has your email been exposed in a data breach?"
          body="Enter your email to check if it appeared in known breaches. We show you which breaches, what was exposed, and what to do about it."
        />
        <div className="mt-12">
          <BreachChecker />
        </div>
      </div>
    </section>
  );
}
