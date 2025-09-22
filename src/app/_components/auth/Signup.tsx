"use client";

import GoogleIcon from "@/src/app/_components/auth/GoogleIcon";
import InputFieldContainer from "@/src/app/_components/auth/InputFieldContainer";
import PasswordVisibilityBtn from "@/src/app/_components/auth/PasswordVisibilityBtn";
import { useShowPassword } from "@/src/app/_hooks/auth/useShowPassword";
import { signupAction } from "@/src/app/_lib/actions/auth/signup";
import { SignupSchema } from "@/src/app/_lib/schema/signup";
import { SignupSchemaType } from "@/src/app/_types/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type SignupSchemaTypeKeys = keyof SignupSchemaType;

export default function Signup() {
  const { showPassword, handleShowPassword } = useShowPassword();
  const [isSubmittingForm, startTransition] = useTransition();

  const { handleSubmit, register, formState, watch, setValue, reset } =
    useForm<SignupSchemaType>({
      resolver: zodResolver(SignupSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
  const { errors } = formState;
  const formValues = watch();
  console.log(formValues, "formvalues");
  const allFieldAreFilled =
    formValues.name &&
    formValues.email &&
    formValues.password &&
    formValues.confirmPassword;

  useEffect(() => {
    const storageSignupData = localStorage.getItem("signup");
    if (storageSignupData) {
      const signupInputsData: SignupSchemaType = JSON.parse(storageSignupData);

      // Implemented the below to set the default value of the form to the data from local storage
      const inputsDataKeys = Object.keys(
        signupInputsData,
      ) as SignupSchemaTypeKeys[];

      inputsDataKeys.forEach((key) =>
        setValue(key as SignupSchemaTypeKeys, signupInputsData[key]),
      );
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("signup", JSON.stringify(formValues));
  }, [formValues]);

  function onSubmitForm(data: SignupSchemaType) {
    console.log(data, "submitttttttttttttttt");
    startTransition(async () => {
      const res = await signupAction(data);

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
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)} action="" autoComplete="on">
        <div className="space-y-4">
          <InputFieldContainer
            label="Name"
            htmlFor="name"
            error={errors.name?.message}
          >
            <input
              type="text"
              id="name"
              defaultValue=""
              disabled={isSubmittingForm}
              aria-disabled={isSubmittingForm}
              autoComplete="name"
              aria-label="name"
              aria-required="true"
              placeholder="Name"
              aria-invalid={!!errors.name?.message}
              {...register("name")}
            />
          </InputFieldContainer>

          <InputFieldContainer
            label="Email Address"
            htmlFor="email"
            error={errors.email?.message}
          >
            <input
              type="text"
              id="email"
              defaultValue=""
              disabled={isSubmittingForm}
              aria-disabled={isSubmittingForm}
              autoComplete="email"
              aria-label="email"
              aria-required="true"
              placeholder="Email Address"
              aria-invalid={!!errors.email?.message}
              {...register("email")}
            />
          </InputFieldContainer>

          <InputFieldContainer
            label="Password"
            htmlFor="password"
            error={errors.password?.message}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              defaultValue=""
              disabled={isSubmittingForm}
              aria-disabled={isSubmittingForm}
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
              disabled={isSubmittingForm}
              aria-disabled={isSubmittingForm}
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
        </div>

        <div className="mt-6 space-y-4">
          <button
            aria-disabled={isSubmittingForm}
            disabled={!allFieldAreFilled || isSubmittingForm}
            className="btn btn-default-2 w-full"
          >
            {isSubmittingForm ? "Signing up..." : " Sign up"}
          </button>
        </div>
      </form>

      <div className="bg-white-3 mt-4 h-[1px]" />

      <div className="mt-4 flex flex-col items-center space-y-4">
        <p>Or log in with:</p>
        {/* google button */}

        <button
          className="btn btn-default-2 group flex w-full items-center justify-center gap-2.5 text-sm font-bold"
          disabled={isSubmittingForm}
          aria-disabled={isSubmittingForm}
          onClick={() => signIn("google", { redirectTo: "/" })}
        >
          <GoogleIcon hoverStyle="group-hover:fill-white" />
          <span>Google</span>
        </button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-bold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/**
 * build the login page
 * install zod
 * install react query
 */
