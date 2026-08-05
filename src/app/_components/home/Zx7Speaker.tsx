"use client";

import zx7SpeakerDesktopImage from "@/public/home/desktop/image-speaker-zx7.jpg";
import zx7SpeakerImage from "@/public/home/mobile/image-speaker-zx7.jpg";
import zx7SpeakerTabletImage from "@/public/home/tablet/image-speaker-zx7.jpg";
import ScrollAnimationWrapper from "@/src/app/_components/ui/ScrollAnimationWrapper";

import Image from "next/image";
import Link from "next/link";

export default function Zx7Speaker() {
  return (
    <div className="relative mx-auto mt-12 flex max-w-[1100px] items-center justify-start px-6">
      <Image
        src={zx7SpeakerImage}
        alt="zx7 speaker image"
        quality={100}
        placeholder="blur"
        priority={true}
        className="w-full sm:hidden"
      />

      <Image
        src={zx7SpeakerTabletImage}
        alt="zx7 speaker tablet image"
        quality={100}
        placeholder="blur"
        priority={true}
        className="hidden w-full sm:block lg:hidden"
      />

      <Image
        src={zx7SpeakerDesktopImage}
        alt="zx7 speaker desktop image"
        quality={100}
        placeholder="blur"
        priority={true}
        className="hidden w-full lg:block"
      />

      <ScrollAnimationWrapper style="absolute flex flex-col gap-8 px-6 md:left-24">
        <h4 className="tracking-[2px] uppercase">zx7 speaker</h4>

        <Link href="/zx7-speaker">
          <button className="btn btn-default-2 bg-transparent uppercase">
            see product
          </button>
        </Link>
      </ScrollAnimationWrapper>
    </div>
  );
}
