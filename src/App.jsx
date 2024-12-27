import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "./components/ui/sonner";
import { calculateTotal } from "./redux/cart/cartSlice";

import ProtectedRoute from "./utils/ProtectedRoute";
import MainLayout from "./components/MainLayout/MainLayout";
import Spinner from "./components/Spinner/Spinner";

const Register = lazy(() => import("./pages/Register/Register"));
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const Login = lazy(() => import("./pages/Login/Login"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const  Home = lazy(() => import("./pages/Home/Home"));
const Products = lazy(() => import("./pages/Products/Products"));
const ProductPage = lazy(() => import("./components/product-page/ProductPage"));
const Category = lazy(() => import("./pages/Category/Category"));
const Section = lazy(() => import("./pages/Section/Section"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const CheckoutSuccess = lazy(() =>
  import("./components/checkout-success/CheckoutSuccess")
);
const User = lazy(() => import("./pages/User/User"));

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);


  return (
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
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" richColors />
    </Suspense>
  );
}

export default App;
