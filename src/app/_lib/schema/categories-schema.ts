import * as z from "zod";

export const CategoryProductSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    categoryimage: z.object({
      mobile: z.string(),
      tablet: z.string(),
      desktop: z.string(),
    }),
  })
  .strict();

export const AllCategoryProductsSchema = z.array(CategoryProductSchema);

export type AllCategoryProductsDataType = z.infer<
  typeof AllCategoryProductsSchema
>;

export type CategoryProductDataType = z.infer<typeof CategoryProductSchema>;
