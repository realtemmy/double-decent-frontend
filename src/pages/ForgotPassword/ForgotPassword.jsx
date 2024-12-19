import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, MailCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forgot Password";
  }, []);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const mutation = useMutation({
    mutationFn: async (email) => {
      const response = await axios.post(
        "https://double-decent-server.onrender.com/api/v1/user/forgotPassword",
        email
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setSent(true);
    },
    onError: (error) => {
      console.log(error);

      toast.error(error.message || "There was an error sending the email");
    },
  });

  const handleSubmit = async () => {
    if (!email) {
      return toast.warning("Please fill in all fields.");
    }
    mutation.mutate({ email });
  };
  return (
    <div className="flex w-full h-screen items-center justify-center">
      {sent ? (
        <div className="flex flex-col items-center">
          <div>
            <MailCheck size={40} color="orange" />
          </div>
          <div className="text-3xl font-semibold text-slate-600">
            Please check your email
          </div>
          <p>A mail with reset link has been sent to {email}</p>
        </div>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center my-2">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-center">
              Please enter your email so we can send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                {mutation.isPending ? (
                  <div className="flex items-center gap-1">
                    <Loader2 className="animate-spin" /> <i>Loading</i>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Go back to{" "}
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-400 font-medium"
              >
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ForgotPassword;
