import {
  Check,
  Ellipsis,
  Eye,
  Hourglass,
  House,
  LogOut,
  RefreshCcw,
  Settings,
  ShoppingBasket,
  Trash2,
  Truck,
  User2,
  X,
} from "lucide-react";

import { useState } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { commaSeparatedPrice } from "@/utils/helperFunctions";
import { toast } from "sonner";

import axiosService from "@/axios";
import OrderDetails from "@/components/order-details/OrderDetails";

const User = () => {
  const [display, setDisplay] = useState("tabs");
  // Get all orders
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axiosService.get("/order");
      return response.data;
    },
  });

  console.log(orders);

  const mutation = useMutation({
    mutationFn: async (passwordField) =>
      axiosService.post("/updateMyPassword", passwordField),
  });

  const [passwordField, setPasswordField] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [addressField, setAddressField] = useState({
    alias: "",
    street: "",
    state: "",
    lga: "",
    address: "",
  });

  const handlePasswordReset = (event) => {
    const { name, value } = event.target;
    setPasswordField({ ...passwordField, [name]: value });
  };

  const handleSetAddress = (event) => {
    const { name, value } = event.target;
    setAddressField({ ...addressField, [name]: value });
  };

  const handleAddressSubmit = () => {
    if (
      addressField.alias === "" ||
      addressField.street === "" ||
      addressField.state === "" ||
      addressField.lga === "" ||
      addressField.address === ""
    ) {
      return toast.warning("All fields are required");
    }
    mutation.mutate(addressField);
  };

  const handlePasswordSubmit = () => {
    if (
      passwordField.password === "" ||
      passwordField.newPassword === "" ||
      passwordField.confirmNewPassword === ""
    ) {
      return toast.warning("All fields are required");
    }
    if (passwordField.newPassword !== passwordField.confirmNewPassword) {
      return toast.error("Passwords do not match");
    }
    mutation.mutate(passwordField);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-[300px_1fr] px-2 gap-4">
      <Card className="w-full max-w-sm col-span-3 md:col-span-1 h-[calc(100svh-150px)]">
        <CardHeader>
          <CardTitle>
            <center>
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4 className="mt-2">Tunde Badmus</h4>
            </center>
          </CardTitle>
        </CardHeader>
        <Separator className="w-11/12 m-auto my-4" />
        <CardContent className="p-0">
          <Button
            className="justify-start w-full rounded-none hover:bg-orange-100 hover:text-orange-500"
            variant="secondary"
          >
            <User2 size={24} />
            <span className="ms-2">User and settings</span>
          </Button>
          <Button
            className="justify-start w-full rounded-none hover:bg-orange-100 hover:text-orange-500"
            variant="secondary"
          >
            <House size={24} />
            <span className="ms-2">Delivery Address</span>
          </Button>
          <Button
            className="justify-start w-full rounded-none hover:bg-orange-100 hover:text-orange-500"
            variant="secondary"
            onClick={() => setDisplay("order")}
          >
            <ShoppingBasket size={24} />
            <span className="ms-2">Order history</span>
          </Button>
          <Button
            className="justify-start w-full rounded-none hover:bg-orange-100 hover:text-orange-500"
            variant="secondary"
          >
            <Settings size={24} />
            <span className="ms-2">Security settings</span>
          </Button>
          <Separator className="my-3" />
          <Button
            className="justify-start w-full rounded-none flex items-center"
            variant="outlined"
          >
            <LogOut color="red" />{" "}
            <span className="ms-2 text-red-500">Logout</span>
          </Button>
        </CardContent>
      </Card>
      <section className="col-span-3 md:col-span-2">
        {display === "tabs" ? (
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-3 gap-1">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="@pedroduarte@mail.io" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input
                      id="current"
                      type="password"
                      name="password"
                      onChange={handlePasswordReset}
                      value={passwordField.password}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input
                      id="new"
                      type="password"
                      name="newPassword"
                      value={passwordField.newPassword}
                      onChange={handlePasswordReset}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmNew">Confirm New password</Label>
                    <Input
                      id="confirmNew"
                      type="password"
                      name="confirmNewPassword"
                      onChange={handlePasswordReset}
                      value={passwordField.confirmNewPassword}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handlePasswordSubmit}>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                  <CardDescription>
                    Update your delivery address here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 items-baseline gap-2 space-y-2">
                  <div className="space-y-1 col-span-2 md:col-span-1">
                    <Label htmlFor="alias">Alias</Label>
                    <Input
                      id="alias"
                      placeholder="eg Home, Work etc"
                      name="alias"
                      onChange={handleSetAddress}
                      value={addressField.alias}
                    />
                  </div>
                  <div className="space-y-1 col-span-2 md:col-span-1">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      defaultValue="123 Main St"
                      name="street"
                      onChange={handleSetAddress}
                      value={addressField.street}
                    />
                  </div>
                  <div className="space-y-1 col-span-2 md:col-span-1">
                    <Select
                      onValueChange={handleSetAddress}
                      name="state"
                      value={addressField.state}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>States</SelectLabel>
                          <SelectItem value="lagos" selected>
                            Lagos state
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 col-span-2 md:col-span-1">
                    <Select onValueChange={handleSetAddress} name="lga">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose LGA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>LGA</SelectLabel>
                          <SelectItem value="ikorodu">Ikorodu</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <Label htmlFor="address">Full address</Label>
                    <Textarea
                      id="address"
                      placeholder="9, NBC road, Ebute, Ikorodu, Lagos State."
                      name="address"
                      onChange={handleSetAddress}
                      value={addressField.address}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleAddressSubmit}>Save address</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <ScrollArea className="w-full whitespace-nowrap">
            <h4 className="text-2xl capitalize font-semibold text-slate-600">
              order history
            </h4>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>OrderID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{order._id}</TableCell>
                    <TableCell>12th of June, 2024</TableCell>
                    <TableCell>
                      {commaSeparatedPrice(order.totalAmount)}
                    </TableCell>
                    <TableCell
                      className={`capitalize w-fit m-auto flex items-center ${
                        order.status === "paid"
                          ? "bg-yellow-50 text-yellow-500"
                          : order.status === "cancelled"
                          ? "bg-red-50 text-red-500"
                          : order.status === "delivered"
                          ? "bg-blue-50 text-blue-500"
                          : "bg-green-50 text-green-500"
                      } `}
                    >
                      {order.status === "paid" ? (
                        <Hourglass size={15} />
                      ) : order.status === "delivered" ? (
                        <Truck  size={15}/>
                      ) : (
                        order.status === "cancelled" ? <X /> : <Check />
                      )}
                      <span>{order.status}</span>
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
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="font-semibold">
                    Total
                  </TableCell>
                  {/* Adjust colspan */}
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </section>
      <section className="col-span-3"></section>
    </div>
  );
};

export default User;
