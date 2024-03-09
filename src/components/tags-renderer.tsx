import { tags } from "@/lib/constants";
import Link from "next/link";
import Tag from "./tag";

type TagsRendererProps = {
  eventTags?: string[];
};

export default function TagsRenderer({ eventTags }: TagsRendererProps) {
  const filteredTags = tags.filter((tag) =>
    eventTags ? eventTags.some((eventTag) => eventTag === tag.id) : true,
  );

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filteredTags.map((tag) => {
        return (
          <Link
            href={`/events/tag/${tag.id}`}
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
