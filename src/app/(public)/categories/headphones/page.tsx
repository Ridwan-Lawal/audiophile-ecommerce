import Headphones from "@/src/app/_components/headphones/Headphones";
import { CategorySkeleton } from "@/src/app/_components/skeletons/Category";
import BestGear from "@/src/app/_components/ui/BestGear";
import Categories from "@/src/app/_components/ui/Categories";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Headphones",
};

export default async function Page() {
  return (
    <div>
      <div className="bg-[#181818]">
        <h2 className="flex h-[100px] items-center justify-center text-white uppercase">
          headphones
        </h2>
      </div>

      <Suspense fallback={<CategorySkeleton />}>
        <Headphones />
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
