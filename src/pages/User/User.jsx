import { House, LogOut, Settings, ShoppingBasket, User2 } from "lucide-react";

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


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const User = () => {
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
    </div>
  );
};

export default User;
