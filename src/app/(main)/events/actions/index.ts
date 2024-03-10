"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("event")
    .delete()
    .eq("event_id", eventId)
    .single();

  revalidatePath("/events");

  return result;
}
