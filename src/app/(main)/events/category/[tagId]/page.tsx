import { notFound } from "next/navigation";
import { tags } from "@/lib/constants";
import EventsInfiniteCollection from "@/components/event/events-infinite-collection";

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

  const options = {
    tagId: [decodeTitle],
  };

  return (
    <section className="py-10">
      <EventsInfiniteCollection
        label={`${decodeTitle} Category`}
        emptyStateTitle={`There are no events in ${decodeTitle} Category yet`}
        options={options}
      />
    </section>
  );
}
