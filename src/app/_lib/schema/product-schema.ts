import { z } from "zod";

export const ProductSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    image: z.object({
      mobile: z.string(),
      tablet: z.string(),
      desktop: z.string(),
    }),
    category: z.string(),
    categoryimage: z.object({
      mobile: z.string(),
      tablet: z.string(),
      desktop: z.string(),
    }),
    new: z.boolean(),
    price: z.number(),
    description: z.string(),
    features: z.string(),
    includes: z.array(z.object({ item: z.string(), quantity: z.number() })),
    gallery: z.object({
      first: z.object({
        mobile: z.string(),
        tablet: z.string(),
        desktop: z.string(),
      }),
      third: z.object({
        mobile: z.string(),
        tablet: z.string(),
        desktop: z.string(),
      }),
      second: z.object({
        mobile: z.string(),
        tablet: z.string(),
        desktop: z.string(),
      }),
    }),
    others: z.array(
      z.object({
        name: z.string(),
        slug: z.string(),
        image: z.object({
          mobile: z.string(),
          tablet: z.string(),
          desktop: z.string(),
        }),
      }),
    ),
  })
  .strict();

export type ProductType = z.infer<typeof ProductSchema>;
