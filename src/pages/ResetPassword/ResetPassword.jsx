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

const ResetPassword = () => {
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
                placeholder="Set a strong password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Confirm new Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm the password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
