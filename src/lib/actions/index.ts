"use server";

import { createSupabaseServerClient } from "../supabase/server";

export async function getUser() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
}

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

export async function getEvents() {
  const supabase = createSupabaseServerClient();

  const result = await supabase.from("event").select("*");

  return result;
}
