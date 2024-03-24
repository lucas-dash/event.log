import EventsInfiniteCollection from "@/components/event/events-infinite-collection";
import SearchInput from "./components/search-input";

type SearchProps = {
  searchParams: { [key: string]: string };
};

export default function Search({ searchParams }: SearchProps) {
  return (
    <section className="py-10">
      <SearchInput />
      {searchParams.query && (
        <EventsInfiniteCollection
          emptyStateTitle="No events found"
          label="Results"
          options={{
            search: { cell: searchParams.filter, value: searchParams.query },
          }}
        />
      )}
    </section>
  );
}
