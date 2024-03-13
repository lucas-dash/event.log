"use server";

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

// Favorites

export async function getFavoriteEventsByUserId(userId: string) {
  const supabase = createSupabaseServerClient();

  const { data: favorite, error: favoriteError } = await supabase
    .from("favorite")
    .select("event_id")
    .eq("user_id", userId);

  if (favoriteError) {
    throw new Error(favoriteError.message);
  }

  const eventsId = favorite.map((fav) => fav.event_id);

  const result = await supabase
    .from("event")
    .select("*")
    .in("event_id", eventsId);

  return result;
}
