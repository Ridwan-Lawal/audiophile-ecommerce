"use client";

import { useGetUser } from "@/src/app/_hooks/auth/useGetUser";
import { blurDataUrl } from "@/src/app/_lib/blurdataurl";
import { getCartProductsClient } from "@/src/app/_lib/services/checkout/cart-client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface OrderSummaryType {
  isAllInputsFilled: boolean;
}

export default function OrderSummary({ isAllInputsFilled }: OrderSummaryType) {
  const user = useGetUser();

  console.log(isAllInputsFilled, "yess");

  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCartProductsClient(user?.id),
  });

  const total = cart?.reduce(
    (acc, curProduct) => acc + curProduct?.quantity * curProduct?.price,
    0,
  );

  const pricing = [
    { name: "total", price: total },
    { name: "shipping", price: 50 },
  ];

  const grandTotal = pricing?.reduce(
    (acc, curPrice) => acc + (curPrice?.price ?? 0),
    0,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    throw new Error(error?.message);
  }

  return (
    <div className="space-y-10 rounded-[8px] bg-white px-6 py-8">
      <h6 className="uppercase">Summary</h6>

      {/* cart products */}
      <div className="space-y-5">
        {cart?.map((product) => (
          <div key={product?.id} className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative size-16 rounded-lg">
                <Image
                  src={product?.image?.slice(1)}
                  alt={product?.name}
                  fill
                  className="object-cover"
                  quality={100}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  priority
                />
              </div>

              <div className="space-y-1">
                <p className="font-bold">{product?.name}</p>

                <p className="text-sm font-bold text-black/50">
                  ${product?.price?.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-sm font-bold text-black/50">
              x{product?.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* pricing */}
      <div className="space-y-8">
        <div className="space-y-3">
          {pricing?.map((pricingObj, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <p className="text-[15px] font-medium text-black/50 uppercase">
                {pricingObj?.name}
              </p>

              <h6 className="font-bold">
                ${pricingObj?.price?.toLocaleString()}
              </h6>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium text-black/50 uppercase">grand total</p>

          <h6 className="font-bold">${grandTotal?.toLocaleString()}</h6>
        </div>

        <button
          className="btn btn-default w-full uppercase disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isAllInputsFilled}
          aria-disabled={!isAllInputsFilled}
        >
          continue & pay
        </button>
      </div>
    </div>
  );
}
