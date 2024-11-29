import {
  Ellipsis,
  Eye,
  House,
  LogOut,
  RefreshCcw,
  Settings,
  ShoppingBasket,
  Trash2,
  User2,
} from "lucide-react";

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
import OrderDetails from "@/components/order-details/OrderDetails";

const User = () => {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div className="grid grid-cols-3 px-2 gap-4">
      <Card className="w-full max-w-sm col-span-3 md:col-span-1">
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
          <div className="flex bg-orange-50 text-orange-500 w-full p-2">
            <User2 size={24} />
            <span className="ms-2">Product details</span>
          </div>
          <div className="flex w-full p-2">
            <House size={24} />
            <span className="ms-2">Delivery Address</span>
          </div>
          <div className="flex w-full p-2">
            <ShoppingBasket size={24} />
            <span className="ms-2">Order history</span>
          </div>
          <div className="flex w-full p-2">
            <Settings size={24} />
            <span className="ms-2">Security settings</span>
          </div>
          <Separator className="my-3" />
          <div className="text-red-500 flex p-2 mt-2">
            <LogOut /> <span className="ms-2">Logout</span>
          </div>
        </CardContent>
      </Card>
      <section className="col-span-3 md:col-span-2">
        <Tabs defaultValue="account" className="mx-4">
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
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
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
                  <Input id="alias" placeholder="eg Home, Work etc" />
                </div>
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <Label htmlFor="street">Street</Label>
                  <Input id="street" defaultValue="123 Main St" />
                </div>
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>States</SelectLabel>
                        <SelectItem value="Lagos" selected>
                          Lagos state
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <Select>
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
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save address</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      <section className="col-span-3">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">OrderID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead className="text-right"></TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>
                    {commaSeparatedPrice(invoice.totalAmount)}
                  </TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
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
                            <Trash2 color="red" />{" "}
                            <span className="text-red-500">Cancel order</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="px-1 sm:p-6">
                        <DialogHeader>
                          <DialogTitle>Order details</DialogTitle>
                          <DialogDescription>
                            <ScrollArea className="h-[calc(100dvh-100px)]">
                              <OrderDetails />
                            </ScrollArea>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
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
      </section>
    </div>
  );
};

export default User;
