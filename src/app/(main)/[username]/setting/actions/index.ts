"use server";

import { getUser } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function verifyCurrentPassword(currentPassword: string) {
  const supabase = createSupabaseServerClient();

  const { user, error } = await getUser();

  if (!user || error) {
    throw new Error("User not found");
  }

  const result = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  });

  return result;
}

export async function updateUserPassword(newPassword: string) {
  const supabase = createSupabaseServerClient();

  const result = supabase.auth.updateUser({ password: newPassword });
  return result;
}
