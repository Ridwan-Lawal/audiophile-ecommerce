"use client";

import GoogleIcon from "@/src/app/_components/auth/GoogleIcon";
import InputFieldContainer from "@/src/app/_components/auth/InputFieldContainer";
import PasswordVisibilityBtn from "@/src/app/_components/auth/PasswordVisibilityBtn";
import { useShowPassword } from "@/src/app/_hooks/auth/useShowPassword";
import { loginAction } from "@/src/app/_lib/actions/auth/login";
import { LoginSchema } from "@/src/app/_lib/schema/login";
import { LoginSchemaType } from "@/src/app/_types/auth/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/src/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type LoginDataKeysType = keyof LoginSchemaType;

export default function Login() {
  const { showPassword, handleShowPassword } = useShowPassword();
  const [isLoggingIn, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { handleSubmit, reset, formState, register, watch, setValue } =
    useForm<LoginSchemaType>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

  const { email, password } = watch();
  const areAllInputEntered = email && password;
  const formErrors = formState?.errors;

  useEffect(() => {
    const loginDataFromStorage = localStorage.getItem("loginData");

    if (loginDataFromStorage) {
      const loginData: LoginSchemaType = JSON.parse(loginDataFromStorage);

      // Did this to add the data from the logal storage back to the form.
      const loginDataKeys = Object.keys(loginData) as LoginDataKeysType[];

      loginDataKeys.map((key) => setValue(key, loginData[key]));
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("loginData", JSON.stringify({ email, password }));

    return () => localStorage.removeItem("loginData");
  }, [email, password]);

  function onSubmitForm(data: LoginSchemaType) {
    startTransition(async () => {
      const res = await loginAction(data);

      if (res.error) {
        reset({ password: "" });
        toast.error(res.error);
        localStorage.removeItem("loginData");
      }
      if (res.success) {
        reset();

        const callbackUrl = searchParams.get("callbackUrl");
        console.log(DEFAULT_LOGIN_REDIRECT, "redirec");
        router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
      }
    });
  }

  return (
    <div className="w-full">
      <form action="" autoComplete="on" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="space-y-4">
          <InputFieldContainer
            label="Email Address"
            htmlFor="email"
            error={formErrors.email?.message}
          >
            <input
              type="text"
              id="email"
              aria-label="email"
              aria-required="true"
              aria-disabled={isLoggingIn}
              disabled={isLoggingIn}
              defaultValue=""
              autoComplete="email"
              placeholder="Email Address"
              aria-invalid={!!formErrors.email?.message}
              {...register("email")}
            />
          </InputFieldContainer>

          <InputFieldContainer
            label="Password"
            htmlFor="password"
            error={formErrors.password?.message}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              aria-label="password"
              aria-required="true"
              aria-disabled={isLoggingIn}
              disabled={isLoggingIn}
              defaultValue=""
              autoComplete="password"
              placeholder="********"
              aria-invalid={!!formErrors.email?.message}
              {...register("password")}
            />

            <PasswordVisibilityBtn
              showPassword={showPassword}
              onShowPassword={handleShowPassword}
            />
          </InputFieldContainer>
        </div>

        <div className="space-y-4">
          <div className="mt-1 text-right">
            <Link
              href=""
              className="text-almost-black tex-center text-xs underline"
            >
              Forgot your password?
            </Link>
          </div>
          <button
            aria-disabled={!areAllInputEntered || isLoggingIn}
            disabled={!areAllInputEntered || isLoggingIn}
            className="btn btn-default-2 w-full"
          >
            {isLoggingIn ? "Signing in..." : "Login"}
          </button>
        </div>
      </form>

      <div className="bg-white-3 mt-4 h-[1px]" />

      <div className="mt-4 flex flex-col items-center space-y-4">
        <p>Or log in with:</p>
        {/* google button */}

        <button className="btn btn-default-2 group flex w-full items-center justify-center gap-2.5 text-sm font-bold">
          <GoogleIcon hoverStyle="group-hover:fill-white" />
          <span>Google</span>
        </button>

        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

/**
 * install zod
 * install react query
 */
