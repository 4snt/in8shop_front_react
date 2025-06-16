export interface OrderItemDto {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderDto {
  id: number;
  createDate: string; // ISO
  amount: number;
  currency: string;
  status: string;
  deliveryStatus?: string;
  products: OrderItemDto[];
  address?: {
    street: string;
    city: string;
    // … outros campos
  };
}
