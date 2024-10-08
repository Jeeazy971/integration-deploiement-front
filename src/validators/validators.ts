import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateAge(control: AbstractControl): ValidationErrors | null {
  const birthDate = new Date(control.value);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  return age >= 18 ? null : { ageInvalid: true };
}

export function validatePostalCode(
  control: AbstractControl
): ValidationErrors | null {
  const postalCodePattern = /^[0-9]{5}$/;
  return postalCodePattern.test(control.value)
    ? null
    : { postalCodeInvalid: true };
}

export function validateTextInput(
  control: AbstractControl
): ValidationErrors | null {
  const textPattern = /^[a-zA-ZÀ-ÿ-'\s]+$/;
  return textPattern.test(control.value) ? null : { textInvalid: true };
}

export function validateEmail(
  control: AbstractControl
): ValidationErrors | null {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailPattern.test(control.value) ? null : { emailInvalid: true };
}
