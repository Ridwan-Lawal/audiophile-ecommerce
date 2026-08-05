import { CartProductDataType } from "@/src/app/_lib/schema/cart-shema";

export type OptimisticAction = {
  type: "add" | "update" | "delete";
  id?: string;
  quantity?: number;
  newProduct?: CartProductDataType;
};
