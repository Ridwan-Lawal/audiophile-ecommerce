"use client";

import orderConfirmIcon from "@/public/checkout/icon-order-confirmation.svg";
import { useGetUser } from "@/src/app/_hooks/auth/useGetUser";
import { blurDataUrl } from "@/src/app/_lib/blurdataurl";
import { SHIPPING_FEE } from "@/src/app/_lib/constants";
import { getCart, onToggleSuccessModal } from "@/src/app/_lib/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/_lib/redux/hooks";
import { getOrdersClient } from "@/src/app/_lib/services/history/order-history-client";
import { CartDbType } from "@/src/app/_lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  const { user } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();

  const { data: orderDetails, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersClient(user?.id),
  });

  console.log(orderDetails?.ordered_items);

  const { isSuccessModalOpen } = useAppSelector(getCart);
  const dispatch = useAppDispatch();

  const cartProducts = orderDetails?.ordered_items as CartDbType[];

  const firstProductToDisplay = cartProducts?.at(0);

  const otherItemsLength = cartProducts?.slice(1).length;

  const grandTotal = cartProducts?.reduce(
    (acc, curCartProduct) =>
      acc + curCartProduct?.price * curCartProduct?.quantity,
    0,
  );

  useEffect(() => {
    function handleOnBlurModal(e: MouseEvent) {
      const targetEl = e.target as HTMLElement;

      if (isSuccessModalOpen && !targetEl.closest(".success-modal")) {
        dispatch(onToggleSuccessModal(false));
        router.push("/");
      }
    }

    window.addEventListener("click", handleOnBlurModal);

    return () => window.removeEventListener("click", handleOnBlurModal);
  }, [dispatch, isSuccessModalOpen, router]);

  useEffect(() => {
    dispatch(onToggleSuccessModal(false));
  }, [pathname]);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <AnimatePresence>
      {isSuccessModalOpen && (
        <motion.div
          initial={{ visibility: "hidden", opacity: 0 }}
          animate={{ visibility: "visible", opacity: 1 }}
          exit={{ visibility: "hidden", opacity: 0 }}
          className="fixed top-0 z-50 flex h-screen w-full items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: "90%" }}
            animate={{ scale: "100%" }}
            exit={{ scale: "90%" }}
            className="rounded- success-modal mx-auto w-full max-w-[540px] space-y-8 rounded-[8px] bg-white px-7 py-10 sm:px-9 sm:py-10"
          >
            <div className="">
              <Image
                src={orderConfirmIcon}
                alt="order confirmed"
                quality={100}
                priority
              />

              <h5 className="mt-5 uppercase sm:mt-7">
                Thank You <br /> for your order
              </h5>

              <p className="mt-4 text-black/50 sm:mt-5">
                You will recieve an email confirmation shortly
              </p>
            </div>

            {/* div */}
            <div className="relative overflow-hidden rounded-[8px] sm:flex sm:h-[150px]">
              <div className="bg-white-3 ov px-6 py-5 sm:w-[60%]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="relative size-[50px]">
                      <Image
                        src={firstProductToDisplay?.image?.slice(1) ?? ""}
                        alt={firstProductToDisplay?.name ?? "No image"}
                        fill
                        className="object-vover"
                        quality={100}
                        placeholder="blur"
                        blurDataURL={blurDataUrl}
                        priority
                      />
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold uppercase">
                        {firstProductToDisplay?.name}
                      </p>
                      <p className="text-sm font-bold text-black/50 uppercase">
                        ${firstProductToDisplay?.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-black/50">
                    x{firstProductToDisplay?.quantity}
                  </p>
                </div>

                <div className="mt-2 h-[1px] bg-black/10" />

                <p className="mt-2 text-center text-xs font-bold tracking-[-0.21px] text-black/50">
                  and {otherItemsLength} other item(s)
                </p>
              </div>
              <div className="flex h-[92px] flex-col justify-center gap-2 bg-black object-cover px-6 sm:h-full sm:w-[40%]">
                <p className="text-neutral-400 uppercase">grand total</p>
                <p className="text-lg font-bold text-white">
                  ${(grandTotal + SHIPPING_FEE)?.toLocaleString()}
                </p>
              </div>
            </div>

            <Link href="/">
              <button className="btn btn-default w-full uppercase">
                back to home
              </button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
