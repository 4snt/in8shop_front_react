export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  provider: string;
  hasDiscount: boolean;
  discountValue: number;
}
