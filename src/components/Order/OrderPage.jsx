import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axiosService from "@/axios";

const OrderPage = () => {
  const { orderId } = useParams();
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["order", orderId],
  //   queryFn: async () => {
  //     const response = await axiosService.get(`/order/user/${orderId}`);
  //     return response.data;
  //   },
  // });
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>There was an error fetching data: {error.message}</div>;
  // }
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex gap-2 col-span-2 sm:col-span-1 md:col-span-1">
          <Input placeholder="Search by order ID" />
          <Button>Search</Button>
        </div>
        <div className="flex justify-evenly col-span-2 sm:col-span-1">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7 days">Last 7 days</SelectItem>
              <SelectItem value="30 days">Last month</SelectItem>
              <SelectItem value="6 months">Last 6 months</SelectItem>
              <SelectItem value="1 year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <section className="border shadow my-4 p-4">
        <div className="flex gap-4">
          <h5>Order ID: {orderId}</h5> - <span>paid</span>
        </div>
        {/* Products display from order details */}
        <Button variant="destructive">Cancel Order</Button>
        <div>
          <p>Order date: 01, May 2024</p>
          <p>Email: temiloluwaOgunti8@gmail.com</p>
          <p>Payment method: Paystack/card</p>
        </div>
        <div className="bg-red-200 text-red-900">
          <p>Expected delivery: Monday 16 Jul 2024</p>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
