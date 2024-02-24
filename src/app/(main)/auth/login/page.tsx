import { Metadata } from "next";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import OAuthForm from "../components/oauth-form";
import LoginForm from "../components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Login() {
  const { user } = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <section className="flex-1 flex items-center justify-center">
      <article className="min-w-72 sm:w-4/5 max-w-[420px] mx-auto flex flex-col items-center gap-4 bg-foreground/80 dark:bg-foreground-dark/80 rounded-xl border border-border dark:border-border-dark p-5 shadow-base dark:shadow-base-dark">
        <div>
          <Typography variant="h3" className="text-center">
            Welcome Back
          </Typography>
          <Typography variant="muted" className="text-center">
            Enter your email to sign in to your accounts
          </Typography>
        </div>
        <OAuthForm />
        <LoginForm />
        <Button asChild variant="link" size="sm">
          <Link href="/auth/signup">Don&apos;t have an account? Sign up</Link>
        </Button>
      </article>
    </section>
  );
}
