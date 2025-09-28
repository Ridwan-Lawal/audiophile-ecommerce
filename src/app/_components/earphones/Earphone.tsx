import { CategoryProductDataType } from "@/src/app/_lib/schema/categories-schema";
import { getBlurDataUrl } from "@/src/app/_lib/services/products/images";
import Image from "next/image";
import Link from "next/link";

export default async function Earphone({
  earphone,
}: {
  earphone: CategoryProductDataType;
}) {
  const images = Object.values(earphone.categoryimage);

  const [mobileBlurDataUrl, tabletBlurDataUrl, desktopBlurDataUrl] =
    await Promise.all(
      images.map(async (image) => await getBlurDataUrl(image.slice(1))),
    );

  console.log(earphone?.categoryimage?.desktop.slice(1));

  return (
    <div
      key={earphone?.id}
      className={`mx-auto flex flex-col gap-8 px-6 lg:max-w-[1100px] lg:items-center lg:gap-20 odd:lg:flex-row even:lg:flex-row-reverse`}
    >
      <div className="lg:w- relative h-[352px] w-full border sm:w-[600px] md:w-[689px] lg:h-[560px] lg:w-[540px]">
        <Image
          src={earphone?.categoryimage?.mobile.slice(1)}
          alt={earphone?.name}
          quality={100}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/fx1PQAIwAM+RlaXQQAAAABJRU5ErkJggg=="
          priority={true}
          fill
          className="object-cover sm:hidden"
        />

        <Image
          src={earphone?.categoryimage?.tablet.slice(1)}
          alt={earphone?.name}
          quality={100}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/fx1PQAIwAM+RlaXQQAAAABJRU5ErkJggg=="
          priority={true}
          fill
          className="hidden object-cover sm:block lg:hidden"
        />

        <Image
          src={earphone?.categoryimage?.desktop.slice(1)}
          alt={earphone?.name}
          quality={100}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/fx1PQAIwAM+RlaXQQAAAABJRU5ErkJggg=="
          priority={true}
          fill
          className="hidden object-cover lg:block"
        />
      </div>

      <div className="mx-auto max-w-[572px] space-y-6 text-center lg:w-[50%] lg:max-w-[445px] lg:text-left">
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
      </div>
    </div>
  );
}
