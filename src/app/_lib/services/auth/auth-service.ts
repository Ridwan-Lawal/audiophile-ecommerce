import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { createClient } from "@/src/app/_lib/supabase/server";
import { cache } from "react";

export async function getForgotPasswordTokenByToken(token: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forgot_password_token")
    .select("*")
    .eq("token", token);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    const errMessage = getUserErrorMesageForGet(error);

    throw new Error(errMessage);
  }

  return data?.at(0);
}

export async function getForgotPasswordTokenByEmail(email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forgot_password_token")
    .select("*")
    .eq("email", email);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    const errorMessage = getUserErrorMesageForGet(error);

    throw new Error(errorMessage);
  }

  return data?.at(0);
}

export async function getEmailTokenByToken(tokenFromUrl: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("email_verification_token")
    .select("*")
    .eq("token", tokenFromUrl);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    const errMsg = getUserErrorMesageForGet(error);
    throw new Error(errMsg);
  }

  return data?.at(0);
}

export const getUserById = cache(async function (id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select("*").eq("id", id);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    const errorMsg = getUserErrorMesageForGet(error);
    throw new Error(errorMsg);
  }

  return data?.at(0);
});

export async function getEmailTokenByEmail(email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("email_verification_token")
    .select("*")
    .eq("email", email);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    const errorMsg = getUserErrorMesageForGet(error);
    throw new Error(errorMsg);
  }

  return data?.at(0);
}

export const getUserByEmail = cache(async function (email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    const errorMsg = getUserErrorMesageForGet(error);
    throw new Error(errorMsg);
  }

  return data?.at(0);
});
