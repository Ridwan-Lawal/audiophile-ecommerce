import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { createClient } from "@/src/app/_lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ category: string }>;
  },
) {
  const { category } = await params;
  console.log(category, "category");
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, name, category, categoryimage, description")
      .eq("category", category);

    if (error) {
      throw error;
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    const supabaseError = error as PostgrestError;

    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(supabaseError);
    }

    return Response.json(
      { message: getUserErrorMesageForGet(supabaseError) },
      { status: 500 },
    );
  }
}
