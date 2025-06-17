import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TelaCadastroProdutoComponent } from './pages/cadastro-produto/tela-cadastro-produto.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-produto', component: TelaCadastroProdutoComponent, canActivate: [AuthGuard] },
  { path: 'sobre', component: SobreComponent, canActivate: [AuthGuard] },
  { path: 'produtos', component: CatalogoComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'relatorio', component: ReportsComponent, canActivate: [AuthGuard] },
  {
    path: 'alocar-produto/:id',
    loadComponent: () => import('./pages/alocar-produto/alocar-produto.component').then(m => m.AlocarProdutoComponent), 
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' }
];
