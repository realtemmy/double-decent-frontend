import { useState, useEffect, useCallback, Suspense, lazy } from "react";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import defaultUser from "./../../assets/default.jpg";
import useUser from "@/hooks/use-user";
import axiosService from "@/axios";
import Spinner from "@/components/Spinner/Spinner";

const UserProfile = lazy(() => import("@/components/user-profile/UserProfile"));
const Orders = lazy(() => import("../Orders/Orders"));
const UserAddress = lazy(() => import("@/components/user-address/UserAddress"));
const OrderPage = lazy(() => import("@/components/Order/OrderPage"));

const User = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<UserRoutes />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderPage />} />
          <Route path="address" element={<UserAddress />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const UserRoutes = () => {
  const { data: user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => {
    return localStorage.getItem("activeTab") || "profile";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", active);
  }, [active]);

  const handleLogout = useCallback(() => {
    queryClient.removeQueries(["user"]);
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate, queryClient]);

  const imageMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("photo", image);
      await axiosService.patch("/user/upload-user-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

  const handleNavigation = (tab, path) => {
    setActive(tab); // Update active state
    navigate(path); // Navigate to the target route
  };

  const handleImageUpload = useCallback(() => {
    imageMutation.mutate();
  }, [imageMutation]);

  return (
    <>
      <div className="grid grid-cols-[300px_1fr] gap-4">
        <Card className="w-full col-span-3 sm:col-span-1 h-fit hidden md:block ms-2 ">
          <CardHeader>
            <CardTitle>
              <center className="relative">
                <Avatar className="h-20 w-20 relative">
                  <AvatarImage
                    src={user.photo || defaultUser}
                    alt="user photo"
                  />
                  <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-7 right-1/3 cursor-pointer">
                  <Dialog
                    open={open && !!image}
                    onOpenChange={setOpen}
                    className="p-0"
                  >
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
                                title="User photo"
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
                <h1 className="mt-2 capitalize">{user.name}</h1>
              </center>
            </CardTitle>
          </CardHeader>
          <Separator className="w-11/12 m-auto my-4" />
          <CardContent className="p-0">
            <Button
              className={`justify-start w-full rounded-none hover:bg-orange-100 ${
                active === "profile" && "bg-orange-200 text-orange-500"
              }`}
              variant="secondary"
              onClick={() => handleNavigation("profile", "/user/profile")}
            >
              <User2 size={24} />
              <span className="ms-2">Profile</span>
            </Button>
            <Button
              className={`justify-start w-full rounded-none hover:bg-orange-100 ${
                active === "address" && "bg-orange-200 text-orange-500"
              }`}
              variant="secondary"
              onClick={() => handleNavigation("address", "/user/address")}
            >
              <House size={24} />
              <span className="ms-2">Delivery Address</span>
            </Button>
            <Button
              className={`justify-start w-full rounded-none hover:bg-orange-100 ${
                active === "orders" && "bg-orange-200 text-orange-500"
              }`}
              variant="secondary"
              onClick={() => handleNavigation("orders", "/user/orders")}
            >
              <ShoppingBasket size={24} />
              <span className="ms-2">Order history</span>
            </Button>
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
