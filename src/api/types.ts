export interface Pet {
  id: string;
  name: string;
  img: string;
  breed: string;
  gender: string;
  age: string;
  size: string;
  about: string;
  pet: "dog" | "cat";
}

export interface Food {
  id: string;
  name: string;
  img: string;
  shortDescription?: string;
  description: string;
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  category: "dog" | "cat";
  foodType: "dry" | "wet" | "treats" | "raw";
  source: "organic" | "non-organic";
}

export interface BasketItem {
  id: string;
  name: string;
  img: string;
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  quantity: number;
}

export interface PetBasketItem {
  id: string;
  name: string;
  img: string;
  breed: string;
  age: string;
}

export interface BasketItem {
  productId: string;
  quantity: number;
}

export interface ShoppingBasket {
  id: string;
  userId: string;
  items: BasketItem[];
  createdAt: string;
  updatedAt: string;
}

export interface BasketData {
  baskets: ShoppingBasket[];
}
