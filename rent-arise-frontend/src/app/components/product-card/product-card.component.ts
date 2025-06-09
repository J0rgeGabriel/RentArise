import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/interfaces';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() produto!: Product;

  onClickCard() {
    console.log('Card de produto clicado:', this.produto);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://placehold.co/270x180?text=Sem+Imagem';
  }
}
