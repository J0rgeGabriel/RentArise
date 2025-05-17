import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-cadastro',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-cadastro.component.html',
  styleUrl: './login-cadastro.component.css'
})
export class LoginCadastroComponent {
  isRegister: boolean = true;
  showPassword: boolean = false;

  constructor(private router: Router) {}



  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
  }
}
