import { tags } from "@/lib/tags";
import Link from "next/link";
import Tag from "./tag";

type TagsRendererProps = {
  eventTags?: string[] | string;
};

export default function TagsRenderer({ eventTags }: TagsRendererProps) {
  const filteredTags = tags.filter((tag) => {
    if (typeof eventTags !== "string" && eventTags) {
      return eventTags.some((eventTag) => eventTag === tag.id);
    }
    if (typeof eventTags === "string") {
      return eventTags === tag.id;
    }
    return tag;
  });

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filteredTags.map((tag) => {
        return (
          <Link
            href={`/events/category/${tag.id}`}
            key={tag.title}
            aria-label={tag.title}
            aria-describedby={`Show more ${tag.title} events`}
          >
            <Tag key={tag.title} {...tag} />
          </Link>
        );
      })}
    </div>
  );
}
