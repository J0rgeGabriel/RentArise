import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  searchTerm: string = '';

  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (data: Produto[]) => {
        this.produtos = data;
        this.produtosFiltrados = data;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.produtos = [];
        this.produtosFiltrados = [];
      }
    });
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.produtosFiltrados = term
      ? this.produtos.filter(produto =>
          produto.name.toLowerCase().includes(term) ||
          produto.description.toLowerCase().includes(term) ||
          (produto.user && produto.user.username.toLowerCase().includes(term))
        )
      : this.produtos;
  }

  navigateToAllocateProduct(productId: string): void {
    if (productId) {
      this.router.navigate(['/alocar-produto', productId]);
    } else {
      console.warn('ID do produto não disponível para navegação.');
    }
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://placehold.co/270x180?text=Sem+Imagem';
  }
}
