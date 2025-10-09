import {
  getAxiosErrorMessage,
  logAxiosErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import { CartDataSchema, CartDataType } from "@/src/app/_lib/schema/cart-shema";
import { getUser } from "@/src/app/_lib/utils";
import axios from "@lib/api";
import { AxiosError } from "axios";
import { cache } from "react";
import z from "zod";

export const getCartProducts = cache(async function (): Promise<
  CartDataType | undefined
> {
  const user = await getUser();
  if (!user?.id) return;

  try {
    const response = await axios.get<CartDataType>(`/api/cart/${user?.id}`);

    const validatingRes = CartDataSchema.safeParse(response.data);

    if (!validatingRes?.success) {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "invalid data structure",

          z.treeifyError(validatingRes.error).items?.at(0)?.properties,
        );
      }
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (process.env.NODE_ENV === "development") {
        logAxiosErrorInDevMode(error);
      }

      const errorMessage = getAxiosErrorMessage(error?.status, error?.code);

      throw new Error(errorMessage);
    }

    throw error;
  }
});
