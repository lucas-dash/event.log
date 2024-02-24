// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from "zod";

export const signUpSchema = z
  .object({
    displayName: z
      .string()
      .min(1, { message: "Name must contain at least 1 character" })
      .max(20)
      .trim(),
    username: z
      .string()
      .min(3, { message: "Username must cointain at least 3 characters" })
      .max(15, { message: "Username must contains max 15 characters." })
      .trim(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must cointain at least 6 characters" })
      .max(100),
    confirmPassword: z
      .string()
      .min(6, { message: "Password do not match" })
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password did not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must cointain at least 6 characters" })
    .max(100),
});
