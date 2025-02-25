import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ CommonModule]
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private storageService: StorageService, private authService: AuthService) {
    this.isLoggedIn = !!this.storageService.getItem('adminToken');
  }

  ngOnInit() {
    this.isAdmin = !!this.storageService.getItem('adminToken');
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegistration() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}