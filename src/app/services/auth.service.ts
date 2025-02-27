import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../shared/environment';
import {jwtDecode} from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = environment.apiUrl;
    private isAdminSubject = new BehaviorSubject<boolean>(this.getStoredRole() === 'admin');
    isAdmin$ = this.isAdminSubject.asObservable(); // Observable pour suivre en temps réel

    private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
    constructor(private http: HttpClient) {}

      private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');
        return new HttpHeaders({
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        });
      }
  
    register(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/public/register`, userData);
    }

    login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
        tap((response: any) => {
          console.log("Token login: ", response.token);
          if (response.token) {
            localStorage.setItem('authToken', response.token);

            const decodedToken: any = jwtDecode(response.token)
            localStorage.setItem('userRole', decodedToken.role);

            this.isAdminSubject.next(decodedToken.role === 'admin');
            this.isLoggedInSubject.next(true); // Met à jour en temps réel
          }
        })
      );
    }

    logout(): void {
      localStorage.removeItem('authToken');
      this.isAdminSubject.next(false); // Met à jour en temps réel après déconnexion
      this.isLoggedInSubject.next(false); 
    }

    create(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/users/create`, userData, { headers: this.getAuthHeaders() });
    }

    private getStoredRole(): string {
      return localStorage.getItem('userRole') || '';
    }

    private hasToken(): boolean {
      return !!localStorage.getItem('authToken'); // Vérifie si un token est stocké
    }
  }
