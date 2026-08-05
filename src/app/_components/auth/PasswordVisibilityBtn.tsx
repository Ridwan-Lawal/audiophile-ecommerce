import { Eye, EyeClosed } from "lucide-react";

interface PasswordVisilityBtnPropsTypes {
  onShowPassword: () => void;
  showPassword: boolean;
}

export default function PasswordVisibilityBtn({
  onShowPassword,
  showPassword,
}: PasswordVisilityBtnPropsTypes) {
  return (
    <button type="button" className="text-gray-500" onClick={onShowPassword}>
      {showPassword ? (
        <EyeClosed className="size-[19px]" />
      ) : (
        <Eye className="size-[19px]" />
      )}
    </button>
  );
}
