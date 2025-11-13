import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { createClient } from "@/src/app/_lib/supabase/server";
import { cache } from "react";

export const getAccountUserById = cache(async function (userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("userId", userId);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    throw new Error(getUserErrorMesageForGet(error));
  }

  return data?.at(0);
});
