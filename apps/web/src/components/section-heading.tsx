import { cn } from "@nura/ui/lib/utils";

export function SectionHeading({
  label,
  title,
  description,
  align = "start",
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 text-2xl font-medium text-brand">
        <span className="h-px w-6 bg-brand" aria-hidden="true" />
        {label}
      </span>
      <h2 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base/relaxed text-muted-foreground sm:text-lg/relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
