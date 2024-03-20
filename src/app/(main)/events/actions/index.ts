"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type Options = {
  equalTo?: { cell: string; value: string };
  tagId?: string[];
  search?: { cell: string; value: string };
  not?: { cell: string; filter: string; value: string };
};

export async function getPaginatedFilteredEvents(
  page: number,
  options?: Options,
) {
  const supabase = createSupabaseServerClient();

  const { equalTo, tagId, search, not } = options || {};

  const PAGELIMIT = 2;

  const start = (page - 1) * PAGELIMIT;
  const end = start + PAGELIMIT - 1;

  let query = supabase.from("event").select("*").range(start, end);

  if (tagId) {
    query = query.contains("tags", tagId);
  }

  if (equalTo) {
    query = query.eq(equalTo.cell, equalTo.value);
  }

  if (search) {
    query = query.ilike(search.cell, `%${search.value}%`);
  }

  if (not) {
    query = query.not(not.cell, not.filter, not.value);
  }

  const result = await query;

  return result;
}

export async function findRelatedEvents(eventId: string, tagId: string[]) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("event")
    .select("*")
    .contains("tags", tagId)
    .not("event_id", "eq", eventId)
    .limit(4);

  return result;
}

// DELETE ACTIONS

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
