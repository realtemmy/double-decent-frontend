import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
