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

  const eventIdCountMap: Record<string, number> = {};

  joined.forEach((event) => {
    eventIdCountMap[event.event_id] =
      (eventIdCountMap[event.event_id] || 0) + 1;
  });

  favorite.forEach((event) => {
    eventIdCountMap[event.event_id] =
      (eventIdCountMap[event.event_id] || 0) + 1;
  });

  const mostPopularEventsById = Object.keys(eventIdCountMap);

  return mostPopularEventsById;
}

export type Options = {
  popular?: boolean;
  equalTo?: { cell: string; value: string };
  greaterThan?: { cell: string; value: string };
  lessThan?: { cell: string; value: string };
  tagId?: string[];
  search?: { cell: string; value: string };
  inEvents?: string[];
  not?: { cell: string; filter: string; value: string };
  byDate?: boolean;
  ascending?: true | false;
};

export async function getPaginatedFilteredEvents(
  page: number,
  options?: Options,
  pageLimit: number = 12,
  getAll: boolean = false,
) {
  const supabase = createSupabaseServerClient();

  const {
    popular,
    equalTo,
    greaterThan,
    lessThan,
    tagId,
    search,
    inEvents,
    not,
    byDate = true,
    ascending = true,
  } = options || {};

  let query = supabase.from("event").select("*");

  if (!getAll) {
    const start = (page - 1) * pageLimit;
    const end = start + pageLimit - 1;

    query = query.range(start, end);
  }

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

  if (inEvents) {
    query = query.in("event_id", inEvents);
  }

  if (byDate) {
    query = query.order("date", { ascending });
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

  const preferenceQuery = tagId.map((tag) => `tags.cs.{${tag}}`).join(",");

  const result = await supabase
    .from("event")
    .select("*")
    .or(preferenceQuery)
    .not("event_id", "eq", eventId)
    .limit(4);

  return result;
}

export async function getPaginatedEventsByMonth(
  page: number,
  monthsPerPage = 4,
) {
  const supabase = createSupabaseServerClient();

  // Calculate the date range for the requested page
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + (page - 1) * monthsPerPage);
  currentDate.setDate(1); // Start from the first day of the month
  const startDate = currentDate.toISOString();

  currentDate.setMonth(currentDate.getMonth() + monthsPerPage);
  currentDate.setDate(0); // Last day of the last month in the page
  const endDate = currentDate.toISOString();

  const { data: events, error } = await supabase
    .from("event")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });

  if (error) throw new Error(error.message);

  const eventsByMonth: Record<string, EventType[]> = {};

  events?.forEach((event) => {
    const month = new Date(event.date).toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
    if (!eventsByMonth[month]) {
      eventsByMonth[month] = [];
    }
    eventsByMonth[month].push(event);
  });

  return Object.values(eventsByMonth);
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
