import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService, ToastrModule  } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  validateEmail,
} from '../../validators/validators';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  imports: [ReactiveFormsModule, ToastrModule, CommonModule ]
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('authToken', response.token);
          this.toastr.success('Connexion réussie', 'Succès');
          this.router.navigate(['/users']);
        },
        error => {
          this.toastr.error('Erreur de connexion', 'Erreur');
        }
      );
    }
  }
}

