import axios from "@/src/app/_lib/api";
import {
  getAxiosErrorMessage,
  logAxiosErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import {
  ProductSchema,
  ProductType,
} from "@/src/app/_lib/schema/product-schema";
import { AxiosError } from "axios";
import { cache } from "react";
import z from "zod";

export const getProduct = cache(async function (
  slug: string,
): Promise<ProductType | undefined> {
  const endpoint = `/api/products/${slug}`;
  try {
    const res = await axios.get<ProductType>(endpoint);

    const validatingResponse = ProductSchema.safeParse(res.data);

    if (!validatingResponse.success) {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "Invalid data structure:",
          z.treeifyError(validatingResponse.error)?.properties,
        );
      }
    }

    console.log(
      validatingResponse.data,
      "llllllllllllllllllllllllllllllllllllllllllllllllll",
    );

    return res?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (process.env.NODE_ENV === "development") {
        logAxiosErrorInDevMode(error);
      }

      const errorMessage = getAxiosErrorMessage(
        error?.response?.status,
        error?.code,
      );

      throw new Error(errorMessage);
    }
  }
});
