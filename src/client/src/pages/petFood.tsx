import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import FoodCard from "../components/foodCard";
import { fetchAllProducts } from "../api-service";

type PetType = "all" | "dog" | "cat";
type FoodType = "all" | "dry" | "wet" | "treats" | "raw";
type SourceType = "all" | "organic" | "non-organic";

export interface Food {
  id: string;
  name: string;
  img: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  category: "dog" | "cat";
  foodType: "dry" | "wet" | "treats" | "raw";
  source: "organic" | "non-organic";
}

interface Categories {
  category: string[];
  foodType: string[];
  source: string[];
}

export default function PetFood() {
  const [petType, setPetType] = useState<PetType>("all");
  const [foodType, setFoodType] = useState<FoodType>("all");
  const [sourceType, setSourceType] = useState<SourceType>("all");
  const [foods, setFoods] = useState<Food[]>([]);

  const navigate = useNavigate();
  const { addItem } = useCart();

  const fetchFoods = async () => {
    try {
      const data: Food[] = await fetchAllProducts();

      const filtered = data.filter((item) => {
        const petMatch = petType === "all" || item.category === petType;
        const foodMatch = foodType === "all" || item.foodType === foodType;
        const sourceMatch = sourceType === "all" || item.source === sourceType;
        return petMatch && foodMatch && sourceMatch;
      });

      setFoods(filtered);
    } catch (err) {
      console.error("Error fetching food items", err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [petType, foodType, sourceType]);

  const baseBtn = "text-sm px-4 py-1 rounded-md transition";
  const inactiveBtn =
    "border border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white";
  const activeBtn = "bg-indigo-600 text-white";

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#9990DA] mt-6 mb-4">
        Yummies to take home 🐶 🐱
      </h1>

      {/* Pet Type Filter */}
      <div className="space-x-4 mb-4">
        <span className="font-semibold">Pet Type:</span>
        {(["all", "dog", "cat"] as PetType[]).map((type) => (
          <button
            key={type}
            onClick={() => setPetType(type)}
            className={`${baseBtn} ${
              petType === type ? activeBtn : inactiveBtn
            }`}
          >
            {type === "all" ? "All" : type === "dog" ? "Dogs" : "Cats"}
          </button>
        ))}
      </div>

      {/* Food Type Filter */}
      <div className="space-x-4 mb-4">
        <span className="font-semibold">Food Type:</span>
        {(["all", "dry", "wet", "treats", "raw"] as FoodType[]).map((ft) => (
          <button
            key={ft}
            onClick={() => setFoodType(ft)}
            className={`${baseBtn} ${
              foodType === ft ? activeBtn : inactiveBtn
            }`}
          >
            {ft === "all"
              ? "All"
              : ft.charAt(0).toUpperCase() + ft.slice(1) + " Food"}
          </button>
        ))}
      </div>

      {/* Ingredient Source Filter */}
      <div className="space-x-4 mb-6">
        <span className="font-semibold">Ingredient Source:</span>
        {(["all", "organic", "non-organic"] as SourceType[]).map((src) => (
          <button
            key={src}
            onClick={() => setSourceType(src)}
            className={`${baseBtn} ${
              sourceType === src ? activeBtn : inactiveBtn
            }`}
          >
            {src === "all"
              ? "All"
              : src === "organic"
              ? "Organic"
              : "Non-Organic"}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {foods.map((item) => (
          <FoodCard
            key={item.id}
            food={item}
            onMoreInfo={() => navigate(`/petfood/${item.id}`)}
            onAddToCart={() => addItem(item)}
          />
        ))}
      </div>
    </div>
  );
}
