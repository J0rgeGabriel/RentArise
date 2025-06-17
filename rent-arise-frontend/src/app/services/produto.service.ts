import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Produto } from '../shared/interfaces';

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

  criarProduto(produto: any): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto, {
      headers: this.getHeaders()
    });
  }

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/available`, {
      headers: this.getHeaders()
    });
  }

  listarMeusProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/my`, {
      headers: this.getHeaders()
    });
  }

  obterProduto(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  atualizarProduto(id: string, produto: any): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto, {
      headers: this.getHeaders()
    });
  }

  excluirProduto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}