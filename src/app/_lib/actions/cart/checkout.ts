"use server";

import {
  getUserErrorMessageForDelete,
  getUserErrorMessageForInsert,
  getUserErrorMessageForUpdate,
  logSupabaseErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { CartType } from "@/src/app/_lib/redux/cartSlice";
import { CartProductDataType } from "@/src/app/_lib/schema/cart-shema";
import { createClient } from "@/src/app/_lib/supabase/server";
import { getUser } from "@/src/app/_lib/utils";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function RemoveAllProductRemovalFromCart() {
  const user = await getUser();
  if (!user?.id) redirect("/login");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cart")
    .delete()
    .eq("userid", user?.id);

  if (error) {
    // for sentry to catch
    logSupabaseErrorInDevMode(error);

    return { error: getUserErrorMessageForDelete(error) };
  }

  revalidatePath("/");

  return { success: "Cart products successfully deleted" };
}

export async function deleteProductFromCart(productToDelId: string) {
  const user = await getUser();
  if (!user?.id) redirect("/login");
  try {
    const supabase = await createClient();
    const { data: userProductIds, error: userProductIdsError } = await supabase
      .from("cart")
      .select("id")
      .eq("userid", user?.id);

    if (userProductIdsError) {
      throw userProductIdsError;
    }

    const isProductToDeleteForUser = userProductIds?.some(
      (userProductId) => userProductId?.id === productToDelId,
    );

    if (!isProductToDeleteForUser) {
      return {
        error: "You do not have the permission to perform this operation",
      };
    }

    // MUTATION
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("userid", user?.id)
      .eq("id", productToDelId);

    if (error) throw error;

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    const supabaseError = error as PostgrestError;

    logSupabaseErrorInDevMode(supabaseError);

    return { error: getUserErrorMessageForDelete(supabaseError) };
  }
}

export async function updateProductQuantityInCart(
  id: string,
  quantity: number,
  slug: string,
) {
  const user = await getUser();
  if (!user?.id) redirect("/login");

  console.log(id, "iddddddddddddddddddddddddddddddddddddddd");

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("cart")
      .select("id, product_id")
      .eq("userid", user?.id);

    if (error) throw error;

    const isProductForUser = data?.some((product) => product?.id === id);

    if (!isProductForUser)
      return { error: "You do not have permission to perform this operation" };

    const { error: updateError } = await supabase
      .from("cart")
      .update({ quantity })
      .eq("userid", user?.id)
      .eq("id", id);

    if (updateError) throw updateError;

    revalidatePath(`/${slug}`);
  } catch (error) {
    const supabaseError = error as PostgrestError;

    logSupabaseErrorInDevMode(supabaseError);

    return {
      error: getUserErrorMessageForUpdate(supabaseError),
    };
  }
}

export async function addProductToCart(
  productOgId: string | undefined,
  newCartProduct: CartProductDataType,
  slug: string,
) {
  const user = await getUser();
  if (!user?.id) redirect("/login");

  const supabase = await createClient();
  const { error } = await supabase
    .from("cart")
    .insert([{ ...newCartProduct, product_id: productOgId! }]);

  if (error) {
    logSupabaseErrorInDevMode(error);

    return { error: getUserErrorMessageForInsert(error) };
  }

  revalidatePath(`/${slug}`);

  return { success: "Product successfully added to cart" };
}

export async function addCartOnPageMountAction(products: CartType[]) {
  console.log("numbbbbbbbbbbbbbbbb");

  const user = await getUser();
  if (!user || !user?.id) {
    console.log("login");
    redirect("/login");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("cart").insert(
    products?.map((product) => ({
      ...product,
      userid: user?.id,
      product_id: product.product_id!,
    })),
  );

  if (error) {
    if (process.env.NODE_ENV === "development") {
      logSupabaseErrorInDevMode(error);
    }

    const errMessage = getUserErrorMessageForInsert(error);

    return { error: errMessage };
  }

  //   remove the success message
  return { success: true };
}
