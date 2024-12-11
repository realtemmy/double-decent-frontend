import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formField, setFormField] = useState({ email: "", password: "" });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        "https://double-decent-server.onrender.com/api/v1/user/login",
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data); // Cache the response
      toast.success("Login successful");
      navigate("/");
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      console.log("error: ", error);
      toast.error(error.message || "There was an error logging in");
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formField.email || !formField.password) {
      return toast.warning("Please fill in all fields.");
    }
    mutation.mutate(formField);
  };
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {mutation.isPending ? (
                <div className="flex items-center">
                  <Loader2 className="ml-2 animate-spin" size="20" />
                  <i>Loading...</i>
                </div>
              ) : (
                "Login"
              )}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
