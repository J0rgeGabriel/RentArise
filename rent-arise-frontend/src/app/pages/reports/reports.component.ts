import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RelatorioComponent } from '../../components/relatorio/relatorio.component';

@Component({
  selector: 'app-reports',
  imports: [HeaderComponent, FooterComponent, RelatorioComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}
