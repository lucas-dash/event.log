import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Get started with creating and discovering events in your area.",
};

export default function AuthHome() {
  return (
    <section className="min-h-main flex flex-col items-center gap-12 justify-center ">
      <Typography variant="h1" className="text-center">
        Discover great events in your area
      </Typography>
      <div className="flex gap-4">
        <Button variant="secondary" asChild>
          <Link href="/auth/signup">Get Started</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </section>
  );
}
