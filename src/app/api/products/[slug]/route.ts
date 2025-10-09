import {
  getUserErrorMesageForGet,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { createClient } from "@/src/app/_lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  console.log("sluggggggggg:", slug);
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug);

    console.log(data, error, "yess");

    if (error) {
      throw error;
    }

    if (!data || !data?.at(0)) {
      return NextResponse.json(
        { error: "The product you requested could not be found" },
        { status: 404 },
      );
    }

    return NextResponse.json(data?.at(0), { status: 200 });
  } catch (error) {
    const supabaseError = error as PostgrestError;

    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(supabaseError);
    }

    return NextResponse.json(
      { error: getUserErrorMesageForGet(supabaseError) },
      { status: 500 },
    );
  }
}
