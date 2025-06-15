"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import Button from "../Button";
import Heading from "../products/Heading";
import ItemContent from "./ItemContent";

const CartClient = () => {
  const { cartProducts, clearCart, cartTotalAmount } = useCart();
  const router = useRouter();
  // 👉 Carrinho vazio
  if (!cartProducts || cartProducts.length === 0)
    return (
      <div
        className="flex flex-col items-center text-center text-sm"
        style={{ color: "var(--muted)" }}
      >
        <div
          className="text-2xl font-medium mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Your cart is empty
        </div>
        <Link
          href="/"
          className="flex items-center gap-1 mt-2 text-sm font-medium hover:underline transition"
          style={{ color: "var(--foreground)" }}
        >
          <MdArrowBack />
          <span>Start Shopping</span>
        </Link>
      </div>
    );

  // ✅ Carrinho com produtos
  return (
    <div>
      {/* Título */}
      <Heading title="Shopping Cart" center />

      {/* Cabeçalho da tabela */}
      <div
        className="grid grid-cols-5 text-sm gap-4 pb-2 items-center mt-8 font-medium"
        style={{ color: "var(--muted)" }}
      >
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-start">PRICE</div>
        <div className="justify-self-start">QUANTITY</div>
        <div className="justify-self-start">TOTAL</div>
      </div>

      {/* Itens do carrinho */}
      <div className="flex flex-col mt-4 gap-4">
        {cartProducts.map((item) => (
          <ItemContent key={item.uuid} item={item} />
        ))}

        {/* Rodapé com subtotal e ações */}
        <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
          <div className="w-[90px]">
            <Button label="Clear Cart" onClick={clearCart} small outline />
          </div>

          <div className="text-sm flex flex-col gap-1 items-start">
            <div className="flex justify-between text-base font-semibold w-full">
              <span>{formatPrice(cartTotalAmount)}</span>
              <span>Price</span>{" "}
              {/* Aqui você pode calcular com reduce depois */}
            </div>
            <p className="text-slate-500">
              Taxes and Shipping calculated at checkout
            </p>

            <Button label="Checkout" onClick={() => router.push("/checkout")} />

            <Link
              href="/"
              className="flex items-center gap-1 mt-2 text-sm font-medium hover:underline transition"
              style={{ color: "var(--foreground)" }}
            >
              <MdArrowBack />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
