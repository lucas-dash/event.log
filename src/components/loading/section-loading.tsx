/* eslint-disable react/no-array-index-key */
import { Skeleton } from "../ui/skeleton";
import EventCardLoading from "./event-card-loading";

export default function SectionLoading() {
  return (
    <div className="min-h-main w-full space-y-5">
      <Skeleton className="h-10 w-32 rounded-full" />
      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <EventCardLoading key={i} />
        ))}
      </section>
    </div>
  );
}
