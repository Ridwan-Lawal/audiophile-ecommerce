"use client";

import CheckoutForm from "@/src/app/_components/checkout/CheckoutForm";
import OrderSummary from "@/src/app/_components/checkout/OrderSummary";
import BackButton from "@/src/app/_components/product/BackButton";
import { useAddOfflineCartToDb } from "@/src/app/_hooks/cart/useAddOfflineCartToDb";
import { CheckoutSchema } from "@/src/app/_lib/schema/checkout-schema";
import { CheckoutSchemaType } from "@/src/app/_types/products/checkout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type CheckoutSchemaKeysType = keyof CheckoutSchemaType;

export default function Checkout() {
  useAddOfflineCartToDb();

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<CheckoutSchemaType>({
      resolver: zodResolver(CheckoutSchema),
    });

  const errors = formState?.errors;

  // TO DISABLE SUBMIT BTN
  const inputFields = watch();
  const inputFieldsValues = Object.values(inputFields);
  // return true if every value is truthy, not  falsy
  const isAllInputFieldsFilled = inputFieldsValues.every((value) => value);

  // TO PERSIST FORM

  useEffect(() => {
    const checkoutFormFromLs = localStorage.getItem("checkout-form");

    if (checkoutFormFromLs) {
      const parsedFormData: CheckoutSchemaType = JSON.parse(checkoutFormFromLs);

      const formDataKeys = Object.keys(
        parsedFormData,
      ) as CheckoutSchemaKeysType[];

      formDataKeys?.forEach((key) => setValue(key, parsedFormData[key]));
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("checkout-form", JSON.stringify(inputFields));

    return () => localStorage.removeItem("checkout-form");
  }, [inputFields]);

  function onSubmitForm(data: CheckoutSchemaType) {
    console.log(data);
  }

  return (
    <div className="bg-white-2">
      <div className="mx-auto max-w-[612px] space-y-6 px-6 py-12 lg:max-w-[1100px] lg:space-y-9 lg:py-16">
        <BackButton />

        <form
          action=""
          autoComplete="on"
          onSubmit={handleSubmit(onSubmitForm)}
          className="flex flex-col gap-10 border lg:flex-row"
        >
          <div className="rounded-[8px] border bg-white px-8 py-10 lg:w-[65%] lg:px-10 lg:py-12">
            <h4 className="font-bold uppercase">checkout</h4>

            {/* FORMS */}
            <CheckoutForm register={register} errors={errors} />
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:w-[35%]">
            <OrderSummary isAllInputsFilled={isAllInputFieldsFilled} />
          </div>
        </form>
      </div>
    </div>
  );
}

// maybe use stripe for the emoney and pin
