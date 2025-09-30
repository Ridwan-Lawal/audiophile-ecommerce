import { blurDataUrl } from "@/src/app/_lib/blurdataurl";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function Cart() {
  const price = 2999;
  return (
    <div className="fixed top-0 bg-black/40 backdrop-blur-[1px]">
      <div className="h-[488px] w-[327px] rounded-[8px] border-2 border-black bg-white px-6 py-8">
        <header className="flex items-center justify-between">
          <h6 className="uppercase">cart (3)</h6>

          <button className="leading-[25px] text-black/50 underline">
            Remove all
          </button>
        </header>

        {/* items */}
        <main className="mt-8 flex flex-col gap-6">
          {/* item */}
          {Array.from({ length: 3 })?.map((_, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3">
              <div className="relative size-16 overflow-hidden rounded-sm">
                <Image
                  src="/assets/product-zx7-speaker/mobile/image-product.jpg"
                  alt="cart-image-1"
                  fill
                  className="object-cover"
                  quality={100}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  priority
                />
              </div>

              {/* name and price */}
              <div className="flex-col gap-1">
                <p className="font-bold uppercase">xx99 mk ii</p>
                <p className="text-sm text-black/50">
                  ${price.toLocaleString()}
                </p>
              </div>

              {/* quantity control*/}
              <button className="number-container h-[32px] w-[96px] justify-between p-4">
                <Minus className="size-3 text-black/25" />

                <span>1</span>

                <Plus className="size-3 text-black/30" />
              </button>
            </div>
          ))}
        </main>

        {/* price and checkout button */}
        <footer className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="text-7xl-black/50">total</p>

            <h6 className="font-bold">${price.toLocaleString()}</h6>
          </div>

          <button className="btn btn-default w-full uppercase">checkout</button>
        </footer>
      </div>
    </div>
  );
}
