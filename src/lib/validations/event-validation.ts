import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  adress: z.string().min(3).max(100),
  date: z.string(),
  time: z.string(),
  // tags: z.string(),
  tickets_link: z.string().url(),
  homepage: z.string().url(),
  organizer: z.string().min(3).max(100),
  price: z.number().min(0),
  schedule: z.string().min(10).max(500),
  faq: z.string().min(10).max(500),
  alerts: z.string().min(10).max(500),
});
