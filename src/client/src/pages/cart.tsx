import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
    useCart();

  const { firstName } = useAuth();

  const total = cart.reduce((sum, { product, quantity }) => {
    const price =
      product.originalPrice && product.discountPercent
        ? product.originalPrice * (1 - product.discountPercent / 100)
        : product.price ?? 0;
    return sum + price * quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        {firstName && <h2>Hi {firstName},</h2>}
        <h2 className="text-2xl font-bold">Your basket is empty 🧺</h2>
        <p className="mt-2">
          Go add some delicious treats for your furry friend!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🛒 Your Basket, {firstName} 🛒
      </h1>

      <ul className="space-y-4">
        {cart.map(({ product, quantity }) => (
          <li
            key={product.id}
            className="flex items-center justify-between bg-white p-4 rounded shadow"
          >
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                {product.shortDescription}
              </p>
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {(() => {
                  const price =
                    product.originalPrice && product.discountPercent
                      ? product.originalPrice *
                        (1 - product.discountPercent / 100)
                      : product.price ?? 0;
                  return `${(price * quantity).toFixed(2)} DKK`;
                })()}
              </p>
              <button
                onClick={() => removeItem(product.id)}
                className="text-red-500 text-sm mt-1 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-bold">Total: {total.toFixed(2)} DKK</p>
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear Basket
        </button>
      </div>
    </div>
  );
}
