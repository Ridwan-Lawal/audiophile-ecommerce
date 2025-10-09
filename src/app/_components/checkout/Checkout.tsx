"use client";

import { getCart } from "@/src/app/_lib/redux/cartSlice";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Checkout() {
  const [_, startTransition] = useTransition();
  const dispatch = useDispatch();
  const { cart: offlineCart } = useSelector(getCart);

  //   ADD STORED OFFLINE CART TO DB
  // useEffect(() => {
  //   const cartFromLs = localStorage.getItem("temp-cart");

  //   if (cartFromLs) {
  //     startTransition(async () => {
  //       const response = await addCartOnPageMountAction(JSON.parse(cartFromLs));

  //       if (response?.error) {
  //         toast.error(response.error);
  //       }

  //       if (response?.success) {
  //         dispatch();
  //       }
  //     });
  //   }
  // }, []);

  return <div>Checkout</div>;
}
