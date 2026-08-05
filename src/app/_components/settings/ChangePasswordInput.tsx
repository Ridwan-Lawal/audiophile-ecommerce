import { PropsWithChildren } from "react";

interface ChangePasswordInputType extends PropsWithChildren {
  label: string;
  htmlfor: string;
  error?: string;
}

export default function ChangePasswordInput({
  children,
  label,
  htmlfor,
  error,
}: ChangePasswordInputType) {
  return (
    <fieldset className="flex flex-col gap-2">
      <label htmlFor={htmlfor} className="text-xs font-bold">
        {label}
      </label>

      <div className="border-[ #e0dede] focus-within:border-brown-dark flex items-center justify-between gap-6 rounded-sm border px-4 focus-within:border">
        {children}
      </div>
      {error && (
        <p className="error-msg mt-1 text-[11px] font-bold text-red-500">
          {error}
        </p>
      )}
    </fieldset>
  );
}
