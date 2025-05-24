import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginCadastroComponent } from '../../components/login-cadastro/login-cadastro.component';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, HeaderComponent, LoginCadastroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
