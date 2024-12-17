import { useEffect, Suspense, lazy, useTransition } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "./components/ui/sonner";
import { calculateTotal } from "./redux/cart/cartSlice";
import ProtectedRoute from "./utils/ProtectedRoute";

import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Products from "./pages/Products/Products";
import ProductPage from "./components/product-page/ProductPage";
import Category from "./pages/Category/Category";
import Section from "./pages/Section/Section";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutSuccess from "./components/checkout-success/CheckoutSuccess";
import NotFound from "./pages/NotFound/NotFound";
import FAQ from "./pages/FAQ/FAQ";
import Spinner from "./components/Spinner/Spinner";

// const Register = lazy(() => import("./pages/Register/Register"));
// const ForgotPassword = lazy(() =>
//   import("./pages/ForgotPassword/ForgotPassword")
// );
// const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
// const Products = lazy(() => import("./pages/Products/Products"));
// const ProductPage = lazy(() => import("./components/product-page/ProductPage"));
// const Category = lazy(() => import("./pages/Category/Category"));
// const Section = lazy(() => import("./pages/Section/Section"));
// const Cart = lazy(() => import("./pages/Cart/Cart"));
// const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
// const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
// const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
// const Spinner = lazy(() => import("./components/Spinner/Spinner"));
// const CheckoutSuccess = lazy(() =>
//   import("./components/checkout-success/CheckoutSuccess")
// );

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  // TO do:
  //  - Make alias unique to each user
  //  - Use tinymce for product description setup
  //  - Keep track and use product's quantity in product page, instead of cartCount
  //  - Set max width for display of the entire app
  //  - In user's, if there was an error getting user from hook, display error messageor just keep loading
  //  - Keep track of payment, delivered, cancelled and completed date for order
  //  - Find away to keep track and save of delivery fees in order and not in product and maybe alias title\
  //  - Add date to order tracking stuff

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/section/:sectionName" element={<Section />} />
          <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <User />
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

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;


