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
import { DarkModeProvider } from "./context/DarkModeContext";
import Cart from "./pages/Cart";
import Register from "./pages/Register";

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
        path: "/register",
        element: <Register/>
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
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
