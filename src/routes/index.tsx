import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import ProductAdd from "../pages/ProductAdd/ProductAdd";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProductEdit from "../pages/ProductEdit/ProductEdit";
import ProductList from "../pages/ProductList";
import Register from "../pages/Register/Register";
import MainLayout from "../templates/Layout/MainLayout";

export const AppRoutes = (): JSX.Element => {
  const isAuthenticated = localStorage.getItem("token");
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/auth/login" />,
    },
    {
      path: "/auth",
      element: <Navigate to="/auth/login" />,
    },
    {
      path: "/auth/login",
      element: isAuthenticated ? <Navigate to="/product" /> : <Login />,
    },
    {
      path: "/auth/signup",
      element: isAuthenticated ? <Navigate to="/product" /> : <Register />,
    },
    {
      path: "/product",
      element: isAuthenticated ? <MainLayout /> : <Navigate to="/auth/login" />,
      children: [
        {
          index: true,
          element: <ProductList />,
        },
        {
          path: "/product/add",
          element: <ProductAdd />,
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        { path: "/product/:id/edit", element: <ProductEdit /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <>{routes}</>;
};
