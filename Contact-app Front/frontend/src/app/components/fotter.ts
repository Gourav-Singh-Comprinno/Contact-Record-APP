import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container py-4">
        <div class="row align-items-center">

        
          <div class="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <span class="brand">Contact App</span>
            <span class="text-muted ms-2">
              © 2026
            </span>
          </div>

         
          <div class="col-md-6 text-center text-md-end">
            <a routerLink="/login" class="footer-link">Login</a>
            <a routerLink="/register" class="footer-link">Register</a>
          </div>

        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #f5f6f8;
      border-top: 1px solid #e0e0e0;
    }

    .brand {
      font-weight: 600;
      color: #212529;
    }

    .footer-link {
      color: #6c757d;
      margin-left: 16px;
      text-decoration: none;
      font-size: 0.95rem;
    }

    .footer-link:hover {
      color: #212529;
      text-decoration: underline;
    }
  `]
})
export class FooterComponent {}
