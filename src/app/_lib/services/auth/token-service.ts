import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import {
  getEmailTokenByEmail,
  getForgotPasswordTokenByEmail,
} from "@/src/app/_lib/services/auth/auth-service";
import { createClient } from "@/src/app/_lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

export async function generateForgotPasswordToken(email: string) {
  const token = uuidv4();
  const expires_at = new Date(
    new Date().getTime() + 10 * 60 * 1000,
  ).toISOString();

  try {
    const supabase = await createClient();
    const existingToken = await getForgotPasswordTokenByEmail(email);

    if (existingToken) {
      const { error } = await supabase
        .from("forgot_password_token")
        .delete()
        .eq("id", existingToken?.id);

      if (error) {
        throw error;
      }
    }

    const { data, error } = await supabase
      .from("forgot_password_token")
      .insert([{ email, token, expires_at }])
      .select("*");

    if (error) {
      throw error;
    }

    return data?.at(0);
  } catch (error) {
    const supabaseError = error as PostgrestError;

    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(supabaseError);
    }

    const errMsg = getUserErrorMesageForGet(supabaseError);
    throw new Error(errMsg);
  }
}

export async function generateEmailVerificationToken(email: string) {
  const token = uuidv4();
  const expires_at = new Date(new Date().getTime() + 10 * 60 * 1000);

  try {
    const existingToken = await getEmailTokenByEmail(email);
    const supabase = await createClient();

    if (existingToken) {
      const { error } = await supabase
        .from("email_verification_token")
        .delete()
        .eq("id", existingToken?.id);

      if (error) {
        throw error;
      }
    }

    const { data, error } = await supabase
      .from("email_verification_token")
      .insert([{ email, token, expires_at: expires_at.toISOString() }])
      .select();

    if (error) {
      throw error;
    }

    return data?.at(0)?.token;
  } catch (error) {
    const supabaseError = error as PostgrestError;

    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(supabaseError);
    }

    const errorMsg = getUserErrorMesageForGet(supabaseError);
    throw new Error(errorMsg);
  }
}
