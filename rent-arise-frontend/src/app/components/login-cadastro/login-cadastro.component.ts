import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface LoginForm {
  email?: string;
  username?: string;
  password: string;
}

interface RegisterForm {
  fullname: string;
  username: string;
  email: string;
  password: string;
  cpf: string;
  role: string;
}

@Component({
  selector: 'app-login-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-cadastro.component.html',
  styleUrl: './login-cadastro.component.css'
})
export class LoginCadastroComponent {
  @Input() isRegister: boolean = true;

  showPassword = false;
  useEmail = true;
  errorMessage = '';

  loginForm: LoginForm = {
    email: '',
    password: ''
  };

  registerForm: RegisterForm = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    cpf: '',
    role: 'USER'
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleLoginMethod() {
    this.useEmail = !this.useEmail;
    if (this.useEmail) {
      this.loginForm.email = '';
      this.loginForm.username = undefined;
    } else {
      this.loginForm.username = '';
      this.loginForm.email = undefined;
    }
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.isRegister) {
      if (!this.registerForm.fullname || !this.registerForm.username ||
          !this.registerForm.email || !this.registerForm.password || !this.registerForm.cpf) {
        this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
        return;
      }

      this.authService.register(
        this.registerForm.fullname,
        this.registerForm.username,
        this.registerForm.email,
        this.registerForm.password,
        this.registerForm.cpf
      ).subscribe({
        next: (response) => {
          console.log('Cadastro bem-sucedido:', response);
          if (response?.access_token) {
            this.authService.setToken(response.access_token);
          }
          this.router.navigate(['/perfil']);
        },
        error: (error) => {
          console.error('Erro no cadastro:', error);
          this.errorMessage = error.error?.message || 'Erro ao realizar cadastro.';
        }
      });
    } else {
      if (!this.loginForm.password || (!this.loginForm.email && !this.loginForm.username)) {
        this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
        return;
      }

      const emailOrUsername = this.useEmail ? this.loginForm.email! : this.loginForm.username!;
      console.log('Tentando login com:', { emailOrUsername, useEmail: this.useEmail });

      this.authService.login(emailOrUsername, this.loginForm.password).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido:', response);
          if (response?.access_token) {
            this.authService.setToken(response.access_token);
          }
          this.router.navigate(['/produtos']);
        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.errorMessage = error.error?.message || 'Erro ao realizar login.';
        }
      });
    }
  }
}
