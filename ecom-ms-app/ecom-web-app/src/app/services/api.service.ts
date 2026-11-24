import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Bill, BillDetails, Customer, Product } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly gateway = 'http://localhost:8888';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<any>(`${this.gateway}/INVENTORY-SERVICE/products`)
      .pipe(map((res) => res._embedded.products as Product[]));
  }

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<any>(`${this.gateway}/CUSTOMER-SERVICE/customers`)
      .pipe(map((res) => res._embedded.customers as Customer[]));
  }

  getAllBills(): Observable<Bill[]> {
    return this.http
      .get<any>(`${this.gateway}/BILLING-SERVICE/bills`)
      .pipe(map((res) => (res._embedded?.bills ?? []) as Bill[]));
  }

  getBillsByCustomer(customerId: number): Observable<Bill[]> {
    return this.http
      .get<any>(`${this.gateway}/BILLING-SERVICE/bills/search/findByCustomerId?customerId=${customerId}`)
      .pipe(map((res) => (res._embedded?.bills ?? []) as Bill[]));
  }

  getBillDetails(billId: number): Observable<BillDetails> {
    return this.http.get<BillDetails>(`${this.gateway}/BILLING-SERVICE/bills/${billId}`);
  }
}
