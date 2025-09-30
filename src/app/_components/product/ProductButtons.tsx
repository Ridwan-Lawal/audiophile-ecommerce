"use client";

import { Minus, Plus } from "lucide-react";

export default function ProductButtons() {
  return (
    <div className="mt-8 flex items-center gap-4">
      {/* quantity control */}
      <button className="number-container h-[48px] w-[120px] justify-between p-4">
        <Minus className="size-3 text-black/25" />

        <span>1</span>

        <Plus className="size-3 text-black/30" />
      </button>

      {/* add to cart button */}
      {/* this will not be here for unauthenticated users */}
      <button className="btn btn-default uppercase">add to cart</button>
    </div>
  );
}
