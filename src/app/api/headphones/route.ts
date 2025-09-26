import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { createClient } from "@/src/app/_lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, name, category, categoryimage")
      .eq("category", "headphones");

    if (error) {
      throw error;
    }

    if (!data.length) {
      return Response.json(
        {
          message: "Products with this category could not be found",
        },
        { status: 404 },
      );
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    const supabaseError = error as PostgrestError;

    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(supabaseError);
    }

    return Response.json(
      { message: getUserErrorMesageForGet(supabaseError) },
      { status: 404 },
    );
  }
}
