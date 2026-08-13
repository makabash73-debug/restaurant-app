import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../../core/services/products';
import { Product } from '../../shared/models/product.model';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  popularProducts = signal<Product[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  constructor(private productsService: Products) {}

  ngOnInit() {
    this.loadPopularProducts();
  }

  loadPopularProducts() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productsService.getProducts().subscribe({
      next: (response) => {

        const popular = [...response.data.products]
          .sort((a, b) => b.rate - a.rate)
          .slice(0, 3);

        this.popularProducts.set(popular);

        this.loading.set(false);
      },

      error: (err) => {
        console.log(err);
        this.errorMessage.set('Popular dishes could not be loaded');
        this.loading.set(false);
      }
    });
  }
}