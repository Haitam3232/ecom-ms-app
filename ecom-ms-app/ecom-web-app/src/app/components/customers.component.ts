import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Customer } from '../models/models';

@Component({
  selector: 'app-customers',
  standalone: true,
  template: `
    <h3>Customers</h3>
    @if (errorMessage) {
      <div class="alert alert-danger">{{ errorMessage }}</div>
    }
    <table class="table table-striped table-bordered bg-white">
      <thead class="table-dark">
        <tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr>
      </thead>
      <tbody>
        @for (c of customers; track c.id) {
          <tr>
            <td>{{ c.id }}</td>
            <td>{{ c.name }}</td>
            <td>{{ c.email }}</td>
            <td>
              <button class="btn btn-primary btn-sm" (click)="getBills(c)">Factures</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getCustomers().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => (this.errorMessage = 'Impossible de charger les clients : ' + err.message)
    });
  }

  getBills(c: Customer): void {
    this.router.navigateByUrl('/bills/' + c.id);
  }
}
