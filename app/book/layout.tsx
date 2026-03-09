import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a 1:1 Session",
  description:
    "Schedule a private 1:1 security consultation. Account hardening, incident response, OPSEC advisory, and more.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
