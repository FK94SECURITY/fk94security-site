import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoMarkProps = {
  compact?: boolean;
  className?: string;
  inverted?: boolean;
};

export function LogoMark({ compact = false, className, inverted = false }: LogoMarkProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase", className)}
    >
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-2xl border text-sm shadow-[0_14px_30px_rgba(18,25,33,0.12)]",
          inverted ? "border-white/12 bg-sand text-ink" : "border-line bg-ink text-sand",
        )}
      >
        FK
      </span>
      {!compact ? (
        <span className="flex flex-col">
          <span className={cn("font-display text-base tracking-[0.28em]", inverted ? "text-sand" : "text-ink")}>
            FK94
          </span>
          <span
            className={cn(
              "text-[0.62rem] font-medium tracking-[0.3em]",
              inverted ? "text-sand/60" : "text-muted",
            )}
          >
            digital privacy
          </span>
        </span>
      ) : null}
    </Link>
  );
}
