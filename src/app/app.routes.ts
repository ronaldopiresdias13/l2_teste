import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //   component: LoggedComponent,
  //   canActivate: [AuthGuard],
  //   children: []
  // },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
 },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent),
 },
];
