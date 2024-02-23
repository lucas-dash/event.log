import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Login() {
  return (
    <section className="flex-1">
      <h1>Welcome Back</h1>
      <p>Enter your email to sign in to your account</p>
    </section>
  );
}
