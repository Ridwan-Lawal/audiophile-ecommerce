import { useState } from "react";

export function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((cur) => !cur);

  return { showPassword, handleShowPassword };
}
