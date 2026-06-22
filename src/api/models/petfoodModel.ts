import { Food } from "../types";
import fs from "fs";
import path from "path";

export interface ProductData {
  products: Food[];
}

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

export { loadProducts, Food };
