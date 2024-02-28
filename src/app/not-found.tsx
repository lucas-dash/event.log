import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col gap-5 items-center justify-center">
      <Image
        src="/notfound.svg"
        alt="not found image"
        width={300}
        height={300}
      />
      <Typography variant="h1">404 Error</Typography>

      <Typography variant="muted" className="text-xl font-medium">
        Page not found
      </Typography>

      <div className="flex items-center justify-center">
        <Button asChild>
          <Link href="/dashboard">Go Home</Link>
        </Button>
      </div>
    </section>
  );
}
