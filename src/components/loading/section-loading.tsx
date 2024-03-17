/* eslint-disable react/no-array-index-key */
import { Skeleton } from "../ui/skeleton";
import EventCardLoading from "./event-card-loading";

export default function SectionLoading() {
  return (
    <div className="min-h-main space-y-4 w-full">
      <Skeleton className="h-8 w-32 rounded-full" />
      <section className="grid md:grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardLoading key={i} />
        ))}
      </section>
    </div>
  );
}
