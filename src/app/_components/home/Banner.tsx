import bannerDesktop from "@/public/home/desktop/image-hero.jpg";
import banner from "@/public/home/tablet/image-header.jpg";

import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex items-center justify-between lg:bg-[#181818]">
      <div className="relative flex h-[550px] w-full items-center justify-center px-8 sm:h-[600px] md:px-0 lg:mx-auto lg:h-[600px] lg:max-w-[1100px] lg:justify-start">
        <Image
          src={banner}
          alt="banner image"
          quality={100}
          placeholder="blur"
          priority={true}
          fill
          className="w-[50%] object-cover lg:hidden"
        />

        <Image
          src={bannerDesktop}
          alt="banner image"
          quality={100}
          placeholder="blur"
          priority={true}
          fill
          className="hidden w-full object-cover lg:block"
        />

        <div className="absolute z-50 mx-auto flex max-w-[379px] flex-col items-center justify-center gap-6 px-4 lg:mx-0 lg:items-start">
          <p className="text-sm tracking-[10px] text-white/50 uppercase">
            new product
          </p>

          <h1 className="text-center text-white lg:text-left">
            <span> XX99 Mark II</span>
            <span>Headphones</span>
          </h1>

          <p className="text-center text-white/75 lg:text-left">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>

          <button className="btn btn-default uppercase">see product</button>
        </div>
      </div>
    </div>
  );
}
