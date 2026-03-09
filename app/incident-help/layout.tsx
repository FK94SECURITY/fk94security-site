import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Incident Help",
  description:
    "Calm first-response guidance for suspicious logins, phishing scares, access loss, and other account incidents.",
};

export default function IncidentHelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
