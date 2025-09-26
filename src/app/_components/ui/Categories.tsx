import shadowImage from "@/public/assets/menu/Oval Copy 3.png";
import shadowImageMobile from "@/public/assets/menu/Oval Copy 4.png";

import { MENU_LINKS } from "@/src/app/_lib/constants";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Categories() {
  return (
    <div
      className={`mx-auto mt-6 flex w-full max-w-[1100px] flex-col items-center justify-center gap-20 rounded-b-lg border-2 border-yellow-500 bg-white px-6 pt-20 pb-10 sm:flex-row sm:gap-4 md:mt-12`}
    >
      {MENU_LINKS?.map((menulink, idx) => (
        <div
          key={idx}
          className="bg-white-3 relative flex w-full flex-col items-center rounded-lg lg:h-[204px]"
        >
          <Image
            src={menulink.src}
            alt={menulink.alt}
            quality={100}
            priority={true}
            className="absolute -top-12 lg:-top-20 lg:h-[160px] lg:w-[123px]"
          />
          <Image
            src={shadowImage}
            alt="shadow"
            quality={100}
            className="mt-2 hidden sm:block"
          />
          <Image
            src={shadowImageMobile}
            alt="shadow"
            quality={100}
            className="mt-2 sm:hidden"
          />

          <div className="flex h-full flex-col items-center justify-center gap-3 pt-0 pb-4 lg:justify-end lg:pb-8">
            <p className="font-bold tracking-[1.07px] uppercase">
              {menulink.name}{" "}
            </p>
            <button className="flex items-center gap-1 text-[13px] font-bold tracking-[1px] text-black/50 uppercase">
              shop{" "}
              <span>
                <ChevronRight className="text-brown-dark size-4" />
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
