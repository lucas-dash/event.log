"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type NavLinkProps = {
  href: string;
  label: string;
  icon: React.JSX.Element;
} & HTMLAttributes<HTMLAnchorElement>;

export default function NavLink({
  href,
  label,
  icon,
  className,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      asChild
      variant={active ? "navlink" : "ghost"}
      size="icon"
      className={!active ? "dark:hover:bg-foreground-dark" : ""}
    >
      <Link
        href={href}
        aria-describedby={`link to ${label}`}
        className={cn(className, "")}
        {...props}
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
  );
}
