import ProductImage from "@/src/app/_components/product/ProductImage";
import ScrollAnimationWrapper from "@/src/app/_components/ui/ScrollAnimationWrapper";
import { ProductType } from "@/src/app/_lib/schema/product-schema";
import Link from "next/link";

export default function SimilarProducts({
  product,
}: {
  product: Pick<ProductType, "others"> | undefined;
}) {
  return (
    <ScrollAnimationWrapper style="mt-28 space-y-11 text-center sm:space-y-14 lg:space-y-[60px]">
      <h5 className="uppercase">you may also like</h5>
      {/* products */}
      <div className="flex flex-col gap-10 sm:flex-row sm:gap-3 lg:gap-7">
        {product?.others?.map((item) => (
          <div
            key={item?.slug}
            className="flex w-full flex-col items-center gap-8"
          >
            <div className="relative h-[120px] w-full sm:h-[318px]">
              {product?.others && (
                <>
                  <ProductImage
                    src={item?.image?.mobile?.slice(1)}
                    alt={item?.name}
                    className="sm:hidden"
                  />

                  <ProductImage
                    src={item?.image?.tablet?.slice(1)}
                    alt={item?.name}
                    className="hidden sm:block lg:hidden"
                  />

                  <ProductImage
                    src={item?.image?.desktop?.slice(1)}
                    alt={item?.name}
                    className="hidden lg:block"
                  />
                </>
              )}
            </div>

            <div className="flex flex-col items-center gap-8">
              <h5 className="uppercase">{item?.name}</h5>

              <Link href={`/${item?.slug}`}>
                <button className="btn btn-default uppercase">
                  see product
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>{" "}
    </ScrollAnimationWrapper>
  );
}
