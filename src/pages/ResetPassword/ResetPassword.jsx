import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";

const ResetPassword = () => {
  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  const { token } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [fields, setFields] = useState({
    password: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: async (fields) => {
      const response = await axios.patch(
        `https://double-decent-server.onrender.com/api/v1/user/resetPassword/${token}`,
        fields
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setFields({ password: "", confirmPassword: "" });
      queryClient.invalidateQueries("user");
      localStorage.removeItem("token");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "There was an error resetting the password");
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async () => {
    if (!fields.password || !fields.confirmPassword) {
      return toast.warning("Please fill in all fields.");
    }
    if (fields.password !== fields.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    mutation.mutate(fields);
  };
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center my-2">
            Reset Password?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">New Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Set a strong password"
                value={fields.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Confirm new Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm the password"
                required
                value={fields.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {mutation.isPending ? (
                <div className="flex items-center">
                  <Loader2 className="ml-2 animate-spin" size="20" />
                  <i>Loading...</i>
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
