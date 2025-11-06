import OrderHistory from "@/src/app/_components/orderhistory/OrderHistory";
import BackButton from "@/src/app/_components/product/BackButton";
import { OrderHistorySkeleton } from "@/src/app/_components/skeletons/OrderHistory";
import { Suspense } from "react";

export type PaginationSearchParamsType = Promise<{ page?: string }>;

export default async function Page({
  searchParams,
}: {
  searchParams: PaginationSearchParamsType;
}) {
  const { page } = await searchParams;

  return (
    <div className="bg-white-3">
      <div className="mx-auto max-w-[1100px] border px-6 pt-8 pb-16">
        <BackButton />

        <div className="mt-8 space-y-8 rounded-lg bg-white px-6 py-8">
          <h6 className="uppercase">order history</h6>

          <Suspense fallback={<OrderHistorySkeleton />} key={page}>
            <OrderHistory page={page} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
