import { Routes } from '@angular/router';
import { AuthGuard } from './guard/authguard';

import { HomeComponent } from './components/home';
import { LoginComponent } from './pages/Login';
import { RegisterComponent } from './pages/Register';
import { DashboardComponent } from './pages/dashboard';
import { AddContactComponent } from './pages/addcontact';
import { UpdateProfileComponent } from './pages/updateprofile';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]   
  },
  {
    path: 'add-contact',
    component: AddContactComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
    canActivate: [AuthGuard]  
  },

  { path: '**', redirectTo: 'login' }
];
