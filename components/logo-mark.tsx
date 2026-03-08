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
          "flex h-10 w-10 items-center justify-center rounded-xl border text-sm",
          inverted ? "border-line bg-ink text-accent" : "border-accent/30 bg-accent text-black",
        )}
      >
        FK
      </span>
      {!compact ? (
        <span className="flex flex-col">
          <span className={cn("text-base font-bold tracking-[0.28em]", inverted ? "text-ink" : "text-ink")}>
            FK94
          </span>
          <span
            className={cn(
              "text-[0.62rem] font-medium tracking-[0.3em]",
              inverted ? "text-muted" : "text-muted",
            )}
          >
            digital privacy
          </span>
        </span>
      ) : null}
    </Link>
  );
}
