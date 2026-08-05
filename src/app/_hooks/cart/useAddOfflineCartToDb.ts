import { addCartOnPageMountAction } from "@/src/app/_lib/actions/cart/checkout";
import {
  getCart,
  onDeleteAllCartProductFromOfflineCart,
} from "@/src/app/_lib/redux/cartSlice";
import { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useAddOfflineCartToDb() {
  const [_, startTransition] = useTransition();
  const dispatch = useDispatch();
  const { cart: offlineCart } = useSelector(getCart);

  // ADD STORED OFFLINE CART TO DB
  useEffect(() => {
    if (offlineCart?.length) {
      startTransition(async () => {
        const response = await addCartOnPageMountAction(offlineCart);

        // if (response?.error) {
        //   toast.error(response.error);
        // }

        if (response?.success) {
          dispatch(onDeleteAllCartProductFromOfflineCart());
        }
      });
    }
  }, [dispatch, offlineCart]);
}
