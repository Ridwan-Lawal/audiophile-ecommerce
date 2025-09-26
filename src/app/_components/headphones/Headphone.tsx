import { headphoneDataType } from "@/src/app/_lib/schema/headphones-data";
import { getBlurDataUrl } from "@/src/app/_lib/services/products/images";
import Image from "next/image";

export default async function Headphone({
  headphone,
}: {
  headphone: headphoneDataType;
}) {
  const images = Object.values(headphone.categoryimage);

  const [mobileBlurDataUrl, tabletBlurDataUrl, desktopBlurDataUrl] =
    await Promise.all(
      images.map(async (image) => await getBlurDataUrl(image.slice(1))),
    );

  console.log(headphone?.categoryimage?.desktop.slice(1));

  return (
    <div
      key={headphone?.id}
      className={`mx-auto flex flex-col gap-8 px-6 lg:max-w-[1100px] lg:items-center lg:gap-20 odd:lg:flex-row even:lg:flex-row-reverse`}
    >
      <div className="lg:w- relative h-[352px] w-full border sm:w-[600px] md:w-[689px] lg:h-[560px] lg:w-[540px]">
        <Image
          src={headphone?.categoryimage?.mobile.slice(1)}
          alt="MarkII headphones"
          quality={100}
          placeholder={mobileBlurDataUrl ? "blur" : "empty"}
          blurDataURL={mobileBlurDataUrl ?? ""}
          priority={true}
          fill
          className="object-cover sm:hidden"
        />

        <Image
          src={headphone?.categoryimage?.tablet.slice(1)}
          alt="MarkII headphones"
          quality={100}
          placeholder={tabletBlurDataUrl ? "blur" : "empty"}
          blurDataURL={tabletBlurDataUrl ?? ""}
          priority={true}
          fill
          className="hidden object-cover sm:block lg:hidden"
        />

        <Image
          src={headphone?.categoryimage?.desktop.slice(1)}
          alt="MarkII headphones"
          quality={100}
          placeholder={desktopBlurDataUrl ? "blur" : "empty"}
          blurDataURL={desktopBlurDataUrl ?? ""}
          priority={true}
          fill
          className="hidden object-cover lg:block"
        />
      </div>

      <div className="mx-auto max-w-[572px] space-y-6 text-center lg:w-[50%] lg:max-w-[445px] lg:text-left">
        <p className="text-sm tracking-[10px] text-[#d87d4a] uppercase">
          new product
        </p>
        <h2 className="text-black uppercase">
          xx99 mark II <br /> headphones
        </h2>

        <p className="font-medium tracking-[0px] text-black/50">
          The new XX99 Mark II headphones is the pinnacle of pristine audio. It
          redefines your premium headphone experience by reproducing the
          balanced depth and precision of studio-quality sound.
        </p>

        <button className="btn btn-default uppercase">see product</button>
      </div>
    </div>
  );
}
