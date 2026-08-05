"use client";

import CheckoutForm from "@/src/app/_components/checkout/CheckoutForm";
import OrderSummary from "@/src/app/_components/checkout/OrderSummary";
import BackButton from "@/src/app/_components/product/BackButton";
import { useAddOfflineCartToDb } from "@/src/app/_hooks/cart/useAddOfflineCartToDb";
import { checkoutOrderAction } from "@/src/app/_lib/actions/cart/order-checkout";
import {
  onDeleteAllCartProductFromOfflineCart,
  onRemoveAllDbCartProduct,
  onToggleSuccessModal,
} from "@/src/app/_lib/redux/cartSlice";
import { useAppDispatch } from "@/src/app/_lib/redux/hooks";
import { CheckoutSchema } from "@/src/app/_lib/schema/checkout-schema";
import { CheckoutSchemaType } from "@/src/app/_types/products/checkout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CheckoutSchemaKeysType = keyof CheckoutSchemaType;

export default function Checkout() {
  useAddOfflineCartToDb();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [isCheckingOut, startTransition] = useTransition();
  const { register, handleSubmit, formState, watch, setValue, reset } =
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
    dispatch(onToggleSuccessModal(false));
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem("checkout-form", JSON.stringify(inputFields));

    return () => localStorage.removeItem("checkout-form");
  }, [inputFields]);

  function onSubmitForm(data: CheckoutSchemaType) {
    startTransition(async () => {
      const res = await checkoutOrderAction(data);
      if (res?.success) {
        toast.success(res.success);
        reset();
        dispatch(onToggleSuccessModal(true));
        queryClient.invalidateQueries({ queryKey: ["carts"] });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        dispatch(onDeleteAllCartProductFromOfflineCart());
        dispatch(onRemoveAllDbCartProduct());
      }
      if (res?.error) {
        toast.error(res.error);
      }
    });
  }

  return (
    <div className="bg-white-2">
      <div className="mx-auto max-w-[612px] space-y-6 px-6 py-12 lg:max-w-[1100px] lg:space-y-9 lg:py-16">
        <BackButton />

        <form
          action=""
          autoComplete="on"
          onSubmit={handleSubmit(onSubmitForm)}
          className="flex flex-col gap-10 lg:flex-row"
        >
          <div className="rounded-[8px] bg-white px-8 py-10 lg:w-[65%] lg:px-10 lg:py-12">
            <h4 className="font-bold uppercase">checkout</h4>

            {/* FORMS */}
            <CheckoutForm
              register={register}
              errors={errors}
              isCheckingOut={isCheckingOut}
            />
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:w-[35%]">
            <OrderSummary
              isAllInputsFilled={isAllInputFieldsFilled}
              isCheckingOut={isCheckingOut}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Debug the error after building
 * Remove unused vars
 * readme
 * fix google auth
 */
