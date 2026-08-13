import { Component, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  firstName = signal('');
  lastName = signal('');
  email = signal('');
  password = signal('');

  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  onFirstNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.firstName.set(input.value);
  }

  onLastNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.lastName.set(input.value);
  }

  onEmailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email.set(input.value);
  }

  onPasswordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password.set(input.value);
  }

  register() {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.register({
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(),
      password: this.password()
    }).subscribe({
      next: () => {
        this.successMessage.set('Registration successful');
        this.loading.set(false);

        this.router.navigate(
          ['/verify-email'],
          {
            queryParams: {
              email: this.email()
            }
          }
        );
      },

      error: (err) => {
        console.log(err);

        this.errorMessage.set(
          err.error?.detail ||
          'Registration failed'
        );

        this.loading.set(false);
      }
    });
  }
}