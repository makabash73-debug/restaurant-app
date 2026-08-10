import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductResponse, ProductsResponse } from '../../shared/models/product.model';

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
    return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);;
  }
  

  filterProductsByCategory(categoryId: number) {
    return this.http.get<ProductsResponse>(`${this.baseUrl}/filter?CategoryId=${categoryId}`);
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
