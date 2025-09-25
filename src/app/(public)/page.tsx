import facebook from "@/public/shared/desktop/icon-facebook.svg";
import linkedin from "@/public/shared/desktop/icon-instagram.svg";
import twitter from "@/public/shared/desktop/icon-twitter.svg";
import Banner from "@/src/app/_components/home/Banner";
import BestGear from "@/src/app/_components/home/BestGear";
import Categories from "@/src/app/_components/home/Categories";
import VectorSpeaker from "@/src/app/_components/home/VectorSpeaker";
import Yx1Earphones from "@/src/app/_components/home/Yx1Earphones";
import Zx7Speaker from "@/src/app/_components/home/Zx7Speaker";
import { getUser } from "@/src/app/_lib/utils";

const icons = [facebook, twitter, linkedin];

export default async function Page() {
  const user = await getUser();

  return (
    <div>
      <Banner />
      <Categories />
      <VectorSpeaker />
      <Zx7Speaker />
      <Yx1Earphones />
      <BestGear />
    </div>
  );
}
