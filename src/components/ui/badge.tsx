import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-border-dark dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-badge text-copy hover:bg-badge/80 dark:bg-badge-dark dark:text-copy-dark dark:hover:bg-badge-dark/80",
        secondary:
          "border-transparent bg-primary text-copy hover:bg-primary/80 dark:bg-primary-dark dark:text-copy-dark dark:hover:bg-primary-dark/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-800/80",
        outline: "text-slate-950 dark:text-slate-50",
        tag: "border-none bg-badge hover:bg-background text-copy dark:bg-badge-dark dark:hover:bg-secondary-light dark:text-copy-dark shadow-base dark:shadow-base-dark gap-2 py-1 px-2 text-sm font-bold",
        section:
          "border-none bg-primary dark:bg-primary-dark text-primary-content text-base font-bold tracking-tight px-3 py-1",
        calendar:
          "border-border bg-primary text-primary-content shadow-base dark:bg-primary-dark dark:text-primary-content-dark dark:border-border-dark dark:shadow-base-dark rounded-lg px-3 text-sm font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
