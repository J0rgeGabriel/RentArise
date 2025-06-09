import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

interface RegisterData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  cpf: string;
  role: string;
}

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    fullname: string;
    username: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private apiUrl = `${environment.apiUrl}/auth`;
  private _currentUser: AuthResponse['user'] | null = null;

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        this._currentUser = JSON.parse(userJson);
      } catch (e) {
        console.error('Erro ao carregar usuário do localStorage', e);
        this.clearToken();
      }
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Envia credenciais para autenticação e retorna o token JWT e dados do usuário.
   */
  login(emailOrUsername: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const data: LoginCredentials = {
      password
    };

    if (emailOrUsername.includes('@')) {
      data.email = emailOrUsername;
    } else {
      data.username = emailOrUsername;
    }

    console.log('Dados do login:', data);

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data, { headers }).pipe(
      tap(response => {
        this.setToken(response.access_token);
        this._currentUser = response.user;
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      })
    );
  }

  /**
   * Realiza o cadastro de um novo usuário.
   * Nota: Após o cadastro, o usuário geralmente já está logado e seus dados devem ser armazenados.
   * Assumindo que a resposta de register também contém AuthResponse com access_token e user.
   */
  register(fullname: string, username: string, email: string, password: string, cpf: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const data: RegisterData = {
      fullname,
      username,
      email,
      password,
      cpf,
      role: 'USER'
    };

    console.log('Dados do registro:', data);

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data, { headers }).pipe(
      tap(response => {
        this.setToken(response.access_token);
        this._currentUser = response.user;
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      })
    );
  }

  /**
   * Armazena o token JWT no localStorage.
   */
  setToken(token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Erro ao armazenar o token:', error);
    }
  }

  /**
   * Retorna o token JWT do localStorage.
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
      return null;
    }
  }

  /**
   * Remove o token JWT e os dados do usuário do localStorage e da memória.
   */
  clearToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem('currentUser');
      this._currentUser = null;
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    }
  }

  /**
   * Verifica se há um token válido no localStorage.
   */
  hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Retorna os dados do usuário logado.
   */
  get currentUser(): AuthResponse['user'] | null {
    return this._currentUser;
  }
}
