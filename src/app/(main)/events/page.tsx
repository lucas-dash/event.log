import EventCard from "@/components/event/event-card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { getEvents } from "@/lib/actions";
import { Search } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description: "Events overview",
};

export default async function Events() {
  const { data } = await getEvents();

  return (
    <section>
      <div className="flex items-center justify-between">
        <Typography variant="h2">Events</Typography>
        <Link href="/search">
          <Button variant="ghost" size="icon">
            <Search />
          </Button>
        </Link>
      </div>

      <section className="grid sm:grid-cols-2 gap-4 py-3">
        {data?.map((event) => <EventCard key={event.event_id} {...event} />)}
      </section>
    </section>
  );
}
