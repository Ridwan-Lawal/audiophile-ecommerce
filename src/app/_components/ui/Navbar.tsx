"use client";

import cart from "@/public/shared/desktop/icon-cart.svg";
import logo from "@/public/shared/desktop/logo.svg";
import menu from "@/public/shared/tablet/icon-hamburger.svg";
import { DESKTOP_MENU_LINKS, MENU_LINKS } from "@/src/app/_lib/constants";
import { AnimatePresence, motion } from "motion/react";

import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavFixed, setIsNavFixed] = useState(false);

  const handleNavToggling = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    function handleResizeWindow() {
      if (window.innerWidth >= 1024) {
        setIsNavOpen(false);
      }
    }

    handleResizeWindow();

    window.addEventListener("resize", handleResizeWindow);

    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  // CREATING THIS EFFECT TO STICK NAV ON SCROLL
  useEffect(() => {
    function handleNavOnScroll() {
      console.log(window.scrollY);
      if (window.scrollY >= 500) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    }

    window.addEventListener("scroll", handleNavOnScroll);

    return () => window.removeEventListener("scroll", handleNavOnScroll);
  }, []);

  return (
    <nav
      className={`bg-[#181818] ${isNavFixed ? "fixed z-50 w-full" : "static"} transition-all duration-300`}
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between border-b border-[#333333] bg-[#181818] px-6 py-6">
        <div className="flex items-center justify-between gap-10">
          <button
            aria-label="menu-button"
            onClick={handleNavToggling}
            className={`${isNavOpen ? "rotate-180" : "rotate-0"} transition-transform lg:hidden`}
          >
            {isNavOpen ? (
              <X className="text-white" />
            ) : (
              <Image
                src={menu}
                alt="menu-button"
                quality={100}
                priority={true}
              />
            )}
          </button>

          <Image
            src={logo}
            alt="audiophile logo"
            quality={100}
            priority={true}
            className="hidden sm:block"
          />
        </div>

        <ul className="hidden flex-row items-center justify-center gap-[34px] lg:flex">
          {DESKTOP_MENU_LINKS.map((menulink) => (
            <Link href={menulink.link} key={menulink.name}>
              <li className="hover:text-brown-dark text-[13px] font-bold tracking-[2px] text-white capitalize transition-all">
                {menulink.name}
              </li>
            </Link>
          ))}
        </ul>

        <Image
          src={logo}
          alt="audiophile logo"
          quality={100}
          priority={true}
          className="sm:hidden"
        />
        <button aria-label="cart-button">
          <Image src={cart} alt="cart-button" quality={100} priority={true} />
        </button>
      </div>

      {/* menu */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, translateX: -300 }}
            animate={{ opacity: 1, width: "100%", translateX: 0 }}
            exit={{ opacity: 0, translateX: -300 }}
            className={`fixed h-screen bg-black/50 ${isNavOpen ? "w-full" : "w-0"}`}
          >
            <aside
              className={`flex w-full flex-col items-center justify-center gap-20 rounded-b-lg border-2 border-yellow-500 bg-white px-6 pt-20 pb-10 sm:flex-row sm:gap-4 ${isNavOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-1000`}
            >
              {MENU_LINKS?.map((menulink, idx) => (
                <div
                  key={idx}
                  className="bg-white-3 relative flex w-full flex-col items-center rounded-lg"
                >
                  <Image
                    src={menulink.src}
                    alt={menulink.alt}
                    quality={100}
                    priority={true}
                    className="absolute -top-12"
                  />

                  <div className="flex flex-col items-center justify-center gap-3 pt-20 pb-4">
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
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
