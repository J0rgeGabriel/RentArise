import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { FullStatistics, ProfileIcon, User } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { StatisticsService } from '../../services/statistics.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  fullStatistics: FullStatistics | null = null;
  userName: string = '';
  selectedIcon: ProfileIcon | null = null;
  editingIcon: ProfileIcon | null = null;
  isEditing: boolean = false;

  editedEmail: string = '';
  editedFullname: string = '';
  editedUsername: string = '';

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

  subscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly statisticsService: StatisticsService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(authUser => {
      if (authUser) {
        this.userName = authUser.username;

        this.statisticsService.getFullStatistics().subscribe({
          next: (stats: FullStatistics) => {
            this.fullStatistics = stats;

            this.selectedIcon = this.availableIcons.find(icon => icon.url === stats.profile.profileIconUrl) ?? this.availableIcons[0];

            this.editedEmail = stats.profile.email || '';
            this.editedFullname = stats.profile.fullname || '';
            this.editedUsername = stats.profile.username || '';
          },
          error: err => {
            console.error('Erro ao buscar estatísticas completas:', err);
            this.fullStatistics = null;
          }
        });
      } else {
        this.userName = '';
        this.fullStatistics = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  startEditing(): void {
    this.isEditing = true;
    this.editingIcon = this.selectedIcon;

    if (this.fullStatistics) {
      this.editedEmail = this.fullStatistics.profile.email || '';
      this.editedFullname = this.fullStatistics.profile.fullname || '';
      this.editedUsername = this.fullStatistics.profile.username || '';
    }
  }

  selectEditingIcon(icon: ProfileIcon): void {
    this.editingIcon = icon;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.editingIcon = null;

    if (this.fullStatistics) {
      this.editedEmail = this.fullStatistics.profile.email || '';
      this.editedFullname = this.fullStatistics.profile.fullname || '';
      this.editedUsername = this.fullStatistics.profile.username || '';
    }
  }

  saveIcon(): void {
    if (this.fullStatistics && this.editingIcon) {
      this.selectedIcon = this.editingIcon;

      const updateData = {
        fullname: this.editedFullname,
        username: this.editedUsername,
        email: this.editedEmail,
        profileIconUrl: this.selectedIcon.url
      };

      const userId = this.fullStatistics.profile.id;

      this.userService.update(userId, updateData).subscribe({
        next: (updatedProfile) => {
          this.fullStatistics!.profile = {
            id: updatedProfile.userId,
            username: updatedProfile.username,
            fullname: updatedProfile.fullname,
            email: updatedProfile.email,
            createdAt: updatedProfile.createdAt,
            role: updatedProfile.role,
            profileIconUrl: updatedProfile.profileIconUrl
          };

          this.isEditing = false;
          this.editingIcon = null;
        },
        error: (err) => {
          console.error('Erro ao atualizar o perfil:', err);
        }
      });
    }
  }
}