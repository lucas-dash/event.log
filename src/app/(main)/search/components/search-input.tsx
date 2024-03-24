"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import SearchFilter from "./search-filter";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("title");
  const router = useRouter();

  const searchEvents = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams({ query, filter });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="w-full flex items itmes-center justify-center">
      <form onSubmit={searchEvents} className="flex items-center gap-3">
        <div className="flex items-center gap-2 h-10 w-max min-w-72 overflow-hidden rounded-xl bg-white dark:bg-secondary-light border border-border dark:border-border-dark px-1 py-2">
          <Label htmlFor="search">
            <SearchIcon className="flex-shrink-0 cursor-pointer" />
          </Label>
          <Input
            id="search"
            placeholder="Search events"
            className="w-full p-0 border-none outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search events"
          />
        </div>
        <SearchFilter filter={filter} setFilter={setFilter} />
      </form>
    </section>
  );
}
