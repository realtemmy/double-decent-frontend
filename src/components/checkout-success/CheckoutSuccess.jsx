import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { clearCart } from "@/redux/cart/cartSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Checkout success</title>
        <meta
          name="description"
          content="Thank you for your order! Your order will be processed within 24 hours."
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-xl px-4 2xl:px-0 flex flex-col items-center">
          <div>
            <CircleCheckBig size={70} color="orange" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Thanks for your order!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            Your order will be processed within 24 hours during working days. We
            will notify you by email once your order is ready for delivery.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            <Button
              className="w-full md:w-1/2"
              onClick={() => navigate("/user/orders")}
            >
              Track your order
            </Button>
            <Link
              to="/products"
              className="w-full md:w-1/2 text-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:text-slate-700"
              title="Back to shopping"
            >
              Return to shopping
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutSuccess;
