import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedProductService } from '../../services/shared-product.service';
import { Product } from '../../shared/interfaces';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, ProductCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  produtos: Product[] = [];
  produtosSalvos: Product[] = [];
  produtosFiltrados: Product[] = [];
  searchTerm: string = '';

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedProductService: SharedProductService
  ) { }

  ngOnInit(): void {
    console.log('CatalogoComponent ngOnInit executado.');
    this.carregarProdutos();
  }

  carregarProdutos() {
    // Carrega os produtos salvos do localStorage
    this.produtosSalvos = this.sharedProductService.savedProducts;
    console.log('Produtos salvos:', this.produtosSalvos);

    // Carrega os produtos do backend
    this.produtoService.listarProdutos().subscribe({
      next: (data: Product[]) => {
        console.log('Produtos carregados do backend:', data);

        // Combina os produtos do backend com os salvos, evitando duplicatas
        const produtosBackend = data.filter(produto =>
          !this.produtosSalvos.some(p => p.id === produto.id)
        );

        this.produtos = [...this.produtosSalvos, ...produtosBackend];
        this.produtosFiltrados = this.produtos;
        console.log('Lista final de produtos:', this.produtos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        // Em caso de erro, mostra pelo menos os produtos salvos
        this.produtos = this.produtosSalvos;
        this.produtosFiltrados = this.produtos;
      }
    });
  }

  filterProducts() {
    if (!this.searchTerm.trim()) {
      this.produtosFiltrados = this.produtos;
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.produtosFiltrados = this.produtos.filter(produto =>
        produto.name.toLowerCase().includes(term)
      );
    }
  }
}
