import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
import {
  Check,
  Ellipsis,
  Eye,
  Hourglass,
  Loader2,
  RefreshCcw,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import axiosService from "@/axios";
import { commaSeparatedPrice, formatDate } from "@/utils/helperFunctions";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OrderDetails from "@/components/order-details/OrderDetails";
import { Button } from "@/components/ui/button";

import PaginationButton from "@/components/Pagination/Pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import debounce from "lodash.debounce";

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchId, setSearchId] = useState("");
  const [duration, setDuration] = useState("");

  // Get all orders
  const { isLoading, data, error } = useQuery({
    queryKey: ["orders", activeTab, currentPage, duration, searchId],
    queryFn: async () => {
      const response = await axiosService.get(
        `/order?type=${activeTab}&page=${currentPage}&duration=${duration}&id=${search}`
      );
      return response.data;
    },
  });

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleDurationChange = useCallback((value) => {
    setDuration(value);
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta
          name="description"
          content="Orders page for Double Decent Superstores"
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="flex gap-2 col-span-2 sm:col-span-1 md:col-span-1 mx-1">
          <Input
            placeholder="Search by order ID"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button onClick={() => setSearchId(search)}>Search</Button>
        </div>
        <div className="flex justify-evenly gap-2 col-span-2 sm:col-span-1">
          <Select className="col-span-2">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ascending">Ascending</SelectItem>
              <SelectItem value="decending">Descending</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleDurationChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Today</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last month</SelectItem>
              <SelectItem value="180">Last 6 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Tabs defaultValue="all" className="mx-1">
        <ScrollArea className="whitespace-nowrap">
          <TabsList className="grid w-full grid-cols-5 justify-between min-w-96">
            {[
              { value: "all", label: "All" },
              { value: "paid", label: "Paid" },
              { value: "confirmed", label: "Confirmed" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="mx-1 text-xs sm:text-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

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
                {isLoading ? (
                  <TableCell colSpan={5}>
                    <div className="w-full flex items-center justify-center">
                      <Loader2 className="animate-spin text-center block" />
                    </div>
                  </TableCell>
                ) : data.data?.length === 0 ? (
                  <TableCell colSpan={5}>
                    <div className="text-center text-lg text-slate-600 font-medium">
                      No orders yet in this section.
                    </div>
                  </TableCell>
                ) : (
                  data.data?.map((order, index) => (
                    <TableRow
                      key={index}
                      onClick={() => navigate(`/user/orders/${order._id}`)}
                    >
                      <TableCell className="font-medium text-xs truncate max-w-[150px]">
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
                        style={{
                          margin: "4px 0",
                        }}
                      >
                        <span>
                          {order.status === "paid" ? (
                            <Hourglass size={15} />
                          ) : order.status === "delivered" ? (
                            <Check size={15} />
                          ) : order.status === "cancelled" ? (
                            <X size={15} />
                          ) : (
                            <Truck size={15} />
                          )}
                        </span>
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
                                <span className="text-red-500">
                                  Cancel order
                                </span>
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
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="font-semibold">
                    Total
                  </TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <PaginationButton data={data} onPageChange={handlePageChange} />
    </>
  );
};

export default Orders;
