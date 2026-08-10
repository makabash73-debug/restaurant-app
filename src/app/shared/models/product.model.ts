import { Category } from './category.model';

export interface Product {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  vegetarian: boolean;
  spiciness: number;
  rate: number;
  price: number;
  image: string;
  method: string;
  ingredients: string[];
  isUserCreated: boolean;
  key: string;
  categoryId: number;
  category: Category;
  items: unknown[];
}
export interface ProductsResponse {
  data: {
    products: Product[];
    hasMore: boolean;
  };
  meta: unknown;
}

export interface ProductResponse {
  data: Product;
  meta: unknown;
}