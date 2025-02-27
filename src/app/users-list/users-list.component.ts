import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  imports: [CommonModule]
})
export class UsersListComponent {
  users: any[] = [];
  isAdmin: boolean = false;
  admins: any[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    
    if(this.isAdmin) {
      this.userService.getUsersForAdmin().subscribe(response => {
        this.users = response;
      }, error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      });
      console.log("Utilisateur vu admin: ", this.users);

      this.userService.getAdmins().subscribe(response => {
        this.admins = response;
      }, error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      });
    } else {
      this.userService.getUsers().subscribe(response => {
        this.users = response;
      }, error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      });
    }

  }

  deleteUser(userId: string) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Ajoute un zéro devant si < 10
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
}
