import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryResponse } from '../../shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class Categories {
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/categories';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<CategoryResponse>(this.baseUrl);
  }
}
