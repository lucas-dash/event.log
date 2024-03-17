import { WithFilter, eventsFilter } from "@/components/event/event-section";
import EventCard from "@/components/event/event-card";
import { Badge } from "@/components/ui/badge";

type SectionPageSearchParams = {
  filter?: WithFilter["type"];
  cellRow?: string;
  script?: string;
};

type SectionIdProps = {
  params: {
    sectionId: string;
  };
  searchParams: SectionPageSearchParams;
};
export default async function SectionPage({
  params: { sectionId },
  searchParams,
}: SectionIdProps) {
  const { data, error } = await eventsFilter(
    searchParams.filter || "gt",
    searchParams.script,
    searchParams.cellRow,
    20,
  );

  if (error) throw new Error(error.message);

  return (
    <section className="py-10 space-y-4">
      <Badge variant="section" className="capitalize text-xl">
        {sectionId}
      </Badge>
      <section className="grid md:grid-cols-2 gap-3">
        {data?.map((event) => <EventCard key={event.event_id} {...event} />)}
      </section>
    </section>
  );
}
