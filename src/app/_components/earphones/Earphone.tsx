import ScrollAnimationWrapper from "@/src/app/_components/ui/ScrollAnimationWrapper";
import { blurDataUrl } from "@/src/app/_lib/blurdataurl";
import { ImageType } from "@/src/app/_lib/schema/product-schema";
import { CategoryDataType } from "@/src/app/_types/products/product";
import Image from "next/image";
import Link from "next/link";

export default async function Earphone({
  earphone,
}: {
  earphone: CategoryDataType;
}) {
  const images = earphone?.categoryimage as ImageType;

  return (
    <div
      key={earphone.id}
      className={`mx-auto flex flex-col gap-8 px-6 lg:max-w-[1100px] lg:items-center lg:gap-20 odd:lg:flex-row even:lg:flex-row-reverse`}
    >
      <div className="lg:w- relative h-[352px] w-full sm:w-[600px] md:w-[689px] lg:h-[560px] lg:w-[540px]">
        <Image
          src={images?.mobile?.slice(1)}
          alt={earphone?.name ?? ""}
          quality={100}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          priority={true}
          fill
          className="object-cover sm:hidden"
        />

        <Image
          src={images?.tablet.slice(1)}
          alt={earphone?.name ?? ""}
          quality={100}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          priority={true}
          fill
          className="hidden object-cover sm:block lg:hidden"
        />

        <Image
          src={images?.desktop.slice(1)}
          alt={earphone?.name ?? ""}
          quality={100}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          priority={true}
          fill
          className="hidden object-cover lg:block"
        />
      </div>

      <ScrollAnimationWrapper style="mx-auto max-w-[572px] space-y-6 text-center lg:w-[50%] lg:max-w-[445px] lg:text-left">
        <p className="text-sm tracking-[10px] text-[#d87d4a] uppercase">
          new product
        </p>
        <h2 className="text-black uppercase">{earphone?.name}</h2>

        <p className="font-medium tracking-[0px] text-black/50">
          {earphone.description}
        </p>

        <Link href={`/${earphone.slug}`}>
          <button className="btn btn-default uppercase">see product</button>
        </Link>
      </ScrollAnimationWrapper>
    </div>
  );
}
