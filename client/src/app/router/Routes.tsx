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
import Checkout from "../../features/checkout/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "*",
        element: <Navigate replace to={"/not-found"} />,
      },
    ],
  },
]);
