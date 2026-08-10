import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddToCartRequest, CartResponse, EditCartQuantityRequest } from '../../shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/cart';

  constructor(private http: HttpClient) {}

  getCart() {
    return this.http.get<CartResponse>(this.baseUrl);
  }

  addToCart(product: AddToCartRequest) {
    return this.http.post(`${this.baseUrl}/add-to-cart`, product);
  }

  editQuantity(product: EditCartQuantityRequest) {
    return this.http.put(`${this.baseUrl}/edit-quantity`, product);
  }

  removeFromCart(itemId: number) {
    return this.http.delete(`${this.baseUrl}/remove-from-cart/${itemId}`);
  }

  checkout() {
    return this.http.post(`${this.baseUrl}/checkout`, {});
  }
}
