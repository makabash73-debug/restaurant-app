import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-verify-email',
  imports: [],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css'
})
export class VerifyEmail implements OnInit {

  email = signal('');
  code = signal('');

  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  resendMessage = signal('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(Auth);

  ngOnInit() {
    const emailFromUrl =
      this.route.snapshot.queryParamMap.get('email');

    if (emailFromUrl) {
      this.email.set(emailFromUrl);
    }
  }

  onCodeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.code.set(input.value);
  }

  verifyEmail() {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (!this.email() || !this.code().trim()) {
      this.errorMessage.set(
        'Please enter verification code'
      );
      return;
    }

    this.loading.set(true);

    this.authService.verifyEmail({
      email: this.email(),
      code: this.code().trim()
    }).subscribe({
      next: (response) => {

        localStorage.setItem(
          'accessToken',
          response.data.accessToken
        );

        localStorage.setItem(
          'refreshToken',
          response.data.refreshToken
        );

        this.successMessage.set(
          'Email verified successfully'
        );

        this.loading.set(false);

        this.router.navigate(['/home']);
      },

      error: (err) => {
        console.log(err);

        this.errorMessage.set(
          err.error?.detail ||
          'Email verification failed'
        );

        this.loading.set(false);
      }
    });
  }

  resendCode() {
    this.resendMessage.set('');
    this.errorMessage.set('');

    if (!this.email()) {
      this.errorMessage.set(
        'Email address is missing'
      );
      return;
    }

    this.authService
      .resendEmailVerification(this.email())
      .subscribe({
        next: () => {
          this.resendMessage.set(
            'Verification code sent again'
          );
        },

        error: (err) => {
          console.log(err);

          this.errorMessage.set(
            err.error?.detail ||
            'Verification code could not be resent'
          );
        }
      });
  }
}
