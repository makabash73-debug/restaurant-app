import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Cart } from './pages/cart/cart';
import { Profile } from './pages/profile/profile';
import { authGuard } from './core/guards/auth-guard';
import { ProductDetails } from './pages/product-details/product-details';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'menu', component: Menu },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'product/:id', component: ProductDetails },
  { path: '**', redirectTo: 'home' }
];