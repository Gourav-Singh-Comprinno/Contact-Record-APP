import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg px-4 shadow"
         style="background: linear-gradient(90deg,#0d6efd,#6610f2)">
      <a class="navbar-brand text-white fw-bold">
        Contact Record App
      </a>

      <div class="ms-auto d-flex gap-2">
        <button
          type="button"
          class="btn btn-outline-light"
          routerLink="/login">
          Login
        </button>

        <button
          type="button"
          class="btn btn-warning text-dark"
          routerLink="/register">
          Register
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar { min-height: 60px; }
    button { border-radius: 20px; padding: 6px 18px; }
  `]
})
export class NavbarComponent {}
