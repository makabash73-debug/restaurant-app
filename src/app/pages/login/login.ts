import { Component, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = signal('');
  password = signal('');
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
  private authService: Auth,
  private router: Router
) {}

  onEmailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email.set(input.value);
  }

  onPasswordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password.set(input.value);
  }

  login() {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.login({
      email: this.email(),
      password: this.password()
    }).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        
        this.successMessage.set('Login successful');
        this.loading.set(false);
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set('Email or password is incorrect');
        this.loading.set(false);
      }
    });
  }
}
