"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
// import { revalidatePath } from "next/cache";

// favorite

export async function getSingleFavoriteEventById(
  event_id: string,
  user_id: string,
) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("favorite")
    .select("event_id, user_id")
    .eq("event_id", event_id)
    .eq("user_id", user_id)
    .single();

  return result;
}

export async function addFavorite(event_id: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase.from("favorite").insert({ event_id }).single();

  return result;
}

export async function removeFavorite(event_id: string, user_id: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("favorite")
    .delete()
    .eq("event_id", event_id)
    .eq("user_id", user_id)
    .single();

  return result;
}

// join event function

export async function getSingleJoinedEventById(
  event_id: string,
  user_id: string,
) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("joined")
    .select("event_id, user_id")
    .eq("event_id", event_id)
    .eq("user_id", user_id)
    .single();

  return result;
}

export async function joinEvent(event_id: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase.from("joined").insert({ event_id }).single();

  return result;
}

export async function disconnectFromEvent(event_id: string, user_id: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("joined")
    .delete()
    .eq("event_id", event_id)
    .eq("user_id", user_id)
    .single();

  return result;
}
