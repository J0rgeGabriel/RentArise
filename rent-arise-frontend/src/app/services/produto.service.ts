import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      localStorage.removeItem('accessToken');
    }
    return throwError(() => error);
  }

  criarProduto(produto: any): Observable<any> {
    return this.http.post(this.apiUrl, produto, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  listarProdutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/available`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  listarMeusProdutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  obterProduto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  atualizarProduto(id: number, produto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, produto, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  excluirProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }
}
