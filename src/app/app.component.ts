import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: any[] = [];

  // Cette méthode reçoit les données du formulaire et ajoute un utilisateur à la liste
  onUserRegistered(user: any) {
    this.users.push(user);
  }
}
