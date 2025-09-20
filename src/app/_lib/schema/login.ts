import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .email("Please enter a valid email")
    .min(1, "Email address is required")
    .max(255, "Fill in a valid email address")
    .trim(),

  password: z.string().min(1, "Password is required").trim(),
});
