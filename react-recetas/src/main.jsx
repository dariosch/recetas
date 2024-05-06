import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index2.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import RecetaDetalle from "./routes/recetaDetalle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [{ path: "receta/:recetaId", element: <RecetaDetalle /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
