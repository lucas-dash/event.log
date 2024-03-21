import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Search } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import CalendarInfiniteScroll from "./components/calendar-infinite-scroll";

export const metadata: Metadata = {
  title: "Events",
  description: "Events overview",
};

export default async function Events() {
  return (
    <section className="py-5">
      <div className="flex items-center justify-between py-5">
        <Typography variant="h2">Events</Typography>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/search">
            <Search />
            <span className="sr-only">Search Events</span>
          </Link>
        </Button>
      </div>

      <CalendarInfiniteScroll />
    </section>
  );
}
