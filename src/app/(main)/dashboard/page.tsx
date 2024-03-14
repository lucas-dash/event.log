import EventSection from "@/components/event/event-section";
import TagsRenderer from "@/components/tags-renderer";
import { Typography } from "@/components/ui/typography";
import { Metadata } from "next";
import ForyouCarousel from "./components/foryou-carousel";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Events Dashboard",
};

export default async function Dashboard() {
  return (
    <section className="flex flex-col gap-5 py-5">
      <ForyouCarousel />

      <section className="space-y-3 mb-5">
        <Typography variant="h3">Discover</Typography>
        <TagsRenderer />
      </section>

      <EventSection label="Popular" filter link type="popular" />
      <EventSection label="Upcoming" filter link type="greaterThan" />
      <EventSection label="Past events" filter type="lessThan" link />
    </section>
  );
}
