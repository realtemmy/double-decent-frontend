import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

import { commaSeparatedPrice } from "@/utils/helperFunctions";
import ProductList from "@/components/product-list/ProductList";

const Cart = () => {
  const navigate = useNavigate();
  const products = [
    {
      _id: 1,
      name: "Product 1",
      quantity: 2,
      price: 1000,
      image: "https://via.placeholder.com/150",
      totalAmount: 2000,
    },
    {
      _id: 2,
      name: "Product 2",
      quantity: 1,
      price: 500,
      image: "https://via.placeholder.com/150",
      totalAmount: 500,
    },
  ];

  const totalAmount = products.reduce(
    (acc, product) => acc + product.totalAmount,
    0
  );

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
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="whitespace-nowr">
                      <div className="flex items-center gap-1 md:gap-4">
                        <Link to={`/product/${product._id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 min-w-10 rounded-md"
                          />
                        </Link>
                        <div>
                          <Link
                            to={`/product/${product._id}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {product.name}
                          </Link>
                          <div className="flex items-center cursor-pointer">
                            <span className="text-xs text-red-500">Remove</span>
                            <Trash2 size={15} className="inline" color="red" />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex text-center whitespace-nowrap">
                        <button className="px-2 py-1 font-medium border rounded rounded-tr-none rounded-br-none">
                          -
                        </button>
                        <span className="px-2 py-1 border">
                          {product.quantity}
                        </span>
                        <button className="px-2 py-1 border rounded-tl-none rounded-bl-none rounded font-medium">
                          +
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold whitespace-nowrap">
                      <div>{commaSeparatedPrice(product.price)}</div>
                      <div
                        style={{
                          fontSize: "0.625rem",
                          color: "#6b7280",
                        }}
                        className="font-normal"
                      >
                        {commaSeparatedPrice(product.price)} x{" "}
                        {product.quantity}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
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
              <Button className="w-full" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
              <p className="mt-4 text-center text-sm text-gray-500">
                or
                <Link
                  to="/shop"
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
        <ProductList title={"Similar products"} categoryId=""/>
      </section>
    </section>
  );
};

export default Cart;
