import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import {
  validateAge,
  validatePostalCode,
  validateTextInput,
  validateEmail,
} from '../../validators/validators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  imports: [ReactiveFormsModule, ToastrModule, ]
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  isAdmin: boolean = false;
  userExists: boolean = false;

  // Output pour envoyer les informations au composant parent
  @Output() userRegistered = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService, private storageService: StorageService, private userService: UserService) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, validateTextInput]],
      lastName: ['', [Validators.required, validateTextInput]],
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthDate: ['', [Validators.required, validateAge]],
      city: ['', [Validators.required, validateTextInput]],
      postalCode: ['', [Validators.required, validatePostalCode]],
      role: ['user', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registrationForm.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  checkUserExists() {
    const email = this.registrationForm.get('email')?.value;
    if (email) {
      this.userService.getUsersForAdmin().subscribe(users => {
        this.userExists = users.some((user: any) => user.email === email);
      });
    }
  }

  onSubmitPublic() {
    if (this.registrationForm.valid && !this.userExists) {
      this.authService.register(this.registrationForm.value).subscribe(
        (response) => {
          // Émettre l'utilisateur enregistré au composant parent
          this.userRegistered.emit(this.registrationForm.value);

          // Notification de succès via le toaster
          this.toastr.success('Enregistrement réussi', 'Succès');

          // Réinitialiser le formulaire
          this.registrationForm.reset();
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'inscription', 'Erreur');
        }
      );
    }
  }

  onSubmitAdmin() {
    if (this.registrationForm.valid && !this.userExists) {
      this.authService.create(this.registrationForm.value).subscribe(
        (response) => {
          // Émettre l'utilisateur enregistré au composant parent
          this.userRegistered.emit(this.registrationForm.value);

          // Notification de succès via le toaster
          this.toastr.success('Enregistrement réussi', 'Succès');

          // Réinitialiser le formulaire
          this.registrationForm.reset();
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'inscription', 'Erreur');
        }
      );
    }
  }
}
