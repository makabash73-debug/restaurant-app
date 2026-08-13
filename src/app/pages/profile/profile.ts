import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Users } from '../../core/services/users';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user = signal<User | null>(null);

  loading = signal(false);
  errorMessage = signal('');

  activeTab = signal<'personal' | 'password' | 'account'>('personal');


  // PERSONAL INFO

  firstName = signal('');
  lastName = signal('');
  phoneNumber = signal('');
  picture = signal('');
  address = signal('');
  age = signal<number | null>(null);

  profileLoading = signal(false);
  profileMessage = signal('');
  profileError = signal('');


  // PASSWORD

  oldPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');

  passwordLoading = signal(false);
  passwordMessage = signal('');
  passwordError = signal('');


  constructor(
    private usersService: Users,
    private router: Router
  ) {}


  ngOnInit() {
    this.loadProfile();
  }


  loadProfile() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.usersService.getProfile().subscribe({
      next: (response) => {

        const userData = response.data;

        this.user.set(userData);

        this.firstName.set(userData.firstName ?? '');
        this.lastName.set(userData.lastName ?? '');
        this.phoneNumber.set(userData.phoneNumber ?? '');
        this.picture.set(userData.image ?? '');
        this.address.set(userData.address ?? '');
        this.age.set(userData.age ?? null);

        this.loading.set(false);
      },

      error: (err) => {
        console.log(err);

        this.errorMessage.set(
          'Profile could not be loaded'
        );

        this.loading.set(false);
      }
    });
  }


  // TABS

  showPersonalInfo() {
    this.activeTab.set('personal');
  }

  showChangePassword() {
    this.activeTab.set('password');
  }

  showAccountSettings() {
    this.activeTab.set('account');
  }


  // PERSONAL INFO INPUTS

  onFirstNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.firstName.set(input.value);
  }

  onLastNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.lastName.set(input.value);
  }

  onPhoneNumberChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.phoneNumber.set(input.value);
  }

  onPictureChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.picture.set(input.value);
  }

  onAddressChange(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.address.set(textarea.value);
  }

  onAgeChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.value === '') {
      this.age.set(null);
    } else {
      this.age.set(Number(input.value));
    }
  }


  // UPDATE PROFILE

  updateProfile() {
    this.profileMessage.set('');
    this.profileError.set('');

    this.profileLoading.set(true);

    this.usersService.editUser({
      firstName: this.firstName(),
      lastName: this.lastName(),
      phoneNumber: this.phoneNumber(),
      picture: this.picture(),
      address: this.address(),
      age: this.age()
    }).subscribe({
      next: () => {

        this.profileMessage.set(
          'Profile updated successfully'
        );

        this.profileLoading.set(false);

        this.loadProfile();
      },

      error: (err) => {
        console.log(err);

        this.profileError.set(
          err.error?.detail ||
          'Profile could not be updated'
        );

        this.profileLoading.set(false);
      }
    });
  }


  // PASSWORD INPUTS

  onOldPasswordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.oldPassword.set(input.value);
  }

  onNewPasswordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newPassword.set(input.value);
  }

  onConfirmPasswordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.confirmPassword.set(input.value);
  }


  // CHANGE PASSWORD

  changePassword() {
    this.passwordMessage.set('');
    this.passwordError.set('');

    if (
      !this.oldPassword() ||
      !this.newPassword() ||
      !this.confirmPassword()
    ) {
      this.passwordError.set(
        'Please fill in all password fields'
      );

      return;
    }

    if (
      this.newPassword() !==
      this.confirmPassword()
    ) {
      this.passwordError.set(
        'Passwords do not match'
      );

      return;
    }

    this.passwordLoading.set(true);

    this.usersService.changePassword({
      oldPassword: this.oldPassword(),
      newPassword: this.newPassword(),
      confirmPassword: this.confirmPassword()
    }).subscribe({
      next: () => {

        this.passwordMessage.set(
          'Password changed successfully'
        );

        this.oldPassword.set('');
        this.newPassword.set('');
        this.confirmPassword.set('');

        this.passwordLoading.set(false);
      },

      error: (err) => {
        console.log(err);

        this.passwordError.set(
          err.error?.detail ||
          'Password could not be changed'
        );

        this.passwordLoading.set(false);
      }
    });
  }


  // DELETE ACCOUNT

  deleteAccount() {
    const confirmed = confirm(
      'Are you sure you want to delete your account?'
    );

    if (!confirmed) {
      return;
    }

    this.usersService.deleteUser().subscribe({
      next: () => {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        this.router.navigate(['/register']);
      },

      error: (err) => {
        console.log(err);

        this.errorMessage.set(
          'Account could not be deleted'
        );
      }
    });
  }
}