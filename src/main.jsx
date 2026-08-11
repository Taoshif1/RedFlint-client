import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";

import "./index.css";

import AuthProvider from "./context/AuthProvider";
import { router } from "./routes/router";
import CartProvider from "./context/CartProvider";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </CartProvider>
  </AuthProvider>,
);
