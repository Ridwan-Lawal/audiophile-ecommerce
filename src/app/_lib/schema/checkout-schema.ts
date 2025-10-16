import * as z from "zod";

export const CheckoutSchema = z.object({
  name: z
    .string("Name should be alphabetical")
    .min(1, "Name is required")
    .max(255, "Name is invalid"),

  email: z
    .email("Email address is invalid")
    .min(1, "Email is required")
    .max(255, "Email is invalid"),

  phone: z.string().min(1, "Number is required").max(255, "Number is required"),

  address: z
    .string()
    .min(1, "Address is required")
    .max(512, "Address is invalid"),

  zip: z.string().min(1, "ZIP code is required").max(10, "ZIP code is invalid"),

  city: z.string().min(1, "City is required").max(255, "City is required"),

  country: z
    .string()
    .min(1, "Country is required")
    .max(255, "Country is required"),

  paymentMethod: z.enum(["eMoney", "cash"], "Please select a payment method"),

  eMoneyNum: z
    .string()
    .min(1, "Your e-Money number is required")
    .min(255, "Invalid e-Money number"),

  eMoneyPin: z
    .string()
    .min(1, "Your e-Money pin is required")
    .min(10, "Invalid e-Money pin"),
});
