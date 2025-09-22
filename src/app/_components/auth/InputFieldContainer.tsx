import { PropsWithChildren } from "react";

interface InputFieldContainerPropsType extends PropsWithChildren {
  label: string;
  htmlFor: string;
  error?: string;
}

export default function InputFieldContainer({
  children,
  label,
  htmlFor,
  error,
}: InputFieldContainerPropsType) {
  return (
    <div className="field-container">
      <label htmlFor={htmlFor}>{label}</label>
      <div
        className={`input-container focus-within:border-brown-dark focus-within:border`}
      >
        {children}
      </div>
      {error && (
        <div className="error-msg" role="alert">
          {error as unknown as string}
        </div>
      )}
    </div>
  );
}
