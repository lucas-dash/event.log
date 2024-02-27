"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signUp(data: {
  username: string;
  email: string;
  password: string;
}) {
  const supabase = createSupabaseServerClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: "http://localhost:3000/auth/confirm",
      data: {
        username: data.username,
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

// export async function loginWithGoogleProvider() {
//   const supabase = createSupabaseServerClient();

//   const result = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: "http://localhost:3000/auth/callback",
//       queryParams: {
//         access_type: "offline",
//         prompt: "consent",
//       },
//     },
//   });

//   return result;
// }

// export async function loginWithGithubProvider() {
//   const supabase = createSupabaseServerClient();

//   const result = await supabase.auth.signInWithOAuth({
//     provider: "github",
//     options: {
//       redirectTo: "http://localhost:3000/auth/callback",
//     },
//   });

//   return result;
// }

export async function signOut() {
  const supabase = createSupabaseServerClient();

  return supabase.auth.signOut();
}
