import { dashboardMap } from "@/lib/dashboard-map";
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
      <Typography
        variant="h1"
        className="text-3xl max-sm:text-center lg:text-4xl"
      >
        Hey ready for Tonight?
      </Typography>
      <ForyouCarousel />

      <section className="space-y-3 mb-5">
        <Typography variant="h3">Discover</Typography>
        <TagsRenderer />
      </section>

      {dashboardMap.map((sec) => {
        return (
          <EventSection
            key={sec.id}
            label={sec.label}
            link={sec.link}
            linkId={sec.id}
            type={sec.type}
            cellRow={sec.cellRow}
            script={sec.script}
          />
        );
      })}
    </section>
  );
}
