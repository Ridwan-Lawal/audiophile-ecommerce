import Checkout from "@/src/app/_components/checkout/Checkout";
import CheckoutSuccess from "@/src/app/_components/checkout/CheckoutSuccess";
import { getCartProductsClient } from "@/src/app/_lib/services/checkout/cart-client";
import { auth } from "@/src/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function Page() {
  const queryClient = new QueryClient();
  const user = await auth();

  await queryClient.prefetchQuery({
    queryKey: ["cart-products"],
    queryFn: () => getCartProductsClient(user?.user?.id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SessionProvider session={user}>
          <Checkout />
        </SessionProvider>
      </HydrationBoundary>
      <CheckoutSuccess />
    </div>
  );
}
