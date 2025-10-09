import {
  deleteProductFromCart,
  updateProductQuantityInCart,
} from "@/src/app/_lib/actions/cart/checkout";
import { blurDataUrl } from "@/src/app/_lib/blurdataurl";
import {
  CartType,
  onDeleteProductFromOfflineCart,
  onUpdateCartProductQuantity,
  onUpdateDbCart,
} from "@/src/app/_lib/redux/cartSlice";
import { CartProductDataType } from "@/src/app/_lib/schema/cart-shema";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface CartProductCard {
  product: CartType | CartProductDataType;
  isSignedIn: boolean;
}

export default function CartProductCard({
  product,
  isSignedIn,
}: CartProductCard) {
  const price = 2999;
  const dispatch = useDispatch();

  async function handleCartProductQuantity(order: "incr" | "decr") {
    if (isSignedIn) {
      const quantity =
        order === "incr"
          ? product?.quantity + 1
          : product?.quantity !== 0
            ? product?.quantity - 1
            : product?.quantity;

      // optimistic db cart update
      dispatch(onUpdateDbCart({ id: product?.id, quantity, type: "update" }));

      // db cart update
      const response = await updateProductQuantityInCart(
        product?.id,
        quantity,
        product?.slug,
      );

      if (response?.error) {
        toast.error(response.error);
      }
    } else {
      dispatch(onUpdateCartProductQuantity({ order, name: product?.name }));
    }
  }

  async function handleCartProductDeletion() {
    if (!isSignedIn) {
      dispatch(onDeleteProductFromOfflineCart(product?.id));
    } else {
      // optimistic cart delete
      dispatch(onUpdateDbCart({ type: "delete", id: product?.id }));

      // db cart delete
      const res = await deleteProductFromCart(product?.id);

      if (res.error) {
        toast.error(res.error);
      }
    }
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <div className="relative size-16 overflow-hidden rounded-sm">
          <Image
            src={product?.image.slice(1)}
            alt="cart-image-1"
            fill
            className="object-cover"
            quality={100}
            placeholder="blur"
            blurDataURL={blurDataUrl}
            priority
          />
        </div>

        {/* name and price */}
        <div className="w-[80%] flex-col gap-1 border">
          <Link href={`/${product?.slug}`}>
            {" "}
            <p className="font-bold uppercase hover:underline">
              {product?.name}
            </p>
          </Link>
          <p className="text-sm text-black/50">${price.toLocaleString()}</p>
        </div>
      </div>

      {/* quantity control*/}
      <button className="number-container flex h-[32px] w-[96px] items-center justify-between gap-2 p-4">
        <Minus
          className="size-3 text-black/25"
          onClick={() => handleCartProductQuantity("decr")}
        />

        <span>{product?.quantity}</span>

        <Plus
          className="size-3 text-black/30"
          onClick={() => handleCartProductQuantity("incr")}
        />
      </button>

      <button onClick={handleCartProductDeletion}>
        <X className="size-4" />
      </button>
    </div>
  );
}
