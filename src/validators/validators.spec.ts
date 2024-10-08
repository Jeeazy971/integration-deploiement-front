import {
  validateAge,
  validatePostalCode,
  validateTextInput,
  validateEmail,
} from './validators';
import { FormControl } from '@angular/forms';

describe('Custom Validators', () => {
  it('should validate age greater than 18', () => {
    const control = new FormControl('2000-01-01');
    expect(validateAge(control)).toBeNull();
  });

  it('should invalidate age less than 18', () => {
    const control = new FormControl('2020-01-01');
    expect(validateAge(control)).toEqual({ ageInvalid: true });
  });

  it('should validate a French postal code', () => {
    const control = new FormControl('75001');
    expect(validatePostalCode(control)).toBeNull();
  });

  it('should invalidate a non-French postal code', () => {
    const control = new FormControl('123');
    expect(validatePostalCode(control)).toEqual({ postalCodeInvalid: true });
  });

  it('should validate text inputs for firstName, lastName, and city', () => {
    const control = new FormControl('Jean-Pierre');
    expect(validateTextInput(control)).toBeNull();
  });

  it('should invalidate text inputs with numbers or special characters', () => {
    const control = new FormControl('Jean123');
    expect(validateTextInput(control)).toEqual({ textInvalid: true });
  });

  it('should validate an email address', () => {
    const control = new FormControl('test@example.com');
    expect(validateEmail(control)).toBeNull();
  });

  it('should invalidate an incorrect email address', () => {
    const control = new FormControl('test@com');
    expect(validateEmail(control)).toEqual({ emailInvalid: true });
  });
});
