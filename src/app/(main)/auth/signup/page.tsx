import { Metadata } from "next";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import SignUpForm from "../components/signup-form";
import OAuthForm from "../components/oauth-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Sign up for an account to get started with creating and discovering events in your area.",
};

export default async function SignUp() {
  const { user } = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <section className="flex-1 flex items-center justify-center mb-5">
      <article className="min-w-72 w-4/5 max-w-[420px] mx-auto flex flex-col items-center gap-4 bg-foreground/80 dark:bg-foreground-dark/80 rounded-xl border border-border dark:border-border-dark p-4 sm:p-5 shadow-base dark:shadow-base-dark">
        <div>
          <Typography variant="h3" className="text-center">
            Create an account
          </Typography>
          <Typography variant="muted" className="text-center">
            Enter your email below to create your account
          </Typography>
        </div>
        <OAuthForm />
        <SignUpForm />
        <Button asChild variant="link" size="sm">
          <Link href="/auth/login">Already have an account? Login</Link>
        </Button>
      </article>
    </section>
  );
}
