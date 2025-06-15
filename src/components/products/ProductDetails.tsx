"use client";

import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import Button from "../Button";
import ProductImage from "./ProductImage";
import SetQuantity from "./setQuantity";

// Hook de carrinho
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/product";

// Props do componente
interface ProductDetailsProps {
  product: Product;
}

// Tipo da imagem selecionada
export type selectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

// Tipo do produto no carrinho
export type CartProductType = {
  uuid: string;
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectedImgType;
  quantity: number;
  price: number;
};

const Spacer = () => <div className="h-4" />;

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const router = useRouter();

  const [isProductInCart, setIsProductInCart] = useState(false);

  // 🔥 Processa o array de imagens
  const images: selectedImgType[] = (product.images || []).map(
    (img, index) => ({
      color: `Image ${index + 1}`,
      colorCode: "#000000",
      image: img,
    })
  );

  // Mock de avaliações (já que não existe no backend atual)
  const reviews = [{ rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 3 }];
  const averageRating =
    reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    uuid: uuidv4(),
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.provider || "General", // Usando provider como categoria
    brand: "Default Brand", // Mock
    selectedImg: images[0] || {
      color: "Default",
      colorCode: "#000000",
      image: product.images[0] || "",
    },
    quantity: 1,
    price: product.price,
  });

  useEffect(() => {
    setIsProductInCart(
      cartProducts?.some((item) => item.id === product.id) ?? false
    );
  }, [cartProducts, product.id]);

  const handeColorSelect = useCallback((value: selectedImgType) => {
    setCartProduct((prev) => ({ ...prev, selectedImg: value }));
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  }, []);

  const handleQuantityDecrease = useCallback(() => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
    }));
  }, []);

  const handleAddToCart = () => {
    if (isProductInCart) {
      toast("This product is already in your cart.", {
        description: "Do you want to add it again?",
        action: {
          label: "Add anyway",
          onClick: () => {
            handleAddProductToCart({ ...cartProduct, uuid: uuidv4() });
            toast.success("Product added again to cart!");
          },
        },
      });
    } else {
      handleAddProductToCart(cartProduct);
      toast.success("Product added to cart!");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handeColorSelect}
      />

      <div className="flex flex-col gap-2 text-sm text-muted">
        <h2 className="text-3xl font-medium text-foreground">{product.name}</h2>

        <div className="flex items-center gap-2">
          <Rating value={averageRating} readOnly />
          <div>{reviews.length} reviews</div>
        </div>

        <Spacer />

        <div className="text-justify">{product.description}</div>

        <Spacer />

        <div>
          <span className="font-semibold text-foreground">CATEGORY:</span>{" "}
          {product.provider}
        </div>
        <div>
          <span className="font-semibold text-foreground">BRAND:</span> Default
          Brand
        </div>

        <div className="text-teal-400">In Stock</div>

        <Spacer />

        {isProductInCart && (
          <p className="mb-2 flex items-center gap-1">
            <MdCheckCircle className="text-teal-400" size={20} />
            <span>Product already in cart</span>
          </p>
        )}

        <SetQuantity
          cartProduct={cartProduct}
          handleQuantityIncrease={handleQuantityIncrease}
          handleQuantityDecrease={handleQuantityDecrease}
        />

        <Spacer />

        <div className="max-w-[300px] flex gap-2">
          <Button
            label="Add To Cart"
            onClick={handleAddToCart}
            className="flex-1"
          />
          <Button
            label="View Cart"
            outline
            onClick={() => router.push("/cart")}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
