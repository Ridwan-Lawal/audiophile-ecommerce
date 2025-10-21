"use server";

import {
  getUserErrorMessageForUpdate,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { createClient } from "@/src/app/_lib/supabase/server";
import { getUser } from "@/src/app/_lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTwoFactorOption(option: boolean) {
  const user = await getUser();
  if (!user?.id) redirect("/login");

  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .update({ isTwoFactorEnabled: option })
    .eq("id", user?.id);

  if (error) {
    logSupabaseErrorInDevMode(error);

    return { error: getUserErrorMessageForUpdate(error) };
  }

  revalidatePath("/");
  console.log(option, "optioooooooooon");
  console.log(user, "useeeeeeeeeeeer");

  return { success: true };
}
