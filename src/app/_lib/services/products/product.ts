import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { ProductType } from "@/src/app/_lib/schema/product-schema";
import { createClient } from "@/src/app/_lib/supabase/server";
import { cache } from "react";

export const getProduct = cache(async function (slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    throw new Error(getUserErrorMesageForGet(error));
  }

  return data?.at(0) as unknown as ProductType;
});
