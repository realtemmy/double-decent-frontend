import { useNavigate } from "react-router-dom";
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

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  const handleIncrementCount = (itemId) => {
    dispatch(incrementCount(itemId));
  };
  const handleDecrementCount = (itemId) => {
    dispatch(decrementCount(itemId));
  };
  return (
    <section className="bg-white py-6 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Cart
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 border rounded">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-auto">Product</TableHead>
                  <TableHead className="w-24 text-center">Quantity</TableHead>
                  <TableHead className="text-right w-28">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="whitespace-nowr">
                      <div className="flex items-center gap-1 md:gap-4">
                        <Link to={`/product/${item._id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 min-w-10 rounded-md"
                          />
                        </Link>
                        <div>
                          <Link
                            to={`/product/${item._id}`}
                            className="text-sm font-medium hover:underline capitalize"
                          >
                            {item.name}
                          </Link>
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => handleRemoveFromCart(item._id)}
                          >
                            <span className="text-xs text-red-500">Remove</span>
                            <Trash2 size={15} className="inline" color="red" />
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
              <TableFooter className="bg-transparent">
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>

            <Separator className="my-6" />
          </div>

          {/* Checkout and Voucher Section */}
          <div className="space-y-6">
            <div className="rounded-md border p-6 dark:border-gray-700 dark:bg-gray-800">
              <h4 className="text-lg font-semibold">Cart summary</h4>
              <Separator className="my-4" />
              <p className="text-slate-600">
                Delivery price will be added after your delivery address is
                filled at the checkout
              </p>
              <Button className="w-full" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </Button>
              <p className="mt-4 text-center text-sm text-gray-500">
                or
                <Link
                  to="/"
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
        <ProductList title={"Similar products"} categoryId="" />
      </section>
    </section>
  );
};

export default Cart;
