import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';

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

  constructor(private router: Router) {
    this.siteRoutes = this.router.config;
  }

  togglePageList() {
    this.showPageList = !this.showPageList;
  }

  redirect() {
    this.router.navigate(['/']);
  }
}
