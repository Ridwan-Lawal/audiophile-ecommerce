import Cart from "@/src/app/_components/layout/cart/Cart";
import Footer from "@/src/app/_components/ui/Footer";
import Navbar from "@/src/app/_components/ui/Navbar";
import { getUser } from "@/src/app/_lib/utils";
import { PropsWithChildren, Suspense } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const user = await getUser();

  return (
    <div className="border-2 border-blue-600">
      <Navbar isSignedIn={!!user?.id} userName={user?.name} />
      <main className="relative border-2 border-green-600">{children}</main>

      <Footer />
      <Suspense>
        <Cart />
      </Suspense>
    </div>
  );
}
