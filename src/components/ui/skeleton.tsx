import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-foreground dark:bg-foreground-dark",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
