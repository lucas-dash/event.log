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

export async function deleteCover(
  coverId: string,
  createdBy: string,
  coverName: string,
) {
  const supabase = createSupabaseServerClient();

  const coversError = await supabase
    .from("covers")
    .delete()
    .eq("id", coverId)
    .single();
  const storageError = await supabase.storage
    .from("covers")
    .remove([`${createdBy}/${coverId}/${coverName}`]);

  return { coversError, storageError };
}

export async function getEventsByTagId(tagId: string) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("event")
    .select("*")
    .contains("tags", [tagId]);

  return result;
}
