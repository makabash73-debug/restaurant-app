import { Component, OnInit, signal } from '@angular/core';
import { Cart as CartService } from '../../core/services/cart';

import { CartResponse } from '../../shared/models/cart.model';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cart = signal<CartResponse | null>(null);
  loading = signal(false);
  errorMessage = signal('');

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.cartService.getCart().subscribe({
      next: (response) => {
        console.log(response);
        this.cart.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set('Cart could not be loaded');
        this.loading.set(false);
      }
    });
  } 
  
  removeItem(itemId: number) {
  this.cartService.removeFromCart(itemId).subscribe({
    next: () => {
      this.loadCart();
    },
    error: (err) => {
      console.log(err);
      this.errorMessage.set('Item could not be removed');
    }
  });
}

changeQuantity(itemId: number, quantity: number) {
  if (quantity < 1) {
    return;
  }

  this.cartService.editQuantity({
    itemId: itemId,
    quantity: quantity
  }).subscribe({
    next: () => {
      this.loadCart();
    },
    error: (err) => {
      console.log(err);
      this.errorMessage.set('Quantity could not be changed');
    }
  });
}

checkout() {
  this.cartService.checkout().subscribe({
    next: (response) => {
      this.loadCart();
    },
    error: (err) => {
      console.log(err);
      this.errorMessage.set('Checkout could not be completed');
    }
  });
}

}
