import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Private 1:1 consulting for personal privacy, account hardening, incident response, and OPSEC.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
