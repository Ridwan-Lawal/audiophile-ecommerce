import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { createClient } from "@/src/app/_lib/supabase/client";
import { redirect } from "next/navigation";

export async function getOrdersClient(userId: string | undefined) {
  if (!userId) redirect("/login");

  const supabase = createClient();
  const { data, error } = await supabase
    .from("order_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    throw new Error(getUserErrorMesageForGet(error));
  }

  return data?.at(0);
}
