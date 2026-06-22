import { createContext, useContext, useState, useEffect } from "react";
import { Food } from "../../../api/types";
import {
  clearUserBasket,
  deleteBasketItem,
  fetchUserBasket,
  syncBasket,
  updateBasketItem,
} from "../api-service";

type CartItem = {
  product: Food;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addItem: (item: Food) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toastMessage: string | null;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem("userId")
  );

  useEffect(() => {
    const checkLocalStorage = () => {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    };

    checkLocalStorage();

    window.addEventListener("storage", checkLocalStorage);

    return () => window.removeEventListener("storage", checkLocalStorage);
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        try {
          const basket = await fetchUserBasket(userId);
          if (!basket || !Array.isArray(basket.items)) {
            setCart([]);
            return;
          }
          setCart(
            basket.items.map((item: any) => ({
              product: item.product,
              quantity: item.quantity,
            }))
          );
        } catch (err) {
          console.error("Failed to load basket:", err);
        }
      }
    };

    loadCart();
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, userId]);

  const syncWithBackend = async (updatedCart: CartItem[]) => {
    if (!userId) return;
    try {
      console.log("Syncing with backend:", updatedCart);
      await syncBasket(
        userId,
        updatedCart.map(({ product, quantity }) => ({
          productId: product.id,
          quantity,
        }))
      );
    } catch (err) {
      console.error("Failed to sync cart:", err);
    }
  };

  const updateCart = (updater: (prev: CartItem[]) => CartItem[]) => {
    setCart((prev) => {
      const updated = updater(prev);
      syncWithBackend(updated);
      return updated;
    });
  };

  const addItem = (item: Food) => {
    console.log("Adding item to cart:", item);
    updateCart((prev) => {
      const existing = prev.find((ci) => ci.product.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.product.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        return [...prev, { product: item, quantity: 1 }];
      }
    });
    setToastMessage(`${item.name} added to cart 🛒`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((ci) => ci.product.id !== id);
      if (userId) deleteItemFromBackend(id);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (userId) {
      clearUserBasket(userId).catch((err) =>
        console.error("Failed to clear basket:", err)
      );
    } else {
      localStorage.removeItem("cart");
    }
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) => {
      const updated = prev.map((ci) =>
        ci.product.id === id ? { ...ci, quantity: ci.quantity + 1 } : ci
      );
      const item = updated.find((ci) => ci.product.id === id);
      if (item && userId) updateItemQuantity(id, item.quantity);
      return updated;
    });
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) => {
      const current = prev.find((ci) => ci.product.id === id);
      if (!current) return prev;

      const newQuantity = current.quantity - 1;
      const updated =
        newQuantity > 0
          ? prev.map((ci) =>
              ci.product.id === id ? { ...ci, quantity: newQuantity } : ci
            )
          : prev.filter((ci) => ci.product.id !== id);

      if (userId) {
        newQuantity > 0
          ? updateItemQuantity(id, newQuantity)
          : deleteItemFromBackend(id);
      }

      return updated;
    });
  };

  const updateItemQuantity = async (productId: string, quantity: number) => {
    if (!userId) return;
    try {
      await updateBasketItem(userId, productId, quantity);
    } catch (err) {
      console.error("Failed to update item quantity:", err);
    }
  };

  const deleteItemFromBackend = async (productId: string) => {
    if (!userId) return;
    try {
      await deleteBasketItem(userId, productId);
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
