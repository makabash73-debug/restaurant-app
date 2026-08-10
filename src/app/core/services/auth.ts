import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/auth';

  constructor(private http: HttpClient) {}

  login(user: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, user);
  }

  register(user: RegisterRequest) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
