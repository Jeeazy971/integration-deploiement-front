import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../shared/environment';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = environment.apiUrl;
  
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
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        })
      );
    }

    logout(): void {
      localStorage.removeItem('authToken');
    }

    create(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/users/create`, userData, { headers: this.getAuthHeaders() });
    }
  }
