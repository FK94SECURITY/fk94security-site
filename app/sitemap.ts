import type { MetadataRoute } from "next";

import { guides } from "@/content/guides";
import { blogPosts } from "@/content/blog";

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
    "/free-resources/breach-checker",
    "/free-resources/security-score",
    "/free-resources/phone-lookup",
    "/free-resources/threat-model",
    "/free-resources/account-mapper",
    "/free-resources/mfa-compare",
    "/services",
    "/about",
    "/get-help",
    "/incident-help",
    "/guides",
    "/blog",
    "/book",
    "/open-resources",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: "2026-03-08",
    })),
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: "2026-03-08",
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
