import EventSection from "@/components/event-section";
import TagsRenderer from "@/components/tags-renderer";
import { Typography } from "@/components/ui/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Events Dashboard",
};

export default async function Dashboard() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <Typography variant="h2">For you</Typography>
        <div>for you events</div>
      </section>

      <section className="h-full">
        <Typography variant="h3">Discover</Typography>
        <TagsRenderer />
      </section>

      <EventSection label="Upcoming" filter link type="greaterThan" />
      <EventSection label="Past events" filter type="lessThan" link />
    </section>
  );
}
