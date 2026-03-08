import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the FK94 website, free resources, and consulting intake.",
};

export default function TermsPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-xl border border-line bg-card px-6 py-10 sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">Terms</p>
          <h1 className="mt-4 text-5xl font-bold leading-[0.96] text-ink sm:text-6xl">Simple site terms.</h1>
          <div className="mt-8 space-y-6 text-base leading-8 text-muted">
            <p>
              FK94 provides educational resources, general guidance, and consulting intake flows.
              Free content is informational and should not be treated as a guarantee, emergency
              response contract, or legal advice.
            </p>
            <p>
              Consulting work begins only after a scope is agreed privately. FK94 may decline cases
              that fall outside the project focus, require unsafe actions, or create unreasonable
              operational risk.
            </p>
            <p>
              Do not send passwords, seed phrases, private keys, or unnecessary sensitive data
              through website forms. If a case moves forward, safer communication methods can be
              arranged.
            </p>
            <p>
              These terms are a product placeholder and should be reviewed with legal counsel before
              the site is used commercially.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
