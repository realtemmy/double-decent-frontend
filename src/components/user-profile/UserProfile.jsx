import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CameraIcon, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useUser from "@/hooks/use-user";

import axiosService from "@/axios";

const UserProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user = null } = useUser();
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

  const [photo, setPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  const passwordMutation = useMutation({
    mutationFn: async (passwordField) => {
      await axiosService.patch("/user/update-password", passwordField);
    },
    onSuccess: () => {
      toast.success("Password updated successfully");
      localStorage.removeItem("token");
      navigate("/login");
      queryClient.invalidateQueries(["user"]);
    },
  });
  const photoMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("photo", photo);
      const response = await axiosService.patch("/user/upload-user-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    },
    onSuccess: () => {
      toast.success("Profile photo updated successfully.");
      queryClient.invalidateQueries(["user"])
      setOpen(false);
    },
    onError: (error) => {
      toast.error(
        error.message || "There was an error uploading profile photo"
      );
      setOpen(false);
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

  const handleImageUpload = () => {
    photoMutation.mutate();
  };

  return (
    <div className="px-2">
      <div className="flex md:hidden gap-4 items-center flex-col justify-center my-2">
        <div className="w-fit relative">
          <Avatar className="h-20 w-20 block">
            <AvatarImage src={user.photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-3 -right-1 cursor-pointer">
            <CameraIcon />
          </span>
        </div>
        <div className="flex gap-4">
          <Dialog open={open && !!photo} onOpenChange={setOpen}>
            <DialogTrigger>
              <div className="relative">
                <Button>Change Photo</Button>
                <input
                  type="file"
                  className="absolute w-full left-0 opacity-0"
                  onChange={(event) => setPhoto(event.target.files[0])}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[400px] max-h-[500px]">
              <DialogHeader>
                <DialogDescription>
                  <div className="text-center flex items-center justify-center">
                    {photo && (
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="preview image"
                        className="w-full max-w-[400px] max-h-[400px] rounded"
                      />
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit" onClick={handleImageUpload}>
                  {photoMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" />
                      <span>
                        <i>Loading</i>
                      </span>
                    </div>
                  ) : (
                    "Upload image"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Button variant="secondary">View Photo</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[400px] max-h-[500px]">
              <DialogHeader>
                <DialogDescription>
                  <img
                    src={user.photo}
                    className="w-full max-w-[400px] max-h-[400px] rounded"
                    alt="user photo"
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

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
