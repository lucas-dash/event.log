"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-3xl font-bold">Something went wrong!</h2>
        <p>{error.message}</p>
        <Button variant="default" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </section>
  );
}
