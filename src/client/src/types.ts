export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryIds: number[];
  image: string;
  isNewArrival?: boolean;
  discountPercentage?: number;
}

export interface Category {
  id: number;
  name: string;
  type: string;
}

export interface BasketItem {
  productId: number;
  quantity: number;
}

export interface Basket {
  id: string;
  userId: string | null;
  items: BasketItem[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
