import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TelaCadastroProdutoComponent } from './pages/cadastro-produto/tela-cadastro-produto.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-produto', component: TelaCadastroProdutoComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'produtos', component: CatalogoComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'relatorio', component: ReportsComponent },
  {
    path: 'alocar-produto/:id',
    loadComponent: () => import('./pages/alocar-produto/alocar-produto.component').then(m => m.AlocarProdutoComponent)
  },
  { path: '**', redirectTo: 'home' }
];
