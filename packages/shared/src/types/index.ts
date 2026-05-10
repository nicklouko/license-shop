export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}
export interface License {
  id: string;
  key: string;
  productId: string;
  orderId: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  total: number;
  status: string;
  createdAt: Date;
  product?: Product;
  license?: License;
}
