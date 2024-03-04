import EventSection from "@/components/event-section";
import Tag from "@/components/tag";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { getEvents } from "@/lib/actions";
import { tags } from "@/lib/constants";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Events overview",
};

export default async function Dashboard() {
  const { data } = await getEvents();

  return (
    <section className="flex flex-col gap-5 py-5">
      <section>
        <div className="flex items-center justify-between">
          <Typography variant="h2">For you</Typography>
          <Button asChild size="icon" variant="ghost" className="rounded-full">
            <Link href="/create-event">
              <Plus />
            </Link>
          </Button>
        </div>

        <div />
      </section>

      <section className="h-full max-sm:overflow-x-scroll">
        <Typography variant="h3">Discover</Typography>
        <div className="flex items-center gap-2 my-1 ">
          {tags.map((tag) => {
            return (
              <Link
                href={`/events/${tag.id}`}
                key={tag.title}
                aria-label={tag.title}
                aria-describedby={`Show more ${tag.title} events`}
              >
                <Tag key={tag.title} {...tag} />
              </Link>
            );
          })}
        </div>
      </section>

      <EventSection label="Upcoming" events={data} />
      <EventSection label="Around you" events={data} />
    </section>
  );
}
