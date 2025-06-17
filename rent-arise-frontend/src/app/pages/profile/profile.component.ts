import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PerfilComponent } from '../../components/perfil/perfil.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, PerfilComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
}
