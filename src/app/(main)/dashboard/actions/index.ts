"use server";

import { getFavoriteEventsIdByUserId } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function findSimilarEvents(userId: string, limit = 8) {
  const supabase = createSupabaseServerClient();

  const favoriteIds = await getFavoriteEventsIdByUserId(userId);

  const { data: favoriteEvents, error } = await supabase
    .from("event")
    .select()
    .in("event_id", favoriteIds);

  if (error) throw new Error(error.message);

  const preferenceTags = favoriteEvents
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
    .not("event_id", "in", `(${favoriteIds})`)
    .not("cover_id", "is", null)
    .limit(limit);

  return result;
}
