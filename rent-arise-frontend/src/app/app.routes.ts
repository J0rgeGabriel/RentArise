import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
    },
    {
      path: 'sobre',
      component: SobreComponent
    },
    {
      path: 'perfil',
      component: ProfileComponent
    }
];
