import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  validateAge,
  validatePostalCode,
  validateTextInput,
  validateEmail,
} from '../../validators/validators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;

  // Output pour envoyer les informations au composant parent
  @Output() userRegistered = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, validateTextInput]],
      lastName: ['', [Validators.required, validateTextInput]],
      email: ['', [Validators.required, validateEmail]],
      birthDate: ['', [Validators.required, validateAge]],
      city: ['', [Validators.required, validateTextInput]],
      postalCode: ['', [Validators.required, validatePostalCode]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registrationForm.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Émettre l'utilisateur enregistré au composant parent
      this.userRegistered.emit(this.registrationForm.value);

      // Notification de succès via le toaster
      this.toastr.success('Enregistrement réussi', 'Succès');

      // Réinitialiser le formulaire
      this.registrationForm.reset();
    }
  }
}
