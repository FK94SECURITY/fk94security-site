import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Resources",
  description:
    "Free tools, guides, templates, and open resources to improve your digital privacy and account hygiene.",
};

export default function FreeResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
