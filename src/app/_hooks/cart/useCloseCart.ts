import { getCart, onToggleCart } from "@/src/app/_lib/redux/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useCloseCart() {
  const { isCartOpen, cart } = useSelector(getCart);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleCloseCart(e: MouseEvent) {
      const targetEl = e.target as HTMLElement;
      const isElementClickInsideOfCart = targetEl.closest(".cartBlock");
      const isCartButton = targetEl.closest(".cart-button");

      console.log(targetEl.closest, targetEl);

      console.log(
        isElementClickInsideOfCart,
        "elemennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt",
      );
      if (isCartOpen) {
        if (!isElementClickInsideOfCart) {
          dispatch(onToggleCart(false));
        }
      }
    }

    document.addEventListener("click", handleCloseCart);

    return () => document.removeEventListener("click", handleCloseCart);
  }, [dispatch, isCartOpen]);

  return { isCartOpen, dispatch, cart };
}
