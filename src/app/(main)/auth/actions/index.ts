"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signUp(data: {
  displayName: string;
  username: string;
  email: string;
  password: string;
}) {
  const supabase = createSupabaseServerClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: "http://localhost:3000/auth/verify-email",
      data: {
        username: data.username,
        display_name: data.displayName,
      },
    },
  });

  return result;
}

export async function loginWithEmail(data: {
  email: string;
  password: string;
}) {
  const supabase = createSupabaseServerClient();

  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return result;
}

export async function signOut() {
  const supabase = createSupabaseServerClient();

  return supabase.auth.signOut();
}
