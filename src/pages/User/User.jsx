import { useNavigate } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { House, LogOut, Settings, ShoppingBasket, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UserProfile from "@/components/user-profile/UserProfile";
import Orders from "../Orders/Orders";
import UserAddress from "@/components/user-address/UserAddress";
import OrderPage from "@/components/Order/OrderPage";

import useUser from "@/hooks/use-user";

const User = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserRoutes />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderPage />} />
          <Route path="address" element={<UserAddress />} />
        </Route>
      </Routes>
    </div>
  );
};

const UserRoutes = () => {
  const { data: user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.invalidateQueries(["user"]);
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className="grid grid-cols-[300px_1fr] gap-4">
        <Card className="w-full col-span-3 sm:col-span-1 h-fit hidden md:block ms-2">
          <CardHeader>
            <CardTitle>
              <center>
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={user.photo || "https://github.com/shadcn.png"}
                    alt="user photo"
                  />
                  <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
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
              onClick={() => navigate("/user/profile")}
            >
              <User2 size={24} />
              <span className="ms-2">Profile</span>
            </Button>
            <Button
              className="justify-start w-full rounded-none hover:bg-orange-100 hover:text-orange-500"
              variant="secondary"
              onClick={() => navigate("/user/address")}
            >
              <House size={24} />
              <span className="ms-2">Delivery Address</span>
            </Button>
            <Button
              className="justify-start w-full rounded-none hover:bg-orange-100 hover:text-orange-500"
              variant="secondary"
              onClick={() => navigate("/user/orders")}
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
            <Dialog>
              <DialogTrigger className="flex p-2 w-full bg-red-50">
                <LogOut color="red" />
                <span className="ms-2 text-red-700">Logout</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to Logout?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    type="submit"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <div className="col-span-2 md:col-span-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default User;
