"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getUserAllFavoriteEvents(userId: string) {
  const supabase = createSupabaseServerClient();

  const { data: favoriteEvents, error: favoriteEventsError } = await supabase
    .from("favorite")
    .select("event_id")
    .eq("user_id", userId);

  if (favoriteEventsError) {
    throw new Error(favoriteEventsError.message);
  }

  const eventsIds = favoriteEvents?.map((fav) => fav.event_id);

  const result = await supabase
    .from("event")
    .select("*")
    .in("event_id", eventsIds);

  return result;
}
