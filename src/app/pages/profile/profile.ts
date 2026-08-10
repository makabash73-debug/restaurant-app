import { Component, OnInit, signal } from '@angular/core';
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

  constructor(private usersService: Users) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.usersService.getProfile().subscribe({
      next: (response) => {
        console.log(response);
        this.user.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set('Profile could not be loaded');
        this.loading.set(false);
      }
    });
  }

  showPersonalInfo() {
    this.activeTab.set('personal');
  }

  showChangePassword() {
    this.activeTab.set('password');
  }

  showAccountSettings() {
    this.activeTab.set('account');
  }

}
