import Yx1EarphonesDesktopImage from "@/public/home/desktop/image-earphones-yx1.jpg";
import Yx1EarphonesImage from "@/public/home/mobile/image-earphones-yx1.jpg";
import Yx1EarphonesTabletImage from "@/public/home/tablet/image-earphones-yx1.jpg";
import ScrollAnimationWrapper from "@/src/app/_components/ui/ScrollAnimationWrapper";
import Image from "next/image";
import Link from "next/link";

export default function Yx1Earphones() {
  return (
    <div className="mx-auto mt-12 flex max-w-[1100px] flex-col gap-6 px-6 md:flex-row">
      <div className="relative h-[250px] md:h-[320px] md:w-[50%]">
        <Image
          src={Yx1EarphonesImage}
          alt="yx1 earphones"
          quality={100}
          placeholder="blur"
          fill
          className="rounded-lg object-cover md:hidden"
        />

        <Image
          src={Yx1EarphonesTabletImage}
          alt="yx1 earphones"
          quality={100}
          placeholder="blur"
          fill
          className="hidden rounded-lg object-cover md:block lg:hidden"
        />

        <Image
          src={Yx1EarphonesDesktopImage}
          alt="yx1 earphones"
          quality={100}
          placeholder="blur"
          fill
          className="hidden rounded-lg object-cover lg:block"
        />
      </div>

      <ScrollAnimationWrapper style="flex h-[250px] flex-col justify-center space-y-8 rounded-lg bg-[#f1f1f1] px-8 md:h-[320px] md:w-[50%] md:px-12">
        <h4 className="tracking-[2px] uppercase">YX1 EARPHONES</h4>

        <Link href="/yx1-earphones">
          <button className="btn btn-default-2 bg-transparent uppercase">
            see product
          </button>
        </Link>
      </ScrollAnimationWrapper>
    </div>
  );
}
