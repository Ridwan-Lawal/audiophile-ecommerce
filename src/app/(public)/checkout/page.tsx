import Checkout from "@/src/app/_components/checkout/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function Page() {
  return (
    <div>
      <Checkout />
    </div>
  );
}
