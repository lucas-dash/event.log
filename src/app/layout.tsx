import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import { ThemeProvider } from "@/lib/providers/theme-provider";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Event.log",
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
          "antialiased bg-background dark:bg-background-dark text-copy dark:text-copy-dark transition-colors duration-200 ease-in-out min-h-screen relative ",
          roboto.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="overflow-hidden absolute inset-0 -z-40">
            <div className="absolute -top-28 -left-52 bg-primary-dark h-[420px] md:h-[480px] w-[420px] md:w-[480px] rounded-full -z-40" />
            <div className="absolute -bottom-28 -right-52 bg-secondary-dark h-[420px] md:h-[480px] w-[420px] md:w-[480px] rounded-full -z-40" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
