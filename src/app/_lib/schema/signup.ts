import * as z from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Fill in your name")
      .max(255, "Fill in a valid name")
      .trim(),
    email: z
      .email("Fill in a valid email address")
      .min(1, "Fill in an email address.")
      .max(255, "Fill in a valid email address")
      .trim(),

    password: z
      .string()
      .min(8, "Password length must be 8 or more characters long.")
      .regex(/(?=.*[a-z])/, "Must contain at least one lowercase letter")
      .regex(/(?=.*[A-Z])/, "Must contain at least one uppercase letter")
      .regex(/(?=.*\d)/, "Must contain at least one number")
      .regex(/(?=.*[@$!%*?&^#])/, "Must contain at least one special character")
      .trim(),

    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });
