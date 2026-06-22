const BASE_URL = "http://localhost:4000/api";

const handleFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
};

export const createUser = (user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) =>
  handleFetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

export const getUserByEmail = (email: string) =>
  handleFetch(`${BASE_URL}/users/${email}`);

export const fetchAllProducts = () => handleFetch(`${BASE_URL}/products`);

export const fetchProductById = (id: string) =>
  handleFetch(`${BASE_URL}/products/${id}`);

export const fetchAllPets = () => handleFetch(`${BASE_URL}/pets`);

export const fetchPetByName = (petName: string) =>
  handleFetch(`${BASE_URL}/pets/${petName}`);

export const fetchUserBasket = (userId: string) =>
  handleFetch(`${BASE_URL}/baskets/${userId}`);

export const syncBasket = (
  userId: string,
  items: { productId: string; quantity: number }[]
) =>
  fetch(`${BASE_URL}/baskets/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

export const clearUserBasket = (userId: string) =>
  fetch(`${BASE_URL}/baskets/${userId}`, { method: "DELETE" });

export const updateBasketItem = (
  userId: string,
  productId: string,
  quantity: number
) =>
  fetch(`${BASE_URL}/baskets/${userId}/items/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });

export const deleteBasketItem = (userId: string, productId: string) =>
  fetch(`${BASE_URL}/baskets/${userId}/items/${productId}`, {
    method: "DELETE",
  });
