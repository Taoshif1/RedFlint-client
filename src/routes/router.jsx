import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import CustomerDashboardLayout from "../layouts/CustomerDashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import MaintenanceGate from "./MaintenanceGate";
import AdminRoute from "./AdminRoute";

const lazyRoute = (loader) => async () => {
  const module = await loader();
  return { Component: module.default };
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, lazy: lazyRoute(() => import("../pages/Home")) },
      { path: "products", lazy: lazyRoute(() => import("../pages/Products")) },
      {
        path: "special-edition",
        lazy: lazyRoute(() => import("../pages/SpecialEdition")),
      },
      { path: "login", lazy: lazyRoute(() => import("../pages/Login")) },
      { path: "register", lazy: lazyRoute(() => import("../pages/Register")) },
      { path: "about", lazy: lazyRoute(() => import("../pages/AboutUs")) },
      { path: "return", lazy: lazyRoute(() => import("../pages/ReturnPolicy")) },
      { path: "motto", lazy: lazyRoute(() => import("../pages/OurMotto")) },
      { path: "contact", lazy: lazyRoute(() => import("../pages/ContactUs")) },
      { path: "delivery", lazy: lazyRoute(() => import("../pages/Delivery")) },
      {
        path: "products/:id",
        lazy: lazyRoute(() => import("../pages/ProductDetails")),
      },
      { path: "checkout", lazy: lazyRoute(() => import("../pages/Checkout")) },
      {
        path: "track-order",
        lazy: lazyRoute(() => import("../pages/TrackOrder")),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <MaintenanceGate>
        <PrivateRoute>
          <CustomerDashboardLayout />
        </PrivateRoute>
      </MaintenanceGate>
    ),
    children: [
      {
        index: true,
        lazy: lazyRoute(() => import("../pages/CustomerOverview")),
      },
      {
        path: "wishlist",
        lazy: lazyRoute(
          () => import("../components/dashboard/customer/Wishlist"),
        ),
      },
      {
        path: "account",
        lazy: lazyRoute(
          () => import("../components/dashboard/customer/Account"),
        ),
      },
      {
        path: "address-book",
        lazy: lazyRoute(
          () => import("../components/dashboard/customer/AddressBook"),
        ),
      },
      {
        path: "recent-orders",
        lazy: lazyRoute(
          () => import("../components/dashboard/customer/RecentOrders"),
        ),
      },
      {
        path: "orders/:id",
        lazy: lazyRoute(() => import("../pages/OrderDetails")),
      },
    ],
  },
  {
    path: "admin",
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, lazy: lazyRoute(() => import("../pages/AdminOverview")) },
      {
        path: "orders",
        lazy: lazyRoute(
          () => import("../components/dashboard/admin/AdminOrders"),
        ),
      },
      {
        path: "products",
        lazy: lazyRoute(
          () => import("../components/dashboard/admin/AdminProducts"),
        ),
      },
      {
        path: "products/add",
        lazy: lazyRoute(
          () => import("../components/dashboard/admin/AddProduct"),
        ),
      },
      {
        path: "customers",
        lazy: lazyRoute(
          () => import("../components/dashboard/admin/Customers"),
        ),
      },
      {
        path: "settings",
        lazy: lazyRoute(
          () => import("../components/dashboard/admin/Settings"),
        ),
      },
      {
        path: "profile",
        lazy: lazyRoute(
          () => import("../components/dashboard/admin/AdminProfile"),
        ),
      },
      {
        path: "products/:id",
        lazy: lazyRoute(
          () => import("../components/dashboard/admin/AdminProductDetails"),
        ),
      },
      {
        path: "products/:id/edit",
        lazy: lazyRoute(
          () => import("../components/dashboard/admin/EditProduct"),
        ),
      },
      {
        path: "reviews",
        lazy: lazyRoute(
          () => import("../components/dashboard/admin/AdminReviews"),
        ),
      },
    ],
  },
]);
