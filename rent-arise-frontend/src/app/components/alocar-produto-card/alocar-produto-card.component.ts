import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Contract, Produto, User } from '../../shared/interfaces';
import { ContractService } from '../../services/contract.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-alocar-produto-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alocar-produto-card.component.html',
  styleUrls: ['./alocar-produto-card.component.css']
})
export class AlocarProdutoCardComponent implements OnInit, OnDestroy {
  @Input() produtoId: string | null = null;

  produto: Produto | null = null;
  user: User | null = null;
  carregando = true;

  dataInicio: string = '';
  dataFim: string = '';
  dataMinima: string;
  valorTotal: number = 0;
  diasAluguel: number = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private contractService: ContractService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    const hoje = new Date();
    this.dataMinima = hoje.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    const userSub = this.authService.currentUser$.subscribe(authUser => {
      console.log('User: ', authUser)
      if (authUser) {
        const fetchSub = this.userService.findOne(authUser.userId).subscribe({
          next: user => {
            this.user = user;
            console.log('Usuário completo carregado:', user);
          },
          error: err => {
            console.error('Erro ao buscar usuário:', err);
          }
        });
        this.subscriptions.add(fetchSub);
      } else {
        console.warn('Usuário logado não possui userId válido.');
      }
    });

    this.subscriptions.add(userSub);

    if (this.produtoId) {
      this.carregarProduto();
    } else {
      console.warn('produtoId não definido');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private carregarProduto(): void {
    this.carregando = true;
    const produtoSub = this.produtoService.obterProduto(this.produtoId!).subscribe({
      next: (data) => {
        this.produto = data;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar produto:', err);
        this.carregando = false;
      }
    });

    this.subscriptions.add(produtoSub);
  }

  calcularValorTotal(): void {
    if (!this.dataInicio || !this.dataFim || !this.produto) {
      this.valorTotal = 0;
      this.diasAluguel = 0;
      return;
    }

    const inicio = new Date(this.dataInicio);
    const fim = new Date(this.dataFim);

    const diffTime = Math.abs(fim.getTime() - inicio.getTime());
    this.diasAluguel = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    this.valorTotal = this.diasAluguel * this.produto.pricePerDay;
  }

  confirmarAluguel(): void {
    if (!this.produto || !this.user || !this.dataInicio || !this.dataFim || this.valorTotal <= 0) {
      console.warn('Dados incompletos para confirmar aluguel');
      return;
    }

    const contrato: any = {
      description: `Aluguel do produto ${this.produto.name} disponível pelo locador ${this.produto.user.username} para as datas de ${this.dataInicio} a ${this.dataFim}`,
      status: 'active',
      productId: this.produto.id,
      startDate: new Date(this.dataInicio).toISOString(),
      endDate: new Date(this.dataFim).toISOString()
    };

    this.contractService.create(contrato).subscribe({
      next: () => {
        console.log('Contrato criado com sucesso');
        this.voltarParaLista();
      },
      error: (err) => {
        console.error('Erro ao criar contrato:', err);
      }
    });
  }

  voltarParaLista(): void {
    this.router.navigate(['/produtos']);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Sem+Imagem';
  }
}