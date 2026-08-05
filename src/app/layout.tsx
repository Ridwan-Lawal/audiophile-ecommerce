import { PropsWithChildren } from "react";

import ReduxStoreProvider from "@/src/app/_lib/redux/ReduxStoreProvider";
import Providers from "@/src/app/_lib/tanstack-query/Provider";
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
        <Providers>
          <ReduxStoreProvider>
            {children}
            <Toaster
              toastOptions={{
                duration: 8000,
              }}
            />
          </ReduxStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
