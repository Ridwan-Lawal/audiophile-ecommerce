import earphoneImage from "@/public/assets/menu/earphone.svg";
import headphoneImage from "@/public/assets/menu/headphone.svg";
import speakerImage from "@/public/assets/menu/speaker.svg";

import facebook from "@/public/shared/desktop/icon-facebook.svg";
import linkedin from "@/public/shared/desktop/icon-instagram.svg";
import twitter from "@/public/shared/desktop/icon-twitter.svg";

export const ICONS = [facebook, twitter, linkedin];

export const DESKTOP_MENU_LINKS = [
  { name: "home", link: "/" },
  { name: "headphones", link: "/categories/headphones" },
  { name: "speakers", link: "/categories/speakers" },
  { name: "earphones", link: "/categories/earphones" },
];
export const MENU_LINKS = [
  {
    src: headphoneImage,
    alt: "headphones",
    name: "headphones",
    link: "/categories/headphones",
  },
  {
    src: speakerImage,
    alt: "speakers",
    name: "speakers",
    link: "/categories/speakers",
  },
  {
    src: earphoneImage,
    alt: "earphones",
    name: "earphones",
    link: "/categories/speakers",
  },
];
