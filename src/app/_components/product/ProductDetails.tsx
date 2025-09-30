import BackButton from "@/src/app/_components/product/BackButton";
import ProductButtons from "@/src/app/_components/product/ProductButtons";
import ProductGallery from "@/src/app/_components/product/ProductGallery";
import SimilarProducts from "@/src/app/_components/product/SimilarProducts";
import BestGear from "@/src/app/_components/ui/BestGear";
import Categories from "@/src/app/_components/ui/Categories";
import { blurDataUrl } from "@/src/app/_lib/blurdataurl";
import { getProduct } from "@/src/app/_lib/services/products/product";
import Image from "next/image";

interface ProductDetailsType {
  slug: string;
}

export default async function ProductDetails({ slug }: ProductDetailsType) {
  const product = await getProduct(slug);

  return (
    <div className="sm mx-auto max-w-[500px] border px-4 sm:max-w-[700px] md:px-6 lg:max-w-[1110px]">
      {/* first section image and desc */}
      <BackButton />

      <div className="mt-6 flex flex-col items-center justify-between gap-6 sm:mt-10 sm:flex-row lg:mt-12">
        {/* image */}
        <div className="relative h-[327px] w-full sm:h-[480px] sm:w-[281px] lg:h-[560px] lg:w-[540px]">
          {product?.image?.mobile && (
            <Image
              src={product?.image?.mobile?.slice(1)}
              alt={product?.name}
              fill
              className="w-full bg-top object-cover"
              quality={100}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              priority={true}
            />
          )}

          {product?.image?.tablet && (
            <Image
              src={product?.image?.tablet?.slice(1)}
              alt={product?.name}
              fill
              className="w-full object-cover"
              quality={100}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              priority={true}
            />
          )}

          {product?.image?.desktop && (
            <Image
              src={product?.image?.desktop?.slice(1)}
              alt={product?.name}
              fill
              className="w-[50%] object-cover"
              quality={100}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              priority={true}
            />
          )}
        </div>

        <div className="border text-left sm:w-[50%] lg:w-[446px]">
          {product?.new && (
            <p className="text-sm tracking-[10px] text-[#d87d4a] uppercase">
              new product
            </p>
          )}

          <h2 className="mt-5 text-black uppercase sm:text-[28px] lg:text-[40px]">
            {product?.name}
          </h2>

          <p className="mt-4 font-medium tracking-[0px] text-black/50">
            {product?.description}
          </p>

          <p className="mt-6 text-lg font-bold tracking-[1.29px] text-black">
            ${product?.price.toLocaleString()}
          </p>

          <ProductButtons />
        </div>
      </div>

      {/* features and in the box */}
      <div className="mt-20 flex flex-col gap-24 sm:mt-24 lg:mt-28 lg:flex-row">
        {/* features */}
        <div className="space-y-8 lg:w-[60%]">
          <h5 className="font-bold uppercase">features</h5>

          <div className="space-y-6 text-black/40">
            <p>{product?.features?.split("\n\n")?.at(0)}</p>
            <p className="">{product?.features?.split("\n\n")?.at(1)}</p>
          </div>
        </div>

        {/* in the box */}
        <div className="items-start space-y-5 border sm:flex sm:justify-between lg:w-[40%] lg:flex-col lg:justify-normal">
          <h5 className="font-bold uppercase">in the box</h5>
          <ul className="space-y-2">
            {product?.includes?.map((item, idx) => (
              <li key={idx} className="flex items-center gap-6">
                <span className="text-brown-dark leading-[25px] font-bold">
                  {item?.quantity}x
                </span>
                <span className="text-black/50">{item?.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*gallery  */}
      <ProductGallery product={product} />

      {/* other products */}
      <SimilarProducts product={product} />

      <div className="mt-28">
        <Categories />
      </div>

      <BestGear />
    </div>
  );
}
