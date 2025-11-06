"use client";

import { blurDataUrl } from "@/src/app/_lib/blurdataurl";
import {
  getCart,
  onClickOrderHistoryCard,
} from "@/src/app/_lib/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/_lib/redux/hooks";
import { CartDataType } from "@/src/app/_lib/schema/cart-shema";
import { OrderHistory } from "@/src/app/_lib/supabase/server";
import { getFormattedDate } from "@/src/app/utils/date";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, easeIn, motion } from "motion/react";
import Image from "next/image";

export default function OrderHistoryCard({ order }: { order: OrderHistory }) {
  const orderId = `#${order?.id?.slice(0, 6)}`;
  const { openedOrderHistoryCardId } = useAppSelector(getCart);

  const dispatch = useAppDispatch();
  const isCurrentCardOpen = openedOrderHistoryCardId === orderId;

  const orderedItems = order?.ordered_items as CartDataType;

  return (
    <div className="border-neutral-2 00 border-b-[1.5px] pb-4">
      <div className="flex items-center justify-between">
        <p className="uppercase">order {orderId}</p>

        <ChevronDown
          className={`size-6 cursor-pointer ${isCurrentCardOpen ? "rotate-180" : "rotate-0"} transition-transform`}
          onClick={() => dispatch(onClickOrderHistoryCard(orderId))}
        />
      </div>

      <AnimatePresence>
        {isCurrentCardOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: easeIn }}
            className="mt-4 overflow-hidden rounded-md bg-gray-50 p-4"
          >
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <p>{order?.name}</p>
              <p>{order?.phone}</p>
              <p className="c">
                {order?.address}, {order?.city}, {order?.country}, {order?.zip}.
              </p>
              <p>{getFormattedDate(order?.created_at)}</p>
            </div>

            <div className="mt-5 space-y-4 rounded-lg bg-white p-4">
              {orderedItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-8">
                    <div className="relative size-[50px]">
                      <Image
                        src={item?.image?.slice(1) ?? ""}
                        alt={item?.name ?? "No image"}
                        fill
                        className="object-vover"
                        quality={100}
                        placeholder="blur"
                        blurDataURL={blurDataUrl}
                        priority
                      />
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold uppercase">{item?.name}</p>
                      <p className="text-sm font-bold text-black/50 uppercase">
                        ${item?.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-black/50">x{item?.quantity}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// TODO: Pagination
