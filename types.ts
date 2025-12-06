export enum Category {
  ELECTRONICS = 'Electronics',
  FASHION = 'Fashion',
  HOME = 'Home & Kitchen',
  BOOKS = 'Books',
  BEAUTY = 'Beauty'
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: Category;
  inStock: boolean;
  isPrime?: boolean;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export type SortOption = 'featured' | 'price-low-high' | 'price-high-low' | 'rating';

export type OrderStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: string;
  estimatedDelivery: string;
}