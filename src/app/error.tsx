"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  let rateError = "";
  if (error.message === "Rate limit") {
    rateError = "You have exceeded the rate limit. Please try again later.";
  }

  return (
    <section className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <Image src="/error.svg" alt="Error image" width={300} height={300} />
      <Typography variant="h2">Something went wrong!</Typography>
      <Typography variant="muted" className="text-xl font-medium">
        {rateError || error.message}
      </Typography>
      <div className="flex items-center gap-4">
        {!rateError && (
          <Button variant="default" onClick={() => reset()}>
            Try again
          </Button>
        )}
        <Button variant="secondary" asChild>
          <Link href="/dashboard">Go Home</Link>
        </Button>
      </div>
    </section>
  );
}
