import { Component, input, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { Cart } from '../../../core/services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  product = input.required<Product>();
  loading = signal(false);
  message = signal('');

  constructor(private cartService: Cart) {}

  addToCart() {
    this.loading.set(true);
    this.message.set('');

    this.cartService.addToCart({
      productId: this.product().id,
      quantity: 1
    }).subscribe({
      next: () => {
        this.message.set('Added to cart');
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.message.set('Could not add to cart');
        this.loading.set(false);
      }
    });
  }
}
