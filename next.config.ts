import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/platform",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/free-resources",
        permanent: true,
      },
      {
        source: "/audit",
        destination: "/free-resources/exposure-self-check",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/get-help",
        permanent: true,
      },
      {
        source: "/book-review",
        destination: "/get-help",
        permanent: true,
      },
      {
        source: "/checklist",
        destination: "/free-resources/opsec-checklist",
        permanent: true,
      },
      {
        source: "/harden",
        destination: "/free-resources/account-hardening-planner",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
