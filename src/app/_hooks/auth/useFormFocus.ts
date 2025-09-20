import { useEffect, useRef, useState } from "react";

export function useFormFocus() {
  const [inputIsFocus, setInputIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const nameInputEl = inputRef.current;
    if (!nameInputEl) return;

    function onFocusInput() {
      console.log(focus);
      setInputIsFocus(true);
    }

    function onBlurInput() {
      setInputIsFocus(false);
    }

    nameInputEl.addEventListener("focusin", onFocusInput);
    nameInputEl.addEventListener("blur", onBlurInput);

    return () => {
      nameInputEl.removeEventListener("focus", onFocusInput);
      nameInputEl.addEventListener("blur", onBlurInput);
    };
  }, []);

  return {
    inputIsFocus,
    inputRef,
  };
}

export function useFormInputsFocus() {
  const { inputIsFocus: nameIsFocus, inputRef: nameRef } = useFormFocus();
  const { inputIsFocus: emailIsFocus, inputRef: emailRef } = useFormFocus();
  const { inputIsFocus: passwordIsFocus, inputRef: passwordRef } =
    useFormFocus();
  const { inputIsFocus: confirmPasswordIsFocus, inputRef: confirmPasswordRef } =
    useFormFocus();

  return {
    nameIsFocus,
    nameRef,
    emailIsFocus,
    emailRef,
    passwordIsFocus,
    passwordRef,
    confirmPasswordIsFocus,
    confirmPasswordRef,
  };
}
