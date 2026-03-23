import { createBrowserRouter } from "react-router-dom";
import Layout from "../../pages/layout/LayoutPage";
import Login from "../../pages/auth/LoginPage";
import Register from "../../pages/auth/RegisterPage";
import Home from "../../pages/home/HomePage";
import BookDetails from "../../pages/book-details/BookDetailsPage";
import Catalog from "../../pages/catalog/CatalogPage";
import Cart from "../../pages/cart/CartPage";
import PrivateRoute from "../../app/router/PrivateRoute";

function withPrivate(element) {
  return <PrivateRoute>{element}</PrivateRoute>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "home", element: <Home /> },
      { path: "book/:id", element: <BookDetails /> },
      { path: "catalogo", element: <Catalog /> },
      { path: "cart", element: withPrivate(<Cart />) },
    ],
  },
]);
