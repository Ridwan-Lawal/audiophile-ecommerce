import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-[700px] space-y-20 px-6 pt-4 lg:max-w-[1100px] lg:pt-20">
      {/* Back Button Skeleton */}
      <Skeleton className="h-6 w-20" />

      {/* Product Details Section */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-32">
        {/* Product Image Skeleton */}
        <Skeleton className="h-[352px] w-full rounded-lg lg:h-[560px] lg:w-1/2" />

        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          {/* "NEW PRODUCT" Badge */}
          <Skeleton className="h-4 w-32" />

          {/* Product Name */}
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-1/2" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Price */}
          <Skeleton className="h-8 w-32" />

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col gap-20 lg:flex-row lg:gap-32">
        <div className="flex flex-col gap-6 lg:w-3/5">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-9/12" />
          </div>
        </div>

        {/* In The Box Section */}
        <div className="flex flex-col gap-6 lg:w-2/5">
          <Skeleton className="h-8 w-40" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-5 lg:gap-8">
          <Skeleton className="h-[174px] w-full rounded-lg lg:h-[280px]" />
          <Skeleton className="h-[174px] w-full rounded-lg lg:h-[280px]" />
        </div>
        <Skeleton className="h-[368px] w-full rounded-lg lg:h-[592px]" />
      </div>

      {/* Related Products Section */}
      <div className="flex flex-col items-center gap-10">
        <Skeleton className="h-10 w-64" />

        <div className="grid w-full grid-cols-1 gap-14 md:grid-cols-3 md:gap-3 lg:gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col items-center gap-8">
              <Skeleton className="h-[318px] w-full rounded-lg" />
              <div className="flex flex-col items-center gap-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
