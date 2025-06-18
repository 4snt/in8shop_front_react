export interface OrderItemDto {
  productId: string; // <-- Corrigido aqui
  quantity: number;
  price: number;
}

export interface OrderDto {
  id: number;
  createDate: string;
  amount: number;
  currency: string;
  status: string;
  deliveryStatus?: string;
  products: OrderItemDto[];
  address?: {
    street: string;
    city: string;
  };
}
