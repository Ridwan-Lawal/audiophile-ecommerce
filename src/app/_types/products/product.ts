import { Json } from "@/src/app/_types/supabase/database.types";

export interface CategoryDataType {
  id: string;
  slug: string | null;
  name: string | null;
  category: string | null;
  categoryimage: Json;
  description: string | null;
}
