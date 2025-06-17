import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showPageList = false;
  siteRoutes: Routes = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.siteRoutes = this.router.config;
  }

  togglePageList() {
    this.showPageList = !this.showPageList;
  }

  redirect() {
    const currentUrl = this.router.url;

    if (currentUrl === '/home' || currentUrl === '/') {
      this.authService.clearToken();
      this.router.navigate(['/home']);
      return;
    }

    const token = this.authService.getToken();
    if (token) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
