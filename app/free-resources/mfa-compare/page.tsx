import type { Metadata } from "next";

import { MfaCompare } from "@/components/mfa-compare";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "MFA Comparison Guide",
  description:
    "Compare SMS, authenticator apps, push notifications, and hardware keys side by side. Find the best MFA method for your needs.",
};

export default function MfaComparePage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Which MFA method is right for you?"
          body="Not all two-factor authentication is equal. Compare SMS codes, authenticator apps, push notifications, and hardware security keys side by side to find what works for your situation."
        />
        <div className="mt-12">
          <MfaCompare />
        </div>
      </div>
    </section>
  );
}
