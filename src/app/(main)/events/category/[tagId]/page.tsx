import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/event/event-card";
import EmptyState from "@/components/empty-state";
import { tags } from "@/lib/constants";
import { getEventsByTagId } from "../../actions";

type TagPageProps = {
  params: {
    tagId: string;
  };
};

export function generateMetadata({ params: { tagId } }: TagPageProps) {
  const allTags = tags.find((tag) => tag.id === decodeURIComponent(tagId));

  if (!allTags) {
    return {
      title: "Category not found",
    };
  }

  const decodeTitle = decodeURIComponent(tagId).replace(/\b\w/g, (char) =>
    char.toUpperCase(),
  );

  return {
    title: `${decodeTitle} Category`,
    description: `Events in ${decodeTitle} Category`,
  };
}

export default async function TagPage({ params: { tagId } }: TagPageProps) {
  const decodeTitle = decodeURIComponent(tagId);

  const allTags = tags.find((tag) => tag.id === decodeTitle);

  if (!allTags) {
    notFound();
  }

  const { data: events, error } = await getEventsByTagId(
    decodeURIComponent(tagId),
  );

  if (error) throw new Error(error.message);

  return (
    <section className="py-10 space-y-4">
      <Badge
        variant="section"
        className="capitalize text-xl shadow-base dark:shadow-base-dark"
      >
        {decodeTitle} Category
      </Badge>
      <section
        className={`${events.length !== 0 ? "grid md:grid-cols-2 gap-3" : "flex items-center justify-center"}`}
      >
        {events.length === 0 ? (
          <EmptyState title="There are no events in this category yet" />
        ) : (
          events?.map((event) => <EventCard key={event.event_id} {...event} />)
        )}
      </section>
    </section>
  );
}
