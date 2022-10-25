import { createBrowserRouter } from "react-router-dom";
import ProductListSceen from "../screens/AdminSceens/ProductListSceen";
import UserEdit from "../screens/AdminSceens/UserEdit";
import UserListSceen from "../screens/AdminSceens/UserListSceen";
import CardSceen from "../screens/CardSceen";
import HomeScreen from "../screens/HomeScreen";
import LoginSceen from "../screens/LoginSceen";
import OrderSceen from "../screens/OrderSceen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrder from "../screens/PlaceOrder";
import ProductScreen from "../screens/ProductScreen";
import ProfileEditSceen from "../screens/ProfileEditSceen";
import ProfileScreen from "../screens/ProfileSceen";
import RegisterScreen from "../screens/RegisterScreen";
import ShippingSceen from "../screens/ShippingSceen";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductScreen />,
      },
      {
        path: "cart/:id",
        element: <CardSceen />,
      },
      {
        path: "cart",
        element: <CardSceen />,
      },
      {
        path: "login",
        element: <LoginSceen />,
      },
      {
        path: "register",
        element: <RegisterScreen />,
      },
      {
        path: "*",
        element: <HomeScreen />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: <ProfileScreen />,
      },
      {
        path: "profile/edit",
        element: <ProfileEditSceen />,
      },
      {
        path: "/order/:id",
        element: <OrderSceen />,
      },
      {
        path: "/placeorder",
        element: <PlaceOrder />,
      },
      {
        path: "/shipping",
        element: <ShippingSceen />,
      },
      {
        path: "/payment",
        element: <PaymentScreen />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <App />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "userlist",
        element: <UserListSceen />,
      },
      {
        path: "productlist",
        element: <ProductListSceen />,
      },
      {
        path: "user/:id/edit",
        element: <UserEdit />,
      },
    ],
  },
]);

export default router;
