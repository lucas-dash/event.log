"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { eventSchema } from "@/lib/validations/event-validation";
import { format } from "date-fns";

export async function createEvent(data: typeof eventSchema._type) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("event")
    .insert({
      thumbnail: null,
      title: data.title,
      date: format(data.date, "yyy-MM-dd"),
      time: data.time,
      address: data.address,
      price: data.price,
      description: data.description,
      schedule: data.schedule,
      alerts: data.alerts,
      homepage: data.homepage,
      tickets_link: data.tickets_link,
      coordinates: [0, 0],
      tags: ["Music"],
      faq: null,
    })
    .single();

  return result;
}
