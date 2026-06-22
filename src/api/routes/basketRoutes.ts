import express from "express";
import {
  addToBasket,
  removeFromBasket,
  getBasket,
  updateBasketItemQuantity,
  clearBasket,
} from "../controllers/basketController";

const router = express.Router();

router.get("/:userId", getBasket);

router.post("/:userId", addToBasket);

router.put("/:userId/items/:productId", updateBasketItemQuantity);

router.delete("/:userId/items/:productId", removeFromBasket);

router.delete("/:userId", clearBasket);

export default router;
