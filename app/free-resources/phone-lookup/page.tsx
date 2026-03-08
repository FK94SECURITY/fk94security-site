import type { Metadata } from "next";

import { PhoneLookup } from "@/components/phone-lookup";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Phone Exposure Checker",
  description:
    "Check how exposed your phone number is across caller ID databases, data brokers, and social platforms. Learn how to remove yourself.",
};

export default function PhoneLookupPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="How exposed is your phone number?"
          body="Your phone number is probably listed in more databases than you think. This tool shows you where to check, how your name might appear, and how to remove yourself from caller ID and data broker services."
        />
        <div className="mt-12">
          <PhoneLookup />
        </div>
      </div>
    </section>
  );
}
