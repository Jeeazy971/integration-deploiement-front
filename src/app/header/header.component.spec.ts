/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { of } from 'rxjs';

class MockAuthService {
  isAdmin$ = of(false);
  isLoggedIn$ = of(false);
  logout = jasmine.createSpy('logout');
}

class MockStorageService {
  getItem(key: string) {
    return null;
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: StorageService, useClass: MockStorageService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('devrait créer le composant Header', () => {
    expect(component).toBeTruthy();
  });

  it('devrait appeler logout et naviguer vers "/login" lors de la déconnexion', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    const router = TestBed.inject(Router);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
