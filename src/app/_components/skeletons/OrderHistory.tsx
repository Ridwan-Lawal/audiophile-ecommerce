import { Skeleton } from "@/components/ui/skeleton";

export function OrderHistorySkeleton() {
  return (
    <div className="space-y-6">
      {/* 1. Skeleton for the list of orders */}
      <div className="space-y-4">
        {/* Render 4 placeholder items */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-b-[1.5px] border-neutral-200 pb-4">
            <div className="flex items-center justify-between">
              {/* Skeleton for "order {orderId}" text */}
              <Skeleton className="h-5 w-32" />

              {/* Skeleton for the chevron icon */}
              <Skeleton className="size-6" />
            </div>
          </div>
        ))}
      </div>

      {/* 2. Skeleton for the <OrderPagination /> component */}
      <div className="flex items-center justify-between">
        {/* Skeleton for the "Showing X-Y of Z" text */}
        <Skeleton className="h-5 w-40" />

        {/* Skeleton for the pagination buttons */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-16" />
        </div>
      </div>
    </div>
  );
}
