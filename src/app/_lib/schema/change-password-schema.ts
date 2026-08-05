import z from "zod";

export const ChangePasswordSchema = z.object({
  curPassword: z.string().min(1, "Curren t password is required").trim(),
  newPassword: z
    .string()
    .min(8, "Password length must be 8 or more characters long.")
    .regex(/(?=.*[a-z])/, "Must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Must contain at least one number")
    .regex(/(?=.*[@$!%*?&^#])/, "Must contain at least one special character")
    .trim(),
});

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
