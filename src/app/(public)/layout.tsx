import Cart from "@/src/app/_components/layout/cart/Cart";
import Footer from "@/src/app/_components/ui/Footer";
import Navbar from "@/src/app/_components/ui/Navbar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <main className="relative">
        {children}
        <Cart />
      </main>
      <Footer />
    </div>
  );
}
