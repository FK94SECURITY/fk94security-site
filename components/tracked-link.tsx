"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  eventName: AnalyticsEventName;
  eventProps?: Record<string, string>;
};

export function TrackedLink({
  children,
  className,
  eventName,
  eventProps,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      className={className}
      onClick={() => {
        trackEvent(eventName, eventProps);
      }}
    >
      {children}
    </Link>
  );
}
