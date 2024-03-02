"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { format } from "date-fns";

type FormDataType = {
  address: string;
  coordinates: number[];
  date: Date;
  description: string;
  price: number;
  schedule: string;
  time: string;
  tags: string[];
  title: string;
  tickets_link?: string | null | undefined;
  homepage?: string | null | undefined;
  alerts?: string | undefined;
};

export async function createEvent(data: FormDataType) {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("event")
    .insert({
      thumbnail: null,
      cover: null,
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
      coordinates: data.coordinates,
      tags: data.tags,
      faq: null,
    })
    .single();

  return result;
}
