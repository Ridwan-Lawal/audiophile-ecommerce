import { RootState } from "@/src/app/_lib/redux/store";
import { CartDataType } from "@/src/app/_lib/schema/cart-shema";
import { OptimisticAction } from "@/src/app/_types/products/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartType {
  name: string;
  image: string;
  price: number;
  quantity: number;
  product_id: string;
  userid: null;
  id: string;
  slug: string;
}

interface CartStateType {
  isCartOpen: boolean;
  cart: CartType[];
  cartFromDb: CartDataType | undefined;
  cartLength: number;
}

const initialState: CartStateType = {
  isCartOpen: false,
  cart: [],
  cartFromDb: [],
  cartLength: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // database cart
    onRemoveAllDbCartProduct(state) {
      state.cartFromDb = [];
    },

    onUpdateDbCart(state, action: PayloadAction<OptimisticAction>) {
      const { type, id, quantity, newProduct } = action.payload;

      console.log(newProduct, "neeeewwww");

      if (type === "add" && state.cartFromDb && newProduct) {
        state.cartFromDb = [...state.cartFromDb, newProduct];
      }

      if (type === "update" && quantity) {
        state.cartFromDb = state?.cartFromDb?.map((cartProduct) =>
          cartProduct?.id === id ? { ...cartProduct, quantity } : cartProduct,
        );
      }

      if (type === "delete") {
        state.cartFromDb = state?.cartFromDb?.filter(
          (cartProduct) => cartProduct?.id !== id,
        );
      }
    },

    onAddDbCartOnMount(state, action: PayloadAction<CartDataType | undefined>) {
      state.cartFromDb = action.payload;
    },

    // offline cart
    onDeleteAllCartProductFromOfflineCart(state) {
      state.cart = [];
    },
    onDeleteProductFromOfflineCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(
        (product) => product?.id !== action.payload,
      );
    },
    onUpdateCartLength(state, action: PayloadAction<number>) {
      state.cartLength = action.payload;
    },

    onPageMount(state, action: PayloadAction<CartType[]>) {
      state.cart = action.payload;
    },
    onAddProductToCart(state, action: PayloadAction<CartType>) {
      state.cart = [...state?.cart, action.payload];
    },
    onUpdateProductQuantity(
      state,
      action: PayloadAction<{ id: string; order: "incr" | "decr" }>,
    ) {
      const { id, order } = action?.payload;

      state.cart = state.cart?.map((product) =>
        product?.id === id
          ? {
              ...product,
              quantity:
                order === "incr"
                  ? product?.quantity + 1
                  : product?.quantity === 0
                    ? product?.quantity
                    : product?.quantity - 1,
            }
          : product,
      );
    },
    onToggleCart(state, action: PayloadAction<boolean | undefined>) {
      if (action?.payload !== undefined) {
        state.isCartOpen = action.payload;
      } else {
        state.isCartOpen = !state.isCartOpen;
      }
    },

    onUpdateCartProductQuantity(
      state,
      action: PayloadAction<{ order: "incr" | "decr"; name: string }>,
    ) {
      state.cart = state?.cart?.map((cartProduct) =>
        cartProduct.name === action.payload.name
          ? {
              ...cartProduct,
              quantity:
                action.payload.order === "incr"
                  ? cartProduct?.quantity + 1
                  : cartProduct?.quantity !== 0
                    ? cartProduct.quantity - 1
                    : cartProduct.quantity,
            }
          : cartProduct,
      );
    },
  },
});

export const {
  onRemoveAllDbCartProduct,
  onUpdateDbCart,
  onAddDbCartOnMount,
  onToggleCart,
  onAddProductToCart,
  onPageMount,
  onUpdateCartLength,
  onUpdateCartProductQuantity,
  onUpdateProductQuantity,
  onDeleteProductFromOfflineCart,
  onDeleteAllCartProductFromOfflineCart,
} = cartSlice?.actions;

export const getCart = (state: RootState) => state.carts;

export default cartSlice?.reducer;
