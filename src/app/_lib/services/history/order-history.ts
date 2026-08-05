import { ORDER_PER_PAGE } from "@/src/app/_lib/constants";
import { logSupabaseErrorInDevMode } from "@/src/app/_lib/error-handling";
import { createClient } from "@/src/app/_lib/supabase/server";
import { redirect } from "next/navigation";

export const getOrderHistory = async (
  userId: string | undefined,
  page: string | undefined,
) => {
  if (!userId) redirect("/login");

  const currentPage = page ? +page : 1;
  const from = +currentPage * ORDER_PER_PAGE - ORDER_PER_PAGE;

  const to = +currentPage * ORDER_PER_PAGE - 1;

  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from("order_history")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .range(from, to);

  if (error) {
    logSupabaseErrorInDevMode(error);
  }

  return { data, count };
};
