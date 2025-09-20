"use client";

import InputFieldContainer from "@/src/app/_components/auth/InputFieldContainer";
import PasswordVisibilityBtn from "@/src/app/_components/auth/PasswordVisibilityBtn";
import { useShowPassword } from "@/src/app/_hooks/auth/useShowPassword";
import { resetPasswordAction } from "@/src/app/_lib/actions/auth/forgot-password";
import { ResetPasswordSchema } from "@/src/app/_lib/schema/forgot-password";
import { PasswordResetSchemaType } from "@/src/app/_types/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { showPassword, handleShowPassword } = useShowPassword();
  const [isResetingPassword, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("tkn");

  const { register, handleSubmit, reset, watch, formState } =
    useForm<PasswordResetSchemaType>({
      resolver: zodResolver(ResetPasswordSchema),
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
    });

  const { errors } = formState;
  const { password, confirmPassword } = watch();
  const areAllInputsField = password && confirmPassword;

  function onSubmit(data: PasswordResetSchemaType) {
    if (!tokenFromUrl) {
      toast.error("There's no available token");
      return;
    }

    const updatedResetPasswordAction = resetPasswordAction.bind(
      null,
      tokenFromUrl,
    );

    startTransition(async () => {
      const res = await updatedResetPasswordAction(data);

      if (res?.error) {
        toast.error(res.error);
      }
      if (res?.success) {
        toast.success(res.success);
        reset();
        router.push("/login");
      }
    });
  }

  return (
    <div className="w-full">
      <form
        action=""
        autoComplete="on"
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFieldContainer
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            defaultValue=""
            disabled={isResetingPassword}
            aria-disabled={isResetingPassword}
            autoComplete="password"
            aria-label="password"
            aria-required="true"
            placeholder="********"
            aria-invalid={!!errors.password?.message}
            {...register("password")}
          />

          <PasswordVisibilityBtn
            showPassword={showPassword}
            onShowPassword={handleShowPassword}
          />
        </InputFieldContainer>

        <InputFieldContainer
          label="Confirm Password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
        >
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            defaultValue=""
            disabled={isResetingPassword}
            aria-disabled={isResetingPassword}
            autoComplete="confirmPassword"
            aria-label="confirm password"
            aria-required="true"
            placeholder="********"
            aria-invalid={!!errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <PasswordVisibilityBtn
            showPassword={showPassword}
            onShowPassword={handleShowPassword}
          />
        </InputFieldContainer>

        <button
          aria-disabled={!areAllInputsField || isResetingPassword}
          disabled={!areAllInputsField || isResetingPassword}
          className="btn btn-default-2 w-full"
        >
          {isResetingPassword ? "Resetting password..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
