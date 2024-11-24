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

const ForgotPassword = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
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
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Go back to {" "}
            <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword
