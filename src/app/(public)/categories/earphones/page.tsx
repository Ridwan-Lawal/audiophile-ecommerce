import Earphones from "@/src/app/_components/earphones/Earphones";
import BestGear from "@/src/app/_components/ui/BestGear";
import Categories from "@/src/app/_components/ui/Categories";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Earphones",
};

export default function Page() {
  return (
    <div>
      {" "}
      <div className="bg-[#181818]">
        <h2 className="flex h-[100px] items-center justify-center text-white uppercase">
          Earphones
        </h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Earphones />
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
