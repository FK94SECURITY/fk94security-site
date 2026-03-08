export const analyticsEvents = {
  heroFree: "hero_free_resources_click",
  heroReview: "hero_book_review_click",
  resourceOpen: "resource_open",
  guideOpen: "guide_open",
  blogOpen: "blog_open",
  serviceOpen: "service_cta_click",
  intakeSubmit: "intake_submit",
  urgentHelp: "urgent_help_click",
  githubOpen: "open_resource_repo_click",
  bookingSubmit: "booking_submit",
  floatingWidget: "floating_widget_click",
} as const;

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents];

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    umami?: {
      track: (event: string, data?: Record<string, string>) => void;
    };
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(name: AnalyticsEventName, props?: Record<string, string>) {
  if (typeof window === "undefined") {
    return;
  }

  window.plausible?.(name, props ? { props } : undefined);
  window.umami?.track(name, props);
  window.dataLayer?.push({ event: name, ...props });
}
