import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../api-service";

interface Food {
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

// DKK formatter
const dkkFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
});

export default function DiscountedFoodList() {
  const [discountedFoods, setDiscountedFoods] = useState<Food[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscounted = async () => {
      try {
        const data = await fetchAllProducts();
        const discounted = data
          .filter(
            (f: Food) => f.originalPrice != null && f.discountPercent != null
          )
          .slice(0, 4);
        setDiscountedFoods(discounted);
      } catch (err) {
        console.error("Error fetching discounted foods", err);
      }
    };
    fetchDiscounted();
  }, []);

  return (
    <section className="px-6 py-10 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">
        Check Out Our <br />
        <span className="text-purple-700">Discounted Pet Foods</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {discountedFoods.map((item) => {
          const newPrice =
            item.originalPrice! * (1 - item.discountPercent! / 100);
          return (
            <div
              key={item.id}
              onClick={() => navigate(`/petfood/${item.id}`)}
              className="cursor-pointer bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <div className="relative mb-3">
                <span className="absolute top-0 left-0 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                  -{item.discountPercent}% Off
                </span>
                <img
                  src={item.img}
                  alt={item.name}
                  className="rounded-md w-full h-40 object-contain mt-4"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <div className="flex items-baseline justify-center gap-2 mt-2">
                <span className="text-sm line-through text-gray-500">
                  {dkkFormatter.format(item.originalPrice!)}
                </span>
                <span className="text-lg font-bold text-gray-800">
                  {dkkFormatter.format(newPrice)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/petfood")}
          className="px-4 py-2 border border-purple-700 text-purple-700 rounded hover:bg-purple-100 cursor-pointer"
        >
          View All Products
        </button>
      </div>
    </section>
  );
}
