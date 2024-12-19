import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  House,
  LogOut,
  Settings,
  ShoppingBasket,
  User2,
  Camera,
  Loader2,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import axiosService from "@/axios";
import { toast } from "sonner";

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
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    queryClient.removeQueries(["user"]);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const imageMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("photo", image);
      const response = axiosService.patch("/user/upload-user-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    },
    onSuccess: () => {
      toast.success("Profile photo updated successfully.");
      queryClient.invalidateQueries(["user"]);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(
        error.message || "There was an error uploading profile photo"
      );
      setOpen(false);
    },
  });

  const handleImageUpload = () => {
    imageMutation.mutate();
  };

  return (
    <>
      <div className="grid grid-cols-[300px_1fr] gap-4">
        <Card className="w-full col-span-3 sm:col-span-1 h-fit hidden md:block ms-2">
          <CardHeader>
            <CardTitle>
              <center className="relative">
                <Avatar className="h-20 w-20 relative">
                  <AvatarImage
                    src={user.photo || "https://github.com/shadcn.png"}
                    alt="user photo"
                  />
                  <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-7 right-1/3 cursor-pointer">
                  <Dialog open={open && !!image} onOpenChange={setOpen} className="p-0">
                    <DialogTrigger>
                      <Camera size={24} className="w-auto h-auto" />
                      <Input
                        accept="image/*"
                        type="file"
                        className="absolute top-0 cursor-pointer border-none opacity-0"
                        onChange={(e) => {
                          setImage(e.target.files[0]), setOpen(true);
                        }}
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px] max-h-[500px]">
                      <DialogHeader>
                        <DialogDescription>
                          <div className="flex items-center justify-center">
                            {image && (
                              <img
                                src={URL.createObjectURL(image)}
                                alt="preview image"
                                className="w-full max-w-[400px] max-h-[400px] rounded"
                              />
                            )}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button type="submit" onClick={handleImageUpload}>
                          {imageMutation.isPending ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="animate-spin" />{" "}
                              <span>
                                <i>Loading</i>
                              </span>
                            </div>
                          ) : (
                            "Save changes"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
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
                    This will clear your session, you will be logged out and redirected to login page.
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
