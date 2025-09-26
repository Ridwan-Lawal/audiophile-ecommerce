import * as z from "zod";

export const HeadphonesDataSchema = z.array(
  z
    .object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      category: z.string(),
      categoryimage: z.object({
        mobile: z.string(),
        tablet: z.string(),
        desktop: z.string(),
      }),
    })
    .strict(),
);

export const HeadphoneDataSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    category: z.string(),
    categoryimage: z.object({
      mobile: z.string(),
      tablet: z.string(),
      desktop: z.string(),
    }),
  })
  .strict();

export type headphonesDataType = z.infer<typeof HeadphonesDataSchema>;

export type headphoneDataType = z.infer<typeof HeadphoneDataSchema>;
