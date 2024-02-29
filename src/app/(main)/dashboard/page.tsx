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
      <Link href="/create-event">Create event</Link>
    </section>
  );
}
