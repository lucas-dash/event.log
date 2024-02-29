import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Events overview",
};

export default async function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>
      <Button asChild size="icon" variant="secondary">
        <Link href="/create-event">
          <Plus />
        </Link>
      </Button>
    </section>
  );
}
