import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateTex";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { CartProductType } from "../products/ProductDetails";
import SetQuantity from "../products/setQuantity";

interface ItemContentProps {
  item: CartProductType;
  isFloating?: boolean;
}

const ItemContent: React.FC<ItemContentProps> = ({ item, isFloating }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
  } = useCart();

  return (
    <div
      className="grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center"
      style={{ color: "var(--muted)" }}
    >
      {/* 🧱 COLUNA 1 — Produto */}
      <div className="col-span-2 flex gap-4 items-center justify-self-start relative">
        {/* Imagem com prioridade de fundo */}
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square z-0">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain z-0"
            />
          </div>
        </Link>

        {/* Nome, cor e botão */}
        <div className="flex flex-col justify-between z-10">
          <Link
            href={`/product/${item.id}`}
            className="font-medium"
            style={{ color: "var(--foreground)" }}
          >
            {truncateText(item.name)}
          </Link>
          <span className="text-xs text-slate-500">
            {item.selectedImg.color}
          </span>
          <button
            className="text-xs underline cursor-pointer"
            style={{ color: "var(--foreground)" }}
            onClick={() => {
              handleRemoveProductFromCart(item);
              toast.success("Product removed from cart!");
            }}
          >
            Remove
          </button>
        </div>
      </div>

      {/* 💰 COLUNA 2 — Preço */}
      <div
        className="justify-self-start"
        style={{ color: "var(--foreground)" }}
      >
        {formatPrice(item.price)}
      </div>

      {/* 🔢 COLUNA 3 — Quantidade */}
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQuantityIncrease={() => {
            handleCartQuantityIncrease(item);
          }}
          handleQuantityDecrease={() => {
            handleCartQuantityDecrease(item);
          }}
        />
      </div>

      {/* 🧮 COLUNA 4 — Total */}
      <div
        className="justify-self-end"
        style={{
          color: "var(--foreground)",
          paddingRight: isFloating ? "0.15rem" : undefined,
        }}
      >
        {formatPrice(item.quantity * item.price)}
      </div>
    </div>
  );
};

export default ItemContent;
