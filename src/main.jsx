import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/home";
import ErrorPage from "./error-page";
import Shop, { loader as shopLoader } from "./routes/shop";
import {
  CategoryItems,
  loader as categoryItemLoader,
} from "./routes/categoryItems";
import { ItemDetail, loader as itemLoader } from "./routes/Item";
import Cart from "./routes/Cart";
import ShopIndex from "./routes/ShopIndex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/shop/",
    element: <Shop />,
    loader: shopLoader,
    children: [
      {
        index: true,
        element: <ShopIndex />,
        loader: shopLoader,
      },
      {
        path: "/shop/:category",
        element: <CategoryItems />,
        loader: categoryItemLoader,
      },
      {
        path: "/shop/item/:itemId",
        element: <ItemDetail />,
        loader: itemLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: `/shop/checkout/cart`,
        element: <Cart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
