import {
  Check,
  Edit,
  Ellipsis,
  Eye,
  Hourglass,
  House,
  Loader,
  LogOut,
  Plus,
  RefreshCcw,
  Settings,
  ShoppingBasket,
  Trash2,
  Truck,
  User2,
  X,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { commaSeparatedPrice } from "@/utils/helperFunctions";
import { toast } from "sonner";
import useUser from "@/hooks/use-user";

import axiosService from "@/axios";
import OrderDetails from "@/components/order-details/OrderDetails";

const User = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user = null } = useUser();
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [display, setDisplay] = useState("tabs");
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [address, setAddress] = useState([]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
      });
      setAddress(user.location);
    }
  }, [user]);

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

  const passwordMutation = useMutation({
    mutationFn: async (passwordField) => {
      console.log(passwordField);

      await axiosService.patch("/user/update-password", passwordField);
    },

    onSuccess: () => {
      toast.success("Password updated successfully");
      localStorage.removeItem("token");
      navigate("/login");
      queryClient.invalidateQueries();
    },
  });

  const addressMutation = useMutation({
    mutationFn: async (fields) => {
      const response = await axiosService.post("/user/address", fields);
      console.log(response.data);

      return response.data;
    },
    onSuccess: () => {
      toast.success("Address successfully added");
      queryClient.invalidateQueries(["user"]);
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: async (addressId) => {
      await axiosService.delete(`/user/address/${addressId}`);
    },
    onSuccess: () => {
      toast.success("Address deleted successfully.");
      queryClient.invalidateQueries(["user"]);
    },
  });

  const [passwordField, setPasswordField] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
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
      state === "" ||
      lga === "" ||
      addressField.address === ""
    ) {
      return toast.warning("All fields are required");
    }
    addressMutation.mutate({ ...addressField, lga, state });
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordSubmit = () => {
    if (
      passwordField.currentPassword === "" ||
      passwordField.password === "" ||
      passwordField.confirmPassword === ""
    ) {
      return toast.warning("All fields are required");
    }
    if (passwordField.password !== passwordField.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    passwordMutation.mutate(passwordField);
  };

  const handleAddressDelete = (addressId) => {
    if (!addressId) return;
    deleteAddressMutation.mutate(addressId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-[200px_1fr] px-2 gap-4">
      <Card className="w-full col-span-3 sm:col-span-1 h-[calc(100svh-150px)]">
        <CardHeader>
          <CardTitle>
            <center>
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.image || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4 className="mt-2 capitalize">{user.name}</h4>
            </center>
          </CardTitle>
        </CardHeader>
        <Separator className="w-11/12 m-auto my-4" />
        <CardContent className="p-0">
          <Button
            className="justify-start w-full rounded-none hover:bg-orange-100 hover:text-orange-500"
            variant="secondary"
            onClick={() => setDisplay("tabs")}
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
      <section className="col-span-2 sm:col-span-1 min-w-[300px]">
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
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                    />
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
                      name="currentPassword"
                      onChange={handlePasswordReset}
                      value={passwordField.currentPassword}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input
                      id="new"
                      type="password"
                      name="password"
                      value={passwordField.password}
                      onChange={handlePasswordReset}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmNew">Confirm New password</Label>
                    <Input
                      id="confirmNew"
                      type="password"
                      name="confirmPassword"
                      onChange={handlePasswordReset}
                      value={passwordField.confirmPassword}
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
                  <CardDescription className="flex justify-between items-center">
                    <div>
                      Update your delivery address here. Click save when you're
                      done.
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <Button size="sm" type="button">
                                <Plus />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add address</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add address</DialogTitle>
                          <DialogDescription className="text-start">
                            <section className="grid grid-cols-2 items-baseline gap-2 space-y-2">
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
                                  onValueChange={(value) => setState(value)}
                                  name="state"
                                  value={state}
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
                                <Select
                                  onValueChange={(lga) => setLga(lga)}
                                  name="lga"
                                  value={lga}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose LGA" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>LGA</SelectLabel>
                                      <SelectItem value="ikorodu">
                                        Ikorodu
                                      </SelectItem>
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
                            </section>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button type="submit" onClick={handleAddressSubmit}>
                            {addressMutation.isPending ? (
                              <div className="flex items-center">
                                <Loader /> <i>Loading...</i>
                              </div>
                            ) : (
                              "Save Address"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <ScrollArea className="whitespace-nowrap rounded-md"> */}
                  {address.length === 0 ? (
                    <div className="flex items-center justify-center">
                      <p className="text-lg font-semibold text-slate-700">
                        No location is set yet!
                      </p>
                    </div>
                  ) : (
                    <section className="flex gap-4 flex-wrap">
                      {address.map((add, index) => (
                        <div
                          className="border p-2 rounded relative max-w-sm min-w-[200px]"
                          key={index}
                        >
                          <span className="absolute right-2 cursor-pointer flex gap-2 items-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Edit size={18} color="orange" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit Address</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Trash2
                                    size={18}
                                    color="red"
                                    onClick={() => handleAddressDelete(add._id)}
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="bg-red-500">
                                  <p>Delete Address</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </span>
                          <h5 className="capitalize">
                            <span className="font-semibold text-slate-700">
                              Alias
                            </span>
                            : {add.alias}
                          </h5>
                          <div className="capitalize">
                            <span className="font-semibold text-slate-700">
                              Street
                            </span>{" "}
                            : {add.street}
                          </div>
                          <div className="capitalize">
                            <span className="font-semibold text-slate-700">
                              LGA
                            </span>
                            : {add.lga}
                          </div>
                          <div className="capitalize">
                            <span className="font-semibold text-slate-700">
                              State
                            </span>
                            : {add.state} state
                          </div>
                          <div className="capitalize">
                            <span className="font-semibold text-slate-700">
                              Full address
                            </span>
                            : {add.address}
                          </div>
                        </div>
                      ))}
                    </section>
                  )}
                  {/* <ScrollBar orientation="horizontal" />
                  </ScrollArea> */}
                </CardContent>
                {/* <CardFooter>
                  <Button onClick={handleAddressSubmit}>Save address</Button>
                </CardFooter> */}
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <ScrollArea className="w-full whitespace-nowrap">
            <h4 className="text-2xl capitalize font-semibold text-slate-600">
              order history
            </h4>
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
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{order._id}</TableCell>
                    <TableCell>12th of June, 2024</TableCell>
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
                ))}
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
        )}
      </section>
    </div>
  );
};

export default User;
