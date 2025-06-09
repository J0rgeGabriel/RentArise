import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';

interface ProfileIcon {
  id: number;
  url: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userName: string = ''; // Inicializa como string vazia
  selectedIcon: ProfileIcon | null = null; // Ícone atualmente selecionado (visualização)
  editingIcon: ProfileIcon | null = null; // Ícone selecionado durante a edição
  isEditing: boolean = false; // Controla se a seção de edição está visível

  // Lista de ícones disponíveis (URLs dos novos assets na pasta public)
  availableIcons: ProfileIcon[] = [
    { id: 0, url: '/assets/icone-00.png' },
    { id: 1, url: '/assets/icone-01.png' },
    { id: 2, url: '/assets/icone-02.png' },
    { id: 3, url: '/assets/icone-03.png' },
    { id: 4, url: '/assets/icone-04.png' },
    { id: 5, url: '/assets/icone-05.png' },
    { id: 6, url: '/assets/icone-06.png' },
    { id: 7, url: '/assets/icone-07.png' },
    { id: 8, url: '/assets/icone-08.png' },
    { id: 9, url: '/assets/icone-09.png' },
    { id: 10, url: '/assets/icone-10.png' },
    { id: 11, url: '/assets/icone-11.png' },
  ];

  constructor(public authService: AuthService) {
    // Carregar o nome de usuário do serviço de autenticação
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      // Decide qual nome usar: email ou username. Usando email se disponível, senão username.
      this.userName = currentUser.email || currentUser.username;

      // TODO: Carregar o ícone de perfil salvo para este usuário a partir do backend
      // Se não houver ícone salvo, seleciona o primeiro ícone disponível como padrão inicial.
      if (!this.selectedIcon && this.availableIcons.length > 0) {
        this.selectedIcon = this.availableIcons[0];
      }

    } else {
        // TODO: Redirecionar para a página de login se não houver usuário logado
        console.warn('Nenhum usuário logado.');
    }
  }

  startEditing(): void {
    this.isEditing = true;
    // Copia o ícone atual para edição. Se selectedIcon for null, editingIcon também será.
    this.editingIcon = this.selectedIcon;
  }

  selectEditingIcon(icon: ProfileIcon): void {
    this.editingIcon = icon; // Seleciona o ícone na tela de edição
  }

  cancelEditing(): void {
    this.isEditing = false;
    // Ao cancelar, o editingIcon não é copiado de volta para selectedIcon.
    this.editingIcon = null; // Limpa o ícone de edição.
  }

  saveIcon(): void {
    if (this.editingIcon) {
      this.selectedIcon = this.editingIcon; // Atualiza o ícone da visualização com o ícone editado
      console.log('Ícone salvo:', this.selectedIcon);
      // TODO: Implementar chamada ao serviço de usuário/API para salvar o this.selectedIcon no backend
      // Exemplo (requer que seu AuthService tenha um método para atualizar o perfil):
      // this.authService.updateUserProfile({ profileIconUrl: this.selectedIcon.url }).subscribe(
      //   response => console.log('Ícone de perfil atualizado com sucesso', response),
      //   error => console.error('Erro ao atualizar ícone de perfil', error)
      // );
    } else {
        // Caso o usuário salve sem selecionar um ícone na edição (talvez queira remover?)
        // Você pode decidir o comportamento aqui. Por enquanto, apenas loga.
        console.log('Nenhum ícone selecionado para salvar.');
    }
    this.isEditing = false;
    this.editingIcon = null; // Limpa o ícone de edição após salvar
  }
}
