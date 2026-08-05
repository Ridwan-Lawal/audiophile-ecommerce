import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "@/src/app/_lib/schema/forgot-password";
import { LoginSchema } from "@/src/app/_lib/schema/login";
import { SignupSchema } from "@/src/app/_lib/schema/signup";
import * as z from "zod";

export type SignupSchemaType = z.infer<typeof SignupSchema>;

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export type PasswordResetSchemaType = z.infer<typeof ResetPasswordSchema>;
