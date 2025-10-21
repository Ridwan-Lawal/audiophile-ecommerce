"use client";

import ChangePasswordInput from "@/src/app/_components/settings/ChangePasswordInput";
import { useGetUser } from "@/src/app/_hooks/auth/useGetUser";
import { useShowPassword } from "@/src/app/_hooks/auth/useShowPassword";
import { changePasswordAction } from "@/src/app/_lib/actions/settings/change-password-action";
import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
} from "@/src/app/_lib/schema/change-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, EyeClosed, EyeIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ChangePasswordForm() {
  const { user } = useGetUser();
  const [isChangingPassword, startTransition] = useTransition();
  const { showPassword, handleShowPassword } = useShowPassword();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { register, handleSubmit, formState, watch, reset } =
    useForm<ChangePasswordSchemaType>({
      resolver: zodResolver(ChangePasswordSchema),
    });

  const { curPassword, newPassword } = formState?.errors;

  const allInputFieldValues = watch();
  const areAllFormInputsFilledOut = Object.values(allInputFieldValues)?.every(
    (value) => value,
  );

  console.log(areAllFormInputsFilledOut);

  function onSubmitForm(data: ChangePasswordSchemaType) {
    console.log(data);
    startTransition(async () => {
      const res = await changePasswordAction(data);

      if (res?.success) {
        toast.success(res?.success);
        reset();
      }

      if (res?.error) {
        toast.error(res?.error);
      }
    });
  }

  const onToggleDropdown = () => setIsDropdownOpen((cur) => !cur);

  return (
    <div className="mx-auto max-w-[1100px] rounded-md bg-white px-5 py-5">
      <div className="flex items-center justify-between">
        <p className="font-medium uppercase">Change password</p>

        <button
          className={`${isDropdownOpen ? "rotate-180" : "rotate-0"} transition-all`}
          onClick={onToggleDropdown}
        >
          <ChevronDown />
        </button>
      </div>

      <motion.form
        onSubmit={handleSubmit(onSubmitForm)}
        action=""
        autoComplete="on"
        className={`space-y-6 overflow-hidden`}
        animate={{
          height: isDropdownOpen ? 230 : 0,
          opacity: isDropdownOpen ? 1 : 0,
          marginTop: isDropdownOpen ? "28px" : "0px",
        }}
      >
        {user?.isAccountByOAuth && (
          <p className="rounded-md bg-red-200 px-4 py-1.5 text-xs font-bold text-red-500">
            You can&apos;t change password, as you signed up your account using
            an OAuth provider e.g Google, Apple, Facebook e.t.c.
          </p>
        )}
        <ChangePasswordInput
          htmlfor="curPassword"
          label="Current Password"
          error={curPassword?.message}
        >
          <input
            type={showPassword ? "text" : "password"}
            id="curPassword"
            defaultValue=""
            placeholder="*********"
            className="flex-grow py-2.5 text-sm focus:outline-none"
            aria-invalid={!!curPassword?.message}
            disabled={user?.isAccountByOAuth || isChangingPassword}
            aria-disabled={user?.isAccountByOAuth || isChangingPassword}
            {...register("curPassword")}
          />

          <button
            type="button"
            onClick={handleShowPassword}
            className="cursor-pointer"
          >
            {showPassword ? (
              <EyeClosed className="size-5 text-neutral-500" />
            ) : (
              <EyeIcon className="size-5 text-neutral-500" />
            )}
          </button>
        </ChangePasswordInput>

        <ChangePasswordInput
          htmlfor="newPassword"
          label="New Password"
          error={newPassword?.message}
        >
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            defaultValue=""
            placeholder="**********"
            className="flex-grow py-2.5 text-sm focus:outline-none"
            aria-invalid={!!newPassword?.message}
            disabled={user?.isAccountByOAuth || isChangingPassword}
            aria-disabled={user?.isAccountByOAuth || isChangingPassword}
            {...register("newPassword")}
          />

          <button
            type="button"
            onClick={handleShowPassword}
            className="cursor-pointer"
          >
            {showPassword ? (
              <EyeClosed className="size-5 text-neutral-500" />
            ) : (
              <EyeIcon className="size-5 text-neutral-500" />
            )}
          </button>
        </ChangePasswordInput>

        {/* button */}
        <button
          className="btn btn-default-2 w-full rounded-sm disabled:cursor-not-allowed disabled:opacity-90"
          disabled={
            user?.isAccountByOAuth ||
            isChangingPassword ||
            !areAllFormInputsFilledOut
          }
          aria-disabled={
            user?.isAccountByOAuth ||
            isChangingPassword ||
            !areAllFormInputsFilledOut
          }
        >
          {isChangingPassword ? "Changing Password" : "Change Password"}
        </button>
      </motion.form>
    </div>
  );
}
