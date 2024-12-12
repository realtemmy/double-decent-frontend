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

const UserProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user = null } = useUser();
  const [display, setDisplay] = useState("tabs");
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
      });
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

  const [passwordField, setPasswordField] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const handlePasswordReset = (event) => {
    const { name, value } = event.target;
    setPasswordField({ ...passwordField, [name]: value });
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-2">
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2 gap-1">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
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
                Change your password here. After saving, you'll be logged out.
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
      </Tabs>
    </div>
  );
};

export default UserProfile;
