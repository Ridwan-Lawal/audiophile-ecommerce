import { Skeleton } from "@/components/ui/skeleton";

export function SummarySkeleton() {
  return (
    <div className="space-y-10 rounded-[8px] bg-white px-6 py-8">
      {/* 1. Static Title */}
      <h6 className="uppercase">Summary</h6>

      {/* 2. Cart products skeleton */}
      <div className="space-y-5">
        {/* We'll create 2 placeholder items */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* Image skeleton */}
              <Skeleton className="size-16 rounded-lg" />
              {/* Text lines skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            {/* Quantity skeleton */}
            <Skeleton className="h-5 w-6" />
          </div>
        ))}
      </div>

      {/* 3. Pricing skeleton */}
      <div className="space-y-8">
        {/* Mapped pricing lines skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        {/* Grand total skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-6 w-28" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
