import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
      { path: '', component: RegistrationFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'users', component: UsersListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
