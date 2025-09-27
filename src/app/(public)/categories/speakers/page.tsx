import Speakers from "@/src/app/_components/speakers/Speakers";
import BestGear from "@/src/app/_components/ui/BestGear";
import Categories from "@/src/app/_components/ui/Categories";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Speakers",
};

export default function Page() {
  return (
    <div>
      {" "}
      <div className="bg-[#181818]">
        <h2 className="flex h-[100px] items-center justify-center text-white uppercase">
          Speakers
        </h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Speakers />
      </Suspense>
      <div className="mt-36">
        <Categories />
      </div>
      <div className="mt-28">
        <BestGear />
      </div>
    </div>
  );
}
