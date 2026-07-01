import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";

import AuthProvider from "./context/AuthProvider";
import { router } from "./routes/router";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
