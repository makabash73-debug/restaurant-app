import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Products } from '../../core/services/products';
import { Product } from '../../shared/models/product.model';
import { Cart } from '../../core/services/cart';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-product-details',
  imports: [ProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {

  product = signal<Product | null>(null);
  relatedProducts = signal<Product[]>([]);
  loading = signal(false);
  message = signal('');
  quantity = signal(1);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productsService = inject(Products);
  private cartService = inject(Cart);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.productsService.getProductById(id).subscribe({
      next: (response) => {
        console.log('PRODUCT RESPONSE:', response);

        this.product.set(response.data);

        this.loadRelatedProducts(
          response.data.categoryId,
          response.data.id
        );
      },

      error: (err) => {
        console.log('PRODUCT ERROR:', err);
      }
    });
  }

  loadRelatedProducts(
    categoryId: number,
    currentProductId: number
  ) {
    this.productsService
      .filterProductsByCategory(categoryId)
      .subscribe({
        next: (response) => {

          const related = response.data.products
            .filter(product => product.id !== currentProductId)
            .slice(0, 3);

          this.relatedProducts.set(related);
        },

        error: (err) => {
          console.log('RELATED PRODUCTS ERROR:', err);
        }
      });
  }

  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }

  increaseQuantity() {
    this.quantity.set(this.quantity() + 1);
  }

  addToCart() {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      this.router.navigate(['/login']);
    } else {

      const product = this.product();

      if (!product) {
        return;
      }

      this.loading.set(true);
      this.message.set('');

      this.cartService.addToCart({
        productId: product.id,
        quantity: this.quantity()
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
}