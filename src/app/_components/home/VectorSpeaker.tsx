import speakerVector from "@/public/assets/home/speaker-vector.svg";
import vectorImg from "@/public/home/desktop/pattern-circles.svg";
import ScrollAnimationWrapper from "@/src/app/_components/ui/ScrollAnimationWrapper";
import Image from "next/image";
import Link from "next/link";

export default function VectorSpeaker() {
  return (
    <div className="mx-auto max-w-[1100px] border border-red-600 px-6">
      <div className="bg-brown-dark relative mt-18 flex h-[689px] w-full justify-center overflow-hidden rounded-lg border border-green-800 px-20 pt-6 pb-0 lg:h-[560px] lg:pt-0 lg:pb-0">
        <Image
          src={vectorImg}
          alt="vector image"
          quality={100}
          className="relative object-cover lg:-left-52"
        />

        <div className="absolute -bottom-[0px] mt-0 flex flex-col items-center justify-center gap-20 pb-12 lg:w-full lg:flex-row lg:gap-36 lg:pb-0">
          <ScrollAnimationWrapper>
            <Image
              src={speakerVector}
              alt="speaker image"
              quality={100}
              className="relative -bottom-10 lg:h-[493px] lg:w-[410.23px]"
            />
          </ScrollAnimationWrapper>

          <div className="flex flex-col items-center gap-6 lg:items-start lg:gap-10">
            <h1 className="text-center text-white uppercase lg:text-left">
              zx9
              <br /> speaker
            </h1>
            <p className="mx-auto max-w-[280px] text-center font-medium text-white/75 lg:text-left">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>

            <Link href="/zx9-speaker">
              <button className="btn bg-black text-white uppercase transition-all hover:bg-[#4C4C4C]">
                see product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
