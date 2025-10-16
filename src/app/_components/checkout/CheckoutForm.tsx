import cashIcon from "@/public/checkout/icon-cash-on-delivery.svg";
import InputFieldContainer from "@/src/app/_components/auth/InputFieldContainer";
import { CheckoutSchema } from "@/src/app/_lib/schema/checkout-schema";
import { CheckoutSchemaType } from "@/src/app/_types/products/checkout-schema";
import Image from "next/image";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import z from "zod";

interface CheckoutFormType {
  register: UseFormRegister<z.infer<typeof CheckoutSchema>>;
  errors: FieldErrors<CheckoutSchemaType>;
}

export default function CheckoutForm({ register, errors }: CheckoutFormType) {
  return (
    <div className="mt-8 space-y-12">
      {/* BILLING DETAILS */}

      <fieldset className="space-y-5">
        <legend className="brown-text">Billing Details</legend>

        <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
          <InputFieldContainer
            label="Name"
            htmlFor="name"
            error={errors?.name?.message}
          >
            <input
              type="text"
              id="name"
              defaultValue=""
              autoComplete="name"
              placeholder="First Last"
              aria-invalid={!!errors?.name?.message}
              {...register("name")}
            />
          </InputFieldContainer>

          <InputFieldContainer
            label="Email Address"
            htmlFor="email"
            error={errors?.email?.message}
          >
            <input
              type="text"
              id="email"
              defaultValue=""
              autoComplete="email"
              placeholder="xyz@gmail.com"
              aria-invalid={!!errors?.email?.message}
              {...register("email")}
            />
          </InputFieldContainer>

          <InputFieldContainer
            label="Phone Number"
            htmlFor="phone"
            error={errors?.phone?.message}
          >
            <input
              type="text"
              id="phone"
              defaultValue=""
              autoComplete="tel"
              placeholder="+1 202-555-0138"
              aria-invalid={!!errors?.phone?.message}
              {...register("phone")}
            />
          </InputFieldContainer>
        </div>
      </fieldset>

      {/* SHIPPING INFO */}

      <fieldset className="space-y-5">
        <legend className="brown-text">shipping info</legend>

        <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
          <InputFieldContainer
            label="Your Address"
            htmlFor="address"
            error={errors?.address?.message}
            style="sm:col-span-2"
          >
            <input
              type="text"
              id="address"
              defaultValue=""
              autoComplete="billing address-level1"
              placeholder="1137 Williams Avenue"
              aria-invalid={!!errors?.address?.message}
              {...register("address")}
            />
          </InputFieldContainer>

          <InputFieldContainer
            label="ZIP Code"
            htmlFor="zip"
            error={errors?.zip?.message}
          >
            <input
              type="text"
              id="zip"
              defaultValue=""
              autoComplete="billing home tel-area-code"
              placeholder="10001"
              aria-invalid={!!errors?.zip?.message}
              {...register("zip")}
            />
          </InputFieldContainer>

          <InputFieldContainer
            label="City"
            htmlFor="city"
            error={errors?.city?.message}
          >
            <input
              type="text"
              id="city"
              defaultValue=""
              autoComplete="city"
              placeholder="New York"
              aria-invalid={!!errors?.city?.message}
              {...register("city")}
            />
          </InputFieldContainer>

          <InputFieldContainer
            label="Country"
            htmlFor="country"
            error={errors?.country?.message}
          >
            <input
              type="text"
              id="country"
              defaultValue=""
              autoComplete="country-name"
              placeholder="United States"
              aria-invalid={!!errors?.country?.message}
              {...register("country")}
            />
          </InputFieldContainer>
        </div>
      </fieldset>

      {/* PAYMENT DETAILS */}
      <fieldset className="space-y-6">
        <legend className="brown-text">Payment Details</legend>

        <div className="payment-details grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
          {/* PAYMENT METHOD */}

          <div className="payment-method grid grid-cols-1 gap-2 sm:col-span-2 sm:grid-cols-2 sm:items-start">
            <label htmlFor="paymentMethod">Payment Method</label>

            <div className="flex w-full flex-col gap-4">
              {/* E-MONEY */}
              <div className="input-container focus-within:border-brown-dark flex cursor-pointer items-center gap-4 border">
                <input
                  type="radio"
                  id="eMoney"
                  value="eMoney"
                  className="accent-brown-dark size-4 cursor-pointer rounded-full"
                  {...register("paymentMethod")}
                />

                <label htmlFor="eMoney" className="flex-grow cursor-pointer">
                  e-Money
                </label>
              </div>

              {/* CASH ON DELIVERY  */}

              <div className="input-container focus-within:border-brown-dark flex cursor-pointer items-center gap-4 focus-within:border">
                <input
                  type="radio"
                  id="cash"
                  value="cash"
                  className="accent-brown-dark size-4 cursor-pointer rounded-full"
                  {...register("paymentMethod")}
                />

                <label htmlFor="cash" className="cursor-pointer">
                  Cash on Delivery
                </label>
              </div>
              {errors?.paymentMethod?.message && (
                <p className="error-msg text-xs font-bold text-red-700">
                  {errors?.paymentMethod?.message}
                </p>
              )}
            </div>
          </div>

          {/* TODO: THESE 2 FORMS SHOULD ONLY DISPLAY IF E-MONEY IS SELECTED */}
          <InputFieldContainer
            label="e-Money Number"
            htmlFor="eMoneyNum"
            error={errors?.eMoneyNum?.message}
          >
            <input
              type="text"
              id="eMoneyNum"
              defaultValue=""
              placeholder="0020200202"
              aria-invalid={!!errors?.eMoneyNum?.message}
              {...register("eMoneyNum")}
            />
          </InputFieldContainer>
          <InputFieldContainer
            label="e-Money PIN"
            htmlFor="eMoneyPin"
            error={errors?.eMoneyPin?.message}
          >
            <input
              type="text"
              id="eMoneyPin"
              defaultValue=""
              placeholder="8888"
              aria-invalid={!!errors?.eMoneyPin?.message}
              {...register("eMoneyPin")}
            />
          </InputFieldContainer>

          {/* cash on delivery */}
          <div className="gap mb-4 flex items-center gap-8 sm:col-span-2">
            <Image src={cashIcon} alt="cash on delivery" quality={100} />

            <p className="font-medium text-black/50">
              The ‘Cash on Delivery’ option enables you to pay in cash when our
              delivery courier arrives at your residence. Just make sure your
              address is correct so that your order will not be cancelled.
            </p>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
