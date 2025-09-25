import Footer from "@/src/app/_components/ui/Footer";
import Navbar from "@/src/app/_components/ui/Navbar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
