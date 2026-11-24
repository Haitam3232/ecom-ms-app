import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <h3>Products</h3>
    @if (errorMessage) {
      <div class="alert alert-danger">{{ errorMessage }}</div>
    }
    <table class="table table-striped table-bordered bg-white">
      <thead class="table-dark">
        <tr><th>ID</th><th>Name</th><th>Price</th><th>Quantity</th></tr>
      </thead>
      <tbody>
        @for (p of products; track p.id) {
          <tr>
            <td>{{ p.id }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.price | number: '1.2-2' }}</td>
            <td>{{ p.quantity }}</td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => (this.errorMessage = 'Impossible de charger les produits : ' + err.message)
    });
  }
}
