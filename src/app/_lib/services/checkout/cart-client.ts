import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { createClient } from "@/src/app/_lib/supabase/client";
import { redirect } from "next/navigation";

export async function getCartProductsClient(userId: string | undefined) {
  if (!userId) redirect("/login");

  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("userid", userId);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    throw new Error(getUserErrorMesageForGet(error));
  }

  return data;
}

// call it in order summary component
