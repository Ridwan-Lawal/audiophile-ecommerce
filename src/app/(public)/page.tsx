import facebook from "@/public/assets/shared/desktop/icon-facebook.svg";
import linkedin from "@/public/assets/shared/desktop/icon-instagram.svg";
import twitter from "@/public/assets/shared/desktop/icon-twitter.svg";
import Banner from "@/src/app/_components/home/Banner";
import VectorSpeaker from "@/src/app/_components/home/VectorSpeaker";
import Yx1Earphones from "@/src/app/_components/home/Yx1Earphones";
import Zx7Speaker from "@/src/app/_components/home/Zx7Speaker";
import BestGear from "@/src/app/_components/ui/BestGear";
import Categories from "@/src/app/_components/ui/Categories";
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
