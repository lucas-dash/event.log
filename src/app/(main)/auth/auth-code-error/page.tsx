import { Typography } from "@/components/ui/typography";

export default function AuthError() {
  return (
    <section className="h-full flex flex-col items-center justify-center">
      <Typography variant="h2" className="text-center">
        Failed to sign up with Oauth!
      </Typography>
      <Typography variant="h3" className="text-center">
        Try it again!
      </Typography>
    </section>
  );
}
