import { z } from "zod";

const CartProductSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    quantity: z.number(),
    userid: z.string(),
    price: z.number(),
    created_at: z.string(),
    product_id: z.string(),
    slug: z.string(),
  })
  .strict();

export const CartDataSchema = z.array(CartProductSchema);

export type CartDataType = z.infer<typeof CartDataSchema>;
export type CartProductDataType = z.infer<typeof CartProductSchema>;
