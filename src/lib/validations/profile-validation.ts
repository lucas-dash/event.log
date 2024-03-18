import { z } from "zod";

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Password must cointain at least 6 character(s)" })
      .max(100),
    newPassword: z
      .string()
      .min(6, { message: "Password must cointain at least 6 character(s)" })
      .max(100),
    confirmNewPassword: z
      .string()
      .min(6, { message: "Password did not match" })
      .max(100),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password did not match",
    path: ["confirmNewPassword"],
  });
