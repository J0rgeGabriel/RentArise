import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../shared/interfaces';

interface AuthResponse {
  access_token: string;
  user: User;
}

interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

interface LoginResult {
  token: string;
  user: User | null;
}

interface RegisterData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  cpf: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  /** Retorna o usuário atual */
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /** Cabeçalhos com token JWT para requisições autenticadas */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /** Realiza login, retorna token e usuário */
  login(emailOrUsername: string, password: string): Observable<LoginResult> {
    const data: LoginCredentials = { password };
  
    if (emailOrUsername.includes('@')) {
      data.email = emailOrUsername;
    } else {
      data.username = emailOrUsername;
    }
  
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => this.setToken(response.access_token)),
      switchMap(() =>
        this.fetchUserProfile().pipe(
          tap(user => console.log('Usuário logado:', user)),
          map(user => ({
            token: this.getToken() ?? '',
            user
          }))
        )
      )
    );
  }

  /** Registra novo usuário e retorna o perfil completo */
  register(fullname: string, username: string, email: string, password: string, cpf: string): Observable<User | null> {
    const data: RegisterData = {
      fullname,
      username,
      email,
      password,
      cpf,
      role: 'user'
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => this.setToken(response.access_token)),
      switchMap(() => this.fetchUserProfile())
    );
  }

  /** Armazena token no localStorage */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /** Obtém token do localStorage */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Remove token e limpa usuário atual */
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  /** Verifica se existe token válido */
  hasToken(): boolean {
    return !!this.getToken();
  }

  /** Carrega usuário ao iniciar o serviço, se token existir */
  loadUserFromToken(): void {
    if (!this.hasToken()) return;

    this.fetchUserProfile().subscribe({
      next: user => this.currentUserSubject.next(user),
      error: err => {
        console.error('Erro ao carregar usuário:', err);
        this.clearToken();
      }
    });
  }

  /** Busca perfil completo do usuário logado */
  private fetchUserProfile(): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/me`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(user => this.currentUserSubject.next(user)),
      catchError(error => {
        console.error('Erro ao buscar perfil do usuário:', error);
        this.clearToken();
        return of(null);
      })
    );
  }
}