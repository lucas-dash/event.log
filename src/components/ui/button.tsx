import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-content hover:bg-primary/90 dark:bg-primary-dark dark:text-primary-content dark:hover:bg-primary-dark/90",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-800 dark:text-slate-50 dark:hover:bg-red-800/90",
        outline:
          "border border-border bg-white hover:bg-background hover:text-copy dark:border-border-dark dark:bg-secondary dark:hover:bg-secondary-light dark:hover:text-copy-dark",
        secondary:
          "bg-secondary text-secondary-content hover:bg-secondary/80 dark:bg-secondary-dark dark:text-secondary-content dark:hover:bg-secondary-dark/80",
        ghost:
          "hover:bg-slate-100 hover:text-copy dark:hover:bg-secondary-light dark:hover:text-copy-dark",
        link: "text-copy underline-offset-4 hover:underline dark:text-copy-dark",
        navlink:
          "bg-secondary-light text-secondary-content hover:bg-secondary-light hover:text-secondary-content dark:bg-secondary-dark dark:text-secondary-content dark:hover:bg-secondary-dark dark:hover:text-secondary-content",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
