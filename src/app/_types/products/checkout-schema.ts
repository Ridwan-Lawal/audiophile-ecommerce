import { CheckoutSchema } from "@/src/app/_lib/schema/checkout-schema";
import z from "zod";

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;
