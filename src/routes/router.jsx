import { createBrowserRouter } from "react-router";

import TrackOrder from "../pages/TrackOrder";

import MainLayout from "../layouts/MainLayout";
import CustomerDashboardLayout from "../layouts/CustomerDashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

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

import CustomerDashboard from "../pages/CustomerOverview";
import AdminOverview from "../pages/AdminOverview";
import CustomerOverview from "../pages/CustomerOverview";

import Checkout from "../pages/Checkout";
import Wishlist from "../components/dashboard/customer/Wishlist";
import Account from "../components/dashboard/customer/Account";
import AddressBook from "../components/dashboard/customer/AddressBook";
import RecentOrders from "../components/dashboard/customer/RecentOrders";
import AdminRoute from "./AdminRoute";
import OrderDetails from "../pages/OrderDetails";
import AdminOrders from "../components/dashboard/admin/AdminOrders";
import AdminProducts from "../components/dashboard/admin/AdminProducts";
import AddProduct from "../components/dashboard/admin/AddProduct";
import Customers from "../components/dashboard/admin/Customers";
import Settings from "../components/dashboard/admin/Settings";
import AdminProfile from "../components/dashboard/admin/AdminProfile";
import EditProduct from "../components/dashboard/admin/EditProduct";
import AdminProductDetails from "../components/dashboard/admin/AdminProductDetails";

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
        path: "about",
        Component: AboutUs,
      },
      {
        path: "return",
        Component: ReturnPolicy,
      },
      {
        path: "motto",
        Component: OurMotto,
      },
      {
        path: "contact",
        Component: ContactUs,
      },
      {
        path: "delivery",
        Component: Delivery,
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
      {
        path: "checkout",
        Component: Checkout,
      },
      {
        path: "track-order",
        Component: TrackOrder,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <CustomerDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: CustomerOverview,
      },
      {
        path: "wishlist",
        Component: Wishlist,
      },
      {
        path: "account",
        Component: Account,
      },
      {
        path: "address-book",
        Component: AddressBook,
      },
      {
        path: "recent-orders",
        Component: RecentOrders,
      },
      {
        path: "orders/:id",
        Component: OrderDetails,
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
      {
        index: true,
        Component: AdminOverview,
      },
      {
        path: "orders",
        Component: AdminOrders,
      },
      {
        path: "products",
        Component: AdminProducts,
      },
      {
        path: "products/add",
        Component: AddProduct,
      },
      {
        path: "customers",
        Component: Customers,
      },
      {
        path: "settings",
        Component: Settings,
      },
      {
        path: "profile",
        Component: AdminProfile,
      },
      {
        path: "products/:id",
        Component: AdminProductDetails,
      },
      {
        path: "products/:id/edit",
        Component: EditProduct,
      },
    ],
  },
]);
