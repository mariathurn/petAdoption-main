import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Food } from "./petFood";
import { fetchProductById } from "../api-service";

const dkkFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
});

export default function PetFoodDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [item, setItem] = useState<Food | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setItem(data);
      } catch (err) {
        setError("Error fetching product details");
      }
    };

    fetchProduct();
  }, [id]);

  if (!item || error) {
    return (
      <div className="text-center text-red-600 mt-10">
        <h2 className="text-2xl">Product not found 🍽️</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate("/petfood")}
          className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const hasDiscount =
    item.originalPrice != null && item.discountPercent != null;
  const currentPrice = hasDiscount
    ? item.originalPrice! * (1 - item.discountPercent! / 100)
    : item.price;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-10">
        {/* IMAGE COLUMN */}
        <div className="flex-1">
          <img
            src={item.img}
            alt={item.name}
            onClick={() => setLightboxOpen(true)}
            className="rounded-xl w-full h-auto max-h-96 object-contain cursor-pointer"
          />
        </div>

        {/* DETAILS COLUMN */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-semibold">{item.name}</h1>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Details</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {item.category === "dog" ? "🐶 Dog Food" : "🐱 Cat Food"}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {item.foodType.charAt(0).toUpperCase() + item.foodType.slice(1)}
              </span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                {item.source === "organic" ? "🌱 Organic" : "Non-Organic"}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Price</h3>
            {hasDiscount ? (
              <div className="flex items-baseline space-x-3">
                <span className="line-through text-sm text-gray-500">
                  {dkkFormatter.format(item.originalPrice!)}
                </span>
                <span className="text-2xl font-bold text-gray-800">
                  {dkkFormatter.format(currentPrice)}
                </span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                  -{item.discountPercent}%
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-800">
                {dkkFormatter.format(item.price)}
              </span>
            )}
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => navigate("/petfood")}
              className="flex-1 bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition"
            >
              Back to Shop
            </button>
            <button
              onClick={() => addItem(item)}
              className="flex-1 border border-purple-700 text-purple-700 px-6 py-2 rounded-full hover:bg-purple-100 cursor-pointer transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-2 right-2 text-white text-3xl"
            >
              ×
            </button>
            <img
              src={item.img}
              alt={item.name}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
