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
  isSubmitting = false;

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
    role: 'user'
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
    this.loginForm.email = '';
    this.loginForm.username = '';
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.isRegister) {
      this.register();
    } else {
      this.login();
    }
  }

  login() {
    const emailOrUsername = this.useEmail ? this.loginForm.email : this.loginForm.username;

    if (!emailOrUsername || !this.loginForm.password) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    this.isSubmitting = true;

    this.authService.login(emailOrUsername, this.loginForm.password).subscribe({
      next: ({ token, user }) => {
        this.isSubmitting = false;
        console.log('Login bem-sucedido:', user);

        if (token) {
          this.authService.setToken(token);
        }

        // Você pode salvar user em um estado local ou serviço, se quiser.
        // Exemplo: this.currentUser = user;

        this.router.navigate(['/produtos']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Erro no login:', error);
        this.errorMessage = error.error?.message || 'Erro ao realizar login.';
      }
    });
  }

  register() {
    const { fullname, username, email, password, cpf } = this.registerForm;

    if (!fullname || !username || !email || !password || !cpf) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    this.isSubmitting = true;

    this.authService.register(fullname, username, email, password, cpf).subscribe({
      next: (user) => {
        this.isSubmitting = false;
        console.log('Cadastro bem-sucedido:', user);

        // Como o register já salva o token e busca o user, não precisa chamar setToken aqui.

        this.router.navigate(['/perfil']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Erro no cadastro:', error);
        this.errorMessage = error.error?.message || 'Erro ao realizar cadastro.';
      }
    });
  }

  isFormValid(): boolean {
    if (this.isRegister) {
      const { fullname, username, email, password, cpf } = this.registerForm;
      return !!fullname && !!username && !!email && !!password && !!cpf;
    } else {
      const { email, username, password } = this.loginForm;
      return this.useEmail
        ? !!email && !!password
        : !!username && !!password;
    }
  }
}