import {
  getAxiosErrorMessage,
  logAxiosErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import {
  AllCategoryProductsDataType,
  AllCategoryProductsSchema,
} from "@/src/app/_lib/schema/categories-schema";
import axios, { AxiosError } from "axios";
import { unstable_cache } from "next/cache";
import z from "zod";

export const getCategoryProducts = unstable_cache(
  async function (category: string): Promise<AllCategoryProductsDataType> {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${category}`;

    try {
      const res = await axios.get<AllCategoryProductsDataType>(url);

      const validatingData = AllCategoryProductsSchema.safeParse(res.data);

      console.log("res", res.data);

      if (!validatingData?.success) {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Invalid data structure:",
            z.treeifyError(validatingData.error).items?.[0]?.errors?.at(0),
          );
        }
      }

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (process.env.NODE_ENV === "development") {
          logAxiosErrorInDevMode(error);
        }

        const errorMessage = getAxiosErrorMessage(error?.status, error?.code);

        throw new Error(errorMessage);
      }

      throw new Error("Something went wrong");
    }
  },
  ["categories-products"],
  {
    revalidate: 3600,
    tags: ["categories-products"],
  },
);
