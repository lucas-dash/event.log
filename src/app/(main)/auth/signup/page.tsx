import { Typography } from "@/components/ui/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Sign up for an account to get started with creating and discovering events in your area.",
};

export default function SignUp() {
  return (
    <section className="flex-1">
      <Typography variant="h1" className="text-center">
        Sign Up
      </Typography>
    </section>
  );
}
