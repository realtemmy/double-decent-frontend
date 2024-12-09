import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "./components/ui/sonner";
import { calculateTotal } from "./redux/cart/cartSlice";

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

function App() {
  // Github pages configuration completed
  const dispatch = useDispatch();
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
  //  - Make alias unique to each user
  //  - Use tinymce for product description setup
  //  - Keep track and use product's quantity in product page, instead of cartCount
  //  - Set max width for display of the entire app

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
            <Route path="/user" element={<User />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
