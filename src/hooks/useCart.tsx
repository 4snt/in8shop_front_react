"use client";

import { CartProductType } from "@/components/products/ProductDetails";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type CartContextType = {
  cartTotalQuantity: number;
  setCartTotalQuantity: React.Dispatch<React.SetStateAction<number>>;
  cartProducts: CartProductType[];
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  clearCart: () => void;
  handleCartQuantityIncrease: (product: CartProductType) => void;
  handleCartQuantityDecrease: (product: CartProductType) => void;
  cartTotalAmount: number;
  paymentIntent: string | null;
  handleSetPaymentIntent: (value: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: Props) => {
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems = localStorage.getItem("acheiShopCartItems");
    if (cartItems) {
      const parsed: CartProductType[] = JSON.parse(cartItems);
      setCartProducts(parsed);
      setCartTotalQuantity(
        parsed.reduce((acc, item) => acc + item.quantity, 0)
      );
    }
    const acheishopPaymentIntent = localStorage.getItem(
      "acheishopPaymentIntent"
    );
    const paymentIntent: string | null = acheishopPaymentIntent
      ? JSON.parse(acheishopPaymentIntent)
      : null;
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, quantity } = cartProducts.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.quantity += item.quantity;
            return acc;
          },
          {
            total: 0,
            quantity: 0,
          }
        );

        setCartTotalQuantity(quantity);
        setCartTotalAmount(total);
      }
    };

    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      localStorage.setItem("acheiShopCartItems", JSON.stringify(updatedCart));
      setCartTotalQuantity((q) => q + product.quantity);

      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      const filteredProducts = cartProducts.filter(
        (item) => item.uuid !== product.uuid
      );

      setCartProducts(filteredProducts);
      localStorage.setItem(
        "acheiShopCartItems",
        JSON.stringify(filteredProducts)
      );
      setCartTotalQuantity(
        filteredProducts.reduce((acc, item) => acc + item.quantity, 0)
      );
    },
    [cartProducts]
  );

  const handleCartQuantityIncrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 99) {
        return toast.error("Maximum of products");
      }

      if (cartProducts) {
        const updatedCart = [...cartProducts];
        const index = cartProducts.findIndex((item) => item.id === product.id);
        if (index > -1) {
          updatedCart[index].quantity += 1;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("acheiShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQuantityDecrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 1) {
        return toast.error("Minimum of products, please use remove button");
      }

      if (cartProducts) {
        const updatedCart = [...cartProducts];
        const index = cartProducts.findIndex((item) => item.id === product.id);
        if (index > -1) {
          updatedCart[index].quantity -= 1;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("acheiShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const clearCart = useCallback(() => {
    setCartProducts([]);
    setCartTotalQuantity(0);
    setCartTotalAmount(0);
    localStorage.removeItem("acheiShopCartItems");
    toast.success("Cart cleared!");
  }, []);

  const handleSetPaymentIntent = useCallback((value: string | null) => {
    setPaymentIntent(value);
    localStorage.setItem("acheishopPaymentIntent", JSON.stringify(value));
  }, []);

  const value: CartContextType = {
    cartTotalQuantity,
    setCartTotalQuantity,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    clearCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    cartTotalAmount,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
