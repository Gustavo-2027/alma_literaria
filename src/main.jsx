import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Private from "./pages/Private";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "./pages/Layout";
import { DarkModeContext, DarkModeProvider } from "./context/DarkModeContext";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: (
          <Private>
            <Home />
          </Private>
        ),
      },
      {
        path: "/book/:id",
        element: (
          <Private>
            <BookDetails />
          </Private>
        ),
      },
      {
        path: "/cart",
        element: (
          <Private>
            <Cart />
          </Private>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </Provider>
  </StrictMode>
);
