import { Component, OnInit, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { Users } from '../../../core/services/users';
import { Cart } from '../../../core/services/cart';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  loggedIn = signal(false);
  userName = signal('');

  constructor(
    private router: Router,
    private usersService: Users,
    public cartService: Cart
  ) {}

  ngOnInit() {
    this.refreshHeader();

    this.router.events.subscribe(() => {
      this.refreshHeader();
    });
  }

  refreshHeader() {
    const token = localStorage.getItem('accessToken');

    this.loggedIn.set(!!token);

    if (!token) {
      this.userName.set('');
      this.cartService.cartCount.set(0);
      return;
    }

    this.loadUser();
    this.loadCartCount();
  }

  loadUser() {
    this.usersService.getProfile().subscribe({
      next: (response) => {
        this.userName.set(response.data.firstName ?? '');
      },
      error: (err) => {
        console.log('USER ERROR:', err);
      }
    });
  }

  loadCartCount() {
    this.cartService.refreshCartCount();
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.loggedIn.set(false);
    this.userName.set('');
    this.cartService.cartCount.set(0);

    this.router.navigate(['/login']);
  }
}