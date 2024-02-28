import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Events overview",
};

export default async function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>
    </section>
  );
}
