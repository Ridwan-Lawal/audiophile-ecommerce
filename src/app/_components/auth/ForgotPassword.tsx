"use client";

import InputFieldContainer from "@/src/app/_components/auth/InputFieldContainer";
import { forgotPasswordAction } from "@/src/app/_lib/actions/auth/forgot-password";
import { ForgotPasswordSchema } from "@/src/app/_lib/schema/forgot-password";
import { ForgotPasswordSchemaType } from "@/src/app/_types/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type forgotPasswordKeyType = keyof ForgotPasswordSchemaType;

export default function ForgotPassword() {
  const [isSendingMail, startTransition] = useTransition();
  const { register, handleSubmit, formState, reset, watch, setValue } =
    useForm<ForgotPasswordSchemaType>({
      resolver: zodResolver(ForgotPasswordSchema),
      defaultValues: {
        email: "",
      },
    });

  const { errors } = formState;
  const { email } = watch();
  const isEmailInputFilled = !!email;

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("forgotPassword");

    if (dataFromStorage) {
      const forgotPasswordData: ForgotPasswordSchemaType =
        JSON.parse(dataFromStorage);

      const forgotPasswordDataKeys = Object.keys(
        forgotPasswordData,
      ) as forgotPasswordKeyType[];

      forgotPasswordDataKeys?.forEach((key) =>
        setValue(key, forgotPasswordData[key]),
      );
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("forgotPassword", JSON.stringify({ email }));

    return () => localStorage.removeItem("forgotPassword");
  }, [email]);

  function onSubmit(data: ForgotPasswordSchemaType) {
    startTransition(async () => {
      const res = await forgotPasswordAction(data);

      if (res?.error) {
        toast.error(res.error);
      }

      if (res?.success) {
        toast.success(res.success);
        reset();
      }
    });
  }

  return (
    <div className="mt-14 w-full">
      <form
        action=""
        autoComplete="on"
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFieldContainer
          label="Email Address"
          htmlFor="email"
          error={errors.email?.message}
        >
          <input
            type="text"
            id="email"
            aria-label="email"
            aria-required="true"
            aria-disabled={isSendingMail}
            disabled={isSendingMail}
            defaultValue=""
            autoComplete="email"
            placeholder="Email Address"
            aria-invalid={!!errors.email?.message}
            {...register("email")}
          />
        </InputFieldContainer>

        <button
          aria-disabled={!isEmailInputFilled || isSendingMail}
          disabled={!isEmailInputFilled || isSendingMail}
          className="btn btn-default-2 w-full"
        >
          {isSendingMail ? "Sending mail..." : "Send reset mail"}
        </button>
      </form>
    </div>
  );
}
