"use server";

import { getFavoriteEventsByUserId } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function findSimilarEvents(userId: string, limit = 6) {
  const supabase = createSupabaseServerClient();

  const { data: favorite, error: favoriteError } =
    await getFavoriteEventsByUserId(userId);

  if (favoriteError) {
    throw new Error(favoriteError.message);
  }

  const favEventsId = favorite.map((fav) => fav.event_id);

  const preferenceTags = favorite
    .flatMap((event) => event.tags)
    .filter((tag, index, array) => array.indexOf(tag) === index);

  const preferenceQuery = preferenceTags
    .map((tag) => `tags.cs.{${tag}}`)
    .join(",");

  const result = await supabase
    .from("event")
    .select(
      "place, date, time, title, event_id, cover_id, price, isFree, price_from",
    )
    .or(preferenceQuery)
    .not("event_id", "in", `(${favEventsId})`)
    .not("cover_id", "is", null)
    .limit(limit);

  return result;
}

export async function getPopularEvents() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.from("joined").select("event_id");

  if (error) {
    throw new Error(error.message);
  }

  const eventIdCountMap = data.reduce<Record<string, number>>((acc, event) => {
    acc[event.event_id] = (acc[event.event_id] || 0) + 1;
    return acc;
  }, {});

  const sortedEventIds = Object.keys(eventIdCountMap)
    .sort((a, b) => eventIdCountMap[b] - eventIdCountMap[a])
    .slice(0, 4);

  const result = await supabase
    .from("event")
    .select("*")
    .in("event_id", sortedEventIds);

  return result;
}
