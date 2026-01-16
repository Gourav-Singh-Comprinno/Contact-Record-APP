import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';   

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],  
  template: `
    <section class="hero d-flex align-items-center">
      <div class="container text-center">
        <h1 class="fw-bold mb-3">
          Save Your Contacts Securely
        </h1>

        <p class="lead text-muted mb-4">
          Manage all your personal and professional contacts
          in one place. Add, update, and delete contacts
          anytime with ease and security.
        </p>

        <div class="d-flex justify-content-center gap-3">
          <!-- Get Started → Register -->
          <a routerLink="/register"
             class="btn btn-primary btn-lg">
            Get Started
          </a>

          <!-- Login → Login page -->
          <a routerLink="/login"
             class="btn btn-outline-secondary btn-lg">
            Login
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: calc(100vh - 70px);
      background: linear-gradient(180deg, #f8f9fa, #ffffff);
    }

    h1 {
      font-size: 2.8rem;
    }

    p {
      max-width: 700px;
      margin: auto;
    }
  `]
})
export class HeroComponent {}
