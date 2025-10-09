import { Database } from "@/src/app/_types/supabase/database.types";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  console.log("SUPABASE_URL:", process.env.NEXT_URL_SUPABASE_URL);
  console.log("SERVICE_ROLE exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  console.log(
    "SERVICE_ROLE first 20 chars:",
    process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20),
  );

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
