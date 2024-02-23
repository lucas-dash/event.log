import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { HTMLAttributes } from "react";

const typographyVariants = cva("text-copy dark:text-copy-dark", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-bold tracking-tight",
      h4: "scroll-m-20 text-xl font-bold tracking-tight",
      h5: "scroll-m-20 text-lg font-bold tracking-tight",
      body: "leading-7 [&:not(:first-child)]:mt-6 text-base",
      small: "text-sm font-medium leading-none",
      caption: "text-xs",
      muted: "text-copy-light dark:text-copy-light-dark text-sm",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

interface TypographyProps
  extends VariantProps<typeof typographyVariants>,
    HTMLAttributes<
      HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
    > {}

function Typography({ className, variant, ...props }: TypographyProps) {
  let Comp: keyof React.JSX.IntrinsicElements = "p";

  switch (variant) {
    case "h1":
      Comp = "h1";
      break;
    case "h2":
      Comp = "h2";
      break;
    case "h3":
      Comp = "h3";
      break;
    case "h4":
      Comp = "h4";
      break;
    case "h5":
      Comp = "h5";
      break;
    case "body":
      Comp = "p";
      break;
    case "small":
      Comp = "p";
      break;
    case "caption":
      Comp = "span";
      break;
    case "muted":
      Comp = "p";
      break;
    default:
      Comp = "p";
      break;
  }

  return (
    <Comp
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
