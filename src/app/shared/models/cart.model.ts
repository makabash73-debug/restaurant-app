import { Product } from './product.model';

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface EditCartQuantityRequest {
  itemId: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartResponse {
  data: {
    totalItems: number;
    totalPrice: number;
    items: CartItem[];
  };
  meta: unknown;
}