import type { Metadata } from "next";

import { PasswordBreachCheck } from "@/components/password-breach-check";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Password Breach Checker",
  description:
    "Check if your password has appeared in known data breaches. Uses k-anonymity — your password never leaves your browser.",
};

export default function PasswordBreachPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Has your password been leaked?"
          body="Enter any password and we check it against 700+ million breached passwords in real time. Your password is hashed locally and never leaves your browser — only the first 5 characters of the hash are sent to the API."
        />
        <div className="mt-12">
          <PasswordBreachCheck />
        </div>
      </div>
    </section>
  );
}
