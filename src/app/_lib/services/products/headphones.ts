import {
  getAxiosErrorMessage,
  logAxiosErrorInDevMode,
} from "@/src/app/_lib/error-handling";
import {
  HeadphonesDataSchema,
  headphonesDataType,
} from "@/src/app/_lib/schema/headphones-data";
import axios, { AxiosError } from "axios";
import { unstable_cache } from "next/cache";
import z from "zod";

export const getHeadphones = unstable_cache(
  async function (): Promise<headphonesDataType> {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/headphones`;

    try {
      const res = await axios.get<headphonesDataType>(url);

      const validatingData = HeadphonesDataSchema.safeParse(res.data);

      console.log("reading data");

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
  ["headphones-data"],
  {
    revalidate: 3600,
    tags: ["headphones"],
  },
);
