import EventsInfiniteCollection from "@/components/event/events-infinite-collection";
import { Options } from "../../actions";

type SectionIdProps = {
  params: {
    sectionId: string;
  };
  searchParams: { [key: string]: string };
};

export async function generateMetadata({
  params: { sectionId },
}: SectionIdProps) {
  const decodeTitle = decodeURIComponent(sectionId).replace(/\b\w/g, (char) =>
    char.toUpperCase(),
  );

  return {
    title: `${decodeTitle} Section`,
    description: `Events in ${decodeTitle} Section`,
  };
}

export default async function SectionPage({
  params: { sectionId },
  searchParams,
}: SectionIdProps) {
  const decodeTitle = decodeURIComponent(sectionId);

  const options: Options = JSON.parse(searchParams.options);

  return (
    <section className="py-10">
      <EventsInfiniteCollection
        label={`${decodeTitle} Events`}
        emptyStateTitle="Events not found"
        options={options}
      />
    </section>
  );
}
