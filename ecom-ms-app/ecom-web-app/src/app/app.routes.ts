import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products.component';
import { CustomersComponent } from './components/customers.component';
import { BillsComponent } from './components/bills.component';
import { BillDetailsComponent } from './components/bill-details.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'bills/:customerId', component: BillsComponent },
  { path: 'bill-details/:billId', component: BillDetailsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
