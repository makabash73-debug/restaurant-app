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
  minPrice = signal(0);
  maxPrice = signal(50);
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

  
selectAllCategories() {
  this.selectedCategoryId.set(null);
  this.loadProducts();
}

selectCategory(categoryId: number) {
  this.selectedCategoryId.set(categoryId);
  this.loading.set(true);
  this.errorMessage.set('');

  this.productsService.filterProductsByCategory(categoryId).subscribe({
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

onSearchChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.searchText.set(input.value);
}

searchProducts() {
  const query = this.searchText().trim();

  if (!query) {
    this.loadProducts();
    return;
  }

  this.loading.set(true);
  this.errorMessage.set('');

  this.productsService.searchProducts(query).subscribe({
    next: (response) => {
      this.products.set(response.data.products);
      this.loading.set(false);
    },
    error: (err) => {
      console.log(err);
      this.errorMessage.set('Products could not be searched');
      this.loading.set(false);
    }
  });
}

toggleVegetarian(event: Event) {
  const input = event.target as HTMLInputElement;
  this.vegetarianOnly.set(input.checked);

  if (input.checked) {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productsService.filterVegetarianProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.products.set(response.data.products);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set('Products could not be filtered');
        this.loading.set(false);
      }
    });

    return;
  }

  this.loadProducts();
}

filterBySpiciness(event: Event) {
  const input = event.target as HTMLInputElement;
  const spiciness = Number(input.value);

  this.selectedSpiciness.set(spiciness);
  this.loading.set(true);
  this.errorMessage.set('');

  this.productsService.filterProductsBySpiciness(spiciness).subscribe({
    next: (response) => {
      console.log(response);
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

filterByRate(event: Event) {
  const input = event.target as HTMLInputElement;
  const rate = Number(input.value);

  this.selectedRate.set(rate);
  this.loading.set(true);
  this.errorMessage.set('');

  this.productsService.filterProductsByRate(rate).subscribe({
    next: (response) => {
      console.log(response);
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

onMinPriceChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.minPrice.set(Number(input.value));
}

onMaxPriceChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.maxPrice.set(Number(input.value));
}

filterByPrice() {
  this.loading.set(true);
  this.errorMessage.set('');

  this.productsService.filterProductsByPrice(
    this.minPrice(),
    this.maxPrice()
  ).subscribe({
    next: (response) => {
      console.log(response);
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
  

}
