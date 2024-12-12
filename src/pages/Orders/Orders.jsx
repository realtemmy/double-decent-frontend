import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Ellipsis, Eye, Hourglass, RefreshCcw, Trash2, Truck, X } from "lucide-react";
import axiosService from "@/axios";
import { commaSeparatedPrice } from "@/utils/helperFunctions";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import OrderDetails from "@/components/order-details/OrderDetails";
import { Button } from "@/components/ui/button";

import PaginationButton from "@/components/Pagination/Pagination";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  // Get all orders
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders", activeTab],
    queryFn: async () => {
      const response = await axiosService.get(
        `/order?type=${activeTab === "all" ? "" : activeTab}`
      );
      return response.data;
    },
  });

  // console.log(activeTab, orders);

function formatDate(dateString) {
  const date = new Date(dateString);

  // Extract the day, month, weekday, and year
  const day = date.getDate(); // Day of the month
  const month = date.toLocaleString("en-US", { month: "short" }); // Short month name (e.g., Jan, Feb)
  const weekday = date.toLocaleString("en-US", { weekday: "short" }); // Short weekday name (e.g., Mon, Tue)
  const year = date.getFullYear(); // Year

  // Combine the parts into the desired format
  return `${day}, ${weekday} ${month} ${year}`;
}

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Tabs defaultValue="all" className="mx-1">
      <TabsList className="grid w-full grid-cols-5 gap-1">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="paid" onClick={() => setActiveTab("paid")}>
          Paid
        </TabsTrigger>
        <TabsTrigger
          value="confirmed"
          onClick={() => setActiveTab("confirmed")}
        >
          Confirmed
        </TabsTrigger>
        <TabsTrigger
          value="delivered"
          onClick={() => setActiveTab("delivered")}
        >
          Delivered
        </TabsTrigger>
        <TabsTrigger
          value="cancelled"
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </TabsTrigger>
      </TabsList>
      <TabsContent value={activeTab}>
        <ScrollArea className="w-full whitespace-nowrap">
          <Table>
            <TableCaption>A list of your order history.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>OrderID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <div>No orders yet in {activeTab}</div>
              ) : (
                orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-xs">
                      {order._id}
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      {commaSeparatedPrice(order.totalAmount)}
                    </TableCell>
                    <TableCell
                      className={`capitalize w-fit m-auto rounded flex items-center ${
                        order.status === "paid"
                          ? "bg-blue-50 text-blue-500"
                          : order.status === "cancelled"
                          ? "bg-red-50 text-red-500"
                          : order.status === "delivered"
                          ? "bg-green-50 text-green-500"
                          : "bg-yellow-50 text-yellow-500"
                      } `}
                    >
                      {order.status === "paid" ? (
                        <Hourglass size={15} />
                      ) : order.status === "delivered" ? (
                        <Check size={15} />
                      ) : order.status === "cancelled" ? (
                        <X />
                      ) : (
                        <Truck size={15} />
                      )}
                      <span className="ms-1">{order.status}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Ellipsis className="inline-block text-gray-500 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="p-2 me-2">
                            <DropdownMenuItem className="font-semibold text-slate-600">
                              <RefreshCcw /> <span>Order again</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-semibold text-slate-600">
                              <DialogTrigger className="flex items-center bg-transparent gap-1">
                                <Eye /> <span>Order details</span>
                              </DialogTrigger>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-semibold">
                              <Trash2 color="red" />
                              <span className="text-red-500">Cancel order</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent className="px-1 sm:p-6">
                          <DialogHeader>
                            <DialogTitle>Order details</DialogTitle>
                            <DialogDescription>
                              <ScrollArea className="h-[calc(100dvh-100px)]">
                                <OrderDetails order={order} />
                              </ScrollArea>
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button type="button">Close</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="font-semibold">
                    Total
                  </TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter> */}
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default Orders;
