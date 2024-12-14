import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "./components/ui/sonner";
import { calculateTotal } from "./redux/cart/cartSlice";
import ProtectedRoute from "./utils/ProtectedRoute";

import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import Login from "./pages/Login/Login";

// const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const Products = lazy(() => import("./pages/Products/Products"));
const ProductPage = lazy(() => import("./components/product-page/ProductPage"))
const Category = lazy(() => import("./pages/Category/Category"))
const Section = lazy(() => import("./pages/Section/Section"))
// const User = lazy(() => import("./pages/User/User"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"))
const NotFound = lazy(() => import("./pages/NotFound/NotFound"))
const FAQ = lazy(() => import("./pages/FAQ/FAQ"))
const Spinner = lazy(() => import("./components/Spinner/Spinner"))
const CheckoutSuccess = lazy(() => import("./components/checkout-success/CheckoutSuccess"))

function App() {
  // Github pages configuration completed
  const dispatch = useDispatch();
  // TO do:
  //  - Make alias unique to each user
  //  - Use tinymce for product description setup
  //  - Keep track and use product's quantity in product page, instead of cartCount
  //  - Set max width for display of the entire app
  //  - In user's, if there was an error getting user from hook, display error messageor just keep loading
  //  - Pagination for orders
  //  - Sign up link in homepage foor user's not logged in
  //  - New order is not saving in DB yet, check webhook

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
      </Suspense>

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
