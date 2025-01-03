import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

import { commaSeparatedPrice } from "@/utils/helperFunctions";

import {
  removeFromCart,
  incrementCount,
  decrementCount,
} from "@/redux/cart/cartSlice";

import ProductList from "@/components/product-list/ProductList";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const handleRemoveFromCart = useCallback(
    (itemId) => {
      dispatch(removeFromCart(itemId));
    },
    [dispatch]
  );
  const handleIncrementCount = useCallback(
    (itemId) => {
      dispatch(incrementCount(itemId));
    },
    [dispatch]
  );
  const handleDecrementCount = useCallback(
    (itemId) => {
      dispatch(decrementCount(itemId));
    },
    [dispatch]
  );
  return (
    <>
      <Helmet>
        <title>Cart - Double decent</title>
        <meta
          name="description"
          content="Cart page for Double decent superstore"
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <section className="bg-white py-6 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Cart
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 border h-fit rounded">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto">Product</TableHead>
                    <TableHead className="w-24 text-center">Quantity</TableHead>
                    <TableHead className="text-right w-28">Price</TableHead>
                  </TableRow>
                </TableHeader>
                {cartItems.length === 0 ? (
                  <TableCell
                    colSpan={3}
                    className="text-center border col-span-full w-full p-4 text-xl italic"
                  >
                    No item in cart yet,{" "}
                    <Link
                      to="/products"
                      className="text-lg underline"
                      title="continue shopping"
                    >
                      continue shopping
                    </Link>
                  </TableCell>
                ) : (
                  <TableBody>
                    {cartItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="whitespace-nowr">
                          <div className="flex items-center gap-1 md:gap-4">
                            <Link
                              to={`/product/${item._id}`}
                              title={`Product -${item.name}`}
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-10 w-10 min-w-10 rounded-md"
                                title={`Product - ${item.name}`}
                              />
                            </Link>
                            <div>
                              <Link
                                to={`/product/${item._id}`}
                                title={`Product -${item.name}`}
                                className="text-xs sm:text-sm lg:text-base font-medium hover:underline capitalize"
                              >
                                {item.name}
                              </Link>
                              <div
                                className="flex items-center cursor-pointer"
                                onClick={() => handleRemoveFromCart(item._id)}
                              >
                                <span className="text-xs text-red-500">
                                  Remove
                                </span>
                                <Trash2
                                  size={15}
                                  className="inline"
                                  color="red"
                                />
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex text-center whitespace-nowrap">
                            <button
                              className="px-2 py-1 font-medium border rounded rounded-tr-none rounded-br-none"
                              onClick={() => handleDecrementCount(item._id)}
                            >
                              -
                            </button>
                            <span className="px-2 py-1 border">
                              {item.quantity}
                            </span>
                            <button
                              className="px-2 py-1 border rounded-tl-none rounded-bl-none rounded font-medium"
                              onClick={() => handleIncrementCount(item._id)}
                            >
                              +
                            </button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold whitespace-nowrap">
                          <div>{commaSeparatedPrice(item.price)}</div>
                          <div
                            style={{
                              fontSize: "0.625rem",
                              color: "#6b7280",
                            }}
                            className="font-normal"
                          >
                            {commaSeparatedPrice(item.price)} x {item.quantity}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}

                <TableFooter className="bg-transparent">
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">
                      {commaSeparatedPrice(totalPrice)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            {/* Checkout and Voucher Section */}
            <div className="space-y-6">
              <div className="rounded-md border p-6 dark:border-gray-700 dark:bg-gray-800">
                <h1 className="text-lg font-semibold">Cart summary</h1>
                <Separator className="my-4" />
                <p className="text-slate-600">
                  Delivery price will be added after your delivery address is
                  filled at the checkout
                </p>
                <Button
                  className="w-full"
                  onClick={() => navigate("/checkout")}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
                <p className="mt-4 text-center text-sm text-gray-500">
                  or
                  <Link
                    to="/products"
                    title="Back to products"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <section className="mt-10 mx-4">
          <ProductList
            title={"Similar products"}
            categoryId={cartItems[0]?.category}
          />
        </section>
      </section>
    </>
  );
};

export default Cart;
