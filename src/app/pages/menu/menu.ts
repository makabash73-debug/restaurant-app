import { Component, OnInit, signal } from '@angular/core';
import { Products } from '../../core/services/products';
import { Product } from '../../shared/models/product.model';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { Categories } from '../../core/services/categories';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-menu',
  imports: [ProductCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  selectedCategoryId = signal<number | null>(null);
  searchText = signal('');
  vegetarianOnly = signal(false);
  selectedSpiciness = signal<number | null>(null);
  selectedRate = signal<number | null>(null);

  // სლაიდერზე ნაჩვენები ფასები
  minPrice = signal(0);
  maxPrice = signal(50);

  // რეალურად გამოყენებული ფასები
  appliedMinPrice = signal(0);
  appliedMaxPrice = signal(50);

  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private productsService: Products,
    private categoriesService: Categories
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.products.set(response.data.products);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Products could not be loaded');
        this.loading.set(false);
      }
    });
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories.set(response.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilters() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productsService.filterProducts({
      categoryId: this.selectedCategoryId(),
      query: this.searchText().trim(),
      vegetarian: this.vegetarianOnly(),
      spiciness: this.selectedSpiciness(),
      rate: this.selectedRate(),

      // აქ უკვე გამოყენებული ფასები მიდის
      minPrice: this.appliedMinPrice(),
      maxPrice: this.appliedMaxPrice()

    }).subscribe({
      next: (response) => {
        this.products.set(response.data.products);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set('Products could not be filtered');
        this.loading.set(false);
      }
    });
  }

  selectAllCategories() {
    this.selectedCategoryId.set(null);
    this.applyFilters();
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId.set(categoryId);
    this.applyFilters();
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText.set(input.value);
  }

  searchProducts() {
    this.applyFilters();
  }

  toggleVegetarian(event: Event) {
    const input = event.target as HTMLInputElement;
    this.vegetarianOnly.set(input.checked);
    this.applyFilters();
  }

  filterBySpiciness(event: Event) {
    const input = event.target as HTMLInputElement;
    const spiciness = Number(input.value);

    this.selectedSpiciness.set(spiciness);
    this.applyFilters();
  }

  filterByRate(event: Event) {
    const input = event.target as HTMLInputElement;
    const rate = Number(input.value);

    this.selectedRate.set(rate);
    this.applyFilters();
  }

  onMinPriceChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.minPrice.set(Number(input.value));
  }

  onMaxPriceChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.maxPrice.set(Number(input.value));
  }

  filterByPrice() {

    // მხოლოდ Apply Price-ზე დაჭერისას გადავიტანოთ რეალურ ფილტრში
    this.appliedMinPrice.set(this.minPrice());
    this.appliedMaxPrice.set(this.maxPrice());

    this.applyFilters();
  }

  clearFilters() {
    this.selectedCategoryId.set(null);
    this.searchText.set('');
    this.vegetarianOnly.set(false);
    this.selectedSpiciness.set(null);
    this.selectedRate.set(null);

    this.minPrice.set(0);
    this.maxPrice.set(50);

    this.appliedMinPrice.set(0);
    this.appliedMaxPrice.set(50);

    this.loadProducts();
  }
}
