/* eslint-disable @typescript-eslint/naming-convention */

"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { eventSchema } from "@/lib/validations/event-validation";
import { format } from "date-fns";
import { TypeOf } from "zod";

type FormDataType = {
  data: TypeOf<typeof eventSchema>;
  cover: string | null;
  address: string;
  coordinates: [number, number];
};

export async function createEvent(values: FormDataType) {
  const supabase = createSupabaseServerClient();

  const {
    title,
    date,
    time,
    description,
    place,
    price,
    price_from,
    tags,
    schedule,
    alerts,
    homepage,
    tickets_link,
  } = values.data;

  const result = await supabase
    .from("event")
    .insert({
      cover_id: values.cover,
      title,
      date: format(date, "yyy-MM-dd"),
      time,
      address: values.address,
      place,
      price,
      description,
      schedule,
      alerts,
      homepage,
      tickets_link,
      coordinates: values.coordinates,
      price_from,
      tags,
    })
    .single();

  return result;
}
