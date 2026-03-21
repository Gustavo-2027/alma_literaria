import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";
import Cart from "../pages/Cart";
import PrivateRoute from "./PrivateRoute";

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
      { path: "cart", element: withPrivate(<Cart />) },
    ],
  },
]);