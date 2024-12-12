import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "./components/ui/sonner";
import { calculateTotal } from "./redux/cart/cartSlice";
import ProtectedRoute from "./utils/ProtectedRoute";

import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

import Products from "./pages/Products/Products";
import ProductPage from "./components/product-page/ProductPage";
import Category from "./pages/Category/Category";
import Section from "./pages/Section/Section";

import Orders from "./pages/Orders/Orders";

import User from "./pages/User/User";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

import NotFound from "./pages/NotFound/NotFound";
import FAQ from "./pages/FAQ/FAQ";

import Spinner from "./components/Spinner/Spinner";
import CheckoutSuccess from "./components/checkout-success/CheckoutSuccess";

function App() {
  // Github pages configuration completed
  const dispatch = useDispatch();
  // TO do:
  //  - User profile, settings etc
  //  - Find a way to separate delivery fee from total amount ie set delivery fee's
  //  - Make alias unique to each user
  //  - Use tinymce for product description setup
  //  - Keep track and use product's quantity in product page, instead of cartCount
  //  - Set max width for display of the entire app
  //  - Google sign up and login
  //  - In user's, if there was an error getting user from hook, display error messageor just keep loading
  //  - Pagination for orders

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/section/:sectionName" element={<Section />} />
            <Route
              path="user/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/faq" element={<FAQ />} />
          </Route>
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
