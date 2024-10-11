import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj('ToastrService', ['success']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should display success toaster and reset form on valid submit', () => {
    component.registrationForm.setValue({
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      birthDate: '1990-01-01',
      city: 'Paris',
      postalCode: '75001',
    });
    fixture.detectChanges();

    component.onSubmit();

    expect(toastrService.success).toHaveBeenCalledWith(
      'Enregistrement réussi',
      'Succès'
    );
    expect(component.registrationForm.value).toEqual({
      firstName: null,
      lastName: null,
      email: null,
      birthDate: null,
      city: null,
      postalCode: null,
    });
  });
});
