import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
      <a class="navbar-brand" routerLink="/products">Ecom App</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" routerLink="/products" routerLinkActive="active">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/customers" routerLinkActive="active">Customers</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/bills" routerLinkActive="active">Bills</a>
        </li>
      </ul>
    </nav>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
