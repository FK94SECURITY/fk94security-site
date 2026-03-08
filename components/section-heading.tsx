import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="font-display text-sm uppercase tracking-[0.32em] text-brand">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-muted sm:text-lg">{body}</p>
    </div>
  );
}
