import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { CategoryProductDataType } from "@/src/app/_lib/schema/categories-schema";
import { createClient } from "@/src/app/_lib/supabase/server";

export const getCategoryProducts = async function (category: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, name, category, categoryimage, description")
    .eq("category", category);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    throw new Error(getUserErrorMesageForGet(error));
  }

  return data as unknown as CategoryProductDataType[];
};
