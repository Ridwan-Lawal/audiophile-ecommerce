"use server";

import {
  getUserErrorMessageForDelete,
  getUserErrorMessageForUpdate,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "@/src/app/_lib/schema/forgot-password";
import {
  getForgotPasswordTokenByToken,
  getUserByEmail,
} from "@/src/app/_lib/services/auth/auth-service";
import { sendPasswordResetMail } from "@/src/app/_lib/services/auth/mail-service";
import { generateForgotPasswordToken } from "@/src/app/_lib/services/auth/token-service";
import { createClient } from "@/src/app/_lib/supabase/server";
import {
  ForgotPasswordSchemaType,
  PasswordResetSchemaType,
} from "@/src/app/_types/auth/auth";
import bcrypt from "bcryptjs";
import * as z from "zod";

export async function resetPasswordAction(
  tokenFromUrl: string,
  formData: PasswordResetSchemaType,
) {
  const validatingData = ResetPasswordSchema.safeParse(formData);

  if (!validatingData?.success) {
    const formErrors = z.treeifyError(validatingData.error).properties;
    const formErrorFields = Object.keys(formErrors!);

    return {
      error: `Invalid form input for the ${formErrorFields.join(", ")} field. Check the fields and try submitting again`,
    };
  }

  const { password } = validatingData?.data;

  // 1. Check if token exists
  const existingToken = await getForgotPasswordTokenByToken(tokenFromUrl);

  const errMessage =
    "You are not authorized to perform this operation! please request for a password reset mail from the login page. Invalid token.";

  if (!existingToken) {
    return {
      error: errMessage,
    };
  }

  // 2. Check if token has expires
  const hasExpired =
    new Date(existingToken?.expires_at).getTime() < new Date().getTime();

  if (!hasExpired) {
    console.log("Ridwan");
    return {
      error: errMessage,
    };
  }

  // 3. Check if a user exists for the token
  const existingUserForToken = await getUserByEmail(existingToken?.email);

  if (!existingUserForToken) {
    return {
      error: errMessage,
    };
  }

  //   4. hash the password

  const supabase = await createClient();
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from("users")
    .update({ password: hashedPassword })
    .eq("id", existingUserForToken?.id);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }
    return { error: getUserErrorMessageForUpdate(error) };
  }

  const { error: deleteError } = await supabase
    .from("forgot_password_token")
    .delete()
    .eq("id", existingToken?.id);

  if (deleteError) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(deleteError);
    }

    return { error: getUserErrorMessageForDelete(deleteError) };
  }

  return {
    success: "Password Reset Successfully! please sign in",
  };
}

export async function forgotPasswordAction(formData: ForgotPasswordSchemaType) {
  const validatingData = ForgotPasswordSchema.safeParse(formData);

  if (!validatingData.success) {
    const errorObj = z.treeifyError(validatingData?.error).properties;
    const errorField = Object.keys(errorObj!);

    return {
      error: `Invalid form input for the ${errorField.join(", ")} field. Check the fields and try submitting again`,
    };
  }

  const { email } = validatingData?.data;

  //   TODO: Generate a token for the email.
  const resetPasswordToken = await generateForgotPasswordToken(email);
  if (resetPasswordToken) {
    await sendPasswordResetMail(resetPasswordToken?.token);
  }

  return {
    success:
      "We've already sent password reset instructions to the email address associated with your account.",
  };
}
