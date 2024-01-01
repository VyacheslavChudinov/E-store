import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../../features/home/Home";
import ProductDetails from "../../features/catalog/ProductDetails";
import Contact from "../../features/contact/Contact";
import About from "../../features/about/About";
import App from "../layouts/App";
import Catalog from "../../features/catalog/Catalog";
import Errors from "../../features/errors/Errors";
import ServerError from "../../features/errors/ServerError";
import { NotFound } from "../../features/errors/NotFound";
import Basket from "../../features/basket/Basket";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import OrderDetails from "../../features/orders/OrderDetails";
import CheckoutContainer from "../../features/checkout/CheckoutContainer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/checkout",
            element: <CheckoutContainer />,
          },
          {
            path: "/orders",
            element: <Orders />,
          },
          {
            path: "/orders/:id",
            element: <OrderDetails />,
          },
        ],
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/catalog/:id",
        element: <ProductDetails />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/errors",
        element: <Errors />,
      },
      {
        path: "/server-error",
        element: <ServerError />,
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <Navigate replace to={"/not-found"} />,
      },
    ],
  },
]);
