import express from "express";
import {
  getAllProducts,
  getProductDetails,
  getProductsByCategory,
  getCategories,
} from "../controllers/petFoodController";

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get all categories – must come before "/:id"
router.get("/categories", getCategories);

// Get products by category
router.get("/category/:categoryName", getProductsByCategory);

// Get product by ID – must come last
router.get("/:id", getProductDetails);

export default router;
