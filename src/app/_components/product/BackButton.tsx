"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-[15px] leading-[25px] font-medium text-black/50 capitalize"
    >
      go back
    </button>
  );
}
