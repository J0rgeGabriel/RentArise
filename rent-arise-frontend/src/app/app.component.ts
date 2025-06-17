import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'RentArise';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = this.authService.getToken();

    if (!token && this.router.url !== '/home') {
      this.authService.clearToken();
      this.router.navigate(['/home']);
    }
  }
}
