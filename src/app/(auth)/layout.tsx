import logo from "@/public/shared/desktop/logo-dark.svg";
import Image from "next/image";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 border">
      <header>
        <Image src={logo} alt="audiophile logo" quality={100} priority={true} />
      </header>
      <main>{children}</main>
    </div>
  );
}
