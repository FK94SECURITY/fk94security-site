import type { Metadata } from "next";

import { PhishingQuiz } from "@/components/phishing-quiz";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Phishing Detection Quiz",
  description:
    "Test your ability to spot phishing emails, scam texts, and social engineering attacks with 10 realistic scenarios.",
};

export default function PhishingQuizPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Can you spot the phishing attempt?"
          body="Ten realistic scenarios covering fake emails, scam texts, and social engineering. For each one, decide if it is legitimate or phishing -- then learn exactly what to look for."
        />
        <div className="mt-12">
          <PhishingQuiz />
        </div>
      </div>
    </section>
  );
}
