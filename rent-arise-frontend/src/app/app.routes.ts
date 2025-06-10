import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TelaCadastroProdutoComponent } from './pages/cadastro-produto/tela-cadastro-produto.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
// Removendo a importação de LoginCadastroComponent, pois não será usado nas rotas principais
// import { LoginCadastroComponent } from './components/login-cadastro/login-cadastro.component';
// Assumindo que existe um componente de Perfil, importe-o aqui, senão precisará ser criado.
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-produto', component: TelaCadastroProdutoComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'produtos', component: CatalogoComponent },
  // Removendo rotas para login e cadastro
  // { path: 'login', component: LoginCadastroComponent, data: { isRegister: false } },
  // { path: 'cadastro', component: LoginCadastroComponent, data: { isRegister: true } },
  // Rota para o perfil (assumindo que LoginCadastroComponent redireciona para cá após cadastro)
  { path: 'perfil', component: ProfileComponent },
  // Rota curinga para redirecionar para home se a URL não corresponder a nenhuma rota
  { path: '**', redirectTo: 'home' }
];
