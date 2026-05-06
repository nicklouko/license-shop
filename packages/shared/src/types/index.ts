export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface License {
  id: string;
  key: string;
  productName: string;
  price: number;
  expiresAt: Date | null;
  userId: string;
}

export interface Order {
  id: string;
  userId: string;
  licenseId: string;
  total: number;
  status: 'pending' | 'completed' | 'refunded';
  createdAt: Date;
}
