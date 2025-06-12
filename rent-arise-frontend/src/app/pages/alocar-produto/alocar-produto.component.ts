import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AlocarProdutoCardComponent } from '../../components/alocar-produto-card/alocar-produto-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alocar-produto',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    AlocarProdutoCardComponent
  ],
  templateUrl: './alocar-produto.component.html',
  styleUrls: ['./alocar-produto.component.css']
})
export class AlocarProdutoComponent {
  produtoId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.produtoId = this.route.snapshot.paramMap.get('id');
  }
}
