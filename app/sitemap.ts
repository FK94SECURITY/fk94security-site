import type { MetadataRoute } from "next";

import { guides } from "@/content/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fk94security.com";
  const staticRoutes = [
    "",
    "/free-resources",
    "/free-resources/opsec-checklist",
    "/free-resources/account-hardening-planner",
    "/free-resources/incident-triage",
    "/free-resources/exposure-self-check",
    "/free-resources/password-analyzer",
    "/free-resources/phishing-quiz",
    "/free-resources/device-hardening",
    "/services",
    "/about",
    "/get-help",
    "/incident-help",
    "/guides",
    "/open-resources",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: "2026-03-07",
    })),
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: "2026-03-07",
    })),
  ];
}
