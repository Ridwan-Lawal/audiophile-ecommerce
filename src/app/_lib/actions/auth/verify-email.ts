"use server";

import {
  getEmailTokenByToken,
  getUserByEmail,
} from "@/src/app/_lib/services/auth/auth-service";
import { createClient } from "@/src/app/_lib/supabase/server";
import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/utils";
import { PostgrestError } from "@supabase/supabase-js";

export async function verifyEmailAction(tokenFromUrl: string) {
  // Check if token
  const existingToken = await getEmailTokenByToken(tokenFromUrl);
  console.log(existingToken?.expires_at, "verrrrrrrrrrrrifyyy", tokenFromUrl);

  const tokenError =
    "Invalid token, Please try registering or signing in again to verify email";

  if (!existingToken) {
    return {
      error: tokenError,
    };
  }

  const tokenHasExpired =
    new Date(existingToken?.expires_at).getTime() < new Date().getTime();

  if (tokenHasExpired) {
    return {
      error: tokenError,
    };
  }
  // check if any user exists with this token
  const existingUser = await getUserByEmail(existingToken?.email);
  if (!existingUser) {
    return {
      error: tokenError,
    };
  }

  //   update the user email verified status
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("users")
      .update({ emailVerified: new Date().toISOString() })
      .eq("id", existingUser.id);

    if (error) {
      throw error;
    }

    const { error: tokenDeleteError } = await supabase
      .from("email_verification_token")
      .delete()
      .eq("id", existingToken.id);

    if (tokenDeleteError) {
      throw tokenDeleteError;
    }

    return { success: "Email Verified Successfully. Please proceed to login" };
  } catch (error) {
    const errObj = error as PostgrestError;

    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(errObj);
    }

    const errMsg = getUserErrorMesageForGet(errObj);

    return {
      error: errMsg,
    };
  }
}
