import * as z from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Your email is required")
    .max(255, "Please enter a valid email address")
    .trim(),
});

export const ResetPasswordSchema = z
  .object({
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
  .refine((data) => data.confirmPassword === data.password, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
  });
