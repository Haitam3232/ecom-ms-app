import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BillDetails } from '../models/models';

@Component({
  selector: 'app-bill-details',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  template: `
    @if (errorMessage) {
      <div class="alert alert-danger">{{ errorMessage }}</div>
    }
    @if (bill) {
      <div class="card mb-4">
        <div class="card-header bg-dark text-white">
          <h4 class="mb-0">Facture n° {{ bill.id }}</h4>
        </div>
        <div class="card-body">
          <p><strong>Date :</strong> {{ bill.billingDate | date: 'dd/MM/yyyy HH:mm' }}</p>
          <p><strong>Client :</strong> {{ bill.customer.name }}</p>
          <p><strong>Email :</strong> {{ bill.customer.email }}</p>
        </div>
      </div>

      <table class="table table-striped table-bordered bg-white">
        <thead class="table-dark">
          <tr><th>Produit</th><th>Quantité</th><th>Prix unitaire</th><th>Sous-total</th></tr>
        </thead>
        <tbody>
          @for (item of bill.productItems; track item.id) {
            <tr>
              <td>{{ item.product.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.unitPrice | number: '1.2-2' }}</td>
              <td>{{ item.quantity * item.unitPrice | number: '1.2-2' }}</td>
            </tr>
          }
        </tbody>
        <tfoot>
          <tr class="fw-bold">
            <td colspan="3" class="text-end">Montant total</td>
            <td>{{ total | number: '1.2-2' }}</td>
          </tr>
        </tfoot>
      </table>
    }
  `
})
export class BillDetailsComponent implements OnInit {
  bill: BillDetails | null = null;
  errorMessage = '';

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const billId = Number(this.route.snapshot.paramMap.get('billId'));
    this.api.getBillDetails(billId).subscribe({
      next: (data) => (this.bill = data),
      error: (err) => (this.errorMessage = 'Impossible de charger la facture : ' + err.message)
    });
  }

  get total(): number {
    return this.bill
      ? this.bill.productItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
      : 0;
  }
}
