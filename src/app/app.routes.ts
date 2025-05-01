import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/guards/auth.guard';
import { AccueilComponent } from './features/pages/accueil/accueil.component';
import { AboutComponent } from './features/pages/about/about.component';
import { ServicesComponent } from './features/pages/services/services.component';
import { ContactComponent } from './features/pages/contact/contact.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: AccueilComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'students',
        children: [
          { path: '', loadComponent: () => import('./features/students/components/student-list/student-list.component').then(m => m.StudentListComponent) },
          { path: 'new', loadComponent: () => import('./features/students/components/student-form/student-form.component').then(m => m.StudentFormComponent) },
          { path: ':id/edit', loadComponent: () => import('./features/students/components/student-form/student-form.component').then(m => m.StudentFormComponent) }
        ]
      },
      {
        path: 'parents',
        children: [
          { path: '', loadComponent: () => import('./features/parents/components/parent-list/parent-list.component').then(m => m.ParentListComponent) },
          { path: 'new', loadComponent: () => import('./features/parents/components/parent-form/parent-form.component').then(m => m.ParentFormComponent) },
          { path: ':id/edit', loadComponent: () => import('./features/parents/components/parent-form/parent-form.component').then(m => m.ParentFormComponent) }
        ]
      }
    ]
  },
  
  /*{ path: '', redirectTo: '/login', pathMatch: 'full' },*/
  /*{ path: '**', redirectTo: '/login' }*/
];
