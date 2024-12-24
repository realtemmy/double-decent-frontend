import React from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Link } from "react-router-dom";
import { commaSeparatedPrice } from "@/utils/helperFunctions";

const OrderDetails = ({ order }) => {
  const { products, address, totalAmount } = order;
  return (
    <section>
      <div>
        <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-2 dark:border-gray-700 sm:mt-8">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Billing & Delivery information
          </h1>
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Delivery address
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {address}
            </dd>
          </dl>
        </div>

        {/* Products Table */}
        <div className="mt-6 sm:mt-8">
          <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
            <Table>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap py-4">
                      <div className="flex items-center gap-4">
                        <span className="flex aspect-square w-10 h-10 shrink-0 items-center hover:text-slate-600">
                          <img
                            className="h-auto w-full max-h-full"
                            src={product.image}
                            alt={`${product.name} image`}
                            title={`Product -${product.name}`}
                          />
                        </span>
                        <Link
                          to={`/product/${product._id}`}
                          title={`Get ${product.name} now`}
                          className="hover:underline hover:text-slate-600"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>{`x${product.quantity}`}</TableCell>
                    <TableCell className="text-right font-bold">
                      {commaSeparatedPrice(product.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Order Summary */}
          <div className="mt-4 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Order summary
            </h2>
            <div className="space-y-2">
              <dl className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">
                  Total products
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  {commaSeparatedPrice(totalAmount)}
                </dd>
              </dl>
              <dl className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Discount</dt>
                <dd className="text-base font-medium text-green-500">-0.00</dd>
              </dl>
              <dl className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">
                  Delivery cost
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  &#8358;0.00
                </dd>
              </dl>
              <dl className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">VAT</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  &#8358;0.00
                </dd>
              </dl>
              <dl className="flex justify-between border-t pt-2">
                <dt className="text-lg font-bold">Total</dt>
                <dd className="text-lg font-bold">
                  {commaSeparatedPrice(totalAmount)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
