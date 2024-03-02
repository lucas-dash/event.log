import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3).max(100).trim(),
  description: z.string().min(10).max(300),
  date: z.date(),
  time: z.string(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  tickets_link: z.string().optional().nullable(),
  homepage: z.string().optional().nullable(),
  price: z.number().min(0),
  schedule: z.string().min(10).max(500),
  alerts: z.string().max(200).optional(),
  // faq: z.string().min(10).max(60).optional().nullable(),
});
