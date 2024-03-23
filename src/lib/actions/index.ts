"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../supabase/server";

// User

export async function getUser() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
}

// Profile

export async function getUserProfileById(userId: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .single();

  return result;
}

export async function getUserByUsername(username: string) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("username", username)
    .single();

  return { data, error };
}

// Events

export async function getEvents() {
  const supabase = createSupabaseServerClient();

  const result = await supabase.from("event").select("*");

  return result;
}

export async function getEventById(eventId: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("event")
    .select("*")
    .eq("event_id", eventId)
    .single();

  return result;
}

// Covers

export async function getEventCoverById(coverId: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("covers")
    .select("*")
    .eq("id", coverId)
    .single();
  return result;
}

// Favorite

export async function getFavoriteEventsIdByUserId(userId: string) {
  const supabase = createSupabaseServerClient();

  const { data: favorite, error: favoriteError } = await supabase
    .from("favorite")
    .select("event_id")
    .eq("user_id", userId);

  if (favoriteError) {
    throw new Error(favoriteError.message);
  }

  const favoriteIds = favorite.map((fav) => fav.event_id);

  return favoriteIds;
}

export async function addFavorite(event_id: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase.from("favorite").insert({ event_id }).single();

  revalidatePath("/dashboard");

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

  revalidatePath("/dashboard");

  return result;
}

export async function isUserFavorite(eventId: string, userId: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("favorite")
    .select("event_id, user_id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .single();

  return result;
}

// Joined events

export async function getJoinedEventIdsByUserId(userId: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("joined")
    .select("event_id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  const joinedIds = data.map((joined) => joined.event_id);

  return joinedIds;
}

export async function isJoinedByUser(event_id: string, user_id: string) {
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

  revalidatePath("/dashboard");

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

  revalidatePath("/dashboard");

  return result;
}
