// src/client/src/components/foodCard.tsx

import { useNavigate } from "react-router-dom";
import { Food } from "../../../api/types";

type Props = {
  food: Food;
  onMoreInfo: () => void;
  onAddToCart: () => void;
};

// DKK formatter
const dkkFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
});

export default function FoodCard({ food, onMoreInfo, onAddToCart }: Props) {
  const navigate = useNavigate();
  const hasDiscount =
    food.originalPrice !== undefined && food.discountPercent !== undefined;
  const currentPrice = hasDiscount
    ? food.originalPrice! * (1 - food.discountPercent! / 100)
    : food.price!;

  return (
    <div className="bg-white rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all w-72 p-4 flex flex-col justify-between">
      <div onClick={() => navigate(`/petfood/${food.id}`)}>
        <img
          src={food.img}
          alt={food.name}
          className="rounded-md w-full h-44 object-contain mb-3"
        />
        <h2 className="text-lg font-semibold text-gray-800">{food.name}</h2>
        <p className="text-sm text-gray-600 mt-2">{food.shortDescription}</p>

        <div className="mt-3">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-sm line-through text-gray-500">
                {dkkFormatter.format(food.originalPrice!)}
              </span>
              <span className="text-lg font-bold text-gray-800">
                {dkkFormatter.format(currentPrice)}
              </span>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                -{food.discountPercent}%
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-800">
              {dkkFormatter.format(currentPrice)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onMoreInfo}
        className="border border-indigo-500 text-indigo-600 text-sm px-4 py-1 rounded-md hover:bg-indigo-600 hover:text-white transition mt-4"
      >
        More Info
      </button>
      <button
        onClick={onAddToCart}
        className="border border-indigo-500 text-indigo-600 text-sm px-4 py-1 cursor-pointer rounded-md hover:bg-indigo-600 hover:text-white transition mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
}
