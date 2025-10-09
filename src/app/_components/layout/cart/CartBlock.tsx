"use client";

import CartProductCard from "@/src/app/_components/layout/cart/CartProductCard";
import { useCloseCart } from "@/src/app/_hooks/cart/useCloseCart";
import { RemoveAllProductRemovalFromCart } from "@/src/app/_lib/actions/cart/checkout";
import {
  getCart,
  onDeleteAllCartProductFromOfflineCart,
  onRemoveAllDbCartProduct,
  onToggleCart,
} from "@/src/app/_lib/redux/cartSlice";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface CartCompType {
  isSignedIn: boolean;
}

export default function CartBlock({ isSignedIn }: CartCompType) {
  const { isCartOpen, dispatch, cart: cartFromState } = useCloseCart();
  const { cartFromDb } = useSelector(getCart);

  const cart = isSignedIn ? cartFromDb : cartFromState;

  // Logout and check if everything is working fine with the offline cart

  async function handleAllCartProductDeletion() {
    if (!isSignedIn) {
      dispatch(onDeleteAllCartProductFromOfflineCart());
    } else {
      // optimistic cart product removal
      dispatch(onRemoveAllDbCartProduct());

      // Cart removal from db
      const res = await RemoveAllProductRemovalFromCart();

      if (res.error) {
        toast.error(res.error);
      }
    }
  }

  const totalPrice = cart?.reduce(
    (acc, cur) => acc + cur?.price * cur?.quantity,
    0,
  );

  console.log(totalPrice);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0, transition: { when: "afterChildren" } }}
          animate={{ opacity: 1, transition: { when: "beforeChildren" } }}
          exit={{ opacity: 0, transition: { when: "afterChildren" } }}
          transition={{ ease: "easeIn" }}
          className={`fixed top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center gap-8 border bg-black/40 py-28 backdrop-blur-[1px] sm:items-end sm:justify-start sm:py-10 sm:pr-10`}
        >
          <div className="flex w-[320px] justify-end border">
            <button className="w-fit" onClick={() => dispatch(onToggleCart())}>
              <X className="text-white" />
            </button>
          </div>
          <div
            className={`lg; hide-scrollbar h-[488px] max-w-[400px] overflow-y-scroll rounded-[8px] border-2 border-black bg-white px-6 py-8 sm:w-full sm:max-w-[377px] ${isCartOpen ? "scale-100" : "scale-75"} cartBlock relative transition-transform`}
            id="cart-block"
          >
            <header className="flex items-center justify-between">
              <h6 className="uppercase">cart ({cart?.length ?? 0})</h6>

              <button
                className={`leading-[25px] text-black/50 underline ${totalPrice === 0 ? "hidden" : "block"}`}
                onClick={handleAllCartProductDeletion}
              >
                Remove all
              </button>
            </header>

            {/* items */}
            <main className="mt-8 flex flex-col gap-6">
              {/* item */}
              {cart?.length && cart ? (
                cart?.map((product, idx) => (
                  <CartProductCard
                    key={idx}
                    product={product}
                    isSignedIn={isSignedIn}
                  />
                ))
              ) : (
                <p className="text-center">
                  Your cart is empty
                  <br />
                  Start adding your favorite audio products
                </p>
              )}
            </main>

            {/* price and checkout button */}
            {totalPrice !== 0 && (
              <footer className="mt-8 flex w-full flex-col gap-6">
                <div className="flex items-center justify-between">
                  <p className="text-black/50 uppercase">total</p>

                  <h6 className="font-bold">
                    ${totalPrice?.toLocaleString() ?? 0}
                  </h6>
                </div>

                <Link href="/checkout">
                  <button
                    className="btn btn-default w-full uppercase disabled:opacity-40"
                    disabled={totalPrice === 0}
                  >
                    checkout
                  </button>
                </Link>
              </footer>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// continue with the cart functionality, toggling the cart and others
