import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CadastroProdutoComponent } from "../../components/cadastro-produto/cadastro-produto.component";

@Component({
  selector: 'app-tela-cadastro-produto',
  templateUrl: './tela-cadastro-produto.component.html',
  styleUrls: ['./tela-cadastro-produto.component.css'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CadastroProdutoComponent]
})
export class TelaCadastroProdutoComponent {
  
}
