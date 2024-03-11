import EventInfiniteScroll from "@/components/event/event-infinite-scroll";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Search } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description: "Events overview",
};

export default async function Events() {
  return (
    <section className="py-5">
      <div className="flex items-center justify-between">
        <Typography variant="h2">Events</Typography>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/search">
            <Search />
            <span className="sr-only">Search Events</span>
          </Link>
        </Button>
      </div>

      <EventInfiniteScroll />
    </section>
  );
}
