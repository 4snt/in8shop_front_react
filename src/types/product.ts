export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // 🔥 Agora é um array de imagens
  provider: string;
  hasDiscount: boolean;
  discountValue: number;
}
