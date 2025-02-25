import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';

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
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.isAdmin = !!this.storageService.getItem('adminToken');
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
}
