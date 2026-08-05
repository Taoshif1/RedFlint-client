import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import SpecialEdition from "../pages/SpecialEdition";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../pages/ProductDetails";

import AboutUs from "../pages/AboutUs";
import ReturnPolicy from "../pages/ReturnPolicy";
import OurMotto from "../pages/OurMotto";
import ContactUs from "../pages/ContactUs";
import Delivery from "../pages/Delivery";

import CustomerDashboard from "../pages/CustomerDashboard";

import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/AdminDashboard" ;

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "products",
        Component: Products,
      },
      {
        path: "special-edition",
        Component: SpecialEdition,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path:"about",
        Component: AboutUs,
      },
      {
        path:"return",
        Component:ReturnPolicy
      },
      {
        path:"motto",
        Component:OurMotto
      },
      {
        path:"contact",
        Component:ContactUs
      },
      {
        path:"delivery",
        Component:Delivery
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <CustomerDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "products/:id",
        Component: ProductDetails,
      },
    ],
  },
 {
    path: "/admin",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
]);
