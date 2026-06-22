import fs from "fs";
import path from "path";
import { ShoppingBasket } from "../types";

const BASKETS_FILE = path.join(__dirname, "..", "/baskets.json");

interface BasketData {
  baskets: ShoppingBasket[];
}

export const loadBaskets = (): BasketData => {
  try {
    const data = fs.readFileSync(BASKETS_FILE, "utf-8");
    return JSON.parse(data) as BasketData;
  } catch (error) {
    console.error("Failed to load baskets:", error);
    return { baskets: [] };
  }
};

export const saveBaskets = (basketData: BasketData): void => {
  try {
    fs.writeFileSync(BASKETS_FILE, JSON.stringify(basketData, null, 2));
  } catch (error) {
    console.error("Failed to save baskets:", error);
  }
};

export const getBasketByUserId = (
  userId: string
): ShoppingBasket | undefined => {
  const basketData = loadBaskets();
  return basketData.baskets.find((basket) => basket.userId === userId);
};

export const createNewBasket = (userId: string): ShoppingBasket => {
  const now = new Date().toISOString();
  return {
    id: `basket_${Date.now()}`,
    userId,
    items: [],
    createdAt: now,
    updatedAt: now,
  };
};

export const saveBasketForUser = (basket: ShoppingBasket): void => {
  const basketData = loadBaskets();
  const index = basketData.baskets.findIndex((b) => b.userId === basket.userId);

  basket.updatedAt = new Date().toISOString();

  if (index !== -1) {
    basketData.baskets[index] = basket;
  } else {
    basketData.baskets.push(basket);
  }

  saveBaskets(basketData);
};

export const deleteBasketForUser = (userId: string): void => {
  const basketData = loadBaskets();
  const newBaskets = basketData.baskets.filter((b) => b.userId !== userId);
  saveBaskets({ baskets: newBaskets });
};
