import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule, HttpClientModule, HeaderComponent],
})
export class AppComponent {
  users: any[] = [];

  // Cette méthode reçoit les données du formulaire et ajoute un utilisateur à la liste
  onUserRegistered(user: any) {
    this.users.push(user);
  }
}
