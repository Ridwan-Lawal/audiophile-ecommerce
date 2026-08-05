import { Skeleton } from "@/components/ui/skeleton";

export function CategorySkeleton() {
  return (
    <div className="block__container space-y-14 pt-12 lg:mt-12 lg:space-y-24">
      {[1, 2, 3].map((index) => (
        <div
          className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20"
          key={index}
        >
          {/* Image Skeleton */}
          <Skeleton className="h-[352px] w-full rounded-md lg:h-[560px] lg:w-1/2" />

          {/* Content Skeleton */}
          <div className="flex flex-col items-center gap-6 text-center lg:w-1/2 lg:items-start lg:text-left">
            {/* "NEW PRODUCT" badge skeleton */}
            <Skeleton className="h-4 w-32" />

            {/* Title skeleton */}
            <div className="w-full space-y-3">
              <Skeleton className="mx-auto h-8 w-3/4 lg:mx-0" />
              <Skeleton className="mx-auto h-8 w-2/3 lg:mx-0" />
            </div>

            {/* Description skeleton */}
            <div className="mx-auto w-full max-w-[450px] space-y-2 lg:mx-0 lg:mr-auto">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-9/12" />
            </div>

            {/* Button skeleton */}
            <Skeleton className="mt-2 h-12 w-40" />
          </div>
        </div>
      ))}
    </div>
  );
}
