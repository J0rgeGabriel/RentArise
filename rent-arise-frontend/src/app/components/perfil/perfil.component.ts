import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
user = {
    nome: '',
    cpf: '',
    email: '',
    idade: 18
  };

  blockLetters(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onSave() {
    if (this.validateCpf(this.user.cpf)) {
      // lógica para salvar os dados do usuário
      alert('Perfil salvo com sucesso!');
    } else {
      alert('CPF inválido. Por favor, verifique e tente novamente.');
    }
  }

  validateCpf(cpf: string): boolean {
    // Insira aqui a função de validação de CPF aprimorada que você deseja
    return true; // para simplificar, deve ser substituída pela validação real
  }
}
