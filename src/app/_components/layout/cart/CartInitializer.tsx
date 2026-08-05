"use client";

import { onAddDbCartOnMount } from "@/src/app/_lib/redux/cartSlice";
import { CartDataType } from "@/src/app/_lib/schema/cart-shema";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CartInitializer({
  cartProducts,
}: {
  cartProducts: CartDataType | undefined;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onAddDbCartOnMount(cartProducts));
  }, [dispatch]);

  return null;
}
