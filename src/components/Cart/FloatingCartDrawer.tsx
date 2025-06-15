"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import Button from "../Button";
import ItemContent from "./ItemContent";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingCartDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { cartProducts, cartTotalAmount, clearCart } = useCart();
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex justify-end">
      <div
        className="w-full max-w-md h-full shadow-lg p-4 flex flex-col relative animate-slide-in"
        style={{
          backgroundColor: "var(--surface)",
          color: "var(--foreground)",
          borderLeft: "1.5px solid var(--border)",
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center border-b pb-3 mb-3"
          style={{ borderColor: "var(--border)" }}
        >
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-grow overflow-y-auto flex flex-col gap-4">
          {cartProducts?.length ? (
            cartProducts.map((item) => (
              <ItemContent key={item.uuid} item={item} isFloating />
            ))
          ) : (
            <p
              className="text-sm text-center mt-4"
              style={{ color: "var(--muted)" }}
            >
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          className="border-t pt-3 mt-4 space-y-2"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex justify-between font-medium text-sm">
            <span>Total:</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <Button label="Checkout" onClick={() => router.push("/checkout")} />
          <Button label="Clear Cart" onClick={clearCart} outline small />
        </div>
      </div>
    </div>
  );
};

export default FloatingCartDrawer;
