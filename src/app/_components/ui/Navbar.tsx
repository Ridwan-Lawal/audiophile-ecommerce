"use client";

import cart from "@/public/assets/shared/desktop/icon-cart.svg";

import logo from "@/public/assets/shared/desktop/logo.svg";
import menu from "@/public/assets/shared/tablet/icon-hamburger.svg";
import { DESKTOP_MENU_LINKS, MENU_LINKS } from "@/src/app/_lib/constants";
import { AnimatePresence, motion } from "motion/react";

import RoleGate from "@/src/app/_components/ui/RoleGate";
import { getCart, onToggleCart } from "@/src/app/_lib/redux/cartSlice";
import {
  ChevronDown,
  ChevronRight,
  History,
  Settings,
  User,
  UserCog,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface NavbarType {
  isSignedIn: boolean;
  userName: string | undefined | null;
}

const USER_PROFILE_MENU = [
  { icon: History, text: "order history", link: "/orderhistory" },
  { icon: Settings, text: "settings", link: "/settings" },
];

export default function Navbar({ isSignedIn, userName }: NavbarType) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [isUserProfileMenuOpen, setIsUserProfileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart: offlineCart, cartFromDb } = useSelector(getCart);

  const offlineCartLength = offlineCart?.reduce(
    (acc, cur) => acc + cur.quantity,
    0,
  );

  const cartFromDbLength = cartFromDb?.reduce(
    (acc, curCartProduct) => acc + curCartProduct?.quantity,
    0,
  );

  const cartLength = isSignedIn ? cartFromDbLength : offlineCartLength;

  const handleNavToggling = () => setIsNavOpen((cur) => !cur);

  const handleProfileMenuToggling = () =>
    setIsUserProfileMenuOpen((cur) => !cur);

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

  // CLOSE PROFILE MENU ON BLUR
  useEffect(() => {
    function onClickOutsideMenu(e: MouseEvent) {
      const el = e.target as HTMLElement;

      if (!el.closest(".user-profile-menu")) {
        setIsUserProfileMenuOpen(false);
      }
    }

    window.addEventListener("click", onClickOutsideMenu);

    return () => window.removeEventListener("click", onClickOutsideMenu);
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

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              aria-label="cart-button"
              onClick={() => dispatch(onToggleCart())}
              className="cart-button"
            >
              <Image
                src={cart}
                alt="cart-button"
                quality={100}
                priority={true}
                className="z-20"
              />
            </button>
            <p className="absolute -top-2 -right-2 z-30 flex size-4 items-center justify-center rounded-full bg-red-600 py-[8.5px] text-[12px] font-bold text-white">
              {cartLength}
            </p>
          </div>

          {/* profile */}
          <RoleGate isSignedIn={isSignedIn}>
            <div className="user-profile-menu relative">
              <button
                className="flex items-center gap-1"
                onClick={handleProfileMenuToggling}
              >
                <UserCog className="text-white" />

                <ChevronDown className="size-5 text-white" />
              </button>

              <ul
                className={`absolute top-10 right-2 z-40 flex min-w-[200px] flex-col gap-3 rounded-md bg-white px-5 py-4 ${isUserProfileMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"} transition-all`}
              >
                {USER_PROFILE_MENU?.map((userlink, idx) => (
                  <Link href={userlink.link} key={idx}>
                    <li className="flex items-center gap-4 text-sm text-neutral-600 transition-all hover:text-black">
                      <span>
                        <userlink.icon className="size-4" />
                      </span>

                      <span className="w-full font-medium capitalize">
                        {userlink?.text}
                      </span>
                    </li>
                  </Link>
                ))}

                <li className="mt-2 flex items-center gap-4 text-sm text-neutral-800 transition-all">
                  <span>
                    <User className="size-4" />
                  </span>

                  <span className="w-full capitalize">{userName}</span>
                </li>
              </ul>
            </div>
          </RoleGate>
        </div>
      </div>

      {/* menu */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, translateX: -300 }}
            animate={{ opacity: 1, width: "100%", translateX: 0 }}
            exit={{ opacity: 0, translateX: -300 }}
            className={`fixed h-screen bg-black/50 ${isNavOpen ? "w-full" : "w-0"} z-50`}
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
                    <Link href={menulink.link}>
                      <button className="flex items-center gap-1 text-[13px] font-bold tracking-[1px] text-black/50 uppercase">
                        shop{" "}
                        <span>
                          <ChevronRight className="text-brown-dark size-4" />
                        </span>
                      </button>
                    </Link>
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
