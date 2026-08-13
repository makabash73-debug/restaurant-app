import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  ProfileResponse,
  EditUserRequest,
  ChangePasswordRequest
} from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Users {

  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/users';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<ProfileResponse>(
      `${this.baseUrl}/me`
    );
  }

  editUser(user: EditUserRequest) {
    return this.http.put(
      `${this.baseUrl}/edit`,
      user
    );
  }

  changePassword(passwords: ChangePasswordRequest) {
    return this.http.put(
      `${this.baseUrl}/change-password`,
      passwords
    );
  }

  deleteUser() {
    return this.http.delete(
      `${this.baseUrl}/delete`
    );
  }
}