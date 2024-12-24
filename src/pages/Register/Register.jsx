import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";

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
        "https://double-decent-server.onrender.com/api/v1/user/signup",
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
      // console.log("error: ", error);
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

  const responseMessage = useCallback(
    async (response) => {
      console.log(response);
      if (response.credential) {
        const { data } = await axios.post(
          "https://double-decent-server.onrender.com/api/v1/user/google",
          { token: response.credential } // Send token to the server
        );
        queryClient.setQueryData(["user"], data.data);
        toast.success("Login successful");
        localStorage.setItem("token", data.token);
        navigate("/");
        console.log(data);
      } else {
        console.error("No credential found in response.");
      }
    },
    [navigate, queryClient]
  );
  const errorMessage = useCallback((error) => {
    toast.error(error.message || "There was an error signing with google.");
  }, []);

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Helmet>
        <title>Register</title>
        <meta
          name="description"
          content="Registration page for Double Decent Superstores"
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
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
            <GoogleLogin
              onSuccess={responseMessage}
              onError={errorMessage}
              text="signup_with"
            />
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
