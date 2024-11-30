import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

import Products from "./pages/Products/Products";
import ProductPage from "./components/product-page/ProductPage";

import Orders from "./pages/Orders/Orders";

import User from "./pages/User/User";

import NotFound from "./pages/NotFound/NotFound";

function App() {
  // TO build:
  //  - Help page
  //  - Footer
  //  - Search result + filter by section, category etc
  //  - Cart
  //  - Checkout
  //  - User profile, settings etc
  //  - Get coordinates in address submission.. use google maps api
  //  - Find a way to separate delivery fee
  //  - Add and product to cart
  //  - Find a way to separate delivery fee from total amount

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/user" element={<User />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
