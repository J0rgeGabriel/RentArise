import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileIcon } from '../../shared/interfaces';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit, OnDestroy {
  userName: string = '';
  selectedIcon: ProfileIcon | null = null;
  editingIcon: ProfileIcon | null = null;
  isEditing: boolean = false;

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

  private subscription?: Subscription;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userName = user.username;
      } else {
        this.userName = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  startEditing(): void {
    this.isEditing = true;
    this.editingIcon = this.selectedIcon;
  }

  selectEditingIcon(icon: ProfileIcon): void {
    this.editingIcon = icon;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.editingIcon = null;
  }

  saveIcon(): void {
    if (this.editingIcon) {
      this.selectedIcon = this.editingIcon;
      console.log('Ícone salvo:', this.selectedIcon);

      // TODO: Atualizar no backend, por exemplo:
      // this.userService.updateProfileIcon(this.authService.currentUser?.id, this.selectedIcon.url)
      //   .subscribe(
      //     () => console.log('Ícone atualizado com sucesso'),
      //     err => console.error('Erro ao atualizar ícone', err)
      //   );
    } else {
      console.log('Nenhum ícone selecionado para salvar.');
    }

    this.isEditing = false;
    this.editingIcon = null;
  }
}