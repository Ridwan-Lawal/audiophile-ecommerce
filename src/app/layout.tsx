import { PropsWithChildren } from "react";

import { manrope } from "@/src/app/_styles/font";
import "@styles/globals.css";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    template: "%s - AudioPhile Store",
    default: "Home - AudioPhile Store",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
