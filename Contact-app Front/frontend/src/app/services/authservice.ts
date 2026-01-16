import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/auth/register`,
      data
    );
  }


  login(data: {
    email: string;
    password: string;
  }): Observable<string> {
    return this.http.post(
      `${this.BASE_URL}/auth/login`,
      data,
      { responseType: 'text' }  
    );
  }

  saveAuth(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }


  logout(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/logout`, {});
  }


  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

 
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  updateProfile(data: {
    name: string;
    email: string;
    password?: string;
  }): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/auth/profile`,
      data
    );
  }
}
