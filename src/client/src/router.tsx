// src/client/src/router.tsx

import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Pets from "./pages/pets";
import PetDetails from "./pages/petDetails";
import PetFood from "./pages/petFood";
import PetFoodDetails from "./pages/petFoodDetails";
import Faq from "./pages/faq";
import Cart from "./pages/cart";
import Home from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/pets",
        element: <Pets />,
      },
      {
        path: "/pets/:petName",
        element: <PetDetails />,
      },
      {
        path: "/petfood",
        element: <PetFood />,
      },
      {
        path: "/petfood/:id",
        element: <PetFoodDetails />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
