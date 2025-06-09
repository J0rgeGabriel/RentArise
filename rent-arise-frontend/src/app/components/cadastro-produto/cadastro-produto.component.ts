import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})
export class CadastroProdutoComponent {
  produto = {
    nome: '',
    descricao: '',
    dono: '',
    valorDia: 0,
    fotoPrincipal: '',
    fotosAdicionais: [] as string[]
  };

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Aqui será implementada a lógica de upload da foto principal
      console.log('Foto principal selecionada:', file.name);
    }
  }

  onMultipleFilesSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      // Aqui será implementada a lógica de upload das fotos adicionais
      console.log('Fotos adicionais selecionadas:', files.length);
    }
  }

  onSubmit() {
    console.log('Produto:', this.produto);
    // Aqui será implementada a lógica de envio para o backend
  }
}
