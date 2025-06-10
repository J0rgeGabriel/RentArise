import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../shared/interfaces';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  searchTerm: string = '';

  constructor(private produtoService: ProdutoService) {}

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
          produto.name.toLowerCase().includes(term)
        )
      : this.produtos;
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://placehold.co/270x180?text=Sem+Imagem';
  }
}
