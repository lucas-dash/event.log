import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Events overview",
};

export default function Dashboard() {
  return (
    <section className="h-full bg-green-500">
      <h1>Dashboard</h1>
    </section>
  );
}
