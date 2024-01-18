import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { UserRoles } from "../models/user";
import App from "../layouts/App";
import RequireAuth from "./RequireAuth";
import Loading from "../layouts/Loading";

const Basket = lazy(() => import("../../features/basket/Basket"));
const Home = lazy(() => import("../../features/home/Home"));
const Inventory = lazy(() => import("../../features/admin/Inventory"));
const Contact = lazy(() => import("../../features/contact/Contact"));
const About = lazy(() => import("../../features/about/About"));
const Catalog = lazy(() => import("../../features/catalog/Catalog"));
const Errors = lazy(() => import("../../features/errors/Errors"));
const ServerError = lazy(() => import("../../features/errors/ServerError"));
const NotFound = lazy(() => import("../../features/errors/NotFound"));
const Login = lazy(() => import("../../features/account/Login"));
const Register = lazy(() => import("../../features/account/Register"));
const Orders = lazy(() => import("../../features/orders/Orders"));
const OrderDetails = lazy(() => import("../../features/orders/OrderDetails"));
const CheckoutContainer = lazy(
  () => import("../../features/checkout/CheckoutContainer")
);
const ProductDetails = lazy(
  () => import("../../features/catalog/ProductDetails")
);
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
            element: (
              <Suspense fallback={<Loading />}>
                <CheckoutContainer />
              </Suspense>
            ),
          },
          {
            path: "/orders",
            element: (
              <Suspense fallback={<Loading />}>
                <Orders />
              </Suspense>
            ),
          },
          {
            path: "/orders/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <OrderDetails />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <RequireAuth roles={[UserRoles.admin]} />,
        children: [
          {
            path: "/inventory",
            element: (
              <Suspense fallback={<Loading />}>
                <Inventory />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/catalog/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/catalog",
        element: (
          <Suspense fallback={<Loading />}>
            <Catalog />
          </Suspense>
        ),
      },

      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      import.meta.env.DEV
        ? {
            path: "/errors",
            element: (
              <Suspense fallback={<Loading />}>
                <Errors />
              </Suspense>
            ),
          }
        : {},
      {
        path: "/server-error",
        element: (
          <Suspense fallback={<Loading />}>
            <ServerError />
          </Suspense>
        ),
      },
      {
        path: "/not-found",
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
      {
        path: "/basket",
        element: (
          <Suspense fallback={<Loading />}>
            <Basket />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <Navigate replace to={"/not-found"} />,
      },
    ],
  },
]);
