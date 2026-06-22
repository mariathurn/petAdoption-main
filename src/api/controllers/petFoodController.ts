import { Request, Response } from "express";
import { Food } from "../types";
import { loadProducts } from "../models/petfoodModel";

// GET /products – Get all products
export const getAllProducts = (req: Request, res: Response): void => {
  const products = loadProducts();
  if (products.length === 0) {
    res.status(500).json({ message: "Failed to load pet food products" });
    return;
  }
  res.json(products);
};

// GET /categories – Get product categories that exist
export const getCategories = (req: Request, res: Response): void => {
  const products = loadProducts();

  const categorySet = new Set<Food["category"]>();
  const foodTypeSet = new Set<Food["foodType"]>();
  const sourceSet = new Set<Food["source"]>();

  products.forEach((product: Food) => {
    categorySet.add(product.category);
    foodTypeSet.add(product.foodType);
    sourceSet.add(product.source);
  });

  res.json({
    category: Array.from(categorySet),
    foodType: Array.from(foodTypeSet),
    source: Array.from(sourceSet),
  });
};

// GET /products/category/:categoryName
export const getProductsByCategory = (req: Request, res: Response): void => {
  const products = loadProducts();
  const value = req.params.categoryName.toLowerCase();

  const filtered = products.filter(
    (p) =>
      p.category.toLowerCase() === value ||
      p.foodType.toLowerCase() === value ||
      p.source.toLowerCase() === value
  );

  res.json(filtered);
};

// GET /products/:id – Get product details by ID
export const getProductDetails = (req: Request, res: Response): void => {
  const products = loadProducts();
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(product);
};
