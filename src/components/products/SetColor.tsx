"use client";

import { CartProductType, selectedImgType } from "./ProductDetails";

interface SetColorProps {
  images: selectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: selectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({ images, cartProduct, handleColorSelect }) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold text-[var(--foreground)]">COLOR:</span>
        <div className="flex gap-2">
          {images.map((image) => {
            const isSelected = cartProduct.selectedImg.colorCode === image.colorCode;

            return (
              <div
                key={image.colorCode}
                className={`
                  p-[2px]
                  rounded-full
                  ${isSelected ? "ring-2 ring-[var(--foreground)]" : "ring-1 ring-transparent"}
                  transition
                  duration-200
              `}
              >
                <div
                  onClick={() => handleColorSelect(image)}
                  style={{ background: image.colorCode }}
                  className="
                    h-6 w-6
                    rounded-full
                    border
                    border-[var(--border)]
                    cursor-pointer
                    transition
                    duration-200
                    hover:scale-110
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
