import { blurDataUrl } from "@/src/app/_lib/blurdataurl";
import { ProductType } from "@/src/app/_lib/schema/product-schema";
import Image from "next/image";

export default function ProductGallery({
  product,
}: {
  product: Pick<ProductType, "gallery"> | undefined;
}) {
  return (
    <div className="justify-items-between mt-28 grid h-[756px] grid-flow-dense grid-cols-1 grid-rows-4 gap-5 border border-green-600 sm:h-[395px] sm:grid-cols-5 lg:h-[592px]">
      <div className="border border-red-700 sm:col-span-2 sm:row-span-2">
        {product?.gallery?.first && (
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={product?.gallery?.first?.mobile.slice(1)}
            />
            <source
              media="(min-width: 768px)"
              srcSet={product?.gallery?.first?.tablet.slice(1)}
            />
            <div className="relative h-full w-full">
              <Image
                src={product?.gallery?.first?.desktop?.slice(1)}
                alt="gallery image 1"
                fill
                className="object-cover"
                quality={100}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                sizes="(min-width: 1024px) 654px, (min-width: 768px) 445px, 327px"
              />
            </div>
          </picture>
        )}
      </div>

      <div className="border border-blue-700 sm:order-3 sm:col-span-2 sm:row-span-2">
        {product?.gallery?.second && (
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={product?.gallery?.second?.mobile.slice(1)}
            />
            <source
              media="(min-width: 768px)"
              srcSet={product?.gallery?.second?.tablet.slice(1)}
            />
            <div className="relative h-full w-full">
              <Image
                src={product?.gallery?.second?.desktop?.slice(1)}
                alt="gallery image 1"
                fill
                className="object-cover"
                quality={100}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                sizes="(min-width: 1024px) 654px, (min-width: 768px) 445px, 327px"
              />
            </div>
          </picture>
        )}
      </div>

      <div className="row-span-2 border border-black sm:order-2 sm:col-span-3 sm:row-span-4">
        {product?.gallery?.third && (
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={product?.gallery?.third?.mobile.slice(1)}
            />
            <source
              media="(min-width: 768px)"
              srcSet={product?.gallery?.third?.tablet.slice(1)}
            />
            <div className="relative h-full w-full">
              <Image
                src={product?.gallery?.third?.desktop?.slice(1)}
                alt="gallery image 1"
                fill
                className="object-cover"
                quality={100}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                sizes="(min-width: 1024px) 654px, (min-width: 768px) 445px, 327px"
              />
            </div>
          </picture>
        )}
      </div>
    </div>
  );
}
