"use client";

import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateTex";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="
        col-span-1
        cursor-pointer
        border
        rounded-xl
        p-4
        transition
        hover:scale-[1.03]
        shadow-sm
        text-sm
      "
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex flex-col items-center w-full gap-2">
        {/* Imagem */}
        <div className="aspect-square overflow-hidden relative w-full rounded-lg bg-white">
          <Image
            fill
            src={data?.images[0] || "/placeholder.png"}
            alt={data?.name || "Product Image"}
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Nome */}
        <div className="mt-4 text-center font-semibold">
          {truncateText(data.name)}
        </div>

        {/* Badge do Provider + Desconto */}
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full border">
            {data.provider.toUpperCase()}
          </span>
          {data.hasDiscount && (
            <span className="text-xs text-red-500 font-semibold">
              {Math.round(data.discountValue * 100)}% OFF
            </span>
          )}
        </div>

        {/* Preço */}
        <div className="font-semibold text-blue-500">
          {data.hasDiscount ? (
            <>
              <span className="line-through text-xs text-muted-foreground">
                {formatPrice(data.price)}
              </span>{" "}
              {formatPrice(data.price * (1 - data.discountValue))}
            </>
          ) : (
            <>{formatPrice(data.price)}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
