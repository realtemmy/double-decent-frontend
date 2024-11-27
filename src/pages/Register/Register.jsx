import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const mutation = useMutation({
    mutationFn: async (formFields) => {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/signup",
        formFields
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data); // Cache the response
      toast.success("Account created successfully.");
      navigate("/");
      localStorage.setItem("token", data.token);
      console.log(data);
    },
    onError: (error) => {
      console.log("error: ", error);
      toast.error(error.message || "There was an error logging in");
    },
  });

  const handleSubmit = async () => {
    if (
      !formFields.email ||
      !formFields.password ||
      !formFields.confirmPassword ||
      !formFields.password
    ) {
      return toast.warning("Please fill in all fields.");
    }
    if (formFields.password !== formFields.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    mutation.mutate(formFields);
  };
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center my-4">
            Create account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Jonn Doe"
                onChange={handleChange}
                required
                value={formFields.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
                value={formFields.email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Set a strong password"
                required
                onChange={handleChange}
                value={formFields.password}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm the password"
                required
                onChange={handleChange}
                value={formFields.confirmPassword}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Create account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
