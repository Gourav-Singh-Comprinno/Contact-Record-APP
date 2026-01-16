import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card">

        <h3 class="text-center mb-3">Login</h3>

        <!-- ERROR MESSAGE -->
        <div *ngIf="errorMessage"
             class="alert alert-danger py-2">
          {{ errorMessage }}
        </div>

        <!-- EMAIL -->
        <input
          type="email"
          class="form-control mb-2"
          placeholder="Email"
          [(ngModel)]="loginData.email">

        <small class="text-danger"
               *ngIf="submitted && !loginData.email">
          Email is required
        </small>

        <!-- PASSWORD -->
        <input
          type="password"
          class="form-control mt-3 mb-2"
          placeholder="Password"
          [(ngModel)]="loginData.password">

        <small class="text-danger"
               *ngIf="submitted && !loginData.password">
          Password is required
        </small>

        <!-- LOGIN BUTTON -->
        <button
          type="button"
          class="btn btn-primary w-100 mt-3"
          [disabled]="loading"
          (click)="login()">

          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <p class="text-center text-muted small mt-3">
          New user?
          <a routerLink="/register">Create account</a>
        </p>

      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: calc(100vh - 140px);
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f8f9fa;
    }

    .auth-card {
      width: 100%;
      max-width: 380px;
      padding: 30px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
  `]
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  };

  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.submitted = true;
    this.errorMessage = '';

   
    if (!this.loginData.email || !this.loginData.password) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginData)
      .subscribe({
        
        next: (token: string) => {
          console.log('Login response:', token);


          if (!token || token.trim() === '' || token.includes('Exception') || token.includes('Error')) {
            this.loading = false;
            this.errorMessage = 'Invalid credentials or server error';
            return;
          }

       
          this.authService.saveAuth(
            token,
            { 
              email: this.loginData.email,
              name: this.loginData.email.split('@')[0]
            }
          );

          this.loading = false;

          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          this.loading = false;
          console.error('Login error:', err);

       
          if (err.error && typeof err.error === 'string' && err.error.trim() !== '') {
          
            const errorText = err.error;
         
            if (errorText.includes('RuntimeException:')) {
              const match = errorText.match(/RuntimeException:\s*(.+?)\s*at/);
              this.errorMessage = match ? match[1] : 'Invalid credentials';
            } else {
              this.errorMessage = errorText;
            }
          } else if (err.error?.message) {
            
            this.errorMessage = err.error.message;
          } else if (err.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else if (err.status === 400) {
            this.errorMessage = 'Bad request. Please check your input.';
          } else if (err.status === 500) {
            this.errorMessage = 'Server error: Invalid credentials';
          } else if (err.status === 0) {
            this.errorMessage = 'Cannot connect to server. Please check if server is running.';
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      });
  }
}
