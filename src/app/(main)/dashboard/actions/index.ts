"use server";

import { getFavoriteEventsByUserId } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function findSimilarEvents(userId: string) {
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

  const result = await supabase
    .from("event")
    .select("place, date, time, title, event_id, cover_id")
    .contains("tags", preferenceTags)
    .not("event_id", "in", `(${favEventsId})`)
    .not("cover_id", "is", null)
    .limit(4);

  return result;
}
