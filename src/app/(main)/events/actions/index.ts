"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPopularEvents() {
  const supabase = createSupabaseServerClient();

  const { data: joined, error: joinedError } = await supabase
    .from("joined")
    .select("event_id");

  if (joinedError) throw new Error(joinedError.message);

  const { data: favorite, error: favoriteError } = await supabase
    .from("favorite")
    .select("event_id");

  if (favoriteError) throw new Error(favoriteError.message);

  const eventIdCountMap = joined.reduce<Record<string, number>>(
    (acc, event) => {
      acc[event.event_id] = (acc[event.event_id] || 0) + 1;
      return acc;
    },
    {},
  );

  favorite.forEach((event) => {
    eventIdCountMap[event.event_id] =
      (eventIdCountMap[event.event_id] || 0) + 1;
  });

  const mostPopularEventsById = Object.keys(eventIdCountMap);

  return mostPopularEventsById;
}

export type Options = {
  equalTo?: { cell: string; value: string };
  greaterThan?: { cell: string; value: string };
  lessThan?: { cell: string; value: string };
  tagId?: string[];
  search?: { cell: string; value: string };
  not?: { cell: string; filter: string; value: string };
  popular?: boolean;
  byDate?: boolean;
};

export async function getPaginatedFilteredEvents(
  page: number,
  options?: Options,
  pageLimit: number = 12,
) {
  const supabase = createSupabaseServerClient();

  const {
    equalTo,
    greaterThan,
    lessThan,
    tagId,
    search,
    not,
    popular,
    byDate = true,
  } = options || {};

  const start = (page - 1) * pageLimit;
  const end = start + pageLimit - 1;

  let query = supabase.from("event").select("*").range(start, end);

  if (popular) {
    const popularEventIds = await getPopularEvents();
    query = query
      .in("event_id", popularEventIds)
      .gt("date", new Date().toISOString());
  }

  if (tagId) {
    query = query.contains("tags", tagId);
  }

  if (equalTo) {
    query = query.eq(equalTo.cell, equalTo.value);
  }

  if (greaterThan) {
    query = query.gt(greaterThan.cell, greaterThan.value);
  }

  if (lessThan) {
    query = query.lt(lessThan.cell, lessThan.value);
  }

  if (byDate) {
    query = query.order("date", { ascending: true });
  }

  if (search) {
    query = query.ilike(search.cell, `%${search.value}%`);
  }

  if (not) {
    query = query.not(not.cell, not.filter, not.value);
  }

  const result = await query;

  return result;
}

export async function findRelatedEvents(eventId: string, tagId: string[]) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("event")
    .select("*")
    .contains("tags", tagId)
    .not("event_id", "eq", eventId)
    .limit(4);

  return result;
}

// DELETE ACTIONS

export async function deleteEvent(eventId: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("event")
    .delete()
    .eq("event_id", eventId)
    .single();

  revalidatePath("/events");

  return result;
}

export async function deleteCover(
  coverId: string,
  createdBy: string,
  coverName: string,
) {
  const supabase = createSupabaseServerClient();

  const coversError = await supabase
    .from("covers")
    .delete()
    .eq("id", coverId)
    .single();
  const storageError = await supabase.storage
    .from("covers")
    .remove([`${createdBy}/${coverId}/${coverName}`]);

  return { coversError, storageError };
}
