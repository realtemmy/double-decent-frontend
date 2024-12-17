import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import OrderTracking from "../order-tracking/OrderTracking";

import useUser from "@/hooks/use-user";

import { commaSeparatedPrice } from "@/utils/helperFunctions";
import axiosService from "@/axios";

const OrderPage = () => {
  const { orderId } = useParams();
  const { data: user } = useUser();
  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await axiosService.get(`/order/${orderId}`);
      return response.data;
    },
  });

  console.log(data);

  if (isLoading) {
    return (
      <>
        <Skeleton className="w-full h-[100px] bg-gray-200 my-1" />
        <Skeleton className="w-full h-[100px] bg-gray-200 my-1" />
        <Skeleton className="w-full h-[100px] bg-gray-200 my-1" />
      </>
    );
  }
  if (error) {
    return <div>There was an error fetching data: {error.message}</div>;
  }
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900">
        <form className="mx-4">
          <div className="w-full justify-between items-start flex sm:flex-row flex-col gap-3">
            <h3 className="text-gray-900 text-lg font-semibold font-manrope leading-9">
              Order ID: <span className="text-sm">{orderId}</span>
            </h3>
          </div>
          <OrderTracking status={data.status} />
          <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Billing & Delivery information
            </h4>

            <dl>
              <dt className="text-base font-medium text-gray-900 dark:text-white">
                Individual
              </dt>
              <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                <span className="capitalize">{user?.name || "Guest"}</span> -{" "}
                {data.phone || user.phone},{" "}
                <span className="capitalize">{data.address}</span>
              </dd>
            </dl>
            <div className="grid grid-cols-2">
              <dl className="col-span-2 md:col-span-1">
                <dt className="text-base font-medium text-gray-900 dark:text-white">
                  Payment method
                </dt>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  {data.paymentMode} / {data.paymentChannel}
                </dd>
              </dl>
              <dl className="col-span-2 md:col-span-1">
                <dt className="text-base font-medium text-gray-900 dark:text-white">
                  TransactionId
                </dt>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  {data.transactionId}
                </dd>
              </dl>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
              <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {data.products.map((product, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 md:w-[384px]">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center aspect-square w-10 h-10 shrink-0">
                            <img
                              className="h-auto w-full max-h-full"
                              src={product.image}
                              alt="imac image"
                            />
                          </div>
                          <Link href="#" className="hover:underline capitalize">
                            {product.name}
                          </Link>
                        </div>
                      </td>
                      <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                        x{product.quantity}
                      </td>
                      <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                        {commaSeparatedPrice(product.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-6">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </h4>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {/* Remember to remove delivery fee */}
                      {commaSeparatedPrice(data.totalAmount - 500)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Store Pickup / Delivery
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {commaSeparatedPrice(500)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {commaSeparatedPrice(0)}
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-lg font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                    {commaSeparatedPrice(data.totalAmount)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default OrderPage;
