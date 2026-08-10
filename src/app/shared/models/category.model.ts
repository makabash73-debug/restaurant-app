export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CategoryResponse {
  data: Category[];
  meta: unknown;
}