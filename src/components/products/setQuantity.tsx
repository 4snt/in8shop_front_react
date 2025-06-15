"use client";

import { CartProductType } from "./ProductDetails";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

// Estilo dos botões de + e -
const btnStyles = `
  border
  border-[var(--muted)]
  px-2
  rounded
  text-[var(--foreground)]
  hover:bg-[var(--foreground)]
  hover:text-[var(--background)]
  transition
  duration-200
  shadow-sm
`;

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartProduct,
  cartCounter,
  handleQuantityDecrease,
  handleQuantityIncrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {/* Texto "QUANTITY:" só aparece se não for contador do carrinho */}
      {!cartCounter && (
        <div className="font-semibold text-[var(--foreground)]">QUANTITY:</div>
      )}

      <div className="flex gap-4 items-center text-base text-[var(--foreground)]">
        <button onClick={handleQuantityDecrease} className={btnStyles}>
          −
        </button>
        <div className="min-w-[1.5rem] text-center">{cartProduct.quantity}</div>
        <button onClick={handleQuantityIncrease} className={btnStyles}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
