import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Bill } from '../models/models';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [DatePipe],
  template: `
    <h3>
      @if (customerId) { Bills of customer {{ customerId }} } @else { All bills }
    </h3>
    @if (errorMessage) {
      <div class="alert alert-danger">{{ errorMessage }}</div>
    }
    <table class="table table-striped table-bordered bg-white">
      <thead class="table-dark">
        <tr><th>Bill ID</th><th>Date</th><th>Customer ID</th><th>Actions</th></tr>
      </thead>
      <tbody>
        @for (b of bills; track b.id) {
          <tr>
            <td>{{ b.id }}</td>
            <td>{{ b.billingDate | date: 'dd/MM/yyyy HH:mm' }}</td>
            <td>{{ b.customerId }}</td>
            <td>
              <button class="btn btn-success btn-sm" (click)="getDetails(b)">Détails</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  customerId: number | null = null;
  errorMessage = '';

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('customerId');
      this.customerId = id ? Number(id) : null;
      const request = this.customerId !== null
        ? this.api.getBillsByCustomer(this.customerId)
        : this.api.getAllBills();
      request.subscribe({
        next: (data) => {
          this.bills = data;
          this.errorMessage = '';
        },
        error: (err) => (this.errorMessage = 'Impossible de charger les factures : ' + err.message)
      });
    });
  }

  getDetails(b: Bill): void {
    this.router.navigateByUrl('/bill-details/' + b.id);
  }
}
