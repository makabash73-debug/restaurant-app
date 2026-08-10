import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileResponse } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Users {
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/users';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<ProfileResponse>(`${this.baseUrl}/me`);
  }
}