import logo from "@/public/assets/shared/desktop/logo.svg";
import { DESKTOP_MENU_LINKS, ICONS } from "@/src/app/_lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-0 bg-[#101010] px-6 py-14 lg:py-16">
      <div className="mx-auto max-w-[1100px] space-y-10">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-9 sm:items-start lg:flex-row lg:justify-between">
          <Image src={logo} alt="logo" quality={100} />

          <ul className="flex flex-col items-center justify-center gap-[20px] sm:flex-row">
            {DESKTOP_MENU_LINKS.map((menulink) => (
              <Link href={menulink.link} key={menulink.name}>
                <li className="hover:text-brown-dark text-[13px] font-bold tracking-[2px] text-white capitalize transition-all">
                  {menulink.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <p className="text-center text-white/50 sm:text-left lg:w-[50%]">
            {" "}
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we&apos;re open 7 days a week.
          </p>

          <ul className="hidden items-center gap-6 lg:flex">
            {ICONS?.map((icon, idx) => (
              <li key={idx}>
                <Image src={icon} alt="social" />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-8 sm:mt-20 sm:flex-row sm:justify-between">
          <p className="text-white/50">
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>

          <ul className="flex items-center gap-6 lg:hidden">
            {ICONS?.map((icon, idx) => (
              <li key={idx}>
                <Image src={icon} alt="social" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
