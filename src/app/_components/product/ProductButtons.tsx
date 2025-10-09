"use client";

import {
  addProductToCart,
  updateProductQuantityInCart,
} from "@/src/app/_lib/actions/cart/checkout";
import {
  getCart,
  onAddProductToCart,
  onUpdateDbCart,
  onUpdateProductQuantity,
} from "@/src/app/_lib/redux/cartSlice";
import { ProductType } from "@/src/app/_lib/schema/product-schema";
import { Minus, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface ProductButtonsType {
  product: ProductType | undefined;
  userId: string | undefined;
}

export default function ProductButtons({
  product,
  userId,
}: ProductButtonsType) {
  const dispatch = useDispatch();
  const { cart: cartFromState, cartFromDb } = useSelector(getCart);
  const [isAddingToCart, startTransition] = useTransition();
  const params = useParams();
  const slug = params?.slug as string;

  const currentProductInOfflineCart = cartFromState?.find(
    (cartProduct) => cartProduct?.name === product?.name,
  );

  const currentProductInDbCart = cartFromDb?.find(
    (cartProduct) =>
      cartProduct?.name === product?.name && cartProduct?.userid === userId,
  );

  const currentProductInCart = !!userId
    ? currentProductInDbCart
    : currentProductInOfflineCart;

  const handleProductQuantity = async (order: "incr" | "decr") => {
    if (userId && product?.id && currentProductInDbCart?.quantity) {
      const quantity =
        order === "incr"
          ? currentProductInDbCart.quantity + 1
          : currentProductInDbCart.quantity === 0
            ? currentProductInDbCart?.quantity
            : currentProductInDbCart.quantity - 1;

      // optimistic db cart update
      dispatch(
        onUpdateDbCart({
          type: "update",
          id: currentProductInDbCart?.id,
          quantity,
        }),
      );

      // db cart update
      const response = await updateProductQuantityInCart(
        currentProductInDbCart?.id,
        quantity,
        slug,
      );

      if (response?.error) {
        toast.error(response?.error);
      }
    } else {
      // use ui state
      if (currentProductInOfflineCart) {
        dispatch(
          onUpdateProductQuantity({
            id: currentProductInOfflineCart?.id,
            order,
          }),
        );
      }
    }
  };

  function handleProductAddToCart() {
    const productToCart = {
      product_id: product?.id ?? "",
      name: product?.name ?? "",
      image: product?.image?.mobile ?? "",
      price: product?.price ?? 0,
      quantity: 1,
      id: `temp-${crypto.randomUUID()}`,
      userid: null,
      created_at: new Date().toISOString(),
      slug,
    };

    if (userId && product?.id) {
      // optimistic db cart update
      dispatch(
        onUpdateDbCart({
          type: "add",
          newProduct: { ...productToCart, userid: userId, slug },
        }),
      );
      // Database update
      startTransition(async () => {
        const response = await addProductToCart(
          product?.id,
          { ...productToCart, userid: userId, slug },
          slug,
        );

        if (response.error) {
          toast.error(response.error);
        }
        if (response.success) {
          toast.success(response.success);
        }
      });
    } else {
      dispatch(onAddProductToCart(productToCart));
    }
  }

  return (
    <div className="mt-8 flex items-center gap-4">
      {/* quantity control */}
      {currentProductInCart && (
        <button className="number-container h-[48px] w-[120px] justify-between p-4">
          <Minus
            className="size-3 text-black/25"
            onClick={() => handleProductQuantity("decr")}
          />

          <span>{currentProductInCart?.quantity}</span>

          <Plus
            className="size-3 text-black/30"
            onClick={() => handleProductQuantity("incr")}
          />
        </button>
      )}

      {!currentProductInCart && (
        <button
          className="btn btn-default uppercase"
          onClick={() => handleProductAddToCart()}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? "Adding product..." : "add to cart"}
        </button>
      )}
    </div>
  );
}
