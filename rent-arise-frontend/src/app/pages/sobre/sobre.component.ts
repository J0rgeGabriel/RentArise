import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { QuemSomosComponent } from '../../components/quem-somos/quem-somos.component';

@Component({
  selector: 'app-sobre',
  imports: [HeaderComponent, FooterComponent, QuemSomosComponent],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {

}
