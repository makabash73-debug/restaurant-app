import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ProductResponse,
  ProductsResponse
} from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class Products {

  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<ProductsResponse>(this.baseUrl);
  }

  getProductById(id: number) {
    return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);
  }

  filterProducts(filters: {
    categoryId?: number | null;
    query?: string;
    vegetarian?: boolean;
    spiciness?: number | null;
    rate?: number | null;
    minPrice?: number | null;
    maxPrice?: number | null;
  }) {

    const params: string[] = [];

    if (filters.categoryId !== null && filters.categoryId !== undefined) {
      params.push(`CategoryId=${filters.categoryId}`);
    }

    if (filters.query) {
      params.push(`Query=${encodeURIComponent(filters.query)}`);
    }

    if (filters.vegetarian) {
      params.push(`Vegetarian=true`);
    }

    if (filters.spiciness !== null && filters.spiciness !== undefined) {
      params.push(`Spiciness=${filters.spiciness}`);
    }

    if (filters.rate !== null && filters.rate !== undefined) {
      params.push(`Rate=${filters.rate}`);
    }

    if (filters.minPrice !== null && filters.minPrice !== undefined) {
      params.push(`MinPrice=${filters.minPrice}`);
    }

    if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
      params.push(`MaxPrice=${filters.maxPrice}`);
    }

    const url = `${this.baseUrl}/filter?${params.join('&')}`;

    return this.http.get<ProductsResponse>(url);
  }

  filterProductsByCategory(categoryId: number) {
    return this.http.get<ProductsResponse>(
      `${this.baseUrl}/filter?CategoryId=${categoryId}`
    );
  }

  searchProducts(query: string) {
    return this.http.get<ProductsResponse>(
      `${this.baseUrl}/filter?Query=${query}`
    );
  }

  filterVegetarianProducts() {
    return this.http.get<ProductsResponse>(
      `${this.baseUrl}/filter?Vegetarian=true`
    );
  }

  filterProductsBySpiciness(spiciness: number) {
    return this.http.get<ProductsResponse>(
      `${this.baseUrl}/filter?Spiciness=${spiciness}`
    );
  }

  filterProductsByRate(rate: number) {
    return this.http.get<ProductsResponse>(
      `${this.baseUrl}/filter?Rate=${rate}`
    );
  }

  filterProductsByPrice(minPrice: number, maxPrice: number) {
    return this.http.get<ProductsResponse>(
      `${this.baseUrl}/filter?MinPrice=${minPrice}&MaxPrice=${maxPrice}`
    );
  }
}