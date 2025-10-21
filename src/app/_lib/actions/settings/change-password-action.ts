"use server";

import {
  getUserErrorMessageForUpdate,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
} from "@/src/app/_lib/schema/change-password-schema";
import { getUserByEmail } from "@/src/app/_lib/services/auth/auth-service";
import { createClient } from "@/src/app/_lib/supabase/server";
import { getUser } from "@/src/app/_lib/utils";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function changePasswordAction(formData: ChangePasswordSchemaType) {
  const user = await getUser();
  if (!user?.id || !user?.email) redirect("/login");

  const validatingFormValues = ChangePasswordSchema.safeParse(formData);

  if (!validatingFormValues?.success) {
    const formErrors = z.treeifyError(validatingFormValues?.error);

    return { error: formErrors?.errors?.at(0) };
  }

  const validatedFormValues = validatingFormValues?.data;

  const curUser = await getUserByEmail(user?.email);

  //   ACCOUNT FROM OAuth
  if (!curUser?.password)
    return {
      error:
        "Password cannot be change, as you signed up your account using an OAuth provider",
    };

  const isCurPasswordCorrect = await bcrypt.compare(
    validatedFormValues?.curPassword,
    curUser?.password,
  );

  if (!isCurPasswordCorrect) {
    return {
      error: "Invalid current password",
    };
  }

  const isNewPasswordEqualToCurrent = await bcrypt.compare(
    validatedFormValues?.newPassword,
    curUser?.password,
  );

  if (isNewPasswordEqualToCurrent) {
    return {
      error: "Please set a different password",
    };
  }

  const hashedNewPassword = await bcrypt.hash(
    validatedFormValues?.newPassword,
    10,
  );

  const supabase = await createClient();

  const { error } = await supabase
    .from("users")
    .update({ password: hashedNewPassword })
    .eq("id", user?.id);

  if (error) {
    // for error monitory tools
    logSupabaseErrorInDevMode(error);

    return { error: getUserErrorMessageForUpdate(error) };
  }

  revalidatePath("/settings");

  return { success: "Password Successfully updated" };
}
