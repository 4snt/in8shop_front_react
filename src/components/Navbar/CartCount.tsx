"use client";
import { useCart } from "@/hooks/useCart";
import { useCartDrawer } from "@/hooks/useCartDrawer";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
  const { cartTotalQuantity } = useCart();
  const { openDrawer } = useCartDrawer();

  return (
    <div className="relative cursor-pointer" onClick={openDrawer}>
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span
        className="
      absolute
      top-[10px]
      right-[-10px]
      bg-slate-700
      text-white
      h-6
      w-5
      flex
      items-center
      rounded-full
      justify-center
      text-sm
      "
      >
        {cartTotalQuantity}
      </span>
    </div>
  );
};

export default CartCount;
