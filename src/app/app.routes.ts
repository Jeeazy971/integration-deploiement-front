import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

export const routes: Routes = [
    { path: '', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UsersListComponent }
];