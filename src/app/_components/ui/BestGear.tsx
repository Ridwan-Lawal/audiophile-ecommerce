import BestAudioGearDesktopImage from "@/public/assets/shared/desktop/image-best-gear.jpg";
import BestAudioGearImage from "@/public/assets/shared/mobile/image-best-gear.jpg";
import BestAudioGearTabletImage from "@/public/assets/shared/tablet/image-best-gear.jpg";
import ScrollAnimationWrapper from "@/src/app/_components/ui/ScrollAnimationWrapper";

import Image from "next/image";

export default function BestGear() {
  return (
    <div className="mx-auto mt-20 flex max-w-[1100px] flex-col space-y-8 px-6 lg:flex-row-reverse lg:items-center">
      <div className="w-fit border lg:w-[50%]">
        <Image
          src={BestAudioGearImage}
          alt="best audio gear image"
          quality={100}
          placeholder="blur"
          className="sm:hidden"
        />

        <Image
          src={BestAudioGearTabletImage}
          alt="best audio gear image"
          quality={100}
          placeholder="blur"
          className="hidden sm:block lg:hidden"
        />

        <Image
          src={BestAudioGearDesktopImage}
          alt="best audio gear image"
          quality={100}
          placeholder="blur"
          className="hidden lg:block"
        />
      </div>

      <ScrollAnimationWrapper style="mx-auto max-w-[573px] space-y-6 lg:w-[50%] lg:max-w-[445px]">
        <div className="">
          <h4 className="text-center tracking-[1px] uppercase lg:text-left">
            Bringing you the <span className="text-brown-dark">best</span> audio
            gear
          </h4>

          <p className="text-center text-black/50 lg:text-left">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </ScrollAnimationWrapper>
    </div>
  );
}
