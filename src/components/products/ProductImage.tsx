"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { CartProductType, selectedImgType } from "./ProductDetails";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: Product;
  handleColorSelect: (value: selectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  // 🔥 Normaliza para array
  const images: selectedImgType[] = Array.isArray(product.images)
    ? product.images.map((img, index) => ({
        color: `Image ${index + 1}`,
        colorCode: "#000000",
        image: img,
      }))
    : [
        {
          color: "Default",
          colorCode: "#000000",
          image: product.images,
        },
      ];

  return (
    <div
      className="
        grid
        grid-cols-6
        gap-2
        h-full
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-4
          cursor-pointer
          border
          h-full
          max-h-[500px]
          min-h-[300px]
          sm:min-h-[400px]
        "
      >
        {images.map((image) => (
          <div
            key={image.color}
            onClick={() => handleColorSelect(image)}
            className={`relative w-4/5 aspect-square rounded 
              ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px] border-black"
                  : "border border-transparent"
              }
            `}
          >
            <Image
              src={image.image}
              alt={image.color}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="col-span-5 relative aspect-square">
        <Image
          fill
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          className="
        w-full
        h-full
        object-contain
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]
        "
        />
      </div>
    </div>
  );
};

export default ProductImage;
