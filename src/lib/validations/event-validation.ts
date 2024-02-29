import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3).max(100).trim(),
  description: z.string().min(10).max(300),
  address: z.string().min(3).max(100),
  date: z.string(),
  time: z.string(),
  // tags: z.string(),
  tickets_link: z.string().optional().nullable(),
  homepage: z.string().optional().nullable(),
  // organizer: z.string().min(3).max(100),
  price: z.number().min(0),
  schedule: z.string().min(10).max(500),
  // faq: z.string().min(10).max(60).optional(),
  // alerts: z.string().min(10).max(200).optional(),
});
