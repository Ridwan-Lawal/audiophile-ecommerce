import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { CartDataType } from "@/src/app/_lib/schema/cart-shema";
import { createClient } from "@/src/app/_lib/supabase/server";
import { cache } from "react";

export const getCartProducts = cache(async function (
  userId: string | undefined,
) {
  if (!userId) return;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("userid", userId)
    .order("created_at", { ascending: false });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    throw new Error(getUserErrorMesageForGet(error));
  }

  return data as CartDataType;
});
