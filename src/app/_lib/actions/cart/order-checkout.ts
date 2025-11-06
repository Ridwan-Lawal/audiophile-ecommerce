"use server";

import {
  getUserErrorMessageForInsert,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { CheckoutSchema } from "@/src/app/_lib/schema/checkout-schema";
import { sendOrderConfirmation } from "@/src/app/_lib/services/checkout/mail";
import { createClient } from "@/src/app/_lib/supabase/server";
import { getUser } from "@/src/app/_lib/utils";
import { CheckoutSchemaType } from "@/src/app/_types/products/checkout-schema";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function checkoutOrderAction(data: CheckoutSchemaType) {
  const user = await getUser();
  if (!user?.id) redirect("/login");

  const validatingData = CheckoutSchema.safeParse(data);

  if (!validatingData?.success) {
    const inputsWithError = z.treeifyError(validatingData?.error).properties!;
    return {
      error: `Invalid validation for input: ${Object.keys(inputsWithError).join(", ")}`,
    };
  }

  const { name, email, phone, address, zip, city, country } =
    validatingData?.data;

  try {
    const supabase = await createClient();
    const { data: orderedItems, error: orderedItemsError } = await supabase
      .from("cart")
      .select("*")
      .eq("userid", user?.id);

    if (orderedItemsError) {
      throw orderedItemsError;
    }

    const { error, data } = await supabase
      .from("order_history")
      .insert([
        {
          name,
          email,
          phone,
          address,
          zip,
          city,
          country,
          user_id: user?.id,
          ordered_items: orderedItems,
        },
      ])
      .select();

    if (error) throw error;

    if (!error) {
      const { error: clearCartError } = await supabase
        .from("cart")
        .delete()
        .eq("userid", user?.id);

      if (clearCartError) {
        throw clearCartError;
      }
    }

    console.log(data, data?.at(0)?.ordered_items, "ddddddddddddddddddataaaaa");

    if (data?.length) {
      await sendOrderConfirmation(email, data?.at(0));
    }

    revalidatePath("/checkout");

    return {
      success:
        "Payment successfully made. A confirmation mail has been sent to you, Orders will be with you shortly.",
    };
  } catch (error) {
    const supabaseError = error as PostgrestError;

    logSupabaseErrorInDevMode(supabaseError);

    return { error: getUserErrorMessageForInsert(supabaseError) };
  }
}
