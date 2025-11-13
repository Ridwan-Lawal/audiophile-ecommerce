import CartBlock from "@/src/app/_components/layout/cart/CartBlock";
import CartInitializer from "@/src/app/_components/layout/cart/CartInitializer";
import { getCartProducts } from "@/src/app/_lib/services/checkout/cart";
import { getUser } from "@/src/app/_lib/utils";

export default async function Cart() {
  const user = await getUser();

  const cartProducts = await getCartProducts(user?.id);

  return (
    <>
      <CartBlock isSignedIn={!!user?.id} />
      <CartInitializer cartProducts={cartProducts} />
    </>
  );
}
