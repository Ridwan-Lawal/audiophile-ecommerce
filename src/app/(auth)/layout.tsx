import logo from "@/public/shared/desktop/logo-dark.svg";
import Image from "next/image";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 border py-12">
      <header>
        <Image src={logo} alt="audiophile logo" quality={100} priority={true} />
      </header>
      <main className="mx-auto w-full max-w-[400px]">{children}</main>
    </div>
  );
}
