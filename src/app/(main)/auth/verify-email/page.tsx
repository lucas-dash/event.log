import { Typography } from "@/components/ui/typography";

export default function VerifyEmail() {
  return (
    <section className="flex-1 flex items-center justify-center flex-col px-5">
      <Typography variant="h2">Verify Email</Typography>
      <Typography className="text-center text-base" variant="muted">
        We have sent you an email to verify your account. Please check your
        inbox and click the link to verify your account.
      </Typography>
    </section>
  );
}
