import { Request, Response } from "express";
import {
  getBasketByUserId,
  createNewBasket,
  saveBasketForUser,
  deleteBasketForUser,
} from "../models/basketModel";
import { BasketItem, Food } from "../types";

import path from "path";
import fs from "fs";

const loadProducts = (): Food[] => {
  const dbPath = path.join(__dirname, "..", "petfood.json");
  try {
    const rawData = fs.readFileSync(dbPath, "utf-8");
    const json = JSON.parse(rawData);
    return json.petfood as Food[];
  } catch (error) {
    console.error("Error reading or parsing JSON:", error);
    return [];
  }
};

export const getBasket = (req: Request, res: Response): void => {
  try {
    const userId = req.params.userId;
    const basket = getBasketByUserId(userId);

    if (!basket) {
      const emptyBasket = createNewBasket(userId);
      saveBasketForUser(emptyBasket);
      res.json({ ...emptyBasket, items: [], totalAmount: 0, itemCount: 0 });
      return;
    }

    const products = loadProducts();
    const enrichedBasket = {
      ...basket,
      items: basket.items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          ...item,
          product: product
            ? {
                id: product.id,
                name: product.name || "",
                img: product.img || "",
                originalPrice: product.originalPrice || 0,
                discountPercent: product.discountPercent || 0,
                category: product.category || "",
                shortDescription: product.shortDescription || "",
                finalPrice:
                  (product.originalPrice ?? 0) *
                  (1 - (product.discountPercent ?? 0) / 100),
              }
            : null,
          subtotal: product
            ? (product.originalPrice ?? 0) *
              (1 - (product.discountPercent ?? 0) / 100) *
              item.quantity
            : 0,
        };
      }),
    };

    const basketTotal = enrichedBasket.items.reduce(
      (sum, item) => sum + (item.subtotal || 0),
      0
    );

    res.json({
      ...enrichedBasket,
      totalAmount: basketTotal,
      itemCount: enrichedBasket.items.reduce(
        (count, item) => count + item.quantity,
        0
      ),
    });
  } catch (error) {
    console.error("Failed to get basket:", error);
    res
      .status(500)
      .json({ message: "Failed to get basket", error: String(error) });
  }
};

export const addToBasket = (req: Request, res: Response): void => {
  try {
    const userId = req.params.userId;
    const items: { productId: string; quantity: number }[] = req.body.items;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "Items array is required" });
      return;
    }

    const products = loadProducts();
    let basket = getBasketByUserId(userId);
    if (!basket) {
      basket = createNewBasket(userId);
    }

    for (const { productId, quantity = 1 } of items) {
      const foundProduct = products.find((p) => p.id === productId);
      if (!foundProduct) continue;

      const itemIndex = basket.items.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex !== -1) {
        basket.items[itemIndex].quantity = quantity;
      } else {
        const newItem: BasketItem = {
          productId,
          quantity,
          id: foundProduct.id,
          name: foundProduct.name,
          img: foundProduct.img,
        };
        basket.items.push(newItem);
      }
    }

    saveBasketForUser(basket);
    res.json({ message: "Basket updated", basket });
  } catch (error) {
    console.error("Failed to add products to basket:", error);
    res
      .status(500)
      .json({ message: "Failed to update basket", error: String(error) });
  }
};

export const updateBasketItemQuantity = (req: Request, res: Response): void => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 1) {
      res
        .status(400)
        .json({ message: "Valid quantity is required (must be >= 1)" });
      return;
    }

    const basket = getBasketByUserId(userId);
    if (!basket) {
      res.status(404).json({ message: "Basket not found" });
      return;
    }

    const item = basket.items.find((item) => item.productId === productId);
    if (!item) {
      res.status(404).json({ message: "Product not found in basket" });
      return;
    }

    item.quantity = quantity;
    basket.updatedAt = new Date().toISOString();

    saveBasketForUser(basket);

    res.json({ message: "Quantity updated", basket });
  } catch (error) {
    console.error("Failed to update quantity:", error);
    res
      .status(500)
      .json({ message: "Failed to update product", error: String(error) });
  }
};

export const removeFromBasket = (req: Request, res: Response): void => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const basket = getBasketByUserId(userId);
    if (!basket) {
      res.status(404).json({ message: "Basket not found" });
      return;
    }

    const itemIndex = basket.items.findIndex(
      (item) => item.productId === productId
    );
    if (itemIndex === -1) {
      res.status(404).json({ message: "Item not found in basket" });
      return;
    }

    basket.items.splice(itemIndex, 1);
    saveBasketForUser(basket);

    res.json({ message: "Item removed", basket });
  } catch (error) {
    console.error("Failed to remove product:", error);
    res
      .status(500)
      .json({ message: "Failed to remove product", error: String(error) });
  }
};

export const clearBasket = (req: Request, res: Response): void => {
  try {
    const userId = req.params.userId;
    const basket = getBasketByUserId(userId);
    if (!basket) {
      res.status(404).json({ message: "Basket not found" });
      return;
    }

    deleteBasketForUser(userId);

    res.json({ message: "Basket cleared", basket });
  } catch (error) {
    console.error("Failed to clear basket:", error);
    res
      .status(500)
      .json({ message: "Failed to clear basket", error: String(error) });
  }
};
