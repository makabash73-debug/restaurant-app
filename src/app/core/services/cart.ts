import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

import {
  AddToCartRequest,
  CartResponse,
  EditCartQuantityRequest
} from '../../shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class Cart {

  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/cart';

  cartCount = signal(0);

  constructor(private http: HttpClient) {}


  getCart() {
    return this.http.get<CartResponse>(this.baseUrl).pipe(
      tap((response) => {
        this.cartCount.set(response.data.totalItems);
      })
    );
  }


  refreshCartCount() {
    this.getCart().subscribe({
      error: () => {
        this.cartCount.set(0);
      }
    });
  }


  addToCart(product: AddToCartRequest) {
    return this.http.post(
      `${this.baseUrl}/add-to-cart`,
      product
    ).pipe(
      tap(() => {
        this.refreshCartCount();
      })
    );
  }


  editQuantity(product: EditCartQuantityRequest) {
    return this.http.put(
      `${this.baseUrl}/edit-quantity`,
      product
    ).pipe(
      tap(() => {
        this.refreshCartCount();
      })
    );
  }


  removeFromCart(itemId: number) {
    return this.http.delete(
      `${this.baseUrl}/remove-from-cart/${itemId}`
    ).pipe(
      tap(() => {
        this.refreshCartCount();
      })
    );
  }


  checkout() {
    return this.http.post(
      `${this.baseUrl}/checkout`,
      {}
    ).pipe(
      tap(() => {
        this.cartCount.set(0);
      })
    );
  }
}
