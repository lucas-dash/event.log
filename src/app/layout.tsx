import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import Navbar from "@/components/navbar";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Event Log",
    template: "%s | Event Log",
  },
  description: "Find events near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased bg-background dark:bg-background-dark text-copy dark:text-copy-dark transition-colors duration-200 ease-in-out",
          roboto.className,
        )}
      >
        <Navbar vertical />
        {children}
      </body>
    </html>
  );
}
