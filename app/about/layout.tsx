import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "FK94 Security: practical privacy guidance, free tools, and private 1:1 consulting for people who want better defaults.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
