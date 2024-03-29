import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3).max(100).trim(),
  description: z.string().min(5).max(900),
  place: z.string().min(3).max(100).trim(),
  date: z.date(),
  time: z.string(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  tickets_link: z.string().optional().nullable(),
  homepage: z.string().optional().nullable(),
  price: z.string(),
  price_from: z.boolean(),
  isFree: z.boolean(),
  schedule: z.string().max(900).optional(),
  alerts: z.string().max(500).optional(),
});
