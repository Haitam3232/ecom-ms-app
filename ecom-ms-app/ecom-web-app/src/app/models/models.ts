export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface Bill {
  id: number;
  billingDate: string;
  customerId: number;
}

export interface ProductItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product: Product;
}

export interface BillDetails {
  id: number;
  billingDate: string;
  customerId: number;
  customer: Customer;
  productItems: ProductItem[];
}
